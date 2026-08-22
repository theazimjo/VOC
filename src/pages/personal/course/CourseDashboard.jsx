import { useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
import { useWords } from '../../../hooks/useWords';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getCourseCatalog } from '../../../data/coursesCatalog';

const MASTERY_DONE_THRESHOLD = 80;

export default function CourseDashboard() {
  const { pack } = useOutletContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { words } = useWords('packs', pack.id);
  const catalog = getCourseCatalog(pack.courseId);

  const wordsByUnit = useMemo(() => {
    const map = {};
    words.forEach((w) => {
      if (!w.topic) return;
      (map[w.topic] = map[w.topic] || []).push(w);
    });
    return map;
  }, [words]);

  const isUnitDone = (unitTitle) => {
    const unitWords = wordsByUnit[unitTitle] || [];
    return unitWords.length > 0 && unitWords.every((w) => (w.mastery || 0) >= MASTERY_DONE_THRESHOLD);
  };

  const firstIncompleteUnit = useMemo(() => {
    if (!catalog) return null;
    for (const month of catalog.data.months) {
      for (const unit of month.units) {
        if (!isUnitDone(unit.title)) return unit;
      }
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, wordsByUnit]);

  if (!catalog) {
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
        {catalog.data.months.map((month) => (
          <div className="course-month" key={month.id}>
            <div className="course-month-title">{month.title}</div>
            <div className="course-unit-list">
              {month.units.map((unit) => {
                const done = isUnitDone(unit.title);
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
