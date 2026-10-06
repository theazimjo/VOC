import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, ChevronDown, Layers, GraduationCap, BookOpen, Settings, LogOut, Repeat } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import RoleMenuItems from './RoleMenuItems';
import { setActiveProfile } from '../../utils/activeProfile';
import { useTeacherData } from '../../pages/corp/teacher/TeacherDataContext';
import './CorpAdminTopbar.css';

const QUICK_ADD = [
  { to: '/corp/teacher?new=group', label: 'New Group', icon: Layers },
  { to: "/corp/teacher/courses?new=pack", label: 'New Word Pack', icon: BookOpen },
];

const KIND_ICON = { group: Layers, student: GraduationCap };
const KIND_LABEL = { group: 'Group', student: 'Student' };

// The teacher panel's copy of CorpAdminTopbar (same ca-topbar classes):
// search over the teacher's own groups and students, a quick-add menu and
// the profile menu (settings, personal mode, logout). English, like the
// rest of the teacher panel.
export default function TeacherTopbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { activeGroups, center, teacherId, teacherName, email, phone } = useTeacherData();

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
    activeGroups.forEach((g) => {
      if ([g.name, g.code].some((v) => (v || '').toLowerCase().includes(q))) {
        hits.push({ kind: 'group', id: g.id, title: g.name || 'Group', to: `/corp/teacher/group/${g.id}` });
      }
    });
    activeGroups.forEach((g) => {
      g.students.forEach((st) => {
        if (st.name?.toLowerCase().includes(q)) {
          hits.push({ kind: 'student', id: `${g.id}-${st.uid}`, title: st.name, sub: g.name, to: `/corp/teacher/group/${g.id}?student=${st.uid}` });
        }
      });
    });
    return hits.slice(0, 8);
  }, [query, activeGroups]);

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

  // The DB copy is fresher than the identity resolved at login (renames in
  // Settings land there first).
  const me = center?.teachers?.[teacherId];
  const name = me?.name || teacherName || 'Teacher';
  const sub = me?.phone || phone || email || 'Teacher';

  return (
    <header className="ca-topbar">
      <div className={`ca-topbar-search ${searchOpen && query.trim() ? 'is-open' : ''}`} ref={searchRef}>
        <Search size={16} className="ca-topbar-search-icon" />
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
          onFocus={() => setSearchOpen(true)}
          placeholder="Search groups or students..."
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
            <span className="ca-topbar-avatar">{name.charAt(0).toUpperCase()}</span>
            <span className="ca-topbar-profile-text">
              <span className="ca-topbar-profile-name">{name}</span>
              <span className="ca-topbar-profile-role">{sub}</span>
            </span>
            <ChevronDown size={15} className={`ca-topbar-chevron ${profileOpen ? 'is-open' : ''}`} />
          </button>
          {profileOpen && (
            <div className="ca-topbar-menu is-right">
              <button type="button" className="ca-topbar-menu-item" onClick={() => { setProfileOpen(false); navigate('/corp/teacher/settings'); }}>
                <Settings size={15} /> Settings
              </button>
              <button type="button" className="ca-topbar-menu-item" onClick={() => { setProfileOpen(false); setActiveProfile('personal'); navigate('/'); }}>
                <Repeat size={15} /> Switch to personal mode
              </button>
              <RoleMenuItems onClose={() => setProfileOpen(false)} />
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
