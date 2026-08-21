import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAvatar } from '../../hooks/useAvatar';
import { LayoutDashboard, BookOpen, GraduationCap, LogOut, Shield, FlaskConical } from 'lucide-react';
import VocLogo from '../common/VocLogo';
import './Sidebar.css';

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);

  const baseNavItems = [
    { to: '/',         icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/library',  icon: BookOpen,        label: t('nav.library') },
    { to: '/grammar',  icon: GraduationCap,   label: t('nav.grammar') },
    { to: '/experiment', icon: FlaskConical,   label: t('nav.lab') },
  ];

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
    navItems.push({ to: '/admin', icon: Shield, label: t('nav.admin') });
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sidebar-overlay visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${
          mobileOpen ? 'mobile-open' : ''
        }`}
        layout
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <motion.div 
            className="sidebar-logo-wrapper"
            onClick={onToggle} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            title={collapsed ? t('nav.expand') : t('nav.collapse')}
          >
            <VocLogo collapsed={collapsed} />
          </motion.div>
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
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        className="sidebar-link-active-bg"
                        layoutId="activeSidebarIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <motion.span 
                      className="sidebar-link-icon"
                      whileHover={{ scale: 1.15, rotate: -4 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <IconComponent size={20} strokeWidth={2.2} />
                    </motion.span>
                    <AnimatePresence mode="wait">
                      {!collapsed && (
                        <motion.span 
                          className="sidebar-link-text"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.18 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer — user info */}
        <div className="sidebar-footer">
          <motion.div 
            className="sidebar-avatar"
            title={collapsed ? (user?.displayName || t('nav.user')) : undefined}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {avatarSrc && !avatarError ? (
              <img src={avatarSrc} alt={user?.displayName || 'Avatar'} />
            ) : (
              getInitials()
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div 
                className="sidebar-user-info"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
              >
                <div className="sidebar-user-name">
                  {user?.displayName || t('nav.user')}
                </div>
                <div className="sidebar-user-email">{user?.email}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            className="sidebar-logout"
            onClick={handleLogout}
            aria-label={t('nav.logout')}
            title={t('nav.logout')}
            whileHover={{ scale: 1.12, rotate: -6 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <LogOut size={16} strokeWidth={2.2} />
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}
