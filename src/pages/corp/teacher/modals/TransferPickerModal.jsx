import { ArrowRightLeft, ChevronRight } from 'lucide-react';
import TeacherModal from '../TeacherModal';

export default function TransferPickerModal({ p }) {
  const {
    centerTeachersList, groupSettingsTarget, handleTransferGroupTo,
    loadingTransferTeachers, setShowTransferPicker, showTransferPicker,
  } = p;

  return (
      /* Group transfer picker — replaces the old raw prompt() flow */
      <TeacherModal open={showTransferPicker && !!groupSettingsTarget} onClose={() => setShowTransferPicker(false)}>
          {groupSettingsTarget && (<>
            <h2><ArrowRightLeft size={20} /> Transfer "{groupSettingsTarget.name}"</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Select a teacher to transfer this group to:
            </p>

            {loadingTransferTeachers ? (
              <div className="loading-spinner">Loading...</div>
            ) : centerTeachersList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-secondary)' }}>
                No other teachers found at this center.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                {centerTeachersList.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className="dropdown-item"
                    style={{ border: '1px solid var(--border)', justifyContent: 'space-between' }}
                    onClick={() => handleTransferGroupTo(t)}
                  >
                    <span>
                      <strong style={{ color: 'var(--text-primary)' }}>{t.name}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{t.email}</div>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowTransferPicker(false)}>Cancel</button>
            </div>
          </>)}
      </TeacherModal>
  );
}
