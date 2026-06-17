import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooks } from '../hooks/useBooks';
import { useWords } from '../hooks/useWords';
import WordList from '../components/Words/WordList';
import WordForm from '../components/Words/WordForm';
import BookForm from '../components/Books/BookForm';
import BulkImportForm from '../components/Words/BulkImportForm';
import './BookDetail.css';

export default function BookDetail() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { getBook, updateBook, deleteBook } = useBooks();
  const { words, loading, addWord, updateWord, deleteWord } = useWords('books', bookId);
  
  const [book, setBook] = useState(null);
  const [showWordForm, setShowWordForm] = useState(false);
  const [showBulkImportForm, setShowBulkImportForm] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const b = await getBook(bookId);
      if (b) setBook(b);
      else navigate('/library?tab=books');
    };
    fetchBook();
  }, [bookId, getBook, navigate]);

  const handleSaveBookDetails = async (data) => {
    await updateBook(bookId, data);
    setBook(prev => ({ ...prev, ...data }));
    setShowBookForm(false);
  };

  const handleSaveWord = async (data) => {
    if (editingWord) {
      await updateWord(editingWord.id, data);
    } else {
      await addWord(data);
    }
    setShowWordForm(false);
    setEditingWord(null);
  };

  const handleEditWord = (word) => {
    setEditingWord(word);
    setShowWordForm(true);
  };

  const handleBulkImport = async (newWords) => {
    // We add them sequentially to respect any potential rate limits
    for (const wordData of newWords) {
      await addWord(wordData);
    }
  };

  const handleDeleteWord = async (wordId) => {
    if (window.confirm("Rostdan ham bu so'zni o'chirmoqchimisiz?")) {
      await deleteWord(wordId);
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm("Kitobni va undagi barcha so'zlarni o'chirmoqchimisiz?")) {
      await deleteBook(bookId);
      navigate('/library?tab=books');
    }
  };

  if (!book) return <div className="empty-state">Yuklanmoqda...</div>;

  const avgMastery = words.length > 0 
    ? Math.round(words.reduce((sum, w) => sum + (w.mastery || 0), 0) / words.length)
    : 0;

  return (
    <motion.div
      className="book-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="book-detail-header">
        <div className="book-detail-bg" style={{ background: book.coverColor || 'var(--accent-gradient)' }}></div>
        <div className="book-detail-info">
          <h1>{book.title}</h1>
          {book.author && <p>{book.author}</p>}
          <div className="book-stats">
            <span className="book-stat-badge">📝 {words.length} ta so'z</span>
            <span className="book-stat-badge">🏆 {avgMastery}% o'zlashtirish</span>
          </div>
        </div>
        <div className="book-detail-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/library?tab=books')}>Orqaga</button>
          <button className="btn btn-secondary" onClick={() => setShowBulkImportForm(true)}>+ JSON Import</button>
          <button className="btn btn-primary" onClick={() => { setEditingWord(null); setShowWordForm(true); }}>
            + So'z qo'shish
          </button>
          <button className="btn btn-secondary btn-icon" onClick={() => setShowBookForm(true)} title="Tahrirlash">✏️</button>
        </div>
      </div>

      <WordList 
        words={words} 
        onEdit={handleEditWord} 
        onDelete={handleDeleteWord} 
        loading={loading}
      />

      <BookForm
        isOpen={showBookForm}
        onClose={() => setShowBookForm(false)}
        onSave={handleSaveBookDetails}
        editBook={book}
        onDelete={handleDeleteBook}
      />

      <WordForm
        isOpen={showWordForm}
        onClose={() => { setShowWordForm(false); setEditingWord(null); }}
        onSave={handleSaveWord}
        editWord={editingWord}
      />

      <BulkImportForm
        isOpen={showBulkImportForm}
        onClose={() => setShowBulkImportForm(false)}
        onImport={handleBulkImport}
      />
    </motion.div>
  );
}
