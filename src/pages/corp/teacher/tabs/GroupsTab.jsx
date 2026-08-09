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
            <p>Group not found, or not assigned to you.</p>
            <button className="btn-secondary" onClick={() => { setSelectedGroupId(null); navigate('/corp/teacher'); }} style={{ marginTop: '10px' }}>
              Back to My Groups
            </button>
          </div>
    );
  }

  return <GroupsListView p={p} />;
}
