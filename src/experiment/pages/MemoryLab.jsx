/**
 * Review page (route /experiment, still called "Memory Lab" in the code).
 *
 * Three tabs, written for learners in plain language:
 *   Review   — words waiting to be reviewed + start a session
 *   My words — every word with a simple status (new / weak / medium / strong)
 *   Results  — how the learner is doing overall
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, ListChecks, BarChart2, ArrowLeft, Play, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { computeUserRate } from '@voc/memory-engine';

import { useMemoryExperiment } from '../useMemoryExperiment';
import { useLanguage } from '../../contexts/LanguageContext';
import { labCopy } from '../labContent';
import { wordStatus } from '../wordStatus';
import WordMemorySession from './WordMemorySession';
import MyWords from './MyWords';
import './MemoryLab.css';

const SESSION_SIZE = 20;
const SCHEDULE_FACTOR = Math.log(1 / 0.75); // days of next gap per unit of memory strength

/** "Next review: today / tomorrow / in N days" from a word's new strength. */
function nextReviewText(c, strength) {
  const days = (Number(strength) || 0) * SCHEDULE_FACTOR;
  if (days < 0.75) return c.session.next.today;
  if (days < 1.5) return c.session.next.tomorrow;
  return c.session.next.days(Math.round(days));
}

// ─── Results tab ─────────────────────────────────────────────────────────────

