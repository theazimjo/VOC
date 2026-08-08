import { AlertTriangle, User } from 'lucide-react';
import { aggregatePackProgress, getGroupPackEntries, getPackUnits } from '../utils';

export default function StudentPackBreakdownModal({ p }) {
  const { customPacks, selectedGroup, setViewingStudentDetail, viewingStudentDetail } = p;

  return (
      /* Student detail — per-pack mastery/retention breakdown */
      viewingStudentDetail && selectedGroup && (
        <div className="modal-overlay" onClick={() => setViewingStudentDetail(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><User size={20} /> {viewingStudentDetail.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {viewingStudentDetail.email || 'Email kiritilmagan'}
            </p>

            {getGroupPackEntries(selectedGroup).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-secondary)' }}>
                Guruhga hali pack biriktirilmagan.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {getGroupPackEntries(selectedGroup).map(({ packId, category }) => {
                  const pack = customPacks.find(cp => cp.id === packId);
                  const agg = aggregatePackProgress((viewingStudentDetail.progress || {})[packId]);
                  const packUnits = pack ? getPackUnits(pack) : [];
                  return (
                    <div key={packId} style={{ padding: '12px 14px', borderRadius: '12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{pack ? pack.title : 'Noma\'lum pack'}</strong>
                        <span className={`pack-category-badge cat-${category === 'Asosiy' ? 'main' : category === 'Kerakli' ? 'required' : 'extra'}`}>{category}</span>
                      </div>
                      {agg.hasData ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          <span>O'zlashtirilgan: <strong style={{ color: 'var(--text-primary)' }}>{agg.wordsLearned || 0}</strong></span>
                          <span>Mastery: <strong style={{ color: 'var(--success)' }}>{agg.masteryPercent || 0}%</strong></span>
                          <span>Retention: <strong style={{ color: 'var(--text-primary)' }}>{agg.retentionPercent || 0}%</strong></span>
                          {agg.atRiskCount > 0 && (
                            <span style={{ color: 'var(--warning)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <AlertTriangle size={13} /> {agg.atRiskCount} ta e'tibor talab
                            </span>
                          )}
                          <span>So'nggi faollik: {agg.lastActivity ? new Date(agg.lastActivity).toLocaleDateString() : '—'}</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Hali mashq qilinmagan.</span>
                      )}

                      {packUnits.length > 0 && (
                        <div className="unit-chip-row" style={{ marginTop: '10px' }}>
                          {packUnits.map(u => {
                            const us = agg.units[u.unitKey];
                            const m = us ? (us.masteryPercent || 0) : 0;
                            const tier = !us ? 'none' : m >= 80 ? 'done' : m > 0 ? 'partial' : 'none';
                            return (
                              <span
                                key={u.unitKey}
                                className={`unit-chip unit-chip-${tier}`}
                                title={`${u.monthTitle} — ${u.title}${us ? ` (${us.wordsLearned || 0}/${us.totalWords || u.totalWords})` : ' — hali boshlanmagan'}`}
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

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setViewingStudentDetail(null)}>Yopish</button>
            </div>
          </div>
        </div>
      )
  );
}
