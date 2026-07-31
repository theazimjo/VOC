import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push, update, get, remove, set } from 'firebase/database';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import PackList from '../components/Packs/PackList';
import PackCard from '../components/Packs/PackCard';
import PackForm from '../components/Packs/PackForm';
import FolderCard from '../components/Packs/FolderCard';
import FolderForm from '../components/Packs/FolderForm';
import { packIcons } from '../utils/helpers';
import { playSound } from '../utils/feedback';
import { marketPacks } from '../data/marketData';
import { getMissingMarketWords } from '../utils/marketSync';
import IosSpinner from '../components/common/IosSpinner';
import './LibraryPage.css';

export default function LibraryPage() {
  const { user } = useAuth();
  const { books, loading: booksLoading } = useBooks(); // Loaded strictly for automatic migration
  const {
    packs, loading: packsLoading, addPack, updatePack, deletePack, allWords,
    folders, addFolder, updateFolder, deleteFolder
  } = usePacks();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tabs: 'library' (my packs) or 'market'
  const activeTab = searchParams.get('tab') === 'market' ? 'market' : 'library';
  const [showPackForm, setShowPackForm] = useState(false);
  const [editingPack, setEditingPack] = useState(null);

  // Folders: null = top-level grid, otherwise the id of the folder being viewed
  const [openFolderId, setOpenFolderId] = useState(null);
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const openFolder = openFolderId ? folders.find((f) => f.id === openFolderId) : null;

  // Install / Update state for Market
  const [installingPackId, setInstallingPackId] = useState(null);
  const [justInstalledIds, setJustInstalledIds] = useState([]);
  const [updatingPackId, setUpdatingPackId] = useState(null);

  // Find the user's own pack that was installed from a given market pack
  // (matched by marketPackId when available, falling back to name for
  // packs installed before that field existed).
  const findInstalledPack = (marketPack) => {
    return packs.find((p) => p.marketPackId === marketPack.id)
      || packs.find((p) => p.name === marketPack.name);
  };

  // Words already present in the user's installed copy of a market pack,
  // used to figure out which market words are new.
  const getMissingWords = (marketPack, installedPack) => {
    if (!installedPack) return marketPack.words;
    const existingWords = allWords.filter((w) => w.packId === installedPack.id);
    return getMissingMarketWords(marketPack, existingWords);
  };

  // ----------------------------------------------------
  // Automatic Migration: Convert all existing books to packs
  // ----------------------------------------------------
  // Tracks book ids already claimed for migration so that this effect —
  // which re-runs every time `books` changes, including when a book gets
  // removed mid-migration by the loop below — never re-migrates a book
  // that's already being (or has been) processed. Without this, removing
  // book 1 triggers the realtime listener, which produces a new `books`
  // array, which re-fires this effect and re-migrates books 2, 3, ... in
  // parallel with the original still-running loop, creating duplicate packs.
  const migratingBookIdsRef = useRef(new Set());

  useEffect(() => {
    migratingBookIdsRef.current = new Set();
  }, [user]);

  useEffect(() => {
    if (!user || booksLoading || !books || books.length === 0) return;

    const booksToMigrate = books.filter((b) => !migratingBookIdsRef.current.has(b.id));
    if (booksToMigrate.length === 0) return;
    booksToMigrate.forEach((b) => migratingBookIdsRef.current.add(b.id));

    const migrateBooksToPacks = async () => {
      console.log(`Starting migration of ${booksToMigrate.length} books to packs...`);
      for (const book of booksToMigrate) {
        try {
          const bookRef = ref(db, `users/${user.uid}/books/${book.id}`);
          const bookSnap = await get(bookRef);
          
          if (bookSnap.exists()) {
            const bookData = bookSnap.val();
            
            // Create a new pack reference
            const packsRef = ref(db, `users/${user.uid}/packs`);
            const newPackRef = push(packsRef);
            
            // Prepare pack payload
            const packData = {
              name: bookData.title || 'Migrated Book',
              description: bookData.author ? `Muallif: ${bookData.author}` : 'Kitobdan o\'tkazilgan to\'plam',
              color: bookData.coverColor || 'var(--accent-gradient)',
              icon: '📖',
              level: 'beginner',
              createdAt: bookData.createdAt || new Date().toISOString(),
              wordCount: bookData.wordCount || 0,
              words: bookData.words || {}
            };

            // Write to packs and then delete from books
            await set(newPackRef, packData);
            await remove(bookRef);
            console.log(`Successfully migrated book "${book.title}" to pack.`);
          }
        } catch (err) {
          console.error("Migration error for book:", book.id, err);
        }
      }
    };

    migrateBooksToPacks();
  }, [user, books, booksLoading]);

  const setActiveTab = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  const handleSavePack = async (data) => {
    try {
      if (editingPack) {
        await updatePack(editingPack.id, data);
      } else {
        await addPack({
          name: data.name,
          description: data.description || '',
          color: data.color || 'var(--accent-gradient)',
          icon: data.icon || packIcons[Math.floor(Math.random() * packIcons.length)],
          level: data.level || 'beginner',
          folderId: data.folderId || null,
          language: data.language || 'en-US',
        });
      }
    } catch (err) {
      console.error('Failed to save pack:', err);
      // Firebase only ever reports a generic permission-denied here, whether
      // it's the abuse-throttle (too many packs too fast) or another rule —
      // either way this is the honest, safe message to show.
      alert("To'plamni saqlab bo'lmadi. Juda tez-tez urinayotgan bo'lsangiz, biroz kutib qaytadan urinib ko'ring.");
      return;
    }
    setShowPackForm(false);
    setEditingPack(null);
  };

  const handleDeletePack = async () => {
    if (editingPack && window.confirm("To'plamni va undagi barcha so'zlarni o'chirmoqchimisiz?")) {
      await deletePack(editingPack.id);
      setShowPackForm(false);
      setEditingPack(null);
    }
  };

  const handleSaveFolder = async (data) => {
    try {
      if (editingFolder) {
        await updateFolder(editingFolder.id, data);
      } else {
        await addFolder(data);
      }
    } catch (err) {
      console.error('Failed to save folder:', err);
      alert("Papkani saqlab bo'lmadi. Juda tez-tez urinayotgan bo'lsangiz, biroz kutib qaytadan urinib ko'ring.");
      return;
    }
    setShowFolderForm(false);
    setEditingFolder(null);
  };

  const handleDeleteFolder = async () => {
    if (editingFolder) {
      await deleteFolder(editingFolder.id);
      setShowFolderForm(false);
      setEditingFolder(null);
      if (openFolderId === editingFolder.id) setOpenFolderId(null);
    }
  };

  // Builds the Firebase update payload for a batch of market words being
  // written into a pack's flat words node.
  const buildWordUpdates = (wordsRef, words) => {
    const updates = {};
    words.forEach((wordData) => {
      const newWordRef = push(wordsRef);
      updates[newWordRef.key] = {
        word: wordData.word || '',
        translation: wordData.translation || '',
        definition: wordData.definition || '',
        example: wordData.example || '',
        notes: wordData.notes || '',
        partOfSpeech: wordData.partOfSpeech || 'noun',
        addedAt: new Date().toISOString(),
        mastery: 0,
        interval: 0,
        reviewCount: 0,
        nextReview: null,
        lastReviewed: null
      };
    });
    return updates;
  };

  // Click handler to import / install a market pack
  const handleInstallPack = async (marketPack) => {
    if (!user) return;
    setInstallingPackId(marketPack.id);

    try {
      // 1. Create the pack metadata node
      const newPackId = await addPack({
        name: marketPack.name,
        description: marketPack.description,
        icon: marketPack.icon,
        color: marketPack.color,
        level: marketPack.level,
        marketPackId: marketPack.id
      });

      if (newPackId) {
        // 2. Write all words to the flat words node for this pack
        const wordsRef = ref(db, `users/${user.uid}/words/${newPackId}`);
        await update(wordsRef, buildWordUpdates(wordsRef, marketPack.words));

        // 3. Set the final word count exactly once
        const packRef = ref(db, `users/${user.uid}/packs/${newPackId}`);
        await update(packRef, { wordCount: marketPack.words.length });

        // Play feedback sound and mark as installed
        playSound('correct');
        setJustInstalledIds(prev => [...prev, marketPack.id]);
      }
    } catch (err) {
      console.error("Failed to install market pack:", err);
      alert("To'plamni o'rnatishda xatolik yuz berdi. Iltimos qaytadan urunib ko'ring.");
    } finally {
      setInstallingPackId(null);
    }
  };

  // Adds only the words that are new in the market pack (since it was
  // installed) to the user's existing copy — never touches or resets
  // progress on words the user already has.
  const handleUpdatePack = async (marketPack, installedPack, missingWords) => {
    if (!user || !installedPack || missingWords.length === 0) return;
    setUpdatingPackId(marketPack.id);

    try {
      const wordsRef = ref(db, `users/${user.uid}/words/${installedPack.id}`);
      await update(wordsRef, buildWordUpdates(wordsRef, missingWords));

      const packRef = ref(db, `users/${user.uid}/packs/${installedPack.id}`);
      await update(packRef, {
        wordCount: (installedPack.wordCount || 0) + missingWords.length,
        // Backfill marketPackId for packs installed before this field existed.
        ...(installedPack.marketPackId ? {} : { marketPackId: marketPack.id })
      });

      playSound('correct');
    } catch (err) {
      console.error("Failed to update market pack:", err);
      alert("To'plamni yangilashda xatolik yuz berdi. Iltimos qaytadan urunib ko'ring.");
    } finally {
      setUpdatingPackId(null);
    }
  };

  const isLoading = packsLoading || (booksLoading && books && books.length > 0);

  return (
    <motion.div
      className="library-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="page-header">
        <h1>📚 Kutubxona</h1>
      </div>

      {/* Tabs bar */}
      <div className="library-tabs-container">
        <div className="library-tabs">
          <button
            className={`library-tab-btn ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            {activeTab === 'library' && (
              <motion.div className="active-tab-pill" layoutId="activeTabPill" />
            )}
            <span className="tab-label">🏠 Mening to'plamlarim</span>
            {!isLoading && packs.length > 0 && (
              <span className="tab-count-badge">{packs.length}</span>
            )}
          </button>
          <button
            className={`library-tab-btn ${activeTab === 'market' ? 'active' : ''}`}
            onClick={() => setActiveTab('market')}
          >
            {activeTab === 'market' && (
              <motion.div className="active-tab-pill" layoutId="activeTabPill" />
            )}
            <span className="tab-label">🛒 Market</span>
            <span className="tab-count-badge" style={{ background: 'var(--accent)', color: 'white', borderColor: 'transparent' }}>
              {marketPacks.length}
            </span>
          </button>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="library-content">
        {isLoading ? (
          <div className="ios-activity-indicator" style={{ marginTop: '50px' }}>
            <IosSpinner />
            <span>Yuklanmoqda...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'library' ? (
                /* Packs list view */
                <div className="library-sections-container">
                  <div className="library-section">
                    {openFolder ? (
                      /* Inside a folder: just its packs, same behavior as the top-level list */
                      <>
                        <div className="library-folder-detail-header">
                          <button className="library-folder-back-btn" onClick={() => setOpenFolderId(null)}>
                            <ArrowLeft size={22} /> Orqaga
                          </button>
                          <h2>{openFolder.icon} {openFolder.name}</h2>
                          <button
                            className="btn btn-ghost btn-icon"
                            onClick={() => { setEditingFolder(openFolder); setShowFolderForm(true); }}
                            title="Papkani tahrirlash"
                          >
                            <MoreVertical size={22} />
                          </button>
                        </div>

                        {packs.filter((p) => p.folderId === openFolder.id).length > 0 ? (
                          <PackList
                            packs={packs.filter((p) => p.folderId === openFolder.id)}
                            onEditPack={(pack) => { setEditingPack(pack); setShowPackForm(true); }}
                          />
                        ) : (
                          <div className="empty-state" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
                            <div className="empty-state-icon">📦</div>
                            <h3>Bu papka hali bo'sh</h3>
                            <p>Pastdagi + tugmasi bilan shu papkaga to'plam qo'shing.</p>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Top level: folders first, then ungrouped packs */
                      <>
                        <div className="library-folders-row-header">
                          <button className="btn btn-ghost" onClick={() => { setEditingFolder(null); setShowFolderForm(true); }}>
                            + Yangi papka
                          </button>
                        </div>

                        {(folders.length > 0 || packs.length > 0) ? (
                          <div className="grid-cards">
                            {folders.map((folder) => (
                              <FolderCard
                                key={folder.id}
                                folder={folder}
                                packCount={packs.filter((p) => p.folderId === folder.id).length}
                                onOpen={() => setOpenFolderId(folder.id)}
                                onLongPress={() => { setEditingFolder(folder); setShowFolderForm(true); }}
                              />
                            ))}
                            {packs.filter((p) => !p.folderId).map((pack) => (
                              <PackCard
                                key={pack.id}
                                pack={pack}
                                onLongPress={() => { setEditingPack(pack); setShowPackForm(true); }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="empty-state" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
                            <div className="empty-state-icon">📦</div>
                            <h3>To'plamlar topilmadi</h3>
                            <p>Mavzular bo'yicha so'z to'plamlari yarating yoki ularni Marketdan yuklab oling.</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* Market view with ready-made packs list */
                <div className="market-container">
                  <div className="grid-cards market-cards-grid">
                    {marketPacks.map((pack) => {
                      const installedPack = findInstalledPack(pack);
                      const isInstalled = !!installedPack || justInstalledIds.includes(pack.id);
                      const isInstalling = installingPackId === pack.id;
                      const isUpdating = updatingPackId === pack.id;
                      const missingWords = installedPack ? getMissingWords(pack, installedPack) : [];
                      const hasUpdate = isInstalled && installedPack && missingWords.length > 0;

                      return (
                        <div 
                          className="market-card" 
                          key={pack.id}
                          style={{ '--card-border-gradient': pack.color }}
                        >
                          <div className="market-card-top">
                            <div className="market-card-header">
                              <span className="market-card-icon">{pack.icon}</span>
                              <h3 className="market-card-title">{pack.name}</h3>
                            </div>
                            <div className="market-card-badges">
                              <span className="market-badge category">{pack.category}</span>
                              <span className="market-badge level">{pack.level}</span>
                            </div>
                            <p className="market-card-desc">{pack.description}</p>
                          </div>

                          <div className="market-card-bottom">
                            <span className="market-card-words">
                              📊 {pack.words.length} ta so'z
                            </span>
                            <button
                              className={`market-install-btn${hasUpdate ? ' has-update' : ''}`}
                              disabled={isInstalling || isUpdating || (isInstalled && !hasUpdate)}
                              onClick={() => hasUpdate
                                ? handleUpdatePack(pack, installedPack, missingWords)
                                : handleInstallPack(pack)}
                            >
                              {isInstalling ? (
                                <>⌛ O'rnatilmoqda...</>
                              ) : isUpdating ? (
                                <>⌛ Yangilanmoqda...</>
                              ) : hasUpdate ? (
                                <>Yangilash (+{missingWords.length}) 🔄</>
                              ) : isInstalled ? (
                                <>O'rnatildi ✅</>
                              ) : (
                                <>Yuklab olish 📥</>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Forms */}
      <PackForm
        isOpen={showPackForm}
        onClose={() => { setShowPackForm(false); setEditingPack(null); }}
        onSave={handleSavePack}
        editPack={editingPack}
        onDelete={handleDeletePack}
        folders={folders}
        defaultFolderId={openFolderId}
      />

      <FolderForm
        isOpen={showFolderForm}
        onClose={() => { setShowFolderForm(false); setEditingFolder(null); }}
        onSave={handleSaveFolder}
        editFolder={editingFolder}
        onDelete={handleDeleteFolder}
      />

      {/* Floating Action Button (FAB) for adding a pack */}
      {activeTab === 'library' && (
        <div className="fab-container">
          <motion.button
            className="fab-main-btn"
            onClick={() => setShowPackForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            <span className="fab-main-icon">+</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
