import { useState } from 'react';
import { BookOpen, ListChecks, Headphones, Type, Check, PartyPopper } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useLessonProgress } from '../../../../hooks/useLessonProgress';
import ScienceReadingPages from './ScienceReadingPages';
import ScienceReadingQuiz from './ScienceReadingQuiz';
import ScienceListeningQuiz from './ScienceListeningQuiz';
import ScienceVocabQuiz from './ScienceVocabQuiz';
import ScienceWrapUp from './ScienceWrapUp';

const STEP_TRACKER = [
  { key: 'pages', icon: BookOpen, cls: 'stage-words', labelKey: 'course.sciencePagesLabel' },
  { key: 'reading', icon: ListChecks, cls: 'stage-reading', labelKey: 'course.readingQuizTitle' },
  { key: 'listening', icon: Headphones, cls: 'stage-listening', labelKey: 'course.listeningQuizTitle' },
  { key: 'vocab', icon: Type, cls: 'stage-grammar', labelKey: 'course.vocabQuizTitle' },
];

// State machine for one 6-page batch: pages (silent then read-aloud) →
// reading quiz → listening quiz → vocab quiz → complete. Each step's
// completion is written to Firebase via markStageDone so a reload resumes
// at the right step (see the derivedStep computation below), but the local
// `manualStep` override advances the UI immediately instead of waiting on
// the Firebase listener round-trip.
export default function ScienceBatchFlow({ pack, chapterId, topic, batch, isLastBatch, wrapUpPageIndices, onAdvanceBatch, onExitToChapters }) {
  const { t } = useLanguage();
  const { progress, markStageDone } = useLessonProgress(pack.id);
  const [manualStep, setManualStep] = useState(null);

  const bp = progress?.[chapterId] || {};
  const pagesDone = Boolean(bp[`batch${batch.index}-pages`]?.done);
  const readingDone = Boolean(bp[`batch${batch.index}-reading`]?.done);
  const listeningDone = Boolean(bp[`batch${batch.index}-listening`]?.done);
  const vocabDone = Boolean(bp[`batch${batch.index}-vocab`]?.done);

  const derivedStep = !pagesDone ? 'pages' : !readingDone ? 'reading' : !listeningDone ? 'listening' : !vocabDone ? 'vocab' : 'complete';
  const step = manualStep || derivedStep;
  const stepDone = { pages: pagesDone, reading: readingDone, listening: listeningDone, vocab: vocabDone };

  const handlePagesDone = () => {
    markStageDone(chapterId, `batch${batch.index}-pages`, {});
    setManualStep('reading');
  };
  const handleReadingFinish = (data) => {
    markStageDone(chapterId, `batch${batch.index}-reading`, data.skipped ? { skipped: true } : { score: data.score, total: data.total });
    setManualStep('listening');
  };
  const handleListeningFinish = (data) => {
    markStageDone(chapterId, `batch${batch.index}-listening`, data.skipped ? { skipped: true } : { score: data.score, total: data.total });
    setManualStep('vocab');
  };
  const handleVocabFinish = (data) => {
    markStageDone(chapterId, `batch${batch.index}-vocab`, data.skipped ? { skipped: true } : { correctCount: data.correctCount, totalWords: data.totalWords });
    setManualStep('complete');
  };

  return (
    <div className="science-batch-flow">
      <div className="science-step-tracker">
        {STEP_TRACKER.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.key} className={`course-stage-row ${s.cls} ${stepDone[s.key] ? 'done' : ''} ${step === s.key ? 'current' : ''}`}>
              <div className="course-stage-row-icon">
                {stepDone[s.key] ? <Check size={16} strokeWidth={3} /> : <Icon size={16} strokeWidth={2.3} />}
              </div>
              <div className="course-stage-row-label">{t(s.labelKey)}</div>
            </div>
          );
        })}
      </div>

      {step === 'pages' && <ScienceReadingPages pack={pack} topic={topic} batch={batch} onDone={handlePagesDone} />}
      {step === 'reading' && <ScienceReadingQuiz topic={topic} batchIndex={batch.index} onFinish={handleReadingFinish} />}
      {step === 'listening' && <ScienceListeningQuiz topic={topic} batch={batch} onFinish={handleListeningFinish} />}
      {step === 'vocab' && <ScienceVocabQuiz pack={pack} topic={topic} onFinish={handleVocabFinish} />}

      {step === 'complete' && (
        isLastBatch ? (
          wrapUpPageIndices.length > 0 ? (
            <ScienceWrapUp topic={topic} pageIndices={wrapUpPageIndices} onFinish={onExitToChapters} />
          ) : (
            <div className="course-stage-view">
              <div className="course-stage-unlocked-msg"><PartyPopper size={16} strokeWidth={2.4} /> {t('course.scienceChapterDone')}</div>
              <button type="button" className="course-stage-primary-btn" onClick={onExitToChapters}>{t('course.scienceBackToChapters')}</button>
            </div>
          )
        ) : (
          <div className="course-stage-view">
            <div className="course-stage-unlocked-msg"><PartyPopper size={16} strokeWidth={2.4} /> {t('course.scienceBatchDone')}</div>
            <button type="button" className="course-stage-primary-btn" onClick={onAdvanceBatch}>{t('course.scienceNextBatch')}</button>
          </div>
        )
      )}
    </div>
  );
}
