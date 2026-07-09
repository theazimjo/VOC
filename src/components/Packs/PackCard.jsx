import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacks } from '../../hooks/usePacks';
import './PackCard.css';

export default function PackCard({ pack, onLongPress }) {
  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);
  const { allWords } = usePacks();

  const masteryPercent = useMemo(() => {
    const packWords = allWords.filter(w => w.packId === pack.id);
    if (packWords.length === 0) return null;
    const total = packWords.reduce((sum, w) => sum + (w.mastery || 0), 0);
    return Math.round(total / packWords.length);
  }, [allWords, pack.id]);

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
        to={`/packs/${pack.id}`} 
        className="pack-card-horizontal"
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
          className="pack-card-color-indicator" 
          style={{ background: pack.color || 'var(--accent-gradient)' }}
        />
        <div 
          className="pack-card-icon-container" 
          style={{ 
            backgroundColor: pack.color ? `${pack.color}18` : 'rgba(255, 255, 255, 0.04)',
            borderColor: pack.color ? `${pack.color}35` : 'var(--border)'
          }}
        >
          {pack.icon}
        </div>
        <div className="pack-card-info-container">
          <div className="pack-card-header-line">
            <h3 className="pack-card-title">{pack.name}</h3>
          </div>
          {pack.description && <p className="pack-card-desc">{pack.description}</p>}
          {masteryPercent !== null && (
            <div className="pack-card-progress-row">
              <div className="pack-card-progress-track">
                <div
                  className="pack-card-progress-fill"
                  style={{ width: `${masteryPercent}%`, background: pack.color || 'var(--accent-1)' }}
                />
              </div>
              <span className="pack-card-progress-label">{masteryPercent}%</span>
            </div>
          )}
        </div>
        <div className="pack-card-meta-container">
          <span className="pack-card-badge-compact">{pack.wordCount || 0} ta so'z</span>
          <span className="pack-card-arrow">›</span>
        </div>
      </Link>
    </motion.div>
  );
}
