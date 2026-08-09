import { AlertTriangle, X } from 'lucide-react';
import { aggregatePackProgress, getGroupPackEntries, getPackUnits, getStudentSummary } from '../utils';

export default function StudentDetailModal({ p }) {
  const { customPacks, handleRemoveStudent, selectedGroup, setViewingStudentDetail, viewingStudentDetail } = p;

  return (
      /* Student Detail Modal — overview + per-pack mastery/retention breakdown */
      viewingStudentDetail && (
        <div className="modal-overlay" onClick={() => setViewingStudentDetail(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div className="st-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem', flexShrink: 0 }}>
                  {viewingStudentDetail.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--pg-text)', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {viewingStudentDetail.name}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--pg-text-muted)' }}>
                    {viewingStudentDetail.email || 'No email'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingStudentDetail(null)}
                style={{
                  width: '30px', height: '30px', borderRadius: '9px', flexShrink: 0,
                  background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)', color: 'var(--pg-text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--pg-surface)', padding: '14px', borderRadius: '16px', border: '1px solid var(--pg-hairline)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--pg-text-muted)', fontSize: '0.85rem' }}>Joined on:</span>
                <span style={{ color: 'var(--pg-text)', fontWeight: 600, fontSize: '0.85rem' }}>
                  {viewingStudentDetail.joinedAt ? new Date(viewingStudentDetail.joinedAt).toLocaleDateString() : "Recently"}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--pg-text-muted)', fontSize: '0.85rem' }}>Mastery level:</span>
                <span className="badge-active">
                  {getStudentSummary(viewingStudentDetail, selectedGroup).masteryPercent}% mastery
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--pg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Pack Breakdown
            </div>

            {getGroupPackEntries(selectedGroup).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.25rem 0', color: 'var(--pg-text-secondary)', fontSize: '0.85rem' }}>
                No pack assigned to this group yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto', paddingRight: '2px' }}>
                {getGroupPackEntries(selectedGroup).map(({ packId, category }) => {
                  const pack = customPacks.find(cp => cp.id === packId);
                  const agg = aggregatePackProgress((viewingStudentDetail.progress || {})[packId]);
                  const packUnits = pack ? getPackUnits(pack) : [];
                  return (
                    <div key={packId} style={{ padding: '10px 12px', borderRadius: '12px', background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                        <strong style={{ color: 'var(--pg-text)', fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pack ? pack.title : 'Unknown pack'}</strong>
                        <span className={`pack-category-badge cat-${category === 'Main' ? 'main' : category === 'Required' ? 'required' : 'extra'}`}>{category}</span>
                      </div>
                      {agg.hasData ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.78rem', color: 'var(--pg-text-secondary)' }}>
                          <span>Learned: <strong style={{ color: 'var(--pg-text)' }}>{agg.wordsLearned || 0}</strong></span>
                          <span>Mastery: <strong style={{ color: 'var(--success)' }}>{agg.masteryPercent || 0}%</strong></span>
                          <span>Retention: <strong style={{ color: 'var(--pg-text)' }}>{agg.retentionPercent || 0}%</strong></span>
                          {agg.atRiskCount > 0 && (
                            <span style={{ color: 'var(--warning)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <AlertTriangle size={12} /> {agg.atRiskCount} need attention
                            </span>
                          )}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--pg-text-muted)' }}>Not practiced yet.</span>
                      )}

                      {packUnits.length > 0 && (
                        <div className="unit-chip-row" style={{ marginTop: '8px' }}>
                          {packUnits.map(u => {
                            const us = agg.units[u.unitKey];
                            const m = us ? (us.masteryPercent || 0) : 0;
                            const tier = !us ? 'none' : m >= 80 ? 'done' : m > 0 ? 'partial' : 'none';
                            return (
                              <span
                                key={u.unitKey}
                                className={`unit-chip unit-chip-${tier}`}
                                title={`${u.monthTitle} — ${u.title}${us ? ` (${us.wordsLearned || 0}/${us.totalWords || u.totalWords})` : ' — not started yet'}`}
                              >
                                {u.title}: {us ? `${m}%` : '—'}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="modal-actions" style={{ marginTop: '1.1rem' }}>
              <button className="btn-secondary" onClick={() => setViewingStudentDetail(null)}>Close</button>
              <button
                type="button"
                className="btn-danger"
                style={{ padding: '8px 16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  const st = viewingStudentDetail;
                  setViewingStudentDetail(null);
                  handleRemoveStudent(st);
                }}
              >
                Remove from Group
              </button>
            </div>
          </div>
        </div>
      )
  );
}
