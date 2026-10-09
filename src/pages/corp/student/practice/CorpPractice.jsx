import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, useOutletContext, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../../../firebase';
import { usePacks } from '../../../../hooks/usePacks';
import { updateStudentUnitProgress } from '../../../../services/corpService';
import { weightedSelectWords, filterWordsForMode, PRACTICE_MODE_MIN_WORDS, corpWordStorageId } from '../../../../utils/helpers';
import { planSmartSession } from '../../../../utils/practicePath';
import { playSound, triggerVibration } from '../../../../utils/feedback';
import { getWordCluster } from '../../../../experiment/semanticClassifier';
import { computeClusterCalibration, computeUserRate, getDecayedMastery, computeRetentionStats } from '@voc/memory-engine';
import { saveReviewEvent } from '../../../../experiment/experimentDB';
import IosSpinner from '../../../../components/common/IosSpinner';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../data/irregularVerbsId';
import ModeSelectView from './views/ModeSelectView';
import IntroView from './views/IntroView';
import PracticeSessionView from './views/PracticeSessionView';
import ResultsView from './views/ResultsView';
import ExitPracticeModal from './modals/ExitPracticeModal';
import { useStudentT } from '../../../../hooks/useStudentT';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { localizeWord } from '../learn/utils';
import '../../../personal/PracticePage.css';
import './CorpPractice.css';
import '../../../../components/Practice/PracticeFlatSkin.css';
import { PracticeCaps } from '../../../../components/Practice/practiceCase';

// Months of a pack, with the same fallbacks the practice route always used for
// older packs that stored units / words directly.
function monthsOfPack(pack) {
  if (pack.months && pack.months.length > 0) return pack.months;
  if (pack.units && pack.units.length > 0) return [{ id: 'm1', title: '1-Oy', units: pack.units }];
  if (pack.words && pack.words.length > 0) return [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }];
  return [];
}

// The numbers of several smart-session parts, added up into the one result the
// student sees at the end.
function mergeSummaries(list, startedAt) {
  const sum = (key) => list.reduce((n, item) => n + (item?.[key] || 0), 0);
  const seconds = startedAt ? Math.max(0, Math.round((Date.now() - startedAt) / 1000)) : 0;
  return {
    totalWords: sum('totalWords'),
    correctCount: sum('correctCount'),
    incorrectCount: sum('incorrectCount'),
    knownWords: list.flatMap((item) => item?.knownWords || []),
    reviewWords: list.flatMap((item) => item?.reviewWords || []),
    durationFormatted: `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`,
  };
}

