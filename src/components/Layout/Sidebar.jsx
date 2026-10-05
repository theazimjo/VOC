import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, GraduationCap, FlaskConical, User, Presentation, Building2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useStaffRole } from '../../hooks/useStaffRole';
import '../corp/CorpAdminSidebar.css';
// Still loaded for the shared .sidebar-link / .sidebar-overlay classes the
// personal course sidebar (pages/personal/course/CourseSidebar) uses.
import './Sidebar.css';

// Personal-mode sidebar — the same look as the corp student one
// (StudentSidebar): "vocabry.uz" wordmark on top, flat nav rows, solid blue
// in the light theme. Profile and logout live on the Profile page.
export default function Sidebar() {
  const { t } = useLanguage();
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

  return (
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
    </aside>
  );
}
