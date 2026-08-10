import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packIcons } from '../../utils/helpers';
import './PackForm.css';

export default function FolderForm({ isOpen, onClose, onSave, editFolder = null, onDelete = null }) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(packIcons[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editFolder) {
      setName(editFolder.name || '');
      setIcon(editFolder.icon || '📁');
    } else {
      setName('');
      setIcon('📁');
    }
    setIsSubmitting(false);
  }, [editFolder, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSave({ name, icon });
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
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="modal-header">
              <h2>{editFolder ? 'Edit Folder' : 'New Folder'}</h2>
              <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body flex-col gap-md">
                <div className="input-group">
                  <label>Folder Name *</label>
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g.: Science Book"
                    required
                    autoFocus
                    maxLength={100}
                  />
                </div>

                <div className="input-group">
                  <label>Icon</label>
                  <div className="icon-picker">
                    {packIcons.map((ic) => (
                      <div
                        key={ic}
                        className={`icon-swatch ${icon === ic ? 'selected' : ''}`}
                        onClick={() => setIcon(ic)}
                      >
                        {ic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ justifyContent: editFolder ? 'space-between' : 'flex-end', width: '100%' }}>
                {editFolder && onDelete && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      if (window.confirm("Delete this folder? Packs inside will not be deleted, they will return to the main list.")) {
                        onDelete();
                      }
                    }}
                  >
                    🗑 Delete
                  </button>
                )}
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                  <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
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
