import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightLeft, LogOut, ChevronRight, Mail, User, Pencil, X, Check,
  Moon, Type, Volume2, Globe,
  Repeat,
} from 'lucide-react';
import { setAppMode, updateStudentProfile } from '../../../services/corpService';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useStudentT } from '../../../hooks/useStudentT';
import { useRoleSwitch, ROLE_LABEL } from '../../../hooks/useRoleSwitch';
import { isSuperAdminEmail } from '../../../components/corp/SuperRoleSwitcher';
import { useAvatar } from '../../../hooks/useAvatar';
import './StudentCorpProfile.css';

const AVATAR_COLORS = ['#0A84FF', '#30D158', '#FF9500', '#AF52DE', '#FF375F', '#5AC8FA'];
// Dates are written by hand (fmtDate from useStudentT) — Chrome has no
// 'uz' locale data, so toLocaleDateString('uz-UZ') renders "2026 M09 26".
const SHEET_META = {
  theme: { icon: Moon, titleKey: 'profile.pickTheme' },
  font: { icon: Type, titleKey: 'profile.textSize' },
  lang: { icon: Globe, titleKey: 'profile.pickLanguage' },
};
const THEME_KEYS = { ios: 'profile.themeLight', android: 'profile.themeDark', sepia: 'profile.themeSepia' };

