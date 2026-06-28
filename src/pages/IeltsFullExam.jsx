import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/feedback';
import { IELTS_FULL_EXAM } from '../data/ieltsFullExamData';
import { ref, set, push, onValue, update } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import {
  Headphones, BookOpen, PenTool, Mic, Play, Pause, Square,
  ChevronRight, ArrowLeft, Timer, CheckCircle, Clock, Award,
  BarChart3, Send, Volume2, AlertCircle, Loader2, Home, RotateCcw
} from 'lucide-react';
import './IeltsFullExam.css';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════
const SECTIONS = ['listening', 'reading', 'writing', 'speaking'];
const SECTION_CONFIG = {
  listening: { label: 'Listening', icon: '🎧', time: 30 * 60, color: '#3b82f6', questions: 40 },
  reading:   { label: 'Reading',   icon: '📖', time: 60 * 60, color: '#10b981', questions: 40 },
  writing:   { label: 'Writing',   icon: '✍️', time: 60 * 60, color: '#f59e0b', questions: 2 },
  speaking:  { label: 'Speaking',  icon: '🎤', time: 14 * 60, color: '#8b5cf6', questions: 0 },
};

const SESSION_KEY = 'ielts_exam_session';

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
const fmtTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

const countWords = (text) => {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
};

const rawToBand = (raw, total) => {
  const pct = (raw / Math.max(total, 1)) * 100;
  if (pct >= 95) return 9.0;
  if (pct >= 87) return 8.5;
  if (pct >= 80) return 8.0;
  if (pct >= 72) return 7.5;
  if (pct >= 65) return 7.0;
  if (pct >= 57) return 6.5;
  if (pct >= 50) return 6.0;
  if (pct >= 42) return 5.5;
  if (pct >= 35) return 5.0;
  if (pct >= 27) return 4.5;
  if (pct >= 20) return 4.0;
  if (pct >= 15) return 3.5;
  if (pct >= 10) return 3.0;
  return 2.5;
};

