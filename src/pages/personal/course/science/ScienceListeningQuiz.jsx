import { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, Loader2, AlertCircle, Headphones } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { synthesizeSpeech } from '../../../../utils/ttsClient';
import { getBatchTest, getBatchPlainText } from '../../../../data/scienceCourse';
import MiniQuiz from '../stages/MiniQuiz';

const QUIZ_PASS_RATIO = 0.7;

// Narrates the same 6 pages the user just read (no separately-authored
// script — TTS reads the batch's own text), then a listening-comprehension
// quiz. Same "coming soon" fallback as ScienceReadingQuiz for unauthored
// chapters/batches.
export default function ScienceListeningQuiz({ topic, batch, onFinish }) {
  const { t } = useLanguage();
  const [audioUrl, setAudioUrl] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const audioRef = useRef(null);

  const test = getBatchTest(topic, batch.index);
  const script = useMemo(() => getBatchPlainText(topic, batch.pageIndices), [topic, batch.pageIndices]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const handlePlay = async () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }
    setLoadingAudio(true);
    setAudioError(null);
    try {
      const url = await synthesizeSpeech(script);
      setAudioUrl(url);
    } catch (err) {
      setAudioError(err.message || 'TTS failed');
    } finally {
      setLoadingAudio(false);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioUrl]);

  if (showQuiz) {
    if (!test?.listening?.questions?.length) {
      return (
        <div className="course-stage-view">
          <h3 className="course-stage-subheading"><Headphones size={18} /> {t('course.listeningQuizTitle')}</h3>
          <div className="science-coming-soon">{t('course.scienceTestComingSoon')}</div>
          <button type="button" className="course-stage-primary-btn" onClick={() => onFinish({ passed: true, skipped: true })}>
            {t('course.scienceContinueToTest')}
          </button>
        </div>
      );
    }

    const handleQuizFinish = (result) => {
      if (result.passed) onFinish({ passed: true, score: result.correct, total: result.total });
    };

    return (
      <div className="course-stage-view">
        <h3 className="course-stage-subheading"><Headphones size={18} /> {t('course.listeningQuizTitle')}</h3>
        <MiniQuiz questions={test.listening.questions} passRatio={QUIZ_PASS_RATIO} onFinish={handleQuizFinish} />
      </div>
    );
  }

  return (
    <div className="course-stage-view">
      <div className="course-listening-player">
        <button
          type="button"
          className={`course-listening-play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={isPlaying ? () => { audioRef.current?.pause(); setIsPlaying(false); } : handlePlay}
          disabled={loadingAudio}
        >
          {loadingAudio ? (
            <Loader2 size={26} className="course-listening-spin" />
          ) : isPlaying ? (
            <Pause size={26} />
          ) : (
            <Play size={26} />
          )}
        </button>
        <div className="course-listening-hint">
          {audioError ? (
            <span className="course-listening-error"><AlertCircle size={14} /> {audioError}</span>
          ) : (
            t('course.listenHint')
          )}
        </div>
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
          />
        )}
      </div>

      <button type="button" className="course-lesson-practice-btn" onClick={() => setShowQuiz(true)}>
        {t('course.startListeningQuiz')}
      </button>
    </div>
  );
}
