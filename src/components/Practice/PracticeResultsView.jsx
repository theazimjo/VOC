import { motion } from 'framer-motion';
import { Sparkles, TrendingDown, Volume2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { speakWord } from '../../utils/helpers';
import './PracticeResultsView.css';

export default function PracticeResultsView({ results, wrongWords = [], onReset, language = 'en-US' }) {
  const { t } = useLanguage();

  if (!results) return null;

  const total = results.totalWords || 1;
  const correct = results.correctCount || 0;
  const incorrect = results.incorrectCount || 0;
  const ratio = total > 0 ? correct / total : 0;
  const accuracyPct = Math.round(ratio * 100);
  const isPerfect = (incorrect === 0 && correct > 0) || (correct === total && total > 0);

  const getResultTier = () => {
    if (isPerfect) {
      return {
        title: t('practice.perfectLesson') || 'Perfect lesson!',
        subtitle: t('practice.takeABow') || 'Take a bow!',
        color: 'var(--accent-1)',
        isPerfect: true
      };
    }
    if (ratio >= 0.8) {
      return {
        title: t('practice.greatJob') || 'Great job!',
        subtitle: t('practice.practiceComplete') || 'Practice complete',
        color: 'var(--accent-3)',
        isPerfect: false
      };
    }
    if (ratio >= 0.5) {
      return {
        title: t('practice.goodJob') || 'Good job!',
        subtitle: t('practice.practiceComplete') || 'Practice complete',
        color: 'var(--accent-1)',
        isPerfect: false
      };
    }
    return {
      title: t('practice.keepGoing') || 'Keep going!',
      subtitle: t('practice.dontGiveUp') || "Don't give up!",
      color: 'var(--accent-2)',
      isPerfect: false
    };
  };

  const tier = getResultTier();

  return (
    <motion.div
      key="unified-practice-results"
      className="duo-results-fullscreen-wrapper"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="practice-results duo-results-card-container">
        <h1 className="duo-results-title" style={{ color: tier.color }}>
          {tier.title}
        </h1>
        <p className="duo-results-subtitle">
          {tier.subtitle}
        </p>

        {/* System 3D Stat Cards Grid */}
        <div className="duo-results-cards-row">
          {/* Card 1: TOTAL WORDS */}
          <div className="duo-stat-card card-purple">
            <div className="duo-stat-badge badge-purple">
              {t('practice.totalWordsBadge') || 'TOTAL WORDS'}
            </div>
            <div className="duo-stat-content content-purple">
              <span className="duo-stat-icon">⚡</span>
              <span className="duo-stat-value">{results.totalWords || 0}</span>
            </div>
          </div>

          {/* Card 2: TEZLIK / SPEED (Elapsed Time) */}
          <div className="duo-stat-card card-blue">
            <div className="duo-stat-badge badge-blue">
              {t('practice.speedBadge') || 'TEZLIK'}
            </div>
            <div className="duo-stat-content content-blue">
              <span className="duo-stat-icon">⏱</span>
              <span className="duo-stat-value">{results.durationFormatted || '0:15'}</span>
            </div>
          </div>

          {/* Card 3: ACCURACY / AMAZING */}
          <div className="duo-stat-card card-green">
            <div className="duo-stat-badge badge-green">
              {tier.isPerfect ? (t('practice.amazingBadge') || 'AMAZING') : (t('practice.accuracyBadge') || 'ACCURACY')}
            </div>
            <div className="duo-stat-content content-green">
              <span className="duo-stat-icon">🎯</span>
              <span className="duo-stat-value">{accuracyPct}%</span>
            </div>
          </div>
        </div>

        {/* Mistakes / weaknesses analysis */}
        {wrongWords && wrongWords.length > 0 ? (
          <div className="results-mistakes-container">
            <div className="results-mistakes-title">
              <TrendingDown size={14} strokeWidth={2.4} />
              {t('practice.recommendedReview')}
            </div>
            <div className="results-mistake-list">
              {wrongWords.map(word => (
                <div key={word.id || word.word} className="results-mistake-item">
                  <div className="results-mistake-info">
                    <span className="results-mistake-word">{word.word}</span>
                    <span className="results-mistake-translation">{word.translation}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-speak-mistake"
                    onClick={() => speakWord(word.word, language)}
                    title="Listen"
                  >
                    <Volume2 size={16} strokeWidth={2.3} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : tier.isPerfect ? (
          <div className="perfect-score-banner">
            <Sparkles size={16} strokeWidth={2.3} />
            {t('practice.perfectScore') || 'Perfect score! No mistakes at all.'}
          </div>
        ) : null}

        {/* Action Button inside card for Desktop */}
        <div className="duo-results-action-desktop">
          <button
            className="duo-btn duo-btn-results-continue"
            style={{ width: '100%', padding: '14px 24px' }}
            onClick={onReset}
          >
            {t('practice.backToMenu')?.toUpperCase() || 'BACK TO PRACTICE MENU'}
          </button>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile ONLY */}
      <div className="duo-results-bottom-bar-fixed duo-results-action-mobile">
        <button
          className="duo-btn duo-btn-results-continue"
          style={{ width: '100%', maxWidth: '440px', padding: '14px 24px' }}
          onClick={onReset}
        >
          {t('practice.backToMenu')?.toUpperCase() || 'BACK TO PRACTICE MENU'}
        </button>
      </div>
    </motion.div>
  );
}
