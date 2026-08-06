import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Sparkles, RotateCcw } from 'lucide-react';
import './RoundCheckpointSummary.css';

export default function RoundCheckpointSummary({
  roundNumber = 1,
  knownWords = [],
  reviewWords = [],
  onRepeatReviewWords,
  onFinish,
}) {
  const totalWords = knownWords.length + reviewWords.length;
  const clearedCount = knownWords.length;
  const clearedPct = totalWords > 0 ? Math.round((clearedCount / totalWords) * 100) : 0;
  const reviewPct = 100 - clearedPct;
  const isAllCleared = reviewWords.length === 0;

  const tagText = isAllCleared ? 'COMPLETED 🏆' : `ROUND ${roundNumber} 🎯`;
  const titleText = isAllCleared ? 'All cards cleared!' : `Round ${roundNumber} complete`;
  const subtitleText = isAllCleared
    ? "Awesome job! You've reviewed all words in this session."
    : `Keep going — ${reviewWords.length} words remaining to practice.`;

  return (
    <motion.div
      className="checkpoint-fullscreen-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="checkpoint-scrollable-content">
        {/* Top Banner Card */}
        <div className="checkpoint-banner-card">
          <div className="checkpoint-header-row">
            <div className="checkpoint-flag-icon">
              {isAllCleared ? <Sparkles size={22} strokeWidth={2.2} /> : <Flag size={22} strokeWidth={2.2} />}
            </div>
            <div className="checkpoint-title-block">
              <span className="checkpoint-tag">{tagText}</span>
              <h2 className="checkpoint-title">{titleText}</h2>
              <p className="checkpoint-subtitle">{subtitleText}</p>
            </div>
          </div>

          {/* Dual-Color Progress Bar */}
          <div className="checkpoint-progress-track">
            <div
              className="checkpoint-seg-cleared"
              style={{ width: `${clearedPct}%` }}
              title={`Cleared: ${clearedCount}`}
            />
            <div
              className="checkpoint-seg-review"
              style={{ width: `${reviewPct}%` }}
              title={`To review: ${reviewWords.length}`}
            />
          </div>

          <div className="checkpoint-progress-label">
            {isAllCleared ? (
              <>All <strong>{totalWords}</strong> cards cleared successfully 🎉</>
            ) : (
              <><strong>{clearedCount}</strong> of <strong>{totalWords}</strong> cards cleared this round</>
            )}
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="checkpoint-columns-grid">
          {/* Left Column: You know these */}
          <div className="checkpoint-column known-col">
            <div className="checkpoint-col-header">
              <div className="checkpoint-col-title-wrap">
                <div className="checkpoint-col-icon green">
                  <Sparkles size={15} strokeWidth={2.2} />
                </div>
                <span className="checkpoint-col-title">You know these</span>
              </div>
              <span className="checkpoint-col-badge green">{knownWords.length}</span>
            </div>

            <div className="checkpoint-pills-list">
              {knownWords.length === 0 ? (
                <span className="checkpoint-empty-txt">None yet</span>
              ) : (
                knownWords.map((w, idx) => (
                  <span key={w.id || idx} className="word-pill known-pill">
                    {w.word}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Keep practising these */}
          <div className="checkpoint-column review-col">
            <div className="checkpoint-col-header">
              <div className="checkpoint-col-title-wrap">
                <div className="checkpoint-col-icon yellow">
                  <RotateCcw size={15} strokeWidth={2.2} />
                </div>
                <span className="checkpoint-col-title">Keep practising these</span>
              </div>
              <span className="checkpoint-col-badge yellow">{reviewWords.length}</span>
            </div>

            <div className="checkpoint-pills-list">
              {reviewWords.length === 0 ? (
                <span className="checkpoint-empty-txt">Great job! All cards cleared 🎉</span>
              ) : (
                reviewWords.map((w, idx) => (
                  <span key={w.id || idx} className="word-pill review-pill">
                    {w.word}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Bottom Action Bar */}
      <div className="checkpoint-pinned-footer">
        {reviewWords.length > 0 ? (
          <button className="checkpoint-btn-primary" onClick={onRepeatReviewWords}>
            <RotateCcw size={18} strokeWidth={2.3} />
            <span>Practice {reviewWords.length} words again</span>
          </button>
        ) : (
          <button className="checkpoint-btn-primary" onClick={onFinish}>
            <Sparkles size={18} strokeWidth={2.3} />
            <span>Finish practice</span>
          </button>
        )}

        {reviewWords.length > 0 && onFinish && (
          <button className="checkpoint-btn-secondary" onClick={onFinish}>
            Back to topics
          </button>
        )}
      </div>
    </motion.div>
  );
}
