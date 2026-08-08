import { useState, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../../firebase';
import { getDecayedMastery, computeRetentionStats } from '../../../../utils/memoryEngine';
import { corpWordStorageId } from '../../../../utils/helpers';
import { buildMonthsFromPacks } from './utils';
import MonthsGridView from './views/MonthsGridView';
import TopicsListView from './views/TopicsListView';
import TopicDetailView from './views/TopicDetailView';
import '../../../../components/Packs/PackCard.css';
import '../../../personal/PackDetail.css';
import './shared.css';
import './StudentCorpLearn.css';

export default function StudentCorpLearn() {
  const { user, membership, student, assignedPacks, additionalPacks, requiredPacks, homeworkList } = useOutletContext();
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();
  const [searchParams] = useSearchParams();
  // Homework jumps straight from the flat list to a topic, skipping the
  // month page a normal Main/Additional drill-down passes through — so its
  // topic view's Back button can't just assume "go up to the month" like
  // every other entry point does; it needs to know it came from Homework
  // and return to the tab instead.
  const cameFromHomework = searchParams.get('from') === 'homework';

  const prevGroupIdRef = useRef(membership?.groupId);
  const [activeTab, setActiveTab] = useState('asosiy'); // 'asosiy', 'qoshimcha', 'kerakli'

  // Build the months list per pack category ("Asosiy" / "Qo'shimcha" / "Kerakli")
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

  const [allDbWords, setAllDbWords] = useState({});
  const [loadingDbWords, setLoadingDbWords] = useState(false);

  // Fetch all corporate and individual word learning progress reactively from Firebase
  useEffect(() => {
    if (!user) {
      setAllDbWords({});
      return;
    }

    const wordsRef = ref(db, `users/${user.uid}/words`);

    setLoadingDbWords(true);
    const unsub = onValue(wordsRef, (snap) => {
      if (snap.exists()) {
        setAllDbWords(snap.val());
      } else {
        setAllDbWords({});
      }
      setLoadingDbWords(false);
    }, (err) => {
      console.error('Error fetching corporate word progress:', err);
      setLoadingDbWords(false);
    });

    return unsub;
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
      return { ...merged, mastery: getDecayedMastery(merged) };
    });
  }, [selectedUnit, dbWords]);

  // Compute dynamic Memory Twin statistics based on spaced repetition stats
  const memoryTwin = useMemo(() => {
    if (unitWords.length === 0) return null;
    const masteryPercent = Math.round(unitWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / unitWords.length);
    const { retentionPercent, atRisk } = computeRetentionStats(unitWords);

    return {
      masteryPercent,
      retentionPercent,
      atRisk,
      confusionCount: 0
    };
  }, [unitWords]);

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

  const p = {
    activeTab, setActiveTab, additionalMonths, allDbWords, allMonths, cameFromHomework,
    combinedMonths, homeworkList, memoryTwin, monthId, navigate, packId,
    selectedMonth, selectedUnit, startPractice, unitWords,
  };

  return (
    <div className="student-corp-container" style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>

      {/* Tabs bar (only show at top-level Months overview) */}
      {!selectedMonth && (
        <div className="library-tabs-container">
          <div className="library-tabs">

            {/* Main Tab */}
            <button
              className={`library-tab-btn ${activeTab === 'asosiy' ? 'active' : ''}`}
              onClick={() => setActiveTab('asosiy')}
            >
              <span className="tab-icon">🏠</span> <span>Main</span>
            </button>

            {/* Additional Tab */}
            <button
              className={`library-tab-btn ${activeTab === 'qoshimcha' ? 'active' : ''}`}
              onClick={() => setActiveTab('qoshimcha')}
            >
              <span className="tab-icon">✨</span> <span>Additional</span>
            </button>

            {/* Homework Tab */}
            <button
              className={`library-tab-btn ${activeTab === 'homework' ? 'active' : ''}`}
              onClick={() => setActiveTab('homework')}
            >
              <span className="tab-icon">📝</span> <span>Homework</span>
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


