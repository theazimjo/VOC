import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarData } from '../../data/grammarData';
import { russianGrammarData } from '../../data/russianGrammarData';
import { sicilianGrammarData } from '../../data/sicilianGrammarData';
import { greekGrammarData } from '../../data/greekGrammarData';
import { getQuestionsForExercise, getExerciseType, findGrammarTopic } from '../../utils/grammarHelpers';
import { useGrammarStats } from '../../hooks/useGrammarStats';
import { useLanguage } from '../../contexts/LanguageContext';
import { getFormattedExplanation } from '../../utils/grammarExplanationTranslator';
import { speakWord } from '../../utils/helpers';
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
  } catch {
    // WebAudio unsupported or blocked (e.g. autoplay policy) — sound is optional feedback.
  }
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
  } catch {
    // WebAudio unsupported or blocked (e.g. autoplay policy) — sound is optional feedback.
  }
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
  } catch {
    // WebAudio unsupported or blocked (e.g. autoplay policy) — sound is optional feedback.
  }
}

function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

// ─── EXIT CONFIRM MODAL ──────────────────────────────────────────────────────
function ExitModal({ onConfirm, onCancel }) {
  const { t } = useLanguage();
  return (
    <div className="gt-exit-overlay" onClick={onCancel}>
      <div className="gt-exit-modal" onClick={e => e.stopPropagation()}>
        <div className="gt-exit-icon">🚪</div>
        <h2 className="gt-exit-title">{t('grammar.exitModalTitle')}</h2>
        <p className="gt-exit-desc">
          {t('grammar.exitModalDesc')}
        </p>
        <div className="gt-exit-actions">
          <button className="gt-exit-btn confirm" onClick={onConfirm}>
            {t('grammar.yesExit')}
          </button>
          <button className="gt-exit-btn cancel" onClick={onCancel}>
            {t('grammar.continueEx')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCRAMBLED SENTENCE EXERCISE ────────────────────────────────────────────
function ScrambledExercise({ question, answered, onAnswer, guideLang = 'uz', lang = 'en-US' }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [ghostPos, setGhostPos] = useState(null);

  const touchStateRef = useRef(null);

  // Generate words from the correct answer with unique IDs to handle duplicate words cleanly
  const [shuffledWords] = useState(() => {
    const rawAnswer = question.answer || '';
    const wordsFromAnswer = rawAnswer.split(/\s+/).filter(Boolean).map((word, idx) => {
      // Remove trailing punctuation: .,?!
      const cleanText = word.replace(/[.,?!]+$/, "");
      return { id: idx, text: cleanText };
    });
    return [...wordsFromAnswer].sort(() => Math.random() - 0.5);
  });

  const handleSelectWord = (item) => {
    if (answered || isCorrect !== null) return;
    setSelected(prev => {
      if (prev.some(w => w.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const handleRemoveWord = (item) => {
    if (answered || isCorrect !== null) return;
    setSelected(prev => prev.filter(w => w.id !== item.id));
  };

  const handleInsertWord = (item, targetIndex) => {
    if (answered || isCorrect !== null) return;
    setSelected(prev => {
      const existingIdx = prev.findIndex(w => w.id === item.id);
      if (existingIdx !== -1) {
        // Reordering inside built area
        if (existingIdx === targetIndex) return prev;
        const updated = [...prev];
        const [removed] = updated.splice(existingIdx, 1);
        const insertAt = existingIdx < targetIndex ? targetIndex - 1 : targetIndex;
        updated.splice(Math.max(0, Math.min(insertAt, updated.length)), 0, removed);
        return updated;
      } else {
        // Adding from bank to specific position
        const updated = [...prev];
        updated.splice(Math.max(0, Math.min(targetIndex, updated.length)), 0, item);
        return updated;
      }
    });
  };

  const moveWordToEnd = (item) => {
    if (answered || isCorrect !== null) return;
    setSelected(prev => {
      const existingIdx = prev.findIndex(w => w.id === item.id);
      if (existingIdx !== -1) {
        const updated = [...prev];
        const [removed] = updated.splice(existingIdx, 1);
        updated.push(removed);
        return updated;
      } else {
        return [...prev, item];
      }
    });
  };

  const checkAnswer = () => {
    const normalize = (str) => {
      if (!str) return '';
      return str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const userAnswer = selected.map(w => w.text).join(' ');
    const correct = normalize(userAnswer) === normalize(question.answer || '');
    setIsCorrect(correct);
    onAnswer(correct);
  };

  // ─── HTML5 Mouse Drag & Drop ───
  const handleDragStart = (e, item, source, index) => {
    if (answered || isCorrect !== null) return;
    setDraggingId(item.id);
    e.dataTransfer.setData('application/json', JSON.stringify({ item, source, index }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverIdx(null);
  };

  const handleDragOverContainer = (e) => {
    if (answered || isCorrect !== null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIdx !== 'container') {
      setDragOverIdx('container');
    }
  };

  const handleDragOverWord = (e, idx) => {
    if (answered || isCorrect !== null) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIdx !== idx) {
      setDragOverIdx(idx);
    }
  };

  const handleDropWord = (e, targetIdx) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIdx(null);
    setDraggingId(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data && data.item) {
        handleInsertWord(data.item, targetIdx);
      }
    } catch (err) {
      // fallback
    }
  };

  const handleDropContainer = (e) => {
    e.preventDefault();
    setDragOverIdx(null);
    setDraggingId(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data && data.item) {
        moveWordToEnd(data.item);
      }
    } catch (err) {
      // fallback
    }
  };

  const handleDropBankArea = (e) => {
    e.preventDefault();
    setDragOverIdx(null);
    setDraggingId(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data && data.source === 'built') {
        handleRemoveWord(data.item);
      }
    } catch (err) {
      // fallback
    }
  };

  // ─── Touch Drag Handlers (Mobile / Touch Devices) ───
  const handleTouchStart = (e, item, source, index) => {
    if (answered || isCorrect !== null) return;
    const touch = e.touches[0];
    touchStateRef.current = {
      item,
      source,
      index,
      startX: touch.clientX,
      startY: touch.clientY,
      isDragging: false,
    };
  };

  const handleTouchMove = (e) => {
    const ts = touchStateRef.current;
    if (!ts || answered || isCorrect !== null) return;

    const touch = e.touches[0];
    const dx = touch.clientX - ts.startX;
    const dy = touch.clientY - ts.startY;
    const dist = Math.hypot(dx, dy);

    if (dist > 7 && !ts.isDragging) {
      ts.isDragging = true;
      setDraggingId(ts.item.id);
    }

    if (ts.isDragging) {
      if (e.cancelable) e.preventDefault();
      setGhostPos({ text: ts.item.text, x: touch.clientX, y: touch.clientY });

      const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
      if (targetEl) {
        const wordEl = targetEl.closest('[data-built-idx]');
        if (wordEl) {
          const idx = parseInt(wordEl.getAttribute('data-built-idx'), 10);
          setDragOverIdx(idx);
          return;
        }
        const areaEl = targetEl.closest('[data-built-area="true"]');
        if (areaEl) {
          setDragOverIdx('container');
          return;
        }
      }
      setDragOverIdx(null);
    }
  };

  const handleTouchEnd = (e) => {
    const ts = touchStateRef.current;
    if (!ts) return;

    if (ts.isDragging) {
      const touch = e.changedTouches[0];
      const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);

      if (targetEl) {
        const wordEl = targetEl.closest('[data-built-idx]');
        const areaEl = targetEl.closest('[data-built-area="true"]');
        const bankEl = targetEl.closest('[data-bank-area="true"]');

        if (wordEl) {
          const targetIdx = parseInt(wordEl.getAttribute('data-built-idx'), 10);
          handleInsertWord(ts.item, targetIdx);
        } else if (areaEl) {
          moveWordToEnd(ts.item);
        } else if (bankEl && ts.source === 'built') {
          handleRemoveWord(ts.item);
        }
      }
    } else {
      // Tap (no drag)
      if (ts.source === 'bank') {
        handleSelectWord(ts.item);
      } else {
        handleRemoveWord(ts.item);
      }
    }

    touchStateRef.current = null;
    setGhostPos(null);
    setDraggingId(null);
    setDragOverIdx(null);
  };

  return (
    <div
      className="scrambled-exercise"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <p className="scrambled-instruction">{t('grammar.scrambledInstruction')}</p>

      {/* Floating Ghost Element for Touch Dragging */}
      {ghostPos && (
        <div
          className="scrambled-drag-ghost"
          style={{ left: `${ghostPos.x}px`, top: `${ghostPos.y}px` }}
        >
          {ghostPos.text}
        </div>
      )}

      {/* Built sentence area */}
      <div
        data-built-area="true"
        className={`scrambled-built-area ${dragOverIdx === 'container' ? 'drag-over-container' : ''}`}
        onDragOver={handleDragOverContainer}
        onDrop={handleDropContainer}
      >
        <AnimatePresence mode="popLayout">
          {selected.length === 0 ? (
            <motion.span
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="scrambled-placeholder"
            >
              {t('grammar.scrambledPlaceholder')}
            </motion.span>
          ) : (
            selected.map((item, idx) => (
              <motion.button
                key={item.id}
                layoutId={`scrambled-word-${item.id}`}
                layout
                transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.28 }}
                data-built-idx={idx}
                draggable={!answered && isCorrect === null}
                className={`scrambled-word selected ${draggingId === item.id ? 'is-dragging' : ''} ${dragOverIdx === idx ? 'drop-target-active' : ''}`}
                onClick={() => handleRemoveWord(item)}
                onDragStart={(e) => handleDragStart(e, item, 'built', idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOverWord(e, idx)}
                onDrop={(e) => handleDropWord(e, idx)}
                onTouchStart={(e) => handleTouchStart(e, item, 'built', idx)}
              >
                {item.text}
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Word bank */}
      <div
        data-bank-area="true"
        className="scrambled-word-bank"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropBankArea}
      >
        {shuffledWords.map((item) => {
          const isUsed = selected.some(s => s.id === item.id);
          if (isUsed) {
            return (
              <div
                key={`slot-${item.id}`}
                className="scrambled-word-slot"
              >
                {item.text}
              </div>
            );
          }
          return (
            <motion.button
              key={item.id}
              layoutId={`scrambled-word-${item.id}`}
              layout
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.28 }}
              draggable={!answered && isCorrect === null}
              className={`scrambled-word ${draggingId === item.id ? 'is-dragging' : ''}`}
              onClick={() => handleSelectWord(item)}
              onDragStart={(e) => handleDragStart(e, item, 'bank')}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(e, item, 'bank')}
            >
              {item.text}
            </motion.button>
          );
        })}
      </div>

      {/* Result feedback */}
      {isCorrect !== null && (
        <div className={`scrambled-result ${isCorrect ? 'correct' : 'wrong'}`}>
          <span className="scrambled-result-row">
            {isCorrect ? t('grammar.correctBadge') : t('grammar.wrongBadge', { answer: question.answer })}
          </span>
          {question.explanation && (
            <p className="scrambled-explanation">
              {(guideLang === 'ru' && question.explanationRu)
                ? question.explanationRu
                : getFormattedExplanation(question.explanation, guideLang)}
            </p>
          )}
        </div>
      )}

      {/* Check button */}
      {isCorrect === null && selected.length > 0 && (
        <button className="clean-next-btn" onClick={checkAnswer}>
          {t('grammar.check')}
        </button>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GrammarTopic() {
  const { level = 'beginner', topicId, exerciseId = '1' } = useParams();
  const navigate = useNavigate();
  const { t, language: appLang } = useLanguage();
  const { saveGrammarResult } = useGrammarStats();

  const manualGuideLang = localStorage.getItem('grammar_guide_manual_lang');
  const activeGuideLang = (manualGuideLang === 'uz' || manualGuideLang === 'ru')
    ? manualGuideLang
    : (appLang === 'ru' ? 'ru' : 'uz');

  // Which language a question's Sicilian/Russian words should be read aloud
  // in — inferred from the topic id's track prefix, same convention GrammarPage
  // and GrammarGuide use to keep each track's own language of instruction.
  const speakLang = topicId?.startsWith('scn-') ? 'it-IT' : topicId?.startsWith('ru-') ? 'ru-RU' : 'en-US';

  const topic = findGrammarTopic(level, topicId);

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
        <h2>{t('grammar.topicNotFound')}</h2>
        <p>{t('grammar.topicNotFoundDesc')}</p>
        <button className="btn btn-primary" onClick={() => navigate('/grammar')}>
          {t('grammar.backToGrammar')}
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
        explanationRu: question.explanationRu,
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
    if (pct >= 90) return { emoji: '🏆', label: t('grammar.gradeExcellent'), color: 'var(--accent-2)' };
    if (pct >= 70) return { emoji: '🌟', label: t('grammar.gradeGood'), color: 'var(--accent-1)' };
    if (pct >= 50) return { emoji: '📚', label: t('grammar.gradeSatisfactory'), color: 'var(--accent-3)' };
    return { emoji: '💪', label: t('grammar.gradePracticeMore'), color: 'var(--error)' };
  };

  // ─── FINISHED SCREEN ───────────────────────────────────────────────────────
  if (finished) {
    const grade = getScoreGrade();
    return (
      <div className="grammar-topic-page">
        <div className="grammar-topic-header">
          <button className="btn-back" onClick={() => navigate(`/grammar/${level}/${topicId}`)}>
            {t('grammar.back')}
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
              <span className="stat-lbl">{t('grammar.correctLbl')}</span>
            </div>
            <div className="results-stat wrong">
              <span className="stat-num">{wrongCount}</span>
              <span className="stat-lbl">{t('grammar.incorrectLbl')}</span>
            </div>
            <div className="results-stat total">
              <span className="stat-num">{totalQ}</span>
              <span className="stat-lbl">{t('grammar.totalLbl')}</span>
            </div>
          </div>
          <div className="results-progress-bar">
            <div
              className="results-progress-fill"
              style={{ width: `${(score / totalQ) * 100}%` }}
            />
          </div>
          <p className="results-pct">{t('grammar.pctCorrect', { pct: Math.round((score / totalQ) * 100) })}</p>

          <div className="results-actions">
            <button className="btn btn-primary" onClick={handleRestart}>
              {t('grammar.tryAgain')}
            </button>
            <button className="btn btn-ghost" onClick={() => navigate(`/grammar/${level}/${topicId}`)}>
              {t('grammar.back')}
            </button>
          </div>

          {/* Wrong answers review */}
          {wrongCount > 0 && (
            <div className="wrong-answers-review">
              <h3 className="review-title">{t('grammar.incorrectAnswersTitle')}</h3>
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
                    <p className="review-explanation">💡 {(activeGuideLang === 'ru' && a.explanationRu) ? a.explanationRu : getFormattedExplanation(a.explanation, activeGuideLang)}</p>
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
        <button className="clean-back-arrow" onClick={handleExitRequest} title="Back">
          ←
        </button>
        <h1 className="clean-quiz-title">{getExerciseType(exerciseId, t).icon} {t('grammar.exerciseHeader', { id: exerciseId })}</h1>
        <div className="clean-quiz-progress-pill">
          {currentQ + 1} / {totalQ}
        </div>
      </div>

      {/* Subtle Progress Bar */}
      <div className="topic-progress-track clean-track" ref={progressRef}>
        <div
          className="topic-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main Quiz Body Container (Vertically Centered) */}
      <div className="clean-quiz-body">
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
              ? t('grammar.scrambledFormHint')
              : (question.text || question.answer)}
          </p>
        )}

        {/* Scrambled Sentence Exercise */}
        {parseInt(exerciseId, 10) === 3 ? (
          <ScrambledExercise
            key={question.id || currentQ}
            question={question}
            answered={answered}
            guideLang={activeGuideLang}
            lang={speakLang}
            onAnswer={(isCorrect) => {
              setAnswered(true);
              if (isCorrect) { playCorrectSound(); vibrate([50, 30, 50]); setScore(s => s + 1); }
              else { playWrongSound(); vibrate([200]); setWrongCount(w => w + 1); }
              setAnswers(prev => [...prev, {
                questionId: question.id,
                questionText: `Sentence building exercise`,
                selected: 0,
                correct: 0,
                isCorrect,
                explanation: question.explanation,
                explanationRu: question.explanationRu,
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
                  <span className="option-left-group">
                    <span className="option-text-only">{opt}</span>
                  </span>
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
              {showExplanation ? t('grammar.hideExplanation') : t('grammar.showExplanation')}
            </button>
            {showExplanation && (
              <p className="clean-explanation-text">{(activeGuideLang === 'ru' && question.explanationRu) ? question.explanationRu : getFormattedExplanation(question.explanation, activeGuideLang)}</p>
            )}
          </div>
        )}

        {/* Next/Finish button */}
        {answered && (
          <button className="clean-next-btn" onClick={handleNext}>
            {currentQ + 1 >= totalQ ? t('grammar.viewResults') : t('grammar.nextQuestion')}
          </button>
        )}
      </div>
    </div>
  );
}
