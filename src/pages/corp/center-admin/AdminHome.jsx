import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Calendar, Check, ChevronDown, ChevronRight, Clock, GraduationCap, RefreshCw, Settings, Target, User, Users } from 'lucide-react';
import { formatRelativeEn, latestUnitActivity, studentMastery, studentTimeSpent } from '../super-admin/centerActivity';
import { Page, Row } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';

const DAY = 24 * 60 * 60 * 1000;

const DATE_RANGES = [
  { value: 'yesterday', label: 'Yesterday', days: 1 },
  { value: 'week', label: 'Last Week', days: 7 },
  { value: 'month', label: 'Last Month', days: 30 },
];

// Mastery buckets for the breakdown bar — same thresholds as the rest of
// the module's bars (.ca-topic-bar is-good / is-mid / is-low).
const LEVELS = [
  { key: 'strong', label: 'Strong', hint: '70%+', cls: 'is-good' },
  { key: 'learning', label: 'Learning', hint: '40–69%', cls: 'is-mid' },
  { key: 'help', label: 'Needs help', hint: 'under 40%', cls: 'is-low' },
  { key: 'none', label: 'Not started', hint: 'no practice yet', cls: 'is-none' },
];

const levelOf = (mastery) => {
  if (mastery == null) return 'none';
  if (mastery >= 70) return 'strong';
  if (mastery >= 40) return 'learning';
  return 'help';
};

const barCls = (m) => (m >= 70 ? 'is-good' : m >= 40 ? 'is-mid' : 'is-low');

