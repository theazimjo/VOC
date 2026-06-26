import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

export default function Navbar({ sidebarCollapsed, onHamburgerClick }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setImageError(false);
  }, [user?.photoURL]);

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
        ☰
      </button>

      {/* Search */}
      <div className="navbar-search">
        <span className="navbar-search-icon">🔍</span>
        <input
          type="text"
          className="navbar-search-input"
          placeholder="So'z, kitob yoki to'plam qidirish…"
          readOnly
        />
      </div>

      {/* Right side */}
      <div className="navbar-right">
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
            {user?.photoURL && !imageError ? (
              <img src={user.photoURL} alt={user.displayName || 'Avatar'} onError={() => setImageError(true)} />
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
                  <span>👤</span> Profil
                </Link>

                <Link
                  to="/stats"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span>📈</span> Statistika
                </Link>

                <Link
                  to="/settings"
                  className="navbar-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span>⚙️</span> Sozlamalar
                </Link>

                <button
                  className="navbar-dropdown-item danger"
                  onClick={handleLogout}
                >
                  <span>🚪</span> Chiqish
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
