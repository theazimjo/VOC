import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
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
    setSelected(prev => [...prev, item]);
  };

  const handleRemoveWord = (item) => {
    if (answered || isCorrect !== null) return;
    setSelected(prev => prev.filter(w => w.id !== item.id));
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

  return (
    <div className="scrambled-exercise">
      <p className="scrambled-instruction">{t('grammar.scrambledInstruction')}</p>

      {/* Built sentence area */}
      <div className="scrambled-built-area">
        {selected.length === 0 ? (
          <span className="scrambled-placeholder">{t('grammar.scrambledPlaceholder')}</span>
        ) : (
          selected.map((item) => (
            <button key={item.id} className="scrambled-word selected" onClick={() => handleRemoveWord(item)}>
              {item.text}
            </button>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="scrambled-word-bank">
        {shuffledWords.map((item) => {
          const isUsed = selected.some(s => s.id === item.id);
          return (
            <button
              key={item.id}
              className={`scrambled-word ${isUsed ? 'used' : ''}`}
              onClick={() => !isUsed && handleSelectWord(item)}
              disabled={isUsed}
            >
              {item.text}
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {isCorrect !== null && (
        <div className={`scrambled-result ${isCorrect ? 'correct' : 'wrong'}`}>
          <span className="scrambled-result-row">
            {isCorrect ? t('grammar.correctBadge') : t('grammar.wrongBadge', { answer: question.answer })}

          </span>
          {question.explanation && <p className="scrambled-explanation">{getFormattedExplanation(question.explanation, guideLang)}</p>}
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
                    <p className="review-explanation">💡 {getFormattedExplanation(a.explanation, activeGuideLang)}</p>
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
              <p className="clean-explanation-text">{getFormattedExplanation(question.explanation, activeGuideLang)}</p>
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
