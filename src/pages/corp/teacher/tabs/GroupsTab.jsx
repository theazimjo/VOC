import { Users } from 'lucide-react';
import GroupDetailView from './groups/GroupDetailView';
import GroupsListView from './groups/GroupsListView';

export default function GroupsTab({ p }) {
  const { selectedGroup, urlGroupId, loading, navigate, setSelectedGroupId } = p;

  if (selectedGroup) {
    return <GroupDetailView p={p} />;
  }

  if (urlGroupId && !loading) {
    return (
          <div className="empty-state">
            <Users size={48} />
            <p>Guruh topilmadi yoki sizga biriktirilmagan.</p>
            <button className="btn-secondary" onClick={() => { setSelectedGroupId(null); navigate('/corp/teacher'); }} style={{ marginTop: '10px' }}>
              Guruhlarim ro'yxatiga qaytish
            </button>
          </div>
    );
  }

  return <GroupsListView p={p} />;
}
