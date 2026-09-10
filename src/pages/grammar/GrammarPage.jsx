import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarData } from '../../data/grammarData';
import { useGrammarStats } from '../../hooks/useGrammarStats';
import { useLanguage } from '../../contexts/LanguageContext';
import './GrammarPage.css';

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

const GRAMMAR_TRACKS = {
  en: { data: grammarData, prefix: null, label: '🇬🇧 English', icon: '🇬🇧' },
};

export default function GrammarPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeLevel, setActiveLevelState] = useState(() => {
    return localStorage.getItem('grammar_level') || 'beginner';
  });
  const [activeTrack] = useState('en');
  const { stats: grammarStats } = useGrammarStats();

  const setActiveLevel = (level) => {
    setActiveLevelState(level);
    localStorage.setItem('grammar_level', level);
  };

  const topics = GRAMMAR_TRACKS[activeTrack].data[activeLevel]?.topics ?? [];

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
      {/* Main Header / Hero Section */}
      <motion.div
        className="grammar-header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grammar-header-content">
          <div className="grammar-header-main">
            <div className="grammar-header-icon-container">
              <span className="grammar-header-icon">📖</span>
            </div>
            <div className="grammar-header-info">
              <h1 className="grammar-title">{t('grammar.title')}</h1>
              <p className="grammar-subtitle">
                {t('grammar.pathEntryDesc') || "Ingliz tili qoidalari va interaktiv mashqlar"}
              </p>
            </div>
          </div>

          <motion.button
            className="grammar-path-hero-btn"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/grammar/path')}
          >
            <div className="grammar-path-hero-left">
              <span className="grammar-path-hero-icon">🧗</span>
              <div className="grammar-path-hero-text">
                <span className="grammar-path-hero-title">{t('grammar.pathTitle')}</span>
                <span className="grammar-path-hero-badge">Step-by-step</span>
              </div>
            </div>
            <span className="grammar-path-hero-arrow">→</span>
          </motion.button>
        </div>
      </motion.div>

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
          { id: 'advanced',     label: t('grammar.intermediate'), emoji: '⚡', locked: false },
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

              const rawGuide = topic.guide || topic.description || '';

              const cleanSnippet = rawGuide
                .replace(/#+\s*/g, '')
                .replace(/\*+/g, '')
                .replace(/💡\s*/g, '')
                .replace(/\n+/g, ' ')
                .trim();

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
                      {cleanSnippet.slice(0, 90) + (cleanSnippet.length > 90 ? '…' : '')}
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
