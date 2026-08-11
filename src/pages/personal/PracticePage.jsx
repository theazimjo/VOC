import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ThumbsUp, Dumbbell, TrendingDown, Sparkles, BookOpen, CheckCircle2, XCircle, Volume2, ChevronLeft } from 'lucide-react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { usePacks } from '../../hooks/usePacks';
import { useStreak } from '../../hooks/useStreak';
import { migratePackWordsIfNeeded } from '../../utils/wordsMigration';
import { weightedSelectWords, filterWordsForMode, shuffleArray, speakWord, PRACTICE_MODE_MIN_WORDS } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { computeClusterCalibration } from '../../utils/memoryEngine';
import { saveReviewEvent } from '../../experiment/experimentDB';
import { classifyWord } from '../../experiment/semanticClassifier';
import IosSpinner from '../../components/common/IosSpinner';
import PracticeHub from '../../components/Practice/PracticeHub';
import Flashcard from '../../components/Practice/Flashcard';
import SpellingGame from '../../components/Practice/SpellingGame';
import MatchGame from '../../components/Practice/MatchGame';
import QuizGame from '../../components/Practice/QuizGame';
import PronounceGame from '../../components/Practice/PronounceGame';
import IrregularVerbsTrainer from '../../components/Practice/IrregularVerbsTrainer';
import SentenceBuilder from '../../components/Practice/SentenceBuilder';
import './PracticePage.css';

