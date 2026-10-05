import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, User
} from 'lucide-react';
import { useStudentT } from '../../hooks/useStudentT';
import './CorpAdminSidebar.css';

export default function StudentSidebar() {
  const { t } = useStudentT();
  const navItems = [
    { to: '/corp/student', label: t('nav.home'), icon: LayoutDashboard },
    { to: '/corp/student/learn', label: t('nav.words'), icon: BookOpen },
    { to: '/corp/student/profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <aside className="corp-admin-sidebar is-student">
      <div className="sidebar-brand-header">
        <span className="voc-logo-title sidebar-brand-name">
          vocabry<span className="sidebar-brand-tld">.uz</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="corp-sidebar-nav">
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
              <Icon size={23} strokeWidth={2.3} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
