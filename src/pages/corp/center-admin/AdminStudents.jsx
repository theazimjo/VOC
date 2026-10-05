import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, QrCode } from 'lucide-react';
import { formatRelativeEn, latestUnitActivity, studentMastery } from '../super-admin/centerActivity';
import { EmptyState, LoadingRows, Page, Row, SearchField, Segmented, StatusDot } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';
import { AddStudentsSheet, NewGroupSheet } from './QuickCreateSheets';
import { Bar } from './groupView';
import { masteryTone } from './useGroupInsights';

const DAY = 24 * 60 * 60 * 1000;
const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active', dot: 'green' },
  { value: 'quiet', label: 'Quiet', dot: 'orange' },
];

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

// Every student in every active group. Students join by QR / group code,
// so there's nothing to add here — this page is for spotting who stopped
// practicing. One row per person even when they are in several groups; a
// row opens the student's page (AdminStudentDetail). Same ca-card/
// faculty-table shell as Faculty/Groups (see DESIGN.md pattern 1) — no
// bulk toolbar here, since there's nothing to select and act on in bulk.
export default function AdminStudents() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, students } = useCenterData();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sheet, setSheet] = useState(null); // 'students' | 'group'
  const [params, setParams] = useSearchParams();

  // ?new=student — the topbar's "+" menu.
  useEffect(() => {
    if (params.get('new') !== 'student') return;
    setSheet('students');
    setParams({}, { replace: true });
  }, [params, setParams]);

  const rows = useMemo(() => {
    const byUid = new Map();
    students.forEach((st) => {
      const last = latestUnitActivity(st) || null;
      const mastery = studentMastery(st);
      const row = byUid.get(st.uid) || { uid: st.uid, name: st.name, email: st.email, groups: [], masteries: [], last: null };
      row.groups.push({ id: st.groupId, name: st.groupName, teacherName: st.teacherName });
      if (mastery != null) row.masteries.push(mastery);
      if (last && (!row.last || last > row.last)) row.last = last;
      if (!row.email && st.email) row.email = st.email;
      byUid.set(st.uid, row);
    });
    return [...byUid.values()].map((r) => ({
      ...r,
      groupName: r.groups.map((g) => g.name).join(', '),
      teacherName: [...new Set(r.groups.map((g) => g.teacherName))].join(', '),
      mastery: r.masteries.length ? Math.round(r.masteries.reduce((a, b) => a + b, 0) / r.masteries.length) : null,
    }));
  }, [students]);

  const q = search.trim().toLowerCase();
  const visible = useMemo(() => {
    const now = Date.now();
    return rows
      .filter((st) => {
        const recent = st.last && now - st.last <= 7 * DAY;
        if (filter === 'active') return recent;
        if (filter === 'quiet') return !recent;
        return true;
      })
      .filter((st) => !q || [st.name, st.email, st.groupName, st.teacherName].some((v) => (v || '').toLowerCase().includes(q)))
      .sort((a, b) => (filter === 'quiet' ? (a.last || 0) - (b.last || 0) : (b.last || 0) - (a.last || 0)));
  }, [rows, filter, q]);

  const openStudent = (st) => navigate(`/corp/admin/students/${st.uid}`);

  return (
    <Page hideHeader>
      <section className="ca-card is-faculty-card">
        <div className="faculty-toolbar faculty-toolbar-wrap">
          <div className="faculty-toolbar-left faculty-toolbar-filters">
            <SearchField value={search} onChange={setSearch} placeholder="Name, group or teacher" />
            <Segmented label="Student activity" options={FILTERS} value={filter} onChange={setFilter} />
          </div>
          <div className="faculty-toolbar-right">
            <button type="button" className="faculty-btn-invite" onClick={() => setSheet('students')}>
              <QrCode size={14} /> Add Students
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 20 }}><LoadingRows count={6} /></div>
        ) : visible.length === 0 ? (
          <div className="sa-group" style={{ padding: 20 }}>
            {rows.length === 0 ? (
              <EmptyState
                icon={<GraduationCap size={40} />}
                title="No students yet"
                text="Students join with a QR code or group code from their teacher."
              />
            ) : (
              <EmptyState title="No one found" text="Try a different search or filter." />
            )}
          </div>
        ) : isDesktop ? (
          <div className="faculty-table students-table">
            <div className="faculty-table-head">
              <span>Student</span>
              <span>Group</span>
              <span>Teacher</span>
              <span>Mastery</span>
              <span>Last Practice</span>
            </div>
            {visible.map((st) => (
              <div key={st.uid} className="faculty-table-row" onClick={() => openStudent(st)}>
                <div className="faculty-cell-name">
                  <span className="faculty-name-link">{st.name || 'Student'}</span>
                  <span className="faculty-email-sub">{st.email || '—'}</span>
                </div>
                <span className="students-groups-cell">
                  {st.groups.length > 1
                    ? st.groups.map((g) => <span key={g.id} className="ca-tag">{g.name || 'Group'}</span>)
                    : (st.groupName || '—')}
                </span>
                <span>{st.teacherName || '—'}</span>
                <span className="students-mastery-cell">
                  {st.mastery == null ? '—' : (
                    <>
                      <span className="students-mastery-bar"><Bar value={st.mastery} tone={masteryTone(st.mastery)} /></span>
                      <span className="ca-topic-val">{st.mastery}%</span>
                    </>
                  )}
                </span>
                <span className="groups-cell-status">
                  <StatusDot tone={activityTone(st.last)} />
                  {st.last ? formatRelativeEn(st.last) : 'No practice yet'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sa-group" style={{ padding: 12 }}>
            {visible.map((st) => (
              <Row
                key={st.uid}
                icon={(st.name || '?').charAt(0).toUpperCase()}
                iconTone="green"
                title={st.name || 'Student'}
                subtitle={[st.groupName, st.mastery == null ? null : `${st.mastery}%`, st.last ? formatRelativeEn(st.last) : 'no practice yet'].filter(Boolean).join(' · ')}
                accessory={<StatusDot tone={activityTone(st.last)} />}
                onClick={() => openStudent(st)}
              />
            ))}
          </div>
        )}
      </section>

      <AddStudentsSheet open={sheet === 'students'} onClose={() => setSheet(null)} onNewGroup={() => setSheet('group')} />
      <NewGroupSheet open={sheet === 'group'} onClose={() => setSheet(null)} />
    </Page>
  );
}
