import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../hooks/useAvatar';
import { useGroupMode } from '../hooks/useGroupMode';
import { joinGroupAsUser, setAppMode } from '../services/corpService';
import AchievementsGrid from '../components/Profile/AchievementsGrid';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile({ displayName });
      setMessage("Muvaffaqiyatli saqlandi");
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage("Xatolik yuz berdi");
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitial = () => {
    return (user?.displayName || user?.email || '?')[0].toUpperCase();
  };

  return (
    <motion.div
      className="ios-profile-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ios-header">
        <h1>Profil</h1>
      </div>

      <div className="ios-profile-header">
        <div className="ios-avatar">
          {avatarSrc && !avatarError ? (
            <img src={avatarSrc} alt="Avatar" />
          ) : (
            <span>{getInitial()}</span>
          )}
        </div>
        <h2 className="ios-profile-name">{user?.displayName || 'Foydalanuvchi'}</h2>
        <p className="ios-profile-email">{user?.email}</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="ios-section">
          <div className="ios-section-header">SHAXSIY MA'LUMOTLAR</div>
          <div className="ios-list">
            <div className="ios-list-item">
              <label>Ism</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ismingiz"
              />
            </div>
            <div className="ios-list-item disabled">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
              />
            </div>
          </div>
          <div className="ios-section-footer">
            Email manzilini o'zgartirib bo'lmaydi.
          </div>
        </div>

        {message && (
          <motion.div
            className={`ios-message ${message.includes('Xato') ? 'error' : 'success'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {message}
          </motion.div>
        )}

        <div className="ios-action-section">
          <button type="submit" className="ios-btn-primary" disabled={saving}>
            {saving ? 'Saqlanmoqda...' : 'O\'zgarishlarni saqlash'}
          </button>
        </div>
      </form>
      {/* 
      <div className="ios-section">
        <div className="ios-section-header">YUTUQLAR</div>
        <div className="ios-achievements-container">
          <AchievementsGrid />
        </div>
      </div> */}

      <div className="ios-section">
        <div className="ios-list">
          <button type="button" className="ios-list-item ios-destructive-btn" onClick={handleLogout}>
            <span>Hisobdan chiqish</span>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}