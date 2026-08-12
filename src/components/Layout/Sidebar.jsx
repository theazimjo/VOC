import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useAvatar } from '../../hooks/useAvatar';
import { LayoutDashboard, BookOpen, GraduationCap, Trophy, Settings, ChevronLeft, ChevronRight, LogOut, Shield, FlaskConical } from 'lucide-react';
import VocLogo from '../common/VocLogo';
import './Sidebar.css';

const baseNavItems = [
  { to: '/',         icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/library',  icon: BookOpen,        label: 'Library' },
  { to: '/grammar',  icon: GraduationCap,   label: 'Grammar' },
  { to: '/experiment', icon: FlaskConical,   label: 'Lab' },
];


export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);

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

  const navItems = [...baseNavItems];
  const SUPER_ADMINS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];
  if (user?.email && SUPER_ADMINS.includes(user.email.toLowerCase())) {
    navItems.push({ to: '/admin', icon: Shield, label: 'Admin Panel' });
  }

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
          <VocLogo collapsed={collapsed} />
          <button
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={collapsed ? 'Expand' : 'Collapse'}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronRight size={16} strokeWidth={2.4} /> : <ChevronLeft size={16} strokeWidth={2.4} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
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
                <span className="sidebar-link-icon">
                  <IconComponent size={20} strokeWidth={2.2} />
                </span>
                <span className="sidebar-link-text">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer — user info */}
        <div className="sidebar-footer">
          <div className="sidebar-avatar">
            {avatarSrc && !avatarError ? (
              <img src={avatarSrc} alt={user.displayName || 'Avatar'} />
            ) : (
              getInitials()
            )}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">
              {user?.displayName || 'User'}
            </div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
          <button
            className="sidebar-logout"
            onClick={handleLogout}
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut size={16} strokeWidth={2.2} />
          </button>
        </div>
      </motion.aside>
    </>
  );
}
