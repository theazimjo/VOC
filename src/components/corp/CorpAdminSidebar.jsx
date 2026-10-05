import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Layers,
  Settings
} from 'lucide-react';
import './CorpAdminSidebar.css';

// Profile, settings shortcut and logout live in the CorpAdminTopbar now
// (top-right profile menu) — this sidebar is navigation only. Always
// expanded — no collapse/expand toggle.
export default function CorpAdminSidebar() {
  const navItems = [
    { to: '/corp/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/corp/admin/teachers', label: 'Faculty', icon: Users },
    { to: '/corp/admin/groups', label: 'Groups', icon: Layers },
    { to: '/corp/admin/students', label: 'Students', icon: GraduationCap },
    { to: '/corp/admin/courses', label: 'Courses', icon: BookOpen },
    { to: '/corp/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="corp-admin-sidebar">
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
              end={item.end}
              className={({ isActive }) => `sidebar-nav-btn ${isActive ? 'active' : ''}`}
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
