import { X } from 'lucide-react';
import { getStudentSummary } from '../utils';

export default function StudentDetailModal({ p }) {
  const { handleRemoveStudent, selectedGroup, setViewingStudentDetail, viewingStudentDetail } = p;

  return (
      /* Student Detail Modal */
      viewingStudentDetail && (
        <div className="modal-overlay" onClick={() => setViewingStudentDetail(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="st-avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                  {viewingStudentDetail.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                    {viewingStudentDetail.name}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {viewingStudentDetail.email || 'Email kiritilmagan'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => setViewingStudentDetail(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-tertiary)', padding: '14px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Guruhga a'zo bo'lgan sana:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                  {viewingStudentDetail.joinedAt ? new Date(viewingStudentDetail.joinedAt).toLocaleDateString() : "Yaqinda"}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>O'zlashtirish darajasi:</span>
                <span className="badge-active">
                  {getStudentSummary(viewingStudentDetail, selectedGroup).masteryPercent}% mastery
                </span>
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
              <button className="btn-secondary" onClick={() => setViewingStudentDetail(null)}>Yopish</button>
              <button
                type="button"
                className="btn-danger"
                style={{ padding: '8px 16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  const st = viewingStudentDetail;
                  setViewingStudentDetail(null);
                  handleRemoveStudent(st);
                }}
              >
                Guruhdan chiqarish
              </button>
            </div>
          </div>
        </div>
      )
  );
}
