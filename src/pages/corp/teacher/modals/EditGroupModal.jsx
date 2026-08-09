import { Users, X } from 'lucide-react';
import { GROUP_LEVEL_OPTIONS } from '../utils';

export default function EditGroupModal({ p }) {
  const { editForm, handleUpdateGroup, selectedGroup, setEditForm, setShowEditModal, showEditModal, submittingEditGroup } = p;

  if (!showEditModal || !selectedGroup) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setShowEditModal(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '11px',
                background: 'rgba(59, 130, 246, 0.14)',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Users size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--pg-text)' }}>
              Edit Group
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowEditModal(false)}
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
        <form onSubmit={handleUpdateGroup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Group Name *
            </label>
            <input
              type="text"
              className="input"
              required
              placeholder="e.g. Beginner Monday 5pm"
              value={editForm.name}
              onChange={e => setEditForm({ ...editForm, name: e.target.value })}
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
              value={editForm.level}
              onChange={e => setEditForm({ ...editForm, level: e.target.value })}
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
              onClick={() => setShowEditModal(false)}
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
              disabled={submittingEditGroup}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                opacity: submittingEditGroup ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              {submittingEditGroup ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
