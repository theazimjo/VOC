import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../hooks/useAvatar';
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
      setMessage("Profil muvaffaqiyatli yangilandi! ✅");
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage("Xatolik yuz berdi ❌");
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
      className="profile-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="page-header">
        <h1><UserCircle2 size={26} strokeWidth={2.1} style={{ verticalAlign: '-4px', marginRight: '8px' }} />Profil</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {avatarSrc && !avatarError ? (
            <img src={avatarSrc} alt="Avatar" />
          ) : (
            getInitial()
          )}
        </div>
        <div className="profile-name">{user?.displayName || 'Foydalanuvchi'}</div>
        <div className="profile-email">{user?.email}</div>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="input-group">
            <label>Ism</label>
            <input
              type="text"
              className="input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ismingizni kiriting"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              className="input"
              value={user?.email || ''}
              disabled
              style={{ opacity: 0.6 }}
            />
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                color: message.includes('✅') ? 'var(--success)' : 'var(--error)',
                fontSize: 'var(--font-sm)',
                fontWeight: 500
              }}
            >
              {message}
            </motion.p>
          )}

          <div className="profile-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>

      <AchievementsGrid />

      <div className="danger-zone">
        <h3><AlertTriangle size={17} strokeWidth={2.2} style={{ verticalAlign: '-3px', marginRight: '6px' }} />Xavfli zona</h3>
        <p>Hisobdan chiqish</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Chiqish
        </button>
      </div>
    </motion.div>
  );
}
