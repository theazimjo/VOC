import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FolderPlus, Layers, Move, ShieldCheck, Sparkles } from 'lucide-react';
import './WhatsNewModal.css';

export const WHATS_NEW_VERSION = 'v3_pack_folders';

const FEATURES = [
  {
    icon: Layers,
    title: 'Papkalar — to\'plamlarni guruhlang',
    desc: 'Bir mavzu yoki kitobga tegishli bir nechta to\'plamni (masalan, "Science" kitobining har xil bo\'limlari) bitta papka ichiga yig\'ib qo\'yishingiz mumkin.'
  },
  {
    icon: Move,
    title: 'Istalgan to\'plamni papkaga ko\'chiring',
    desc: 'Yangi to\'plam yaratganda yoki mavjudini tahrirlaganda, uni istalgan papkaga biriktirishingiz yoki asosiy ro\'yxatga qaytarishingiz mumkin.'
  },
  {
    icon: ShieldCheck,
    title: 'To\'plamning o\'zi o\'zgarmaydi',
    desc: 'Papka faqat tashqi ko\'rinishni tartibga soladi — so\'zlar, yodlash jarayoni va progress hech qanday o\'zgarishsiz avvalgidek ishlayveradi.'
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
          Yangi Tizim
        </div>

        <div className="whatsnew-header-icon">
          <FolderPlus size={32} strokeWidth={2} />
        </div>

        <h2>📁 Papkalar bilan Kutubxona</h2>
        <p className="whatsnew-subtitle">
          Ko'p to'plamlaringizni endi mavzu bo'yicha papkalarga solib, tartibli saqlang
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
            Kutubxonaga o'tish 🚀
          </button>
          <button className="whatsnew-btn-secondary" onClick={onClose}>
            Tushunarli 👍
          </button>
        </div>
      </motion.div>
    </div>
  );
}
