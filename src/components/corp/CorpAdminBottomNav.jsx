import { useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, BookOpen, Layers } from 'lucide-react';
import '../Layout/BottomNav.css';

// Five tabs max on a phone; Settings opens from the gear on the home page.
export default function CorpAdminBottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/corp/admin', label: 'Asosiy', icon: LayoutDashboard, end: true, alsoActive: '/corp/admin/settings' },
    { to: '/corp/admin/teachers', label: "O'qituvchi", icon: Users },
    { to: '/corp/admin/groups', label: 'Guruhlar', icon: Layers },
    { to: '/corp/admin/students', label: "O'quvchi", icon: GraduationCap },
    { to: '/corp/admin/courses', label: 'Kurslar', icon: BookOpen },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to))
          || (item.alsoActive && location.pathname.startsWith(item.alsoActive));

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
