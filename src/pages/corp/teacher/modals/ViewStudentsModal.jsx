import { Users } from 'lucide-react';

export default function ViewStudentsModal({ p }) {
  const { groupStudentsList, setViewingGroupStudents, viewingGroupStudents } = p;

  return (
      /* View Students Progress Modal */
      viewingGroupStudents && (
        <div className="modal-overlay" onClick={() => setViewingGroupStudents(null)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> {viewingGroupStudents.name} - Student Progress</h2>

            {groupStudentsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                No students have joined this group yet.<br />
                Give students this 6-digit join code: <strong>{viewingGroupStudents.code}</strong>
              </div>
            ) : (
              <div className="students-progress-list">
                {groupStudentsList.map((st, i) => (
                  <div key={st.id || i} className="student-progress-row">
                    <div className="st-info">
                      <div className="st-avatar">{st.name.charAt(0)}</div>
                      <div>
                        <strong>{st.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{st.email || 'No email'}</div>
                      </div>
                    </div>

                    <div className="st-stats">
                      <span className="badge-active">Joined</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setViewingGroupStudents(null)}>Close</button>
            </div>
          </div>
        </div>
      )
  );
}
