import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Archive, ChevronRight, ClipboardList, Layers, Megaphone, Plus, Users, Zap } from 'lucide-react';
import { createGroup } from '../../../services/corpService';
import { formatRelativeEn as formatRelative } from '../super-admin/centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, SearchField, Sheet, StatusDot } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useTeacherData } from './TeacherDataContext';

const DAY = 24 * 60 * 60 * 1000;

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);

// "My Groups" — the teacher's home, in the center admin's dashboard look
// (ca-dash-* tiles, see AdminHome) over a Faculty-style groups table (see
// center-admin/DESIGN.md pattern 1): who practiced this week and who did
// the last homework, per group.
export default function TeacherGroups() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [params, setParams] = useSearchParams();
  const { loading, teacherName, center, teacherId, activeGroups, archivedGroups, totals, announcements } = useTeacherData();
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  // ?new=group — the topbar's quick-add menu.
  useEffect(() => {
    if (params.get('new') === 'group') {
      setCreateOpen(true);
      setParams({}, { replace: true });
    }
  }, [params, setParams]);

  const q = search.trim().toLowerCase();
  const visible = useMemo(
    () => activeGroups.filter((g) => !q || [g.name, g.level, g.code].some((v) => (v || '').toLowerCase().includes(q))),
    [activeGroups, q],
  );

  const open = (g) => navigate(`/corp/teacher/group/${g.id}`);
  const firstName = (center?.teachers?.[teacherId]?.name || teacherName || '').split(' ')[0];

  // Latest homework across groups: how many of those students finished it.
  const hwGroups = activeGroups.filter((g) => g.latestHw && g.activity.students);
  const hwDone = hwGroups.reduce((sum, g) => sum + g.latestHwDone, 0);
  const hwTotal = hwGroups.reduce((sum, g) => sum + g.activity.students, 0);
  const hwRate = hwTotal ? pct(hwDone, hwTotal) : null;
  const activeRate = totals.students ? pct(totals.activeWeek, totals.students) : null;

  const tiles = [
    {
      key: 'groups',
      label: 'Active groups',
      icon: <Layers size={17} />,
      tone: 'blue',
      value: totals.groups,
      foot: archivedGroups.length ? `${archivedGroups.length} archived` : 'None archived',
    },
    {
      key: 'students',
      label: 'Students',
      icon: <Users size={17} />,
      tone: 'purple',
      value: totals.students,
      foot: 'Across active groups',
    },
    {
      key: 'week',
      label: 'Practiced this week',
      icon: <Zap size={17} />,
      tone: 'green',
      value: totals.activeWeek,
      suffix: totals.students ? `/ ${totals.students}` : null,
      bar: activeRate,
      barCls: activeRate == null ? null : activeRate >= 50 ? 'is-good' : 'is-mid',
      foot: activeRate == null ? 'No students yet' : `${activeRate}% of students`,
    },
    {
      key: 'hw',
      label: 'Latest homework',
      icon: <ClipboardList size={17} />,
      tone: 'orange',
      value: hwRate == null ? '—' : `${hwRate}%`,
      bar: hwRate,
      barCls: hwRate == null ? null : hwRate >= 60 ? 'is-good' : 'is-mid',
      foot: hwTotal ? `${hwDone} / ${hwTotal} students finished` : 'No homework yet',
    },
  ];

  return (
    <Page hideHeader>
      <div className="ca-dash-head">
        <div>
          <h2 className="ca-title-lg">
            <span className="ca-title-lg-icon"><Users size={24} /></span>
            My Groups
          </h2>
          <span className="ca-dash-range">
            {loading ? ' ' : firstName ? `Hi, ${firstName}! Here's how your groups are doing this week.` : 'Teacher panel'}
          </span>
        </div>
      </div>

      {announcements.length > 0 && (
        <section className="ca-card ca-block ca-announce">
          {announcements.map((a) => (
            <div key={a.id} className="ca-announce-item">
              <span className="ca-icon-box is-sm"><Megaphone size={14} /></span>
              <span className="ca-feed-text">
                <span className="ca-feed-title">{a.title}</span>
                {a.message && <span className="ca-announce-text">{a.message}</span>}
              </span>
            </div>
          ))}
        </section>
      )}

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
            <span className="ca-dash-tile-foot">{loading ? ' ' : t.foot}</span>
          </div>
        ))}
      </div>

      <section className="ca-card is-faculty-card">
        <div className="faculty-toolbar faculty-toolbar-wrap">
          <div className="faculty-toolbar-left faculty-toolbar-filters">
            {activeGroups.length > 5
              ? <SearchField value={search} onChange={setSearch} placeholder="Group name or code" />
              : activeGroups.length > 0 && <span className="ca-list-count">{activeGroups.length} {activeGroups.length === 1 ? 'group' : 'groups'}</span>}
          </div>
          <div className="faculty-toolbar-right">
            {archivedGroups.length > 0 && (
              <button type="button" className="faculty-btn-secondary" onClick={() => navigate('/corp/teacher/archive')}>
                <Archive size={14} /> <span className="ca-btn-label">Archive ({archivedGroups.length})</span>
              </button>
            )}
            <button type="button" className="faculty-btn-invite" onClick={() => setCreateOpen(true)}>
              <Plus size={14} /> New Group
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}><LoadingRows count={4} /></div>
        ) : visible.length === 0 ? (
          <div className="sa-group" style={{ padding: 20 }}>
            {activeGroups.length === 0 ? (
              <EmptyState
                icon={<Users size={40} />}
                title="Create your first group"
                text="Once it exists, students join by scanning its QR code. Then attach a word pack and assign homework."
                action={<Button onClick={() => setCreateOpen(true)}>Create Group</Button>}
              />
            ) : (
              <EmptyState title="Nothing found" text="Try a different search." />
            )}
          </div>
        ) : isDesktop ? (
          <div className="faculty-table teacher-groups-table">
            <div className="faculty-table-head">
              <span>Group</span>
              <span>Students</span>
              <span>Active this week</span>
              <span>Latest homework</span>
              <span>Last activity</span>
              <span />
            </div>
            {visible.map((g) => {
              const students = g.activity.students;
              const active = g.activity.activeWeek;
              const activePct = pct(active, students);
              const hwPct = pct(g.latestHwDone, students);
              return (
                <div
                  key={g.id}
                  className="faculty-table-row"
                  role="button"
                  tabIndex={0}
                  onClick={() => open(g)}
                  onKeyDown={(e) => { if (e.key === 'Enter') open(g); }}
                >
                  <div className="ca-course-cell">
                    <span className="ca-course-icon" aria-hidden="true">{(g.name || 'G').charAt(0).toUpperCase()}</span>
                    <div className="faculty-cell-name">
                      <span className="faculty-name-link">{g.name || 'Group'}</span>
                      <span className="faculty-email-sub">{g.code ? `Code ${g.code}` : 'No code'}</span>
                    </div>
                  </div>
                  <span className={students ? '' : 'ca-muted'}>{students || '—'}</span>
                  {students ? (
                    <span className="ca-dash-mastery">
                      <span className="ca-dash-bar is-inline"><span className={activePct >= 50 ? 'is-good' : 'is-mid'} style={{ width: `${activePct}%` }} /></span>
                      <span className="ca-dash-mastery-val">{active}/{students}</span>
                    </span>
                  ) : <span className="ca-muted">—</span>}
                  {g.latestHw ? (
                    <span className="teacher-hw-cell">
                      <span className="teacher-hw-name">{g.latestHw.name || 'Homework'}</span>
                      {students > 0 && (
                        <span className="ca-dash-mastery">
                          <span className="ca-dash-bar is-inline"><span className={hwPct >= 60 ? 'is-good' : 'is-mid'} style={{ width: `${hwPct}%` }} /></span>
                          <span className="ca-dash-mastery-val">{g.latestHwDone}/{students}</span>
                        </span>
                      )}
                    </span>
                  ) : <span className="ca-muted">None yet</span>}
                  <span className="groups-cell-status">
                    <StatusDot tone={activityTone(g.activity.lastActivity)} />
                    {g.activity.lastActivity ? formatRelative(g.activity.lastActivity) : <span className="ca-muted">Never</span>}
                  </span>
                  <span className="ca-row-actions">
                    <ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" />
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="ca-mobile-list">
            {visible.map((g) => {
              const students = g.activity.students;
              const active = g.activity.activeWeek;
              return (
                <button key={g.id} type="button" className="ca-mobile-row" onClick={() => open(g)}>
                  <span className="ca-course-icon ca-group-letter" aria-hidden="true">{(g.name || 'G').charAt(0).toUpperCase()}</span>
                  <span className="ca-mobile-row-main">
                    <span className="ca-dash-student-name">{g.name || 'Group'}</span>
                    <span className="faculty-email-sub">
                      {students} {students === 1 ? 'student' : 'students'}
                      {g.activity.lastActivity ? ` · ${formatRelative(g.activity.lastActivity)}` : ''}
                    </span>
                  </span>
                  {students > 0 && (
                    <span className="ca-mobile-row-stat">
                      <b>{active}/{students}</b>
                      <small>active</small>
                    </span>
                  )}
                  <ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        )}
      </section>

      <CreateGroupSheet open={createOpen} onClose={() => setCreateOpen(false)} onCreated={open} />
    </Page>
  );
}

function CreateGroupSheet({ open, onClose, onCreated }) {
  const { centerId, teacherId, patch } = useTeacherData();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setName('');
    setError('');
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    const title = name.trim();
    if (!title) return;
    setSaving(true);
    setError('');
    try {
      const group = await createGroup(centerId, teacherId, { name: title });
      patch((c) => ({ ...c, groups: { ...(c.groups || {}), [group.id]: group } }));
      onClose();
      onCreated(group);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title="New Group">
      <form onSubmit={submit}>
        <Field label="Group name" hint="Students see this name too.">
          <input className="sa-input" required autoFocus placeholder="Mon-Wed-Fri 17:00" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        {error && <p className="sa-flow-error">{error}</p>}
        <Button type="submit" block disabled={saving || !name.trim()}>{saving ? 'Creating...' : 'Create Group'}</Button>
      </form>
    </Sheet>
  );
}
