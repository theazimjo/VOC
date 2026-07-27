/**
 * 📊 MemoryInsights
 *
 * Shows the forgetting curve + memory health for every enrolled word.
 * Uses an inline SVG path drawn from the P(t) = e^(-t/S) formula.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Brain } from 'lucide-react';
import { getForgettingCurvePoints, getMemoryHealth, computeRecallProbability, isDue } from '../memoryEngine';

// ─── Forgetting Curve SVG ─────────────────────────────────────────────────────

function ForgettingCurve({ stability, width = 280, height = 100 }) {
  const MAX_DAYS = 30;

  // Generate SVG path from continuous curve
  const pathD = useMemo(() => {
    const pts = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * MAX_DAYS;
      const p = computeRecallProbability(stability, t);
      const x = (t / MAX_DAYS) * width;
      const y = height - p * height; // flip y-axis
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [stability, width, height]);

  // Area fill path
  const areaD = pathD + ` L${width},${height} L0,${height} Z`;

  // Checkpoint dots
  const checkpoints = getForgettingCurvePoints(stability);
  const dots = checkpoints.map(cp => ({
    ...cp,
    cx: (cp.days / MAX_DAYS) * width,
    cy: height - cp.probability * height,
  }));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1.0].map(p => (
        <line
          key={p}
          x1={0} y1={height - p * height}
          x2={width} y2={height - p * height}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth={1}
        />
      ))}

      {/* Gradient area fill */}
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#curveGrad)" />

      {/* Curve line */}
      <path
        d={pathD}
        fill="none"
        stroke="var(--accent-1)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Target recall threshold (75%) */}
      <line
        x1={0} y1={height - 0.75 * height}
        x2={width} y2={height - 0.75 * height}
        stroke="var(--success)"
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.7}
      />

      {/* Checkpoint dots */}
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r={3.5}
          fill={
            d.probability >= 0.75 ? 'var(--success)'
            : d.probability >= 0.5 ? 'var(--warning)'
            : 'var(--error)'
          }
          stroke="var(--bg-secondary)"
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
}

// ─── Word Insight Card ────────────────────────────────────────────────────────

