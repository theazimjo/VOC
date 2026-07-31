import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { speechLanguages } from '../../utils/helpers';
import './PackCard.css';

export default function PackCard({ pack, onLongPress }) {
  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);
  const { allWords } = usePacks();

  const memoryHealth = useMemo(() => {
    const packWords = allWords.filter(w => w.packId === pack.id);
    if (packWords.length === 0) return null;

    const totalMastery = packWords.reduce((sum, w) => sum + (w.mastery || 0), 0);
    const masteryPercent = Math.round(totalMastery / packWords.length);

    return { masteryPercent };
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

  const accentColor = pack.color || 'var(--accent-1)';
  const packLanguage = speechLanguages.find(l => l.code === pack.language);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{ '--pack-accent': accentColor }}
    >
      <Link
        to={`/packs/${pack.id}`}
        className="pack-card"
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onTouchMove={handleMove}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        title="Tahrirlash yoki o'chirish uchun bosib turing"
      >
        <div className="pack-card-top">
          <div
            className="pack-card-icon"
            style={{
              backgroundColor: pack.color ? `${pack.color}18` : 'var(--accent-1-dim)',
              borderColor: pack.color ? `${pack.color}35` : 'var(--border-light)',
            }}
          >
            {pack.icon}
          </div>
          <div className="pack-card-top-right">
            {packLanguage && packLanguage.code !== 'en-US' && (
              <span className="pack-card-lang" title={packLanguage.label}>{packLanguage.flag}</span>
            )}
            <span className="pack-card-count">{pack.wordCount || 0} ta so'z</span>
            {onLongPress && (
              <button
                type="button"
                className="pack-card-more-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onLongPress();
                }}
                title="To'plam sozlamalari / o'chirish"
                aria-label="To'plam sozlamalari"
              >
                <MoreVertical size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="pack-card-body">
          <h3 className="pack-card-title">{pack.name}</h3>
          {pack.description && <p className="pack-card-desc">{pack.description}</p>}

        </div>

        <div className="pack-card-footer">
          {memoryHealth !== null ? (
            <div className="pack-card-progress-row">
              <div className="pack-card-progress-track">
                <div
                  className="pack-card-progress-fill"
                  style={{ width: `${memoryHealth.masteryPercent}%`, background: accentColor }}
                />
              </div>
              <span className="pack-card-progress-label">{memoryHealth.masteryPercent}% mastered</span>
            </div>
          ) : (
            <span className="pack-card-new-label">✨ Yangi to'plam</span>
          )}
          <span className="pack-card-arrow">→</span>
        </div>
      </Link>
    </motion.div>
  );
}
