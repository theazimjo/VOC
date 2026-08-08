import { ArrowLeft, ChevronRight, NotebookPen } from 'lucide-react';
import { aggregatePackProgress } from '../../utils';
import './GroupHomeworkDetail.css';

export default function GroupHomeworkDetail({ p }) {
  const { groupHomeworkList, groupStudentsList, hwId, navigate, selectedGroup, setViewingHomeworkItem } = p;

  return (
    (() => {
              const hw = groupHomeworkList.find(h => h.id === hwId);
              if (!hw) {
                return (
                  <div className="empty-state">
                    <NotebookPen size={40} />
                    <p>Bu uy vazifasi topilmadi.</p>
                    <button className="btn-secondary" onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)} style={{ marginTop: '10px' }}>
                      Uy vazifalariga qaytish
                    </button>
                  </div>
                );
              }
              const hwItems = hw.items || [];
              return (
                <div className="hw-manage-page">
                  <button
                    type="button"
                    className="hw-manage-back"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)}
                  >
                    <ArrowLeft size={16} /> Uy vazifasi
                  </button>

                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{hw.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                      {hwItems.length} ta mavzu{hw.assignedAt && <> — <strong>{new Date(hw.assignedAt).toLocaleDateString()}</strong></>}
                    </p>
                  </div>

                  {/* Assigned topics — click one to open its detail window */}
                  <div className="tpv-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {hwItems.map(item => (
                      <button
                        type="button"
                        key={`${item.packId}_${item.monthId}_${item.unitId}`}
                        className="tpv-row"
                        onClick={() => setViewingHomeworkItem(item)}
                        style={{ cursor: 'pointer', width: '100%', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                          <span className="tpv-row-label" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.95rem' }}>{item.unitTitle}</span>
                          <span className="tpv-row-meta" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{item.packTitle} · {item.totalWords} ta so'z</span>
                        </div>
                        <ChevronRight size={18} className="tpv-row-arrow" />
                      </button>
                    ))}
                  </div>

                  {/* Per-student completion */}
                  <div className="teachers-table-card" style={{ marginTop: '0.25rem', background: 'var(--bg-tertiary)' }}>
                    <h4 style={{ padding: '1rem 1.25rem', margin: 0, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', fontSize: '0.92rem', fontWeight: 600 }}>
                      O'quvchilar bo'yicha bajarilishi
                    </h4>
                    {groupStudentsList.length === 0 ? (
                      <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        Statistika ko'rsatish uchun guruhda o'quvchilar mavjud emas.
                      </div>
                    ) : (
                      <div className="student-progress-cards">
                        {groupStudentsList.map(student => {
                          const itemStats = hwItems.map(item => {
                            const agg = aggregatePackProgress((student.progress || {})[item.packId]);
                            const us = agg.units[`${item.monthId}_${item.unitId}`];
                            const m = us ? (us.masteryPercent || 0) : 0;
                            return { item, masteryPercent: m, done: m >= 80, started: !!us };
                          });
                          const doneCount = itemStats.filter(s => s.done).length;
                          return (
                            <div key={student.id} className="student-progress-card">
                              <div className="student-progress-card-head" style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div className="st-avatar" style={{ background: 'var(--accent-1)', fontWeight: 700 }}>{(student.name || '?').charAt(0).toUpperCase()}</div>
                                  <strong style={{ color: 'var(--text-primary)' }}>{student.name}</strong>
                                </div>
                                <span className="badge-active" style={{ background: doneCount === hwItems.length ? 'var(--success-dim)' : 'var(--bg-glass-hover)', color: doneCount === hwItems.length ? 'var(--success)' : 'var(--text-secondary)' }}>
                                  {doneCount}/{hwItems.length} done
                                </span>
                              </div>
                              <div className="unit-chip-row" style={{ marginTop: '10px' }}>
                                {itemStats.map(({ item, masteryPercent, done, started }) => (
                                  <span
                                    key={`${item.packId}_${item.monthId}_${item.unitId}`}
                                    className={`unit-chip unit-chip-${done ? 'done' : started ? 'partial' : 'none'}`}
                                    title={item.packTitle}
                                  >
                                    {item.unitTitle}: {started ? `${masteryPercent}%` : '—'}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
    })()
  );
}
