import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { IRREGULAR_VERBS_PACK_ID } from '../../../../../data/irregularVerbsCorpPack';

export default function ExitPracticeModal({ p }) {
  const { monthId, navigate, packId, setShowExitModal, setStep, topicBackQuery, unitId } = p;

  return (
        <div className="modal-overlay" style={{ zIndex: 9999, background: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(8px)' }} onClick={() => setShowExitModal(false)}>
          <motion.div
            className="modal-content"
            style={{ maxWidth: '360px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(255, 59, 48, 0.15)',
                color: '#ff3b30',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.2rem'
              }}
            >
              <Dumbbell size={24} strokeWidth={2.2} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Quit Practice?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Are you sure you want to leave? Your progress in this round will not be saved.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={() => setShowExitModal(false)}
              >
                Resume
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ff3b30',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setShowExitModal(false);
                  // Irregular Verbs auto-skips the 'mode' step (it jumps
                  // straight back into the trainer the instant step becomes
                  // 'mode' again — see the auto-start effect above), so
                  // quitting has to leave the practice route entirely
                  // instead of just resetting to 'mode'.
                  if (packId === IRREGULAR_VERBS_PACK_ID) {
                    navigate(`/corp/student/learn/topic/${packId}/${monthId}/${unitId}${topicBackQuery}`);
                  } else {
                    setStep('mode');
                  }
                }}
              >
                Quit
              </button>
            </div>
          </motion.div>
        </div>
  );
}
