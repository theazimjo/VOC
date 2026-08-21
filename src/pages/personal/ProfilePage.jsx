import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut, ChevronRight, Mail, User, Pencil, X, Check,
  Moon, Type, Volume2, Globe, GraduationCap, Users, Repeat, AlertCircle, CheckCircle2, Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAvatar } from '../../hooks/useAvatar';
import { clearCorpIdentityCache } from '../../hooks/useCorpRole';
import { setActiveProfile, setActiveTeacherAffiliation } from '../../utils/activeProfile';
import { requestToJoinCenter, getMyTeacherJoinRequest, cancelTeacherRequest, getTeacherAffiliations } from '../../services/corpService';
import { becomeIndependentTeacher, joinIndependentGroupByCode } from '../../services/independentTeacherService';
import '../corp/student/StudentCorpProfile.css';

const AVATAR_COLORS = ['#0A84FF', '#30D158', '#FF9500', '#AF52DE', '#FF375F', '#5AC8FA'];

const SHEET_ICONS = {
  theme: Moon,
  font: Type,
  language: Globe,
  teacher: GraduationCap,
  joinGroup: Users,
};

export default function ProfilePage() {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const { t, language, setLanguage, languages } = useLanguage();
  const { theme, setTheme, fontSize, setFontSize, audioEnabled, setAudioEnabled, themes } = useTheme();
  const SHEET_META = {
    theme: { icon: SHEET_ICONS.theme, title: t('profile.chooseTheme') },
    font: { icon: SHEET_ICONS.font, title: t('profile.chooseTextSize') },
    language: { icon: SHEET_ICONS.language, title: t('profile.chooseLanguage') },
    teacher: { icon: SHEET_ICONS.teacher, title: t('profile.teaching') },
    joinGroup: { icon: SHEET_ICONS.joinGroup, title: "Join a Teacher's Group" },
  };
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);
  // Reads both possible teacher affiliations directly — independent of
  // useCorpRole's identity, which for a super-admin-allowlisted email only
  // reports 'teacher' once activeProfile is *already* 'teacher' (see
  // resolveCorpIdentity), and which only ever reports ONE affiliation even
  // when the account has both. This gives the Teaching section the full,
  // accurate picture from the start.
  const [affiliations, setAffiliations] = useState({ independentAffiliation: null, centerAffiliation: null, nonTeacherRole: null });
  const refreshAffiliations = () => {
    if (!user?.uid) return Promise.resolve();
    return getTeacherAffiliations(user.uid).then(setAffiliations).catch(() => {});
  };
  useEffect(() => {
    let cancelled = false;
    if (!user?.uid) return;
    getTeacherAffiliations(user.uid).then(result => { if (!cancelled) setAffiliations(result); }).catch(() => {});
    return () => { cancelled = true; };
  }, [user?.uid]);
  const { independentAffiliation, centerAffiliation } = affiliations;
  const isTeacher = !!(independentAffiliation || centerAffiliation);

  // A submitted-but-not-yet-approved center join request — see
  // requestToJoinCenter/approveTeacherRequest in corpService.js.
  const [pendingRequest, setPendingRequest] = useState(null);
  const refreshPendingRequest = () => {
    if (!user?.uid) return Promise.resolve();
    return getMyTeacherJoinRequest(user.uid).then(setPendingRequest).catch(() => {});
  };
  useEffect(() => {
    let cancelled = false;
    if (!user?.uid) return;
    getMyTeacherJoinRequest(user.uid).then(result => { if (!cancelled) setPendingRequest(result); }).catch(() => {});
    return () => { cancelled = true; };
  }, [user?.uid]);

  const [activeSheet, setActiveSheet] = useState(null); // 'theme', 'font', or null
  const closeSheet = () => setActiveSheet(null);
  const sheetMeta = activeSheet ? SHEET_META[activeSheet] : null;
  const SheetIcon = sheetMeta?.icon;

  const [customName, setCustomName] = useState(() => user?.displayName || null);
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftColor, setDraftColor] = useState(AVATAR_COLORS[0]);

  // Become a Teacher / Join a teacher's group states
  const [becomingTeacher, setBecomingTeacher] = useState(false);
  const [becomeTeacherError, setBecomeTeacherError] = useState('');
  const [centerCodeInput, setCenterCodeInput] = useState('');
  const [joiningCenterAsTeacher, setJoiningCenterAsTeacher] = useState(false);
  const [joinCenterError, setJoinCenterError] = useState('');
  const [groupCodeInput, setGroupCodeInput] = useState('');
  const [joiningTeacherGroup, setJoiningTeacherGroup] = useState(false);
  const [joinGroupError, setJoinGroupError] = useState('');
  const [joinGroupSuccess, setJoinGroupSuccess] = useState('');

  const displayName = customName || user?.displayName || user?.email?.split('@')[0] || 'User';
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
    try {
      await updateUserProfile({ displayName: nextName });
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate('/login');
  };

  const handleSwitchToIndependent = () => {
    setActiveProfile('teacher');
    setActiveTeacherAffiliation('independent');
    clearCorpIdentityCache(user?.uid);
    navigate('/teacher');
  };

  const handleSwitchToCenter = () => {
    setActiveProfile('teacher');
    setActiveTeacherAffiliation('center');
    clearCorpIdentityCache(user?.uid);
    navigate('/corp/teacher');
  };

  const handleBecomeIndependentTeacher = async () => {
    if (!user) return;
    setBecomingTeacher(true);
    setBecomeTeacherError('');
    try {
      await becomeIndependentTeacher(user.uid, {
        name: user.displayName || 'Teacher',
        email: user.email || '',
        phone: '',
      });
      await refreshAffiliations();
      setActiveProfile('teacher');
      setActiveTeacherAffiliation('independent');
      clearCorpIdentityCache(user.uid);
      closeSheet();
      navigate('/teacher');
    } catch (err) {
      setBecomeTeacherError(err.message || "Something went wrong.");
    } finally {
      setBecomingTeacher(false);
    }
  };

  const handleJoinCenterAsTeacher = async (e) => {
    e.preventDefault();
    if (!user || !centerCodeInput.trim()) return;
    setJoiningCenterAsTeacher(true);
    setJoinCenterError('');
    try {
      // Submits a request only — the center admin has to approve it before
      // this account actually becomes a teacher there (approveTeacherRequest
      // in corpService.js is what writes corpUsers/{uid}). So no profile
      // switch or navigation here; just reflect the new pending state.
      await requestToJoinCenter(centerCodeInput.trim(), user.uid, {
        name: user.displayName || 'Teacher',
        email: user.email || '',
        phone: '',
      });
      await refreshPendingRequest();
      setCenterCodeInput('');
    } catch (err) {
      setJoinCenterError(err.message || "Something went wrong.");
    } finally {
      setJoiningCenterAsTeacher(false);
    }
  };

  const handleCancelRequest = async () => {
    if (!user || !pendingRequest) return;
    try {
      await cancelTeacherRequest(user.uid, pendingRequest.centerId);
      setPendingRequest(null);
    } catch (err) {
      setJoinCenterError(err.message || "Something went wrong.");
    }
  };

  const handleJoinTeacherGroup = async (e) => {
    e.preventDefault();
    if (!user || !groupCodeInput.trim()) return;
    setJoiningTeacherGroup(true);
    setJoinGroupError('');
    setJoinGroupSuccess('');
    try {
      const result = await joinIndependentGroupByCode(groupCodeInput.trim(), user.uid, {
        name: user.displayName || 'Student',
        email: user.email || '',
      });
      setJoinGroupSuccess(`You've joined "${result.group.name}"!`);
      setGroupCodeInput('');
      setTimeout(() => {
        closeSheet();
        setJoinGroupSuccess('');
      }, 2000);
    } catch (err) {
      setJoinGroupError(err.message || "Something went wrong.");
    } finally {
      setJoiningTeacherGroup(false);
    }
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
        <button type="button" className="corp-profile-edit-btn" onClick={openEditor} aria-label={t('profile.editProfileAria')}>
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
            <span className="corp-profile-appearance-detail">{theme === 'android' ? t('profile.darkMode') : t('profile.lightMode')}</span>
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

        <div className="corp-profile-appearance-row" style={{ cursor: 'pointer' }} onClick={() => setActiveSheet('language')}>
          <div className="corp-profile-appearance-row-left">
            <div className="corp-profile-appearance-icon" style={{ background: '#5856d6' }}>
              <Globe size={15} strokeWidth={2.2} />
            </div>
            <span className="corp-profile-appearance-title">{t('profile.language')}</span>
          </div>
          <div className="corp-profile-appearance-right">
            <span className="corp-profile-appearance-detail">
              {languages.find(l => l.code === language)?.label || language}
            </span>
            <ChevronRight size={14} className="corp-profile-appearance-chevron" />
          </div>
        </div>

        <div className="corp-profile-appearance-row">
          <div className="corp-profile-appearance-row-left">
            <div className="corp-profile-appearance-icon" style={{ background: '#ff2d55' }}>
              <Volume2 size={15} strokeWidth={2.2} />
            </div>
            <span className="corp-profile-appearance-title">{t('profile.audioEffects')}</span>
          </div>
          <div className="corp-profile-appearance-right">
            <label className="corp-profile-switch">
              <input type="checkbox" checked={audioEnabled} onChange={(e) => setAudioEnabled(e.target.checked)} />
              <span className="corp-profile-switch-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* ── Teaching ── one entry point regardless of affiliation count; the
          sheet itself adapts (become / switch) per affiliation — see
          activeSheet === 'teacher' below. */}
      <div className="corp-profile-section-title">{t('profile.teaching')}</div>
      <div className="corp-profile-tiles">
        <div
          className="corp-profile-tile"
          onClick={() => { setBecomeTeacherError(''); setJoinCenterError(''); setActiveSheet('teacher'); }}
        >
          <div className="corp-profile-tile-icon" style={{ background: '#34c759' }}>
            {isTeacher ? <Repeat size={17} strokeWidth={2.2} /> : <GraduationCap size={17} strokeWidth={2.2} />}
          </div>
          <span className="corp-profile-tile-text">{isTeacher ? t('profile.teaching') : t('profile.becomeTeacher')}</span>
        </div>
        <div
          className="corp-profile-tile"
          onClick={() => { setJoinGroupError(''); setJoinGroupSuccess(''); setActiveSheet('joinGroup'); }}
        >
          <div className="corp-profile-tile-icon" style={{ background: '#0a7aff' }}>
            <Users size={17} strokeWidth={2.2} />
          </div>
          <span className="corp-profile-tile-text">{t('profile.joinAGroup')}</span>
        </div>
      </div>

      {/* ── Account actions ── */}
      <div className="corp-profile-section-title">{t('profile.account')}</div>
      <div className="corp-profile-tiles">
        <div className="corp-profile-tile danger" onClick={() => setShowLogoutModal(true)}>
          <div className="corp-profile-tile-icon" style={{ background: 'var(--error, #ff3b30)' }}>
            <LogOut size={17} strokeWidth={2.2} />
          </div>
          <span className="corp-profile-tile-text">{t('profile.logOut')}</span>
        </div>
      </div>

      <p className="corp-profile-footer">{t('profile.footer')}</p>

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
              {t('profile.logOutConfirmTitle')}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
              {t('profile.logOutConfirmText')}
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
                onClick={handleConfirmLogout}
              >
                {t('profile.logOut')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Option-picker sheet (Theme / Font) ── */}
      {activeSheet && sheetMeta && (
        <div className="corp-profile-edit-overlay" onClick={closeSheet}>
          <motion.div
            className="corp-profile-edit-card"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="corp-profile-edit-header">
              <div className="corp-profile-edit-header-icon"><SheetIcon size={17} strokeWidth={2.2} /></div>
              <h3>{sheetMeta.title}</h3>
              <button type="button" className="corp-profile-target-close" onClick={closeSheet}>
                <X size={15} strokeWidth={2.3} />
              </button>
            </div>

            {activeSheet === 'theme' && (
              <div className="corp-profile-sheet-options">
                {themes.map(th => {
                  const isActive = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      className={`corp-profile-sheet-option ${isActive ? 'active' : ''}`}
                      onClick={() => { setTheme(th.id); closeSheet(); }}
                    >
                      <span>{th.id === 'android' ? t('profile.darkMode') : t('profile.lightMode')}</span>
                      {isActive && <Check size={16} strokeWidth={2.6} className="corp-profile-sheet-check" />}
                    </button>
                  );
                })}
              </div>
            )}

            {activeSheet === 'font' && (
              <div className="corp-profile-sheet-options">
                {[
                  { id: 'small', label: t('profile.small') },
                  { id: 'normal', label: t('profile.medium') },
                  { id: 'large', label: t('profile.large') },
                ].map(opt => {
                  const isActive = fontSize === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`corp-profile-sheet-option ${isActive ? 'active' : ''}`}
                      onClick={() => { setFontSize(opt.id); closeSheet(); }}
                    >
                      <span>{opt.label}</span>
                      {isActive && <Check size={16} strokeWidth={2.6} className="corp-profile-sheet-check" />}
                    </button>
                  );
                })}
              </div>
            )}

            {activeSheet === 'language' && (
              <div className="corp-profile-sheet-options">
                {languages.map(l => {
                  const isActive = language === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      className={`corp-profile-sheet-option ${isActive ? 'active' : ''}`}
                      onClick={() => { setLanguage(l.code); closeSheet(); }}
                    >
                      <span>{l.flag} {l.label}</span>
                      {isActive && <Check size={16} strokeWidth={2.6} className="corp-profile-sheet-check" />}
                    </button>
                  );
                })}
              </div>
            )}

            {activeSheet === 'teacher' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', boxSizing: 'border-box' }}>
                {becomeTeacherError && (
                  <div style={{ background: 'rgba(255, 59, 48, 0.12)', border: '1px solid rgba(255, 59, 48, 0.25)', color: '#ff3b30', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} /> <span>{becomeTeacherError}</span>
                  </div>
                )}

                {/* Independent Tutor card — "become" if not yet independent, "switch" if already */}
                <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-tertiary)', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--text-primary)' }}>Independent Tutor</span>
                      {independentAffiliation && <CheckCircle2 size={16} color="#34c759" style={{ flexShrink: 0 }} />}
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    {independentAffiliation
                      ? 'Your own group, no learning center involved.'
                      : 'Open your own group and manage your students, with no learning center involved.'}
                  </p>
                  {independentAffiliation ? (
                    <button
                      type="button"
                      onClick={handleSwitchToIndependent}
                      style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: '#34c759', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.15s ease', boxSizing: 'border-box' }}
                    >
                      Switch to Independent Mode
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBecomeIndependentTeacher}
                      disabled={becomingTeacher}
                      style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: '#34c759', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', opacity: becomingTeacher ? 0.6 : 1, transition: 'all 0.15s ease', boxSizing: 'border-box' }}
                    >
                      {becomingTeacher ? 'Starting...' : 'Become an Independent Tutor'}
                    </button>
                  )}
                </div>

                {/* Learning Center card — "join" if no center/request yet,
                    "pending" while awaiting admin approval, "switch" once approved */}
                <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--border-light)', background: 'var(--bg-tertiary)', display: 'flex', flexDirection: 'column', gap: '10px', boxSizing: 'border-box', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--text-primary)' }}>
                        {centerAffiliation?.centerName || pendingRequest?.centerName || 'Through a Learning Center'}
                      </span>
                      {centerAffiliation && <CheckCircle2 size={16} color="#34c759" style={{ flexShrink: 0 }} />}
                      {!centerAffiliation && pendingRequest && <Clock size={16} color="#ff9500" style={{ flexShrink: 0 }} />}
                    </div>
                  </div>
                  {centerAffiliation ? (
                    <>
                      <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        You're a teacher at this center.
                      </p>
                      <button
                        type="button"
                        onClick={handleSwitchToCenter}
                        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: 'none', background: '#0a7aff', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.15s ease', boxSizing: 'border-box' }}
                      >
                        Switch to Center Mode
                      </button>
                    </>
                  ) : pendingRequest ? (
                    <>
                      <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        Your request is waiting for approval from the center admin.
                      </p>
                      <button
                        type="button"
                        onClick={handleCancelRequest}
                        style={{ width: '100%', padding: '11px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.15s ease', boxSizing: 'border-box' }}
                      >
                        Cancel Request
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        Enter the ID code your learning center gave you — the admin will need to approve your request.
                      </p>
                      {joinCenterError && (
                        <div style={{ background: 'rgba(255, 59, 48, 0.12)', border: '1px solid rgba(255, 59, 48, 0.25)', color: '#ff3b30', padding: '8px 12px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
                          {joinCenterError}
                        </div>
                      )}
                      <form onSubmit={handleJoinCenterAsTeacher} style={{ display: 'flex', gap: '8px', width: '100%', boxSizing: 'border-box', marginTop: '2px' }}>
                        <input
                          type="text"
                          placeholder="Center ID"
                          value={centerCodeInput}
                          onChange={e => setCenterCodeInput(e.target.value)}
                          style={{ flex: '1 1 0%', minWidth: 0, width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }}
                        />
                        <button
                          type="submit"
                          disabled={joiningCenterAsTeacher || !centerCodeInput.trim()}
                          style={{ flexShrink: 0, padding: '10px 18px', borderRadius: '12px', border: 'none', background: '#0a7aff', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', whiteSpace: 'nowrap', opacity: (joiningCenterAsTeacher || !centerCodeInput.trim()) ? 0.6 : 1, transition: 'all 0.15s ease', boxSizing: 'border-box' }}
                        >
                          {joiningCenterAsTeacher ? '...' : 'Request'}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeSheet === 'joinGroup' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', boxSizing: 'border-box' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Enter the group code your teacher gave you.
                </p>
                {joinGroupSuccess && (
                  <div style={{ background: 'rgba(52, 199, 89, 0.12)', border: '1px solid rgba(52, 199, 89, 0.25)', color: '#34c759', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ flexShrink: 0 }} /> <span>{joinGroupSuccess}</span>
                  </div>
                )}
                {joinGroupError && (
                  <div style={{ background: 'rgba(255, 59, 48, 0.12)', border: '1px solid rgba(255, 59, 48, 0.25)', color: '#ff3b30', padding: '10px 14px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} /> <span>{joinGroupError}</span>
                  </div>
                )}
                <form onSubmit={handleJoinTeacherGroup} style={{ display: 'flex', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                  <input
                    type="text"
                    placeholder="Group code"
                    value={groupCodeInput}
                    onChange={e => setGroupCodeInput(e.target.value)}
                    style={{ flex: '1 1 0%', minWidth: 0, width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                  <button
                    type="submit"
                    disabled={joiningTeacherGroup || !groupCodeInput.trim()}
                    style={{ flexShrink: 0, padding: '10px 18px', borderRadius: '12px', border: 'none', background: '#0a7aff', color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', whiteSpace: 'nowrap', opacity: (joiningTeacherGroup || !groupCodeInput.trim()) ? 0.6 : 1, transition: 'all 0.15s ease', boxSizing: 'border-box' }}
                  >
                    {joiningTeacherGroup ? '...' : 'Join'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* ── Edit Profile Modal ── */}
      {editingProfile && (
        <div className="corp-profile-edit-overlay" onClick={closeEditor}>
          <motion.div
            className="corp-profile-edit-card"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="corp-profile-edit-header">
              <div className="corp-profile-edit-header-icon"><Pencil size={17} strokeWidth={2.2} /></div>
              <h3>{t('profile.editProfile')}</h3>
              <button type="button" className="corp-profile-edit-close" onClick={closeEditor}>
                <X size={15} strokeWidth={2.3} />
              </button>
            </div>

            <div className="corp-profile-edit-avatar-preview">
              <div className="corp-profile-avatar" style={{ background: draftColor, overflow: 'hidden' }}>
                {avatarSrc && !avatarError ? (
                  <img src={avatarSrc} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  (draftName.trim()[0] || initial).toUpperCase()
                )}
              </div>
            </div>



            <div className="corp-profile-edit-field">
              <label htmlFor="student-profile-name-input">{t('profile.displayName')}</label>
              <input
                id="student-profile-name-input"
                className="corp-profile-edit-input"
                type="text"
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                placeholder={t('profile.enterName')}
                maxLength={40}
              />
            </div>

            <button type="button" className="corp-profile-edit-save-btn" onClick={saveProfile}>
              <Check size={16} strokeWidth={2.5} /> {t('profile.saveChanges')}
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}