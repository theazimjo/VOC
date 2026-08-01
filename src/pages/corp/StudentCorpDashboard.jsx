import { useState, useEffect, useMemo, useRef } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { getDecayedMastery, computeRetentionStats } from '../../utils/memoryEngine';
import {
  BookOpen, Sparkles, CheckCircle2, Play, ChevronRight, ArrowLeft, MoreVertical, Brain
} from 'lucide-react';
import WordList from '../../components/Words/WordList';
import '../../components/Packs/PackCard.css';
import '../PackDetail.css';
import './StudentCorpDashboard.css';

export default function StudentCorpDashboard() {
  const { user, membership, student, assignedPacks } = useOutletContext();
  const navigate = useNavigate();
  const { packId, monthId, unitId } = useParams();

  const prevGroupIdRef = useRef(membership?.groupId);
  const [activeTab, setActiveTab] = useState('asosiy'); // 'asosiy', 'qoshimcha', 'kerakli'
  

  // Build the list of all months from assigned packs
  const allMonths = useMemo(() => {
    return (assignedPacks || []).flatMap(pack => {
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
        packLevel: pack.level
      }));
    });
  }, [assignedPacks]);

  // Derive the active selected month from the route parameters
  const selectedMonth = useMemo(() => {
    return (packId && monthId)
      ? allMonths.find(m => m.packId === packId && m.id === monthId)
      : null;
  }, [allMonths, packId, monthId]);

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
    const uniqueUnitId = `${selectedMonth.packId}_${selectedMonth.id}_${selectedUnit.id}`;
    return allDbWords[uniqueUnitId] || {};
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
      navigate('/corp/student');
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

  return (
    <div className="student-corp-container" style={{ minHeight: 'calc(100vh - var(--navbar-height))' }}>
      

      {/* Tabs bar (only show at top-level Months overview) */}
      {!selectedMonth && (
        <div className="library-tabs-container">
          <div className="library-tabs">
            
            {/* Asosiy Tab */}
            <button
              className={`library-tab-btn ${activeTab === 'asosiy' ? 'active' : ''}`}
              onClick={() => setActiveTab('asosiy')}
            >
              <span className="tab-icon">🏠</span> <span>Asosiy</span>
            </button>
 
            {/* Qo'shimcha Tab */}
            <button
              className={`library-tab-btn ${activeTab === 'qoshimcha' ? 'active' : ''}`}
              onClick={() => setActiveTab('qoshimcha')}
            >
              <span className="tab-icon">✨</span> <span>Qo'shimcha</span>
            </button>
 
            {/* Kerakli Tab */}
            <button
              className={`library-tab-btn ${activeTab === 'kerakli' ? 'active' : ''}`}
              onClick={() => setActiveTab('kerakli')}
            >
              <span className="tab-icon">📌</span> <span>Kerakli</span>
            </button>
 
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="library-content">
        
        {activeTab === 'asosiy' && (
          <div className="st-packs-section">
            
            {/* LEVEL 1: MONTHS LIST */}
            {!selectedMonth && (
              <>
                {allMonths.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-state-icon">📦</div>
                    <h3>To'plamlar topilmadi</h3>
                    <p>Hozircha sizga hech qanday o'quv rejasi biriktirilmagan.</p>
                  </div>
                ) : (
                  <div className="grid-cards">
                    {allMonths.map((m) => (
                      <motion.div
                        key={`${m.packId}_${m.id}`}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        onClick={() => navigate(`/corp/student/month/${m.packId}/${m.id}`)}
                        className="pack-card"
                        role="button"
                        tabIndex={0}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="pack-card-top">
                          <div className="pack-card-icon" style={{ backgroundColor: 'var(--accent-1-dim)', borderColor: 'var(--border-light)' }}>
                            📅
                          </div>
                          <div className="pack-card-top-right">
                            <span className="pack-card-count">{(m.units || []).length} ta mavzu</span>
                          </div>
                        </div>

                        <div className="pack-card-body">
                          <h3 className="pack-card-title">{m.title}</h3>
                          <p className="pack-card-desc">{m.packTitle} ({m.packLevel})</p>
                        </div>

                        <div className="pack-card-footer">
                          <span className="pack-card-new-label">📅 Oylik reja</span>
                          <span className="pack-card-arrow">→</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* LEVEL 2: TOPICS LIST */}
            {selectedMonth && !selectedUnit && (
              <>
                {/* Folder detail header exactly like /library */}
                <div className="library-folder-detail-header" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                  <button 
                    className="library-folder-back-btn" 
                    onClick={() => navigate('/corp/student')}
                    style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                  >
                    <ArrowLeft size={20} style={{ flexShrink: 0 }} /> Kutubxona
                  </button>
                  <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 700, margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📅 {selectedMonth.title}
                  </h2>
                </div>

                <div className="grid-cards">
                  {(selectedMonth.units || []).length === 0 ? (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '1rem 0' }}>Bu oyda mavzular mavjud emas.</div>
                  ) : (
                    selectedMonth.units.map((u) => {
                      const uniqueUnitId = `${selectedMonth.packId}_${selectedMonth.id}_${u.id}`;
                      const hasWords = u.words && u.words.length > 0;

                      // Calculate real average mastery percentage of the words in the unit
                      let masteryPct = 0;
                      if (hasWords) {
                        const unitStats = allDbWords[uniqueUnitId] || {};
                        const totalMastery = u.words.reduce((sum, w, idx) => {
                          const wordKey = w.id || String(idx);
                          const stat = unitStats[wordKey] || {};
                          return sum + getDecayedMastery(stat);
                        }, 0);
                        masteryPct = Math.round(totalMastery / u.words.length);
                      }

                      return (
                        <motion.div
                          key={u.id}
                          whileHover={hasWords ? { y: -4 } : {}}
                          whileTap={hasWords ? { scale: 0.98 } : {}}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                          onClick={() => hasWords && navigate(`/corp/student/topic/${selectedMonth.packId}/${selectedMonth.id}/${u.id}`)}
                          className="pack-card"
                          role="button"
                          tabIndex={0}
                          style={{ cursor: hasWords ? 'pointer' : 'default', opacity: hasWords ? 1 : 0.5 }}
                        >
                          <div className="pack-card-top">
                            <div className="pack-card-icon" style={{ backgroundColor: 'var(--accent-1-dim)', borderColor: 'var(--border-light)' }}>
                              📖
                            </div>
                            <div className="pack-card-top-right">
                              <span className="pack-card-count">{(u.words || []).length} ta so'z</span>
                            </div>
                          </div>

                          <div className="pack-card-body">
                            <h3 className="pack-card-title">{u.title}</h3>
                          </div>

                          <div className="pack-card-footer" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
                            <div className="pack-card-progress-row" style={{ width: '100%' }}>
                              <div className="pack-card-progress-track">
                                <div className="pack-card-progress-fill" style={{ width: `${masteryPct}%`, background: 'var(--success)' }} />
                              </div>
                              <span className="pack-card-progress-label" style={{ color: masteryPct > 0 ? 'var(--success)' : 'var(--text-secondary)' }}>
                                {masteryPct}% mastered
                              </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                              <span style={{ fontSize: '0.78rem', color: 'var(--accent-1)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                                O'tish <span className="pack-card-arrow" style={{ transform: 'none', position: 'static' }}>→</span>
                              </span>
                            </div>
                          </div>
                        </motion.div>
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
                {/* Back to month list */}
                <div className="detail-back-navigation" style={{ marginBottom: '1.5rem' }}>
                  <button 
                    className="btn-back" 
                    onClick={() => navigate(`/corp/student/month/${packId}/${monthId}`)}
                    style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', border: 'none', background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', padding: 0 }}
                  >
                    <ArrowLeft size={20} /> {selectedMonth.title}
                  </button>
                </div>

                {/* Header card */}
                <div className="pack-detail-header" style={{ borderBottom: `4px solid var(--accent-1)` }}>
                  <div className="pack-detail-info">
                    <div className="pack-detail-icon">📖</div>
                    <div className="pack-detail-text">
                      <h1 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '2rem', fontWeight: 800 }}>{selectedUnit.title}</h1>
                      <div className="book-stats" style={{ marginTop: '6px' }}>
                        <span className="book-stat-badge" style={{ display: 'inline-flex', background: 'var(--accent-1-dim)', color: 'var(--accent-1)', fontSize: '0.8rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px' }}>
                          📝 {unitWords.length} ta so'z
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pack-detail-actions">
                    <button 
                      className="btn btn-primary btn-mashq"
                      onClick={() => {
                        const uniqueUnitId = `${selectedMonth.packId}_${selectedMonth.id}_${selectedUnit.id}`;
                        const virtualPack = {
                          id: uniqueUnitId,
                          title: `${selectedMonth.packTitle} - ${selectedUnit.title}`,
                          words: selectedUnit.words || [],
                          level: selectedMonth.packLevel
                        };
                        startPractice(virtualPack);
                      }}
                    >
                      🎮 Mashq qilish
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
                  language="en-US"
                />
              </motion.div>
            )}

          </div>
        )}

        {activeTab === 'qoshimcha' && (
          <div className="empty-state">
            <div className="empty-state-icon">✨</div>
            <h3>Qo'shimcha materiallar</h3>
            <p>Hozircha o'qituvchi tomonidan qo'shimcha materiallar biriktirilmagan.</p>
          </div>
        )}

        {activeTab === 'kerakli' && (
          <div className="empty-state">
            <div className="empty-state-icon">📌</div>
            <h3>Zaruriy topshiriqlar</h3>
            <p>Hozircha bajarilishi shart bo'lgan alohida topshiriqlar yo'q.</p>
          </div>
        )}

      </div>

    </div>
  );
}
