import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakGreekClip } from '../../utils/greekSpeech';
import './GreekLetterCard.css';

// `mastery` is undefined for a letter the learner hasn't reached yet via
// GreekLearnFlow (shown as a locked/dim tile with no %); 0-100 once
// introduced, driven entirely by practice-round results — there's no
// manual "mark as learned" toggle here anymore.
export default function GreekLetterCard({ letter, mastery }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isIntroduced = mastery !== undefined;

  const handleSpeakName = (e) => {
    e.stopPropagation();
    speakGreekClip(letter.id, 'name', letter.nameLatin);
  };

  const handleSpeakExample = (e) => {
    e.stopPropagation();
    speakGreekClip(letter.id, 'example', letter.example.translit);
  };

  return (
    <div
      className="greek-card-scene"
      onClick={() => setIsFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped((v) => !v)}
    >
      <div className={`greek-card ${isFlipped ? 'is-flipped' : ''} ${!isIntroduced ? 'is-locked' : ''}`}>
        {/* Front */}
        <div className="greek-card-face greek-card-front">
          <span className={`greek-card-type-dot greek-card-type-${letter.type}`} />
          <div className="greek-card-glyphs">
            <span className="greek-card-glyph-upper">{letter.upper}</span>
            <span className="greek-card-glyph-lower">
              {letter.lower}{letter.finalLower ? `/${letter.finalLower}` : ''}
            </span>
          </div>
          <div className="greek-card-name-latin">{letter.nameLatin}</div>
          {isIntroduced ? (
            <div className="greek-card-mastery">
              <div className="greek-card-mastery-track">
                <div className="greek-card-mastery-fill" style={{ width: `${mastery}%` }} />
              </div>
              <span className="greek-card-mastery-pct">{mastery}%</span>
            </div>
          ) : (
            <span className="greek-card-mastery-pending">o'rganilmagan</span>
          )}
          <button className="greek-card-speak-btn" onClick={handleSpeakName} title="Nomini eshitish">
            <Volume2 size={15} strokeWidth={2.2} />
          </button>
        </div>

        {/* Back */}
        <div className="greek-card-face greek-card-back">
          <div className="greek-card-back-names">
            <span className="greek-card-back-name-greek">{letter.nameGreek}</span>
            <span className="greek-card-back-name-uz">{letter.nameUz}</span>
          </div>
          <div className="greek-card-back-forms">
            <span className="greek-card-back-form-glyph">{letter.upper}{letter.lower}</span>
            <span className="greek-card-back-form-glyph cursive">{letter.upper}{letter.lower}</span>
          </div>
          <div className="greek-card-back-ipa">{letter.ipa}</div>
          <div className="greek-card-back-example">
            <span className="greek-card-back-example-word">{letter.example.greek}</span>
            <span className="greek-card-back-example-translit">[{letter.example.translit}]</span>
            <span className="greek-card-back-example-uz">— {letter.example.uz}</span>
            <button className="greek-card-back-speak-btn" onClick={handleSpeakExample} title="Misolni eshitish">
              <Volume2 size={13} strokeWidth={2.2} />
            </button>
          </div>
          {letter.note && <div className="greek-card-back-note">💡 {letter.note}</div>}
        </div>
      </div>
    </div>
  );
}