export default function StudentCorpProfile() {
  const { user, membership, student } = useOutletContext();
  const { logout } = useAuth();
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);
  const navigate = useNavigate();
  const { theme, setTheme, fontSize, setFontSize, audioEnabled, setAudioEnabled, themes } = useTheme();
  const { language, setLanguage, languages } = useLanguage();
  const { t } = useStudentT();
  const { roles: allRoles, switchTo } = useRoleSwitch();
  const staffRoles = isSuperAdminEmail(user?.email) ? allRoles.filter((r) => r === 'super_admin') : [];
  const themeName = (id, fallback) => (THEME_KEYS[id] ? t(THEME_KEYS[id]) : fallback);

  const [activeSheet, setActiveSheet] = useState(null); // 'theme', 'font', 'lang' or null
  const closeSheet = () => setActiveSheet(null);
  const sheetMeta = activeSheet ? SHEET_META[activeSheet] : null;
  const SheetIcon = sheetMeta?.icon;

  // Optimistic local overrides — the group record StudentLayout reads is a
  // one-time fetch, so we reflect a save immediately rather than waiting on
  // a refetch that never happens until the next mount.
  const [customName, setCustomName] = useState(() => student?.name || null);
  const [avatarColor, setAvatarColor] = useState(() => student?.avatarColor || AVATAR_COLORS[0]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftColor, setDraftColor] = useState(AVATAR_COLORS[0]);

  const displayName = customName || user?.displayName || user?.email?.split('@')[0] || t('common.student');
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
    if (!membership?.groupId || !membership?.centerId || !user?.uid) return;
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
        <div className="corp-profile-avatar" style={{ background: avatarColor, overflow: 'hidden' }}>
          {avatarSrc && !avatarError ? (
            <img src={avatarSrc} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            initial
          )}
        </div>
        <div className="corp-profile-info">
          <div className="corp-profile-name">{displayName}</div>
          {user?.email && (
            <div className="corp-profile-email">
              <Mail size={13} style={{ flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</span>
            </div>
          )}
        </div>
        <button type="button" className="corp-profile-edit-btn" onClick={openEditor} aria-label={t('profile.edit')}>
          <Pencil size={16} strokeWidth={2.3} />
        </button>
      </div>

      {/* ── Appearance ── */}
          <div className="corp-profile-section-title">{t('profile.appearance')}</div>
          <div className="corp-profile-appearance-card">
            <div className="corp-profile-appearance-row" style={{ cursor: 'pointer' }} onClick={() => setActiveSheet('theme')}>
              <div className="corp-profile-appearance-row-left">
                <div className="corp-profile-appearance-icon" style={{ background: '#0a7aff' }}>
                  <Moon size={15} strokeWidth={2.2} />
                </div>
                <span className="corp-profile-appearance-title">{t('profile.theme')}</span>
              </div>
              <div className="corp-profile-appearance-right">
                <span className="corp-profile-appearance-detail">{themeName(theme, themes.find(th => th.id === theme)?.name || theme)}</span>
                <ChevronRight size={14} className="corp-profile-appearance-chevron" />
              </div>
            </div>

            <div className="corp-profile-appearance-row" style={{ cursor: 'pointer' }} onClick={() => setActiveSheet('font')}>
              <div className="corp-profile-appearance-row-left">
                <div className="corp-profile-appearance-icon" style={{ background: '#8e8e93' }}>
                  <Type size={15} strokeWidth={2.2} />
                </div>
                <span className="corp-profile-appearance-title">{t('profile.textSize')}</span>
              </div>
              <div className="corp-profile-appearance-right">
                <span className="corp-profile-appearance-detail">
                  {fontSize === 'small' ? t('profile.small') : fontSize === 'large' ? t('profile.large') : t('profile.medium')}
                </span>
                <ChevronRight size={14} className="corp-profile-appearance-chevron" />
              </div>
            </div>

            <div className="corp-profile-appearance-row" style={{ cursor: 'pointer' }} onClick={() => setActiveSheet('lang')}>
              <div className="corp-profile-appearance-row-left">
                <div className="corp-profile-appearance-icon" style={{ background: '#34c759' }}>
                  <Globe size={15} strokeWidth={2.2} />
                </div>
                <span className="corp-profile-appearance-title">{t('profile.language')}</span>
              </div>
              <div className="corp-profile-appearance-right">
                <span className="corp-profile-appearance-detail">{languages.find(l => l.code === language)?.label || language}</span>
                <ChevronRight size={14} className="corp-profile-appearance-chevron" />
              </div>
            </div>

            <div className="corp-profile-appearance-row">
              <div className="corp-profile-appearance-row-left">
                <div className="corp-profile-appearance-icon" style={{ background: '#ff2d55' }}>
                  <Volume2 size={15} strokeWidth={2.2} />
                </div>
                <span className="corp-profile-appearance-title">{t('profile.sounds')}</span>
              </div>
              <div className="corp-profile-appearance-right">
                <label className="corp-profile-switch">
                  <input type="checkbox" checked={audioEnabled} onChange={(e) => setAudioEnabled(e.target.checked)} />
                  <span className="corp-profile-switch-slider" />
                </label>
              </div>
            </div>
          </div>

          <div className="corp-profile-section-title">{t('profile.account')}</div>
          <div className="corp-profile-tiles">
            <div className="corp-profile-tile" onClick={handleReturnToIndividual}>
              <div className="corp-profile-tile-icon" style={{ background: 'var(--accent-1)' }}>
                <ArrowRightLeft size={17} strokeWidth={2.2} />
              </div>
              <span className="corp-profile-tile-text">{t('profile.personalMode')}</span>
              <ChevronRight className="corp-profile-tile-arrow" size={16} strokeWidth={2.5} />
            </div>

            {staffRoles.map((r) => (
              <div key={r} className="corp-profile-tile" onClick={() => switchTo(r)}>
                <div className="corp-profile-tile-icon" style={{ background: '#101113' }}>
                  <Repeat size={17} strokeWidth={2.2} />
                </div>
                <span className="corp-profile-tile-text">{ROLE_LABEL[r]} panel</span>
                <ChevronRight className="corp-profile-tile-arrow" size={16} strokeWidth={2.5} />
              </div>
            ))}

            <div className="corp-profile-tile danger" onClick={() => setShowLogoutModal(true)}>
              <div className="corp-profile-tile-icon" style={{ background: 'var(--error, #ff3b30)' }}>
                <LogOut size={17} strokeWidth={2.2} />
              </div>
              <span className="corp-profile-tile-text">{t('profile.logout')}</span>
            </div>
          </div>

      {/* ── Account actions end; logout confirmation modal ── */}
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
              {t('profile.logoutTitle')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
              {t('profile.logoutText')}
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
                {t('profile.cancel')}
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
                {t('profile.logout')}
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
              <h3>{t('profile.editProfile')}</h3>
              <button type="button" className="corp-profile-edit-close" onClick={closeEditor} aria-label={t('common.close')}>
                <X size={18} strokeWidth={2.3} />
              </button>
            </div>

            <div className="corp-profile-edit-avatar-preview">
              <div className="corp-profile-avatar" style={{ background: draftColor, overflow: 'hidden' }}>
                {avatarSrc && !avatarError ? (
                  <img src={avatarSrc} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  (draftName || displayName)[0]?.toUpperCase() || '?'
                )}
              </div>
            </div>

            <div className="corp-profile-edit-field">
              <label>{t('profile.name')}</label>
              <input
                type="text"
                className="corp-profile-edit-input"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                maxLength={40}
                placeholder={t('profile.namePlaceholder')}
              />
            </div>

            <button type="button" className="corp-profile-edit-save-btn" onClick={saveProfile}>
              <Check size={18} strokeWidth={2.6} /> {t('profile.save')}
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
              <h3>{t(sheetMeta.titleKey)}</h3>
              <button type="button" className="corp-profile-edit-close" onClick={closeSheet} aria-label={t('common.close')}>
                <X size={18} strokeWidth={2.3} />
              </button>
            </div>

            <div className="corp-profile-sheet-options">
              {activeSheet === 'theme' && themes.map(th => (
                <button
                  key={th.id}
                  className={`corp-profile-sheet-option ${theme === th.id ? 'active' : ''}`}
                  onClick={() => { setTheme(th.id); closeSheet(); }}
                >
                  <span>{themeName(th.id, th.name)}</span>
                  {theme === th.id && <Check size={16} className="corp-profile-sheet-check" />}
                </button>
              ))}

              {activeSheet === 'font' && [
                { id: 'small', label: t('profile.small') },
                { id: 'normal', label: t('profile.medium') },
                { id: 'large', label: t('profile.large') }
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

              {activeSheet === 'lang' && languages.map(l => (
                <button
                  key={l.code}
                  className={`corp-profile-sheet-option ${language === l.code ? 'active' : ''}`}
                  onClick={() => { setLanguage(l.code); closeSheet(); }}
                >
                  <span>{l.flag} {l.label}</span>
                  {language === l.code && <Check size={16} className="corp-profile-sheet-check" />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
