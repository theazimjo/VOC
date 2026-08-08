import { BookOpen, Check, X } from 'lucide-react';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../data/irregularVerbsCorpPack';
import './AssignPackModal.css';

export default function AssignPackModal({ p }) {
  const { assignCategory, assigningGroup, customPacks, handleAssignPack, setAssignCategory, setAssigningGroup } = p;

  return (
      /* Assign Pack Modal */
      /* Bento Ambient Hero Assign Pack Modal */
      assigningGroup && (
        <div className="modal-overlay" onClick={() => setAssigningGroup(null)}>
          <div className="group-settings-bento-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            {/* Modal Header */}
            <div className="gsbm-header">
              <div className="gsbm-title-block">
                <div className="gsbm-icon-box">
                  <BookOpen size={22} color="#3b82f6" />
                </div>
                <div>
                  <h3 className="gsbm-title">Pack Biriktirish</h3>
                  <p className="gsbm-sub">{assigningGroup.name}</p>
                </div>
              </div>
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => setAssigningGroup(null)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Segmented Bar */}
            <div className="group-seg-bar" style={{ marginTop: '0.2rem', marginBottom: '0.8rem' }}>
              {[
                { key: 'assignedPacks', label: 'Asosiy Packlar' },
                { key: 'additionalPacks', label: "Qo'shimcha Packlar" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={`group-seg-btn ${assignCategory === key ? 'active' : ''}`}
                  onClick={() => setAssignCategory(key)}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Pack List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
              {(() => {
                const assignablePacks = customPacks.filter(
                  p => p.id !== IRREGULAR_VERBS_PACK_ID || assignCategory === 'additionalPacks'
                );
                if (assignablePacks.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      Hali biriktirish uchun packlar mavjud emas.
                    </div>
                  );
                }
                return assignablePacks.map(p => {
                  const isAssigned = (assigningGroup[assignCategory] || []).includes(p.id);
                  return (
                    <div
                      key={p.id}
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        padding: '12px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                          <BookOpen size={18} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>{p.title}</strong>
                            {p.level && <span className="group-level-badge">{p.level}</span>}
                          </div>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {p.wordCount || (p.words ? p.words.length : 0)} ta so'z · {p.scope === 'own' ? 'Mening' : 'Markaz'}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={isAssigned ? 'gib-code-btn' : 'gsbm-save-btn'}
                        style={isAssigned ? { padding: '6px 12px', opacity: 0.8, cursor: 'default' } : { width: 'auto', padding: '7px 14px', fontSize: '0.82rem' }}
                        onClick={() => !isAssigned && handleAssignPack(assigningGroup.id, p.id, assignCategory)}
                        disabled={isAssigned}
                      >
                        {isAssigned ? <Check size={14} color="#34c759" /> : null}
                        <span>{isAssigned ? 'Biriktirilgan' : 'Biriktirish'}</span>
                      </button>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Footer */}
            <div style={{ marginTop: '0.8rem' }}>
              <button
                type="button"
                className="gsbm-cancel-btn"
                style={{ width: '100%' }}
                onClick={() => setAssigningGroup(null)}
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )
  );
}
