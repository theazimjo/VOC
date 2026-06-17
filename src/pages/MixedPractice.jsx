import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import { shuffleArray } from '../utils/helpers';
import './MixedPractice.css';

export default function MixedPractice() {
  const { user } = useAuth();
  const { books, loading: booksLoading } = useBooks();
  const { packs, loading: packsLoading } = usePacks();
  const navigate = useNavigate();

  const [step, setStep] = useState('setup'); // 'setup' | 'practice' | 'results'
  const [mixedWordsPool, setMixedWordsPool] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Extract and combine all words from all books and packs
  useEffect(() => {
    if (booksLoading || packsLoading) return;
    if (!user) return;

    let allWords = [];

    // Extract book words
    books.forEach(book => {
      const wordsObj = book.words || {};
      Object.keys(wordsObj).forEach(wordId => {
        allWords.push({
          id: wordId,
          ...wordsObj[wordId],
          source: book.title,
          sourceType: 'books',
          sourceId: book.id
        });
      });
    });

    // Extract pack words
    packs.forEach(pack => {
      const wordsObj = pack.words || {};
      Object.keys(wordsObj).forEach(wordId => {
        allWords.push({
          id: wordId,
          ...wordsObj[wordId],
          source: pack.name,
          sourceType: 'packs',
          sourceId: pack.id
        });
      });
    });

    setMixedWordsPool(allWords);
    setLoading(false);
  }, [user, books, packs, booksLoading, packsLoading]);

  // Generate question queue
  const startSession = (wordsPool) => {
    if (wordsPool.length === 0) return;
    
    const selectedWords = shuffleArray(wordsPool).slice(0, 8);
    const generated = selectedWords.map((wordObj) => {
      // Pick question type: 'quiz' | 'spelling' | 'dictation'
      let type = 'spelling';
      if (wordsPool.length >= 4) {
        const questionTypes = ['quiz', 'spelling', 'dictation'];
        type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      } else {
        type = Math.random() > 0.5 ? 'spelling' : 'dictation';
      }

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

  const handleUpdateWordStats = async (wordObj, isCorrect) => {
    if (!user) return;
    try {
      const pathType = wordObj.sourceType;
      const parentId = wordObj.sourceId;
      const wordRef = ref(db, `users/${user.uid}/${pathType}/${parentId}/words/${wordObj.id}`);
      
      const currentMastery = wordObj.mastery || 0;
      let newMastery = isCorrect 
        ? Math.min(100, currentMastery + 15) 
        : Math.max(0, currentMastery - 15);
      
      const currentReviewCount = wordObj.reviewCount || 0;
      const nextReviewDate = isCorrect
        ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days if correct
        : new Date().toISOString(); // immediately if wrong

      await update(wordRef, {
        mastery: newMastery,
        reviewCount: currentReviewCount + 1,
        lastReviewed: new Date().toISOString(),
        nextReview: nextReviewDate
      });
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
    }
  };

  const pageLoading = loading || booksLoading || packsLoading;

  return (
    <div className="mixed-practice-page">
    

      {pageLoading ? (
        <div className="empty-state"><p>Yuklanmoqda...</p></div>
      ) : mixedWordsPool.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎮</div>
          <h3>So'zlar topilmadi</h3>
          <p>Aralash mashq qilish uchun Kutubxonaga kirib kitob yoki to'plam oching va so'zlar qo'shing!</p>
          <Link to="/library" className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }}>
            Kutubxonaga o'tish →
          </Link>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {/* Step 1: Practice Session */}
          {step === 'practice' && questions.length > 0 && (
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
                            {option}
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
                        🔊
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
                      {questions[currentIdx].isCorrect ? '🎉' : '❌'}
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
          )}

          {/* Step 2: Results Summary */}
          {step === 'results' && (
            <motion.div
              key="results"
              className="practice-results-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="result-icon">
                {correctCount / questions.length >= 0.8 ? '🏆' : 
                 correctCount / questions.length >= 0.5 ? '👍' : '💪'}
              </div>
              <h2>
                {correctCount / questions.length >= 0.8 ? 'Ajoyib natija!' :
                 correctCount / questions.length >= 0.5 ? 'Yaxshi, harakat qiling!' : 'Davom eting, o\'rganasiz!'}
              </h2>
              <p className="results-subtitle">Aralash mashq yakunlandi</p>

              <div className="results-score-badge">
                <span className="score-value">{correctCount}</span>
                <span className="score-slash">/</span>
                <span className="score-total">{questions.length}</span>
              </div>
              
              <div className="results-label">To'g'ri topilgan so'zlar</div>

              {/* Mistakes review */}
              {questions.some(q => !q.isCorrect) && (
                <div className="mistakes-review-container">
                  <h3>Mistakes Review:</h3>
                  <div className="mistakes-list">
                    {questions.filter(q => !q.isCorrect).map((q, idx) => (
                      <div key={idx} className="mistake-item">
                        <span className="mistake-word">{q.word.word}</span>
                        <span className="mistake-divider">/</span>
                        <span className="mistake-translation">{q.word.translation}</span>
                        <span className="mistake-your-answer">Siz: <del>{q.userAnswer || '(bo\'sh)'}</del></span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="result-actions">
                <button className="btn btn-primary" onClick={() => startSession(mixedWordsPool)}>
                  Yana mashq qilish 🔁
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                  Dashboardga qaytish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
