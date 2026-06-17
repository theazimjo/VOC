import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarData } from '../data/grammarData';
import './GrammarTopic.css';

export default function GrammarTopic() {
  const { level = 'beginner', topicId } = useParams();
  const navigate = useNavigate();

  const levelData = grammarData[level];
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
  const progressRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQ]);

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

  const questions = topic.questions || [];
  const totalQ = questions.length;
  const question = questions[currentQ];
  const progressPct = totalQ > 0 ? ((currentQ) / totalQ) * 100 : 0;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowExplanation(false);

    const isCorrect = idx === question.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setWrongCount((w) => w + 1);
    }
    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        questionText: question.text,
        selected: idx,
        correct: question.correct,
        isCorrect,
        explanation: question.explanation,
        options: question.options,
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
      <div className="grammar-topic-page">
        <div className="grammar-topic-header">
          <button className="btn-back" onClick={() => setShowGuide(false)}>
            ← Testga qaytish
          </button>
          <div className="topic-header-info">
            <span className="topic-header-icon">{topic.icon}</span>
            <div>
              <h1 className="topic-header-title">{topic.title}</h1>
              <span className="topic-header-sub">Qo'llanma / Guide</span>
            </div>
          </div>
        </div>

        <div className="guide-panel">
          <div className="guide-content">
            {topic.guide.split('\n').map((para, i) =>
              para.trim() ? (
                <p key={i} className={para.startsWith('•') ? 'guide-bullet' : para.startsWith('##') ? 'guide-section-title' : 'guide-para'}>
                  {para.replace(/^##\s*/, '')}
                </p>
              ) : (
                <div key={i} className="guide-spacer" />
              )
            )}
          </div>
          <div className="guide-actions">
            <button className="btn btn-primary" onClick={() => setShowGuide(false)}>
              ✅ Testni boshlash
            </button>
          </div>
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
          <button className="btn-back" onClick={() => navigate('/grammar')}>
            ← Grammatikaga qaytish
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
            <button className="btn btn-ghost" onClick={() => navigate('/grammar')}>
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
    <div className="grammar-topic-page">
      {/* Header */}
      <div className="grammar-topic-header">
        <button className="btn-back" onClick={() => navigate('/grammar')}>
          ← Orqaga
        </button>
        <div className="topic-header-info">
          <span className="topic-header-icon">{topic.icon}</span>
          <div>
            <h1 className="topic-header-title">{topic.title}</h1>
            <span className="topic-header-sub">
              {currentQ + 1} / {totalQ} savol
            </span>
          </div>
        </div>
        <button
          className="btn-guide"
          onClick={() => setShowGuide(true)}
          title="Qo'llanmani ko'rish"
        >
          📖 Qo'llanma
        </button>
      </div>

      {/* Progress bar */}
      <div className="topic-progress-track" ref={progressRef}>
        <div
          className="topic-progress-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Score row */}
      <div className="topic-score-row">
        <span className="score-correct">✅ {score}</span>
        <span className="score-wrong">❌ {wrongCount}</span>
        <span className="score-remaining">📝 {totalQ - currentQ} qoldi</span>
      </div>

      {/* Question card */}
      <div className="question-card" key={question.id}>
        <div className="question-number-badge">
          {currentQ + 1}
        </div>
        <p className="question-text">{question.text}</p>

        <div className="options-grid">
          {question.options.map((opt, idx) => {
            let cls = 'option-btn';
            if (answered) {
              if (idx === question.correct) cls += ' correct';
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
              >
                <span className="option-letter">
                  {['A', 'B', 'C', 'D'][idx]}
                </span>
                <span className="option-text">{opt}</span>
                {answered && idx === question.correct && (
                  <span className="option-check">✓</span>
                )}
                {answered && idx === selected && idx !== question.correct && (
                  <span className="option-x">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation toggle */}
        {answered && question.explanation && (
          <div className="explanation-block">
            <button
              className="btn-explanation-toggle"
              onClick={() => setShowExplanation((s) => !s)}
            >
              💡 {showExplanation ? "Tushuntirishni yashirish" : "Tushuntirishni ko'rish"}
            </button>
            {showExplanation && (
              <p className="explanation-text">{question.explanation}</p>
            )}
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button className="btn btn-primary btn-next" onClick={handleNext}>
            {currentQ + 1 >= totalQ ? '🏁 Natijalarni ko\'rish' : 'Keyingi savol →'}
          </button>
        )}
      </div>
    </div>
  );
}
