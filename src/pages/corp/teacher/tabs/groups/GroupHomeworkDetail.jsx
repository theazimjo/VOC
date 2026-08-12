import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, ChevronRight, NotebookPen, X } from 'lucide-react';
import { aggregatePackProgress, resolveHomeworkItemUnit } from '../../utils';
import TeacherModal from '../../TeacherModal';
import './GroupHomeworkDetail.css';

export default function GroupHomeworkDetail({ p }) {
  const { basePath, customPacks, groupHomeworkList, groupStudentsList, hwId, navigate, selectedGroup, setViewingHomeworkItem, viewingHomeworkItem } = p;
  const [selectedStudentProgressModal, setSelectedStudentProgressModal] = useState(null);

  // Keep showing the last-selected student's breakdown while the modal
  // exits — selectedStudentProgressModal goes null the instant closing
  // starts, and this modal's whole body reads from it.
  const [lastProgressModal, setLastProgressModal] = useState(null);
  useEffect(() => {
    if (selectedStudentProgressModal) setLastProgressModal(selectedStudentProgressModal);
  }, [selectedStudentProgressModal]);
  const progressModal = selectedStudentProgressModal || lastProgressModal;

  const hw = groupHomeworkList.find(h => h.id === hwId);

  if (viewingHomeworkItem) {
    const unit = resolveHomeworkItemUnit(viewingHomeworkItem, customPacks);
    const words = unit?.words || [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
        {/* Word List Section */}
        <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Words ({words.length})
            </span>
          </div>

          {words.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '16px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              Topic not found.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {words.map(w => (
                <div
                  key={w.id}
                  className="student-progress-row"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '12px',
                    width: '100%'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'rgba(var(--accent-rgb), 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                    <BookOpen size={18} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 700 }}>{w.word}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{w.translation}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!hw) {
    return (
      <div className="teacher-settings-hero-card" style={{ textAlign: 'center', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <NotebookPen size={44} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
        <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.1rem' }}>This homework wasn't found.</h3>
        <button
          type="button"
          className="gib-code-btn"
          onClick={() => navigate(`${basePath}/group/${selectedGroup.id}/homework`)}
          style={{ marginTop: '8px' }}
        >
          <ArrowLeft size={16} /> Back to homework
        </button>
      </div>
    );
  }

  const hwItems = hw.items || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
      {/* Section 1: Assigned Topics */}
      <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Topics ({hwItems.length})
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {hwItems.map(item => (
            <button
              type="button"
              key={`${item.packId}_${item.monthId}_${item.unitId}`}
              className="student-progress-row"
              onClick={() => setViewingHomeworkItem(item)}
              style={{ cursor: 'pointer', width: '100%', textAlign: 'left', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(var(--accent-rgb), 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                  <BookOpen size={16} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.unitTitle}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.packTitle} · {item.totalWords} words</span>
                </div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Student Completion Progress */}
      <div className="teacher-settings-hero-card" style={{ marginBottom: 0, padding: '1rem 1.1rem', borderRadius: '20px', width: '100%', maxWidth: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Students ({groupStudentsList.length})
          </span>
        </div>

        {groupStudentsList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.2rem 1rem', background: 'var(--bg-tertiary)', borderRadius: '14px', border: '1px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            No students yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                <div
                  key={student.id}
                  className="student-progress-row"
                  onClick={() => setSelectedStudentProgressModal({ student, itemStats, doneCount, total: hwItems.length })}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 10px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                    <div className="st-avatar" style={{ width: '30px', height: '30px', fontSize: '0.82rem', borderRadius: '10px', flexShrink: 0 }}>
                      {(student.name || '?').charAt(0).toUpperCase()}
                    </div>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {student.name}
                    </strong>
                  </div>
                  <span
                    className="badge-active"
                    style={allDone ? { padding: '3px 8px', fontSize: '0.72rem', flexShrink: 0 } : { background: 'rgba(var(--accent-rgb), 0.12)', borderColor: 'rgba(var(--accent-rgb), 0.25)', color: 'var(--accent)', padding: '3px 8px', fontSize: '0.72rem', flexShrink: 0 }}
                  >
                    {doneCount}/{hwItems.length} done
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Student Progress Breakdown Compact Modal */}
      <TeacherModal
        open={!!selectedStudentProgressModal}
        onClose={() => setSelectedStudentProgressModal(null)}
        className="teacher-settings-hero-card"
        maxWidth="420px"
      >
        {progressModal && (
          <>
            {/* Top-Right Soft Blue Radial Glow */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '0.85rem', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div className="st-avatar" style={{ width: '34px', height: '34px', fontSize: '0.88rem', borderRadius: '10px', flexShrink: 0 }}>
                  {(progressModal.student.name || '?').charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {progressModal.student.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Result: {progressModal.doneCount}/{progressModal.total} done
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudentProgressModal(null)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--text-muted)',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Topic breakdown list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative', zIndex: 1 }}>
              {progressModal.itemStats.map(({ item, masteryPercent, done, started }) => (
                <div
                  key={`${item.packId}_${item.monthId}_${item.unitId}`}
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    padding: '8px 12px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(var(--accent-rgb), 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--accent)' }}>
                      <BookOpen size={14} />
                    </div>
                    <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.unitTitle}
                    </span>
                  </div>

                  <span
                    className={`unit-chip unit-chip-${done ? 'done' : started ? 'partial' : 'none'}`}
                    style={{ padding: '3px 9px', fontSize: '0.74rem', borderRadius: '8px', flexShrink: 0, fontWeight: 700 }}
                  >
                    {started ? `${masteryPercent}%` : '—'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </TeacherModal>
    </div>
  );
}
