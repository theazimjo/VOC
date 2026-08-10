import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, Users, BookOpen,
  BarChart3, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './CorpAdminSidebar.css';

export default function TeacherSidebar({ centerName, teacherName, email, phone }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/corp/teacher', label: 'My Groups', icon: Users, isGroupTab: true },
    { to: '/corp/teacher/courses', label: 'Word Bank', icon: BookOpen },
    { to: '/corp/teacher/statistics', label: 'Statistics', icon: BarChart3 },
    { to: '/corp/teacher/settings', label: 'Settings', icon: Settings, matchExtra: '/corp/teacher/archive' },
  ];

  return (
    <aside className={`corp-admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Top / Brand */}
      <div className="sidebar-brand-header">
        <div className="brand-logo-wrap">
          <Building2 size={22} strokeWidth={2.4} />
        </div>
        {!collapsed && (
          <div className="brand-text-meta">
            <span className="center-title">{centerName || 'Learning Center'}</span>
            <span className="center-role-tag">Teacher</span>
          </div>
        )}

        <button
          className="sidebar-collapse-toggle"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand' : 'Collapse'}
          aria-label={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={16} strokeWidth={2.4} /> : <ChevronLeft size={16} strokeWidth={2.4} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="corp-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isGroupTab
            ? (location.pathname === '/corp/teacher' || location.pathname.startsWith('/corp/teacher/group/'))
            : location.pathname.startsWith(item.to) || (item.matchExtra && location.pathname.startsWith(item.matchExtra));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <Icon size={20} strokeWidth={2.2} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="corp-sidebar-footer">
        {!collapsed && (
          <div className="admin-profile-info">
            <div className="admin-avatar">
              {(teacherName || email || 'T')[0].toUpperCase()}
            </div>
            <div className="admin-email-text">
              <span className="adm-name">{teacherName || 'Teacher'}</span>
              <span className="adm-mail">{phone || email || 'Teacher account'}</span>
            </div>
          </div>
        )}

        <button className="btn-corp-logout" onClick={handleLogout} title="Log out">
          <LogOut size={16} strokeWidth={2.2} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
