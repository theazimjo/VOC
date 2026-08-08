import { Check, NotebookPen } from 'lucide-react';
import { getHomeworkCandidates, getUsedHomeworkKeys } from '../utils';

export default function HomeworkEditorModal({ p }) {
  const {
    customPacks, groupHomeworkList, handleAddHomework, homeworkSelection,
    savingHomework, selectedGroup, setShowHomeworkEditor, showHomeworkEditor, toggleHomeworkItem,
  } = p;

  return (
      /* Homework Editor Modal — always adds a NEW assignment. Topics already
          given in an earlier one still show up (so the teacher can see
          what's already covered) but are greyed out and can't be reselected. */
      showHomeworkEditor && selectedGroup && (() => {
        const usedKeys = getUsedHomeworkKeys(groupHomeworkList);
        const candidates = getHomeworkCandidates(selectedGroup, customPacks, usedKeys);
        const byPack = new Map();
        candidates.forEach(c => {
          if (!byPack.has(c.packId)) byPack.set(c.packId, { packTitle: c.packTitle, units: [] });
          byPack.get(c.packId).units.push(c);
        });

        return (
          <div className="modal-overlay" onClick={() => !savingHomework && setShowHomeworkEditor(false)}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
              <h2><NotebookPen size={20} /> Yangi uy vazifasi: {selectedGroup.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                Asosiy va qo'shimcha packlardagi mavzulardan bir nechtasini tanlang. Kulrang mavzular avval berilgan — ularni qayta tanlab bo'lmaydi.
              </p>

              {candidates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Avval "Packlar" bo'limidan guruhga Asosiy yoki Qo'shimcha pack biriktiring.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '50vh', overflowY: 'auto', paddingRight: '4px' }}>
                  {[...byPack.entries()].map(([packId, { packTitle, units }]) => (
                    <div key={packId} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                        {packTitle}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {units.map(u => {
                          const key = `${u.packId}_${u.monthId}_${u.unitId}`;
                          const checked = homeworkSelection.has(key);
                          return (
                            <div
                              key={key}
                              onClick={() => toggleHomeworkItem(u)}
                              style={{
                                cursor: u.used ? 'default' : 'pointer',
                                opacity: u.used ? 0.5 : 1,
                                background: checked ? 'var(--accent-1-dim)' : 'var(--bg-tertiary)',
                                border: `1px solid ${checked ? 'var(--accent-1)' : 'var(--border)'}`,
                                padding: '10px 14px',
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '12px'
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem' }}>{u.unitTitle}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                                  {u.totalWords} ta so'z{u.used && ' · Berilgan'}
                                </span>
                              </div>
                              {u.used ? (
                                <Check size={16} color="var(--text-muted)" strokeWidth={3} />
                              ) : (
                                <div
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '6px',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: checked ? 'var(--accent-1)' : 'transparent',
                                    border: `1.5px solid ${checked ? 'var(--accent-1)' : 'var(--border)'}`
                                  }}
                                >
                                  {checked && <Check size={13} color="#fff" strokeWidth={3} />}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowHomeworkEditor(false)} disabled={savingHomework}>Bekor qilish</button>
                <button type="button" className="btn-primary" onClick={handleAddHomework} disabled={savingHomework || homeworkSelection.size === 0}>
                  {savingHomework ? 'Saqlanmoqda...' : `Vazifa berish (${homeworkSelection.size})`}
                </button>
              </div>
            </div>
          </div>
        );
      })()
  );
}
