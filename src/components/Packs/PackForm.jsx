import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
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
  const [folderMenuOpen, setFolderMenuOpen] = useState(false);
  const folderMenuRef = useRef(null);

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
  const selectedFolderName = selectedFolder ? selectedFolder.name : "Main List";

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
              <h2>{editPack ? "Edit Pack" : "New Pack"}</h2>
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
                    ℹ️ The name and icon of this preset pack cannot be modified. You can only delete it.
                  </div>
                )}

                <div className="input-group">
                  <label>Pack Name *</label>
                  <input 
                    type="text" 
                    className="input" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="E.g.: IELTS Vocabulary"
                    required
                    autoFocus
                    disabled={isLocked}
                    maxLength={200}
                  />
                </div>

                {folders.length > 0 && (
                  <div className="input-group">
                    <label>Folder</label>
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
                              <span className="folder-select-option-name">Main List</span>
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
                  <label>Word Language (for pronunciation)</label>
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
                      if (window.confirm("Are you sure you want to delete this pack and all its words?")) {
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
