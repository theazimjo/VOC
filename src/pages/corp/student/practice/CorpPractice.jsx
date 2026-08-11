import { useState, useMemo, useEffect } from 'react';
import { useOutletContext, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../../../firebase';
import { usePacks } from '../../../../hooks/usePacks';
import { updateStudentUnitProgress } from '../../../../services/corpService';
import { weightedSelectWords, filterWordsForMode, PRACTICE_MODE_MIN_WORDS, corpWordStorageId } from '../../../../utils/helpers';
import { playSound, triggerVibration } from '../../../../utils/feedback';
import { classifyWord } from '../../../../experiment/semanticClassifier';
import { computeClusterCalibration, getDecayedMastery, computeRetentionStats } from '../../../../utils/memoryEngine';
import { saveReviewEvent } from '../../../../experiment/experimentDB';
import IosSpinner from '../../../../components/common/IosSpinner';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../data/irregularVerbsCorpPack';
import ModeSelectView from './views/ModeSelectView';
import IntroView from './views/IntroView';
import PracticeSessionView from './views/PracticeSessionView';
import ResultsView from './views/ResultsView';
import ExitPracticeModal from './modals/ExitPracticeModal';
import '../../../personal/PracticePage.css';
import './CorpPractice.css';

export default function CorpPractice() {
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();
  const [searchParams] = useSearchParams();
  // Carried through from StudentCorpLearn so the topic page's own Back
  // button still knows to return to the Homework tab, not the pack's month.
  const topicBackQuery = searchParams.get('from') === 'homework' ? '?from=homework' : '';
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
        mode: selectedMode,
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
      navigate(`/corp/student/learn/topic/${packId}/${monthId}/${unitId}${topicBackQuery}`);
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

  const p = {
    // sourceWords carries both the corp word content (word/translation from the
    // corp pack) and the Firebase stats merged together. allWords from usePacks()
    // filters corp words out because they lack a .word field in Firebase, so
    // SpellingGame/QuizGame/MatchGame would have no corp context to compare against.
    allWords: sourceWords, handleAnswer, handleBack, handleComplete, handleRepeatReviewWords,
    handleReset, handleStartPractice, handleUpdateWord, loadedPack, monthId,
    navigate, packId, practiceWords, progressPct, results, roundNumber,
    selectedMode, setProgressPct, setShowExitModal, setStep, setWordCount,
    showExitModal, sourceWords, step, topicBackQuery, unitId, wordCount, wrongWords,
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
        {step === 'mode' && <ModeSelectView p={p} />}
        {step === 'intro' && <IntroView p={p} />}
        {step === 'practice' && <PracticeSessionView p={p} />}
        {step === 'results' && results && <ResultsView p={p} />}
      </div>

      {showExitModal && <ExitPracticeModal p={p} />}
    </div>
  );
}

