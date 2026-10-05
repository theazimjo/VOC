import { useState } from 'react';
import {
  Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Copy, Gauge, QrCode, Users, Zap,
} from 'lucide-react';
import { formatRelative, formatRelativeEn } from '../super-admin/centerActivity';
import { SearchField } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import MasteryTrendChart from './MasteryTrendChart';
import { fmtLongDay, fmtLongDayEn, masteryTone } from './useGroupInsights';

// The pieces of a group page, shared by the center admin (read-only,
// AdminGroupDetail) and the teacher (with actions, TeacherGroup). Same
// shapes as the rest of the panel (DESIGN.md): a white header band with
// underline tabs (the Teacher Detail pattern), ca-dash-* stat tiles, and
// the Faculty card/table shell for each tab's list. `group` is the raw
// group node (students keyed by uid).
//
// Every component takes `en` (default false = Uzbek, the teacher panel's
// language); only the literal strings branch, not the structure.

const fmtShort = (iso, en) => (iso ? new Date(iso).toLocaleDateString(en ? 'en-US' : 'uz-UZ', { day: 'numeric', month: 'short' }) : '');
const pct = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);
const rel = (ts, en) => (en ? formatRelativeEn(ts) : formatRelative(ts));

export function Bar({ value, tone }) {
  return (
    <span className="ca-topic-bar">
      <span className={tone} style={{ transform: `scaleX(${Math.max(0, Math.min(100, value || 0)) / 100})` }} />
    </span>
  );
}

// Inline bar + value, the same look the dashboard table uses.
function Meter({ value, tone, label }) {
  return (
    <span className="ca-dash-mastery">
      <span className="ca-dash-bar is-inline"><span className={tone || 'is-blue'} style={{ width: `${Math.max(0, Math.min(100, value || 0))}%` }} /></span>
      <span className="ca-dash-mastery-val">{label}</span>
    </span>
  );
}

