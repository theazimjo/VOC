import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, update } from 'firebase/database';
import {
  Shuffle, Target, Volume2, X, CheckCircle2, XCircle,
  Trophy, ThumbsUp, Dumbbell, RotateCcw
} from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePacks } from '../../hooks/usePacks';
import { useStreak } from '../../hooks/useStreak';
import { shuffleArray } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { getDueWords } from '../../utils/spacedRepetition';
import { inferConfidenceFromSpeed, computeClusterCalibration, getRecommendedRetrievalType } from '../../utils/memoryEngine';
import { saveReviewEvent } from '../../experiment/experimentDB';
import { getWordCluster } from '../../experiment/semanticClassifier';
import IosSpinner from '../../components/common/IosSpinner';
import './MixedPractice.css';

const LEECH_THRESHOLD = 3;

function getResultTier(ratio, t) {
  if (ratio >= 0.8) return { Icon: Trophy, label: t ? t('mixedPractice.greatResult') : 'Great result!', color: 'var(--accent-3)', dim: 'var(--warning-dim)' };
  if (ratio >= 0.5) return { Icon: ThumbsUp, label: t ? t('mixedPractice.goodEffort') : 'Good effort, keep it up!', color: 'var(--accent-1)', dim: 'var(--accent-1-dim)' };
  return { Icon: Dumbbell, label: t ? t('mixedPractice.keepGoing') : "Keep going, you'll get there!", color: 'var(--success)', dim: 'var(--success-dim)' };
}

// Recognition-before-production sequencing: brand-new / weak words get the
// easiest (multiple-choice) format; words the learner has seen more and is
// getting right move to listening, then full spelling — the hardest,
// most production-heavy format — once mastery is high. The passive-vs-active
// split itself now comes from the same engine call Memory Lab uses
// (getRecommendedRetrievalType), instead of a second, separately-tuned
// mastery threshold that could silently drift out of sync with it.
function pickQuestionType(wordObj, poolSize) {
  if (poolSize < 4) {
    return Math.random() > 0.5 ? 'spelling' : 'dictation';
  }

  const recallType = getRecommendedRetrievalType({
    totalReviews: wordObj.reviewCount || 0,
    stability: wordObj.stability,
  });
  if (recallType === 'passive_recall') return 'quiz';

  return (wordObj.mastery || 0) < 70 ? 'dictation' : 'spelling';
}

