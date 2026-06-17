import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './Settings.css';

export default function Settings() {
  const {
    theme,
    setTheme,
    particlesEnabled,
    setParticlesEnabled,
    fontSize,
    setFontSize,
    audioEnabled,
    setAudioEnabled,
    performanceMode,
    themes
  } = useTheme();

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
          <p className="section-desc">Ilovaning umumiy dizayni, shakllari va fon effektlarini boshqaring:</p>
          
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
              <span className="option-title">✨ Zarrachalar (Particles) tizimi</span>
              <span className="option-desc">Har bir mavzu uchun maxsus tayyorlangan jonli fon effektlari</span>
            </div>
            <label className="switch-toggle">
              <input
                type="checkbox"
                checked={particlesEnabled && !performanceMode}
                disabled={performanceMode}
                onChange={(e) => setParticlesEnabled(e.target.checked)}
              />
              <span className="slider-round"></span>
            </label>
          </div>

          {performanceMode && (
            <div className="settings-warning-alert">
              ⚠️ Qurilmangizda ishlash unumdorligi pasayganligi sababli zarrachalar avtomatik tarzda o'chirildi.
            </div>
          )}

          <hr className="settings-divider" />

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
      </div>
    </div>
  );
}
