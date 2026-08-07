import { useState, useMemo, useEffect } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowLeft, ChevronLeft, RotateCcw, Trophy, ThumbsUp, Dumbbell, BookOpen, Volume2, TrendingDown, Sparkles } from 'lucide-react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../firebase';
import { usePacks } from '../../hooks/usePacks';
import { updateStudentUnitProgress } from '../../services/corpService';
import { weightedSelectWords, filterWordsForMode, shuffleArray, speakWord, PRACTICE_MODE_MIN_WORDS, corpWordStorageId } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { classifyWord } from '../../experiment/semanticClassifier';
import { computeClusterCalibration, getDecayedMastery, computeRetentionStats } from '../../utils/memoryEngine';
import { saveReviewEvent } from '../../experiment/experimentDB';
import IosSpinner from '../../components/common/IosSpinner';
import PracticeHub from '../../components/Practice/PracticeHub';
import RoundCheckpointSummary from '../../components/Practice/RoundCheckpointSummary';
import Flashcard from '../../components/Practice/Flashcard';
import SpellingGame from '../../components/Practice/SpellingGame';
import MatchGame from '../../components/Practice/MatchGame';
import QuizGame from '../../components/Practice/QuizGame';
import PronounceGame from '../../components/Practice/PronounceGame';
import SentenceBuilder from '../../components/Practice/SentenceBuilder';
import IrregularVerbsTrainer from '../../components/Practice/IrregularVerbsTrainer';
import { IRREGULAR_VERBS_PACK_ID } from '../../data/irregularVerbsCorpPack';
import '../../pages/PracticePage.css';
import './CorpPractice.css';

