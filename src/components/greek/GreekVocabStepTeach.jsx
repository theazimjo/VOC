import { useEffect } from 'react';
import { Volume2, ArrowRight } from 'lucide-react';
import { speakGreekVocab } from '../../utils/greekSpeech';
import './GreekVocabStepTeach.css';

// "Show it first" for a brand-new vocabulary word — its Greek form,
// transliteration and Uzbek meaning, with audio played automatically.
export default function GreekVocabStepTeach({ word, onNext }) {
  useEffect(() => {
    const t = setTimeout(() => speakGreekVocab(word.id, word.translit), 300);
    return () => clearTimeout(t);
  }, [word]);

  return (
    <div className="greek-vocab-step-teach">
      <div className="greek-vocab-step-teach-badge">Yangi so'z</div>
      <div className="greek-vocab-step-teach-word-row">
        <span className="greek-vocab-step-teach-word">{word.greek}</span>
        <button
          className="greek-vocab-step-teach-speak-btn"
          onClick={() => speakGreekVocab(word.id, word.translit)}
        >
          <Volume2 size={22} strokeWidth={2} />
        </button>
      </div>
      <div className="greek-vocab-step-teach-translit">[{word.translit}]</div>
      <div className="greek-vocab-step-teach-meaning">{word.uz}</div>

      <button className="greek-vocab-step-teach-next" onClick={onNext}>
        Davom etish <ArrowRight size={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}
