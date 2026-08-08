import { BookOpen, Check, ChevronRight, Copy, MoreVertical, Plus, Search, User, Users, X } from 'lucide-react';
import './GroupsListView.css';

export default function GroupsListView({ p }) {
  const {
    activeGroups, copiedCode, copyCode, filteredActiveGroups,
    handleOpenGroupSettings, loading, navigate, searchTerm, setSearchTerm,
    setSelectedGroupId, setShowCreateModal, setShowSearchInput, showSearchInput, totalStudents,
  } = p;

  return (
        <>
          <div className="courses-top-bar" style={{ marginBottom: '1.25rem' }}>
            <div className="courses-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div className="courses-title-area">
                <h1>Guruhlarim</h1>
                <p>{activeGroups.length} ta faol guruh · {totalStudents} ta o'quvchi</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="top-search-lupa-btn"
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  title="Guruhni qidirish"
                >
                  <Search size={18} />
                </button>
                <button
                  type="button"
                  className="btn-add-course-primary"
                  onClick={() => setShowCreateModal(true)}
                  style={{ padding: '8px 14px', fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Yangi Guruh
                </button>
              </div>
            </div>

            {(showSearchInput || searchTerm) && (
              <div className="search-input-wrap mobile-search-expanded" style={{ marginTop: '0.85rem', position: 'relative', width: '100%' }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Guruh nomini qidirish..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  autoFocus
                  style={{ width: '100%', paddingRight: '32px' }}
                />
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setShowSearchInput(false); }}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                  title="Qidiruvni yopish"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="loading-spinner">Guruhlar yuklanmoqda...</div>
          ) : filteredActiveGroups.length === 0 ? (
            <div className="empty-state">
              <Users size={48} />
              <p>{searchTerm ? `"${searchTerm}" bo'yicha guruh topilmadi.` : 'Hozircha faol guruhlaringiz yo\'q.'}</p>
              {searchTerm ? (
                <button className="btn-secondary" onClick={() => setSearchTerm('')} style={{ marginTop: '10px' }}>
                  Qidiruvni tozalash
                </button>
              ) : (
                <button className="btn-create-group" onClick={() => setShowCreateModal(true)}>
                  Yangi Guruh Yaratish
                </button>
              )}
            </div>
          ) : (
            <div className="teacher-groups-grid">
              {filteredActiveGroups.map((group) => {
                const totalPacks = (group.assignedPacks || []).length + (group.requiredPacks || []).length + (group.additionalPacks || []).length;
                return (
                  <div
                    key={group.id}
                    className="teacher-group-card-enhanced clickable"
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      navigate(`/corp/teacher/group/${group.id}`);
                    }}
                  >
                    <div className="tgc-header">
                      <div className="tgc-badge-wrap">
                        <div className="tgc-icon-badge">
                          <Users size={20} color="#3b82f6" />
                        </div>
                        <div className="tgc-title-block">
                          <h3 className="tgc-title">{group.name}</h3>
                          <span className="group-level-badge">{group.level || 'General'}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mgc-more-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenGroupSettings(group);
                        }}
                        title="Sozlamalar"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>

                    <div className="tgc-body">
                      <div className="tgc-meta-row">
                        <div className="tgc-meta-item">
                          <User size={14} color="var(--text-muted)" />
                          <span><strong>{group.studentsCount || 0}</strong> o'quvchi</span>
                        </div>
                        <div className="tgc-meta-item">
                          <BookOpen size={14} color="var(--text-muted)" />
                          <span><strong>{totalPacks}</strong> pack</span>
                        </div>
                      </div>
                    </div>

                    <div className="tgc-footer">
                      <button
                        type="button"
                        className="tgc-code-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyCode(group.code);
                        }}
                        title="Taklif kodini nusxalash"
                      >
                        {copiedCode === group.code ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                        <span>Kod: <strong>{group.code}</strong></span>
                      </button>

                      <div className="tgc-enter-link">
                        <span>Guruhga kirish</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Floating Action Button (Yangi Guruh) */}
          <button
            type="button"
            className="mobile-fab-btn"
            onClick={() => setShowCreateModal(true)}
            title="Yangi Guruh Yaratish"
          >
            <Plus size={20} strokeWidth={2.8} />
            <span>Yangi Guruh</span>
          </button>
        </>
  );
}
