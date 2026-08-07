import { useState, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { getDecayedMastery, computeRetentionStats } from '../../utils/memoryEngine';
import { corpWordStorageId } from '../../utils/helpers';
import {
  BookOpen, Sparkles, CheckCircle2, Play, ChevronRight, ChevronLeft, ArrowLeft, MoreVertical, Brain
} from 'lucide-react';
import WordList from '../../components/Words/WordList';
import SatPackCard from '../../components/corp/SatPackCard';
import PackHeaderHero from '../../components/corp/PackHeaderHero';
import '../../components/Packs/PackCard.css';
import '../PackDetail.css';
import './StudentCorpLearn.css';

// Build the list of months (with month → unit → words nesting normalized)
// from a list of pack objects.
function buildMonthsFromPacks(packs) {
  return (packs || []).flatMap(pack => {
    const packMonths = pack.months && pack.months.length > 0
      ? pack.months
      : pack.units && pack.units.length > 0
        ? [{ id: 'm1', title: '1-Oy', units: pack.units }]
        : pack.words && pack.words.length > 0
          ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }]
          : [];
    return packMonths.map(m => ({
      ...m,
      packId: pack.id,
      packTitle: pack.title,
      packLevel: pack.level,
      packLanguage: pack.language || 'en-US'
    }));
  });
}

// Helper to compute word breakdown stats (mastered, learning, new) for a month/pack.
// `avgMasteryPct` (mean decayed mastery across every word) drives the ring
// badge — a binary ">=80% counts as mastered" ratio stays at 0% for a long
// time under this app's spaced-repetition model (passive-recall practice
// modes cap a word's mastery at 65% until it earns an active-recall pass),
// so the ring needs a continuous signal that moves with any real practice.
function computeMonthWordStats(month, allDbWords) {
  let masteredCount = 0;
  let learningCount = 0;
  let newCount = 0;
  let totalMasterySum = 0;

  const units = month.units || [];
  units.forEach(u => {
    const unitDbStats = allDbWords[corpWordStorageId(month.packId, month.id, u.id)] || {};
    const words = u.words || [];

    words.forEach((w, idx) => {
      const wordKey = w.id || String(idx);
      const dbStat = unitDbStats[wordKey] || {};
      const merged = { ...w, ...dbStat };
      const mastery = getDecayedMastery(merged);
      totalMasterySum += mastery;

      if (mastery >= 80) {
        masteredCount++;
      } else if (mastery > 0 || dbStat.reviewCount > 0 || dbStat.lastReviewed) {
        learningCount++;
      } else {
        newCount++;
      }
    });
  });

  const totalWords = masteredCount + learningCount + newCount;
  const avgMasteryPct = totalWords > 0 ? Math.round(totalMasterySum / totalWords) : 0;
  return { masteredCount, learningCount, newCount, totalWords, avgMasteryPct };
}

// Helper to compute word breakdown stats for a single unit/topic
function computeUnitWordStats(selectedMonth, unit, allDbWords) {
  let masteredCount = 0;
  let learningCount = 0;
  let newCount = 0;
  let totalMasterySum = 0;

  const unitDbStats = allDbWords[corpWordStorageId(selectedMonth.packId, selectedMonth.id, unit.id)] || {};

  (unit.words || []).forEach((w, idx) => {
    const wordKey = w.id || String(idx);
    const dbStat = unitDbStats[wordKey] || {};
    const merged = { ...w, ...dbStat };
    const mastery = getDecayedMastery(merged);
    totalMasterySum += mastery;

    if (mastery >= 80) {
      masteredCount++;
    } else if (mastery > 0 || dbStat.reviewCount > 0 || dbStat.lastReviewed) {
      learningCount++;
    } else {
      newCount++;
    }
  });

  const totalWords = masteredCount + learningCount + newCount;
  const avgMasteryPct = totalWords > 0 ? Math.round(totalMasterySum / totalWords) : 0;
  return { masteredCount, learningCount, newCount, totalWords, avgMasteryPct };
}

