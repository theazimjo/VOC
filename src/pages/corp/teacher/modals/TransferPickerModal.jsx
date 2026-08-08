import { ArrowRightLeft, ChevronRight } from 'lucide-react';

export default function TransferPickerModal({ p }) {
  const {
    centerTeachersList, groupSettingsTarget, handleTransferGroupTo,
    loadingTransferTeachers, setShowTransferPicker, showTransferPicker,
  } = p;

  return (
      /* Group transfer picker — replaces the old raw prompt() flow */
      showTransferPicker && groupSettingsTarget && (
        <div className="modal-overlay" onClick={() => setShowTransferPicker(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><ArrowRightLeft size={20} /> "{groupSettingsTarget.name}"ni o'tkazish</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Guruh o'tkaziladigan o'qituvchini tanlang:
            </p>

            {loadingTransferTeachers ? (
              <div className="loading-spinner">Yuklanmoqda...</div>
            ) : centerTeachersList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-secondary)' }}>
                Markazda boshqa o'qituvchi topilmadi.
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
              <button className="btn-secondary" onClick={() => setShowTransferPicker(false)}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )
  );
}
