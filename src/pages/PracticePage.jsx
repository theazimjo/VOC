import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, get, update } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { usePacks } from '../hooks/usePacks';
import { useStreak } from '../hooks/useStreak';
import { migratePackWordsIfNeeded } from '../utils/wordsMigration';
import { weightedSelectWords, shuffleArray, speakWord } from '../utils/helpers';
import { playSound, triggerVibration } from '../utils/feedback';
import { calculateNextReview } from '../utils/sm2';
import IosSpinner from '../components/common/IosSpinner';
import PracticeHub from '../components/Practice/PracticeHub';
import Flashcard from '../components/Practice/Flashcard';
import SpellingGame from '../components/Practice/SpellingGame';
import MatchGame from '../components/Practice/MatchGame';
import QuizGame from '../components/Practice/QuizGame';
import SpacedRepetition from '../components/Practice/SpacedRepetition';
import DictationGame from '../components/Practice/DictationGame';
import PronounceGame from '../components/Practice/PronounceGame';
import IrregularVerbsTrainer from '../components/Practice/IrregularVerbsTrainer';
import './PracticePage.css';

export default function PracticePage() {
  const { sourceType: urlSourceType, sourceId: urlSourceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { packs, loading: packsLoading } = usePacks();
  const { incrementActivity } = useStreak();
  
  const [step, setStep] = useState(urlSourceId ? 'loading' : 'source'); // 'loading' | 'source' | 'mode' | 'practice' | 'results'
  const [sourceType, setSourceType] = useState('packs');
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);
  const [sourceWords, setSourceWords] = useState([]);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [wrongWords, setWrongWords] = useState([]);
  const [randomIntroWord, setRandomIntroWord] = useState(null);
  const [customModal, setCustomModal] = useState({ show: false, type: 'alert', message: '', onConfirm: null, onCancel: null });
  const [progressPct, setProgressPct] = useState(0);

  const showAlert = (message, onClose = null) => {
    setCustomModal({ show: true, type: 'alert', message, onConfirm: onClose, onCancel: null });
  };

  const showConfirm = (message, onConfirm, onCancel = null) => {
    setCustomModal({ show: true, type: 'confirm', message, onConfirm, onCancel });
  };

  const resolvedSourceType = urlSourceType === 'books' ? 'packs' : (urlSourceType || 'packs');

  // Reset sourceLoaded when url parameters change
  useEffect(() => {
    setSourceLoaded(false);
  }, [urlSourceType, urlSourceId]);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const querySubStep = queryParams.get('subStep');

  // Load parameterized source if available
  useEffect(() => {
    if (sourceLoaded || !user) return; // Wait for user info to load before executing search and fetch

    if (resolvedSourceType && urlSourceId && !packsLoading) {
      const foundSource = packs.find(s => s.id === urlSourceId);
      if (foundSource) {
        setStep('loading');
        setSourceType('packs');
        setSelectedSource(foundSource);
        setSourceLoaded(true);
        
        // Fetch words for this source
        const fetchWords = async () => {
          await migratePackWordsIfNeeded(user.uid, urlSourceId);
          const wordsRef = ref(db, `users/${user.uid}/words/${urlSourceId}`);
          const wordsSnap = await get(wordsRef);
          let words = [];
          if (wordsSnap.exists()) {
            wordsSnap.forEach(childSnap => {
              words.push({ id: childSnap.key, ...childSnap.val() });
            });
          }
          if (words.length === 0) {
            showAlert("Bu manbada so'zlar yo'q! Avval so'zlar qo'shing.", () => {
              navigate(`/packs/${urlSourceId}`);
            });
            return;
          }
          setSourceWords(words);
          
          const queryParams = new URLSearchParams(search);
          const queryMode = queryParams.get('mode');
          const queryCount = queryParams.get('count');
          const querySubStep = queryParams.get('subStep');
          
          const mode = queryMode || (foundSource.name === 'Irregular Verbs' ? 'irregular-verbs' : null);
          const count = queryCount ? (queryCount === 'all' ? null : parseInt(queryCount, 10)) : (foundSource.name === 'Irregular Verbs' && mode === 'irregular-verbs' && querySubStep === 'practice' ? 10 : null);
          
          if (mode) {
            setSelectedMode(mode);
            let selected = [...words];
            if (count && selected.length > count) {
              selected = shuffleArray(selected).slice(0, count);
            }
            setPracticeWords(selected);
            setStep('intro');
          } else {
            setStep('mode');
          }
        };
        fetchWords();
      } else {
        navigate('/library');
      }
    }
  }, [urlSourceType, resolvedSourceType, urlSourceId, packsLoading, packs, user, navigate, sourceLoaded, search]);

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
    }, 3200); // slightly longer loading time to allow reading the tip

    return () => clearTimeout(timerId);
  }, [step]);

  // Choose a random word for the loading screen tip
  useEffect(() => {
    if (step === 'intro' && practiceWords.length > 0) {
      const idx = Math.floor(Math.random() * practiceWords.length);
      setRandomIntroWord(practiceWords[idx]);
    }
  }, [step, practiceWords]);

  const sources = sourceType === 'books' ? books : packs;

  const handleSelectSource = async (source) => {
    setSelectedSource(source);
    if (!user) return;

    await migratePackWordsIfNeeded(user.uid, source.id);
    const wordsRef = ref(db, `users/${user.uid}/words/${source.id}`);
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
    if (source.name === 'Irregular Verbs') {
      setSelectedMode('irregular-verbs');
      setPracticeWords(words);
      setStep('intro');
    } else {
      setStep('mode');
    }
  };

  const reloadWordsAndLessons = async () => {
    if (!selectedSource || !user) return;
    const wordsRef = ref(db, `users/${user.uid}/words/${selectedSource.id}`);
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
    setProgressPct(0);

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

      const wordRef = ref(db, `users/${user.uid}/words/${selectedSource.id}/${wordId}`);
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
    incrementActivity(resultData.totalWords || 1);
  };

  const handleBack = () => {
    if (step === 'practice' || step === 'intro') {
      showConfirm("Rostdan ham mashqni tark etmoqchimisiz? Hozirgi natijalaringiz saqlanmaydi.", () => {
        if (selectedSource?.name === 'Irregular Verbs') {
          if (urlSourceId) {
            navigate(`/packs/${urlSourceId}`);
          } else {
            setStep('source');
          }
        } else {
          setStep('mode');
        }
      });
      return;
    }

    if (step === 'mode') {
      if (urlSourceId) {
        navigate(`/packs/${urlSourceId}`);
      } else {
        setStep('source');
      }
    }
    else if (step === 'results') {
      if (selectedSource?.name === 'Irregular Verbs') {
        if (urlSourceId) {
          navigate(`/packs/${urlSourceId}`);
        } else {
          setStep('source');
        }
      } else {
        setStep('mode');
      }
    }
  };

  const handleReset = () => {
    setResults(null);
    setWrongWords([]);
    setProgressPct(0);
    
    if (selectedSource?.name === 'Irregular Verbs') {
      setSelectedMode('irregular-verbs');
      setPracticeWords(sourceWords);
      setStep('intro');
    } else {
      setSelectedMode(null);
      setPracticeWords([]);
      if (urlSourceId) {
        setStep('mode');
      } else {
        setStep('source');
      }
    }
  };

  const renderPracticeMode = () => {
    const props = {
      words: practiceWords,
      onComplete: handleComplete,
      onUpdateWord: handleUpdateWord,
      onAnswer: handleAnswer,
      onExit: handleBack,
      sourceName: selectedSource?.title || selectedSource?.name || "Kutubxona",
      onProgress: (current, total) => setProgressPct(total > 0 ? (current / total) * 100 : 0)
    };

    switch (selectedMode) {
      case 'flashcard': return <Flashcard {...props} />;
      case 'spelling': return <SpellingGame {...props} />;
      case 'match': return <MatchGame {...props} />;
      case 'quiz': return <QuizGame {...props} />;
      case 'dictation': return <DictationGame {...props} />;
      case 'pronounce': return <PronounceGame {...props} />;
      case 'spaced': return <SpacedRepetition {...props} />;
      case 'irregular-verbs': return <IrregularVerbsTrainer {...props} initialSubStep={querySubStep} />;
      default: return null;
    }
  };

  const pageLoading = packsLoading;

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

      <div className="practice-steps-container">
        {/* Step 0: Loading Indicator */}
        {(pageLoading || step === 'loading') && (
          <motion.div
            key="main-page-loader"
            className="ios-activity-indicator"
            style={{ marginTop: 'var(--space-2xl)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <IosSpinner />
            <span>Yuklanmoqda...</span>
          </motion.div>
        )}

        {/* Step 1: Select Source */}
        {!pageLoading && step === 'source' && (
            <motion.div
              key="source"
              className="practice-source-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2>📦 To'plamni tanlang</h2>

              {packs.length > 0 ? (
                <div className="source-list">
                  {packs.map(source => (
                    <button
                      key={source.id}
                      className="source-option"
                      onClick={() => handleSelectSource(source)}
                    >
                      <div className="source-option-icon">
                        {source.icon || '📦'}
                      </div>
                      <div className="source-option-info">
                        <div className="source-option-name">
                          {source.name}
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
                  <div className="empty-state-icon">📦</div>
                  <h3>To'plamlar topilmadi</h3>
                  <p>Avval to'plam yarating va so'zlar kiriting</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Select Mode */}
          {!pageLoading && step === 'mode' && (
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
              <PracticeHub onSelectMode={handleStartPractice} isIrregularVerbs={selectedSource?.id === 'irregular-verbs' || selectedSource?.isIrregularVerbs} />
            </motion.div>
          )}

          {/* Step 2.5: Intro Shape Loader */}
          {!pageLoading && step === 'intro' && (
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
                  {selectedMode === 'flashcard' ? '🎴' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'dictation' ? '🎧' : selectedMode === 'pronounce' ? '🎙️' : selectedMode === 'spaced' ? '🧠' : selectedMode === 'irregular-verbs' ? '⚡' : '🎮'}
                </div>
                <h2>
                  {selectedMode === 'flashcard' ? 'Flashcards' : selectedMode === 'spelling' ? 'Imlo Mashqi' : selectedMode === 'match' ? 'Juftlikni Top' : selectedMode === 'quiz' ? 'Test' : selectedMode === 'dictation' ? 'Diktant' : selectedMode === 'pronounce' ? 'Talaffuz' : selectedMode === 'spaced' ? 'Takrorlash' : selectedMode === 'irregular-verbs' ? "Fe'llar Trenajyori" : 'Mashq'}
                </h2>
                <p>{practiceWords.length} ta so'z tayyorlandi</p>
                
                <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                  <IosSpinner />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>Mashq tayyorlanmoqda...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Practice */}
          {!pageLoading && step === 'practice' && (
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
                  {selectedMode === 'flashcard' ? '🎴 Flashcards' : selectedMode === 'spelling' ? '✍️ Imlo mashqi' : selectedMode === 'match' ? '🔀 Juftlikni top' : selectedMode === 'quiz' ? '📝 Test' : selectedMode === 'dictation' ? '🎧 Diktant' : selectedMode === 'pronounce' ? '🎙️ Talaffuz' : selectedMode === 'spaced' ? '🧠 Takrorlash' : 'Mashq'}
                </h1>
                <div style={{ width: '40px', opacity: 0 }}></div>
                
                {/* Clean Progress bar inside the header rectangle along the bottom edge */}
                <div className="practice-header-progress-track">
                  <div 
                    className="practice-header-progress-fill" 
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
              <div className="practice-session-content">
                {renderPracticeMode()}
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {!pageLoading && step === 'results' && results && (
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
      </div>
      {customModal.show && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-card">
            <p className="custom-alert-message">{customModal.message}</p>
            
            {customModal.type === 'confirm' ? (
              <div className="custom-alert-actions-row">
                <button 
                  className="custom-alert-btn" 
                  onClick={() => {
                    setCustomModal(prev => ({ ...prev, show: false }));
                    if (customModal.onCancel) customModal.onCancel();
                  }}
                >
                  Yo'q
                </button>
                <button 
                  className="custom-alert-btn" 
                  style={{ fontWeight: '700' }}
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
                className="custom-alert-btn" 
                style={{ fontWeight: '700' }}
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
