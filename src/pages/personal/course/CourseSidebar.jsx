import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookOpen, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import '../../../components/Layout/Sidebar.css';
import './CourseSidebar.css';

// Mirrors the personal Sidebar/StudentSidebar pattern — a course is its own
// section (like group mode swaps in StudentSidebar), so it gets the same
// fixed left sidebar instead of a top tab bar. No back button, by design —
// same as StudentSidebar: this section is only left via the navbar's
// switcher, not an in-page escape hatch.
export default function CourseSidebar({ pack, collapsed, mobileOpen, onMobileClose }) {
  const { t } = useLanguage();

  const navItems = [
    { to: `/course/${pack.id}`, end: true, icon: LayoutDashboard, label: t('course.tabDashboard') },
    { to: `/course/${pack.id}/lesson`, end: false, icon: BookOpen, label: t('course.tabLesson') },
    { to: `/course/${pack.id}/vocabulary`, end: false, icon: GraduationCap, label: t('course.tabVocabulary') },
  ];

  return (
    <>
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
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        layout
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sidebar-header course-sidebar-header">
          <span className="course-sidebar-icon">{pack.icon || '📘'}</span>
          {!collapsed && (
            <span className="course-sidebar-name">{pack.name}</span>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onMobileClose}
                title={collapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        className="sidebar-link-active-bg"
                        layoutId="activeCourseSidebarIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="sidebar-link-icon">
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    {!collapsed && <span className="sidebar-link-text">{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}
