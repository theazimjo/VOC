import { useNavigate } from 'react-router-dom';
import { Archive, ChevronRight } from 'lucide-react';
import { formatRelativeEn as formatRelative } from '../super-admin/centerActivity';
import { EmptyState, LoadingRows, Page, Row } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useTeacherData } from './TeacherDataContext';

// Archived groups keep their students and results; opening one shows the
// usual group page, where the gear holds "Restore from archive". Same
// Faculty-card table as My Groups.
export default function TeacherArchive() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, archivedGroups } = useTeacherData();
  const open = (g) => navigate(`/corp/teacher/group/${g.id}`);

  return (
    <Page
      back={{ label: 'My Groups', onClick: () => navigate('/corp/teacher') }}
      title="Archive"
      subtitle={loading ? ' ' : `${archivedGroups.length} ${archivedGroups.length === 1 ? 'group' : 'groups'} · open one to restore it from its settings`}
    >
      <section className="ca-card is-faculty-card">
        {loading ? (
          <div style={{ padding: 20 }}><LoadingRows count={3} /></div>
        ) : archivedGroups.length === 0 ? (
          <div className="sa-group" style={{ padding: 20 }}>
            <EmptyState icon={<Archive size={40} />} title="Archive is empty" text="When a group's course ends, archive it from its settings and it lands here." />
          </div>
        ) : isDesktop ? (
          <div className="faculty-table teacher-archive-table">
            <div className="faculty-table-head">
              <span>Group</span>
              <span>Students</span>
              <span>Homework</span>
              <span>Last activity</span>
              <span />
            </div>
            {archivedGroups.map((g) => (
              <div
                key={g.id}
                className="faculty-table-row"
                role="button"
                tabIndex={0}
                onClick={() => open(g)}
                onKeyDown={(e) => { if (e.key === 'Enter') open(g); }}
              >
                <div className="ca-course-cell">
                  <span className="ca-course-icon is-archived" aria-hidden="true"><Archive size={16} /></span>
                  <span className="faculty-name-link">{g.name || 'Group'}</span>
                </div>
                <span>{g.activity.students}</span>
                <span>{g.homework.length}</span>
                <span className={g.activity.lastActivity ? '' : 'ca-muted'}>{g.activity.lastActivity ? formatRelative(g.activity.lastActivity) : 'Never'}</span>
                <span className="ca-row-actions"><ChevronRight size={16} className="ca-row-chevron" aria-hidden="true" /></span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sa-group" style={{ padding: 12 }}>
            {archivedGroups.map((g) => (
              <Row
                key={g.id}
                icon={<Archive size={16} />}
                iconTone="gray"
                title={g.name || 'Group'}
                subtitle={`${g.activity.students} ${g.activity.students === 1 ? 'student' : 'students'} · ${g.homework.length} homework`}
                onClick={() => open(g)}
              />
            ))}
          </div>
        )}
      </section>
    </Page>
  );
}
