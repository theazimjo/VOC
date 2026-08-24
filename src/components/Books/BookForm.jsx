import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookColors } from '../../utils/helpers';
import './BookForm.css';

export default function BookForm({ isOpen, onClose, onSave, editBook = null, onDelete = null }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverColor, setCoverColor] = useState(bookColors[0]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (editBook) {
      setTitle(editBook.title || '');
      setAuthor(editBook.author || '');
      setCoverColor(editBook.coverColor || bookColors[0]);
    } else {
      setTitle('');
      setAuthor('');
      setCoverColor(bookColors[Math.floor(Math.random() * bookColors.length)]);
    }
    setShowDeleteConfirm(false);
  }, [editBook, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, author, coverColor });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="modal-overlay" onClick={() => showDeleteConfirm ? setShowDeleteConfirm(false) : onClose()}>
          {!showDeleteConfirm ? (
            <motion.div 
              key="edit-book-modal"
              className="modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="modal-header">
                <h2>{editBook ? "Kitobni tahrirlash" : "Yangi kitob"}</h2>
                <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="modal-body flex-col gap-md">
                  <div className="input-group">
                    <label>Kitob nomi *</label>
                    <input 
                      type="text" 
                      className="input" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="Masalan: Harry Potter"
                      required 
                      autoFocus
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Muallif (ixtiyoriy)</label>
                    <input 
                      type="text" 
                      className="input" 
                      value={author} 
                      onChange={e => setAuthor(e.target.value)} 
                      placeholder="Masalan: J.K. Rowling"
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Muqova rangi</label>
                    <div className="color-picker">
                      {bookColors.map((color, idx) => (
                        <div 
                          key={idx}
                          className={`color-swatch ${coverColor === color ? 'selected' : ''}`}
                          style={{ background: color }}
                          onClick={() => setCoverColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer" style={{ justifyContent: editBook ? 'space-between' : 'flex-end', width: '100%' }}>
                  {editBook && onDelete && (
                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      🗑 O'chirish
                    </button>
                  )}
                  <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    <button type="button" className="btn btn-ghost" onClick={onClose}>Bekor qilish</button>
                    <button type="submit" className="btn btn-primary">Saqlash</button>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Custom Delete Confirmation Modal (Replaces Edit Modal) */
            <motion.div
              key="delete-book-confirm"
              className="custom-alert-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
            >
              <p className="custom-alert-message">Rostdan ham bu kitobni va undagi barcha so'zlarni o'chirmoqchimisiz?</p>
              <div className="custom-alert-actions-row">
                <button
                  type="button"
                  className="custom-alert-btn"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onDelete();
                  }}
                >
                  O'chirish
                </button>
                <button
                  type="button"
                  className="custom-alert-btn"
                  style={{ color: 'var(--text-primary)' }}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Bekor qilish
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
