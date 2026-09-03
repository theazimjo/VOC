import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarPathSections } from '../../data/grammarPathData';
import { useLanguage } from '../../contexts/LanguageContext';
import { isPassed, saveLessonComplete } from '../../utils/grammarPathProgress';
import { speakWord } from '../../utils/helpers';
import { getFormattedExplanation } from '../../utils/grammarExplanationTranslator';
import './GrammarTopic.css';
import './GrammarPath.css';

// ─── AUDIO & SOUND HELPERS ──────────────────────────────────────────────────
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
      return { section, lesson: section.lessons[idx], lessonIndex: idx };
    }
  }
  return { section: null, lesson: null, lessonIndex: -1 };
}

function parseExample(exampleStr) {
  if (!exampleStr) return { english: '', translation: '' };
  const match = exampleStr.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  if (match && match[1]) {
    return {
      english: match[1].trim(),
      translation: match[2] ? match[2].trim() : '',
    };
  }
  return { english: exampleStr, translation: '' };
}

function translateExampleTranslation(translation, isRu) {
  if (!translation || !isRu) return translation;
  const map = {
    'Men talabaman.': 'Я студент.',
    'Men xursandman.': 'Я счастлив.',
    'Men pitssani yaxshi ko\'raman.': 'Я люблю пиццу.',
    'Men kofeni yaxshi ko\'rmayman. Men sizni taniymanmi?': 'Я не люблю кофе. Я знаю вас?',
    'Men bandman, lekin kutishni yoqtirmayman.': 'Я занят, но не люблю ждать.',
    'Siz mening do\'stimisiz.': 'Вы мой друг.',
    'Siz aqllisiz.': 'Вы умный.',
    'Siz pitssani yaxshi ko\'rasiz.': 'Вы любите пиццу.',
    'Siz kofeni yaxshi ko\'rmaysiz. Men sizni taniymanmi?': 'Вы не любите кофе. Вы знаете меня?',
    'Siz mehribonsiz, lekin quloq solmaysiz.': 'Вы добрый, но не слушаете.',
    'U mening akam/ukam.': 'Он мой брат.',
    'U baland bo\'yli.': 'Он высокий.',
    'U pitssani yaxshi ko\'radi.': 'Он любит пиццу.',
    'U kofeni yaxshi ko\'rmaydi. U sizni taniydimi?': 'Он не любит кофе. Он знает вас?',
    'U band, lekin kutishni yoqtirmaydi.': 'Он занят, но не любит ждать.',
    'U mening opam/singlim.': 'Она моя сестра.',
    'U aqlli.': 'Она умная.',
    'U pitssani yaxshi ko\'radi.': 'Она любит пиццу.',
    'U kofeni yaxshi ko\'rmaydi. U sizni taniydimi?': 'Она не любит кофе. Она знает вас?',
    'U band, lekin kutishni yoqtirmaydi.': 'Она занята, но не любит ждать.',
    'Bu mushuk.': 'Это кошка.',
    'U kichkina.': 'Оно маленькое.',
    'Mushuk sutni yaxshi ko\'radi. = U sutni yaxshi ko\'radi.': 'Кошка любит молоко. = Оно любит молоко.',
    'U ishlamayapti. Unga suv kerakmi?': 'Оно не работает. Ему нужна вода?',
    'Bu buzilgan va ishlamayapti.': 'Оно сломано и не работает.',
    'Biz do\'stlarmiz.': 'Мы друзья.',
    'Biz tayyormiz.': 'Мы готовы.',
    'Biz pitssani yaxshi ko\'ramiz.': 'Мы любим пиццу.',
    'Biz bilmaymiz. Bizda vaqt bormi?': 'Мы не знаем. У нас есть время?',
    'Biz charchadik, lekin to\'xtashni xohlamaymiz.': 'Мы устали, но не хотим останавливаться.',
    'Ular talabalar.': 'Они студенты.',
    'Ular o\'qituvchilar.': 'Они учителя.',
    'Ular pitssani yaxshi ko\'radi.': 'Они любят пиццу.',
    'Ular bu yerda yashamaydi. Ular sizni taniydimi?': 'Они здесь не живут. Они знают вас?',
    'Ular band, lekin shikoyat qilishmaydi.': 'Они заняты, но не жалуются.',
  };
  return map[translation] || getFormattedExplanation(translation, 'ru');
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

function formatRuleText(text) {
  if (!text) return text;
  const parts = text.split(/("[^"]+")/g);
  return parts.map((part, idx) => {
    if (part.startsWith('"') && part.endsWith('"') && part.length > 2) {
      return (
        <span key={idx} className="gpl-rule-highlight">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function GrammarPathLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isRu = language === 'ru';

  const { section, lesson, lessonIndex } = findLesson(lessonId);
  const nextLesson = section ? section.lessons[lessonIndex + 1] : null;

  const [attemptKey, setAttemptKey] = useState(0);
  const [unitIndex, setUnitIndex] = useState(0);
  const [phase, setPhase] = useState('teach'); // 'teach' | 'practice' | 'passed' | 'failed'
  const [exIndex, setExIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answers, setAnswers] = useState([]);

  const totalQuestions = useMemo(
    () => (lesson ? lesson.units.reduce((sum, u) => sum + u.exercises.length, 0) : 0),
    [lesson]
  );
  const answeredSoFar = useMemo(() => {
    if (!lesson) return 0;
    let count = 0;
    for (let i = 0; i < unitIndex; i++) count += lesson.units[i].exercises.length;
    return count + exIndex;
  }, [lesson, unitIndex, exIndex]);

  const unit = lesson?.units[unitIndex];
  const exercises = useMemo(() => (unit ? shuffleArray(unit.exercises) : []), [unit, attemptKey]);
  const question = exercises[exIndex];
  const shuffled = useMemo(() => (question ? shuffleOptions(question) : null), [question]);

  const handleExit = () => navigate('/grammar/path');

  useEffect(() => {
    if (phase === 'passed') {
      playFinishedSound();
      vibrate([100, 50, 100, 50, 150]);
    } else if (phase === 'failed') {
      playWrongSound();
      vibrate([200]);
    }
  }, [phase]);

  if (!lesson) {
    return (
      <div className="grammar-topic-error">
        <div className="error-icon">🔍</div>
        <h2>{t('grammar.topicNotFound')}</h2>
        <button className="btn btn-primary" onClick={handleExit}>{t('grammar.backToGrammar')}</button>
      </div>
    );
  }

  const handleStartUnit = () => {
    setPhase('practice');
    setExIndex(0);
    setSelected(null);
    setAnswered(false);
  };

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
    if (exIndex + 1 < exercises.length) {
      setExIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      return;
    }
    if (unitIndex + 1 < lesson.units.length) {
      setUnitIndex((i) => i + 1);
      setPhase('teach');
      setExIndex(0);
      setSelected(null);
      setAnswered(false);
    } else {
      const passed = isPassed(score, totalQuestions);
      if (passed) saveLessonComplete(lesson.id, score, totalQuestions);
      setPhase(passed ? 'passed' : 'failed');
    }
  };

  const handleRetry = () => {
    setAttemptKey((k) => k + 1);
    setUnitIndex(0);
    setPhase('teach');
    setExIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setWrongCount(0);
    setAnswers([]);
  };

  // ─── TEACH SCREEN (one small rule for the current unit) ─────────────────
  if (phase === 'teach') {
    const rawExample = (isRu && unit.teach.exampleRu) ? unit.teach.exampleRu : unit.teach.example;
    const { english, translation } = parseExample(rawExample);
    const translatedTranslation = isRu && !unit.teach.exampleRu ? translateExampleTranslation(translation, isRu) : translation;

    const rawRule = (isRu && unit.teach.ruleRu)
      ? unit.teach.ruleRu
      : (isRu)
      ? getFormattedExplanation(unit.teach.rule, 'ru')
      : unit.teach.rule;

    const lessonTitle = isRu && lesson.titleRu ? lesson.titleRu : lesson.title;

    return (
      <div className="grammar-topic-page clean-theme">
        {/* Clean Header Bar */}
        <div className="clean-quiz-header">
          <button className="clean-back-arrow" onClick={handleExit} title="Back">←</button>
          <h1 className="clean-quiz-title">{lesson.icon} {lessonTitle}</h1>
          <div className="clean-quiz-progress-pill">
            {t('grammar.pathUnitN', { n: unitIndex + 1, total: lesson.units.length })}
          </div>
        </div>

        {/* Progress Track */}
        <div className="topic-progress-track clean-track">
          <div
            className="topic-progress-fill"
            style={{ width: `${(unitIndex / lesson.units.length) * 100}%` }}
          />
        </div>

        {/* Teach Body Card */}
        <div className="clean-quiz-body">
          <div className="gpl-teach-card">
            <div className="gpl-rule-badge">
              <span>💡</span> {isRu ? 'ГРАММАТИЧЕСКОЕ ПРАВИЛО' : 'GRAMMATIKA QOIDASI'}
            </div>

            <h2 className="gpl-teach-intro">{formatRuleText(rawRule)}</h2>

            {unit.teach.example && (
              <div className="gpl-example-box">
                <div className="gpl-example-header">
                  <span className="gpl-example-label">💬 {isRu ? 'ПРИМЕР' : 'MISOL'}</span>
                  {english && (
                    <button
                      type="button"
                      className="gpl-speak-btn"
                      onClick={() => speakWord(english, 'en-US')}
                    >
                      🔊 {t('grammar.listen')}
                    </button>
                  )}
                </div>
                <div className="gpl-example-text">{english || unit.teach.example}</div>
                {translatedTranslation && (
                  <div className="gpl-example-translation">({translatedTranslation})</div>
                )}
              </div>
            )}

            {unit.teach.points && unit.teach.points.length > 0 && (
              <div className="gpl-points-list">
                {unit.teach.points.map((pt, idx) => (
                  <div key={idx} className="gpl-point-item">
                    <span className="gpl-point-rule">{formatRuleText(isRu ? getFormattedExplanation(pt.rule, 'ru') : pt.rule)}</span>
                    {pt.example && <span className="gpl-point-example">{pt.example}</span>}
                  </div>
                ))}
              </div>
            )}

            <button className="clean-next-btn gpl-start-btn" onClick={handleStartUnit}>
              {t('grammar.pathStartLesson')} →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── PASSED / FAILED SCREEN ──────────────────────────────────────────────
  if (phase === 'passed' || phase === 'failed') {
    const passed = phase === 'passed';
    return (
      <div className="grammar-topic-page">
        <div className="grammar-topic-header">
          <button className="btn-back" onClick={handleExit}>{t('grammar.back')}</button>
          <div className="topic-header-info">
            <span className="topic-header-icon">{lesson.icon}</span>
            <h1 className="topic-header-title">{lesson.title}</h1>
          </div>
        </div>

        <div className="results-panel">
          <div className="gpl-result-icon">{passed ? '🎉' : '💪'}</div>
          <h2 className="results-title" style={{ color: passed ? 'var(--success)' : 'var(--error)' }}>
            {passed ? t('grammar.pathLessonPassed') : t('grammar.pathLessonFailed')}
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
              <span className="stat-num">{totalQuestions}</span>
              <span className="stat-lbl">{t('grammar.totalLbl')}</span>
            </div>
          </div>
          <div className="results-progress-bar">
            <div className="results-progress-fill" style={{ width: `${(score / totalQuestions) * 100}%` }} />
          </div>
          <p className="results-pct">{t('grammar.pctCorrect', { pct: Math.round((score / totalQuestions) * 100) })}</p>

          <div className="results-actions">
            {passed ? (
              nextLesson ? (
                <button className="btn btn-primary" onClick={() => navigate(`/grammar/path/lesson/${nextLesson.id}`)}>
                  {t('grammar.pathNextLesson')}
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleExit}>{t('grammar.pathBackToPath')}</button>
              )
            ) : (
              <button className="btn btn-primary" onClick={handleRetry}>{t('grammar.tryAgain')}</button>
            )}
            <button className="btn btn-ghost" onClick={handleExit}>{t('grammar.pathBackToPath')}</button>
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

  // ─── PRACTICE SCREEN (only this unit's own exercises) ────────────────────
  if (!question) return null;

  return (
    <div className="grammar-topic-page clean-theme">
      <div className="clean-quiz-header">
        <button className="clean-back-arrow" onClick={handleExit} title="Back">←</button>
        <h1 className="clean-quiz-title">{lesson.icon} {isRu && lesson.titleRu ? lesson.titleRu : lesson.title}</h1>
        <div className="clean-quiz-progress-pill">{answeredSoFar + 1} / {totalQuestions}</div>
      </div>

      <div className="topic-progress-track clean-track">
        <div className="topic-progress-fill" style={{ width: `${(answeredSoFar / totalQuestions) * 100}%` }} />
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
            {(() => {
              const isLastQuestionOfUnit = exIndex + 1 >= exercises.length;
              const isLastUnit = unitIndex + 1 >= lesson.units.length;
              if (isLastQuestionOfUnit && isLastUnit) return t('grammar.viewResults');
              if (isLastQuestionOfUnit) return t('grammar.pathContinue');
              return t('grammar.nextQuestion');
            })()}
          </button>
        )}
      </div>
    </div>
  );
}
