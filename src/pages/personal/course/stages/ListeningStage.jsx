import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { synthesizeSpeech } from '../../../../utils/ttsClient';
import MiniQuiz from './MiniQuiz';

const QUIZ_PASS_RATIO = 0.7;

// Fourth and final stage: neural-voice narration of a short dialogue (real
// msedge-tts audio via /api/tts, not the browser's robotic speechSynthesis),
// then a comprehension quiz. Passing completes the whole lesson.
export default function ListeningStage({ unit, onComplete }) {
  const { t } = useLanguage();
  const [audioUrl, setAudioUrl] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const audioRef = useRef(null);

  const listening = unit.listening;

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
      // listening.voice lets a non-English course (e.g. Sicilian) request an
      // Edge neural voice in its own language — undefined falls back to the
      // API's English default, so existing English-only units are unaffected.
      const url = await synthesizeSpeech(listening.script, listening.voice);
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

  const handleQuizFinish = (result) => {
    if (result.passed) onComplete({ score: result.correct, total: result.total });
  };

  if (showQuiz) {
    return (
      <div className="course-stage-view">
        <h3 className="course-stage-subheading">{t('course.listeningQuizTitle')}</h3>
        <MiniQuiz questions={listening.questions} passRatio={QUIZ_PASS_RATIO} onFinish={handleQuizFinish} />
      </div>
    );
  }

  return (
    <div className="course-stage-view">
      <h2 className="course-lesson-title">{listening.title}</h2>

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
            <span className="course-listening-error">
              <AlertCircle size={14} /> {audioError}
            </span>
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
