import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, ClipboardList, User
} from 'lucide-react';
import VocLogo from '../common/VocLogo';
import './CorpAdminSidebar.css';

export default function StudentSidebar() {
  const location = useLocation();

  const navItems = [
    { to: '/corp/student', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/corp/student/learn', label: 'Vocabulary', icon: BookOpen },
    { to: '/corp/student/assessment', label: 'Assessment', icon: ClipboardList },
    { to: '/corp/student/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="corp-admin-sidebar">
      {/* Sidebar Top / Brand */}
      <div className="sidebar-brand-header" style={{ padding: '1.25rem 1.5rem 1rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <VocLogo subTitle="Student Portal" />
      </div>

      {/* Navigation Menu */}
      <nav className="corp-sidebar-nav" style={{ marginTop: '1.5rem' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/corp/student'}
              className={({ isActive }) => `sidebar-nav-btn ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <Icon size={20} strokeWidth={2.2} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
