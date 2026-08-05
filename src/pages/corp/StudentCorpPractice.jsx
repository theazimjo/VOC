import { useState, useMemo, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ThumbsUp, Dumbbell, BookOpen, Volume2, TrendingDown, Sparkles } from 'lucide-react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase';
import { usePacks } from '../../hooks/usePacks';
import { weightedSelectWords, filterWordsForMode, speakWord, PRACTICE_MODE_MIN_WORDS } from '../../utils/helpers';
import { playSound, triggerVibration } from '../../utils/feedback';
import { classifyWord } from '../../experiment/semanticClassifier';
import { computeClusterCalibration, getDecayedMastery, computeRetentionStats } from '../../utils/memoryEngine';
import { saveReviewEvent } from '../../experiment/experimentDB';
import { updateStudentUnitProgress } from '../../services/corpService';
import IosSpinner from '../../components/common/IosSpinner';
import PracticeHub from '../../components/Practice/PracticeHub';
import Flashcard from '../../components/Practice/Flashcard';
import SpellingGame from '../../components/Practice/SpellingGame';
import MatchGame from '../../components/Practice/MatchGame';
import QuizGame from '../../components/Practice/QuizGame';
import PronounceGame from '../../components/Practice/PronounceGame';
import SentenceBuilder from '../../components/Practice/SentenceBuilder';
import '../PracticePage.css';
import './CorpPractice.css';

// Same pack → months → units flattening StudentCorpDashboard/CorpPractice
// use, but flattened all the way down to individual words instead of
// stopping at the topic level — this is a Duolingo-style practice hub:
// pick an exercise type, and it pulls from every assigned word at once,
// not just one topic.
function flattenAllWords(assignedPacks) {
  const words = [];
  (assignedPacks || []).forEach(pack => {
    const packMonths = pack.months && pack.months.length > 0
      ? pack.months
      : pack.units && pack.units.length > 0
        ? [{ id: 'm1', title: '1-Oy', units: pack.units }]
        : pack.words && pack.words.length > 0
          ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }]
          : [];

    packMonths.forEach(month => {
      (month.units || []).forEach(unit => {
        const uniqueUnitId = `${pack.id}_${month.id}_${unit.id}`;
        (unit.words || []).forEach((w, idx) => {
          const dbWordId = w.id || String(idx);
          words.push({
            ...w,
            id: `${uniqueUnitId}::${dbWordId}`, // globally unique across topics
            dbWordId,
            sourceId: uniqueUnitId,
            packId: pack.id, // the real pack id — distinct from sourceId (a per-unit composite key)
            monthId: month.id,
            unitId: unit.id,
            source: `${pack.title} - ${unit.title}`,
            language: pack.language || 'en-US',
          });
        });
      });
    });
  });
  return words;
}

