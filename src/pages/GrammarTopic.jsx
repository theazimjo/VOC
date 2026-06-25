import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grammarData } from '../data/grammarData';
import { useGrammarStats } from '../hooks/useGrammarStats';
import { getQuestionsForExercise, getExerciseType } from '../utils/grammarHelpers';
import './GrammarTopic.css';

// ─── SCRAMBLED SENTENCE EXERCISE ────────────────────────────────────────────
function ScrambledExercise({ question, answered, onAnswer }) {
  const [selected, setSelected] = useState([]);
  const [shuffledWords] = useState(() => [...question.words].sort(() => Math.random() - 0.5));
  const [isCorrect, setIsCorrect] = useState(null);

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
    const userAnswer = selected.join(' ');
    const correct = userAnswer.trim() === (question.answer || '').trim();
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
        <button className="clean-next-btn" onClick={checkAnswer} style={{ marginTop: '16px' }}>
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
  const [sessionKey, setSessionKey] = useState(0);
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

  const questions = useMemo(() => {
    return getQuestionsForExercise(topic, exerciseId);
  }, [topic, exerciseId, sessionKey]);

  const totalQ = questions.length;
  const question = questions[currentQ];
  const progressPct = totalQ > 0 ? ((currentQ) / totalQ) * 100 : 0;

  useEffect(() => {
    if (finished && topic && totalQ > 0) {
      saveGrammarResult(level, topicId, topic.title, score, totalQ, exerciseId)
        .catch((err) => console.error("Error saving grammar result:", err));
    }
  }, [finished, level, topicId, topic, score, totalQ, saveGrammarResult, exerciseId]);

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
      {/* Clean Header Bar */}
      <div className="clean-quiz-header">
        <button className="clean-back-arrow" onClick={() => navigate(`/grammar/${level}/${topicId}`)} title="Orqaga">
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
        <p className="clean-question-text">{question.text || question.answer}</p>
      )}

      {/* Scrambled Sentence Exercise */}
      {parseInt(exerciseId) === 3 && question.words ? (
        <ScrambledExercise
          question={question}
          answered={answered}
          onAnswer={(isCorrect) => {
            setAnswered(true);
            if (isCorrect) setScore(s => s + 1);
            else setWrongCount(w => w + 1);
            setAnswers(prev => [...prev, {
              questionId: question.id,
              questionText: `Arrange: ${question.words.join(' ')}`,
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
          {(question.options || []).map((opt, idx) => {
            let cls = 'clean-option-btn';
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
                disabled={answered}
              >
                <span className="option-text-only">{opt}</span>
                {answered && idx === question.correct && (
                  <span className="option-badge-icon correct-badge">✓</span>
                )}
                {answered && idx === selected && idx !== question.correct && (
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
