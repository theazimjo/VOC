import { Users } from 'lucide-react';
import { GROUP_LEVEL_OPTIONS } from '../utils';

export default function EditGroupModal({ p }) {
  const { editForm, handleUpdateGroup, selectedGroup, setEditForm, setShowEditModal, showEditModal, submittingEditGroup } = p;

  return (
      /* Edit Group Modal */
      showEditModal && selectedGroup && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> Guruhni Tahrirlash</h2>
            <form onSubmit={handleUpdateGroup}>
              <div className="input-group" style={{ marginBottom: '1.25rem' }}>
                <label>Guruh Nomi *</label>
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="masalan: Beginner Monday 17:00"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label>Daraja (Level)</label>
                <select
                  className="select"
                  value={editForm.level}
                  onChange={e => setEditForm({ ...editForm, level: e.target.value })}
                >
                  {GROUP_LEVEL_OPTIONS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowEditModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingEditGroup}>
                  {submittingEditGroup ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
  );
}
