import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BookCard.css';

export default function BookCard({ book }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to={`/books/${book.id}`} className="book-card">
        <div className="book-card-bg" style={{ background: book.coverColor || 'var(--accent-gradient)' }}></div>
        <div className="book-card-icon">📖</div>
        <div className="book-card-content">
          <h3 className="book-card-title">{book.title}</h3>
          {book.author && <p className="book-card-author">{book.author}</p>}
          <div className="book-card-stats">
            <span className="book-card-badge">{book.wordCount || 0} ta so'z</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
