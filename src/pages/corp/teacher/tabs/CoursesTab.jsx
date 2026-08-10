import { useState } from 'react';
import { ArrowLeft, BookOpen, ChevronRight, Plus, Search, Trash2, X } from 'lucide-react';
import { auth } from '../../../../firebase';
import TeacherPackViewer from '../../../../components/corp/TeacherPackViewer';
import CustomPackEditor from '../../../../components/corp/CustomPackEditor';

export default function CoursesTab({ p }) {
  const {
    centerId, customPacks, setCustomPacks, filteredPacks, searchTerm, setSearchTerm,
    setShowPackEditor, showPackEditor, viewingPack, setViewingPack,
    handleDeletePack, askConfirm,
  } = p;

  const confirmDeletePack = (pack) => askConfirm({
    title: 'Delete Pack',
    message: `Delete "${pack.title}"? This can't be undone.`,
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    danger: true,
    onConfirm: () => handleDeletePack(pack),
  });

  const [showSearch, setShowSearch] = useState(false);

  return (
        showPackEditor ? (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="ios-group-top-bar">
              <button
                type="button"
                className="ios-back-btn"
                onClick={() => setShowPackEditor(false)}
                title="Back"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="ios-title-group">
                <h2 className="ios-group-title">Create New Pack</h2>
              </div>
            </div>
            <CustomPackEditor
              centerId={centerId}
              ownerUid={auth.currentUser?.uid}
              onSaved={(pack) => {
                setCustomPacks(prev => [{ ...pack, scope: 'own' }, ...prev]);
                setShowPackEditor(false);
              }}
              onCancel={() => setShowPackEditor(false)}
            />
          </div>
        ) : viewingPack ? (
          <TeacherPackViewer
            pack={viewingPack}
            onBack={() => setViewingPack(null)}
            editable={viewingPack.scope === 'own'}
            centerId={centerId}
            onUpdate={(updatedPack) => {
              setCustomPacks(prev => prev.map(p => p.id === updatedPack.id ? { ...updatedPack, scope: p.scope } : p));
            }}
          />
        ) : (
        <>
          <div
            className="premium-glass"
            style={{ marginBottom: '1rem', padding: '1rem 1.1rem', borderRadius: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--pg-text)', margin: 0, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Word Bank
                </h2>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: 'var(--pg-text-secondary)' }}>{customPacks.length} packs</p>
              </div>

              <button
                type="button"
                onClick={() => setShowSearch(!showSearch)}
                title="Search packs"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)',
                  color: 'var(--pg-text)', cursor: 'pointer', flexShrink: 0,
                }}
              >
                {showSearch ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>

            {showSearch && (
              <div
                style={{
                  marginTop: '0.85rem', width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 12px', borderRadius: '12px',
                  background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)',
                }}
              >
                <Search size={16} style={{ color: 'var(--pg-text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search packs..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  autoFocus
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--pg-text)', fontSize: '0.9rem' }}
                />
              </div>
            )}
          </div>

          {filteredPacks.length === 0 ? (
            <div
              className="premium-glass"
              style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <BookOpen size={40} style={{ color: '#818cf8', opacity: 0.8 }} />
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--pg-text-secondary)' }}>
                {searchTerm ? 'No packs match your search.' : 'No custom packs yet.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* MENING PACKLARIM SECTION */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    My Packs ({filteredPacks.filter(p => p.scope === 'own').length})
                  </span>
                </div>

                {filteredPacks.filter(p => p.scope === 'own').length === 0 ? (
                  <div
                    className="premium-glass"
                    style={{
                      padding: '1.1rem 1.25rem',
                      borderRadius: '18px',
                      color: 'var(--pg-text-secondary)',
                      fontSize: '0.82rem',
                      lineHeight: '1.45'
                    }}
                  >
                    You haven't created any private packs yet. Tap <strong>"+"</strong> below to create one only you can see — not even the center admin.
                  </div>
                ) : (
                  <div className="teachers-table-card">
                    {/* Desktop: data table */}
                    <div className="teachers-table-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table className="teachers-table">
                        <thead>
                          <tr>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>WORDS</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPacks.filter(p => p.scope === 'own').map((pack) => (
                            <tr key={pack.id} className="t-table-row" style={{ cursor: 'pointer' }} onClick={() => setViewingPack(pack)}>
                              <td style={{ fontWeight: 600, color: 'var(--pg-text)' }}>{pack.title}</td>
                              <td style={{ color: 'var(--pg-text-secondary)' }}>{pack.description || 'No description'}</td>
                              <td>
                                <span
                                  style={{
                                    padding: '3px 10px', borderRadius: '999px',
                                    background: 'rgba(129, 140, 248, 0.18)', color: '#a5b4fc',
                                    fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap',
                                  }}
                                >
                                  {pack.wordCount || (pack.words ? pack.words.length : 0)} words
                                </span>
                              </td>
                              <td style={{ width: '40px' }}>
                                <button
                                  type="button"
                                  title="Delete"
                                  style={{
                                    background: 'rgba(239, 68, 68, 0.14)',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    borderRadius: '9px',
                                    color: '#ef4444',
                                    width: '28px',
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDeletePack(pack);
                                  }}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile: stacked cards, same data. */}
                    <div className="teachers-mobile-list" style={{ display: 'none', flexDirection: 'column', gap: '8px', padding: '0.6rem' }}>
                      {filteredPacks.filter(p => p.scope === 'own').map((pack) => (
                        <div
                          key={pack.id}
                          className="premium-glass"
                          onClick={() => setViewingPack(pack)}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                            <strong style={{ color: 'var(--pg-text)', fontSize: '0.94rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {pack.title}
                            </strong>
                            <span style={{ fontSize: '0.78rem', color: 'var(--pg-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {pack.description || 'No description'}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                            <span
                              style={{
                                padding: '4px 12px',
                                borderRadius: '999px',
                                background: 'rgba(129, 140, 248, 0.18)',
                                color: '#a5b4fc',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {pack.wordCount || (pack.words ? pack.words.length : 0)} words
                            </span>

                            <button
                              type="button"
                              title="Delete"
                              style={{
                                background: 'rgba(239, 68, 68, 0.14)',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                borderRadius: '9px',
                                color: '#ef4444',
                                width: '28px',
                                height: '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexShrink: 0
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDeletePack(pack);
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MARKAZ PACKLARI SECTION */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.6rem' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Center Packs ({filteredPacks.filter(p => p.scope === 'center').length})
                  </span>
                </div>

                {filteredPacks.filter(p => p.scope === 'center').length === 0 ? (
                  <div
                    className="premium-glass"
                    style={{
                      padding: '1.1rem 1.25rem',
                      borderRadius: '18px',
                      color: 'var(--pg-text-secondary)',
                      fontSize: '0.82rem'
                    }}
                  >
                    No shared packs from the center yet.
                  </div>
                ) : (
                  <div className="teachers-table-card">
                    {/* Desktop: data table */}
                    <div className="teachers-table-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table className="teachers-table">
                        <thead>
                          <tr>
                            <th>TITLE</th>
                            <th>DESCRIPTION</th>
                            <th>WORDS</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPacks.filter(p => p.scope === 'center').map((pack) => (
                            <tr key={pack.id} className="t-table-row" style={{ cursor: 'pointer' }} onClick={() => setViewingPack(pack)}>
                              <td style={{ fontWeight: 600, color: 'var(--pg-text)' }}>{pack.title}</td>
                              <td style={{ color: 'var(--pg-text-secondary)' }}>{pack.description || 'No description'}</td>
                              <td>
                                <span
                                  style={{
                                    padding: '3px 10px', borderRadius: '999px',
                                    background: 'rgba(129, 140, 248, 0.18)', color: '#a5b4fc',
                                    fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap',
                                  }}
                                >
                                  {pack.wordCount || (pack.words ? pack.words.length : 0)} words
                                </span>
                              </td>
                              <td style={{ width: '32px' }}>
                                <ChevronRight size={16} style={{ color: 'var(--pg-text-muted)' }} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile: stacked cards, same data. */}
                    <div className="teachers-mobile-list" style={{ display: 'none', flexDirection: 'column', gap: '8px', padding: '0.6rem' }}>
                      {filteredPacks.filter(p => p.scope === 'center').map((pack) => (
                        <div
                          key={pack.id}
                          className="premium-glass"
                          onClick={() => setViewingPack(pack)}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                            <strong style={{ color: 'var(--pg-text)', fontSize: '0.94rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {pack.title}
                            </strong>
                            <span style={{ fontSize: '0.78rem', color: 'var(--pg-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {pack.description || 'No description'}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                            <span
                              style={{
                                padding: '4px 12px',
                                borderRadius: '999px',
                                background: 'rgba(129, 140, 248, 0.18)',
                                color: '#a5b4fc',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {pack.wordCount || (pack.words ? pack.words.length : 0)} words
                            </span>
                            <ChevronRight size={16} style={{ color: 'var(--pg-text-muted)' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Floating Action Button (New Pack) */}
          <button
            type="button"
            className="fab-add-pack-btn fab-icon-only"
            onClick={() => setShowPackEditor(true)}
            title="Create new pack"
          >
            <Plus size={26} />
          </button>
        </>
        )
  );
}
