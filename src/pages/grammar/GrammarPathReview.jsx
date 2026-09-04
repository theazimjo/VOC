import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarPathSections } from '../../data/grammarPathData';
import { useLanguage } from '../../contexts/LanguageContext';
import { isPassed, saveReviewComplete } from '../../utils/grammarPathProgress';
import { getFormattedExplanation } from '../../utils/grammarExplanationTranslator';
import { formatQuestionText, formatOptionText } from '../../utils/grammarQuestionTranslator';
import './GrammarTopic.css';
import './GrammarPath.css';

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

export default function GrammarPathReview() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isRu = language === 'ru';

  const section = grammarPathSections.find((s) => s.id === sectionId);

  const [attemptKey, setAttemptKey] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const exercises = useMemo(
    () => (section ? shuffleArray(section.review.exercises) : []),
    [section, attemptKey]
  );
  const totalQ = exercises.length;
  const question = exercises[currentQ];
  const shuffled = useMemo(() => (question ? shuffleOptions(question) : null), [question]);
  const progressPct = totalQ > 0 ? (currentQ / totalQ) * 100 : 0;

  const handleExit = () => navigate('/grammar/path');

  if (!section) {
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
    if (isCorrect) setScore((s) => s + 1);
    else setWrongCount((w) => w + 1);

    setAnswers((prev) => [
      ...prev,
      {
        questionText: formatQuestionText(question.text, language),
        selected: idx,
        correct: shuffled.correct,
        isCorrect,
        explanation: question.explanationRu || getFormattedExplanation(question.explanation, isRu ? 'ru' : 'uz'),
        options: shuffled.options,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQ) {
      const passed = isPassed(score, totalQ);
      if (passed) saveReviewComplete(section.id, score, totalQ);
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRetry = () => {
    setAttemptKey((k) => k + 1);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setWrongCount(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    const passed = isPassed(score, totalQ);
    return (
      <div className="grammar-topic-page">
        <div className="grammar-topic-header">
          <button className="btn-back" onClick={handleExit}>{t('grammar.back')}</button>
          <div className="topic-header-info">
            <span className="topic-header-icon">🏆</span>
            <h1 className="topic-header-title">{section.review.title}</h1>
          </div>
        </div>

        <div className="results-panel">
          <div className="gpl-result-icon">{passed ? '🏆' : '💪'}</div>
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
              <span className="stat-num">{totalQ}</span>
              <span className="stat-lbl">{t('grammar.totalLbl')}</span>
            </div>
          </div>
          <div className="results-progress-bar">
            <div className="results-progress-fill" style={{ width: `${(score / totalQ) * 100}%` }} />
          </div>
          <p className="results-pct">{t('grammar.pctCorrect', { pct: Math.round((score / totalQ) * 100) })}</p>

          <div className="results-actions">
            {passed ? (
              <button className="btn btn-primary" onClick={handleExit}>{t('grammar.pathBackToPath')}</button>
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
                    <span className="review-wrong-answer">✗ {formatOptionText(a.options[a.selected], language)}</span>
                    <span className="review-correct-answer">✓ {formatOptionText(a.options[a.correct], language)}</span>
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

  if (!question) return null;

  return (
    <div className="grammar-topic-page clean-theme">
      <div className="clean-quiz-header">
        <button className="clean-back-arrow" onClick={handleExit} title="Back">←</button>
        <h1 className="clean-quiz-title">🏆 {section.review.title}</h1>
        <div className="clean-quiz-progress-pill">{currentQ + 1} / {totalQ}</div>
      </div>

      <div className="topic-progress-track clean-track">
        <div className="topic-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="clean-quiz-body">
        <p className="clean-question-text">{formatQuestionText(question.text, language)}</p>
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
                  <span className="option-text-only">{formatOptionText(opt, language)}</span>
                </span>
                {answered && idx === shuffled.correct && <span className="option-badge-icon correct-badge">✓</span>}
                {answered && idx === selected && idx !== shuffled.correct && <span className="option-badge-icon wrong-badge">✗</span>}
              </button>
            );
          })}
        </div>

        {answered && question.explanation && (
          <p className="clean-explanation-text" style={{ marginBottom: 'var(--space-lg)' }}>
            💡 {question.explanationRu || getFormattedExplanation(question.explanation, isRu ? 'ru' : 'uz')}
          </p>
        )}

        {answered && (
          <button className="clean-next-btn" onClick={handleNext}>
            {currentQ + 1 >= totalQ ? t('grammar.viewResults') : t('grammar.nextQuestion')}
          </button>
        )}
      </div>
    </div>
  );
}
