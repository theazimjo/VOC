import { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { BookOpen, ClipboardList, Users } from 'lucide-react';
import { EmptyState, LoadingRows, Page } from '../super-admin/ui';
import { useCenterData } from './CenterDataContext';
import {
  GroupHeader, GroupStats, HomeworkPanel, ProgressPanel, StudentsPanel, TopicsPanel,
} from './groupView';
import { useGroupInsights } from './useGroupInsights';

const TABS = ['students', 'homework', 'topics', 'progress'];

// /corp/admin/groups/:groupId — who is in the group and how they are
// doing. Header band with tabs, four stat tiles, then one tab's table
// (students · homework · topics · progress).
// Read-only: teachers run their groups (TeacherGroup has the same layout
// with actions, in Uzbek — this page passes `en` everywhere in groupView.jsx
// so it renders in English without forking that shared component tree).
export default function AdminGroupDetail() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { loading, center, teacherById } = useCenterData();

  const tab = TABS.includes(params.get('tab')) ? params.get('tab') : 'students';
  const setTab = (id) => setParams(id === 'students' ? {} : { tab: id }, { replace: true });

  const raw = center?.groups?.[groupId];
  const group = useMemo(() => (raw ? { id: groupId, ...raw } : null), [raw, groupId]);
  const insights = useGroupInsights(group, center, { withTrend: tab === 'progress', en: true });
  const teacher = group ? teacherById[group.teacherId] : null;

  const back = {
    label: 'Back',
    onClick: () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/corp/admin/groups')),
  };

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

  const openStudent = (uid) => navigate(`/corp/admin/students/${uid}`);
  const { rows, hw, courses, total } = insights;

  return (
    <Page hideHeader>
      <GroupHeader
        back={back}
        group={group}
        total={total}
        courses={courses}
        en
        teacher={teacher
          ? <button type="button" className="ca-link" onClick={() => navigate(`/corp/admin/teachers/${teacher.id}`)}>{teacher.name}</button>
          : 'No teacher assigned'}
        tab={tab}
        onTab={setTab}
        tabs={[
          { id: 'students', label: 'Students', count: total },
          { id: 'homework', label: 'Homework', count: hw.items.length },
          { id: 'topics', label: 'Topics', count: courses.reduce((n, c) => n + c.topics.length, 0) },
          { id: 'progress', label: 'Progress' },
        ]}
      />

      {total > 0 && tab === 'students' && <GroupStats insights={insights} en />}

      {tab === 'students' && (
        <StudentsPanel
          rows={rows}
          homeworkCount={hw.items.length}
          onOpen={(r) => openStudent(r.uid)}
          en
          empty={<EmptyState icon={<Users size={36} />} title="No students yet" text="Students join with the group code or QR code the teacher shares." />}
        />
      )}
      {tab === 'homework' && (
        <HomeworkPanel
          items={hw.items}
          onOpenStudent={openStudent}
          en
          empty={<EmptyState icon={<ClipboardList size={36} />} title="No homework yet" text="Homework is assigned by the group's teacher." />}
        />
      )}
      {tab === 'topics' && (
        <TopicsPanel
          courses={courses}
          en
          empty={<EmptyState icon={<BookOpen size={36} />} title="No course assigned" text="The teacher attaches courses to the group from their panel." />}
        />
      )}
      {tab === 'progress' && <ProgressPanel insights={insights} en />}
    </Page>
  );
}
