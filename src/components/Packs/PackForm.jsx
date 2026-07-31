import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packIcons, bookColors, speechLanguages } from '../../utils/helpers';
import './PackForm.css';

export default function PackForm({ isOpen, onClose, onSave, editPack = null, onDelete = null, folders = [], defaultFolderId = null }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(packIcons[0]);
  const [color, setColor] = useState(bookColors[0]);
  const [folderId, setFolderId] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLocked = editPack && editPack.name === 'Irregular Verbs';

  useEffect(() => {
    if (editPack) {
      setName(editPack.name || '');
      setDescription(editPack.description || '');
      setIcon(editPack.icon || packIcons[0]);
      setColor(editPack.color || bookColors[0]);
      setFolderId(editPack.folderId || '');
      setLanguage(editPack.language || 'en-US');
    } else {
      setName('');
      setDescription('');
      setIcon(packIcons[Math.floor(Math.random() * packIcons.length)]);
      setColor(bookColors[Math.floor(Math.random() * bookColors.length)]);
      setFolderId(defaultFolderId || '');
      setLanguage('en-US');
    }
    setIsSubmitting(false);
  }, [editPack, isOpen, defaultFolderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSave({ name, description, icon, color, folderId: folderId || null, language });
    } finally {
      setIsSubmitting(false);
    }
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
                    maxLength={200}
                  />
                </div>

                {folders.length > 0 && (
                  <div className="input-group">
                    <label>Papka</label>
                    <div className="level-selector">
                      <div
                        className={`level-option ${!folderId ? 'selected' : ''}`}
                        onClick={() => setFolderId('')}
                      >
                        Asosiy ro'yxat
                      </div>
                      {folders.map((f) => (
                        <div
                          key={f.id}
                          className={`level-option ${folderId === f.id ? 'selected' : ''}`}
                          onClick={() => setFolderId(f.id)}
                        >
                          {f.icon} {f.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="input-group">
                  <label>So'zlarning tili (talaffuz uchun)</label>
                  <select
                    className="select"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                  >
                    {speechLanguages.map(l => (
                      <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
                    ))}
                  </select>
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
                  <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Bekor qilish</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saqlanmoqda...' : 'Saqlash'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
