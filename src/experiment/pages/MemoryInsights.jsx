/**
 * 📊 MemoryInsights
 *
 * Shows the forgetting curve + memory health for every enrolled word.
 * Uses an inline SVG path drawn from the P(t) = e^(-t/S) formula.
 */

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Brain, Lightbulb, AlertTriangle, Stethoscope, Rocket } from 'lucide-react';
import { getForgettingCurvePoints, getMemoryHealth, computeRecallProbability, isDue, computeCategoryMastery, computeInitialStability, explainSchedulingDecision, simulateReviewDayOptions } from '../../utils/memoryEngine';
import { diagnoseForgetting, getConfusionPairsForWord } from '../../utils/forgettingAutopsy';
import { getWordCluster } from '../semanticClassifier';
import { useLanguage } from '../../contexts/LanguageContext';

const SIMULATOR_DAYS = [1, 3, 7, 14];

// ─── Forgetting Curve SVG ─────────────────────────────────────────────────────

function ForgettingCurve({ stability, daysSince = 0, width = 280, height = 100 }) {
  const MAX_DAYS = Math.max(30, Math.ceil(daysSince) + 10); // extend view if word is overdue

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
  }, [stability, width, height, MAX_DAYS]);

  // Area fill path
  const areaD = pathD + ` L${width},${height} L0,${height} Z`;

  // "Now" marker — where the user currently sits on the curve
  const nowX = Math.min((daysSince / MAX_DAYS) * width, width);
  const nowP = computeRecallProbability(stability, daysSince);
  const nowY = height - nowP * height;

  // Checkpoint dots (at t=0 and standard future offsets from now)
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

      {/* "You are here" vertical line */}
      {daysSince > 0 && (
        <line
          x1={nowX} y1={0}
          x2={nowX} y2={height}
          stroke="var(--text-muted)"
          strokeWidth={1}
          strokeDasharray="3 3"
          opacity={0.5}
        />
      )}

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

      {/* "Now" marker dot */}
      {daysSince > 0 && (
        <circle
          cx={nowX}
          cy={nowY}
          r={5}
          fill={
            nowP >= 0.75 ? 'var(--success)'
            : nowP >= 0.5 ? 'var(--warning)'
            : 'var(--error)'
          }
          stroke="white"
          strokeWidth={2}
        />
      )}
    </svg>
  );
}

// ─── Word Insight Card ────────────────────────────────────────────────────────

