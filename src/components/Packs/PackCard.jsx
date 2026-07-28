import { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePacks } from '../../hooks/usePacks';
import { computeRecallProbability } from '../../utils/memoryEngine';
import './PackCard.css';

export default function PackCard({ pack, onLongPress }) {
  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);
  const { allWords } = usePacks();

  // Mastery (average of this pack's own words) plus a lightweight "memory
  // health" signal — how many of the words already under review are at risk
  // of being forgotten soon — so the card itself answers "should I open
  // this?" instead of a bare, unlabeled percentage.
  const memoryHealth = useMemo(() => {
    const packWords = allWords.filter(w => w.packId === pack.id);
    if (packWords.length === 0) return null;

    const totalMastery = packWords.reduce((sum, w) => sum + (w.mastery || 0), 0);
    const masteryPercent = Math.round(totalMastery / packWords.length);

    const now = Date.now();
    const reviewed = packWords.filter(w => w.lastReviewed);
    let atRisk = 0;
    reviewed.forEach(w => {
      const stability = typeof w.stability === 'number' ? w.stability : 1.0;
      const daysSince = (now - new Date(w.lastReviewed).getTime()) / 86400000;
      if (computeRecallProbability(stability, daysSince) < 0.5) atRisk++;
    });

    const atRiskRatio = reviewed.length > 0 ? atRisk / reviewed.length : 0;
    const healthLevel = atRiskRatio >= 0.3 ? 'high-risk' : atRisk > 0 ? 'some-risk' : 'stable';

    return { masteryPercent, atRisk, healthLevel };
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
        title="Tahrirlash uchun bosib turing"
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
          <span className="pack-card-count">{pack.wordCount || 0} ta so'z</span>
        </div>

        <div className="pack-card-body">
          <h3 className="pack-card-title">{pack.name}</h3>
          {pack.description && <p className="pack-card-desc">{pack.description}</p>}
          {memoryHealth?.atRisk > 0 && (
            <div className={`pack-card-health pack-card-health--${memoryHealth.healthLevel}`}>
              {memoryHealth.healthLevel === 'high-risk' ? '🔴' : '🟠'} {memoryHealth.atRisk} ta xavfli
            </div>
          )}
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
