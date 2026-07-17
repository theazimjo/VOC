import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarData, germanGrammarData } from '../data/grammarData';
import { useGrammarStats } from '../hooks/useGrammarStats';
import { getQuestionsForExercise, getExerciseType } from '../utils/grammarHelpers';
import './GrammarTopic.css';

// ─── AUDIO + HAPTIC HELPERS ─────────────────────────────────────────────────
function playCorrectSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime;
    // Two-tone chime: C5 → E5
    [523.25, 659.25].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.12);
      gain.gain.setValueAtTime(0, t + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.3, t + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.35);
      osc.start(t + i * 0.12);
      osc.stop(t + i * 0.12 + 0.35);
    });
    setTimeout(() => ctx.close(), 800);
  } catch (_) {}
}

function playWrongSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime;
    // Low buzzing dip
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, t);
    osc.frequency.linearRampToValueAtTime(120, t + 0.25);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.start(t); osc.stop(t + 0.3);
    setTimeout(() => ctx.close(), 600);
  } catch (_) {}
}

function playFinishedSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime;
    // Uplifting arpeggio: C4 -> E4 -> G4 -> C5
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.1);
      gain.gain.setValueAtTime(0, t + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.25, t + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.4);
      osc.start(t + i * 0.1);
      osc.stop(t + i * 0.1 + 0.45);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch (_) {}
}

function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

