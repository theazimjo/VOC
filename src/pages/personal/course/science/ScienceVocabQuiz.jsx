import { useState, useEffect, useRef, useMemo } from 'react';
import { GraduationCap, RotateCcw } from 'lucide-react';
import { useWords } from '../../../../hooks/useWords';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { getChapterWords } from '../../../../data/scienceCourse';
import { shuffleArray } from '../../../../utils/helpers';
import QuizGame from '../../../../components/Practice/QuizGame';
import IosSpinner from '../../../../components/common/IosSpinner';

const QUIZ_PASS_RATIO = 0.7;
const MAX_QUESTIONS = 10;

// Word-to-translation quiz over the current chapter's words. QuizGame needs
// real word ids (it calls onUpdateWord(currentWord.id, ...) on every
// answer), so the chapter's static marketData words are seeded into the
// pack's real word bank on first visit — same pattern WordsStage uses for
// Essential 3000 — instead of being fed to QuizGame directly.
export default function ScienceVocabQuiz({ pack, topic, onFinish }) {
  const { t } = useLanguage();
  const { words, loading, bulkAddWords, updateWord } = useWords('packs', pack.id);
  const seedAttempted = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [failResult, setFailResult] = useState(null);

  const chapterWords = useMemo(() => words.filter((w) => w.topic === topic), [words, topic]);

  useEffect(() => {
    if (loading || seedAttempted.current || chapterWords.length > 0) return;
    seedAttempted.current = true;
    const source = getChapterWords(topic);
    if (source.length > 0) {
      bulkAddWords(source.map((w) => ({ ...w, topic })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, chapterWords.length, topic]);

  const quizWords = useMemo(
    () => shuffleArray(chapterWords).slice(0, MAX_QUESTIONS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chapterWords.length, topic, attempt]
  );

  // QuizGame (unlike MiniQuiz) has no built-in pass/fail gate of its own —
  // it always reports the final counts via onComplete. Only advance the
  // batch on a passing score; otherwise show a retry screen instead of
  // silently marking the vocabulary stage done on a failed attempt.
  const handleComplete = ({ totalWords, correctCount }) => {
    const passed = totalWords > 0 && correctCount / totalWords >= QUIZ_PASS_RATIO;
    if (passed) {
      onFinish({ passed: true, correctCount, totalWords });
    } else {
      setFailResult({ correctCount, totalWords });
    }
  };

  const handleRetry = () => {
    setFailResult(null);
    setAttempt((a) => a + 1);
  };

  if (loading || (chapterWords.length === 0 && getChapterWords(topic).length > 0)) {
    return (
      <div className="course-stage-view">
        <div className="ios-activity-indicator" style={{ marginTop: '40px' }}>
          <IosSpinner />
        </div>
      </div>
    );
  }

  if (quizWords.length === 0) {
    return (
      <div className="course-stage-view">
        <h3 className="course-stage-subheading"><GraduationCap size={18} /> {t('course.vocabQuizTitle')}</h3>
        <div className="science-coming-soon">{t('course.scienceTestComingSoon')}</div>
        <button type="button" className="course-stage-primary-btn" onClick={() => onFinish({ passed: true, skipped: true })}>
          {t('course.scienceContinueToTest')}
        </button>
      </div>
    );
  }

  if (failResult) {
    return (
      <div className="course-stage-view">
        <h3 className="course-stage-subheading"><GraduationCap size={18} /> {t('course.vocabQuizTitle')}</h3>
        <div className="mini-quiz-result failed">
          <div className="mini-quiz-result-icon"><RotateCcw size={32} strokeWidth={2.2} /></div>
          <div className="mini-quiz-result-score">{failResult.correctCount} / {failResult.totalWords}</div>
          <div className="mini-quiz-result-msg">{t('course.quizFailed')}</div>
          <button type="button" className="course-stage-primary-btn" onClick={handleRetry}>
            {t('course.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-stage-view">
      <h3 className="course-stage-subheading"><GraduationCap size={18} /> {t('course.vocabQuizTitle')}</h3>
      <QuizGame key={attempt} words={quizWords} onComplete={handleComplete} onUpdateWord={updateWord} />
    </div>
  );
}
