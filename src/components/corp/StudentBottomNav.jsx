import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ClipboardList, User } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function StudentBottomNav() {
  const location = useLocation();

  // Hide bottom navigation bar when inside a pack/month/topic or practice mode
  const isInsidePackOrTopic =
    location.pathname.includes('/learn/month/') ||
    location.pathname.includes('/learn/topic/') ||
    location.pathname.includes('/corp/practice/');

  if (isInsidePackOrTopic) {
    return null;
  }

  const navItems = [
    { to: '/corp/student', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/corp/student/learn', label: 'Vocabulary', icon: BookOpen },
    { to: '/corp/student/assessment', label: 'Assessment', icon: ClipboardList },
    { to: '/corp/student/profile', label: 'Profile', icon: User },
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
