import { ArrowRight, BookOpen, Building, GraduationCap, Layers, Sparkles, UserPlus } from 'lucide-react';
import { getInitials } from '../utils';
import './DashboardTab.css';

export default function DashboardTab({ p }) {
  const { allCourses, centerName, navigate, setShowPackEditor, setShowTeacherModal, teachers, totalCourses, totalTeachers } = p;

  return (
        <div className="page-view-dashboard">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><Building size={16} /> O'quv Markazi Admin Panel</span>
              <h1>{centerName}</h1>
              <p>Markaz o'qituvchilari, xususiy so'z packlari va umumiy o'quv dasturi boshqaruvi.</p>
            </div>

            <div className="header-actions">
              <button className="btn-tab-action btn-add-teacher" onClick={() => setShowTeacherModal(true)}>
                <UserPlus size={18} /> O'qituvchi Qo'shish
              </button>
              <button className="btn-tab-action btn-add-pack" onClick={() => setShowPackEditor(true)}>
                <Sparkles size={18} /> Yangi Pack Yaratish
              </button>
            </div>
          </header>

          <div className="center-admin-stats">
            <div className="c-stat-card">
              <div className="c-stat-icon purple"><GraduationCap size={24} /></div>
              <div>
                <h3>{totalTeachers}</h3>
                <p>O'qituvchilar Soni</p>
              </div>
            </div>
            <div className="c-stat-card">
              <div className="c-stat-icon blue"><BookOpen size={24} /></div>
              <div>
                <h3>{totalCourses}</h3>
                <p>Xususiy Packlar</p>
              </div>
            </div>
            <div className="c-stat-card">
              <div className="c-stat-icon green"><Layers size={24} /></div>
              <div>
                <h3>Faol</h3>
                <p>Tizim Holati</p>
              </div>
            </div>
          </div>

          {/* Quick Previews */}
          <div className="dashboard-sections">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>O'qituvchilar ({teachers.length})</h2>
              <button className="btn-tab-action btn-add-teacher" style={{ padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => navigate('/corp/admin/teachers')}>
                Barchasini ko'rish <ArrowRight size={14} />
              </button>
            </div>

            <div className="teachers-grid" style={{ marginBottom: '2.5rem' }}>
              {teachers.slice(0, 3).map((teacher) => (
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
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>Custom So'z Packlari / Kurslar ({allCourses.length})</h2>
              <button className="btn-tab-action btn-add-pack" style={{ padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => navigate('/corp/admin/courses')}>
                Barchasini ko'rish <ArrowRight size={14} />
              </button>
            </div>

            <div className="packs-grid">
              {allCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="custom-pack-card">
                  <div className="pack-level-tag">{course.title}</div>
                  <h3>{course.title}</h3>
                  <p className="pack-desc">{course.description || 'Izoh yo\'q'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}
