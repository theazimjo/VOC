import { Archive, ArrowLeft, BookOpen, RotateCcw, Users } from 'lucide-react';

export default function ArchiveTab({ p }) {
  const { archivedGroups, handleRestoreGroup, loading, navigate } = p;

  return (
        <>
          <div className="ios-group-top-bar">
            <button
              type="button"
              className="ios-back-btn"
              onClick={() => navigate('/corp/teacher/settings')}
              title="Back to Settings"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="ios-title-group">
              <h2 className="ios-group-title">Archived Groups</h2>
            </div>
          </div>

          {loading ? (
            <div className="premium-glass" style={{ borderRadius: '18px', textAlign: 'center', padding: '2rem 1rem', color: 'var(--pg-text-secondary)', fontSize: '0.86rem' }}>
              Loading archive...
            </div>
          ) : archivedGroups.length === 0 ? (
            <div className="premium-glass" style={{ borderRadius: '18px', textAlign: 'center', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <Archive size={40} style={{ color: '#fbbf24', opacity: 0.8 }} />
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--pg-text-secondary)' }}>No archived groups.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '8px' }}>
              {archivedGroups.map((group) => (
                <div
                  key={group.id}
                  className="premium-glass"
                  style={{ padding: '10px 12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div className="ios-row-icon" style={{ background: 'rgba(245, 158, 11, 0.16)', color: '#fbbf24' }}>
                    <Archive size={15} />
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                      <strong style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--pg-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {group.name}
                      </strong>
                      {group.level && (
                        <span className="group-level-badge" style={{ fontSize: '0.66rem', padding: '1px 6px', flexShrink: 0 }}>
                          {group.level}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px', fontSize: '0.74rem', color: 'var(--pg-text-muted)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={11} /> {group.studentsCount || 0}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <BookOpen size={11} /> {(group.assignedPacks || []).length + (group.additionalPacks || []).length + (group.requiredPacks || []).length}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRestoreGroup(group)}
                    title="Restore from archive"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                      background: 'rgba(74, 222, 128, 0.14)', border: '1px solid rgba(74, 222, 128, 0.25)',
                      color: '#4ade80', cursor: 'pointer',
                    }}
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
  );
}
