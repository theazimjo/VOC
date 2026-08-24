import { useOutletContext, useSearchParams } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useLessonProgress } from '../../../../hooks/useLessonProgress';
import { SCIENCE_CHAPTERS, getChapterTitle, getChapterBatches } from '../../../../data/scienceCourse';
import ScienceBatchFlow from './ScienceBatchFlow';
import './ScienceCourse.css';

// Science's lesson route: a chapter list (no ?chapter=) or the batch flow
// for one chapter (?chapter=&batch=). Batches within an opened chapter are
// soft-gated — the requested `batch` is clamped to the first incomplete one
// so a stale/tampered URL can't skip ahead, but chapters themselves stay
// always-browsable like Essential 3000's units.
export default function ScienceLesson() {
  const { pack } = useOutletContext();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { progress } = useLessonProgress(pack.id);

  const isChapterDone = (chapterId, topic) => {
    const { batches } = getChapterBatches(topic);
    if (batches.length === 0) return false;
    const cp = progress?.[chapterId] || {};
    return batches.every((b) => Boolean(cp[`batch${b.index}-vocab`]?.done));
  };

  const firstIncompleteBatchIndex = (chapterId, topic) => {
    const { batches } = getChapterBatches(topic);
    const cp = progress?.[chapterId] || {};
    const idx = batches.findIndex((b) => !cp[`batch${b.index}-vocab`]?.done);
    return idx === -1 ? Math.max(0, batches.length - 1) : idx;
  };

  const chapterTopic = searchParams.get('chapter');

  if (!chapterTopic) {
    return (
      <div className="course-lesson-toc">
        {SCIENCE_CHAPTERS.map((ch) => {
          const done = isChapterDone(ch.id, ch.topic);
          return (
            <div
              className={`course-unit-row ${done ? 'done' : ''}`}
              key={ch.id}
              onClick={() => setSearchParams({ chapter: ch.topic, batch: String(firstIncompleteBatchIndex(ch.id, ch.topic)) })}
            >
              <div className="course-unit-check">{done && <Check size={13} />}</div>
              <div className="course-unit-name">{getChapterTitle(ch.topic)}</div>
              <ChevronRight size={15} className="course-unit-arrow" />
            </div>
          );
        })}
      </div>
    );
  }

  const chapter = SCIENCE_CHAPTERS.find((c) => c.topic === chapterTopic);
  if (!chapter) return <div className="course-empty">{t('course.noData')}</div>;

  const { batches, wrapUpPageIndices } = getChapterBatches(chapterTopic);
  if (batches.length === 0) return <div className="course-empty">{t('course.noData')}</div>;

  const done = isChapterDone(chapter.id, chapterTopic);
  const requestedBatch = parseInt(searchParams.get('batch') || '0', 10) || 0;
  const maxAllowedBatch = done ? batches.length - 1 : firstIncompleteBatchIndex(chapter.id, chapterTopic);
  const clampedBatch = Math.max(0, Math.min(requestedBatch, maxAllowedBatch, batches.length - 1));
  const batch = batches[clampedBatch];

  const goToChapters = () => setSearchParams({});
  const advanceBatch = () => setSearchParams({ chapter: chapterTopic, batch: String(clampedBatch + 1) });

  return (
    <div className="course-lesson-view">
      <button type="button" className="course-lesson-back" onClick={goToChapters}>
        {t('course.allUnits')}
      </button>
      <h2 className="course-lesson-title">
        {getChapterTitle(chapterTopic)} · {t('course.scienceBatchLabel', { current: clampedBatch + 1, total: batches.length })}
      </h2>

      <ScienceBatchFlow
        key={`${chapterTopic}-${clampedBatch}`}
        pack={pack}
        chapterId={chapter.id}
        topic={chapterTopic}
        batch={batch}
        isLastBatch={clampedBatch === batches.length - 1}
        wrapUpPageIndices={wrapUpPageIndices}
        onAdvanceBatch={advanceBatch}
        onExitToChapters={goToChapters}
      />
    </div>
  );
}
