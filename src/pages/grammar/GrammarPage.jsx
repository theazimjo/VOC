import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarData } from '../../data/grammarData';
import { russianGrammarData } from '../../data/russianGrammarData';
import { useGrammarStats } from '../../hooks/useGrammarStats';
import { useLanguage } from '../../contexts/LanguageContext';
import './GrammarPage.css';

const LEVELS = [
  { id: 'beginner',     label: 'Beginner',     emoji: '🌱', locked: false },
  { id: 'intermediate', label: 'Elementary',   emoji: '🔥', locked: false },
  { id: 'advanced',     label: 'Intermediate', emoji: '⚡', locked: true  },
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
  const { t } = useLanguage();
  const [activeLang, setActiveLangState] = useState(() => {
    return localStorage.getItem('grammar_lang') || 'english';
  });
  const [activeLevel, setActiveLevelState] = useState(() => {
    return localStorage.getItem('grammar_level') || 'beginner';
  });
  const { stats: grammarStats } = useGrammarStats();

  const setActiveLang = (lang) => {
    setActiveLangState(lang);
    localStorage.setItem('grammar_lang', lang);
  };

  const setActiveLevel = (level) => {
    setActiveLevelState(level);
    localStorage.setItem('grammar_level', level);
  };

  const currentDataSource = activeLang === 'russian' ? russianGrammarData : grammarData;
  const topics = currentDataSource[activeLevel]?.topics ?? [];

  // Calculate statistics for the active level. Legacy German-grammar topic
  // stats (that language option was removed) are excluded so old
  // completions don't skew the counts below.
  const completedTopicsOfLevel = Object.entries(grammarStats?.topics || {})
    .filter(([topicId, t]) => t.level === activeLevel && !topicId.startsWith('de-'))
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
            <h1 className="grammar-title">{t('grammar.title')}</h1>
          </div>
        </div>

        {/* Global Level Stats */}
        <div className="grammar-header-stats">
          <div className="grammar-stat-chip">
            <span className="grammar-stat-num">{topics.length}</span>
            <span className="grammar-stat-lbl">{t('grammar.topicsCount')}</span>
          </div>
          <div className="grammar-stat-divider" />
          <div className="grammar-stat-chip">
            <span className="grammar-stat-num">{totalExercisesOfLevel}</span>
            <span className="grammar-stat-lbl">{t('grammar.exercisesCount')}</span>
          </div>
          <div className="grammar-stat-divider" />
          <div className="grammar-stat-chip">
            <span className="grammar-stat-num">3</span>
            <span className="grammar-stat-lbl">{t('grammar.levelsCount')}</span>
          </div>
        </div>

        {/* User Specific Progress for this Level */}
        <div className="grammar-user-stats">
          <div className="user-stat-card">
            <span className="user-stat-value">{completedExercisesCount} / {totalExercisesOfLevel}</span>
            <span className="user-stat-label">{t('grammar.completedExercises')}</span>
          </div>
          <div className="user-stat-card">
            <span className="user-stat-value">{averageAccuracy}%</span>
            <span className="user-stat-label">{t('grammar.averageScore')}</span>
          </div>
        </div>
      </motion.div>

      {/* Language Switcher Tabs */}
      <div className="grammar-lang-tabs">
        <button
          type="button"
          className={`grammar-lang-tab ${activeLang === 'english' ? 'active' : ''}`}
          onClick={() => setActiveLang('english')}
        >
          <span className="lang-flag">🇬🇧</span>
          <span>{t('grammar.englishGrammar')}</span>
        </button>
        <button
          type="button"
          className={`grammar-lang-tab ${activeLang === 'russian' ? 'active' : ''}`}
          onClick={() => setActiveLang('russian')}
        >
          <span className="lang-flag">🇷🇺</span>
          <span>{t('grammar.russianGrammar')}</span>
        </button>
      </div>

      {/* Level Tabs (iOS Segmented Control) */}
      <motion.div
        className="grammar-level-tabs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
      >
        {[
          { id: 'beginner',     label: t('grammar.beginner'),     emoji: '🌱', locked: false },
          { id: 'intermediate', label: t('grammar.elementary'),   emoji: '🔥', locked: false },
          { id: 'advanced',     label: t('grammar.intermediate'), emoji: '⚡', locked: true  },
        ].map((lvl) => (
          <button
            key={lvl.id}
            className={[
              'grammar-level-tab',
              activeLevel === lvl.id ? 'active' : '',
              lvl.locked ? 'locked' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => !lvl.locked && setActiveLevel(lvl.id)}
            disabled={lvl.locked}
            title={lvl.locked ? t('grammar.comingSoonDots') : lvl.label}
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
              <span className="tab-soon-badge">{t('grammar.comingSoon')}</span>
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
                      {t('grammar.exercisesBadge', { count: 6 })}
                    </span>
                    {completedExCount > 0 ? (
                      <span className="topic-badge topic-badge-completed">
                        {t('grammar.exCompletedBadge', { completed: completedExCount, total: 6 })}
                      </span>
                    ) : (
                      <span className="topic-badge topic-badge-todo">
                        {t('grammar.notStartedBadge')}
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
              <h3>{t('grammar.comingSoonDots')}</h3>
              <p>{t('grammar.comingSoonDesc')}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
