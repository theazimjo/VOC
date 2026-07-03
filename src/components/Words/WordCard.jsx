import { motion } from 'framer-motion';
import { getMasteryLevel } from '../../utils/sm2';
import { partOfSpeechOptions, speakWord } from '../../utils/helpers';
import { Volume2, Edit2, Trash2 } from 'lucide-react';
import './WordCard.css';

export default function WordCard({ word, onEdit, onDelete, readOnly }) {
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
              onClick={() => speakWord(word.word)}
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
          <div className="word-translation">{word.translation}</div>
        </div>

        {(word.definition || word.example || word.customSentence) && (
          <div className="word-details">
            {word.definition && (
              <div className="word-def">
                <span className="detail-label">Def:</span> {word.definition}
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
