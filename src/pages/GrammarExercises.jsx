import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { grammarData, germanGrammarData } from '../data/grammarData';
import { useGrammarStats } from '../hooks/useGrammarStats';
import { getExerciseType } from '../utils/grammarHelpers';
import './GrammarExercises.css';

export default function GrammarExercises() {
  const { level = 'beginner', topicId } = useParams();
  const navigate = useNavigate();
  const { stats: grammarStats, loading } = useGrammarStats();

  const lang = localStorage.getItem('grammar_language') || 'en';
  const currentData = lang === 'en' ? grammarData : germanGrammarData;

  const levelData = currentData[level];
  const topic = levelData?.topics?.find((t) => t.id === topicId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="grammar-exercises-page loading">
        <div className="loading-spinner" />
        <p>Yuklanmoqda...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="grammar-exercises-page error">
        <h2>Mavzu topilmadi</h2>
        <button className="btn btn-primary" onClick={() => navigate('/grammar')}>
          ← Grammatikaga qaytish
        </button>
      </div>
    );
  }

  // Get topic stats
  const topicStats = grammarStats?.topics?.[topicId];
  const exercisesData = topicStats?.exercises || {};

  // Find active exercise (first uncompleted one, defaults to 1)
  const TOTAL_EXERCISES = 6;
  let activeExerciseId = 1;
  for (let i = 1; i <= TOTAL_EXERCISES; i++) {
    if (!exercisesData[i]) {
      activeExerciseId = i;
      break;
    }
  }
  const allCompleted = Object.keys(exercisesData).length >= TOTAL_EXERCISES;
  if (allCompleted) {
    activeExerciseId = TOTAL_EXERCISES + 1;
  }

  const handleExerciseClick = (exId) => {
    navigate(`/grammar/${level}/${topicId}/${exId}`);
  };

  const getLevelLabel = () => {
    if (level === 'beginner') return lang === 'en' ? 'Elementary' : 'Anfänger';
    if (level === 'intermediate') return lang === 'en' ? 'Intermediate' : 'Mittelstufe';
    return lang === 'en' ? 'Advanced' : 'Fortgeschrittene';
  };

  const completedCount = Object.keys(exercisesData).length;
  const progressPercent = Math.round((completedCount / TOTAL_EXERCISES) * 100);

  return (
    <div className="grammar-exercises-page">
      {/* Header */}
      <div className="exercises-header">
        <button className="header-back-btn" onClick={() => navigate('/grammar')} title="Orqaga">
          ←
        </button>
        <div className="header-title-wrapper">
          <span className="header-category">MIXED: {getLevelLabel()}</span>
          <h1 className="header-topic-title">{topic.title}</h1>
        </div>
        <div className="header-actions">
          <button className="header-icon-btn" title="Ulashish">🔗</button>
          <button className="header-icon-btn" title="Batafsil">⋮</button>
        </div>
      </div>

      {/* Exercises Timeline */}
      <div className="exercises-timeline-container">
        {/* Progress summary card */}
        <div className="exercises-progress-card">
          <div className="progress-card-info">
            <span className="progress-card-label">Mavzu o'zlashtirilishi</span>
            <span className="progress-card-value">
              {completedCount} / {TOTAL_EXERCISES} yechildi ({progressPercent}%)
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
              const exType = getExerciseType(exId);
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
                      MASHQ {exId}
                    </div>
                    <h3 className="exercise-title">{exType.name}</h3>
                    
                    <div className="exercise-meta-row">
                      <span className="meta-item questions-count">
                        📄 20 savol
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