function ResultsPanel({ memoryMap }) {
  const { language } = useLanguage();
  const lab = labCopy(language);
  const c = lab.results;

  const { counts, total, reviewsCount, accuracy, last10 } = useMemo(() => {
    const list = Object.values(memoryMap).filter((m) => m.wordData?.word);
    const userRate = computeUserRate(list);
    const counts = { strong: 0, medium: 0, weak: 0, new: 0 };
    const events = [];
    list.forEach((m) => {
      counts[wordStatus(m, userRate).key] += 1;
      (m.recallHistory || []).forEach((h) => events.push({ ...h, word: m.wordData.word }));
    });
    events.sort((a, b) => new Date(b.ts) - new Date(a.ts));
    return {
      counts,
      total: list.length,
      reviewsCount: events.length,
      accuracy: events.length ? Math.round((events.filter((h) => h.result).length / events.length) * 100) : null,
      last10: events.slice(0, 10),
    };
  }, [memoryMap]);

  if (total === 0 || reviewsCount === 0) {
    return <div className="mem-empty-state"><p>{c.empty}</p></div>;
  }

  const last10Rate = Math.round((last10.filter((h) => h.result).length / last10.length) * 100);
  const max = Math.max(...Object.values(counts), 1);
  const tones = { strong: '#34d399', medium: '#f59e0b', weak: '#f87171', new: '#8b8fa8' };

  return (
    <div className="mem-stats-panel">
      <h2 className="mem-words-title">{c.title}</h2>
      <div className="mem-stats-grid mem-stats-grid--3">
        <div className="mem-stat-card"><div className="mem-stat-val">{total}</div><div className="mem-stat-lbl">{c.wordsLabel}</div></div>
        <div className="mem-stat-card"><div className="mem-stat-val">{accuracy}%</div><div className="mem-stat-lbl">{c.accuracyLabel}</div></div>
        <div className="mem-stat-card"><div className="mem-stat-val">{reviewsCount}</div><div className="mem-stat-lbl">{c.reviewsLabel}</div></div>
      </div>

      <div className="mem-dist-section">
        <div className="mem-section-title">{c.strengthTitle}</div>
        <div className="mem-dist-bars">
          {['strong', 'medium', 'weak', 'new'].map((key) => (
            <div key={key} className="mem-dist-row">
              <div className="mem-dist-label">{lab.status[key]}</div>
              <div className="mem-dist-bar-track">
                <motion.div className="mem-dist-bar-fill" style={{ background: tones[key] }} initial={{ width: 0 }} animate={{ width: `${(counts[key] / max) * 100}%` }} transition={{ duration: 0.6 }} />
              </div>
              <div className="mem-dist-count" style={{ color: tones[key] }}>{counts[key]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mem-recent-section">
        <div className="mem-section-title">{c.last10Title}</div>
        <div className="mem-recent-dots">
          {last10.map((h, i) => (
            <div key={i} className={`mem-recent-dot ${h.result ? 'correct' : 'wrong'}`} title={`${h.word}: ${h.result ? '✓' : '✗'}`} />
          ))}
        </div>
        <div className="mem-accuracy-label">{c.last10Rate(last10Rate)}</div>
      </div>
    </div>
  );
}

// ─── Session results ─────────────────────────────────────────────────────────

function SessionResults({ session, onRestart, onDone }) {
  const { language } = useLanguage();
  const c = labCopy(language);
  const results = session?.results || [];
  const correct = results.filter((r) => r.isCorrect).length;
  const total = results.length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <motion.div className="mem-results" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <h2 className="mem-results-title">{c.session.done}</h2>

      <div className="mem-results-ring">
        <svg viewBox="0 0 80 80" width={120}>
          <circle cx={40} cy={40} r={34} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
          <circle
            cx={40} cy={40} r={34} fill="none"
            stroke={pct >= 80 ? '#34d399' : pct >= 50 ? '#f59e0b' : '#f87171'}
            strokeWidth={8} strokeLinecap="round"
            strokeDasharray={`${pct * 2.136} 213.6`} transform="rotate(-90 40 40)"
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
          <text x={40} y={45} textAnchor="middle" fill="#fff" fontSize={18} fontWeight={700}>{pct}%</text>
        </svg>
      </div>

      <div className="mem-results-stats">
        <div className="mem-result-pill"><CheckCircle size={14} color="#34d399" /><span>{c.session.correct(correct)}</span></div>
        <div className="mem-result-pill"><XCircle size={14} color="#f87171" /><span>{c.session.wrong(total - correct)}</span></div>
      </div>

      <div className="mem-results-list">
        {results.map((r, i) => (
          <div key={i} className={`mem-result-row ${r.isCorrect ? 'correct' : 'wrong'}`}>
            <span className="mem-rr-icon">{r.isCorrect ? '✓' : '✗'}</span>
            <span className="mem-rr-word">{r.word}</span>
            <span className="mem-rr-trans">{r.translation}</span>
            <span className="mem-rr-s">{nextReviewText(c, r.newStability)}</span>
          </div>
        ))}
      </div>

      <div className="mem-results-actions">
        <button className="mem-btn-secondary" onClick={onDone}><ArrowLeft size={16} /> {c.session.back}</button>
        {session?.queue?.length > 0 && (
          <button className="mem-btn-primary" onClick={onRestart}><RefreshCw size={16} /> {c.session.again}</button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Review tab ──────────────────────────────────────────────────────────────

function ReviewTab({ dueWords, allWords, onStart, loading }) {
  const { language } = useLanguage();
  const lab = labCopy(language);
  const c = lab.review;

  const { batch, dueCount, remaining, statusOf } = useMemo(() => {
    const queue = dueWords.filter((w) => w.wordData);
    const userRate = computeUserRate(queue);
    const now = Date.now();
    const statuses = new Map(queue.map((w) => [w.wordId, wordStatus(w, userRate, now)]));
    const due = queue.filter((w) => statuses.get(w.wordId).due);
    const pool = due.length > 0 ? due : queue;
    return {
      batch: pool.slice(0, SESSION_SIZE),
      dueCount: due.length,
      remaining: Math.max(0, pool.length - SESSION_SIZE),
      statusOf: (w) => statuses.get(w.wordId)?.key || 'new',
    };
  }, [dueWords]);

  return (
    <div className="mem-lab-tab">
      <div className="mem-lab-hero">
        <div className="mem-lab-hero-icon"><RotateCcw size={26} strokeWidth={2.2} /></div>
        <div>
          <h2 className="mem-lab-hero-title">{c.title}</h2>
          <p className="mem-lab-hero-sub">{c.sub}</p>
        </div>
      </div>

      {loading ? (
        <div className="mem-loading"><div className="mem-spinner" /><span>{c.loading}</span></div>
      ) : batch.length > 0 ? (
        <div className="mem-due-section">
          <div className="mem-due-header">
            <span className="mem-due-title">{dueCount > 0 ? c.dueCount(dueCount) : c.allGood}</span>
          </div>
          {dueCount === 0 && <p className="mem-remaining-note">{c.allGoodSub}</p>}

          <div className="mem-due-preview">
            {batch.slice(0, 6).map((m) => (
              <div key={m.wordId} className="mem-due-chip">
                <span className="mem-due-chip-word">{m.wordData.word}</span>
                <span className={`mem-chip mem-chip--${statusOf(m)}`}>{lab.status[statusOf(m)]}</span>
              </div>
            ))}
            {batch.length > 6 && <div className="mem-due-chip more">{c.moreChip(batch.length - 6)}</div>}
          </div>

          <button className="mem-start-btn" onClick={() => onStart(batch)}>
            <Play size={18} />
            {c.start(batch.length)}
          </button>

          {remaining > 0 && <div className="mem-remaining-note">{c.batchNote(SESSION_SIZE)}</div>}
        </div>
      ) : (
        <div className="mem-no-due">
          <h3>{c.emptyTitle}</h3>
          <p>{c.emptySub}</p>
        </div>
      )}

      {allWords.length > 0 && (
        <div className="mem-explain">
          <h3>{c.howTitle}</h3>
          <ol>
            {c.how.map((line) => <li key={line}>{line}</li>)}
          </ol>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MemoryLab() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lab = labCopy(language);
  const [activeTab, setActiveTab] = useState('review');

  const {
    allWords, dueWords, memoryMap, confusionPairs, loading, error,
    session, startSession, submitReview, skipWord, endSession, reportConfusion,
  } = useMemoryExperiment();

  const inSession = !!session && !session.finished;
  const sessionDone = session?.finished;

  if (error) {
    return (
      <div className="mem-page mem-error-page">
        <h2>{lab.error.title}</h2>
        <p>{String(error)}</p>
        <button className="mem-btn-primary" onClick={() => navigate('/')}>{lab.error.home}</button>
      </div>
    );
  }

  const tabs = [
    { key: 'review', icon: <RotateCcw size={16} />, label: lab.tabs.review },
    { key: 'words', icon: <ListChecks size={16} />, label: lab.tabs.words },
    { key: 'results', icon: <BarChart2 size={16} />, label: lab.tabs.results },
  ];

  return (
    <div className="mem-page">
      {!inSession && !sessionDone && (
        <div className="mem-tab-bar">
          {tabs.map((tab) => (
            <button key={tab.key} className={`mem-tab ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="mem-content">
        {inSession && (
          <motion.div key="session" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%' }}>
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

        {sessionDone && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%' }}>
            <SessionResults session={session} onRestart={() => startSession(session.queue)} onDone={endSession} />
          </motion.div>
        )}

        {!inSession && !sessionDone && (
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} style={{ width: '100%' }}>
            {activeTab === 'review' && <ReviewTab dueWords={dueWords} allWords={allWords} onStart={startSession} loading={loading} />}
            {activeTab === 'words' && <MyWords memoryMap={memoryMap} confusionPairs={confusionPairs} loading={loading} />}
            {activeTab === 'results' && <ResultsPanel memoryMap={memoryMap} />}
          </motion.div>
        )}
      </div>
    </div>
  );
}
