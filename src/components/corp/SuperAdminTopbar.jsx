import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { setAppMode } from '../../services/corpService';
import { clearActiveRole, clearViewAs, ROLE_HOME } from '../../utils/activeRole';
import './CorpAdminTopbar.css';

// The super admin's copy of CorpAdminTopbar (same ca-topbar classes): the
// profile menu with settings and log out.
export default function SuperAdminTopbar({ email }) {
  const navigate = useNavigate();

  // Straight into this account's personal app.
  const openPersonal = async () => {
    setOpen(false);
    try { if (user) await setAppMode(user.uid, 'individual'); } catch (err) { console.error(err); }
    clearViewAs();
    clearActiveRole();
    window.location.assign(ROLE_HOME.personal);
  };
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const name = email?.split('@')[0] || 'Super admin';
  const handleLogout = async () => {
    setOpen(false);
    await logout();
    navigate('/login');
  };

  return (
    <header className="ca-topbar">
      <div className="ca-topbar-right" style={{ marginLeft: 'auto' }}>
        <div className="ca-topbar-profile" ref={ref}>
          <button type="button" className="ca-topbar-profile-btn" onClick={() => setOpen((v) => !v)}>
            <span className="ca-topbar-avatar">{(email || 'S')[0].toUpperCase()}</span>
            <span className="ca-topbar-profile-text">
              <span className="ca-topbar-profile-name">{name}</span>
              <span className="ca-topbar-profile-role">Super admin</span>
            </span>
            <ChevronDown size={15} className={`ca-topbar-chevron ${open ? 'is-open' : ''}`} />
          </button>
          {open && (
            <div className="ca-topbar-menu is-right">
              <button type="button" className="ca-topbar-menu-item" onClick={openPersonal}>
                <User size={15} /> Personal
              </button>
              <button type="button" className="ca-topbar-menu-item" onClick={() => { setOpen(false); navigate('/corp/super-admin/settings'); }}>
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
