import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/feedback';
import { IELTS_FULL_EXAM } from '../data/ieltsFullExamData';
import { ref, set, push, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import {
  Play, Square, ChevronRight, ArrowLeft, Timer, CheckCircle, Clock, Award,
  Send, Volume2, AlertCircle, Loader2, Home, RotateCcw, BookMarked, Mic
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
  const location = useLocation();
  const { user } = useAuth();
  const exam = IELTS_FULL_EXAM;

  // Helper to fetch from localStorage safely during state initialization
  const loadSavedState = (key, defaultVal) => {
    try {
      const savedRaw = localStorage.getItem(SESSION_KEY);
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        if (saved && saved[key] !== undefined) {
          return saved[key];
        }
      }
    } catch (e) {
      console.warn('Corrupted state data in localStorage, resetting cache:', e);
      localStorage.removeItem(SESSION_KEY);
    }
    return defaultVal;
  };

  // ─── Core States (Lazy Initialization) ──────────────────────────────────────
  const [stage, setStage] = useState(() => {
    const isRunningPath = window.location.pathname.endsWith('/run');
    if (isRunningPath) {
      return loadSavedState('stage', 'hub');
    }
    return 'hub';
  });

  const [sectionResults, setSectionResults] = useState(() => loadSavedState('sectionResults', {}));
  const [completedSections, setCompletedSections] = useState(() => loadSavedState('completedSections', []));
  const [timeLeft, setTimeLeft] = useState(() => loadSavedState('timeLeft', 0));

  // ─── Listening State ───────────────────────────────────────────────────────
  const [listeningPart, setListeningPart] = useState(() => loadSavedState('listeningPart', 0));
  const [listeningAnswers, setListeningAnswers] = useState(() => loadSavedState('listeningAnswers', {}));
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(() => loadSavedState('audioPlayed', {}));
  const [audioProgress, setAudioProgress] = useState(0);
  const audioInstanceRef = useRef(null);
  const timerRef = useRef(null);

  // ─── Reading State ─────────────────────────────────────────────────────────
  const [readingPassage, setReadingPassage] = useState(() => loadSavedState('readingPassage', 0));
  const [readingAnswers, setReadingAnswers] = useState(() => loadSavedState('readingAnswers', {}));

  // ─── Writing State ─────────────────────────────────────────────────────────
  const [writingTask, setWritingTask] = useState(() => loadSavedState('writingTask', 0));
  const [writingTexts, setWritingTexts] = useState(() => loadSavedState('writingTexts', { task1: '', task2: '' }));

  // ─── Speaking State ────────────────────────────────────────────────────────
  const [speakingPart, setSpeakingPart] = useState(() => loadSavedState('speakingPart', 0));
  const [speakingStep, setSpeakingStep] = useState(() => loadSavedState('speakingStep', 0));
  const [speakingPhase, setSpeakingPhase] = useState(() => loadSavedState('speakingPhase', 'idle'));
  const [speakingTimer, setSpeakingTimer] = useState(() => loadSavedState('speakingTimer', 0));
  const [speakingTimerMax, setSpeakingTimerMax] = useState(() => loadSavedState('speakingTimerMax', 0));
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatMessages, setChatMessages] = useState(() => loadSavedState('chatMessages', []));
  const [speakingTranscripts, setSpeakingTranscripts] = useState(() => loadSavedState('speakingTranscripts', []));
  const recognitionRef = useRef(null);
  const [prepTimeLeft, setPrepTimeLeft] = useState(0);

  // ─── Transcript Mirror Ref for Timer ───────────────────────────────────────
  const transcriptRef = useRef('');
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // ─── History State ─────────────────────────────────────────────────────────
  const [examHistory, setExamHistory] = useState([]);
  const [viewingHistory, setViewingHistory] = useState(null);

  // ─── Evaluating State ──────────────────────────────────────────────────────
  const [evalStep, setEvalStep] = useState('');

  // ─── Results Tab ───────────────────────────────────────────────────────────
  const [resultsTab, setResultsTab] = useState(0);

  // ─── Session Resume State ───────────────────────────────────────────────────
  const [pendingSession, setPendingSession] = useState(null);

  const isRunningRoute = location.pathname.endsWith('/run');

  // ═══ Check for saved session on mount / handle direct run route access ═══
  useEffect(() => {
    const savedRaw = localStorage.getItem(SESSION_KEY);
    const isRunningPath = window.location.pathname.endsWith('/run');

    if (savedRaw) {
      try {
        const saved = JSON.parse(savedRaw);
        if (saved && saved.stage && saved.stage !== 'hub' && saved.stage !== 'final_results') {
          if (!isRunningPath) {
            setPendingSession(saved);
          }
        }
      } catch (e) {
        console.error('Failed to parse saved IELTS session:', e);
      }
    } else {
      if (isRunningPath) {
        navigate('/ielts-exam', { replace: true });
      }
    }
  }, [navigate]);

  // ═══ Sync URL route with the active exam stage ═══
  useEffect(() => {
    const isExamStage = ['listening', 'reading', 'writing', 'speaking', 'evaluating', 'final_results'].includes(stage);

    if (isExamStage && !isRunningRoute) {
      navigate('/ielts-exam/run', { replace: true });
    } else if (!isExamStage && isRunningRoute) {
      navigate('/ielts-exam', { replace: true });
    }
  }, [stage, isRunningRoute, navigate]);

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
    if (saved.speakingTimer !== undefined) setSpeakingTimer(saved.speakingTimer);
    if (saved.speakingTimerMax !== undefined) setSpeakingTimerMax(saved.speakingTimerMax);
    if (saved.transcript !== undefined) setTranscript(saved.transcript);
    if (saved.chatMessages) setChatMessages(saved.chatMessages);
    if (saved.speakingTranscripts) setSpeakingTranscripts(saved.speakingTranscripts);
    setPendingSession(null);
    playSound('correct');

    navigate('/ielts-exam/run', { replace: true });
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
      speakingTimer,
      speakingTimerMax,
      transcript,
      chatMessages,
      speakingTranscripts,
      savedAt: Date.now(),
      ...override
    };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to persist session to localStorage:', e);
    }
  }, [
    sectionResults, completedSections, timeLeft, listeningPart, listeningAnswers,
    audioPlayed, readingPassage, readingAnswers, writingTask, writingTexts,
    speakingPart, speakingStep, speakingPhase, speakingTimer, speakingTimerMax,
    transcript, chatMessages, speakingTranscripts
  ]);

  // Save session state changes
  useEffect(() => {
    if (stage !== 'hub' && stage !== 'final_results' && stage !== 'evaluating') {
      persistSessionState(stage);
    }
  }, [stage, speakingPart, speakingStep, speakingPhase, listeningPart, readingPassage, writingTask]);

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

  // ═══ Start Full Exam ═══
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
    
    const initSession = {
      stage: 'listening',
      timeLeft: SECTION_CONFIG.listening.time,
      completedSections: [],
      sectionResults: {},
      savedAt: Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(initSession));
    
    setStage('listening');
    playSound('correct');
  };

  // Trigger speaking part initialization when entering speaking stage
  useEffect(() => {
    if (stage === 'speaking' && speakingPart === 0 && speakingStep === 0 && chatMessages.length === 0) {
      startSpeakingPart(0);
    }
  }, [stage]);

  // ═══ Handle Section Timeout ═══
  const handleSectionTimeout = () => {
    if (stage === 'listening') submitListening();
    else if (stage === 'reading') submitReading();
    else if (stage === 'writing') submitWriting();
  };

  // ─── Timer Effect ─────────────────────────────────────────────────────────
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
      console.warn("Audio file failed to load");
      setAudioPlaying(false);
      setAudioPlayed(prev => {
        const next = { ...prev, [`part${partIdx}`]: true };
        persistSessionState(stage, { audioPlayed: next });
        return next;
      });
      audioInstanceRef.current = null;
    };

    audio.play().catch((e) => {
      console.error("audio playback error", e);
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

  // ═══ READING LOGIC ═══
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

  // ═══ WRITING LOGIC ═══
  const submitWriting = async () => {
    clearInterval(timerRef.current);
    persistSessionState('writing');

    // Instantly save as pending for admin checking
    const result = {
      band: 0,
      feedback: {
        status: 'pending',
        task1: { band: 0, feedback: 'Writing topshiriqlari topshirildi. Admin tekshirishi kutilmoqda.', criteria: {} },
        task2: { band: 0, feedback: 'Writing topshiriqlari topshirildi. Admin tekshirishi kutilmoqda.', criteria: {} }
      },
      isPending: true,
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

  // ═══════════════════════════════════════════════════════════════════════════
  // SPEAKING LOGIC (TIMED, VOICE SYNTHESIS, AUTO PROGRESS)
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Timer Countdown Effect for Student Speaking (Pure Decrement Only)
  useEffect(() => {
    let subInterval = null;
    if (stage === 'speaking' && speakingPhase === 'student_speaking' && speakingTimer > 0) {
      subInterval = setInterval(() => {
        setSpeakingTimer(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (subInterval) clearInterval(subInterval);
    };
  }, [stage, speakingPhase, speakingTimer > 0]);

  // Handle Student Speaking Timer Timeout (React Side Effect)
  useEffect(() => {
    if (stage === 'speaking' && speakingPhase === 'student_speaking' && speakingTimer === 0) {
      advanceSpeaking(transcriptRef.current);
    }
  }, [speakingTimer, stage, speakingPhase]);

  // Prep Timer Countdown (Pure Decrement Only)
  useEffect(() => {
    let interval = null;
    if (stage === 'speaking' && speakingPhase === 'prep' && prepTimeLeft > 0) {
      interval = setInterval(() => {
        setPrepTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stage, speakingPhase, prepTimeLeft > 0]);

  // Handle Prep Timeout (React Side Effect)
  useEffect(() => {
    if (stage === 'speaking' && speakingPhase === 'prep' && prepTimeLeft === 0) {
      setChatMessages(msgs => [...msgs, {
        role: 'examiner',
        text: 'Your preparation time is over. Please start speaking now.'
      }]);
      setSpeakingStep(1);
      startStudentSpeakingPhase(1, 1);
    }
  }, [prepTimeLeft, stage, speakingPhase]);


  const startSpeakingPart = (partNum) => {
    const partData = partNum === 0 ? exam.speaking.part1
      : partNum === 1 ? exam.speaking.part2
      : exam.speaking.part3;

    if (partNum === 0) {
      setSpeakingPart(0);
      setSpeakingStep(0);
      setSpeakingPhase('examiner_speaking');
      const firstQ = partData.questions[0];
      setChatMessages([{ role: 'examiner', text: firstQ }]);
      speakLoudly(firstQ, 0, 0);
    } else if (partNum === 1) {
      setSpeakingPart(1);
      setSpeakingStep(0);
      setChatMessages([{
        role: 'examiner',
        text: `Here is your cue card topic. You have 1 minute to prepare, then speak for 1-2 minutes.\n\n📝 Topic: ${partData.cueCard.topic}\n\nYou should talk about:\n${partData.cueCard.points.map(p => `• ${p}`).join('\n')}`
      }]);
      setSpeakingPhase('prep');
      setPrepTimeLeft(partData.prepTime || 60);
    } else {
      setSpeakingPart(2);
      setSpeakingStep(0);
      setSpeakingPhase('examiner_speaking');
      const firstQ = partData.questions[0];
      setChatMessages(msgs => [...msgs, {
        role: 'examiner',
        text: `Let's move on to Part 3. I would like to ask you some more general questions related to this topic.\n\nQuestion: ${firstQ}`
      }]);
      speakLoudly(firstQ, 2, 0);
    }
  };

  const speakLoudly = (text, pNum, sNum) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.95;

      utterance.onend = () => {
        startStudentSpeakingPhase(pNum, sNum);
      };
      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error, auto starting speaking phase', e);
        startStudentSpeakingPhase(pNum, sNum);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        startStudentSpeakingPhase(pNum, sNum);
      }, 4000);
    }
  };

  const startStudentSpeakingPhase = (pNum, sNum) => {
    setSpeakingPhase('student_speaking');
    const maxTime = pNum === 0 ? 35 : (pNum === 1 && sNum === 1) ? 120 : 45;
    setSpeakingTimer(maxTime);
    setSpeakingTimerMax(maxTime);
    
    // Add 300ms delay to let TTS cancel cleanly before opening mic
    setTimeout(() => {
      startRecording();
    }, 300);
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = '';

    recognition.onstart = () => {
      console.log('Speech recognition started successfully');
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      const currentText = finalTranscript + interim;
      setTranscript(currentText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error event:', event.error, event);
      if (event.error !== 'no-speech') {
        setIsRecording(false);
      }
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setIsRecording(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      setTranscript('');
      playSound('correct');
    } catch (e) {
      console.error('Failed to start speech recognition:', e);
    }
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

  const handleManualSpeakingSubmit = () => {
    advanceSpeaking(transcript);
  };

  const advanceSpeaking = (studentText) => {
    stopRecording();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const textToSave = (studentText || '').trim() || '(No response)';
    setChatMessages(msgs => [...msgs, { role: 'student', text: textToSave }]);
    
    const newTranscripts = [...speakingTranscripts, {
      part: speakingPart,
      step: speakingStep,
      text: textToSave
    }];
    setSpeakingTranscripts(newTranscripts);
    setTranscript('');

    const partData = speakingPart === 0 ? exam.speaking.part1
      : speakingPart === 1 ? exam.speaking.part2
      : exam.speaking.part3;

    if (speakingPart === 1) {
      if (speakingStep === 1) {
        // Move to Part 2 follow up question
        setSpeakingStep(2);
        setSpeakingPhase('examiner_speaking');
        setChatMessages(msgs => [...msgs, { role: 'examiner', text: partData.followUp }]);
        speakLoudly(partData.followUp, 1, 2);
      } else if (speakingStep === 2) {
        // Move to Part 3
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
      setSpeakingPhase('examiner_speaking');
      const nextQ = questions[nextStep];
      setChatMessages(msgs => [...msgs, { role: 'examiner', text: nextQ }]);
      speakLoudly(nextQ, speakingPart, nextStep);
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
    stopRecording();

    setStage('evaluating');
    setEvalStep('Speaking responses are being uploaded to the admin portal...');

    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = {
      band: 0,
      feedback: 'Speaking responses submitted. Grading is pending admin review.',
      isPending: true,
      transcripts: finalTranscripts
    };

    const finalResults = { ...sectionResults, speaking: result };
    setSectionResults(finalResults);
    setCompletedSections(prev => [...prev, 'speaking']);

    await saveExamToFirebase(finalResults);
    setStage('final_results');
    playSound('victory');
  };

  // ═══ Save Results to Cloud (Firebase) ═══
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
      isPracticeMode: false,
      listeningBand,
      readingBand,
      writingBand,
      speakingBand,
      listeningDetails: allResults.listening ? { correct: allResults.listening.correct, total: allResults.listening.total } : null,
      readingDetails: allResults.reading ? { correct: allResults.reading.correct, total: allResults.reading.total } : null,
      writingDetails: allResults.writing?.feedback || null,
      writingIsPending: true,
      writingTask1Text: allResults.writing?.task1Text || '',
      writingTask2Text: allResults.writing?.task2Text || '',
      speakingFeedback: allResults.speaking?.feedback || '',
      speakingIsPending: true,
      speakingTranscripts: allResults.speaking?.transcripts || [],
      takenAt: new Date().toISOString()
    };

    if (user) {
      try {
        const examsRef = ref(db, `users/${user.uid}/ielts/full_exams`);
        const newExamRef = push(examsRef);
        const examKey = newExamRef.key;
        
        const fullExamData = { ...examData, id: examKey };
        await set(newExamRef, fullExamData);

        // Save globally to admin control path ielts_submissions
        const submissionRef = ref(db, `ielts_submissions/${examKey}`);
        await set(submissionRef, {
          id: examKey,
          userId: user.uid,
          userEmail: user.email || '',
          userName: user.displayName || 'User',
          status: 'pending',
          takenAt: examData.takenAt,
          examData: fullExamData,
          ...fullExamData
        });
      } catch (e) {
        console.error('Failed to save exam to Firebase:', e);
      }
    }

    const savedExams = JSON.parse(localStorage.getItem('ielts_full_exams') || '[]');
    savedExams.unshift(examData);
    localStorage.setItem('ielts_full_exams', JSON.stringify(savedExams.slice(0, 20)));

    localStorage.removeItem(SESSION_KEY);
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

  return (
    <div className={`ielts-exam-layout ${isRunningRoute ? 'ielts-fullscreen' : ''}`}>
      <div className="ielts-main-card">
        <AnimatePresence mode="wait">
          {/* ════════ HISTORY DETAIL REVIEW ════════ */}
          {viewingHistory && (
            <motion.div key="history_detail" className="ielts-results"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-results-hero" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.04))', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
                <div className="overall-band-circle" style={{ borderColor: '#8b5cf6', background: 'rgba(139, 92, 246, 0.04)' }}>
                  <span className="overall-band-value" style={{ color: '#8b5cf6' }}>
                    {viewingHistory.writingIsPending || viewingHistory.speakingIsPending ? '⏳' : viewingHistory.overallBand?.toFixed(1) || '5.0'}
                  </span>
                  <span className="overall-band-label">
                    {viewingHistory.writingIsPending || viewingHistory.speakingIsPending ? 'Evaluating' : 'Overall Band'}
                  </span>
                </div>
                <h2>Exam Results Review</h2>
                <p>Taken on: {formatDate(viewingHistory.takenAt)}</p>
                {(viewingHistory.writingIsPending || viewingHistory.speakingIsPending) && (
                  <p style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '6px', fontWeight: 'bold' }}>
                    ⚠️ Your writing and speaking responses are currently being evaluated by the administrator.
                  </p>
                )}
              </div>

              <div className="ielts-band-grid">
                <div className="ielts-band-card listening">
                  <div className="band-card-icon">🎧</div>
                  <div className="band-card-title">Listening</div>
                  <div className="band-card-score" style={{ color: '#3b82f6' }}>{viewingHistory.listeningBand ? viewingHistory.listeningBand.toFixed(1) : '—'}</div>
                  {viewingHistory.listeningDetails && (
                    <div className="band-card-detail">{viewingHistory.listeningDetails.correct} / {viewingHistory.listeningDetails.total}</div>
                  )}
                </div>
                <div className="ielts-band-card reading">
                  <div className="band-card-icon">📖</div>
                  <div className="band-card-title">Reading</div>
                  <div className="band-card-score" style={{ color: '#10b981' }}>{viewingHistory.readingBand ? viewingHistory.readingBand.toFixed(1) : '—'}</div>
                  {viewingHistory.readingDetails && (
                    <div className="band-card-detail">{viewingHistory.readingDetails.correct} / {viewingHistory.readingDetails.total}</div>
                  )}
                </div>
                <div className="ielts-band-card writing">
                  <div className="band-card-icon">✍️</div>
                  <div className="band-card-title">Writing</div>
                  <div className="band-card-score" style={{ color: '#f59e0b' }}>
                    {viewingHistory.writingIsPending ? '⏳' : viewingHistory.writingBand ? viewingHistory.writingBand.toFixed(1) : '—'}
                  </div>
                  <div className="band-card-detail">{viewingHistory.writingIsPending ? 'Pending Evaluation' : 'Graded'}</div>
                </div>
                <div className="ielts-band-card speaking">
                  <div className="band-card-icon">🎤</div>
                  <div className="band-card-title">Speaking</div>
                  <div className="band-card-score" style={{ color: '#8b5cf6' }}>
                    {viewingHistory.speakingIsPending ? '⏳' : viewingHistory.speakingBand ? viewingHistory.speakingBand.toFixed(1) : '—'}
                  </div>
                  <div className="band-card-detail">{viewingHistory.speakingIsPending ? 'Pending Evaluation' : 'Graded'}</div>
                </div>
              </div>

              <div className="ielts-results-details">
                <div className="results-tabs">
                  <button className={`results-tab ${resultsTab === 0 ? 'active' : ''}`} onClick={() => setResultsTab(0)}>✍️ Writing Feedback</button>
                  <button className={`results-tab ${resultsTab === 1 ? 'active' : ''}`} onClick={() => setResultsTab(1)}>🎤 Speaking Feedback</button>
                </div>

                <div className="results-detail-body">
                  {resultsTab === 0 && (
                    <div>
                      {viewingHistory.writingIsPending ? (
                        <p style={{ color: '#f59e0b', textAlign: 'center', padding: '20px' }}>
                          Writing tasks submitted. Comprehensive examiner feedback will appear here once graded.
                        </p>
                      ) : viewingHistory.writingDetails ? (
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
                                  <strong>Your Text:</strong><br />{text}
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                                  <strong>Examiner Feedback:</strong> {fb.feedback}
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
                      ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No writing task data available.</p>
                      )}
                    </div>
                  )}

                  {resultsTab === 1 && (
                    <div>
                      {viewingHistory.speakingIsPending ? (
                        <p style={{ color: '#f59e0b', textAlign: 'center', padding: '20px' }}>
                          Speaking audio recorded. Feedback will be populated once graded by the administrator.
                        </p>
                      ) : viewingHistory.speakingFeedback ? (
                        <div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                            <strong>Examiner Evaluation & Suggestions:</strong><br />
                            {viewingHistory.speakingFeedback}
                          </p>
                          <h4 style={{ marginBottom: '12px', fontSize: '0.85rem' }}>Interview Transcript:</h4>
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
                      ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No speaking task data available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button className="ielts-home-btn" onClick={() => setViewingHistory(null)}>
                <ArrowLeft size={16} /> Return to History
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
                  <h3>Unfinished Exam Session Found</h3>
                  <p>
                    You have an incomplete active IELTS session. Would you like to resume where you left off?
                  </p>
                  <div className="session-resume-info">
                    <span>Section: <strong>{SECTION_CONFIG[pendingSession.stage]?.label || pendingSession.stage}</strong></span>
                    <span>Time Left: <strong>{fmtTime(pendingSession.timeLeft || 0)}</strong></span>
                  </div>
                  <div className="session-resume-actions">
                    <button className="session-resume-btn continue" onClick={resumeSession}>
                      ▶ Resume Session
                    </button>
                    <button className="session-resume-btn cancel" onClick={dismissSession}>
                      ✕ Discard
                    </button>
                  </div>
                </div>
              )}

              <div className="ielts-hero">
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="ielts-hero-content">
                  <span className="ielts-hero-badge">🏆 IELTS ACADEMIC</span>
                  <h2>IELTS Academic Mock Simulator</h2>
                  <p>Authentic mock test environment. Submissions are saved to your profile and graded by the administration.</p>
                </div>
              </div>

              <div className="ielts-sections-grid">
                {SECTIONS.map(sec => (
                  <div key={sec} className={`ielts-section-card ${sec}`}>
                    <div className="section-icon">{SECTION_CONFIG[sec].icon}</div>
                    <h4>{SECTION_CONFIG[sec].label}</h4>
                    <div className="section-meta">
                      {Math.floor(SECTION_CONFIG[sec].time / 60)} mins
                      {sec !== 'speaking' && ` • ${SECTION_CONFIG[sec].questions} questions`}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ielts-start-area">
                <button className="ielts-start-btn" onClick={startExam}>
                  🚀 Start Exam Simulation
                </button>
              </div>

              {examHistory.length > 0 && (
                <div className="ielts-history">
                  <h3><Clock size={16} /> Exam Results History</h3>
                  {examHistory.map(ex => {
                    const isPending = ex.writingIsPending || ex.speakingIsPending;
                    return (
                      <div key={ex.id} className="ielts-history-item" style={{ cursor: 'pointer' }} onClick={() => setViewingHistory(ex)}>
                        <div className="hist-info">
                          <h4>{ex.examTitle || 'IELTS Mock Test'}</h4>
                          <p>{formatDate(ex.takenAt)} • L:{ex.listeningBand ? ex.listeningBand.toFixed(1) : '—'} R:{ex.readingBand ? ex.readingBand.toFixed(1) : '—'} W:{ex.writingBand ? ex.writingBand.toFixed(1) : '—'} S:{ex.speakingBand ? ex.speakingBand.toFixed(1) : '—'}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={e => e.stopPropagation()}>
                          {isPending ? (
                            <span className="status-pending-tag" style={{ fontSize: '0.75rem', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>⏳ Evaluating</span>
                          ) : (
                            <div className="hist-band" style={{ fontWeight: 'bold' }}>{ex.overallBand ? ex.overallBand.toFixed(1) : '5.0'}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                            <span className="audio-done-badge">✅ Audio Played (Allowed only once)</span>
                          ) : audioPlaying ? (
                            <span className="audio-once-badge info">🔊 Playing audio... Cannot be paused.</span>
                          ) : (
                            <span className="audio-once-badge">⚠️ Notice: Audio can only be listened to once.</span>
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
                                    placeholder="Fill in the blank..."
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
                    Next Part <ChevronRight size={16} />
                  </button>
                )}
                <button className="ielts-submit-btn" onClick={() => submitListening()}>
                  Submit Listening →
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
                {Array.from({ length: 3 }).map((_, i) => (
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
                                      placeholder="Your answer..."
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
                                        <option value="">-- Heading --</option>
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
                    Next Passage <ChevronRight size={16} />
                  </button>
                )}
                <button className="ielts-submit-btn" onClick={() => submitReading()}>
                  Submit Reading →
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
                  Task 1 (150+ words)
                </button>
                <button className={`ielts-part-tab ${writingTask === 1 ? 'active' : ''}`} onClick={() => setWritingTask(1)}>
                  Task 2 (250+ words)
                </button>
              </div>

              <div className="ielts-section-body ielts-writing-body">
                {(() => {
                  const task = (writingTask === 0 ? exam.writing.task1 : exam.writing.task2);
                  const isTask1 = (writingTask === 0);

                  return (
                    <div className="ielts-writing-area">
                      {isTask1 && task.chartData && (
                        <div className="ielts-chart-container">
                          <h4>{task.title}</h4>
                          <BarChartSVG chartData={task.chartData} />
                        </div>
                      )}

                      <div className="ielts-writing-prompt">
                        {isTask1 ? task.prompt : task.fullPrompt}
                      </div>

                      <textarea
                        className="ielts-writing-textarea"
                        placeholder={`Type your response here... (minimum ${isTask1 ? 150 : 250} words)`}
                        value={isTask1 ? writingTexts.task1 : writingTexts.task2}
                        onChange={(e) => setWritingTexts(prev => ({ 
                          ...prev, 
                          [isTask1 ? 'task1' : 'task2']: e.target.value 
                        }))}
                      />
                      <div className="ielts-word-counter">
                        <span className={`word-count-current ${countWords(isTask1 ? writingTexts.task1 : writingTexts.task2) >= (isTask1 ? 150 : 250) ? 'word-count-met' : 'word-count-low'}`}>
                          {countWords(isTask1 ? writingTexts.task1 : writingTexts.task2)} words
                        </span>
                        <span className="word-count-target">Min: {isTask1 ? 150 : 250} words</span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="ielts-submit-section">
                {writingTask === 0 && (
                  <button className="ielts-next-part-btn" onClick={() => setWritingTask(1)}>
                    Proceed to Task 2 <ChevronRight size={16} />
                  </button>
                )}
                <button className="ielts-submit-btn" onClick={() => submitWriting()}>
                  Submit Writing →
                </button>
              </div>
            </motion.div>
          )}

          {/* ════════ SPEAKING (IMMERSIVE INTERVIEW DESIGN) ════════ */}
          {stage === 'speaking' && !viewingHistory && (
            <motion.div key="speaking" className="ielts-immersive-speaking"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            >
              {/* Immersive Header */}
              <div className="speaking-immersive-header">
                <div className="immersive-header-left">
                  <span className="speaking-badge-pill">🎤 IELTS Speaking Part {speakingPart + 1}</span>
                  <span className="speaking-progress-text">
                    {speakingPart === 1 ? 'Cue Card Phase' : `Question ${speakingStep + 1} of ${speakingPart === 0 ? exam.speaking.part1.questions.length : exam.speaking.part3.questions.length}`}
                  </span>
                </div>
                
                {speakingPhase === 'student_speaking' && speakingTimer > 0 && (
                  <div className="speaking-circular-timer">
                    <Timer size={14} />
                    <span>{speakingTimer}s</span>
                  </div>
                )}
              </div>

              {/* Immersive Body */}
              <div className="speaking-immersive-body">
                {speakingPhase === 'prep' ? (
                  <div className="speaking-immersive-prep">
                    <div className="prep-circular-card">
                      <div className="prep-time-number">{prepTimeLeft}</div>
                      <div className="prep-time-label">seconds left</div>
                    </div>
                    <div className="prep-topic-card">
                      <h3>Part 2: Cue Card Topic</h3>
                      <p className="cue-card-topic-text">📝 {exam.speaking.part2.cueCard.topic}</p>
                      <div className="cue-card-points-list">
                        {exam.speaking.part2.cueCard.points.map((p, i) => (
                          <div key={i} className="cue-point-item">✓ {p}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="speaking-immersive-main">
                    {/* Examiner Center View */}
                    <div className="speaking-avatar-center">
                      <div className={`avatar-glow-ring ${speakingPhase === 'examiner_speaking' ? 'active-speaking' : 'listening-mode'}`} />
                      <div className="avatar-circle-large">🎓</div>
                      <h4 className="avatar-examiner-name">Dr. Sarah Jenkins</h4>
                      <p className="avatar-examiner-status">
                        {speakingPhase === 'examiner_speaking' ? '🔊 Speaking...' : '🟢 Listening to you...'}
                      </p>
                    </div>

                    {/* Question Subtitles */}
                    <div className="speaking-question-subtitles">
                      {chatMessages[chatMessages.length - 1]?.role === 'examiner' ? (
                        <h2>"{chatMessages[chatMessages.length - 1]?.text}"</h2>
                      ) : (
                        <h2>"{chatMessages[chatMessages.length - 2]?.text || 'Examiner question'}"</h2>
                      )}
                    </div>

                    {/* Live Transcript / STT */}
                    {speakingPhase === 'student_speaking' && (
                      <div className="speaking-live-transcript-card">
                        {transcript ? (
                          <p className="transcript-live-text">"{transcript}"</p>
                        ) : (
                          <p className="transcript-placeholder-text">
                            Please speak, the microphone is active...
                          </p>
                        )}
                      </div>
                    )}

                    {/* Controls Footer */}
                    {speakingPhase === 'student_speaking' && (
                      <div className="speaking-immersive-controls">
                        <div className="wave-animation-container">
                          <div className={`wave-bar-pill ${isRecording ? 'animating' : ''}`} />
                          <div className={`wave-bar-pill ${isRecording ? 'animating' : ''}`} style={{ animationDelay: '0.1s' }} />
                          <div className={`wave-bar-pill ${isRecording ? 'animating' : ''}`} style={{ animationDelay: '0.2s' }} />
                          <div className={`wave-bar-pill ${isRecording ? 'animating' : ''}`} style={{ animationDelay: '0.3s' }} />
                          <div className={`wave-bar-pill ${isRecording ? 'animating' : ''}`} style={{ animationDelay: '0.4s' }} />
                        </div>

                        <button 
                          className="speaking-action-next-btn"
                          onClick={handleManualSpeakingSubmit}
                          title="Proceed to the next question"
                        >
                          <span>Next Question</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ════════ EVALUATING ════════ */}
          {stage === 'evaluating' && !viewingHistory && (
            <motion.div key="evaluating" className="ielts-evaluating"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <Loader2 className="evaluating-spinner animate-spin" size={64} style={{ color: 'var(--accent-1)' }} />
              <h2>Submitting Responses</h2>
              <p className="eval-status-text">{evalStep}</p>
              
              <div className="evaluating-hint-box">
                <AlertCircle size={16} />
                <span>Your responses are being secure-transmitted to the admin panel for grading.</span>
              </div>
            </motion.div>
          )}

          {/* ════════ FINAL RESULTS ════════ */}
          {stage === 'final_results' && !viewingHistory && (
            <motion.div key="results" className="ielts-results"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            >
              <div className="ielts-results-hero">
                <div className="overall-band-circle">
                  <span className="overall-band-value">⏳</span>
                  <span className="overall-band-label">Evaluating</span>
                </div>
                <h2>Exam Simulation Completed</h2>
                <p>Your responses have been successfully submitted. Once graded by the administrator, your official band scores will be released.</p>
              </div>

              <div className="ielts-band-grid">
                <div className="ielts-band-card listening">
                  <div className="band-card-icon">🎧</div>
                  <div className="band-card-title">Listening</div>
                  <div className="band-card-score">{sectionResults.listening?.band ? sectionResults.listening.band.toFixed(1) : '—'}</div>
                  {sectionResults.listening && (
                    <div className="band-card-detail">
                      {sectionResults.listening.correct} / {sectionResults.listening.total} correct
                    </div>
                  )}
                </div>
                <div className="ielts-band-card reading">
                  <div className="band-card-icon">📖</div>
                  <div className="band-card-title">Reading</div>
                  <div className="band-card-score">{sectionResults.reading?.band ? sectionResults.reading.band.toFixed(1) : '—'}</div>
                  {sectionResults.reading && (
                    <div className="band-card-detail">
                      {sectionResults.reading.correct} / {sectionResults.reading.total} correct
                    </div>
                  )}
                </div>
                <div className="ielts-band-card writing">
                  <div className="band-card-icon">✍️</div>
                  <div className="band-card-title">Writing</div>
                  <div className="band-card-score">⏳</div>
                  <div className="band-card-detail">Evaluating</div>
                </div>
                <div className="ielts-band-card speaking">
                  <div className="band-card-icon">🎤</div>
                  <div className="band-card-title">Speaking</div>
                  <div className="band-card-score">⏳</div>
                  <div className="band-card-detail">Evaluating</div>
                </div>
              </div>

              <button className="ielts-home-btn" onClick={() => { localStorage.removeItem(SESSION_KEY); setStage('hub'); }}>
                <Home size={16} /> Return to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}