import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, BarChart3, Settings } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function TeacherBottomNav() {
  const location = useLocation();

  const navItems = [
    {
      to: '/corp/teacher',
      label: 'Groups',
      icon: Users,
      isGroupTab: true,
    },
    {
      to: '/corp/teacher/courses',
      label: 'Words',
      icon: BookOpen,
    },
    {
      to: '/corp/teacher/statistics',
      label: 'Stats',
      icon: BarChart3,
    },
    {
      to: '/corp/teacher/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <nav className="bottom-nav teacher-bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = item.isGroupTab
          ? location.pathname === '/corp/teacher' ||
            location.pathname.startsWith('/corp/teacher/group/')
          : item.to === '/corp/teacher/settings'
          ? location.pathname.startsWith('/corp/teacher/settings') || location.pathname.startsWith('/corp/teacher/archive')
          : location.pathname.startsWith(item.to);

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-link ${isActive ? 'active' : ''}`}
          >
            {isActive && (
              <motion.span
                className="bottom-nav-active-pill"
                layoutId="teacherBottomNavPill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="bottom-nav-icon">
              <IconComponent size={20} strokeWidth={2.2} />
            </span>
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
