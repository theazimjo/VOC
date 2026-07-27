/**
 * 📊 MemoryInsights
 *
 * Shows the forgetting curve + memory health for every enrolled word.
 * Uses an inline SVG path drawn from the P(t) = e^(-t/S) formula.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Brain } from 'lucide-react';
import { getForgettingCurvePoints, getMemoryHealth, computeRecallProbability, isDue, computeCategoryMastery, computeInitialStability } from '../memoryEngine';
import { classifyWord } from '../semanticClassifier';

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
  const { wordData, lastReview, nextOptimalReview, recallHistory } = memory;
  if (!wordData) return null;

  const stability = Number(memory.stability) || 1.0;
  const difficulty = Number(memory.difficulty) || 0.5;
  const totalReviews = Number(memory.totalReviews) || 0;

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

  // Overall summary metrics
  const now = Date.now();
  const summary = useMemo(() => {
    if (entries.length === 0) return null;

    let strong = 0;   // S >= 10
    let medium = 0;   // 5 <= S < 10
    let weak = 0;     // S < 5 && totalReviews > 0
    let unreviewed = 0; // totalReviews === 0
    let totalP = 0;
    let totalS = 0;

    entries.forEach(m => {
      const stab = Number(m.stability) || 1.0;
      const reviews = Number(m.totalReviews) || 0;
      const daysSince = m.lastReview ? (now - new Date(m.lastReview).getTime()) / 86400000 : 0;
      const p = computeRecallProbability(stab, daysSince);
      totalP += (isNaN(p) ? 0 : p);
      totalS += stab;

      if (reviews === 0 || !m.lastReview) unreviewed++;
      else if (stab >= 10) strong++;
      else if (stab >= 5) medium++;
      else weak++;
    });

    const avgRetention = entries.length > 0 ? Math.round((totalP / entries.length) * 100) : 0;
    const rawAvgS = entries.length > 0 ? totalS / entries.length : 1.0;
    const avgStability = isNaN(rawAvgS) ? 1.0 : Math.max(0.5, rawAvgS);

    return {
      total: entries.length,
      strong,
      medium,
      weak,
      unreviewed,
      avgRetention: isNaN(avgRetention) ? 0 : avgRetention,
      avgStability,
    };
  }, [entries, now]);

  // Automatic Semantic & Linguistic Clusters Breakdown
  const semanticClusters = useMemo(() => {
    const clusterMap = {};
    entries.forEach(m => {
      const word = m.wordData?.word || '';
      const translation = m.wordData?.translation || '';
      const packName = m.wordData?.packName || '';

      const { key, name, icon } = classifyWord(word, translation, packName);

      if (!clusterMap[key]) {
        clusterMap[key] = { key, name, icon, memories: [] };
      }
      clusterMap[key].memories.push(m);
    });

    return Object.values(clusterMap).map(cluster => {
      const { mastery, avgStability, accuracyRate } = computeCategoryMastery(cluster.memories);
      const s0 = computeInitialStability(mastery);
      return {
        ...cluster,
        count: cluster.memories.length,
        mastery: Number(mastery) || 0,
        avgStability: Number(avgStability) || 1.0,
        accuracyRate: Number(accuracyRate) || 0.5,
        initialStability: Number(s0) || 1.0,
      };
    }).sort((a, b) => b.count - a.count);
  }, [entries]);

  const filtered = useMemo(() => {
    let list = entries;

    if (filter === 'due') list = list.filter(m => isDue(m.nextOptimalReview));
    else if (filter === 'strong') list = list.filter(m => m.stability >= 10);
    else if (filter === 'weak') list = list.filter(m => m.stability < 5 && m.totalReviews > 0);

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

      {/* Overall Memory Health Card */}
      {summary && (
        <div className="mem-overall-card">
          <div className="mem-overall-header">
            <div>
              <div className="mem-overall-title">🧠 Umumiy Xotira Holati</div>
              <div className="mem-overall-sub">Barcha {summary.total} ta so'zning eslab qolish dinamikasi</div>
            </div>
            <div className="mem-retention-badge" title="O'rtacha eslab qolish kuchi">
              <span className="mem-retention-num">{summary.avgRetention}%</span>
              <span className="mem-retention-lbl">Xotira kuchi</span>
            </div>
          </div>

          {/* Distribution bar */}
          <div className="mem-overall-bar">
            {summary.strong > 0 && (
              <div
                className="mem-bar-seg strong"
                style={{ width: `${(summary.strong / summary.total) * 100}%` }}
                title={`Kuchli: ${summary.strong} ta`}
              />
            )}
            {summary.medium > 0 && (
              <div
                className="mem-bar-seg medium"
                style={{ width: `${(summary.medium / summary.total) * 100}%` }}
                title={`O'rtacha: ${summary.medium} ta`}
              />
            )}
            {summary.weak > 0 && (
              <div
                className="mem-bar-seg weak"
                style={{ width: `${(summary.weak / summary.total) * 100}%` }}
                title={`Zaif: ${summary.weak} ta`}
              />
            )}
            {summary.unreviewed > 0 && (
              <div
                className="mem-bar-seg new"
                style={{ width: `${(summary.unreviewed / summary.total) * 100}%` }}
                title={`Yangi: ${summary.unreviewed} ta`}
              />
            )}
          </div>

          {/* Legend pills */}
          <div className="mem-overall-legend">
            <div className="mem-legend-pill">
              <div className="mem-leg-dot strong" />
              <span>💪 Kuchli: <strong>{summary.strong}</strong></span>
            </div>
            <div className="mem-legend-pill">
              <div className="mem-leg-dot medium" />
              <span>⭐ O'rtacha: <strong>{summary.medium}</strong></span>
            </div>
            <div className="mem-legend-pill">
              <div className="mem-leg-dot weak" />
              <span>🌱 Zaif: <strong>{summary.weak}</strong></span>
            </div>
            <div className="mem-legend-pill">
              <div className="mem-leg-dot new" />
              <span>🆕 Yangi: <strong>{summary.unreviewed}</strong></span>
            </div>
          </div>

          {/* Overall Forgetting Curve Graph */}
          <div className="mem-curve-container" style={{ marginTop: '0.25rem' }}>
            <div className="mem-curve-label" style={{ fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>📉 Umumiy Unutish Dinamikasi (P = e⁻ᵗ/ˢ)</span>
              <span>O'rtacha S = {summary.avgStability.toFixed(1)}d</span>
            </div>
            <ForgettingCurve stability={summary.avgStability} />
            <div className="mem-curve-legend">
              <span style={{ color: 'var(--success)' }}>— 75% optimal takrorlash chegarasi</span>
            </div>
          </div>
        </div>
      )}

      {/* Semantic Clusters & Context Transfer Section */}
      {semanticClusters.length > 0 && (
        <div className="mem-semantic-card">
          <div className="mem-semantic-header">
            <div>
              <div className="mem-semantic-title">🧬 Semantik Klasterlar & Kontekstual Transfer</div>
              <div className="mem-semantic-sub">Mavzu va to'plamlar bo'yicha xotira modeli moslashishi</div>
            </div>
            <span className="mem-sem-badge">Context-Aware AI</span>
          </div>

          <div className="mem-semantic-list">
            {semanticClusters.map(c => (
              <div key={c.name} className="mem-semantic-item">
                <div className="mem-sem-left">
                  <span className="mem-sem-icon">{c.icon}</span>
                  <div>
                    <div className="mem-sem-name">{c.name}</div>
                    <div className="mem-sem-meta">{c.count} ta so'z · O'rtacha S = {c.avgStability}d</div>
                  </div>
                </div>
                <div className="mem-sem-right">
                  <div className="mem-sem-mastery">{(c.mastery * 100).toFixed(0)}% bilish</div>
                  <div className="mem-sem-boost" title="Yangi so'zlar uchun boshlang'ich barqarorlik">
                    ⚡ Yangi so'z S₀ = {c.initialStability}d
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
