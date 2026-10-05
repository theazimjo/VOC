import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Layers, Plus, Users } from 'lucide-react';
import { formatRelativeEn } from '../super-admin/centerActivity';
import { Button, EmptyState, LoadingRows, Page, Row, SearchField, Segmented, StatusDot } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';
import { NewGroupSheet } from './QuickCreateSheets';

const DAY = 24 * 60 * 60 * 1000;
const FILTERS = [
  { value: 'active', label: 'Active', dot: 'green' },
  { value: 'quiet', label: 'Quiet', dot: 'orange' },
  { value: 'archived', label: 'Archived', dot: 'gray' },
];

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

// Groups are opened and run by teachers; the admin watches them here.
// Same card/table shell as Faculty (see DESIGN.md pattern 1) — no big page
// title, everything lives inside one ca-card.
export default function AdminGroups() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, groups, teachers, teacherById } = useCenterData();
  const [filter, setFilter] = useState('active');
  const [search, setSearch] = useState('');
  // ?teacher=<id> (or "none" for groups without a teacher) — kept in the
  // URL so a refresh or a link from a teacher's page keeps the filter.
  const [params, setParams] = useSearchParams();
  const teacherFilter = params.get('teacher') || 'all';
  const [createOpen, setCreateOpen] = useState(false);

  // ?new=group — the topbar's "+" menu.
  useEffect(() => {
    if (params.get('new') !== 'group') return;
    setCreateOpen(true);
    const next = new URLSearchParams(params);
    next.delete('new');
    setParams(next, { replace: true });
  }, [params, setParams]);
  const setTeacherFilter = (id) => setParams(id === 'all' ? {} : { teacher: id }, { replace: true });

  const teacherOptions = useMemo(() => {
    const count = (id) => groups.filter((g) => g.status !== 'archived' && g.teacherId === id).length;
    const list = [...teachers]
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      .map((t) => ({ value: t.id, label: `${t.name || 'Teacher'} (${count(t.id)})` }));
    const orphans = groups.filter((g) => g.status !== 'archived' && !teacherById[g.teacherId]).length;
    if (orphans) list.push({ value: 'none', label: `No teacher (${orphans})` });
    return list;
  }, [groups, teachers, teacherById]);

  const q = search.trim().toLowerCase();
  const visible = useMemo(() => {
    const now = Date.now();
    return groups
      .filter((g) => {
        if (filter === 'archived') return g.status === 'archived';
        if (g.status === 'archived') return false;
        if (filter === 'quiet') return !g.activity.lastActivity || now - g.activity.lastActivity > 7 * DAY;
        return true;
      })
      .filter((g) => {
        if (teacherFilter === 'all') return true;
        if (teacherFilter === 'none') return !teacherById[g.teacherId];
        return g.teacherId === teacherFilter;
      })
      .filter((g) => !q || [g.name, teacherById[g.teacherId]?.name].some((v) => (v || '').toLowerCase().includes(q)))
      .sort((a, b) => (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0));
  }, [groups, filter, q, teacherById, teacherFilter]);

  const open = (g) => navigate(`/corp/admin/groups/${g.id}`);
  const teacherName = (g) => teacherById[g.teacherId]?.name || 'No teacher';

  return (
    <Page hideHeader>
      <section className="ca-card is-faculty-card">
        <div className="faculty-toolbar faculty-toolbar-wrap">
          <div className="faculty-toolbar-left faculty-toolbar-filters">
            <SearchField value={search} onChange={setSearch} placeholder="Group or teacher" />
            <select
              className={`sa-select sa-select-compact ${teacherFilter !== 'all' ? 'is-set' : ''}`}
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              aria-label="By teacher"
            >
              <option value="all">All teachers</option>
              {teacherOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <Segmented label="Group status" options={FILTERS} value={filter} onChange={setFilter} />
          </div>
          <div className="faculty-toolbar-right">
            <button type="button" className="faculty-btn-invite" onClick={() => setCreateOpen(true)}>
              <Plus size={14} /> New Group
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}><LoadingRows count={5} /></div>
        ) : visible.length === 0 ? (
          <div className="sa-group" style={{ padding: 20 }}>
            {groups.length === 0 ? (
              <EmptyState icon={<Layers size={40} />} title="No groups yet" text="Teachers create groups from their own panel and add students via QR." />
            ) : (
              <EmptyState
                title="No groups here"
                text={teacherFilter !== 'all'
                  ? "This teacher has no group in that status."
                  : filter === 'quiet' ? 'All groups have practiced this week.' : 'Try a different search or filter.'}
                action={teacherFilter !== 'all' ? <Button variant="tinted" onClick={() => setTeacherFilter('all')}>Clear filter</Button> : undefined}
              />
            )}
          </div>
        ) : isDesktop ? (
          <div className="faculty-table groups-table">
            <div className="faculty-table-head">
              <span>Group</span>
              <span>Teacher</span>
              <span>Students</span>
              <span>Active This Week</span>
              <span>Homework</span>
              <span>Last Activity</span>
            </div>
            {visible.map((g) => (
              <div key={g.id} className="faculty-table-row" onClick={() => open(g)}>
                <div className="faculty-cell-name">
                  <span className="faculty-name-link">{g.name || 'Group'}</span>
                  {g.status === 'archived' && <span className="faculty-email-sub">Archived</span>}
                </div>
                <span>{teacherName(g)}</span>
                <span>{g.activity.students}</span>
                <span>{g.activity.students ? `${g.activity.activeWeek} / ${g.activity.students}` : '—'}</span>
                <span>{g.activity.homework}</span>
                <span className="groups-cell-status">
                  <StatusDot tone={activityTone(g.activity.lastActivity)} />
                  {formatRelativeEn(g.activity.lastActivity)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sa-group" style={{ padding: 12 }}>
            {visible.map((g) => (
              <Row
                key={g.id}
                icon={<Users size={16} />}
                iconTone={g.status === 'archived' ? 'gray' : 'green'}
                title={g.name || 'Group'}
                subtitle={`${teacherName(g)} · ${g.activity.students} students · ${formatRelativeEn(g.activity.lastActivity)}`}
                onClick={() => open(g)}
              />
            ))}
          </div>
        )}
      </section>

      <NewGroupSheet
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        defaultTeacherId={teacherFilter !== 'all' && teacherFilter !== 'none' ? teacherFilter : ''}
      />
    </Page>
  );
}
