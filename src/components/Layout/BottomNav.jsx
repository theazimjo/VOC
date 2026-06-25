import { NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './BottomNav.css';

export default function BottomNav() {
  const { theme } = useTheme();

  // Themed icons map
  const themeIcons = {
    ios: {
      dashboard: '📊',
      library: '📚',
      stats: '📈',
      settings: '⚙️'
    },
    android: {
      dashboard: '🤖',
      library: '📖',
      stats: '📊',
      settings: '⚙️'
    }
  };

  const icons = themeIcons[theme] || themeIcons.ios;

  const navItems = [
    { to: '/',         icon: icons.dashboard, label: 'Dashboard' },
    { to: '/library',  icon: icons.library,   label: 'Kutubxona' },
    { to: '/grammar',  icon: '📖',            label: 'Grammatika' },
    { to: '/stories',  icon: '✨',            label: 'Hikoyalar' },
    { to: '/witcher',  icon: '⚔️',            label: 'Witcher' },
  ];

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