function WordInsightCard({ memory }) {
  const [expanded, setExpanded] = useState(false);
  const { wordData, stability, difficulty, totalReviews, lastReview, nextOptimalReview, recallHistory } = memory;
  if (!wordData) return null;

  const health = getMemoryHealth(stability, nextOptimalReview);
  const due = isDue(nextOptimalReview);
  const checkpoints = getForgettingCurvePoints(stability);

  const daysSinceLast = lastReview
    ? Math.round((Date.now() - new Date(lastReview).getTime()) / (86400 * 1000))
    : null;

  const daysUntilNext = nextOptimalReview && !due
    ? Math.max(0, Math.round((new Date(nextOptimalReview) - Date.now()) / (86400 * 1000)))
    : null;

  return (
    <motion.div
      className={`mem-insight-card ${due ? 'due' : ''}`}
      layout
      onClick={() => setExpanded(e => !e)}
    >
      {/* Card header */}
      <div className="mem-insight-header">
        <div className="mem-insight-word-group">
          <span className="mem-insight-word">{wordData.word}</span>
          <span className="mem-insight-translation">{wordData.translation}</span>
        </div>
        <div className="mem-insight-meta">
          <span className="mem-health-badge" style={{ color: health.color }}>
            {health.icon} {health.label}
          </span>
          {due && <span className="mem-due-badge">Bugun takrorlash</span>}
          <span className="mem-expand-arrow" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
        </div>
      </div>

      {/* Key metrics (always visible) */}
      <div className="mem-insight-metrics">
        <div className="mem-metric">
          <Brain size={12} />
          <span>S = {stability.toFixed(1)} kun</span>
        </div>
        <div className="mem-metric">
          <TrendingDown size={12} />
          <span>Qiyinlik: {Math.round(difficulty * 100)}%</span>
        </div>
        <div className="mem-metric">
          <Clock size={12} />
          <span>{totalReviews} marta tekshirildi</span>
        </div>
        {daysUntilNext !== null && (
          <div className="mem-metric">
            <TrendingUp size={12} />
            <span>{daysUntilNext} kundan keyin</span>
          </div>
        )}
      </div>

      {/* Expandable: forgetting curve + checkpoint table */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="mem-insight-expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mem-curve-container">
              <div className="mem-curve-label">Unutish egri chizig'i (P = e⁻ᵗ/ˢ)</div>
              <ForgettingCurve stability={stability} />
              <div className="mem-curve-legend">
                <span style={{ color: 'var(--success)' }}>— 75% maqsad</span>
              </div>
            </div>

            <div className="mem-checkpoint-table">
              {checkpoints.map(cp => (
                <div key={cp.label} className="mem-checkpoint-row">
                  <span className="mem-cp-label">{cp.label}</span>
                  <div className="mem-cp-bar-wrap">
                    <div
                      className="mem-cp-bar"
                      style={{
                        width: `${cp.probability * 100}%`,
                        background: cp.probability >= 0.75
                          ? 'var(--success)'
                          : cp.probability >= 0.5
                          ? 'var(--warning)'
                          : 'var(--error)',
                      }}
                    />
                  </div>
                  <span className="mem-cp-pct">
                    {Math.round(cp.probability * 100)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Recent history */}
            {recallHistory && recallHistory.length > 0 && (
              <div className="mem-history-strip">
                <div className="mem-history-label">So'nggi natijalар</div>
                <div className="mem-history-dots">
                  {recallHistory.slice(-12).map((h, i) => (
                    <div
                      key={i}
                      className={`mem-history-dot ${h.result ? 'correct' : 'wrong'}`}
                      title={`${h.result ? '✓' : '✗'} | ${h.responseTime}s | Ishonch: ${h.confidence}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MemoryInsights({ memoryMap }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'due' | 'strong' | 'weak'
  const [search, setSearch] = useState('');

  const entries = Object.values(memoryMap).filter(m => m.wordData);

  const filtered = useMemo(() => {
    let list = entries;

    if (filter === 'due') list = list.filter(m => isDue(m.nextOptimalReview));
    else if (filter === 'strong') list = list.filter(m => m.stability >= 10);
    else if (filter === 'weak') list = list.filter(m => m.stability < 3 && m.totalReviews > 0);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.wordData?.word?.toLowerCase().includes(q) ||
        m.wordData?.translation?.toLowerCase().includes(q)
      );
    }

    // Sort: due first, then by stability asc
    return list.sort((a, b) => {
      const aDue = isDue(a.nextOptimalReview) ? 0 : 1;
      const bDue = isDue(b.nextOptimalReview) ? 0 : 1;
      if (aDue !== bDue) return aDue - bDue;
      return a.stability - b.stability;
    });
  }, [entries, filter, search]);

  if (entries.length === 0) {
    return (
      <div className="mem-empty-state">
        <div className="mem-empty-icon">🧠</div>
        <h3>Hali birorta so'z tekshirilmagan</h3>
        <p>Birinchi sessiyani boshlang va xotira tahlili shu yerda paydo bo'ladi.</p>
      </div>
    );
  }

  return (
    <div className="mem-insights">
      {/* Search + Filter bar */}
      <div className="mem-insights-toolbar">
        <input
          className="mem-search-input"
          type="text"
          placeholder="So'z qidirish..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="mem-filter-tabs">
          {[
            { key: 'all', label: 'Barchasi' },
            { key: 'due', label: '⏰ Bugun' },
            { key: 'weak', label: '🌱 Zaif' },
            { key: 'strong', label: '💪 Kuchli' },
          ].map(f => (
            <button
              key={f.key}
              className={`mem-filter-tab ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mem-count-label">{filtered.length} ta so'z</div>

      <div className="mem-insight-list">
        {filtered.map(memory => (
          <WordInsightCard key={memory.wordId} memory={memory} />
        ))}
      </div>
    </div>
  );
}
