import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, CalendarDays, RotateCcw, X, Check, ChevronRight, PartyPopper } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePacks } from '../../hooks/usePacks';
import { useWordTarget } from '../../hooks/useWordTarget';
import { updateStudentWordTarget } from '../../services/corpService';
import { computeRecallProbability } from '../../utils/memoryEngine';
import OnboardingModal from '../../components/Onboarding/OnboardingModal';
import WhatsNewModal, { WHATS_NEW_VERSION } from '../../components/Onboarding/WhatsNewModal';
import PackHeaderHero from '../../components/corp/PackHeaderHero';
import './Dashboard.css';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const TARGET_STEP = 10;
const TARGET_MIN = 10;
// Kept far below corp's 5000 — an individual learner's realistic goal is a
// few hundred words, not a few thousand; still scales past this if their
// own word count already exceeds it.
const TARGET_MAX_DEFAULT = 500;
// How much value one full 360° drag around the ring adds/removes — keeps
// mapping consistently no matter how many times you go around.
const DIAL_TURN_VALUE = TARGET_MAX_DEFAULT;
// A generous sanity ceiling, not a real-world target — just stops an
// accidental fast multi-spin from producing an absurd number.
const DIAL_ABSOLUTE_MAX = 50000;
// Cycled through as the track color once you've spun past one full lap —
// lap 0 is the default neutral track; each further lap tints it.
const DIAL_TRACK_COLORS = ['var(--bg-tertiary)', 'var(--accent-2-dim)', 'var(--accent-3-dim)', 'var(--error-dim)'];
const DIAL_SIZE = 200;
const DIAL_STROKE = 16;
const DIAL_RADIUS = (DIAL_SIZE - DIAL_STROKE) / 2;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;

function getLocalDateString(d) {
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
}

/** Current recall probability P(t) = e^(-t/S) for a word, given its stability and last review. */
function getRecallInfo(word) {
  const stability = typeof word.stability === 'number' ? word.stability : 1.0;
  const daysSince = word.lastReviewed ? (Date.now() - new Date(word.lastReviewed).getTime()) / 86400000 : 0;
  const pct = Math.round(computeRecallProbability(stability, daysSince) * 100);
  const color = pct < 50 ? 'var(--error)' : pct < 75 ? 'var(--warning)' : 'var(--success)';
  return { pct, color };
}

// Builds the current month as a 7-column grid: leading nulls to align the
// 1st on its real weekday, then one cell per day with that day's activity count.
function getMonthCalendar(activityLog = {}) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = getLocalDateString(today);

  const cells = Array.from({ length: startWeekday }, () => null);
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = getLocalDateString(new Date(year, month, day));
    cells.push({
      day,
      dateStr,
      count: activityLog[dateStr] || 0,
      isToday: dateStr === todayStr,
    });
  }
  return { cells, year, month };
}