// ── Header band: back link, identity, actions, join code, tabs ──
export function GroupHeader({
  back, group, total, teacher, courses, actions, onCode, codeHint, tabs, tab, onTab, en = false,
}) {
  const [copied, setCopied] = useState(false);
  const archived = group.status === 'archived';
  const clickCode = async () => {
    if (onCode) { onCode(); return; }
    try {
      await navigator.clipboard.writeText(group.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked — the code is on screen anyway */ }
  };

  const codePill = group.code && !archived ? (
            <button
              type="button"
              className="ca-group-code-pill"
              onClick={clickCode}
              aria-label={onCode ? (en ? 'Group code: QR and link' : 'Guruh kodi: QR va havola') : (en ? 'Copy group code' : 'Guruh kodini nusxalash')}
              title={onCode ? (en ? 'QR and link' : 'QR va havola') : (en ? 'Copy' : 'Nusxalash')}
            >
              <span className="ca-group-code-pill-label">{en ? 'Code' : 'Kod'}</span>
              <span className="ca-group-code-pill-value">{group.code}</span>
              <span className="ca-group-code-pill-icon">
                {codeHint || (copied ? <Check size={14} /> : onCode ? <QrCode size={14} /> : <Copy size={14} />)}
              </span>
            </button>
  ) : null;

  return (
    <div className="teacher-detail-topband ca-group-band">
      <button type="button" className="sa-back" onClick={back.onClick}>
        <ChevronLeft size={20} strokeWidth={2.6} />
        <span>{back.label}</span>
      </button>

      <div className="ca-group-head">
        <div className="ca-group-head-id">
          <span className="ca-group-head-avatar">{(group.name || 'G').charAt(0).toUpperCase()}</span>
          <div className="ca-group-head-text">
            <h1 className="teacher-detail-title">
              {group.name || (en ? 'Group' : 'Guruh')}
              {archived && <span className="ca-group-head-badge">{en ? 'Archived' : 'Arxivda'}</span>}
            </h1>
            <p className="ca-group-head-meta">
              {teacher && <>{teacher}<span className="ca-dot-sep">·</span></>}
              <span>{en ? `${total} ${total === 1 ? 'student' : 'students'}` : `${total} o'quvchi`}</span>
              {group.createdAt && (
                <span className="ca-group-head-opened">
                  <span className="ca-dot-sep">·</span>
                  <span>{en ? `opened ${fmtLongDayEn(group.createdAt)}` : `${fmtLongDay(group.createdAt)} ochilgan`}</span>
                </span>
              )}
            </p>
            {(courses.length > 0 || (!actions && codePill)) && (
              <div className="ca-group-head-courses">
                {courses.map((c) => <span key={c.id} className="ca-dash-chip">{c.title}</span>)}
                {!actions && codePill}
              </div>
            )}
          </div>
        </div>

        {actions && (
          <div className="ca-group-head-side">
            {codePill}
            <div className="ca-group-head-actions">{actions}</div>
          </div>
        )}
      </div>

      <div className="teacher-nav-tabs ca-group-nav" role="tablist" aria-label={en ? 'Group sections' : "Guruh bo'limlari"}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`teacher-nav-tab ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => onTab(t.id)}
          >
            {t.label}
            {t.count != null && <span className="ca-nav-count">{t.count}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Four numbers about the group (ca-dash-tile, as on the dashboard) ──
export function GroupStats({ insights, en = false }) {
  const { total, activeWeek, dist, weakest, hw } = insights;
  const latestHw = hw.items[0] || null;
  const activePct = pct(activeWeek, total);
  const hwPct = latestHw ? pct(latestHw.done, latestHw.total) : null;
  const notStarted = total - dist.practiced;

  const tiles = [
    {
      key: 'students',
      icon: <Users size={17} />,
      tone: 'blue',
      label: en ? 'Students' : "O'quvchilar",
      value: total,
      foot: !total
        ? (en ? 'No one has joined yet' : "Hali hech kim qo'shilmagan")
        : notStarted > 0
          ? (en ? `${notStarted} haven't started yet` : `${notStarted} tasi hali boshlamagan`)
          : (en ? 'Everyone has started' : 'Hammasi boshlagan'),
    },
    {
      key: 'week',
      icon: <Zap size={17} />,
      tone: 'green',
      label: en ? 'Active this week' : 'Bu hafta faol',
      value: activeWeek,
      suffix: total ? `/ ${total}` : null,
      bar: total ? activePct : null,
      barCls: activePct >= 50 ? 'is-good' : 'is-mid',
      foot: total ? (en ? `${activePct}% of the group` : `Guruhning ${activePct}%`) : '—',
    },
    {
      key: 'mastery',
      icon: <Gauge size={17} />,
      tone: 'purple',
      label: en ? 'Avg mastery' : "O'rtacha o'zlashtirish",
      value: dist.average == null ? '—' : `${dist.average}%`,
      bar: dist.average,
      barCls: masteryTone(dist.average) || 'is-blue',
      foot: weakest
        ? (en ? `Hardest topic: ${weakest.title}` : `Eng qiyin mavzu: ${weakest.title}`)
        : dist.average != null
          ? (en ? `${dist.practiced} of ${total} students practiced` : `${total} tadan ${dist.practiced} tasi mashq qilgan`)
          : (en ? 'No practice yet' : "Hali mashq yo'q"),
    },
    {
      key: 'hw',
      icon: <ClipboardList size={17} />,
      tone: 'orange',
      label: en ? 'Latest homework' : 'Oxirgi vazifa',
      value: hwPct == null ? '—' : `${hwPct}%`,
      bar: hwPct,
      barCls: hwPct >= 60 ? 'is-good' : 'is-mid',
      foot: latestHw
        ? (en ? `${latestHw.done} / ${latestHw.total} finished` : `${latestHw.done} / ${latestHw.total} o'quvchi bajardi`)
        : (en ? 'No homework yet' : 'Hali vazifa berilmagan'),
    },
  ];

  return (
    <div className="ca-dash-tiles">
      {tiles.map((t) => (
        <div key={t.key} className="ca-dash-tile">
          <div className="ca-dash-tile-top">
            <span className={`ca-dash-tile-icon tone-${t.tone}`}>{t.icon}</span>
            <span className="ca-dash-tile-label">{t.label}</span>
          </div>
          <div className="ca-dash-tile-value">
            {t.value}
            {t.suffix && <span className="ca-dash-tile-suffix">{t.suffix}</span>}
          </div>
          {t.bar != null && <div className="ca-dash-bar"><span className={t.barCls} style={{ width: `${t.bar}%` }} /></div>}
          <span className="ca-dash-tile-foot" title={t.foot}>{t.foot}</span>
        </div>
      ))}
    </div>
  );
}

