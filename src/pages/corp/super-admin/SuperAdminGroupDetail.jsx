import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCenter } from '../../../services/corpService';
import GroupDetailView from './GroupDetailView';

export default function SuperAdminGroupDetail() {
  const { centerId, groupId } = useParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCenter(centerId)
      .then(setCenter)
      .catch((err) => console.error('Error loading group:', err))
      .finally(() => setLoading(false));
  }, [centerId]);

  const group = center?.groups?.[groupId] || null;

  return (
    <GroupDetailView
      loading={loading}
      group={group}
      teacher={group ? center?.teachers?.[group.teacherId] : null}
      back={{ label: center?.name || 'Markaz', onClick: () => navigate(`/corp/super-admin/centers/${centerId}`) }}
    />
  );
}
