import { motion } from 'framer-motion';
import './PracticeHub.css';

export default function PracticeHub({ onSelectMode }) {
  const modes = [
    {
      id: 'flashcard',
      icon: '🎴',
      title: 'Flashcards',
      desc: "Kartochkalarni ag'darib vizual xotirani mashq qiling",
      badge: 'Barcha darajalar',
      glowColor: 'hsl(200, 90%, 55%)' // Blue
    },
    {
      id: 'spelling',
      icon: '✍️',
      title: 'Imlo Mashqi',
      desc: "Eshitish va xotiradan so'zlarni to'g'ri yozishni mashq qiling",
      badge: 'Min 3 ta so\'z',
      glowColor: 'hsl(265, 90%, 65%)' // Purple
    },
    {
      id: 'match',
      icon: '🔀',
      title: 'Juftlikni Top',
      desc: "Inglizcha so'zni uning tarjimasiga moslashtiring",
      badge: 'Min 4 ta so\'z',
      glowColor: 'hsl(150, 80%, 45%)' // Emerald
    },
    {
      id: 'quiz',
      icon: '📝',
      title: 'Test',
      desc: "To'rtta variantdan to'g'ri tarjimani tezkorlik bilan tanlang",
      badge: 'Min 4 ta so\'z',
      glowColor: 'hsl(38, 95%, 55%)' // Amber
    },
    {
      id: 'dictation',
      icon: '🎧',
      title: 'Dictation',
      desc: "So'zni faqat eshitgan holda inglizcha imlosini yozing",
      badge: 'Min 3 ta so\'z',
      glowColor: 'hsl(245, 80%, 65%)' // Violet
    },
    {
      id: 'pronounce',
      icon: '🎙️',
      title: 'Talaffuz Mashqi',
      desc: "Mikrofonga talaffuz qilib, so'zlashuv qobiliyatini oshiring",
      badge: 'Min 1 ta so\'z',
      glowColor: 'hsl(340, 85%, 60%)' // Rose
    },
    {
      id: 'spaced',
      icon: '🧠',
      title: 'Takrorlash (SM-2)',
      desc: "Ilmiy tasdiqlangan interval takrorlash algoritmi yordamida yod oling",
      badge: 'Kunlik vazifa',
      glowColor: 'hsl(180, 85%, 50%)' // Cyan
    }
  ];

  return (
    <div className="practice-hub">
      <h2>🎮 Mashq rejimini tanlang</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>O'zingizga qulay usulda so'zlarni xotirangizga muhrlang</p>
      
      <div className="practice-hub-grid">
        {modes.map((mode, idx) => (
          <motion.div
            key={mode.id}
            className="practice-mode-card"
            onClick={() => onSelectMode(mode.id)}
            style={{ '--mode-glow-color': mode.glowColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <div className="practice-mode-icon" style={{ textShadow: `0 0 15px ${mode.glowColor}40` }}>{mode.icon}</div>
            <h3 className="practice-mode-title">{mode.title}</h3>
            <p className="practice-mode-desc">{mode.desc}</p>
            <span className="practice-mode-badge">{mode.badge}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
