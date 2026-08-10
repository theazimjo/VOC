import { BarChart3, BookOpen, GraduationCap, Users } from 'lucide-react';
import { getInitials } from '../utils';
import './StatisticsTab.css';

// Used to just repeat 4 numbers already shown on the Dashboard, plus a
// "not implemented yet" disclaimer. teachersWithStats/allCourses (already
// computed in CenterAdminDashboard.jsx for the Teachers/Courses tabs)
// carry real per-teacher and per-course group/student counts, so this
// page's actual job — a breakdown, not a repeat of the headline numbers —
// is just a matter of rendering what was already there.
export default function StatisticsTab({ p }) {
  const { groups, teachersWithStats, allCourses, totalCourseStudents, totalCourses, totalTeachers } = p;

  const sortedTeachers = [...teachersWithStats].sort((a, b) => b.studentsCount - a.studentsCount);
  const sortedCourses = [...allCourses].sort((a, b) => b.studentsCount - a.studentsCount);

  return (
        <div className="page-view-statistics">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><BarChart3 size={16} /> Tahlil va Natijalar</span>
              <h1>Markaz Statistikasi</h1>
              <p>O'qituvchilar va kurslar bo'yicha guruh/o'quvchi taqsimoti.</p>
            </div>
          </header>

          <div className="stats-detail-grid">
            <div className="stat-detail-item">
              <span>Jami Biriktirilgan O'quvchilar</span>
              <strong>{totalCourseStudents} ta</strong>
            </div>
            <div className="stat-detail-item">
              <span>Jami O'qituvchilar</span>
              <strong>{totalTeachers} ta</strong>
            </div>
            <div className="stat-detail-item">
              <span>Jami Guruhlar</span>
              <strong>{groups.length} ta</strong>
            </div>
            <div className="stat-detail-item">
              <span>Jami Kurslar</span>
              <strong>{totalCourses} ta</strong>
            </div>
          </div>

          <div className="stats-breakdown-section">
            <h2 className="stats-breakdown-title"><GraduationCap size={18} /> O'qituvchilar bo'yicha taqsimot</h2>
            {sortedTeachers.length === 0 ? (
              <div className="stats-breakdown-empty">Hali o'qituvchi qo'shilmagan.</div>
            ) : (
              <div className="teachers-table-card">
                <div className="teachers-table-wrap">
                  <table className="teachers-table">
                    <thead>
                      <tr>
                        <th>O'QITUVCHI</th>
                        <th>GURUHLAR</th>
                        <th>O'QUVCHILAR</th>
                        <th>GURUHGA O'RTACHA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTeachers.map(t => (
                        <tr key={t.id}>
                          <td>
                            <div className="cell-teacher-info">
                              <div className="t-table-avatar">{getInitials(t.name)}</div>
                              <span className="t-table-name">{t.name}</span>
                            </div>
                          </td>
                          <td>{t.groupsCount}</td>
                          <td>{t.studentsCount}</td>
                          <td>{t.groupsCount ? Math.round(t.studentsCount / t.groupsCount) : 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="stats-breakdown-section">
            <h2 className="stats-breakdown-title"><BookOpen size={18} /> Kurslar bo'yicha taqsimot</h2>
            {sortedCourses.length === 0 ? (
              <div className="stats-breakdown-empty">Hali kurs yaratilmagan.</div>
            ) : (
              <div className="teachers-table-card">
                <div className="teachers-table-wrap">
                  <table className="teachers-table">
                    <thead>
                      <tr>
                        <th>KURS</th>
                        <th>GURUHLAR</th>
                        <th>O'QUVCHILAR</th>
                        <th>SO'ZLAR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCourses.map(c => (
                        <tr key={c.id}>
                          <td className="t-table-name">{c.title}</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Users size={14} style={{ color: 'var(--pg-text-muted)' }} /> {c.groupsCount}
                            </div>
                          </td>
                          <td>{c.studentsCount}</td>
                          <td>{c.wordsCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
  );
}
