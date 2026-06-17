import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooks } from '../hooks/useBooks';
import BookList from '../components/Books/BookList';
import BookForm from '../components/Books/BookForm';
import { bookColors } from '../utils/helpers';

export default function BooksPage() {
  const { books, loading, addBook } = useBooks();
  const [showForm, setShowForm] = useState(false);

  const handleSave = async (data) => {
    await addBook({
      title: data.title,
      author: data.author || '',
      coverColor: data.coverColor || bookColors[Math.floor(Math.random() * bookColors.length)],
    });
    setShowForm(false);
  };

  return (
    <motion.div
      style={{ padding: 'var(--space-lg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <h1>📚 Kitoblar</h1>
        <button className="btn btn-primary btn-add-floating" onClick={() => setShowForm(true)}>
          <span className="btn-text">+ Kitob qo'shish</span>
          <span className="btn-icon-mobile">+</span>
        </button>
      </div>

      {loading ? (
        <div className="empty-state"><p>Yuklanmoqda...</p></div>
      ) : books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>Kitoblar topilmadi</h3>
          <p>O'qiyotgan kitobingiz uchun yangi to'plam yarating va bilmagan so'zlarni yozib boring</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Birinchi kitobni qo'shish
          </button>
        </div>
      )}

      <BookForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      />
    </motion.div>
  );
}
