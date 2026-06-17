import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Sidebar.css';

const navItems = [
  { to: '/',         icon: '📊', label: 'Dashboard' },
  { to: '/library',  icon: '📚', label: 'Kutubxona' },
  { to: '/grammar',  icon: '📖', label: 'Grammatika' },
  { to: '/stats',    icon: '📈', label: 'Statistika' },
  { to: '/settings', icon: '⚙️', label: 'Sozlamalar' },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = async () => {
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
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={onMobileClose}
      />

      <motion.aside
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${
          mobileOpen ? 'mobile-open' : ''
        }`}
        layout
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className={`sidebar-logo theme-${theme}`}>
            {theme === 'ios' && (
              <>
                <span style={{ marginRight: '8px' }}></span>
                {!collapsed && <span>VOC iOS</span>}
              </>
            )}
            {theme === 'android' && (
              <>
                <span style={{ marginRight: '8px' }}>🤖</span>
                {!collapsed && <span>Material</span>}
              </>
            )}
            {theme === 'god-of-war' && (
              <>
                <span style={{ marginRight: '8px', color: '#b91c1c', fontWeight: 'bold' }}>Ω</span>
                {!collapsed && <span style={{ fontFamily: "'Cinzel', serif", letterSpacing: '1px' }}>RAGNARÖK</span>}
              </>
            )}
            {theme === 'halo' && (
              <>
                <span style={{ marginRight: '8px', color: '#06b6d4' }}>🛡️</span>
                {!collapsed && <span style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1.5px' }}>VOC-UNSC</span>}
              </>
            )}
            {theme === 'cyberpunk' && (
              <>
                <span style={{ marginRight: '8px', color: '#f43f5e', textShadow: '0 0 8px #f43f5e' }}>⚡</span>
                {!collapsed && <span style={{ fontFamily: "'Orbitron', sans-serif", textTransform: 'uppercase', color: '#00ffcc' }}>Glitch_</span>}
              </>
            )}
            {theme === 'kingdom-come' && (
              <>
                <span style={{ marginRight: '8px', color: '#ca8a04' }}>⚜️</span>
                {!collapsed && <span style={{ fontFamily: "'MedievalSharp', serif", fontStyle: 'italic' }}>Chronicles</span>}
              </>
            )}
            {theme === 'resident-evil' && (
              <>
                <span style={{ marginRight: '8px', color: '#dc2626' }}>☣️</span>
                {!collapsed && <span style={{ fontFamily: "'Oswald', sans-serif", color: '#dc2626', letterSpacing: '1px' }}>UMBRELLA</span>}
              </>
            )}
          </div>
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={collapsed ? 'Kengaytirish' : 'Yig\'ish'}
            title={collapsed ? 'Kengaytirish' : 'Yig\'ish'}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={onMobileClose}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer — user info */}
        <div className="sidebar-footer">
          <div className="sidebar-avatar">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'Avatar'} />
            ) : (
              getInitials()
            )}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {user?.displayName || 'Foydalanuvchi'}
            </div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
          <button
            className="sidebar-logout"
            onClick={handleLogout}
            title="Chiqish"
            aria-label="Chiqish"
          >
            🚪
          </button>
        </div>
      </motion.aside>
    </>
  );
}
