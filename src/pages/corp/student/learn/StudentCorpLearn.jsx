import { useState, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacks } from '../../../../hooks/usePacks';
import { getDecayedMastery, computeRetentionStats } from '@voc/memory-engine';
import { getConfusionPairs } from '../../../../experiment/experimentDB';
import { corpWordStorageId } from '../../../../utils/helpers';
import { useStudentT } from '../../../../hooks/useStudentT';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { buildMonthsFromPacks, localizeWord } from './utils';
import MonthsGridView from './views/MonthsGridView';
import TopicsListView from './views/TopicsListView';
import TopicDetailView from './views/TopicDetailView';
import '../../../../components/Packs/PackCard.css';
import '../../../personal/PackDetail.css';
import './shared.css';
import '../../../personal/LibraryPage.css';
import './StudentCorpLearn.css';

const EMPTY_WORDS = {};

export default function StudentCorpLearn() {
  const { t } = useStudentT();
  const { language } = useLanguage();
  const { user, membership, student, assignedPacks, additionalPacks, requiredPacks, homeworkList } = useOutletContext();
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();
  const [searchParams] = useSearchParams();
  // Homework jumps straight from the flat list to a topic, skipping the
  // month page a normal word-list drill-down passes through — so its
  // topic view's Back button can't just assume "go up to the month" like
  // every other entry point does; it needs to know it came from Homework
  // and return to the tab instead.
  const cameFromHomework = searchParams.get('from') === 'homework';

  const prevGroupIdRef = useRef(membership?.groupId);
  // 'homework' | 'all'. Until the student picks one, open on homework when
  // the teacher has given any, otherwise on the full word list.
  const [activeTab, setActiveTab] = useState(null);
  const currentTab = activeTab || ((homeworkList || []).length > 0 ? 'homework' : 'all');

  // Build the months list per pack category (main / extra / legacy required)
  const allMonths = useMemo(() => buildMonthsFromPacks(assignedPacks), [assignedPacks]);
  const additionalMonths = useMemo(() => buildMonthsFromPacks(additionalPacks), [additionalPacks]);
  const requiredMonths = useMemo(() => buildMonthsFromPacks(requiredPacks), [requiredPacks]);

  // Combined, for resolving the active month/unit regardless of which tab it came from
  const combinedMonths = useMemo(
    () => [...allMonths, ...additionalMonths, ...requiredMonths],
    [allMonths, additionalMonths, requiredMonths]
  );

  // Derive the active selected month from the route parameters
  const selectedMonth = useMemo(() => {
    return (packId && monthId)
      ? combinedMonths.find(m => m.packId === packId && m.id === monthId)
      : null;
  }, [combinedMonths, packId, monthId]);

  // Derive the active selected unit (topic) if unitId is provided
  const selectedUnit = useMemo(() => {
    return (selectedMonth && unitId)
      ? (selectedMonth.units || []).find(u => u.id === unitId)
      : null;
  }, [selectedMonth, unitId]);

  // Corporate and individual word learning progress comes from the single
  // words subscription the whole app already shares (PacksContext).
  const { wordsByPack, allWordsLoading } = usePacks();
  const allDbWords = user ? wordsByPack : EMPTY_WORDS;
  const loadingDbWords = !!user && allWordsLoading;
  const [confusionPairs, setConfusionPairs] = useState([]);

  // Load confusion pairs once per user — filtered per-unit in memoryTwin below.
  useEffect(() => {
    if (!user?.uid) return;
    getConfusionPairs(user.uid).then(setConfusionPairs).catch(() => setConfusionPairs([]));
  }, [user?.uid]);

  // Derive active selected unit words stats
  const dbWords = useMemo(() => {
    if (!selectedMonth || !selectedUnit) return {};
    return allDbWords[corpWordStorageId(selectedMonth.packId, selectedMonth.id, selectedUnit.id)] || {};
  }, [allDbWords, selectedMonth, selectedUnit]);

  // Map unit words to make sure they have IDs, valid timestamps and spaced repetition progress
  const unitWords = useMemo(() => {
    if (!selectedUnit?.words) return [];
    return selectedUnit.words.map((w, idx) => {
      const wordKey = w.id || String(idx);
      const dbStat = dbWords[wordKey] || {};
      const merged = {
        id: wordKey,
        addedAt: w.addedAt || new Date().toISOString(),
        word: w.word || '',
        translation: w.translation || '',
        definition: w.definition || '',
        example: w.example || '',
        partOfSpeech: w.partOfSpeech || 'noun',
        mastery: 0,
        stability: 1.0,
        ...w,
        ...dbStat
      };
      return localizeWord({ ...merged, mastery: getDecayedMastery(merged) }, language);
    });
  }, [selectedUnit, dbWords, language]);

  // Compute dynamic Memory Twin statistics based on spaced repetition stats
  const memoryTwin = useMemo(() => {
    if (unitWords.length === 0) return null;
    const masteryPercent = Math.round(unitWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / unitWords.length);
    const { retentionPercent, atRisk } = computeRetentionStats(unitWords);

    // Count confusion pairs that involve any word in this unit.
    const wordIds = new Set(unitWords.map(w => w.id));
    const confusionCount = confusionPairs.filter(
      p => wordIds.has(p.wordIdA) || wordIds.has(p.wordIdB)
    ).length;

    return {
      masteryPercent,
      retentionPercent,
      atRisk,
      confusionCount,
    };
  }, [unitWords, confusionPairs]);

  // Reset to main list if the active membership changes (group switch)
  useEffect(() => {
    if (membership?.groupId && prevGroupIdRef.current !== membership.groupId) {
      prevGroupIdRef.current = membership.groupId;
      navigate('/corp/student/learn');
    }
  }, [membership?.groupId]);

  const startPractice = (packToPractice) => {
    const query = cameFromHomework ? '?from=homework' : '';
    navigate(`/corp/practice/${packId}/${monthId}/${unitId}${query}`, {
      state: {
        pack: packToPractice,
        centerId: membership.centerId,
        groupId: membership.groupId,
        studentId: user.uid,
      },
    });
  };

  const isUnitDone = selectedMonth && selectedUnit && Boolean(
    student?.progress?.[`${selectedMonth.packId}_${selectedMonth.id}_${selectedUnit.id}`]
  );

  const homeworkTopicCount = (homeworkList || []).reduce((n, hw) => n + (hw.items || []).length, 0);
  const allMonthsCount = allMonths.length + additionalMonths.length;

  const p = {
    currentTab, additionalMonths, allDbWords, allMonths, cameFromHomework,
    combinedMonths, homeworkList, memoryTwin, monthId, navigate, packId,
    selectedMonth, selectedUnit, setActiveTab, startPractice, unitWords,
  };

  return (
    <div className="library-page" style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>

      {/* Tabs bar — same segmented control as the personal Library: what the
          teacher asked for, and everything assigned */}
      {!selectedMonth && (
        <div className="library-tabs-container">
          <div className="library-tabs">
            <button
              className={`library-tab-btn ${currentTab === 'homework' ? 'active' : ''}`}
              onClick={() => setActiveTab('homework')}
            >
              {currentTab === 'homework' && (
                <motion.div className="active-tab-pill" layoutId="activeTabPill" />
              )}
              <span className="tab-label">📝 {t('words.tabHomework')}</span>
              {homeworkTopicCount > 0 && <span className="tab-count-badge">{homeworkTopicCount}</span>}
            </button>
            <button
              className={`library-tab-btn ${currentTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              {currentTab === 'all' && (
                <motion.div className="active-tab-pill" layoutId="activeTabPill" />
              )}
              <span className="tab-label">📚 {t('words.tabAll')}</span>
              {allMonthsCount > 0 && <span className="tab-count-badge">{allMonthsCount}</span>}
            </button>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="library-content">
        <div className="st-packs-section">
          {!selectedMonth && <MonthsGridView p={p} />}
          {selectedMonth && !selectedUnit && <TopicsListView p={p} />}
          {selectedMonth && selectedUnit && <TopicDetailView p={p} />}
        </div>
      </div>

    </div>
  );
}