function WordInsightCard({ memory, confusionPairs }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [simulatorDay, setSimulatorDay] = useState(null);
  const { wordData, lastReview, nextOptimalReview, recallHistory } = memory;

  const stability = Number(memory.stability) || 1.0;

  // Forgetting Autopsy — only calculated when card is expanded to prevent UI lags
  const wordConfusionPairs = useMemo(
    () => (expanded ? getConfusionPairsForWord(memory.wordId, confusionPairs) : []),
    [expanded, memory.wordId, confusionPairs]
  );
  const autopsy = useMemo(
    () => (expanded ? diagnoseForgetting(memory, wordConfusionPairs) : { hasEnoughData: false, factors: [] }),
    [expanded, memory, wordConfusionPairs]
  );

  // Future Memory Simulator — only calculated when card is expanded
  const simulatorOptions = useMemo(
    () => (expanded ? simulateReviewDayOptions(stability, SIMULATOR_DAYS, 30) : []),
    [expanded, stability]
  );
  const activeSimulatorOption = simulatorOptions.find((o) => o.reviewDay === simulatorDay) || null;

  if (!wordData || !wordData.word || typeof wordData.word !== 'string' || !wordData.word.trim()) return null;

  const difficulty = Number(memory.difficulty) || 0.5;
  const totalReviews = Number(memory.totalReviews) || 0;

  // Days elapsed since last review — this shifts where "Now" sits on the forgetting curve.
  const daysSinceLastReview = lastReview
    ? Math.max(0, (Date.now() - new Date(lastReview).getTime()) / (24 * 60 * 60 * 1000))
    : 0;

  const health = getMemoryHealth(stability, nextOptimalReview);
  const getHealthLabel = () => {
    if (!nextOptimalReview) return t('memoryLab.healthNew');
    if (stability >= 20) return t('memoryLab.healthStrong');
    if (stability >= 10) return t('memoryLab.healthGood');
    if (stability >= 5)  return t('memoryLab.healthMedium');
    return t('memoryLab.healthWeak');
  };

  const due = isDue(nextOptimalReview);

  // Build time-aware checkpoints only when expanded
  const checkpoints = useMemo(() => {
    if (!expanded) return [];
    const futureOffsets = [
      { label: t('memoryLab.cpNow'), addDays: 0 },
      { label: `+1 ${t('memoryLab.day')}`, addDays: 1 },
      { label: `+3 ${t('memoryLab.days')}`, addDays: 3 },
      { label: `+7 ${t('memoryLab.days')}`, addDays: 7 },
      { label: `+14 ${t('memoryLab.days')}`, addDays: 14 },
      { label: `+30 ${t('memoryLab.days')}`, addDays: 30 },
    ];
    return futureOffsets.map(({ label, addDays }) => ({
      label,
      days: daysSinceLastReview + addDays,
      probability: computeRecallProbability(stability, daysSinceLastReview + addDays),
    }));
  }, [expanded, daysSinceLastReview, stability, t]);

  const explanation = useMemo(() => {
    if (!expanded) return '';
    if (!lastReview) return t('memoryLab.explainNotSeen');
    const daysSince = (Date.now() - new Date(lastReview).getTime()) / (86400 * 1000);
    const p = computeRecallProbability(stability, daysSince);
    const pct = Math.round(p * 100);
    if (p <= 0.75) {
      return t('memoryLab.explainDropped', { pct, targetPct: 75 });
    }
    const daysUntil = nextOptimalReview
      ? Math.min(70, Math.max(0, Math.round((new Date(nextOptimalReview) - Date.now()) / (86400 * 1000))))
      : null;
    let text = t('memoryLab.explainStrong', { pct });
    if (daysUntil !== null) {
      text += ' ' + t('memoryLab.explainNextReviewIn', { days: daysUntil });
    }
    return text;
  }, [expanded, stability, lastReview, nextOptimalReview, t]);

  const daysUntilNext = nextOptimalReview && !due
    ? Math.max(0, Math.round((new Date(nextOptimalReview) - Date.now()) / (86400 * 1000)))
    : null;

  return (
    <div
      className={`mem-insight-card ${due ? 'due' : ''}`}
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
            {health.icon} {getHealthLabel()}
          </span>
          {due && <span className="mem-due-badge">{t('memoryLab.reviewTodayBadge')}</span>}
          <span className="mem-expand-arrow" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
        </div>
      </div>

      {/* Key metrics (always visible) */}
      <div className="mem-insight-metrics">
        <div className="mem-metric">
          <Brain size={12} />
          <span>S = {stability.toFixed(1)} {t('memoryLab.days')}</span>
        </div>
        <div className="mem-metric">
          <TrendingDown size={12} />
          <span>{t('memoryLab.difficulty')}: {Math.round(difficulty * 100)}%</span>
        </div>
        <div className="mem-metric">
          <Clock size={12} />
          <span>{t('memoryLab.reviewedTimes', { count: totalReviews })}</span>
        </div>
        {daysUntilNext !== null && (
          <div className="mem-metric">
            <TrendingUp size={12} />
            <span>{t('memoryLab.inDays', { count: daysUntilNext })}</span>
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
              <div className="mem-curve-label">{t('memoryLab.curveFormula')}</div>
              <ForgettingCurve stability={stability} daysSince={daysSinceLastReview} />
              <div className="mem-curve-legend">
                <span style={{ color: 'var(--success)' }}>{t('memoryLab.target75')}</span>
                {daysSinceLastReview > 0.1 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                    {t('memoryLab.daysSinceLastReview', { days: Math.round(daysSinceLastReview) })}
                  </span>
                )}
              </div>
            </div>

            <div className="mem-explain-box">
              <Lightbulb size={14} />
              <span>{explanation}</span>
            </div>

            <div className="mem-checkpoint-table">
              {totalReviews === 0 ? (
                <div className="mem-explain-box" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {t('memoryLab.noReviewDataYet')}
                </div>
              ) : checkpoints.map(cp => (
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

            {/* Forgetting Autopsy — likely reasons behind the most recent forgetting event */}
            {autopsy.hasEnoughData && (
              <div className="mem-autopsy-box">
                <div className="mem-curve-label mem-section-title">
                  <Stethoscope size={13} /> {t('memoryLab.whyForgetTitle')}
                </div>
                <div className="mem-checkpoint-table">
                  {autopsy.factors.map((f) => {
                    let factorName = f.label;
                    if (f.key === 'confusion') factorName = t('memoryLab.factorConfusion');
                    else if (f.key === 'interval') factorName = t('memoryLab.factorInterval');
                    else if (f.key === 'confidence') factorName = t('memoryLab.factorConfidence');
                    else if (f.key === 'exposure') factorName = t('memoryLab.factorExposure');

                    return (
                      <div key={f.key} className="mem-checkpoint-row">
                        <span className="mem-cp-label mem-autopsy-label">{factorName}</span>
                        <div className="mem-cp-bar-wrap">
                          <div
                            className="mem-cp-bar"
                            style={{
                              width: `${Math.round(f.weight * 100)}%`,
                              background: f.key === autopsy.primaryCause ? 'var(--accent-1)' : 'var(--border-light)',
                            }}
                          />
                        </div>
                        <span className="mem-cp-pct">{Math.round(f.weight * 100)}%</span>
                      </div>
                    );
                  })}
                </div>
                {autopsy.recommendation && (
                  <div className="mem-explain-box" style={{ marginTop: '0.6rem' }}>
                    <Lightbulb size={14} />
                    <span>
                      {autopsy.primaryCause === 'confusion' ? (
                        <><strong>{t('memoryLab.recConfusionTitle')}.</strong> {t('memoryLab.recConfusionDesc', { word: wordData.word, partnerWord: autopsy.factors.find(f => f.key === 'confusion')?.detail?.partnerWord || '' })}</>
                      ) : autopsy.primaryCause === 'interval' ? (
                        <><strong>{t('memoryLab.recIntervalTitle')}.</strong> {t('memoryLab.recIntervalDesc')}</>
                      ) : autopsy.primaryCause === 'confidence' ? (
                        <><strong>{t('memoryLab.recConfidenceTitle')}.</strong> {t('memoryLab.recConfidenceDesc')}</>
                      ) : (
                        <><strong>{t('memoryLab.recExposureTitle')}.</strong> {t('memoryLab.recExposureDesc')}</>
                      )}
                    </span>
                  </div>
                )}
                <div className="mem-autopsy-disclaimer">
                  {t('memoryLab.autopsyDisclaimer')}
                </div>
              </div>
            )}

            {/* Future Memory Simulator — "what if I review on day X" comparison */}
            <div className="mem-simulator-box">
              <div className="mem-curve-label mem-section-title">
                <Rocket size={13} /> {t('memoryLab.futureMemoryTitle')}
              </div>
              <div className="mem-simulator-days">
                {simulatorOptions.map((opt) => (
                  <button
                    key={opt.reviewDay}
                    type="button"
                    className={`mem-sim-day-btn ${simulatorDay === opt.reviewDay ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSimulatorDay((prev) => (prev === opt.reviewDay ? null : opt.reviewDay));
                    }}
                  >
                    {t('memoryLab.dayNum', { day: opt.reviewDay })}
                  </button>
                ))}
              </div>
              <div className="mem-simulator-compare">
                <div className="mem-simulator-stat">
                  <span className="mem-simulator-stat-label">{t('memoryLab.withoutReview30')}</span>
                  <span className="mem-simulator-stat-value bad">
                    {Math.round((activeSimulatorOption ?? simulatorOptions[0]).withoutReview * 100)}%
                  </span>
                </div>
                {activeSimulatorOption && (
                  <div className="mem-simulator-stat">
                    <span className="mem-simulator-stat-label">{t('memoryLab.withReviewDay', { day: activeSimulatorOption.reviewDay })}</span>
                    <span className="mem-simulator-stat-value good">
                      {Math.round(activeSimulatorOption.withReview * 100)}%
                    </span>
                  </div>
                )}
              </div>
              {!activeSimulatorOption && (
                <div className="mem-simulator-note">{t('memoryLab.pickDayForecast')}</div>
              )}
            </div>

            {/* Recent history */}
            {recallHistory && recallHistory.length > 0 && (
              <div className="mem-history-strip">
                <div className="mem-history-label">{t('memoryLab.recentResultsLabel')}</div>
                <div className="mem-history-dots">
                  {recallHistory.slice(-12).map((h, i) => (
                    <div
                      key={i}
                      className={`mem-history-dot ${h.result ? 'correct' : 'wrong'}`}
                      title={`${h.result ? '✓' : '✗'} | ${h.responseTime}s | Confidence: ${h.confidence}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MemoryInsights({ memoryMap, confusionPairs = [], loading = false }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all'); // 'all' | 'due' | 'strong' | 'weak'
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(25);
  const [isPreparing, setIsPreparing] = useState(true);

  useEffect(() => {
    // Unblock initial paint frame so loading spinner renders instantly without black/dark gaps
    const timer = setTimeout(() => {
      setIsPreparing(false);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisibleCount(25);
  }, [filter, search]);

  const entries = useMemo(
    () => Object.values(memoryMap).filter(m => m.wordData && m.wordData.word && typeof m.wordData.word === 'string' && m.wordData.word.trim()),
    [memoryMap]
  );

  // Overall summary metrics
  const now = Date.now();
  const summary = useMemo(() => {
    if (isPreparing || loading || entries.length === 0) return null;

    let strong = 0;   // S >= 10
    let medium = 0;   // 5 <= S < 10
    let weak = 0;     // S < 5 && totalReviews > 0
    let unreviewed = 0; // totalReviews === 0
    let totalP = 0;
    let totalS = 0;

    entries.forEach(m => {
      const stab = Number(m.stability) || 1.0;
      const reviews = Number(m.totalReviews) || 0;
      totalS += stab;

      if (reviews === 0 || !m.lastReview) {
        // New/unreviewed — count for the legend but exclude from retention average.
        unreviewed++;
      } else {
        const daysSince = (now - new Date(m.lastReview).getTime()) / 86400000;
        const p = computeRecallProbability(stab, daysSince);
        totalP += (isNaN(p) ? 0 : p);

        if (stab >= 10) strong++;
        else if (stab >= 5) medium++;
        else weak++;
      }
    });

    // Divide by reviewed-only count: unreviewed words contribute P=1.0 (daysSince=0)
    // which would inflate the score — "Memory strength" should reflect actual retention
    // of words you've genuinely practiced, not new vocabulary you haven't touched yet.
    const reviewedCount = entries.length - unreviewed;
    const avgRetention = reviewedCount > 0 ? Math.round((totalP / reviewedCount) * 100) : 0;
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
  }, [entries, now, isPreparing, loading]);

  // Automatic Semantic & Linguistic Clusters Breakdown
  const semanticClusters = useMemo(() => {
    if (isPreparing || loading || entries.length === 0) return [];
    const clusterMap = {};
    entries.forEach(m => {
      const { key, name, icon } = getWordCluster(m.wordData);

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
  }, [entries, isPreparing, loading]);

  const filtered = useMemo(() => {
    if (isPreparing || loading || entries.length === 0) return [];
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
  }, [entries, filter, search, isPreparing, loading]);

  const visibleWords = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  if (loading || isPreparing) {
    return (
      <div className="mem-loading" style={{ padding: '4rem 1rem' }}>
        <div className="mem-spinner" />
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
          {t('memoryLab.insightsLoading')}
        </span>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="mem-empty-state">
        <div className="mem-empty-icon">🧠</div>
        <h3>{t('memoryLab.noWordsReviewedYet')}</h3>
        <p>{t('memoryLab.noWordsReviewedSub')}</p>
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
              <div className="mem-overall-title">{t('memoryLab.overallHealthTitle')}</div>
              <div className="mem-overall-sub">{t('memoryLab.overallHealthSub', { total: summary.total })}</div>
            </div>
            <div className="mem-retention-badge" title="Average recall strength">
              <span className="mem-retention-num">{summary.avgRetention}%</span>
              <span className="mem-retention-lbl">{t('memoryLab.memoryStrength')}</span>
            </div>
          </div>

          {/* Distribution bar */}
          <div className="mem-overall-bar">
            {summary.strong > 0 && (
              <div
                className="mem-bar-seg strong"
                style={{ width: `${(summary.strong / summary.total) * 100}%` }}
                title={`Strong: ${summary.strong}`}
              />
            )}
            {summary.medium > 0 && (
              <div
                className="mem-bar-seg medium"
                style={{ width: `${(summary.medium / summary.total) * 100}%` }}
                title={`Medium: ${summary.medium}`}
              />
            )}
            {summary.weak > 0 && (
              <div
                className="mem-bar-seg weak"
                style={{ width: `${(summary.weak / summary.total) * 100}%` }}
                title={`Weak: ${summary.weak}`}
              />
            )}
            {summary.unreviewed > 0 && (
              <div
                className="mem-bar-seg new"
                style={{ width: `${(summary.unreviewed / summary.total) * 100}%` }}
                title={`New: ${summary.unreviewed}`}
              />
            )}
          </div>

          {/* Legend pills */}
          <div className="mem-overall-legend">
            <div className="mem-legend-pill">
              <div className="mem-leg-dot strong" />
              <span>{t('memoryLab.strongPill', { count: summary.strong })}</span>
            </div>
            <div className="mem-legend-pill">
              <div className="mem-leg-dot medium" />
              <span>{t('memoryLab.mediumPill', { count: summary.medium })}</span>
            </div>
            <div className="mem-legend-pill">
              <div className="mem-leg-dot weak" />
              <span>{t('memoryLab.weakPill', { count: summary.weak })}</span>
            </div>
            <div className="mem-legend-pill">
              <div className="mem-leg-dot new" />
              <span>{t('memoryLab.newPill', { count: summary.unreviewed })}</span>
            </div>
          </div>

          {/* Overall Forgetting Curve Graph */}
          <div className="mem-curve-container" style={{ marginTop: '0.25rem' }}>
            <div className="mem-curve-label" style={{ fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{t('memoryLab.overallDynamics')}</span>
              <span>Avg S = {summary.avgStability.toFixed(1)}d</span>
            </div>
            <ForgettingCurve stability={summary.avgStability} />
            <div className="mem-curve-legend">
              <span style={{ color: 'var(--success)' }}>{t('memoryLab.optimalThreshold')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Semantic Clusters & Context Transfer Section */}
      {semanticClusters.length > 0 && (
        <div className="mem-semantic-card">
          <div className="mem-semantic-header">
            <div>
              <div className="mem-semantic-title">{t('memoryLab.semanticClustersTitle')}</div>
              <div className="mem-semantic-sub">{t('memoryLab.semanticClustersSub')}</div>
            </div>
            <span className="mem-sem-badge">{t('memoryLab.contextAwareAi')}</span>
          </div>

          <div className="mem-semantic-list">
            {semanticClusters.map(c => (
              <div key={c.name} className="mem-semantic-item mem-semantic-item-stacked">
                <div className="mem-sem-top">
                  <span className="mem-sem-icon">{c.icon}</span>
                  <div className="mem-sem-text">
                    <div className="mem-sem-name">{c.name}</div>
                    <div className="mem-sem-meta">{t('memoryLab.clusterMeta', { count: c.count, avgS: c.avgStability })}</div>
                  </div>
                </div>
                <div className="mem-sem-badges">
                  <span className="mem-sem-mastery">{t('memoryLab.masteredPct', { pct: (c.mastery * 100).toFixed(0) })}</span>
                  <span className="mem-sem-boost" title={t('memoryLab.startingStabilityTooltip')}>
                    {t('memoryLab.initialS0', { s0: c.initialStability })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confusion Pairs Section */}
      {confusionPairs.length > 0 && (
        <div className="mem-semantic-card mem-confusion-card">
          <div className="mem-semantic-header">
            <div>
              <div className="mem-semantic-title"><AlertTriangle size={16} style={{ verticalAlign: '-2px' }} /> {t('memoryLab.confusedWordsTitle')}</div>
              <div className="mem-semantic-sub">{t('memoryLab.confusedWordsSub')}</div>
            </div>
          </div>
          <div className="mem-semantic-list">
            {confusionPairs.slice(0, 8).map(pair => (
              <div key={pair.key} className="mem-semantic-item">
                <div className="mem-sem-left">
                  <span className="mem-sem-icon">⚠️</span>
                  <div>
                    <div className="mem-sem-name">{pair.wordA || '—'} ↔ {pair.wordB || '—'}</div>
                    <div className="mem-sem-meta">{pair.translationA} / {pair.translationB}</div>
                  </div>
                </div>
                <div className="mem-sem-right">
                  <div className="mem-sem-mastery">{t('memoryLab.confusedCount', { count: pair.count })}</div>
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
          placeholder={t('memoryLab.searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="mem-filter-tabs">
          {[
            { key: 'all', label: t('memoryLab.allFilter') },
            { key: 'due', label: t('memoryLab.todayFilter') },
            { key: 'weak', label: t('memoryLab.weakFilter') },
            { key: 'strong', label: t('memoryLab.strongFilter') },
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

      <div className="mem-count-label">{t('memoryLab.wordsCount', { count: filtered.length })}</div>

      <div className="mem-insight-list">
        {visibleWords.map(memory => (
          <WordInsightCard key={memory.wordId} memory={memory} confusionPairs={confusionPairs} />
        ))}
      </div>

      {filtered.length > visibleCount && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            className="mem-btn-secondary"
            style={{ padding: '0.66rem 1.5rem', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '12px' }}
            onClick={() => setVisibleCount(prev => prev + 25)}
          >
            {t('memoryLab.loadMore', { count: filtered.length - visibleCount })}
          </button>
        </div>
      )}
    </div>
  );
}
