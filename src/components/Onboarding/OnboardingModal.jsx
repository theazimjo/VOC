import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Sparkles, Flame, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePacks } from '../../hooks/usePacks';
import { useStreak } from '../../hooks/useStreak';
import { packIcons } from '../../utils/helpers';
import { WHATS_NEW_VERSION } from './WhatsNewModal';
import './OnboardingModal.css';

const SUGGESTED_NAMES = ["Kundalik so'zlar", 'IELTS lug\'ati', 'Ish/Biznes', 'Sayohat'];
const GOAL_OPTIONS = [5, 10, 15, 20];

function markOnboardingDone(uid) {
  localStorage.setItem(`voc-onboarding-done-${uid}`, 'true');
  // A brand-new user has nothing to "catch up" on — skip the What's New modal.
  localStorage.setItem(`voc-whatsnew-seen-${WHATS_NEW_VERSION}-${uid}`, 'true');
}

export default function OnboardingModal({ onClose }) {
  const { user } = useAuth();
  const { addPack } = usePacks();
  const { setDailyGoal } = useStreak();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [packName, setPackName] = useState('');
  const [packIcon, setPackIcon] = useState(packIcons[0]);
  const [creating, setCreating] = useState(false);
  const [createdPackId, setCreatedPackId] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(10);

  const handleClose = () => {
    markOnboardingDone(user.uid);
    onClose();
  };

  const handleCreatePack = async () => {
    if (!packName.trim()) {
      setStep(3);
      return;
    }
    setCreating(true);
    const id = await addPack({ name: packName.trim(), icon: packIcon });
    setCreatedPackId(id);
    setCreating(false);
    setStep(3);
  };

  const handleFinish = async () => {
    await setDailyGoal(selectedGoal);
    markOnboardingDone(user.uid);
    onClose();
    navigate(createdPackId ? `/packs/${createdPackId}` : '/library');
  };

  return (
    <div className="onboarding-overlay">
      <motion.div
        className="onboarding-card"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="onboarding-skip" onClick={handleClose}>O'tkazib yuborish</button>

        <div className="onboarding-dots">
          {[1, 2, 3, 4].map(n => (
            <span key={n} className={`onboarding-dot ${step >= n ? 'active' : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" className="onboarding-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="onboarding-icon-circle"><GraduationCap size={36} strokeWidth={2} /></div>
              <h2>VOC'ga xush kelibsiz!</h2>
              <p>So'z boyligingizni oshirish, grammatikani mustahkamlash va IELTS'ga tayyorlanish uchun shaxsiy yordamchingiz.</p>
              <button className="onboarding-primary-btn" onClick={() => setStep(2)}>Boshlaymiz →</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" className="onboarding-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="onboarding-icon-circle"><Sparkles size={32} strokeWidth={2} /></div>
              <h2>Birinchi to'plamingizni yarating</h2>
              <p>So'zlaringizni mavzu bo'yicha guruhlang. Keyinroq ham o'zgartirishingiz mumkin.</p>

              <div className="onboarding-suggestions">
                {SUGGESTED_NAMES.map(name => (
                  <button key={name} className="onboarding-chip" onClick={() => setPackName(name)}>{name}</button>
                ))}
              </div>

              <input
                type="text"
                className="onboarding-input"
                placeholder="To'plam nomi (masalan: IELTS so'zlari)"
                value={packName}
                onChange={e => setPackName(e.target.value)}
              />

              <div className="onboarding-icon-picker">
                {packIcons.slice(0, 8).map(icon => (
                  <button
                    key={icon}
                    className={`onboarding-icon-option ${packIcon === icon ? 'active' : ''}`}
                    onClick={() => setPackIcon(icon)}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              <button className="onboarding-primary-btn" onClick={handleCreatePack} disabled={creating}>
                {creating ? 'Yaratilmoqda...' : packName.trim() ? 'Yaratish va davom etish →' : 'Keyinroq qo\'shaman →'}
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" className="onboarding-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="onboarding-icon-circle"><Flame size={32} strokeWidth={2} /></div>
              <h2>Kunlik maqsadingizni belgilang</h2>
              <p>Har kuni nechta so'z mashq qilishni xohlaysiz? Bu streak tizimingiz uchun asos bo'ladi.</p>

              <div className="onboarding-goal-grid">
                {GOAL_OPTIONS.map(n => (
                  <button
                    key={n}
                    className={`onboarding-goal-btn ${selectedGoal === n ? 'active' : ''}`}
                    onClick={() => setSelectedGoal(n)}
                  >
                    {n} ta
                  </button>
                ))}
              </div>

              <button className="onboarding-primary-btn" onClick={() => setStep(4)}>Davom etish →</button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" className="onboarding-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="onboarding-icon-circle success"><Check size={36} strokeWidth={2.4} /></div>
              <h2>Tayyor!</h2>
              <p>
                {createdPackId
                  ? "To'plamingiz yaratildi. Endi so'zlar qo'shib, mashq qilishni boshlashingiz mumkin."
                  : "Kutubxonaga o'tib, birinchi to'plamingizni yaratishingiz mumkin."}
              </p>
              <button className="onboarding-primary-btn" onClick={handleFinish}>Boshlash 🚀</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
