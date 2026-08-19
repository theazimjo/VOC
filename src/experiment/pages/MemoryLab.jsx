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
import WordMemorySession from './WordMemorySession';
import MemoryInsights from './MemoryInsights';
import './MemoryLab.css';

// ─── Stats Panel ─────────────────────────────────────────────────────────────

function StatsPanel({ stats, memoryMap }) {
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
          <div className="mem-stat-lbl">Words added</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--warning-dim)', color: 'var(--warning)' }}>
            <Clock size={20} />
          </div>
          <div className="mem-stat-val">{overallAccuracy !== null ? `${overallAccuracy}%` : '—'}</div>
          <div className="mem-stat-lbl">Overall accuracy</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--success-dim)', color: 'var(--success)' }}>
            <TrendingUp size={20} />
          </div>
          <div className="mem-stat-val">{stats?.avgStability ?? '—'}</div>
          <div className="mem-stat-lbl">Average stability (days)</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--error-dim)', color: 'var(--error)' }}>
            <Zap size={20} />
          </div>
          <div className="mem-stat-val">{overallAvgSpeed ? `${overallAvgSpeed}s` : '—'}</div>
          <div className="mem-stat-lbl">Average response speed</div>
        </div>
      </div>

      {/* Stability distribution */}
      {words.length > 0 && (
        <div className="mem-dist-section">
          <div className="mem-section-title">📊 Stability distribution</div>
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
          <div className="mem-section-title">⚡ Last 10 review results</div>
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
            Last 10 review accuracy: <strong>{correctRate}%</strong>
          </div>
        </div>
      )}

      {words.length === 0 && (
        <div className="mem-empty-state">
          <div className="mem-empty-icon">📈</div>
          <p>Once you finish your first session, your stats will appear here.</p>
        </div>
      )}
    </div>
  );
}

// ─── Session Results ──────────────────────────────────────────────────────────

function SessionResults({ session, onRestart, onDone }) {
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
      <h2 className="mem-results-title">Session complete!</h2>

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
          <span>{correct} correct</span>
        </div>
        <div className="mem-result-pill">
          <XCircle size={14} color="#f87171" />
          <span>{total - correct} wrong</span>
        </div>
        <div className="mem-result-pill">
          <Clock size={14} color="#818cf8" />
          <span>Avg {avgTime}s</span>
        </div>
        <div className="mem-result-pill">
          <Brain size={14} color="#f59e0b" />
          <span>Confidence {avgConf}/5</span>
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
          <ArrowLeft size={16} /> Back to Lab
        </button>
        {session?.queue?.length > 0 && (
          <button className="mem-btn-primary" onClick={onRestart}>
            <RefreshCw size={16} /> Restart
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Lab Tab ─────────────────────────────────────────────────────────────────

function LabTab({ dueWords, allWords, onStart, loading }) {
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
          <h2 className="mem-lab-hero-title">Memory Laboratory</h2>
          <p className="mem-lab-hero-sub">
            Sequential learning and review, driven by your own forgetting curve
          </p>
        </div>
      </div>

      {/* Main session launcher card */}
      {loading ? (
        <div className="mem-loading">
          <div className="mem-spinner" />
          <span>Loading every word in your vocabulary...</span>
        </div>
      ) : queue.length > 0 ? (
        <div className="mem-due-section">
          <div className="mem-due-header">
            <span className="mem-due-title">🧠 Smart Review Queue</span>
            <span className="mem-due-badge-count">
              {strictlyDueCount > 0 ? `⏰ ${strictlyDueCount} reviews ready` : `✨ Stable`}
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
            Start learning · {batch.length}
          </button>

          <div className="mem-remaining-note">
            ✦ <strong>{queue.length}</strong> words have been ranked by your individual forgetting probability.
            {' '}The top <strong>{batch.length}</strong> were picked for today's session.
            {remaining > 0 && ` ${remaining} more words are waiting for the next session.`}
          </div>
        </div>
      ) : (
        <div className="mem-no-due">
          <div className="mem-no-due-icon">📚</div>
          <h3>Your vocabulary doesn't have any words yet</h3>
          <p>Add new words and packs from the library!</p>
        </div>
      )}

      {/* Memory Simulator — "why exactly now?" */}
      {batch.length > 0 && (
        <div className="mem-lab-sim-card">
          <div className="mem-lab-sim-title">
            <Sparkles size={15} strokeWidth={2.2} /> Why exactly now?
          </div>
          <p className="mem-lab-sim-text">
            If you review these {batch.length} words today, your chance of still remembering them 30 days from now will be much higher:
          </p>
          <div className="mem-lab-sim-compare">
            <div className="mem-lab-sim-stat">
              <span className="mem-lab-sim-stat-label">If you review now</span>
              <span className="mem-lab-sim-stat-value good">{Math.round(simNow.withReview * 100)}%</span>
            </div>
            <div className="mem-lab-sim-stat">
              <span className="mem-lab-sim-stat-label">If you review in 2 weeks</span>
              <span className="mem-lab-sim-stat-value bad">{Math.round(simLater.withReview * 100)}%</span>
            </div>
          </div>
          <div className="mem-lab-sim-note">30-day recall probability (based on average stability)</div>
        </div>
      )}

      {/* Total tracked words */}
      {allWords.length > 0 && (
        <div className="mem-enrolled-info">
          <Award size={14} />
          <strong>{allWords.length}</strong> words total in your vocabulary
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
          {TABS.map(tab => (
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
