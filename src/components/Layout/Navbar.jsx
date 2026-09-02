import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, BarChart3, Settings, LogOut, Search, ChevronDown, Plus, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAvatar } from '../../hooks/useAvatar';
import { useGroupMode } from '../../hooks/useGroupMode';
import { usePacks } from '../../hooks/usePacks';
import { ref, onValue, get, remove } from 'firebase/database';
import { db } from '../../firebase';
import { switchActiveGroup, joinGroupAsUser, setAppMode } from '../../services/corpService';
import { joinIndependentGroupByCode } from '../../services/independentTeacherService';
import { SELECTABLE_COURSES } from '../../data/coursePicker';

// Most courses (Sicilian, Essential 3000, Science) share the generic
// /course/:packId Dashboard/Lesson/Vocabulary pages; a course can opt into
// its own fully separate section (e.g. Greek → /greek/:packId, see
// pages/greek/GreekLayout.jsx) via `basePath` in coursePicker.js.
const getCourseBasePath = (courseId) =>
  SELECTABLE_COURSES.find((c) => c.id === courseId)?.basePath || '/course';
import GlobalSearch from '../common/GlobalSearch';
import './Navbar.css';

export default function Navbar({ sidebarCollapsed, onHamburgerClick, appMode: layoutAppMode }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchOpen, setSearchOpen] = useState(false);
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { appMode, membership } = useGroupMode();
  const { packs, addPack } = usePacks();
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [pinCode, setPinCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState('');
  const switcherRef = useRef(null);

  // "Add" modal — opened from the Plus card in the group switcher. Offers
  // both joining a group by PIN and starting a self-serve course (e.g.
  // Sicilian A1) Duolingo-style; a started course then shows up as its own
  // card in the switcher row, before the group cards.
  const [showAddModal, setShowAddModal] = useState(false);
  const [startingCourseId, setStartingCourseId] = useState(null);

  const myCourses = packs.filter((p) => p.courseId);
  // Whichever course pack the URL is currently inside — drives the switcher
  // button's own icon/label the same way group mode drives it for a group,
  // instead of it staying stuck on "Personal" while you're in a course.
  const activeCourse = myCourses.find((c) => location.pathname.startsWith(`${getCourseBasePath(c.courseId)}/${c.id}`));
  const selectableCourses = SELECTABLE_COURSES.filter(
    (c) => !myCourses.some((p) => p.courseId === c.id)
  );

  const handleStartCourse = async (course) => {
    if (!user || startingCourseId) return;
    setStartingCourseId(course.id);
    try {
      const newPackId = await addPack({
        name: course.title,
        description: course.description || '',
        icon: course.icon,
        color: course.color || 'var(--accent-gradient)',
        level: course.level || 'beginner',
        courseId: course.id,
        ...(course.language ? { language: course.language } : {}),
      });
      setShowAddModal(false);
      setShowSwitcher(false);
      if (newPackId) navigate(`${course.basePath || '/course'}/${newPackId}`);
    } catch (err) {
      console.error('Failed to start course:', err);
    } finally {
      setStartingCourseId(null);
    }
  };

  const handleOpenCourse = (pack) => {
    setShowSwitcher(false);
    navigate(`${getCourseBasePath(pack.courseId)}/${pack.id}`);
  };

  // A membership is either a corp/center group (centerId) or an independent
  // teacher's group (teacherUid, no centerId) — see joinGroupAsUser vs
  // joinIndependentGroupByCode in corpService.js / independentTeacherService.js.
  const groupPath = (m) => m.independent
    ? `independentTeachers/${m.teacherUid}/groups/${m.groupId}`
    : `centers/${m.centerId}/groups/${m.groupId}`;

  // Fetch all joined groups reactively and filter deleted ones
  useEffect(() => {
    if (!user) return;
    const membershipsRef = ref(db, `users/${user.uid}/groupMemberships`);
    const unsub = onValue(membershipsRef, async (snap) => {
      if (snap.exists()) {
        const rawList = Object.values(snap.val());
        const validList = [];
        for (const m of rawList) {
          try {
            const groupSnap = await get(ref(db, groupPath(m)));
            if (groupSnap.exists()) {
              validList.push(m);
            } else {
              // Group no longer exists (deleted by teacher)! Remove stale pointer
              await remove(ref(db, `users/${user.uid}/groupMemberships/${m.groupId}`));
            }
          } catch {
            validList.push(m);
          }
        }
        setMemberships(validList);
      } else {
        setMemberships([]);
      }
    });
    return unsub;
  }, [user]);

  // Close switcher on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target)) {
        setShowSwitcher(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitchToIndividual = async () => {
    try {
      await setAppMode(user.uid, 'individual');
      setShowSwitcher(false);
      navigate('/');
    } catch (err) {
      console.error('Error switching to individual mode:', err);
    }
  };

  const handleSwitchGroup = async (groupId) => {
    try {
      const targetM = memberships.find(m => m.groupId === groupId);
      if (targetM) {
        const groupSnap = await get(ref(db, groupPath(targetM)));
        if (!groupSnap.exists()) {
          await remove(ref(db, `users/${user.uid}/groupMemberships/${groupId}`));
          setMemberships(prev => prev.filter(m => m.groupId !== groupId));
          return;
        }
      }
      await switchActiveGroup(user.uid, groupId);
      setShowSwitcher(false);
      navigate('/corp/student');
    } catch (err) {
      console.error('Error switching group:', err);
    }
  };

  const handleJoinNewGroup = async (e) => {
    e.preventDefault();
    if (!pinCode.trim() || pinCode.length !== 6) {
      setJoinError('Group PIN code must be 6 digits.');
      return;
    }
    setJoining(true);
    setJoinError('');
    try {
      const profile = { name: user.displayName || user.email, email: user.email || '' };
      try {
        // A code is either a corp/center group code or an independent
        // teacher's group code — the two tables (groupCodes vs
        // independentGroupCodes) are disjoint, so try the corp one first and
        // only fall back to the independent one on a genuine "not found",
        // not on some other failure (permission/network) that shouldn't be
        // masked by a second, unrelated error.
        await joinGroupAsUser(pinCode.trim(), user.uid, profile);
      } catch (err) {
        if (err.message !== 'Invalid group code!') throw err;
        await joinIndependentGroupByCode(pinCode.trim(), user.uid, profile);
      }
      setPinCode('');
      setShowAddModal(false);
      setShowSwitcher(false);
      navigate('/corp/student');
    } catch (err) {
      setJoinError(err.message || 'An error occurred while joining group.');
    } finally {
      setJoining(false);
    }
  };

  const handleOpenAddModal = () => {
    setPinCode('');
    setJoinError('');
    setShowSwitcher(false);
    setShowAddModal(true);
  };

  const getGroupBadgeText = (m) => {
    if (!m) return 'G';
    const text = m.level || m.groupName || 'G';
    return text.substring(0, 2).toUpperCase();
  };

  // Cmd/Ctrl+K opens global search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    try {
      await logout();
    } catch {
      // silently fail
    }
  };

  const getInitials = () => {
    const name = user?.displayName || user?.email || '?';
    return name
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleAvatarClick = () => {
    if (appMode === 'group') {
      navigate('/corp/student/profile');
    } else {
      navigate('/profile');
    }
  };

  return (
    <header
      className={`navbar ${
        appMode === 'group'
          ? 'navbar--expanded navbar--corp-student'
          : (sidebarCollapsed ? 'navbar--collapsed' : 'navbar--expanded')
      }`}
    >
      {/* Hamburger — mobile only */}
      <button
        className="navbar-hamburger"
        onClick={onHamburgerClick}
        aria-label={t('nav.openMenu')}
      >
        <Menu size={20} strokeWidth={2.2} />
      </button>

      {/* Group Switcher dropdown (aligned responsive: left on mobile, right on desktop) */}
      <div className="navbar-group-switcher-wrapper" ref={switcherRef}>
        <button
          onClick={() => setShowSwitcher(!showSwitcher)}
          className="navbar-group-switcher-btn"
        >
          {activeCourse ? (
            <div style={{
              background: 'var(--accent-1-dim)',
              width: '24px',
              height: '24px',
              minWidth: '24px',
              minHeight: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              flexShrink: 0,
              lineHeight: 1
            }}>
              {activeCourse.icon}
            </div>
          ) : appMode === 'individual' ? (
            <div style={{
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#3b82f6',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={12} />
            </div>
          ) : (
            <div style={{
              background: '#22c55e',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              width: '24px',
              height: '24px',
              minWidth: '24px',
              minHeight: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              lineHeight: 1
            }}>
              {getGroupBadgeText(membership)}
            </div>
          )}
          <span>
            {activeCourse ? activeCourse.name : (appMode === 'individual' ? t('nav.personal') : (membership?.groupName || t('nav.group')))}
          </span>
          <ChevronDown size={12} style={{ color: 'var(--text-secondary)', transform: showSwitcher ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
        </button>

        {/* Switcher Popover */}
        {showSwitcher && (
          <div className="navbar-group-switcher-popover">
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {/* Personal Card */}
              <div
                onClick={handleSwitchToIndividual}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--accent-1-dim)',
                  color: 'var(--accent-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: appMode === 'individual' && !activeCourse ? '2px solid var(--accent-1)' : '1px solid var(--border)',
                  boxShadow: appMode === 'individual' && !activeCourse ? '0 0 10px var(--accent-1-dim)' : 'none'
                }}>
                  <User size={18} />
                </div>
                <span style={{ fontSize: '0.72rem', color: appMode === 'individual' && !activeCourse ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: appMode === 'individual' && !activeCourse ? 700 : 500, textAlign: 'center' }}>{t('nav.personal')}</span>
              </div>

              {/* Course Cards — self-started courses (e.g. Sicilian A1), shown before the group cards */}
              {myCourses.map((c) => {
                const isActive = location.pathname.startsWith(`/course/${c.id}`);
                return (
                  <div
                    key={c.id}
                    onClick={() => !isActive && handleOpenCourse(c)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: isActive ? 'var(--accent-1)' : 'var(--bg-tertiary)',
                      color: isActive ? '#fff' : 'var(--accent-1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      border: isActive ? '2px solid var(--accent-1)' : '1px solid var(--border)',
                      boxShadow: isActive ? '0 0 10px var(--accent-1-dim)' : 'none'
                    }}>
                      {c.icon}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isActive ? 700 : 500, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                      {c.name}
                    </span>
                  </div>
                );
              })}

              {/* Groups Cards */}
              {memberships.map((g) => {
                const isActive = appMode === 'group' && g.groupId === membership?.groupId;
                const badge = getGroupBadgeText(g);
                return (
                  <div 
                    key={g.groupId}
                    onClick={() => !isActive && handleSwitchGroup(g.groupId)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}
                  >
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: isActive ? 'var(--accent-2)' : 'var(--bg-tertiary)',
                      color: isActive ? '#fff' : 'var(--accent-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      border: isActive ? '2px solid var(--accent-2)' : '1px solid var(--border)',
                      boxShadow: isActive ? '0 0 10px var(--accent-2-dim)' : 'none'
                    }}>
                      {badge}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isActive ? 700 : 500, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                      {g.groupName}
                    </span>
                  </div>
                );
              })}

              {/* Join Card */}
              <div
                onClick={handleOpenAddModal}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px dashed var(--border)',
                  color: 'var(--accent-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Plus size={18} />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'center' }}>{t('nav.add')}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="navbar-right">

        <button
          className="navbar-search-btn"
          onClick={() => setSearchOpen(true)}
          aria-label={t('nav.search')}
          title={t('nav.searchHint')}
        >
          <Search size={18} strokeWidth={2.2} />
        </button>
        {!isOnline && (
          <div
            className="navbar-offline-badge"
            title={t('nav.offlineHint')}
          >
            <span className="offline-dot"></span>
            <span>{t('nav.offline')}</span>
          </div>
        )}
        <div className="navbar-user" ref={dropdownRef}>

          <button
            className="navbar-avatar-btn"
            onClick={handleAvatarClick}
            aria-label={t('nav.profile')}
            style={{ cursor: 'pointer' }}
          >
            {avatarSrc && !avatarError ? (
              <img src={avatarSrc} alt={user?.displayName || 'Avatar'} />
            ) : (
              getInitials()
            )}
          </button>

          {appMode !== 'group' && (
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="navbar-dropdown"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <div className="navbar-dropdown-header">
                    <div className="navbar-dropdown-name">
                      {user?.displayName || t('nav.user')}
                    </div>
                    <div className="navbar-dropdown-email">{user?.email}</div>
                  </div>

                  <Link
                    to="/profile"
                    className="navbar-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={16} strokeWidth={2.2} /> {t('nav.profile')}
                  </Link>

                  <Link
                    to="/stats"
                    className="navbar-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BarChart3 size={16} strokeWidth={2.2} /> {t('nav.statistics')}
                  </Link>

                  <Link
                    to="/settings"
                    className="navbar-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings size={16} strokeWidth={2.2} /> {t('nav.settings')}
                  </Link>

                  <button
                    className="navbar-dropdown-item danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} strokeWidth={2.2} /> {t('nav.logout')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {createPortal(
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              className="modal-overlay"
              onClick={() => setShowAddModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.14, ease: 'easeOut' } }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <motion.div
                className="modal navbar-add-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 4, transition: { duration: 0.14, ease: 'easeOut' } }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="modal-header">
                  <h2>{t('nav.add')}</h2>
                  <button className="btn btn-ghost btn-icon" onClick={() => setShowAddModal(false)} aria-label="Close">
                    <X size={18} />
                  </button>
                </div>

                <div className="modal-body">
                  {selectableCourses.length > 0 && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div className="navbar-join-form-label">Kurs boshlash</div>
                      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '8px' }}>
                        {selectableCourses.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => handleStartCourse(c)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '4px',
                              cursor: startingCourseId ? 'wait' : 'pointer',
                              width: '72px',
                              opacity: startingCourseId && startingCourseId !== c.id ? 0.5 : 1,
                            }}
                          >
                            <div style={{
                              width: '52px',
                              height: '52px',
                              borderRadius: '14px',
                              background: c.color || 'var(--accent-1-dim)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.4rem',
                              border: '1px solid var(--border)',
                            }}>
                              {startingCourseId === c.id ? '…' : c.icon}
                            </div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: 600, textAlign: 'center' }}>
                              {c.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="navbar-join-form-label">{t('profile.addTabJoinGroup')}</div>
                  <form onSubmit={handleJoinNewGroup} className="navbar-join-form">
                    <div className="navbar-join-form-label" style={{ marginTop: 0 }}>{t('profile.pinLabel')}</div>
                    <div className="navbar-join-form-row">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
                        className="navbar-join-form-input"
                        autoFocus
                      />
                      <button type="submit" disabled={joining} className="navbar-join-form-submit">
                        {joining ? '...' : t('profile.addBtn')}
                      </button>
                    </div>
                    {joinError && <span className="navbar-join-form-error">{joinError}</span>}
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
