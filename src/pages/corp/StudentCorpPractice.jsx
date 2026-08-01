import { useOutletContext, useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, CheckCircle2, Play } from 'lucide-react';
import './StudentCorpDashboard.css';

export default function StudentCorpPractice() {
  const {
    user,
    membership,
    student,
    assignedPacks
  } = useOutletContext();
  const navigate = useNavigate();

  const startPractice = (pack) => {
    navigate('/corp/practice', {
      state: {
        pack,
        centerId: membership.centerId,
        groupId: membership.groupId,
        studentId: user.uid,
      },
    });
  };

  return (
    <div className="student-corp-container" style={{ padding: '2rem' }}>
      {/* Assigned Word Packs Section */}
      <div className="st-packs-section" style={{ marginTop: 0 }}>
        <div className="section-title" style={{ marginBottom: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.45rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            <BookOpen size={24} className="icon-purple" style={{ color: '#c084fc' }} /> Biriktirilgan So'z Packlari
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>Topshiriqlarni bajarish uchun topshiriq to'plamini tanlang.</p>
        </div>

        {assignedPacks.length === 0 ? (
          <div className="st-empty-state" style={{ background: '#13131c', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '14px', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <Sparkles size={40} style={{ color: '#c084fc', marginBottom: '1rem' }} />
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Hozircha sizga hech qanday pack biriktirilmagan. O'qituvchingiz tez orada topshiriq beradi.</p>
          </div>
        ) : (
          <div className="st-packs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {assignedPacks.map((pack) => {
              const done = Boolean(student?.progress?.[pack.id]);
              return (
                <div key={pack.id} className="st-pack-card" style={{ background: '#13131c', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px', transition: 'transform 0.2s, border-color 0.2s' }}>
                  <div>
                    <div className="st-pack-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="st-level-tag" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc', fontSize: '0.75rem', fontWeight: 600, padding: '4px 8px', borderRadius: '6px' }}>{pack.level}</span>
                      {done ? <CheckCircle2 size={18} style={{ color: '#4ade80' }} /> : <Sparkles size={18} style={{ color: '#c084fc' }} />}
                    </div>

                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{pack.title}</h3>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82rem', lineHeight: '1.4', marginBottom: '1rem' }}>{pack.description || 'Guruh uchun maxsus so\'zlar to\'plami'}</p>
                  </div>

                  <div className="st-pack-foot" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}><strong>{pack.wordCount || (pack.words ? pack.words.length : 0)}</strong> ta so'z</span>
                    <button className="btn-start-learn" onClick={() => startPractice(pack)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: done ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #a855f7, #6366f1)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}>
                      <Play size={14} fill="#fff" /> {done ? 'Qayta o\'rganish' : 'Boshlash'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
