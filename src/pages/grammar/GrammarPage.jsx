import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarData } from '../../data/grammarData';
import { russianGrammarData } from '../../data/russianGrammarData';
import { sicilianGrammarData } from '../../data/sicilianGrammarData';
import { russianGuidesData } from '../../data/russianGuidesData';
import { useGrammarStats } from '../../hooks/useGrammarStats';
import { useLanguage } from '../../contexts/LanguageContext';
import './GrammarPage.css';
import './GeneralGrammarTest.css';

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

// Each grammar track is a fully separate curriculum (own topic ids, own
// language of instruction) so it must never be blended with another track's
// topics or progress stats. Topic ids are namespaced per track (ru-/scn-,
// English has no prefix) — that prefix is also how stats below are isolated.
const GRAMMAR_TRACKS = {
  en: { data: grammarData, prefix: null, label: '🇬🇧 English', icon: '🇬🇧' },
  ru: { data: russianGrammarData, prefix: 'ru-', label: '🇷🇺 Rus tili', icon: '🇷🇺' },
  scn: { data: sicilianGrammarData, prefix: 'scn-', label: '🌋 Sitsiliya', icon: '🌋' },
};

export default function GrammarPage() {
  const navigate = useNavigate();
  const { t, language: appLang } = useLanguage();
  const [activeLevel, setActiveLevelState] = useState(() => {
    return localStorage.getItem('grammar_level') || 'beginner';
  });
  const [activeTrack, setActiveTrackState] = useState(() => {
    const saved = localStorage.getItem('grammar_track');
    return GRAMMAR_TRACKS[saved] ? saved : 'en';
  });
  const { stats: grammarStats } = useGrammarStats();

  const setActiveLevel = (level) => {
    setActiveLevelState(level);
    localStorage.setItem('grammar_level', level);
  };

  const setActiveTrack = (track) => {
    setActiveTrackState(track);
    localStorage.setItem('grammar_track', track);
  };

  const topics = GRAMMAR_TRACKS[activeTrack].data[activeLevel]?.topics ?? [];
  const trackPrefix = GRAMMAR_TRACKS[activeTrack].prefix;

  // Only count stats that belong to the currently selected track — a topicId's
  // prefix (or lack of one) tells us which track it came from, so English
  // progress never bleeds into Sicilian's numbers or vice versa.
  const belongsToActiveTrack = (topicId) => {
    if (topicId.startsWith('de-')) return false;
    if (trackPrefix) return topicId.startsWith(trackPrefix);
    return !topicId.startsWith('ru-') && !topicId.startsWith('scn-');
  };

  const completedTopicsOfLevel = Object.entries(grammarStats?.topics || {})
    .filter(([topicId, t]) => t.level === activeLevel && belongsToActiveTrack(topicId))
    .map(([_, t]) => t);

  let completedExercisesCount = 0;
  completedTopicsOfLevel.forEach((t) => {
    if (t.exercises) {
      completedExercisesCount += Object.keys(t.exercises).length;
    } else {
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
      {/* Main Header / Overview Card */}
      <motion.div
        className="grammar-header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grammar-header-top-row">
          <div className="grammar-header-titles-left">
            <div className="grammar-header-icon">📖</div>
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

      {/* Track Tabs (which grammar curriculum — never blended together) */}
      <motion.div
        className="grammar-level-tabs grammar-track-tabs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        {Object.entries(GRAMMAR_TRACKS).map(([id, track]) => (
          <button
            key={id}
            className={['grammar-level-tab', activeTrack === id ? 'active' : ''].filter(Boolean).join(' ')}
            onClick={() => setActiveTrack(id)}
            title={track.label}
          >
            {activeTrack === id && (
              <motion.div
                className="grammar-tab-pill"
                layoutId="grammarTrackPill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="tab-emoji">{track.icon}</span>
            <span className="tab-label-text">{track.label.replace(/^\S+\s/, '')}</span>
          </button>
        ))}
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

      {/* Sequential "0 dan" Duolingo-style grammar path (English track only) */}
      {activeTrack === 'en' && (
        <motion.button
          className="ggt-entry-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.14 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/grammar/path')}
        >
          <span className="ggt-entry-icon">🧗</span>
          <span className="ggt-entry-text">
            <span className="ggt-entry-title">{t('grammar.pathTitle')}</span>
            <span className="ggt-entry-desc">{t('grammar.pathEntryDesc')}</span>
          </span>
          <span className="ggt-entry-chevron">→</span>
        </motion.button>
      )}

      {/* General mixed test entry (English track, beginner content) */}
      {activeTrack === 'en' && (
        <motion.button
          className="ggt-entry-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => navigate('/grammar/general-test')}
        >
          <span className="ggt-entry-icon">🧠</span>
          <span className="ggt-entry-text">
            <span className="ggt-entry-title">{t('grammar.generalTestTitle')}</span>
            <span className="ggt-entry-desc">{t('grammar.generalTestEntryDesc')}</span>
          </span>
          <span className="ggt-entry-chevron">→</span>
        </motion.button>
      )}

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

              const manualGuideLang = localStorage.getItem('grammar_guide_manual_lang');
              const activeGuideLang = (manualGuideLang === 'uz' || manualGuideLang === 'ru')
                ? manualGuideLang
                : (appLang === 'ru' ? 'ru' : 'uz');
              const rawGuide = (activeGuideLang === 'ru' && russianGuidesData[topic.id])
                ? russianGuidesData[topic.id]
                : (topic.guide || topic.description || '');

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
