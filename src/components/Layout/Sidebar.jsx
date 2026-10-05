import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, FlaskConical, User, Presentation, Building2, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ConfirmSheet from '../corp/ConfirmSheet';
import { useStaffRole } from '../../hooks/useStaffRole';
import '../corp/CorpAdminSidebar.css';
// Still loaded for the shared .sidebar-link / .sidebar-overlay classes the
// personal course sidebar (pages/personal/course/CourseSidebar) uses.
import './Sidebar.css';

// Personal-mode sidebar — the same look as the corp student one
// (StudentSidebar): "vocabry.uz" wordmark on top, flat nav rows, solid blue
// in the light theme. Logout sits at the bottom (it also lives on the Profile page).
export default function Sidebar() {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { staffRole, staffPath, staffLabel, selectStaffPanel } = useStaffRole();

  const baseNavItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/library', icon: BookOpen, label: t('nav.library') },
    { to: '/grammar', icon: GraduationCap, label: t('nav.grammar') },
    { to: '/experiment', icon: FlaskConical, label: t('nav.lab') },
    { to: '/profile', icon: User, label: t('nav.profile') },
  ];

  // Teachers (and center admins) get a way back into their panel.
  const navItems = staffRole
    ? [...baseNavItems, { to: staffPath, icon: staffRole === 'center_admin' ? Building2 : Presentation, label: staffLabel, onSelect: selectStaffPanel }]
    : baseNavItems;

  const handleLogout = async () => {
    setConfirmOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <>
    <aside className="corp-admin-sidebar is-student is-personal">
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
              end={item.to === '/'}
              className={({ isActive }) => `sidebar-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => item.onSelect?.()}
              title={item.label}
            >
              <Icon size={23} strokeWidth={2.3} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <button type="button" className="sidebar-nav-btn sidebar-signout" onClick={() => setConfirmOpen(true)} title={t('profile.logOut')}>
        <LogOut size={23} strokeWidth={2.3} />
        <span>{t('profile.logOut')}</span>
      </button>
    </aside>

      {/* Outside the <aside>: its backdrop-filter would otherwise trap this fixed overlay inside the sidebar. */}
      <ConfirmSheet
        open={confirmOpen}
        danger
        title={t('profile.logOutConfirmTitle')}
        message={t('profile.logOutConfirmText')}
        confirmLabel={t('profile.logOut')}
        cancelLabel={t('profile.cancel')}
        onConfirm={handleLogout}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
