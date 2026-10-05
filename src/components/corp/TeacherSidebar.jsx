import { NavLink, useLocation } from 'react-router-dom';
import { Users, BookOpen, Settings } from 'lucide-react';
import './CorpAdminSidebar.css';

// Same sidebar as the center admin's (CorpAdminSidebar): brand on top,
// navigation only, always expanded. Profile, personal mode and logout live
// in TeacherTopbar's profile menu.
export default function TeacherSidebar({ basePath = '/corp/teacher' }) {
  const { pathname } = useLocation();
  const inGroups = pathname === basePath
    || pathname.startsWith(`${basePath}/group/`)
    || pathname.startsWith(`${basePath}/archive`);

  const navItems = [
    { to: basePath, label: 'My Groups', icon: Users, active: inGroups },
    { to: `${basePath}/courses`, label: 'Word Packs', icon: BookOpen },
    { to: `${basePath}/settings`, label: 'Settings', icon: Settings },
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
              end={item.to === basePath}
              className={({ isActive }) => `sidebar-nav-btn ${(item.active ?? isActive) ? 'active' : ''}`}
              title={item.label}
            >
              <Icon size={23} strokeWidth={2.3} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
