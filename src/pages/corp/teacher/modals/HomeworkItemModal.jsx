import { NotebookPen } from 'lucide-react';
import { aggregatePackProgress, resolveHomeworkItemUnit } from '../utils';

export default function HomeworkItemModal({ p }) {
  const { customPacks, groupStudentsList, setViewingHomeworkItem, viewingHomeworkItem } = p;

  return (
      /* Homework Item Detail Window — opens when a teacher clicks one of
          the assigned homework topics: its word list plus, specifically for
          this one topic, which students have finished it. */
      viewingHomeworkItem && (() => {
        const item = viewingHomeworkItem;
        const unit = resolveHomeworkItemUnit(item, customPacks);
        const words = unit?.words || [];
        const studentStats = groupStudentsList.map(st => {
          const agg = aggregatePackProgress((st.progress || {})[item.packId]);
          const us = agg.units[`${item.monthId}_${item.unitId}`];
          const m = us ? (us.masteryPercent || 0) : 0;
          return { student: st, masteryPercent: m, done: m >= 80, started: !!us };
        });

        return (
          <div className="modal-overlay" onClick={() => setViewingHomeworkItem(null)}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
              <h2><NotebookPen size={20} /> {item.unitTitle}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {item.packTitle} · {item.totalWords} ta so'z
              </p>

              <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                So'zlar
              </h4>
              {words.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Bu mavzu endi topilmadi — pack o'zgargan bo'lishi mumkin.
                </div>
              ) : (
                <div className="tpv-words-grid" style={{ marginBottom: '1.25rem', maxHeight: '220px', overflowY: 'auto' }}>
                  {words.map(w => (
                    <div key={w.id} className="tpv-word-card">
                      <div className="tpv-word-top">
                        <strong>{w.word}</strong>
                      </div>
                      <div className="tpv-word-translation">{w.translation}</div>
                    </div>
                  ))}
                </div>
              )}

              <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                O'quvchilar bajarilishi
              </h4>
              {studentStats.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Guruhda o'quvchilar mavjud emas.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto' }}>
                  {studentStats.map(({ student, masteryPercent, done, started }) => (
                    <div key={student.id} className="student-progress-row" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}>
                      <div className="st-info">
                        <div className="st-avatar" style={{ background: 'var(--accent-1)', fontWeight: 700 }}>{(student.name || '?').charAt(0).toUpperCase()}</div>
                        <strong style={{ color: 'var(--text-primary)' }}>{student.name}</strong>
                      </div>
                      <span
                        className="badge-active"
                        style={{
                          background: done ? 'var(--success-dim)' : started ? 'var(--warning-dim)' : 'var(--bg-glass-hover)',
                          color: done ? 'var(--success)' : started ? 'var(--warning)' : 'var(--text-secondary)'
                        }}
                      >
                        {started ? `${masteryPercent}%${done ? ' · Done' : ''}` : 'Not started'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setViewingHomeworkItem(null)}>Yopish</button>
              </div>
            </div>
          </div>
        );
      })()
  );
}
