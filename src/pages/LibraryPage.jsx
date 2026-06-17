import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooks } from '../hooks/useBooks';
import { usePacks } from '../hooks/usePacks';
import BookList from '../components/Books/BookList';
import BookForm from '../components/Books/BookForm';
import PackList from '../components/Packs/PackList';
import PackForm from '../components/Packs/PackForm';
import { bookColors, packIcons } from '../utils/helpers';
import './LibraryPage.css';

export default function LibraryPage() {
  const { books, loading: booksLoading, addBook, updateBook, deleteBook } = useBooks();
  const { packs, loading: packsLoading, addPack, updatePack, deletePack } = usePacks();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Tabs: 'books' or 'packs'
  const activeTab = searchParams.get('tab') === 'packs' ? 'packs' : 'books';
  const [showBookForm, setShowBookForm] = useState(false);
  const [showPackForm, setShowPackForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editingPack, setEditingPack] = useState(null);

  const setActiveTab = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  const handleSaveBook = async (data) => {
    if (editingBook) {
      await updateBook(editingBook.id, data);
    } else {
      await addBook({
        title: data.title,
        author: data.author || '',
        coverColor: data.coverColor || bookColors[Math.floor(Math.random() * bookColors.length)],
      });
    }
    setShowBookForm(false);
    setEditingBook(null);
  };

  const handleDeleteBook = async () => {
    if (editingBook && window.confirm("Kitobni va undagi barcha so'zlarni o'chirmoqchimisiz?")) {
      await deleteBook(editingBook.id);
      setShowBookForm(false);
      setEditingBook(null);
    }
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

  const handleAddClick = () => {
    if (activeTab === 'books') {
      setShowBookForm(true);
    } else {
      setShowPackForm(true);
    }
  };

  const isLoading = activeTab === 'books' ? booksLoading : packsLoading;
  const hasItems = activeTab === 'books' ? books.length > 0 : packs.length > 0;

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
        <button className="btn btn-primary btn-add-floating" onClick={handleAddClick}>
          <span className="btn-text">
            {activeTab === 'books' ? "+ Kitob qo'shish" : "+ To'plam yaratish"}
          </span>
          <span className="btn-icon-mobile">+</span>
        </button>
      </div>

      {/* Tabs bar (Capsule style) */}
      <div className="library-tabs-container">
        <div className="library-tabs">
          <button
            className={`library-tab-btn ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            {activeTab === 'books' && (
              <motion.div className="active-tab-pill" layoutId="activeTabPill" />
            )}
            <span className="tab-label">📖 Kitoblar</span>
            {books.length > 0 && <span className="tab-count-badge">{books.length}</span>}
          </button>
          <button
            className={`library-tab-btn ${activeTab === 'packs' ? 'active' : ''}`}
            onClick={() => setActiveTab('packs')}
          >
            {activeTab === 'packs' && (
              <motion.div className="active-tab-pill" layoutId="activeTabPill" />
            )}
            <span className="tab-label">To'plamlar</span>
            {packs.length > 0 && <span className="tab-count-badge">{packs.length}</span>}
          </button>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="library-content">
        {isLoading ? (
          <div className="empty-state"><p>Yuklanmoqda...</p></div>
        ) : hasItems ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'books' ? (
                <BookList books={books} onEditBook={(book) => { setEditingBook(book); setShowBookForm(true); }} />
              ) : (
                <PackList packs={packs} onEditPack={(pack) => { setEditingPack(pack); setShowPackForm(true); }} />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              {activeTab === 'books' ? '📚' : '📦'}
            </div>
            {activeTab === 'books' ? (
              <>
                <h3>Kitoblar topilmadi</h3>
                <p>O'qiyotgan kitobingiz uchun yangi to'plam yarating va bilmagan so'zlarni yozib boring</p>
                <button className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }} onClick={() => setShowBookForm(true)}>
                  Birinchi kitobni qo'shish
                </button>
              </>
            ) : (
              <>
                <h3>To'plamlar topilmadi</h3>
                <p>Mavzu bo'yicha so'z to'plamlari yarating — IELTS, Business English, Daily Life va boshqalar</p>
                <button className="btn btn-primary" style={{ marginTop: 'var(--space-md)' }} onClick={() => setShowPackForm(true)}>
                  Birinchi to'plamni yaratish
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Forms */}
      <BookForm
        isOpen={showBookForm}
        onClose={() => { setShowBookForm(false); setEditingBook(null); }}
        onSave={handleSaveBook}
        editBook={editingBook}
        onDelete={handleDeleteBook}
      />

      <PackForm
        isOpen={showPackForm}
        onClose={() => { setShowPackForm(false); setEditingPack(null); }}
        onSave={handleSavePack}
        editPack={editingPack}
        onDelete={handleDeletePack}
      />
    </motion.div>
  );
}