export default function CorpPractice() {
  const { t } = useStudentT();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();
  const [searchParams] = useSearchParams();
  // Carried through from StudentCorpLearn so the topic page's own Back
  // button still knows to return to the Homework tab, not the pack's month.
  const topicBackQuery = searchParams.get('from') === 'homework' ? '?from=homework' : '';
  const { user, membership, student, assignedPacks, additionalPacks, requiredPacks, homeworkList } = useOutletContext();
  const { allWords, wordsByPack, allWordsLoading } = usePacks();
  const location = useLocation();
  // Practice opens as one smart session; a mode picked in the topic page's
  // menu (location.state.mode) is started as-is instead.
  const requestedMode = location.state?.mode || null;
  const autoStartedRef = useRef(false);
  // true once Practice started on its own (smart session or a mode from the menu):
  // finishing or leaving it goes back to the topic page, not to the mode list.
  const fromTopicRef = useRef(false);
  const smartPlanRef = useRef(null); // { parts, index, summaries }
  const reviewWordsRef = useRef(new Map()); // composite id -> word of an earlier topic
  const [smartPart, setSmartPart] = useState(null); // { kind, index, total } for the intro screen

  const [dbWords, setDbWords] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(false);
  // The saved progress has been read: the smart session must not be planned from an empty record.
  const [progressLoaded, setProgressLoaded] = useState(false);
  // Between opening the page and the session starting, show a spinner instead of flashing the mode list.
  const [booting, setBooting] = useState(true);

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
  // Wall-clock start of the current practice run, for the time-spent stat
  // the center admin dashboard shows. Set once in handleStartPractice, not
  // reset on the intro->practice step change, so a "review wrong words"
  // round still counts as the same session.
  const sessionStartRef = useRef(null);

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
        if (!cancelled) { setLoadingProgress(false); setProgressLoaded(true); }
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
      return localizeWord({
        id: wordKey,
        addedAt: new Date().toISOString(),
        wrongCount: 0,
        mastery: 0,
        stability: 1.0,
        ...w,
        ...dbStat
      }, language);
    });
  }, [loadedPack, dbWords, language]);

  // Topics assigned earlier, with the student's saved progress on each (taken
  // from the one words subscription the whole app shares - no extra reads).
  const otherTopics = useMemo(() => {
    if (!loadedPack) return [];
    const groupPacks = [...(assignedPacks || []), ...(requiredPacks || []), ...(additionalPacks || [])];
    const seenKeys = new Set([loadedPack.id]);
    const out = [];
    (homeworkList || []).forEach((hw) => (hw.items || []).forEach((item) => {
      const pack = groupPacks.find((candidate) => candidate.id === item.packId);
      if (!pack || pack.id === IRREGULAR_VERBS_PACK_ID) return;
      const month = monthsOfPack(pack).find((m) => m.id === item.monthId);
      const unit = (month?.units || []).find((u) => u.id === item.unitId);
      if (!unit) return;
      const storageId = corpWordStorageId(pack.id, month.id, unit.id);
      if (seenKeys.has(storageId)) return;
      seenKeys.add(storageId);
      const saved = wordsByPack?.[storageId] || {};
      const words = (unit.words || []).map((w, i) => {
        const key = w.id || String(i);
        return localizeWord({ id: key, mastery: 0, stability: 1.0, ...w, ...(saved[key] || {}) }, language);
      });
      if (words.some((w) => (w.reviewCount || 0) > 0)) out.push({ storageId, title: unit.title, words });
    }));
    return out;
  }, [homeworkList, assignedPacks, requiredPacks, additionalPacks, wordsByPack, loadedPack, language]);

  // Pressing Practice: build the session for this learner and start it. A mode
  // chosen in the menu next to the button starts that one exercise instead.
  useEffect(() => {
    if (autoStartedRef.current || step !== 'mode' || !progressLoaded || allWordsLoading || !loadedPack || sourceWords.length === 0) return;
    if (packId === IRREGULAR_VERBS_PACK_ID) return; // has its own trainer flow
    autoStartedRef.current = true;
    setBooting(false);
    sessionStartRef.current = Date.now();
    setWrongWords([]);
    setProgressPct(0);
    setRoundNumber(1);

    if (requestedMode) {
      const pool = filterWordsForMode(sourceWords, requestedMode);
      if (pool.length < (PRACTICE_MODE_MIN_WORDS[requestedMode] || 1)) return; // stay on the mode list
      fromTopicRef.current = true;
      setSelectedMode(requestedMode);
      setPracticeWords(weightedSelectWords(pool, Math.min(10, pool.length)));
      setStep('intro');
      return;
    }

    const plan = planSmartSession({ unitWords: sourceWords, otherTopics });
    if (plan.parts.length === 0) return;
    plan.parts.forEach((part) => part.words.forEach((w) => { if (w.__storageId) reviewWordsRef.current.set(w.id, w); }));
    fromTopicRef.current = true;
    smartPlanRef.current = { parts: plan.parts, index: 0, summaries: [] };
    const first = plan.parts[0];
    setSmartPart({ kind: first.kind, index: 0, total: plan.parts.length });
    setSelectedMode(first.mode);
    setPracticeWords(first.words);
    setStep('intro');
  }, [step, progressLoaded, allWordsLoading, loadedPack, sourceWords, packId, requestedMode, otherTopics]);

  // Intro shape transition timer
  useEffect(() => {
    if (step !== 'intro') return;

    const timerId = setTimeout(() => {
      setStep('practice');
    }, smartPart ? 1100 : 700);

    return () => clearTimeout(timerId);
  }, [step, smartPart]);

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
    sessionStartRef.current = Date.now();
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

  const smartBooting = booting && step === 'mode' && packId !== IRREGULAR_VERBS_PACK_ID;

  if (!loadedPack || sourceWords.length === 0 || loadingProgress || autoStartingIrregularVerbs || smartBooting) {
    return (
      <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div className="ios-activity-indicator">
          <IosSpinner />
          <span style={{ color: 'var(--text-secondary)' }}>{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  const handleStartPractice = (mode) => {
    if (sourceWords.length === 0) return;
    // chosen by hand from the mode list: not part of a smart session any more
    smartPlanRef.current = null;
    setSmartPart(null);

    const pool = filterWordsForMode(sourceWords, mode);
    const minWords = PRACTICE_MODE_MIN_WORDS[mode] || 1;
    if (pool.length < minWords) return;

    setSelectedMode(mode);
    setWrongWords([]);
    setProgressPct(0);
    setRoundNumber(1);
    sessionStartRef.current = Date.now();

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
      // A word brought back from an earlier topic keeps its progress under
      // that topic's own storage key.
      const reviewWord = reviewWordsRef.current.get(wordId) || null;
      const storageId = reviewWord ? reviewWord.__storageId : loadedPack.id;
      const storedId = reviewWord ? reviewWord.__origId : wordId;
      const word = reviewWord || sourceWords.find(w => w.id === wordId);
      if (!word) return null;

      const { isCorrect, confidence, responseTime, retrievalType = 'passive_recall' } = reviewInput;
      const prevWrongCount = word.wrongCount || 0;

      // Semantic cluster calibration
      const { key: clusterKey } = getWordCluster(word);
      const clusterHistory = [];
      allWords.forEach((w) => {
        if (getWordCluster(w).key === clusterKey) {
          clusterHistory.push(...(w.recallHistory || []));
        }
      });
      const clusterMultiplier = computeClusterCalibration(clusterHistory);

      const updated = await saveReviewEvent(user.uid, storageId, storedId, word, {
        isCorrect,
        confidence,
        responseTime,
        retrievalType,
        clusterMultiplier,
        userRate: computeUserRate(allWords),
        mode: selectedMode,
        wordText: word.word,
      });

      const wrongCount = isCorrect ? Math.max(0, prevWrongCount - 1) : prevWrongCount + 1;
      const wordRef = ref(db, `users/${user.uid}/words/${storageId}/${storedId}`);
      await update(wordRef, { wrongCount });

      const finalData = { ...updated, wrongCount };

      // Sync local state immediately so weights are updated in the UI
      if (!reviewWord) {
        setDbWords(prev => ({
          ...prev,
          [wordId]: {
            ...(prev[wordId] || {}),
            ...finalData
          }
        }));
      }

      return finalData;
    } catch (e) {
      console.error('Error updating corporate word statistics:', e);
      return null;
    }
  };

  const handleComplete = async (partSummary) => {
    let summary = partSummary;
    const plan = smartPlanRef.current;
    if (plan) {
      plan.summaries.push(partSummary);
      if (plan.index < plan.parts.length - 1) {
        // more to do: straight on to the next exercise, no results screen between
        plan.index += 1;
        const next = plan.parts[plan.index];
        setSmartPart({ kind: next.kind, index: plan.index, total: plan.parts.length });
        setSelectedMode(next.mode);
        setPracticeWords(next.words);
        setProgressPct(0);
        setStep('intro');
        return;
      }
      summary = mergeSummaries(plan.summaries, sessionStartRef.current);
      smartPlanRef.current = null;
      setSmartPart(null);
    }
    playSound('victory');
    triggerVibration('victory');
    setResults(summary);
    setStep('results');

    const hasGroupTarget = membership?.groupId && membership?.centerId;
    if (hasGroupTarget && user?.uid && loadedPack) {
      setSaving(true);
      try {
        const decayed = sourceWords.map(w => ({ ...w, mastery: getDecayedMastery(w) }));
        const masteryPercent = decayed.length > 0
          ? Math.round(decayed.reduce((sum, w) => sum + (w.mastery || 0), 0) / decayed.length)
          : 0;
        const { retentionPercent, atRisk } = computeRetentionStats(decayed);
        const wordsLearned = decayed.filter(w => (w.mastery || 0) >= 60).length;

        // Wall-clock duration of this practice run, capped at 60 minutes so
        // a tab left open in the background can't blow out the center's
        // average-time-spent stat.
        const rawSeconds = sessionStartRef.current ? Math.round((Date.now() - sessionStartRef.current) / 1000) : 0;
        const timeSpentSeconds = Math.min(Math.max(rawSeconds, 0), 3600);

        // Keyed by the real pack id (route param), not `loadedPack.id` (a
        // composite unit id) — the teacher dashboard matches this against
        // group.assignedPacks/customPacks, so a mismatched key here would
        // silently never show up in teacher statistics. Written per-unit
        // (monthId_unitId) so a teacher can see exactly which topic this
        // was, not just an overall pack %.
        const progressStats = {
          wordsLearned,
          totalWords: decayed.length,
          masteryPercent,
          retentionPercent,
          atRiskCount: atRisk,
          timeSpentSeconds,
        };
        await updateStudentUnitProgress(membership.centerId, membership.groupId, user.uid, packId, `${monthId}_${unitId}`, progressStats);
      } catch (err) {
        console.error('Error saving progress:', err);
      } finally {
        setSaving(false);
      }
    }
  };

  const backToTopic = () => navigate(`/corp/student/learn/topic/${packId}/${monthId}/${unitId}${topicBackQuery}`, { replace: true });

  const handleBack = (skipConfirm = false) => {
    if (step === 'practice' || step === 'intro') {
      if (skipConfirm === true) {
        if (fromTopicRef.current) { backToTopic(); return; }
        setStep('mode');
        return;
      }
      setShowExitModal(true);
      return;
    }
    if (step === 'mode') {
      navigate(`/corp/student/learn/topic/${packId}/${monthId}/${unitId}${topicBackQuery}`);
    } else if (step === 'results') {
      if (fromTopicRef.current) { backToTopic(); return; }
      setStep('mode');
    }
  };

  const handleReset = () => {
    if (fromTopicRef.current) { backToTopic(); return; }
    smartPlanRef.current = null;
    setSmartPart(null);
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
    fromTopic: fromTopicRef.current, handleReset, handleStartPractice, handleUpdateWord, loadedPack, monthId,
    navigate, packId, practiceWords, progressPct, results, roundNumber,
    selectedMode, setProgressPct, setShowExitModal, setStep, setWordCount, smartPart,
    showExitModal, sourceWords, step, topicBackQuery, unitId, wordCount, wrongWords,
  };

  return (
    <PracticeCaps.Provider value={false}>
    <div className="practice-page practice-flat" style={{ padding: '1.25rem var(--space-md) var(--space-xl)' }}>

      {/* Sleek iOS pill back button */}
      {step !== 'results' && step !== 'practice' && (
        <div className="ios-nav-header" style={{ marginBottom: '1.25rem' }}>
          <button
            className="ios-back-btn"
            onClick={handleBack}
            aria-label={t('common.back')}
            title={t('common.back')}
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span>{t('common.back')}</span>
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
    </PracticeCaps.Provider>
  );
}