// ═══════════════════════════════════════════════════════════════════════════════
// BAR CHART SVG COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function BarChartSVG({ chartData }) {
  if (!chartData) return null;
  const { categories, series, yAxisLabel, xAxisLabel } = chartData;
  const W = 520, H = 300, pad = { top: 30, right: 20, bottom: 60, left: 50 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...series.flatMap(s => s.values));
  const barGroupW = plotW / categories.length;
  const barW = barGroupW / (series.length + 1);
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ielts-chart-svg">
      <text x="14" y={pad.top + plotH / 2} textAnchor="middle" fontSize="10" fill="var(--text-muted)" transform={`rotate(-90, 14, ${pad.top + plotH / 2})`}>{yAxisLabel}</text>
      {[0, 25, 50, 75, 100].map(v => {
        const y = pad.top + plotH - (v / maxVal) * plotH;
        return (
          <g key={v}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="var(--border)" strokeDasharray="3,3" />
            <text x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="9" fill="var(--text-muted)">{v}</text>
          </g>
        );
      })}
      {categories.map((cat, ci) => {
        const groupX = pad.left + ci * barGroupW;
        return (
          <g key={cat}>
            {series.map((s, si) => {
              const val = s.values[ci];
              const barH = (val / maxVal) * plotH;
              const x = groupX + (si + 0.5) * barW;
              const y = pad.top + plotH - barH;
              return (
                <g key={si}>
                  <rect x={x} y={y} width={barW * 0.8} height={barH} rx="3" fill={colors[si % colors.length]} opacity="0.85" />
                  <text x={x + barW * 0.4} y={y - 4} textAnchor="middle" fontSize="8" fill="var(--text-primary)" fontWeight="600">{val}</text>
                </g>
              );
            })}
            <text x={groupX + barGroupW / 2} y={H - pad.bottom + 18} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{cat}</text>
          </g>
        );
      })}
      {series.map((s, si) => (
        <g key={si} transform={`translate(${pad.left + si * 100}, ${H - 15})`}>
          <rect width="12" height="12" rx="2" fill={colors[si % colors.length]} />
          <text x="16" y="10" fontSize="9" fill="var(--text-secondary)">{s.label}</text>
        </g>
      ))}
      <text x={W / 2} y={H - 2} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{xAxisLabel}</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function IeltsFullExam() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const exam = IELTS_FULL_EXAM;

  // ─── Core State ────────────────────────────────────────────────────────────
  const [stage, setStage] = useState('hub'); // hub | listening | reading | writing | speaking | evaluating | final_results
  const [sectionResults, setSectionResults] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  // ─── Timer ─────────────────────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // ─── LM Studio ─────────────────────────────────────────────────────────────
  const [apiEndpoint, setApiEndpoint] = useState(() =>
    localStorage.getItem('lm_studio_endpoint') || 'http://localhost:1234/v1'
  );
  const [apiModel, setApiModel] = useState('local-model');
  const [apiConnected, setApiConnected] = useState(false);
  const [apiChecking, setApiChecking] = useState(false);

  // ─── Listening State ───────────────────────────────────────────────────────
  const [listeningPart, setListeningPart] = useState(0);
  const [listeningAnswers, setListeningAnswers] = useState({});
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState({});
  const [audioProgress, setAudioProgress] = useState(0);
  const audioInstanceRef = useRef(null);

  // ─── Reading State ─────────────────────────────────────────────────────────
  const [readingPassage, setReadingPassage] = useState(0);
  const [readingAnswers, setReadingAnswers] = useState({});

  // ─── Writing State ─────────────────────────────────────────────────────────
  const [writingTask, setWritingTask] = useState(0);
  const [writingTexts, setWritingTexts] = useState({ task1: '', task2: '' });

  // ─── Speaking State ────────────────────────────────────────────────────────
  const [speakingPart, setSpeakingPart] = useState(0);
  const [speakingStep, setSpeakingStep] = useState(0);
  const [speakingPhase, setSpeakingPhase] = useState('idle'); // idle | prep | recording | done
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [speakingTranscripts, setSpeakingTranscripts] = useState([]);
  const recognitionRef = useRef(null);
  const [prepTimeLeft, setPrepTimeLeft] = useState(0);
  const prepTimerRef = useRef(null);

  // ─── History State ─────────────────────────────────────────────────────────
  const [examHistory, setExamHistory] = useState([]);
  const [isRetryingId, setIsRetryingId] = useState(null);
  const [viewingHistory, setViewingHistory] = useState(null); // Clicked history record details

  // ─── Evaluating State ──────────────────────────────────────────────────────
  const [evalStep, setEvalStep] = useState('');
  const [evalError, setEvalError] = useState('');

  // ─── Results Tab ───────────────────────────────────────────────────────────
  const [resultsTab, setResultsTab] = useState(0);

  // ─── Fullscreen State ──────────────────────────────────────────────────────
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ─── Session Resume State ───────────────────────────────────────────────────
  const [pendingSession, setPendingSession] = useState(null);

  // ═══ Check for saved session on mount ═══
  useEffect(() => {
    const savedRaw = localStorage.getItem(SESSION_KEY);
    if (savedRaw) {
      try {
        const saved = JSON.parse(savedRaw);
        if (saved && saved.stage && saved.stage !== 'hub' && saved.stage !== 'final_results') {
          setPendingSession(saved);
        }
      } catch (e) {
        console.error('Failed to parse saved IELTS session:', e);
      }
    }
  }, []);

  // ═══ Resume saved session ═══
  const resumeSession = () => {
    const saved = pendingSession;
    if (!saved) return;
    setStage(saved.stage);
    if (saved.sectionResults) setSectionResults(saved.sectionResults);
    if (saved.completedSections) setCompletedSections(saved.completedSections);
    if (saved.timeLeft !== undefined) setTimeLeft(saved.timeLeft);
    if (saved.listeningPart !== undefined) setListeningPart(saved.listeningPart);
    if (saved.listeningAnswers) setListeningAnswers(saved.listeningAnswers);
    if (saved.audioPlayed) setAudioPlayed(saved.audioPlayed);
    if (saved.readingPassage !== undefined) setReadingPassage(saved.readingPassage);
    if (saved.readingAnswers) setReadingAnswers(saved.readingAnswers);
    if (saved.writingTask !== undefined) setWritingTask(saved.writingTask);
    if (saved.writingTexts) setWritingTexts(saved.writingTexts);
    if (saved.speakingPart !== undefined) setSpeakingPart(saved.speakingPart);
    if (saved.speakingStep !== undefined) setSpeakingStep(saved.speakingStep);
    if (saved.speakingPhase) setSpeakingPhase(saved.speakingPhase);
    if (saved.transcript !== undefined) setTranscript(saved.transcript);
    if (saved.chatMessages) setChatMessages(saved.chatMessages);
    if (saved.speakingTranscripts) setSpeakingTranscripts(saved.speakingTranscripts);
    setPendingSession(null);
    setIsFullscreen(true);
    playSound('correct');
  };

  // ═══ Dismiss saved session ═══
  const dismissSession = () => {
    localStorage.removeItem(SESSION_KEY);
    setPendingSession(null);
  };

  // ═══ Instant State Persistence Helper ═══
  const persistSessionState = useCallback((currentStage, override = {}) => {
    if (currentStage === 'hub' || currentStage === 'final_results') {
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    const stateToSave = {
      stage: currentStage,
      sectionResults,
      completedSections,
      timeLeft,
      listeningPart,
      listeningAnswers,
      audioPlayed,
      readingPassage,
      readingAnswers,
      writingTask,
      writingTexts,
      speakingPart,
      speakingStep,
      speakingPhase,
      transcript,
      chatMessages,
      speakingTranscripts,
      savedAt: Date.now(),
      ...override
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(stateToSave));
  }, [
    sectionResults, completedSections, timeLeft, listeningPart, listeningAnswers,
    audioPlayed, readingPassage, readingAnswers, writingTask, writingTexts,
    speakingPart, speakingStep, speakingPhase, transcript, chatMessages, speakingTranscripts
  ]);

  // Save session when typing in textareas or changing answers
  useEffect(() => {
    if (stage !== 'hub' && stage !== 'final_results' && stage !== 'evaluating') {
      persistSessionState(stage);
    }
  }, [
    stage, listeningAnswers, readingAnswers, writingTexts, speakingTranscripts,
    chatMessages, timeLeft, listeningPart, readingPassage, speakingPart, speakingStep,
    speakingPhase, audioPlayed, persistSessionState
  ]);

  // ═══ Load exam history ═══
  useEffect(() => {
    if (user) {
      const histRef = ref(db, `users/${user.uid}/ielts/full_exams`);
      const unsub = onValue(histRef, (snap) => {
        const val = snap.val() || {};
        const list = Object.entries(val).map(([k, v]) => ({ id: k, ...v }));
        list.sort((a, b) => new Date(b.takenAt || 0) - new Date(a.takenAt || 0));
        setExamHistory(list);
      });
      return () => unsub();
    }
  }, [user]);

  // ═══ Save LM Studio endpoint ═══
  useEffect(() => {
    localStorage.setItem('lm_studio_endpoint', apiEndpoint);
  }, [apiEndpoint]);

  // ═══ Check LM Studio Connection ═══
  const checkConnection = async () => {
    setApiChecking(true);
    try {
      const res = await fetch(`${apiEndpoint}/models`);
      if (!res.ok) throw new Error('HTTP Error');
      const data = await res.json();
      const model = data.data?.[0]?.id || 'local-model';
      setApiModel(model);
      setApiConnected(true);
      playSound('correct');
    } catch {
      setApiConnected(false);
      playSound('wrong');
    } finally {
      setApiChecking(false);
    }
  };

  // ═══ Start Exam ═══
  const startExam = () => {
    localStorage.removeItem(SESSION_KEY);
    setSectionResults({});
    setCompletedSections([]);
    setListeningAnswers({});
    setReadingAnswers({});
    setWritingTexts({ task1: '', task2: '' });
    setChatMessages([]);
    setSpeakingTranscripts([]);
    setListeningPart(0);
    setReadingPassage(0);
    setWritingTask(0);
    setSpeakingPart(0);
    setSpeakingStep(0);
    setAudioPlayed({});
    setTimeLeft(SECTION_CONFIG.listening.time);
    setIsFullscreen(true);
    setStage('listening');
    playSound('correct');
  };

  // ═══ Handle Section Timeout ═══
  const handleSectionTimeout = () => {
    if (stage === 'listening') submitListening();
    else if (stage === 'reading') submitReading();
    else if (stage === 'writing') submitWriting();
  };

  // ═══ Timer Effect ═══
  useEffect(() => {
    if (['listening', 'reading', 'writing'].includes(stage) && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSectionTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [stage, timeLeft]);

  // ═══════════════════════════════════════════════════════════════════════════
  // LISTENING AUDIO LOGIC
  // ═══════════════════════════════════════════════════════════════════════════
  const playAudio = (partIdx) => {
    if (audioPlayed[`part${partIdx}`] || audioPlaying) return;

    const part = exam.listening.parts[partIdx];
    const audioPath = part.audioFile;

    setAudioPlaying(true);
    setAudioProgress(0);

    const audio = new Audio(audioPath);
    audioInstanceRef.current = audio;

    audio.ontimeupdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onended = () => {
      setAudioPlaying(false);
      setAudioProgress(100);
      setAudioPlayed(prev => {
        const next = { ...prev, [`part${partIdx}`]: true };
        persistSessionState(stage, { audioPlayed: next });
        return next;
      });
      audioInstanceRef.current = null;
    };

    audio.onerror = () => {
      console.warn("Audio file failed to load, marking as done");
      setAudioPlaying(false);
      setAudioPlayed(prev => {
        const next = { ...prev, [`part${partIdx}`]: true };
        persistSessionState(stage, { audioPlayed: next });
        return next;
      });
      audioInstanceRef.current = null;
    };

    audio.play().catch((e) => {
      console.error("Audio playback error:", e);
      setAudioPlaying(false);
      audioInstanceRef.current = null;
    });
  };

  const stopAudio = () => {
    if (audioInstanceRef.current) {
      try {
        audioInstanceRef.current.pause();
        audioInstanceRef.current.currentTime = 0;
      } catch (e) {
        console.error(e);
      }
      audioInstanceRef.current = null;
    }
    setAudioPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
      }
    };
  }, []);

  const setListeningAnswer = (partIdx, qId, value) => {
    setListeningAnswers(prev => ({
      ...prev,
      [`p${partIdx}_q${qId}`]: value
    }));
  };

  const submitListening = async () => {
    clearInterval(timerRef.current);
    stopAudio();

    let correct = 0;
    let total = 0;
    const details = [];

    exam.listening.parts.forEach((part, pi) => {
      part.questions.forEach(q => {
        total++;
        const userAns = (listeningAnswers[`p${pi}_q${q.id}`] || '').trim().toLowerCase();
        const correctAns = q.answer.toString().toLowerCase();
        const isCorrect = userAns === correctAns;
        if (isCorrect) correct++;
        details.push({
          partIdx: pi,
          questionId: q.id,
          userAnswer: listeningAnswers[`p${pi}_q${q.id}`] || '',
          correctAnswer: q.answer,
          isCorrect,
          text: q.text || q.statement || ''
        });
      });
    });

    const band = rawToBand(correct, total);
    const result = { correct, total, band, details, timeSpent: SECTION_CONFIG.listening.time - timeLeft };

    const newResults = { ...sectionResults, listening: result };
    setSectionResults(newResults);
    setCompletedSections(prev => [...prev, 'listening']);

    setTimeLeft(SECTION_CONFIG.reading.time);
    setStage('reading');
    playSound('correct');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // READING LOGIC
  // ═══════════════════════════════════════════════════════════════════════════
  const setReadingAnswer = (passageIdx, qId, value) => {
    setReadingAnswers(prev => ({
      ...prev,
      [`r${passageIdx}_q${qId}`]: value
    }));
  };

  const submitReading = async () => {
    clearInterval(timerRef.current);

    let correct = 0;
    let total = 0;
    const details = [];

    exam.reading.passages.forEach((passage, pi) => {
      passage.questions.forEach(q => {
        total++;
        const userAns = (readingAnswers[`r${pi}_q${q.id}`] || '').trim().toLowerCase();
        const correctAns = q.answer.toString().toLowerCase();
        const isCorrect = userAns === correctAns;
        if (isCorrect) correct++;
        details.push({
          passageIdx: pi,
          questionId: q.id,
          userAnswer: readingAnswers[`r${pi}_q${q.id}`] || '',
          correctAnswer: q.answer,
          isCorrect,
          text: q.text || q.statement || ''
        });
      });
    });

    const band = rawToBand(correct, total);
    const result = { correct, total, band, details, timeSpent: SECTION_CONFIG.reading.time - timeLeft };

    const newResults = { ...sectionResults, reading: result };
    setSectionResults(newResults);
    setCompletedSections(prev => [...prev, 'reading']);

    setTimeLeft(SECTION_CONFIG.writing.time);
    setStage('writing');
    playSound('correct');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // WRITING EVALUATION LOGIC (WITH TIMEOUT AND OFFLINE RETRY FALLBACK)
  // ═══════════════════════════════════════════════════════════════════════════
  const submitWriting = async () => {
    clearInterval(timerRef.current);
    persistSessionState('writing');

    setStage('evaluating');
    setEvalStep('Writing topshiriqlarini tekshirish uchun ulanish o\'rnatilmoqda...');
    setEvalError('');

    let band = 5.0;
    let feedback = {};
    let isPending = false;

    const fetchWithTimeout = (url, options, timeout = 8000) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Ulanish vaqti tugadi (Timeout)')), timeout)
        )
      ]);
    };

    try {
      const res = await fetchWithTimeout(`${apiEndpoint}/models`, { method: 'GET' }, 4000);
      if (res.ok) {
        const data = await res.json();
        const model = data.data?.[0]?.id || apiModel;

        setEvalStep('Writing Task 1 (Grafik/Jadval tavsifi) baholanmoqda...');
        const t1Result = await gradeWritingTaskWithTimeout(
          exam.writing.task1.prompt,
          writingTexts.task1,
          'Task 1',
          150,
          model,
          fetchWithTimeout
        );

        setEvalStep('Writing Task 2 (Insho/Essay) baholanmoqda...');
        const t2Result = await gradeWritingTaskWithTimeout(
          exam.writing.task2.fullPrompt,
          writingTexts.task2,
          'Task 2',
          250,
          model,
          fetchWithTimeout
        );

        band = Math.round(((t1Result.band + t2Result.band * 2) / 3) * 2) / 2;
        feedback = { task1: t1Result, task2: t2Result, status: 'completed' };
      } else {
        throw new Error('Server models list fetch failed');
      }
    } catch (e) {
      console.warn('Writing grading offline/failed, saving as pending:', e);
      isPending = true;
      feedback = {
        status: 'pending',
        task1: { band: 5.0, feedback: 'LM Studio server offline yoki ulanishda xato. Keyinroq qayta tekshirishingiz mumkin.', criteria: {} },
        task2: { band: 5.0, feedback: 'LM Studio server offline yoki ulanishda xato. Keyinroq qayta tekshirishingiz mumkin.', criteria: {} }
      };
      band = 5.0;
    }

    const result = {
      band,
      feedback,
      isPending,
      task1Text: writingTexts.task1,
      task2Text: writingTexts.task2,
      task1Words: countWords(writingTexts.task1),
      task2Words: countWords(writingTexts.task2),
      timeSpent: SECTION_CONFIG.writing.time - timeLeft
    };

    const newResults = { ...sectionResults, writing: result };
    setSectionResults(newResults);
    setCompletedSections(prev => [...prev, 'writing']);

    const speakingInitState = {
      stage: 'speaking',
      sectionResults: newResults,
      completedSections: [...completedSections, 'writing'],
      speakingPart: 0,
      speakingStep: 0,
      speakingPhase: 'idle',
      chatMessages: []
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      ...JSON.parse(localStorage.getItem(SESSION_KEY) || '{}'),
      ...speakingInitState
    }));

    setStage('speaking');
    setSpeakingPart(0);
    setSpeakingStep(0);
    setSpeakingPhase('idle');
    setChatMessages([]);
    startSpeakingPart(0);
    playSound('correct');
  };

  const gradeWritingTaskWithTimeout = async (prompt, text, taskLabel, minWords, model, fetchFn) => {
    const wordCount = countWords(text);
    if (wordCount < 20) {
      return { band: 2.0, feedback: 'Javob juda qisqa (20 so\'zdan kam).', criteria: { taskAchievement: 2, coherence: 2, lexicalResource: 2, grammar: 2 } };
    }

    const systemPrompt = `You are an IELTS Writing examiner. Grade this ${taskLabel} response.
Evaluate based on 4 criteria: Task Achievement, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy.
The student wrote ${wordCount} words (Target is ${minWords}).
Return ONLY valid JSON:
{"band": <number 1.0-9.0 in 0.5 increments>, "taskAchievement": <band>, "coherence": <band>, "lexicalResource": <band>, "grammar": <band>, "feedback": "<2-3 sentence feedback in English>"}`;

    const res = await fetchFn(`${apiEndpoint}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Task Prompt: ${prompt}\n\nStudent's Response:\n${text}` }
        ],
        temperature: 0.2,
        max_tokens: 300
      })
    }, 12000);

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || '{}';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        band: parsed.band || 5.0,
        feedback: parsed.feedback || '',
        criteria: {
          taskAchievement: parsed.taskAchievement || 5.0,
          coherence: parsed.coherence || 5.0,
          lexicalResource: parsed.lexicalResource || 5.0,
          grammar: parsed.grammar || 5.0
        }
      };
    }
    throw new Error('Writing parser JSON failure');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SPEAKING LOGIC
  // ═══════════════════════════════════════════════════════════════════════════
  const startSpeakingPart = (partNum) => {
    const partData = partNum === 0 ? exam.speaking.part1
      : partNum === 1 ? exam.speaking.part2
      : exam.speaking.part3;

    if (partNum === 0) {
      const firstQ = partData.questions[0];
      setChatMessages([{ role: 'examiner', text: firstQ }]);
      setSpeakingStep(0);
      setSpeakingPhase('idle');
    } else if (partNum === 1) {
      setChatMessages([{
        role: 'examiner',
        text: `Here is your cue card topic. You have 1 minute to prepare, then speak for 1-2 minutes.\n\n📝 Topic: ${partData.cueCard.topic}\n\nYou should talk about:\n${partData.cueCard.points.map(p => `• ${p}`).join('\n')}`
      }]);
      setSpeakingPhase('prep');
      setPrepTimeLeft(partData.prepTime || 60);

      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
      prepTimerRef.current = setInterval(() => {
        setPrepTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(prepTimerRef.current);
            setSpeakingPhase('idle');
            setChatMessages(msgs => [...msgs, {
              role: 'examiner',
              text: 'Tayyorlanish vaqtingiz tugadi. Iltimos, gapirishni boshlang (mikrofonni yoqing).'
            }]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      const firstQ = partData.questions[0];
      setChatMessages(msgs => [...msgs, {
        role: 'examiner',
        text: `Keling, uchinchi bo'limga o'tamiz. Siz bilan ushbu mavzu yuzasidan chuqurroq fikr almashamiz.\n\nSavol: ${firstQ}`
      }]);
      setSpeakingStep(0);
      setSpeakingPhase('idle');
    }
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = '';

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interim);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'no-speech') {
        setIsRecording(false);
      }
    };

    recognition.onend = () => {
      if (isRecording) {
        try { recognition.start(); } catch {}
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
    setTranscript('');
    playSound('correct');
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error(e);
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  const submitSpeakingAnswer = () => {
    if (!transcript.trim()) return;

    stopRecording();
    const currentText = transcript.trim();

    setChatMessages(msgs => [...msgs, { role: 'student', text: currentText }]);
    
    const newTranscripts = [...speakingTranscripts, {
      part: speakingPart,
      step: speakingStep,
      text: currentText
    }];
    setSpeakingTranscripts(newTranscripts);
    setTranscript('');

    const partData = speakingPart === 0 ? exam.speaking.part1
      : speakingPart === 1 ? exam.speaking.part2
      : exam.speaking.part3;

    if (speakingPart === 1) {
      if (speakingPhase !== 'done') {
        setChatMessages(msgs => [...msgs, { role: 'examiner', text: partData.followUp }]);
        setSpeakingPhase('done');
      } else {
        setSpeakingPart(2);
        setSpeakingStep(0);
        startSpeakingPart(2);
      }
      return;
    }

    const questions = partData.questions;
    const nextStep = speakingStep + 1;

    if (nextStep < questions.length) {
      setSpeakingStep(nextStep);
      setChatMessages(msgs => [...msgs, { role: 'examiner', text: questions[nextStep] }]);
    } else {
      if (speakingPart === 0) {
        setSpeakingPart(1);
        setSpeakingStep(0);
        startSpeakingPart(1);
      } else {
        submitSpeaking(newTranscripts);
      }
    }
  };

  const submitSpeaking = async (finalTranscripts = speakingTranscripts) => {
    if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    stopRecording();

    setStage('evaluating');
    setEvalStep('Speaking audio yozuvlari tahlil qilinmoqda...');
    setEvalError('');

    let band = 5.0;
    let feedback = '';
    let isPending = false;

    const fetchWithTimeout = (url, options, timeout = 12000) => {
      return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('LM Studio ulanish vaqti tugadi (Timeout)')), timeout)
        )
      ]);
    };

    try {
      const conn = await fetchWithTimeout(`${apiEndpoint}/models`, { method: 'GET' }, 4000);
      if (conn.ok) {
        const data = await conn.json();
        const model = data.data?.[0]?.id || apiModel;

        const allTranscript = finalTranscripts.map(t =>
          `Part ${t.part + 1}, Question ${t.step + 1}: ${t.text}`
        ).join('\n\n');

        const gradeRes = await fetchWithTimeout(`${apiEndpoint}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content: `You are an IELTS Speaking examiner. Grade Speaking performance. Return valid JSON only:
{"band": <number 1.0-9.0>, "fluency": <band>, "lexical": <band>, "grammar": <band>, "pronunciation": <band>, "feedback": "<feedback>"}`
              },
              { role: 'user', content: `Candidate Transcript:\n${allTranscript}` }
            ],
            temperature: 0.2,
            max_tokens: 300
          })
        }, 12000);

        const gradeData = await gradeRes.json();
        const raw = gradeData.choices?.[0]?.message?.content || '{}';
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          band = parsed.band || 5.0;
          feedback = parsed.feedback || '';
        }
      } else {
        throw new Error('Speaking grading server connection issue');
      }
    } catch (e) {
      console.warn('Speaking evaluation offline, saving as pending:', e);
      isPending = true;
      feedback = 'LM Studio server offline yoki ulanishda xato. Keyinroq qayta tekshirishingiz mumkin.';
    }

    const result = { band, feedback, isPending, transcripts: finalTranscripts };
    const finalResults = { ...sectionResults, speaking: result };
    setSectionResults(finalResults);
    setCompletedSections(prev => [...prev, 'speaking']);

    await saveExamToFirebase(finalResults);
    setStage('final_results');
    playSound('victory');
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // SAVE EXAM RECORD TO DATABASE
  // ═══════════════════════════════════════════════════════════════════════════
  const saveExamToFirebase = async (allResults) => {
    const listeningBand = allResults.listening?.band || 0;
    const readingBand = allResults.reading?.band || 0;
    const writingBand = allResults.writing?.band || 0;
    const speakingBand = allResults.speaking?.band || 0;
    const overallBand = Math.round(((listeningBand + readingBand + writingBand + speakingBand) / 4) * 2) / 2;

    const examData = {
      examId: exam.id,
      examTitle: exam.title,
      overallBand,
      listeningBand,
      readingBand,
      writingBand,
      speakingBand,
      listeningDetails: { correct: allResults.listening?.correct || 0, total: allResults.listening?.total || 40 },
      readingDetails: { correct: allResults.reading?.correct || 0, total: allResults.reading?.total || 40 },
      writingDetails: allResults.writing?.feedback || { status: 'pending' },
      writingIsPending: allResults.writing?.isPending || false,
      writingTask1Text: allResults.writing?.task1Text || '',
      writingTask2Text: allResults.writing?.task2Text || '',
      speakingFeedback: allResults.speaking?.feedback || '',
      speakingIsPending: allResults.speaking?.isPending || false,
      speakingTranscripts: allResults.speaking?.transcripts || [],
      takenAt: new Date().toISOString()
    };

    if (user) {
      try {
        const examsRef = ref(db, `users/${user.uid}/ielts/full_exams`);
        await set(push(examsRef), examData);
      } catch (e) {
        console.error('Failed to save exam to Firebase:', e);
      }
    }

    const savedExams = JSON.parse(localStorage.getItem('ielts_full_exams') || '[]');
    savedExams.unshift(examData);
    localStorage.setItem('ielts_full_exams', JSON.stringify(savedExams.slice(0, 20)));

    localStorage.removeItem(SESSION_KEY);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RETRY GRADING (FROM DASHBOARD)
  // ═══════════════════════════════════════════════════════════════════════════
  const handleRetryGrading = async (exRecord) => {
    if (!exRecord || isRetryingId) return;
    setIsRetryingId(exRecord.id);
    playSound('correct');

    try {
      const conn = await fetch(`${apiEndpoint}/models`);
      if (!conn.ok) throw new Error('LM Studio offline');
      const data = await conn.json();
      const model = data.data?.[0]?.id || apiModel;

      let updatedWritingDetails = { ...exRecord.writingDetails };
      let updatedSpeakingFeedback = exRecord.speakingFeedback;
      let newWritingBand = exRecord.writingBand;
      let newSpeakingBand = exRecord.speakingBand;
      let wPending = exRecord.writingIsPending;
      let sPending = exRecord.speakingIsPending;

      if (wPending || exRecord.writingDetails?.status === 'pending') {
        const t1Result = await gradeWritingTaskWithTimeout(
          exam.writing.task1.prompt,
          exRecord.writingTask1Text || '',
          'Task 1',
          150,
          model,
          fetch
        );
        const t2Result = await gradeWritingTaskWithTimeout(
          exam.writing.task2.fullPrompt,
          exRecord.writingTask2Text || '',
          'Task 2',
          250,
          model,
          fetch
        );
        newWritingBand = Math.round(((t1Result.band + t2Result.band * 2) / 3) * 2) / 2;
        updatedWritingDetails = { task1: t1Result, task2: t2Result, status: 'completed' };
        wPending = false;
      }

      if (sPending || exRecord.speakingFeedback?.includes('offline')) {
        const allTranscript = (exRecord.speakingTranscripts || []).map(t =>
          `Part ${t.part + 1}, Question ${t.step + 1}: ${t.text}`
        ).join('\n\n');

        const gradeRes = await fetch(`${apiEndpoint}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content: `You are an IELTS Speaking examiner. Grade Speaking performance. Return valid JSON only.`
              },
              { role: 'user', content: allTranscript }
            ]
          })
        });
        const gradeData = await gradeRes.json();
        const raw = gradeData.choices?.[0]?.message?.content || '{}';
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          newSpeakingBand = parsed.band || 5.0;
          updatedSpeakingFeedback = parsed.feedback || '';
          sPending = false;
        }
      }

      const overallBand = Math.round(((exRecord.listeningBand + exRecord.readingBand + newWritingBand + newSpeakingBand) / 4) * 2) / 2;

      if (user && exRecord.id) {
        const itemRef = ref(db, `users/${user.uid}/ielts/full_exams/${exRecord.id}`);
        await update(itemRef, {
          overallBand,
          writingBand: newWritingBand,
          speakingBand: newSpeakingBand,
          writingDetails: updatedWritingDetails,
          writingIsPending: wPending,
          speakingFeedback: updatedSpeakingFeedback,
          speakingIsPending: sPending
        });
      }

      const savedExams = JSON.parse(localStorage.getItem('ielts_full_exams') || '[]');
      const itemIdx = savedExams.findIndex(x => x.takenAt === exRecord.takenAt);
      if (itemIdx !== -1) {
        savedExams[itemIdx] = {
          ...savedExams[itemIdx],
          overallBand,
          writingBand: newWritingBand,
          speakingBand: newSpeakingBand,
          writingDetails: updatedWritingDetails,
          writingIsPending: wPending,
          speakingFeedback: updatedSpeakingFeedback,
          speakingIsPending: sPending
        };
        localStorage.setItem('ielts_full_exams', JSON.stringify(savedExams));
      }

      alert('Baholash muvaffaqiyatli yakunlandi!');
      playSound('correct');
    } catch (e) {
      alert(`Ulanishda xato: ${e.message}. LM Studio ishlayotganligini tekshiring.`);
      playSound('wrong');
    } finally {
      setIsRetryingId(null);
    }
  };

  const skipGradingAndSave = () => {
    if (stage !== 'evaluating') return;

    const lResult = sectionResults.listening || { band: 0, correct: 0, total: 40 };
    const rResult = sectionResults.reading || { band: 0, correct: 0, total: 40 };
    
    const wResult = sectionResults.writing || {
      band: 5.0,
      isPending: true,
      feedback: { status: 'pending' },
      task1Text: writingTexts.task1,
      task2Text: writingTexts.task2,
      task1Words: countWords(writingTexts.task1),
      task2Words: countWords(writingTexts.task2),
      timeSpent: 0
    };

    const sResult = sectionResults.speaking || {
      band: 5.0,
      isPending: true,
      feedback: 'LM Studio ulanishi o\'rnatilmadi. Natijani keyinroq qayta tekshirishingiz mumkin.',
      transcripts: speakingTranscripts
    };

    const overallResults = {
      listening: lResult,
      reading: rResult,
      writing: wResult,
      speaking: sResult
    };

    setSectionResults(overallResults);
    saveExamToFirebase(overallResults);
    setStage('final_results');
    playSound('victory');
  };

  const getOverallBand = () => {
    const l = sectionResults.listening?.band || 0;
    const r = sectionResults.reading?.band || 0;
    const w = sectionResults.writing?.band || 0;
    const s = sectionResults.speaking?.band || 0;
    return Math.round(((l + r + w + s) / 4) * 2) / 2;
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2,'0')}.${(d.getMonth()+1).toString().padStart(2,'0')}.${d.getFullYear()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className={`ielts-exam-layout ${isFullscreen ? 'ielts-fullscreen' : ''}`}>
      <div className="ielts-main-card">
        <AnimatePresence mode="wait">
          {/* ════════ HISTORY DETAIL REVIEW ════════ */}
          {viewingHistory && (
            <motion.div key="history_detail" className="ielts-results"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-results-hero" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.04))', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
                <div className="overall-band-circle" style={{ borderColor: '#8b5cf6', background: 'rgba(139, 92, 246, 0.04)' }}>
                  <span className="overall-band-value" style={{ color: '#8b5cf6' }}>{viewingHistory.overallBand}</span>
                  <span className="overall-band-label">Overall Band</span>
                </div>
                <h2>Imtihon Natijalari Review</h2>
                <p>Topshirilgan sana: {formatDate(viewingHistory.takenAt)}</p>
              </div>

              <div className="ielts-band-grid">
                <div className="ielts-band-card listening">
                  <div className="band-card-icon">🎧</div>
                  <div className="band-card-title">Listening</div>
                  <div className="band-card-score" style={{ color: '#3b82f6' }}>{viewingHistory.listeningBand?.toFixed(1)}</div>
                  <div className="band-card-detail">{viewingHistory.listeningDetails?.correct || 0} / 40 to'g'ri</div>
                </div>
                <div className="ielts-band-card reading">
                  <div className="band-card-icon">📖</div>
                  <div className="band-card-title">Reading</div>
                  <div className="band-card-score" style={{ color: '#10b981' }}>{viewingHistory.readingBand?.toFixed(1)}</div>
                  <div className="band-card-detail">{viewingHistory.readingDetails?.correct || 0} / 40 to'g'ri</div>
                </div>
                <div className="ielts-band-card writing">
                  <div className="band-card-icon">✍️</div>
                  <div className="band-card-title">Writing</div>
                  <div className="band-card-score" style={{ color: '#f59e0b' }}>{viewingHistory.writingBand?.toFixed(1)}</div>
                  <div className="band-card-detail">
                    {viewingHistory.writingIsPending ? 'Pending' : 'Baholangan'}
                  </div>
                </div>
                <div className="ielts-band-card speaking">
                  <div className="band-card-icon">🎤</div>
                  <div className="band-card-title">Speaking</div>
                  <div className="band-card-score" style={{ color: '#8b5cf6' }}>{viewingHistory.speakingBand?.toFixed(1)}</div>
                  <div className="band-card-detail">
                    {viewingHistory.speakingIsPending ? 'Pending' : 'Baholangan'}
                  </div>
                </div>
              </div>

              <div className="ielts-results-details">
                <div className="results-tabs">
                  <button className={`results-tab ${resultsTab === 0 ? 'active' : ''}`} onClick={() => setResultsTab(0)}>✍️ Writing Tahlili</button>
                  <button className={`results-tab ${resultsTab === 1 ? 'active' : ''}`} onClick={() => setResultsTab(1)}>🎤 Speaking Tahlili</button>
                </div>

                <div className="results-detail-body">
                  {resultsTab === 0 && (
                    <div>
                      {viewingHistory.writingIsPending ? (
                        <p style={{ color: '#f59e0b', textAlign: 'center', padding: '20px' }}>
                          Writing bo'limi hali baholanmagan. Mahalliy LM Studio serveringizni yoqib, "🔄 Tekshirish" tugmasi orqali baholang.
                        </p>
                      ) : (
                        <div>
                          {['task1', 'task2'].map(taskKey => {
                            const fb = viewingHistory.writingDetails?.[taskKey];
                            const text = taskKey === 'task1' ? viewingHistory.writingTask1Text : viewingHistory.writingTask2Text;
                            return fb ? (
                              <div key={taskKey} className="writing-result-feedback" style={{ marginBottom: '24px' }}>
                                <h4 style={{ marginBottom: '8px', color: 'var(--accent-1)' }}>
                                  {taskKey === 'task1' ? 'Task 1 (Report)' : 'Task 2 (Essay)'} — Band {fb.band?.toFixed(1) || '5.0'}
                                </h4>
                                <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.82rem', whiteSpace: 'pre-wrap', border: '1px solid var(--border-light)', maxHeight: '180px', overflowY: 'auto' }}>
                                  <strong>Sizning matn:</strong><br />{text}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                  <strong>Examiner fikri:</strong> {fb.feedback}
                                </p>
                                {fb.criteria && Object.keys(fb.criteria).length > 0 && (
                                  <div className="writing-criteria-grid">
                                    {Object.entries(fb.criteria).map(([key, val]) => (
                                      <div key={key} className="criteria-item">
                                        <h5>{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                                        <span className="criteria-score">{typeof val === 'number' ? val.toFixed(1) : val}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {resultsTab === 1 && (
                    <div>
                      {viewingHistory.speakingIsPending ? (
                        <p style={{ color: '#f59e0b', textAlign: 'center', padding: '20px' }}>
                          Speaking bo'limi hali baholanmagan. Mahalliy LM Studio serveringizni yoqib, "🔄 Tekshirish" tugmasi orqali baholang.
                        </p>
                      ) : (
                        <div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            <strong>Examiner bahosi va tavsiyalari:</strong><br />
                            {viewingHistory.speakingFeedback}
                          </p>
                          <h4 style={{ marginBottom: '12px', fontSize: '0.85rem' }}>Suhbat Transkripti:</h4>
                          {viewingHistory.speakingTranscripts?.map((t, i) => (
                            <div key={i} className="result-question-item correct" style={{ borderLeftColor: '#8b5cf6' }}>
                              <span className="result-q-number" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6' }}>
                                {i + 1}
                              </span>
                              <div className="result-q-content">
                                <p className="q-text" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                  Part {t.part + 1}, Question {t.step + 1}
                                </p>
                                <p className="q-answer" style={{ fontSize: '0.82rem' }}>"{t.text}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button className="ielts-home-btn" onClick={() => setViewingHistory(null)}>
                <ArrowLeft size={16} /> Tarix ro'yxatiga qaytish
              </button>
            </motion.div>
          )}

          {/* ════════ HUB ════════ */}
          {stage === 'hub' && !viewingHistory && (
            <motion.div key="hub" className="ielts-hub"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              {pendingSession && (
                <div className="ielts-session-resume">
                  <div className="session-resume-icon">📋</div>
                  <h3>Davom ettirilmagan imtihon mavjud</h3>
                  <p>
                    Sizda yakunlanmagan faol IELTS imtihon sessiyasi bor. Qolgan joyingizdan davom ettirishni xohlaysizmi?
                  </p>
                  <div className="session-resume-info">
                    <span>Bo'lim: <strong>{SECTION_CONFIG[pendingSession.stage]?.label || pendingSession.stage}</strong></span>
                    <span>Vaqt: <strong>{fmtTime(pendingSession.timeLeft || 0)}</strong></span>
                  </div>
                  <div className="session-resume-actions">
                    <button className="session-resume-btn continue" onClick={resumeSession}>
                      ▶ Davom etish
                    </button>
                    <button className="session-resume-btn cancel" onClick={dismissSession}>
                      ✕ O'chirib yuborish
                    </button>
                  </div>
                </div>
              )}

              <div className="ielts-hero">
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="ielts-hero-content">
                  <span className="ielts-hero-badge">📋 IELTS ACADEMIC</span>
                  <h2>IELTS Academic Mock Simulator</h2>
                  <p>Haqiqiy kompyuterlashtirilgan IELTS imtihon formatida imtihon topshiring. Ballaer va tahlillar imtihon oxirida batafsil taqdim etiladi.</p>
                </div>
              </div>

              <div className="ielts-sections-grid">
                {SECTIONS.map(sec => (
                  <div key={sec} className={`ielts-section-card ${sec}`}>
                    <div className="section-icon">{SECTION_CONFIG[sec].icon}</div>
                    <h4>{SECTION_CONFIG[sec].label}</h4>
                    <div className="section-meta">
                      {Math.floor(SECTION_CONFIG[sec].time / 60)} daqiqa
                      {sec !== 'speaking' && ` • ${SECTION_CONFIG[sec].questions} savol`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ielts-start-area">
                <button className="ielts-start-btn" onClick={startExam}>
                  🚀 Imtihonni boshlash
                </button>
              </div>

              <div className="ielts-connection">
                <h3><Volume2 size={16} /> LM Studio (AI Examiner) Sozlamalari</h3>
                <div className="conn-row">
                  <input
                    className="conn-input"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    placeholder="http://localhost:1234/v1"
                  />
                  <button className="conn-btn" onClick={checkConnection} disabled={apiChecking}>
                    {apiChecking ? 'Ulanmoqda...' : 'Ulanish'}
                  </button>
                </div>
                {apiConnected && (
                  <div className="conn-status connected">✅ Ulangan: {apiModel}</div>
                )}
              </div>

              {examHistory.length > 0 && (
                <div className="ielts-history">
                  <h3><Clock size={16} /> Imtihon natijalari tarixi</h3>
                  {examHistory.map(ex => (
                    <div key={ex.id} className="ielts-history-item" style={{ cursor: 'pointer' }} onClick={() => setViewingHistory(ex)}>
                      <div className="hist-info">
                        <h4>{ex.examTitle || 'IELTS Mock Test'}</h4>
                        <p>{formatDate(ex.takenAt)} • L:{ex.listeningBand} R:{ex.readingBand} W:{ex.writingBand} S:{ex.speakingBand}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={e => e.stopPropagation()}>
                        {(ex.writingIsPending || ex.speakingIsPending) && (
                          <button
                            className="conn-btn"
                            style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#f59e0b' }}
                            onClick={() => handleRetryGrading(ex)}
                            disabled={isRetryingId === ex.id}
                          >
                            {isRetryingId === ex.id ? 'Baholanmoqda...' : '🔄 Tekshirish'}
                          </button>
                        )}
                        <div className="hist-band">{ex.overallBand}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ════════ LISTENING ════════ */}
          {stage === 'listening' && !viewingHistory && (
            <motion.div key="listening" className="ielts-section-layout"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-section-header">
                <div className="header-left">
                  <span className="section-badge listening-badge">🎧 LISTENING</span>
                  <h3>Part {listeningPart + 1} / 4</h3>
                </div>
                <div className={`ielts-timer ${timeLeft < 300 ? 'warning' : ''} ${timeLeft < 60 ? 'danger' : ''}`}>
                  <Timer size={16} /> {fmtTime(timeLeft)}
                </div>
              </div>

              <div className="ielts-part-tabs">
                {exam.listening.parts.map((part, i) => (
                  <button
                    key={i}
                    className={`ielts-part-tab ${listeningPart === i ? 'active' : ''} ${audioPlayed[`part${i}`] ? 'completed' : ''}`}
                    onClick={() => {
                      stopAudio();
                      setListeningPart(i);
                    }}
                  >
                    Part {i + 1}
                  </button>
                ))}
              </div>

              <div className="ielts-section-body ielts-listening-body">
                {(() => {
                  const part = exam.listening.parts[listeningPart];
                  return (
                    <>
                      <div className="ielts-audio-player">
                        <button
                          className={`audio-play-btn ${audioPlaying ? 'playing' : ''}`}
                          onClick={() => {
                            if (!audioPlayed[`part${listeningPart}`] && !audioPlaying) {
                              playAudio(listeningPart);
                            }
                          }}
                          disabled={audioPlayed[`part${listeningPart}`] || audioPlaying}
                        >
                          {audioPlaying ? <Volume2 className="playing-pulse" size={22} /> : <Play size={22} />}
                        </button>
                        <div className="audio-info">
                          <h4>{part.title}</h4>
                          <p>{part.speakers?.join(', ') || 'Audio'}</p>
                          <div className="audio-progress-bar">
                            <div className="audio-progress-fill" style={{ width: `${audioProgress}%` }} />
                          </div>
                          {audioPlayed[`part${listeningPart}`] ? (
                            <span className="audio-done-badge">✅ Eshitib bo'lindi (Faqat 1 marta ruxsat beriladi)</span>
                          ) : audioPlaying ? (
                            <span className="audio-once-badge info">🔊 Hozir eshittirilmoqda... To'xtatib bo'lmaydi.</span>
                          ) : (
                            <span className="audio-once-badge">⚠️ Diqqat! Eshittirish faqat 1 marta qo'yiladi.</span>
                          )}
                        </div>
                      </div>

                      <div className="ielts-questions-list">
                        {part.questions.map(q => (
                          <div key={q.id} className="ielts-question-item">
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                              <span className="question-number">{q.id}</span>
                              <div style={{ flex: 1 }}>
                                <p className="question-text">{q.text || q.statement || ''}</p>
                                {(q.type === 'gap_fill' || q.type === 'summary_completion') && (
                                  <input
                                    className="question-input"
                                    placeholder="Bo'shliqni to'ldiring..."
                                    value={listeningAnswers[`p${listeningPart}_q${q.id}`] || ''}
                                    onChange={(e) => setListeningAnswer(listeningPart, q.id, e.target.value)}
                                  />
                                )}
                                {(q.type === 'choice' || q.type === 'matching') && (
                                  <div className="question-choices">
                                    {(q.options || []).map((opt, oi) => (
                                      <button
                                        key={oi}
                                        className={`choice-btn ${listeningAnswers[`p${listeningPart}_q${q.id}`] === opt ? 'selected' : ''}`}
                                        onClick={() => setListeningAnswer(listeningPart, q.id, opt)}
                                      >
                                        {opt}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="ielts-submit-section">
                {listeningPart < 3 && (
                  <button className="ielts-next-part-btn" onClick={() => { stopAudio(); setListeningPart(p => p + 1); }}>
                    Keyingi Part <ChevronRight size={16} />
                  </button>
                )}
                <button className="ielts-submit-btn" onClick={() => submitListening()}>
                  Listeningni yakunlash →
                </button>
              </div>
            </motion.div>
          )}

          {/* ════════ READING ════════ */}
          {stage === 'reading' && !viewingHistory && (
            <motion.div key="reading" className="ielts-section-layout"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-section-header">
                <div className="header-left">
                  <span className="section-badge reading-badge">📖 READING</span>
                  <h3>Passage {readingPassage + 1} / 3</h3>
                </div>
                <div className={`ielts-timer ${timeLeft < 600 ? 'warning' : ''} ${timeLeft < 120 ? 'danger' : ''}`}>
                  <Timer size={16} /> {fmtTime(timeLeft)}
                </div>
              </div>

              <div className="ielts-part-tabs">
                {exam.reading.passages.map((p, i) => (
                  <button
                    key={i}
                    className={`ielts-part-tab ${readingPassage === i ? 'active' : ''}`}
                    onClick={() => setReadingPassage(i)}
                  >
                    Passage {i + 1}
                  </button>
                ))}
              </div>

              <div className="ielts-section-body" style={{ padding: 0, overflow: 'hidden' }}>
                {(() => {
                  const passage = exam.reading.passages[readingPassage];
                  return (
                    <div className="ielts-reading-split">
                      <div className="ielts-reading-passage">
                        <h3>{passage.title}</h3>
                        <div className="passage-text">
                          {passage.text.split('\n\n').map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      </div>

                      <div className="ielts-reading-questions">
                        <h4>Questions (Passage {readingPassage + 1})</h4>
                        <div className="ielts-questions-list">
                          {passage.questions.map(q => (
                            <div key={q.id} className="ielts-question-item">
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <span className="question-number">{q.id}</span>
                                <div style={{ flex: 1 }}>
                                  <p className="question-text">{q.text || q.statement || ''}</p>

                                  {q.type === 'tfng' && (
                                    <div className="tfng-options">
                                      {['TRUE', 'FALSE', 'NOT GIVEN'].map(opt => (
                                        <button
                                          key={opt}
                                          className={`tfng-btn ${readingAnswers[`r${readingPassage}_q${q.id}`] === opt ? 'selected' : ''}`}
                                          onClick={() => setReadingAnswer(readingPassage, q.id, opt)}
                                        >
                                          {opt}
                                        </button>
                                      ))}
                                    </div>
                                  )}

                                  {q.type === 'choice' && (
                                    <div className="question-choices">
                                      {(q.options || []).map((opt, oi) => (
                                        <button
                                          key={oi}
                                          className={`choice-btn ${readingAnswers[`r${readingPassage}_q${q.id}`] === opt ? 'selected' : ''}`}
                                          onClick={() => setReadingAnswer(readingPassage, q.id, opt)}
                                        >
                                          {opt}
                                        </button>
                                      ))}
                                    </div>
                                  )}

                                  {(q.type === 'gap_fill' || q.type === 'summary_completion') && (
                                    <input
                                      className="question-input"
                                      placeholder="Javob..."
                                      value={readingAnswers[`r${readingPassage}_q${q.id}`] || ''}
                                      onChange={(e) => setReadingAnswer(readingPassage, q.id, e.target.value)}
                                    />
                                  )}

                                  {q.type === 'matching_headings' && (
                                    <div>
                                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                        Paragraph {q.paragraph}
                                      </p>
                                      <select
                                        className="heading-select"
                                        value={readingAnswers[`r${readingPassage}_q${q.id}`] || ''}
                                        onChange={(e) => setReadingAnswer(readingPassage, q.id, e.target.value)}
                                      >
                                        <option value="">-- Sarlavha --</option>
                                        {(q.headings || []).map((h, hi) => (
                                          <option key={hi} value={h}>{h}</option>
                                        ))}
                                      </select>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="ielts-submit-section">
                {readingPassage < 2 && (
                  <button className="ielts-next-part-btn" onClick={() => setReadingPassage(p => p + 1)}>
                    Keyingi Passage <ChevronRight size={16} />
                  </button>
                )}
                <button className="ielts-submit-btn" onClick={() => submitReading()}>
                  Readingni yakunlash →
                </button>
              </div>
            </motion.div>
          )}

          {/* ════════ WRITING ════════ */}
          {stage === 'writing' && !viewingHistory && (
            <motion.div key="writing" className="ielts-section-layout"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-section-header">
                <div className="header-left">
                  <span className="section-badge writing-badge">✍️ WRITING</span>
                  <h3>Task {writingTask + 1} / 2</h3>
                </div>
                <div className={`ielts-timer ${timeLeft < 600 ? 'warning' : ''} ${timeLeft < 120 ? 'danger' : ''}`}>
                  <Timer size={16} /> {fmtTime(timeLeft)}
                </div>
              </div>

              <div className="ielts-part-tabs">
                <button className={`ielts-part-tab ${writingTask === 0 ? 'active' : ''}`} onClick={() => setWritingTask(0)}>
                  Task 1 (150+ so'z)
                </button>
                <button className={`ielts-part-tab ${writingTask === 1 ? 'active' : ''}`} onClick={() => setWritingTask(1)}>
                  Task 2 (250+ so'z)
                </button>
              </div>

              <div className="ielts-section-body ielts-writing-body">
                {writingTask === 0 ? (
                  <div className="ielts-writing-area">
                    <div className="ielts-chart-container">
                      <h4>{exam.writing.task1.title}</h4>
                      <BarChartSVG chartData={exam.writing.task1.chartData} />
                    </div>

                    <div className="ielts-writing-prompt">
                      {exam.writing.task1.prompt}
                    </div>

                    <textarea
                      className="ielts-writing-textarea"
                      placeholder="Javobingizni shu yerga kiriting... (minimal 150 ta so'z)"
                      value={writingTexts.task1}
                      onChange={(e) => setWritingTexts(prev => ({ ...prev, task1: e.target.value }))}
                    />
                    <div className="ielts-word-counter">
                      <span className={`word-count-current ${countWords(writingTexts.task1) >= 150 ? 'word-count-met' : 'word-count-low'}`}>
                        {countWords(writingTexts.task1)} so'z
                      </span>
                      <span className="word-count-target">Min: 150 so'z</span>
                    </div>
                  </div>
                ) : (
                  <div className="ielts-writing-area">
                    <div className="ielts-writing-prompt">
                      <strong>{exam.writing.task2.title}</strong>
                      <br /><br />
                      {exam.writing.task2.fullPrompt}
                    </div>

                    <textarea
                      className="ielts-writing-textarea"
                      placeholder="Inshoingizni (essay) shu yerga kiriting... (minimal 250 ta so'z)"
                      value={writingTexts.task2}
                      onChange={(e) => setWritingTexts(prev => ({ ...prev, task2: e.target.value }))}
                    />
                    <div className="ielts-word-counter">
                      <span className={`word-count-current ${countWords(writingTexts.task2) >= 250 ? 'word-count-met' : 'word-count-low'}`}>
                        {countWords(writingTexts.task2)} so'z
                      </span>
                      <span className="word-count-target">Min: 250 so'z</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="ielts-submit-section">
                {writingTask === 0 && (
                  <button className="ielts-next-part-btn" onClick={() => setWritingTask(1)}>
                    Task 2 ga o'tish <ChevronRight size={16} />
                  </button>
                )}
                <button className="ielts-submit-btn" onClick={() => submitWriting()}>
                  Writingni yakunlash →
                </button>
              </div>
            </motion.div>
          )}

          {/* ════════ SPEAKING ════════ */}
          {stage === 'speaking' && !viewingHistory && (
            <motion.div key="speaking" className="ielts-section-layout"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-section-header">
                <div className="header-left">
                  <span className="section-badge speaking-badge">🎤 SPEAKING</span>
                  <h3>Part {speakingPart + 1} / 3</h3>
                </div>
              </div>

              <div className="ielts-part-tabs">
                {['Part 1: Interview', 'Part 2: Long Turn', 'Part 3: Discussion'].map((label, i) => (
                  <button
                    key={i}
                    className={`ielts-part-tab ${speakingPart === i ? 'active' : ''} ${i < speakingPart ? 'completed' : ''}`}
                    disabled
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="ielts-section-body ielts-speaking-body">
                {speakingPhase === 'prep' && (
                  <div className="speaking-prep-timer">
                    <div className="prep-timer-circle">
                      <span className="timer-value">{prepTimeLeft}</span>
                      <span className="timer-label">soniya</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Tayyorlanish vaqti. Cue-card yuzasidan insho g'oyalarini o'ylab turing.
                    </p>
                  </div>
                )}

                <div className="speaking-main-layout">
                  <div className="speaking-examiner-card">
                    <div className="examiner-avatar-wrapper">
                      <div className="avatar-pulse-ring" />
                      <div className="examiner-avatar-circle">🎓</div>
                    </div>
                    <h4>Dr. Sarah Jenkins</h4>
                    <p>IELTS Senior Examiner</p>
                    
                    {isRecording && (
                      <div className="speaking-waveform">
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                        <div className="wave-bar" />
                      </div>
                    )}
                  </div>

                  <div className="speaking-interaction-pane">
                    <div className="speaking-chat-bubbles">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.role}`}>
                          <div className="msg-text">{msg.text}</div>
                        </div>
                      ))}
                    </div>

                    {(isRecording || transcript) && (
                      <div className="speaking-transcript-bubble">
                        <span className="transcript-badge">Yozib olinmoqda (STT):</span>
                        <p>{transcript || 'Gapiring, tizim eshitmoqda...'}</p>
                      </div>
                    )}

                    {speakingPhase !== 'prep' && (
                      <div className="speaking-controls-area">
                        <button
                          className={`speaking-mic-button ${isRecording ? 'recording' : ''}`}
                          onClick={isRecording ? stopRecording : startRecording}
                        >
                          {isRecording ? <Square size={24} /> : <Mic size={24} />}
                        </button>
                        
                        <div className="speaking-action-hint">
                          {isRecording ? (
                            <span className="pulse-text" style={{ color: '#ef4444' }}>🔴 Mikrofonga javobni gapiring. Yakunlash uchun to'xtating.</span>
                          ) : (
                            <span>🎤 Javob berish uchun mikrofonga bosing va gapiring.</span>
                          )}
                        </div>

                        {transcript.trim() && !isRecording && (
                          <button className="speaking-send-btn" onClick={submitSpeakingAnswer}>
                            Javobni yuborish <Send size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ EVALUATING ════════ */}
          {stage === 'evaluating' && !viewingHistory && (
            <motion.div key="evaluating" className="ielts-evaluating"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <Loader2 className="evaluating-spinner animate-spin" size={64} style={{ color: 'var(--accent-1)' }} />
              <h2>Natijalar tahlil qilinmoqda</h2>
              <p className="eval-status-text">{evalStep}</p>
              
              <div className="evaluating-hint-box">
                <AlertCircle size={16} />
                <span>Tekshirish uchun mahalliy LM Studio ulanishi ishlatiladi. Baholash 10-15 soniya vaqt olishi mumkin.</span>
              </div>

              <button className="ielts-home-btn" onClick={skipGradingAndSave} style={{ marginTop: '20px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderColor: '#f59e0b' }}>
                <RotateCcw size={16} /> Baholashni o'tkazib yuborish (Keyinroq tekshirish)
              </button>
            </motion.div>
          )}

          {/* ════════ FINAL RESULTS ════════ */}
          {stage === 'final_results' && !viewingHistory && (
            <motion.div key="results" className="ielts-results"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-results-hero">
                <div className="overall-band-circle">
                  <span className="overall-band-value">{getOverallBand()}</span>
                  <span className="overall-band-label">Overall Band</span>
                </div>
                <h2>Imtihon Muvaffaqiyatli Yakunlandi</h2>
                <p>Natijalar tahlil qilindi va cloud profilga sinxronlashtirildi.</p>
              </div>

              <div className="ielts-band-grid">
                {SECTIONS.map(sec => (
                  <div key={sec} className={`ielts-band-card ${sec}`}>
                    <div className="band-card-icon">{SECTION_CONFIG[sec].icon}</div>
                    <div className="band-card-title">{SECTION_CONFIG[sec].label}</div>
                    <div className="band-card-score">
                      {sectionResults[sec]?.band?.toFixed(1) || '5.0'}
                    </div>
                    {(sec === 'listening' || sec === 'reading') && (
                      <div className="band-card-detail">
                        {sectionResults[sec]?.correct || 0} / 40 to'g'ri
                      </div>
                    )}
                    {sec === 'writing' && (
                      <div className="band-card-detail">
                        {sectionResults[sec]?.isPending ? (
                          <span style={{ color: '#f59e0b' }}>Pending</span>
                        ) : (
                          <span>Baholandi</span>
                        )}
                      </div>
                    )}
                    {sec === 'speaking' && (
                      <div className="band-card-detail">
                        {sectionResults[sec]?.isPending ? (
                          <span style={{ color: '#f59e0b' }}>Pending</span>
                        ) : (
                          <span>Baholandi</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="ielts-results-details">
                <div className="results-tabs">
                  {SECTIONS.map((sec, i) => (
                    <button
                      key={sec}
                      className={`results-tab ${resultsTab === i ? 'active' : ''}`}
                      onClick={() => setResultsTab(i)}
                    >
                      {SECTION_CONFIG[sec].icon} {SECTION_CONFIG[sec].label}
                    </button>
                  ))}
                </div>

                <div className="results-detail-body">
                  {resultsTab === 0 && sectionResults.listening && (
                    <div>
                      {sectionResults.listening.details?.map((d, i) => (
                        <div key={i} className={`result-question-item ${d.isCorrect ? 'correct' : 'wrong'}`}>
                          <span className="result-q-number">{d.questionId}</span>
                          <div className="result-q-content">
                            <p className="q-text">{d.text}</p>
                            <p className="q-answer">
                              <span className="user-answer">Sizning javob: <strong>{d.userAnswer || '—'}</strong></span>
                              {!d.isCorrect && (
                                <span className="correct-answer"> • To'g'ri javob: <strong>{d.correctAnswer}</strong></span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resultsTab === 1 && sectionResults.reading && (
                    <div>
                      {sectionResults.reading.details?.map((d, i) => (
                        <div key={i} className={`result-question-item ${d.isCorrect ? 'correct' : 'wrong'}`}>
                          <span className="result-q-number">{d.questionId}</span>
                          <div className="result-q-content">
                            <p className="q-text">{d.text}</p>
                            <p className="q-answer">
                              <span className="user-answer">Sizning javob: <strong>{d.userAnswer || '—'}</strong></span>
                              {!d.isCorrect && (
                                <span className="correct-answer"> • To'g'ri javob: <strong>{d.correctAnswer}</strong></span>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {resultsTab === 2 && sectionResults.writing && (
                    <div>
                      {['task1', 'task2'].map(taskKey => {
                        const fb = sectionResults.writing.feedback?.[taskKey];
                        return fb ? (
                          <div key={taskKey} className="writing-result-feedback" style={{ marginBottom: '16px' }}>
                            <h4 style={{ marginBottom: '8px' }}>
                              {taskKey === 'task1' ? 'Task 1 (Report)' : 'Task 2 (Essay)'} — Band {fb.band?.toFixed(1) || '5.0'}
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{fb.feedback}</p>
                            {fb.criteria && Object.keys(fb.criteria).length > 0 && (
                              <div className="writing-criteria-grid">
                                {Object.entries(fb.criteria).map(([key, val]) => (
                                  <div key={key} className="criteria-item">
                                    <h5>{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                                    <span className="criteria-score">{typeof val === 'number' ? val.toFixed(1) : val}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  {resultsTab === 3 && sectionResults.speaking && (
                    <div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        {sectionResults.speaking.feedback || 'Speaking baholash natijasi mavjud emas.'}
                      </p>
                      {sectionResults.speaking.transcripts?.map((t, i) => (
                        <div key={i} className="result-question-item correct" style={{ borderLeftColor: '#8b5cf6' }}>
                          <span className="result-q-number" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6' }}>
                            {i + 1}
                          </span>
                          <div className="result-q-content">
                            <p className="q-text" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Part {t.part + 1}, Question {t.step + 1}
                            </p>
                            <p className="q-answer" style={{ fontSize: '0.82rem' }}>"{t.text}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button className="ielts-home-btn" onClick={() => { localStorage.removeItem(SESSION_KEY); setStage('hub'); }}>
                <Home size={16} /> Bosh sahifaga qaytish
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}