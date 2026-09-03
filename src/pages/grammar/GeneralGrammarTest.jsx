import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { generalGrammarTestQuestions } from '../../data/generalGrammarTestData';
import { useLanguage } from '../../contexts/LanguageContext';
import './GrammarTopic.css';
import './GeneralGrammarTest.css';

const BEST_SCORE_KEY = 'general_grammar_test_best';
const ROUND_SIZE = 10;
const STRUCTURE_PER_ROUND = 2;
const BUILD_PER_ROUND = 2;

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Each round is a fresh random draw of ROUND_SIZE questions (not the whole
// pool), stratified so a round always mixes in a couple of
// structure-identification items and a couple of formula-building items
// rather than risking an all-mc round.
function buildRound() {
  const structurePool = generalGrammarTestQuestions.filter((q) => q.type === 'structure');
  const buildPool = generalGrammarTestQuestions.filter((q) => q.type === 'build');
  const mcPool = generalGrammarTestQuestions.filter((q) => q.type === 'mc');
  const structurePicks = shuffleArray(structurePool).slice(0, STRUCTURE_PER_ROUND);
  const buildPicks = shuffleArray(buildPool).slice(0, BUILD_PER_ROUND);
  const mcPicks = shuffleArray(mcPool).slice(0, ROUND_SIZE - structurePicks.length - buildPicks.length);
  return shuffleArray([...structurePicks, ...buildPicks, ...mcPicks]);
}

// "Struktura yasash": the tense name is given; the learner taps formula
// pieces (Subject, will, Verb+ing, ...) from a tile bank — which also
// contains a few decoy pieces from other tenses — into the correct order.
function FormulaBuildStep({ question, onAnswer, t }) {
  const [builtTiles, setBuiltTiles] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [tileBank] = useState(() =>
    shuffleArray([...question.sequence, ...question.distractors].map((text, idx) => ({ id: idx, text })))
  );

  const handleTapBank = (tile) => {
    if (isCorrect !== null) return;
    setBuiltTiles((prev) => [...prev, tile]);
  };

  const handleTapBuilt = (tile) => {
    if (isCorrect !== null) return;
    setBuiltTiles((prev) => prev.filter((tl) => tl.id !== tile.id));
  };

  const checkAnswer = () => {
    const userSeq = builtTiles.map((tl) => tl.text);
    const match =
      userSeq.length === question.sequence.length &&
      userSeq.every((val, i) => val === question.sequence[i]);
    setIsCorrect(match);
    onAnswer(match);
  };

  return (
    <div className="scrambled-exercise">
      <p className="scrambled-instruction">{t('grammar.generalTestBuildInstruction')}</p>

      <div className="scrambled-built-area">
        {builtTiles.length === 0 ? (
          <span className="scrambled-placeholder">{t('grammar.scrambledPlaceholder')}</span>
        ) : (
          builtTiles.map((tile) => (
            <button key={tile.id} className="scrambled-word selected" onClick={() => handleTapBuilt(tile)}>
              {tile.text}
            </button>
          ))
        )}
      </div>

      <div className="scrambled-word-bank">
        {tileBank.map((tile) => {
          const isUsed = builtTiles.some((tl) => tl.id === tile.id);
          return (
            <button
              key={tile.id}
              className={`scrambled-word ${isUsed ? 'used' : ''}`}
              onClick={() => !isUsed && handleTapBank(tile)}
              disabled={isUsed}
            >
              {tile.text}
            </button>
          );
        })}
      </div>

      {isCorrect !== null && (
        <div className={`scrambled-result ${isCorrect ? 'correct' : 'wrong'}`}>
          <span className="scrambled-result-row">
            {isCorrect ? t('grammar.correctBadge') : t('grammar.wrongBadge', { answer: question.sequence.join(' + ') })}
          </span>
          {question.explanation && <p className="scrambled-explanation">{question.explanation}</p>}
        </div>
      )}

      {isCorrect === null && builtTiles.length > 0 && (
        <button className="clean-next-btn" onClick={checkAnswer}>
          {t('grammar.check')}
        </button>
      )}
    </div>
  );
}

function shuffleOptions(question) {
  const order = question.options.map((_, i) => i);
  const shuffledOrder = shuffleArray(order);
  return {
    options: shuffledOrder.map((i) => question.options[i]),
    correct: shuffledOrder.indexOf(question.correct),
  };
}

function loadBestScore() {
  try {
    const raw = localStorage.getItem(BEST_SCORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveBestScore(score, total) {
  try {
    const prev = loadBestScore();
    if (!prev || score > prev.score) {
      localStorage.setItem(BEST_SCORE_KEY, JSON.stringify({ score, total, date: Date.now() }));
    }
  } catch {
    // localStorage unavailable — best-score persistence is optional.
  }
}

export default function GeneralGrammarTest() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [sessionKey, setSessionKey] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = useMemo(() => buildRound(), [sessionKey]);
  const totalQ = questions.length;
  const question = questions[currentQ];
  const shuffled = useMemo(
    () => (question && question.type !== 'build' ? shuffleOptions(question) : null),
    [question]
  );
  const progressPct = totalQ > 0 ? (currentQ / totalQ) * 100 : 0;

  const handleExit = useCallback(() => {
    navigate('/grammar');
  }, [navigate]);

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowExplanation(false);

    const isCorrect = idx === shuffled.correct;
    if (isCorrect) setScore((s) => s + 1);
    else setWrongCount((w) => w + 1);

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
      saveBestScore(score, totalQ);
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setSessionKey((k) => k + 1);
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
    if (pct >= 90) return { emoji: '🏆', label: t('grammar.gradeExcellent'), color: 'var(--accent-2)' };
    if (pct >= 70) return { emoji: '🌟', label: t('grammar.gradeGood'), color: 'var(--accent-1)' };
    if (pct >= 50) return { emoji: '📚', label: t('grammar.gradeSatisfactory'), color: 'var(--accent-3)' };
    return { emoji: '💪', label: t('grammar.gradePracticeMore'), color: 'var(--error)' };
  };

  if (finished) {
    const grade = getScoreGrade();
    return (
      <div className="grammar-topic-page">
        <div className="grammar-topic-header">
          <button className="btn-back" onClick={handleExit}>{t('grammar.back')}</button>
          <div className="topic-header-info">
            <span className="topic-header-icon">🧠</span>
            <h1 className="topic-header-title">{t('grammar.generalTestTitle')}</h1>
          </div>
        </div>

        <div className="results-panel">
          <div className="results-grade-badge" style={{ color: grade.color }}>{grade.emoji}</div>
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
            <div className="results-progress-fill" style={{ width: `${(score / totalQ) * 100}%` }} />
          </div>
          <p className="results-pct">{t('grammar.pctCorrect', { pct: Math.round((score / totalQ) * 100) })}</p>

          <div className="results-actions">
            <button className="btn btn-primary" onClick={handleRestart}>{t('grammar.tryAgain')}</button>
            <button className="btn btn-ghost" onClick={handleExit}>{t('grammar.backToGrammar')}</button>
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

  if (!question) return null;

  return (
    <div className="grammar-topic-page clean-theme">
      <div className="clean-quiz-header">
        <button className="clean-back-arrow" onClick={handleExit} title="Back">←</button>
        <h1 className="clean-quiz-title">🧠 {t('grammar.generalTestTitle')}</h1>
        <div className="clean-quiz-progress-pill">{currentQ + 1} / {totalQ}</div>
      </div>

      <div className="topic-progress-track clean-track">
        <div className="topic-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="clean-quiz-body">
        {question.type === 'build' ? (
          <>
            <p className="ggt-structure-label">{t('grammar.generalTestBuildPrompt')}</p>
            <div className="ggt-sentence-card">{question.label}</div>
            <FormulaBuildStep
              key={question.id}
              question={question}
              t={t}
              onAnswer={(isCorrect) => {
                setAnswered(true);
                if (isCorrect) setScore((s) => s + 1);
                else setWrongCount((w) => w + 1);
                setAnswers((prev) => [
                  ...prev,
                  {
                    questionId: question.id,
                    questionText: question.label,
                    selected: 0,
                    correct: 0,
                    isCorrect,
                    explanation: question.explanation,
                    options: [question.sequence.join(' + ')],
                  },
                ]);
              }}
            />
          </>
        ) : question.type === 'structure' ? (
          <>
            <p className="ggt-structure-label">{t('grammar.generalTestStructurePrompt')}</p>
            <div className="ggt-sentence-card">“{question.text}”</div>
            <div className="ggt-chip-grid">
              {(shuffled?.options || []).map((opt, idx) => {
                let cls = 'ggt-chip';
                if (answered) {
                  if (idx === shuffled.correct) cls += ' correct';
                  else if (idx === selected) cls += ' wrong';
                  else cls += ' dimmed';
                } else if (selected === idx) {
                  cls += ' selected';
                }
                return (
                  <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={answered}>
                    {opt}
                    {answered && idx === shuffled.correct && <span className="ggt-chip-badge">✓</span>}
                    {answered && idx === selected && idx !== shuffled.correct && <span className="ggt-chip-badge">✗</span>}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <p className="clean-question-text">{question.text}</p>
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
          </>
        )}

        {answered && question.explanation && question.type !== 'build' && (
          <div className="clean-explanation-block">
            <button className="clean-explanation-toggle" onClick={() => setShowExplanation((s) => !s)}>
              {showExplanation ? t('grammar.hideExplanation') : t('grammar.showExplanation')}
            </button>
            {showExplanation && <p className="clean-explanation-text">{question.explanation}</p>}
          </div>
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
