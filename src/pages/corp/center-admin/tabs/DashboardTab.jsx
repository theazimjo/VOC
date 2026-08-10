import { AlertTriangle, ArrowRight, BookOpen, Building, CheckCircle2, GraduationCap, Layers, Users } from 'lucide-react';
import { getInitials } from '../utils';
import './DashboardTab.css';

const STAT_ACCENT = { purple: '#c084fc', blue: 'var(--accent)', green: '#4ade80' };

// A dashboard is a glance, not a workbench — it reports what's true
// right now and what needs a decision, then links deeper. It doesn't
// duplicate the create-actions that already live on their own tabs
// (Teachers has its own "+" FAB, Courses has its own "+" FAB).
//
// Three jobs:
//  1. headline numbers (clickable — each jumps to its own tab)
//  2. "needs attention" — real problems computed from data that's
//     already loaded (idle teachers, empty groups, unused courses),
//     not vanity metrics
//  3. "what's new" — the actual newest teachers/courses by real
//     createdAt, not an arbitrary DB-order slice
export default function DashboardTab({ p }) {
  const { allCourses, centerName, groups, navigate, teachers, teachersWithStats, totalCourses, totalTeacherStudents, totalTeachers } = p;

  const recentTeachers = [...teachersWithStats]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 3);
  const recentCourses = [...allCourses]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3);

  // Real, computed signals — every number here comes from data already
  // loaded for the Teachers/Courses tabs, nothing invented.
  const idleTeachers = teachersWithStats.filter(t => t.groupsCount === 0);
  const emptyGroups = groups.filter(g => g.status !== 'archived' && (g.studentsCount || 0) === 0);
  const unusedCourses = allCourses.filter(c => c.groupsCount === 0);
  const attentionCount = idleTeachers.length + emptyGroups.length + unusedCourses.length;

  return (
        <div className="page-view-dashboard">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><Building size={16} /> O'quv Markazi Admin Panel</span>
              <h1>{centerName}</h1>
              <p>Markaz o'qituvchilari, xususiy so'z packlari va umumiy o'quv dasturi boshqaruvi.</p>
            </div>
          </header>

          <div className="center-admin-stats">
            <button type="button" className="c-stat-card clickable" style={{ borderLeft: `3px solid ${STAT_ACCENT.purple}` }} onClick={() => navigate('/corp/admin/teachers')}>
              <div className="c-stat-icon purple"><GraduationCap size={24} /></div>
              <div>
                <h3>{totalTeachers}</h3>
                <p>O'qituvchilar Soni</p>
              </div>
            </button>
            <button type="button" className="c-stat-card clickable" style={{ borderLeft: `3px solid ${STAT_ACCENT.blue}` }} onClick={() => navigate('/corp/admin/courses')}>
              <div className="c-stat-icon blue"><BookOpen size={24} /></div>
              <div>
                <h3>{totalCourses}</h3>
                <p>Xususiy Packlar</p>
              </div>
            </button>
            <button type="button" className="c-stat-card clickable" style={{ borderLeft: `3px solid ${STAT_ACCENT.green}` }} onClick={() => navigate('/corp/admin/students')}>
              <div className="c-stat-icon green"><Users size={24} /></div>
              <div>
                <h3>{totalTeacherStudents}</h3>
                <p>O'quvchilar Soni</p>
              </div>
            </button>
          </div>

          {/* Needs Attention — real problems, not decoration. Empty state
              when the center is actually healthy is just as important as
              the list itself. */}
          <div className="dashboard-attention-section">
            <h2 style={{ fontSize: '1.25rem', color: 'var(--pg-text)', marginBottom: '1rem' }}>
              Diqqat talab qiladi {attentionCount > 0 && `(${attentionCount})`}
            </h2>

            {attentionCount === 0 ? (
              <div className="attention-all-good">
                <CheckCircle2 size={22} />
                <span>Hammasi joyida — e'tibor talab qiladigan muammo yo'q.</span>
              </div>
            ) : (
              <div className="attention-list">
                {idleTeachers.slice(0, 3).map(t => (
                  <button type="button" key={`t_${t.id}`} className="attention-item" onClick={() => navigate('/corp/admin/teachers')}>
                    <AlertTriangle size={16} className="attention-icon" />
                    <span><strong>{t.name}</strong> hali birorta guruhga biriktirilmagan</span>
                    <ArrowRight size={14} className="attention-arrow" />
                  </button>
                ))}
                {emptyGroups.slice(0, 3).map(g => (
                  <button type="button" key={`g_${g.id}`} className="attention-item" onClick={() => navigate('/corp/admin/teachers')}>
                    <AlertTriangle size={16} className="attention-icon" />
                    <span>
                      <strong>{g.name}</strong> guruhida hali o'quvchi yo'q
                      {teachers.find(t => t.id === g.teacherId) && <> ({teachers.find(t => t.id === g.teacherId).name})</>}
                    </span>
                    <ArrowRight size={14} className="attention-arrow" />
                  </button>
                ))}
                {unusedCourses.slice(0, 3).map(c => (
                  <button type="button" key={`c_${c.id}`} className="attention-item" onClick={() => navigate('/corp/admin/courses')}>
                    <AlertTriangle size={16} className="attention-icon" />
                    <span><strong>{c.title}</strong> kursi hech qaysi guruhga biriktirilmagan</span>
                    <ArrowRight size={14} className="attention-arrow" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* What's new — the actual newest items, not an arbitrary slice */}
          <div className="dashboard-sections">
            {teachersWithStats.length === 0 ? null : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--pg-text)' }}>So'nggi qo'shilgan o'qituvchilar</h2>
                  <button type="button" className="btn-view-all" onClick={() => navigate('/corp/admin/teachers')}>
                    Barchasini ko'rish <ArrowRight size={14} />
                  </button>
                </div>

                <div className="teachers-grid" style={{ marginBottom: '2.5rem' }}>
                  {recentTeachers.map((teacher) => (
                    <div key={teacher.id} className="teacher-card">
                      <div className="teacher-card-head">
                        <div className="teacher-avatar">{getInitials(teacher.name)}</div>
                        <div>
                          <h3>{teacher.name}</h3>
                          <span className="teacher-subject-badge">{teacher.subject || 'Ingliz tili'}</span>
                        </div>
                      </div>
                      <div className="teacher-card-info">
                        <p><strong>Email:</strong> {teacher.email}</p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <BookOpen size={13} /> {teacher.groupsCount} guruh
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={13} /> {teacher.studentsCount} o'quvchi
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {allCourses.length === 0 ? null : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--pg-text)' }}>So'nggi qo'shilgan kurslar</h2>
                  <button type="button" className="btn-view-all" onClick={() => navigate('/corp/admin/courses')}>
                    Barchasini ko'rish <ArrowRight size={14} />
                  </button>
                </div>

                <div className="packs-grid">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="custom-pack-card">
                      <div className="pack-level-tag">{course.title}</div>
                      <h3>{course.title}</h3>
                      <p className="pack-desc">{course.description || 'Izoh yo\'q'}</p>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--pg-text-secondary)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Layers size={13} /> {course.sectionsCount} bo'lim
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={13} /> {course.studentsCount} o'quvchi
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
  );
}
