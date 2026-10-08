import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, Settings, LogOut, Newspaper } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './CorpAdminSidebar.css';

// Same sidebar as the center admin panel (CorpAdminSidebar): navigation only,
// always expanded; profile and settings live in the topbar's profile menu.
export default function SuperAdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/corp/super-admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/corp/super-admin/centers', label: 'Centers', icon: Building2 },
    { to: '/corp/super-admin/users', label: 'Users', icon: Users },
    { to: '/corp/super-admin/blog', label: 'Blog', icon: Newspaper },
    // Announcements live under Settings — rarely used, not worth a tab.
    { to: '/corp/super-admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="corp-admin-sidebar">
      <div className="sidebar-brand-header">
        <span className="voc-logo-title sidebar-brand-name">
          vocabry<span className="sidebar-brand-tld">.uz</span>
        </span>
      </div>

      <nav className="corp-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `sidebar-nav-btn ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <Icon size={23} strokeWidth={2.3} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button type="button" className="sidebar-nav-btn sidebar-logout" onClick={handleLogout}>
        <LogOut size={23} strokeWidth={2.3} />
        <span>Log out</span>
      </button>
    </aside>
  );
}
