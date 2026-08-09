import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Save, Settings, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useAuth } from '../../../../contexts/AuthContext';
import ConfirmSheet from '../../../../components/corp/ConfirmSheet';
import './SettingsTab.css';

export default function SettingsTab({ p }) {
  const {
    centerAddress, centerEmail, centerName, centerPhone, handleSaveSettings,
    savingSettings, setCenterAddress, setCenterEmail, setCenterName, setCenterPhone, settingsSaved,
  } = p;

  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
        <div className="page-view-settings">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><Settings size={16} /> Sozlamalar</span>
              <h1>Markaz Sozlamalari</h1>
              <p>Markaz nomi, aloqa ma'lumotlari va xavfsizlik sozlamalarini boshqarish.</p>
            </div>
          </header>

          <div className="admin-settings-card">
            <form className="settings-form" onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label>O'quv Markazi Nomi</label>
                <input 
                  type="text" 
                  value={centerName} 
                  onChange={e => setCenterName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Rasmiy Email</label>
                <input 
                  type="email" 
                  value={centerEmail} 
                  onChange={e => setCenterEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Telefon Raqam</label>
                <input 
                  type="text" 
                  value={centerPhone} 
                  onChange={e => setCenterPhone(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Manzil / Hudud</label>
                <input 
                  type="text" 
                  value={centerAddress} 
                  onChange={e => setCenterAddress(e.target.value)} 
                />
              </div>

              <button type="submit" className="btn-save-settings" disabled={savingSettings}>
                {settingsSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                {savingSettings ? 'Saqlanmoqda...' : (settingsSaved ? 'Saqlandi!' : 'Sozlamalarni Saqlash')}
              </button>
            </form>
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
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              style={{
                width: '100%', padding: '11px 14px', borderRadius: 10,
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
