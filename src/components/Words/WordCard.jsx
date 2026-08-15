import { motion } from 'framer-motion';
import { getMasteryLevel } from '../../utils/spacedRepetition';
import { partOfSpeechOptions, speakWord } from '../../utils/helpers';
import { Volume2, Edit2, Trash2 } from 'lucide-react';
import './WordCard.css';

export default function WordCard({ word, onEdit, onDelete, readOnly, language = 'en-US' }) {
  const masteryInfo = getMasteryLevel(word.mastery || 0);
  const pos = partOfSpeechOptions.find(p => p.value === word.partOfSpeech) || partOfSpeechOptions[0];

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
            <div 
              className="word-mastery-dot" 
              style={{ background: masteryInfo.color }}
              title={masteryInfo.label}
            />
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

      {!readOnly && (
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
            onClick={() => onDelete(word.id)}
            title="O'chirish"
          >
            <Trash2 size={14} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
