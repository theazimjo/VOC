import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarPathSections } from '../../data/grammarPathData';
import { useLanguage } from '../../contexts/LanguageContext';
import { isPassed, savePracticeComplete } from '../../utils/grammarPathProgress';
import { speakWord } from '../../utils/helpers';
import { getFormattedExplanation } from '../../utils/grammarExplanationTranslator';
import './GrammarTopic.css';
import './GrammarPath.css';

// ─── AUDIO HELPERS ──────────────────────────────────────────────────────────
function playCorrectSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime;
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
    // Audio unsupported
  }
}

function playWrongSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime;
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
    // Audio unsupported
  }
}

function playFinishedSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const t = ctx.currentTime;
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
    // Audio unsupported
  }
}

function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleOptions(question) {
  const order = question.options.map((_, i) => i);
  const shuffledOrder = shuffleArray(order);
  return {
    options: shuffledOrder.map((i) => question.options[i]),
    correct: shuffledOrder.indexOf(question.correct),
  };
}

function findLesson(lessonId) {
  for (const section of grammarPathSections) {
    const idx = section.lessons.findIndex((l) => l.id === lessonId);
    if (idx !== -1) {
      return { section, lesson: section.lessons[idx] };
    }
  }
  return { section: null, lesson: null };
}

function formatQuestionText(text, isRu) {
  if (!text || !isRu) return text;
  return text
    .replace(/^"Men" so'zini ingliz tilida qanday aytamiz\?/i, 'Как сказать "я" по-английски?')
    .replace(/^"Sen" \/ "Siz" so'zini ingliz tilida qanday aytamiz\?/i, 'Как сказать "ты / вы" по-английски?')
    .replace(/^"U" \(erkak\) so'zini ingliz tilida qanday aytamiz\?/i, 'Как сказать "он" (для мужчин) по-английски?')
    .replace(/^"U" \(ayol\) so'zini ingliz tilida qanday aytamiz\?/i, 'Как сказать "она" (для женщин) по-английски?')
    .replace(/^"U" \(narsa\/hayvon\) so'zini ingliz tilida qanday aytamiz\?/i, 'Как сказать "оно/он" (предмет/животное) по-английски?')
    .replace(/^"Biz" so'zini ingliz tilida qanday aytamiz\?/i, 'Как сказать "мы" по-английски?')
    .replace(/^"Ular" so'zini ingliz tilida qanday aytamiz\?/i, 'Как сказать "они" по-английски?')
    .replace(/Agar o'zingiz haqingizda gapirsangiz, qaysi olmoshni ishlatasiz\?/i, 'Какое местоимение вы используете, когда говорите о себе?')
    .replace(/Suhbatdoshingizga to'g'ridan-to'g'ri murojaat qilsangiz, qaysi olmoshni ishlatasiz\?/i, 'Какое местоимение вы используете при прямом обращении к собеседнику?')
    .replace(/Tom haqida gapirsangiz \(Tom — erkak ism\), qaysi olmoshni ishlatasiz\?/i, 'Какое местоимение вы используете для Тома (мужское имя)?')
    .replace(/Anna haqida gapirsangiz \(Anna — ayol ism\), qaysi olmoshni ishlatasiz\?/i, 'Какое местоимение вы используете для Анны (женское имя)?')
    .replace(/Bir kitob haqida gapirsangiz, qaysi olmoshni ishlatasiz\?/i, 'Какое местоимение вы используете для одной книги?')
    .replace(/O'zingiz va sinfdoshlaringiz haqida gapirsangiz, qaysi olmoshni ishlatasiz\?/i, 'Какое местоимение вы используете для себя и одноклассников?')
    .replace(/Tom va Ali haqida gapirsangiz, qaysi olmoshni ishlatasiz\?/i, 'Какое местоимение вы используете для Тома и Али?')
    .replace(/Choose the correct sentence:/i, 'Выберите правильное предложение:')
    .replace(/Choose the correct question:/i, 'Выберите правильный вопрос:');
}

export default function GrammarPathPractice() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isRu = language === 'ru';

  const { lesson } = findLesson(lessonId);

  const [attemptKey, setAttemptKey] = useState(0);
  const [exIndex, setExIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Collect and randomize exercises from all units of this lesson
  const questions = useMemo(() => {
    if (!lesson) return [];
    const pool = [];
    lesson.units.forEach((unit) => {
      pool.push(...unit.exercises);
    });
    return shuffleArray(pool);
  }, [lesson, attemptKey]);

  const question = questions[exIndex];
  const shuffled = useMemo(() => (question ? shuffleOptions(question) : null), [question]);

  const handleExit = () => navigate('/grammar/path');

  useEffect(() => {
    if (finished) {
      const passed = isPassed(score, questions.length);
      if (passed) {
        savePracticeComplete(lessonId, score, questions.length);
        playFinishedSound();
        vibrate([100, 50, 100, 50, 150]);
      } else {
        playWrongSound();
        vibrate([200]);
      }
    }
  }, [finished, score, questions.length, lessonId]);

  // Handle Enter key shortcut for answered questions and results screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        if (finished) {
          e.preventDefault();
          handleRetry();
        } else if (answered) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finished, answered, exIndex, questions.length]);

  if (!lesson) {
    return (
      <div className="grammar-topic-error">
        <div className="error-icon">🔍</div>
        <h2>{t('grammar.topicNotFound')}</h2>
        <button className="btn btn-primary" onClick={handleExit}>{t('grammar.backToGrammar')}</button>
      </div>
    );
  }

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);

    const isCorrect = idx === shuffled.correct;
    if (isCorrect) {
      playCorrectSound();
      vibrate([50, 30, 50]);
      setScore((s) => s + 1);
      if (shuffled.options[idx]) {
        speakWord(shuffled.options[idx], 'en-US');
      }
    } else {
      playWrongSound();
      vibrate([200]);
      setWrongCount((w) => w + 1);
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionText: formatQuestionText(question.text, isRu),
        selected: idx,
        correct: shuffled.correct,
        isCorrect,
        explanation: getFormattedExplanation(question.explanation, isRu ? 'ru' : 'uz'),
        options: shuffled.options,
      },
    ]);
  };

  const handleNext = () => {
    if (exIndex + 1 < questions.length) {
      setExIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetry = () => {
    setAttemptKey((k) => k + 1);
    setExIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setWrongCount(0);
    setFinished(false);
    setAnswers([]);
  };

  const lessonTitle = isRu && lesson.titleRu ? lesson.titleRu : lesson.title;
  const practiceBadgeText = isRu ? 'ПРАКТИКА' : 'MASHQ';

  // ─── RESULTS SCREEN ──────────────────────────────────────────────────────
  if (finished) {
    const passed = isPassed(score, questions.length);
    return (
      <div className="grammar-topic-page">
        <div className="grammar-topic-header">
          <button className="btn-back" onClick={handleExit}>{t('grammar.back')}</button>
          <div className="topic-header-info">
            <span className="topic-header-icon">🎯</span>
            <h1 className="topic-header-title">{practiceBadgeText}: {lessonTitle}</h1>
          </div>
        </div>

        <div className="results-panel">
          <div className="gpl-result-icon">{passed ? '🎉' : '💪'}</div>
          <h2 className="results-title" style={{ color: passed ? 'var(--success)' : 'var(--error)' }}>
            {passed
              ? (isRu ? 'Практика успешно пройдена!' : 'Mashq muvaffaqiyatli topshirildi!')
              : (isRu ? 'Попробуйте ещё раз' : 'Qayta urinib ko\'ring')}
          </h2>
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
              <span className="stat-num">{questions.length}</span>
              <span className="stat-lbl">{t('grammar.totalLbl')}</span>
            </div>
          </div>
          <div className="results-progress-bar">
            <div className="results-progress-fill" style={{ width: `${(score / questions.length) * 100}%` }} />
          </div>
          <p className="results-pct">{t('grammar.pctCorrect', { pct: Math.round((score / questions.length) * 100) })}</p>

          <div className="results-actions">
            <button className="btn btn-primary" onClick={handleRetry}>
              {t('grammar.tryAgain')}
            </button>
            <button className="btn btn-ghost" onClick={handleExit}>
              {t('grammar.pathBackToPath')}
            </button>
          </div>

          {wrongCount > 0 && (
            <div className="wrong-answers-review">
              <h3 className="review-title">{t('grammar.incorrectAnswersTitle')}</h3>
              {answers.filter((a) => !a.isCorrect).map((a, i) => (
                <div key={i} className="review-item">
                  <p className="review-question">{a.questionText}</p>
                  <div className="review-options-row">
                    <span className="review-wrong-answer">✗ {a.options[a.selected]}</span>
                    <span className="review-correct-answer">✓ {a.options[a.correct]}</span>
                  </div>
                  {a.explanation && <p className="review-explanation">💡 {a.explanation}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── PRACTICE QUIZ SCREEN ───────────────────────────────────────────────
  if (!question) return null;

  return (
    <div className="grammar-topic-page clean-theme">
      <div className="clean-quiz-header">
        <button className="clean-back-arrow" onClick={handleExit} title="Back">←</button>
        <h1 className="clean-quiz-title">🎯 {practiceBadgeText}: {lessonTitle}</h1>
        <div className="clean-quiz-progress-pill">{exIndex + 1} / {questions.length}</div>
      </div>

      <div className="topic-progress-track clean-track">
        <div className="topic-progress-fill" style={{ width: `${(exIndex / questions.length) * 100}%` }} />
      </div>

      <div className="clean-quiz-body">
        <p className="clean-question-text">{formatQuestionText(question.text, isRu)}</p>
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
              <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={answered}>
                <span className="option-left-group">
                  <span className="option-text-only">{opt}</span>
                </span>
                {answered && idx === shuffled.correct && <span className="option-badge-icon correct-badge">✓</span>}
                {answered && idx === selected && idx !== shuffled.correct && <span className="option-badge-icon wrong-badge">✗</span>}
              </button>
            );
          })}
        </div>

        {answered && question.explanation && (
          <p className="clean-explanation-text" style={{ marginBottom: 'var(--space-lg)' }}>
            💡 {getFormattedExplanation(question.explanation, isRu ? 'ru' : 'uz')}
          </p>
        )}

        {answered && (
          <button className="clean-next-btn" onClick={handleNext}>
            {exIndex + 1 >= questions.length ? t('grammar.viewResults') : t('grammar.nextQuestion')}
          </button>
        )}
      </div>
    </div>
  );
}
