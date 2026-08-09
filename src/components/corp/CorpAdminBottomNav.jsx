import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, BarChart3, Settings } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function CorpAdminBottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/corp/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/corp/admin/teachers', label: 'Teachers', icon: Users },
    { to: '/corp/admin/courses', label: 'Courses', icon: BookOpen },
    { to: '/corp/admin/statistics', label: 'Stats', icon: BarChart3 },
    { to: '/corp/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = item.end
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-link ${isActive ? 'active' : ''}`}
          >
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
