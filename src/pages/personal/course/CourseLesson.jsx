import { useMemo } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ListChecks, Type, SpellCheck, BookOpen, Headphones, Lock, Check } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useWords } from '../../../hooks/useWords';
import { useLessonProgress } from '../../../hooks/useLessonProgress';
import { getCourseCatalog } from '../../../data/coursesCatalog';
import WordsStage from './stages/WordsStage';
import GrammarStage from './stages/GrammarStage';
import ReadingStage from './stages/ReadingStage';
import ListeningStage from './stages/ListeningStage';
import './stages/CourseStages.css';

const MASTERY_DONE_THRESHOLD = 80;

const STAGES = [
  { key: 'words', icon: Type, labelKey: 'course.stageWords' },
  { key: 'grammar', icon: SpellCheck, labelKey: 'course.stageGrammar' },
  { key: 'reading', icon: BookOpen, labelKey: 'course.stageReading' },
  { key: 'listening', icon: Headphones, labelKey: 'course.stageListening' },
];

export default function CourseLesson() {
  const { pack } = useOutletContext();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const unitTitle = searchParams.get('unit');
  const stageKey = searchParams.get('stage');
  const catalog = getCourseCatalog(pack.courseId);
  const months = catalog?.data?.months || [];

  const { words } = useWords('packs', pack.id);
  const { progress, markStageDone } = useLessonProgress(pack.id);

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

  const unitWords = words.filter((w) => w.topic === unit.title);
  const wordsDone = unitWords.length > 0 && unitWords.every((w) => (w.mastery || 0) >= MASTERY_DONE_THRESHOLD);
  const grammarDone = Boolean(progress?.[unit.id]?.grammar?.done);
  const readingDone = Boolean(progress?.[unit.id]?.reading?.done);
  const listeningDone = Boolean(progress?.[unit.id]?.listening?.done);

  const stageDone = { words: wordsDone, grammar: grammarDone, reading: readingDone, listening: listeningDone };
  const stageUnlocked = {
    words: true,
    grammar: wordsDone,
    reading: grammarDone,
    listening: readingDone,
  };

  const goToStageList = () => setSearchParams({ unit: unitTitle });
  const openStage = (key) => {
    if (!stageUnlocked[key]) return;
    setSearchParams({ unit: unitTitle, stage: key });
  };

  // A stage was requested via URL but isn't actually unlocked (e.g. a stale
  // link) — fall back to the stage list instead of rendering it.
  const activeStage = stageKey && stageUnlocked[stageKey] ? stageKey : null;

  if (activeStage) {
    return (
      <div className="course-lesson-view">
        <button type="button" className="course-lesson-back" onClick={goToStageList}>
          <ListChecks size={14} /> {t('course.backToStages')}
        </button>
        <h2 className="course-lesson-title">
          {unit.title} · {t(STAGES.find((s) => s.key === activeStage).labelKey)}
        </h2>

        {activeStage === 'words' && <WordsStage pack={pack} unit={unit} />}
        {activeStage === 'grammar' && (
          <GrammarStage pack={pack} unit={unit} onComplete={(data) => markStageDone(unit.id, 'grammar', data)} />
        )}
        {activeStage === 'reading' && (
          <ReadingStage unit={unit} onComplete={(data) => markStageDone(unit.id, 'reading', data)} />
        )}
        {activeStage === 'listening' && (
          <ListeningStage unit={unit} onComplete={(data) => markStageDone(unit.id, 'listening', data)} />
        )}
      </div>
    );
  }

  return (
    <div className="course-lesson-view">
      <button type="button" className="course-lesson-back" onClick={() => setSearchParams({})}>
        <ListChecks size={14} /> {t('course.allUnits')}
      </button>
      <h2 className="course-lesson-title">{unit.title}</h2>

      <div className="course-stage-list">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          const unlocked = stageUnlocked[stage.key];
          const done = stageDone[stage.key];
          return (
            <div
              key={stage.key}
              className={`course-stage-row ${unlocked ? '' : 'locked'} ${done ? 'done' : ''}`}
              onClick={() => openStage(stage.key)}
              role="button"
              tabIndex={unlocked ? 0 : -1}
            >
              <div className="course-stage-row-icon">
                {done ? <Check size={18} /> : unlocked ? <Icon size={18} /> : <Lock size={16} />}
              </div>
              <div className="course-stage-row-label">{t(stage.labelKey)}</div>
              {unlocked && <ChevronRight size={15} className="course-unit-arrow" />}
            </div>
          );
        })}
      </div>

      <div className="course-lesson-nav">
        {prevUnit ? (
          <button type="button" className="course-lesson-nav-btn" onClick={() => setSearchParams({ unit: prevUnit.title })}>
            <ChevronLeft size={15} /> {t('read.prevPage')}
          </button>
        ) : <span />}

        {nextUnit ? (
          <button type="button" className="course-lesson-nav-btn" onClick={() => setSearchParams({ unit: nextUnit.title })}>
            {t('read.nextPage')} <ChevronRight size={15} />
          </button>
        ) : <span />}
      </div>
    </div>
  );
}