export default function CorpPractice() {
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();
  const { user, membership, student, assignedPacks, additionalPacks, requiredPacks } = useOutletContext();
  const { allWords } = usePacks();

  const [dbWords, setDbWords] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(false);

  const [step, setStep] = useState('mode'); // 'mode' | 'intro' | 'practice' | 'results'
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);
  const [wrongWords, setWrongWords] = useState([]);
  const [progressPct, setProgressPct] = useState(0);
  const [saving, setSaving] = useState(false);
  const [roundNumber, setRoundNumber] = useState(1);
  const [showExitModal, setShowExitModal] = useState(false);

  // Derive corporate pack details reactively from the StudentLayout context —
  // search across all three categories (Asosiy/Kerakli/Qo'shimcha) since a
  // pack in any of them must be practiceable.
  const loadedPack = useMemo(() => {
    const allGroupPacks = [...(assignedPacks || []), ...(requiredPacks || []), ...(additionalPacks || [])];
    const foundPack = allGroupPacks.find(p => p.id === packId);
    if (!foundPack) return null;

    const packMonths = foundPack.months && foundPack.months.length > 0
      ? foundPack.months
      : foundPack.units && foundPack.units.length > 0
        ? [{ id: 'm1', title: '1-Oy', units: foundPack.units }]
        : foundPack.words && foundPack.words.length > 0
          ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: foundPack.words }] }]
          : [];
    const foundMonth = packMonths.find(m => m.id === monthId);
    if (!foundMonth) return null;

    const foundUnit = (foundMonth.units || []).find(u => u.id === unitId);
    if (!foundUnit) return null;

    return {
      // Flat 'irregular-verbs' for the canonical pack (every verb's id is
      // globally unique, so its mastery is one shared record regardless of
      // which group/center it's practiced through) — the usual compound
      // packId_monthId_unitId key for every other pack, see corpWordStorageId.
      id: corpWordStorageId(foundPack.id, foundMonth.id, foundUnit.id),
      title: `${foundPack.title} - ${foundUnit.title}`,
      words: foundUnit.words || [],
      level: foundPack.level,
      language: foundPack.language || 'en-US'
    };
  }, [assignedPacks, requiredPacks, additionalPacks, packId, monthId, unitId]);

  // Fetch student's individual learning progress for this unit
  useEffect(() => {
    if (!user || !loadedPack) return;

    let cancelled = false;
    async function loadWordProgress() {
      setLoadingProgress(true);
      try {
        const wordsRef = ref(db, `users/${user.uid}/words/${loadedPack.id}`);
        const snap = await get(wordsRef);
        if (cancelled) return;
        if (snap.exists()) {
          setDbWords(snap.val());
        } else {
          setDbWords({});
        }
      } catch (err) {
        console.error('Error loading word progress in CorpPractice:', err);
      } finally {
        if (!cancelled) setLoadingProgress(false);
      }
    }
    loadWordProgress();
    return () => { cancelled = true; };
  }, [user, loadedPack]);

  const sourceWords = useMemo(() => {
    if (!loadedPack?.words) return [];
    return loadedPack.words.map((w, i) => {
      const wordKey = w.id || String(i);
      const dbStat = dbWords[wordKey] || {};
      return {
        id: wordKey,
        addedAt: new Date().toISOString(),
        wrongCount: 0,
        mastery: 0,
        stability: 1.0,
        ...w,
        ...dbStat
      };
    });
  }, [loadedPack, dbWords]);

  // Intro shape transition timer
  useEffect(() => {
    if (step !== 'intro') return;

    const timerId = setTimeout(() => {
      setStep('practice');
    }, 700);

    return () => clearTimeout(timerId);
  }, [step]);

  // Irregular Verbs skips the PracticeHub mode picker entirely — its
  // trainer already combines a flashcard-style study pass with the
  // V1/V2/V3 practice games in one continuous flow, so opening a topic goes
  // straight into it instead of an extra "choose a mode" screen.
  useEffect(() => {
    if (packId !== IRREGULAR_VERBS_PACK_ID || step !== 'mode' || sourceWords.length === 0) return;
    setSelectedMode('irregular-verbs');
    setWrongWords([]);
    setProgressPct(0);
    setRoundNumber(1);
    setPracticeWords(sourceWords);
    setStep('intro');
  }, [packId, step, sourceWords]);

  // StudentLayout only renders this route once assignedPacks/requiredPacks/
  // additionalPacks have already finished loading (see StudentLayout.jsx),
  // so neither a null loadedPack nor an empty sourceWords is ever "still
  // loading" here — it means the packId/monthId/unitId in the URL genuinely
  // doesn't resolve to a real, non-empty unit anymore (stale link, or the
  // teacher edited/removed/emptied the topic). Redirect instead of leaving
  // the student stuck on an endless spinner with no back button.
  useEffect(() => {
    if (!loadedPack || sourceWords.length === 0) {
      navigate('/corp/student', { replace: true });
    }
  }, [loadedPack, sourceWords, navigate]);

  const autoStartingIrregularVerbs = packId === IRREGULAR_VERBS_PACK_ID && step === 'mode';

  if (!loadedPack || sourceWords.length === 0 || loadingProgress || autoStartingIrregularVerbs) {
    return (
      <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div className="ios-activity-indicator">
          <IosSpinner />
          <span style={{ color: 'var(--text-secondary)' }}>Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  const handleStartPractice = (mode) => {
    if (sourceWords.length === 0) return;

    const pool = filterWordsForMode(sourceWords, mode);
    const minWords = PRACTICE_MODE_MIN_WORDS[mode] || 1;
    if (pool.length < minWords) return;

    setSelectedMode(mode);
    setWrongWords([]);
    setProgressPct(0);
    setRoundNumber(1);

    // Spaced repetition weighted selection — Spelling/Sentence narrow to
    // already-seen words first, same as individual practice.
    const selected = weightedSelectWords(pool, wordCount);
    setPracticeWords(selected);
    setStep('intro');
  };

  const handleRepeatReviewWords = () => {
    if (!results?.reviewWords || results.reviewWords.length === 0) return;
    setPracticeWords(results.reviewWords);
    setRoundNumber(prev => prev + 1);
    setProgressPct(0);
    setStep('intro');
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

  // Perform spacing repetition learning metrics updates
  const handleUpdateWord = async (wordId, reviewInput) => {
    if (!user || !loadedPack) return null;
    try {
      const word = sourceWords.find(w => w.id === wordId);
      if (!word) return null;

      const { isCorrect, confidence, responseTime, retrievalType = 'passive_recall' } = reviewInput;
      const prevWrongCount = word.wrongCount || 0;

      // Semantic cluster calibration
      const { key: clusterKey } = classifyWord(word.word, word.translation, loadedPack.title);
      const clusterHistory = [];
      allWords.forEach((w) => {
        if (classifyWord(w.word, w.translation, w.source).key === clusterKey) {
          clusterHistory.push(...(w.recallHistory || []));
        }
      });
      const clusterMultiplier = computeClusterCalibration(clusterHistory);

      const updated = await saveReviewEvent(user.uid, loadedPack.id, wordId, word, {
        isCorrect,
        confidence,
        responseTime,
        retrievalType,
        clusterMultiplier,
        wordText: word.word,
      });

      const wrongCount = isCorrect ? Math.max(0, prevWrongCount - 1) : prevWrongCount + 1;
      const wordRef = ref(db, `users/${user.uid}/words/${loadedPack.id}/${wordId}`);
      await update(wordRef, { wrongCount });

      const finalData = { ...updated, wrongCount };

      // Sync local state immediately so weights are updated in the UI
      setDbWords(prev => ({
        ...prev,
        [wordId]: {
          ...(prev[wordId] || {}),
          ...finalData
        }
      }));

      return finalData;
    } catch (e) {
      console.error('Error updating corporate word statistics:', e);
      return null;
    }
  };

  const handleComplete = async (summary) => {
    playSound('victory');
    triggerVibration('victory');
    setResults(summary);
    setStep('results');

    if (membership?.centerId && membership?.groupId && user?.uid && loadedPack) {
      setSaving(true);
      try {
        const decayed = sourceWords.map(w => ({ ...w, mastery: getDecayedMastery(w) }));
        const masteryPercent = decayed.length > 0
          ? Math.round(decayed.reduce((sum, w) => sum + (w.mastery || 0), 0) / decayed.length)
          : 0;
        const { retentionPercent, atRisk } = computeRetentionStats(decayed);
        const wordsLearned = decayed.filter(w => (w.mastery || 0) >= 60).length;

        // Keyed by the real pack id (route param), not `loadedPack.id` (a
        // composite unit id) — the teacher dashboard matches this against
        // group.assignedPacks/customPacks, so a mismatched key here would
        // silently never show up in teacher statistics. Written per-unit
        // (monthId_unitId) so a teacher can see exactly which topic this
        // was, not just an overall pack %.
        await updateStudentUnitProgress(membership.centerId, membership.groupId, user.uid, packId, `${monthId}_${unitId}`, {
          wordsLearned,
          totalWords: decayed.length,
          masteryPercent,
          retentionPercent,
          atRiskCount: atRisk,
        });
      } catch (err) {
        console.error('Error saving progress:', err);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 'practice' || step === 'intro') {
      setShowExitModal(true);
      return;
    }
    if (step === 'mode') {
      navigate(`/corp/student/learn/topic/${packId}/${monthId}/${unitId}`);
    } else if (step === 'results') {
      setStep('mode');
    }
  };

  const handleReset = () => {
    setResults(null);
    setWrongWords([]);
    setProgressPct(0);
    setSelectedMode(null);
    setPracticeWords([]);
    setStep('mode');
  };

  const renderPracticeMode = () => {
    const props = {
      words: practiceWords,
      allWords,
      onComplete: handleComplete,
      onUpdateWord: handleUpdateWord, // Syncs spaced repetition statistics
      onAnswer: handleAnswer,
      onExit: handleBack,
      sourceName: loadedPack.title || "Kutubxona",
      language: loadedPack.language || 'en-US',
      onProgress: (current, total) => setProgressPct(total > 0 ? (current / total) * 100 : 0)
    };

    switch (selectedMode) {
      case 'flashcard': return <Flashcard {...props} />;
      case 'spelling': return <SpellingGame {...props} />;
      case 'match': return <MatchGame {...props} />;
      case 'quiz': return <QuizGame {...props} />;
      case 'pronounce': return <PronounceGame {...props} />;
      case 'sentence': return <SentenceBuilder {...props} />;
      case 'irregular-verbs': return <IrregularVerbsTrainer {...props} />;
      default: return null;
    }
  };

  const getResultTier = (r) => {
    const ratio = r.totalWords > 0 ? r.correctCount / r.totalWords : 0;
    if (ratio >= 0.8) return { Icon: Trophy, label: 'Great job!', color: 'var(--accent-3)', dim: 'var(--warning-dim)' };
    if (ratio >= 0.5) return { Icon: ThumbsUp, label: 'Good job!', color: 'var(--accent-1)', dim: 'var(--accent-1-dim)' };
    return { Icon: Dumbbell, label: 'Keep going!', color: 'var(--success)', dim: 'var(--success-dim)' };
  };

  return (
    <div className="practice-page" style={{ padding: '1.25rem var(--space-md) var(--space-xl)' }}>
      
      {/* Sleek iOS pill back button */}
      {step !== 'results' && step !== 'practice' && (
        <div className="ios-nav-header" style={{ marginBottom: '1.25rem' }}>
          <button
            className="ios-back-btn"
            onClick={handleBack}
            aria-label="Back"
            title="Back"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span>Back</span>
          </button>
        </div>
      )}

      <div className="practice-steps-container">
        
        {/* Step 1: Select Mode */}
        {step === 'mode' && (
          <motion.div
            key="mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Word Count Selector */}
            <div className="practice-word-count-bar">
              <span className="practice-word-count-label">🔢 Practice word count:</span>
              <div className="word-count-options">
                {[5, 10, 20, 'all'].map(count => (
                  <button
                    key={count}
                    className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                    onClick={() => setWordCount(count)}
                  >
                    {count === 'all' ? 'All' : `${count} words`}
                  </button>
                ))}
              </div>
            </div>
            <PracticeHub
              onSelectMode={handleStartPractice}
              isIrregularVerbs={packId === IRREGULAR_VERBS_PACK_ID}
              irregularVerbsOnly={packId === IRREGULAR_VERBS_PACK_ID}
              words={sourceWords}
            />
          </motion.div>
        )}

        {/* Step 2: Intro Shape Loader */}
        {step === 'intro' && (
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
            <div className="intro-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div className="intro-mode-icon">
                {selectedMode === 'flashcard' ? '🧠' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'pronounce' ? '🎙️' : '🎮'}
              </div>
              <h2>
                {selectedMode === 'flashcard' ? 'Smart Flashcards' : selectedMode === 'spelling' ? 'Spelling Practice' : selectedMode === 'match' ? 'Match Game' : selectedMode === 'quiz' ? 'Multiple Choice Quiz' : selectedMode === 'pronounce' ? 'Pronunciation Practice' : 'Practice'}
              </h2>
              <p>{practiceWords.length} words prepared</p>
              
              <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                <IosSpinner />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Preparing practice...</span>
              </div>
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
              <button className="clean-back-arrow" onClick={handleBack} title="Exit practice">
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
              <h1 className="clean-quiz-title">
                {selectedMode === 'flashcard' ? '🧠 Smart Flashcards' : selectedMode === 'spelling' ? '✍️ Spelling Practice' : selectedMode === 'match' ? '🔀 Match Game' : selectedMode === 'quiz' ? '📝 Multiple Choice Quiz' : selectedMode === 'pronounce' ? '🎙️ Pronunciation Practice' : 'Practice'}
              </h1>
              <div style={{ width: '40px', opacity: 0 }}></div>
              
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
        {step === 'results' && results && (
          selectedMode === 'flashcard' ? (
            <RoundCheckpointSummary
              roundNumber={roundNumber}
              knownWords={results.knownWords || []}
              reviewWords={results.reviewWords || []}
              onRepeatReviewWords={handleRepeatReviewWords}
              onFinish={handleReset}
            />
          ) : (
            <motion.div
              key="standard-results"
              className="checkpoint-fullscreen-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="checkpoint-scrollable-content" style={{ justifyContent: 'center' }}>
                <div className="practice-results" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '1.75rem', width: '100%', maxWidth: '500px', margin: '0 auto', boxSizing: 'border-box' }}>
                  {(() => {
                    const tier = getResultTier(results);
                    return (
                      <>
                        <div className="result-icon-circle" style={{ background: tier.dim, color: tier.color, margin: '0 auto 1rem' }}>
                          <tier.Icon size={36} strokeWidth={2.2} />
                        </div>
                        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{tier.label}</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0 0 1.25rem 0' }}>Practice completed</p>

                        {/* Stats row */}
                        <div className="result-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                          <div className="result-stat" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.85rem 0.5rem', borderRadius: '14px', textAlign: 'center' }}>
                            <BookOpen className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--accent-1)', margin: '0 auto 4px' }} />
                            <div className="value" style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800 }}>{results.totalWords}</div>
                            <div className="label" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total</div>
                          </div>
                          <div className="result-stat" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.85rem 0.5rem', borderRadius: '14px', textAlign: 'center' }}>
                            <CheckCircle2 className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--success)', margin: '0 auto 4px' }} />
                            <div className="value" style={{ color: 'var(--success)', fontSize: '1.2rem', fontWeight: 800 }}>{results.correctCount}</div>
                            <div className="label" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Correct</div>
                          </div>
                          <div className="result-stat" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.85rem 0.5rem', borderRadius: '14px', textAlign: 'center' }}>
                            <XCircle className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--error)', margin: '0 auto 4px' }} />
                            <div className="value" style={{ color: 'var(--error)', fontSize: '1.2rem', fontWeight: 800 }}>{results.incorrectCount}</div>
                            <div className="label" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Mistakes</div>
                          </div>
                        </div>

                        {/* Mistakes list */}
                        {wrongWords.length > 0 ? (
                          <div className="results-mistakes-container" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '1rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                            <div className="results-mistakes-title" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                              <TrendingDown size={14} strokeWidth={2.4} />
                              Words to review ({wrongWords.length})
                            </div>
                            <div className="results-mistake-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                              {wrongWords.map(word => (
                                <div key={word.id} className="results-mistake-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
                                  <div className="results-mistake-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className="results-mistake-word" style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{word.word}</span>
                                    <span className="results-mistake-translation" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>— {word.translation}</span>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn-speak-mistake"
                                    onClick={() => speakWord(word.word, loadedPack?.language || 'en-US')}
                                    title="Listen"
                                    style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                  >
                                    <Volume2 size={16} strokeWidth={2.3} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="perfect-score-banner" style={{ background: 'var(--success-dim)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '0.85rem', color: 'var(--success)', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                            <Sparkles size={16} strokeWidth={2.3} />
                            Perfect score! No mistakes made.
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Pinned Bottom Action Bar */}
              <div className="checkpoint-pinned-footer">
                <button className="checkpoint-btn-primary" onClick={handleReset}>
                  Back to Practice Modes
                </button>
              </div>
            </motion.div>
          )
        )}

      </div>

      {/* ── Quit Practice Confirmation Modal ── */}
      {showExitModal && (
        <div className="modal-overlay" style={{ zIndex: 9999, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(8px)' }} onClick={() => setShowExitModal(false)}>
          <motion.div
            className="modal-content"
            style={{ maxWidth: '360px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(255, 59, 48, 0.15)',
                color: '#ff3b30',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.2rem'
              }}
            >
              <Dumbbell size={24} strokeWidth={2.2} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Quit Practice?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Are you sure you want to leave? Your progress in this round will not be saved.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={() => setShowExitModal(false)}
              >
                Resume
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ff3b30',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setShowExitModal(false);
                  // Irregular Verbs auto-skips the 'mode' step (it jumps
                  // straight back into the trainer the instant step becomes
                  // 'mode' again — see the auto-start effect above), so
                  // quitting has to leave the practice route entirely
                  // instead of just resetting to 'mode'.
                  if (packId === IRREGULAR_VERBS_PACK_ID) {
                    navigate(`/corp/student/learn/topic/${packId}/${monthId}/${unitId}`);
                  } else {
                    setStep('mode');
                  }
                }}
              >
                Quit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
