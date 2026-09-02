import { Volume2 } from 'lucide-react';
import { speakGreekVocab } from '../../utils/greekSpeech';
import './GreekVocabWordCard.css';

// A single vocabulary word tile — simpler than GreekLetterCard (no flip):
// everything worth showing for one word (Greek form, transliteration,
// Uzbek meaning, mastery) fits on one face without feeling cluttered.
export default function GreekVocabWordCard({ word, mastery }) {
  const isIntroduced = mastery !== undefined;

  return (
    <div className={`greek-vocab-card ${!isIntroduced ? 'is-locked' : ''}`}>
      <div className="greek-vocab-card-top">
        <div>
          <div className="greek-vocab-card-word">{word.greek}</div>
          <div className="greek-vocab-card-translit">[{word.translit}]</div>
        </div>
        <button
          className="greek-vocab-card-speak-btn"
          onClick={() => speakGreekVocab(word.id, word.translit)}
          title="Eshitish"
        >
          <Volume2 size={14} strokeWidth={2.2} />
        </button>
      </div>
      <div className="greek-vocab-card-meaning">{word.uz}</div>
      {isIntroduced ? (
        <div className="greek-vocab-card-mastery">
          <div className="greek-vocab-card-mastery-track">
            <div className="greek-vocab-card-mastery-fill" style={{ width: `${mastery}%` }} />
          </div>
          <span className="greek-vocab-card-mastery-pct">{mastery}%</span>
        </div>
      ) : (
        <span className="greek-vocab-card-mastery-pending">o'rganilmagan</span>
      )}
    </div>
  );
}
