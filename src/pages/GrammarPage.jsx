import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarData, germanGrammarData } from '../data/grammarData';
import { useGrammarStats } from '../hooks/useGrammarStats';
import { playSound } from '../utils/feedback';
import './GrammarPage.css';

const LEVELS = [
  { id: 'beginner',     label: "Boshlang'ich", emoji: '🌱', locked: false },
  { id: 'intermediate', label: "O'rta daraja",  emoji: '🔥', locked: true  },
  { id: 'advanced',     label: 'Yuqori daraja', emoji: '⚡', locked: true  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function GrammarPage() {
  const navigate = useNavigate();
  const [activeLevel, setActiveLevel] = useState('beginner');
  const { stats: grammarStats } = useGrammarStats();
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('grammar_language') || 'en';
  });

  const currentData = lang === 'en' ? grammarData : germanGrammarData;
  const topics = currentData[activeLevel]?.topics ?? [];

  const handleLangChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('grammar_language', newLang);
    playSound('correct');
    if (newLang === 'de' && activeLevel !== 'beginner') {
      setActiveLevel('beginner');
    }
  };

  // Calculate statistics for the active level
  const completedTopicsOfLevel = Object.entries(grammarStats?.topics || {})
    .filter(([topicId, t]) => {
      const isLvl = t.level === activeLevel;
      const isDe = topicId.startsWith('de-');
      return isLvl && (lang === 'de' ? isDe : !isDe);
    })
    .map(([_, t]) => t);

  let completedExercisesCount = 0;
  completedTopicsOfLevel.forEach((t) => {
    if (t.exercises) {
      completedExercisesCount += Object.keys(t.exercises).length;
    } else {
      // fallback for old stats structure where exercises didn't exist
      completedExercisesCount += 1;
    }
  });

  const totalExercisesOfLevel = topics.length * 6;

  const averageAccuracy = completedTopicsOfLevel.length > 0
    ? Math.round(
        completedTopicsOfLevel.reduce((sum, t) => sum + (t.bestScore / t.totalQuestions) * 100, 0) /
        completedTopicsOfLevel.length
      )
    : 0;

  const handleTopicClick = (topicId) => {
    navigate(`/grammar/${activeLevel}/${topicId}`);
  };

  return (
    <motion.div
      className="grammar-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <motion.div
        className="grammar-header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grammar-header-glow" />
        <div className="grammar-header-content">
          <div className="grammar-header-icon">📖</div>
          <div className="grammar-header-titles">
            <h1 className="grammar-title">
              {lang === 'en' ? 'Grammatika' : 'Deutsche Grammatik'}
            </h1>
          
          </div>

          {/* Premium Language Switcher */}
          <div className="grammar-lang-selector">
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => handleLangChange('en')}
            >
              🇬🇧 English
            </button>
            <button 
              className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
              onClick={() => handleLangChange('de')}
            >
              🇩🇪 German
            </button>
          </div>
        </div>

        {/* Global Level Stats */}
        <div className="grammar-header-stats">
          <div className="grammar-stat-chip">
            <span className="grammar-stat-num">{topics.length}</span>
            <span className="grammar-stat-lbl">mavzu</span>
          </div>
          <div className="grammar-stat-divider" />
          <div className="grammar-stat-chip">
            <span className="grammar-stat-num">{totalExercisesOfLevel}</span>
            <span className="grammar-stat-lbl">mashq</span>
          </div>
          <div className="grammar-stat-divider" />
          <div className="grammar-stat-chip">
            <span className="grammar-stat-num">3</span>
            <span className="grammar-stat-lbl">daraja</span>
          </div>
        </div>

        {/* User Specific Progress for this Level */}
        <div className="grammar-user-stats">
          <div className="user-stat-card">
            <span className="user-stat-value">{completedExercisesCount} / {totalExercisesOfLevel}</span>
            <span className="user-stat-label">Mashqlar yechildi</span>
          </div>
          <div className="user-stat-card">
            <span className="user-stat-value">{averageAccuracy}%</span>
            <span className="user-stat-label">O'rtacha natija</span>
          </div>
        </div>
      </motion.div>

      {/* Level Tabs */}
      <motion.div
        className="grammar-level-tabs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
      >
        {LEVELS.map((lvl) => (
          <button
            key={lvl.id}
            className={[
              'grammar-level-tab',
              activeLevel === lvl.id ? 'active' : '',
              lvl.locked ? 'locked' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => !lvl.locked && setActiveLevel(lvl.id)}
            disabled={lvl.locked}
            title={lvl.locked ? 'Tez kunda...' : lvl.label}
          >
            {activeLevel === lvl.id && !lvl.locked && (
              <motion.div
                className="grammar-tab-pill"
                layoutId="grammarTabPill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="tab-emoji">{lvl.locked ? '🔒' : lvl.emoji}</span>
            <span className="tab-label-text">{lvl.label}</span>
            {lvl.locked && (
              <span className="tab-soon-badge">Tez kunda</span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Topics Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          className="grammar-topics-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
        >
          {topics.length > 0 ? (
            topics.map((topic) => {
              const topicStats = grammarStats?.topics?.[topic.id];
              const completedExCount = topicStats?.exercises ? Object.keys(topicStats.exercises).length : 0;

              return (
                <motion.div
                  key={topic.id}
                  className={`grammar-topic-card ${topicStats ? 'completed' : ''}`}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTopicClick(topic.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleTopicClick(topic.id)}
                >
                  <div className="card-accent-line" />
                  <div className="card-top-row">
                    <div className="topic-card-icon">{topic.icon}</div>
                    <span className="topic-arrow">→</span>
                  </div>
                  <div className="card-body">
                    <h3 className="topic-card-title">{topic.title}</h3>
                    <p className="topic-card-desc">
                      {topic.guide
                        ? topic.guide.slice(0, 80) + (topic.guide.length > 80 ? '…' : '')
                        : topic.description ?? ''}
                    </p>
                  </div>
                  <div className="topic-card-meta">
                    <span className="topic-badge topic-badge-questions">
                      📚 6 ta mashq
                    </span>
                    {completedExCount > 0 ? (
                      <span className="topic-badge topic-badge-completed">
                        ✅ {completedExCount} / 6 yechildi
                      </span>
                    ) : (
                      <span className="topic-badge topic-badge-todo">
                        ⏳ Boshlanmagan
                      </span>
                    )}
                    {topic.tag && (
                      <span className="topic-badge topic-badge-tag">{topic.tag}</span>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="grammar-empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="empty-icon">🚧</div>
              <h3>Tez kunda...</h3>
              <p>Bu daraja bo'yicha mavzular tayyorlanmoqda</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
