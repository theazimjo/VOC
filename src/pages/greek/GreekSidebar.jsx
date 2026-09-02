import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Type, BookOpenText, GraduationCap } from 'lucide-react';
import '../../components/Layout/Sidebar.css';
import './GreekSidebar.css';

// Mirrors CourseSidebar's pattern (a self-contained section gets its own
// fixed left sidebar instead of the personal Sidebar) — but with its own nav
// items, since the Greek track is a standalone Dashboard/Alphabet/
// Vocabulary/Grammar sequence, not the shared Dashboard/Lesson/Vocabulary
// course model.
export default function GreekSidebar({ pack, collapsed, mobileOpen, onMobileClose }) {
  const navItems = [
    { to: `/greek/${pack.id}`, end: true, icon: LayoutDashboard, label: 'Bosh sahifa' },
    { to: `/greek/${pack.id}/alphabet`, end: false, icon: Type, label: 'Alifbo' },
    { to: `/greek/${pack.id}/vocabulary`, end: false, icon: BookOpenText, label: "So'z boyligi" },
    { to: `/greek/${pack.id}/grammar`, end: false, icon: GraduationCap, label: 'Grammatika' },
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
          <span className="course-sidebar-icon">{pack.icon || '🏛️'}</span>
          {!collapsed && <span className="course-sidebar-name">{pack.name}</span>}
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
                        layoutId="activeGreekSidebarIndicator"
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
