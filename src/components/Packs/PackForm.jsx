import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { packIcons, bookColors, speechLanguages } from '../../utils/helpers';
import { useLanguage } from '../../contexts/LanguageContext';
import './PackForm.css';

export default function PackForm({ isOpen, onClose, onSave, editPack = null, onDelete = null, folders = [], defaultFolderId = null }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(packIcons[0]);
  const [color, setColor] = useState(bookColors[0]);
  const [folderId, setFolderId] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [type, setType] = useState('default');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);
  const folderMenuRef = useRef(null);
  const { t } = useLanguage();

  const isLocked = Boolean(editPack && (editPack.name === 'Irregular Verbs' || editPack.isSystem));
  const isTypeLocked = isLocked;

  useEffect(() => {
    if (editPack) {
      setName(editPack.name || '');
      setDescription(editPack.description || '');
      setIcon(editPack.icon || packIcons[0]);
      setColor(editPack.color || bookColors[0]);
      setFolderId(editPack.folderId || '');
      setLanguage(editPack.language || 'en-US');
      setType(editPack.type || 'default');
    } else {
      setName('');
      setDescription('');
      setIcon(packIcons[Math.floor(Math.random() * packIcons.length)]);
      setColor(bookColors[Math.floor(Math.random() * bookColors.length)]);
      setFolderId(defaultFolderId || '');
      setLanguage('en-US');
      setType('default');
    }
    setIsSubmitting(false);
    setShowDeleteConfirm(false);
    setFolderMenuOpen(false);
  }, [editPack, isOpen, defaultFolderId]);

  // Close the folder dropdown when clicking/tapping anywhere outside it.
  useEffect(() => {
    if (!folderMenuOpen) return;
    const handleOutside = (e) => {
      if (folderMenuRef.current && !folderMenuRef.current.contains(e.target)) {
        setFolderMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [folderMenuOpen]);

  const selectedFolder = folderId
    ? folders.find(f => f.id === folderId)
    : null;
  const selectedFolderIcon = selectedFolder ? (selectedFolder.icon || '📁') : '📂';
  const selectedFolderName = selectedFolder ? selectedFolder.name : t('library.mainList');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSave({ name, description, icon, color, folderId: folderId || null, language, type });
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
              key="edit-pack-modal"
              className="modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="modal-header">
                <h2>{editPack ? t('library.editPack') : t('library.newPack2')}</h2>
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
                      {t('library.packLockedHint')}
                    </div>
                  )}

                  <div className="input-group">
                    <label>{t('library.packName')}</label>
                    <input 
                      type="text" 
                      className="input" 
                      value={name} 
                      onChange={e => setName(e.target.value)} 
                      placeholder={t('library.packNamePlaceholder')}
                      required
                      autoFocus
                      disabled={isLocked}
                      maxLength={200}
                    />
                  </div>

                  <div className="input-group">
                    <label>{t('library.packType')}</label>
                    <select
                      className="select"
                      value={type}
                      onChange={e => setType(e.target.value)}
                      disabled={isTypeLocked}
                    >
                      <option value="default">{t('library.packTypeGeneral')}</option>
                      <option value="ielts">{t('library.packTypeIelts')}</option>
                      <option value="english">{t('library.packTypeEnglish')}</option>
                    </select>
                    {isTypeLocked && (
                      <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
                        {t('library.packTypeLocked')}
                      </span>
                    )}
                  </div>

                  {folders.length > 0 && (
                    <div className="input-group">
                      <label>{t('library.folder')}</label>
                      <div className="folder-select" ref={folderMenuRef}>
                        <button
                          type="button"
                          className="folder-select-trigger"
                          onClick={() => setFolderMenuOpen(o => !o)}
                          aria-expanded={folderMenuOpen}
                          aria-haspopup="listbox"
                        >
                          <span className="folder-select-trigger-label">
                            <span className="folder-select-icon">{selectedFolderIcon}</span>
                            {selectedFolderName}
                          </span>
                          <ChevronDown size={16} className={`folder-select-chevron ${folderMenuOpen ? 'open' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {folderMenuOpen && (
                            <motion.div
                              className="folder-select-panel"
                              role="listbox"
                              initial={{ opacity: 0, y: -6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -6, scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                            >
                              <button
                                type="button"
                                role="option"
                                aria-selected={!folderId}
                                className={`folder-select-option ${!folderId ? 'selected' : ''}`}
                                onClick={() => { setFolderId(''); setFolderMenuOpen(false); }}
                              >
                                <span className="folder-select-option-icon">📂</span>
                                <span className="folder-select-option-name">{t('library.mainList')}</span>
                                {!folderId && <Check size={15} className="folder-select-option-check" />}
                              </button>
                              {folders.map((f) => (
                                <button
                                  key={f.id}
                                  type="button"
                                  role="option"
                                  aria-selected={folderId === f.id}
                                  className={`folder-select-option ${folderId === f.id ? 'selected' : ''}`}
                                  onClick={() => { setFolderId(f.id); setFolderMenuOpen(false); }}
                                >
                                  <span className="folder-select-option-icon">{f.icon || '📁'}</span>
                                  <span className="folder-select-option-name">{f.name}</span>
                                  {folderId === f.id && <Check size={15} className="folder-select-option-check" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  <div className="input-group">
                    <label>{t('library.wordLanguage')}</label>
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
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      {t('library.deletePack')}
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
              key="delete-pack-confirm"
              className="custom-alert-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
            >
              <p className="custom-alert-message">{t('library.deletePackConfirm')}</p>
              <div className="custom-alert-actions-row">
                <button
                  type="button"
                  className="custom-alert-btn"
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onDelete();
                  }}
                >
                  {t('library.deletePack')}
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
