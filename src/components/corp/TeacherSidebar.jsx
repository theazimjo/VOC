import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Building2, Users, BookOpen,
  BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Repeat
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { setActiveProfile } from '../../utils/activeProfile';
import VocLogo from '../common/VocLogo';
import './CorpAdminSidebar.css';

export default function TeacherSidebar({ centerName, teacherName, email, phone, basePath = '/corp/teacher' }) {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSwitchToPersonal = () => {
    setActiveProfile('personal');
    navigate('/');
  };

  const navItems = [
    { to: basePath, label: 'My Groups', icon: Users, isGroupTab: true },
    { to: `${basePath}/courses`, label: 'Word Bank', icon: BookOpen },
    { to: `${basePath}/statistics`, label: 'Statistics', icon: BarChart3 },
    { to: `${basePath}/settings`, label: 'Settings', icon: Settings, matchExtra: `${basePath}/archive` },
  ];

  return (
    <aside className={`corp-admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Top / Brand */}
      <div className="sidebar-brand-header">
        <VocLogo collapsed={collapsed} subTitle={centerName ? `${centerName} • Teacher` : 'Teacher'} />

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
            ? (location.pathname === basePath || location.pathname.startsWith(`${basePath}/group/`))
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

        <button className="btn-corp-logout" onClick={handleSwitchToPersonal} title="Switch to Personal">
          <Repeat size={16} strokeWidth={2.2} />
          {!collapsed && <span>Switch to Personal</span>}
        </button>

        <button className="btn-corp-logout" onClick={handleLogout} title="Log out">
          <LogOut size={16} strokeWidth={2.2} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
