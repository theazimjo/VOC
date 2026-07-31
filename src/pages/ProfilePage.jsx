import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, AlertTriangle, Users, Key, ArrowRight } from 'lucide-react';
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

  const { loading: groupLoading, membership } = useGroupMode();
  const [groupCode, setGroupCode] = useState('');
  const [groupError, setGroupError] = useState('');
  const [joining, setJoining] = useState(false);

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    if (!groupCode.trim()) return;
    setGroupError('');
    setJoining(true);
    try {
      await joinGroupAsUser(groupCode.trim(), user.uid, {
        name: user.displayName || user.email,
        email: user.email,
      });
      // useGroupMode's live listener flips appMode to 'group', which
      // redirects the whole app to /corp/student via Layout.jsx.
    } catch (err) {
      setGroupError(err.message || 'Guruhga ulanishda xatolik yuz berdi.');
      setJoining(false);
    }
  };

  const handleReturnToGroupMode = async () => {
    await setAppMode(user.uid, 'group');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile({ displayName });
      setMessage("Profil muvaffaqiyatli yangilandi! ✅");
      setTimeout(() => setMessage(''), 3000);
    } catch {
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

      {!groupLoading && (
        <div className="profile-card group-mode-card">
          <h3><Users size={18} strokeWidth={2.2} style={{ verticalAlign: '-3px', marginRight: '6px' }} />Guruh rejimi</h3>

          {membership ? (
            <>
              <p className="group-mode-desc">
                Siz <strong>{membership.groupName}</strong> guruhiga a'zosiz. Guruh rejimiga o'tsangiz, butun tizim
                o'qituvchingiz bergan so'zlarni o'rganish rejimiga o'tadi.
              </p>
              <button className="btn btn-primary" onClick={handleReturnToGroupMode}>
                Guruh rejimiga o'tish <ArrowRight size={16} style={{ verticalAlign: '-3px', marginLeft: '4px' }} />
              </button>
            </>
          ) : (
            <>
              <p className="group-mode-desc">
                O'qituvchingiz bergan 6 xonali guruh kodini kiriting. Qo'shilgach, butun tizim guruh rejimiga o'tadi —
                istalgan vaqt bu yerga qaytib, yana individual rejimga o'ta olasiz.
              </p>
              <form className="group-mode-form" onSubmit={handleJoinGroup}>
                <div className="group-mode-input-wrap">
                  <Key size={16} />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={groupCode}
                    onChange={e => setGroupCode(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
                {groupError && <p className="group-mode-error">{groupError}</p>}
                <button type="submit" className="btn btn-primary" disabled={joining}>
                  {joining ? 'Ulanmoqda...' : 'Guruhga Qo\'shilish'}
                </button>
              </form>
            </>
          )}
        </div>
      )}

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
