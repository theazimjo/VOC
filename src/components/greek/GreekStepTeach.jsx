import { useEffect } from 'react';
import { Volume2, ArrowRight } from 'lucide-react';
import { speakGreekClip } from '../../utils/greekSpeech';
import './GreekStepTeach.css';

// "Show it first" — the very first thing the learner sees for a brand-new
// letter, before any quizzing: its printed glyph, name, and an example word
// in context, with audio played automatically on arrival.
export default function GreekStepTeach({ letter, onNext }) {
  useEffect(() => {
    const t = setTimeout(() => speakGreekClip(letter.id, 'name', letter.nameLatin), 300);
    return () => clearTimeout(t);
  }, [letter]);

  return (
    <div className="greek-step-teach">
      <div className="greek-step-teach-badge">Yangi harf</div>
      <div className="greek-step-teach-glyph-row">
        <span className="greek-step-teach-glyph">{letter.upper}{letter.lower}</span>
        <button
          className="greek-step-teach-speak-btn"
          onClick={() => speakGreekClip(letter.id, 'name', letter.nameLatin)}
        >
          <Volume2 size={22} strokeWidth={2} />
        </button>
      </div>
      <div className="greek-step-teach-name">{letter.nameGreek} <span>({letter.nameLatin})</span></div>
      <div className="greek-step-teach-ipa">{letter.ipa}</div>

      <button
        className="greek-step-teach-example"
        onClick={() => speakGreekClip(letter.id, 'example', letter.example.translit)}
      >
        <div className="greek-step-teach-example-word">
          {letter.example.greek} <Volume2 size={14} strokeWidth={2.2} />
        </div>
        <div className="greek-step-teach-example-meaning">
          [{letter.example.translit}] — {letter.example.uz}
        </div>
      </button>

      {letter.note && <div className="greek-step-teach-note">💡 {letter.note}</div>}

      <button className="greek-step-teach-next" onClick={onNext}>
        Davom etish <ArrowRight size={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}
