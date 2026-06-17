import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BookCard.css';

export default function BookCard({ book, onLongPress }) {
  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);

  const startPress = () => {
    setIsLongPress(false);
    timerRef.current = setTimeout(() => {
      setIsLongPress(true);
      if (onLongPress) onLongPress();
    }, 600);
  };

  const endPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMove = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleClick = (e) => {
    if (isLongPress) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (onLongPress) onLongPress();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015, x: 4 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link 
        to={`/books/${book.id}`} 
        className="book-card-horizontal"
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onTouchMove={handleMove}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        title="Tahrirlash uchun bosib turing"
      >
        <div 
          className="book-card-cover-indicator" 
          style={{ background: book.coverColor || 'var(--accent-gradient)' }}
        />
        <div className="book-card-icon-container">📖</div>
        <div className="book-card-info-container">
          <h3 className="book-card-title">{book.title}</h3>
          {book.author && <p className="book-card-author">{book.author}</p>}
        </div>
        <div className="book-card-meta-container">
          <span className="book-card-badge-compact">{book.wordCount || 0} ta so'z</span>
          <span className="book-card-arrow">→</span>
        </div>
      </Link>
    </motion.div>
  );
}
