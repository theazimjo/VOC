import { motion } from 'framer-motion';
import { Sparkles, Search, NotebookPen, Trophy, BellRing, Gauge } from 'lucide-react';
import './WhatsNewModal.css';

export const WHATS_NEW_VERSION = 'v1';

const ITEMS = [
  { icon: Sparkles, title: 'Yangi iOS dizayn', desc: "Butun ilova Apple'ning iOS uslubiga moslab qayta ishlandi." },
  { icon: NotebookPen, title: 'Jumla tuzish mashqi', desc: "So'zni yodingizdan chaqirib, uni ishlatib jumla yozing." },
  { icon: Search, title: 'Global qidiruv', desc: "Yuqori o'ng burchakdagi qidiruv (yoki Ctrl+K) orqali istalgan so'zni toping." },
  { icon: Trophy, title: 'Yutuqlar', desc: "Profilingizda so'zlar, o'zlashtirish va streak bo'yicha nishonlar." },
  { icon: BellRing, title: 'Kunlik eslatma', desc: 'Sozlamalarda yoqib qo\'ying — kunlik maqsadni unutmaysiz.' },
  { icon: Gauge, title: 'Tezroq ishlash', desc: "Ortiqcha animatsiyalar olib tashlandi — ilova ancha yengil bo'ldi." }
];

export default function WhatsNewModal({ onClose }) {
  return (
    <div className="whatsnew-overlay" onClick={onClose}>
      <motion.div
        className="whatsnew-card"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="whatsnew-header-icon"><Sparkles size={30} strokeWidth={2} /></div>
        <h2>Yangiliklar</h2>
        <p className="whatsnew-subtitle">VOC yaqinda bir nechta yangilanish oldi</p>

        <div className="whatsnew-list">
          {ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              className="whatsnew-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <div className="whatsnew-item-icon"><item.icon size={18} strokeWidth={2.1} /></div>
              <div className="whatsnew-item-info">
                <div className="whatsnew-item-title">{item.title}</div>
                <div className="whatsnew-item-desc">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <button className="whatsnew-btn" onClick={onClose}>Tushunarli 👍</button>
      </motion.div>
    </div>
  );
}
