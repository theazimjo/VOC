import { useEffect, useMemo, useState } from 'react';
import { shuffleArray } from '../../utils/arrayShuffle';
import './GreekExerciseShared.css';
import './GreekExerciseMatch.css';

// Tap-to-match grid — pairs each lesson letter's glyph with its Latin name.
// Untimed and heart-free (like Duolingo's own matching rounds): a wrong tap
// just flashes red and clears, no penalty, so it stays a low-stakes review
// step rather than another chance to fail the lesson.
export default function GreekExerciseMatch({ exercise, onAnswer }) {
  const glyphs = useMemo(
    () => shuffleArray(exercise.letters.map((l) => ({ key: `g-${l.id}`, letterId: l.id, label: `${l.upper}${l.lower}` }))),
    [exercise]
  );
  const names = useMemo(
    () => shuffleArray(exercise.letters.map((l) => ({ key: `n-${l.id}`, letterId: l.id, label: l.nameLatin }))),
    [exercise]
  );

  const [selectedGlyph, setSelectedGlyph] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [wrongPair, setWrongPair] = useState(null);

  useEffect(() => {
    if (matchedIds.size === exercise.letters.length) {
      const timer = setTimeout(() => onAnswer(true), 500);
      return () => clearTimeout(timer);
    }
  }, [matchedIds, exercise.letters.length, onAnswer]);

  const handlePick = (side, tile) => {
    if (matchedIds.has(tile.letterId) || wrongPair) return;
    if (side === 'glyph') setSelectedGlyph(tile);
    else setSelectedName(tile);

    const otherSelected = side === 'glyph' ? selectedName : selectedGlyph;
    if (!otherSelected) return;

    if (otherSelected.letterId === tile.letterId) {
      setMatchedIds((prev) => new Set(prev).add(tile.letterId));
      setSelectedGlyph(null);
      setSelectedName(null);
    } else {
      setWrongPair(side === 'glyph' ? [tile.key, otherSelected.key] : [otherSelected.key, tile.key]);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedGlyph(null);
        setSelectedName(null);
      }, 500);
    }
  };

  const tileState = (key, letterId) => {
    if (matchedIds.has(letterId)) return 'matched';
    if (wrongPair?.includes(key)) return 'wrong';
    if (selectedGlyph?.key === key || selectedName?.key === key) return 'selected';
    return '';
  };

  return (
    <div className="greek-ex-match">
      <div className="greek-ex-prompt">Juftlarni moslashtiring</div>
      <div className="greek-ex-match-grid">
        <div className="greek-ex-match-col">
          {glyphs.map((tile) => (
            <button
              key={tile.key}
              className={`greek-ex-match-tile greek-ex-match-tile-glyph ${tileState(tile.key, tile.letterId)}`}
              onClick={() => handlePick('glyph', tile)}
              disabled={matchedIds.has(tile.letterId)}
            >
              {tile.label}
            </button>
          ))}
        </div>
        <div className="greek-ex-match-col">
          {names.map((tile) => (
            <button
              key={tile.key}
              className={`greek-ex-match-tile ${tileState(tile.key, tile.letterId)}`}
              onClick={() => handlePick('name', tile)}
              disabled={matchedIds.has(tile.letterId)}
            >
              {tile.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
