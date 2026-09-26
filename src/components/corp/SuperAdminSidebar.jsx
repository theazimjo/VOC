import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users,
  Settings, LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import VocLogo from '../common/VocLogo';
import { useSidebarCollapsed } from './useSidebarCollapsed';
import './CorpAdminSidebar.css';

export default function SuperAdminSidebar({ email }) {
  const [collapsed, toggleCollapsed] = useSidebarCollapsed();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/corp/super-admin', label: 'Bosh sahifa', icon: LayoutDashboard, end: true },
    { to: '/corp/super-admin/centers', label: 'Markazlar', icon: Building2 },
    { to: '/corp/super-admin/users', label: 'Foydalanuvchilar', icon: Users },
    // Announcements live under Settings — rarely used, not worth a tab.
    { to: '/corp/super-admin/settings', label: 'Sozlamalar', icon: Settings },
  ];

  return (
    <aside className={`corp-admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand-header">
        <VocLogo collapsed={collapsed} onClick={toggleCollapsed} subTitle="Super Admin" />
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
              <Icon size={20} strokeWidth={2.2} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="corp-sidebar-footer">
        {!collapsed && (
          <div className="admin-profile-info">
            <div className="admin-avatar">{(email || 'S')[0].toUpperCase()}</div>
            <div className="admin-email-text">
              <span className="adm-name">{email?.split('@')[0] || 'Super Admin'}</span>
              <span className="adm-mail">{email || ''}</span>
            </div>
          </div>
        )}

        <button className="btn-corp-logout" onClick={handleLogout} title={t('admin.logoutBtn')}>
          <LogOut size={16} strokeWidth={2.2} />
          {!collapsed && <span>{t('admin.logoutBtn')}</span>}
        </button>
      </div>
    </aside>
  );
}
