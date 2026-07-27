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
  TrendingUp, Clock, BookOpen, Award
} from 'lucide-react';

import { useMemoryExperiment } from '../useMemoryExperiment';
import WordMemorySession from './WordMemorySession';
import MemoryInsights from './MemoryInsights';
import './MemoryLab.css';

// ─── Stats Panel ─────────────────────────────────────────────────────────────

function StatsPanel({ stats, memoryMap }) {
  const words = Object.values(memoryMap).filter(m => m.wordData && m.totalReviews > 0);

  // Stability distribution buckets
  const buckets = [
    { label: '< 3 kun', min: 0, max: 3, color: '#f87171' },
    { label: '3–7 kun', min: 3, max: 7, color: '#f59e0b' },
    { label: '7–14 kun', min: 7, max: 14, color: '#60a5fa' },
    { label: '14–30 kun', min: 14, max: 30, color: '#34d399' },
    { label: '30+ kun', min: 30, max: Infinity, color: '#a78bfa' },
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
          <div className="mem-stat-lbl">So'zlar kiritilgan</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--warning-dim)', color: 'var(--warning)' }}>
            <Clock size={20} />
          </div>
          <div className="mem-stat-val">{overallAccuracy !== null ? `${overallAccuracy}%` : '—'}</div>
          <div className="mem-stat-lbl">Umumiy aniqlik</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--success-dim)', color: 'var(--success)' }}>
            <TrendingUp size={20} />
          </div>
          <div className="mem-stat-val">{stats?.avgStability ?? '—'}</div>
          <div className="mem-stat-lbl">O'rtacha barqarorlik (kun)</div>
        </div>
        <div className="mem-stat-card">
          <div className="mem-stat-icon" style={{ background: 'var(--error-dim)', color: 'var(--error)' }}>
            <Zap size={20} />
          </div>
          <div className="mem-stat-val">{overallAvgSpeed ? `${overallAvgSpeed}s` : '—'}</div>
          <div className="mem-stat-lbl">O'rtacha javob tezligi</div>
        </div>
      </div>

      {/* Stability distribution */}
      {words.length > 0 && (
        <div className="mem-dist-section">
          <div className="mem-section-title">📊 Barqarorlik taqsimoti</div>
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
          <div className="mem-section-title">⚡ So'nggi 10 ta takrorlash natijalari</div>
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
            So'nggi 10 ta takrorlash aniqligi: <strong>{correctRate}%</strong>
          </div>
        </div>
      )}

      {words.length === 0 && (
        <div className="mem-empty-state">
          <div className="mem-empty-icon">📈</div>
          <p>Birinchi sessiyani tugatgach, statistika shu yerda ko'rsatiladi.</p>
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
      <h2 className="mem-results-title">Sessiya yakunlandi!</h2>

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
          <span>{correct} to'g'ri</span>
        </div>
        <div className="mem-result-pill">
          <XCircle size={14} color="#f87171" />
          <span>{total - correct} xato</span>
        </div>
        <div className="mem-result-pill">
          <Clock size={14} color="#818cf8" />
          <span>O'rtacha {avgTime}s</span>
        </div>
        <div className="mem-result-pill">
          <Brain size={14} color="#f59e0b" />
          <span>Ishonch {avgConf}/5</span>
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
          <ArrowLeft size={16} /> Labga qaytish
        </button>
        {session?.queue?.length > 0 && (
          <button className="mem-btn-primary" onClick={onRestart}>
            <RefreshCw size={16} /> Qayta boshlash
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Lab Tab ─────────────────────────────────────────────────────────────────

function LabTab({ dueWords, allWords, memoryMap, onStart, loading }) {
  const SESSION_SIZE = 20;
  const queue = dueWords.filter(w => w.wordData);
  const batch = queue.slice(0, SESSION_SIZE);
  const remaining = Math.max(0, queue.length - SESSION_SIZE);

  const now = new Date();
  const strictlyDueCount = queue.filter(w => !w.nextOptimalReview || new Date(w.nextOptimalReview) <= now).length;

  return (
    <div className="mem-lab-tab">
      {/* Hero banner */}
      <div className="mem-lab-hero">
        <div className="mem-lab-hero-icon">🧬</div>
        <div>
          <h2 className="mem-lab-hero-title">Xotira Laboratoriyasi</h2>
          <p className="mem-lab-hero-sub">
            Individual unutish egri chizig'i bo'yicha ketma-ket yodlash va takrorlash
          </p>
        </div>
      </div>

      {/* Main session launcher card */}
      {loading ? (
        <div className="mem-loading">
          <div className="mem-spinner" />
          <span>Lug'atingizdagi barcha so'zlar yuklanmoqda...</span>
        </div>
      ) : queue.length > 0 ? (
        <div className="mem-due-section">
          <div className="mem-due-header">
            <span className="mem-due-title">🧠 Aqlli Yodlash Navbati</span>
            <span className="mem-due-badge-count">
              {strictlyDueCount > 0 ? `⏰ ${strictlyDueCount} ta vaqti kelgan` : `✨ Barqaror`}
            </span>
          </div>

          <div className="mem-due-preview">
            {batch.slice(0, 5).map(m => (
              <div key={m.wordId} className="mem-due-chip">
                <span className="mem-due-chip-word">{m.wordData.word}</span>
                <span className="mem-due-chip-s">S={m.stability?.toFixed(1)}d</span>
              </div>
            ))}
            {batch.length > 5 && (
              <div className="mem-due-chip more">+{batch.length - 5} ta</div>
            )}
          </div>

          <button
            className="mem-start-btn"
            onClick={() => onStart(batch)}
          >
            <Play size={18} />
            Yodlashni boshlash ({batch.length} ta so'z)
          </button>

          <div className="mem-remaining-note">
            ✦ Jami <strong>{queue.length}</strong> ta so'z individual unutish ehtimoli P(t) bo'yicha saralangan.
            {remaining > 0 && ` Keyingi sessiyada yana ${remaining} ta so'z kutyapti.`}
          </div>
        </div>
      ) : (
        <div className="mem-no-due">
          <div className="mem-no-due-icon">📚</div>
          <h3>Lug'atingizda hali so'zlar yo'q</h3>
          <p>Kutubxonadan yangi so'zlar va to'plamlar qo'shing!</p>
        </div>
      )}

      {/* All enrolled words count */}
      {allWords.length > 0 && (
        <div className="mem-enrolled-info">
          <Award size={14} />
          Jami <strong>{Object.keys(memoryMap).length}</strong> ta so'z tajribaga kiritilgan
          ({allWords.length} ta lug'atda)
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
    session, currentSessionWord,
    startSession, submitReview, skipWord, endSession, reportConfusion,
  } = useMemoryExperiment();

  const inSession = !!session && !session.finished;
  const sessionDone = session?.finished;

  if (error) {
    return (
      <div className="mem-page mem-error-page">
        <div className="mem-error-icon">⚠️</div>
        <h2>Xatolik yuz berdi</h2>
        <p>{error}</p>
        <button className="mem-btn-primary" onClick={() => navigate('/')}>
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="mem-page">
      {/* Page header */}
      <div className="mem-page-header">
        <button className="mem-back-btn" onClick={() => navigate('/')} title="Orqaga">
          <ArrowLeft size={20} />
        </button>
        <div className="mem-page-title">
          <span className="mem-page-title-icon">🧪</span>
          Memory Experiment
          <span className="mem-page-title-badge">BETA</span>
        </div>
        <div style={{ width: 40 }} />
      </div>

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
        <AnimatePresence mode="wait">

          {/* Active session */}
          {inSession && !sessionDone && (
            <motion.div
              key="session"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              exit={{ opacity: 0 }}
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
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
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
                <MemoryInsights memoryMap={memoryMap} confusionPairs={confusionPairs} />
              )}
              {activeTab === 'stats' && (
                <StatsPanel stats={stats} memoryMap={memoryMap} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
