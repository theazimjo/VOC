import { useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
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

  return (
    <div className="course-dashboard">
      <div className="course-progress-card">
        <div className="course-progress-ring">{overallPercent}%</div>
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
