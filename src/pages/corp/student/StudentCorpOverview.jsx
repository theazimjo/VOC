import { useMemo, useState, useEffect, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, CalendarDays, NotebookPen, X, Check, ChevronRight, PartyPopper, Swords } from 'lucide-react';
import { updateStudentWordTarget } from '../../../services/corpService';
import { subscribeGroupBattle } from '../../../services/groupBattleService';
import { useAccountWordProgress } from '../../../hooks/useAccountWordProgress';
import { corpWordStorageId } from '../../../utils/helpers';
import PackHeaderHero from '../../../components/corp/PackHeaderHero';
import GroupLiveBattle from '../../../components/corp/GroupLiveBattle';
import './StudentCorpOverview.css';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TARGET_STEP = 10;
const TARGET_MIN = 10;
// How much value one full 360° drag around the ring adds/removes — keeps
// mapping consistently no matter how many times you go around.
const DIAL_TURN_VALUE = 5000;
// A generous sanity ceiling, not a real-world target — just stops an
// accidental fast multi-spin from producing an absurd number.
const DIAL_ABSOLUTE_MAX = 200000;
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

// Rebuilds a date -> count activity log from every word's own recallHistory
// (account-wide — any group, any center, individual mode too), instead of
// the app-wide streak log, so the calendar reflects real reviews.
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

