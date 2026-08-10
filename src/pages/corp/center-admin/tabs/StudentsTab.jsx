import { GraduationCap, Search, Users } from 'lucide-react';
import { getInitials } from '../utils';

// The sidebar has always linked here, but this tab never had a
// component behind it (empty page). Students only ever live nested
// under their own group in the DB, so this assembles the "every student
// in the center" view CenterAdminDashboard.jsx already fetches lazily
// (allStudents = every group's students, tagged with group + teacher).
export default function StudentsTab({ p }) {
  const { allStudents, filteredStudents, loadingStudents, studentSearchTerm, setStudentSearchTerm, totalTeacherStudents } = p;

  return (
    <div className="teachers-page-container">
      <div className="teachers-top-bar">
        <div className="teachers-title-area">
          <h1>O'quvchilar</h1>
          <p>{totalTeacherStudents} ta o'quvchi · {allStudents.length ? new Set(allStudents.map(s => s.groupId)).size : 0} ta guruhda</p>
        </div>

        <div className="teachers-top-actions">
          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Ism, email yoki guruh bo'yicha qidirish..."
              value={studentSearchTerm}
              onChange={e => setStudentSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loadingStudents ? (
        <div className="loading-spinner">Yuklanmoqda...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="empty-state" style={{ background: 'var(--pg-surface)', border: '1px dashed var(--pg-hairline)', borderRadius: '16px', padding: '3rem 1rem' }}>
          <GraduationCap size={40} style={{ opacity: 0.5 }} />
          <p style={{ color: 'var(--pg-text)', fontWeight: 600, fontSize: '1rem', margin: 0 }}>
            {studentSearchTerm ? `"${studentSearchTerm}" bo'yicha o'quvchi topilmadi` : "Hozircha o'quvchilar yo'q"}
          </p>
          <p style={{ color: 'var(--pg-text-secondary)', fontSize: '0.85rem', margin: 0 }}>
            O'quvchilar guruhga qo'shilgach shu yerda ko'rinadi.
          </p>
        </div>
      ) : (
        <div className="teachers-table-card">
          <div className="teachers-table-wrap">
            <table className="teachers-table">
              <thead>
                <tr>
                  <th>O'QUVCHI</th>
                  <th>GURUH</th>
                  <th>O'QITUVCHI</th>
                  <th>QO'SHILGAN SANA</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((st) => (
                  <tr key={`${st.groupId}_${st.id}`}>
                    <td>
                      <div className="cell-teacher-info">
                        <div className="t-table-avatar">{getInitials(st.name || '?')}</div>
                        <div className="t-table-details">
                          <span className="t-table-name">{st.name}</span>
                          <span className="t-table-email">{st.email || 'Email yo\'q'}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={16} style={{ color: 'var(--pg-text-muted)' }} />
                        <span>{st.groupName}</span>
                      </div>
                    </td>
                    <td>{st.teacherName}</td>
                    <td>{st.joinedAt ? new Date(st.joinedAt).toLocaleDateString() : 'Noma\'lum'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards, same data. */}
          <div className="teachers-mobile-list">
            {filteredStudents.map((st) => (
              <div key={`${st.groupId}_${st.id}`} className="teachers-mobile-row">
                <div className="cell-teacher-info">
                  <div className="t-table-avatar">{getInitials(st.name || '?')}</div>
                  <div className="t-table-details" style={{ minWidth: 0 }}>
                    <span className="t-table-name" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {st.name}
                    </span>
                    <span className="t-table-email" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {st.groupName} · {st.teacherName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
