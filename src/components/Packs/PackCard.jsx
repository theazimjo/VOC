import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { levelOptions } from '../../utils/helpers';
import './PackCard.css';

export default function PackCard({ pack }) {
  const levelInfo = levelOptions.find(l => l.value === pack.level) || levelOptions[0];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to={`/packs/${pack.id}`} className="pack-card">
        <div className="pack-card-top">
          <div className="pack-card-icon" style={{ boxShadow: `0 0 20px ${pack.color}40` }}>
            {pack.icon}
          </div>
          <div className="pack-card-level" style={{ color: levelInfo.color, background: `${levelInfo.color}20` }}>
            {levelInfo.label}
          </div>
        </div>
        <h3 className="pack-card-title">{pack.name}</h3>
        {pack.description && <p className="pack-card-desc">{pack.description}</p>}
        <div className="pack-card-stats">
          <span>📝 {pack.wordCount || 0} ta so'z</span>
        </div>
        <div 
          style={{ 
            position: 'absolute', 
            bottom: 0, left: 0, right: 0, 
            height: '4px', 
            background: pack.color || 'var(--accent-gradient)' 
          }} 
        />
      </Link>
    </motion.div>
  );
}
