import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Users, BookOpen, Settings, LogOut, Repeat
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { setActiveProfile } from '../../utils/activeProfile';
import VocLogo from '../common/VocLogo';
import { useSidebarCollapsed } from './useSidebarCollapsed';
import './CorpAdminSidebar.css';

export default function TeacherSidebar({ centerName, teacherName, email, phone, basePath = '/corp/teacher' }) {
  const [collapsed, toggleCollapsed] = useSidebarCollapsed();
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
    { to: basePath, label: 'Guruhlarim', icon: Users, isGroupTab: true },
    { to: `${basePath}/courses`, label: "So'z to'plamlari", icon: BookOpen },
    { to: `${basePath}/settings`, label: 'Sozlamalar', icon: Settings, },
  ];

  return (
    <aside className={`corp-admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Top / Brand */}
      <div className="sidebar-brand-header">
        <VocLogo collapsed={collapsed} onClick={toggleCollapsed} subTitle={centerName ? `${centerName} · O'qituvchi` : "O'qituvchi"} />
      </div>

      {/* Navigation Menu */}
      <nav className="corp-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isGroupTab
            ? (location.pathname === basePath || location.pathname.startsWith(`${basePath}/group/`) || location.pathname.startsWith(`${basePath}/archive`))
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
              <span className="adm-name">{teacherName || "O'qituvchi"}</span>
              <span className="adm-mail">{phone || email}</span>
            </div>
          </div>
        )}

        <button className="btn-corp-logout" onClick={handleSwitchToPersonal} title="Shaxsiy rejimga o'tish">
          <Repeat size={16} strokeWidth={2.2} />
          {!collapsed && <span>Shaxsiy rejimga o'tish</span>}
        </button>

        <button className="btn-corp-logout" onClick={handleLogout} title="Chiqish">
          <LogOut size={16} strokeWidth={2.2} />
          {!collapsed && <span>Chiqish</span>}
        </button>
      </div>
    </aside>
  );
}
