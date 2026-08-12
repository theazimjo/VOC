import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, User } from 'lucide-react';
import { useCorpRole } from '../../hooks/useCorpRole';
import { useAuth } from '../../contexts/AuthContext';
import VocLogo from '../common/VocLogo';
import { setActiveProfile } from '../../utils/activeProfile';
import './ProfileChooser.css';

// Shown once per device after a dual-profile account (personal + teacher)
// signs in with no stored preference yet — picking a card here is what
// getRedirectPath in LoginPage.jsx was waiting on. Settings has a "Switch
// profile" row for changing this again later without going through here.
export default function ProfileChooser() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { loading: identityLoading, identity } = useCorpRole();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [loading, user, navigate]);

  if (!loading && !user) {
    return null;
  }

  const choose = (profile) => {
    setActiveProfile(profile);
    if (profile === 'personal') {
      navigate('/', { replace: true });
    } else {
      navigate(identity?.independent ? '/teacher' : '/corp/teacher', { replace: true });
    }
  };

  return (
    <div className="pc-page">
      <div className="pc-card">
        <VocLogo size="lg" />
        <h1 className="pc-title">Which profile would you like to use?</h1>
        <p className="pc-subtitle">You can switch this again anytime from Settings</p>

        <div className="pc-options">
          <motion.button
            type="button"
            className="pc-option"
            onClick={() => choose('personal')}
            disabled={identityLoading}
            whileTap={{ scale: 0.97 }}
          >
            <div className="pc-option-icon pc-option-icon-personal">
              <User size={26} strokeWidth={2.2} />
            </div>
            <span className="pc-option-title">Personal</span>
            <span className="pc-option-desc">Your vocabulary and practice</span>
          </motion.button>

          <motion.button
            type="button"
            className="pc-option"
            onClick={() => choose('teacher')}
            disabled={identityLoading}
            whileTap={{ scale: 0.97 }}
          >
            <div className="pc-option-icon pc-option-icon-teacher">
              <GraduationCap size={26} strokeWidth={2.2} />
            </div>
            <span className="pc-option-title">Teacher</span>
            <span className="pc-option-desc">Your groups and students</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
