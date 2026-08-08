import { BarChart3 } from 'lucide-react';
import './StatisticsTab.css';

export default function StatisticsTab({ p }) {
  const { groups, totalCourseStudents, totalCourses, totalTeachers } = p;

  return (
        <div className="page-view-statistics">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><BarChart3 size={16} /> Tahlil va Natijalar</span>
              <h1>Markaz Statistikasi</h1>
              <p>O'quvchilar faoliyati, bajarilgan mashqlar va haftalik ko'rsatkichlar.</p>
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
          <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '0.85rem', marginTop: '1rem' }}>
            Mashqlar soni, o'rtacha o'zlashtirish balli va faollik dinamikasi bo'yicha kuzatuv hali ishga tushirilmagan.
          </p>
        </div>
  );
}
