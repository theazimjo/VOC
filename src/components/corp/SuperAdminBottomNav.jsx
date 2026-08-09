import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, Megaphone, Settings } from 'lucide-react';
import '../Layout/BottomNav.css';

export default function SuperAdminBottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/corp/super-admin', label: 'Boshqaruv', icon: LayoutDashboard, end: true },
    { to: '/corp/super-admin/centers', label: 'Markazlar', icon: Building2 },
    { to: '/corp/super-admin/users', label: 'Foydalanuvchi', icon: Users },
    { to: '/corp/super-admin/announcements', label: "E'lonlar", icon: Megaphone },
    { to: '/corp/super-admin/settings', label: 'Sozlamalar', icon: Settings },
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
