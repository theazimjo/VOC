import { motion } from 'framer-motion';
import PracticeHub from '../../../../../components/Practice/PracticeHub';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../../data/irregularVerbsCorpPack';

export default function ModeSelectView({ p }) {
  const { handleStartPractice, packId, setWordCount, sourceWords, wordCount } = p;

  return (
          <motion.div
            key="mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Word Count Selector */}
            <div className="practice-word-count-bar">
              <span className="practice-word-count-label">🔢 Practice word count:</span>
              <div className="word-count-options">
                {[5, 10, 20, 'all'].map(count => (
                  <button
                    key={count}
                    className={`word-count-btn ${wordCount === count ? 'active' : ''}`}
                    onClick={() => setWordCount(count)}
                  >
                    {count === 'all' ? 'All' : `${count} words`}
                  </button>
                ))}
              </div>
            </div>
            <PracticeHub
              onSelectMode={handleStartPractice}
              isIrregularVerbs={packId === IRREGULAR_VERBS_PACK_ID}
              irregularVerbsOnly={packId === IRREGULAR_VERBS_PACK_ID}
              words={sourceWords}
            />
          </motion.div>
  );
}
