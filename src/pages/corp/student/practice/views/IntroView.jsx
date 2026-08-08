import { motion } from 'framer-motion';
import IosSpinner from '../../../../../components/common/IosSpinner';

export default function IntroView({ p }) {
  const { practiceWords, selectedMode, setStep } = p;

  return (
          <motion.div
            key="intro"
            className="practice-intro-screen"
            onClick={() => setStep('practice')}
            style={{ cursor: 'pointer' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="intro-card" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div className="intro-mode-icon">
                {selectedMode === 'flashcard' ? '🧠' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'pronounce' ? '🎙️' : '🎮'}
              </div>
              <h2>
                {selectedMode === 'flashcard' ? 'Smart Flashcards' : selectedMode === 'spelling' ? 'Spelling Practice' : selectedMode === 'match' ? 'Match Game' : selectedMode === 'quiz' ? 'Multiple Choice Quiz' : selectedMode === 'pronounce' ? 'Pronunciation Practice' : 'Practice'}
              </h2>
              <p>{practiceWords.length} words prepared</p>
              
              <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                <IosSpinner />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Preparing practice...</span>
              </div>
            </div>
          </motion.div>
  );
}
