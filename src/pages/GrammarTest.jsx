import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound, triggerVibration } from '../utils/feedback';
import { EXAMS_LIST, IELTS_EXAMS_LIST } from '../data/examData';
import { 
  ref, 
  set, 
  push, 
  onValue, 
  remove 
} from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { 
  Folder, 
  Award, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  Timer, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import './GrammarTest.css';

export default function GrammarTest() {
  const navigate = useNavigate();
  const { testId } = useParams();
  const { user } = useAuth();

  // ─── STAGES: 'list' | 'folder_detail' | 'intro' | 'testing' | 'evaluating' | 'results' ───
  const [stage, setStage] = useState('list');
  const [activeTest, setActiveTest] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Results details active section tab
  const [activeResultSecIdx, setActiveResultSecIdx] = useState(0);

  // High Scores state
  const [highScores, setHighScores] = useState({});

  // Summary stats
  const [stats, setStats] = useState({ totalTaken: 0, avgScore: 0 });

  // Time spent tracking
  const [timeSpent, setTimeSpent] = useState(0); // in seconds

  // Category selection tab: 'level' | 'ielts'
  const [examCategory, setExamCategory] = useState('level');

  // Attempts History state
  const [attempts, setAttempts] = useState([]);
  const [viewingPastAttempt, setViewingPastAttempt] = useState(null);
  const [currentAttemptId, setCurrentAttemptId] = useState(null);
  const [isRetryingAttemptId, setIsRetryingAttemptId] = useState(null);

  // ─── SETTINGS & CONNECTIONS ────────────────────────────────────────────────
  const [apiEndpoint, setApiEndpoint] = useState(() => {
    return localStorage.getItem('lm_studio_endpoint') || 'http://localhost:1234/v1';
  });
  const [apiModel, setApiModel] = useState('local-model');
  const [isApiChecking, setIsApiChecking] = useState(false);
  const [apiStatus, setApiStatus] = useState({ checked: false, connected: false, error: '' });

  // Load attempts history (Firebase if logged in, otherwise localStorage)
  useEffect(() => {
    if (user) {
      const attemptsRef = ref(db, `users/${user.uid}/grammar/complex_attempts`);
      const unsubscribe = onValue(attemptsRef, (snapshot) => {
        const val = snapshot.val() || {};
        const attemptsList = [];
        Object.keys(val).forEach((key) => {
          attemptsList.push({
            id: key,
            ...val[key]
          });
        });
        // Sort attempts by date descending
        attemptsList.sort((a, b) => new Date(b.takenAt || 0) - new Date(a.takenAt || 0));
        setAttempts(attemptsList);
      }, (error) => {
        console.error("Error listening to grammar attempts from Firebase:", error);
      });
      return () => unsubscribe();
    } else {
      const savedAttempts = localStorage.getItem('grammar_test_attempts');
      setAttempts(savedAttempts ? JSON.parse(savedAttempts) : []);
    }
  }, [user, stage]);

  // Recalculate stats and high scores whenever attempts state changes
  useEffect(() => {
    const scores = {};
    const ALL_EXAMS = [...EXAMS_LIST, ...IELTS_EXAMS_LIST];

    // 1. First, load old local high scores for backward compatibility
    ALL_EXAMS.forEach(exam => {
      const saved = localStorage.getItem(`grammar_test_score_${exam.id}`);
      if (saved !== null) {
        scores[exam.id] = parseInt(saved, 10);
      }
    });

    // 2. Merge with computed scores from attempts history
    attempts.forEach(att => {
      const prev = scores[att.testId] || 0;
      if (att.score > prev) {
        scores[att.testId] = att.score;
      }
    });

    setHighScores(scores);

    // Compute unique variants taken and average score
    const uniqueTestsTaken = new Set(attempts.map(a => a.testId)).size;
    const totalScorePercent = attempts.reduce((acc, a) => acc + a.score, 0);
    const avgScore = attempts.length > 0 ? Math.round(totalScorePercent / attempts.length) : 0;

    setStats({
      totalTaken: uniqueTestsTaken,
      avgScore: avgScore
    });
  }, [attempts]);

  // Synchronize state with route params
  useEffect(() => {
    if (viewingPastAttempt) return; // Do not overwrite if viewing past attempt

    if (testId) {
      const ALL_EXAMS = [...EXAMS_LIST, ...IELTS_EXAMS_LIST];
      const foundExam = ALL_EXAMS.find(e => e.id === testId);
      if (foundExam) {
        // Auto select correct category based on testId prefix
        if (testId.startsWith('ielts_')) {
          setExamCategory('ielts');
        } else {
          setExamCategory('level');
        }
        setActiveTest(foundExam);
        setSections(foundExam.sections);
        setStage((prev) => {
          if (prev === 'list' || prev === 'folder_detail') return 'intro';
          return prev;
        });
      } else {
        navigate('/grammar-test', { replace: true });
      }
    } else {
      setActiveTest(null);
      setSections([]);
      setStage('list');
    }
  }, [testId, navigate, viewingPastAttempt]);

  // Save endpoint
  useEffect(() => {
    localStorage.setItem('lm_studio_endpoint', apiEndpoint);
  }, [apiEndpoint]);

  // ─── TEST STATE ────────────────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [answers, setAnswers] = useState({});
  const [reorderSelections, setReorderSelections] = useState({});
  
  // ─── EVALUATION RESULTS STATE ──────────────────────────────────────────────
  const [grades, setGrades] = useState({});

  const activeSection = sections[activeSectionIdx];
  const timerRef = useRef(null);

  // Timer Effect
  useEffect(() => {
    if (stage === 'testing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitTest(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCheckConnection = async () => {
    setIsApiChecking(true);
    setApiStatus({ checked: false, connected: false, error: '' });
    try {
      const response = await fetch(`${apiEndpoint}/models`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const data = await response.json();
      const model = data.data?.[0]?.id || 'local-model';
      setApiModel(model);
      setApiStatus({ checked: true, connected: true, error: '' });
      playSound('correct');
    } catch (e) {
      console.error(e);
      setApiStatus({
        checked: true,
        connected: false,
        error: 'LM Studio ulanmadi. CORS (Private Network Access) yoki HTTPS cheklovlarini ko\'rib chiqing.'
      });
      playSound('wrong');
    } finally {
      setIsApiChecking(false);
    }
  };

  const handleStartVariant = (exam) => {
    setAnswers({});
    setReorderSelections({});
    setGrades({});
    navigate(`/grammar-test/run/${exam.id}`);
    playSound('correct');
  };

  const handleRestartTest = () => {
    setAnswers({});
    setReorderSelections({});
    setGrades({});
    setTimeLeft(30 * 60);
    setStage('intro');
  };

  const handleTextChange = (sectionId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`${sectionId}_${questionId}`]: value
    }));
  };

  const handleChoiceSelect = (sectionId, questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`${sectionId}_${questionId}`]: value
    }));
    playSound('correct');
  };

  const handleReorderClickWord = (questionGlobalId, word, scrambledList) => {
    setReorderSelections((prev) => {
      const selected = prev[questionGlobalId] || [];
      if (selected.includes(word)) {
        const updated = selected.filter(w => w !== word);
        setAnswers((ans) => ({ ...ans, [questionGlobalId]: updated.join(' ') }));
        return { ...prev, [questionGlobalId]: updated };
      } else {
        const updated = [...selected, word];
        setAnswers((ans) => ({ ...ans, [questionGlobalId]: updated.join(' ') }));
        return { ...prev, [questionGlobalId]: updated };
      }
    });
  };

  const handleReorderClear = (questionGlobalId) => {
    setReorderSelections(prev => ({ ...prev, [questionGlobalId]: [] }));
    setAnswers(ans => ({ ...ans, [questionGlobalId]: '' }));
  };

  const handleSubmitTest = async (isTimeout = false) => {
    clearInterval(timerRef.current);
    if (isTimeout) {
      alert("Vaqt tugadi! Javoblaringiz yuborilmoqda...");
    }
    playSound('victory');
    setStage('evaluating');

    // Calculate time spent
    setTimeSpent(30 * 60 - timeLeft);

    const tempGrades = {};
    const writtenToEvaluate = [];

    // First do auto-grading for multiple choice, gaps, etc.
    sections.forEach((section) => {
      section.questions.forEach((q) => {
        const key = `${section.id}_${q.id}`;
        const userVal = (answers[key] || '').trim();

        if (section.id === 'gaps' && q.type === 'choice') {
          const isCorrect = userVal.toLowerCase() === q.correct.toLowerCase();
          tempGrades[key] = {
            score: isCorrect ? 1.0 : 0.0,
            feedback: isCorrect ? 'Perfect!' : `Correct answer: "${q.correct}"`,
            pending: false
          };
        } else if (section.id === 'gaps' && q.type === 'text') {
          const isCorrect = userVal.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") === q.correct.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
          tempGrades[key] = {
            score: isCorrect ? 1.0 : 0.0,
            feedback: isCorrect ? 'Perfect!' : `Correct answer: "${q.correct}"`,
            pending: false
          };
        } else if (section.id === 'inged') {
          const isCorrect = userVal.toLowerCase() === q.correct.toLowerCase();
          tempGrades[key] = {
            score: isCorrect ? 1.0 : 0.0,
            feedback: isCorrect ? 'Correct!' : `Correct answer: "${q.correct}"`,
            pending: false
          };
        } else if (section.id === 'mistakes') {
          const cleanUser = userVal.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g, ' ');
          const cleanRef = q.reference.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g, ' ');
          if (cleanUser === cleanRef) {
            tempGrades[key] = { score: 1.0, feedback: 'Correct!', pending: false };
          } else {
            writtenToEvaluate.push({
              key,
              type: 'mistake_correction',
              question: `Correct the mistake in: "${q.original}"`,
              reference: q.reference,
              answer: userVal
            });
          }
        } else if (section.id === 'reorder') {
          const cleanUser = userVal.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g, ' ');
          const cleanRef = q.answer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g, ' ');
          const cleanAlt = q.altAnswer ? q.altAnswer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").replace(/\s+/g, ' ') : '';
          
          const isCorrect = cleanUser === cleanRef || (cleanAlt && cleanUser === cleanAlt);
          tempGrades[key] = {
            score: isCorrect ? 1.0 : 0.0,
            feedback: isCorrect ? 'Correct order!' : `Expected: "${q.answer}"`,
            pending: false
          };
        } else {
          writtenToEvaluate.push({
            key,
            type: section.id,
            question: section.id === 'translate' ? `Translate Uzbek: "${q.uzbek}" into English` : (q.prompt || q.question),
            reference: q.reference || q.referencePattern,
            answer: userVal
          });
        }
      });
    });

    setGrades(tempGrades);

    // DYNAMIC AUTO-DETECTION: Check if LM Studio is running right now
    let lmStudioConnected = false;
    let resolvedModelName = apiModel;

    try {
      const response = await fetch(`${apiEndpoint}/models`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          resolvedModelName = data.data[0].id;
          setApiModel(resolvedModelName);
          lmStudioConnected = true;
        }
      }
    } catch (e) {
      console.warn("Direct local connection check failed during submit.", e);
    }

    const apiGrades = { ...tempGrades };
    let hasPendingGrading = false;

    // Loop through the written questions and evaluate them
    for (let i = 0; i < writtenToEvaluate.length; i++) {
      const item = writtenToEvaluate[i];
      if (item.answer === '') {
        apiGrades[item.key] = { score: 0, feedback: 'Bo\'sh qoldirilgan javob.', pending: false };
        continue;
      }

      if (lmStudioConnected) {
        try {
          const result = await evaluateWithLMStudio(item.question, item.reference, item.answer, resolvedModelName);
          apiGrades[item.key] = { ...result, pending: false };
        } catch (e) {
          console.error("Direct LLM grading failed for question:", item.key, e);
          apiGrades[item.key] = { score: null, feedback: 'Tekshirilmagan (Ulanish xatosi)', pending: true };
          hasPendingGrading = true;
        }
      } else {
        apiGrades[item.key] = { score: null, feedback: 'Tekshirilmagan (Server offline)', pending: true };
        hasPendingGrading = true;
      }
    }

    setGrades(apiGrades);
    finalizeScores(apiGrades, hasPendingGrading ? 'pending' : 'completed');
    setStage('results');
  };

  const finalizeScores = async (finalGradesMap, forcedStatus) => {
    let totalQuestions = 0;
    let totalScore = 0;
    let hasPending = forcedStatus === 'pending';

    sections.forEach((s) => {
      s.questions.forEach((q) => {
        totalQuestions++;
        const gradeObj = finalGradesMap[`${s.id}_${q.id}`];
        if (gradeObj) {
          if (gradeObj.score !== null && !gradeObj.pending) {
            totalScore += gradeObj.score;
          } else {
            hasPending = true;
          }
        } else {
          hasPending = true;
        }
      });
    });

    const percent = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
    
    // Save high score locally
    const savedScore = localStorage.getItem(`grammar_test_score_${activeTest.id}`);
    const prevBest = savedScore ? parseInt(savedScore, 10) : -1;
    if (percent > prevBest) {
      localStorage.setItem(`grammar_test_score_${activeTest.id}`, String(percent));
    }

    const attemptData = {
      testId: activeTest.id,
      testTitle: activeTest.title,
      score: percent,
      totalScore: totalScore.toFixed(1),
      totalQuestions: totalQuestions,
      timeSpent: 30 * 60 - timeLeft,
      takenAt: new Date().toISOString(),
      answers: { ...answers },
      grades: { ...finalGradesMap },
      status: hasPending ? 'pending' : 'completed'
    };

    if (user) {
      try {
        const attemptsRef = ref(db, `users/${user.uid}/grammar/complex_attempts`);
        const newAttemptRef = push(attemptsRef);
        setCurrentAttemptId(newAttemptRef.key);
        await set(newAttemptRef, attemptData);
      } catch (err) {
        console.error("Failed to save attempt to Firebase:", err);
      }
    } else {
      const attemptId = `attempt_${Date.now()}`;
      setCurrentAttemptId(attemptId);
      const attempt = {
        id: attemptId,
        ...attemptData
      };
      const savedAttempts = localStorage.getItem('grammar_test_attempts');
      const attemptsList = savedAttempts ? JSON.parse(savedAttempts) : [];
      attemptsList.unshift(attempt);
      localStorage.setItem('grammar_test_attempts', JSON.stringify(attemptsList));
      setAttempts(attemptsList);
    }
  };

  const evaluateWithLMStudio = async (questionText, referenceText, studentAnswerText, modelName) => {
    const systemPrompt = `You are a strict and helpful English grammar teacher.
Analyze the student's answer based on the task prompt and reference/model answer.
Evaluate if the sentence is grammatically correct and communicates the right meaning. Ignore minor casing errors.
You must respond with ONLY a valid, plain JSON object. Do not include markdown ticks, prefix notes, or code blocks.
Response JSON schema:
{"score": <number between 0.0 and 1.0>, "feedback": "<Brief 1-sentence English explanation of any grammar mistake, or short praise if perfect>"}
Do not return anything else except this JSON.`;

    const userPrompt = `Task/Question: ${questionText}
Reference/Model Answer: ${referenceText}
Student's Answer: "${studentAnswerText}"

Evaluate the answer and return the JSON.`;

    const response = await fetch(`${apiEndpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.1,
        max_tokens: 150
      })
    });

    if (!response.ok) throw new Error('API return error');
    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON block returned by LLM');
    const cleanJson = JSON.parse(jsonMatch[0]);

    return {
      score: typeof cleanJson.score === 'number' ? cleanJson.score : 0,
      feedback: cleanJson.feedback || 'No comments.'
    };
  };

  const getScoreSummary = () => {
    let totalQuestions = 0;
    let totalScore = 0;
    let correctCount = 0;
    let partialCount = 0;
    let wrongCount = 0;
    let pendingCount = 0;

    sections.forEach((s) => {
      s.questions.forEach((q) => {
        totalQuestions++;
        const gradeObj = grades[`${s.id}_${q.id}`];
        if (gradeObj) {
          if (gradeObj.score === null || gradeObj.pending) {
            pendingCount++;
          } else if (typeof gradeObj.score === 'number') {
            totalScore += gradeObj.score;
            if (gradeObj.score >= 0.9) {
              correctCount++;
            } else if (gradeObj.score > 0.1) {
              partialCount++;
            } else {
              wrongCount++;
            }
          }
        } else {
          wrongCount++;
        }
      });
    });

    const percent = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
    return { 
      score: totalScore.toFixed(1), 
      total: totalQuestions, 
      percent,
      correctCount,
      partialCount,
      wrongCount,
      pendingCount
    };
  };

  // Helper to render rating feedback text
  const getRatingLabel = (percent) => {
    if (percent >= 90) return { title: "A'lo! Mukammal bilim 🌟", className: 'excellent' };
    if (percent >= 70) return { title: "Yaxshi natija! 👍", className: 'good' };
    if (percent >= 50) return { title: "Qoniqarli, ko'proq mashq qiling 📚", className: 'satisfactory' };
    return { title: "Qayta topshirish tavsiya etiladi 🔁", className: 'retry' };
  };

  // Helper to format spent seconds
  const formatTimeSpent = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins > 0) return `${mins} daqiqa ${remainingSecs} soniya`;
    return `${remainingSecs} soniya`;
  };

  // Helper to format attempt date
  const formatDate = (isoStr) => {
    const d = new Date(isoStr);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  // Helper to get variant letter A, B, C...
  const getVariantLetter = (testId) => {
    const ieltsIdx = IELTS_EXAMS_LIST.findIndex(e => e.id === testId);
    if (ieltsIdx !== -1) return `IELTS ${String.fromCharCode(65 + ieltsIdx)}`;

    const idx = EXAMS_LIST.findIndex(e => e.id === testId);
    return idx !== -1 ? String.fromCharCode(65 + idx) : '?';
  };

  // View a past attempt details
  const handleViewAttempt = (attempt) => {
    const ALL_EXAMS = [...EXAMS_LIST, ...IELTS_EXAMS_LIST];
    const foundExam = ALL_EXAMS.find(e => e.id === attempt.testId);
    if (foundExam) {
      setActiveTest(foundExam);
      setSections(foundExam.sections);
      setAnswers(attempt.answers);
      setGrades(attempt.grades);
      setTimeSpent(attempt.timeSpent);
      setCurrentAttemptId(attempt.id);
      setViewingPastAttempt(attempt.id);
      setStage('results');
      playSound('correct');
    }
  };

  // Retry grading for pending evaluations in an attempt
  const handleRetryGrading = async (attempt, e) => {
    if (e) e.stopPropagation();
    setIsRetryingAttemptId(attempt.id);
    playSound('correct');

    try {
      // 1. Check local LM Studio connection first
      const connResponse = await fetch(`${apiEndpoint}/models`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!connResponse.ok) throw new Error("LM Studio offline");
      const connData = await connResponse.json();
      const resolvedModelName = connData.data?.[0]?.id || apiModel;

      // 2. Identify pending questions in this attempt
      const ALL_EXAMS = [...EXAMS_LIST, ...IELTS_EXAMS_LIST];
      const foundExam = ALL_EXAMS.find(exam => exam.id === attempt.testId);
      if (!foundExam) throw new Error("Exam variant not found");

      const updatedGrades = { ...attempt.grades };
      let updatedAnswers = { ...attempt.answers };
      let newlyGradedCount = 0;

      // Loop through all sections and questions
      for (const section of foundExam.sections) {
        for (const q of section.questions) {
          const key = `${section.id}_${q.id}`;
          const gradeObj = updatedGrades[key];

          // If the grade is pending/null or marked pending
          if (!gradeObj || gradeObj.score === null || gradeObj.pending) {
            const userVal = (updatedAnswers[key] || '').trim();
            if (userVal === '') {
              updatedGrades[key] = { score: 0, feedback: 'Bo\'sh qoldirilgan javob.', pending: false };
              newlyGradedCount++;
              continue;
            }

            const questionText = section.id === 'translate' ? `Translate Uzbek: "${q.uzbek}" into English` : (q.prompt || q.question);
            const referenceText = q.reference || q.referencePattern;

            try {
              const result = await evaluateWithLMStudio(questionText, referenceText, userVal, resolvedModelName);
              updatedGrades[key] = { ...result, pending: false };
              newlyGradedCount++;
            } catch (err) {
              console.error(`Failed to retry grade for ${key}:`, err);
            }
          }
        }
      }

      if (newlyGradedCount > 0) {
        // Recalculate percent and totals
        let totalQuestions = 0;
        let totalScore = 0;
        let hasPending = false;

        foundExam.sections.forEach(s => {
          s.questions.forEach(q => {
            totalQuestions++;
            const g = updatedGrades[`${s.id}_${q.id}`];
            if (g && g.score !== null && !g.pending) {
              totalScore += g.score;
            } else {
              hasPending = true;
            }
          });
        });

        const percent = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

        const updatedAttemptData = {
          testId: attempt.testId,
          testTitle: attempt.testTitle,
          score: percent,
          totalScore: totalScore.toFixed(1),
          totalQuestions: totalQuestions,
          timeSpent: attempt.timeSpent,
          takenAt: attempt.takenAt,
          answers: attempt.answers,
          grades: updatedGrades,
          status: hasPending ? 'pending' : 'completed'
        };

        if (user) {
          const attemptRef = ref(db, `users/${user.uid}/grammar/complex_attempts/${attempt.id}`);
          await set(attemptRef, updatedAttemptData);
        } else {
          // LocalStorage update
          const savedAttempts = localStorage.getItem('grammar_test_attempts');
          const attemptsList = savedAttempts ? JSON.parse(savedAttempts) : [];
          const index = attemptsList.findIndex(a => a.id === attempt.id);
          if (index !== -1) {
            attemptsList[index] = { id: attempt.id, ...updatedAttemptData };
            localStorage.setItem('grammar_test_attempts', JSON.stringify(attemptsList));
            setAttempts(attemptsList);
          }
        }

        if (viewingPastAttempt === attempt.id) {
          setGrades(updatedGrades);
        }

        alert(`Tekshirish yakunlandi! Jami ${newlyGradedCount} ta savol baholandi.`);
        playSound('victory');
      } else {
        alert("Barcha savollar allaqachon baholangan yoki ulanish yana muvaffaqiyatsiz bo'ldi.");
      }

    } catch (e) {
      console.error(e);
      alert("LM Studio serveriga ulanib bo'lmadi! Server yoqilganligini tekshiring.");
      playSound('wrong');
    } finally {
      setIsRetryingAttemptId(null);
    }
  };

  // Delete an attempt from history
  const handleDeleteAttempt = async (attemptId, e) => {
    e.stopPropagation();
    if (window.confirm("Ushbu urinish tarixini o'chirishni xohlaysizmi?")) {
      if (user) {
        try {
          const attemptRef = ref(db, `users/${user.uid}/grammar/complex_attempts/${attemptId}`);
          await remove(attemptRef);
        } catch (err) {
          console.error("Failed to delete attempt from Firebase:", err);
        }
      } else {
        const savedAttempts = localStorage.getItem('grammar_test_attempts');
        const attemptsList = savedAttempts ? JSON.parse(savedAttempts) : [];
        const filtered = attemptsList.filter(a => a.id !== attemptId);
        localStorage.setItem('grammar_test_attempts', JSON.stringify(filtered));
        setAttempts(filtered);
      }
      playSound('wrong');
    }
  };

  // Exit result view
  const handleExitResults = () => {
    if (viewingPastAttempt) {
      setViewingPastAttempt(null);
    } else {
      navigate('/grammar-test');
    }
  };

  const currentAttempt = attempts.find(a => a.id === currentAttemptId);
  const isPending = currentAttempt && currentAttempt.status === 'pending';

  return (
    <div className="grammar-test-layout">

      {/* ─── STAGE 0: MAIN FOLDER LISTING (GRID VIEW) ─────────────────────────── */}
      {stage === 'list' && (
        <motion.div 
          className="gt-dashboard-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="gt-welcome-hero">
            <div className="hero-content">
              <span className="hero-badge">🎓 English Level Exam</span>
              <h2>Grammatika Kompleks Imtihonlari</h2>
              <p>
                Variantlar yordamida o'z bilimingizni professional darajada sinab ko'ring va natijalarni real vaqtda AI yordamida baholang.
              </p>
            </div>
            <div className="hero-decor-orbs">
              <div className="orb orb-1" />
              <div className="orb orb-2" />
            </div>
          </div>

          {/* Segmented Category Tabbar */}
          <div className="gt-category-tabs">
            <button 
              className={`gt-cat-tab ${examCategory === 'level' ? 'active' : ''}`}
              onClick={() => { setExamCategory('level'); playSound('correct'); }}
            >
              1-Level Exam
            </button>
            <button 
              className={`gt-cat-tab ${examCategory === 'ielts' ? 'active' : ''}`}
              onClick={() => { setExamCategory('ielts'); playSound('correct'); }}
            >
              2-IELTS Exam
            </button>
          </div>

          <div className="gt-dashboard-main-row">
            
            {/* Left side: Premium Folder Cards List & Exam History */}
            <div className="gt-folders-section">
              <h3 className="section-title">Papka to'plamlari</h3>
              
              <div className="gt-folders-grid-list">
                {examCategory === 'level' ? (
                  <motion.div 
                    className="gt-premium-folder-item"
                    whileHover={{ scale: 1.01, y: -4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      setStage('folder_detail');
                      playSound('correct');
                    }}
                  >
                    <div className="folder-tab" />
                    <div className="folder-body-card">
                      <div className="folder-icon-wrapper">
                        <Folder className="folder-icon-svg" />
                      </div>
                      <div className="folder-card-meta">
                        <h3>Imtihon 1.2</h3>
                        <p className="folder-meta-desc-desktop">Present Continuous, Articles, Numerals, Adverbs, Comparison</p>
                        
                        <div className="folder-footer-meta">
                          <span className="badge-meta">📑 5 ta variant</span>
                          <span className="badge-level">Intermediate</span>
                        </div>
                      </div>
                      <div className="folder-chevron">
                        <ChevronRight size={22} />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <motion.div 
                      className="gt-premium-folder-item ielts-folder"
                      whileHover={{ scale: 1.01, y: -4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setStage('folder_detail');
                        playSound('correct');
                      }}
                    >
                      <div className="folder-tab ielts" />
                      <div className="folder-body-card">
                        <div className="folder-icon-wrapper ielts">
                          <Folder className="folder-icon-svg ielts" />
                        </div>
                        <div className="folder-card-meta">
                          <h3>IELTS Academic Grammar</h3>
                          <p className="folder-meta-desc-desktop">Academic style, passive reporting, describing trends, concession linkers</p>
                          
                          <div className="folder-footer-meta">
                            <span className="badge-meta ielts">📑 2 ta variant</span>
                            <span className="badge-level ielts">C1 Advanced</span>
                          </div>
                        </div>
                        <div className="folder-chevron">
                          <ChevronRight size={22} />
                        </div>
                      </div>
                    </motion.div>

                    {/* IELTS Full Mock Test Simulation Card */}
                    <motion.div 
                      className="gt-premium-folder-item ielts-folder full-mock-card"
                      whileHover={{ scale: 1.01, y: -4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        navigate('/ielts-exam');
                        playSound('correct');
                      }}
                    >
                      <div className="folder-tab ielts" style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }} />
                      <div className="folder-body-card" style={{ borderLeftColor: '#ef4444' }}>
                        <div className="folder-icon-wrapper ielts" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                          <Award className="folder-icon-svg" />
                        </div>
                        <div className="folder-card-meta">
                          <h3>IELTS Full Mock Test</h3>
                          <p className="folder-meta-desc-desktop">Listening, Reading, Writing, Speaking simulation. Grade and get your overall band score.</p>
                          
                          <div className="folder-footer-meta">
                            <span className="badge-meta ielts" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>📋 4 bo'lim</span>
                            <span className="badge-level ielts" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>Official Standard</span>
                          </div>
                        </div>
                        <div className="folder-chevron">
                          <ChevronRight size={22} />
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Urinishlar Tarixi (Attempts History) */}
              <div className="gt-history-section" style={{ marginTop: '40px' }}>
                <h3 className="section-title">Imtihonlar Tarixi {user && <span style={{ fontSize: '0.8rem', textTransform: 'none', color: '#10B981', marginLeft: '6px' }}>☁️ Cloud Synced</span>}</h3>
                {attempts.length === 0 ? (
                  <div className="gt-empty-history">
                    <p>Hozircha topshirilgan imtihonlar tarixi mavjud emas.</p>
                  </div>
                ) : (
                  <div className="gt-history-list">
                    {attempts.map((att) => (
                      <div 
                        key={att.id} 
                        className="gt-history-item"
                        onClick={() => handleViewAttempt(att)}
                      >
                        <div className="history-meta">
                          <span className={`history-badge-letter ${att.testId.startsWith('ielts_') ? 'ielts' : ''}`}>
                            {getVariantLetter(att.testId)}
                          </span>
                          <div className="history-info">
                            <h4>{att.testTitle}</h4>
                            <span className="date-span">📅 {formatDate(att.takenAt)}</span>
                          </div>
                        </div>
                        
                        <div className="history-stats">
                          <div className="score-badge-wrap">
                            <span className={`score-percent-badge ${att.status === 'pending' ? 'retry' : att.score >= 90 ? 'excellent' : att.score >= 70 ? 'good' : att.score >= 50 ? 'satisfactory' : 'retry'}`}>
                              {att.score}% {att.status === 'pending' && '⏳'}
                            </span>
                            <span className="score-details">{att.totalScore} / {att.totalQuestions} ball</span>
                          </div>
                          <span className="time-badge">⏱️ {Math.round(att.timeSpent / 60)} daq</span>
                          
                          <div className="history-actions">
                            {att.status === 'pending' && (
                              <button 
                                className={`btn btn-primary compact btn-retry-history ${isRetryingAttemptId === att.id ? 'loading' : ''}`}
                                onClick={(e) => handleRetryGrading(att, e)}
                                disabled={isRetryingAttemptId === att.id}
                              >
                                {isRetryingAttemptId === att.id ? 'Tekshirilmoqda...' : '🔄 Tekshirish'}
                              </button>
                            )}
                            <button 
                              className="btn btn-secondary compact btn-view-history"
                              onClick={() => handleViewAttempt(att)}
                            >
                              Ko'rish
                            </button>
                            <button 
                              className="btn-delete-history"
                              onClick={(e) => handleDeleteAttempt(att.id, e)}
                              title="O'chirish"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Personal Performance / Stats card */}
            <div className="gt-stats-section">
              <h3 className="section-title">Sizning ko'rsatkichlaringiz</h3>
              
              <div className="gt-stats-glass-card">
                <div className="stat-circle-row">
                  <div className="stat-circle-box">
                    <span className="number">{stats.totalTaken} / {EXAMS_LIST.length + IELTS_EXAMS_LIST.length}</span>
                    <span className="label">Topshirildi</span>
                  </div>
                  <div className="stat-circle-box primary">
                    <span className="number">{stats.avgScore}%</span>
                    <span className="label">O'rtacha Ball</span>
                  </div>
                </div>

                <div className="stat-list-items">
                  <div className="stat-list-row">
                    <div className="icon-wrap"><Award size={18} /></div>
                    <div className="text-wrap">
                      <h4>Sinfingiz</h4>
                      <p>Sizning joriy reytingingiz: Boshlang'ich</p>
                    </div>
                  </div>
                  <div className="stat-list-row">
                    <div className="icon-wrap"><TrendingUp size={18} /></div>
                    <div className="text-wrap">
                      <h4>Progress faollik</h4>
                      <p>O'tgan haftaga nisbatan yuqori sur'at</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}

      {/* ─── STAGE 0.5: FOLDER DETAILS GRID (INSIDE VIEW) ────────────────────── */}
      {stage === 'folder_detail' && (
        <motion.div 
          className="gt-list-container"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Header with back navigation */}
          <div className="gt-list-header-nav">
            <button className="gt-back-arrow-btn" onClick={() => setStage('list')}>
              <ArrowLeft size={18} /> Orqaga
            </button>
            <div className="header-nav-title-group">
              <div className="breadcrumbs">Bosh sahifa &gt; Imtihonlar &gt; {examCategory === 'level' ? 'Imtihon 1.2' : 'IELTS Academic'}</div>
              <h2>📁 {examCategory === 'level' ? 'Imtihon 1.2 Variantlari' : 'IELTS Academic Variantlari'}</h2>
              <p>Mavjud test variantlaridan birini tanlang va bilimingizni sinab ko'ring.</p>
            </div>
          </div>

          {/* Variants Grid */}
          <div className="gt-variants-inside-grid">
            {(examCategory === 'level' ? EXAMS_LIST : IELTS_EXAMS_LIST).map((exam, index) => {
              const bestScore = highScores[exam.id];
              const isPassed = bestScore !== undefined;
              const letter = String.fromCharCode(65 + index);
              
              return (
                <motion.div 
                  key={exam.id} 
                  className={`gt-variant-card-v2 ${isPassed ? 'passed' : ''} ${examCategory === 'ielts' ? 'ielts' : ''}`}
                  whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(99, 102, 241, 0.12)' }}
                >
                  {/* Left Side Icon for Mobile / Visual touch */}
                  <div className={`v2-letter-avatar ${examCategory === 'ielts' ? 'ielts' : ''}`}>
                    {letter}
                  </div>

                  <div className="v2-card-header">
                    <span className={`v2-badge ${examCategory === 'ielts' ? 'ielts' : ''}`}>Variant {letter}</span>
                    <div className="v2-score-badge">
                      {isPassed ? (
                        <span className="score-achieved-pill">
                          <CheckCircle size={12} /> {bestScore}%
                        </span>
                      ) : (
                        <span className="score-pending-pill">Topshirilmagan</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="v2-card-body">
                    <h4>{exam.title}</h4>
                    <p className="v2-desc">
                      {exam.description}
                    </p>

                    <div className="v2-mobile-status">
                      {isPassed ? (
                        <span className="m-score-val">✅ Eng yaxshi natija: <strong>{bestScore}%</strong></span>
                      ) : (
                        <span className="m-score-pending">⏳ Topshirilmagan</span>
                      )}
                    </div>

                    <div className="v2-features-list">
                      <span>⏱️ 30 daqiqa</span>
                      <span>🧠 AI baholash</span>
                      <span>📝 {exam.sections?.length} ta bo'lim</span>
                    </div>
                  </div>

                  <button 
                    className={`btn ${isPassed ? 'btn-secondary' : 'btn-primary'} v2-start-btn`}
                    onClick={() => handleStartVariant(exam)}
                  >
                    <span className="btn-text-desktop">Variantni Boshlash 🚀</span>
                    <span className="btn-text-mobile">Boshlash</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ─── STAGE 1: INTRO WELCOME PANEL ────────────────────────────────────── */}
      {stage === 'intro' && (
        <motion.div
          className="gt-card gt-intro-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="gt-badge">🏆 {activeTest?.title}</div>
          <h1>English Grammar Complex Test</h1>
          <p className="gt-subtitle">
            Bu test sizning quyidagi mavzulardagi bilimingizni har tomonlama tekshiradi:
          </p>
          <div className="gt-topics-grid">
            {examCategory === 'level' ? (
              <>
                <span>🔹 Present Continuous</span>
                <span>🔹 Articles (a, an, the)</span>
                <span>🔹 Numerals</span>
                <span>🔹 Adverbs</span>
                <span>🔹 As ... as comparison</span>
                <span>🔹 Degrees of adjectives</span>
                <span>🔹 Irregular adjectives</span>
              </>
            ) : (
              <>
                <span>🔹 Academic Passive Voice</span>
                <span>🔹 Complex Concession Linkers</span>
                <span>🔹 Graph Describing Vocabulary</span>
                <span>🔹 Academic Report Transformations</span>
                <span>🔹 Advanced Relative Clauses</span>
                <span>🔹 Subject-Verb Agreement (Inversion)</span>
                <span>🔹 Participle Clauses</span>
              </>
            )}
          </div>

          <div className="gt-alert-info">
            ⏱️ <strong>Vaqt limiti:</strong> 30 daqiqa. Javoblarni yozib tugatgach, "Testni topshirish" ni bosing.
          </div>

          {/* Local LM Studio Config Box */}
          <div className="gt-lm-config">
            <h3>🤖 AI baholash tizimi sozlamalari</h3>
            <p>
              Tarjimalar va ochiq yozma mashqlarni AI tekshirishi uchun local kompyuteringizda <strong>LM Studio</strong> serverini yoqing.
            </p>
            <div className="gt-config-inputs">
              <input
                type="text"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="http://localhost:1234/v1"
              />
              <button
                onClick={handleCheckConnection}
                disabled={isApiChecking}
                className="btn btn-secondary compact"
              >
                {isApiChecking ? 'Ulanmoqda...' : 'Ulanishni tekshirish'}
              </button>
            </div>
            
            {apiStatus.checked && (
              <div className={`gt-api-status ${apiStatus.connected ? 'success' : 'fail'}`}>
                {apiStatus.connected ? (
                  <span>✅ Ulandi! Model: <strong>{apiModel}</strong></span>
                ) : (
                  <span>❌ {apiStatus.error} (Yoziladigan javoblar buffering orqali keyinroq tekshirish uchun saqlanadi)</span>
                )}
              </div>
            )}
          </div>

          <div className="gt-intro-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/grammar-test')}>
              ← Ro'yxatga qaytish
            </button>
            <button className="btn btn-primary" onClick={() => setStage('testing')}>
              Testni boshlash 🚀
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── STAGE 2: THE ACTIVE TEST ─────────────────────────────────────────── */}
      {stage === 'testing' && (
        <div className="gt-testing-grid">
          {/* Left panel: Side Section Navigation */}
          <div className="gt-nav-sidebar">
            <div className="gt-timer-box">
              <span className="timer-icon">⏳</span>
              <span className="timer-val">{formatTime(timeLeft)}</span>
              <div className="timer-progress-bg">
                <div 
                  className={`timer-progress-fill ${timeLeft < 180 ? 'critical' : timeLeft < 600 ? 'warning' : ''}`}
                  style={{ width: `${(timeLeft / (30 * 60)) * 100}%` }}
                />
              </div>
            </div>

            <div className="gt-sections-list">
              {sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  className={`gt-sec-nav-btn ${activeSectionIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveSectionIdx(idx)}
                >
                  <span className="sec-num">{idx + 1}</span>
                  <span className="sec-title">{sec.title.split('. ')[1] || sec.title}</span>
                </button>
              ))}
            </div>

            <button className="btn btn-danger gt-submit-btn" onClick={() => handleSubmitTest(false)}>
              Testni topshirish 📥
            </button>
          </div>

          {/* Right panel: Active Section Questions Area */}
          <div className="gt-questions-panel">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="gt-section-content"
            >
              <div className="gt-section-header">
                <h2>{activeSection.title}</h2>
                <p className="section-desc">{activeSection.description}</p>
              </div>

              {/* SECTION: Correct the Mistakes */}
              {activeSection.id === 'mistakes' && (
                <div className="gt-questions-list">
                  {activeSection.questions.map((q) => {
                    const key = `mistakes_${q.id}`;
                    return (
                      <div key={q.id} className="gt-question-box mistake-box">
                        <div className="q-badge">Gap #{q.id}</div>
                        <div className="q-sentence wrong-sentence">❌ {q.original}</div>
                        <input
                          type="text"
                          className="gt-input-text"
                          placeholder="Gapni to'g'ri yozing..."
                          value={answers[key] || ''}
                          onChange={(e) => handleTextChange('mistakes', q.id, e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SECTION: Fill in the Gaps */}
              {activeSection.id === 'gaps' && (
                <div className="gt-questions-list">
                  {activeSection.questions.map((q) => {
                    const key = `gaps_${q.id}`;
                    return (
                      <div key={q.id} className="gt-question-box gap-box">
                        <div className="q-badge">Savol #{q.id}</div>
                        <div className="q-sentence">{q.text}</div>
                        
                        {q.type === 'choice' ? (
                          <div className="gt-options-row">
                            {q.options.map((opt) => (
                              <button
                                key={opt}
                                className={`gt-opt-select-btn ${answers[key] === opt ? 'active' : ''}`}
                                onClick={() => handleChoiceSelect('gaps', q.id, opt)}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <input
                            type="text"
                            className="gt-input-text clean-width"
                            placeholder="Bo'shliqni to'ldiring..."
                            value={answers[key] || ''}
                            onChange={(e) => handleTextChange('gaps', q.id, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SECTION: Translate Test */}
              {activeSection.id === 'translate' && (
                <div className="gt-questions-list">
                  {activeSection.questions.map((q) => {
                    const key = `translate_${q.id}`;
                    return (
                      <div key={q.id} className="gt-question-box translate-box">
                        <div className="q-badge">Gap #{q.id}</div>
                        <div className="q-sentence uz-sentence">🇺🇿 {q.uzbek}</div>
                        <textarea
                          className="gt-textarea"
                          rows={2}
                          placeholder="Inglizcha tarjimasini yozing..."
                          value={answers[key] || ''}
                          onChange={(e) => handleTextChange('translate', q.id, e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SECTION: Reorder words */}
              {activeSection.id === 'reorder' && (
                <div className="gt-questions-list">
                  {activeSection.questions.map((q) => {
                    const key = `reorder_${q.id}`;
                    const selectedList = reorderSelections[key] || [];
                    
                    return (
                      <div key={q.id} className="gt-question-box reorder-box">
                        <div className="q-badge">Gap #{q.id}</div>
                        
                        {/* Word Tiles to select */}
                        <div className="gt-scrambled-pool">
                          {q.scrambled.map((word, wIdx) => {
                            const isSelected = selectedList.includes(word);
                            return (
                              <button
                                key={wIdx}
                                disabled={isSelected}
                                className={`gt-word-tile ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleReorderClickWord(key, word, q.scrambled)}
                              >
                                {word}
                              </button>
                            );
                          })}
                        </div>

                        {/* Assembled sentence area */}
                        <div className="gt-assembled-area">
                          {selectedList.length > 0 ? (
                            <div className="assembled-words-row">
                              {selectedList.map((word, sIdx) => (
                                <span 
                                  key={sIdx} 
                                  className="gt-word-bubble"
                                  onClick={() => handleReorderClickWord(key, word, q.scrambled)}
                                  title="Olib tashlash uchun bosing"
                                >
                                  {word}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="reorder-placeholder">Tepadagi so'zlarni bosib tartib bilan to'plang</span>
                          )}
                          
                          {selectedList.length > 0 && (
                            <button className="gt-clear-reorder" onClick={() => handleReorderClear(key)}>
                              🔄 Tozalash
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SECTION: Open grammar production */}
              {activeSection.id === 'production' && (
                <div className="gt-questions-list">
                  {activeSection.questions.map((q) => {
                    const key = `production_${q.id}`;
                    return (
                      <div key={q.id} className="gt-question-box production-box">
                        <div className="q-badge">Mashq #{q.id}</div>
                        <div className="q-sentence">✍️ {q.prompt}</div>
                        <textarea
                          className="gt-textarea"
                          rows={3}
                          placeholder="O'zingiz inglizcha gap yozing..."
                          value={answers[key] || ''}
                          onChange={(e) => handleTextChange('production', q.id, e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SECTION: -ing / -ed adjectives */}
              {activeSection.id === 'inged' && (
                <div className="gt-questions-list">
                  {activeSection.questions.map((q) => {
                    const key = `inged_${q.id}`;
                    return (
                      <div key={q.id} className="gt-question-box choice-only-box">
                        <div className="q-badge">Savol #{q.id}</div>
                        <div className="q-sentence">{q.text}</div>
                        <div className="gt-options-row">
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              className={`gt-opt-select-btn ${answers[key] === opt ? 'active' : ''}`}
                              onClick={() => handleChoiceSelect('inged', q.id, opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* SECTION: Reading Passage & Comprehension */}
              {activeSection.id === 'reading' && (
                <div className="gt-reading-section-grid">
                  <div className="gt-reading-passage-card">
                    <h3>Matn (Reading Passage)</h3>
                    <p>{activeSection.passage}</p>
                  </div>
                  
                  <div className="gt-questions-list">
                    {activeSection.questions.map((q) => {
                      const key = `reading_${q.id}`;
                      return (
                        <div key={q.id} className="gt-question-box reading-question-box">
                          <div className="q-badge">Savol #{q.id}</div>
                          <div className="q-sentence">❓ {q.question}</div>
                          <input
                            type="text"
                            className="gt-input-text"
                            placeholder="Qisqa javobni yozing..."
                            value={answers[key] || ''}
                            onChange={(e) => handleTextChange('reading', q.id, e.target.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="gt-navigation-row">
                <button
                  disabled={activeSectionIdx === 0}
                  className="btn btn-secondary"
                  onClick={() => setActiveSectionIdx(prev => prev - 1)}
                >
                  ← Oldingisi
                </button>

                {activeSectionIdx + 1 < sections.length ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveSectionIdx(prev => prev + 1)}
                  >
                    Keyingisi →
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSubmitTest(false)}
                  >
                    Testni topshirish 📥
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* ─── STAGE 3: AI EVALUATION LOADING SCREEN ──────────────────────────────── */}
      {stage === 'evaluating' && (
        <motion.div
          className="gt-card gt-evaluating-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="loading-spinner" />
          <h2>AI javoblaringizni tekshirmoqda...</h2>
          <p>
            LM Studio yordamida yozma tarjima va matn savollarining grammatikasi va ma'nosi baholanmoqda.
          </p>
          <span className="loading-sub-info">Iltimos kuting, bu biroz vaqt olishi mumkin.</span>
        </motion.div>
      )}

      {/* ─── STAGE 5: RESULTS SCOREBOARD SCREEN (REDESIGNED V2) ────────────────── */}
      {stage === 'results' && (() => {
        const statsObj = getScoreSummary();
        const rating = getRatingLabel(statsObj.percent);
        
        return (
          <motion.div
            className="gt-results-dashboard-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header section with Trophy card & primary metrics */}
            <div className="gt-results-hero">
              <div className="results-hero-left">
                <span className="res-hero-badge">📊 {viewingPastAttempt ? "Urinish Tafsilotlari" : "Imtihon Yakunlandi"}</span>
                <h2>{rating.title}</h2>
                <p>Natijalaringiz tahlili va to'g'rilik ko'rsatkichi bilan tanishing.</p>
              </div>
              
              {/* Radial Circle score metric */}
              <div className="results-radial-score-box">
                <div className="radial-inner">
                  <span className="big-percent">{statsObj.percent}%</span>
                  <span className="lbl">To'g'rilik</span>
                </div>
              </div>
            </div>

            {/* Warning if attempt has pending evaluations */}
            {isPending && (
              <div className="gt-pending-alert-box">
                <div className="alert-text">
                  <span>⚠️ <strong>Tekshirilmagan yozma javoblar mavjud!</strong></span>
                  <p>LM Studio serveri o'chirilgan yoki ulanishda xatolik bo'lgani sababli, ayrim yozma javoblar baholanmay qoldi.</p>
                </div>
                <button 
                  className={`btn btn-primary compact btn-retry-eval ${isRetryingAttemptId === currentAttemptId ? 'loading' : ''}`}
                  onClick={(e) => handleRetryGrading(currentAttempt, e)}
                  disabled={isRetryingAttemptId === currentAttemptId}
                >
                  {isRetryingAttemptId === currentAttemptId ? 'Tekshirilmoqda...' : '🔄 Hozir qayta tekshirish'}
                </button>
              </div>
            )}

            {/* Metrics cards grid */}
            <div className="results-metrics-grid">
              {/* Correct answers summary card */}
              <div className="res-metric-card">
                <span className="lbl">To'g'ri javoblar</span>
                <div className="val-row">
                  <span className="big-val">{statsObj.correctCount}</span>
                  <span className="slash-val">/ {statsObj.total} ta savol</span>
                </div>
                <div className="score-breakdown-row">
                  <span className="br-item green">🟢 {statsObj.correctCount} to'liq</span>
                  {statsObj.partialCount > 0 && (
                    <span className="br-item orange">🟡 {statsObj.partialCount} qisman</span>
                  )}
                  <span className="br-item red">🔴 {statsObj.wrongCount} xato</span>
                  {statsObj.pendingCount > 0 && (
                    <span className="br-item orange">⏳ {statsObj.pendingCount} kutilmoqda</span>
                  )}
                </div>
                <p className="desc-meta">Jami to'plangan ball: <strong>{statsObj.score} ball</strong></p>
              </div>

              {/* Time Spent card */}
              <div className="res-metric-card">
                <span className="lbl">Sarflangan Vaqt</span>
                <div className="val-row">
                  <Clock className="time-icon-svg" />
                  <span className="time-val-text">{formatTimeSpent(timeSpent)}</span>
                </div>
                <p className="desc-meta">30 daqiqa umumiy limit berilgan edi.</p>
              </div>

              {/* Rating level card */}
              <div className="res-metric-card">
                <span className="lbl">Natija reytingi</span>
                <div className={`rating-indicator-text ${rating.className}`}>
                  {statsObj.percent >= 70 ? 'Muvaffaqiyatli! 🎉' : 'Ko\'proq takrorlang! 📚'}
                </div>
                <p className="desc-meta">Intermediate saviyasidagi natija darajasi.</p>
              </div>
            </div>

            {/* Interactive Section Inspector Tabs */}
            <div className="results-inspector-container">
              <h3>Bo'limlar bo'yicha batafsil hisobot:</h3>
              <p className="inspector-desc-sub">Topshiriqlarni ustiga bosib, har bir savol bo'yicha xato va izohlarni ko'rib chiqing.</p>

              {/* Horizontal Tabs row */}
              <div className="results-tabs-scroller">
                {sections.map((sec, idx) => {
                  let secTotal = 0;
                  let secCorrect = 0;
                  let secPending = 0;
                  sec.questions.forEach(q => {
                    secTotal++;
                    const g = grades[`${sec.id}_${q.id}`];
                    if (g) {
                      if (g.score === null || g.pending) {
                        secPending++;
                      } else {
                        secCorrect += g.score;
                      }
                    }
                  });
                  const isCurrent = activeResultSecIdx === idx;
                  
                  return (
                    <button
                      key={sec.id}
                      className={`res-sec-tab-btn ${isCurrent ? 'active' : ''}`}
                      onClick={() => setActiveResultSecIdx(idx)}
                    >
                      <span className="num-badge">{idx + 1}</span>
                      <span className="title">{sec.title.split('. ')[1] || sec.title}</span>
                      <span className="score">
                        ({secCorrect.toFixed(1)}{secPending > 0 ? ` + ${secPending}⏳` : ''}/{secTotal})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Section Details display */}
              <div className="selected-section-details-panel">
                <motion.div
                  key={activeResultSecIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sec-questions-details-list"
                >
                  <h4 className="detail-section-title-label">
                    {sections[activeResultSecIdx]?.title} — Savollar hisoboti
                  </h4>

                  <div className="detail-questions-scroll-area">
                    {sections[activeResultSecIdx]?.questions.map((q) => {
                      const key = `${sections[activeResultSecIdx].id}_${q.id}`;
                      const userVal = answers[key] || '';
                      const gradeObj = grades[key] || { score: 0, feedback: '', pending: false };
                      
                      const isPendingItem = gradeObj.score === null || gradeObj.pending;
                      const isCorrect = !isPendingItem && gradeObj.score >= 0.9;
                      const isPartial = !isPendingItem && gradeObj.score > 0.1 && gradeObj.score < 0.9;

                      let statusClass = 'wrong';
                      let StatusIcon = XCircle;
                      if (isPendingItem) {
                        statusClass = 'pending-item';
                        StatusIcon = Clock;
                      } else if (isCorrect) {
                        statusClass = 'correct';
                        StatusIcon = CheckCircle2;
                      } else if (isPartial) {
                        statusClass = 'partial';
                        StatusIcon = AlertCircle;
                      }

                      return (
                        <div key={q.id} className={`gt-result-detail-card-item ${statusClass}`}>
                          <div className="card-item-header">
                            <span className="question-number">Savol #{q.id} ({q.topic})</span>
                            <span className="score-label-pill">
                              {isPendingItem ? '⏳ Tekshirilmagan' : `${gradeObj.score.toFixed(1)} ball`}
                            </span>
                          </div>

                          {/* Specific rendering per question type */}
                          <div className="card-item-body">
                            {/* Correct mistakes specific */}
                            {sections[activeResultSecIdx].id === 'mistakes' && (
                              <div className="detail-texts-block">
                                <div className="txt-line wrong"><strong>Original xato gap:</strong> ❌ {q.original}</div>
                                <div className="txt-line user"><strong>Sizning javobingiz:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                                {!isCorrect && !isPendingItem && <div className="txt-line ref"><strong>Namunaviy shakli:</strong> "{q.reference}"</div>}
                              </div>
                            )}

                            {/* Gaps specific */}
                            {sections[activeResultSecIdx].id === 'gaps' && (
                              <div className="detail-texts-block">
                                <div className="txt-line"><strong>Savol:</strong> {q.text}</div>
                                <div className="txt-line user"><strong>Sizning javobingiz:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                                {!isCorrect && !isPendingItem && <div className="txt-line ref"><strong>Kutilgan to'g'ri javob:</strong> "{q.correct}"</div>}
                              </div>
                            )}

                            {/* Translate specific */}
                            {sections[activeResultSecIdx].id === 'translate' && (
                              <div className="detail-texts-block">
                                <div className="txt-line uz"><strong>O'zbekcha gap:</strong> 🇺🇿 {q.uzbek}</div>
                                <div className="txt-line user"><strong>Sizning tarjimangiz:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                                {!isPendingItem && <div className="txt-line ref"><strong>Namunaviy to'g'ri variant:</strong> "{q.reference}"</div>}
                              </div>
                            )}

                            {/* Reorder specific */}
                            {sections[activeResultSecIdx].id === 'reorder' && (
                              <div className="detail-texts-block">
                                <div className="txt-line scrambled"><strong>Aralash so'zlar:</strong> {q.scrambled.join(' / ')}</div>
                                <div className="txt-line user"><strong>Tuzgan gapingiz:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                                {!isCorrect && !isPendingItem && <div className="txt-line ref"><strong>Kutilgan:</strong> "{q.answer}"</div>}
                              </div>
                            )}

                            {/* Open production specific */}
                            {sections[activeResultSecIdx].id === 'production' && (
                              <div className="detail-texts-block">
                                <div className="txt-line prompt"><strong>Mashq talabi:</strong> {q.prompt}</div>
                                <div className="txt-line user"><strong>Siz yozgan gap:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                              </div>
                            )}

                            {/* ing/ed specific */}
                            {sections[activeResultSecIdx].id === 'inged' && (
                              <div className="detail-texts-block">
                                <div className="txt-line"><strong>Gap:</strong> {q.text}</div>
                                <div className="txt-line user"><strong>Sizning tanlovingiz:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                                {!isCorrect && !isPendingItem && <div className="txt-line ref"><strong>Kutilgan javob:</strong> "{q.correct}"</div>}
                              </div>
                            )}

                            {/* Reading specific */}
                            {sections[activeResultSecIdx].id === 'reading' && (
                              <div className="detail-texts-block">
                                <div className="txt-line question"><strong>Savol:</strong> ❓ {q.question}</div>
                                <div className="txt-line user"><strong>Sizning javobingiz:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                                {!isCorrect && !isPendingItem && <div className="txt-line ref"><strong>Javob kaliti:</strong> "{q.reference}"</div>}
                              </div>
                            )}

                            {/* Feedback comment if present */}
                            {gradeObj.feedback && (
                              <div className="q-feedback-comment">
                                <span className="comment-lbl">O'qituvchi taqrizi:</span>
                                <p className="comment-content">"{gradeObj.feedback}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Action buttons footer */}
            <div className="gt-results-actions-footer">
              <button 
                className="btn btn-secondary" 
                onClick={handleExitResults}
              >
                ← Variantlar ro'yxatiga qaytish
              </button>
              {!viewingPastAttempt && (
                <button 
                  className="btn btn-primary" 
                  onClick={handleRestartTest}
                >
                  🔄 Qayta topshirib ko'rish
                </button>
              )}
            </div>

          </motion.div>
        );
      })()}
    </div>
  );
}
