import { BookOpen, KeyRound, MoreVertical, Plus, Search, Trash2, Users } from 'lucide-react';
import { getInitials } from '../utils';
import './TeachersTab.css';

export default function TeachersTab({ p }) {
  const {
    activeTeacherMenu, filteredTeachersWithStats, handleDeleteTeacher,
    setActiveTeacherMenu, setNewTeacherPassword, setResetPasswordTeacher, setShowTeacherModal,
    setTeacherMenuPos, setTeacherSearchTerm, teacherMenuPos, teacherSearchTerm,
    totalTeacherGroups, totalTeacherStudents, totalTeachers,
  } = p;

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

              <button className="btn-add-teacher-primary" onClick={() => setShowTeacherModal(true)}>
                <Plus size={16} /> Qo'shish
              </button>
            </div>
          </div>

          {/* Teachers Data Table */}
          <div className="teachers-table-card">
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
                        <BookOpen size={16} style={{ color: '#94a3b8' }} />
                        <span>{t.groupsCount}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={16} style={{ color: '#94a3b8' }} />
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
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#cbd5e1',
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
                              background: '#1a1a26',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '12px',
                              padding: '6px',
                              zIndex: 9999,
                              boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
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
                                color: '#38bdf8',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background 0.15s ease',
                                marginBottom: '2px'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'}
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
                                handleDeleteTeacher(t);
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
        </div>
  );
}
