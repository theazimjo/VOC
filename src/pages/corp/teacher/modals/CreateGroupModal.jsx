import { Users, X } from 'lucide-react';
import { GROUP_LEVEL_OPTIONS } from '../utils';
import TeacherModal from '../TeacherModal';

export default function CreateGroupModal({ p }) {
  const { groupForm, handleCreateGroup, setGroupForm, setShowCreateModal, showCreateModal, submittingGroup } = p;

  return (
    <TeacherModal open={showCreateModal} onClose={() => setShowCreateModal(false)} maxWidth="400px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '11px',
                background: 'rgba(var(--accent-rgb), 0.14)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Users size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--pg-text)' }}>
              Create New Group
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(false)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '9px',
              background: 'var(--pg-surface)',
              border: '1px solid var(--pg-hairline)',
              color: 'var(--pg-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateGroup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Group Name *
            </label>
            <input
              type="text"
              className="input"
              required
              placeholder="e.g. Beginner Monday 5pm"
              value={groupForm.name}
              onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '12px',
                background: 'var(--pg-surface)',
                border: '1px solid var(--pg-hairline)',
                color: 'var(--pg-text)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Level
            </label>
            <select
              className="select"
              value={groupForm.level}
              onChange={e => setGroupForm({ ...groupForm, level: e.target.value })}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '12px',
                background: 'var(--pg-surface)',
                border: '1px solid var(--pg-hairline)',
                color: 'var(--pg-text)',
                fontSize: '0.88rem'
              }}
            >
              {GROUP_LEVEL_OPTIONS.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
            </select>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', marginTop: '0.25rem' }}>
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                background: 'var(--pg-surface)',
                border: '1px solid var(--pg-hairline)',
                color: 'var(--pg-text)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={submittingGroup}
              style={{ opacity: submittingGroup ? 0.7 : 1 }}
            >
              {submittingGroup ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </TeacherModal>
  );
}
