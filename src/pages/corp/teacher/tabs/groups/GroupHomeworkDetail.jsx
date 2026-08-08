import { ArrowLeft, BookOpen, ChevronRight, NotebookPen } from 'lucide-react';
import { aggregatePackProgress } from '../../utils';
import './GroupHomeworkDetail.css';

export default function GroupHomeworkDetail({ p }) {
  const { groupHomeworkList, groupStudentsList, hwId, navigate, selectedGroup, setViewingHomeworkItem } = p;

  const hw = groupHomeworkList.find(h => h.id === hwId);

  if (!hw) {
    return (
      <div className="teacher-settings-hero-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <NotebookPen size={44} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
        <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.1rem' }}>Bu uy vazifasi topilmadi.</h3>
        <button
          type="button"
          className="gib-code-btn"
          onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)}
          style={{ marginTop: '8px' }}
        >
          <ArrowLeft size={16} /> Uy vazifalariga qaytish
        </button>
      </div>
    );
  }

  const hwItems = hw.items || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '750px', margin: '0 auto' }}>
      {/* Top Bento Glass Hero Card */}
      <div className="teacher-settings-hero-card" style={{ marginBottom: 0 }}>
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            className="gib-code-btn"
            onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)}
          >
            <ArrowLeft size={16} /> Uy vazifalariga qaytish
          </button>
        </div>

        <div className="tshc-header" style={{ marginBottom: 0 }}>
          <div className="tshc-title-block">
            <div className="tshc-icon-box">
              <NotebookPen size={22} color="#3b82f6" />
            </div>
            <div>
              <h3 className="tshc-title">{hw.name}</h3>
              <p className="tshc-sub">
                {hwItems.length} ta mavzu{hw.assignedAt && <> · Berilgan sana: <strong>{new Date(hw.assignedAt).toLocaleDateString()}</strong></>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Assigned Topics */}
      <div className="teacher-settings-hero-card" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Topshiriqlar Mavzulari ({hwItems.length})
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mavzu bo'yicha batafsil ko'rish uchun bosing</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {hwItems.map(item => (
            <button
              type="button"
              key={`${item.packId}_${item.monthId}_${item.unitId}`}
              className="student-progress-row"
              onClick={() => setViewingHomeworkItem(item)}
              style={{ cursor: 'pointer', width: '100%', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#3b82f6' }}>
                  <BookOpen size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.unitTitle}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.packTitle} · {item.totalWords} ta so'z</span>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Student Completion Progress */}
      <div className="teacher-settings-hero-card" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            O'quvchilar Bajarilishi ({groupStudentsList.length})
          </span>
        </div>

        {groupStudentsList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'var(--bg-tertiary)', borderRadius: '18px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Statistika ko'rsatish uchun guruhda o'quvchilar mavjud emas.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {groupStudentsList.map(student => {
              const itemStats = hwItems.map(item => {
                const agg = aggregatePackProgress((student.progress || {})[item.packId]);
                const us = agg.units[`${item.monthId}_${item.unitId}`];
                const m = us ? (us.masteryPercent || 0) : 0;
                return { item, masteryPercent: m, done: m >= 80, started: !!us };
              });
              const doneCount = itemStats.filter(s => s.done).length;
              const allDone = doneCount === hwItems.length && hwItems.length > 0;
              return (
                <div key={student.id} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: '18px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="st-avatar">{(student.name || '?').charAt(0).toUpperCase()}</div>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{student.name}</strong>
                    </div>
                    <span
                      className="badge-active"
                      style={allDone ? {} : { background: 'rgba(59, 130, 246, 0.12)', borderColor: 'rgba(59, 130, 246, 0.25)', color: '#3b82f6' }}
                    >
                      {doneCount}/{hwItems.length} bajarildi
                    </span>
                  </div>
                  <div className="unit-chip-row">
                    {itemStats.map(({ item, masteryPercent, done, started }) => (
                      <span
                        key={`${item.packId}_${item.monthId}_${item.unitId}`}
                        className={`unit-chip unit-chip-${done ? 'done' : started ? 'partial' : 'none'}`}
                        title={item.packTitle}
                      >
                        {item.unitTitle}: {started ? `${masteryPercent}%` : '—'}
                      </span>
                    ))}
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
