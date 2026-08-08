import { BookOpen, Copy, MoreVertical, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import TeacherPackViewer from '../../../../components/corp/TeacherPackViewer';
import CourseManager from '../../../../components/corp/CourseManager';

export default function CoursesTab({ p }) {
  const {
    centerId, customPacks, setCustomPacks, filteredPacks, searchTerm, setSearchTerm,
    setShowPackEditor, viewingPack, setViewingPack, editingPack, setEditingPack,
    activePackMenu, setActivePackMenu, packMenuPos, setPackMenuPos,
    duplicatingPackId, handleDuplicatePack, handleDeletePack,
  } = p;

  return (
        viewingPack ? (
          <TeacherPackViewer
            pack={viewingPack}
            onBack={() => setViewingPack(null)}
          />
        ) : editingPack ? (
          <CourseManager
            centerId={centerId}
            course={editingPack}
            onBack={() => setEditingPack(null)}
            onUpdate={(updatedPack) => {
              setCustomPacks(prev => prev.map(p => p.id === updatedPack.id ? { ...updatedPack, scope: p.scope } : p));
              setEditingPack(prev => ({ ...updatedPack, scope: prev.scope }));
            }}
          />
        ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
              So'zlar bazasi ({customPacks.length})
            </h2>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
              <div className="search-input-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Pack nomini qidirish..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn-add-course-primary"
                onClick={() => setShowPackEditor(true)}
                style={{ padding: '8px 14px', fontSize: '0.85rem', height: '36px', flexShrink: 0 }}
              >
                <Plus size={16} /> Yangi pack
              </button>
            </div>
          </div>

          {filteredPacks.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={40} />
              <p>{searchTerm ? 'Qidiruv bo\'yicha pack topilmadi.' : 'Hozircha custom packlar yaratilmagan.'}</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em', margin: '0 0 0.85rem 0' }}>
                Mening packlarim ({filteredPacks.filter(p => p.scope === 'own').length})
              </h3>
              {filteredPacks.filter(p => p.scope === 'own').length === 0 ? (
                <div className="empty-state" style={{ padding: '1.5rem' }}>
                  <p>Siz hali shaxsiy pack yaratmagansiz. Faqat sizga tegishli bo'lgan va boshqa hech kimga (markaz admini ham) ko'rinmaydigan pack yaratish uchun "Yangi pack" tugmasini bosing.</p>
                </div>
              ) : (
                <div className="packs-grid" style={{ marginBottom: '2rem' }}>
                  {filteredPacks.filter(p => p.scope === 'own').map((pack) => (
                    <div
                      key={pack.id}
                      className="custom-pack-card"
                      onClick={() => setViewingPack(pack)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                      title="Ko'rish uchun bosing"
                    >
                      <button
                        type="button"
                        className="btn-action-more"
                        title="Amallar"
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setPackMenuPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right });
                          setActivePackMenu(activePackMenu === pack.id ? null : pack.id);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      <h3>{pack.title}</h3>
                      <p className="pack-desc">{pack.description || 'Izoh yo\'q'}</p>
                      <div className="pack-meta">
                        <span><strong>{pack.wordCount || (pack.words ? pack.words.length : 0)}</strong> ta so'z</span>
                      </div>

                      {activePackMenu === pack.id && (
                        <>
                          <div style={{ position: 'fixed', inset: 0, zIndex: 9998 }} onClick={(e) => { e.stopPropagation(); setActivePackMenu(null); }} />
                          <div
                            className="teacher-action-dropdown"
                            onClick={(e) => e.stopPropagation()}
                            style={{ position: 'fixed', top: `${packMenuPos.top}px`, right: `${packMenuPos.right}px`, zIndex: 9999, minWidth: '160px' }}
                          >
                            <button type="button" className="dropdown-item" onClick={() => { setEditingPack(pack); setActivePackMenu(null); }}>
                              <Pencil size={15} /> Tahrirlash
                            </button>
                            <button
                              type="button"
                              className="dropdown-item"
                              disabled={duplicatingPackId === pack.id}
                              onClick={() => { handleDuplicatePack(pack); setActivePackMenu(null); }}
                            >
                              <Copy size={15} /> {duplicatingPackId === pack.id ? 'Nusxalanmoqda...' : 'Nusxalash'}
                            </button>
                            <button type="button" className="dropdown-item dropdown-item-danger" onClick={() => { handleDeletePack(pack); setActivePackMenu(null); }}>
                              <Trash2 size={15} /> O'chirish
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em', margin: '0 0 0.85rem 0' }}>
                Markaz packlari ({filteredPacks.filter(p => p.scope === 'center').length})
              </h3>
              {filteredPacks.filter(p => p.scope === 'center').length === 0 ? (
                <div className="empty-state" style={{ padding: '1.5rem' }}>
                  <p>Markaz tomonidan umumiy pack hali yaratilmagan.</p>
                </div>
              ) : (
                <div className="packs-grid">
                  {filteredPacks.filter(p => p.scope === 'center').map((pack) => (
                    <div
                      key={pack.id}
                      className="custom-pack-card"
                      onClick={() => setViewingPack(pack)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                      title="Ko'rish uchun bosing"
                    >
                      <button
                        type="button"
                        className="btn-action-more"
                        title="Nusxalash"
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        disabled={duplicatingPackId === pack.id}
                        onClick={(e) => { e.stopPropagation(); handleDuplicatePack(pack); }}
                      >
                        <Copy size={16} />
                      </button>

                      <h3>{pack.title}</h3>
                      <p className="pack-desc">{pack.description || 'Izoh yo\'q'}</p>
                      <div className="pack-meta">
                        <span><strong>{pack.wordCount || (pack.words ? pack.words.length : 0)}</strong> ta so'z</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
        )
  );
}
