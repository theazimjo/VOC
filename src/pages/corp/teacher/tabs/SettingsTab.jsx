import { ArrowLeft, CheckCircle2, Moon, Save, Sparkles, Sun, User } from 'lucide-react';

export default function SettingsTab({ p }) {
  const {
    handleSaveProfile, navigate, profileForm, savingSettings,
    setProfileForm, setTheme, settingsSuccess, theme,
  } = p;

  return (
        <div style={{ maxWidth: '700px' }}>
          {/* Top Compact Header Bar */}
          <div className="ios-group-top-bar">
            <button
              type="button"
              className="ios-back-btn"
              onClick={() => navigate('/corp/teacher')}
              title="Guruhlarga qaytish"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="ios-title-group">
              <h2 className="ios-group-title">Sozlamalar</h2>
            </div>
          </div>

          {settingsSuccess && (
            <div style={{ background: 'rgba(52, 199, 89, 0.12)', border: '1px solid rgba(52, 199, 89, 0.25)', color: '#34c759', padding: '12px 16px', borderRadius: '16px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} /> {settingsSuccess}
            </div>
          )}

          {/* Profile & Password Bento Hero Card */}
          <div className="teacher-settings-hero-card">
            <div className="tshc-header">
              <div className="tshc-icon-box">
                <User size={20} />
              </div>
              <div>
                <h3 className="tshc-title">O'qituvchi Profili</h3>
                <p className="tshc-sub">Shaxsiy ma'lumotlaringiz va tizimga kirish parolingiz</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} autoComplete="off" className="gsbm-form">
              <div className="gsbm-field">
                <label className="gsbm-label">F.I.SH (Ism Sharif)</label>
                <input
                  type="text"
                  required
                  className="gsbm-input"
                  value={profileForm.name}
                  onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>

              <div className="gsbm-field">
                <label className="gsbm-label">Telefon raqam</label>
                <input
                  type="tel"
                  className="gsbm-input"
                  value={profileForm.phone}
                  onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>

              <div className="gsbm-field">
                <label className="gsbm-label">Yangi Parol (ixtiyoriy)</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="O'zgartirish uchun yangi parol kiriting"
                  className="gsbm-input"
                  value={profileForm.password}
                  onChange={e => setProfileForm({ ...profileForm, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="gsbm-save-btn"
                disabled={savingSettings}
                style={{ marginTop: '0.5rem' }}
              >
                <Save size={16} /> {savingSettings ? 'Saqlanmoqda...' : 'Sozlamalarni Saqlash'}
              </button>
            </form>
          </div>

          {/* Theme Selection Bento Hero Card */}
          <div className="teacher-settings-hero-card purple-glow">
            <div className="tshc-header">
              <div className="tshc-icon-box purple">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="tshc-title">Mavzu va Ko'rinish</h3>
                <p className="tshc-sub">Tizim ko'rinishini o'zingizga qulay rejimga o'tkazing</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                onClick={() => setTheme('ios')}
                className="ios-bento-card"
                style={{
                  minHeight: 'auto',
                  padding: '14px 16px',
                  borderColor: theme === 'ios' ? '#3b82f6' : 'var(--border)',
                  background: theme === 'ios' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-tertiary)',
                  boxShadow: theme === 'ios' ? '0 0 0 1.5px #3b82f6' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.14)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sun size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Yorug' rejim</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Oq fon, toza interfeys</div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setTheme('android')}
                className="ios-bento-card"
                style={{
                  minHeight: 'auto',
                  padding: '14px 16px',
                  borderColor: theme === 'android' ? '#a855f7' : 'var(--border)',
                  background: theme === 'android' ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-tertiary)',
                  boxShadow: theme === 'android' ? '0 0 0 1.5px #a855f7' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.14)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Moon size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Tungi rejim</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>To'q fon, ko'zga qulay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
