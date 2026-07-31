import { useState, useEffect } from 'react';
import { Building2, Users, GraduationCap, Layers, BookOpen, Mail, Phone } from 'lucide-react';
import { getCenterStats } from '../../services/corpService';

export default function CenterDetailModal({ center, onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await getCenterStats(center.id);
        if (!cancelled) setStats(data);
      } catch (err) {
        console.error('Error loading center stats:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [center.id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <h2><Building2 size={20} /> {center.name}</h2>

        <div className="cd-meta-row">
          <span><Mail size={14} /> {center.adminEmail || 'Kiritilmagan'}</span>
          <span><Phone size={14} /> {center.phone || 'Kiritilmagan'}</span>
        </div>

        {loading ? (
          <div className="loading-spinner">Statistika yuklanmoqda...</div>
        ) : (
          <>
            <div className="cd-stats-grid">
              <div className="cd-stat">
                <GraduationCap size={20} />
                <div><strong>{stats.teachersCount}</strong><span>O'qituvchi</span></div>
              </div>
              <div className="cd-stat">
                <Layers size={20} />
                <div><strong>{stats.groupsCount}</strong><span>Guruh</span></div>
              </div>
              <div className="cd-stat">
                <Users size={20} />
                <div><strong>{stats.studentsCount}</strong><span>O'quvchi</span></div>
              </div>
              <div className="cd-stat">
                <BookOpen size={20} />
                <div><strong>{stats.packsCount}</strong><span>Pack</span></div>
              </div>
            </div>

            <h3 className="cd-section-title">O'qituvchilar</h3>
            {stats.teachers.length === 0 ? (
              <p className="cd-empty">Hozircha o'qituvchilar qo'shilmagan.</p>
            ) : (
              <div className="cd-teacher-list">
                {stats.teachers.map(t => (
                  <div key={t.id} className="cd-teacher-row">
                    <div className="cd-teacher-avatar">{t.name.charAt(0)}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.email} • {t.subject}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className="modal-actions">
          <button type="button" className="btn-primary" onClick={onClose}>Yopish</button>
        </div>
      </div>
    </div>
  );
}
