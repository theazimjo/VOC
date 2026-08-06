import React from 'react';
import { motion } from 'framer-motion';
import { Type, ChevronRight, BookOpen } from 'lucide-react';
import './SatPackCard.css';

export default function SatPackCard({
  title,
  subtitle,
  icon = <BookOpen size={18} className="sat-card-icon-svg" />,
  setCount,
  setLabel = "sets",
  wordCount = 0,
  wordLabel = "words",
  masteredCount = 0,
  learningCount = 0,
  newCount = 0,
  masteryPct = 0,
  onClick,
  disabled = false,
}) {
  const total = (masteredCount + learningCount + newCount) || wordCount || 1;
  const masteredPct = Math.min(100, Math.round((masteredCount / total) * 100));

  const displayPct = (masteryPct !== undefined && masteryPct !== null)
    ? masteryPct
    : Math.round((masteredCount / total) * 100);

  const activeMasteryPct = Math.max(0, Math.min(100 - masteredPct, displayPct - masteredPct));
  const unmasteredPct = Math.max(0, 100 - (masteredPct + activeMasteryPct));

  const size = 32;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayPct / 100) * circumference;

  return (
    <motion.div
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.99 } : {}}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      onClick={!disabled ? onClick : undefined}
      className={`sat-pack-card ${disabled ? 'disabled' : ''}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      <div className="sat-card-header">
        <div className="sat-card-icon-wrapper">{icon}</div>

        <div className="sat-card-main">
          <h3 className="sat-card-title" title={title}>{title}</h3>
          {subtitle && <p className="sat-card-subtitle" title={subtitle}>{subtitle}</p>}
        </div>

        <div className="sat-card-badge-circle" title={`${displayPct}% progress`}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="sat-card-ring-svg">
            <circle className="sat-card-ring-bg" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
            <circle
              className="sat-card-ring-fill"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className="sat-card-badge-text">{displayPct}%</span>
        </div>
      </div>

      <div className="sat-card-progress-bar">
        <div className="sat-prog-seg sat-seg-mastered" style={{ width: `${masteredPct}%` }} title={`Mastered: ${masteredCount}`} />
        <div className="sat-prog-seg sat-seg-learning" style={{ width: `${activeMasteryPct}%` }} title={`Progress: ${displayPct}%`} />
        <div className="sat-prog-seg sat-seg-new" style={{ width: `${unmasteredPct}%` }} title={`Remaining: ${unmasteredPct}%`} />
      </div>

      <div className="sat-card-footer">
        <div className="sat-card-meta">
          {setCount !== undefined && setCount !== null && (
            <span className="sat-meta-item">{setCount} {setLabel}</span>
          )}
          <span className="sat-meta-item"><Type size={12} className="sat-pill-icon" /> {wordCount} {wordLabel}</span>
        </div>
        <ChevronRight size={16} className="sat-action-arrow" />
      </div>
    </motion.div>
  );
}
