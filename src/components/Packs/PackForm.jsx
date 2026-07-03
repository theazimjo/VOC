import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packIcons, bookColors } from '../../utils/helpers';
import './PackForm.css';

export default function PackForm({ isOpen, onClose, onSave, editPack = null, onDelete = null }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(packIcons[0]);
  const [color, setColor] = useState(bookColors[0]);

  const isLocked = editPack && editPack.name === 'Irregular Verbs';

  useEffect(() => {
    if (editPack) {
      setName(editPack.name || '');
      setDescription(editPack.description || '');
      setIcon(editPack.icon || packIcons[0]);
      setColor(editPack.color || bookColors[0]);
    } else {
      setName('');
      setDescription('');
      setIcon(packIcons[Math.floor(Math.random() * packIcons.length)]);
      setColor(bookColors[Math.floor(Math.random() * bookColors.length)]);
    }
  }, [editPack, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, description, icon, color });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="modal-header">
              <h2>{editPack ? "To'plamni tahrirlash" : "Yangi to'plam"}</h2>
              <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body flex-col gap-md">
                {isLocked && (
                  <div style={{
                    background: 'rgba(20, 184, 166, 0.05)',
                    border: '1px solid rgba(20, 184, 166, 0.2)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-sm) var(--space-md)',
                    fontSize: 'var(--font-xs)',
                    color: 'var(--accent-1)',
                    lineHeight: '1.4',
                    marginBottom: 'var(--space-sm)'
                  }}>
                    ℹ️ Ushbu tayyor to'plamning nomi va ikonkasini o'zgartirib bo'lmaydi. Uni faqat o'chirishingiz mumkin.
                  </div>
                )}

                <div className="input-group">
                  <label>To'plam nomi *</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Masalan: IELTS Vocabulary"
                    required 
                    autoFocus
                    disabled={isLocked}
                  />
                </div>
                
                <div className="input-group">
                  <label>Tavsif</label>
                  <textarea 
                    className="textarea" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="To'plam haqida qisqacha ma'lumot..."
                  />
                </div>

                <div className="input-group">
                  <label>Ikonka</label>
                  <div className="icon-picker">
                    {packIcons.map((icn, idx) => (
                      <div 
                        key={idx}
                        className={`icon-swatch ${icon === icn ? 'selected' : ''} ${isLocked && icon !== icn ? 'disabled' : ''}`}
                        onClick={() => !isLocked && setIcon(icn)}
                      >
                        {icn}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="input-group">
                  <label>Rang</label>
                  <div className="color-picker">
                    {bookColors.map((c, idx) => (
                      <div 
                        key={idx}
                        className={`color-swatch ${color === c ? 'selected' : ''}`}
                        style={{ background: c }}
                        onClick={() => setColor(c)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="modal-footer" style={{ justifyContent: editPack ? 'space-between' : 'flex-end', width: '100%' }}>
                {editPack && onDelete && (
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={() => {
                      if (window.confirm("Rostdan ham bu to'plamni va undagi barcha so'zlarni o'chirmoqchimisiz?")) {
                        onDelete();
                      }
                    }}
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
        </div>
      )}
    </AnimatePresence>
  );
}