export default function MixedPractice() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { allWords, allWordsLoading } = usePacks();
  const { incrementActivity } = useStreak();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLeechMode = searchParams.get('filter') === 'leech';
  const isDueMode = searchParams.get('filter') === 'due';

  const [step, setStep] = useState('setup'); // 'setup' | 'practice' | 'results'
  const [mixedWordsPool, setMixedWordsPool] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const questionStartRef = useRef(Date.now());

  // Word pool sourced from the shared allWords aggregator
  useEffect(() => {
    if (allWordsLoading) return;
    if (!user) return;

    let pool = allWords.map(w => ({ ...w, sourceId: w.packId }));
    if (isLeechMode) {
      pool = pool.filter(w => (w.wrongCount || 0) >= LEECH_THRESHOLD);
    } else if (isDueMode) {
      pool = getDueWords(pool);
    }
    setMixedWordsPool(pool);
    setLoading(false);
  }, [user, allWords, allWordsLoading, isLeechMode, isDueMode]);

  // Generate question queue
  const startSession = (wordsPool) => {
    if (wordsPool.length === 0) return;

    // Due mode prioritizes the most overdue words first (never-reviewed
    // words count as most urgent); other modes just sample randomly.
    const selectedWords = isDueMode
      ? [...wordsPool]
          .sort((a, b) => new Date(a.nextReview || 0) - new Date(b.nextReview || 0))
          .slice(0, 8)
      : shuffleArray(wordsPool).slice(0, 8);
    const generated = selectedWords.map((wordObj) => {
      const type = pickQuestionType(wordObj, wordsPool.length);

      let options = [];
      if (type === 'quiz') {
        const correctTranslation = (wordObj.translation || '').trim() || wordObj.word.trim();

        // Gather all valid non-empty translations from pool and allWords
        const candidatePool = wordsPool.length >= 4 ? wordsPool : [...wordsPool, ...allWords];
        const validWrongTranslations = Array.from(
          new Set(
            candidatePool
              .map(w => (w?.translation || '').trim())
              .filter(t => t.length > 0 && t.toLowerCase() !== correctTranslation.toLowerCase())
          )
        );

        // Pick 3 random wrong options
        const wrongOptions = shuffleArray(validWrongTranslations).slice(0, 3);

        // Guaranteed fallbacks if we didn't get 3 unique non-empty wrong options
        const fallbackDistractors = [
          "yashil o'simliklar", "asosiy manba", "hayotiy jarayon",
          "muhim vosita", "o'zaro ta'sir", "natijaviy bosqich",
          "boshlang'ich holat", "tashqi ko'rinish", "doimiy faoliyat"
        ];
        let fbIdx = 0;
        while (wrongOptions.length < 3 && fbIdx < fallbackDistractors.length) {
          const fb = fallbackDistractors[fbIdx++];
          if (
            fb.toLowerCase() !== correctTranslation.toLowerCase() &&
            !wrongOptions.map(o => o.toLowerCase()).includes(fb.toLowerCase())
          ) {
            wrongOptions.push(fb);
          }
        }

        options = shuffleArray([correctTranslation, ...wrongOptions]);
      }

      return {
        word: wordObj,
        type,
        options,
        userAnswer: '',
        isCorrect: null,
      };
    });

    setQuestions(generated);
    setCurrentIdx(0);
    setCorrectCount(0);
    setTypedAnswer('');
    setHasAnswered(false);
    setSelectedOption(null);
    questionStartRef.current = Date.now();
    setStep('practice');
  };

  useEffect(() => {
    if (!loading && mixedWordsPool.length > 0 && step === 'setup') {
      startSession(mixedWordsPool);
    }
  }, [loading, mixedWordsPool, step]);

  const speakWord = (text, lang = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Autoplay dictation sound on load
  useEffect(() => {
    if (step === 'practice' && questions[currentIdx]?.type === 'dictation' && !hasAnswered) {
      const timer = setTimeout(() => {
        speakWord(questions[currentIdx].word.word, questions[currentIdx].word.language);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, step, hasAnswered]);

  // Warn before closing tab during active practice
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (step === 'practice') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [step]);

  const handleExit = () => {
    if (step === 'practice') {
      if (window.confirm(t('mixedPractice.exitConfirm'))) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  // Routes through the exact same saveReviewEvent() pipeline every other
  // practice mode now uses (Memory Lab, PracticePage's 7 games) — real
  // response time + speed-inferred confidence, recallHistory recorded, and
  // the same per-semantic-cluster self-calibration. Returns the persisted
  // result so callers can keep their local question/word copies in sync.
  const handleUpdateWordStats = async (wordObj, isCorrect, responseTime, retrievalType, mode) => {
    if (!user) return null;
    try {
      const parentId = wordObj.sourceId;
      const confidence = inferConfidenceFromSpeed(responseTime, isCorrect);

      const { key: clusterKey } = getWordCluster(wordObj);
      const clusterHistory = [];
      allWords.forEach((w) => {
        if (getWordCluster(w).key === clusterKey) {
          clusterHistory.push(...(w.recallHistory || []));
        }
      });
      const clusterMultiplier = computeClusterCalibration(clusterHistory);

      const updated = await saveReviewEvent(user.uid, parentId, wordObj.id, wordObj, {
        isCorrect,
        confidence,
        responseTime,
        retrievalType,
        clusterMultiplier,
        mode,
        wordText: wordObj.word,
      });

      const prevWrongCount = wordObj.wrongCount || 0;
      const wrongCount = isCorrect ? Math.max(0, prevWrongCount - 1) : prevWrongCount + 1;
      const wordRef = ref(db, `users/${user.uid}/words/${parentId}/${wordObj.id}`);
      await update(wordRef, { wrongCount });

      return { ...updated, wrongCount };
    } catch (e) {
      console.error('Error updating word stats:', e);
      return null;
    }
  };

  const handleQuizAnswer = (option) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    const responseTime = (Date.now() - questionStartRef.current) / 1000;
    const correctVal = questions[currentIdx].word.translation;
    const isRight = option.trim().toLowerCase() === correctVal.trim().toLowerCase();

    setQuestions(prev => prev.map((q, i) => (i === currentIdx ? { ...q, isCorrect: isRight, userAnswer: option } : q)));

    if (isRight) setCorrectCount(prev => prev + 1);
    setHasAnswered(true);
    playSound(isRight ? 'correct' : 'wrong');
    triggerVibration(isRight ? 'correct' : 'wrong');
    handleUpdateWordStats(questions[currentIdx].word, isRight, responseTime, 'passive_recall', questions[currentIdx].type);
  };

  const handleTextSubmit = (e) => {
    if (e) e.preventDefault();
    if (hasAnswered) return;

    const responseTime = (Date.now() - questionStartRef.current) / 1000;
    const correctVal = questions[currentIdx].word.word.trim().toLowerCase();
    const isRight = typedAnswer.trim().toLowerCase() === correctVal;

    setQuestions(prev => prev.map((q, i) => (i === currentIdx ? { ...q, isCorrect: isRight, userAnswer: typedAnswer } : q)));

    if (isRight) setCorrectCount(prev => prev + 1);
    setHasAnswered(true);
    playSound(isRight ? 'correct' : 'wrong');
    triggerVibration(isRight ? 'correct' : 'wrong');
    handleUpdateWordStats(questions[currentIdx].word, isRight, responseTime, 'active_recall', questions[currentIdx].type);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setTypedAnswer('');
      setHasAnswered(false);
      setSelectedOption(null);
      questionStartRef.current = Date.now();
    } else {
      setStep('results');
      playSound('victory');
      triggerVibration('victory');
      incrementActivity(questions.length || 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && step === 'practice') {
        if (hasAnswered) {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, hasAnswered, currentIdx, questions]);

  const pageLoading = loading || allWordsLoading;

  return (
    <div className="mixed-practice-page">


      {pageLoading ? (
        <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
          <IosSpinner />
          <span>{t('mixedPractice.loading')}</span>
        </div>
      ) : mixedWordsPool.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">{isLeechMode ? '🎯' : isDueMode ? '✅' : '🎮'}</div>
          <h3>{isLeechMode ? t('mixedPractice.noTrickyTitle') : isDueMode ? t('mixedPractice.noDueTitle') : t('mixedPractice.noWordsTitle')}</h3>
          <p>
            {isLeechMode
              ? t('mixedPractice.noTrickyDesc')
              : isDueMode
                ? t('mixedPractice.noDueDesc')
                : t('mixedPractice.noWordsDesc')}
          </p>
          <Link to={isLeechMode ? '/stats' : isDueMode ? '/' : '/library'} className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
            {isLeechMode ? t('mixedPractice.backToStats') : isDueMode ? t('mixedPractice.backToDashboard') : t('mixedPractice.goToLibrary')}
          </Link>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {/* Step 1: Practice Session */}
          {step === 'practice' && questions.length > 0 && (
            <div className="mixed-practice-container">
              <div className="practice-session-header">
                <span className="practice-session-title">
                  {isLeechMode ? <Target size={17} strokeWidth={2.3} /> : isDueMode ? <RotateCcw size={17} strokeWidth={2.3} /> : <Shuffle size={17} strokeWidth={2.3} />}
                  {isLeechMode ? t('mixedPractice.trickyPracticeTitle') : isDueMode ? t('mixedPractice.todaysReviewTitle') : t('mixedPractice.mixedPracticeTitle')}
                </span>
                <button className="btn-exit-practice" onClick={handleExit} title={t('mixedPractice.exitBtn')}>
                  <X size={14} strokeWidth={2.4} /> {t('mixedPractice.exitBtn')}
                </button>
              </div>

              <motion.div
                key={currentIdx}
                className="mixed-practice-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
              >
              {/* Progress bar */}
              <div className="practice-progress-bar-container">
                <div className="progress-bar-label">
                  {t('mixedPractice.questionProgress', { current: currentIdx + 1, total: questions.length })}
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question area */}
              <div className="question-content">
                {questions[currentIdx].type === 'quiz' && (
                  <div className="mp-quiz-question">
                    <span className="question-prompt">{t('mixedPractice.chooseTranslation')}</span>
                    <h2 className="question-word">{questions[currentIdx].word.word}</h2>

                    <div className="quiz-options-grid">
                      {questions[currentIdx].options.map((option, idx) => {
                        const correctVal = questions[currentIdx].word.translation;
                        let optionClass = 'quiz-option-btn';

                        if (hasAnswered) {
                          if (option === correctVal) {
                            optionClass += ' correct';
                          } else if (option === selectedOption) {
                            optionClass += ' incorrect';
                          } else {
                            optionClass += ' disabled';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            className={optionClass}
                            onClick={() => handleQuizAnswer(option)}
                            disabled={hasAnswered}
                          >
                            <span className="quiz-opt-letter">{['A', 'B', 'C', 'D'][idx]}</span>
                            <span className="quiz-opt-text">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {questions[currentIdx].type === 'spelling' && (
                  <div className="spelling-question">
                    <span className="question-prompt">{t('mixedPractice.typeEnglishTranslation')}</span>
                    <h2 className="question-word">{questions[currentIdx].word.translation}</h2>

                    <form onSubmit={handleTextSubmit} className="mp-spelling-form" autoComplete="off" noValidate data-lpignore="true" data-1p-ignore="true">
                      <input
                        ref={(el) => {
                          if (el && !hasAnswered) {
                            requestAnimationFrame(() => el.focus());
                          }
                        }}
                        type="text"
                        name="practice_no_autofill_input"
                        className="mp-spelling-input"
                        placeholder={t('mixedPractice.typeEnglishWordPlaceholder')}
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        disabled={hasAnswered}
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        inputMode="text"
                        aria-autocomplete="none"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        data-form-type="other"
                        data-gramm="false"
                        data-enable-grammarly="false"
                      />
                      <button type="submit" style={{ display: 'none' }} />
                    </form>
                  </div>
                )}

                {questions[currentIdx].type === 'dictation' && (
                  <div className="dictation-question">
                    <span className="question-prompt">{t('mixedPractice.typeWordHear')}</span>
                    <div className="audio-player-container">
                      <button
                        className="audio-play-btn"
                        onClick={() => speakWord(questions[currentIdx].word.word, questions[currentIdx].word.language)}
                        title="Listen again"
                        type="button"
                      >
                        <Volume2 size={20} strokeWidth={2.2} />
                      </button>
                      <span className="audio-helper-text">{t('mixedPractice.tapHearAgain')}</span>
                    </div>

                    <form onSubmit={handleTextSubmit} className="mp-spelling-form" autoComplete="off" noValidate data-lpignore="true" data-1p-ignore="true">
                      <input
                        ref={(el) => {
                          if (el && !hasAnswered) {
                            requestAnimationFrame(() => el.focus());
                          }
                        }}
                        type="text"
                        name="practice_no_autofill_input"
                        className="mp-spelling-input"
                        placeholder={t('mixedPractice.typeWordHeardPlaceholder')}
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        disabled={hasAnswered}
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        inputMode="text"
                        aria-autocomplete="none"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        data-form-type="other"
                        data-gramm="false"
                        data-enable-grammarly="false"
                      />
                      <button type="submit" style={{ display: 'none' }} />
                    </form>
                  </div>
                )}
              </div>

              {/* Feedback footer — always present to prevent layout shift */}
              <div className={`feedback-footer ${hasAnswered ? (questions[currentIdx].isCorrect ? 'correct' : 'incorrect') : 'idle'}`}>
                <div className="feedback-content">
                  {!hasAnswered ? (
                    questions[currentIdx].type === 'quiz' ? (
                      <div className="feedback-hint-text">{t('mixedPractice.selectCorrectTranslationHint')}</div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary submit-btn"
                        onClick={handleTextSubmit}
                        disabled={!typedAnswer.trim()}
                      >
                        {t('mixedPractice.checkBtn')}
                      </button>
                    )
                  ) : (
                    <>
                      <div className="feedback-text-wrapper">
                        <span className="feedback-icon">
                          {questions[currentIdx].isCorrect
                            ? <CheckCircle2 size={22} strokeWidth={2.2} style={{ color: 'var(--success)' }} />
                            : <XCircle size={22} strokeWidth={2.2} style={{ color: 'var(--error)' }} />}
                        </span>
                        <div className="feedback-text">
                          <h4>{questions[currentIdx].isCorrect ? t('mixedPractice.correctTitle') : t('mixedPractice.incorrectTitle')}</h4>
                          {!questions[currentIdx].isCorrect && (
                            <p>
                              {t('mixedPractice.answerLabel')} <strong>{questions[currentIdx].word.word}</strong>
                              {questions[currentIdx].word.translation && ` — ${questions[currentIdx].word.translation}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <button className="btn btn-next" onClick={handleNext}>
                        {currentIdx === questions.length - 1 ? t('mixedPractice.viewResultsBtn') : t('mixedPractice.nextBtn')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
            </div>
          )}

          {/* Step 2: Results Summary */}
          {step === 'results' && (() => {
            const tier = getResultTier(questions.length > 0 ? correctCount / questions.length : 0, t);
            return (
            <div className="mixed-practice-container">
            <motion.div
              key="results"
              className="practice-results-card practice-results-card-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="result-icon-circle" style={{ background: tier.dim, color: tier.color }}>
                <tier.Icon size={44} strokeWidth={2.2} />
              </div>
              <h2>{tier.label}</h2>
              <p className="results-subtitle">{isDueMode ? t('mixedPractice.reviewCompleteSub') : t('mixedPractice.mixedPracticeCompleteSub')}</p>

              <div className="results-score-badge">
                <span className="score-value">{correctCount}</span>
                <span className="score-slash">/</span>
                <span className="score-total">{questions.length}</span>
              </div>

              <div className="results-label">{t('mixedPractice.wordsAnsweredCorrectly')}</div>

              {/* Mistakes review */}
              {questions.some(q => !q.isCorrect) && (
                <div className="mistakes-review-container">
                  <h3>{t('mixedPractice.reviewMistakesHeader')}</h3>
                  <div className="mistakes-list">
                    {questions.filter(q => !q.isCorrect).map((q, idx) => (
                      <div key={idx} className="mistake-item">
                        <div className="mistake-word-group">
                          <span className="mistake-word">{q.word.word}</span>
                          <span className="mistake-translation">{q.word.translation}</span>
                        </div>
                        <span className="mistake-your-answer">
                          {t('mixedPractice.youAnswer')} <del>{q.userAnswer || t('mixedPractice.noAnswerGiven')}</del>
                        </span>
                        <button
                          className="btn-speak-mistake"
                          onClick={() => speakWord(q.word.word, q.word.language)}
                          title="Listen to pronunciation"
                          type="button"
                        >
                          <Volume2 size={14} strokeWidth={2.3} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="result-actions">
                <button className="btn btn-primary" onClick={() => startSession(mixedWordsPool)}>
                  <RotateCcw size={16} strokeWidth={2.3} /> {t('mixedPractice.practiceAgainBtn')}
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                  {t('mixedPractice.backToDashboardBtn')}
                </button>
              </div>
            </motion.div>
            </div>
            );
          })()}
        </AnimatePresence>
      )}
    </div>
  );
}
