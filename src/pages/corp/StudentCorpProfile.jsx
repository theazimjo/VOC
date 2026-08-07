import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightLeft, LogOut, ChevronRight, Mail, User, Pencil, X, Check,
  Target, CheckCircle2, Building2, GraduationCap, CalendarDays, Moon, Type, Volume2
} from 'lucide-react';
import { setAppMode, updateStudentProfile } from '../../services/corpService';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAccountWordProgress } from '../../hooks/useAccountWordProgress';
import PackHeaderHero from '../../components/corp/PackHeaderHero';
import './StudentCorpProfile.css';

const AVATAR_COLORS = ['#0A84FF', '#30D158', '#FF9500', '#AF52DE', '#FF375F', '#5AC8FA'];

const SHEET_META = {
  theme: { icon: Moon, title: 'Choose Theme' },
  font: { icon: Type, title: 'Choose Text Size' },
};

export default function StudentCorpProfile() {
  const { user, membership, student, wordTarget } = useOutletContext();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme, fontSize, setFontSize, audioEnabled, setAudioEnabled, themes } = useTheme();

  const [activeSheet, setActiveSheet] = useState(null); // 'theme', 'font', or null
  const closeSheet = () => setActiveSheet(null);
  const sheetMeta = activeSheet ? SHEET_META[activeSheet] : null;
  const SheetIcon = sheetMeta?.icon;

  // Same account-wide word-mastery computation the dashboard's Target Words
  // card uses — respects the student's own target if they've set one there
  // — so this mirrors that number instead of the unrelated "packs started"
  // ratio, and never resets just because they're viewing from a different
  // group's context.
  const { totalWords, learnedWords } = useAccountWordProgress(user?.uid);
  const targetWords = wordTarget ?? totalWords;
  const learnedPct = targetWords > 0 ? Math.min(100, Math.round((learnedWords / targetWords) * 100)) : 0;

  // Optimistic local overrides — the group record StudentLayout reads is a
  // one-time fetch, so we reflect a save immediately rather than waiting on
  // a refetch that never happens until the next mount.
  const [customName, setCustomName] = useState(() => student?.name || null);
  const [avatarColor, setAvatarColor] = useState(() => student?.avatarColor || AVATAR_COLORS[0]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftColor, setDraftColor] = useState(AVATAR_COLORS[0]);

  const displayName = customName || user?.displayName || user?.email?.split('@')[0] || 'Student';
  const initial = displayName[0]?.toUpperCase() || '?';

  const openEditor = () => {
    setDraftName(displayName);
    setDraftColor(avatarColor);
    setEditingProfile(true);
  };

  const closeEditor = () => setEditingProfile(false);

  const saveProfile = async () => {
    const nextName = draftName.trim() || displayName;
    setCustomName(nextName);
    setAvatarColor(draftColor);
    setEditingProfile(false);
    if (!membership?.centerId || !membership?.groupId || !user?.uid) return;
    try {
      await updateStudentProfile(membership.centerId, membership.groupId, user.uid, {
        name: nextName,
        avatarColor: draftColor,
      });
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleReturnToIndividual = async () => {
    if (user) await setAppMode(user.uid, 'individual');
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="corp-profile-container">

      {/* ── Hero: avatar + name + edit ── */}
      <div className="corp-profile-hero">
        <div className="corp-profile-avatar" style={{ background: avatarColor }}>{initial}</div>
        <div className="corp-profile-info">
          <div className="corp-profile-name">{displayName}</div>
          {user?.email && (
            <div className="corp-profile-email">
              <Mail size={13} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</span>
            </div>
          )}
        </div>
        <button type="button" className="corp-profile-edit-btn" onClick={openEditor} aria-label="Edit profile">
          <Pencil size={16} strokeWidth={2.3} />
        </button>
      </div>

      {/* ── Progress + Membership ── */}
      <div className="corp-profile-grid">
        <PackHeaderHero
          icon={<Target size={22} />}
          tag={null}
          title="Word Mastery"
          subtitle={`${learnedWords} / ${targetWords} words learned`}
          masteryPct={learnedPct}
          metrics={[
            { icon: <Target size={16} />, label: 'TARGET', value: targetWords, color: 'blue' },
            { icon: <CheckCircle2 size={16} />, label: 'LEARNED', value: learnedWords, color: 'green' },
          ]}
        />

        <div className="corp-profile-membership-card">
          <span className="corp-profile-membership-title">Membership</span>

          <div className="corp-profile-membership-row">
            <div className="corp-profile-membership-icon"><Building2 size={15} strokeWidth={2.2} /></div>
            <div className="corp-profile-membership-text">
              <div className="corp-profile-membership-label">Center</div>
              <div className="corp-profile-membership-value">{membership?.centerName || '—'}</div>
            </div>
          </div>

          <div className="corp-profile-membership-row">
            <div className="corp-profile-membership-icon"><GraduationCap size={15} strokeWidth={2.2} /></div>
            <div className="corp-profile-membership-text">
              <div className="corp-profile-membership-label">Group</div>
              <div className="corp-profile-membership-value">{membership?.groupName || '—'}</div>
            </div>
          </div>

          <div className="corp-profile-membership-row">
            <div className="corp-profile-membership-icon"><CalendarDays size={15} strokeWidth={2.2} /></div>
            <div className="corp-profile-membership-text">
              <div className="corp-profile-membership-label">Joined</div>
              <div className="corp-profile-membership-value">
                {membership?.joinedAt ? new Date(membership.joinedAt).toLocaleDateString() : '—'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Appearance ── */}
      <div className="corp-profile-section-title">Appearance</div>
      <div className="corp-profile-appearance-card">
        <div className="corp-profile-appearance-row" style={{ cursor: 'pointer' }} onClick={() => setActiveSheet('theme')}>
          <div className="corp-profile-appearance-row-left">
            <div className="corp-profile-appearance-icon" style={{ background: '#0a7aff' }}>
              <Moon size={15} strokeWidth={2.2} />
            </div>
            <span className="corp-profile-appearance-title">Theme</span>
          </div>
          <div className="corp-profile-appearance-right">
            <span className="corp-profile-appearance-detail">{themes.find(t => t.id === theme)?.name || theme}</span>
            <ChevronRight size={14} className="corp-profile-appearance-chevron" />
          </div>
        </div>

        <div className="corp-profile-appearance-row" style={{ cursor: 'pointer' }} onClick={() => setActiveSheet('font')}>
          <div className="corp-profile-appearance-row-left">
            <div className="corp-profile-appearance-icon" style={{ background: '#8e8e93' }}>
              <Type size={15} strokeWidth={2.2} />
            </div>
            <span className="corp-profile-appearance-title">Text Size</span>
          </div>
          <div className="corp-profile-appearance-right">
            <span className="corp-profile-appearance-detail">
              {fontSize === 'small' ? 'Small (14px)' : fontSize === 'large' ? 'Large (19px)' : 'Medium (16px)'}
            </span>
            <ChevronRight size={14} className="corp-profile-appearance-chevron" />
          </div>
        </div>

        <div className="corp-profile-appearance-row">
          <div className="corp-profile-appearance-row-left">
            <div className="corp-profile-appearance-icon" style={{ background: '#ff2d55' }}>
              <Volume2 size={15} strokeWidth={2.2} />
            </div>
            <span className="corp-profile-appearance-title">Audio Effects</span>
          </div>
          <div className="corp-profile-appearance-right">
            <label className="corp-profile-switch">
              <input type="checkbox" checked={audioEnabled} onChange={(e) => setAudioEnabled(e.target.checked)} />
              <span className="corp-profile-switch-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* ── Account actions ── */}
      <div className="corp-profile-section-title">Account</div>
      <div className="corp-profile-tiles">
        <div className="corp-profile-tile" onClick={handleReturnToIndividual}>
          <div className="corp-profile-tile-icon" style={{ background: 'var(--accent-1)' }}>
            <ArrowRightLeft size={17} strokeWidth={2.2} />
          </div>
          <span className="corp-profile-tile-text">Switch to Individual Mode</span>
          <ChevronRight className="corp-profile-tile-arrow" size={16} strokeWidth={2.5} />
        </div>

        <div className="corp-profile-tile danger" onClick={() => setShowLogoutModal(true)}>
          <div className="corp-profile-tile-icon" style={{ background: 'var(--error, #ff3b30)' }}>
            <LogOut size={17} strokeWidth={2.2} />
          </div>
          <span className="corp-profile-tile-text">Log Out</span>
        </div>
      </div>

      <p className="corp-profile-footer">VOCABRY · Student Profile</p>

      {/* ── Logout Confirmation Modal ── */}
      {showLogoutModal && (
        <div className="corp-profile-edit-overlay" onClick={() => setShowLogoutModal(false)}>
          <motion.div
            className="corp-profile-edit-card"
            style={{ maxWidth: '360px', textAlign: 'center', alignItems: 'center' }}
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
                marginBottom: '0.25rem'
              }}
            >
              <LogOut size={24} strokeWidth={2.2} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Log Out?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
              Are you sure you want to log out of your account?
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
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
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
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
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Edit profile modal ── */}
      {editingProfile && (
        <div className="corp-profile-edit-overlay" onClick={closeEditor}>
          <motion.div
            className="corp-profile-edit-card"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="corp-profile-edit-header">
              <div className="corp-profile-edit-header-icon"><User size={18} strokeWidth={2.3} /></div>
              <h3>Edit Profile</h3>
              <button type="button" className="corp-profile-edit-close" onClick={closeEditor} aria-label="Close">
                <X size={18} strokeWidth={2.3} />
              </button>
            </div>

            <div className="corp-profile-edit-avatar-preview">
              <div className="corp-profile-avatar" style={{ background: draftColor }}>
                {(draftName || displayName)[0]?.toUpperCase() || '?'}
              </div>
            </div>

            <div className="corp-profile-edit-field">
              <label>Name</label>
              <input
                type="text"
                className="corp-profile-edit-input"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                maxLength={40}
                placeholder="Your name"
              />
            </div>

            <div className="corp-profile-edit-field">
              <label>Avatar Color</label>
              <div className="corp-profile-edit-swatches">
                {AVATAR_COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`corp-profile-edit-swatch ${draftColor === c ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setDraftColor(c)}
                    aria-label={`Choose ${c}`}
                  />
                ))}
              </div>
            </div>

            <button type="button" className="corp-profile-edit-save-btn" onClick={saveProfile}>
              <Check size={18} strokeWidth={2.6} /> Save Changes
            </button>
          </motion.div>
        </div>
      )}

      {/* ── Theme / text-size option-picker modal ── */}
      {activeSheet && (
        <div className="corp-profile-edit-overlay" onClick={closeSheet}>
          <motion.div
            className="corp-profile-edit-card"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="corp-profile-edit-header">
              <div className="corp-profile-edit-header-icon">{SheetIcon && <SheetIcon size={18} strokeWidth={2.3} />}</div>
              <h3>{sheetMeta.title}</h3>
              <button type="button" className="corp-profile-edit-close" onClick={closeSheet} aria-label="Close">
                <X size={18} strokeWidth={2.3} />
              </button>
            </div>

            <div className="corp-profile-sheet-options">
              {activeSheet === 'theme' && themes.map(t => (
                <button
                  key={t.id}
                  className={`corp-profile-sheet-option ${theme === t.id ? 'active' : ''}`}
                  onClick={() => { setTheme(t.id); closeSheet(); }}
                >
                  <span>{t.name}</span>
                  {theme === t.id && <Check size={16} className="corp-profile-sheet-check" />}
                </button>
              ))}

              {activeSheet === 'font' && [
                { id: 'small', label: 'Small (14px)' },
                { id: 'normal', label: 'Medium (16px)' },
                { id: 'large', label: 'Large (19px)' }
              ].map(item => (
                <button
                  key={item.id}
                  className={`corp-profile-sheet-option ${fontSize === item.id ? 'active' : ''}`}
                  onClick={() => { setFontSize(item.id); closeSheet(); }}
                >
                  <span>{item.label}</span>
                  {fontSize === item.id && <Check size={16} className="corp-profile-sheet-check" />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
