import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { levelOptions } from '../../utils/helpers';
import './PackCard.css';

export default function PackCard({ pack }) {
  const levelInfo = levelOptions.find(l => l.value === pack.level) || levelOptions[0];

  return (
    <motion.div
      whileHover={{ scale: 1.015, x: 4 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/packs/${pack.id}`} className="pack-card-horizontal">
        <div 
          className="pack-card-color-indicator" 
          style={{ background: pack.color || 'var(--accent-gradient)' }}
        />
        <div className="pack-card-icon-container" style={{ boxShadow: `0 0 15px ${pack.color}15` }}>
          {pack.icon}
        </div>
        <div className="pack-card-info-container">
          <div className="pack-card-header-line">
            <h3 className="pack-card-title">{pack.name}</h3>
            <span 
              className="pack-card-level-badge" 
              style={{ color: levelInfo.color, background: `${levelInfo.color}15` }}
            >
              {levelInfo.label}
            </span>
          </div>
          {pack.description && <p className="pack-card-desc">{pack.description}</p>}
        </div>
        <div className="pack-card-meta-container">
          <span className="pack-card-badge-compact">{pack.wordCount || 0} ta so'z</span>
          <span className="pack-card-arrow">→</span>
        </div>
      </Link>
    </motion.div>
  );
}
