import { useEffect, useMemo, useState } from 'react';
import { shuffleArray } from '../../utils/arrayShuffle';
import '../greek/GreekExerciseShared.css';
import './GreekVocabExerciseMatch.css';

// Tap-to-match grid — pairs each round word with its Uzbek meaning.
// Untimed and heart-free, same as the alphabet track's match round: a
// wrong tap just flashes red and clears, no penalty.
export default function GreekVocabExerciseMatch({ exercise, onAnswer }) {
  const wordTiles = useMemo(
    () => shuffleArray(exercise.words.map((w) => ({ key: `w-${w.id}`, wordId: w.id, label: w.greek }))),
    [exercise]
  );
  const meaningTiles = useMemo(
    () => shuffleArray(exercise.words.map((w) => ({ key: `m-${w.id}`, wordId: w.id, label: w.uz }))),
    [exercise]
  );

  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [wrongPair, setWrongPair] = useState(null);

  useEffect(() => {
    if (matchedIds.size === exercise.words.length) {
      const timer = setTimeout(() => onAnswer(true), 500);
      return () => clearTimeout(timer);
    }
  }, [matchedIds, exercise.words.length, onAnswer]);

  const handlePick = (side, tile) => {
    if (matchedIds.has(tile.wordId) || wrongPair) return;
    if (side === 'word') setSelectedWord(tile);
    else setSelectedMeaning(tile);

    const otherSelected = side === 'word' ? selectedMeaning : selectedWord;
    if (!otherSelected) return;

    if (otherSelected.wordId === tile.wordId) {
      setMatchedIds((prev) => new Set(prev).add(tile.wordId));
      setSelectedWord(null);
      setSelectedMeaning(null);
    } else {
      setWrongPair(side === 'word' ? [tile.key, otherSelected.key] : [otherSelected.key, tile.key]);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedWord(null);
        setSelectedMeaning(null);
      }, 500);
    }
  };

  const tileState = (key, wordId) => {
    if (matchedIds.has(wordId)) return 'matched';
    if (wrongPair?.includes(key)) return 'wrong';
    if (selectedWord?.key === key || selectedMeaning?.key === key) return 'selected';
    return '';
  };

  return (
    <div className="greek-vocab-ex-match">
      <div className="greek-ex-prompt">Juftlarni moslashtiring</div>
      <div className="greek-vocab-ex-match-grid">
        <div className="greek-vocab-ex-match-col">
          {wordTiles.map((tile) => (
            <button
              key={tile.key}
              className={`greek-vocab-ex-match-tile ${tileState(tile.key, tile.wordId)}`}
              onClick={() => handlePick('word', tile)}
              disabled={matchedIds.has(tile.wordId)}
            >
              {tile.label}
            </button>
          ))}
        </div>
        <div className="greek-vocab-ex-match-col">
          {meaningTiles.map((tile) => (
            <button
              key={tile.key}
              className={`greek-vocab-ex-match-tile ${tileState(tile.key, tile.wordId)}`}
              onClick={() => handlePick('meaning', tile)}
              disabled={matchedIds.has(tile.wordId)}
            >
              {tile.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
