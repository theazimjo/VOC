import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { grammarData } from '../../data/grammarData';
import { russianGrammarData } from '../../data/russianGrammarData';
import { sicilianGrammarData } from '../../data/sicilianGrammarData';
import { useGrammarStats } from '../../hooks/useGrammarStats';
import { getExerciseType } from '../../utils/grammarHelpers';
import { useLanguage } from '../../contexts/LanguageContext';
import IosSpinner from '../../components/common/IosSpinner';
import './GrammarExercises.css';

export default function GrammarExercises() {
  const { level = 'beginner', topicId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { stats: grammarStats, loading } = useGrammarStats();

  const topic = grammarData[level]?.topics?.find((t) => t.id === topicId) ||
                russianGrammarData[level]?.topics?.find((t) => t.id === topicId) ||
                sicilianGrammarData[level]?.topics?.find((t) => t.id === topicId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="grammar-exercises-page loading">
        <IosSpinner size={36} />
        <p>Loading...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="grammar-exercises-page error">
        <h2>{t('grammar.topicNotFound')}</h2>
        <button className="btn btn-primary" onClick={() => navigate('/grammar')}>
          {t('grammar.backToGrammar')}
        </button>
      </div>
    );
  }

  // Get topic stats
  const topicStats = grammarStats?.topics?.[topicId];
  const exercisesData = topicStats?.exercises || {};
  const TOTAL_EXERCISES = 6;

  const handleExerciseClick = (exId) => {
    navigate(`/grammar/${level}/${topicId}/${exId}`);
  };

  const getLevelLabel = () => {
    if (level === 'beginner') return t('grammar.beginner');
    if (level === 'intermediate') return t('grammar.elementary');
    return t('grammar.intermediate');
  };

  const completedCount = Object.keys(exercisesData).length;
  const progressPercent = Math.round((completedCount / TOTAL_EXERCISES) * 100);

  return (
    <div className="grammar-exercises-page">
      {/* Header */}
      <div className="exercises-header">
        <button className="header-back-btn" onClick={() => navigate('/grammar')} title="Back">
          ←
        </button>
        <div className="header-title-wrapper">
          <span className="header-category">{t('grammar.mixedCategory', { level: getLevelLabel() })}</span>
          <h1 className="header-topic-title">{topic.title}</h1>
        </div>

      </div>

      {/* Exercises Timeline */}
      <div className="exercises-timeline-container">
        {/* Study guide entry point */}
        <button
          className="guide-entry-card"
          onClick={() => navigate(`/grammar/${level}/${topicId}/guide`)}
        >
          <span className="guide-entry-icon">📖</span>
          <div className="guide-entry-text">
            <span className="guide-entry-title">{t('grammar.studyGuide')}</span>
            <span className="guide-entry-desc">{t('grammar.studyGuideDesc')}</span>
          </div>
          <span className="guide-entry-chevron">→</span>
        </button>

        {/* Progress summary card */}
        <div className="exercises-progress-card">
          <div className="progress-card-info">
            <span className="progress-card-label">{t('grammar.topicMastery')}</span>
            <span className="progress-card-value">
              {t('grammar.masteryCompleted', { completed: completedCount, total: TOTAL_EXERCISES, percent: progressPercent })}
            </span>
          </div>
          <div className="progress-card-bar-bg">
            <div 
              className="progress-card-bar-fill" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-line" />
          
          <div className="exercises-list">
            {Array.from({ length: TOTAL_EXERCISES }, (_, i) => {
              const exId = i + 1;
              const exType = getExerciseType(exId, t);
              const exStats = exercisesData[exId];
              const isCompleted = !!exStats;
              
              const pct = isCompleted && exStats.totalQuestions > 0
                ? Math.round((exStats.bestScore / exStats.totalQuestions) * 100)
                : 0;

              let cardClass = 'exercise-item-card';
              if (isCompleted) cardClass += ' completed';

              return (
                <motion.div
                  key={exId}
                  className={cardClass}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleExerciseClick(exId)}
                >
                  {/* Timeline Circle */}
                  <div className="timeline-circle-container">
                    {isCompleted ? (
                      <div className="progress-ring-wrapper">
                        <svg className="progress-ring-svg" viewBox="0 0 36 36">
                          <path
                            className="progress-ring-bg"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="progress-ring-fill"
                            strokeDasharray={`${pct}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            style={{
                              stroke: pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--error)'
                            }}
                          />
                        </svg>
                        <div className="circle-inner-text">
                          <span className="ex-icon">{exType.icon}</span>
                          <span className="percent">{pct}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="circle-placeholder">
                        {exType.icon}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="exercise-card-details">
                    <div className="exercise-type-badge">
                      {t('grammar.exerciseTitle', { id: exId })}
                    </div>
                    <h3 className="exercise-title">{exType.name}</h3>

                    <div className="exercise-meta-row">
                      <span className="meta-item questions-count">
                        {t('grammar.questions20')}
                      </span>
                      
                      {isCompleted && (
                        <div className="scores-row">
                          <span className="score-correct-count">
                            🟢 {exStats.bestScore}
                          </span>
                          <span className="score-wrong-count">
                            🔴 {exStats.totalQuestions - exStats.bestScore}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right status */}
                  <span className="card-chevron">→</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
