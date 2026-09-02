import { useEffect, useState } from 'react';
import { Volume2, Check, X } from 'lucide-react';
import { speakGreekVocab } from '../../utils/greekSpeech';
import { shuffleArray } from '../../utils/arrayShuffle';
import './GreekVocabSpelling.css';

// A space character between two Greek words (e.g. "γεια σου") would render
// as an invisible, seemingly-broken tile — show it as a visible glyph
// while still tracking the real character underneath for the answer check.
function displayLetter(letter) {
  return letter === ' ' ? '␣' : letter;
}

// Scrambled-letter spelling drill, same mechanic as the main app's
// Practice/SpellingGame.jsx: tap Greek-letter tiles in order to spell the
// word given its Uzbek meaning (+ audio). This is the one stage that
// actually drives mastery — see GreekVocabLearnFlow.jsx.
export default function GreekVocabSpelling({ words, onAnswer, onComplete }) {
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [usedTileIndices, setUsedTileIndices] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const word = words[index];
  const isLast = index === words.length - 1;

  useEffect(() => {
    if (!word) return;
    setTiles(shuffleArray(word.greek.split('')));
    setUsedTileIndices([]);
    setAnswered(false);
    setIsCorrect(false);
    speakGreekVocab(word.id, word.translit);
  }, [word]);

  const currentInput = usedTileIndices.map((i) => tiles[i]).join('');

  const handleTileClick = (idx) => {
    if (answered || usedTileIndices.includes(idx)) return;
    setUsedTileIndices((prev) => [...prev, idx]);
  };

  const handleUndo = (posInSequence) => {
    if (answered) return;
    setUsedTileIndices((prev) => prev.filter((_, i) => i !== posInSequence));
  };

  const handleCheck = () => {
    if (answered || !currentInput) return;
    const correct = currentInput === word.greek;
    setAnswered(true);
    setIsCorrect(correct);
    onAnswer(word.id, correct);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (!word) return null;

  return (
    <div className="greek-vocab-spelling">
      <div className="greek-vocab-spelling-progress">{index + 1} / {words.length}</div>

      <div className={`greek-vocab-spelling-card ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
        <div className="greek-vocab-spelling-prompt-row">
          <span className="greek-vocab-spelling-prompt">{word.uz}</span>
          <button className="greek-vocab-spelling-speak-btn" onClick={() => speakGreekVocab(word.id, word.translit)}>
            <Volume2 size={15} strokeWidth={2.2} />
          </button>
        </div>

        <div className={`greek-vocab-spelling-answer ${answered ? (isCorrect ? 'correct' : 'wrong') : ''}`}>
          {usedTileIndices.length === 0 && !answered ? (
            <span className="greek-vocab-spelling-answer-placeholder">so'zni harflardan yig'ing</span>
          ) : (
            usedTileIndices.map((tileIdx, pos) => (
              <span key={pos} className="greek-vocab-spelling-answer-letter" onClick={() => handleUndo(pos)}>
                {displayLetter(tiles[tileIdx])}
              </span>
            ))
          )}
        </div>

        <div className="greek-vocab-spelling-tiles">
          {tiles.map((letter, idx) => (
            <button
              key={idx}
              className={`greek-vocab-spelling-tile ${usedTileIndices.includes(idx) ? 'used' : ''}`}
              onClick={() => handleTileClick(idx)}
              disabled={answered || usedTileIndices.includes(idx)}
            >
              {displayLetter(letter)}
            </button>
          ))}
        </div>

        {answered && !isCorrect && (
          <div className="greek-vocab-spelling-correct-answer">To'g'ri javob: <strong>{word.greek}</strong></div>
        )}
      </div>

      <div className="greek-vocab-spelling-bottom">
        {!answered ? (
          <button className="greek-vocab-spelling-check-btn" onClick={handleCheck} disabled={!currentInput}>
            Tekshirish
          </button>
        ) : (
          <>
            <div className={`greek-vocab-spelling-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
              {isCorrect ? <Check size={16} strokeWidth={2.4} /> : <X size={16} strokeWidth={2.4} />}
              {isCorrect ? "To'g'ri!" : "Xato"}
            </div>
            <button className="greek-vocab-spelling-next-btn" onClick={handleNext}>
              {isLast ? 'Yakunlash' : 'Keyingisi'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
