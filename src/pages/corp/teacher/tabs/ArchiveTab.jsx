import { Archive, BookOpen, RotateCcw, Users } from 'lucide-react';

export default function ArchiveTab({ p }) {
  const { archivedGroups, handleRestoreGroup, loading } = p;

  return (
        <>
          <header className="teacher-header">
            <div>
              <span className="teacher-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}><Archive size={16} /> Arxiv</span>
              <h1>Arxivlangan Guruhlar</h1>
              <p>O'tmishdagi yoki faoliyati to'xtatilgan guruhlar ro'yxati. Ularni istalgan vaqtda faollashtirishingiz mumkin.</p>
            </div>
          </header>

          {loading ? (
            <div className="loading-spinner">Arxiv yuklanmoqda...</div>
          ) : archivedGroups.length === 0 ? (
            <div className="empty-state">
              <Archive size={48} />
              <p>Arxivlangan guruhlar mavjud emas.</p>
            </div>
          ) : (
            <div className="teacher-groups-grid">
              {archivedGroups.map((group) => (
                <div key={group.id} className="teacher-group-card" style={{ opacity: 0.85 }}>
                  <div className="group-card-header">
                    <div>
                      <span className="group-level-badge" style={{ background: 'rgba(255,255,255,0.1)' }}>{group.level}</span>
                      <h3>{group.name}</h3>
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontWeight: 600 }}>Arxivlangan</span>
                  </div>

                  <div className="group-card-body">
                    <div className="group-info-row">
                      <Users size={16} /> <span>O'quvchilar: <strong>{group.studentsCount || 0} ta</strong></span>
                    </div>
                    <div className="group-info-row">
                      <BookOpen size={16} /> <span>Biriktirilgan packlar: <strong>{(group.assignedPacks || []).length + (group.additionalPacks || []).length + (group.requiredPacks || []).length} ta</strong></span>
                    </div>
                  </div>

                  <div className="group-card-actions">
                    <button className="btn-group-action" onClick={() => handleRestoreGroup(group)} style={{ color: '#4ade80', width: '100%', justifyContent: 'center' }}>
                      <RotateCcw size={16} /> Guruhni Arxivdan Chiqarish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
  );
}