const SORTS = [
  { id: 'status', uz: "Holati bo'yicha", en: 'By status' },
  { id: 'mastery', uz: "O'zlashtirish bo'yicha", en: 'By mastery' },
  { id: 'recent', uz: "Oxirgi mashq bo'yicha", en: 'By last practice' },
  { id: 'name', uz: "Ism bo'yicha", en: 'By name' },
];
const STATUS_ORDER = { gray: 0, orange: 1, green: 2 };
const STATUS_FILTERS = [
  { id: 'all', uz: 'Hammasi', en: 'All' },
  { id: 'green', uz: 'Faol', en: 'Active' },
  { id: 'orange', uz: "E'tibor kerak", en: 'Need attention' },
  { id: 'gray', uz: 'Boshlamagan', en: 'Not started' },
];
const TONES = ['blue', 'green', 'purple', 'orange', 'pink', 'teal'];
const toneFor = (id) => TONES[[...String(id)].reduce((a, c) => a + c.charCodeAt(0), 0) % TONES.length];

function PanelEmpty({ children }) {
  return <div className="ca-panel-empty">{children}</div>;
}

// ── Students: Faculty table (desktop) / rows (phone) ──
export function StudentsPanel({ rows, homeworkCount, onOpen, empty, action, en = false }) {
  const isDesktop = useIsDesktop();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('status');
  const [status, setStatus] = useState('all');

  if (!rows.length) {
    return <section className="ca-card is-faculty-card"><PanelEmpty>{empty}</PanelEmpty></section>;
  }

  const counts = rows.reduce((acc, r) => ({ ...acc, [r.status.tone]: (acc[r.status.tone] || 0) + 1 }), {});
  const q = search.trim().toLowerCase();
  const visible = rows
    .filter((r) => status === 'all' || r.status.tone === status)
    .filter((r) => !q || [r.name, r.email].some((v) => (v || '').toLowerCase().includes(q)))
    .sort((a, b) => {
      if (sort === 'mastery') return (b.mastery ?? -1) - (a.mastery ?? -1);
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'recent') return (b.last || 0) - (a.last || 0);
      return STATUS_ORDER[a.status.tone] - STATUS_ORDER[b.status.tone] || (a.last || 0) - (b.last || 0);
    });

  return (
    <section className="ca-card is-faculty-card">
      <div className="faculty-toolbar faculty-toolbar-wrap ca-st-toolbar">
        <div className="faculty-toolbar-left faculty-toolbar-filters">
          <SearchField value={search} onChange={setSearch} placeholder={en ? 'Student name' : "O'quvchi ismi"} />
          <div className="ca-filter-pills" role="group" aria-label={en ? 'Status' : 'Holati'}>
            {STATUS_FILTERS.map((f) => {
              const n = f.id === 'all' ? rows.length : counts[f.id] || 0;
              if (f.id !== 'all' && !n) return null;
              return (
                <button key={f.id} type="button" className={`ca-filter-pill ${status === f.id ? 'is-active' : ''}`} onClick={() => setStatus(f.id)}>
                  {f.id !== 'all' && <span className={`ca-filter-dot is-${f.id}`} />}
                  {en ? f.en : f.uz} <span className="ca-filter-count">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="faculty-toolbar-right">
          <select className="sa-select sa-select-compact" value={sort} onChange={(e) => setSort(e.target.value)} aria-label={en ? 'Sort' : 'Saralash'}>
            {SORTS.map((s) => <option key={s.id} value={s.id}>{en ? s.en : s.uz}</option>)}
          </select>
          {action}
        </div>
      </div>

      {visible.length === 0 ? (
        <PanelEmpty><span className="ca-empty">{en ? 'No students match' : 'Mos o\'quvchi topilmadi'}</span></PanelEmpty>
      ) : isDesktop ? (
        <div className="faculty-table ca-students-table">
          <div className="faculty-table-head">
            <span>{en ? 'Student' : "O'quvchi"}</span>
            <span>{en ? 'Status' : 'Holati'}</span>
            <span>{en ? 'Mastery' : "O'zlashtirish"}</span>
            <span>{en ? 'Homework' : 'Vazifalar'}</span>
            <span>{en ? 'Last practice' : 'Oxirgi mashq'}</span>
            <span />
          </div>
          {visible.map((r) => (
            <div
              key={r.uid}
              className="faculty-table-row"
              role="button"
              tabIndex={0}
              onClick={() => onOpen(r)}
              onKeyDown={(e) => { if (e.key === 'Enter') onOpen(r); }}
            >
              <span className="ca-dash-student">
                <span className={`ca-dash-avatar tone-${toneFor(r.uid)}`}>{r.name.charAt(0).toUpperCase()}</span>
                <span className="faculty-cell-name">
                  <span className="ca-dash-student-name">{r.name}</span>
                  <span className="faculty-email-sub">{r.status.note}</span>
                </span>
              </span>
              <span><span className={`ca-pill is-${r.status.tone}`}>{r.status.label}</span></span>
              {r.mastery == null
                ? <span className="ca-muted">—</span>
                : <Meter value={r.mastery} tone={masteryTone(r.mastery)} label={`${r.mastery}%`} />}
              {homeworkCount
                ? <Meter value={pct(r.homeworkDone, homeworkCount)} tone={r.homeworkDone === homeworkCount ? 'is-good' : 'is-mid'} label={`${r.homeworkDone}/${homeworkCount}`} />
                : <span className="ca-muted">—</span>}
              <span className={r.last ? '' : 'ca-muted'}>{r.last ? rel(r.last, en) : (en ? 'Never' : "Hali yo'q")}</span>
              <span className="ca-row-actions"><ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" /></span>
            </div>
          ))}
        </div>
      ) : (
        <div className="ca-mobile-list">
          {visible.map((r) => (
            <button key={r.uid} type="button" className="ca-mobile-row" onClick={() => onOpen(r)}>
              <span className={`ca-dash-avatar tone-${toneFor(r.uid)}`}>{r.name.charAt(0).toUpperCase()}</span>
              <span className="ca-mobile-row-main">
                <span className="ca-dash-student-name">{r.name}</span>
                <span className="faculty-email-sub">
                  {r.last
                    ? [
                      r.mastery == null ? null : `${r.mastery}% ${en ? 'mastery' : "o'zlashtirish"}`,
                      homeworkCount ? `${r.homeworkDone}/${homeworkCount} ${en ? 'homework' : 'vazifa'}` : null,
                      rel(r.last, en),
                    ].filter(Boolean).join(' · ')
                    : (en ? 'No practice yet' : "Hali mashq qilmagan")}
                </span>
              </span>
              <span className={`ca-pill is-${r.status.tone}`}>{r.status.label}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

const HW_STATE = { done: 'Bajardi', started: 'Boshladi', none: 'Boshlamadi' };
const HW_STATE_EN = { done: 'Done', started: 'Started', none: 'Not started' };
const HW_TONE = { done: 'green', started: 'orange', none: 'gray' };

// ── Homework, newest first; a row expands to show who did it. ──
// `onOpenHomework` (teacher) adds a link to the homework's own page.
export function HomeworkPanel({ items, onOpenStudent, onOpenHomework, empty, action, en = false }) {
  const [openHw, setOpenHw] = useState(null);
  const stateLabel = en ? HW_STATE_EN : HW_STATE;
  return (
    <section className="ca-card is-faculty-card">
      <div className="faculty-toolbar">
        <div className="faculty-toolbar-left">
          {items.length > 0 && <span className="ca-list-count">{en ? `${items.length} homework` : `${items.length} ta vazifa`}</span>}
        </div>
        <div className="faculty-toolbar-right">{action}</div>
      </div>
      {items.length === 0 ? <PanelEmpty>{empty}</PanelEmpty> : (
        <div className="ca-hwx-list">
          {items.map((h, i) => {
            const key = h.id || i;
            const open = openHw === key;
            const rate = pct(h.done, h.total);
            const none = Math.max(0, h.total - h.done - h.started);
            return (
              <div key={key} className={`ca-hwx ${open ? 'is-open' : ''}`}>
                <button type="button" className="ca-hwx-head" onClick={() => setOpenHw(open ? null : key)} aria-expanded={open}>
                  <span className="ca-hwx-icon"><ClipboardList size={16} /></span>
                  <span className="ca-hwx-title">
                    <span className="ca-hwx-name">{h.name || (en ? 'Homework' : 'Vazifa')}</span>
                    <span className="faculty-email-sub">{fmtShort(h.assignedAt, en)} · {en ? `${h.topics} topics` : `${h.topics} ta mavzu`}</span>
                  </span>
                  <span className="ca-hwx-progress">
                    <span className="ca-hwx-stack" aria-hidden="true">
                      <span className="is-done" style={{ flexGrow: h.done }} />
                      <span className="is-started" style={{ flexGrow: h.started }} />
                      <span className="is-none" style={{ flexGrow: none }} />
                    </span>
                    <span className="ca-hwx-legend">
                      <span><i className="is-done" />{h.done} {en ? 'done' : 'bajardi'}</span>
                      {h.started > 0 && <span><i className="is-started" />{h.started} {en ? 'started' : 'boshladi'}</span>}
                      {none > 0 && <span><i className="is-none" />{none} {en ? 'not started' : 'boshlamadi'}</span>}
                    </span>
                  </span>
                  <span className={`ca-hwx-rate ${rate >= 60 ? 'is-good' : rate > 0 ? 'is-mid' : ''}`}>{rate}%</span>
                  <ChevronDown size={16} className="ca-hwx-chevron" />
                </button>
                {open && (
                  <div className="ca-hwx-body">
                    {['none', 'started', 'done'].map((state) => {
                      const people = h.students.filter((s) => s.state === state);
                      if (!people.length) return null;
                      return (
                        <div key={state} className="ca-hwx-group">
                          <span className={`ca-pill is-${HW_TONE[state]}`}>{stateLabel[state]} · {people.length}</span>
                          <div className="ca-hwx-names">
                            {people.map((s) => (
                              <button key={s.uid} type="button" className="ca-hwx-person" onClick={() => onOpenStudent(s.uid)}>{s.name}</button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    {onOpenHomework && h.id && (
                      <button type="button" className="faculty-btn-secondary ca-hwx-open" onClick={() => onOpenHomework(h.id)}>
                        {en ? 'Open homework page' : 'Vazifa sahifasini ochish'} <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ── Topics: one table per course ──
export function TopicsPanel({ courses, empty, action, en = false }) {
  return (
    <section className="ca-card is-faculty-card">
      <div className="faculty-toolbar">
        <div className="faculty-toolbar-left">
          {courses.length > 0 && (
            <span className="ca-list-count">
              {en ? "Mastery — average of students who've started the topic" : "O'zlashtirish — mavzuni boshlaganlarning o'rtachasi"}
            </span>
          )}
        </div>
        <div className="faculty-toolbar-right">{action}</div>
      </div>
      {courses.length === 0 ? <PanelEmpty>{empty}</PanelEmpty> : courses.map((c) => (
        <div key={c.id} className="ca-topicx">
          <div className="ca-topics-month">{c.title}</div>
          {c.topics.length === 0 ? (
            <PanelEmpty><span className="ca-empty">{en ? 'No topics' : "Mavzular yo'q"}</span></PanelEmpty>
          ) : (
            <div className="faculty-table ca-topicx-table">
              {c.topics.map((t, i) => (
                <div key={t.key} className="faculty-table-row is-static">
                  <span className="ca-topic-num">{i + 1}</span>
                  <span className="ca-topicx-name">{t.title}</span>
                  {t.avg == null
                    ? <span className="ca-muted">{en ? 'Not started' : 'Boshlanmagan'}</span>
                    : <Meter value={t.avg} tone={masteryTone(t.avg)} label={`${t.avg}%`} />}
                  <span className="ca-topicx-meta">
                    {t.started ? (en ? `${t.started}/${t.total} started` : `${t.started}/${t.total} boshlagan`) : '—'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

// ── Progress: the trend chart and the mastery breakdown ──
export function ProgressPanel({ insights, en = false }) {
  const { trend, dist, total } = insights;
  const buckets = [...dist.buckets].reverse();
  return (
    <div className="ca-stack">
      <section className="ca-card ca-dash-card ca-dash-levels">
        <div className="ca-dash-card-head">
          <div>
            <h3 className="ca-dash-card-title">{en ? 'Average mastery, day by day' : "O'rtacha o'zlashtirish, kunma-kun"}</h3>
            <span className="ca-dash-card-sub">{en ? 'Last 30 days' : 'Oxirgi 30 kun'}</span>
          </div>
        </div>
        {trend.length === 0 ? (
          <span className="ca-empty">{en ? 'No one has practiced yet.' : 'Hali hech kim mashq qilmagan.'}</span>
        ) : (
          <>
            <MasteryTrendChart data={trend} id="caGroupMastery" compact en={en} />
            {trend.length < 2 && <span className="ca-dash-card-sub" style={{ marginTop: 10 }}>{en ? 'A new point is added every night — the chart fills in day by day.' : "Har kecha yangi nuqta qo'shiladi — grafik kunma-kun to'lib boradi."}</span>}
          </>
        )}
      </section>
      <section className="ca-card ca-dash-card ca-dash-levels">
        <div className="ca-dash-card-head">
          <div>
            <h3 className="ca-dash-card-title">{en ? 'Who is where' : 'Kim qayerda'}</h3>
            <span className="ca-dash-card-sub">{en ? 'Students by mastery' : "O'quvchilar o'zlashtirish bo'yicha"}</span>
          </div>
        </div>
        {total > 0 && (
          <div className="ca-dash-stack" aria-hidden="true">
            {buckets.filter((b) => b.count).map((b) => (
              <span key={b.key} style={{ flexGrow: b.count, background: b.color }} title={`${b.label}: ${b.count}`} />
            ))}
          </div>
        )}
        <div className="ca-dash-legend">
          {buckets.map((b) => (
            <div key={b.key} className="ca-dash-legend-item">
              <span className="ca-dash-legend-dot" style={{ background: b.color }} />
              <span className="ca-dash-legend-label">{b.label}</span>
              <span className="ca-dash-legend-value">
                {b.count}
                <small>{total ? `${pct(b.count, total)}%` : '—'}</small>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
