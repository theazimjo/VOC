import { ArrowLeft, BarChart3, BookOpen, Check, ChevronRight, Copy, MoreVertical, NotebookPen, Users } from 'lucide-react';
import GroupHomeworkDetail from './GroupHomeworkDetail';
import GroupSubtabs from './GroupSubtabs';
import './GroupDetailView.css';

export default function GroupDetailView({ p }) {
  const {
    copiedCode, copyCode, groupHomeworkList, handleOpenGroupSettings,
    hwId, navigate, selectedGroup, selectedGroupStats, setSelectedGroupId, subTab,
  } = p;

  return (
    <div className="tpv-container">
            <div className="ios-group-top-bar">
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => {
                  if (subTab) {
                    navigate(`/corp/teacher/group/${selectedGroup.id}`);
                  } else {
                    setSelectedGroupId(null);
                    navigate('/corp/teacher');
                  }
                }}
                title={subTab ? "Bo'limlarga qaytish" : "Guruhlarga qaytish"}
              >
                <ArrowLeft size={18} />
              </button>

              <div className="ios-title-group">
                <h2 className="ios-group-title">
                  {subTab === 'students' && "O'quvchilar"}
                  {subTab === 'words' && "Packlar"}
                  {subTab === 'homework' && "Uy vazifasi"}
                  {subTab === 'stats' && "Statistika"}
                  {subTab === 'settings' && "Guruh Sozlamalari"}
                  {!subTab && selectedGroup.name}
                </h2>
              </div>

              {!subTab && (
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
