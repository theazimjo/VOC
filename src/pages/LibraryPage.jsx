import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push, update, get, remove, set } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import PackList from '../components/Packs/PackList';
import PackForm from '../components/Packs/PackForm';
import { packIcons } from '../utils/helpers';
import { playSound } from '../utils/feedback';
import { marketPacks } from '../data/marketData';
import './LibraryPage.css';

export default function LibraryPage() {
  const { user } = useAuth();
  const { books, loading: booksLoading } = useBooks(); // Loaded strictly for automatic migration
  const { packs, loading: packsLoading, addPack, updatePack, deletePack } = usePacks();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Tabs: 'library' (my packs) or 'market'
  const activeTab = searchParams.get('tab') === 'market' ? 'market' : 'library';
  const [showPackForm, setShowPackForm] = useState(false);
  const [editingPack, setEditingPack] = useState(null);

  // Install State for Market
  const [installingPackId, setInstallingPackId] = useState(null);
  const [justInstalledIds, setJustInstalledIds] = useState([]);

  // ----------------------------------------------------
  // Automatic Migration: Convert all existing books to packs
  // ----------------------------------------------------
  useEffect(() => {
    if (!user || booksLoading || !books || books.length === 0) return;

    const migrateBooksToPacks = async () => {
      console.log(`Starting migration of ${books.length} books to packs...`);
      for (const book of books) {
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
    if (editingPack) {
      await updatePack(editingPack.id, data);
    } else {
      await addPack({
        name: data.name,
        description: data.description || '',
        color: data.color || 'var(--accent-gradient)',
        icon: data.icon || packIcons[Math.floor(Math.random() * packIcons.length)],
        level: data.level || 'beginner',
      });
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
        level: marketPack.level
      });

      if (newPackId) {
        // 2. Write all words inside this pack's words node
        const wordsRef = ref(db, `users/${user.uid}/packs/${newPackId}/words`);
        const updates = {};
        
        marketPack.words.forEach((wordData) => {
          const newWordRef = push(wordsRef);
          const newWordId = newWordRef.key;
          updates[newWordId] = {
            word: wordData.word || '',
            translation: wordData.translation || '',
            definition: wordData.definition || '',
            example: wordData.example || '',
            notes: wordData.notes || '',
            partOfSpeech: wordData.partOfSpeech || 'noun',
            addedAt: new Date().toISOString(),
            mastery: 0,
            easeFactor: 2.5,
            interval: 0,
            reviewCount: 0,
            nextReview: null,
            lastReviewed: null
          };
        });

        await update(wordsRef, updates);

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
          <div className="empty-state"><p>Yuklanmoqda...</p></div>
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
                    {packs.length > 0 ? (
                      <PackList packs={packs} onEditPack={(pack) => { setEditingPack(pack); setShowPackForm(true); }} />
                    ) : (
                      <div className="empty-state" style={{ padding: 'var(--space-2xl) var(--space-lg)' }}>
                        <div className="empty-state-icon">📦</div>
                        <h3>To'plamlar topilmadi</h3>
                        <p>Mavzular bo'yicha so'z to'plamlari yarating yoki ularni Marketdan yuklab oling.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Market view with ready-made packs list */
                <div className="market-container">
                  <div className="market-grid">
                    {marketPacks.map((pack) => {
                      const isInstalled = packs.some(p => p.name === pack.name) || justInstalledIds.includes(pack.id);
                      const isInstalling = installingPackId === pack.id;

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
                              className="market-install-btn"
                              disabled={isInstalled || isInstalling}
                              onClick={() => handleInstallPack(pack)}
                            >
                              {isInstalling ? (
                                <>⌛ O'rnatilmoqda...</>
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
