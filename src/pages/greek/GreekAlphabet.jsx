import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ListChecks, RotateCcw, Sparkles, ChevronLeft } from 'lucide-react';
import { GREEK_ALPHABET } from '../../data/greekAlphabet';
import { useGreekAlphabetProgress } from '../../hooks/useGreekAlphabetProgress';
import GreekLetterCard from '../../components/greek/GreekLetterCard';
import GreekAlphabetQuiz from '../../components/greek/GreekAlphabetQuiz';
import GreekLearnFlow from '../../components/greek/GreekLearnFlow';
import './GreekAlphabet.css';

const NEW_PER_SESSION = 2;
const REVIEW_PER_SESSION = 2;

// Picks the next "Harflarni o'rganish" session: the next couple of
// not-yet-introduced letters (in alphabet order) plus the weakest-mastery
// letters already introduced, mixed in for spaced review. Once every
// letter has been introduced, sessions become pure review of whichever
// letters currently have the lowest mastery — the flow never really ends.
function pickSession(mastery) {
  const notIntroduced = GREEK_ALPHABET.filter((l) => mastery[l.id] === undefined);
  const introduced = GREEK_ALPHABET.filter((l) => mastery[l.id] !== undefined);
  const reviewPool = [...introduced].sort((a, b) => (mastery[a.id] ?? 0) - (mastery[b.id] ?? 0));

  if (notIntroduced.length === 0) {
    return { newLetters: [], reviewLetters: reviewPool.slice(0, NEW_PER_SESSION + REVIEW_PER_SESSION) };
  }
  return {
    newLetters: notIntroduced.slice(0, NEW_PER_SESSION),
    reviewLetters: reviewPool.slice(0, REVIEW_PER_SESSION),
  };
}

export default function GreekAlphabet() {
  const { progress, applyMasteryUpdates, saveQuizResult } = useGreekAlphabetProgress();
  const [session, setSession] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const [quizResult, setQuizResult] = useState(null);

  const mastery = progress.mastery || {};
  const overallPct = Math.round(
    GREEK_ALPHABET.reduce((sum, l) => sum + (mastery[l.id] ?? 0), 0) / GREEK_ALPHABET.length
  );

  const handleStartLearning = () => setSession(pickSession(mastery));

  const handleSessionComplete = (masteryUpdates) => {
    applyMasteryUpdates(masteryUpdates);
    setSession(null);
  };

  const handleQuizFinish = (score, total) => {
    saveQuizResult(score, total);
    setQuizResult({ score, total });
  };

  const handleRestartQuiz = () => {
    setQuizResult(null);
    setQuizKey((k) => k + 1);
  };

  if (session) {
    return (
      <GreekLearnFlow
        newLetters={session.newLetters}
        reviewLetters={session.reviewLetters}
        initialMastery={mastery}
        onExit={() => setSession(null)}
        onComplete={handleSessionComplete}
      />
    );
  }

  if (showQuiz) {
    return (
      <div className="greek-alphabet-page">
        <button className="greek-alphabet-back-btn" onClick={() => setShowQuiz(false)}>
          <ChevronLeft size={18} strokeWidth={2.2} /> Orqaga
        </button>
        <div className="greek-alphabet-quiz-wrap">
          <AnimatePresence mode="wait">
            {quizResult ? (
              <motion.div
                key="result"
                className="greek-quiz-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Sparkles size={36} strokeWidth={1.8} className="greek-quiz-result-icon" />
                <div className="greek-quiz-result-score">{quizResult.score}/{quizResult.total}</div>
                <div className="greek-quiz-result-label">to'g'ri javob</div>
                {progress.quiz?.bestScore > 0 && (
                  <div className="greek-quiz-result-best">
                    Eng yaxshi natija: {progress.quiz.bestScore}/{progress.quiz.bestTotal}
                  </div>
                )}
                <button className="greek-quiz-retry-btn" onClick={handleRestartQuiz}>
                  <RotateCcw size={15} strokeWidth={2.2} /> Qayta boshlash
                </button>
              </motion.div>
            ) : (
              <GreekAlphabetQuiz key={quizKey} letters={GREEK_ALPHABET} onFinish={handleQuizFinish} />
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="greek-alphabet-page">
      <div className="greek-alphabet-header">
        <div>
          <h1 className="greek-alphabet-title">Yunon alifbosi</h1>
          <p className="greek-alphabet-subtitle">24 ta harf — Ελληνικό αλφάβητο</p>
        </div>
        <div className="greek-alphabet-progress-chip">
          <span className="greek-alphabet-progress-num">{overallPct}%</span>
          <span className="greek-alphabet-progress-lbl">bilaman</span>
        </div>
      </div>

      <button className="greek-alphabet-learn-cta" onClick={handleStartLearning}>
        <GraduationCap size={20} strokeWidth={2.2} /> Harflarni o'rganish
      </button>

      <motion.div
        className="greek-alphabet-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {GREEK_ALPHABET.map((letter) => (
          <GreekLetterCard key={letter.id} letter={letter} mastery={mastery[letter.id]} />
        ))}
      </motion.div>

      <button className="greek-alphabet-quiz-link" onClick={() => { setShowQuiz(true); setQuizResult(null); }}>
        <ListChecks size={16} strokeWidth={2.2} /> Bilimingizni sinang
      </button>
    </div>
  );
}
