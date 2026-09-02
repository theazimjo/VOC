import { ArrowRight } from 'lucide-react';
import './GreekStepCursive.css';

// Introduces the letter's handwritten ("yozma") form next to the printed
// ("bosma") form it already saw in GreekStepTeach — this is the only place
// the cursive glyph is first shown, right before the practice round starts
// quizzing print<->cursive recognition.
export default function GreekStepCursive({ letter, onNext }) {
  return (
    <div className="greek-step-cursive">
      <div className="greek-step-cursive-title">Bosma va yozma shakllari</div>
      <div className="greek-step-cursive-row">
        <div className="greek-step-cursive-card">
          <span className="greek-step-cursive-glyph print">{letter.upper}{letter.lower}</span>
          <span className="greek-step-cursive-label">Bosma</span>
        </div>
        <div className="greek-step-cursive-card">
          <span className="greek-step-cursive-glyph cursive">{letter.upper}{letter.lower}</span>
          <span className="greek-step-cursive-label">Yozma</span>
        </div>
      </div>
      <p className="greek-step-cursive-hint">
        Kitob va ekranlarda bosma shakl ishlatiladi, qo'lda yozganda esa yozma shaklga o'xshab chiqadi.
      </p>
      <button className="greek-step-cursive-next" onClick={onNext}>
        Davom etish <ArrowRight size={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}
