import { motion } from 'framer-motion';
import { Brain, ChevronLeft } from 'lucide-react';
import WordList from '../../../../../components/Words/WordList';
import { corpWordStorageId } from '../../../../../utils/helpers';
import './TopicDetailView.css';

export default function TopicDetailView({ p }) {
  const {
    cameFromHomework, memoryTwin, monthId, navigate, packId,
    selectedMonth, selectedUnit, setActiveTab, startPractice, unitWords,
  } = p;

  return (
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
  );
}
