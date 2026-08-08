import { Users } from 'lucide-react';
import { GROUP_LEVEL_OPTIONS } from '../utils';

export default function CreateGroupModal({ p }) {
  const { groupForm, handleCreateGroup, setGroupForm, setShowCreateModal, showCreateModal, submittingGroup } = p;

  return (
      /* Create Group Modal */
      showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> Yangi Guruh Yaratish</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="input-group" style={{ marginBottom: '1.25rem' }}>
                <label>Guruh Nomi *</label>
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="masalan: Beginner Monday 17:00"
                  value={groupForm.name}
                  onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Daraja (Level)</label>
                <select
                  className="select"
                  value={groupForm.level}
                  onChange={e => setGroupForm({ ...groupForm, level: e.target.value })}
                >
                  {GROUP_LEVEL_OPTIONS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingGroup}>
                  {submittingGroup ? 'Yaratilmoqda...' : 'Guruhni Yaratish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
  );
}
