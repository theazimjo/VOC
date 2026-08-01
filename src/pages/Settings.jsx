import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useDailyNewWordLimit } from '../hooks/useDailyNewWordLimit';
import { 
  Moon, Volume2, BookOpen, Bell, Clock, Check, ChevronRight, Type
} from 'lucide-react';
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

  const [activeSheet, setActiveSheet] = useState(null); // 'theme', 'font', 'limit', or null

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

      {/* SECTION 2: NOTIFICATIONS */}
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
                <div className="ios-sheet-title">Mavzuni tanlang</div>
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
                <div className="ios-sheet-title">Matn o'lchamini tanlang</div>
                <div className="ios-sheet-options">
                  {[
                    { id: 'small', label: 'Kichik (14px)' },
                    { id: 'normal', label: "O'rta (16px)" },
                    { id: 'large', label: 'Katta (19px)' }
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
                <div className="ios-sheet-title">Kunlik maqsadni tanlang</div>
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
                      <span>{n} ta so'z</span>
                      {dailyWordLimit === n && <Check size={16} className="ios-accent-check" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button className="ios-sheet-cancel-btn" onClick={() => setActiveSheet(null)}>
              Bekor qilish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
