import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const navItems = [
  { to: '/',         icon: '📊', label: 'Dashboard' },
  { to: '/library',  icon: '📚', label: 'Kutubxona' },
  { to: '/practice', icon: '🎮', label: 'Mashq' },
  { to: '/stats',    icon: '📈', label: 'Statistika' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `bottom-nav-link ${isActive ? 'active' : ''}`
          }
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
