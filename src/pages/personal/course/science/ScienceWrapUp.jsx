import { useState } from 'react';
import { Eye, EyeOff, PartyPopper } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { scienceChapterText } from '../../../../data/scienceChapterText';

function ReviewItem({ item }) {
  const { t } = useLanguage();
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="science-review-item">
      <div className="science-review-prompt">{item.prompt}</div>
      {item.answer && (
        <button type="button" className="science-review-toggle" onClick={() => setRevealed((r) => !r)}>
          {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
          {revealed ? t('read.hideAnswer') : t('read.showAnswer')}
        </button>
      )}
      {item.answer && revealed && <div className="science-review-answer">{item.answer}</div>}
    </div>
  );
}

// One-time recap shown after a chapter's last batch: the book's own
// end-of-chapter summary bullets and review questions (reveal-on-tap, not
// scored — the scored comprehension/vocabulary checks already happened
// per-batch during the chapter).
export default function ScienceWrapUp({ topic, pageIndices, onFinish }) {
  const { t } = useLanguage();
  const chapter = scienceChapterText[topic];
  const pages = pageIndices.map((idx) => chapter?.pages[idx] || []);

  return (
    <div className="course-stage-view">
      <h3 className="course-stage-subheading"><PartyPopper size={18} /> {t('course.scienceChapterDone')}</h3>

      {pages.map((page, pIdx) =>
        page.map((block, bIdx) => {
          if (block.type === 'summary') {
            return (
              <div className="science-summary-item" key={`${pIdx}-${bIdx}`}>{block.text}</div>
            );
          }
          if (block.type === 'review') {
            return (
              <div className="science-review-card" key={`${pIdx}-${bIdx}`}>
                {block.sections.map((section, sIdx) => (
                  <div className="science-review-section" key={sIdx}>
                    <h4 className="science-review-heading">{section.heading}</h4>
                    {section.instructions && <p className="science-review-instructions">{section.instructions}</p>}
                    {section.items.map((item, iIdx) => (
                      <ReviewItem item={item} key={iIdx} />
                    ))}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })
      )}

      <button type="button" className="course-stage-primary-btn" onClick={onFinish}>
        {t('course.scienceBackToChapters')}
      </button>
    </div>
  );
}
