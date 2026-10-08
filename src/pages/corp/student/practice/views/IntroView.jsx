import { motion } from 'framer-motion';
import { useStudentT } from '../../../../../hooks/useStudentT';
import IosSpinner from '../../../../../components/common/IosSpinner';

export default function IntroView({ p }) {
  const { t } = useStudentT();
  const { practiceWords, selectedMode, setStep, smartPart } = p;
  const smartLabelKey = { review: 'practice.smartReview', new: 'practice.smartNew', practice: 'practice.smartPractice' }[smartPart?.kind];

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
                {selectedMode === 'flashcard' ? '🧠' : selectedMode === 'spelling' ? '✍️' : selectedMode === 'match' ? '🔀' : selectedMode === 'quiz' ? '📝' : selectedMode === 'pronounce' ? '🎙️' : selectedMode === 'speed' ? '⏱️' : '🎮'}
              </div>
              <h2>
                {selectedMode === 'flashcard' ? t('practice.modeFlashcard') : selectedMode === 'spelling' ? t('practice.modeSpelling') : selectedMode === 'match' ? t('practice.modeMatch') : selectedMode === 'quiz' ? t('practice.modeQuiz') : selectedMode === 'pronounce' ? t('practice.modePronounce') : selectedMode === 'speed' ? t('practice.modeSpeed') : t('practice.modeDefault')}
              </h2>
              {smartLabelKey && (
                <p style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-1)' }}>
                  {t(smartLabelKey)}{smartPart.total > 1 ? ` · ${t('practice.smartStep', { i: smartPart.index + 1, n: smartPart.total })}` : ''}
                </p>
              )}
              <p>{t('practice.wordsReady', { n: practiceWords.length })}</p>
              
              <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-md)' }}>
                <IosSpinner />
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{t('practice.preparing')}</span>
              </div>
            </div>
          </motion.div>
  );
}
