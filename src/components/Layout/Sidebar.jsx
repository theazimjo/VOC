import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAvatar } from '../../hooks/useAvatar';
import { LayoutDashboard, BookOpen, GraduationCap, LogOut, Shield, FlaskConical, ChevronLeft, ChevronRight, User } from 'lucide-react';
import VocLogo from '../common/VocLogo';
import './Sidebar.css';

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { avatarSrc, avatarError } = useAvatar(user?.photoURL);

  const baseNavItems = [
    { to: '/',         icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/library',  icon: BookOpen,        label: t('nav.library') },
    { to: '/grammar',  icon: GraduationCap,   label: t('nav.grammar') },
    { to: '/experiment', icon: FlaskConical,   label: t('nav.lab') },
    { to: '/profile',  icon: User,            label: t('nav.profile') },
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

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (collapsed) {
      onToggle();
    }
    navigate('/profile');
    if (onMobileClose) onMobileClose();
  };

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
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <div 
            className="sidebar-logo-wrapper" 
            title={collapsed ? t('nav.expand') : t('nav.collapse')}
          >
            <VocLogo collapsed={collapsed} onClick={onToggle} />
          </div>

          <motion.button
            className="sidebar-edge-toggle-btn"
            onClick={onToggle}
            aria-label={collapsed ? t('nav.expand') : t('nav.collapse')}
            title={collapsed ? t('nav.expand') : t('nav.collapse')}
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <motion.span
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChevronLeft size={15} strokeWidth={2.4} />
            </motion.span>
          </motion.button>
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
                    <AnimatePresence initial={false}>
                      {!collapsed && (
                        <motion.span 
                          className="sidebar-link-text"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
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
            className="sidebar-profile-card"
            onClick={handleProfileClick}
            title={collapsed ? `${t('nav.profile')} (${t('nav.expand')})` : t('nav.profile')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <motion.div 
              className="sidebar-avatar"
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

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div 
                  className="sidebar-user-info"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <div className="sidebar-user-name">
                    {user?.displayName || t('nav.user')}
                  </div>
                  <div className="sidebar-user-email">{user?.email}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.button
                className="sidebar-logout"
                onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                aria-label={t('nav.logout')}
                title={t('nav.logout')}
                whileHover={{ scale: 1.12, rotate: -6 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <LogOut size={16} strokeWidth={2.2} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
