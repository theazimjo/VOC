import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './PackCard.css';

export default function FolderCard({ folder, packCount, onOpen, onLongPress }) {
  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);
  const { t } = useLanguage();

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

  const handleClick = () => {
    if (isLongPress) return;
    onOpen();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (onLongPress) onLongPress();
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div
        className="pack-card"
        role="button"
        tabIndex={0}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onTouchMove={endPress}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter') onOpen(); }}
        onContextMenu={handleContextMenu}
        title={t('library.clickToOpen')}
      >
        <div className="pack-card-top">
          <div className="pack-card-icon">
            {folder.icon || '📁'}
          </div>
          <div className="pack-card-top-right">
            <span className="pack-card-count">{t('library.folderCount', { count: packCount })}</span>
            {onLongPress && (
              <button
                type="button"
                className="pack-card-more-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLongPress();
                }}
                title={t('library.folderSettings')}
                aria-label={t('library.folderSettings')}
              >
                <MoreVertical size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="pack-card-body">
          <h3 className="pack-card-title">{folder.name}</h3>
          <p className="pack-card-desc">{t('library.folderDesc')}</p>
        </div>

        <div className="pack-card-footer">
          <span className="pack-card-new-label">{t('library.openFolder')}</span>
          <span className="pack-card-arrow">→</span>
        </div>
      </div>
    </motion.div>
  );
}
