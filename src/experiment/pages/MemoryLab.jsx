/**
 * Review page (route /experiment, still called "Memory Lab" in the code).
 *
 * One job: review the words that are due (start a session, answer, see the result). The
 * per-word memory view and the overall results live on the Statistics page now.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowLeft, Play, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { computeUserRate } from '@voc/memory-engine';

import { useMemoryExperiment } from '../useMemoryExperiment';
import { useLanguage } from '../../contexts/LanguageContext';
import { labCopy } from '../labContent';
import { wordStatus } from '../wordStatus';
import WordMemorySession from './WordMemorySession';
import StreakBanner from '../../components/Practice/StreakBanner';
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

// ─── Session results ─────────────────────────────────────────────────────────

function SessionResults({ session, streakInfo, onRestart, onDone }) {
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

      <StreakBanner info={streakInfo} />

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

/** Presentational page: everything comes in through `data` (the shape useMemoryExperiment returns). */
export function MemoryLabView({ data }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const lab = labCopy(language);

  const {
    allWords, dueWords, loading, error,
    session, streakInfo, startSession, submitReview, skipWord, endSession, reportConfusion,
  } = data;

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

  return (
    <div className="mem-page">
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
            <SessionResults session={session} streakInfo={streakInfo} onRestart={() => startSession(session.queue)} onDone={endSession} />
          </motion.div>
        )}

        {!inSession && !sessionDone && (
          <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} style={{ width: '100%' }}>
            <ReviewTab dueWords={dueWords} allWords={allWords} onStart={startSession} loading={loading} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function MemoryLab() {
  return <MemoryLabView data={useMemoryExperiment()} />;
}
