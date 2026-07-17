import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound, triggerVibration } from '../utils/feedback';
import { EXAMS_LIST } from '../data/examData';
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
  AlertCircle,
  Trash2,
  RefreshCw,
  Calendar,
  FileText,
  Brain,
  Cloud
} from 'lucide-react';
import IosSpinner from '../components/common/IosSpinner';
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

  // Admin and Notification States
  const [pendingAttempts, setPendingAttempts] = useState([]);
  const [adminJsonInput, setAdminJsonInput] = useState({});
  const [newlyGradedAttempt, setNewlyGradedAttempt] = useState(null);

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
        attemptsList.sort((a, b) => new Date(b.takenAt || 0) - new Date(a.takenAt || 0));

        // Check for newly graded attempts not yet shown to user
        const newlyGraded = attemptsList.find(
          a => a.status === 'completed' && a.notified === false
        );
        if (newlyGraded) {
          setNewlyGradedAttempt(newlyGraded);
        }

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

  // Load pending attempts for admin
  useEffect(() => {
    if (user && user.email === 'azimjonxolmirzayev30@gmail.com') {
      const pendingRef = ref(db, 'grammar_pending_attempts');
      const unsubscribe = onValue(pendingRef, (snapshot) => {
        const val = snapshot.val() || {};
        const list = Object.keys(val).map(k => ({ id: k, ...val[k] }));
        list.sort((a, b) => new Date(b.takenAt || 0) - new Date(a.takenAt || 0));
        setPendingAttempts(list);
      });
      return () => unsubscribe();
    } else {
      setPendingAttempts([]);
    }
  }, [user]);

  // Recalculate stats and high scores whenever attempts state changes
  useEffect(() => {
    const scores = {};
    const ALL_EXAMS = EXAMS_LIST;

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
      const ALL_EXAMS = EXAMS_LIST;
      const foundExam = ALL_EXAMS.find(e => e.id === testId);
      if (foundExam) {
        setExamCategory('level');
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
  const handleSubmitTestRef = useRef(null);

  // Timer Effect
  useEffect(() => {
    if (stage === 'testing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage]);

  // Auto-submit on timeout. Kept out of the setTimeLeft updater: updaters must
  // stay pure — StrictMode double-invokes them, which would submit the attempt
  // twice (duplicate Firebase attempt + duplicate admin pending entry).
  useEffect(() => {
    if (stage === 'testing' && timeLeft === 0) {
      clearInterval(timerRef.current);
      handleSubmitTestRef.current(true);
    }
  }, [stage, timeLeft]);

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
    setTimeLeft(30 * 60);
    setActiveSectionIdx(0);
    navigate(`/grammar-test/run/${exam.id}`);
    playSound('correct');
  };

  const handleRestartTest = () => {
    setAnswers({});
    setReorderSelections({});
    setGrades({});
    setTimeLeft(30 * 60);
    setActiveSectionIdx(0);
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

  const handleReorderClickWord = (questionGlobalId, wordIndex, scrambledList) => {
    setReorderSelections((prev) => {
      const selected = prev[questionGlobalId] || [];
      const updated = selected.includes(wordIndex)
        ? selected.filter((i) => i !== wordIndex)
        : [...selected, wordIndex];
      setAnswers((ans) => ({ ...ans, [questionGlobalId]: updated.map((i) => scrambledList[i]).join(' ') }));
      return { ...prev, [questionGlobalId]: updated };
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

    // Mark all open-ended questions as pending (to be graded by teacher)
    const apiGrades = { ...tempGrades };
    writtenToEvaluate.forEach((item) => {
      if (item.answer === '') {
        apiGrades[item.key] = { score: 0.0, feedback: 'Bo\'sh qoldirilgan javob.', pending: false };
      } else {
        apiGrades[item.key] = { score: null, feedback: 'Tekshirilmoqda...', pending: true };
      }
    });

    setGrades(apiGrades);
    await finalizeScores(apiGrades, 'pending');
    setStage('submitted');
  };

  // Keep the timer's interval callback calling the latest handleSubmitTest closure
  // (the interval itself is only (re)created when `stage` changes, so without this
  // ref it would auto-submit using stale, empty `answers` from test start).
  useEffect(() => {
    handleSubmitTestRef.current = handleSubmitTest;
  });

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
      status: 'pending',
      notified: false
    };

    if (user) {
      try {
        const attemptsRef = ref(db, `users/${user.uid}/grammar/complex_attempts`);
        const newAttemptRef = push(attemptsRef);
        const attemptId = newAttemptRef.key;
        setCurrentAttemptId(attemptId);
        await set(newAttemptRef, attemptData);

        // Write to global admin pending node
        const pendingRef = ref(db, `grammar_pending_attempts/${attemptId}`);
        await set(pendingRef, {
          id: attemptId,
          userId: user.uid,
          studentEmail: user.email,
          studentName: user.displayName || user.email.split('@')[0],
          ...attemptData
        });
      } catch (err) {
        console.error("Failed to save attempt to Firebase:", err);
      }
    } else {
      const attemptId = `attempt_${Date.now()}`;
      setCurrentAttemptId(attemptId);
      const attempt = { id: attemptId, ...attemptData };
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
    const idx = EXAMS_LIST.findIndex(e => e.id === testId);
    return idx !== -1 ? String.fromCharCode(65 + idx) : '?';
  };

  // View a past attempt details
  const handleViewAttempt = (attempt) => {
    if (attempt.status === 'pending') {
      alert("Natijalar hali baholanmagan. O'qituvchi baholashini kuting!");
      return;
    }
    const ALL_EXAMS = EXAMS_LIST;
    const foundExam = ALL_EXAMS.find(e => e.id === attempt.testId);
    if (foundExam) {
      setActiveTest(foundExam);
      setSections(foundExam.sections);
      setAnswers(attempt.answers || {});
      setGrades(attempt.grades || {});
      setTimeSpent(attempt.timeSpent || 0);
      setCurrentAttemptId(attempt.id);
      setViewingPastAttempt(attempt.id);
      setStage('results');
      playSound('correct');
    }
  };

  // Copy AI grading prompt for admin
  const handleCopyPrompt = (attempt) => {
    const foundExam = EXAMS_LIST.find(e => e.id === attempt.testId);
    if (!foundExam) return;

    const questionsToGrade = [];
    foundExam.sections.forEach(sec => {
      sec.questions.forEach(q => {
        const key = `${sec.id}_${q.id}`;
        const gradeObj = attempt.grades ? attempt.grades[key] : null;
        if (gradeObj && (gradeObj.pending || gradeObj.score === null)) {
          questionsToGrade.push({
            key,
            section: sec.title,
            question: sec.id === 'translate'
              ? `Translate Uzbek: "${q.uzbek}" into English`
              : sec.id === 'mistakes'
                ? `Correct the mistake in: "${q.original}"`
                : (q.prompt || q.question),
            reference: q.reference || q.referencePattern || q.answer,
            studentAnswer: attempt.answers ? (attempt.answers[key] || '') : ''
          });
        }
      });
    });

    const promptObj = {
      attemptId: attempt.id,
      userId: attempt.userId,
      studentEmail: attempt.studentEmail,
      testTitle: attempt.testTitle,
      questionsToGrade
    };

    const exampleGrades = questionsToGrade
      .map(q => `    "${q.key}": { "score": 1.0, "feedback": "Comment here" }`)
      .join(',\n');

    const promptText =
`Siz ingliz tili o'qituvchisi va imtihon baholovchi AIsiz.
Quyidagi talabaning ingliz tili grammatikasi imtihonidagi ochiq yozma javoblarini namunaviy javoblar (reference) bilan solishtirib, har biriga 0.0 dan 1.0 gacha ball (score) va qisqa fikr-mulohaza (feedback) yozing.

Taqdim etilayotgan ma'lumotlar:
${JSON.stringify(promptObj, null, 2)}

Javobni FAQAT va FAQAT quyidagi JSON formatda qaytaring (hech qanday qo'shimcha matn yoki tushuntirishlarsiz):
{
  "attemptId": "${attempt.id}",
  "userId": "${attempt.userId}",
  "grades": {
${exampleGrades}
  }
}`;

    navigator.clipboard.writeText(promptText);
    alert("AI uchun prompt buferga nusxalandi! Uni ChatGPT / Gemini / Claude'ga tashlang.");
    playSound('correct');
  };

  // Submit AI-graded JSON result from admin panel
  const handleSubmitGrading = async (attempt) => {
    const rawText = adminJsonInput[attempt.id];
    if (!rawText) {
      alert("Iltimos, avval AI javobini (JSON) tashlang!");
      return;
    }

    try {
      const parsed = JSON.parse(rawText.trim());
      if (!parsed.grades || !parsed.attemptId) {
        alert("JSON formati noto'g'ri! 'attemptId' va 'grades' bo'lishi kerak.");
        return;
      }

      const updatedGrades = { ...(attempt.grades || {}) };
      Object.keys(parsed.grades).forEach(key => {
        if (updatedGrades[key]) {
          updatedGrades[key] = {
            score: parseFloat(parsed.grades[key].score),
            feedback: parsed.grades[key].feedback,
            pending: false
          };
        }
      });

      const foundExam = EXAMS_LIST.find(e => e.id === attempt.testId);
      if (!foundExam) throw new Error('Exam not found');

      let totalQuestions = 0;
      let totalScore = 0;
      foundExam.sections.forEach(s => {
        s.questions.forEach(q => {
          totalQuestions++;
          const g = updatedGrades[`${s.id}_${q.id}`];
          if (g && g.score !== null && !g.pending) totalScore += g.score;
        });
      });

      const percent = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

      // Update student's Firebase node
      const studentRef = ref(db, `users/${attempt.userId}/grammar/complex_attempts/${attempt.id}`);
      await set(studentRef, {
        ...attempt,
        score: percent,
        totalScore: totalScore.toFixed(1),
        grades: updatedGrades,
        status: 'completed',
        notified: false
      });

      // Remove from global admin pending node
      const pendingRef = ref(db, `grammar_pending_attempts/${attempt.id}`);
      await remove(pendingRef);

      setAdminJsonInput(prev => { const c = { ...prev }; delete c[attempt.id]; return c; });
      alert("Natijalar saqlandi va talabaga yuborildi!");
      playSound('victory');
    } catch (e) {
      console.error(e);
      alert("JSON tahlilida xatolik! AI to'g'ri JSON qaytarganini tekshiring.");
      playSound('wrong');
    }
  };

  // Student-side retry: re-run pending written answers through the local LM Studio endpoint
  const handleRetryGrading = async (attempt, e) => {
    if (e) e.stopPropagation();
    if (!attempt || isRetryingAttemptId) return;

    setIsRetryingAttemptId(attempt.id);
    try {
      const foundExam = EXAMS_LIST.find(ex => ex.id === attempt.testId);
      if (!foundExam) throw new Error('Exam not found');

      const updatedGrades = { ...(attempt.grades || {}) };
      const pendingEntries = [];
      foundExam.sections.forEach(s => {
        s.questions.forEach(q => {
          const key = `${s.id}_${q.id}`;
          const g = updatedGrades[key];
          if (g && g.pending) {
            pendingEntries.push({
              key,
              question: s.id === 'translate'
                ? `Translate Uzbek: "${q.uzbek}" into English`
                : s.id === 'mistakes'
                  ? `Correct the mistake in: "${q.original}"`
                  : (q.prompt || q.question),
              reference: q.reference || q.referencePattern || q.answer,
              answer: attempt.answers ? (attempt.answers[key] || '') : ''
            });
          }
        });
      });

      if (pendingEntries.length === 0) {
        setIsRetryingAttemptId(null);
        return;
      }

      let anyFailed = false;
      for (const item of pendingEntries) {
        try {
          const result = await evaluateWithLMStudio(item.question, item.reference, item.answer, apiModel);
          updatedGrades[item.key] = { score: result.score, feedback: result.feedback, pending: false };
        } catch (err) {
          console.error('LM Studio evaluation failed for', item.key, err);
          anyFailed = true;
        }
      }

      let totalQuestions = 0;
      let totalScore = 0;
      let stillPending = false;
      foundExam.sections.forEach(s => {
        s.questions.forEach(q => {
          totalQuestions++;
          const g = updatedGrades[`${s.id}_${q.id}`];
          if (g && g.score !== null && !g.pending) {
            totalScore += g.score;
          } else {
            stillPending = true;
          }
        });
      });
      const percent = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

      const updatedAttempt = {
        ...attempt,
        score: percent,
        totalScore: totalScore.toFixed(1),
        grades: updatedGrades,
        status: stillPending ? 'pending' : 'completed',
        notified: false
      };

      if (user) {
        const attemptRef = ref(db, `users/${user.uid}/grammar/complex_attempts/${attempt.id}`);
        await set(attemptRef, updatedAttempt);
        if (!stillPending) {
          await remove(ref(db, `grammar_pending_attempts/${attempt.id}`));
        }
      } else {
        const savedAttempts = localStorage.getItem('grammar_test_attempts');
        const attemptsList = savedAttempts ? JSON.parse(savedAttempts) : [];
        const idx = attemptsList.findIndex(a => a.id === attempt.id);
        if (idx !== -1) {
          attemptsList[idx] = updatedAttempt;
          localStorage.setItem('grammar_test_attempts', JSON.stringify(attemptsList));
          setAttempts(attemptsList);
        }
      }

      setGrades(updatedGrades);
      if (anyFailed || stillPending) {
        alert("LM Studio ulanmadi yoki ba'zi javoblarni baholay olmadi. Keyinroq qayta urinib ko'ring.");
        playSound('wrong');
      } else {
        playSound('victory');
      }
    } catch (err) {
      console.error('Retry grading failed:', err);
      alert("Qayta tekshirishda xatolik yuz berdi.");
      playSound('wrong');
    } finally {
      setIsRetryingAttemptId(null);
    }
  };

  // Dismiss the graded notification modal
  const handleDismissNotification = async (shouldView) => {
    if (!newlyGradedAttempt) return;
    const attemptCopy = { ...newlyGradedAttempt };
    setNewlyGradedAttempt(null);

    if (user) {
      try {
        const notifiedRef = ref(db, `users/${user.uid}/grammar/complex_attempts/${attemptCopy.id}/notified`);
        await set(notifiedRef, true);
      } catch (e) {
        console.error('Failed to mark attempt as notified:', e);
      }
    }

    if (shouldView) {
      handleViewAttempt(attemptCopy);
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
              <span className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Award size={12} /> English Level Exam</span>
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

          <div className="gt-dashboard-main-row">
            
            {/* Left side: Premium Folder Cards List & Exam History */}
            <div className="gt-folders-section">
              <h3 className="section-title">Papka to'plamlari</h3>
              
              <div className="gt-folders-grid-list">
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
                        <span className="badge-meta" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><FileText size={10} /> 5 ta variant</span>
                        <span className="badge-level">Intermediate</span>
                      </div>
                    </div>
                    <div className="folder-chevron">
                      <ChevronRight size={22} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Urinishlar Tarixi (Attempts History) */}
              <div className="gt-history-section" style={{ marginTop: '40px' }}>
                <h3 className="section-title">Imtihonlar Tarixi {user && <span style={{ fontSize: '0.8rem', textTransform: 'none', color: '#10B981', marginLeft: '6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Cloud size={13} /> Cloud Synced</span>}</h3>
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
                        <div className="history-main-content">
                          <span className={`history-badge-letter ${att.testId.startsWith('ielts_') ? 'ielts' : ''}`}>
                            {getVariantLetter(att.testId)}
                          </span>
                          <div className="history-info">
                            <h4>{att.testTitle}</h4>
                            <div className="history-subtitle">
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Calendar size={11} /> {formatDate(att.takenAt)}</span>
                              <span className="dot-divider">•</span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Clock size={11} /> {Math.round(att.timeSpent / 60)} daq</span>
                            </div>
                          </div>
                        </div>

                        <div className="history-right-content">
                          <div className="score-wrap-ios">
                            <span className={`score-percent-badge-ios ${att.status === 'pending' ? 'pending' : att.score >= 90 ? 'excellent' : att.score >= 70 ? 'good' : att.score >= 50 ? 'satisfactory' : 'fail'}`}>
                              {att.status === 'pending' ? 'Kutilmoqda' : `${att.score}%`}
                            </span>
                            {att.status !== 'pending' && (
                              <span className="score-details-ios">{att.totalScore}/{att.totalQuestions} ball</span>
                            )}
                          </div>

                          <div className="history-actions-ios" onClick={(e) => e.stopPropagation()}>
                            <button
                              className="btn-delete-history-ios"
                              onClick={(e) => handleDeleteAttempt(att.id, e)}
                              title="O'chirish"
                            >
                              <Trash2 size={14} />
                            </button>
                            <ChevronRight size={16} className="chevron-ios" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Stats + Admin Panel */}
            <div className="gt-stats-section">

              {/* Admin Panel - only for azimjonxolmirzayev30@gmail.com */}
              {user && user.email === 'azimjonxolmirzayev30@gmail.com' && (
                <div className="gt-admin-panel">
                  <h3 className="section-title admin-title">
                    <Sparkles size={14} />
                    {pendingAttempts.length > 0 && (
                      <span className="admin-badge-count">{pendingAttempts.length}</span>
                    )}
                  </h3>
                  <div className="gt-stats-glass-card">
                    {pendingAttempts.length === 0 ? (
                      <div className="admin-empty-state">
                        <CheckCircle2 size={24} className="admin-empty-icon" />
                        <p>Barcha imtihonlar baholangan</p>
                      </div>
                    ) : (
                      <div className="admin-pending-list">
                        {pendingAttempts.map(att => (
                          <div key={att.id} className="admin-pending-card">
                            <div className="admin-card-header">
                              <div className="admin-student-info">
                                <span className="admin-student-name">{att.studentName}</span>
                                <span className="admin-student-email">{att.studentEmail}</span>
                              </div>
                              <span className="history-badge-letter" style={{ width: '28px', height: '28px', fontSize: '0.7rem' }}>
                                {getVariantLetter(att.testId)}
                              </span>
                            </div>
                            <div className="admin-card-meta">
                              <Calendar size={10} /> {formatDate(att.takenAt)}
                              &nbsp;&nbsp;•&nbsp;&nbsp;
                              <Clock size={10} /> {Math.round((att.timeSpent || 0) / 60)} daq
                            </div>
                            <button
                              className="btn-admin-copy"
                              onClick={() => handleCopyPrompt(att)}
                            >
                              <Sparkles size={12} /> Prompt nusxalash
                            </button>
                            <textarea
                              className="admin-json-textarea"
                              placeholder='AI dan olingan JSON ni bu yerga tashlang...'
                              value={adminJsonInput[att.id] || ''}
                              onChange={(e) => setAdminJsonInput(prev => ({ ...prev, [att.id]: e.target.value }))}
                            />
                            <button
                              className="btn-admin-submit"
                              onClick={() => handleSubmitGrading(att)}
                            >
                              <CheckCircle2 size={12} /> Natijani saqlash
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <h3 className="section-title">Sizning ko'rsatkichlaringiz</h3>
              <div className="gt-stats-glass-card">
                <div className="stat-circle-row">
                  <div className="stat-circle-box">
                    <span className="number">{stats.totalTaken} / {EXAMS_LIST.length}</span>
                    <span className="label">Topshirildi</span>
                  </div>
                  <div className="stat-circle-box primary">
                    <span className="number">{stats.avgScore}%</span>
                    <span className="label">O'rtacha Ball</span>
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
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Folder size={22} /> Imtihon 1.2 Variantlari</h2>
            </div>
          </div>

          {/* Variants Grid */}
          <div className="gt-variants-inside-grid">
            {EXAMS_LIST.map((exam, index) => {
              const bestScore = highScores[exam.id];
              const isPassed = bestScore !== undefined;
              const letter = String.fromCharCode(65 + index);
              
              return (
                <motion.div 
                  key={exam.id} 
                  className={`gt-variant-card-v2 ${isPassed ? 'passed' : ''}`}
                  whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(99, 102, 241, 0.12)' }}
                >
                  {/* Left Side Icon for Mobile / Visual touch */}
                  <div className="v2-letter-avatar">
                    {letter}
                  </div>

                  <div className="v2-card-header">
                    <span className="v2-badge">Variant {letter}</span>
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
                        <span className="m-score-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={12} /> Eng yaxshi natija: <strong>{bestScore}%</strong></span>
                      ) : (
                        <span className="m-score-pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Topshirilmagan</span>
                      )}
                    </div>

                    <div className="v2-features-list">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Clock size={11} /> 30 daqiqa</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Brain size={11} /> AI baholash</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><FileText size={11} /> {exam.sections?.length} ta bo'lim</span>
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
          <div className="gt-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Award size={12} /> {activeTest?.title}
          </div>
          <h1>English Grammar Complex Test</h1>
          <p className="gt-subtitle">
            Bu test sizning quyidagi mavzulardagi bilimingizni har tomonlama tekshiradi:
          </p>
          <div className="gt-topics-grid">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronRight size={12} /> Present Continuous</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronRight size={12} /> Articles (a, an, the)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronRight size={12} /> Numerals</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronRight size={12} /> Adverbs</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronRight size={12} /> As ... as comparison</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronRight size={12} /> Degrees of adjectives</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronRight size={12} /> Irregular adjectives</span>
          </div>

          <div className="gt-alert-info" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Clock size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
            <span><strong>Vaqt limiti:</strong> 30 daqiqa. Javoblarni yozib tugatgach, "Testni topshirish" ni bosing.</span>
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

      {/* ─── STAGE: SUBMITTED (waiting for results) ──────────────────────────── */}
      {stage === 'submitted' && (
        <motion.div
          className="gt-submitted-screen"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="submitted-icon-ring">
            <div className="submitted-icon-pulse" />
            <CheckCircle2 size={48} className="submitted-check-icon" />
          </div>
          <h2>Imtihon topshirildi!</h2>
          <p className="submitted-subtitle">
            Javoblaringiz o'qituvchiga yuborildi. Baholanganidan so'ng natijangiz bu yerda ko'rinadi.
          </p>
          <div className="submitted-info-card">
            <div className="submitted-info-row">
              <span className="submitted-info-label">Variant:</span>
              <span className="submitted-info-value">{activeTest?.title}</span>
            </div>
            <div className="submitted-info-row">
              <span className="submitted-info-label">Vaqt:</span>
              <span className="submitted-info-value">{Math.round((30 * 60 - timeLeft) / 60)} daqiqa</span>
            </div>
            <div className="submitted-info-row">
              <span className="submitted-info-label">Holat:</span>
              <span className="submitted-status-pill">Baholanmoqda...</span>
            </div>
          </div>
          <button
            className="btn btn-secondary"
            onClick={() => { setStage('list'); navigate('/grammar-test'); }}
          >
            Bosh sahifaga qaytish
          </button>
        </motion.div>
      )}


      {/* ─── STAGE 2: THE ACTIVE TEST ─────────────────────────────────────────── */}
      {stage === 'testing' && (
        <div className="gt-testing-grid">
          {/* Left panel: Side Section Navigation */}
          <div className="gt-nav-sidebar">
            <div className="gt-timer-box">
              <span className="timer-icon" style={{ display: 'flex', alignItems: 'center' }}><Timer size={20} /></span>
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

            <button 
              className="btn btn-danger gt-submit-btn" 
              onClick={() => handleSubmitTest(false)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              Testni topshirish <CheckCircle size={14} />
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
                        <div className="q-sentence wrong-sentence" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <XCircle size={16} className="text-red" style={{ flexShrink: 0 }} /> {q.original}
                        </div>
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
                        <div className="q-sentence uz-sentence">Uzbek: {q.uzbek}</div>
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
                            const isSelected = selectedList.includes(wIdx);
                            return (
                              <button
                                key={wIdx}
                                disabled={isSelected}
                                className={`gt-word-tile ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleReorderClickWord(key, wIdx, q.scrambled)}
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
                              {selectedList.map((wIdx, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="gt-word-bubble"
                                  onClick={() => handleReorderClickWord(key, wIdx, q.scrambled)}
                                  title="Olib tashlash uchun bosing"
                                >
                                  {q.scrambled[wIdx]}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="reorder-placeholder">Tepadagi so'zlarni bosib tartib bilan to'plang</span>
                          )}
                          
                          {selectedList.length > 0 && (
                            <button className="gt-clear-reorder" onClick={() => handleReorderClear(key)}>
                              Tozalash
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
                        <div className="q-sentence">Write: {q.prompt}</div>
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
                          <div className="q-sentence">Question: {q.question}</div>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    Testni topshirish <CheckCircle size={14} />
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
          <IosSpinner size={36} />
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
                <span className="res-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Award size={13} /> {viewingPastAttempt ? "Urinish Tafsilotlari" : "Imtihon Yakunlandi"}</span>
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
                  {isRetryingAttemptId === currentAttemptId ? 'Tekshirilmoqda...' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><RefreshCw size={12} /> Hozir qayta tekshirish</span>}
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
                  <span className="br-item green" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><CheckCircle2 size={11} /> {statsObj.correctCount} to'liq</span>
                  {statsObj.partialCount > 0 && (
                    <span className="br-item orange" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><AlertCircle size={11} /> {statsObj.partialCount} qisman</span>
                  )}
                  <span className="br-item red" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><XCircle size={11} /> {statsObj.wrongCount} xato</span>
                  {statsObj.pendingCount > 0 && (
                    <span className="br-item orange" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Clock size={11} /> {statsObj.pendingCount} kutilmoqda</span>
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
                  {statsObj.percent >= 70 ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={16} /> Muvaffaqiyatli!</span> : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BookOpen size={16} /> Ko'proq takrorlang!</span>}
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
                        ({secCorrect.toFixed(1)}{secPending > 0 ? ` + ${secPending}` : ''}/{secTotal})
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
                      const userVal = (answers && answers[key]) || '';
                      const gradeObj = (grades && grades[key]) || { score: 0, feedback: '', pending: false };
                      
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
                              {isPendingItem ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={11} /> Tekshirilmagan</span> : `${gradeObj.score.toFixed(1)} ball`}
                            </span>
                          </div>

                          {/* Specific rendering per question type */}
                          <div className="card-item-body">
                            {/* Correct mistakes specific */}
                            {sections[activeResultSecIdx].id === 'mistakes' && (
                              <div className="detail-texts-block">
                                <div className="txt-line wrong" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><strong>Original xato gap:</strong> <XCircle size={14} style={{ flexShrink: 0 }} /> {q.original}</div>
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
                                <div className="txt-line uz"><strong>O'zbekcha gap:</strong> {q.uzbek}</div>
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
                                <div className="txt-line question"><strong>Savol:</strong> {q.question}</div>
                                <div className="txt-line user"><strong>Sizning javobingiz:</strong> "{userVal || <em>[Bo'sh]</em>}"</div>
                                {!isCorrect && !isPendingItem && <div className="txt-line ref"><strong>Javob kaliti:</strong> "{q.reference}"</div>}
                              </div>
                            )}

                            {/* Feedback comment if present */}
                            {gradeObj.feedback && (
                              <div className="q-feedback-comment">
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <RefreshCw size={14} /> Qayta topshirib ko'rish
                  </button>
              )}
            </div>

          </motion.div>
        );
      })()}

      {/* iOS NOTIFICATION MODAL: Newly Graded Attempt */}
      {newlyGradedAttempt && (
        <div className="gt-notif-overlay" onClick={() => handleDismissNotification(false)}>
          <motion.div
            className="gt-notif-modal"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gt-notif-icon-ring">
              <Award size={26} className="gt-notif-icon" />
            </div>
            <div className="gt-notif-body">
              <h3 className="gt-notif-title">Natijangiz tayyor! 🎉</h3>
              <p className="gt-notif-desc">
                <strong>{newlyGradedAttempt.testTitle}</strong> imtihoni baholandi.
                Natijangizni ko&apos;rishni xohlaysizmi?
              </p>
              <div className="gt-notif-score-row">
                <span className={`gt-notif-score-badge ${newlyGradedAttempt.score >= 90 ? 'excellent' : newlyGradedAttempt.score >= 70 ? 'good' : newlyGradedAttempt.score >= 50 ? 'satisfactory' : 'fail'}`}>
                  {newlyGradedAttempt.score}%
                </span>
                <span className="gt-notif-score-meta">{newlyGradedAttempt.totalScore} / {newlyGradedAttempt.totalQuestions} ball</span>
              </div>
            </div>
            <div className="gt-notif-actions">
              <button
                className="gt-notif-btn-primary"
                onClick={() => handleDismissNotification(true)}
              >
                Natijangizni ko&apos;rish
              </button>
              <button
                className="gt-notif-btn-secondary"
                onClick={() => handleDismissNotification(false)}
              >
                Keyinroq
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
