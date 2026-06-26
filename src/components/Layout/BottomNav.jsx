import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, Settings } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav() {
  const navItems = [
    { to: '/',         icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/library',  icon: BookOpen,        label: 'Kutubxona' },
    { to: '/grammar',  icon: GraduationCap,   label: 'Grammatika' },
    { to: '/settings', icon: Settings,        label: 'Sozlamalar' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
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

