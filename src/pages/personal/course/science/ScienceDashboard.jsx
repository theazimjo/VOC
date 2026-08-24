import { useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Sparkles } from 'lucide-react';
import { useLessonProgress } from '../../../../hooks/useLessonProgress';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { SCIENCE_CHAPTERS, getChapterTitle, getChapterBatches } from '../../../../data/scienceCourse';
import './ScienceCourse.css';

const RING_SIZE = 64;
const RING_STROKE = 6;

export default function ScienceDashboard() {
  const { pack } = useOutletContext();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { progress } = useLessonProgress(pack.id);

  const chapterStats = useMemo(() => SCIENCE_CHAPTERS.map((ch) => {
    const { batches } = getChapterBatches(ch.topic);
    const cp = progress?.[ch.id] || {};
    const doneBatches = batches.filter((b) => Boolean(cp[`batch${b.index}-vocab`]?.done)).length;
    return { ...ch, totalBatches: batches.length, doneBatches, done: batches.length > 0 && doneBatches === batches.length };
  }), [progress]);

  const totalBatches = chapterStats.reduce((sum, c) => sum + c.totalBatches, 0);
  const doneBatches = chapterStats.reduce((sum, c) => sum + c.doneBatches, 0);
  const overallPercent = totalBatches ? Math.round((doneBatches / totalBatches) * 100) : 0;
  const firstIncompleteChapter = chapterStats.find((c) => !c.done) || null;

  const ringRadius = (RING_SIZE - RING_STROKE) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (overallPercent / 100) * ringCircumference;

  const goToChapter = (ch) => {
    const { batches } = getChapterBatches(ch.topic);
    const cp = progress?.[ch.id] || {};
    const idx = batches.findIndex((b) => !cp[`batch${b.index}-vocab`]?.done);
    const batchIndex = idx === -1 ? Math.max(0, batches.length - 1) : idx;
    navigate(`/course/${pack.id}/lesson?chapter=${encodeURIComponent(ch.topic)}&batch=${batchIndex}`);
  };

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
            <circle className="course-progress-ring-track" cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={ringRadius} strokeWidth={RING_STROKE} fill="none" />
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
          <div className="course-progress-sub">{t('course.scienceBatchesDone', { count: doneBatches, total: totalBatches })}</div>
        </div>
      </div>

      {firstIncompleteChapter && (
        <button type="button" className="course-continue-btn" onClick={() => goToChapter(firstIncompleteChapter)}>
          <span>{t('course.continueBtn')}: {getChapterTitle(firstIncompleteChapter.topic)}</span>
          <ChevronRight size={16} />
        </button>
      )}

      <div className="course-months">
        <div className="course-month">
          <div className="course-month-title">{t('course.scienceChaptersLabel')}</div>
          <div className="course-unit-list">
            {chapterStats.map((ch) => (
              <div className={`course-unit-row ${ch.done ? 'done' : ''}`} key={ch.id} onClick={() => goToChapter(ch)}>
                <div className="course-unit-check">{ch.done && <Check size={13} />}</div>
                <div className="course-unit-name">{getChapterTitle(ch.topic)}</div>
                <ChevronRight size={15} className="course-unit-arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