// ─── EXIT CONFIRM MODAL ──────────────────────────────────────────────────────
function ExitModal({ onConfirm, onCancel }) {
  return (
    <div className="gt-exit-overlay" onClick={onCancel}>
      <div className="gt-exit-modal" onClick={e => e.stopPropagation()}>
        <div className="gt-exit-icon">🚪</div>
        <h2 className="gt-exit-title">Chiqib ketasizmi?</h2>
        <p className="gt-exit-desc">
          Mashq tugallanmadi. Natijalar saqlanmaydi.
        </p>
        <div className="gt-exit-actions">
          <button className="gt-exit-btn confirm" onClick={onConfirm}>
            Ha, chiqish
          </button>
          <button className="gt-exit-btn cancel" onClick={onCancel}>
            Davom etish
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCRAMBLED SENTENCE EXERCISE ────────────────────────────────────────────
function ScrambledExercise({ question, answered, onAnswer }) {
  const [selected, setSelected] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  // Generate words from the correct answer to guarantee that all words are present
  // and match the answer exactly.
  const [shuffledWords] = useState(() => {
    const rawAnswer = question.answer || '';
    const wordsFromAnswer = rawAnswer.split(/\s+/).filter(Boolean).map(word => {
      // Remove trailing punctuation: .,?!
      return word.replace(/[.,?!]+$/, "");
    });
    return [...wordsFromAnswer].sort(() => Math.random() - 0.5);
  });

  const toggleWord = (word, fromSelected) => {
    if (answered || isCorrect !== null) return;
    if (fromSelected) {
      setSelected(prev => {
        const idx = prev.indexOf(word);
        if (idx === -1) return prev;
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
    } else {
      setSelected(prev => [...prev, word]);
    }
  };

  const checkAnswer = () => {
    const normalize = (str) => {
      if (!str) return '';
      return str
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const userAnswer = selected.join(' ');
    const correct = normalize(userAnswer) === normalize(question.answer || '');
    setIsCorrect(correct);
    onAnswer(correct);
  };

  const built = selected.join(' ');
  const remaining = shuffledWords.filter(w => !selected.includes(w) || selected.filter(s => s === w).length < shuffledWords.filter(s => s === w).length);

  return (
    <div className="scrambled-exercise">
      <p className="scrambled-instruction">So'zlarni to'g'ri tartibda tanlang:</p>
      
      {/* Built sentence area */}
      <div className="scrambled-built-area">
        {selected.length === 0 ? (
          <span className="scrambled-placeholder">Bu yerga so'zlarni tanlang...</span>
        ) : (
          selected.map((w, i) => (
            <button key={i} className="scrambled-word selected" onClick={() => toggleWord(w, true)}>
              {w}
            </button>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="scrambled-word-bank">
        {shuffledWords.map((w, i) => {
          const usedCount = selected.filter(s => s === w).length;
          const totalCount = shuffledWords.filter(s => s === w).length;
          const available = usedCount < totalCount;
          return (
            <button
              key={i}
              className={`scrambled-word ${!available ? 'used' : ''}`}
              onClick={() => available && toggleWord(w, false)}
              disabled={!available}
            >
              {w}
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {isCorrect !== null && (
        <div className={`scrambled-result ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? '✓ To\'g\'ri!' : `✗ Noto'g'ri. To'g'ri: "${question.answer}"`}
          {question.explanation && <p className="scrambled-explanation">{question.explanation}</p>}
        </div>
      )}

      {/* Check button */}
      {isCorrect === null && selected.length > 0 && (
        <button className="clean-next-btn" onClick={checkAnswer}>
          Tekshirish
        </button>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GrammarTopic() {
  const { level = 'beginner', topicId, exerciseId = '1' } = useParams();
  const navigate = useNavigate();
  const { saveGrammarResult } = useGrammarStats();

  const lang = localStorage.getItem('grammar_language') || 'en';
  const currentData = lang === 'en' ? grammarData : germanGrammarData;

  const levelData = currentData[level];
  const topic = levelData?.topics?.find((t) => t.id === topicId);

  const [showGuide, setShowGuide] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]); // { questionId, selected, correct }
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const progressRef = useRef(null);

  const handleExitRequest = useCallback(() => {
    setShowExitModal(true);
  }, []);

  const handleExitConfirm = useCallback(() => {
    setShowExitModal(false);
    navigate(`/grammar/${level}/${topicId}`);
  }, [navigate, level, topicId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQ]);

  const questions = useMemo(() => {
    return topic ? getQuestionsForExercise(topic, exerciseId) : [];
  }, [topic, exerciseId, sessionKey]);

  const totalQ = questions.length;
  const question = questions[currentQ];
  const progressPct = totalQ > 0 ? ((currentQ) / totalQ) * 100 : 0;

  // Shuffle option order per question so the correct answer isn't always
  // stuck in whatever slot the source data happened to put it in.
  const shuffled = useMemo(() => {
    if (!question || !question.options) return null;
    const order = question.options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return {
      options: order.map((i) => question.options[i]),
      correct: order.indexOf(question.correct),
    };
  }, [question]);

  useEffect(() => {
    if (finished && topic && totalQ > 0) {
      playFinishedSound();
      vibrate([100, 50, 100, 50, 150]);
      saveGrammarResult(level, topicId, topic.title, score, totalQ, exerciseId)
        .catch((err) => console.error("Error saving grammar result:", err));
    }
  }, [finished, level, topicId, topic, score, totalQ, saveGrammarResult, exerciseId]);

  // Early return must come AFTER all hooks — a params change from a valid
  // topic to a missing one would otherwise change the hook count between
  // renders and crash React.
  if (!topic) {
    return (
      <div className="grammar-topic-error">
        <div className="error-icon">🔍</div>
        <h2>Mavzu topilmadi</h2>
        <p>Kechirasiz, bu mavzu hali mavjud emas.</p>
        <button className="btn btn-primary" onClick={() => navigate('/grammar')}>
          ← Grammatikaga qaytish
        </button>
      </div>
    );
  }

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowExplanation(false);

    const isCorrect = idx === shuffled.correct;
    if (isCorrect) {
      playCorrectSound();
      vibrate([50, 30, 50]);
      setScore((s) => s + 1);
    } else {
      playWrongSound();
      vibrate([200]);
      setWrongCount((w) => w + 1);
    }
    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        questionText: question.text,
        selected: idx,
        correct: shuffled.correct,
        isCorrect,
        explanation: question.explanation,
        options: shuffled.options,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQ) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setWrongCount(0);
    setFinished(false);
    setAnswers([]);
    setShowExplanation(false);
    setSessionKey((prev) => prev + 1);
  };

  const getScoreGrade = () => {
    const pct = (score / totalQ) * 100;
    if (pct >= 90) return { emoji: '🏆', label: 'Ajoyib!', color: 'var(--accent-2)' };
    if (pct >= 70) return { emoji: '🌟', label: 'Yaxshi!', color: 'var(--accent-1)' };
    if (pct >= 50) return { emoji: '📚', label: 'Qoniqarli', color: 'var(--accent-3)' };
    return { emoji: '💪', label: 'Ko\'proq mashq qiling', color: 'var(--error)' };
  };

  // ─── GUIDE PANEL ───────────────────────────────────────────────────────────
  if (showGuide) {
    return (
      <div className="grammar-topic-page clean-theme clean-guide-view">
        {/* Clean Header Bar */}
        <div className="clean-quiz-header">
          <button className="clean-back-arrow" onClick={() => setShowGuide(false)} title="Testga qaytish">
            ←
          </button>
          <h1 className="clean-quiz-title">Grammar Guide</h1>
          <div className="clean-guide-icon" style={{ opacity: 0, pointerEvents: 'none' }}>📖</div>
        </div>

        {/* Guide Meta Card */}
        <div className="clean-meta-card">
          <div className="meta-line">
            Topic: <span className="highlight-white">{topic.title}</span>
          </div>
          <div className="meta-line topic-name">
            Qo'llanma / Study Guide
          </div>
        </div>

        {/* Guide Content Body */}
        <div className="clean-guide-content-panel">
          <div className="clean-guide-text-body">
            {topic.guide.split('\n').map((para, i) => {
              const trimmed = para.trim();
              if (!trimmed) {
                return <div key={i} className="clean-guide-spacer" />;
              }
              if (trimmed.startsWith('##')) {
                return (
                  <h3 key={i} className="clean-guide-heading">
                    {trimmed.replace(/^##\s*/, '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
                return (
                  <div key={i} className="clean-guide-bullet">
                    <span className="bullet-dot">•</span>
                    <span className="bullet-text">{trimmed.replace(/^[•-]\s*/, '')}</span>
                  </div>
                );
              }
              return (
                <p key={i} className="clean-guide-para">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>

        {/* Return Action Button */}
        <div className="clean-guide-actions">
          <button className="clean-next-btn" onClick={() => setShowGuide(false)}>
            ✅ Mashqni boshlash / Davom etish
          </button>
        </div>
      </div>
    );
  }

  // ─── FINISHED SCREEN ───────────────────────────────────────────────────────
  if (finished) {
    const grade = getScoreGrade();
    return (
      <div className="grammar-topic-page">
        <div className="grammar-topic-header">
          <button className="btn-back" onClick={() => navigate(`/grammar/${level}/${topicId}`)}>
            ← Orqaga
          </button>
          <div className="topic-header-info">
            <span className="topic-header-icon">{topic.icon}</span>
            <h1 className="topic-header-title">{topic.title}</h1>
          </div>
        </div>

        <div className="results-panel">
          <div className="results-grade-badge" style={{ color: grade.color }}>
            {grade.emoji}
          </div>
          <h2 className="results-title" style={{ color: grade.color }}>{grade.label}</h2>
          <div className="results-stats-row">
            <div className="results-stat correct">
              <span className="stat-num">{score}</span>
              <span className="stat-lbl">To'g'ri</span>
            </div>
            <div className="results-stat wrong">
              <span className="stat-num">{wrongCount}</span>
              <span className="stat-lbl">Noto'g'ri</span>
            </div>
            <div className="results-stat total">
              <span className="stat-num">{totalQ}</span>
              <span className="stat-lbl">Jami</span>
            </div>
          </div>
          <div className="results-progress-bar">
            <div
              className="results-progress-fill"
              style={{ width: `${(score / totalQ) * 100}%` }}
            />
          </div>
          <p className="results-pct">{Math.round((score / totalQ) * 100)}% to'g'ri javob</p>

          <div className="results-actions">
            <button className="btn btn-primary" onClick={handleRestart}>
              🔄 Qayta urinish
            </button>
            <button className="btn btn-secondary" onClick={() => setShowGuide(true)}>
              📖 Qo'llanmani ko'rish
            </button>
            <button className="btn btn-ghost" onClick={() => navigate(`/grammar/${level}/${topicId}`)}>
              ← Orqaga
            </button>
          </div>

          {/* Wrong answers review */}
          {wrongCount > 0 && (
            <div className="wrong-answers-review">
              <h3 className="review-title">❌ Noto'g'ri javoblar</h3>
              {answers.filter((a) => !a.isCorrect).map((a, i) => (
                <div key={i} className="review-item">
                  <p className="review-question">{a.questionText}</p>
                  <div className="review-options-row">
                    <span className="review-wrong-answer">
                      ✗ {a.options[a.selected]}
                    </span>
                    <span className="review-correct-answer">
                      ✓ {a.options[a.correct]}
                    </span>
                  </div>
                  {a.explanation && (
                    <p className="review-explanation">💡 {a.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── QUIZ SCREEN ───────────────────────────────────────────────────────────
  return (
    <div className="grammar-topic-page clean-theme">
      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <ExitModal
          onConfirm={handleExitConfirm}
          onCancel={() => setShowExitModal(false)}
        />
      )}

      {/* Clean Header Bar */}
      <div className="clean-quiz-header">
        <button className="clean-back-arrow" onClick={handleExitRequest} title="Orqaga">
          ←
        </button>
        <h1 className="clean-quiz-title">{getExerciseType(exerciseId).icon} Exercise {exerciseId}</h1>
        <button className="clean-guide-icon" onClick={() => setShowGuide(true)} title="Qo'llanma">
          📖
        </button>
      </div>

      {/* Subtle Progress Bar */}
      <div className="topic-progress-track clean-track" ref={progressRef}>
        <div
          className="topic-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Metadata Card */}
      <div className="clean-meta-card">
        <div className="meta-line question-progress">
          Question: <span className="highlight-white">{currentQ + 1} of {totalQ}</span>
        </div>
        <div className="meta-line topic-name">
          {topic.title}
        </div>
        <div className="meta-line exercise-type-line">
          <span style={{ color: getExerciseType(exerciseId).color }}>{getExerciseType(exerciseId).icon} {getExerciseType(exerciseId).name}</span>
        </div>
      </div>

      {/* Question Text or Context */}
      {question.situation && (
        <div className="clean-situation-box">
          <p className="situation-text">{question.situation}</p>
          {question.dialogue && (
            <pre className="dialogue-text">{question.dialogue}</pre>
          )}
        </div>
      )}

      {!question.situation && (
        <p className="clean-question-text">
          {parseInt(exerciseId, 10) === 3 
            ? "Berilgan so'zlardan to'g'ri gap hosil qiling:" 
            : (question.text || question.answer)}
        </p>
      )}

      {/* Scrambled Sentence Exercise */}
      {parseInt(exerciseId, 10) === 3 ? (
        <ScrambledExercise
          key={question.id || currentQ}
          question={question}
          answered={answered}
          onAnswer={(isCorrect) => {
            setAnswered(true);
            if (isCorrect) { playCorrectSound(); vibrate([50, 30, 50]); setScore(s => s + 1); }
            else { playWrongSound(); vibrate([200]); setWrongCount(w => w + 1); }
            setAnswers(prev => [...prev, {
              questionId: question.id,
              questionText: `Gap yig'ish mashqi`,
              selected: 0,
              correct: 0,
              isCorrect,
              explanation: question.explanation,
              options: [question.answer],
            }]);
          }}
        />
      ) : (
        /* Standard Options List */
        <div className="clean-options-list">
          {(shuffled?.options || []).map((opt, idx) => {
            let cls = 'clean-option-btn';
            if (answered) {
              if (idx === shuffled.correct) cls += ' correct';
              else if (idx === selected) cls += ' wrong';
              else cls += ' dimmed';
            } else if (selected === idx) {
              cls += ' selected';
            }
            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleSelect(idx)}
                disabled={answered}
              >
                <span className="option-text-only">{opt}</span>
                {answered && idx === shuffled.correct && (
                  <span className="option-badge-icon correct-badge">✓</span>
                )}
                {answered && idx === selected && idx !== shuffled.correct && (
                  <span className="option-badge-icon wrong-badge">✗</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation toggling */}
      {answered && question.explanation && (
        <div className="clean-explanation-block">
          <button
            className="clean-explanation-toggle"
            onClick={() => setShowExplanation((s) => !s)}
          >
            💡 {showExplanation ? "Tushuntirishni yashirish" : "Tushuntirishni ko'rish"}
          </button>
          {showExplanation && (
            <p className="clean-explanation-text">{question.explanation}</p>
          )}
        </div>
      )}

      {/* Next/Finish button */}
      {answered && (
        <button className="clean-next-btn" onClick={handleNext}>
          {currentQ + 1 >= totalQ ? '🏁 Natijalarni ko\'rish' : 'Keyingi savol →'}
        </button>
      )}
    </div>
  );
}