export default function StudentCorpOverview() {
  const { user, homeworkList, wordTarget, membership } = useOutletContext();
  const navigate = useNavigate();

  const [activeBattle, setActiveBattle] = useState(null);
  const [showBattleModal, setShowBattleModal] = useState(false);

  useEffect(() => {
    if (!membership?.groupId) return;
    const unsub = subscribeGroupBattle(membership.groupId, (battle) => {
      setActiveBattle(battle);
    });
    return () => unsub();
  }, [membership?.groupId]);

  const { words, totalWords, learnedWords } = useAccountWordProgress(user?.uid);

  // Flattened across every assignment the teacher has ever given (see
  // corpService.addGroupHomework) — homework items are just pointers at
  // existing Asosiy/Qo'shimcha topics, so "done" reuses the exact same
  // decayed-mastery words this page already computed above; practicing a
  // topic from Learn or from here updates the identical record either way.
  const homeworkItems = useMemo(() => {
    const allItems = (homeworkList || []).flatMap(hw => hw.items || []);
    return allItems.map(item => {
      const sourceId = corpWordStorageId(item.packId, item.monthId, item.unitId);
      const itemWords = words.filter(w => w.sourceId === sourceId);
      const masteryPct = itemWords.length > 0
        ? Math.round(itemWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / itemWords.length)
        : 0;
      return { ...item, masteryPct, done: masteryPct >= 80 };
    });
  }, [homeworkList, words]);
  const homeworkDoneCount = homeworkItems.filter(i => i.done).length;

  // The student's own goal overrides the account-wide total as the ring's
  // denominator; null means "use the total words touched so far". `wordTarget`
  // itself is live (StudentLayout subscribes to users/{uid}/profile/wordTarget),
  // so it's mirrored into local state to allow an instant optimistic update
  // on save without waiting for the round trip back down.
  const [customTarget, setCustomTarget] = useState(wordTarget);
  useEffect(() => { setCustomTarget(wordTarget); }, [wordTarget]);
  const [editingTarget, setEditingTarget] = useState(false);
  const [draftTarget, setDraftTarget] = useState(null);

  const targetWords = customTarget ?? totalWords;
  const learnedPct = targetWords > 0 ? Math.min(100, Math.round((learnedWords / targetWords) * 100)) : 0;
  // Capped at the target itself — learnedWords (account-wide) can keep
  // growing past it, but the card should read "100/100, goal reached", not
  // an odd-looking "137/100".
  const targetReached = learnedWords >= targetWords && targetWords > 0;
  const displayLearned = targetReached ? targetWords : learnedWords;
  // Once the target's been reached, the editor session it opens into is
  // locked: no closing without saving, and the dial itself can't be dragged
  // back down to (or below) the value that was just reached.
  const mustRaiseTarget = targetReached;
  const dialMin = mustRaiseTarget ? targetWords + TARGET_STEP : TARGET_MIN;

  // Reaching the target isn't the end — it's shown as a congratulations
  // screen with no way to dismiss it (no close button, no click-outside),
  // and raising the target via "Set New Target" is the only way past it —
  // no silent auto-raise, no skipping it either.
  const showCongrats = targetReached && !editingTarget;

  const openEditor = () => {
    setDraftTarget(customTarget ?? totalWords);
    setEditingTarget(true);
  };

  // Locked while a just-reached target still needs raising — nothing to
  // fall back to that wouldn't just be the value they already hit.
  const closeEditor = () => {
    if (mustRaiseTarget) return;
    setEditingTarget(false);
  };

  const startNewTarget = () => {
    // Opens already above the just-reached target, step-aligned, instead of
    // at the old value — there's no valid lower starting point to show.
    setDraftTarget(targetWords + TARGET_STEP);
    setEditingTarget(true);
  };

  // Lock page scroll while the modal is open — otherwise dragging the dial
  // on a touch screen also drags the page behind it.
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

  const activityLog = useMemo(() => buildActivityLog(words), [words]);
  const { cells: calendarCells, month } = useMemo(
    () => getMonthCalendar(activityLog),
    [activityLog]
  );
  const monthTotal = useMemo(
    () => calendarCells.reduce((sum, c) => sum + (c?.count || 0), 0),
    [calendarCells]
  );

  const displayName = user?.displayName || user?.email?.split('@')[0] || "Student";

  return (
    <div className="corp-ov-container">

      {/* ── Header ── */}
      <div className="corp-ov-topbar">
        <span className="corp-ov-eyebrow">Welcome back</span>
        <h1 className="corp-ov-name">{displayName}</h1>
      </div>

      {/* ── Live Group Battle Floating Banner ── */}
      {activeBattle && (activeBattle.status === 'lobby' || activeBattle.status === 'active') && (
        <div className="corp-ov-battle-banner">
          <div className="cobb-left">
            <div className="cobb-icon">
              <Swords size={24} />
            </div>
            <div>
              <h3 className="cobb-title">🔥 Live Battle Room Open!</h3>
              <p className="cobb-sub">
                Hosted by {activeBattle.teacherName || 'Teacher'} · {activeBattle.questions?.length || 10} Words · {activeBattle.status === 'lobby' ? 'Waiting for players' : 'In Progress'}
              </p>
            </div>
          </div>
          <button type="button" className="cobb-btn" onClick={() => setShowBattleModal(true)}>
            ⚡ Enter Battle
          </button>
        </div>
      )}

      {/* ── Dedicated Full Screen Battle Modal ── */}
      {(showBattleModal || (activeBattle && activeBattle.participants?.[user?.uid] && activeBattle.status !== 'finished')) && (
        <GroupLiveBattle
          groupId={membership?.groupId}
          groupName={membership?.groupName || 'Group'}
          isTeacher={false}
          userUid={user?.uid}
          userName={displayName}
          isModal={true}
          onClose={() => setShowBattleModal(false)}
        />
      )}

      <div className="corp-ov-grid">

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
        <div className="corp-ov-cal-card">
          <div className="corp-ov-cal-header">
            <span className="corp-ov-cal-title"><CalendarDays size={16} strokeWidth={2.2} /> Activity Calendar</span>
            <span className="corp-ov-cal-month">{MONTH_NAMES[month]}</span>
          </div>
          <p className="corp-ov-cal-summary">You've completed <strong>{monthTotal}</strong> reviews this month</p>

          <div className="corp-ov-cal-weekdays">
            {WEEKDAY_LABELS.map(d => <span key={d} className="corp-ov-cal-weekday">{d}</span>)}
          </div>
          <div className="corp-ov-cal-grid">
            {calendarCells.map((cell, idx) => (
              cell ? (
                <div key={cell.dateStr} className={`corp-ov-cal-cell ${cell.count > 0 ? 'active' : ''} ${cell.isToday ? 'today' : ''}`}>
                  <span className="corp-ov-cal-day">{cell.day}</span>
                  {cell.count > 0 && <span className="corp-ov-cal-count">{cell.count}</span>}
                </div>
              ) : (
                <div key={`empty-${idx}`} className="corp-ov-cal-cell empty" />
              )
            ))}
          </div>
        </div>

        {/* ── Homework ── */}
        <div className="corp-ov-hw-card corp-ov-homework-card">
          <div className="corp-ov-hw-header">
            <div className="corp-ov-hw-header-left">
              <div className="corp-ov-hw-icon"><NotebookPen size={20} strokeWidth={2.2} /></div>
              <h3>Homework</h3>
            </div>
            {homeworkItems.length > 0 && (
              <span className="corp-ov-hw-count">{homeworkDoneCount}/{homeworkItems.length} done</span>
            )}
          </div>

          {homeworkItems.length === 0 ? (
            <p>No homework assigned yet. Tasks from your teacher will appear here.</p>
          ) : (
            <div className="corp-ov-hw-list">
              {homeworkItems.map(item => (
                <button
                  key={`${item.packId}_${item.monthId}_${item.unitId}`}
                  type="button"
                  className={`corp-ov-hw-item ${item.done ? 'done' : ''}`}
                  onClick={() => navigate(`/corp/student/learn/topic/${item.packId}/${item.monthId}/${item.unitId}?from=homework`)}
                >
                  <div className={`corp-ov-hw-item-check ${item.done ? 'done' : ''}`}>
                    {item.done && <Check size={13} strokeWidth={3} />}
                  </div>
                  <div className="corp-ov-hw-item-text">
                    <span className="corp-ov-hw-item-title">{item.unitTitle}</span>
                    <span className="corp-ov-hw-item-sub">{item.packTitle} · {item.masteryPct}%</span>
                  </div>
                  <ChevronRight size={16} className="corp-ov-hw-item-arrow" />
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── Congratulations screen: shown once the target is reached.
          Fully locked, same as the dial it leads into — no close button,
          no dismissing by clicking outside. Setting a higher target via
          "Set New Target" is the only way past it. ── */}
      {showCongrats && (
        <div className="corp-ov-target-overlay">
          <motion.div
            className="corp-ov-target-editor corp-ov-congrats"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="corp-ov-congrats-icon"><PartyPopper size={34} strokeWidth={2} /></div>
            <h3 className="corp-ov-congrats-title">Congratulations! 🎉</h3>
            <p className="corp-ov-congrats-text">
              You've reached your target — <strong>{targetWords} / {targetWords}</strong> words learned!
            </p>

            <button type="button" className="corp-ov-target-save-btn" onClick={startNewTarget}>
              <Target size={18} strokeWidth={2.6} /> Set New Target
            </button>
          </motion.div>
        </div>
      )}

      {/* ── Target editor modal: drag-around-the-ring picker ── */}
      {editingTarget && (
        <div className="corp-ov-target-overlay" onClick={closeEditor}>
          <motion.div
            className="corp-ov-target-editor"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="corp-ov-target-header">
              <div className="corp-ov-target-header-icon"><Target size={18} strokeWidth={2.3} /></div>
              <h3>Set Your Target</h3>
              {!mustRaiseTarget && (
                <button type="button" className="corp-ov-target-close" onClick={closeEditor} aria-label="Close">
                  <X size={18} strokeWidth={2.3} />
                </button>
              )}
            </div>

            <div
              ref={dialRef}
              className="corp-ov-dial"
              onPointerDown={handleDialPointerDown}
              onPointerMove={handleDialPointerMove}
            >
              <svg width={DIAL_SIZE} height={DIAL_SIZE} viewBox={`0 0 ${DIAL_SIZE} ${DIAL_SIZE}`}>
                <circle
                  className="corp-ov-dial-track"
                  cx={DIAL_SIZE / 2}
                  cy={DIAL_SIZE / 2}
                  r={DIAL_RADIUS}
                  strokeWidth={DIAL_STROKE}
                  style={{ stroke: dialTrackColor, transition: 'stroke 250ms ease' }}
                />
                <circle
                  className="corp-ov-dial-fill"
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
                className="corp-ov-dial-knob"
                style={{ transform: `translate(${dialKnobX - 11}px, ${dialKnobY - 11}px)` }}
              />
              <div className="corp-ov-dial-center">
                <span className="corp-ov-dial-value">{draftTarget}</span>
                <span className="corp-ov-dial-unit">words</span>
              </div>
            </div>

            <p className="corp-ov-dial-hint">
              {mustRaiseTarget
                ? `You've hit ${targetWords} — drag to set a higher target to keep going`
                : 'Drag the ring to set your target'}
            </p>

            <button
              type="button"
              className="corp-ov-target-save-btn"
              onClick={saveTarget}
              disabled={mustRaiseTarget && draftTarget <= targetWords}
            >
              <Check size={18} strokeWidth={2.6} /> Save Target
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
