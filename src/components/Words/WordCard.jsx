import { motion } from 'framer-motion';
import { getMasteryLevel } from '../../utils/sm2';
import { partOfSpeechOptions, speakWord } from '../../utils/helpers';
import './WordCard.css';

export default function WordCard({ word, onEdit, onDelete }) {
  const masteryInfo = getMasteryLevel(word.mastery || 0);
  const pos = partOfSpeechOptions.find(p => p.value === word.partOfSpeech) || partOfSpeechOptions[0];

  return (
    <motion.div
      className="word-card"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="word-content">
        <div className="word-main">
          <div className="word-english">
            {word.word}
            <button 
              className="btn-speak" 
              onClick={() => speakWord(word.word)}
              title="Talaffuz qilish"
            >
              🔊
            </button>
            <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>{pos.label.split(' ')[0]}</span>
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
            {word.definition && <div>Def: {word.definition}</div>}
            {word.example && <div className="word-example">"{word.example}"</div>}
            {word.customSentence && (
              <div className="word-custom-sentence" style={{ marginTop: '6px', color: 'var(--success)', fontWeight: '500', fontSize: 'var(--font-sm)' }}>
                ✍️ O'zingiz tuzgan gap: "{word.customSentence}"
              </div>
            )}
          </div>
        )}
      </div>

      <div className="word-actions">
        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onEdit(word)}>✏️</button>
        <button className="btn btn-ghost btn-icon btn-sm" onClick={() => onDelete(word.id)}>🗑</button>
      </div>
    </motion.div>
  );
}
