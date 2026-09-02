import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { GREEK_VOCABULARY, GREEK_VOCAB_CATEGORIES, getVocabByCategory } from '../../data/greekVocabulary';
import { useGreekVocabularyProgress } from '../../hooks/useGreekVocabularyProgress';
import GreekVocabWordCard from '../../components/greek/GreekVocabWordCard';
import GreekVocabLearnFlow from '../../components/greek/GreekVocabLearnFlow';
import './GreekVocabulary.css';

const NEW_PER_SESSION = 3;
const REVIEW_PER_SESSION = 2;

// Same continuous "pick up where you left off" model as the alphabet
// track's pickSession (see GreekAlphabet.jsx) — next unintroduced words in
// list order (which happens to walk category by category), plus the
// weakest-mastery already-introduced words for spaced review.
function pickSession(mastery) {
  const notIntroduced = GREEK_VOCABULARY.filter((w) => mastery[w.id] === undefined);
  const introduced = GREEK_VOCABULARY.filter((w) => mastery[w.id] !== undefined);
  const reviewPool = [...introduced].sort((a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0));

  if (notIntroduced.length === 0) {
    return { newWords: [], reviewWords: reviewPool.slice(0, NEW_PER_SESSION + REVIEW_PER_SESSION) };
  }
  return {
    newWords: notIntroduced.slice(0, NEW_PER_SESSION),
    reviewWords: reviewPool.slice(0, REVIEW_PER_SESSION),
  };
}

export default function GreekVocabulary() {
  const { progress, applyMasteryUpdates } = useGreekVocabularyProgress();
  const [session, setSession] = useState(null);

  const mastery = progress.mastery || {};
  const overallPct = Math.round(
    GREEK_VOCABULARY.reduce((sum, w) => sum + (mastery[w.id] ?? 0), 0) / GREEK_VOCABULARY.length
  );

  const handleStartLearning = () => setSession(pickSession(mastery));

  const handleSessionComplete = (masteryUpdates) => {
    applyMasteryUpdates(masteryUpdates);
    setSession(null);
  };

  if (session) {
    return (
      <GreekVocabLearnFlow
        newWords={session.newWords}
        reviewWords={session.reviewWords}
        initialMastery={mastery}
        onExit={() => setSession(null)}
        onComplete={handleSessionComplete}
      />
    );
  }

  return (
    <div className="greek-vocab-page">
      <div className="greek-vocab-header">
        <div>
          <h1 className="greek-vocab-title">So'z boyligi</h1>
          <p className="greek-vocab-subtitle">{GREEK_VOCABULARY.length} ta so'z — Ελληνικό λεξιλόγιο</p>
        </div>
        <div className="greek-vocab-progress-chip">
          <span className="greek-vocab-progress-num">{overallPct}%</span>
          <span className="greek-vocab-progress-lbl">bilaman</span>
        </div>
      </div>

      <button className="greek-vocab-learn-cta" onClick={handleStartLearning}>
        <GraduationCap size={20} strokeWidth={2.2} /> So'z o'rganish
      </button>

      {GREEK_VOCAB_CATEGORIES.map((category) => {
        const words = getVocabByCategory(category.id);
        const catPct = Math.round(
          words.reduce((sum, w) => sum + (mastery[w.id] ?? 0), 0) / words.length
        );
        return (
          <motion.section
            key={category.id}
            className="greek-vocab-category"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="greek-vocab-category-header">
              <span className="greek-vocab-category-icon">{category.icon}</span>
              <span className="greek-vocab-category-title">{category.title}</span>
              <span className="greek-vocab-category-pct">{catPct}%</span>
            </div>
            <div className="greek-vocab-grid">
              {words.map((word) => (
                <GreekVocabWordCard key={word.id} word={word} mastery={mastery[word.id]} />
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
