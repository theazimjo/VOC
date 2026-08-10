import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, BarChart3, Settings, LogOut, Search, ChevronDown, Plus, Check, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAvatar } from '../../hooks/useAvatar';
import { useGroupMode } from '../../hooks/useGroupMode';
import { ref, onValue, get, remove } from 'firebase/database';
import { db } from '../../firebase';
import { switchActiveGroup, joinGroupAsUser, setAppMode } from '../../services/corpService';
import GlobalSearch from '../common/GlobalSearch';
import './Navbar.css';

export default function Navbar({ sidebarCollapsed, onHamburgerClick, appMode: layoutAppMode }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchOpen, setSearchOpen] = useState(false);
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { appMode, membership } = useGroupMode();
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState('');
  const switcherRef = useRef(null);

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
            const groupSnap = await get(ref(db, `centers/${m.centerId}/groups/${m.groupId}`));
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
        setShowJoinForm(false);
        setPinCode('');
        setJoinError('');
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
        const groupSnap = await get(ref(db, `centers/${targetM.centerId}/groups/${groupId}`));
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
      setJoinError('Guruh PIN kodi 6 xonali bo\'lishi kerak!');
      return;
    }
    setJoining(true);
    setJoinError('');
    try {
      await joinGroupAsUser(pinCode.trim(), user.uid, {
        name: user.displayName || user.email,
        email: user.email || ''
      });
      setPinCode('');
      setShowJoinForm(false);
      setShowSwitcher(false);
      navigate('/corp/student');
    } catch (err) {
      setJoinError(err.message || 'Ulanishda xatolik yuz berdi.');
    } finally {
      setJoining(false);
    }
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
        aria-label="Menyuni ochish"
      >
        <Menu size={20} strokeWidth={2.2} />
      </button>

      {/* Group Switcher dropdown (aligned responsive: left on mobile, right on desktop) */}
      <div className="navbar-group-switcher-wrapper" ref={switcherRef}>
        <button
          onClick={() => setShowSwitcher(!showSwitcher)}
          className="navbar-group-switcher-btn"
        >
          {appMode === 'individual' ? (
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
            {appMode === 'individual' ? 'Personal' : (membership?.groupName || 'Group')}
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
                  background: 'rgba(59, 130, 246, 0.12)',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: appMode === 'individual' ? '2px solid #3b82f6' : 'none',
                  boxShadow: appMode === 'individual' ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                }}>
                  <User size={18} />
                </div>
                <span style={{ fontSize: '0.72rem', color: appMode === 'individual' ? '#fff' : '#94a3b8', fontWeight: appMode === 'individual' ? 600 : 500, textAlign: 'center' }}>Personal</span>
              </div>

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
                      background: isActive ? '#22c55e' : '#14532d',
                      color: isActive ? '#fff' : '#4ade80',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      border: isActive ? '2px solid #22c55e' : 'none',
                      boxShadow: isActive ? '0 0 10px rgba(34, 197, 94, 0.3)' : 'none'
                    }}>
                      {badge}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: isActive ? '#fff' : '#94a3b8', fontWeight: isActive ? 600 : 500, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                      {g.groupName}
                    </span>
                  </div>
                );
              })}

              {/* Join Card */}
              <div 
                onClick={() => { setShowJoinForm(!showJoinForm); setJoinError(''); }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px dashed rgba(255, 255, 255, 0.15)',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Plus size={18} />
                </div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500, textAlign: 'center' }}>Add</span>
              </div>
            </div>

            {/* Pin Form */}
            {showJoinForm && (
              <form 
                onSubmit={handleJoinNewGroup}
                style={{ 
                  marginTop: '1rem', 
                  paddingTop: '1rem', 
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Enter 6-digit PIN:</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={pinCode}
                    onChange={e => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
                    style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: '#fff',
                      padding: '6px 8px',
                      fontSize: '0.8rem',
                      outline: 'none',
                      flex: 1,
                      fontFamily: 'monospace',
                      letterSpacing: '1px',
                      textAlign: 'center'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={joining}
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {joining ? '...' : "Add"}
                  </button>
                </div>
                {joinError && (
                  <span style={{ fontSize: '0.7rem', color: '#f87171', marginTop: '2px' }}>{joinError}</span>
                )}
              </form>
            )}
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="navbar-right">

        <button
          className="navbar-search-btn"
          onClick={() => setSearchOpen(true)}
          aria-label="Qidirish"
          title="Qidirish (Ctrl+K)"
        >
          <Search size={18} strokeWidth={2.2} />
        </button>
        {!isOnline && (
          <div
            className="navbar-offline-badge"
            title="Internet aloqasi yo'q. Loyihangiz offline rejimda ishlaydi va o'zgarishlar avtomatik saqlanib boradi."
          >
            <span className="offline-dot"></span>
            <span>Offline</span>
          </div>
        )}
        <div className="navbar-user" ref={dropdownRef}>

          <button
            className="navbar-avatar-btn"
            onClick={handleAvatarClick}
            aria-label="Profil"
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
                      {user?.displayName || 'Foydalanuvchi'}
                    </div>
                    <div className="navbar-dropdown-email">{user?.email}</div>
                  </div>

                  <Link
                    to="/profile"
                    className="navbar-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={16} strokeWidth={2.2} /> Profil
                  </Link>

                  <Link
                    to="/stats"
                    className="navbar-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BarChart3 size={16} strokeWidth={2.2} /> Statistika
                  </Link>

                  <Link
                    to="/settings"
                    className="navbar-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings size={16} strokeWidth={2.2} /> Sozlamalar
                  </Link>

                  <button
                    className="navbar-dropdown-item danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} strokeWidth={2.2} /> Chiqish
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
