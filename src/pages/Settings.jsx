import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useDailyNewWordLimit } from '../hooks/useDailyNewWordLimit';
import './Settings.css';

export default function Settings() {
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

  const handleThemeChange = (newThemeId) => {
    setTheme(newThemeId);
  };

  return (
    <div className="settings-page">
      <div className="settings-header-section">
        <h1 className="settings-title">⚙️ Tizim Sozlamalari</h1>
        <p className="settings-subtitle">Ilova ko'rinishi, mavzular va interfeys sozlamalari</p>
      </div>

      <div className="settings-grid">
        {/* Theme Selection Card */}
        <div className="settings-card theme-selector-card">
          <h2>🎨 Mavzular (Themes)</h2>
          <p className="section-desc">Ilovaning umumiy rangi va ko'rinishini tanlang:</p>
          
          <div className="themes-list">
            {themes.map((t) => {
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  className={`theme-item-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleThemeChange(t.id)}
                  data-theme-id={t.id}
                >
                  <div className="theme-preview-box" data-preview-theme={t.id}>
                    <div className="preview-nav"></div>
                    <div className="preview-content">
                      <div className="preview-line-long"></div>
                      <div className="preview-line-short"></div>
                      <div className="preview-chips">
                        <span className="preview-chip chip-1"></span>
                        <span className="preview-chip chip-2"></span>
                      </div>
                    </div>
                  </div>
                  <div className="theme-info">
                    <span className="theme-name">
                      {t.name} {isActive && <span className="active-badge">✓</span>}
                    </span>
                    <span className="theme-desc">{t.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Behavior & Display Settings Card */}
        <div className="settings-card behavior-settings-card">
          <h2>⚙️ Interfeys va Effektlar</h2>

          <div className="setting-option-row">
            <div className="option-info">
              <span className="option-title">🔊 Ovozli qayta aloqa (Audio)</span>
              <span className="option-desc">Mashq bajarishda to'g'ri/noto'g'ri javoblarda tovush chiqarish</span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={audioEnabled}
                onChange={(e) => setAudioEnabled(e.target.checked)}
              />
              <span className="slider-round"></span>
            </label>
          </div>

          <hr className="settings-divider" />

          <div className="setting-option-column">
            <div className="option-info">
              <span className="option-title">🔤 Matn o'lchami (Font size)</span>
              <span className="option-desc">Ilovadagi so'zlar va barcha yozuvlar kattaligi</span>
            </div>
            <div className="font-size-selector-grid">
              {['small', 'normal', 'large'].map((size) => (
                <button
                  key={size}
                  className={`font-size-btn ${fontSize === size ? 'active' : ''}`}
                  onClick={() => setFontSize(size)}
                >
                  {size === 'small' && 'Kichik (14px)'}
                  {size === 'normal' && 'O\'rta (16px)'}
                  {size === 'large' && 'Katta (19px)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Daily New Word Limit Card */}
        <div className="settings-card behavior-settings-card">
          <h2>📅 Kunlik yangi so'z maqsadi</h2>
          <p className="section-desc">
            Bir kunda ko'p yangi so'z qo'shish yodlashni qiyinlashtiradi — kunlik maqsad belgilang.
            Bugun qo'shilgan: <strong>{todayCount} / {dailyWordLimit}</strong>
          </p>
          <div className="font-size-selector-grid">
            {[10, 15, 20, 30].map((n) => (
              <button
                key={n}
                className={`font-size-btn ${dailyWordLimit === n ? 'active' : ''}`}
                onClick={() => setDailyWordLimit(n)}
              >
                {n} ta
              </button>
            ))}
          </div>
        </div>

        {/* Daily Reminder Card */}
        <div className="settings-card behavior-settings-card">
          <h2>🔔 Kunlik eslatma</h2>
          <p className="section-desc">
            Kunlik maqsadingizni bajarmagan bo'lsangiz, belgilangan vaqtda eslatma yuboriladi.
            Eslatma faqat ilova ochiq turgan brauzerda ishlaydi.
          </p>

          <div className="setting-option-row">
            <div className="option-info">
              <span className="option-title">Eslatmalarni yoqish</span>
              <span className="option-desc">
                {notifPermission === 'denied'
                  ? "Brauzer bildirishnomalari bloklangan — brauzer sozlamalaridan ruxsat bering"
                  : "Bugun mashq qilmagan bo'lsangiz sizga eslatib turamiz"}
              </span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={reminderEnabled}
                disabled={notifPermission === 'denied'}
                onChange={(e) => handleReminderToggle(e.target.checked)}
              />
              <span className="slider-round"></span>
            </label>
          </div>

          {reminderEnabled && (
            <>
              <hr className="settings-divider" />
              <div className="setting-option-row">
                <div className="option-info">
                  <span className="option-title">Eslatma vaqti</span>
                  <span className="option-desc">Har kuni shu vaqtdan keyin tekshiriladi</span>
                </div>
                <input
                  type="time"
                  className="font-size-btn"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
