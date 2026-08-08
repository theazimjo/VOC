import { CheckCircle2, Save, Settings } from 'lucide-react';
import './SettingsTab.css';

export default function SettingsTab({ p }) {
  const {
    centerAddress, centerEmail, centerName, centerPhone, handleSaveSettings,
    savingSettings, setCenterAddress, setCenterEmail, setCenterName, setCenterPhone, settingsSaved,
  } = p;

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
        </div>
  );
}
