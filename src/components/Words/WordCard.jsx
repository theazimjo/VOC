import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMasteryLevel } from '../../utils/spacedRepetition';
import { partOfSpeechOptions, speakWord } from '../../utils/helpers';
import { Volume2, Edit2, Trash2, MoreVertical } from 'lucide-react';
import './WordCard.css';

// Same 5 buckets getMasteryLevel groups mastery into, in ascending order -
// reused here (instead of re-checking the mastery number) so the signal
// indicator always lines up with the label/color getMasteryLevel picked.
const MASTERY_LEVELS = ["Yangi", "Boshlanish", "O'rtacha", "Yaxshi", "O'zlashtirilgan"];

export default function WordCard({ word, onEdit, onDelete, readOnly, language = 'en-US' }) {
  const masteryInfo = getMasteryLevel(word.mastery || 0);
  const filledBars = MASTERY_LEVELS.indexOf(masteryInfo.label);
  const pos = partOfSpeechOptions.find(p => p.value === word.partOfSpeech) || partOfSpeechOptions[0];

  // Mobile-only "..." menu (see .word-options in WordCard.css) - there's no
  // hover on touch, so edit/delete can't just fade in like on desktop; they
  // live behind this toggle instead, closed on an outside tap.
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Shared by both the desktop hover button and the mobile "..." menu, so
  // there's exactly one delete confirmation, not a native window.confirm()
  // stacked behind (or after) this styled one.
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeIfOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', closeIfOutside);
    document.addEventListener('touchstart', closeIfOutside);
    return () => {
      document.removeEventListener('mousedown', closeIfOutside);
      document.removeEventListener('touchstart', closeIfOutside);
    };
  }, [menuOpen]);

  return (
    <motion.div
      className="word-card"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="word-content">
        <div className="word-main">
          <div className="word-english">
            <span className="word-english-text">{word.word}</span>
            <button
              className="btn-speak"
              onClick={() => speakWord(word.word, language)}
              title="Talaffuz qilish"
            >
              <Volume2 size={16} strokeWidth={2.4} />
            </button>
            <span className="badge badge-accent pos-badge">{pos.label.split(' ')[0]}</span>
          </div>
          {word.translation && <div className="word-translation">{word.translation}</div>}
        </div>

        {(word.definition || word.example || word.customSentence || word.synonyms || word.collocations || word.article || word.nounForm || word.verbForm || word.adjectiveForm || word.adverbForm) && (
          <div className="word-details">
            {word.definition && (
              <div className="word-def">
                <span className="detail-label">Def:</span> {word.definition}
              </div>
            )}
            {word.synonyms && (
              <div className="word-synonyms">
                <span className="detail-label">Synonyms:</span> {word.synonyms}
              </div>
            )}
            {word.collocations && (
              <div className="word-collocations">
                <span className="detail-label">Collocations:</span> {word.collocations}
              </div>
            )}
            {(word.nounForm || word.verbForm || word.adjectiveForm || word.adverbForm) && (
              <div className="word-family">
                <span className="detail-label">Word family:</span>{' '}
                {[word.nounForm, word.verbForm, word.adjectiveForm, word.adverbForm].filter(Boolean).join(' · ')}
              </div>
            )}
            {word.article && (
              <div className="word-article">
                <span className="detail-label">Article:</span> {word.article}
              </div>
            )}
            {word.example && (
              <div className="word-example">
                "{word.example}"
              </div>
            )}
            {word.customSentence && (
              <div className="word-custom-sentence">
                ✍️ {word.customSentence}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="word-mastery-signal" title={masteryInfo.label}>
        {[1, 2, 3, 4].map(bar => (
          <span
            key={bar}
            className={`word-mastery-bar${bar <= filledBars ? ' filled' : ''}`}
            style={bar <= filledBars ? { background: masteryInfo.color } : undefined}
          />
        ))}
      </div>

      {!readOnly && (
        <>
          <div className="word-actions">
            <button
              className="btn-action-icon edit"
              onClick={() => onEdit(word)}
              title="Tahrirlash"
            >
              <Edit2 size={14} strokeWidth={2.5} />
            </button>
            <button
              className="btn-action-icon delete"
              onClick={() => setShowDeleteConfirm(true)}
              title="O'chirish"
            >
              <Trash2 size={14} strokeWidth={2.5} />
            </button>
          </div>

          <div className="word-options" ref={menuRef}>
            <button
              type="button"
              className="word-options-btn"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Options"
              title="Options"
            >
              <MoreVertical size={18} strokeWidth={2.4} />
            </button>
            {menuOpen && (
              <div className="word-options-menu">
                <button
                  type="button"
                  className="word-options-item"
                  onClick={() => { setMenuOpen(false); onEdit(word); }}
                >
                  <Edit2 size={15} strokeWidth={2.3} /> Edit
                </button>
                <button
                  type="button"
                  className="word-options-item delete"
                  onClick={() => { setMenuOpen(false); setShowDeleteConfirm(true); }}
                >
                  <Trash2 size={15} strokeWidth={2.3} /> Delete
                </button>
              </div>
            )}
          </div>

          {showDeleteConfirm && (
            <div className="custom-alert-overlay" onClick={() => setShowDeleteConfirm(false)}>
              <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
                <p className="custom-alert-message">Delete "{word.word}"? This can't be undone.</p>
                <div className="custom-alert-actions-row">
                  {/* First child renders red (destructive) per this app's existing
                      confirm-dialog convention - see .custom-alert-actions-row
                      button:first-child in index.css. */}
                  <button
                    className="custom-alert-btn"
                    onClick={() => { setShowDeleteConfirm(false); onDelete(word.id); }}
                  >
                    Delete
                  </button>
                  <button
                    className="custom-alert-btn"
                    style={{ fontWeight: 700 }}
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
