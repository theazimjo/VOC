import { useMemo } from 'react';
import { useOutletContext, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ListChecks } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getCourseCatalog } from '../../../data/coursesCatalog';

export default function CourseLesson() {
  const { pack } = useOutletContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const unitTitle = searchParams.get('unit');
  const catalog = getCourseCatalog(pack.courseId);
  const months = catalog?.data?.months || [];

  const flatUnits = useMemo(() => {
    return months.flatMap((m) => m.units);
  }, [months]);

  if (!catalog || months.length === 0) {
    return <div className="course-empty">{t('course.noData')}</div>;
  }

  if (!unitTitle) {
    return (
      <div className="course-lesson-toc">
        {months.map((month) => (
          <div className="course-month" key={month.id}>
            <div className="course-month-title">{month.title}</div>
            <div className="course-unit-list">
              {month.units.map((unit) => (
                <div
                  className="course-unit-row"
                  key={unit.id}
                  onClick={() => setSearchParams({ unit: unit.title })}
                >
                  <div className="course-unit-name">{unit.title}</div>
                  <ChevronRight size={15} className="course-unit-arrow" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const currentIndex = flatUnits.findIndex((u) => u.title === unitTitle);
  const unit = flatUnits[currentIndex];
  const prevUnit = flatUnits[currentIndex - 1];
  const nextUnit = flatUnits[currentIndex + 1];

  if (!unit) {
    return <div className="course-empty">{t('course.noData')}</div>;
  }

  return (
    <div className="course-lesson-view">
      <button type="button" className="course-lesson-back" onClick={() => setSearchParams({})}>
        <ListChecks size={14} /> {t('course.allUnits')}
      </button>
      <h2 className="course-lesson-title">{unit.title}</h2>

      <div className="course-lesson-words">
        {unit.words.map((w) => (
          <div className="course-lesson-word-card" key={w.id}>
            <div className="course-lesson-word-row">
              <span className="course-lesson-word">{w.word}</span>
              <span className="course-lesson-translation">{w.translation}</span>
            </div>
            {w.definition && <div className="course-lesson-definition">{w.definition}</div>}
            {w.example && <div className="course-lesson-example">{w.example}</div>}
          </div>
        ))}
      </div>

      <div className="course-lesson-nav">
        {prevUnit ? (
          <button type="button" className="course-lesson-nav-btn" onClick={() => setSearchParams({ unit: prevUnit.title })}>
            <ChevronLeft size={15} /> {t('read.prevPage')}
          </button>
        ) : <span />}

        <button
          type="button"
          className="course-lesson-practice-btn"
          onClick={() => navigate(`/practice/packs/${pack.id}?topic=${encodeURIComponent(unit.title)}`)}
        >
          {t('course.practiceUnit')}
        </button>

        {nextUnit ? (
          <button type="button" className="course-lesson-nav-btn" onClick={() => setSearchParams({ unit: nextUnit.title })}>
            {t('read.nextPage')} <ChevronRight size={15} />
          </button>
        ) : <span />}
      </div>
    </div>
  );
}
