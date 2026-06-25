import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, get, update } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import { weightedSelectWords, shuffleArray, speakWord } from '../utils/helpers';
import { playSound, triggerVibration } from '../utils/feedback';
import { calculateNextReview } from '../utils/sm2';
import PracticeHub from '../components/Practice/PracticeHub';
import Flashcard from '../components/Practice/Flashcard';
import SpellingGame from '../components/Practice/SpellingGame';
import MatchGame from '../components/Practice/MatchGame';
import QuizGame from '../components/Practice/QuizGame';
import SpacedRepetition from '../components/Practice/SpacedRepetition';
import DictationGame from '../components/Practice/DictationGame';
import PronounceGame from '../components/Practice/PronounceGame';
import './PracticePage.css';

export default function PracticePage() {
  const { sourceType: urlSourceType, sourceId: urlSourceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { books, loading: booksLoading } = useBooks();
  const { packs, loading: packsLoading } = usePacks();
  
  const [step, setStep] = useState('source'); // 'source' | 'mode' | 'practice' | 'results'
  const [sourceType, setSourceType] = useState('books');
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);
  const [sourceWords, setSourceWords] = useState([]);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [wrongWords, setWrongWords] = useState([]);
  const [customModal, setCustomModal] = useState({ show: false, type: 'alert', message: '', onConfirm: null, onCancel: null });

  const showAlert = (message, onClose = null) => {
    setCustomModal({ show: true, type: 'alert', message, onConfirm: onClose, onCancel: null });
  };

  const showConfirm = (message, onConfirm, onCancel = null) => {
    setCustomModal({ show: true, type: 'confirm', message, onConfirm, onCancel });
  };

  // Reset sourceLoaded when url parameters change
  useEffect(() => {
    setSourceLoaded(false);
  }, [urlSourceType, urlSourceId]);

  // Load parameterized source if available
  useEffect(() => {
    if (sourceLoaded) return;

    if (urlSourceType && urlSourceId && !booksLoading && !packsLoading) {
      const activeList = urlSourceType === 'books' ? books : packs;
      const foundSource = activeList.find(s => s.id === urlSourceId);
      if (foundSource) {
        setSourceType(urlSourceType);
        setSelectedSource(foundSource);
        setSourceLoaded(true);
        
        // Fetch words for this source
        const fetchWords = async () => {
          if (!user) return;
          const wordsRef = ref(db, `users/${user.uid}/${urlSourceType}/${urlSourceId}/words`);
          const wordsSnap = await get(wordsRef);
          let words = [];
          if (wordsSnap.exists()) {
            wordsSnap.forEach(childSnap => {
              words.push({ id: childSnap.key, ...childSnap.val() });
            });
          }
          if (words.length === 0) {
            showAlert("Bu manbada so'zlar yo'q! Avval so'zlar qo'shing.", () => {
              navigate(urlSourceType === 'books' ? `/books/${urlSourceId}` : `/packs/${urlSourceId}`);
            });
            return;
          }
          setSourceWords(words);
          setStep('mode');
        };
        fetchWords();
      } else {
        navigate('/library');
      }
    }
  }, [urlSourceType, urlSourceId, booksLoading, packsLoading, books, packs, user, navigate, sourceLoaded]);

  // Warn before closing tab during active practice
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (step === 'practice' || step === 'intro') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [step]);

  // Intro shape transition timer
  useEffect(() => {
    if (step !== 'intro') return;
    
    const timerId = setTimeout(() => {
      setStep('practice');
    }, 2400);

    return () => clearTimeout(timerId);
  }, [step]);

  const sources = sourceType === 'books' ? books : packs;

  const handleSelectSource = async (source) => {
    setSelectedSource(source);
    if (!user) return;

    const wordsRef = ref(db, `users/${user.uid}/${sourceType}/${source.id}/words`);
    const wordsSnap = await get(wordsRef);
    let words = [];
    if (wordsSnap.exists()) {
      wordsSnap.forEach(childSnap => {
        words.push({ id: childSnap.key, ...childSnap.val() });
      });
    }

    if (words.length === 0) {
      showAlert("Bu manbada so'zlar yo'q! Avval Kutubxonadan so'zlar qo'shing.");
      return;
    }

    setSourceWords(words);
    setStep('mode');
  };

  const reloadWordsAndLessons = async () => {
    if (!selectedSource || !user) return;
    const wordsRef = ref(db, `users/${user.uid}/${sourceType}/${selectedSource.id}/words`);
    const wordsSnap = await get(wordsRef);
    let words = [];
    if (wordsSnap.exists()) {
      wordsSnap.forEach(childSnap => {
        words.push({ id: childSnap.key, ...childSnap.val() });
      });
    }
    setSourceWords(words);
  };

  const handleStartPractice = async (mode) => {
    setSelectedMode(mode);
    setWrongWords([]);
    
    if (sourceWords.length === 0) {
      showAlert("Bu manbada so'zlar yo'q!");
      return;
    }

    let selected;
    if (mode === 'spaced') {
      // Spaced repetition uses its own ordering logic
      selected = sourceWords;
    } else {
      // Weighted selection: harder / less-known words are more likely to be chosen
      selected = weightedSelectWords(sourceWords, wordCount);
    }

    setPracticeWords(selected);
    setStep('intro');
  };

  const handleUpdateWord = async (wordId, data) => {
    if (!user || !selectedSource) return;
    try {
      const word = sourceWords.find(w => w.id === wordId);
      if (!word) return;

      const prevWrongCount = word.wrongCount || 0;

      let finalData = { ...data };
      if (typeof data.quality === 'number') {
        const quality = data.quality;
        const safeSm2Data = calculateNextReview(
          quality,
          word.easeFactor || 2.5,
          word.interval || 0,
          word.reviewCount || 0,
          word.lastReviewed,
          word.nextReview
        );
        
        finalData = { ...finalData, ...safeSm2Data };

        if (quality < 4) {
          finalData.wrongCount = prevWrongCount + 1;
        } else {
          finalData.wrongCount = Math.max(0, prevWrongCount - 1);
        }
      }

      const wordRef = ref(db, `users/${user.uid}/${sourceType}/${selectedSource.id}/words/${wordId}`);
      await update(wordRef, finalData);

      // Sync local state immediately so weights are updated for future picks
      setSourceWords(prev => prev.map(w => w.id === wordId ? { ...w, ...finalData } : w));
    } catch (e) {
      console.error('Error updating word:', e);
    }
  };

  const handleAnswer = (word, isCorrect) => {
    if (isCorrect) {
      playSound('correct');
      triggerVibration('correct');
    } else {
      playSound('wrong');
      triggerVibration('wrong');
      setWrongWords(prev => {
        if (prev.some(w => w.id === word.id)) return prev;
        return [...prev, word];
      });
    }
  };

  const handleComplete = (resultData) => {
    playSound('victory');
    triggerVibration('victory');
    setResults(resultData);
    setStep('results');
  };

  const handleBack = () => {
    if (step === 'practice' || step === 'intro') {
      showConfirm("Rostdan ham mashqni tark etmoqchimisiz? Hozirgi natijalaringiz saqlanmaydi.", () => {
        setStep('mode');
      });
      return;
    }

    if (step === 'mode') {
      if (urlSourceId) {
        navigate(urlSourceType === 'books' ? `/books/${urlSourceId}` : `/packs/${urlSourceId}`);
      } else {
        setStep('source');
      }
    }
    else if (step === 'results') setStep('mode');
  };

  const handleReset = () => {
    setSelectedMode(null);
    setResults(null);
    setPracticeWords([]);
    setWrongWords([]);
    if (urlSourceId) {
      setStep('mode');
    } else {
      setStep('source');
    }
  };

  const renderPracticeMode = () => {
    const props = {
      words: practiceWords,
      onComplete: handleComplete,
      onUpdateWord: handleUpdateWord,
      onAnswer: handleAnswer,
      sourceName: selectedSource?.title || selectedSource?.name || "Kutubxona"
    };

    switch (selectedMode) {
      case 'flashcard': return <Flashcard {...props} />;
      case 'spelling': return <SpellingGame {...props} />;
      case 'match': return <MatchGame {...props} />;
      case 'quiz': return <QuizGame {...props} />;
      case 'dictation': return <DictationGame {...props} />;
      case 'pronounce': return <PronounceGame {...props} />;
      case 'spaced': return <SpacedRepetition {...props} />;
      default: return null;
    }
  };

  const pageLoading = booksLoading || packsLoading;

  return (
    <div className="practice-page">
      <div className="practice-page-header">
        {(step !== 'source' && step !== 'results' || (urlSourceId && step !== 'results')) && (
          <button className="clean-back-arrow" onClick={handleBack} title="Orqaga">
            ←
          </button>
        )}
        <h1>
          🎮 Mashq {selectedSource && `(${selectedSource.title || selectedSource.name})`}
        </h1>
      </div>

      {pageLoading ? (
        <div className="empty-state"><p>Yuklanmoqda...</p></div>
      ) : (
        <AnimatePresence mode="wait">
          {/* Step 1: Select Source */}
          {step === 'source' && (
            <motion.div
              key="source"
              className="practice-source-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2>📖 Manbani tanlang</h2>
              
              <div className="source-tabs-container">
                <div className="source-tabs">
                  <button
                    className={`source-tab ${sourceType === 'books' ? 'active' : ''}`}
                    onClick={() => { setSourceType('books'); setSelectedSource(null); }}
                  >
                    📚 Kitoblar
                  </button>
                  <button
                    className={`source-tab ${sourceType === 'packs' ? 'active' : ''}`}
                    onClick={() => { setSourceType('packs'); setSelectedSource(null); }}
                  >
                    To'plamlar
                  </button>
                </div>
              </div>

              {sources.length > 0 ? (
                <div className="source-list">
                  {sources.map(source => (
                    <button
                      key={source.id}
                      className="source-option"
                      onClick={() => handleSelectSource(source)}
                    >
                      <div className="source-option-icon">
                        {sourceType === 'books' ? '📖' : (source.icon || '📦')}
                      </div>
                      <div className="source-option-info">
                        <div className="source-option-name">
                          {source.title || source.name}
                        </div>
                        <div className="source-option-count">
                          {source.wordCount || 0} ta so'z
                        </div>
                      </div>
                      <div className="source-option-arrow">→</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">{sourceType === 'books' ? '📚' : '📦'}</div>
                  <h3>
                    {sourceType === 'books' ? 'Kitoblar topilmadi' : "To'plamlar topilmadi"}
                  </h3>
                  <p>Avval {sourceType === 'books' ? 'kitob' : "to'plam"} qo'shing va so'zlar kiriting</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Select Mode */}
          {step === 'mode' && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Word Count Selector for Free Practice */}
              <div className="practice-word-count-bar">
                <span className="practice-word-count-label">🔢 Mashq qilish uchun so'zlar soni:</span>
                <div className="word-count-options">
                  {[5, 10, 20, 'all'].map(count => (
                    <button
                      key={count}
                      className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                      onClick={() => setWordCount(count)}
                    >
                      {count === 'all' ? 'Barchasi' : `${count} ta`}
                    </button>
                  ))}
                </div>
              </div>
              <PracticeHub onSelectMode={handleStartPractice} />
            </motion.div>
          )}

          {/* Step 2.5: Intro Shape Loader */}
          {step === 'intro' && (
            <motion.div
              key="intro"
              className="practice-intro-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="intro-card">
                <div className="intro-mode-icon">
                  {selectedMode === 'flashcard' ? '🎴' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'dictation' ? '🎧' : selectedMode === 'pronounce' ? '🎙️' : selectedMode === 'spaced' ? '🧠' : '🎮'}
                </div>
                <h2>
                  {selectedMode === 'flashcard' ? 'Flashcards' : selectedMode === 'spelling' ? 'Imlo Mashqi' : selectedMode === 'match' ? 'Juftlikni Top' : selectedMode === 'quiz' ? 'Test' : selectedMode === 'dictation' ? 'Diktant' : selectedMode === 'pronounce' ? 'Talaffuz' : selectedMode === 'spaced' ? 'Takrorlash' : 'Mashq'}
                </h2>
                <p>{practiceWords.length} ta so'z tayyorlandi</p>
                
                {/* Duolingo style playful shape loader */}
                <div className="duolingo-loader">
                  <motion.div 
                    className="duolingo-shape shape-circle"
                    animate={{ 
                      y: [0, -30, 0],
                      scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0
                    }}
                  />
                  <motion.div 
                    className="duolingo-shape shape-square"
                    animate={{ 
                      y: [0, -30, 0],
                      rotate: [0, 180, 360],
                      scale: [1, 0.9, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.18
                    }}
                  />
                  <motion.div 
                    className="duolingo-shape shape-triangle"
                    animate={{ 
                      y: [0, -30, 0],
                      rotate: [0, -120, -240, -360],
                      scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.36
                    }}
                  />
                  <motion.div 
                    className="duolingo-shape shape-diamond"
                    animate={{ 
                      y: [0, -30, 0],
                      scale: [1, 0.9, 1.3, 1],
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.54
                    }}
                  />
                </div>
                <div className="duolingo-loader-text">Mashq tayyorlanmoqda...</div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Practice */}
          {step === 'practice' && (
            <motion.div
              key="practice"
              className="practice-session"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="practice-session-header clean-quiz-header">
                <button className="clean-back-arrow" onClick={handleBack} title="Mashqdan chiqish">
                  ←
                </button>
                <h1 className="clean-quiz-title">
                  {selectedMode === 'flashcard' ? '🎴 Flashcard' : selectedMode === 'spelling' ? '✍️ Imlo mashqi' : selectedMode === 'match' ? '🔀 Juftlikni top' : selectedMode === 'quiz' ? '📝 Test' : selectedMode === 'dictation' ? '🎧 Diktant' : selectedMode === 'pronounce' ? '🎙️ Talaffuz' : selectedMode === 'spaced' ? '🧠 Takrorlash' : 'Mashq'}
                </h1>
                <div style={{ width: '40px', opacity: 0 }}></div> {/* spacer to center title */}
              </div>
              <div className="practice-session-content">
                {renderPracticeMode()}
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="practice-results">
                <div className="result-icon">
                  {results.correctCount / results.totalWords >= 0.8 ? '🎉' : 
                   results.correctCount / results.totalWords >= 0.5 ? '👍' : '💪'}
                </div>
                <h2>
                  {results.correctCount / results.totalWords >= 0.8 ? 'Ajoyib!' :
                   results.correctCount / results.totalWords >= 0.5 ? 'Yaxshi!' : 'Davom eting!'}
                </h2>
                <p>Mashq yakunlandi</p>
                <div className="result-stats">
                  <div className="result-stat">
                    <div className="value" style={{ color: 'var(--accent-2)' }}>{results.totalWords}</div>
                    <div className="label">Jami so'zlar</div>
                  </div>
                  <div className="result-stat">
                    <div className="value" style={{ color: 'var(--success)' }}>{results.correctCount}</div>
                    <div className="label">To'g'ri</div>
                  </div>
                  <div className="result-stat">
                    <div className="value" style={{ color: 'var(--error)' }}>{results.incorrectCount}</div>
                    <div className="label">Noto'g'ri</div>
                  </div>
                </div>

                {/* Mistakes / weaknesses analysis */}
                {wrongWords.length > 0 ? (
                  <div className="results-mistakes-container">
                    <div className="results-mistakes-title">
                      📉 Takrorlash tavsiya etiladi (xatolar):
                    </div>
                    <div className="results-mistake-list">
                      {wrongWords.map(word => (
                        <div key={word.id} className="results-mistake-item">
                          <div className="results-mistake-info">
                            <span className="results-mistake-word">{word.word}</span>
                            <span className="results-mistake-translation">{word.translation}</span>
                          </div>
                          <button
                            type="button"
                            className="btn-speak-mistake"
                            onClick={() => speakWord(word.word)}
                            title="Tinglash"
                          >
                            🔊
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="perfect-score-banner">
                    🏆 Mukammal natija! Hech qanday xatolikka yo'l qo'yilmadi.
                  </div>
                )}

                <div className="result-actions">
                  <button className="btn-results-back" onClick={handleReset}>
                    Mashq menyusiga qaytish
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {customModal.show && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-card">
            <div className="custom-alert-icon">
              {customModal.type === 'confirm' ? '❓' : '⚠️'}
            </div>
            <p className="custom-alert-message">{customModal.message}</p>
            
            {customModal.type === 'confirm' ? (
              <div className="custom-alert-actions" style={{ display: 'flex', gap: 'var(--space-sm)', width: '100%' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, padding: '12px' }}
                  onClick={() => {
                    setCustomModal(prev => ({ ...prev, show: false }));
                    if (customModal.onCancel) customModal.onCancel();
                  }}
                >
                  Yo'q
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, padding: '12px' }}
                  onClick={() => {
                    setCustomModal(prev => ({ ...prev, show: false }));
                    if (customModal.onConfirm) customModal.onConfirm();
                  }}
                >
                  Ha
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-primary custom-alert-btn" 
                onClick={() => {
                  setCustomModal(prev => ({ ...prev, show: false }));
                  if (customModal.onConfirm) customModal.onConfirm();
                }}
              >
                Tushunarli
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
