import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import {
  Building2, Shield, Users, GraduationCap, LogOut, LogIn, Wrench
} from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useCorpRole } from '../../hooks/useCorpRole';
import { useGroupMode } from '../../hooks/useGroupMode';
import './CorpLayout.css';

export default function CorpLayout() {
  const { user, logout } = useAuth();
  const { loading: identityLoading, identity } = useCorpRole();
  const { membership } = useGroupMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const isCorpAdmin = location.pathname.startsWith('/corp/admin') || 
                      location.pathname.startsWith('/corp/super-admin') || 
                      location.pathname.startsWith('/corp/teacher') ||
                      location.pathname.startsWith('/corp/student') ||
                      location.pathname.startsWith('/corp/practice');

  // /corp-only maintenance gate — deliberately does not touch the
  // individual-learner app's routes at all.
  useEffect(() => {
    const unsubscribe = onValue(ref(db, 'settings/global/maintenanceMode'), (snap) => {
      setMaintenanceMode(!!snap.val());
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await logout();
    navigate('/corp');
  };

  if (maintenanceMode && !identityLoading && identity?.role !== 'super_admin') {
    return (
      <div className="corp-maintenance-screen">
        <Wrench size={40} />
        <h1>Texnik Xizmat Ko'rsatilmoqda</h1>
        <p>Korporativ portal vaqtincha texnik xizmat rejimida. Iltimos, birozdan so'ng qayta urinib ko'ring.</p>
      </div>
    );
  }

  return (
    <div className="corp-layout-wrapper">
      {/* Dedicated Corporate Navigation Bar */}
      {!isCorpAdmin && (
        <header className="corp-nav-bar">
        <div className="corp-nav-brand" onClick={() => navigate('/corp')}>
          <div className="corp-logo-icon">
            <Building2 size={20} />
          </div>
          <div>
            <span className="brand-title">VOC Corporate</span>
            <span className="brand-tag">O'quv Markazlar Portali</span>
          </div>
        </div>

        <nav className="corp-nav-links">
          {identity?.role === 'super_admin' && (
            <NavLink
              to="/corp/super-admin"
              className={({ isActive }) => `corp-nav-item ${isActive ? 'active' : ''}`}
            >
              <Shield size={16} /> Super Admin
            </NavLink>
          )}

          {identity?.role === 'center_admin' && (
            <NavLink
              to="/corp/admin"
              className={({ isActive }) => `corp-nav-item ${isActive ? 'active' : ''}`}
            >
              <Building2 size={16} /> Markaz Admin
            </NavLink>
          )}

          {identity?.role === 'teacher' && (
            <NavLink
              to="/corp/teacher"
              className={({ isActive }) => `corp-nav-item ${isActive ? 'active' : ''}`}
            >
              <Users size={16} /> O'qituvchi
            </NavLink>
          )}

          {membership && (
            <NavLink
              to="/corp/student"
              className={({ isActive }) => `corp-nav-item ${isActive ? 'active' : ''}`}
            >
              <GraduationCap size={16} /> O'quvchi Xonasi
            </NavLink>
          )}
        </nav>

        <div className="corp-nav-right">
          {identity || user ? (
            <button className="btn-back-individual" onClick={handleSignOut}>
              <LogOut size={16} /> Chiqish
            </button>
          ) : (
            <button className="btn-back-individual" onClick={() => navigate('/corp/login')}>
              <LogIn size={16} /> Markaz / O'qituvchi Kirishi
            </button>
          )}
        </div>
      </header>
      )}

      {/* Main Corporate Content Container */}
      <main className="corp-main-content">
        <Outlet />
      </main>
    </div>
  );
}
