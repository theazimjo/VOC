import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BookOpen, ChevronLeft, ChevronRight, ClipboardList, Flame, GraduationCap, KeyRound, Target, TrendingUp, UserRound, Users,
} from 'lucide-react';
import { auth } from '../../../firebase';
import { formatRelativeEn, latestUnitActivity, studentMastery, tashkentDay } from '../super-admin/centerActivity';
import { EmptyState, LoadingRows, Page } from '../super-admin/ui';
import SetPasswordSheet from '../super-admin/SetPasswordSheet';
import {
  aggregatePackProgress, getGroupPackEntries, getHomeworkCompletion, getPackUnits,
} from '../teacher/utils';
import { activityCalendar, hardWords, providerLabel, wordIndex, wordStats } from './studentInsights';
import { useCenterData } from './CenterDataContext';
import { studentStatusEn } from './groupInsights';
import { masteryTone } from './useGroupInsights';

const fmtDay = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const fmtTime = (iso) => (iso ? new Date(iso).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—');
const byDateDesc = (a, b) => (Date.parse(b.assignedAt || 0) || 0) - (Date.parse(a.assignedAt || 0) || 0);
const WEEKDAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

// Extra data only the server can read (sign-in info, streak, per-word
// progress) — see api/student-account.js.
function useStudentDetails(studentId) {
  const [state, setState] = useState({ loading: true, data: null, error: '' });
  const load = useCallback(async () => {
    setState({ loading: true, data: null, error: '' });
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/student-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, studentId, action: 'details' }),
      });
      let data = {};
      try { data = await res.json(); } catch { /* non-JSON error page */ }
      if (!res.ok) throw new Error(data.error || `Server error (${res.status})`);
      setState({ loading: false, data, error: '' });
    } catch (err) {
      setState({ loading: false, data: null, error: err.message });
    }
  }, [studentId]);
  useEffect(() => { load(); }, [load]);
  return state;
}

