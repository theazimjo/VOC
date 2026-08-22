import { useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, Sparkles } from 'lucide-react';
import { useWords } from '../../../hooks/useWords';
import { useLessonProgress } from '../../../hooks/useLessonProgress';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getCourseCatalog } from '../../../data/coursesCatalog';

const MASTERY_DONE_THRESHOLD = 80;

export default function CourseDashboard() {
  const { pack } = useOutletContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { words } = useWords('packs', pack.id);
  const { progress } = useLessonProgress(pack.id);
  const catalog = getCourseCatalog(pack.courseId);
  const months = catalog?.data?.months || [];

  // A unit is only fully done once its last stage (Listening) is passed —
  // word mastery alone just unlocks Grammar, see CourseLesson's gating.
  const isUnitDone = (unit) => Boolean(progress?.[unit.id]?.listening?.done);

  const firstIncompleteUnit = useMemo(() => {
    for (const month of months) {
      for (const unit of month.units) {
        if (!isUnitDone(unit)) return unit;
      }
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [months, progress]);

  if (!catalog || months.length === 0) {
    return <div className="course-empty">{t('course.noData')}</div>;
  }

  const masteredCount = words.filter((w) => (w.mastery || 0) >= MASTERY_DONE_THRESHOLD).length;
  const overallPercent = words.length ? Math.round((masteredCount / words.length) * 100) : 0;

  const RING_SIZE = 64;
  const RING_STROKE = 6;
  const ringRadius = (RING_SIZE - RING_STROKE) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (overallPercent / 100) * ringCircumference;

  return (
    <div className="course-dashboard">
      <div className="course-progress-card">
        <Sparkles size={72} className="course-progress-card-deco" />
        <div className="course-progress-ring">
          <svg viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
            <defs>
              <linearGradient id="course-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--course-cta-1)" />
                <stop offset="100%" stopColor="var(--course-cta-2)" />
              </linearGradient>
            </defs>
            <circle
              className="course-progress-ring-track"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={ringRadius}
              strokeWidth={RING_STROKE}
              fill="none"
            />
            <circle
              className="course-progress-ring-fill"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={ringRadius}
              strokeWidth={RING_STROKE}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
              transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            />
          </svg>
          <span className="course-progress-ring-label">{overallPercent}%</span>
        </div>
        <div className="course-progress-info">
          <div className="course-progress-title">{pack.name}</div>
          <div className="course-progress-sub">
            {t('course.wordsMastered', { count: masteredCount, total: words.length })}
          </div>
        </div>
      </div>

      {firstIncompleteUnit && (
        <button
          type="button"
          className="course-continue-btn"
          onClick={() => navigate(`/course/${pack.id}/lesson?unit=${encodeURIComponent(firstIncompleteUnit.title)}`)}
        >
          <span>{t('course.continueBtn')}: {firstIncompleteUnit.title}</span>
          <ChevronRight size={16} />
        </button>
      )}

      <div className="course-months">
        {months.map((month) => (
          <div className="course-month" key={month.id}>
            <div className="course-month-title">{month.title}</div>
            <div className="course-unit-list">
              {month.units.map((unit) => {
                const done = isUnitDone(unit);
                return (
                  <div
                    className={`course-unit-row ${done ? 'done' : ''}`}
                    key={unit.id}
                    onClick={() => navigate(`/course/${pack.id}/lesson?unit=${encodeURIComponent(unit.title)}`)}
                  >
                    <div className="course-unit-check">{done && <Check size={13} />}</div>
                    <div className="course-unit-name">{unit.title}</div>
                    <ChevronRight size={15} className="course-unit-arrow" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
