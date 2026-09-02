import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakGreekVocab } from '../../utils/greekSpeech';
import './GreekVocabFlashcard.css';

// Flip-through review, same shape as the main app's Practice/Flashcard.jsx:
// tap to flip and see the meaning, then self-report "Bilmayman" / "Bilaman"
// to move on. Pure exposure — no scoring here, mastery is driven by the
// spelling stage that follows (see GreekVocabLearnFlow.jsx).
export default function GreekVocabFlashcard({ words, onComplete }) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const word = words[index];

  const handleAdvance = () => {
    if (index < words.length - 1) {
      setIndex((i) => i + 1);
      setIsFlipped(false);
    } else {
      onComplete();
    }
  };

  const isLast = index === words.length - 1;

  return (
    <div className="greek-vocab-flashcard">
      <div className="greek-vocab-flashcard-progress">{index + 1} / {words.length}</div>

      <div
        className="greek-vocab-flashcard-scene"
        onClick={() => setIsFlipped((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsFlipped((v) => !v)}
      >
        <div className={`greek-vocab-flashcard-card ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="greek-vocab-flashcard-face greek-vocab-flashcard-front">
            <button
              className="greek-vocab-flashcard-speak-btn"
              onClick={(e) => { e.stopPropagation(); speakGreekVocab(word.id, word.translit); }}
            >
              <Volume2 size={18} strokeWidth={2.2} />
            </button>
            <div className="greek-vocab-flashcard-word">{word.greek}</div>
            <div className="greek-vocab-flashcard-hint">Ochish uchun bosing</div>
          </div>
          <div className="greek-vocab-flashcard-face greek-vocab-flashcard-back">
            <div className="greek-vocab-flashcard-translit">[{word.translit}]</div>
            <div className="greek-vocab-flashcard-meaning">{word.uz}</div>
          </div>
        </div>
      </div>

      <div className={`greek-vocab-flashcard-actions ${isFlipped ? '' : 'hidden'}`}>
        <button className="greek-vocab-flashcard-btn again" onClick={handleAdvance}>Bilmayman</button>
        <button className="greek-vocab-flashcard-btn know" onClick={handleAdvance}>
          {isLast ? 'Bilaman, davom etish' : 'Bilaman'}
        </button>
      </div>
    </div>
  );
}
