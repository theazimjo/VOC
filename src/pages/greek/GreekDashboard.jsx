import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Type, BookOpenText, GraduationCap, ArrowRight } from 'lucide-react';
import { GREEK_ALPHABET } from '../../data/greekAlphabet';
import { GREEK_VOCABULARY } from '../../data/greekVocabulary';
import { useGreekAlphabetProgress } from '../../hooks/useGreekAlphabetProgress';
import { useGreekVocabWords } from '../../hooks/useGreekVocabWords';
import './GreekDashboard.css';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function GreekDashboard() {
  const { pack } = useOutletContext();
  const navigate = useNavigate();
  const { progress } = useGreekAlphabetProgress();
  const { words: vocabWords } = useGreekVocabWords();

  const mastery = progress.mastery || {};
  const introducedCount = GREEK_ALPHABET.filter((l) => mastery[l.id] !== undefined).length;
  const alphabetPct = Math.round(
    GREEK_ALPHABET.reduce((sum, l) => sum + (mastery[l.id] ?? 0), 0) / GREEK_ALPHABET.length
  );

  const vocabIntroducedCount = vocabWords.filter((w) => (w.reviewCount || 0) > 0).length;
  const vocabPct = vocabWords.length
    ? Math.round(vocabWords.reduce((sum, w) => sum + (w.mastery || 0), 0) / vocabWords.length)
    : 0;

  const sections = [
    {
      id: 'alphabet',
      to: `/greek/${pack.id}/alphabet`,
      icon: Type,
      title: 'Alifbo',
      desc: `${introducedCount}/${GREEK_ALPHABET.length} harf, ${alphabetPct}% o'zlashtirilgan`,
      pct: alphabetPct,
      available: true,
    },
    {
      id: 'vocabulary',
      to: `/greek/${pack.id}/vocabulary`,
      icon: BookOpenText,
      title: "So'z boyligi",
      desc: `${vocabIntroducedCount}/${vocabWords.length || GREEK_VOCABULARY.length} so'z, ${vocabPct}% o'zlashtirilgan`,
      pct: vocabPct,
      available: true,
    },
    {
      id: 'grammar',
      to: `/greek/${pack.id}/grammar`,
      icon: GraduationCap,
      title: 'Grammatika',
      desc: 'Tez orada',
      pct: 0,
      available: false,
    },
  ];

  return (
    <div className="greek-dashboard">
      <motion.div
        className="greek-dashboard-hero"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="greek-dashboard-hero-icon">{pack.icon || '🏛️'}</span>
        <div>
          <h1 className="greek-dashboard-title">{pack.name}</h1>
          <p className="greek-dashboard-subtitle">Καλώς ήρθατε — Xush kelibsiz</p>
        </div>
      </motion.div>

      <div className="greek-dashboard-grid">
        {sections.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              className={`greek-dashboard-card ${!s.available ? 'is-locked' : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={s.available ? { y: -3 } : undefined}
              whileTap={s.available ? { scale: 0.98 } : undefined}
              onClick={() => s.available && navigate(s.to)}
              role="button"
              tabIndex={s.available ? 0 : -1}
            >
              <div className="greek-dashboard-card-icon">
                <Icon size={22} strokeWidth={2} />
              </div>
              <div className="greek-dashboard-card-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {s.available && (
                  <div className="greek-dashboard-card-progress-track">
                    <div className="greek-dashboard-card-progress-fill" style={{ width: `${s.pct}%` }} />
                  </div>
                )}
              </div>
              {s.available && <ArrowRight size={16} className="greek-dashboard-card-arrow" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
