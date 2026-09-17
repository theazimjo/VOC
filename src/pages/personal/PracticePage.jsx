import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ThumbsUp, Dumbbell, TrendingDown, Sparkles, BookOpen, CheckCircle2, XCircle, Volume2, ChevronLeft } from 'lucide-react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePacks } from '../../hooks/usePacks';
import { useStreak } from '../../hooks/useStreak';
import { migratePackWordsIfNeeded } from '../../utils/wordsMigration';
import { weightedSelectWords, filterWordsForMode, shuffleArray, speakWord, PRACTICE_MODE_MIN_WORDS, RECALL_ONLY_MODES } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { computeClusterCalibration } from '../../utils/memoryEngine';
import { saveReviewEvent } from '../../experiment/experimentDB';
import { getWordCluster } from '../../experiment/semanticClassifier';
import IosSpinner from '../../components/common/IosSpinner';
import PracticeHub from '../../components/Practice/PracticeHub';
import Flashcard from '../../components/Practice/Flashcard';
import SpellingGame from '../../components/Practice/SpellingGame';
import MatchGame from '../../components/Practice/MatchGame';
import QuizGame from '../../components/Practice/QuizGame';
import PronounceGame from '../../components/Practice/PronounceGame';
import IrregularVerbsTrainer from '../../components/Practice/IrregularVerbsTrainer';
import IeltsTrainer from '../../components/Practice/IeltsTrainer';
import EnglishTrainer from '../../components/Practice/EnglishTrainer';
import SentenceBuilder from '../../components/Practice/SentenceBuilder';
import SpeedGame, { getSpeedRecord } from '../../components/Practice/SpeedGame';
import GridMatchGame from '../../components/Practice/GridMatchGame';
import PracticeResultsView from '../../components/Practice/PracticeResultsView';
import PracticeQuitModal from '../../components/Practice/PracticeQuitModal';
import './PracticePage.css';