export default function PracticePage() {
  const { sourceType: urlSourceType, sourceId: urlSourceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { packs, allWords, loading: packsLoading } = usePacks();
  const { incrementActivity } = useStreak();

  const [step, setStep] = useState(urlSourceId ? 'loading' : 'source'); // 'loading' | 'source' | 'mode' | 'practice' | 'results'
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);
  const [sourceWords, setSourceWords] = useState([]);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [wrongWords, setWrongWords] = useState([]);
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
            showAlert("This pack has no words! Add some words first.", () => {
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

          const eligiblePool = mode ? filterWordsForMode(words, mode) : words;
          const minWords = mode ? (PRACTICE_MODE_MIN_WORDS[mode] || 1) : 1;

          if (mode && eligiblePool.length >= minWords) {
            setSelectedMode(mode);
            let selected = eligiblePool;
            if (count && selected.length > count) {
              selected = shuffleArray(selected).slice(0, count);
            }
            setPracticeWords(selected);
            setStep('intro');
          } else {
            if (mode) {
              showAlert(`This mode needs at least ${minWords} words. Choose a different mode.`);
            }
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
    }, 700);

    return () => clearTimeout(timerId);
  }, [step]);

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
      showAlert("This pack has no words! Add some words from the Library first.");
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

  const handleStartPractice = async (mode) => {
    if (sourceWords.length === 0) {
      showAlert("This pack has no words!");
      return;
    }

    // Weighted selection: harder / less-known words are more likely to be
    // chosen, but Spelling/Sentence get narrowed to already-seen words first
    // — you can't type or recall a word from memory you've never met.
    const pool = filterWordsForMode(sourceWords, mode);
    const minWords = PRACTICE_MODE_MIN_WORDS[mode] || 1;
    if (pool.length < minWords) {
      showAlert(`This mode needs at least ${minWords} words (you currently have ${pool.length}).`);
      return;
    }

    setSelectedMode(mode);
    setWrongWords([]);
    setProgressPct(0);

    const selected = weightedSelectWords(pool, wordCount);
    setPracticeWords(selected);
    setStep('intro');
  };

  // `reviewInput` is the raw outcome of a single review — {isCorrect,
  // confidence, responseTime, retrievalType} — each game component measures
  // its own real response time and knows its own retrieval type, but does
  // NOT compute the stability update itself anymore. That's delegated here
  // to saveReviewEvent(), the exact same function Memory Lab uses, so every
  // practice mode feeds one consistent pipeline: recallHistory gets recorded
  // (previously only Memory Lab wrote it, leaving Forgetting Autopsy/
  // Confusion Network data empty for anyone who only used the main practice
  // modes), and per-semantic-cluster self-calibration applies everywhere too.
  // Returns the persisted result so a caller that needs it for its own
  // in-session logic (IrregularVerbsTrainer's retry queue) can await it.
  const handleUpdateWord = async (wordId, reviewInput) => {
    if (!user || !selectedSource) return null;
    try {
      const word = sourceWords.find(w => w.id === wordId);
      if (!word) return null;

      const { isCorrect, confidence, responseTime, retrievalType = 'passive_recall' } = reviewInput;
      const prevWrongCount = word.wrongCount || 0;

      // Self-calibrate this word's semantic cluster the same way Memory Lab
      // does, so both practice paths adapt the model consistently. Use the
      // pack's own name (not word.source — sourceWords is read directly from
      // Firebase and never carries that synthetic, PacksContext-only field)
      // so this matches how allWords classifies the very same word elsewhere.
      const packName = selectedSource?.name || '';
      const { key: clusterKey } = classifyWord(word.word, word.translation, packName);
      const clusterHistory = [];
      allWords.forEach((w) => {
        if (classifyWord(w.word, w.translation, w.source).key === clusterKey) {
          clusterHistory.push(...(w.recallHistory || []));
        }
      });
      const clusterMultiplier = computeClusterCalibration(clusterHistory);

      const updated = await saveReviewEvent(user.uid, selectedSource.id, wordId, word, {
        isCorrect,
        confidence,
        responseTime,
        retrievalType,
        clusterMultiplier,
        mode: selectedMode,
        wordText: word.word,
      });

      const wrongCount = isCorrect ? Math.max(0, prevWrongCount - 1) : prevWrongCount + 1;
      const wordRef = ref(db, `users/${user.uid}/words/${selectedSource.id}/${wordId}`);
      await update(wordRef, { wrongCount });

      const finalData = { ...updated, wrongCount };

      // Sync local state immediately so weights are updated for future picks
      setSourceWords(prev => prev.map(w => w.id === wordId ? { ...w, ...finalData } : w));

      return finalData;
    } catch (e) {
      console.error('Error updating word:', e);
      return null;
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
      showConfirm("Are you sure you want to leave the practice? Your current results will not be saved.", () => {
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
      allWords,
      onComplete: handleComplete,
      onUpdateWord: handleUpdateWord,
      onAnswer: handleAnswer,
      onExit: handleBack,
      sourceName: selectedSource?.title || selectedSource?.name || "Library",
      language: selectedSource?.language || 'en-US',
      onProgress: (current, total) => setProgressPct(total > 0 ? (current / total) * 100 : 0)
    };

    switch (selectedMode) {
      case 'flashcard': return <Flashcard {...props} />;
      case 'spelling': return <SpellingGame {...props} />;
      case 'match': return <MatchGame {...props} />;
      case 'quiz': return <QuizGame {...props} />;
      case 'pronounce': return <PronounceGame {...props} />;
      case 'sentence': return <SentenceBuilder {...props} />;
      case 'irregular-verbs': return <IrregularVerbsTrainer {...props} initialSubStep={querySubStep} />;
      default: return null;
    }
  };

  const pageLoading = packsLoading;

  const getResultTier = (r) => {
    const ratio = r.totalWords > 0 ? r.correctCount / r.totalWords : 0;
    if (ratio >= 0.8) return { Icon: Trophy, label: 'Great job!', color: 'var(--accent-3)', dim: 'var(--warning-dim)' };
    if (ratio >= 0.5) return { Icon: ThumbsUp, label: 'Good job!', color: 'var(--accent-1)', dim: 'var(--accent-1-dim)' };
    return { Icon: Dumbbell, label: 'Keep going!', color: 'var(--success)', dim: 'var(--success-dim)' };
  };

  return (
    <div className="practice-page">
      <div className="practice-page-header">
        {step !== 'source' && step !== 'results' && (
          <button className="clean-back-arrow" onClick={handleBack} title="Back">
            ←
          </button>
        )}
        <h1>
          🎮 Practice {selectedSource && `(${selectedSource.title || selectedSource.name})`}
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
            <span>Loading...</span>
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
              <h2>📦 Choose a pack</h2>

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
                          {source.wordCount || 0} words
                        </div>
                      </div>
                      <div className="source-option-arrow">→</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📦</div>
                  <h3>No packs found</h3>
                  <p>Create a pack and add some words first</p>
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
                <span className="practice-word-count-label">🔢 Number of words to practice:</span>
                <div className="word-count-options">
                  {[5, 10, 20, 'all'].map(count => (
                    <button
                      key={count}
                      className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                      onClick={() => setWordCount(count)}
                    >
                      {count === 'all' ? 'All' : `${count}`}
                    </button>
                  ))}
                </div>
              </div>
              <PracticeHub onSelectMode={handleStartPractice} isIrregularVerbs={selectedSource?.id === 'irregular-verbs' || selectedSource?.isIrregularVerbs} words={sourceWords} />
            </motion.div>
          )}

          {/* Step 2.5: Intro Shape Loader */}
          {!pageLoading && step === 'intro' && (
            <motion.div
              key="intro"
              className="practice-intro-screen"
              onClick={() => setStep('practice')}
              style={{ cursor: 'pointer' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="intro-card">
                <div className="intro-mode-icon">
                  {selectedMode === 'flashcard' ? '🧠' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'pronounce' ? '🎙️' : selectedMode === 'sentence' ? '📓' : selectedMode === 'irregular-verbs' ? '⚡' : '🎮'}
                </div>
                <h2>
                  {selectedMode === 'flashcard' ? 'Smart Flashcards' : selectedMode === 'spelling' ? 'Spelling Practice' : selectedMode === 'match' ? 'Match the Pair' : selectedMode === 'quiz' ? 'Quiz' : selectedMode === 'pronounce' ? 'Pronunciation' : selectedMode === 'sentence' ? 'Sentence Builder' : selectedMode === 'irregular-verbs' ? "Irregular Verbs Trainer" : 'Practice'}
                </h2>
                <p>{practiceWords.length} words ready</p>

                <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                  <IosSpinner />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>Preparing your practice...</span>
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
                <button className="clean-back-arrow" onClick={handleBack} title="Exit practice">
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
                <h1 className="clean-quiz-title">
                  {selectedMode === 'flashcard' ? '🧠 Smart Flashcards' : selectedMode === 'spelling' ? '✍️ Spelling Practice' : selectedMode === 'match' ? '🔀 Match the Pair' : selectedMode === 'quiz' ? '📝 Quiz' : selectedMode === 'pronounce' ? '🎙️ Pronunciation' : selectedMode === 'sentence' ? '📓 Sentence Builder' : 'Practice'}
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
          {!pageLoading && step === 'results' && results && (() => {
            const tier = getResultTier(results);
            return (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="practice-results">
                <div className="result-icon-circle" style={{ background: tier.dim, color: tier.color }}>
                  <tier.Icon size={36} strokeWidth={2.2} />
                </div>
                <h2>{tier.label}</h2>
                <p>Practice complete</p>
                <div className="result-stats">
                  <div className="result-stat">
                    <BookOpen className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--accent-2)' }} />
                    <div className="value" style={{ color: 'var(--accent-2)' }}>{results.totalWords}</div>
                    <div className="label">Total words</div>
                  </div>
                  <div className="result-stat">
                    <CheckCircle2 className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--success)' }} />
                    <div className="value" style={{ color: 'var(--success)' }}>{results.correctCount}</div>
                    <div className="label">Correct</div>
                  </div>
                  <div className="result-stat">
                    <XCircle className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--error)' }} />
                    <div className="value" style={{ color: 'var(--error)' }}>{results.incorrectCount}</div>
                    <div className="label">Incorrect</div>
                  </div>
                </div>

                {/* Mistakes / weaknesses analysis */}
                {wrongWords.length > 0 ? (
                  <div className="results-mistakes-container">
                    <div className="results-mistakes-title">
                      <TrendingDown size={14} strokeWidth={2.4} />
                      Recommended for review (mistakes)
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
                            onClick={() => speakWord(word.word, selectedSource?.language)}
                            title="Listen"
                          >
                            <Volume2 size={16} strokeWidth={2.3} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="perfect-score-banner">
                    <Sparkles size={16} strokeWidth={2.3} />
                    Perfect score! No mistakes at all.
                  </div>
                )}

                <div className="result-actions">
                  <button className="btn-results-back" onClick={handleReset}>
                    Back to practice menu
                  </button>
                </div>
              </div>
            </motion.div>
            );
          })()}
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
                  No
                </button>
                <button
                  className="custom-alert-btn"
                  style={{ fontWeight: '700' }}
                  onClick={() => {
                    setCustomModal(prev => ({ ...prev, show: false }));
                    if (customModal.onConfirm) customModal.onConfirm();
                  }}
                >
                  Yes
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
                Got it
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
