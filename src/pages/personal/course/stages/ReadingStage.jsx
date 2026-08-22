import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import MiniQuiz from './MiniQuiz';

const QUIZ_PASS_RATIO = 0.7;

// Third stage: the unit's story, paginated, followed by a comprehension
// quiz — passing it unlocks Listening.
export default function ReadingStage({ unit, onComplete }) {
  const { t } = useLanguage();
  const [pageIndex, setPageIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [direction, setDirection] = useState(1);

  const reading = unit.reading;
  const totalPages = reading.pages.length;
  const isLastPage = pageIndex >= totalPages - 1;
  const page = reading.pages[pageIndex];

  const handleQuizFinish = (result) => {
    if (result.passed) onComplete({ score: result.correct, total: result.total });
  };

  if (showQuiz) {
    return (
      <div className="course-stage-view">
        <h3 className="course-stage-subheading">{t('course.readingQuizTitle')}</h3>
        <MiniQuiz questions={reading.questions} passRatio={QUIZ_PASS_RATIO} onFinish={handleQuizFinish} />
      </div>
    );
  }

  return (
    <div className="course-stage-view">
      <h2 className="course-lesson-title">{reading.title}</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={pageIndex}
          className="course-reading-page"
          initial={{ opacity: 0, x: direction > 0 ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -16 : 16 }}
          transition={{ duration: 0.2 }}
        >
          {page.map((block, i) => {
            if (block.type === 'heading') {
              return <h3 key={i} className="course-reading-heading">{block.text}</h3>;
            }
            return <p key={i} className="course-reading-p">{block.text}</p>;
          })}
        </motion.div>
      </AnimatePresence>

      <div className="course-reading-nav">
        <button
          type="button"
          className="course-lesson-nav-btn"
          onClick={() => { setDirection(-1); setPageIndex((i) => i - 1); }}
          disabled={pageIndex === 0}
          style={{ visibility: pageIndex === 0 ? 'hidden' : 'visible' }}
        >
          <ChevronLeft size={15} /> {t('read.prevPage')}
        </button>

        <span className="course-reading-page-label">{pageIndex + 1} / {totalPages}</span>

        {isLastPage ? (
          <button type="button" className="course-lesson-practice-btn" onClick={() => setShowQuiz(true)}>
            {t('course.startReadingQuiz')}
          </button>
        ) : (
          <button
            type="button"
            className="course-lesson-nav-btn"
            onClick={() => { setDirection(1); setPageIndex((i) => i + 1); }}
          >
            {t('read.nextPage')} <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
