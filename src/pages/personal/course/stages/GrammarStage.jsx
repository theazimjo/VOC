import { useLanguage } from '../../../../contexts/LanguageContext';
import MiniQuiz from './MiniQuiz';

const PASS_RATIO = 0.7;

// Second stage: simple word-usage exercises built from this unit's own 20
// words (definition matching + "which sentence makes better sense") —
// passing unlocks Reading.
export default function GrammarStage({ unit, onComplete }) {
  const { t } = useLanguage();

  const handleQuizFinish = (result) => {
    if (result.passed) onComplete({ score: result.correct, total: result.total });
  };

  return (
    <div className="course-stage-view">
      <h3 className="course-stage-subheading">{t('course.grammarQuizTitle')}</h3>
      <MiniQuiz questions={unit.grammar.questions} passRatio={PASS_RATIO} onFinish={handleQuizFinish} />
    </div>
  );
}
