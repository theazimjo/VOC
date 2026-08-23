import { motion } from 'framer-motion';
import { Mic, MicOff, RotateCcw, X, AlertCircle } from 'lucide-react';

export default function VoiceReadAlongBar({
  isListening,
  onToggleListening,
  onReset,
  onClose,
  passedCount,
  totalWords,
  wpm,
  accuracy,
  isSupported,
  error,
  t
}) {
  return (
    <motion.div
      className="voice-read-along-bar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="voice-bar-left">
        <button
          type="button"
          className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
          onClick={onToggleListening}
          disabled={!isSupported}
          title={isListening ? 'Pauza qilish' : 'Mikrofonni yoqish'}
        >
          {isListening ? <Mic size={14} /> : <MicOff size={14} />}
        </button>

        <div className="voice-status-info">
          <span className="voice-status-title">
            {isListening ? (
              <span className="voice-pulse-badge">
                <span className="voice-pulse-dot" />
                Listening
              </span>
            ) : (
              <span className="voice-idle-badge">Paused</span>
            )}
          </span>
          <span className="voice-status-sub">
            {passedCount}/{totalWords}
          </span>
        </div>
      </div>

      <div className="voice-bar-center">
        <div className="voice-metric-pill" title="Words Per Minute">
          <span>{wpm}</span>
          <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>WPM</span>
        </div>

        <div className="voice-metric-pill" title="Aniqlik foizi">
          <span>{accuracy}%</span>
        </div>
      </div>

      <div className="voice-bar-right">
        <button
          type="button"
          className="voice-action-btn"
          onClick={onReset}
          title="Boshidan boshlash"
        >
          <RotateCcw size={13} />
        </button>

        <button
          type="button"
          className="voice-action-btn voice-close-btn"
          onClick={onClose}
          title="Yopish"
        >
          <X size={13} />
        </button>
      </div>

      {error && (
        <div className="voice-error-toast">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </motion.div>
  );
}

