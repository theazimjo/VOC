import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FlaskConical, Brain, Zap, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import './WhatsNewModal.css';

export const WHATS_NEW_VERSION = 'v2_memory_lab';

const FEATURES = [
  {
    icon: Brain,
    title: 'Individual Unutish Egri Chizig\'i (P = e⁻ᵗ/ˢ)',
    desc: 'Har bir insonning miyasi so\'zlarni har xil tezlikda unutadi. Tizim har bir so\'zingiz uchun sizning shaxsiy xotira barqarorligingizni (S) o\'rganadi.'
  },
  {
    icon: Zap,
    title: 'Aqlli Navbat (Smart Queue)',
    desc: 'Yodlashni boshlaganingizda, unutilish arafasida turgan va eng kerakli so\'zlar avtomatik navbatning eng birinchi o\'rniga chiqadi.'
  },
  {
    icon: TrendingUp,
    title: 'Tezlik va Ishonch Tahlili',
    desc: 'Javob berish vaqtingiz (sekund) va ishonchingiz (1–5) avtomatik o\'lchanib, so\'zning xotiradagi mustahkamligi hisoblab boriladi.'
  },
  {
    icon: FlaskConical,
    title: '30 Kunlik Vizual Grafiklar',
    desc: '"Memory Lab" bo\'limiga kirib, har bir so\'zingiz va umumiy xotirangizning 30 kunlik unutish egri chizig\'ini kuzatishingiz mumkin.'
  }
];

export default function WhatsNewModal({ onClose }) {
  const navigate = useNavigate();

  const handleTryNow = () => {
    onClose();
    navigate('/experiment');
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
          <FlaskConical size={32} strokeWidth={2} />
        </div>

        <h2>🧪 Xotira Laboratoriyasi</h2>
        <p className="whatsnew-subtitle">
          Sun'iy intellekt va Ebbinghaus algoritmi asosida individual xotira dinamikasi
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
            <FlaskConical size={18} />
            Memory Lab'ga o'tish 🚀
          </button>
          <button className="whatsnew-btn-secondary" onClick={onClose}>
            Tushunarli 👍
          </button>
        </div>
      </motion.div>
    </div>
  );
}