const formatDuration = (totalSeconds) => {
  const s = Math.round(totalSeconds || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${String(s % 60).padStart(2, '0')}s`;
  return `${s}s`;
};

const fmtDay = (ts) => new Date(ts).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

const AVATAR_TONES = ['blue', 'green', 'purple', 'orange', 'pink', 'teal'];
const toneFor = (id = '') => AVATAR_TONES[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_TONES.length];

// Center admin home: Student Activity. One date filter drives the whole
// page (active students, time spent, the ranking); mastery is all-time.
// Every number comes from progress data students already write
// (corpService.updateStudentUnitProgress): "practiced" from `lastActivity`
// (on every practiced unit), time from `timeSpentSeconds` (only on units
// practiced since time tracking was added — so the time tile says so
// instead of showing 0 when it has nothing yet). No teacher leaderboard;
// that lives on Faculty / Teacher Detail.
export default function AdminHome() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, reload, students } = useCenterData();
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('week');
  const [dateOpen, setDateOpen] = useState(false);
  const dateMenuRef = useRef(null);
  const activeRange = DATE_RANGES.find((r) => r.value === dateRange) || DATE_RANGES[1];

  useEffect(() => {
    if (!dateOpen) return;
    const onClick = (e) => {
      if (dateMenuRef.current && !dateMenuRef.current.contains(e.target)) setDateOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [dateOpen]);

  const refresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  const now = Date.now();
  const sinceTs = now - activeRange.days * DAY;

  const rows = useMemo(() => students.map((st) => ({
    ...st,
    lastTs: latestUnitActivity(st),
    timeSeconds: studentTimeSpent(st, { sinceTs }),
    mastery: studentMastery(st),
  })), [students, sinceTs]);

  const stats = useMemo(() => {
    const total = rows.length;
    const practiced = rows.filter((r) => r.lastTs > 0).length;
    const active = rows.filter((r) => r.lastTs >= sinceTs).length;
    const timed = rows.filter((r) => r.timeSeconds > 0);
    const avgTime = timed.length ? timed.reduce((a, r) => a + r.timeSeconds, 0) / timed.length : null;
    const mastered = rows.filter((r) => r.mastery != null);
    const avgMastery = mastered.length ? Math.round(mastered.reduce((a, r) => a + r.mastery, 0) / mastered.length) : null;
    const levels = { strong: 0, learning: 0, help: 0, none: 0 };
    rows.forEach((r) => { levels[levelOf(r.mastery)] += 1; });
    return { total, practiced, active, timedCount: timed.length, avgTime, avgMastery, levels };
  }, [rows, sinceTs]);

  // Active in the range = practiced in it at all; ranked by recorded time,
  // then by most recent practice.
  const topStudents = useMemo(() => rows
    .filter((r) => r.lastTs >= sinceTs)
    .sort((a, b) => b.timeSeconds - a.timeSeconds || b.lastTs - a.lastTs)
    .slice(0, 8), [rows, sinceTs]);

  const pct = (n) => (stats.total ? Math.round((n / stats.total) * 100) : 0);
  const rangeText = activeRange.days === 1 ? `Yesterday, ${fmtDay(sinceTs)}` : `${fmtDay(sinceTs)} — ${fmtDay(now)}`;

  const tiles = [
    {
      key: 'active',
      icon: <Activity size={18} />,
      tone: 'blue',
      label: `Active · ${activeRange.label.toLowerCase()}`,
      value: stats.active,
      suffix: stats.total ? `/ ${stats.total}` : null,
      bar: pct(stats.active),
      foot: stats.total ? `${pct(stats.active)}% of students practiced` : 'No students yet',
    },
    {
      key: 'time',
      icon: <Clock size={18} />,
      tone: 'purple',
      label: 'Avg time per student',
      value: stats.avgTime == null ? '—' : formatDuration(stats.avgTime),
      foot: stats.timedCount
        ? `${stats.timedCount} ${stats.timedCount === 1 ? 'student' : 'students'} with recorded time`
        : 'Recorded from the next practice session',
    },
    {
      key: 'mastery',
      icon: <Target size={18} />,
      tone: 'green',
      label: 'Avg mastery',
      value: stats.avgMastery == null ? '—' : `${stats.avgMastery}%`,
      bar: stats.avgMastery,
      barCls: stats.avgMastery == null ? '' : barCls(stats.avgMastery),
      foot: 'Across every practiced topic',
    },
    {
      key: 'practiced',
      icon: <GraduationCap size={18} />,
      tone: 'orange',
      label: 'Ever practiced',
      value: stats.practiced,
      suffix: stats.total ? `/ ${stats.total}` : null,
      foot: stats.total - stats.practiced > 0
        ? `${stats.total - stats.practiced} haven't started yet`
        : stats.total ? 'Everyone has started' : 'No students yet',
    },
  ];

  return (
    <Page hideHeader>
      <section className="ca-block">
        <div className="ca-dash-head">
          <div>
            <h2 className="ca-title-lg">
              <span className="ca-title-lg-icon"><Users size={24} /></span>
              Student Activity
            </h2>
            <span className="ca-dash-range">{activeRange.label}: {rangeText}</span>
          </div>
          <div className="ca-dash-head-actions">
            <div className="ca-daterange" ref={dateMenuRef}>
              <button type="button" className="ca-dash-btn" onClick={() => setDateOpen((o) => !o)} aria-expanded={dateOpen}>
                <Calendar size={14} /> {activeRange.label} <ChevronDown size={14} />
              </button>
              {dateOpen && (
                <div className="ca-daterange-menu">
                  {DATE_RANGES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      className={`ca-daterange-item ${r.value === dateRange ? 'is-active' : ''}`}
                      onClick={() => { setDateRange(r.value); setDateOpen(false); }}
                    >
                      {r.label}
                      {r.value === dateRange && <Check size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className="ca-dash-btn is-icon" onClick={refresh} disabled={refreshing || loading} aria-label="Refresh" title="Refresh">
              <RefreshCw size={14} className={refreshing ? 'ca-spin' : ''} />
            </button>
            {/* the phone's bottom bar has no Settings tab */}
            {!isDesktop && (
              <button type="button" className="ca-dash-btn is-icon" onClick={() => navigate('/corp/admin/settings')} aria-label="Settings" title="Settings">
                <Settings size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="ca-dash-tiles">
          {tiles.map((t) => (
            <div key={t.key} className="ca-dash-tile">
              <div className="ca-dash-tile-top">
                <span className={`ca-dash-tile-icon tone-${t.tone}`}>{t.icon}</span>
                <span className="ca-dash-tile-label">{t.label}</span>
              </div>
              <div className="ca-dash-tile-value">
                {loading ? <span className="ca-dash-skeleton" /> : (
                  <>
                    {t.value}
                    {t.suffix && <span className="ca-dash-tile-suffix">{t.suffix}</span>}
                  </>
                )}
              </div>
              {t.bar != null && !loading && (
                <div className="ca-dash-bar"><span className={t.barCls || 'is-blue'} style={{ width: `${t.bar}%` }} /></div>
              )}
              <span className="ca-dash-tile-foot">{loading ? ' ' : t.foot}</span>
            </div>
          ))}
        </div>

        {!loading && stats.total > 0 && (
          <div className="ca-card ca-dash-card ca-dash-levels">
            <div className="ca-dash-card-head">
              <div>
                <h3 className="ca-dash-card-title">Mastery breakdown</h3>
                <span className="ca-dash-card-sub">How well {stats.total} {stats.total === 1 ? 'student knows' : 'students know'} their words</span>
              </div>
            </div>
            <div className="ca-dash-stack" role="img" aria-label={LEVELS.map((l) => `${l.label}: ${stats.levels[l.key]}`).join(', ')}>
              {LEVELS.filter((l) => stats.levels[l.key]).map((l) => (
                <span key={l.key} className={l.cls} style={{ flexGrow: stats.levels[l.key] }} title={`${l.label}: ${stats.levels[l.key]}`} />
              ))}
            </div>
            <div className="ca-dash-legend">
              {LEVELS.map((l) => (
                <div key={l.key} className="ca-dash-legend-item">
                  <span className={`ca-dash-legend-dot ${l.cls}`} />
                  <span className="ca-dash-legend-label">{l.label}<small>{l.hint}</small></span>
                  <span className="ca-dash-legend-value">{stats.levels[l.key]}<small>{pct(stats.levels[l.key])}%</small></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="ca-block">
        <div className="ca-card ca-dash-card" style={{ padding: 0 }}>
          <div className="ca-dash-card-head is-padded">
            <div>
              <h3 className="ca-dash-card-title">Most active students</h3>
              <span className="ca-dash-card-sub">{activeRange.label} · {rangeText}</span>
            </div>
            <button type="button" className="ca-dash-link" onClick={() => navigate('/corp/admin/students')}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          {loading ? (
            <div className="ca-dash-empty"><span className="ca-dash-empty-text">Loading...</span></div>
          ) : topStudents.length === 0 ? (
            <div className="ca-dash-empty">
              <span className="ca-activity-empty-icon"><User size={20} /></span>
              <b>{stats.total === 0 ? 'No students yet' : 'No activity in this period'}</b>
              <span className="ca-dash-empty-text">
                {stats.total === 0
                  ? 'Students appear here once they join a group and start practicing.'
                  : `None of your ${stats.total} students practiced ${activeRange.label.toLowerCase()}. Try a longer range.`}
              </span>
            </div>
          ) : isDesktop ? (
            <div className="ca-dash-table">
              <div className="ca-dash-table-head">
                <span>#</span>
                <span>Student</span>
                <span>Group</span>
                <span className="num">Time</span>
                <span>Last active</span>
                <span>Mastery</span>
              </div>
              {topStudents.map((st, i) => (
                <button type="button" key={`${st.groupId}-${st.uid}`} className="ca-dash-table-row" onClick={() => navigate(`/corp/admin/students/${st.uid}`)}>
                  <span className={`ca-dash-rank ${i < 3 ? `is-top is-${i + 1}` : ''}`}>{i + 1}</span>
                  <span className="ca-dash-student">
                    <span className={`ca-dash-avatar tone-${toneFor(st.uid)}`}>{(st.name || '?').charAt(0).toUpperCase()}</span>
                    <span className="ca-dash-student-name">{st.name || 'Student'}</span>
                  </span>
                  <span><span className="ca-dash-chip">{st.groupName || '—'}</span></span>
                  <span className="num">{st.timeSeconds > 0 ? formatDuration(st.timeSeconds) : <span className="ca-dash-muted">—</span>}</span>
                  <span className="ca-dash-muted">{formatRelativeEn(st.lastTs, now)}</span>
                  <span className="ca-dash-mastery">
                    {st.mastery == null ? <span className="ca-dash-muted">—</span> : (
                      <>
                        <span className="ca-dash-bar is-inline"><span className={barCls(st.mastery)} style={{ width: `${st.mastery}%` }} /></span>
                        <span className="ca-dash-mastery-val">{st.mastery}%</span>
                      </>
                    )}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="sa-group ca-dash-rows" style={{ padding: 12 }}>
              {topStudents.map((st) => (
                <Row
                  key={`${st.groupId}-${st.uid}`}
                  icon={(st.name || '?').charAt(0).toUpperCase()}
                  iconTone="green"
                  title={st.name || 'Student'}
                  subtitle={`${st.groupName || '—'} · ${formatRelativeEn(st.lastTs, now)}${st.timeSeconds > 0 ? ` · ${st.timeSeconds >= 60 ? `${Math.round(st.timeSeconds / 60)} min` : `${st.timeSeconds}s`}` : ''}`}
                  detail={st.mastery == null ? undefined : `${st.mastery}%`}
                  onClick={() => navigate(`/corp/admin/students/${st.uid}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Page>
  );
}
