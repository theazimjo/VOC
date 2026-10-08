import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { getReadingProgress } from '../../../../../components/corp/readingProgress';
import ChapterReader from '../../../../../components/corp/ChapterReader';
import { readingForUnit } from '../../../../../data/libraryChapters';
import WordList from '../../../../../components/Words/WordList';
import { corpWordStorageId, PRACTICE_MODE_MIN_WORDS } from '../../../../../utils/helpers';
import { useStudentT } from '../../../../../hooks/useStudentT';
import './TopicDetailView.css';

const PRACTICE_MENU = [
  { mode: 'flashcard', icon: '🧠', label: 'practice.modeFlashcard' },
  { mode: 'spelling', icon: '✍️', label: 'practice.modeSpelling' },
  { mode: 'match', icon: '🔀', label: 'practice.modeMatch' },
  { mode: 'quiz', icon: '📝', label: 'practice.modeQuiz' },
  { mode: 'speed', icon: '⏱️', label: 'practice.modeSpeed' },
  { mode: 'pronounce', icon: '🎙️', label: 'practice.modePronounce' },
];

export default function TopicDetailView({ p }) {
  const { t } = useStudentT();
  const [readerOpen, setReaderOpen] = useState(false);
  // The small button next to Practice: pick one exercise instead of the
  // automatic session.
  const [modesOpen, setModesOpen] = useState(false);
  const splitRef = useRef(null);
  useEffect(() => {
    if (!modesOpen) return undefined;
    const close = (e) => { if (splitRef.current && !splitRef.current.contains(e.target)) setModesOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('touchstart', close); };
  }, [modesOpen]);
  const {
    cameFromHomework, memoryTwin, monthId, navigate, packId,
    selectedMonth, selectedUnit, setActiveTab, startPractice, unitWords,
  } = p;
  const reading = readingForUnit(selectedUnit);
  const readProgress = reading ? getReadingProgress(reading) : null; // re-read on every render, e.g. after the reader closes
  const virtualPack = () => ({
    id: corpWordStorageId(selectedMonth.packId, selectedMonth.id, selectedUnit.id),
    title: `${selectedMonth.packTitle} - ${selectedUnit.title}`,
    words: selectedUnit.words || [],
    level: selectedMonth.packLevel,
    language: selectedMonth.packLanguage,
  });

  return (
    <>
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
                  onClick={() => {
                    if (cameFromHomework) {
                      setActiveTab('homework');
                      navigate('/corp/student/learn');
                    } else {
                      navigate(`/corp/student/learn/month/${packId}/${monthId}`);
                    }
                  }}
                  aria-label={t('common.back')}
                  title={t('common.back')}
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                  <span>{t('common.back')}</span>
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
                        📝 {unitWords.length} {t('words.wordLabel')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pack-detail-actions">
                  <div className="practice-split" ref={splitRef}>
                    <button
                      className="btn btn-primary btn-mashq practice-split-main"
                      onClick={() => startPractice(virtualPack())}
                    >
                      🎮 {t('words.practice')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-mashq practice-split-more"
                      aria-label={t('practice.chooseExercise')}
                      aria-expanded={modesOpen}
                      title={t('practice.chooseExercise')}
                      onClick={() => setModesOpen((open) => !open)}
                    >
                      <ChevronDown size={18} strokeWidth={2.6} className={modesOpen ? 'is-open' : ''} />
                    </button>
                    {modesOpen && (
                      <div className="practice-split-menu" role="menu">
                        <div className="practice-split-title">{t('practice.chooseExercise')}</div>
                        {PRACTICE_MENU.map(({ mode, icon, label }) => {
                          const tooFew = unitWords.length < (PRACTICE_MODE_MIN_WORDS[mode] || 1);
                          return (
                            <button
                              key={mode}
                              type="button"
                              role="menuitem"
                              className="practice-split-item"
                              data-mode={mode}
                              disabled={tooFew}
                              onClick={() => { setModesOpen(false); startPractice(virtualPack(), mode); }}
                            >
                              <span className="practice-split-item-icon" aria-hidden="true">{icon}</span>
                              <span className="practice-split-item-label">{t(label)}</span>
                              {tooFew && <span className="practice-split-item-min">{t('practice.minWords', { n: PRACTICE_MODE_MIN_WORDS[mode] })}</span>}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {reading && (
                    <button type="button" className="read-card" onClick={() => setReaderOpen(true)}>
                      <span className="read-card-icon" aria-hidden="true"><BookOpen size={20} strokeWidth={2.2} /></span>
                      <span className="read-card-text">
                        <span className="read-card-title">{t('words.read')}</span>
                        <span className="read-card-sub">
                          {readProgress
                            ? (readProgress.page + 1 >= readProgress.total
                              ? t('words.readFinished', { total: readProgress.total })
                              : t('words.readContinue', { page: readProgress.page + 1, total: readProgress.total }))
                            : t('words.readHint')}
                        </span>
                        {readProgress && (
                          <span className="read-card-bar" aria-hidden="true"><span style={{ width: `${((readProgress.page + 1) / readProgress.total) * 100}%` }} /></span>
                        )}
                      </span>
                      <ChevronRight size={18} className="read-card-chevron" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              {/* Memory Twin card */}
              <div className="pack-memtwin-card">
                <div className="pack-memtwin-header">
                  <span className="pack-memtwin-icon"><Brain size={16} strokeWidth={2.2} /></span>
                  <span className="pack-memtwin-title">{t('words.memory')}</span>
                </div>

                <div className="pack-memtwin-stats-grid">
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? `${memoryTwin.masteryPercent}%` : '0%'}</span>
                    <span className="pack-memtwin-stat-label">{t('words.mastery')}</span>
                  </div>
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? `${memoryTwin.retentionPercent}%` : '0%'}</span>
                    <span className="pack-memtwin-stat-label">{t('words.retention')}</span>
                  </div>
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? memoryTwin.atRisk : '0'}</span>
                    <span className="pack-memtwin-stat-label">{t('words.atRisk')}</span>
                  </div>
                  <div className="pack-memtwin-stat">
                    <span className="pack-memtwin-stat-value">{memoryTwin ? memoryTwin.confusionCount : '0'}</span>
                    <span className="pack-memtwin-stat-label">{t('words.confusions')}</span>
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
            {readerOpen && reading && (
              <ChapterReader
                reading={reading}
                onClose={() => setReaderOpen(false)}
              />
            )}
    </>
  );
}