export default function StudentCorpLearn() {
  const { user, membership, student, assignedPacks, additionalPacks, requiredPacks } = useOutletContext();
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();

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
    navigate(`/corp/practice/${packId}/${monthId}/${unitId}`, {
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

  // Renders the top-level "months" grid for a given pack category (Asosiy / Qo'shimcha / Kerakli)
  const renderMonthsGrid = (months, emptyIcon, emptyTitle, emptyDesc) => (
    months.length === 0 ? (
      <div className="empty-state">
        <div className="empty-state-icon">{emptyIcon}</div>
        <h3>{emptyTitle}</h3>
        <p>{emptyDesc}</p>
      </div>
    ) : (
      <div className="grid-cards">
        {months.map((m) => {
          const stats = computeMonthWordStats(m, allDbWords);
          return (
            <SatPackCard
              key={`${m.packId}_${m.id}`}
              title={m.title}
              subtitle={`${m.packTitle} (${m.packLevel})`}
              setCount={(m.units || []).length}
              setLabel="sets"
              wordCount={stats.totalWords}
              wordLabel="words"
              masteredCount={stats.masteredCount}
              learningCount={stats.learningCount}
              newCount={stats.newCount}
              masteryPct={stats.avgMasteryPct}
              onClick={() => navigate(`/corp/student/learn/month/${m.packId}/${m.id}`)}
            />
          );
        })}
      </div>
    )
  );

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

            {/* Required Tab */}
            <button
              className={`library-tab-btn ${activeTab === 'kerakli' ? 'active' : ''}`}
              onClick={() => setActiveTab('kerakli')}
            >
              <span className="tab-icon">📌</span> <span>Required</span>
            </button>

          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="library-content">

        <div className="st-packs-section">

          {/* LEVEL 1: MONTHS LIST (source depends on active tab) */}
          {!selectedMonth && (
            <>
              {activeTab === 'asosiy' && renderMonthsGrid(
                allMonths, '📦', "No sets found",
                "No study plan has been assigned to you yet."
              )}
              {activeTab === 'qoshimcha' && renderMonthsGrid(
                additionalMonths, '✨', "No additional materials",
                "No additional materials assigned by teacher yet."
              )}
              {activeTab === 'kerakli' && renderMonthsGrid(
                requiredMonths, '📌', "No required tasks",
                "No separate required tasks assigned to complete."
              )}
            </>
          )}

          {/* LEVEL 2: TOPICS LIST */}
          {selectedMonth && !selectedUnit && (
            <>
              {/* Sleek back button pill */}
              <div className="ios-nav-header">
                <button
                  className="ios-back-btn"
                  onClick={() => navigate('/corp/student/learn')}
                  aria-label="Back"
                  title="Back"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                  <span>Back</span>
                </button>
              </div>

              {/* Hero Banner Header Card */}
              {(() => {
                const monthStats = computeMonthWordStats(selectedMonth, allDbWords);
                return (
                  <PackHeaderHero
                    title={selectedMonth.title}
                    subtitle={selectedMonth.packTitle ? `${selectedMonth.packTitle} (${selectedMonth.packLevel || 'Standard'})` : "Words collected from real past exams"}
                    tag={selectedMonth.packLevel || "Question bank"}
                    setCount={(selectedMonth.units || []).length}
                    wordCount={monthStats.totalWords}
                    masteredCount={monthStats.masteredCount}
                    masteryPct={monthStats.avgMasteryPct}
                  />
                );
              })()}

              <div className="grid-cards">
                {(selectedMonth.units || []).length === 0 ? (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '1rem 0' }}>No topics available in this month.</div>
                ) : (
                  selectedMonth.units.map((u) => {
                    const stats = computeUnitWordStats(selectedMonth, u, allDbWords);
                    const hasWords = (u.words || []).length > 0;

                    return (
                      <SatPackCard
                        key={u.id}
                        title={u.title}
                        subtitle={u.pattern || selectedMonth.title}
                        wordCount={stats.totalWords}
                        wordLabel="words"
                        masteredCount={stats.masteredCount}
                        learningCount={stats.learningCount}
                        newCount={stats.newCount}
                        masteryPct={stats.avgMasteryPct}
                        onClick={() => hasWords && navigate(`/corp/student/learn/topic/${selectedMonth.packId}/${selectedMonth.id}/${u.id}`)}
                        disabled={!hasWords}
                      />
                    );
                  })
                )}
              </div>
            </>
          )}

          {/* LEVEL 3: TOPIC DETAILS VIEW */}
          {selectedMonth && selectedUnit && (
            <motion.div
              className="pack-detail-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ padding: 0 }}
            >
              {/* Sleek back button pill */}
              <div className="ios-nav-header">
                <button
                  className="ios-back-btn"
                  onClick={() => navigate(`/corp/student/learn/month/${packId}/${monthId}`)}
                  aria-label="Back"
                  title="Back"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                  <span>Back</span>
                </button>
              </div>

              {/* Header card */}
              <div className="pack-detail-header" style={{ borderBottom: `4px solid var(--accent-1)` }}>
                <div className="pack-detail-info">
                  <div className="pack-detail-icon">📖</div>
                  <div className="pack-detail-text">
                    <h1 className="corp-unit-detail-title">{selectedUnit.title}</h1>
                    <div className="book-stats" style={{ marginTop: '6px' }}>
                      <span className="book-stat-badge" style={{ display: 'inline-flex', background: 'var(--accent-1-dim)', color: 'var(--accent-1)', fontSize: '0.8rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px' }}>
                        📝 {unitWords.length} words
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pack-detail-actions">
                  <button
                    className="btn btn-primary btn-mashq"
                    onClick={() => {
                      const virtualPack = {
                        id: corpWordStorageId(selectedMonth.packId, selectedMonth.id, selectedUnit.id),
                        title: `${selectedMonth.packTitle} - ${selectedUnit.title}`,
                        words: selectedUnit.words || [],
                        level: selectedMonth.packLevel,
                        language: selectedMonth.packLanguage
                      };
                      startPractice(virtualPack);
                    }}
                  >
                    🎮 Practice
                  </button>
                </div>
              </div>

              {/* Memory Twin card */}
              <div className="pack-memtwin-card">
                <div className="pack-memtwin-header">
                  <span className="pack-memtwin-icon"><Brain size={16} strokeWidth={2.2} /></span>
                  <span className="pack-memtwin-title">Memory Twin</span>
                </div>

                <div className="pack-memtwin-stats-grid">
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? `${memoryTwin.masteryPercent}%` : '0%'}</span>
                    <span className="pack-memtwin-stat-label">Mastery</span>
                  </div>
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? `${memoryTwin.retentionPercent}%` : '0%'}</span>
                    <span className="pack-memtwin-stat-label">Retention</span>
                  </div>
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? memoryTwin.atRisk : '0'}</span>
                    <span className="pack-memtwin-stat-label">At risk</span>
                  </div>
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? memoryTwin.confusionCount : '0'}</span>
                    <span className="pack-memtwin-stat-label">Confusions</span>
                  </div>
                </div>
              </div>

              {/* Words list */}
              <WordList
                words={unitWords}
                readOnly={true}
                language={selectedMonth?.packLanguage || 'en-US'}
              />
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
}
