import { motion } from 'framer-motion';
import { FileText, Trophy, Flame, Sparkles, Brain, BarChart3 } from 'lucide-react';
import { usePacks } from '../hooks/usePacks';
import { useGrammarStats } from '../hooks/useGrammarStats';
import { grammarData, germanGrammarData } from '../data/grammarData';
import './StatsPage.css';

export default function StatsPage() {
  const { allWords, allWordsLoading: loading } = usePacks();
  const { stats: grammarStats, loading: grammarLoading } = useGrammarStats();

  // Stats calculations

  const totalWords = allWords.length;
  const masteredWords = allWords.filter(w => (w.mastery || 0) >= 80).length;
  const learningWords = allWords.filter(w => (w.mastery || 0) > 0 && (w.mastery || 0) < 80).length;
  const newWords = allWords.filter(w => (w.mastery || 0) === 0).length;
  const dueNow = allWords.filter(w => !w.nextReview || new Date(w.nextReview) <= new Date()).length;
  const avgMastery = totalWords > 0 ? Math.round(allWords.reduce((s, w) => s + (w.mastery || 0), 0) / totalWords) : 0;

  const activeWords = allWords.filter(w => (w.mastery || 0) >= 75 || (w.customSentence && w.customSentence.trim() !== '')).length;
  const passiveWords = totalWords - activeWords;
  const activePercent = totalWords > 0 ? Math.round((activeWords / totalWords) * 100) : 0;
  const passivePercent = totalWords > 0 ? 100 - activePercent : 0;

  // Mastery distribution
  const masteryBuckets = [
    { label: '0-20%', min: 0, max: 20, color: 'var(--error)' },
    { label: '20-40%', min: 20, max: 40, color: 'var(--warning)' },
    { label: '40-60%', min: 40, max: 60, color: 'var(--accent-2)' },
    { label: '60-80%', min: 60, max: 80, color: 'var(--accent-3)' },
    { label: '80-100%', min: 80, max: 101, color: 'var(--success)' },
  ];

  const bucketCounts = masteryBuckets.map(b => ({
    ...b,
    count: allWords.filter(w => (w.mastery || 0) >= b.min && (w.mastery || 0) < b.max).length
  }));

  const maxBucketCount = Math.max(...bucketCounts.map(b => b.count), 1);

  // Source stats
  const sourceMap = {};
  allWords.forEach(w => {
    if (!sourceMap[w.source]) {
      sourceMap[w.source] = { name: w.source, icon: w.sourceIcon, words: [], type: w.sourceType };
    }
    sourceMap[w.source].words.push(w);
  });
  const sources = Object.values(sourceMap).map(s => ({
    ...s,
    count: s.words.length,
    avgMastery: Math.round(s.words.reduce((sum, w) => sum + (w.mastery || 0), 0) / s.words.length)
  })).sort((a, b) => b.count - a.count);

  // Part of speech breakdown
  const posMap = {};
  allWords.forEach(w => {
    const pos = w.partOfSpeech || 'unknown';
    posMap[pos] = (posMap[pos] || 0) + 1;
  });
  const posItems = Object.entries(posMap).sort((a, b) => b[1] - a[1]);

  // Grammar calculations
  const lang = localStorage.getItem('grammar_language') || 'en';
  const currentData = lang === 'en' ? grammarData : germanGrammarData;

  const filteredTopics = Object.entries(grammarStats?.topics || {})
    .filter(([topicId, t]) => {
      const isDe = topicId.startsWith('de-');
      return lang === 'de' ? isDe : !isDe;
    })
    .map(([_, t]) => t);

  const uniqueGrammarTopics = filteredTopics.length;
  const averageGrammarAccuracy = uniqueGrammarTopics > 0 
    ? Math.round(filteredTopics.reduce((sum, t) => sum + (t.bestScore / t.totalQuestions) * 100, 0) / uniqueGrammarTopics) 
    : 0;

  const beginnerTotal = currentData.beginner?.topics?.length || 0;
  const beginnerCompleted = filteredTopics.filter(t => t.level === 'beginner').length;

  const intermediateTotal = currentData.intermediate?.topics?.length || 0;
  const intermediateCompleted = filteredTopics.filter(t => t.level === 'intermediate').length;

  const advancedTotal = currentData.advanced?.topics?.length || 0;
  const advancedCompleted = filteredTopics.filter(t => t.level === 'advanced').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pageLoading = loading || grammarLoading;

  if (pageLoading) {
    return (
      <div className="stats-page">
        <div className="page-header"><h1>📈 Statistika</h1></div>
        <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
          <div className="ios-spinner-ring"></div>
          <span>Yuklanmoqda...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="stats-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="page-header" variants={itemVariants}>
        <h1>📈 Statistika</h1>
      </motion.div>

      {/* Overview Stats */}
      <motion.div className="stats-overview" variants={itemVariants}>
        <div className="stat-card">
          <div className="stat-card-icon"><FileText size={26} strokeWidth={2} /></div>
          <div className="stat-card-value">{totalWords}</div>
          <div className="stat-card-label">Jami so'zlar</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><Trophy size={26} strokeWidth={2} /></div>
          <div className="stat-card-value">{masteredWords}</div>
          <div className="stat-card-label">O'zlashtirilgan</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><Flame size={26} strokeWidth={2} /></div>
          <div className="stat-card-value">{activeWords}</div>
          <div className="stat-card-label">Faol so'zlar</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><Sparkles size={26} strokeWidth={2} /></div>
          <div className="stat-card-value">{newWords}</div>
          <div className="stat-card-label">Yangi</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><Brain size={26} strokeWidth={2} /></div>
          <div className="stat-card-value">{dueNow}</div>
          <div className="stat-card-label">Takrorlash kerak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon"><BarChart3 size={26} strokeWidth={2} /></div>
          <div className="stat-card-value">{avgMastery}%</div>
          <div className="stat-card-label">O'rtacha daraja</div>
        </div>
      </motion.div>

      {/* Mastery Distribution Chart */}
      {totalWords > 0 && (
        <motion.div className="stats-section" variants={itemVariants}>
          <h2>📊 O'zlashtirish darajasi taqsimoti</h2>
          <div className="mastery-chart">
            {bucketCounts.map((bucket, idx) => (
              <div className="mastery-bar-group" key={idx}>
                <div className="mastery-bar-count">{bucket.count}</div>
                <motion.div
                  className="mastery-bar"
                  style={{ background: bucket.color }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(bucket.count / maxBucketCount) * 100}%` }}
                  transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
                />
                <div className="mastery-bar-label">{bucket.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active vs Passive Vocabulary Split */}
      {totalWords > 0 && (
        <motion.div className="stats-section" variants={itemVariants}>
          <h2>🔥 Faol va Passiv so'zlar tarkibi</h2>
          <div className="vocabulary-split-card">
            <div className="vocabulary-split-progress">
              <div className="progress-bar-segment active-segment" style={{ width: `${activePercent}%` }} title={`Faol so'zlar: ${activePercent}%`}>
                {activePercent >= 10 && `${activePercent}%`}
              </div>
              <div className="progress-bar-segment passive-segment" style={{ width: `${passivePercent}%` }} title={`Passiv so'zlar: ${passivePercent}%`}>
                {passivePercent >= 10 && `${passivePercent}%`}
              </div>
            </div>
            <div className="vocabulary-split-legend">
              <div className="legend-item">
                <span className="legend-dot active-dot"></span>
                <span className="legend-text">
                  <strong>Faol so'zlar (Active): {activeWords} ta</strong>
                  <p>Imlo, talaffuz mashqlaridan o'tgan yoki shaxsiy gap tuzilgan so'zlar.</p>
                </span>
              </div>
              <div className="legend-item">
                <span className="legend-dot passive-dot"></span>
                <span className="legend-text">
                  <strong>Passiv so'zlar (Passive): {passiveWords} ta</strong>
                  <p>Yangi qo'shilgan yoki hali to'liq nutqiy amaliyotda ishlatilmagan so'zlar.</p>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Source Stats */}
      {sources.length > 0 && (
        <motion.div className="stats-section" variants={itemVariants}>
          <h2>📚 Manbalar bo'yicha</h2>
          <div className="source-stats-list">
            {sources.map((source, idx) => (
              <motion.div
                className="source-stat-item"
                key={source.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="source-info">
                  <span className="source-icon">{source.icon}</span>
                  <div>
                    <div className="source-name">{source.name}</div>
                    <div className="source-count">{source.count} ta so'z</div>
                  </div>
                </div>
                <div className="source-mastery">
                  <div className="source-mastery-bar">
                    <div className="source-mastery-fill" style={{ width: `${source.avgMastery}%` }} />
                  </div>
                  <span className="source-mastery-text">{source.avgMastery}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Part of Speech */}
      {posItems.length > 0 && (
        <motion.div className="stats-section" variants={itemVariants}>
          <h2>🏷️ So'z turlari</h2>
          <div className="pos-grid">
            {posItems.map(([pos, count]) => (
              <div className="pos-item" key={pos}>
                <span className="pos-label">{pos}</span>
                <span className="pos-count">{count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grammar Stats Section */}
      <motion.div className="stats-section grammar-stats-section" variants={itemVariants}>
        <h2>📖 Grammatika statistikasi</h2>

        {grammarStats?.history?.length > 0 ? (
          <>
            <div className="grammar-overview-cards">
              <div className="grammar-overview-card">
                <span className="card-val">{grammarStats.history.length}</span>
                <span className="card-lbl">Jami urinishlar</span>
              </div>
              <div className="grammar-overview-card">
                <span className="card-val">{uniqueGrammarTopics}</span>
                <span className="card-lbl">Yechilgan mavzular</span>
              </div>
              <div className="grammar-overview-card">
                <span className="card-val">{averageGrammarAccuracy}%</span>
                <span className="card-lbl">O'rtacha to'g'rilik</span>
              </div>
            </div>

            <div className="grammar-levels-progress">
              <h3>Darajalar bo'yicha progress</h3>
              
              {/* Beginner */}
              <div className="level-progress-item">
                <div className="level-info">
                  <span className="level-name">Beginner (Boshlang'ich)</span>
                  <span className="level-count">{beginnerCompleted} / {beginnerTotal}</span>
                </div>
                <div className="level-progress-bar">
                  <div 
                    className="level-progress-fill beginner-fill" 
                    style={{ width: `${beginnerTotal > 0 ? (beginnerCompleted / beginnerTotal) * 100 : 0}%` }} 
                  />
                </div>
              </div>

              {/* Intermediate */}
              {intermediateTotal > 0 && (
                <div className="level-progress-item">
                  <div className="level-info">
                    <span className="level-name">Intermediate (O'rta)</span>
                    <span className="level-count">{intermediateCompleted} / {intermediateTotal}</span>
                  </div>
                  <div className="level-progress-bar">
                    <div 
                      className="level-progress-fill intermediate-fill" 
                      style={{ width: `${intermediateTotal > 0 ? (intermediateCompleted / intermediateTotal) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
              )}

              {/* Advanced */}
              {advancedTotal > 0 && (
                <div className="level-progress-item">
                  <div className="level-info">
                    <span className="level-name">Advanced (Yuqori)</span>
                    <span className="level-count">{advancedCompleted} / {advancedTotal}</span>
                  </div>
                  <div className="level-progress-bar">
                    <div 
                      className="level-progress-fill advanced-fill" 
                      style={{ width: `${advancedTotal > 0 ? (advancedCompleted / advancedTotal) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Test History */}
            <div className="grammar-history-table-wrapper">
              <h3>Oxirgi test urinishlari</h3>
              <table className="grammar-history-table">
                <thead>
                  <tr>
                    <th>Mavzu</th>
                    <th>Daraja</th>
                    <th>Natija</th>
                    <th>To'g'rilik</th>
                    <th>Sana</th>
                  </tr>
                </thead>
                <tbody>
                  {grammarStats.history.slice(0, 5).map((attempt, idx) => {
                    const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    const formattedDate = attempt.completedAt 
                      ? new Date(attempt.completedAt).toLocaleDateString('uz-UZ', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '';
                    
                    return (
                      <tr key={attempt.id || idx}>
                        <td><strong>{attempt.topicTitle}</strong></td>
                        <td>
                          <span className={`level-badge ${attempt.level}`}>
                            {attempt.level === 'beginner' ? 'Beginner' : attempt.level === 'intermediate' ? 'Intermediate' : 'Advanced'}
                          </span>
                        </td>
                        <td>{attempt.score} / {attempt.totalQuestions}</td>
                        <td>
                          <span className={`accuracy-badge ${pct >= 80 ? 'high' : pct >= 50 ? 'medium' : 'low'}`}>
                            {pct}%
                          </span>
                        </td>
                        <td className="date-cell">{formattedDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="grammar-empty-stats">
            <span className="empty-icon">📝</span>
            <p>Siz hali grammatika testlarini topshirmadingiz.</p>
            <p>Grammatika sahifasiga o'tib, bilimingizni sinab ko'ring!</p>
          </div>
        )}
      </motion.div>

      {totalWords === 0 && (!grammarStats?.history || grammarStats.history.length === 0) && (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <h3>Hali ma'lumot yo'q</h3>
          <p>So'zlar qo'shganingizda yoki grammatika mashq qilganingizda statistika bu yerda paydo bo'ladi</p>
        </div>
      )}
    </motion.div>
  );
}
