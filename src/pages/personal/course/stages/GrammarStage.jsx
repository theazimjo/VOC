import { useState, useMemo } from 'react';
import { grammarData } from '../../../../data/grammarData';
import { parseGuide } from '../../../../utils/grammarGuideParser';
import { GuideBlocks } from '../../../../components/grammar/GuideRenderer';
import SentenceBuilder from '../../../../components/Practice/SentenceBuilder';
import { useLanguage } from '../../../../contexts/LanguageContext';
import MiniQuiz from './MiniQuiz';
import '../../../grammar/GrammarGuide.css';

const QUIZ_QUESTION_COUNT = 8;
const QUIZ_PASS_RATIO = 0.75;
const SENTENCE_PASS_RATIO = 0.7;

// Second stage: the "normal sentence structure" grammar guide, a multiple-
// choice quiz on it, then writing original sentences with this unit's own
// words (SentenceBuilder) — two different exercise types, both required.
export default function GrammarStage({ pack, unit, onComplete }) {
  const { t } = useLanguage();
  const [step, setStep] = useState('guide'); // 'guide' | 'quiz' | 'sentence'
  const [sentenceResult, setSentenceResult] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const topic = grammarData.beginner.topics.find((tp) => tp.id === 'sentence-structure');
  const blocks = useMemo(() => parseGuide(topic?.guide), [topic]);
  const quizQuestions = useMemo(
    () => (topic?.questions || []).slice(0, QUIZ_QUESTION_COUNT),
    [topic]
  );

  const handleQuizFinish = (result) => {
    if (result.passed) setStep('sentence');
  };

  const handleSentenceComplete = (result) => {
    const passed = result.totalWords > 0 && result.correctCount / result.totalWords >= SENTENCE_PASS_RATIO;
    setSentenceResult({ ...result, passed });
    if (passed) onComplete({ score: result.correctCount, total: result.totalWords });
  };

  const retrySentences = () => {
    setSentenceResult(null);
    setAttempt((a) => a + 1);
  };

  return (
    <div className="course-stage-view">
      {step === 'guide' && (
        <>
          <div className="gg-body course-stage-guide">
            <GuideBlocks blocks={blocks} />
          </div>
          <button type="button" className="course-stage-primary-btn" onClick={() => setStep('quiz')}>
            {t('course.startGrammarQuiz')}
          </button>
        </>
      )}

      {step === 'quiz' && (
        <>
          <h3 className="course-stage-subheading">{t('course.grammarQuizTitle')}</h3>
          <MiniQuiz questions={quizQuestions} passRatio={QUIZ_PASS_RATIO} onFinish={handleQuizFinish} />
        </>
      )}

      {step === 'sentence' && (
        <>
          <h3 className="course-stage-subheading">{t('course.sentenceExerciseTitle')}</h3>
          {!sentenceResult && (
            <SentenceBuilder
              key={attempt}
              words={unit.words}
              language={pack.language || 'en-US'}
              onComplete={handleSentenceComplete}
              onUpdateWord={() => {}}
            />
          )}
          {sentenceResult && !sentenceResult.passed && (
            <div className="mini-quiz-result failed">
              <div className="mini-quiz-result-icon">🔁</div>
              <div className="mini-quiz-result-score">
                {sentenceResult.correctCount} / {sentenceResult.totalWords}
              </div>
              <div className="mini-quiz-result-msg">{t('course.quizFailed')}</div>
              <button type="button" className="course-stage-primary-btn" onClick={retrySentences}>
                {t('course.tryAgain')}
              </button>
            </div>
          )}
          {sentenceResult && sentenceResult.passed && (
            <div className="course-stage-unlocked-msg">{t('course.stageGrammarDone')}</div>
          )}
        </>
      )}
    </div>
  );
}
