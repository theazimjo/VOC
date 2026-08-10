import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCorpRole } from '../../hooks/useCorpRole';
import { useDailyNewWordLimit } from '../../hooks/useDailyNewWordLimit';
import {
  Moon, Volume2, BookOpen, Bell, Clock, Check, ChevronRight, Type,
  KeyRound, Lock, ShieldCheck, AlertCircle, CheckCircle2, Shield
} from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const { user, changePassword, resetPassword } = useAuth();
  const { identity } = useCorpRole();
  const navigate = useNavigate();
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    audioEnabled,
    setAudioEnabled,
    reminderEnabled,
    setReminderEnabled,
    reminderTime,
    setReminderTime,
    themes
  } = useTheme();

  const [notifPermission, setNotifPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  const [activeSheet, setActiveSheet] = useState(null); // 'theme', 'font', 'limit', or null

  // Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');

  const handleReminderToggle = async (checked) => {
    if (checked) {
      if (typeof Notification === 'undefined') {
        setNotifPermission('unsupported');
        return;
      }
      const permission = await Notification.requestPermission();
      setNotifPermission(permission);
      if (permission === 'granted') {
        setReminderEnabled(true);
      }
    } else {
      setReminderEnabled(false);
    }
  };

  const { limit: dailyWordLimit, setLimit: setDailyWordLimit, todayCount } = useDailyNewWordLimit();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdSuccess('');
    setPwdError('');

    if (!newPassword) {
      setPwdError("Iltimos, yangi parol kiriting.");
      return;
    }
    if (newPassword.length < 6) {
      setPwdError("Parol kamida 6 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("Kiritilgan parollar bir-biriga mos kelmadi.");
      return;
    }

    setSavingPwd(true);
    try {
      await changePassword(newPassword);
      setPwdSuccess("Parolingiz muvaffaqiyatli yangilandi!");
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPwdSuccess(''), 4000);
    } catch (err) {
      console.error("Change password error:", err);
      if (err.code === 'auth/requires-recent-login') {
        setPwdError("Xavfsizlik uchun parolni o'zgartirishdan oldin qayta tizimga kirishingiz lozim.");
      } else {
        setPwdError(err.message || "Parolni o'zgartirishda xatolik yuz berdi.");
      }
    } finally {
      setSavingPwd(false);
    }
  };

  const handleSendResetEmailSelf = async () => {
    if (!user?.email) return;
    setPwdSuccess('');
    setPwdError('');
    try {
      await resetPassword(user.email);
      setPwdSuccess(`Parolni tiklash havolasi ${user.email} manziliga yuborildi!`);
      setTimeout(() => setPwdSuccess(''), 5000);
    } catch (err) {
      setPwdError(err.message || "Email yuborishda xatolik.");
    }
  };

  return (
    <div className="ios-settings-container">
      <h1 className="ios-settings-title">Sozlamalar</h1>

      {/* SECTION 1: DISPLAY & BEHAVIOR */}
      <div className="ios-settings-header">Ko'rinish va Effektlar</div>
      <div className="ios-settings-section">
        {/* Theme select row */}
        <div 
          className="ios-settings-row"
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveSheet('theme')}
        >
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#0a7aff' }}>
              <Moon size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title">Mavzu</span>
          </div>
          <div className="ios-settings-right">
            <span className="ios-detail-text">
              {themes.find(t => t.id === theme)?.name || theme}
            </span>
            <ChevronRight size={14} className="ios-chevron" />
          </div>
        </div>

        {/* Font size row */}
        <div 
          className="ios-settings-row"
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveSheet('font')}
        >
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#8e8e93' }}>
              <Type size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title">Matn o'lchami</span>
          </div>
          <div className="ios-settings-right">
            <span className="ios-detail-text">
              {fontSize === 'small' ? 'Kichik (14px)' : fontSize === 'large' ? 'Katta (19px)' : "O'rta (16px)"}
            </span>
            <ChevronRight size={14} className="ios-chevron" />
          </div>
        </div>

        {/* Audio feedback switch row */}
        <div className="ios-settings-row">
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#ff2d55' }}>
              <Volume2 size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title">Ovozli effektlar</span>
          </div>
          <div className="ios-settings-right">
            <label className="ios-switch">
              <input 
                type="checkbox" 
                checked={audioEnabled} 
                onChange={(e) => setAudioEnabled(e.target.checked)} 
              />
              <span className="ios-slider"></span>
            </label>
          </div>
        </div>

        {/* Daily limit select row */}
        <div 
          className="ios-settings-row"
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveSheet('limit')}
        >
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#ff9500' }}>
              <BookOpen size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title">Kunlik maqsad</span>
          </div>
          <div className="ios-settings-right">
            <span className="ios-detail-text">
              {dailyWordLimit} ta so'z
            </span>
            <ChevronRight size={14} className="ios-chevron" />
          </div>
        </div>
      </div>
      <div className="ios-settings-footer">
        Kunlik yangi so'z limiti sizga har kuni optimal miqdordagi yangi so'zlarni taqdim etadi. Bugun o'rganildi: {todayCount} ta so'z.
      </div>

      {/* SECTION: ADMIN ACCESS (super admins only) */}
      {identity?.role === 'super_admin' && (
        <>
          <div className="ios-settings-header">Boshqaruv</div>
          <div className="ios-settings-section">
            <div
              className="ios-settings-row"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/corp/super-admin')}
            >
              <div className="ios-settings-left">
                <div className="ios-icon-box" style={{ background: '#5856d6' }}>
                  <Shield size={16} strokeWidth={2.2} />
                </div>
                <span className="ios-row-title">Super Admin paneli</span>
              </div>
              <div className="ios-settings-right">
                <ChevronRight size={14} className="ios-chevron" />
              </div>
            </div>
          </div>
          <div className="ios-settings-footer">
            Platformadagi barcha hamkor o'quv markazlarini boshqarish paneli.
          </div>
        </>
      )}

      {/* SECTION 2: SECURITY & PASSWORD */}
      {user && (
        <>
          <div className="ios-settings-header">Xavfsizlik va Parol</div>
          <div className="ios-settings-section" style={{ padding: '16px' }}>
            <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pwdSuccess && (
                <div style={{ background: 'rgba(52, 199, 89, 0.12)', border: '1px solid rgba(52, 199, 89, 0.25)', color: '#34c759', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} /> {pwdSuccess}
                </div>
              )}
              {pwdError && (
                <div style={{ background: 'rgba(255, 59, 48, 0.12)', border: '1px solid rgba(255, 59, 48, 0.25)', color: '#ff3b30', padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> {pwdError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} /> Yangi parol
                </label>
                <input
                  type="password"
                  placeholder="Kamida 6 ta belgi"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} /> Yangi parolni tasdiqlang
                </label>
                <input
                  type="password"
                  placeholder="Qayta kiriting"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '4px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={savingPwd || !newPassword}
                  style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: 'none', background: '#0a7aff', color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', opacity: (savingPwd || !newPassword) ? 0.6 : 1 }}
                >
                  {savingPwd ? 'Saqlanmoqda...' : "Parolni yangilash"}
                </button>
                {user.email && (
                  <button
                    type="button"
                    onClick={handleSendResetEmailSelf}
                    style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    Email orqali tiklash
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="ios-settings-footer">
            Hisob xavfsizligini ta'minlash uchun parolingizni muntazam ravishda yangilab turing.
          </div>
        </>
      )}

      {/* SECTION 3: NOTIFICATIONS */}
      <div className="ios-settings-header">Bildirishnomalar</div>
      <div className="ios-settings-section">
        {/* Toggle reminders */}
        <div className="ios-settings-row">
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#34c759' }}>
              <Bell size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title">Kunlik eslatma</span>
          </div>
          <div className="ios-settings-right">
            <label className="ios-switch">
              <input 
                type="checkbox" 
                checked={reminderEnabled} 
                disabled={notifPermission === 'denied'}
                onChange={(e) => handleReminderToggle(e.target.checked)} 
              />
              <span className="ios-slider"></span>
            </label>
          </div>
        </div>

        {/* Reminder time select */}
        {reminderEnabled && (
          <div className="ios-settings-row">
            <div className="ios-settings-left">
              <div className="ios-icon-box" style={{ background: '#af52de' }}>
                <Clock size={16} strokeWidth={2.2} />
              </div>
              <span className="ios-row-title">Eslatma vaqti</span>
            </div>
            <div className="ios-settings-right">
              <input 
                type="time" 
                value={reminderTime} 
                onChange={(e) => setReminderTime(e.target.value)} 
                className="ios-time-input" 
              />
            </div>
          </div>
        )}
      </div>
      <div className="ios-settings-footer">
        {notifPermission === 'denied' 
          ? "Brauzer bildirishnomalari bloklangan. Ruxsat berish uchun brauzer sozlamalarini tekshiring." 
          : "Mashq qilishni unutib qo'ysangiz, tizim siz belgilagan vaqtda eslatma yuboradi."}
      </div>

      <div className="ios-settings-footer" style={{ textAlign: 'center', marginTop: '32px' }}>
        Platforma talqini: v2.4.0<br />
        Barcha huquqlar himoyalangan © VOC
      </div>

      {/* iOS Action Sheet / Modal Popover Dialog */}
      {activeSheet && (
        <div className="ios-sheet-backdrop" onClick={() => setActiveSheet(null)}>
          <div className="ios-sheet-drawer" onClick={e => e.stopPropagation()}>
            <div className="ios-sheet-handle" />
            
            {activeSheet === 'theme' && (
              <>
                <div className="ios-sheet-title">Choose Theme</div>
                <div className="ios-sheet-options">
                  {themes.map(t => (
                    <button
                      key={t.id}
                      className={`ios-sheet-option-btn ${theme === t.id ? 'active' : ''}`}
                      onClick={() => {
                        setTheme(t.id);
                        setActiveSheet(null);
                      }}
                    >
                      <span>{t.name}</span>
                      {theme === t.id && <Check size={16} className="ios-accent-check" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeSheet === 'font' && (
              <>
                <div className="ios-sheet-title">Choose Text Size</div>
                <div className="ios-sheet-options">
                  {[
                    { id: 'small', label: 'Small (14px)' },
                    { id: 'normal', label: "Medium (16px)" },
                    { id: 'large', label: 'Large (19px)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      className={`ios-sheet-option-btn ${fontSize === item.id ? 'active' : ''}`}
                      onClick={() => {
                        setFontSize(item.id);
                        setActiveSheet(null);
                      }}
                    >
                      <span>{item.label}</span>
                      {fontSize === item.id && <Check size={16} className="ios-accent-check" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {activeSheet === 'limit' && (
              <>
                <div className="ios-sheet-title">Choose Daily Goal</div>
                <div className="ios-sheet-options">
                  {[10, 15, 20, 30].map(n => (
                    <button
                      key={n}
                      className={`ios-sheet-option-btn ${dailyWordLimit === n ? 'active' : ''}`}
                      onClick={() => {
                        setDailyWordLimit(n);
                        setActiveSheet(null);
                      }}
                    >
                      <span>{n} words</span>
                      {dailyWordLimit === n && <Check size={16} className="ios-accent-check" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button className="ios-sheet-cancel-btn" onClick={() => setActiveSheet(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