// Rebuilds a date -> count activity log from every word's own recallHistory,
// same approach as the corp dashboard's calendar.
function buildActivityLog(words) {
  const log = {};
  words.forEach(w => {
    (w.recallHistory || []).forEach(entry => {
      if (!entry.result || !entry.ts) return;
      const dateStr = getLocalDateString(new Date(entry.ts));
      log[dateStr] = (log[dateStr] || 0) + 1;
    });
  });
  return log;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { allWords, packs, loading: packsLoading } = usePacks();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || packsLoading) return;
    const onboardingDone = localStorage.getItem(`voc-onboarding-done-${user.uid}`);
    const needsOnboarding = !onboardingDone && packs.length === 0;

    if (needsOnboarding) {
      setShowOnboarding(true);
      return;
    }

    const whatsNewSeen = localStorage.getItem(`voc-whatsnew-seen-${WHATS_NEW_VERSION}-${user.uid}`);
    if (!whatsNewSeen) {
      setShowWhatsNew(true);
    }
  }, [user, packsLoading, packs]);

  const handleCloseWhatsNew = () => {
    if (user) localStorage.setItem(`voc-whatsnew-seen-${WHATS_NEW_VERSION}-${user.uid}`, 'true');
    setShowWhatsNew(false);
  };

  const totalWords = allWords.length;
  const learnedWords = useMemo(() => allWords.filter(w => (w.mastery || 0) >= 80).length, [allWords]);

  const dueWordsList = useMemo(() => {
    const now = new Date();
    const due = allWords.filter(w => !w.nextReview || new Date(w.nextReview) <= now);
    // Most at-risk first — lowest current recall probability, not just oldest
    // due date, since two overdue words with different stability forget at
    // different rates.
    return [...due].sort((a, b) => getRecallInfo(a).pct - getRecallInfo(b).pct);
  }, [allWords]);
  const dueWords = dueWordsList.length;

  // Same account-level field the corp "Target Words" card reads/writes
  // (users/{uid}/profile/wordTarget) — mirrored into local state for an
  // instant optimistic update on save without waiting on the round trip.
  const wordTarget = useWordTarget(user?.uid);
  const [customTarget, setCustomTarget] = useState(wordTarget);
  useEffect(() => { setCustomTarget(wordTarget); }, [wordTarget]);
  const [editingTarget, setEditingTarget] = useState(false);
  const [draftTarget, setDraftTarget] = useState(null);

  const targetWords = customTarget ?? totalWords;
  const learnedPct = targetWords > 0 ? Math.min(100, Math.round((learnedWords / targetWords) * 100)) : 0;
  const targetReached = learnedWords >= targetWords && targetWords > 0;
  const displayLearned = targetReached ? targetWords : learnedWords;
  const mustRaiseTarget = targetReached;
  const dialMin = mustRaiseTarget ? targetWords + TARGET_STEP : TARGET_MIN;
  const showCongrats = targetReached && !editingTarget;

  const openEditor = () => {
    setDraftTarget(customTarget ?? totalWords);
    setEditingTarget(true);
  };

  const closeEditor = () => {
    if (mustRaiseTarget) return;
    setEditingTarget(false);
  };

  const startNewTarget = () => {
    setDraftTarget(targetWords + TARGET_STEP);
    setEditingTarget(true);
  };

  useEffect(() => {
    if (!editingTarget) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [editingTarget]);

  const saveTarget = async () => {
    setCustomTarget(draftTarget);
    setEditingTarget(false);
    if (!user?.uid) return;
    try {
      await updateStudentWordTarget(user.uid, draftTarget);
    } catch (err) {
      console.error('Error saving word target:', err);
    }
  };

  // Drag-around-the-ring input for the target picker. The knob always sits
  // exactly under the pointer's angle (direct, not relative — dragging
  // anywhere else on the ring would otherwise feel disconnected from the
  // finger). Crossing back over the top of the circle counts as a lap —
  // that's what lets the value keep climbing past a single 360° sweep
  // instead of being capped by it, without breaking the direct knob→finger
  // correspondence.
  const dialRef = useRef(null);
  const dialLastAngleRef = useRef(null);
  const dialLapRef = useRef(0);

  const angleFromPointer = (clientX, clientY) => {
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const raw = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    return (raw + 90 + 360) % 360; // 0 at top, clockwise
  };

  const handleDialPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const angle = angleFromPointer(e.clientX, e.clientY);
    dialLastAngleRef.current = angle;
    // Re-derive which lap the current value sits on, so grabbing the dial
    // again mid-range (not just at dialMin) starts from the right lap.
    const base = draftTarget ?? dialMin;
    dialLapRef.current = Math.floor((base - dialMin) / DIAL_TURN_VALUE);
  };

  const handleDialPointerMove = (e) => {
    if (e.buttons !== 1 || dialLastAngleRef.current === null) return;
    e.preventDefault();

    const angle = angleFromPointer(e.clientX, e.clientY);
    // Crossing the 0°/360° seam in either direction — bump the lap count
    // the same way an odometer rolls over, then keep tracking from here.
    const delta = angle - dialLastAngleRef.current;
    if (delta > 180) dialLapRef.current -= 1;
    else if (delta < -180) dialLapRef.current += 1;
    dialLastAngleRef.current = angle;

    const raw = dialMin + dialLapRef.current * DIAL_TURN_VALUE + (angle / 360) * DIAL_TURN_VALUE;
    const next = Math.round(raw / TARGET_STEP) * TARGET_STEP;
    setDraftTarget(Math.min(DIAL_ABSOLUTE_MAX, Math.max(dialMin, next)));
  };

  // Knob angle mirrors the finger directly: dialLap only affects the
  // accumulated *value*, not where the knob sits within the current lap.
  // The ring fill uses this exact same fraction — they always move
  // together, sweeping a full circle and looping each lap, like a
  // stopwatch hand — rather than the fill tracking overall progress
  // toward some total while the knob tracks something else entirely.
  const dialFraction = draftTarget != null
    ? (((draftTarget - dialMin) % DIAL_TURN_VALUE) + DIAL_TURN_VALUE) % DIAL_TURN_VALUE / DIAL_TURN_VALUE
    : 0;
  const dialTheta = dialFraction * 2 * Math.PI;
  const dialKnobX = DIAL_SIZE / 2 + DIAL_RADIUS * Math.sin(dialTheta);
  const dialKnobY = DIAL_SIZE / 2 - DIAL_RADIUS * Math.cos(dialTheta);
  // The track (the ring's "empty" background) recolors each completed lap
  // — the only way to tell at a glance that you've been around before,
  // since the fill itself just loops back to looking identical every lap.
  const dialLap = draftTarget != null ? Math.max(0, Math.floor((draftTarget - dialMin) / DIAL_TURN_VALUE)) : 0;
  const dialTrackColor = DIAL_TRACK_COLORS[dialLap % DIAL_TRACK_COLORS.length];

  const activityLog = useMemo(() => buildActivityLog(allWords), [allWords]);
  const { cells: calendarCells, month } = useMemo(
    () => getMonthCalendar(activityLog),
    [activityLog]
  );
  const monthTotal = useMemo(
    () => calendarCells.reduce((sum, c) => sum + (c?.count || 0), 0),
    [calendarCells]
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Hello';
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <div className="dash-ov-container">

      <div className="dash-ov-topbar">
        <span className="dash-ov-eyebrow">{getGreeting()}</span>
        <h1 className="dash-ov-name">{displayName}</h1>
      </div>

      <div className="dash-ov-grid">

        {/* ── Target words ── */}
        <PackHeaderHero
          icon={<Target size={22} />}
          tag={targetReached ? 'Target reached 🎉' : null}
          title="Target Words"
          subtitle={targetReached
            ? `You've reached your goal of ${targetWords} words — set a new target to keep going`
            : `${displayLearned} / ${targetWords} words learned`}
          masteryPct={learnedPct}
          metrics={[
            { icon: <Target size={16} />, label: 'TARGET', value: targetWords, color: 'blue', onClick: openEditor },
            { icon: <CheckCircle2 size={16} />, label: 'LEARNED', value: displayLearned, color: 'green' },
          ]}
        />

        {/* ── Personal calendar ── */}
        <div className="dash-ov-cal-card">
          <div className="dash-ov-cal-header">
            <span className="dash-ov-cal-title"><CalendarDays size={16} strokeWidth={2.2} /> Activity Calendar</span>
            <span className="dash-ov-cal-month">{MONTH_NAMES[month]}</span>
          </div>
          <p className="dash-ov-cal-summary">You've completed <strong>{monthTotal}</strong> reviews this month</p>

          <div className="dash-ov-cal-weekdays">
            {WEEKDAY_LABELS.map(d => <span key={d} className="dash-ov-cal-weekday">{d}</span>)}
          </div>
          <div className="dash-ov-cal-grid">
            {calendarCells.map((cell, idx) => (
              cell ? (
                <div key={cell.dateStr} className={`dash-ov-cal-cell ${cell.count > 0 ? 'active' : ''} ${cell.isToday ? 'today' : ''}`}>
                  <span className="dash-ov-cal-day">{cell.day}</span>
                  {cell.count > 0 && <span className="dash-ov-cal-count">{cell.count}</span>}
                </div>
              ) : (
                <div key={`empty-${idx}`} className="dash-ov-cal-cell empty" />
              )
            ))}
          </div>
        </div>

        {/* ── Words due for repetition (the individual analog of corp's
            teacher-assigned Homework card) ── */}
        <div className="dash-ov-hw-card dash-ov-homework-card">
          <div className="dash-ov-hw-header">
            <div className="dash-ov-hw-header-left">
              <div className="dash-ov-hw-icon"><RotateCcw size={20} strokeWidth={2.2} /></div>
              <h3>Due for Review</h3>
            </div>
            {dueWords > 0 && (
              <span className="dash-ov-hw-count">{dueWords} words</span>
            )}
          </div>

          {dueWords === 0 ? (
            <p>No words due for review right now. Great job!</p>
          ) : (
            <>
              <div className="dash-ov-hw-list">
                {dueWordsList.slice(0, 6).map(word => {
                  const recall = getRecallInfo(word);
                  return (
                    <button
                      key={word.id}
                      type="button"
                      className="dash-ov-hw-item"
                      onClick={() => navigate('/mixed-practice?filter=due')}
                    >
                      <div className="dash-ov-hw-item-check" style={{ backgroundColor: `${recall.color}15`, color: recall.color, borderColor: 'transparent' }}>
                        {recall.pct}%
                      </div>
                      <div className="dash-ov-hw-item-text">
                        <span className="dash-ov-hw-item-title">{word.word}</span>
                        <span className="dash-ov-hw-item-sub">{word.translation}</span>
                      </div>
                      <ChevronRight size={16} className="dash-ov-hw-item-arrow" />
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className="dash-ov-hw-practice-btn"
                onClick={() => navigate('/mixed-practice?filter=due')}
              >
                Start Review
              </button>
            </>
          )}
        </div>

      </div>

      {/* ── Congratulations screen — locked until a new target is set ── */}
      {showCongrats && (
        <div className="dash-ov-target-overlay">
          <motion.div
            className="dash-ov-target-editor dash-ov-congrats"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="dash-ov-congrats-icon"><PartyPopper size={34} strokeWidth={2} /></div>
            <h3 className="dash-ov-congrats-title">Congratulations! 🎉</h3>
            <p className="dash-ov-congrats-text">
              You've reached your target — <strong>{targetWords} / {targetWords}</strong> words learned!
            </p>

            <button type="button" className="dash-ov-target-save-btn" onClick={startNewTarget}>
              <Target size={18} strokeWidth={2.6} /> Set New Target
            </button>
          </motion.div>
        </div>
      )}

      {/* ── Target editor modal: drag-around-the-ring picker ── */}
      {editingTarget && (
        <div className="dash-ov-target-overlay" onClick={closeEditor}>
          <motion.div
            className="dash-ov-target-editor"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="dash-ov-target-header">
              <div className="dash-ov-target-header-icon"><Target size={18} strokeWidth={2.3} /></div>
              <h3>Set Your Target</h3>
              {!mustRaiseTarget && (
                <button type="button" className="dash-ov-target-close" onClick={closeEditor} aria-label="Close">
                  <X size={18} strokeWidth={2.3} />
                </button>
              )}
            </div>

            <div
              ref={dialRef}
              className="dash-ov-dial"
              onPointerDown={handleDialPointerDown}
              onPointerMove={handleDialPointerMove}
            >
              <svg width={DIAL_SIZE} height={DIAL_SIZE} viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}>
                <circle
                  className="dash-ov-dial-track"
                  cx={DIAL_SIZE / 2}
                  cy={DIAL_SIZE / 2}
                  r={DIAL_RADIUS}
                  strokeWidth={DIAL_STROKE}
                  style={{ stroke: dialTrackColor, transition: 'stroke 250ms ease' }}
                />
                <circle
                  className="dash-ov-dial-fill"
                  cx={DIAL_SIZE / 2}
                  cy={DIAL_SIZE / 2}
                  r={DIAL_RADIUS}
                  strokeWidth={DIAL_STROKE}
                  strokeDasharray={DIAL_CIRCUMFERENCE}
                  strokeDashoffset={DIAL_CIRCUMFERENCE - dialFraction * DIAL_CIRCUMFERENCE}
                  transform={`rotate(-90 ${DIAL_SIZE / 2} ${DIAL_SIZE / 2})`}
                />
              </svg>
              <div
                className="dash-ov-dial-knob"
                style={{ transform: `translate(${dialKnobX - 11}px, ${dialKnobY - 11}px)` }}
              />
              <div className="dash-ov-dial-center">
                <span className="dash-ov-dial-value">{draftTarget}</span>
                <span className="dash-ov-dial-unit">words</span>
              </div>
            </div>

            <p className="dash-ov-dial-hint">
              {mustRaiseTarget
                ? `You've hit ${targetWords} — drag to set a higher target to keep going`
                : 'Drag the ring to set your target'}
            </p>

            <button
              type="button"
              className="dash-ov-target-save-btn"
              onClick={saveTarget}
              disabled={mustRaiseTarget && draftTarget <= targetWords}
            >
              <Check size={18} strokeWidth={2.6} /> Save Target
            </button>
          </motion.div>
        </div>
      )}

      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}

      {showWhatsNew && (
        <WhatsNewModal onClose={handleCloseWhatsNew} />
      )}

    </div>
  );
}
