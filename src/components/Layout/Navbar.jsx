import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, BarChart3, Settings, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useAvatar } from '../../hooks/useAvatar';
import GlobalSearch from '../common/GlobalSearch';
import './Navbar.css';

export default function Navbar({ sidebarCollapsed, onHamburgerClick }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchOpen, setSearchOpen] = useState(false);
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);
  const dropdownRef = useRef(null);

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

  return (
    <header
      className={`navbar ${
        sidebarCollapsed ? 'navbar--collapsed' : 'navbar--expanded'
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
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-label="Profil menyusi"
          >
            {avatarSrc && !avatarError ? (
              <img src={avatarSrc} alt={user.displayName || 'Avatar'} />
            ) : (
              getInitials()
            )}
          </button>

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
        </div>
      </div>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
