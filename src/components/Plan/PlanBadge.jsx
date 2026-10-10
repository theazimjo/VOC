import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Infinity as InfinityIcon, BookOpenCheck, WifiOff, Sparkles, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useStudentPlan } from '../../hooks/usePlan';
import { EVERYONE_PREMIUM } from '../../utils/plans';
import './PlanBadge.css';

const COPY = {
  uz: {
    title: 'Premium',
    sub: 'Plus rejasi',
    items: [
      [InfinityIcon, 'Cheksiz pack', "O'z pack'laringizni cheklovsiz yarating (bepul rejada 20 ta)."],
      [BookOpenCheck, "Barcha o'rganish usullari", "Takrorlash, yozish, talaffuz, o'qish: hammasi ochiq."],
      [WifiOff, 'Oflayn ishlaydi', "Internetsiz ham o'rganing, ulanganda hammasi saqlanadi."],
      [Sparkles, 'Yangiliklar birinchi sizga', 'Yangi imkoniyatlarni hamma bilan bir vaqtda yoki undan oldin olasiz.'],
    ],
    launch: 'Hozir ishga tushirish davri: Premium hamma uchun bepul.',
    plans: "Narxlarni ko'rish",
    close: 'Yopish',
  },
  ru: {
    title: 'Premium',
    sub: 'План Plus',
    items: [
      [InfinityIcon, 'Безлимит паков', 'Создавайте свои паки без ограничений (в бесплатном плане 20).'],
      [BookOpenCheck, 'Все способы обучения', 'Повторение, письмо, произношение, чтение: всё открыто.'],
      [WifiOff, 'Работает офлайн', 'Учитесь без интернета, всё сохранится при подключении.'],
      [Sparkles, 'Новинки первыми', 'Новые возможности вы получаете вместе со всеми или раньше.'],
    ],
    launch: 'Сейчас период запуска: Premium бесплатен для всех.',
    plans: 'Смотреть цены',
    close: 'Закрыть',
  },
  en: {
    title: 'Premium',
    sub: 'Plus plan',
    items: [
      [InfinityIcon, 'Unlimited packs', 'Create as many packs of your own as you like (the free plan allows 20).'],
      [BookOpenCheck, 'Every study mode', 'Review, writing, speaking, reading: all unlocked.'],
      [WifiOff, 'Works offline', 'Study without internet; everything syncs when you are back online.'],
      [Sparkles, 'New things first', 'New features reach you at the same time as everyone, or earlier.'],
    ],
    launch: 'Launch period: Premium is free for everyone right now.',
    plans: 'See plans',
    close: 'Close',
  },
};

// A small gem-set crown, drawn here so it keeps its detail at 14px.
function Crown({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 8.5l4.6 4 4.4-7.2 4.4 7.2 4.6-4-1.9 10.2H4.9L3 8.5z" fill="#5C3800" />
      <rect x="5" y="19.6" width="14" height="2" rx="1" fill="#4A2E00" />
      <circle cx="12" cy="13.6" r="1.5" fill="#FFE27A" />
      <circle cx="7.8" cy="15.2" r="1" fill="#FFE27A" opacity=".85" />
      <circle cx="16.2" cy="15.2" r="1" fill="#FFE27A" opacity=".85" />
    </svg>
  );
}

// Four-point sparkle.
function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c.9 7.2 4.8 11.1 12 12-7.2.9-11.1 4.8-12 12-.9-7.2-4.8-11.1-12-12C7.2 11.1 11.1 7.2 12 0z" fill="currentColor" /></svg>
  );
}

// [left %, top px, size px, delay s] for the twinkling stars
const TWINKLE = [
  [8, 20, 10, 0], [20, 78, 7, .6], [30, 14, 8, 1.2], [70, 12, 7, .3], [82, 62, 11, .9],
  [92, 24, 8, 1.6], [14, 52, 6, 1.9], [88, 96, 7, .4], [6, 96, 8, 1.4], [62, 98, 6, 2],
];
// [dx, dy, scale] for the burst from the crown
const BURST = [
  [-120, -30, 1], [-90, -52, .7], [-60, 36, .9], [-130, 20, .6], [-30, -60, .8],
  [120, -26, 1], [92, -54, .7], [62, 40, .9], [132, 22, .6], [34, -62, .8],
];

function PremiumModal({ onClose }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  return createPortal(
    <div className="plan-modal-back" role="dialog" aria-modal="true" aria-label={c.title} onClick={onClose}>
      <div className="plan-modal" onClick={(e) => e.stopPropagation()}>
        <div className="plan-modal-hero">
          <button type="button" className="plan-modal-close" onClick={onClose} aria-label={c.close}>
            <X size={16} strokeWidth={2.6} />
          </button>
          {TWINKLE.map(([l, t, z, d]) => (
            <span key={`t${l}-${t}`} className="plan-star is-twinkle" style={{ left: `${l}%`, top: t, width: z, height: z, animationDelay: `${d}s` }}><Star /></span>
          ))}
          {BURST.map(([dx, dy, sc], i) => (
            <span key={`b${i}`} className="plan-star is-burst" style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, '--s': sc, animationDelay: `${0.1 + (i % 5) * 0.04}s` }}><Star /></span>
          ))}
          <div className="plan-modal-crown"><Crown size={38} /></div>
          <h3 className="plan-modal-title">{c.title}</h3>
          <p className="plan-modal-sub">{c.sub}</p>
        </div>
        <ul className="plan-modal-list">
          {c.items.map(([Icon, title, text]) => (
            <li key={title}>
              <span className="plan-modal-ico"><Icon size={19} strokeWidth={2.3} /></span>
              <div>
                <div className="plan-modal-li-title">{title}</div>
                <div className="plan-modal-li-text">{text}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="plan-modal-foot">
          {EVERYONE_PREMIUM && <p className="plan-modal-note">{c.launch}</p>}
          <Link to="/pricing" className="plan-modal-btn" onClick={onClose}>{c.plans}</Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Gold "Premium" pill with a crown; only shown for learners on Plus. Tapping it
// opens the list of what Premium includes.
export default function PlanBadge({ compact = false }) {
  const { user } = useAuth();
  const { planId, loaded } = useStudentPlan(user?.uid);
  const [open, setOpen] = useState(false);
  if (!user || !loaded || planId !== 'plus') return null;
  return (
    <>
      <button type="button" className={`plan-badge${compact ? ' is-compact' : ''}`} title="Premium" onClick={() => setOpen(true)}>
        <Crown size={compact ? 15 : 14} />
        {!compact && 'PREMIUM'}
      </button>
      {open && <PremiumModal onClose={() => setOpen(false)} />}
    </>
  );
}
