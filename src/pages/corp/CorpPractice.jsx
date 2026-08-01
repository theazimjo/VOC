import { useState, useMemo, useEffect } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw, Trophy, ThumbsUp, Dumbbell, BookOpen, Volume2, TrendingDown, Sparkles } from 'lucide-react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../firebase';
import { usePacks } from '../../hooks/usePacks';
import { updateStudentGroupProgress } from '../../services/corpService';
import { weightedSelectWords, filterWordsForMode, shuffleArray, speakWord } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { classifyWord } from '../../experiment/semanticClassifier';
import { computeClusterCalibration } from '../../utils/memoryEngine';
import { saveReviewEvent } from '../../experiment/experimentDB';
import IosSpinner from '../../components/common/IosSpinner';
import PracticeHub from '../../components/Practice/PracticeHub';
import Flashcard from '../../components/Practice/Flashcard';
import SpellingGame from '../../components/Practice/SpellingGame';
import MatchGame from '../../components/Practice/MatchGame';
import QuizGame from '../../components/Practice/QuizGame';
import PronounceGame from '../../components/Practice/PronounceGame';
import SentenceBuilder from '../../components/Practice/SentenceBuilder';
import '../../pages/PracticePage.css';
import './CorpPractice.css';

export default function CorpPractice() {
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();
  const { user, membership, student, assignedPacks } = useOutletContext();
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

  // Derive corporate pack details reactively from the StudentLayout assignedPacks context
  const loadedPack = useMemo(() => {
    const foundPack = (assignedPacks || []).find(p => p.id === packId);
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

    const uniqueUnitId = `${foundPack.id}_${foundMonth.id}_${foundUnit.id}`;
    return {
      id: uniqueUnitId,
      title: `${foundPack.title} - ${foundUnit.title}`,
      words: foundUnit.words || [],
      level: foundPack.level,
      language: foundPack.language || 'en-US'
    };
  }, [assignedPacks, packId, monthId, unitId]);

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

  if (!loadedPack || sourceWords.length === 0 || loadingProgress) {
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
    setSelectedMode(mode);
    setWrongWords([]);
    setProgressPct(0);

    // Spaced repetition weighted selection — Spelling/Sentence narrow to
    // already-seen words first, same as individual practice.
    const pool = filterWordsForMode(sourceWords, mode);
    const selected = weightedSelectWords(pool, wordCount);
    setPracticeWords(selected);
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
        await updateStudentGroupProgress(membership.centerId, membership.groupId, user.uid, loadedPack.id, summary.correctCount);
      } catch (err) {
        console.error('Error saving progress:', err);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 'practice' || step === 'intro') {
      if (window.confirm("Rostdan ham mashqni tark etmoqchimisiz? Hozirgi natijalaringiz saqlanmaydi.")) {
        setStep('mode');
      }
      return;
    }
    if (step === 'mode') {
      navigate(`/corp/student/topic/${packId}/${monthId}/${unitId}`);
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
      default: return null;
    }
  };

  const getResultTier = (r) => {
    const ratio = r.totalWords > 0 ? r.correctCount / r.totalWords : 0;
    if (ratio >= 0.8) return { Icon: Trophy, label: 'Ajoyib!', color: 'var(--accent-3)', dim: 'var(--warning-dim)' };
    if (ratio >= 0.5) return { Icon: ThumbsUp, label: 'Yaxshi!', color: 'var(--accent-1)', dim: 'var(--accent-1-dim)' };
    return { Icon: Dumbbell, label: 'Davom eting!', color: 'var(--success)', dim: 'var(--success-dim)' };
  };

  return (
    <div className="practice-page" style={{ padding: '0 var(--space-md)', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Header */}
      {(step !== 'results' || step === 'mode') && (
        <div className="practice-page-header">
          <button className="clean-back-arrow" onClick={handleBack} title="Orqaga">
            ←
          </button>
          <h1>
            🎯 Mashq ({loadedPack.title})
          </h1>
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
            <PracticeHub onSelectMode={handleStartPractice} isIrregularVerbs={false} words={sourceWords} />
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
                {selectedMode === 'flashcard' ? '🧠' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'pronounce' ? '🎙️' : selectedMode === 'sentence' ? '📓' : '🎮'}
              </div>
              <h2>
                {selectedMode === 'flashcard' ? 'Aqlli Kartochkalar' : selectedMode === 'spelling' ? 'Imlo Mashqi' : selectedMode === 'match' ? 'Juftlikni Top' : selectedMode === 'quiz' ? 'Test' : selectedMode === 'pronounce' ? 'Talaffuz' : selectedMode === 'sentence' ? 'Jumla Tuzish' : 'Mashq'}
              </h2>
              <p>{practiceWords.length} ta so'z tayyorlandi</p>
              
              <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                <IosSpinner />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Mashq tayyorlanmoqda...</span>
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
              <button className="clean-back-arrow" onClick={handleBack} title="Mashqdan chiqish">
                ←
              </button>
              <h1 className="clean-quiz-title">
                {selectedMode === 'flashcard' ? '🧠 Aqlli Kartochkalar' : selectedMode === 'spelling' ? '✍️ Imlo mashqi' : selectedMode === 'match' ? '🔀 Juftlikni top' : selectedMode === 'quiz' ? '📝 Test' : selectedMode === 'pronounce' ? '🎙️ Talaffuz' : selectedMode === 'sentence' ? '📓 Jumla tuzish' : 'Mashq'}
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
        {step === 'results' && results && (() => {
          const tier = getResultTier(results);
          return (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="practice-results" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div className="result-icon-circle" style={{ background: tier.dim, color: tier.color }}>
                  <tier.Icon size={36} strokeWidth={2.2} />
                </div>
                <h2>{tier.label}</h2>
                <p>Mashq yakunlandi</p>
                <div className="result-stats">
                  <div className="result-stat">
                    <BookOpen className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--accent-2)' }} />
                    <div className="value" style={{ color: 'var(--accent-2)' }}>{results.totalWords}</div>
                    <div className="label">Jami so'zlar</div>
                  </div>
                  <div className="result-stat">
                    <CheckCircle2 className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--success)' }} />
                    <div className="value" style={{ color: 'var(--success)' }}>{results.correctCount}</div>
                    <div className="label">To'g'ri</div>
                  </div>
                  <div className="result-stat">
                    <XCircle className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--error)' }} />
                    <div className="value" style={{ color: 'var(--error)' }}>{results.incorrectCount}</div>
                    <div className="label">Noto'g'ri</div>
                  </div>
                </div>

                {saving && <p className="cp-saving" style={{ textAlign: 'center', margin: '1rem 0', color: 'var(--accent-1)', fontWeight: 600 }}>Natija saqlanmoqda...</p>}

                {wrongWords.length > 0 ? (
                  <div className="results-mistakes-container">
                    <div className="results-mistakes-title">
                      <TrendingDown size={14} strokeWidth={2.4} />
                      Takrorlash tavsiya etiladi (xatolar)
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
                            onClick={() => speakWord(word.word, loadedPack.language)}
                            title="Tinglash"
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
                    Mukammal natija! Hech qanday xatolikka yo'l qo'yilmadi.
                  </div>
                )}

                <div className="result-actions">
                  <button className="btn-results-back" onClick={handleReset}>
                    Mashq menyusiga qaytish
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })()}

      </div>
    </div>
  );
}