// GitHub-style calendar: a column per week, scrolled to today on narrow
// screens.
function ActivityCalendar({ calendar, dailyGoal }) {
  const scrollRef = useRef(null);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [calendar]);
  const weeks = calendar.columns.length;
  return (
    <>
      <div className="ca-cal-scroll" ref={scrollRef}>
        <div className="ca-cal" style={{ '--weeks': weeks }} role="img" aria-label={`Practiced ${calendar.active} days in the last six months`}>
          <span />
          <div className="ca-cal-months">
            {calendar.months.map((m) => (
              <span key={m.column} style={{ gridColumn: `${m.column + 1} / span 3` }}>{m.label}</span>
            ))}
          </div>
          <div className="ca-cal-days">
            {WEEKDAYS.map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="ca-cal-grid">
            {calendar.columns.flat().map((c) => (
              <span
                key={c.key}
                className={`ca-heat-cell is-l${c.level} ${c.future ? 'is-future' : ''}`}
                title={c.future ? undefined : `${c.key}: ${c.count} words`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="ca-heat-legend">
        <span className="ca-heat-goal">Daily goal: {dailyGoal || 5} words</span>
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => <span key={l} className={`ca-heat-cell is-l${l}`} />)}
        <span>More</span>
      </div>
    </>
  );
}

// /corp/admin/students/:studentId — everything about one student across
// all their groups in this center, plus setting a new password. Same shell
// as the group / teacher pages: a header band with underline tabs
// (Overview · Topics · Homework · Account), dashboard tiles, Faculty-card
// lists. Course progress and homework live on each group's student record,
// so those tabs switch between groups; the rest is per person.
export default function AdminStudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { loading, center, activeGroups, teacherById, students } = useCenterData();
  const details = useStudentDetails(studentId);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [tab, setTab] = useState(null); // which group's topics/homework
  const [section, setSection] = useState('overview');

  // One entry per group the student is in: { st, group, teacher }.
  const memberships = useMemo(() => students
    .filter((s) => s.uid === studentId)
    .map((st) => {
      const group = activeGroups.find((g) => g.id === st.groupId);
      return group ? { st, group, teacher: teacherById[group.teacherId] || null, last: latestUnitActivity(st) || 0 } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.last - a.last), [students, activeGroups, teacherById, studentId]);

  const packs = useMemo(() => {
    const byId = center?.customPacks || {};
    const ids = [...new Set(memberships.flatMap((m) => getGroupPackEntries(m.group).map((e) => e.packId)))];
    // Pack nodes don't store their own id — add it, or progress (keyed by
    // pack id) and the hard-words index never match.
    return ids.filter((id) => byId[id]).map((id) => ({ id, ...byId[id] }));
  }, [center, memberships]);
  const index = useMemo(() => wordIndex(packs), [packs]);

  const back = {
    label: 'Back',
    onClick: () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/corp/admin/students')),
  };

  if (loading) {
    return <Page title=" " back={back}><LoadingRows count={5} /></Page>;
  }
  if (memberships.length === 0) {
    return (
      <Page title="Student not found" back={back}>
        <div className="sa-group">
          <EmptyState icon={<GraduationCap size={40} />} title="This student doesn't exist" text="They may have left the group, or the group may have been archived." />
        </div>
      </Page>
    );
  }

  const current = memberships.find((m) => m.group.id === tab) || memberships[0];
  const person = memberships[0].st;
  const d = details.data;

  const masteries = memberships.map((m) => studentMastery(m.st)).filter((v) => v != null);
  const mastery = masteries.length ? Math.round(masteries.reduce((a, b) => a + b, 0) / masteries.length) : null;
  const last = memberships[0].last || null;
  const courseWords = packs.reduce((sum, p) => sum + (p.wordCount || getPackUnits(p).reduce((s, u) => s + u.totalWords, 0)), 0);
  const ws = d ? wordStats(d.words) : null;
  const hard = d ? hardWords(d.words, index) : [];
  const calendar = d ? activityCalendar(d.streak.days, tashkentDay(), d.streak.dailyGoal) : null;

  const groupPacks = getGroupPackEntries(current.group)
    .filter((e) => center?.customPacks?.[e.packId])
    .map((e) => ({ id: e.packId, ...center.customPacks[e.packId] }));
  const homework = Object.entries(current.group.homeworkList || {}).map(([id, hw]) => ({ id, ...hw })).sort(byDateDesc);
  const hwDone = homework.filter((hw) => getHomeworkCompletion(current.st, hw).allDone).length;

  const dash = details.loading ? '–' : '—';
  const canResetPassword = !d || (!d.account.isStaff && d.account.email);
  const multi = memberships.length > 1;
  const status = studentStatusEn({ last, mastery });
  const masteredPct = ws && courseWords ? Math.round((ws.strong / courseWords) * 100) : null;
  const hwPct = homework.length ? Math.round((hwDone / homework.length) * 100) : null;

  const tiles = [
    {
      key: 'mastery', icon: <TrendingUp size={17} />, tone: 'purple', label: 'Mastery',
      value: mastery == null ? '—' : `${mastery}%`, bar: mastery, barCls: masteryTone(mastery) || 'is-blue',
      foot: last ? `Last practice ${formatRelativeEn(last)}` : 'No practice yet',
    },
    {
      key: 'words', icon: <BookOpen size={17} />, tone: 'blue', label: 'Words mastered',
      value: ws ? ws.strong : dash, suffix: ws && courseWords ? `/ ${courseWords}` : null, bar: masteredPct, barCls: 'is-good',
      foot: ws ? `${ws.practiced} words practiced` : 'Out of course words',
    },
    {
      key: 'accuracy', icon: <Target size={17} />, tone: 'green', label: 'Answer accuracy',
      value: ws?.accuracy == null ? dash : `${ws.accuracy}%`, bar: ws?.accuracy ?? null, barCls: ws?.accuracy >= 70 ? 'is-good' : 'is-mid',
      foot: ws ? `${ws.answered} answers` : 'Share of correct answers',
    },
    {
      key: 'streak', icon: <Flame size={17} />, tone: 'orange', label: 'Day streak',
      value: d ? d.streak.current : dash,
      foot: ws ? (ws.due ? `${ws.due} ${ws.due === 1 ? 'word' : 'words'} due for review` : 'Nothing due for review') : 'Days the daily goal was met',
    },
  ];

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'topics', label: 'Topics' },
    { id: 'homework', label: 'Homework', count: homework.length },
    { id: 'account', label: 'Account' },
  ];

  const groupSwitch = multi && (
    <div className="ca-filter-pills ca-student-groups" role="tablist" aria-label="Group">
      {memberships.map((m) => (
        <button
          key={m.group.id}
          type="button"
          role="tab"
          aria-selected={m === current}
          className={`ca-filter-pill ${m === current ? 'is-active' : ''}`}
          onClick={() => setTab(m.group.id)}
        >
          {m.group.name || 'Group'}
        </button>
      ))}
    </div>
  );

  return (
    <Page hideHeader>
      <div className="teacher-detail-topband">
        <button type="button" className="sa-back" onClick={back.onClick}>
          <ChevronLeft size={20} strokeWidth={2.6} />
          <span>{back.label}</span>
        </button>

        <div className="teacher-detail-header">
          <div className="ca-person-head">
            <span className="ca-person-head-avatar" aria-hidden="true">{(person.name || 'S').charAt(0).toUpperCase()}</span>
            <div className="ca-person-head-text">
              <h1 className="teacher-detail-title">{person.name || 'Student'}</h1>
              <div className="ca-person-head-meta">
                <span className={`ca-pill is-${status.tone}`}>{status.label}</span>
                {multi ? <span>In {memberships.length} groups</span> : (
                  <>
                    <button type="button" className="ca-link" onClick={() => navigate(`/corp/admin/groups/${current.group.id}`)}>{current.group.name || 'Group'}</button>
                    {current.teacher && <span>{current.teacher.name}</span>}
                  </>
                )}
              </div>
            </div>
          </div>
          {canResetPassword && (
            <button type="button" className="faculty-btn-secondary ca-student-reset" onClick={() => setPasswordOpen(true)}>
              <KeyRound size={14} /> Reset password
            </button>
          )}
        </div>

        <div className="teacher-nav-tabs ca-group-nav" role="tablist" aria-label="Student sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={section === t.id}
              className={`teacher-nav-tab ${section === t.id ? 'is-active' : ''}`}
              onClick={() => setSection(t.id)}
            >
              {t.label}
              {t.count != null && <span className="ca-nav-count">{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {section === 'overview' && (
        <div className="ca-stack">
          <div className="ca-dash-tiles">
            {tiles.map((t) => (
              <div key={t.key} className="ca-dash-tile">
                <div className="ca-dash-tile-top">
                  <span className={`ca-dash-tile-icon tone-${t.tone}`}>{t.icon}</span>
                  <span className="ca-dash-tile-label">{t.label}</span>
                </div>
                <div className="ca-dash-tile-value">
                  {details.loading && t.value === dash ? <span className="ca-dash-skeleton" /> : (
                    <>
                      {t.value}
                      {t.suffix && <span className="ca-dash-tile-suffix">{t.suffix}</span>}
                    </>
                  )}
                </div>
                {t.bar != null && <div className="ca-dash-bar"><span className={t.barCls} style={{ width: `${t.bar}%` }} /></div>}
                <span className="ca-dash-tile-foot">{t.foot}</span>
              </div>
            ))}
          </div>
          {details.error && <p className="ca-inline-error">Couldn't load additional data: {details.error}</p>}

          <section className="ca-card ca-dash-card ca-dash-levels">
            <div className="ca-dash-card-head">
              <div>
                <h3 className="ca-dash-card-title">Activity</h3>
                <span className="ca-dash-card-sub">Daily practice · last six months</span>
              </div>
              {calendar && (
                <div className="ca-head-tags">
                  <span className="ca-dash-chip">{calendar.active} active days</span>
                  <span className="ca-dash-chip">{calendar.total} words</span>
                </div>
              )}
            </div>
            {details.loading ? <LoadingRows count={2} /> : !calendar
              ? <span className="ca-empty">No data</span>
              : <ActivityCalendar calendar={calendar} dailyGoal={d.streak.dailyGoal} />}
          </section>

          <section className="ca-card is-faculty-card">
            <div className="faculty-toolbar">
              <div className="faculty-toolbar-left">
                <span className="ca-card-title">Hard words</span>
                <span className="ca-list-count">Most missed{multi ? ' · all groups' : ''}</span>
              </div>
            </div>
            {details.loading ? <div className="ca-panel-empty"><LoadingRows count={3} /></div> : hard.length === 0 ? (
              <div className="ca-panel-empty"><span className="ca-empty">{d ? 'No missed words — nice.' : 'No data'}</span></div>
            ) : (
              <div className="ca-mobile-list">
                {hard.map((w) => (
                  <div key={w.key} className="ca-mobile-row is-static">
                    <span className="ca-mobile-row-main">
                      <span className="ca-dash-student-name">{w.word} <span className="ca-muted">— {w.translation}</span></span>
                      <span className="faculty-email-sub">{[w.topic, w.accuracy == null ? null : `${w.accuracy}% accuracy`].filter(Boolean).join(' · ')}</span>
                    </span>
                    <span className="ca-pill is-red">{w.wrongCount} missed</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {section === 'topics' && (
        <section className="ca-card is-faculty-card">
          <div className="faculty-toolbar faculty-toolbar-wrap">
            <div className="faculty-toolbar-left faculty-toolbar-filters">
              {groupSwitch || <span className="ca-list-count">Mastery per topic · a topic counts as learned at 80%</span>}
            </div>
          </div>
          {groupPacks.length === 0 ? (
            <div className="ca-panel-empty"><span className="ca-empty">No course assigned to this group</span></div>
          ) : groupPacks.map((pack) => {
            const agg = aggregatePackProgress((current.st.progress || {})[pack.id]);
            return (
              <div key={pack.id} className="ca-topicx">
                <div className="ca-topics-month">{pack.title}</div>
                <div className="faculty-table ca-topicx-table">
                  {getPackUnits(pack).map((u, i) => {
                    const us = agg.units[u.unitKey];
                    const m = us ? (us.masteryPercent || 0) : null;
                    return (
                      <div key={u.unitKey} className="faculty-table-row is-static">
                        <span className="ca-topic-num">{i + 1}</span>
                        <span className="ca-topicx-name">{u.title}</span>
                        {m == null ? <span className="ca-muted">Not started</span> : (
                          <span className="ca-dash-mastery">
                            <span className="ca-dash-bar is-inline"><span className={masteryTone(m) || 'is-low'} style={{ width: `${m}%` }} /></span>
                            <span className="ca-dash-mastery-val">{m}%</span>
                          </span>
                        )}
                        <span className="ca-topicx-meta">{us?.lastActivity ? formatRelativeEn(Date.parse(us.lastActivity)) : `${u.totalWords} words`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {section === 'homework' && (
        <section className="ca-card is-faculty-card">
          <div className="faculty-toolbar faculty-toolbar-wrap">
            <div className="faculty-toolbar-left faculty-toolbar-filters">
              {groupSwitch || (
                <span className="ca-list-count">
                  {homework.length ? `${hwDone} of ${homework.length} done · a topic counts as done at 80% mastery` : 'A topic counts as done at 80% mastery'}
                </span>
              )}
            </div>
          </div>
          {homework.length > 0 && (
            <div className="ca-student-hw-summary">
              <span className="ca-dash-bar"><span className={hwPct >= 60 ? 'is-good' : 'is-mid'} style={{ width: `${hwPct}%` }} /></span>
              <b>{hwPct}%</b>
            </div>
          )}
          {homework.length === 0 ? (
            <div className="ca-panel-empty"><span className="ca-empty">No homework assigned yet</span></div>
          ) : (
            <div className="ca-mobile-list">
              {homework.map((hw) => {
                const c = getHomeworkCompletion(current.st, hw);
                const pct = c.total ? Math.round((c.doneCount / c.total) * 100) : 0;
                return (
                  <div key={hw.id} className="ca-mobile-row is-static">
                    <span className="ca-hwx-icon"><ClipboardList size={16} /></span>
                    <span className="ca-mobile-row-main">
                      <span className="ca-dash-student-name">{hw.name || 'Homework'}</span>
                      <span className="ca-dash-mastery">
                        <span className="ca-dash-bar is-inline"><span className={c.allDone ? 'is-good' : 'is-mid'} style={{ width: `${pct}%` }} /></span>
                        <span className="ca-dash-mastery-val">{c.doneCount}/{c.total}</span>
                        <span className="faculty-email-sub">{fmtDay(hw.assignedAt)}</span>
                      </span>
                    </span>
                    <span className={`ca-pill ${c.allDone ? 'is-green' : c.doneCount ? 'is-orange' : 'is-gray'}`}>
                      {c.allDone ? 'Done' : c.doneCount ? 'In progress' : 'Not started'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {section === 'account' && (
        <div className="ca-stack">
          <section className="ca-card ca-info-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><UserRound size={15} /> Account</h3>
                <span className="ca-card-sub">Sign-in details</span>
              </div>
              {canResetPassword && (
                <button type="button" className="faculty-btn-secondary" onClick={() => setPasswordOpen(true)}>
                  <KeyRound size={14} /> Reset password
                </button>
              )}
            </div>
            <dl className="ca-info-list">
              <div><dt>Login</dt><dd className="is-mono">{d?.account.email || person.email || '—'}</dd></div>
              <div><dt>Sign-in method</dt><dd>{d ? providerLabel(d.account.providers) : dash}</dd></div>
              <div><dt>Registered</dt><dd>{d ? fmtDay(d.account.createdAt) : dash}</dd></div>
              <div><dt>Last sign-in</dt><dd>{d ? fmtTime(d.activity.lastSeen || d.account.lastSignInAt) : dash}</dd></div>
              <div><dt>App opened</dt><dd>{d ? `${d.activity.sessionCount} times` : dash}</dd></div>
            </dl>
          </section>

          <section className="ca-card is-faculty-card">
            <div className="faculty-toolbar">
              <div className="faculty-toolbar-left"><span className="ca-card-title">{multi ? 'Groups' : 'Group'}</span></div>
            </div>
            <div className="ca-mobile-list">
              {memberships.map((m) => {
                const gm = studentMastery(m.st);
                return (
                  <button key={m.group.id} type="button" className="ca-mobile-row" onClick={() => navigate(`/corp/admin/groups/${m.group.id}`)}>
                    <span className="ca-course-icon"><Users size={16} /></span>
                    <span className="ca-mobile-row-main">
                      <span className="ca-dash-student-name">{m.group.name || 'Group'}</span>
                      <span className="faculty-email-sub">
                        {m.teacher ? m.teacher.name : 'No teacher'} · joined {fmtDay(m.st.joinedAt)}{m.last ? ` · ${formatRelativeEn(m.last)}` : ''}
                      </span>
                    </span>
                    <span className="ca-mobile-row-stat"><b>{gm == null ? '—' : `${gm}%`}</b><small>mastery</small></span>
                    <ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      <SetPasswordSheet
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        endpoint="/api/student-account"
        extraBody={{ action: 'set-password', studentId }}
        target={{ uid: studentId, email: d?.account.email || person.email, label: person.name }}
        en
      />
    </Page>
  );
}
