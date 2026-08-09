import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, Users, BookOpen,
  BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Moon, Sun
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './CorpAdminSidebar.css';

export default function TeacherSidebar({ centerName, teacherName, email, phone }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isDarkMode = theme === 'android';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'ios' : 'android');
  };

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
        <button
          className="btn-corp-theme-toggle"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '9px 12px',
            borderRadius: '12px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 150ms ease',
            justifyContent: collapsed ? 'center' : 'flex-start'
          }}
        >
          {isDarkMode ? <Sun size={17} style={{ color: '#ff9500' }} /> : <Moon size={17} style={{ color: '#5856d6' }} />}
          {!collapsed && <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>}
        </button>

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
