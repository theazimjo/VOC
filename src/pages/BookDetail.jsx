import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooks } from '../hooks/useBooks';
import { useWords } from '../hooks/useWords';
import WordList from '../components/Words/WordList';
import WordForm from '../components/Words/WordForm';
import BulkImportForm from '../components/Words/BulkImportForm';
import SpeedDialFAB from '../components/Words/SpeedDialFAB';
import './BookDetail.css';

export default function BookDetail() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { getBook } = useBooks();
  const { words, loading, addWord, updateWord, deleteWord, bulkAddWords } = useWords('books', bookId);
  
  const [book, setBook] = useState(null);
  const [showWordForm, setShowWordForm] = useState(false);
  const [showBulkImportForm, setShowBulkImportForm] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const b = await getBook(bookId);
      if (b) setBook(b);
      else navigate('/library?tab=books');
    };
    fetchBook();
  }, [bookId, getBook, navigate]);

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

  const handleBulkImport = async (newWords, onProgress) => {
    await bulkAddWords(newWords, onProgress);
  };

  const handleDeleteWord = async (wordId) => {
    if (window.confirm("Rostdan ham bu so'zni o'chirmoqchimisiz?")) {
      await deleteWord(wordId);
    }
  };

  if (!book) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <div className="ios-spinner-ring"></div>
        <span>Yuklanmoqda...</span>
      </div>
    );
  }

  const avgMastery = words.length > 0 
    ? Math.round(words.reduce((sum, w) => sum + (w.mastery || 0), 0) / words.length)
    : 0;

  return (
    <motion.div
      className="book-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="detail-back-navigation">
        <button className="btn-back" onClick={() => navigate('/library?tab=books')}>
          ← Kutubxona
        </button>
      </div>

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
          <button className="btn btn-cards" onClick={() => navigate(`/cards/books/${bookId}`)}>
            🃏 Cards Mode
          </button>
          <button className="btn btn-primary btn-mashq" onClick={() => navigate(`/practice/books/${bookId}`)}>
            🎮 Mashq qilish
          </button>
        </div>
      </div>

      <WordList 
        words={words} 
        onEdit={handleEditWord} 
        onDelete={handleDeleteWord} 
        loading={loading}
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

      <SpeedDialFAB
        onAddWord={() => { setEditingWord(null); setShowWordForm(true); }}
        onImportJson={() => setShowBulkImportForm(true)}
      />
    </motion.div>
  );
}
