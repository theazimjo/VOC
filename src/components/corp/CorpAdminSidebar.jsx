import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Building2, LayoutDashboard, Users, GraduationCap, BookOpen,
  BarChart3, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import VocLogo from '../common/VocLogo';
import './CorpAdminSidebar.css';

export default function CorpAdminSidebar({ centerName, email }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/corp/admin', label: t('admin.navDashboard'), icon: LayoutDashboard, end: true },
    { to: '/corp/admin/teachers', label: t('admin.navTeachers'), icon: Users },
    { to: '/corp/admin/students', label: t('admin.navStudents'), icon: GraduationCap },
    { to: '/corp/admin/courses', label: t('admin.navCourses'), icon: BookOpen },
    { to: '/corp/admin/statistics', label: t('admin.navStatistics'), icon: BarChart3 },
    { to: '/corp/admin/settings', label: t('admin.navSettings'), icon: Settings },
  ];

  return (
    <aside className={`corp-admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Top / Brand */}
      <div className="sidebar-brand-header">
        <VocLogo collapsed={collapsed} subTitle={centerName ? `${centerName} • Admin` : 'Center Admin'} />

        <button
          className="sidebar-collapse-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight size={16} strokeWidth={2.4} /> : <ChevronLeft size={16} strokeWidth={2.4} />}
        </button>
      </div>

      {/* Navigation Menu */}
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

      {/* Footer / User Profile */}
      <div className="corp-sidebar-footer">
        {!collapsed && (
          <div className="admin-profile-info">
            <div className="admin-avatar">
              {(email || 'A')[0].toUpperCase()}
            </div>
            <div className="admin-email-text">
              <span className="adm-name">{email?.split('@')[0] || 'Admin'}</span>
              <span className="adm-mail">{email || 'admin@markaz.uz'}</span>
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
