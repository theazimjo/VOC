import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useWords } from '../../../../hooks/useWords';
import { useLanguage } from '../../../../contexts/LanguageContext';

const MASTERY_DONE_THRESHOLD = 80;

// First stage of a lesson: the unit's word list, seeded into the user's
// real word bank (topic-tagged) on first visit so the existing SRS/mastery
// engine and practice modes just work — this stage is "done" once every
// word in the unit has crossed the mastery threshold.
export default function WordsStage({ pack, unit }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { words, loading, bulkAddWords } = useWords('packs', pack.id);
  const seedAttempted = useRef(false);

  const unitWords = words.filter((w) => w.topic === unit.title);

  useEffect(() => {
    if (loading || seedAttempted.current) return;
    if (unitWords.length > 0) return;
    seedAttempted.current = true;
    bulkAddWords(unit.words.map((w) => ({ ...w, topic: unit.title })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, unitWords.length]);

  const masteredCount = unitWords.filter((w) => (w.mastery || 0) >= MASTERY_DONE_THRESHOLD).length;
  const allMastered = unitWords.length > 0 && masteredCount === unitWords.length;

  return (
    <div className="course-stage-view">
      <div className="course-stage-progress-bar">
        <div className="course-stage-progress-label">
          {t('course.wordsMastered', { count: masteredCount, total: unitWords.length })}
        </div>
        <div className="course-stage-progress-track">
          <div
            className="course-stage-progress-fill"
            style={{ width: unitWords.length ? `${(masteredCount / unitWords.length) * 100}%` : '0%' }}
          />
        </div>
      </div>

      <div className="course-lesson-words">
        {unitWords.map((w) => {
          const mastered = (w.mastery || 0) >= MASTERY_DONE_THRESHOLD;
          return (
            <div className={`course-lesson-word-card ${mastered ? 'mastered' : ''}`} key={w.id}>
              <div className="course-lesson-word-row">
                <span className="course-lesson-word">{w.word}</span>
                <span className="course-lesson-translation">{w.translation}</span>
                {mastered && <Check size={16} className="course-word-mastered-icon" />}
              </div>
              {w.definition && <div className="course-lesson-definition">{w.definition}</div>}
              {w.example && <div className="course-lesson-example">{w.example}</div>}
            </div>
          );
        })}
      </div>

      {allMastered ? (
        <div className="course-stage-unlocked-msg">{t('course.stageWordsDone')}</div>
      ) : (
        <button
          type="button"
          className="course-lesson-practice-btn"
          onClick={() => navigate(
            `/practice/packs/${pack.id}?topic=${encodeURIComponent(unit.title)}`,
            { state: { pack } }
          )}
        >
          {t('course.practiceUnit')}
        </button>
      )}
    </div>
  );
}
