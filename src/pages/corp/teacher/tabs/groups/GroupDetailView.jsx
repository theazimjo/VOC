import { ArrowLeft, BarChart3, BookOpen, Check, ChevronRight, Copy, MoreVertical, NotebookPen, Users } from 'lucide-react';
import GroupHomeworkDetail from './GroupHomeworkDetail';
import GroupSubtabs from './GroupSubtabs';
import './GroupDetailView.css';

export default function GroupDetailView({ p }) {
  const {
    assigningGroup, copiedCode, copyCode, groupHomeworkList, handleAddHomework, handleOpenGroupSettings, homeworkSelection,
    hwId, navigate, savingHomework, selectedGroup, selectedGroupStats, setAssigningGroup, setSelectedGroupId, setShowHomeworkEditor, showHomeworkEditor, setViewingHomeworkItem, subTab, viewingHomeworkItem,
  } = p;

  const currentHw = hwId ? groupHomeworkList.find(h => h.id === hwId) : null;

  return (
    <div className="group-detail-container">
            <div className="ios-group-top-bar">
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => {
                  if (viewingHomeworkItem) {
                    setViewingHomeworkItem(null);
                  } else if (showHomeworkEditor) {
                    setShowHomeworkEditor(false);
                  } else if (assigningGroup) {
                    setAssigningGroup(null);
                  } else if (hwId) {
                    navigate(`/corp/teacher/group/${selectedGroup.id}/homework`);
                  } else if (subTab) {
                    navigate(`/corp/teacher/group/${selectedGroup.id}`);
                  } else {
                    setSelectedGroupId(null);
                    navigate('/corp/teacher');
                  }
                }}
                title={viewingHomeworkItem ? "Back to topics" : showHomeworkEditor ? "Back to homework" : assigningGroup ? "Back to packs" : hwId ? "Back to homework list" : subTab ? "Back to sections" : "Back to groups"}
              >
                <ArrowLeft size={18} />
              </button>

              <div className="ios-title-group">
                <h2 className="ios-group-title">
                  {viewingHomeworkItem ? viewingHomeworkItem.unitTitle : showHomeworkEditor ? "New Homework" : assigningGroup ? "Assign Pack" : hwId ? (currentHw?.name || "Homework") : subTab === 'students' ? "Students" : subTab === 'words' ? "Packs" : subTab === 'homework' ? "Homework" : subTab === 'stats' ? "Stats" : subTab === 'settings' ? "Group Settings" : selectedGroup.name}
                </h2>
              </div>

              {showHomeworkEditor ? (
                <button
                  type="button"
                  onClick={handleAddHomework}
                  disabled={savingHomework || homeworkSelection?.size === 0}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    borderRadius: '12px',
                    background: (savingHomework || homeworkSelection?.size === 0) ? 'var(--bg-tertiary)' : 'var(--accent)',
                    color: (savingHomework || homeworkSelection?.size === 0) ? 'var(--text-muted)' : '#ffffff',
                    border: (savingHomework || homeworkSelection?.size === 0) ? '1px solid var(--border)' : 'none',
                    fontWeight: 700,
                    cursor: (savingHomework || homeworkSelection?.size === 0) ? 'not-allowed' : 'pointer',
                    boxShadow: (savingHomework || homeworkSelection?.size === 0) ? 'none' : '0 4px 14px rgba(var(--accent-rgb), 0.4)',
                    transition: 'all 0.18s ease',
                    flexShrink: 0
                  }}
                >
                  {savingHomework ? 'Saving...' : `Save (${homeworkSelection?.size || 0})`}
                </button>
              ) : !subTab && !hwId && !viewingHomeworkItem && (
                <button
                  type="button"
                  className="ios-action-btn"
                  onClick={() => {
                    handleOpenGroupSettings(selectedGroup);
                    navigate(`/corp/teacher/group/${selectedGroup.id}/settings`);
                  }}
                  title="Group settings"
                >
                  <MoreVertical size={18} />
                </button>
              )}
            </div>
            {/* OVERVIEW: Big Main Hero Card + 2x2 Bento Hero Cards Grid (Wireframe Layout) */}
            {!subTab && !hwId && (
              <>
                {/* 1. Main Large Hero Banner Card (Big rectangle from wireframe) */}
                <div className="group-main-hero-card">
                  <div className="gmh-top">
                    <div className="gmh-code-block">
                      <span className="gmh-subtitle">GROUP INVITE CODE</span>
                      <div className="gmh-code-row">
                        <span className="gmh-code">{selectedGroup.code}</span>
                        <button
                          type="button"
                          className="gmh-copy-btn"
                          onClick={() => copyCode(selectedGroup.code)}
                          title="Copy"
                        >
                          {copiedCode === selectedGroup.code ? (
                            <>
                              <Check size={14} color="#34c759" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <span className="gmh-status-badge">
                      <Check size={13} />
                      {selectedGroup.level || 'Active Course'}
                    </span>
                  </div>

                  <div className="gmh-divider" />

                  <div className="gmh-stats-row">
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">{selectedGroup.studentsCount || 0}</span>
                      <span className="gmh-stat-label">Students</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">
                        {(selectedGroup.assignedPacks || []).length + (selectedGroup.additionalPacks || []).length}
                      </span>
                      <span className="gmh-stat-label">Packs</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">{groupHomeworkList.length}</span>
                      <span className="gmh-stat-label">Homework</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val green">
                        {selectedGroupStats ? `${selectedGroupStats.avgPercent}%` : '0%'}
                      </span>
                      <span className="gmh-stat-label">Mastery</span>
                    </div>
                  </div>
                </div>

                {/* 2. 2x2 Bento Hero Cards Grid (4 equal cards from wireframe) */}
                <div className="ios-bento-grid">
                  {/* Card 1: Students */}
                  <div
                    className="ios-bento-card card-blue"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/students`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-blue">
                        <Users size={22} />
                      </div>
                      <span className="bento-badge-count">{selectedGroup.studentsCount || 0}</span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Students</h3>
                      <p className="bento-sub">Member progress & management</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Manage</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>

                  {/* Card 2: Packs */}
                  <div
                    className="ios-bento-card card-purple"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/words`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-purple">
                        <BookOpen size={22} />
                      </div>
                      <span className="bento-badge-count">
                        {(selectedGroup.assignedPacks || []).length + (selectedGroup.additionalPacks || []).length}
                      </span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Packs</h3>
                      <p className="bento-sub">Assigned word categories</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Manage</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>

                  {/* Card 3: Homework */}
                  <div
                    className="ios-bento-card card-amber"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/homework`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-amber">
                        <NotebookPen size={22} />
                      </div>
                      <span className="bento-badge-count">{groupHomeworkList.length}</span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Homework</h3>
                      <p className="bento-sub">Assignments & completion status</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Manage</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>

                  {/* Card 4: Stats */}
                  <div
                    className="ios-bento-card card-emerald"
                    onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/stats`)}
                  >
                    <div className="bento-top-row">
                      <div className="bento-icon-box icon-emerald">
                        <BarChart3 size={22} />
                      </div>
                      <span className="bento-badge-count green">
                        {selectedGroupStats ? `${selectedGroupStats.avgPercent}%` : '0%'}
                      </span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Stats</h3>
                      <p className="bento-sub">Group mastery breakdown</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">View Analysis</span>
                      <ChevronRight size={16} className="bento-arrow" />
                    </div>
                  </div>
                </div>
              </>
            )}

      {hwId ? <GroupHomeworkDetail p={p} /> : subTab && <GroupSubtabs p={p} />}
    </div>
  );
}
