import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, update } from 'firebase/database';
import {
  Shuffle, Target, Volume2, X, Check, CheckCircle2, XCircle,
  Trophy, ThumbsUp, Dumbbell, RotateCcw, Sparkles
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
import PracticeQuitModal from '../../components/Practice/PracticeQuitModal';
import './MixedPractice.css';

const LEECH_THRESHOLD = 3;

function getResultTier(ratio, t) {
  if (ratio >= 0.8) return { Icon: Trophy, label: t ? t('mixedPractice.greatResult') : 'Great result!', color: 'var(--accent-3)', dim: 'var(--warning-dim)' };
  if (ratio >= 0.5) return { Icon: ThumbsUp, label: t ? t('mixedPractice.goodEffort') : 'Good effort, keep it up!', color: 'var(--accent-1)', dim: 'var(--accent-1-dim)' };
  return { Icon: Dumbbell, label: t ? t('mixedPractice.keepGoing') : "Keep going, you'll get there!", color: 'var(--success)', dim: 'var(--success-dim)' };
}

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
  const { t, language } = useLanguage();
  const { allWords, allWordsLoading } = usePacks();
  const { incrementActivity } = useStreak();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLeechMode = searchParams.get('filter') === 'leech';
  const isDueMode = searchParams.get('filter') === 'due';

  const [step, setStep] = useState('setup'); // 'setup' | 'practice' | 'results'
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [mixedWordsPool, setMixedWordsPool] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const questionStartRef = useRef(Date.now());

  // Safe translation helper
  const getTrans = (key, fallback) => {
    const val = t(key);
    return val && val !== key ? val : fallback;
  };

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

        const candidatePool = wordsPool.length >= 4 ? wordsPool : [...wordsPool, ...allWords];
        const validWrongTranslations = Array.from(
          new Set(
            candidatePool
              .map(w => (w?.translation || '').trim())
              .filter(t => t.length > 0 && t.toLowerCase() !== correctTranslation.toLowerCase())
          )
        );

        const wrongOptions = shuffleArray(validWrongTranslations).slice(0, 3);

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
    setIncorrectCount(0);
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

  const handleExit = () => {
    if (step === 'practice') {
      setShowQuitModal(true);
    } else {
      navigate('/');
    }
  };

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
    else setIncorrectCount(prev => prev + 1);

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
    else setIncorrectCount(prev => prev + 1);

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
  const currentProgressPct = questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0;

  return (
    <div className="duo-spelling-page duo-mixed-page">
      {/* Top Header Bar */}
      {step === 'practice' && questions.length > 0 && (
        <header className="duo-top-header">
          <button
            type="button"
            className="duo-close-btn"
            onClick={handleExit}
            title={getTrans('mixedPractice.exitBtn', 'Close practice')}
          >
            <X size={24} strokeWidth={2.8} />
          </button>

          <div className="duo-progress-track">
            <motion.div
              className="duo-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgressPct}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>

          <div className="duo-speed-badges-row">
            <div className="duo-speed-tally tally-correct">
              <Check size={14} strokeWidth={3} />
              <span>{correctCount}</span>
            </div>
            <div className="duo-speed-tally tally-wrong">
              <X size={14} strokeWidth={3} />
              <span>{incorrectCount}</span>
            </div>
          </div>
        </header>
      )}

      <div className="duo-spelling-body duo-mixed-body">
        {pageLoading ? (
          <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
            <IosSpinner />
            <span>{getTrans('mixedPractice.loading', 'Loading practice...')}</span>
          </div>
        ) : mixedWordsPool.length === 0 ? (
          <div className="empty-state duo-prompt-card">
            <div className="empty-state-icon">{isLeechMode ? '🎯' : isDueMode ? '✅' : '🎮'}</div>
            <h3>{isLeechMode ? getTrans('mixedPractice.noTrickyTitle', 'No tricky words found!') : isDueMode ? getTrans('mixedPractice.noDueTitle', 'No due words to review!') : getTrans('mixedPractice.noWordsTitle', 'No words available!')}</h3>
            <p>
              {isLeechMode
                ? getTrans('mixedPractice.noTrickyDesc', 'Great job! You have no weak words left.')
                : isDueMode
                  ? getTrans('mixedPractice.noDueDesc', 'All caught up on scheduled reviews!')
                  : getTrans('mixedPractice.noWordsDesc', 'Add words to your library first.')}
            </p>
            <Link to={isLeechMode ? '/stats' : isDueMode ? '/' : '/library'} className="duo-btn-3d duo-btn-primary" style={{ marginTop: '16px' }}>
              <span>{isLeechMode ? getTrans('mixedPractice.backToStats', 'Back to Stats') : isDueMode ? getTrans('mixedPractice.backToDashboard', 'Back to Dashboard') : getTrans('mixedPractice.goToLibrary', 'Go to Library')}</span>
            </Link>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Step 1: Practice Session */}
            {step === 'practice' && questions.length > 0 && (
              <div className="mixed-practice-wrapper">
                {/* Mode Pill */}
                <div className="trainer-mode-pill">
                  {isLeechMode
                    ? `🎯 ${getTrans('mixedPractice.trickyPracticeTitle', 'Tricky Words Practice')}`
                    : isDueMode
                      ? `🔄 ${getTrans('mixedPractice.todaysReviewTitle', 'Today\'s Review')}`
                      : `⚡ ${getTrans('mixedPractice.mixedPracticeTitle', 'Mixed Practice')}`}
                </div>

                <motion.div
                  key={currentIdx}
                  className="trainer-board"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="game-type-wrap">
                    {/* ── QUESTION TYPE: QUIZ ── */}
                    {questions[currentIdx].type === 'quiz' && (
                      <div className="mp-question-block">
                        <span className="question-prompt">
                          {getTrans('mixedPractice.chooseTranslation', language === 'uz' ? 'To\'g\'ri tarjimani tanlang' : 'Choose the correct translation')}
                        </span>
                        <h2 className="question-word">{questions[currentIdx].word.word}</h2>

                        <div className="quiz-options-grid">
                          {questions[currentIdx].options.map((option, idx) => {
                            const correctVal = questions[currentIdx].word.translation;
                            let optionClass = 'quiz-option-btn duo-btn-3d';

                            if (hasAnswered) {
                              if (option === correctVal) {
                                optionClass += ' success';
                              } else if (option === selectedOption) {
                                optionClass += ' error';
                              } else {
                                optionClass += ' dimmed';
                              }
                            } else if (selectedOption === option) {
                              optionClass += ' selected';
                            }

                            return (
                              <button
                                key={idx}
                                type="button"
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

                    {/* ── QUESTION TYPE: SPELLING ── */}
                    {questions[currentIdx].type === 'spelling' && (
                      <div className="mp-question-block">
                        <span className="question-prompt">
                          {getTrans('mixedPractice.typeEnglishTranslation', language === 'uz' ? 'Inglizcha so\'zni yozing' : 'Type the English word')}
                        </span>
                        <h2 className="question-word">{questions[currentIdx].word.translation}</h2>

                        <form onSubmit={handleTextSubmit} className="mp-spelling-form" autoComplete="off" noValidate data-lpignore="true">
                          <input
                            ref={(el) => {
                              if (el && !hasAnswered) {
                                requestAnimationFrame(() => el.focus());
                              }
                            }}
                            type="text"
                            name="practice_no_autofill_input"
                            className={[
                              'trainer-input mp-spelling-input',
                              hasAnswered && questions[currentIdx].isCorrect ? 'success' : '',
                              hasAnswered && !questions[currentIdx].isCorrect ? 'error' : '',
                            ].filter(Boolean).join(' ')}
                            placeholder={getTrans('mixedPractice.typeEnglishWordPlaceholder', 'Type in English...')}
                            value={typedAnswer}
                            onChange={(e) => setTypedAnswer(e.target.value)}
                            disabled={hasAnswered}
                            autoFocus
                            autoComplete="off" autoCorrect="off"
                            autoCapitalize="none" spellCheck={false}
                            data-lpignore="true" data-1p-ignore="true"
                          />
                          <button type="submit" style={{ display: 'none' }} />
                        </form>
                      </div>
                    )}

                    {/* ── QUESTION TYPE: DICTATION ── */}
                    {questions[currentIdx].type === 'dictation' && (
                      <div className="mp-question-block">
                        <span className="question-prompt">
                          {getTrans('mixedPractice.typeWordHear', language === 'uz' ? 'Eshitgan so\'zingizni yozing' : 'Type the word you hear')}
                        </span>

                        <div className="audio-player-container">
                          <button
                            className="audio-play-btn duo-listen-btn-lg"
                            onClick={() => speakWord(questions[currentIdx].word.word, questions[currentIdx].word.language)}
                            title="Listen again"
                            type="button"
                          >
                            <Volume2 size={24} strokeWidth={2.5} />
                          </button>
                          <span className="audio-helper-text">
                            {getTrans('mixedPractice.tapHearAgain', 'Tap speaker to hear again')}
                          </span>
                        </div>

                        <form onSubmit={handleTextSubmit} className="mp-spelling-form" autoComplete="off" noValidate data-lpignore="true">
                          <input
                            ref={(el) => {
                              if (el && !hasAnswered) {
                                requestAnimationFrame(() => el.focus());
                              }
                            }}
                            type="text"
                            name="practice_no_autofill_input"
                            className={[
                              'trainer-input mp-spelling-input',
                              hasAnswered && questions[currentIdx].isCorrect ? 'success' : '',
                              hasAnswered && !questions[currentIdx].isCorrect ? 'error' : '',
                            ].filter(Boolean).join(' ')}
                            placeholder={getTrans('mixedPractice.typeWordHeardPlaceholder', 'Type what you hear...')}
                            value={typedAnswer}
                            onChange={(e) => setTypedAnswer(e.target.value)}
                            disabled={hasAnswered}
                            autoFocus
                            autoComplete="off" autoCorrect="off"
                            autoCapitalize="none" spellCheck={false}
                            data-lpignore="true" data-1p-ignore="true"
                          />
                          <button type="submit" style={{ display: 'none' }} />
                        </form>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Step 2: Results Summary */}
            {step === 'results' && (() => {
              const tier = getResultTier(questions.length > 0 ? correctCount / questions.length : 0, t);
              return (
                <div className="mixed-practice-wrapper">
                  <motion.div
                    key="results"
                    className="duo-prompt-card practice-results-card-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="result-icon-circle" style={{ background: tier.dim, color: tier.color }}>
                      <tier.Icon size={48} strokeWidth={2.2} />
                    </div>
                    <h2>{tier.label}</h2>
                    <p className="results-subtitle">
                      {isDueMode ? getTrans('mixedPractice.reviewCompleteSub', 'Daily review complete!') : getTrans('mixedPractice.mixedPracticeCompleteSub', 'Session complete!')}
                    </p>

                    <div className="results-score-badge">
                      <span className="score-value">{correctCount}</span>
                      <span className="score-slash">/</span>
                      <span className="score-total">{questions.length}</span>
                    </div>

                    <div className="results-label">{getTrans('mixedPractice.wordsAnsweredCorrectly', 'Words correct')}</div>

                    {/* Mistakes review */}
                    {questions.some(q => !q.isCorrect) && (
                      <div className="mistakes-review-container">
                        <h3>{getTrans('mixedPractice.reviewMistakesHeader', 'Review Mistakes')}</h3>
                        <div className="mistakes-list">
                          {questions.filter(q => !q.isCorrect).map((q, idx) => (
                            <div key={idx} className="mistake-item">
                              <div className="mistake-word-group">
                                <span className="mistake-word">{q.word.word}</span>
                                <span className="mistake-translation">{q.word.translation}</span>
                              </div>
                              <span className="mistake-your-answer">
                                {getTrans('mixedPractice.youAnswer', 'You typed:')} <del>{q.userAnswer || getTrans('mixedPractice.noAnswerGiven', 'No answer')}</del>
                              </span>
                              <button
                                className="btn-speak-mistake"
                                onClick={() => speakWord(q.word.word, q.word.language)}
                                title="Listen"
                                type="button"
                              >
                                <Volume2 size={16} strokeWidth={2.3} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="result-actions">
                      <button type="button" className="duo-btn-3d duo-btn-primary" onClick={() => startSession(mixedWordsPool)}>
                        <RotateCcw size={18} strokeWidth={2.3} />
                        <span>{getTrans('mixedPractice.practiceAgainBtn', 'Practice Again')}</span>
                      </button>
                      <button type="button" className="duo-btn-3d duo-btn-secondary" onClick={() => navigate('/')}>
                        <span>{getTrans('mixedPractice.backToDashboardBtn', 'Dashboard')}</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              );
            })()}
          </AnimatePresence>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────────────── */}
      {/* BOTTOM DRAWER (DUOLINGO 3D DRAWER)                                   */}
      {/* ───────────────────────────────────────────────────────────────────── */}
      {step === 'practice' && questions.length > 0 && (
        <div className={`duo-drawer ${hasAnswered ? (questions[currentIdx].isCorrect ? 'correct' : 'wrong') : 'idle'}`}>
          <div className="duo-drawer-content">
            {hasAnswered ? (
              <>
                <div className="duo-feedback-header">
                  <div className={`duo-feedback-icon ${questions[currentIdx].isCorrect ? 'icon-correct' : 'icon-wrong'}`}>
                    {questions[currentIdx].isCorrect ? <Check size={28} strokeWidth={3} /> : <X size={28} strokeWidth={3} />}
                  </div>
                  <div className="duo-feedback-text">
                    <span className="duo-feedback-title">
                      {questions[currentIdx].isCorrect
                        ? getTrans('mixedPractice.correctTitle', 'Awesome!')
                        : getTrans('mixedPractice.incorrectTitle', 'Correct answer:')}
                    </span>
                    <div className="duo-feedback-forms">
                      <span className="reveal-form-item">{questions[currentIdx].word.word}</span>
                      {questions[currentIdx].word.translation && (
                        <>
                          <span className="reveal-divider">—</span>
                          <span className="reveal-form-item">{questions[currentIdx].word.translation}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="duo-listen-btn"
                    onClick={() => speakWord(questions[currentIdx].word.word, questions[currentIdx].word.language)}
                  >
                    <Volume2 size={20} strokeWidth={2.2} />
                  </button>
                </div>

                <button
                  type="button"
                  className={`duo-btn-3d duo-drawer-action-btn ${questions[currentIdx].isCorrect ? 'duo-btn-success' : 'duo-btn-danger'}`}
                  onClick={handleNext}
                >
                  <span>
                    {currentIdx === questions.length - 1
                      ? getTrans('mixedPractice.viewResultsBtn', 'Results')
                      : getTrans('mixedPractice.nextBtn', 'Continue')}
                  </span>
                </button>
              </>
            ) : (
              <div className="duo-idle-footer">
                {questions[currentIdx].type === 'quiz' ? (
                  <div className="feedback-hint-text">
                    {getTrans('mixedPractice.selectCorrectTranslationHint', 'Choose the correct translation')}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="duo-btn-3d duo-btn-primary duo-drawer-action-btn"
                    onClick={handleTextSubmit}
                    disabled={!typedAnswer.trim()}
                  >
                    <span>{getTrans('mixedPractice.checkBtn', 'Check')}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exit Modal */}
      <PracticeQuitModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={() => navigate('/')}
      />
    </div>
  );
}
