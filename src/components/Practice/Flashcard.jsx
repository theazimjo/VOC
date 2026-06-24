import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateNextReview, responseToQuality } from '../../utils/sm2';
import { speakWord } from '../../utils/helpers';
import './Flashcard.css';

// Short Uzbek labels for each part of speech
const POS_LABELS = {
  noun:          { label: 'ot',        abbr: 'n.' },
  verb:          { label: 'fe\u02bcl',   abbr: 'v.' },
  adjective:     { label: 'sifat',     abbr: 'adj.' },
  adverb:        { label: 'ravish',    abbr: 'adv.' },
  preposition:   { label: 'predlog',  abbr: 'prep.' },
  conjunction:   { label: 'bog\u02bclovchi', abbr: 'conj.' },
  pronoun:       { label: 'olmosh',   abbr: 'pron.' },
  interjection:  { label: 'undov',    abbr: 'int.' },
  phrase:        { label: 'ibora',    abbr: 'phr.' },
  idiom:         { label: 'idiom',    abbr: 'idiom' },
};

function PosBadge({ pos }) {
  if (!pos) return null;
  const info = POS_LABELS[pos] || { label: pos, abbr: pos };
  return (
    <span className={`fc-pos-badge fc-pos-${pos}`} title={info.label}>
      {info.abbr}
    </span>
  );
}

export default function Flashcard({ words, onComplete, onUpdateWord, onAnswer }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState({ correctCount: 0, incorrectCount: 0 });

  const currentWord = words[currentIndex];

  // Autoplay pronunciation on card switch
  useEffect(() => {
    if (currentWord) {
      const t = setTimeout(() => speakWord(currentWord.word), 350);
      return () => clearTimeout(t);
    }
  }, [currentIndex, currentWord]);

  // Space to flip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRate = async (rating) => {
    const isCorrect = rating !== 'again';
    if (onAnswer) onAnswer(currentWord, isCorrect);
    
    const quality = responseToQuality(rating);
    const sm2Data = calculateNextReview(
      quality,
      currentWord.easeFactor || 2.5,
      currentWord.interval || 0,
      currentWord.reviewCount || 0
    );
    await onUpdateWord(currentWord.id, sm2Data);

    const newResults = {
      correctCount: results.correctCount + (isCorrect ? 1 : 0),
      incorrectCount: results.incorrectCount + (isCorrect ? 0 : 1)
    };
    setResults(newResults);

    if (currentIndex < words.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 180);
    } else {
      onComplete({ totalWords: words.length, ...newResults });
    }
  };

  if (!currentWord) return null;

  return (
    <div className="flashcard-container">
      {/* Progress */}
      <div className="flashcard-progress-track">
        <div className="flashcard-progress-fill" style={{ width: `${(currentIndex / words.length) * 100}%` }} />
      </div>
      <div className="flashcard-progress">
        <span><span className="flashcard-progress-num">{currentIndex + 1}</span> / {words.length}</span>
      </div>

      {/* Card scene */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.25 }}
          className="flashcard-scene"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
            {/* Front */}
            <div className="flashcard-face flashcard-front">
              <button
                className="btn-speak-card"
                onClick={e => { e.stopPropagation(); speakWord(currentWord.word); }}
                title="Talaffuz qilish"
              >🔊</button>
              <PosBadge pos={currentWord.partOfSpeech} />
              <div className="flashcard-word">{currentWord.word}</div>
              <div className="flashcard-hint">
                Bosing yoki <span className="flashcard-hint-key">Space</span> tugmasini bosing
              </div>
            </div>

            {/* Back */}
            <div className="flashcard-face flashcard-back">
              <PosBadge pos={currentWord.partOfSpeech} />
              <div className="flashcard-translation">{currentWord.translation}</div>
              {currentWord.definition && (
                <div className="flashcard-def">{currentWord.definition}</div>
              )}
              {currentWord.example && (
                <div className="flashcard-example">"{currentWord.example}"</div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Rating buttons — visible only when flipped */}
      <div className={`flashcard-actions ${isFlipped ? '' : 'hidden'}`}>
        <button className="flashcard-rating-btn again" onClick={() => handleRate('again')}>
          <span className="rating-label">Bilmadim</span>
        </button>
        <button className="flashcard-rating-btn hard" onClick={() => handleRate('hard')}>
          <span className="rating-label">Qiyin</span>
        </button>
        <button className="flashcard-rating-btn good" onClick={() => handleRate('good')}>
          <span className="rating-label">Bilaman</span>
        </button>
        <button className="flashcard-rating-btn easy" onClick={() => handleRate('easy')}>
          <span className="rating-label">Oson</span>
        </button>
      </div>
    </div>
  );
}
