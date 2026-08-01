import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, Settings } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function StudentBottomNav() {
  const navItems = [
    { to: '/corp/student', label: 'Asosiy', icon: LayoutDashboard },
    { to: '/corp/student/practice', label: 'Practice', icon: BookOpen },
    { to: '/corp/student/profile', label: 'Profile', icon: User },
    { to: '/corp/student/settings', label: 'More', icon: Settings },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/corp/student'}
            className={({ isActive }) =>
              `bottom-nav-link ${isActive ? 'active' : ''}`
            }
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
