import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Building2, Check, KeyRound, LogOut, Monitor, Moon, Save, Settings as SettingsIcon, Sun } from 'lucide-react';
import { updateCenter } from '../../../services/corpService';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, Field, LoadingRows, Page } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import GoogleLinkRows from '../super-admin/GoogleLinkRows';
import { useCenterData } from './CenterDataContext';

const TABS = [
  { id: 'center', label: 'Markaz', icon: Building2 },
  { id: 'account', label: 'Kirish', icon: KeyRound },
  { id: 'appearance', label: "Ko'rinish", icon: Monitor },
];
const TAB_KEY = 'voc_admin_settings_tab';

// UITS CRM settings layout: tabs in the toolbar, one card per topic.
export default function AdminSettings() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { email } = useOutletContext() || {};
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const [toastNode, showToast] = useToast();
  const { centerId, center, centerName, loading, patch } = useCenterData();

  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem(TAB_KEY) || 'center'; } catch { return 'center'; }
  });
  const pickTab = (id) => {
    setTab(id);
    try { localStorage.setItem(TAB_KEY, id); } catch { /* private mode */ }
  };

  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [saving, setSaving] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const reset = () => setForm({ name: center?.name || '', phone: center?.phone || '', address: center?.address || '' });
  useEffect(reset, [center]); // center only changes on load or after our own save

  const dirty = center && (
    form.name.trim() !== (center.name || '')
    || form.phone.trim() !== (center.phone || '')
    || form.address.trim() !== (center.address || '')
  );

  const save = async (e) => {
    e.preventDefault();
    const data = { name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() };
    if (!data.name) return;
    setSaving(true);
    try {
      await updateCenter(centerId, data);
      patch((c) => ({ ...c, ...data }));
      showToast('Saqlandi');
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const tabs = (
    <div className="ca-tabs" role="tablist" aria-label="Sozlamalar bo'limlari">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button key={id} type="button" role="tab" aria-selected={tab === id} className={`ca-tab ${tab === id ? 'is-active' : ''}`} onClick={() => pickTab(id)}>
          <Icon size={14} /> {label}
        </button>
      ))}
    </div>
  );

  return (
    <Page
      icon={<SettingsIcon />}
      title="Sozlamalar"
      subtitle="Markaz, kirish va ko'rinish"
      back={isDesktop ? undefined : { label: 'Bosh panel', onClick: () => navigate('/corp/admin') }}
      action={tabs}
    >
      {tab === 'center' && (
        <div className="ca-stack">
          <section className="ca-card ca-profile">
            <span className="ca-icon-box">{(centerName || 'M').charAt(0).toUpperCase()}</span>
            <div>
              <h2 className="ca-profile-name">{centerName}</h2>
              <p className="ca-profile-meta">
                <span className="ca-tag">Markaz admini</span>
                {email}
              </p>
            </div>
          </section>

          <section className="ca-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><Building2 size={15} /> Markaz ma'lumotlari</h3>
                <span className="ca-card-sub">O'qituvchi va o'quvchilarga ko'rinadi</span>
              </div>
            </div>
            {loading ? <LoadingRows count={3} /> : (
              <form onSubmit={save}>
                <div className="ca-form-grid">
                  <Field label="Markaz nomi">
                    <input className="sa-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Markaz nomi" />
                  </Field>
                  <Field label="Telefon">
                    <input className="sa-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 123 45 67" />
                  </Field>
                  <div className="is-full">
                    <Field label="Manzil">
                      <input className="sa-input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Toshkent, Chilonzor" />
                    </Field>
                  </div>
                </div>
                <div className="ca-form-actions">
                  {dirty && <Button variant="tinted" tone="gray" onClick={reset} disabled={saving}>Bekor qilish</Button>}
                  <Button type="submit" disabled={saving || !dirty || !form.name.trim()}>
                    <Save size={15} /> {saving ? 'Saqlanmoqda...' : "O'zgarishlarni saqlash"}
                  </Button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}

      {tab === 'account' && (
        <div className="ca-stack">
          <section className="ca-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><KeyRound size={15} /> Kirish</h3>
                <span className="ca-card-sub">Login va Google hisob</span>
              </div>
            </div>
            <div className="sa-group">
              <div className="sa-row">
                <span className="sa-row-body">
                  <span className="sa-row-text"><span className="sa-row-title">Login</span></span>
                  <span className="sa-row-detail">{email || '—'}</span>
                </span>
              </div>
              <GoogleLinkRows showToast={showToast} />
            </div>
            <p className="sa-section-footer" style={{ marginTop: 10 }}>
              Google hisobni bog'lasangiz, «Google bilan kirish» orqali ham kirasiz. Parolni unutsangiz, VOC qo'llab-quvvatlash xizmatiga yozing.
            </p>
          </section>

          <section className="ca-card">
            <div className="ca-card-head" style={{ marginBottom: 0, alignItems: 'center' }}>
              <div>
                <h3 className="ca-card-title"><LogOut size={15} /> Seans</h3>
                <span className="ca-card-sub">Shu qurilmadan chiqish</span>
              </div>
              <Button tone="red" onClick={() => setConfirmLogout(true)}><LogOut size={15} /> Chiqish</Button>
            </div>
          </section>
        </div>
      )}

      {tab === 'appearance' && (
        <section className="ca-card">
          <div className="ca-card-head">
            <div>
              <h3 className="ca-card-title"><Monitor size={15} /> Mavzu</h3>
              <span className="ca-card-sub">Panel ko'rinishini tanlang</span>
            </div>
          </div>
          <div className="ca-choices">
            {[
              { id: 'android', label: "Qorong'i", icon: Moon, preview: 'is-dark' },
              { id: 'ios', label: "Yorug'", icon: Sun, preview: 'is-light' },
            ].map((opt) => {
              const Icon = opt.icon;
              const active = opt.id === 'android' ? theme === 'android' : theme !== 'android';
              return (
                <button key={opt.id} type="button" className={`ca-choice ${active ? 'is-active' : ''}`} onClick={() => setTheme(opt.id)} aria-pressed={active}>
                  <span className={`ca-choice-preview ${opt.preview}`}><span /><span /></span>
                  <span className="ca-choice-name">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon size={15} /> {opt.label}</span>
                    {active && <Check size={16} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <ConfirmSheet
        open={confirmLogout}
        title="Chiqasizmi?"
        message="Qayta kirish uchun login va parol kerak bo'ladi."
        confirmLabel="Chiqish"
        danger
        onConfirm={async () => { await logout(); navigate('/login'); }}
        onCancel={() => setConfirmLogout(false)}
      />

      {toastNode}
    </Page>
  );
}