export default function StudentCorpPractice() {
  const navigate = useNavigate();
  const { user, membership, assignedPacks, additionalPacks, requiredPacks } = useOutletContext();
  const { allWords } = usePacks();

  const [allDbWords, setAllDbWords] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  const [step, setStep] = useState('mode'); // 'mode' | 'intro' | 'practice' | 'results'
  const [selectedMode, setSelectedMode] = useState(null);
  const [wordCount, setWordCount] = useState(10);
  const [practiceWords, setPracticeWords] = useState([]);
  const [results, setResults] = useState(null);
  const [wrongWords, setWrongWords] = useState([]);
  const [progressPct, setProgressPct] = useState(0);

  // One shared listener over every unit's progress, keyed the same way
  // StudentCorpDashboard/CorpPractice read it (`${packId}_${monthId}_${unitId}`).
  useEffect(() => {
    if (!user) {
      setAllDbWords({});
      setLoadingProgress(false);
      return;
    }
    setLoadingProgress(true);
    const unsub = onValue(
      ref(db, `users/${user.uid}/words`),
      (snap) => {
        setAllDbWords(snap.exists() ? snap.val() : {});
        setLoadingProgress(false);
      },
      (err) => {
        console.error('Error loading practice progress:', err);
        setLoadingProgress(false);
      }
    );
    return unsub;
  }, [user?.uid]);

  const baseWords = useMemo(
    () => flattenAllWords([...(assignedPacks || []), ...(requiredPacks || []), ...(additionalPacks || [])]),
    [assignedPacks, requiredPacks, additionalPacks]
  );

  const sourceWords = useMemo(() => {
    return baseWords.map(w => {
      const dbStat = (allDbWords[w.sourceId] || {})[w.dbWordId] || {};
      return {
        wrongCount: 0,
        mastery: 0,
        stability: 1.0,
        ...w,
        ...dbStat,
      };
    });
  }, [baseWords, allDbWords]);

  // Intro shape transition timer
  useEffect(() => {
    if (step !== 'intro') return;
    const timerId = setTimeout(() => setStep('practice'), 700);
    return () => clearTimeout(timerId);
  }, [step]);

  if (loadingProgress) {
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

  // Perform spaced repetition updates — writes back to the specific unit
  // each word actually belongs to (word.sourceId), even though the session
  // itself mixes words from every assigned topic.
  const handleUpdateWord = async (wordId, reviewInput) => {
    if (!user) return null;
    try {
      const word = sourceWords.find(w => w.id === wordId);
      if (!word) return null;

      const { isCorrect, confidence, responseTime, retrievalType = 'passive_recall' } = reviewInput;
      const prevWrongCount = word.wrongCount || 0;

      const { key: clusterKey } = classifyWord(word.word, word.translation, word.source);
      const clusterHistory = [];
      allWords.forEach((w) => {
        if (classifyWord(w.word, w.translation, w.source).key === clusterKey) {
          clusterHistory.push(...(w.recallHistory || []));
        }
      });
      const clusterMultiplier = computeClusterCalibration(clusterHistory);

      const updated = await saveReviewEvent(user.uid, word.sourceId, word.dbWordId, word, {
        isCorrect,
        confidence,
        responseTime,
        retrievalType,
        clusterMultiplier,
        wordText: word.word,
      });

      const wrongCount = isCorrect ? Math.max(0, prevWrongCount - 1) : prevWrongCount + 1;
      const wordRef = ref(db, `users/${user.uid}/words/${word.sourceId}/${word.dbWordId}`);
      await update(wordRef, { wrongCount });

      const finalData = { ...updated, wrongCount };

      setAllDbWords(prev => ({
        ...prev,
        [word.sourceId]: {
          ...(prev[word.sourceId] || {}),
          [word.dbWordId]: {
            ...((prev[word.sourceId] || {})[word.dbWordId] || {}),
            ...finalData,
          },
        },
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

    if (membership?.centerId && membership?.groupId && user?.uid) {
      // The hub mixes words from every assigned unit at once, so a session
      // can touch several units (possibly across several packs) — write a
      // separate per-unit snapshot for each one touched, keyed the same way
      // CorpPractice.jsx does (packId + monthId_unitId), so a teacher can
      // see exactly which topics this student has covered.
      const touchedUnits = new Map();
      practiceWords.forEach(w => {
        if (!w.packId || !w.monthId || !w.unitId) return;
        const key = `${w.packId}::${w.monthId}_${w.unitId}`;
        if (!touchedUnits.has(key)) touchedUnits.set(key, { packId: w.packId, unitKey: `${w.monthId}_${w.unitId}` });
      });

      try {
        await Promise.all([...touchedUnits.values()].map(async ({ packId: pid, unitKey }) => {
          // Full unit (every word in it), not just this session's subset —
          // gives a genuinely current snapshot of that topic, not just what
          // was touched in this one session.
          const unitWords = sourceWords
            .filter(w => w.packId === pid && `${w.monthId}_${w.unitId}` === unitKey)
            .map(w => ({ ...w, mastery: getDecayedMastery(w) }));
          if (unitWords.length === 0) return;

          const masteryPercent = Math.round(unitWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / unitWords.length);
          const { retentionPercent, atRisk } = computeRetentionStats(unitWords);
          const wordsLearned = unitWords.filter(w => (w.mastery || 0) >= 60).length;

          await updateStudentUnitProgress(membership.centerId, membership.groupId, user.uid, pid, unitKey, {
            wordsLearned,
            totalWords: unitWords.length,
            masteryPercent,
            retentionPercent,
            atRiskCount: atRisk,
          });
        }));
      } catch (err) {
        console.error('Error saving group progress:', err);
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
      navigate('/corp/student');
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
      onUpdateWord: handleUpdateWord,
      onAnswer: handleAnswer,
      onExit: handleBack,
      sourceName: 'Mashq',
      language: practiceWords[0]?.language || 'en-US',
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

  if (sourceWords.length === 0) {
    return (
      <div className="practice-page" style={{ padding: '0 var(--space-md)' }}>
        <div className="empty-state">
          <div className="empty-state-icon">✨</div>
          <h3>Hozircha mashq qilinadigan so'z yo'q</h3>
          <p>O'qituvchingiz tez orada sizga to'plam biriktiradi.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-page" style={{ padding: '0 var(--space-md)' }}>

      {step !== 'results' && (
        <div className="practice-page-header">
          {step !== 'mode' && (
            <button className="clean-back-arrow" onClick={handleBack} title="Orqaga">
              ←
            </button>
          )}
          <h1>🎮 Mashq</h1>
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
                            onClick={() => speakWord(word.word, word.language)}
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
