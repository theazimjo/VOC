import { useLocation, Link } from 'react-router-dom';
import { Users, BookOpen, Settings } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function TeacherBottomNav({ basePath = '/corp/teacher' }) {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      to: basePath,
      label: 'Groups',
      icon: Users,
      active: path === basePath || path.startsWith(`${basePath}/group/`) || path.startsWith(`${basePath}/archive`),
    },
    { to: `${basePath}/courses`, label: 'Packs', icon: BookOpen, active: path.startsWith(`${basePath}/courses`) },
    { to: `${basePath}/settings`, label: 'Settings', icon: Settings, active: path.startsWith(`${basePath}/settings`) },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, label, icon: Icon, active }) => (
        <Link key={to} to={to} className={`bottom-nav-link ${active ? 'active' : ''}`}>
          <span className="bottom-nav-icon">
            <Icon size={20} strokeWidth={2.2} />
          </span>
          <span className="bottom-nav-label">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
