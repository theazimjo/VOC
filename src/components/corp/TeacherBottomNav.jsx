import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, BarChart3, Settings } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function TeacherBottomNav({ basePath = '/corp/teacher' }) {
  const location = useLocation();

  const navItems = [
    {
      to: basePath,
      label: 'Groups',
      icon: Users,
      isGroupTab: true,
    },
    {
      to: `${basePath}/courses`,
      label: 'Words',
      icon: BookOpen,
    },
    {
      to: `${basePath}/statistics`,
      label: 'Stats',
      icon: BarChart3,
    },
    {
      to: `${basePath}/settings`,
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <nav className="bottom-nav teacher-bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = item.isGroupTab
          ? location.pathname === basePath ||
            location.pathname.startsWith(`${basePath}/group/`)
          : item.to === `${basePath}/settings`
          ? location.pathname.startsWith(`${basePath}/settings`) || location.pathname.startsWith(`${basePath}/archive`)
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
