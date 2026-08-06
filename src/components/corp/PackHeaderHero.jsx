import React from 'react';
import { BookOpen, Layers, Type, CheckCircle2, Pencil } from 'lucide-react';
import './PackHeaderHero.css';

export default function PackHeaderHero({
  title,
  subtitle,
  tag = "Question bank",
  icon = <BookOpen size={22} />,
  setCount = 0,
  wordCount = 0,
  masteredCount = 0,
  masteryPct = 0,
  metrics = null,
}) {
  const overallMasteryPct = masteryPct;

  // Custom metric tiles (e.g. dashboard "due today" stats) override the
  // default Sets/Words pair used by the pack browsing screens.
  const metricItems = metrics || [
    { icon: <Layers size={16} />, label: 'SETS', value: setCount, color: 'blue' },
    { icon: <Type size={16} />, label: 'WORDS', value: wordCount, color: 'purple' },
  ];

  // SVG ring calculations
  const size = 46;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallMasteryPct / 100) * circumference;

  return (
    <div className="pack-header-hero">
      {/* Top Banner Row */}
      <div className="hero-top-row">
        <div className="hero-left-content">
          <div className="hero-icon-box">{icon}</div>

          <div className="hero-text-block">
            {tag && <span className="hero-tag-badge">{tag}</span>}
            <h1 className="hero-title" title={title}>{title}</h1>
            {subtitle && <p className="hero-subtitle" title={subtitle}>{subtitle}</p>}
          </div>
        </div>

        {/* Top Right Percentage Ring Badge */}
        <div className="hero-badge-circle" title={`${overallMasteryPct}% mastered`}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="hero-ring-svg">
            <circle
              className="hero-ring-bg"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className="hero-ring-fill"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className="hero-badge-text">{overallMasteryPct}%</span>
        </div>
      </div>

      {/* Bottom Metric Cards Row */}
      <div className="hero-metrics-grid" style={{ gridTemplateColumns: `repeat(${metricItems.length}, 1fr)` }}>
        {metricItems.map((m, i) => {
          const Tag = m.onClick ? 'button' : 'div';
          return (
            <Tag
              className={`hero-metric-card ${m.onClick ? 'hero-metric-editable' : ''}`}
              key={i}
              type={m.onClick ? 'button' : undefined}
              onClick={m.onClick}
            >
              <div className={`metric-icon-box ${m.color || 'blue'}`}>{m.icon}</div>
              <div className="metric-info">
                <span className="metric-label">{m.label}</span>
                <span className="metric-val">{m.value}</span>
              </div>
              {m.onClick && <span className="hero-metric-edit-badge"><Pencil size={9} strokeWidth={2.5} /></span>}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
