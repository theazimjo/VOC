import { BookOpen, Check, Clock, Copy, KeyRound, MoreVertical, Plus, RotateCw, Search, Trash2, Users, X } from 'lucide-react';
import { getInitials } from '../utils';
import './TeachersTab.css';

export default function TeachersTab({ p }) {
  const {
    activeTeacherMenu, askConfirm, filteredTeachersWithStats, handleDeleteTeacher,
    setActiveTeacherMenu, setNewTeacherPassword, setResetPasswordTeacher, setShowTeacherModal,
    setTeacherMenuPos, setTeacherSearchTerm, teacherMenuPos, teacherSearchTerm,
    totalTeacherGroups, totalTeacherStudents, totalTeachers,
    teacherJoinCode, copiedTeacherCode, handleCopyTeacherCode, handleRegenerateTeacherCode, regeneratingTeacherCode,
    pendingTeacherRequests, processingRequestUid, handleApproveTeacherRequest, handleRejectTeacherRequest,
  } = p;

  const confirmDeleteTeacher = (t) => askConfirm({
    title: "O'qituvchini o'chirish",
    message: `"${t.name}" o'qituvchisini o'chirishni tasdiqlaysizmi?`,
    confirmLabel: "O'chirish",
    cancelLabel: 'Bekor qilish',
    danger: true,
    onConfirm: () => handleDeleteTeacher(t),
  });

  return (
        <div className="teachers-page-container">
          {/* Top Bar */}
          <div className="teachers-top-bar">
            <div className="teachers-title-area">
              <h1>O'qituvchilar</h1>
              <p>{totalTeachers} ta o'qituvchi · {totalTeacherGroups} ta guruh · {totalTeacherStudents} ta o'quvchi</p>
            </div>

            <div className="teachers-top-actions">
              <div className="search-input-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={teacherSearchTerm}
                  onChange={e => setTeacherSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Self-service teacher join code — a prospective teacher enters
              this in their own Settings to attach themselves to this
              center, instead of the admin creating their account directly. */}
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
              padding: '12px 16px', borderRadius: '14px', marginBottom: '16px',
              background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--pg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Teacher Join ID
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--pg-text)', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
                {teacherJoinCode || '------'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={handleCopyTeacherCode}
                title="Copy"
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', borderRadius: '10px',
                  background: 'var(--pg-bg)', border: '1px solid var(--pg-hairline)', color: 'var(--pg-text-secondary)',
                  cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
                }}
              >
                {copiedTeacherCode ? <Check size={14} /> : <Copy size={14} />}
                {copiedTeacherCode ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={handleRegenerateTeacherCode}
                disabled={regeneratingTeacherCode}
                title="Generate new ID"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', borderRadius: '10px',
                  background: 'var(--pg-bg)', border: '1px solid var(--pg-hairline)', color: 'var(--pg-text-secondary)',
                  cursor: 'pointer', opacity: regeneratingTeacherCode ? 0.6 : 1,
                }}
              >
                <RotateCw size={14} />
              </button>
            </div>
          </div>

          {/* Pending teacher join requests — a prospective teacher who
              entered the join code above shows up here until the admin
              approves or rejects them. */}
          {pendingTeacherRequests && pendingTeacherRequests.length > 0 && (
            <div
              style={{
                borderRadius: '14px', marginBottom: '16px', padding: '12px 16px',
                background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--pg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
                Pending Requests ({pendingTeacherRequests.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {pendingTeacherRequests.map((req) => {
                  const busy = processingRequestUid === req.uid;
                  return (
                    <div
                      key={req.uid}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                        padding: '10px 12px', borderRadius: '12px', background: 'var(--pg-bg)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                          background: 'var(--pg-accent-soft, rgba(99,102,241,0.12))', color: 'var(--pg-accent, #6366f1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem',
                        }}>
                          {getInitials(req.name)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, color: 'var(--pg-text)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {req.name}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--pg-text-muted)' }}>
                            <Clock size={11} />
                            {req.email || req.phone || 'No contact info'}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => handleApproveTeacherRequest(req.uid)}
                          disabled={busy}
                          title="Approve"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 10px', borderRadius: '9px',
                            background: 'var(--pg-success, #16a34a)', border: 'none', color: '#fff',
                            cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.6 : 1,
                          }}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectTeacherRequest(req)}
                          disabled={busy}
                          title="Reject"
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7px 10px', borderRadius: '9px',
                            background: 'var(--pg-bg)', border: '1px solid var(--pg-hairline)', color: 'var(--pg-danger, #dc2626)',
                            cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.6 : 1,
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Teachers Data Table */}
          <div className="teachers-table-card">
            <div className="teachers-table-wrap">
              <table className="teachers-table">
                <thead>
                  <tr>
                    <th>O'QITUVCHI</th>
                    <th>GURUHLAR</th>
                    <th>O'QUVCHILAR</th>
                    <th>STATUS</th>
                    <th style={{ width: '60px', textAlign: 'right' }}>AMAL</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachersWithStats.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div className="cell-teacher-info">
                          <div className="t-table-avatar">{getInitials(t.name)}</div>
                          <div className="t-table-details">
                            <span className="t-table-name">{t.name}</span>
                            <span className="t-table-email">{t.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <BookOpen size={16} style={{ color: 'var(--pg-text-muted)' }} />
                          <span>{t.groupsCount}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Users size={16} style={{ color: 'var(--pg-text-muted)' }} />
                          <span>{t.studentsCount}</span>
                        </div>
                      </td>
                      <td>
                        <span className="status-pill-active">
                          <span className="status-dot"></span> Faol
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-action-more"
                          title="Amallar"
                          style={{
                            background: 'var(--pg-surface)',
                            border: '1px solid var(--pg-hairline)',
                            color: 'var(--pg-text-secondary)',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setTeacherMenuPos({
                              top: rect.bottom + 6,
                              right: window.innerWidth - rect.right
                            });
                            setActiveTeacherMenu(activeTeacherMenu === t.id ? null : t.id);
                          }}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeTeacherMenu === t.id && (
                          <>
                            <div
                              style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTeacherMenu(null);
                              }}
                            />
                            <div
                              className="teacher-action-dropdown"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                position: 'fixed',
                                top: `${teacherMenuPos.top}px`,
                                right: `${teacherMenuPos.right}px`,
                                background: 'var(--pg-bg)',
                                border: '1px solid var(--pg-hairline)',
                                borderRadius: '12px',
                                padding: '6px',
                                zIndex: 9999,
                                boxShadow: 'var(--card-shadow-hover)',
                                transformOrigin: 'top right',
                                minWidth: '140px'
                              }}
                            >
                              <button
                                type="button"
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '9px 12px',
                                  borderRadius: '8px',
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'var(--accent)',
                                  fontSize: '0.88rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'background 0.15s ease',
                                  marginBottom: '2px'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTeacherMenu(null);
                                  setResetPasswordTeacher(t);
                                  setNewTeacherPassword('');
                                }}
                              >
                                <KeyRound size={16} /> Parolni yangilash
                              </button>

                              <button
                                type="button"
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '9px 12px',
                                  borderRadius: '8px',
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#f87171',
                                  fontSize: '0.88rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  transition: 'background 0.15s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTeacherMenu(null);
                                  confirmDeleteTeacher(t);
                                }}
                              >
                                <Trash2 size={16} /> O'chirish
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards, same data. */}
            <div className="teachers-mobile-list">
              {filteredTeachersWithStats.map((t) => (
                <div key={t.id} className="teachers-mobile-row">
                  <div className="cell-teacher-info">
                    <div className="t-table-avatar">{getInitials(t.name)}</div>
                    <div className="t-table-details" style={{ minWidth: 0 }}>
                      <span className="t-table-name" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.name}
                      </span>
                      <span className="t-table-email" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.email}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--pg-text-secondary)' }}>
                      <BookOpen size={14} style={{ color: 'var(--pg-text-muted)' }} /> {t.groupsCount}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--pg-text-secondary)' }}>
                      <Users size={14} style={{ color: 'var(--pg-text-muted)' }} /> {t.studentsCount}
                    </div>
                    <button
                      type="button"
                      className="btn-action-more"
                      title="Amallar"
                      style={{
                        background: 'var(--pg-bg)', border: '1px solid var(--pg-hairline)',
                        color: 'var(--pg-text-secondary)', padding: '6px', borderRadius: '8px',
                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTeacherMenuPos({
                          top: rect.bottom + 6,
                          right: window.innerWidth - rect.right
                        });
                        setActiveTeacherMenu(activeTeacherMenu === t.id ? null : t.id);
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Action Button (New Teacher) — same always-visible
              FAB pattern as the teacher module, replacing the old inline
              "Qo'shish" button. */}
          <button
            type="button"
            className="fab-add-pack-btn fab-icon-only"
            onClick={() => setShowTeacherModal(true)}
            title="O'qituvchi qo'shish"
          >
            <Plus size={26} />
          </button>
        </div>
  );
}
