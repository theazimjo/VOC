import { useLocation, NavLink } from 'react-router-dom';
import { Users, Archive, BookOpen, BarChart3, Settings } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function TeacherBottomNav() {
  const location = useLocation();

  const navItems = [
    {
      to: '/corp/teacher',
      label: 'Guruhlar',
      icon: Users,
      isGroupTab: true,
    },
    {
      to: '/corp/teacher/archive',
      label: 'Arxiv',
      icon: Archive,
    },
    {
      to: '/corp/teacher/courses',
      label: "So'zlar",
      icon: BookOpen,
    },
    {
      to: '/corp/teacher/statistics',
      label: 'Statistika',
      icon: BarChart3,
    },
    {
      to: '/corp/teacher/settings',
      label: 'Sozlamalar',
      icon: Settings,
    },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = item.isGroupTab
          ? location.pathname === '/corp/teacher' ||
            location.pathname.startsWith('/corp/teacher/group/')
          : location.pathname.startsWith(item.to);

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`bottom-nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">
              <IconComponent size={20} strokeWidth={2.2} />
            </span>
            <span className="bottom-nav-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
