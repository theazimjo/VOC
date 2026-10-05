import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronDown, Users, Layers, GraduationCap, BookOpen, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCenterData } from '../../pages/corp/center-admin/CenterDataContext';
import './CorpAdminTopbar.css';

const QUICK_ADD = [
  { to: '/corp/admin/teachers?new=teacher', label: 'New Teacher', icon: Users },
  { to: '/corp/admin/groups?new=group', label: 'New Group', icon: Layers },
  { to: '/corp/admin/students?new=student', label: 'New Student', icon: GraduationCap },
  { to: '/corp/admin/courses?new=course', label: 'New Course', icon: BookOpen },
];

const KIND_ICON = { teacher: Users, group: Layers, student: GraduationCap };
const KIND_LABEL = { teacher: 'Teacher', group: 'Group', student: 'Student' };

// Persistent header above every center-admin page: live search over
// teachers/groups/students, a quick-add jump menu and the profile menu
// (settings + logout moved out of the sidebar to live here instead).
// Center admin is unconditionally English (see DESIGN.md), so this uses
// its own literal strings rather than the app-wide t() translator —
// SuperAdminSidebar's Uzbek/Russian copy elsewhere isn't affected.
export default function CorpAdminTopbar({ centerName, email }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { teachers, activeGroups, students } = useCenterData();

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const searchRef = useRef(null);
  const addRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (addRef.current && !addRef.current.contains(e.target)) setAddOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const hits = [];
    teachers.forEach((tch) => {
      if (tch.name?.toLowerCase().includes(q)) hits.push({ kind: 'teacher', id: tch.id, title: tch.name, to: `/corp/admin/teachers/${tch.id}` });
    });
    activeGroups.forEach((g) => {
      if (g.name?.toLowerCase().includes(q)) hits.push({ kind: 'group', id: g.id, title: g.name, to: `/corp/admin/groups/${g.id}` });
    });
    const seenStudents = new Set();
    students.forEach((st) => {
      if (!seenStudents.has(st.uid) && st.name?.toLowerCase().includes(q)) {
        seenStudents.add(st.uid);
        hits.push({ kind: 'student', id: st.uid, title: st.name, sub: st.groupName, to: `/corp/admin/students/${st.uid}` });
      }
    });
    return hits.slice(0, 8);
  }, [query, teachers, activeGroups, students]);

  const goTo = (to) => {
    setQuery('');
    setSearchOpen(false);
    navigate(to);
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate('/login');
  };

  const profileName = email?.split('@')[0] || centerName || 'Admin';
  const initials = (email || centerName || 'A')[0].toUpperCase();

  return (
    <header className="ca-topbar">
      <div className={`ca-topbar-search ${searchOpen && query.trim() ? 'is-open' : ''}`} ref={searchRef}>
        <Search size={16} className="ca-topbar-search-icon" />
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Search teachers, groups or students..."
        />
        {searchOpen && query.trim() && (
          <div className="ca-topbar-results">
            {results.length === 0 ? (
              <div className="ca-topbar-empty">Nothing found</div>
            ) : results.map((r) => {
              const Icon = KIND_ICON[r.kind];
              return (
                <button key={`${r.kind}-${r.id}`} type="button" className="ca-topbar-result" onClick={() => goTo(r.to)}>
                  <span className={`ca-topbar-result-kind is-${r.kind}`}><Icon size={14} /></span>
                  <span className="ca-topbar-result-text">
                    <span className="ca-topbar-result-title">{r.title}</span>
                    <span className="ca-topbar-result-sub">{r.sub ? `${r.sub} · ` : ''}{KIND_LABEL[r.kind]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="ca-topbar-right">
        <div className="ca-topbar-add" ref={addRef}>
          <button type="button" className="ca-topbar-add-btn" onClick={() => setAddOpen((v) => !v)} aria-label="Add">
            <Plus size={18} strokeWidth={2.4} />
          </button>
          {addOpen && (
            <div className="ca-topbar-menu">
              {QUICK_ADD.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.to} type="button" className="ca-topbar-menu-item" onClick={() => { setAddOpen(false); navigate(item.to); }}>
                    <Icon size={15} /> {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="ca-topbar-profile" ref={profileRef}>
          <button type="button" className="ca-topbar-profile-btn" onClick={() => setProfileOpen((v) => !v)}>
            <span className="ca-topbar-avatar">{initials}</span>
            <span className="ca-topbar-profile-text">
              <span className="ca-topbar-profile-name">{profileName}</span>
              <span className="ca-topbar-profile-role">Center Admin</span>
            </span>
            <ChevronDown size={15} className={`ca-topbar-chevron ${profileOpen ? 'is-open' : ''}`} />
          </button>
          {profileOpen && (
            <div className="ca-topbar-menu is-right">
              <button type="button" className="ca-topbar-menu-item" onClick={() => { setProfileOpen(false); navigate('/corp/admin/settings'); }}>
                <Settings size={15} /> Settings
              </button>
              <button type="button" className="ca-topbar-menu-item is-danger" onClick={handleLogout}>
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
