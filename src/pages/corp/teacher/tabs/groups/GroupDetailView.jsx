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
                title={viewingHomeworkItem ? "Mavzularga qaytish" : showHomeworkEditor ? "Vazifalarga qaytish" : assigningGroup ? "Packlarga qaytish" : hwId ? "Uy vazifalariga qaytish" : subTab ? "Bo'limlarga qaytish" : "Guruhlarga qaytish"}
              >
                <ArrowLeft size={18} />
              </button>

              <div className="ios-title-group">
                <h2 className="ios-group-title">
                  {viewingHomeworkItem ? viewingHomeworkItem.unitTitle : showHomeworkEditor ? "Yangi uy vazifasi" : assigningGroup ? "Pack biriktirish" : hwId ? (currentHw?.name || "Uy vazifasi") : subTab === 'students' ? "O'quvchilar" : subTab === 'words' ? "Packlar" : subTab === 'homework' ? "Uy vazifasi" : subTab === 'stats' ? "Statistika" : subTab === 'settings' ? "Guruh Sozlamalari" : selectedGroup.name}
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
                    background: (savingHomework || homeworkSelection?.size === 0) ? 'var(--bg-tertiary)' : '#3b82f6',
                    color: (savingHomework || homeworkSelection?.size === 0) ? 'var(--text-muted)' : '#ffffff',
                    border: (savingHomework || homeworkSelection?.size === 0) ? '1px solid var(--border)' : 'none',
                    fontWeight: 700,
                    cursor: (savingHomework || homeworkSelection?.size === 0) ? 'not-allowed' : 'pointer',
                    boxShadow: (savingHomework || homeworkSelection?.size === 0) ? 'none' : '0 4px 14px rgba(59, 130, 246, 0.4)',
                    transition: 'all 0.18s ease',
                    flexShrink: 0
                  }}
                >
                  {savingHomework ? 'Saqlanmoqda...' : `Saqlash (${homeworkSelection?.size || 0})`}
                </button>
              ) : !subTab && !hwId && !viewingHomeworkItem && (
                <button
                  type="button"
                  className="ios-action-btn"
                  onClick={() => {
                    handleOpenGroupSettings(selectedGroup);
                    navigate(`/corp/teacher/group/${selectedGroup.id}/settings`);
                  }}
                  title="Guruh sozlamalari"
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
                      <span className="gmh-subtitle">GURUH TAKLIF KODI</span>
                      <div className="gmh-code-row">
                        <span className="gmh-code">{selectedGroup.code}</span>
                        <button
                          type="button"
                          className="gmh-copy-btn"
                          onClick={() => copyCode(selectedGroup.code)}
                          title="Nusxalash"
                        >
                          {copiedCode === selectedGroup.code ? (
                            <>
                              <Check size={14} color="#34c759" />
                              <span>Nusxalandi</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Nusxalash</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <span className="gmh-status-badge">
                      <Check size={13} />
                      {selectedGroup.level || 'Faol Kurs'}
                    </span>
                  </div>

                  <div className="gmh-divider" />

                  <div className="gmh-stats-row">
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">{selectedGroup.studentsCount || 0}</span>
                      <span className="gmh-stat-label">O'quvchilar</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">
                        {(selectedGroup.assignedPacks || []).length + (selectedGroup.additionalPacks || []).length}
                      </span>
                      <span className="gmh-stat-label">Packlar</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val">{groupHomeworkList.length}</span>
                      <span className="gmh-stat-label">Vazifalar</span>
                    </div>
                    <div className="gmh-stat">
                      <span className="gmh-stat-val green">
                        {selectedGroupStats ? `${selectedGroupStats.avgPercent}%` : '0%'}
                      </span>
                      <span className="gmh-stat-label">O'zlashtirish</span>
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
                      <span className="bento-badge-count">{selectedGroup.studentsCount || 0} ta</span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">O'quvchilar</h3>
                      <p className="bento-sub">A'zolar progressi va boshqaruvi</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Boshqarish</span>
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
                        {(selectedGroup.assignedPacks || []).length + (selectedGroup.additionalPacks || []).length} ta
                      </span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Packlar</h3>
                      <p className="bento-sub">Biriktirilgan so'z toifalari</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Boshqarish</span>
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
                      <span className="bento-badge-count">{groupHomeworkList.length} ta</span>
                    </div>
                    <div className="bento-info">
                      <h3 className="bento-title">Uy vazifasi</h3>
                      <p className="bento-sub">Topshiriqlar va bajarilish holati</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Boshqarish</span>
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
                      <h3 className="bento-title">Statistika</h3>
                      <p className="bento-sub">Guruh bo'yicha o'zlashtirish tahlili</p>
                    </div>
                    <div className="bento-footer">
                      <span className="bento-action-label">Tahlilni ko'rish</span>
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
