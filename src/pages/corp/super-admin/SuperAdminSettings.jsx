import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db, auth } from '../../../firebase';
import { Settings, TriangleAlert, Moon, LogOut, ShieldCheck } from 'lucide-react';
import { setMaintenanceMode as saveMaintenanceMode } from '../../../services/corpService';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import './shared.css';
import '../center-admin/shared.css';
import '../center-admin/CenterAdminDashboard.css';

export default function SuperAdminSettings() {
  const [maintenanceMode, setMaintenanceModeState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const email = auth.currentUser?.email || '';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    (async () => {
      try {
        const snap = await get(ref(db, 'settings/global/maintenanceMode'));
        setMaintenanceModeState(!!snap.val());
      } catch (err) {
        console.error('Error loading maintenance mode:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleToggleMaintenance = async () => {
    const next = !maintenanceMode;
    setSaving(true);
    setMaintenanceModeState(next);
    try {
      await saveMaintenanceMode(next);
    } catch (err) {
      setMaintenanceModeState(!next);
      alert('Xatolik: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="super-admin-container">
      <header className="super-admin-header">
        <div className="super-admin-badge"><Settings size={16} /> Sozlamalar</div>
        <h1>Platforma Sozlamalari</h1>
        <p>/corp portali uchun texnik xizmat rejimi va boshqa global sozlamalar.</p>
      </header>

      <div className="admin-settings-card" style={{ maxWidth: 600, margin: '0 auto' }}>
        {loading ? (
          <div className="loading-spinner">Yuklanmoqda...</div>
        ) : (
          <>
            <div className="toggle-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--pg-text)', marginBottom: 4 }}>Texnik Xizmat Rejimi</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--pg-text-muted)', maxWidth: 380 }}>
                  Yoqilganda, super adminlardan tashqari hech kim /corp portaliga kira olmaydi
                  (individual VOC ilovasi bunga ta'sir qilmaydi).
                </div>
              </div>
              <button
                type="button"
                className={`toggle-switch ${maintenanceMode ? 'on' : ''}`}
                onClick={handleToggleMaintenance}
                disabled={saving}
                aria-pressed={maintenanceMode}
              >
                <span className="toggle-knob" />
              </button>
            </div>

            {maintenanceMode && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.25rem',
                background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)',
                color: '#f59e0b', padding: '10px 14px', borderRadius: 10, fontSize: '0.85rem'
              }}>
                <TriangleAlert size={16} /> Texnik xizmat rejimi hozir faol.
              </div>
            )}
          </>
        )}
      </div>

      <div className="admin-settings-card" style={{ maxWidth: 600, margin: '1rem auto 0' }}>
        <div className="toggle-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, flexShrink: 0,
              background: 'rgba(99, 102, 241, 0.18)', color: '#a5b4fc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Moon size={15} />
            </div>
            <div style={{ fontWeight: 600, color: 'var(--pg-text)' }}>Tungi Rejim</div>
          </div>
          <button
            type="button"
            className={`toggle-switch ${theme === 'android' ? 'on' : ''}`}
            onClick={() => setTheme(theme === 'android' ? 'ios' : 'android')}
            aria-pressed={theme === 'android'}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <div className="admin-settings-card" style={{ maxWidth: 600, margin: '1rem auto 0' }}>
        <div className="toggle-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, flexShrink: 0,
              background: 'rgba(99, 102, 241, 0.18)', color: '#a5b4fc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShieldCheck size={15} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: 'var(--pg-text)' }}>Super Admin</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--pg-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {email}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setConfirmLogout(true)}
          style={{
            marginTop: '1rem', width: '100%', padding: '11px 14px', borderRadius: 10,
            background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#ef4444', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <LogOut size={16} /> Chiqish
        </button>
      </div>

      <ConfirmSheet
        open={confirmLogout}
        title="Chiqish"
        message="Tizimdan chiqishni xohlaysizmi?"
        confirmLabel="Chiqish"
        cancelLabel="Bekor qilish"
        danger
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      />
    </div>
  );
}
