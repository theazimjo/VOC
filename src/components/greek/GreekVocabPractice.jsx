import { useState } from 'react';
import { X, Trophy, ThumbsUp, Dumbbell } from 'lucide-react';
import Flashcard from '../Practice/Flashcard';
import SpellingGame from '../Practice/SpellingGame';
import MatchGame from '../Practice/MatchGame';
import { filterWordsForMode, PRACTICE_MODE_MIN_WORDS } from '../../utils/helpers';
import './GreekVocabPractice.css';

// The Greek track's practice runner — a lightweight, 3-mode stand-in for
// the personal app's PracticePage (which is hardwired to
// users/{uid}/words/{packId} and can't be pointed at this track's separate
// storage without changing a heavily-shared component). The GAMES
// themselves are the literal same components the personal app uses
// (Flashcard/SpellingGame/MatchGame take a plain `words` array + callbacks
// — nothing pack-specific), just orchestrated here against
// useGreekVocabWords + saveGreekVocabReview instead.
const MODES = [
  { id: 'flashcard', label: 'Flashkartalar', icon: '🧠' },
  { id: 'spelling', label: 'Imlo mashqi', icon: '✍️' },
  { id: 'match', label: 'Moslashtirish', icon: '🔀' },
];

function getTier(results) {
  const ratio = results.totalWords > 0 ? results.correctCount / results.totalWords : 0;
  if (ratio >= 0.8) return { Icon: Trophy, label: "Ajoyib natija!" };
  if (ratio >= 0.5) return { Icon: ThumbsUp, label: 'Yaxshi natija!' };
  return { Icon: Dumbbell, label: 'Davom eting!' };
}

export default function GreekVocabPractice({ words, allWords, onUpdateWord, onExit }) {
  const [mode, setMode] = useState(null);
  const [results, setResults] = useState(null);
  const [warning, setWarning] = useState(null);

  const handleSelectMode = (modeId) => {
    const pool = filterWordsForMode(words, modeId);
    const minWords = PRACTICE_MODE_MIN_WORDS[modeId] || 1;
    if (pool.length < minWords) {
      setWarning(
        modeId === 'spelling'
          ? "Avval flashkartalar bilan bir necha so'zni ko'rib chiqing — imlo mashqi allaqachon eshitilgan so'zlar bilan ishlaydi."
          : `Bu mashq uchun kamida ${minWords} ta so'z kerak.`
      );
      return;
    }
    setResults(null);
    setMode(modeId);
  };

  if (results) {
    const tier = getTier(results);
    return (
      <div className="greek-vocab-practice-results">
        <tier.Icon size={40} strokeWidth={1.8} className="greek-vocab-practice-results-icon" />
        <h2>{tier.label}</h2>
        <div className="greek-vocab-practice-results-stats">
          <div><strong>{results.totalWords}</strong><span>jami</span></div>
          <div><strong>{results.correctCount}</strong><span>to'g'ri</span></div>
          <div><strong>{results.incorrectCount}</strong><span>xato</span></div>
        </div>
        <button className="greek-vocab-practice-back-btn" onClick={() => { setResults(null); setMode(null); }}>
          Orqaga
        </button>
      </div>
    );
  }

  if (mode) {
    const props = {
      words: filterWordsForMode(words, mode),
      allWords: allWords || words,
      onComplete: setResults,
      onUpdateWord,
      onAnswer: () => {},
      onProgress: () => {},
      language: 'el-GR',
    };
    return (
      <div className="greek-vocab-practice-session">
        <button className="greek-vocab-practice-exit" onClick={onExit} aria-label="Chiqish">
          <X size={20} strokeWidth={2.2} />
        </button>
        {mode === 'flashcard' && <Flashcard {...props} />}
        {mode === 'spelling' && <SpellingGame {...props} />}
        {mode === 'match' && <MatchGame {...props} />}
      </div>
    );
  }

  return (
    <div className="greek-vocab-practice-picker">
      <button className="greek-vocab-practice-exit" onClick={onExit} aria-label="Chiqish">
        <X size={20} strokeWidth={2.2} />
      </button>
      <h2>Mashq turini tanlang</h2>
      {warning && <div className="greek-vocab-practice-warning">{warning}</div>}
      <div className="greek-vocab-practice-modes">
        {MODES.map((m) => (
          <button key={m.id} className="greek-vocab-practice-mode-btn" onClick={() => handleSelectMode(m.id)}>
            <span className="greek-vocab-practice-mode-icon">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