export default function PracticePage({ embedded = false, initialSource = null, initialTopic = null, onExit = null }) {
  const sessionStartRef = useRef(Date.now());
  const { sourceType: urlSourceType, sourceId: urlSourceIdParam, packId: routePackId } = useParams();
  const urlSourceId = initialSource?.id || urlSourceIdParam || routePackId;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { packs, allWords, loading: packsLoading } = usePacks();
  const { incrementActivity } = useStreak();

  const WORD_COUNT_STORAGE_KEY = 'voc_last_practice_word_count';

  const [step, setStep] = useState(urlSourceId ? 'loading' : 'source'); // 'loading' | 'source' | 'mode' | 'practice' | 'results'
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const [wordCount, setWordCountState] = useState(() => {
    try {
      const saved = localStorage.getItem(WORD_COUNT_STORAGE_KEY);
      if (!saved) return 10;
      if (saved === 'all') return 'all';
      const num = parseInt(saved, 10);
      return [5, 10, 20].includes(num) ? num : 10;
    } catch (e) {
      return 10;
    }
  });

  const setWordCount = (count) => {
    setWordCountState(count);
    try {
      localStorage.setItem(WORD_COUNT_STORAGE_KEY, String(count));
    } catch (e) {}
  };

  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);
  const [sourceWords, setSourceWords] = useState([]);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [wrongWords, setWrongWords] = useState([]);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [customModal, setCustomModal] = useState({ show: false, type: 'alert', message: '', onConfirm: null, onCancel: null, confirmText: '', cancelText: '' });
  const [progressPct, setProgressPct] = useState(0);

  const showAlert = (message, onClose = null) => {
    setCustomModal({ show: true, type: 'alert', message, onConfirm: onClose, onCancel: null, confirmText: '', cancelText: '' });
  };

  const showConfirm = (message, onConfirm, onCancel = null, confirmText = '', cancelText = '') => {
    setCustomModal({ show: true, type: 'confirm', message, onConfirm, onCancel, confirmText, cancelText });
  };

  const resolvedSourceType = urlSourceType === 'books' ? 'packs' : (urlSourceType || 'packs');

  // Reset sourceLoaded when url parameters change
  useEffect(() => {
    setSourceLoaded(false);
  }, [urlSourceType, urlSourceId]);

  const { search, state: locationState } = useLocation();
  const queryParams = new URLSearchParams(search);
  const querySubStep = queryParams.get('subStep');
  // The chapter/topic (if any) this practice session was started with - kept
  // so navigating back to PackDetail returns to the same chapter filter
  // instead of resetting to "All" (PackDetail derives its filter from this
  // same query param).
  const topicParam = initialTopic || queryParams.get('topic');
  // A course pack (courseId set) has no PackDetail page of its own — sending
  // "back"/"done" there would land on the generic word-list page instead of
  // where the session actually started, so course sessions return to their
  // lesson's Words stage instead.
  const isCourseSession = Boolean(
    embedded ||
    routePackId ||
    locationState?.pack?.courseId ||
    selectedSource?.courseId ||
    (urlSourceId && packs.find((s) => s.id === urlSourceId)?.courseId)
  );
  const packDetailPath = urlSourceId
    ? (isCourseSession
        ? `/course/${urlSourceId}/lesson?unit=${encodeURIComponent(topicParam || '')}&stage=words`
        : `/packs/${urlSourceId}${topicParam ? `?topic=${encodeURIComponent(topicParam)}` : ''}`)
    : null;

  // Load parameterized source if available
  useEffect(() => {
    if (sourceLoaded || !user) return; // Wait for user info to load before executing search and fetch

    // A caller that already has the pack loaded (e.g. a course lesson stage,
    // right after seeding/creating it) can hand it over directly via router
    // state, instead of waiting on the global packs list — which can lag
    // behind a pack that was only just created in this same session.
    const statePack = initialSource || locationState?.pack;
    const passedDirectly = Boolean(statePack && statePack.id === urlSourceId);

    if (initialSource || (resolvedSourceType && urlSourceId && (passedDirectly || !packsLoading))) {
      const foundSource = initialSource || (passedDirectly ? statePack : packs.find(s => s.id === urlSourceId));
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

          // Restrict to a single chapter/topic when the pack's practice button
          // was pressed with a chapter filter active (see PackDetail's topic
          // chips) - "All" omits this param and practices the whole pack.
          const queryParams = new URLSearchParams(search);
          const queryTopic = initialTopic || queryParams.get('topic');
          if (queryTopic) {
            words = words.filter(w => w.topic === queryTopic);
          }

          if (words.length === 0) {
            const fallbackPath = packDetailPath || (foundSource.courseId ? `/course/${urlSourceId}` : `/packs/${urlSourceId}`);
            showAlert(
              queryTopic ? t('practice.noWordsInChapter') : t('practice.noWordsInPack'),
              () => {
                if (onExit) onExit();
                else navigate(fallbackPath);
              }
            );
            return;
          }
          setSourceWords(words);

          const queryMode = queryParams.get('mode');
          const queryCount = queryParams.get('count');
          const querySubStep = queryParams.get('subStep');

          // Check if user refreshed (F5) while on results screen
          if (querySubStep === 'results' && urlSourceId) {
            try {
              const savedRaw = sessionStorage.getItem(`voc_practice_results_${urlSourceId}`);
              if (savedRaw) {
                const saved = JSON.parse(savedRaw);
                if (saved && saved.results) {
                  if (saved.selectedMode) setSelectedMode(saved.selectedMode);
                  if (saved.wrongWords) setWrongWords(saved.wrongWords);
                  setResults(saved.results);
                  setStep('results');
                  return;
                }
              }
            } catch (e) {
              console.error('Failed to restore results from sessionStorage:', e);
            }
          }

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
              showAlert(t('practice.modeNeedsMinWords', { min: minWords }));
            }
            setStep('mode');
          }
        };
        fetchWords();
      } else {
        const isCourse = packs.find(s => s.id === urlSourceId)?.courseId;
        if (onExit) onExit();
        else navigate(isCourse ? `/course/${urlSourceId}` : '/library');
      }
    }
  }, [urlSourceType, resolvedSourceType, urlSourceId, packsLoading, packs, user, navigate, sourceLoaded, search, locationState, packDetailPath, initialSource, initialTopic, onExit]);

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

  // Handle keyboard Enter key on results and intro screens to click the primary action button
  useEffect(() => {
    if (step !== 'results' && step !== 'intro') return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (step === 'results') {
          handleReset();
        } else if (step === 'intro') {
          setStep('practice');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      showAlert(t('practice.noWordsInPackFromLibrary'));
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
    sessionStartRef.current = Date.now();
    if (sourceWords.length === 0) {
      showAlert(t('practice.noWordsInPack'));
      return;
    }

    // Weighted selection: harder / less-known words are more likely to be
    // chosen, but Spelling/Sentence get narrowed to already-seen words first
    // — you can't type or recall a word from memory you've never met.
    const pool = filterWordsForMode(sourceWords, mode);
    const minWords = PRACTICE_MODE_MIN_WORDS[mode] || 1;
    if (pool.length < minWords) {
      if (RECALL_ONLY_MODES.has(mode) && sourceWords.length >= minWords) {
        showConfirm(
          t('practice.recallModeNeedFlashcards', { min: minWords, count: pool.length }),
          () => handleStartPractice('flashcard'),
          null,
          t('practice.goToFlashcards'),
          t('practice.gotIt')
        );
      } else {
        showAlert(t('practice.modeNeedsMinWordsCount', { min: minWords, count: pool.length }));
      }
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
      // does, so both practice paths adapt the model consistently. Prefers a
      // curated topic or an already-classified cluster on the word record
      // (see getWordCluster) over the instant offline heuristic.
      const { key: clusterKey } = getWordCluster(word);
      const clusterHistory = [];
      allWords.forEach((w) => {
        if (getWordCluster(w).key === clusterKey) {
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
    const elapsedSec = Math.max(1, Math.round((Date.now() - sessionStartRef.current) / 1000));
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    const durationFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    const fullResults = { ...resultData, durationFormatted, durationSec: elapsedSec };
    setResults(fullResults);
    setStep('results');
    incrementActivity(resultData.totalWords || 1);

    if (urlSourceId) {
      try {
        sessionStorage.setItem(`voc_practice_results_${urlSourceId}`, JSON.stringify({
          results: fullResults,
          wrongWords: wrongWords || [],
          selectedMode,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.error('Error saving practice results to sessionStorage:', e);
      }

      const newParams = new URLSearchParams(window.location.search);
      newParams.set('subStep', 'results');
      if (selectedMode) newParams.set('mode', selectedMode);
      navigate({ search: newParams.toString() }, { replace: true });
    }
  };

  const exitSession = () => {
    if (onExit) {
      onExit();
    } else if (packDetailPath) {
      navigate(packDetailPath);
    } else {
      setStep('source');
    }
  };

  const handleBack = (skipConfirm = false) => {
    if (step === 'practice' || step === 'intro') {
      if (skipConfirm || skipConfirm === true) {
        setShowQuitModal(false);
        if (selectedSource?.name === 'Irregular Verbs') {
          exitSession();
        } else {
          setStep('mode');
        }
        return;
      }
      setShowQuitModal(true);
      return;
    }

    if (step === 'mode') {
      exitSession();
    }
    else if (step === 'results') {
      if (selectedSource?.name === 'Irregular Verbs') {
        exitSession();
      } else {
        setStep('mode');
      }
    }
  };

  const handleReset = () => {
    if (urlSourceId) {
      try {
        sessionStorage.removeItem(`voc_practice_results_${urlSourceId}`);
      } catch (e) {}

      const newParams = new URLSearchParams(window.location.search);
      newParams.delete('subStep');
      navigate({ search: newParams.toString() }, { replace: true });
    }

    sessionStartRef.current = Date.now();
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
      isEnglishPack: selectedSource?.type === 'english' || selectedSource?.type === 'monolingual',
      onProgress: (current, total) => setProgressPct(total > 0 ? (current / total) * 100 : 0)
    };

    switch (selectedMode) {
      case 'flashcard': return <Flashcard {...props} />;
      case 'spelling': return <SpellingGame {...props} />;
      case 'match': return <MatchGame {...props} />;
      case 'quiz': return <QuizGame {...props} />;
      case 'pronounce': return <PronounceGame {...props} />;
      case 'sentence': return <SentenceBuilder {...props} />;
      case 'speed': return <SpeedGame {...props} />;
      case 'gridmatch': return <GridMatchGame {...props} />;
      case 'irregular-verbs': return <IrregularVerbsTrainer {...props} initialSubStep={querySubStep} />;
      case 'ielts-trainer': return <IeltsTrainer {...props} />;
      case 'english-trainer': return <EnglishTrainer {...props} />;
      default: return null;
    }
  };

  const pageLoading = packsLoading;

  const getResultTier = (r) => {
    const total = r.totalWords || 1;
    const correct = r.correctCount || 0;
    const ratio = total > 0 ? correct / total : 0;
    const isPerfect = (r.incorrectCount === 0 && correct > 0) || (correct === total && total > 0);

    if (isPerfect) {
      return {
        title: t('practice.perfectLesson') || 'Perfect lesson!',
        subtitle: t('practice.takeABow') || 'Take a bow!',
        color: 'var(--accent-1)',
        isPerfect: true
      };
    }
    if (ratio >= 0.8) {
      return {
        title: t('practice.greatJob') || 'Great job!',
        subtitle: t('practice.practiceComplete') || 'Practice complete',
        color: 'var(--accent-3)',
        isPerfect: false
      };
    }
    if (ratio >= 0.5) {
      return {
        title: t('practice.goodJob') || 'Good job!',
        subtitle: t('practice.practiceComplete') || 'Practice complete',
        color: 'var(--accent-1)',
        isPerfect: false
      };
    }
    return {
      title: t('practice.keepGoing') || 'Keep going!',
      subtitle: t('practice.dontGiveUp') || "Don't give up!",
      color: 'var(--accent-2)',
      isPerfect: false
    };
  };

  return (
    <div className="practice-page">
      {step !== 'practice' && step !== 'results' && (
        <div className="practice-page-header">
          {step !== 'source' && (
            <button className="clean-back-arrow" onClick={handleBack} title="Back">
              ←
            </button>
          )}
          <h1>
            {t('practice.title')} {selectedSource && `(${selectedSource.title || selectedSource.name})`}
          </h1>
        </div>
      )}

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
            <span>{t('practice.loading')}</span>
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
              <h2>{t('practice.choosePack')}</h2>

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
                          {t('library.words', { count: source.wordCount || 0 })}
                        </div>
                      </div>
                      <div className="source-option-arrow">→</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📦</div>
                  <h3>{t('practice.noPacks')}</h3>
                  <p>{t('practice.noPacksHint')}</p>
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
                <span className="practice-word-count-label">{t('practice.numWordsToPractice')}</span>
                <div className="word-count-options">
                  {[5, 10, 20, 'all'].map(count => (
                    <button
                      key={count}
                      className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                      onClick={() => setWordCount(count)}
                    >
                      {count === 'all' ? t('practice.all') : `${count}`}
                    </button>
                  ))}
                </div>
              </div>
              <PracticeHub
                onSelectMode={handleStartPractice}
                isIrregularVerbs={selectedSource?.id === 'irregular-verbs' || selectedSource?.isIrregularVerbs}
                isIeltsPack={selectedSource?.type === 'ielts'}
                isEnglishPack={selectedSource?.type === 'english' || selectedSource?.type === 'monolingual'}
                words={sourceWords}
              />
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
                  {selectedMode === 'flashcard' ? '🧠' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'pronounce' ? '🎙️' : selectedMode === 'sentence' ? '📓' : selectedMode === 'speed' ? '⏱️' : selectedMode === 'gridmatch' ? '🧩' : selectedMode === 'irregular-verbs' ? '⚡' : selectedMode === 'ielts-trainer' ? '🎓' : selectedMode === 'english-trainer' ? '🔤' : '🎮'}
                </div>
                <h2>
                  {selectedMode === 'flashcard' ? t('practice.flashcardsTitle') : selectedMode === 'spelling' ? t('practice.spellingTitle') : selectedMode === 'match' ? t('practice.matchTitle') : selectedMode === 'quiz' ? t('practice.quizTitle') : selectedMode === 'pronounce' ? t('practice.pronounceTitle') : selectedMode === 'sentence' ? 'Sentence Builder' : selectedMode === 'speed' ? t('practice.speedTitle') : selectedMode === 'gridmatch' ? t('practice.gridmatchTitle') : selectedMode === 'irregular-verbs' ? t('practice.irregularVerbsTitle') : selectedMode === 'ielts-trainer' ? t('practice.ieltsTrainerTitle') : selectedMode === 'english-trainer' ? t('practice.englishTrainerTitle') : t('practice.title')}
                </h2>
                <p>{t('practice.wordsReady', { count: practiceWords.length })}</p>
                {selectedMode === 'speed' && (
                  <p className="intro-speed-record">
                    {t('practice.bestSpeedRecord', { record: getSpeedRecord(selectedSource?.title || selectedSource?.name || "Library") })}
                  </p>
                )}

                <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                  <IosSpinner />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>{t('practice.preparingPractice')}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Practice */}
          {!pageLoading && step === 'practice' && (
            <motion.div
              key="practice"
              className={`practice-session ${selectedMode === 'spelling' || selectedMode === 'flashcard' || selectedMode === 'match' || selectedMode === 'quiz' || selectedMode === 'speed' || selectedMode === 'gridmatch' || selectedMode === 'pronounce' ? 'spelling-session-fullscreen' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {selectedMode !== 'spelling' && selectedMode !== 'flashcard' && selectedMode !== 'match' && selectedMode !== 'quiz' && selectedMode !== 'speed' && selectedMode !== 'gridmatch' && selectedMode !== 'pronounce' && (
                <div className="practice-session-header clean-quiz-header">
                  <button className="clean-back-arrow" onClick={handleBack} title="Exit practice">
                    <ChevronLeft size={22} strokeWidth={2.5} />
                  </button>
                  <h1 className="clean-quiz-title">
                    {selectedMode === 'flashcard' ? `🧠 ${t('practice.flashcardsTitle')}` : selectedMode === 'spelling' ? `✍️ ${t('practice.spellingTitle')}` : selectedMode === 'match' ? `🔀 ${t('practice.matchTitle')}` : selectedMode === 'quiz' ? `📝 ${t('practice.quizTitle')}` : selectedMode === 'pronounce' ? `🎙️ ${t('practice.pronounceTitle')}` : selectedMode === 'sentence' ? '📓 Sentence Builder' : selectedMode === 'speed' ? `⏱️ ${t('practice.speedTitle')}` : selectedMode === 'gridmatch' ? `🧩 ${t('practice.gridmatchTitle')}` : selectedMode === 'irregular-verbs' ? `⚡ ${t('practice.irregularVerbsTitle')}` : selectedMode === 'ielts-trainer' ? `🎓 ${t('practice.ieltsTrainerTitle')}` : selectedMode === 'english-trainer' ? `🔤 ${t('practice.englishTrainerTitle')}` : t('practice.title')}
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
              )}
              <div className={`practice-session-content ${selectedMode === 'spelling' ? 'spelling-content-fullscreen' : ''}`}>
                {renderPracticeMode()}
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {!pageLoading && step === 'results' && results && (
            <PracticeResultsView
              results={results}
              wrongWords={wrongWords}
              onReset={handleReset}
              language={selectedSource?.language || 'en-US'}
            />
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
                  {customModal.cancelText || t('practice.no')}
                </button>
                <button
                  className="custom-alert-btn"
                  style={{ fontWeight: '700' }}
                  onClick={() => {
                    setCustomModal(prev => ({ ...prev, show: false }));
                    if (customModal.onConfirm) customModal.onConfirm();
                  }}
                >
                  {customModal.confirmText || t('practice.yes')}
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
                {t('practice.gotIt')}
              </button>
            )}
          </div>
        </div>
      )}

      <PracticeQuitModal
        isOpen={showQuitModal}
        onClose={() => setShowQuitModal(false)}
        onConfirm={() => {
          setShowQuitModal(false);
          if (selectedSource?.name === 'Irregular Verbs') {
            exitSession();
          } else {
            setStep('mode');
          }
        }}
      />
    </div>
  );
}
