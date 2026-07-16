import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, update } from 'firebase/database';
import {
  Shuffle, Target, Volume2, X, CheckCircle2, XCircle,
  Trophy, ThumbsUp, Dumbbell, RotateCcw
} from 'lucide-react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { usePacks } from '../hooks/usePacks';
import { useStreak } from '../hooks/useStreak';
import { shuffleArray } from '../utils/helpers';
import { playSound, triggerVibration } from '../utils/feedback';
import { getDueWords, calculateNextReview, responseToQuality } from '../utils/sm2';
import IosSpinner from '../components/common/IosSpinner';
import './MixedPractice.css';

const LEECH_THRESHOLD = 3;

function getResultTier(ratio) {
  if (ratio >= 0.8) return { Icon: Trophy, label: 'Ajoyib natija!', color: 'var(--accent-3)', dim: 'var(--warning-dim)' };
  if (ratio >= 0.5) return { Icon: ThumbsUp, label: 'Yaxshi, harakat qiling!', color: 'var(--accent-1)', dim: 'var(--accent-1-dim)' };
  return { Icon: Dumbbell, label: "Davom eting, o'rganasiz!", color: 'var(--success)', dim: 'var(--success-dim)' };
}

// Recognition-before-production sequencing: brand-new / weak words get the
// easiest (multiple-choice) format; words the learner has seen more and is
// getting right move to listening, then full spelling — the hardest,
// most production-heavy format — once mastery is high.
function pickQuestionType(wordObj, poolSize) {
  if (poolSize < 4) {
    return Math.random() > 0.5 ? 'spelling' : 'dictation';
  }
  const mastery = wordObj.mastery || 0;
  const reviewCount = wordObj.reviewCount || 0;

  if (reviewCount === 0 || mastery < 30) return 'quiz';
  if (mastery < 70) return 'dictation';
  return 'spelling';
}

