/**
 * 🧬 MemoryLab — Main Experiment Page
 *
 * Route: /experiment
 *
 * Three tabs:
 *   🧬 Lab      — due words + start session / session in progress
 *   📊 Insights — per-word forgetting curves
 *   📈 Stats    — aggregate memory statistics
 *
 * This component is completely isolated from the main app.
 * It imports only shared contexts (AuthContext) and Firebase.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FlaskConical, BarChart2, Brain, ArrowLeft,
  Play, RefreshCw, CheckCircle, XCircle, Zap,
  TrendingUp, Clock, BookOpen, Award, Sparkles
} from 'lucide-react';

import { useMemoryExperiment } from '../useMemoryExperiment';
import { simulateReviewScenarios } from '../../utils/memoryEngine';
import { useLanguage } from '../../contexts/LanguageContext';
import WordMemorySession from './WordMemorySession';
import MemoryInsights from './MemoryInsights';
import './MemoryLab.css';

// ─── Stats Panel ─────────────────────────────────────────────────────────────

function StatsPanel({ stats, memoryMap }) {
  const { t } = useLanguage();
  const words = Object.values(memoryMap).filter(m => m.wordData && m.totalReviews > 0);

  // Stability distribution buckets
  const buckets = [
    { label: '< 3 days', min: 0, max: 3, color: '#f87171' },
    { label: '3–7 days', min: 3, max: 7, color: '#f59e0b' },
    { label: '7–14 days', min: 7, max: 14, color: '#60a5fa' },
    { label: '14–30 days', min: 14, max: 30, color: '#34d399' },
    { label: '30+ days', min: 30, max: Infinity, color: '#a78bfa' },
  ];

  const bucketCounts = buckets.map(b => ({
    ...b,
    count: words.filter(w => w.stability >= b.min && w.stability < b.max).length,
  }));

  const maxCount = Math.max(...bucketCounts.map(b => b.count), 1);

  // Recent reviews & overall historical metrics
  const recentReviews = [];
  words.forEach(w => {
    (w.recallHistory || []).forEach(h => {
      recentReviews.push({ ...h, word: w.wordData?.word });
    });
  });
  recentReviews.sort((a, b) => new Date(b.ts) - new Date(a.ts));
  const last10 = recentReviews.slice(0, 10);
  const correctRate = last10.length > 0
    ? Math.round((last10.filter(h => h.result).length / last10.length) * 100)
    : null;

  const overallAccuracy = recentReviews.length > 0
    ? Math.round((recentReviews.filter(h => h.result).length / recentReviews.length) * 100)
    : null;
  const overallAvgSpeed = recentReviews.length > 0
    ? (recentReviews.reduce((sum, h) => sum + (h.responseTime || 0), 0) / recentReviews.length).toFixed(1)
    : null;

  return (
    <div className="mem-stats-panel">
      {/* Overview cards */}
      <div className="mem-stats-grid">
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--accent-1-dim)', color: 'var(--accent-1)' }}>
            <BookOpen size={20} />
          </div>
          <div className="mem-stat-val">{stats?.totalWords ?? Object.keys(memoryMap).length}</div>
          <div className="mem-stat-lbl">{t('memoryLab.wordsAdded')}</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--warning-dim)', color: 'var(--warning)' }}>
            <Clock size={20} />
          </div>
          <div className="mem-stat-val">{overallAccuracy !== null ? `${overallAccuracy}%` : '—'}</div>
          <div className="mem-stat-lbl">{t('memoryLab.overallAccuracy')}</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--success-dim)', color: 'var(--success)' }}>
            <TrendingUp size={20} />
          </div>
          <div className="mem-stat-val">{stats?.avgStability ?? '—'}</div>
          <div className="mem-stat-lbl">{t('memoryLab.avgStability')}</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--error-dim)', color: 'var(--error)' }}>
            <Zap size={20} />
          </div>
          <div className="mem-stat-val">{overallAvgSpeed ? `${overallAvgSpeed}s` : '—'}</div>
          <div className="mem-stat-lbl">{t('memoryLab.avgResponseSpeed')}</div>
        </div>
      </div>

      {/* Stability distribution */}
      {words.length > 0 && (
        <div className="mem-dist-section">
          <div className="mem-section-title">{t('memoryLab.stabilityDistTitle')}</div>
          <div className="mem-dist-bars">
            {bucketCounts.map(b => (
              <div key={b.label} className="mem-dist-row">
                <div className="mem-dist-label">{b.label}</div>
                <div className="mem-dist-bar-track">
                  <motion.div
                    className="mem-dist-bar-fill"
                    style={{ background: b.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.count / maxCount) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  />
                </div>
                <div className="mem-dist-count" style={{ color: b.color }}>{b.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent accuracy */}
      {correctRate !== null && (
        <div className="mem-recent-section">
          <div className="mem-section-title">{t('memoryLab.last10Title')}</div>
          <div className="mem-recent-dots">
            {last10.map((h, i) => (
              <div
                key={i}
                className={`mem-recent-dot ${h.result ? 'correct' : 'wrong'}`}
                title={`${h.word}: ${h.result ? '✓' : '✗'} (${h.responseTime}s)`}
              />
            ))}
          </div>
          <div className="mem-accuracy-label">
            {t('memoryLab.last10Accuracy', { rate: correctRate })}
          </div>
        </div>
      )}

      {words.length === 0 && (
        <div className="mem-empty-state">
          <div className="mem-empty-icon">📈</div>
          <p>{t('memoryLab.statsEmpty')}</p>
        </div>
      )}
    </div>
  );
}

// ─── Session Results ──────────────────────────────────────────────────────────

function SessionResults({ session, onRestart, onDone }) {
  const { t } = useLanguage();
  const results = session?.results || [];
  const correct = results.filter(r => r.isCorrect).length;
  const total = results.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgTime = total > 0
    ? (results.reduce((s, r) => s + r.responseTime, 0) / total).toFixed(1)
    : '—';
  const avgConf = total > 0
    ? (results.reduce((s, r) => s + r.confidence, 0) / total).toFixed(1)
    : '—';

  return (
    <motion.div
      className="mem-results"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mem-results-trophy">
        {pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪'}
      </div>
      <h2 className="mem-results-title">{t('memoryLab.sessionComplete')}</h2>

      <div className="mem-results-ring">
        <svg viewBox="0 0 80 80" width={120}>
          <circle cx={40} cy={40} r={34} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
          <circle
            cx={40} cy={40} r={34}
            fill="none"
            stroke={pct >= 80 ? '#34d399' : pct >= 50 ? '#f59e0b' : '#f87171'}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${pct * 2.136} 213.6`}
            transform="rotate(-90 40 40)"
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
          <text x={40} y={45} textAnchor="middle" fill="#fff" fontSize={18} fontWeight={700}>{pct}%</text>
        </svg>
      </div>

      <div className="mem-results-stats">
        <div className="mem-result-pill">
          <CheckCircle size={14} color="#34d399" />
          <span>{t('memoryLab.correctPill', { correct })}</span>
        </div>
        <div className="mem-result-pill">
          <XCircle size={14} color="#f87171" />
          <span>{t('memoryLab.wrongPill', { wrong: total - correct })}</span>
        </div>
        <div className="mem-result-pill">
          <Clock size={14} color="#818cf8" />
          <span>{t('memoryLab.avgTimePill', { time: avgTime })}</span>
        </div>
        <div className="mem-result-pill">
          <Brain size={14} color="#f59e0b" />
          <span>{t('memoryLab.confidencePill', { conf: avgConf })}</span>
        </div>
      </div>

      {/* Word-level breakdown */}
      <div className="mem-results-list">
        {results.map((r, i) => (
          <div key={i} className={`mem-result-row ${r.isCorrect ? 'correct' : 'wrong'}`}>
            <span className="mem-rr-icon">{r.isCorrect ? '✓' : '✗'}</span>
            <span className="mem-rr-word">{r.word}</span>
            <span className="mem-rr-trans">{r.translation}</span>
            <span className="mem-rr-s">S→{r.newStability?.toFixed(1)}d</span>
          </div>
        ))}
      </div>

      <div className="mem-results-actions">
        <button className="mem-btn-secondary" onClick={onDone}>
          <ArrowLeft size={16} /> {t('memoryLab.backToLabBtn')}
        </button>
        {session?.queue?.length > 0 && (
          <button className="mem-btn-primary" onClick={onRestart}>
            <RefreshCw size={16} /> {t('memoryLab.restartBtn')}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Lab Tab ─────────────────────────────────────────────────────────────────

function LabTab({ dueWords, allWords, onStart, loading }) {
  const { t } = useLanguage();
  const SESSION_SIZE = 20;
  const queue = dueWords.filter(w => w.wordData);
  const batch = queue.slice(0, SESSION_SIZE);
  const remaining = Math.max(0, queue.length - SESSION_SIZE);

  const now = new Date();
  const strictlyDueCount = queue.filter(w => !w.nextOptimalReview || new Date(w.nextOptimalReview) <= now).length;

  // "Why exactly now?" — simulate reviewing this session's batch today vs.
  // putting it off, using the batch's own average stability so the numbers
  // reflect these actual words, not an arbitrary example.
  const avgStability = batch.length > 0
    ? batch.reduce((sum, w) => sum + (Number(w.stability) || 1.0), 0) / batch.length
    : 1.0;
  const simNow = simulateReviewScenarios(avgStability, 1, 30);
  const simLater = simulateReviewScenarios(avgStability, 14, 30);

  return (
    <div className="mem-lab-tab">
      {/* Hero banner */}
      <div className="mem-lab-hero">
        <div className="mem-lab-hero-icon">🧬</div>
        <div>
          <h2 className="mem-lab-hero-title">{t('memoryLab.heroTitle')}</h2>
          <p className="mem-lab-hero-sub">
            {t('memoryLab.heroSub')}
          </p>
        </div>
      </div>

      {/* Main session launcher card */}
      {loading ? (
        <div className="mem-loading">
          <div className="mem-spinner" />
          <span>{t('memoryLab.loadingWords')}</span>
        </div>
      ) : queue.length > 0 ? (
        <div className="mem-due-section">
          <div className="mem-due-header">
            <span className="mem-due-title">{t('memoryLab.queueTitle')}</span>
            <span className="mem-due-badge-count">
              {strictlyDueCount > 0 ? t('memoryLab.reviewsReady', { count: strictlyDueCount }) : t('memoryLab.stableBadge')}
            </span>
          </div>

          <div className="mem-due-preview">
            {batch.slice(0, 5).map(m => (
              <div key={m.wordId} className="mem-due-chip">
                <span className="mem-due-chip-word">{m.wordData.word}</span>
                <span
                  className="mem-due-chip-s"
                  title="Stability — the estimated number of days you'll retain this word before forgetting it."
                >
                  S: {m.stability?.toFixed(1)}d
                </span>
              </div>
            ))}
            {batch.length > 5 && (
              <div className="mem-due-chip more">+{batch.length - 5} more</div>
            )}
          </div>

          <button
            className="mem-start-btn"
            onClick={() => onStart(batch)}
          >
            <Play size={18} />
            {t('memoryLab.startLearning', { count: batch.length })}
          </button>

          <div className="mem-remaining-note">
            {t('memoryLab.queueNote', { total: queue.length, batch: batch.length })}
            {remaining > 0 && t('memoryLab.queueNoteRemaining', { count: remaining })}
          </div>
        </div>
      ) : (
        <div className="mem-no-due">
          <div className="mem-no-due-icon">📚</div>
          <h3>{t('memoryLab.noWordsTitle')}</h3>
          <p>{t('memoryLab.noWordsSub')}</p>
        </div>
      )}

      {/* Memory Simulator — "why exactly now?" */}
      {batch.length > 0 && (
        <div className="mem-lab-sim-card">
          <div className="mem-lab-sim-title">
            <Sparkles size={15} strokeWidth={2.2} /> {t('memoryLab.whyNowTitle')}
          </div>
          <p className="mem-lab-sim-text">
            {t('memoryLab.whyNowText', { count: batch.length })}
          </p>
          <div className="mem-lab-sim-compare">
            <div className="mem-lab-sim-stat">
              <span className="mem-lab-sim-stat-label">{t('memoryLab.reviewNow')}</span>
              <span className="mem-lab-sim-stat-value good">{Math.round(simNow.withReview * 100)}%</span>
            </div>
            <div className="mem-lab-sim-stat">
              <span className="mem-lab-sim-stat-label">{t('memoryLab.reviewLater')}</span>
              <span className="mem-lab-sim-stat-value bad">{Math.round(simLater.withReview * 100)}%</span>
            </div>
          </div>
          <div className="mem-lab-sim-note">{t('memoryLab.recallProbabilityNote')}</div>
        </div>
      )}

      {/* Total tracked words */}
      {allWords.length > 0 && (
        <div className="mem-enrolled-info">
          <Award size={14} />
          {t('memoryLab.totalTrackedWords', { count: allWords.length })}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'lab', icon: <FlaskConical size={16} />, label: 'Lab' },
  { key: 'insights', icon: <BarChart2 size={16} />, label: 'Insights' },
  { key: 'stats', icon: <Brain size={16} />, label: 'Stats' },
];

export default function MemoryLab() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('lab');

  const {
    allWords, dueWords, memoryMap, stats, confusionPairs, loading, error,
    session,
    startSession, submitReview, skipWord, endSession, reportConfusion,
  } = useMemoryExperiment();

  const inSession = !!session && !session.finished;
  const sessionDone = session?.finished;

  if (error) {
    return (
      <div className="mem-page mem-error-page">
        <div className="mem-error-icon">⚠️</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button className="mem-btn-primary" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="mem-page">
      {/* Tab bar (hidden during active session) */}
      {!inSession && !sessionDone && (
        <div className="mem-tab-bar">
          {[
            { key: 'lab', icon: <FlaskConical size={16} />, label: t('memoryLab.labTab') },
            { key: 'insights', icon: <BarChart2 size={16} />, label: t('memoryLab.insightsTab') },
            { key: 'stats', icon: <Brain size={16} />, label: t('memoryLab.statsTab') },
          ].map(tab => (
            <button
              key={tab.key}
              className={`mem-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mem-content">
        {/* Active session */}
        {inSession && !sessionDone && (
          <motion.div
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%' }}
          >
            <WordMemorySession
              session={session}
              allWords={allWords}
              onSubmit={submitReview}
              onSkip={skipWord}
              onEnd={endSession}
              onConfusionDetected={reportConfusion}
            />
          </motion.div>
        )}

        {/* Session finished → results */}
        {sessionDone && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%' }}
          >
            <SessionResults
              session={session}
              onRestart={() => startSession(session.queue)}
              onDone={endSession}
            />
          </motion.div>
        )}

        {/* Tab views */}
        {!inSession && !sessionDone && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            style={{ width: '100%' }}
          >
            {activeTab === 'lab' && (
              <LabTab
                dueWords={dueWords}
                allWords={allWords}
                memoryMap={memoryMap}
                onStart={startSession}
                loading={loading}
              />
            )}
            {activeTab === 'insights' && (
              <MemoryInsights memoryMap={memoryMap} confusionPairs={confusionPairs} loading={loading} />
            )}
            {activeTab === 'stats' && (
              <StatsPanel stats={stats} memoryMap={memoryMap} />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
