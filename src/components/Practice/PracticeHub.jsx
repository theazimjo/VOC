import { motion } from 'framer-motion';
import { Zap, Layers, PenLine, Shuffle, ListChecks, Headphones, Mic, Brain, NotebookPen } from 'lucide-react';
import './PracticeHub.css';

export default function PracticeHub({ onSelectMode, isIrregularVerbs }) {
  const modes = [];

  if (isIrregularVerbs) {
    modes.push({
      id: 'irregular-verbs',
      icon: Zap,
      title: "Fe'llar Trenajyori",
      desc: "Noto'g'ri fe'llarning V1, V2, V3 shakllarini yozib mashq qiling",
      badge: 'Tavsiya etiladi 🌟',
      glowColor: 'hsl(165, 85%, 50%)'
    });
  }

  modes.push(
    {
      id: 'flashcard',
      icon: Layers,
      title: 'Flashcards',
      desc: "Kartochkalarni ag'darib vizual xotirani mashq qiling",
      badge: 'Barcha darajalar',
      glowColor: 'hsl(200, 90%, 55%)'
    },
    {
      id: 'spelling',
      icon: PenLine,
      title: 'Imlo Mashqi',
      desc: "Eshitish va xotiradan so'zlarni to'g'ri yozishni mashq qiling",
      badge: "Min 3 ta so'z",
      glowColor: 'hsl(265, 90%, 65%)'
    },
    {
      id: 'match',
      icon: Shuffle,
      title: 'Juftlikni Top',
      desc: "Inglizcha so'zni uning tarjimasiga moslashtiring",
      badge: "Min 4 ta so'z",
      glowColor: 'hsl(150, 80%, 45%)'
    },
    {
      id: 'quiz',
      icon: ListChecks,
      title: 'Test',
      desc: "To'rtta variantdan to'g'ri tarjimani tezkorlik bilan tanlang",
      badge: "Min 4 ta so'z",
      glowColor: 'hsl(38, 95%, 55%)'
    },
    {
      id: 'dictation',
      icon: Headphones,
      title: 'Diktant',
      desc: "So'zni faqat eshitgan holda inglizcha imlosini yozing",
      badge: "Min 3 ta so'z",
      glowColor: 'hsl(245, 80%, 65%)'
    },
    {
      id: 'pronounce',
      icon: Mic,
      title: 'Talaffuz',
      desc: "Mikrofonga talaffuz qilib, so'zlashuv qobiliyatini oshiring",
      badge: "Min 1 ta so'z",
      glowColor: 'hsl(340, 85%, 60%)'
    },
    {
      id: 'spaced',
      icon: Brain,
      title: 'Takrorlash (SM-2)',
      desc: "Ilmiy tasdiqlangan interval takrorlash algoritmi yordamida yod oling",
      badge: 'Kunlik vazifa',
      glowColor: 'hsl(180, 85%, 50%)'
    },
    {
      id: 'sentence',
      icon: NotebookPen,
      title: 'Jumla Tuzish',
      desc: "So'zni yodingizdan chaqirib, uni ishlatib inglizcha jumla yozing",
      badge: "Min 1 ta so'z",
      glowColor: 'hsl(20, 90%, 55%)'
    }
  );

  return (
    <div className="practice-hub">
      <h2>🎮 Mashq rejimini tanlang</h2>
      <p>O'zingizga qulay usulda so'zlarni xotirangizga muhrlang</p>

      <div className="practice-hub-grid">
        {modes.map((mode, idx) => (
          <motion.div
            key={mode.id}
            className="practice-mode-card"
            onClick={() => onSelectMode(mode.id)}
            style={{ '--mode-glow-color': mode.glowColor }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07, duration: 0.4 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="practice-mode-icon-wrap">
              <mode.icon size={22} strokeWidth={2.1} className="practice-mode-icon" />
            </div>
            <h3 className="practice-mode-title">{mode.title}</h3>
            <p className="practice-mode-desc">{mode.desc}</p>
            <div className="practice-mode-footer">
              <span className="practice-mode-badge">{mode.badge}</span>
              <span className="practice-mode-arrow">→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
