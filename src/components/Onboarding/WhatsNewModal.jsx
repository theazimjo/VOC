import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FolderPlus, Layers, Move, ShieldCheck, Sparkles } from 'lucide-react';
import './WhatsNewModal.css';

export const WHATS_NEW_VERSION = 'v3_pack_folders';

const FEATURES = [
  {
    icon: Layers,
    title: 'Folders — Group your packs',
    desc: 'Group multiple packs related to a topic or book into a single folder.'
  },
  {
    icon: Move,
    title: 'Move any pack into a folder',
    desc: 'Assign any pack to a folder when creating or editing it, or move it back to the main list.'
  },
  {
    icon: ShieldCheck,
    title: 'Pack contents stay untouched',
    desc: 'Folders only organize your view — your words, flashcards, and progress remain completely untouched.'
  }
];

export default function WhatsNewModal({ onClose }) {
  const navigate = useNavigate();

  const handleTryNow = () => {
    onClose();
    navigate('/library');
  };

  return (
    <div className="whatsnew-overlay" onClick={onClose}>
      <motion.div
        className="whatsnew-card"
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="whatsnew-badge">
          <Sparkles size={14} />
          New Feature
        </div>

        <div className="whatsnew-header-icon">
          <FolderPlus size={32} strokeWidth={2} />
        </div>

        <h2>📁 Library with Folders</h2>
        <p className="whatsnew-subtitle">
          Organize your packs into topic-based folders to keep your library clean
        </p>

        <div className="whatsnew-list">
          {FEATURES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                className="whatsnew-item"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + idx * 0.05 }}
              >
                <div className="whatsnew-item-icon">
                  <IconComponent size={20} strokeWidth={2.2} />
                </div>
                <div className="whatsnew-item-info">
                  <div className="whatsnew-item-title">{item.title}</div>
                  <div className="whatsnew-item-desc">{item.desc}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="whatsnew-actions">
          <button className="whatsnew-btn-primary" onClick={handleTryNow}>
            <FolderPlus size={18} />
            Go to Library 🚀
          </button>
          <button className="whatsnew-btn-secondary" onClick={onClose}>
            Got it 👍
          </button>
        </div>
      </motion.div>
    </div>
  );
}
