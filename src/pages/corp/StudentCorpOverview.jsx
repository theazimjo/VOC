import { useMemo, useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, CalendarDays, NotebookPen, X, Check } from 'lucide-react';
import { updateStudentWordTarget } from '../../services/corpService';
import { useGroupWordProgress } from '../../hooks/useGroupWordProgress';
import PackHeaderHero from '../../components/corp/PackHeaderHero';
import './StudentCorpOverview.css';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TARGET_STEP = 10;
const TARGET_MIN = 10;
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

// Rebuilds a date -> count activity log strictly from this group's own words'
// recallHistory, instead of the app-wide streak log, so the calendar reflects
// only what was actually reviewed in this group's curriculum.
function buildGroupActivityLog(words) {
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
  const { user, membership, student, assignedPacks, additionalPacks, requiredPacks } = useOutletContext();

  const { words, groupTotalWords, learnedWords } = useGroupWordProgress(
    user?.uid, assignedPacks, requiredPacks, additionalPacks
  );

  // The student's own goal overrides the group total as the ring's
  // denominator; null means "use the full group word count".
  const [customTarget, setCustomTarget] = useState(() => student?.wordTarget ?? null);
  const [editingTarget, setEditingTarget] = useState(false);
  const [draftTarget, setDraftTarget] = useState(null);

  const targetWords = customTarget ?? groupTotalWords;
  const learnedPct = targetWords > 0 ? Math.min(100, Math.round((learnedWords / targetWords) * 100)) : 0;
  const sliderMax = Math.max(2000, groupTotalWords);

  const openEditor = () => {
    setDraftTarget(customTarget ?? groupTotalWords);
    setEditingTarget(true);
  };

  const closeEditor = () => setEditingTarget(false);

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
    if (!membership?.centerId || !membership?.groupId || !user?.uid) return;
    try {
      await updateStudentWordTarget(membership.centerId, membership.groupId, user.uid, draftTarget);
    } catch (err) {
      console.error('Error saving word target:', err);
    }
  };

  // Drag-around-the-ring input for the target picker — angle from the
  // dial's center (0 at top, clockwise) maps directly to a value between
  // TARGET_MIN and sliderMax, snapped to TARGET_STEP.
  const dialRef = useRef(null);

  const valueFromPointer = (clientX, clientY) => {
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    const pct = angle / 360;
    const raw = TARGET_MIN + pct * (sliderMax - TARGET_MIN);
    return Math.min(sliderMax, Math.max(TARGET_MIN, Math.round(raw / TARGET_STEP) * TARGET_STEP));
  };

  const handleDialPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDraftTarget(valueFromPointer(e.clientX, e.clientY));
  };

  const handleDialPointerMove = (e) => {
    if (e.buttons !== 1) return;
    e.preventDefault();
    setDraftTarget(valueFromPointer(e.clientX, e.clientY));
  };

  const dialFraction = draftTarget != null ? (draftTarget - TARGET_MIN) / (sliderMax - TARGET_MIN) : 0;
  const dialTheta = dialFraction * 2 * Math.PI;
  const dialKnobX = DIAL_SIZE / 2 + DIAL_RADIUS * Math.sin(dialTheta);
  const dialKnobY = DIAL_SIZE / 2 - DIAL_RADIUS * Math.cos(dialTheta);

  const groupActivityLog = useMemo(() => buildGroupActivityLog(words), [words]);
  const { cells: calendarCells, month } = useMemo(
    () => getMonthCalendar(groupActivityLog),
    [groupActivityLog]
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

      <div className="corp-ov-grid">

        {/* ── Target words ── */}
        <PackHeaderHero
          icon={<Target size={22} />}
          tag={null}
          title="Target Words"
          subtitle={`${learnedWords} / ${targetWords} words learned`}
          masteryPct={learnedPct}
          metrics={[
            { icon: <Target size={16} />, label: 'TARGET', value: targetWords, color: 'blue', onClick: openEditor },
            { icon: <CheckCircle2 size={16} />, label: 'LEARNED', value: learnedWords, color: 'green' },
          ]}
        />

        {/* ── Personal calendar ── */}
        <div className="corp-ov-cal-card">
          <div className="corp-ov-cal-header">
            <span className="corp-ov-cal-title"><CalendarDays size={16} strokeWidth={2.2} /> Activity Calendar</span>
            <span className="corp-ov-cal-month">{MONTH_NAMES[month]}</span>
          </div>
          <p className="corp-ov-cal-summary">You've reviewed <strong>{monthTotal}</strong> words in this group this month</p>

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

        {/* ── Homework (placeholder) ── */}
        <div className="corp-ov-hw-card corp-ov-homework-card">
          <div className="corp-ov-hw-icon"><NotebookPen size={20} strokeWidth={2.2} /></div>
          <h3>Homework</h3>
          <p>No homework assigned yet. Tasks from your teacher will appear here.</p>
        </div>

      </div>

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
              <button type="button" className="corp-ov-target-close" onClick={closeEditor} aria-label="Close">
                <X size={18} strokeWidth={2.3} />
              </button>
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
              <div className="corp-ov-dial-knob" style={{ left: dialKnobX, top: dialKnobY }} />
              <div className="corp-ov-dial-center">
                <span className="corp-ov-dial-value">{draftTarget}</span>
                <span className="corp-ov-dial-unit">words</span>
              </div>
            </div>

            <p className="corp-ov-dial-hint">Drag the ring to set your target</p>

            <button type="button" className="corp-ov-target-save-btn" onClick={saveTarget}>
              <Check size={18} strokeWidth={2.6} /> Save Target
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