export default function MixedPractice() {
  const { user } = useAuth();
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
        const otherWords = wordsPool.filter(w => w.id !== wordObj.id);
        const wrongOptions = shuffleArray(otherWords)
          .slice(0, 3)
          .map(w => w.translation);
        options = shuffleArray([wordObj.translation, ...wrongOptions]);
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
    setStep('practice');
  };

  useEffect(() => {
    if (!loading && mixedWordsPool.length > 0 && step === 'setup') {
      startSession(mixedWordsPool);
    }
  }, [loading, mixedWordsPool, step]);

  const speakWord = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Autoplay dictation sound on load
  useEffect(() => {
    if (step === 'practice' && questions[currentIdx]?.type === 'dictation' && !hasAnswered) {
      const timer = setTimeout(() => {
        speakWord(questions[currentIdx].word.word);
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
      if (window.confirm("Rostdan ham mashqni tark etmoqchimisiz? Hozirgi natijalaringiz saqlanmaydi.")) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const handleUpdateWordStats = async (wordObj, isCorrect) => {
    if (!user) return;
    try {
      const parentId = wordObj.sourceId;
      const wordRef = ref(db, `users/${user.uid}/words/${parentId}/${wordObj.id}`);

      // Same SM-2 engine and wrongCount/leech bookkeeping as PracticePage's
      // spaced-repetition flow, so mastery/nextReview stay consistent no
      // matter which practice mode a word was reviewed in.
      const quality = responseToQuality(isCorrect ? 'good' : 'again');
      const sm2Data = calculateNextReview(quality, wordObj);

      const prevWrongCount = wordObj.wrongCount || 0;
      const wrongCount = quality < 4
        ? prevWrongCount + 1
        : Math.max(0, prevWrongCount - 1);

      await update(wordRef, { ...sm2Data, wrongCount });
    } catch (e) {
      console.error('Error updating word stats:', e);
    }
  };

  const handleQuizAnswer = (option) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    const correctVal = questions[currentIdx].word.translation;
    const isRight = option.trim().toLowerCase() === correctVal.trim().toLowerCase();
    
    questions[currentIdx].isCorrect = isRight;
    questions[currentIdx].userAnswer = option;
    
    if (isRight) setCorrectCount(prev => prev + 1);
    setHasAnswered(true);
    playSound(isRight ? 'correct' : 'wrong');
    triggerVibration(isRight ? 'correct' : 'wrong');
    handleUpdateWordStats(questions[currentIdx].word, isRight);
  };

  const handleTextSubmit = (e) => {
    if (e) e.preventDefault();
    if (hasAnswered) return;
    
    const correctVal = questions[currentIdx].word.word.trim().toLowerCase();
    const isRight = typedAnswer.trim().toLowerCase() === correctVal;
    
    questions[currentIdx].isCorrect = isRight;
    questions[currentIdx].userAnswer = typedAnswer;
    
    if (isRight) setCorrectCount(prev => prev + 1);
    setHasAnswered(true);
    playSound(isRight ? 'correct' : 'wrong');
    triggerVibration(isRight ? 'correct' : 'wrong');
    handleUpdateWordStats(questions[currentIdx].word, isRight);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setTypedAnswer('');
      setHasAnswered(false);
      setSelectedOption(null);
    } else {
      setStep('results');
      playSound('victory');
      triggerVibration('victory');
      incrementActivity(questions.length || 1);
    }
  };

  const pageLoading = loading || allWordsLoading;

  return (
    <div className="mixed-practice-page">
    

      {pageLoading ? (
        <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
          <IosSpinner />
          <span>Yuklanmoqda...</span>
        </div>
      ) : mixedWordsPool.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">{isLeechMode ? '🎯' : isDueMode ? '✅' : '🎮'}</div>
          <h3>{isLeechMode ? "Qiyin so'zlar yo'q" : isDueMode ? "Takrorlash uchun so'z yo'q" : "So'zlar topilmadi"}</h3>
          <p>
            {isLeechMode
              ? "Barakalla! Hozircha 3 martadan ortiq xato qilingan so'z yo'q."
              : isDueMode
                ? "Ajoyib! Hozircha takrorlash muddati kelgan so'z yo'q — keyinroq qayting."
                : "Aralash mashq qilish uchun Kutubxonaga kirib kitob yoki to'plam oching va so'zlar qo'shing!"}
          </p>
          <Link to={isLeechMode ? '/stats' : isDueMode ? '/' : '/library'} className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
            {isLeechMode ? 'Statistikaga qaytish →' : isDueMode ? 'Bosh sahifaga qaytish →' : "Kutubxonaga o'tish →"}
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
                  {isLeechMode ? "Qiyin so'zlar mashqi" : isDueMode ? "Bugungi takrorlash" : "Aralash Mashq"}
                </span>
                <button className="btn-exit-practice" onClick={handleExit} title="Mashqdan chiqish">
                  <X size={14} strokeWidth={2.4} /> Chiqish
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
                  Savol {currentIdx + 1} / {questions.length}
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
                  <div className="quiz-question">
                    <span className="question-prompt">Tarjimasini tanlang:</span>
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
                    <span className="question-prompt">Inglizcha tarjimasini yozing:</span>
                    <h2 className="question-word">{questions[currentIdx].word.translation}</h2>
                    
                    <form onSubmit={handleTextSubmit} className="spelling-form">
                      <input
                        type="text"
                        className="spelling-input"
                        placeholder="Inglizcha so'zni yozing..."
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        disabled={hasAnswered}
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                      {!hasAnswered && (
                        <button type="submit" className="btn btn-primary submit-btn">
                          Tekshirish
                        </button>
                      )}
                    </form>
                  </div>
                )}

                {questions[currentIdx].type === 'dictation' && (
                  <div className="dictation-question">
                    <span className="question-prompt">Eshitgan so'zingizni inglizcha yozing:</span>
                    <div className="audio-player-container">
                      <button
                        className="audio-play-btn"
                        onClick={() => speakWord(questions[currentIdx].word.word)}
                        title="Qayta eshitish"
                        type="button"
                      >
                        <Volume2 size={20} strokeWidth={2.2} />
                      </button>
                      <span className="audio-helper-text">Talaffuzni qayta eshitish uchun bosing</span>
                    </div>

                    <form onSubmit={handleTextSubmit} className="spelling-form">
                      <input
                        type="text"
                        className="spelling-input"
                        placeholder="Eshitgan so'zingizni yozing..."
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        disabled={hasAnswered}
                        autoFocus
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                      />
                      {!hasAnswered && (
                        <button type="submit" className="btn btn-primary submit-btn">
                          Tekshirish
                        </button>
                      )}
                    </form>
                  </div>
                )}
              </div>

              {/* Feedback footer */}
              {hasAnswered && (
                <motion.div 
                  className={`feedback-footer ${questions[currentIdx].isCorrect ? 'correct' : 'incorrect'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="feedback-content">
                    <span className="feedback-icon">
                      {questions[currentIdx].isCorrect
                        ? <CheckCircle2 size={22} strokeWidth={2.2} style={{ color: 'var(--success)' }} />
                        : <XCircle size={22} strokeWidth={2.2} style={{ color: 'var(--error)' }} />}
                    </span>
                    <div className="feedback-text">
                      <h4>{questions[currentIdx].isCorrect ? "To'g'ri! Barakalla!" : "Noto'g'ri!"}</h4>
                      {!questions[currentIdx].isCorrect && (
                        <p>
                          To'g'ri javob: <strong>{questions[currentIdx].word.word}</strong> 
                          {questions[currentIdx].word.translation && ` — ${questions[currentIdx].word.translation}`}
                        </p>
                      )}
                    </div>
                    <button className="btn btn-next" onClick={handleNext}>
                      {currentIdx === questions.length - 1 ? 'Natijalarni ko\'rish' : 'Keyingi →'}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
            </div>
          )}

          {/* Step 2: Results Summary */}
          {step === 'results' && (() => {
            const tier = getResultTier(questions.length > 0 ? correctCount / questions.length : 0);
            return (
            <motion.div
              key="results"
              className="practice-results-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="result-icon-circle" style={{ background: tier.dim, color: tier.color }}>
                <tier.Icon size={32} strokeWidth={2.2} />
              </div>
              <h2>{tier.label}</h2>
              <p className="results-subtitle">{isDueMode ? 'Takrorlash yakunlandi' : 'Aralash mashq yakunlandi'}</p>

              <div className="results-score-badge">
                <span className="score-value">{correctCount}</span>
                <span className="score-slash">/</span>
                <span className="score-total">{questions.length}</span>
              </div>
              
              <div className="results-label">To'g'ri topilgan so'zlar</div>

              {/* Mistakes review */}
              {questions.some(q => !q.isCorrect) && (
                <div className="mistakes-review-container">
                  <h3>Xatolarni ko'rib chiqish:</h3>
                  <div className="mistakes-list">
                    {questions.filter(q => !q.isCorrect).map((q, idx) => (
                      <div key={idx} className="mistake-item">
                        <div className="mistake-word-group">
                          <span className="mistake-word">{q.word.word}</span>
                          <span className="mistake-translation">{q.word.translation}</span>
                        </div>
                        <span className="mistake-your-answer">
                          Siz: <del>{q.userAnswer || '(javobsiz)'}</del>
                        </span>
                        <button
                          className="btn-speak-mistake"
                          onClick={() => speakWord(q.word.word)}
                          title="Talaffuzni eshitish"
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
                  <RotateCcw size={16} strokeWidth={2.3} /> Yana mashq qilish
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                  Dashboardga qaytish
                </button>
              </div>
            </motion.div>
            );
          })()}
        </AnimatePresence>
      )}
    </div>
  );
}
