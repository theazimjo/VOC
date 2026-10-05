import { motion } from 'framer-motion';
import { useStudentT } from '../../../../../hooks/useStudentT';
import IosSpinner from '../../../../../components/common/IosSpinner';

export default function IntroView({ p }) {
  const { t } = useStudentT();
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
                {selectedMode === 'flashcard' ? t('practice.modeFlashcard') : selectedMode === 'spelling' ? t('practice.modeSpelling') : selectedMode === 'match' ? t('practice.modeMatch') : selectedMode === 'quiz' ? t('practice.modeQuiz') : selectedMode === 'pronounce' ? t('practice.modePronounce') : t('practice.modeDefault')}
              </h2>
              <p>{t('practice.wordsReady', { n: practiceWords.length })}</p>
              
              <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                <IosSpinner />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{t('practice.preparing')}</span>
              </div>
            </div>
          </motion.div>
  );
}
