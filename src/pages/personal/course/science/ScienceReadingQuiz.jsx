import { BookOpen } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { getBatchTest } from '../../../../data/scienceCourse';
import MiniQuiz from '../stages/MiniQuiz';

const QUIZ_PASS_RATIO = 0.7;

// Reading-comprehension check over the batch's own 6 pages. Chapters/batches
// without authored questions yet fall back to a "coming soon" continue
// screen instead of blocking the flow.
export default function ScienceReadingQuiz({ topic, batchIndex, onFinish }) {
  const { t } = useLanguage();
  const test = getBatchTest(topic, batchIndex);

  if (!test?.reading?.questions?.length) {
    return (
      <div className="course-stage-view">
        <h3 className="course-stage-subheading"><BookOpen size={18} /> {t('course.readingQuizTitle')}</h3>
        <div className="science-coming-soon">{t('course.scienceTestComingSoon')}</div>
        <button type="button" className="course-stage-primary-btn" onClick={() => onFinish({ passed: true, skipped: true })}>
          {t('course.scienceContinueToTest')}
        </button>
      </div>
    );
  }

  const handleFinish = (result) => {
    if (result.passed) onFinish({ passed: true, score: result.correct, total: result.total });
  };

  return (
    <div className="course-stage-view">
      <h3 className="course-stage-subheading"><BookOpen size={18} /> {t('course.readingQuizTitle')}</h3>
      <MiniQuiz questions={test.reading.questions} passRatio={QUIZ_PASS_RATIO} onFinish={handleFinish} />
    </div>
  );
}
