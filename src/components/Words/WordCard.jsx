import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMasteryLevel } from '../../utils/spacedRepetition';
import { partOfSpeechOptions, speakWord } from '../../utils/helpers';
import { Volume2, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './WordCard.css';

export default function WordCard({ word, onEdit, onDelete, readOnly, language = 'en-US' }) {
  const { t } = useLanguage();
  const masteryLevels = t('wordCard.masteryLevels');
  const masteryInfo = getMasteryLevel(word.mastery || 0);
  const rawLabelIndex = ["Yangi", "Boshlanish", "O'rtacha", "Yaxshi", "O'zlashtirilgan"].indexOf(masteryInfo.label);
  const filledBars = rawLabelIndex !== -1 ? rawLabelIndex : 0;
  const localizedMasteryLabel = Array.isArray(masteryLevels) && masteryLevels[filledBars] ? masteryLevels[filledBars] : masteryInfo.label;
  const pos = partOfSpeechOptions.find(p => p.value === word.partOfSpeech) || partOfSpeechOptions[0];

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
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
      {/* Card Header Row: Word Title + Speak Button on Left; POS badge, Mastery, Actions on Right */}
      <div className="word-card-header">
        <div className="word-title-group">
          <span className="word-english-text">{word.word}</span>
          <button
            type="button"
            className="btn-speak"
            onClick={() => speakWord(word.word, language)}
            title={t('wordCard.pronounce')}
            aria-label="Pronounce"
          >
            <Volume2 size={15} strokeWidth={2.4} />
          </button>
        </div>

        <div className="word-header-meta">
          {pos?.label && (
            <span className="badge badge-accent pos-badge">{pos.label.split(' ')[0]}</span>
          )}

          <div className="word-mastery-signal" title={localizedMasteryLabel}>
            {[1, 2, 3, 4].map(bar => (
              <span
                key={bar}
                className={`word-mastery-bar${bar <= filledBars ? ' filled' : ''}`}
                style={bar <= filledBars ? { background: masteryInfo.color } : undefined}
              />
            ))}
          </div>

          {!readOnly && (
            <div className="word-actions-wrap">
              <div className="word-actions">
                <button
                  type="button"
                  className="btn-action-icon edit"
                  onClick={() => onEdit(word)}
                  title={t('wordCard.edit')}
                >
                  <Edit2 size={14} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  className="btn-action-icon delete"
                  onClick={() => setShowDeleteConfirm(true)}
                  title={t('wordCard.delete')}
                >
                  <Trash2 size={14} strokeWidth={2.5} />
                </button>
              </div>

              <div className="word-options" ref={menuRef}>
                <button
                  type="button"
                  className="word-options-btn"
                  onClick={() => setMenuOpen(o => !o)}
                  aria-label={t('wordCard.options')}
                  title={t('wordCard.options')}
                >
                  <MoreVertical size={16} strokeWidth={2.4} />
                </button>
                {menuOpen && (
                  <div className="word-options-menu">
                    <button
                      type="button"
                      className="word-options-item"
                      onClick={() => { setMenuOpen(false); onEdit(word); }}
                    >
                      <Edit2 size={15} strokeWidth={2.3} /> {t('wordCard.edit')}
                    </button>
                    <button
                      type="button"
                      className="word-options-item delete"
                      onClick={() => { setMenuOpen(false); setShowDeleteConfirm(true); }}
                    >
                      <Trash2 size={15} strokeWidth={2.3} /> {t('wordCard.delete')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Translation Row */}
      {word.translation && <div className="word-translation">{word.translation}</div>}

      {/* Details Row (Definition, Synonyms, Collocations, Word family, Article, Example, Custom Sentence) */}
      {(word.definition || word.example || word.customSentence || word.synonyms || word.collocations || word.article || word.nounForm || word.verbForm || word.adjectiveForm || word.adverbForm) && (
        <div className="word-details">
          {word.definition && (
            <div className="word-def">
              <span className="detail-label">{t('wordCard.def')}</span> {word.definition}
            </div>
          )}
          {word.synonyms && (
            <div className="word-synonyms">
              <span className="detail-label">{t('wordCard.synonyms')}</span> {word.synonyms}
            </div>
          )}
          {word.collocations && (
            <div className="word-collocations">
              <span className="detail-label">{t('wordCard.collocations')}</span> {word.collocations}
            </div>
          )}
          {(word.nounForm || word.verbForm || word.adjectiveForm || word.adverbForm) && (
            <div className="word-family">
              <span className="detail-label">{t('wordCard.wordFamily')}</span>{' '}
              {[word.nounForm, word.verbForm, word.adjectiveForm, word.adverbForm].filter(Boolean).join(' · ')}
            </div>
          )}
          {word.article && (
            <div className="word-article">
              <span className="detail-label">{t('wordCard.article')}</span> {word.article}
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

      {/* Delete Confirmation Alert */}
      {showDeleteConfirm && (
        <div className="custom-alert-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="custom-alert-card" onClick={(e) => e.stopPropagation()}>
            <p className="custom-alert-message">{t('wordCard.deleteConfirm', { word: word.word })}</p>
            <div className="custom-alert-actions-row">
              <button
                className="custom-alert-btn"
                onClick={() => { setShowDeleteConfirm(false); onDelete(word.id); }}
              >
                {t('wordCard.delete')}
              </button>
              <button
                className="custom-alert-btn"
                style={{ fontWeight: 700 }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                {t('wordCard.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
