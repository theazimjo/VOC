import { useMemo } from 'react';
import { NotebookPen, Users } from 'lucide-react';
import { getHomeworkCompletion } from '../teacher/utils';
import { computeGroupActivity, formatRelative, latestUnitActivity, studentMastery } from './centerActivity';
import { EmptyState, LoadingRows, Page, Row, Section, Stat, StatusDot } from './ui';
import { useIsDesktop } from './useIsDesktop';

const DAY = 24 * 60 * 60 * 1000;
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) : '—');

function recencyTone(ts, now = Date.now()) {
  if (!ts) return 'gray';
  if (now - ts <= 7 * DAY) return 'green';
  if (now - ts <= 30 * DAY) return 'orange';
  return 'gray';
}

// Read-only group page shared by the super admin and the center admin:
// students with mastery / homework / last practice, plus homework list.
export default function GroupDetailView({ group, teacher, back, loading }) {
  const isDesktop = useIsDesktop();
  const homework = useMemo(
    () => Object.entries(group?.homeworkList || {})
      .map(([id, hw]) => ({ id, ...hw }))
      .sort((a, b) => (Date.parse(b.assignedAt || '') || 0) - (Date.parse(a.assignedAt || '') || 0)),
    [group],
  );
  const students = useMemo(
    () => Object.entries(group?.students || {})
      .map(([uid, st]) => {
        const doneHomework = homework.filter((hw) => getHomeworkCompletion(st, hw).allDone).length;
        return { uid, ...st, last: latestUnitActivity(st) || null, mastery: studentMastery(st), doneHomework };
      })
      .sort((a, b) => (b.last || 0) - (a.last || 0)),
    [group, homework],
  );
  const activity = useMemo(() => computeGroupActivity(group), [group]);

  if (loading) {
    return <Page title=" " back={back}><LoadingRows count={6} /></Page>;
  }

  if (!group) {
    return (
      <Page title="Group not found" back={back}>
        <div className="sa-group"><EmptyState icon={<Users size={40} />} title="This group doesn't exist" text="It may have been deleted." /></div>
      </Page>
    );
  }

  return (
    <Page
      back={back}
      title={group.name || 'Group'}
      subtitle={[group.level, teacher?.name ? `Teacher: ${teacher.name}` : null, group.status === 'archived' ? 'Archived' : null].filter(Boolean).join(' · ')}
    >
      <div className="sa-stats">
        <Stat value={activity.students} label="Students" />
        <Stat value={activity.activeWeek} label="Practiced this week" tone="green" />
        <Stat value={activity.homework} label="Homework given" tone="blue" />
        <Stat value={formatRelative(activity.lastActivity)} label="Last activity" />
      </div>

      <div className="sa-columns">
        <div>
          <Section title={`Students (${students.length})`}>
            {students.length === 0 ? (
              <Row title="Nobody has joined yet" subtitle="Students join with the group code or the QR code." />
            ) : isDesktop ? (
              <div className="sa-table is-flat" style={{ '--sa-cols': 'minmax(200px, 2fr) 110px 110px 150px 18px' }}>
                <div className="sa-table-head">
                  <span>Student</span>
                  <span className="num">Mastery</span>
                  <span className="num">Homework</span>
                  <span>Last practice</span>
                  <span />
                </div>
                {students.map((st) => (
                  <div key={st.uid} className="sa-table-row" style={{ cursor: 'default' }}>
                    <span className="sa-cell-main">
                      <span className="sa-row-icon tone-green">{(st.name || '?').charAt(0).toUpperCase()}</span>
                      <span className="sa-cell-text">
                        <span className="sa-cell-title">{st.name || 'Student'}</span>
                        <span className="sa-cell-sub">{st.email || `Joined: ${fmtDate(st.joinedAt)}`}</span>
                      </span>
                    </span>
                    <span className="num">{st.mastery == null ? '—' : `${st.mastery}%`}</span>
                    <span className="num">{homework.length ? `${st.doneHomework} / ${homework.length}` : '—'}</span>
                    <span className="sa-cell-status">
                      <StatusDot tone={recencyTone(st.last)} />
                      {st.last ? formatRelative(st.last) : 'Has not practiced'}
                    </span>
                    <span />
                  </div>
                ))}
              </div>
            ) : (
              students.map((st) => (
                <Row
                  key={st.uid}
                  icon={(st.name || '?').charAt(0).toUpperCase()}
                  iconTone="green"
                  title={st.name || 'Student'}
                  subtitle={[
                    st.mastery == null ? null : `${st.mastery}%`,
                    homework.length ? `homework ${st.doneHomework}/${homework.length}` : null,
                    st.last ? formatRelative(st.last) : 'has not practiced',
                  ].filter(Boolean).join(' · ')}
                  accessory={<StatusDot tone={recencyTone(st.last)} />}
                />
              ))
            )}
          </Section>
        </div>

        <div>
          <Section title="Group">
            <Row title="Code" detail={group.code || '—'} />
            <Row title="Level" detail={group.level || '—'} />
            <Row title="Teacher" detail={teacher?.name || '—'} />
            <Row title="Created" detail={fmtDate(group.createdAt)} />
          </Section>

          <Section title={`Homework (${homework.length})`}>
            {homework.length === 0 ? (
              <Row title="No homework assigned yet" />
            ) : homework.slice(0, 8).map((hw) => {
              const done = students.filter((st) => getHomeworkCompletion(st, hw).allDone).length;
              return (
                <Row
                  key={hw.id}
                  icon={<NotebookPen size={16} />}
                  iconTone="blue"
                  title={hw.name || 'Homework'}
                  subtitle={`${(hw.items || []).length} ${(hw.items || []).length === 1 ? 'topic' : 'topics'} · ${fmtDate(hw.assignedAt)}`}
                  detail={`${done}/${students.length}`}
                />
              );
            })}
          </Section>
        </div>
      </div>
    </Page>
  );
}
