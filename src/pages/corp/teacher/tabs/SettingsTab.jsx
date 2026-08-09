import { useState } from 'react';
import { Archive, ChevronRight, CheckCircle2, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';

export default function SettingsTab({ p }) {
  const {
    askConfirm, handleSaveProfile, navigate, profileForm, savingSettings,
    setProfileForm, setTheme, settingsSuccess, theme,
  } = p;

  const { logout } = useAuth();
  const [showProfileForm, setShowProfileForm] = useState(false);

  const handleLogout = () => {
    askConfirm({
      title: 'Log Out',
      message: 'Are you sure you want to log out?',
      confirmLabel: 'Log Out',
      cancelLabel: 'Cancel',
      danger: true,
      onConfirm: async () => {
        await logout();
        navigate('/login');
      },
    });
  };

  return (
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {settingsSuccess && (
            <div style={{ background: 'rgba(52, 199, 89, 0.12)', border: '1px solid rgba(52, 199, 89, 0.25)', color: '#34c759', padding: '9px 14px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.86rem' }}>
              <CheckCircle2 size={16} /> {settingsSuccess}
            </div>
          )}

          {/* PROFIL — Apple ID-style identity card: avatar + name + phone,
              tap to expand into the editable fields below it. */}
          <div>
            <div className="ios-section-label">Profile</div>
            <div className="premium-glass ios-list-card" style={{ borderRadius: '18px' }}>
              <div
                className="ios-list-row ios-list-row-action"
                role="button"
                tabIndex={0}
                onClick={() => setShowProfileForm(v => !v)}
                onKeyDown={e => { if (e.key === 'Enter') setShowProfileForm(v => !v); }}
                style={{ padding: '12px 14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div
                    style={{
                      width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: '1.15rem', fontWeight: 800,
                    }}
                  >
                    {(profileForm.name || 'T').charAt(0).toUpperCase()}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--pg-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {profileForm.name || "Teacher"}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--pg-text-secondary)' }}>
                      {profileForm.phone || 'No phone number'}
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={16}
                  style={{
                    color: 'var(--pg-text-muted)', flexShrink: 0,
                    transform: showProfileForm ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </div>

              {showProfileForm && (
                <form id="profile-edit-form" onSubmit={handleSaveProfile} autoComplete="off">
                  <div className="ios-list-row">
                    <span className="ios-list-label">Name</span>
                    <input
                      type="text"
                      required
                      className="ios-list-input"
                      placeholder="Full name"
                      value={profileForm.name}
                      onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div className="ios-list-row">
                    <span className="ios-list-label">Phone</span>
                    <input
                      type="tel"
                      className="ios-list-input"
                      placeholder="Not set"
                      value={profileForm.phone}
                      onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="ios-list-row" style={{ borderBottom: 'none' }}>
                    <span className="ios-list-label">New password</span>
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Leave blank to keep"
                      className="ios-list-input"
                      value={profileForm.password}
                      onChange={e => setProfileForm({ ...profileForm, password: e.target.value })}
                    />
                  </div>
                </form>
              )}
            </div>

            {showProfileForm && (
              <button
                type="submit"
                form="profile-edit-form"
                className="gsbm-save-btn"
                disabled={savingSettings}
                style={{ marginTop: '0.6rem' }}
              >
                {savingSettings ? 'Saving...' : 'Save'}
              </button>
            )}
          </div>

          {/* APPEARANCE */}
          <div>
            <div className="ios-section-label">Appearance</div>
            <div className="premium-glass ios-list-card" style={{ borderRadius: '18px' }}>
              <div className="ios-list-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="ios-row-icon" style={{ background: 'rgba(99, 102, 241, 0.18)', color: '#a5b4fc' }}>
                    <Moon size={15} />
                  </div>
                  <span className="ios-list-label">Dark Mode</span>
                </div>
                <label className="gsm-toggle-switch">
                  <input
                    type="checkbox"
                    checked={theme === 'android'}
                    onChange={() => setTheme(theme === 'android' ? 'ios' : 'android')}
                  />
                  <span className="gsm-toggle-slider" />
                </label>
              </div>
            </div>
          </div>

          {/* OTHER */}
          <div>
            <div className="ios-section-label">Other</div>
            <div className="premium-glass ios-list-card" style={{ borderRadius: '18px' }}>
              <div
                className="ios-list-row ios-list-row-action"
                role="button"
                tabIndex={0}
                onClick={() => navigate('/corp/teacher/archive')}
                onKeyDown={e => { if (e.key === 'Enter') navigate('/corp/teacher/archive'); }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="ios-row-icon" style={{ background: 'rgba(245, 158, 11, 0.16)', color: '#fbbf24' }}>
                    <Archive size={15} />
                  </div>
                  <span className="ios-list-label">Archived Groups</span>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--pg-text-muted)', flexShrink: 0 }} />
              </div>
            </div>
          </div>

          {/* LOG OUT */}
          <button
            type="button"
            onClick={handleLogout}
            className="premium-glass"
            style={{
              borderRadius: '18px', padding: '13px 14px', width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              color: '#ef4444', fontSize: '0.94rem', fontWeight: 700, cursor: 'pointer',
            }}
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
  );
}
