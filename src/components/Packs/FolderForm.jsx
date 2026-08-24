import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { packIcons } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import './PackForm.css';

export default function FolderForm({ isOpen, onClose, onSave, editFolder = null, onDelete = null }) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(packIcons[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (editFolder) {
      setName(editFolder.name || '');
      setIcon(editFolder.icon || '📁');
    } else {
      setName('');
      setIcon('📁');
    }
    setIsSubmitting(false);
    setShowDeleteConfirm(false);
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
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="modal-overlay" onClick={() => showDeleteConfirm ? setShowDeleteConfirm(false) : onClose()}>
          {!showDeleteConfirm ? (
            <motion.div
              key="edit-folder-modal"
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="modal-header">
                <h2>{editFolder ? t('library.editFolderTitle') : t('library.newFolderTitle')}</h2>
                <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body flex-col gap-md">
                  <div className="input-group">
                    <label>{t('library.folderName')}</label>
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('library.folderNamePlaceholder')}
                      required
                      autoFocus
                      maxLength={100}
                    />
                  </div>

                  <div className="input-group">
                    <label>{t('library.folderIcon')}</label>
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
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      {t('library.deleteFolder')}
                    </button>
                  )}
                  <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>{t('library.cancel')}</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? t('library.saving') : t('library.save')}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Custom Delete Confirmation Modal (Replaces Edit Modal) */
            <motion.div
              key="delete-folder-confirm"
              className="custom-alert-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
            >
              <p className="custom-alert-message">{t('library.deleteFolderConfirm')}</p>
              <div className="custom-alert-actions-row">
                <button
                  type="button"
                  className="custom-alert-btn"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onDelete();
                  }}
                >
                  {t('library.deleteFolder')}
                </button>
                <button
                  type="button"
                  className="custom-alert-btn"
                  style={{ color: 'var(--text-primary)' }}
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  {t('library.cancel')}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
