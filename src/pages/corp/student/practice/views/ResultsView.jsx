import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Dumbbell, Sparkles, ThumbsUp, TrendingDown, Trophy, Volume2, XCircle } from 'lucide-react';
import RoundCheckpointSummary from '../../../../../components/Practice/RoundCheckpointSummary';
import { speakWord } from '../../../../../utils/helpers';

function getResultTier(r) {
  const ratio = r.totalWords > 0 ? r.correctCount / r.totalWords : 0;
  if (ratio >= 0.8) return { Icon: Trophy, label: 'Great job!', color: 'var(--accent-3)', dim: 'var(--warning-dim)' };
  if (ratio >= 0.5) return { Icon: ThumbsUp, label: 'Good job!', color: 'var(--accent-1)', dim: 'var(--accent-1-dim)' };
  return { Icon: Dumbbell, label: 'Keep going!', color: 'var(--success)', dim: 'var(--success-dim)' };
}

export default function ResultsView({ p }) {
  const { handleRepeatReviewWords, handleReset, loadedPack, results, roundNumber, selectedMode, wrongWords } = p;

  return (
    selectedMode === 'flashcard' ? (
      <RoundCheckpointSummary
        roundNumber={roundNumber}
        knownWords={results.knownWords || []}
        reviewWords={results.reviewWords || []}
        onRepeatReviewWords={handleRepeatReviewWords}
        onFinish={handleReset}
      />
    ) : (
      <motion.div
        key="standard-results"
        className="checkpoint-fullscreen-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="checkpoint-scrollable-content" style={{ justifyContent: 'center' }}>
          <div className="practice-results" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '20px', padding: '1.75rem', width: '100%', maxWidth: '500px', margin: '0 auto', boxSizing: 'border-box' }}>
            {(() => {
              const tier = getResultTier(results);
              return (
                <>
                  <div className="result-icon-circle" style={{ background: tier.dim, color: tier.color, margin: '0 auto 1rem' }}>
                    <tier.Icon size={36} strokeWidth={2.2} />
                  </div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{tier.label}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0 0 1.25rem 0' }}>Practice completed</p>

                  {/* Stats row */}
                  <div className="result-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div className="result-stat" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.85rem 0.5rem', borderRadius: '14px', textAlign: 'center' }}>
                      <BookOpen className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--accent-1)', margin: '0 auto 4px' }} />
                      <div className="value" style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 800 }}>{results.totalWords}</div>
                      <div className="label" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total</div>
                    </div>
                    <div className="result-stat" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.85rem 0.5rem', borderRadius: '14px', textAlign: 'center' }}>
                      <CheckCircle2 className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--success)', margin: '0 auto 4px' }} />
                      <div className="value" style={{ color: 'var(--success)', fontSize: '1.2rem', fontWeight: 800 }}>{results.correctCount}</div>
                      <div className="label" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Correct</div>
                    </div>
                    <div className="result-stat" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.85rem 0.5rem', borderRadius: '14px', textAlign: 'center' }}>
                      <XCircle className="result-stat-icon" size={18} strokeWidth={2.2} style={{ color: 'var(--error)', margin: '0 auto 4px' }} />
                      <div className="value" style={{ color: 'var(--error)', fontSize: '1.2rem', fontWeight: 800 }}>{results.incorrectCount}</div>
                      <div className="label" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Mistakes</div>
                    </div>
                  </div>

                  {/* Mistakes list */}
                  {wrongWords.length > 0 ? (
                    <div className="results-mistakes-container" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '1rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                      <div className="results-mistakes-title" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                        <TrendingDown size={14} strokeWidth={2.4} />
                        Words to review ({wrongWords.length})
                      </div>
                      <div className="results-mistake-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
                        {wrongWords.map(word => (
                          <div key={word.id} className="results-mistake-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
                            <div className="results-mistake-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className="results-mistake-word" style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{word.word}</span>
                              <span className="results-mistake-translation" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>— {word.translation}</span>
                            </div>
                            <button
                              type="button"
                              className="btn-speak-mistake"
                              onClick={() => speakWord(word.word, loadedPack?.language || 'en-US')}
                              title="Listen"
                              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                            >
                              <Volume2 size={16} strokeWidth={2.3} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="perfect-score-banner" style={{ background: 'var(--success-dim)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '0.85rem', color: 'var(--success)', fontWeight: 700, fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '0.5rem' }}>
                      <Sparkles size={16} strokeWidth={2.3} />
                      Perfect score! No mistakes made.
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        {/* Pinned Bottom Action Bar */}
        <div className="checkpoint-pinned-footer">
          <button className="checkpoint-btn-primary" onClick={handleReset}>
            Back to Practice Modes
          </button>
        </div>
      </motion.div>
    )
  );
}
