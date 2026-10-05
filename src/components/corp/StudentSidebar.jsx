import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, User, LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStudentT } from '../../hooks/useStudentT';
import ConfirmSheet from './ConfirmSheet';
import './CorpAdminSidebar.css';

export default function StudentSidebar() {
  const { t } = useStudentT();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navItems = [
    { to: '/corp/student', label: t('nav.home'), icon: LayoutDashboard },
    { to: '/corp/student/learn', label: t('nav.words'), icon: BookOpen },
    { to: '/corp/student/profile', label: t('nav.profile'), icon: User },
  ];

  const handleLogout = async () => {
    setConfirmOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <>
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
      <button type="button" className="sidebar-nav-btn sidebar-signout" onClick={() => setConfirmOpen(true)} title={t('profile.logout')}>
        <LogOut size={23} strokeWidth={2.3} />
        <span>{t('profile.logout')}</span>
      </button>
    </aside>

      {/* Outside the <aside>: its backdrop-filter would otherwise trap this fixed overlay inside the sidebar. */}
      <ConfirmSheet
        open={confirmOpen}
        danger
        title={t('profile.logoutTitle')}
        message={t('profile.logoutText')}
        confirmLabel={t('profile.logout')}
        cancelLabel={t('profile.cancel')}
        onConfirm={handleLogout}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
