import { useNavigate, useParams } from 'react-router-dom';
import GroupDetailView from '../super-admin/GroupDetailView';
import { useCenterData } from './CenterDataContext';

export default function AdminGroupDetail() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { loading, center, teacherById } = useCenterData();
  const group = center?.groups?.[groupId] || null;

  return (
    <GroupDetailView
      loading={loading}
      group={group}
      teacher={group ? teacherById[group.teacherId] : null}
      // Opened from Home, Groups or a teacher's page — go back to wherever
      // that was; a direct link falls back to the groups list.
      back={{
        label: 'Orqaga',
        onClick: () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/corp/admin/groups')),
      }}
    />
  );
}
