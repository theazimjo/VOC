import { useOutletContext, useNavigate } from 'react-router-dom';
import { User, Shield, Key, ArrowRightLeft, LogOut } from 'lucide-react';
import { setAppMode } from '../../services/corpService';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentCorpProfile() {
  const {
    user,
    membership,
    student
  } = useOutletContext();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleReturnToIndividual = async () => {
    if (user) {
      await setAppMode(user.uid, 'individual');
    }
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initial = (student?.name || user.displayName || user.email || 'O')[0].toUpperCase();

  return (
    <div className="student-corp-container" style={{ padding: '2rem', maxWidth: '600px' }}>
      {/* Page Header */}
      <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <User size={24} style={{ color: '#c084fc' }} /> Profil Ma'lumotlari
      </h2>

      {/* Profile Card */}
      <div style={{ background: '#13131c', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a855f7, #6366f1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 700,
          color: '#fff',
          margin: '0 auto 1rem auto'
        }}>
          {initial}
        </div>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>
          {student?.name || user.displayName || "O'quvchi"}
        </h3>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem' }}>{user.email}</p>

        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '1rem', textAlign: 'left', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.5rem' }}>Guruh haqida:</div>
          <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Guruh nomi: <strong style={{ color: '#fff' }}>{membership.groupName}</strong></div>
          <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Ulanish PIN kodi: <strong style={{ color: '#c084fc' }}>{membership.groupCode}</strong></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleReturnToIndividual}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              padding: '10px 16px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <ArrowRightLeft size={16} /> Individual rejimga o'tish
          </button>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              background: 'rgba(248, 113, 113, 0.1)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderRadius: '10px',
              color: '#f87171',
              padding: '10px 16px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} /> Hisobdan chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
