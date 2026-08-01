import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, Building2, Users,
  Megaphone, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './CorpAdminSidebar.css';

export default function SuperAdminSidebar({ email }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/corp/super-admin', label: 'Boshqaruv', icon: LayoutDashboard, end: true },
    { to: '/corp/super-admin/centers', label: 'Markazlar', icon: Building2 },
    { to: '/corp/super-admin/users', label: 'Foydalanuvchilar', icon: Users },
    { to: '/corp/super-admin/announcements', label: 'E\'lonlar', icon: Megaphone },
    { to: '/corp/super-admin/settings', label: 'Sozlamalar', icon: Settings },
  ];

  return (
    <aside className={`corp-admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand-header">
        <div className="brand-logo-wrap">
          <Shield size={22} strokeWidth={2.4} />
        </div>
        {!collapsed && (
          <div className="brand-text-meta">
            <span className="center-title">VOC Corporate</span>
            <span className="center-role-tag">Super Admin</span>
          </div>
        )}

        <button
          className="sidebar-collapse-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Kengaytirish" : "Yig'ish"}
          aria-label={collapsed ? "Kengaytirish" : "Yig'ish"}
        >
          {collapsed ? <ChevronRight size={16} strokeWidth={2.4} /> : <ChevronLeft size={16} strokeWidth={2.4} />}
        </button>
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

        <button className="btn-corp-logout" onClick={handleLogout} title="Chiqish">
          <LogOut size={16} strokeWidth={2.2} />
          {!collapsed && <span>Chiqish</span>}
        </button>
      </div>
    </aside>
  );
}
