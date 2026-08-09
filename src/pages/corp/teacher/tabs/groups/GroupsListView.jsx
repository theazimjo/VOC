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
          <div className="courses-top-bar" style={{ marginBottom: '1rem' }}>
            <div className="courses-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div className="courses-title-area">
                <h1 style={{ fontSize: '1.4rem', margin: 0 }}>My Groups</h1>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem' }}>{activeGroups.length} active groups · {totalStudents} students</p>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  className="top-search-lupa-btn"
                  onClick={() => setShowSearchInput(!showSearchInput)}
                  title="Search groups"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>

            {(showSearchInput || searchTerm) && (
              <div className="search-input-wrap mobile-search-expanded" style={{ marginTop: '0.85rem', position: 'relative', width: '100%' }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search groups..."
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
                  title="Close search"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="loading-spinner">Loading groups...</div>
          ) : filteredActiveGroups.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem 1rem' }}>
              <Users size={40} style={{ opacity: 0.5 }} />
              <p style={{ fontSize: '0.88rem' }}>{searchTerm ? `No groups match "${searchTerm}".` : "You don't have any active groups yet."}</p>
              {searchTerm ? (
                <button className="btn-secondary" onClick={() => setSearchTerm('')} style={{ marginTop: '8px' }}>
                  Clear search
                </button>
              ) : (
                <button className="btn-create-group" onClick={() => setShowCreateModal(true)}>
                  Create New Group
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredActiveGroups.map((group) => {
                const totalPacks = (group.assignedPacks || []).length + (group.requiredPacks || []).length + (group.additionalPacks || []).length;
                return (
                  <div
                    key={group.id}
                    onClick={() => {
                      setSelectedGroupId(group.id);
                      navigate(`/corp/teacher/group/${group.id}`);
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '16px',
                      background: 'var(--bg-glass-strong)',
                      border: '1px solid var(--border)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '11px',
                          background: 'rgba(59, 130, 246, 0.14)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: '#3b82f6'
                        }}
                      >
                        <Users size={18} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {group.name}
                          </strong>
                          {group.level && (
                            <span className="group-level-badge" style={{ fontSize: '0.66rem', padding: '1px 6px', flexShrink: 0 }}>
                              {group.level}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {group.studentsCount || 0} students · {totalPacks} packs
                        </span>
                      </div>
                    </div>

                    <ChevronRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Floating Action Button (New Group) */}
          <button
            type="button"
            className="fab-add-pack-btn fab-icon-only"
            onClick={() => setShowCreateModal(true)}
            title="Create New Group"
          >
            <Plus size={26} />
          </button>
        </>
  );
}
