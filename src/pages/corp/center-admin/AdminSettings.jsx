import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Building2, KeyRound, LogOut, Save, Settings as SettingsIcon } from 'lucide-react';
import { updateCenter } from '../../../services/corpService';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, Field, LoadingRows, Page } from '../super-admin/ui';
import StaffHelpCard from '../../../components/corp/StaffHelpCard';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import GoogleLinkRows from '../super-admin/GoogleLinkRows';
import ChangePasswordSheet from './ChangePasswordSheet';
import { useCenterData } from './CenterDataContext';
import AppearanceCard from './AppearanceCard';
import SuperRoleSwitcher from '../../../components/corp/SuperRoleSwitcher';

const TABS = [
  { id: 'center', label: 'Center', icon: Building2 },
  { id: 'account', label: 'Account', icon: KeyRound },
];
const TAB_KEY = 'voc_admin_settings_tab';

// UITS CRM settings layout: tabs in the toolbar, one card per topic.
export default function AdminSettings() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { email } = useOutletContext() || {};
  const { logout } = useAuth();
  const [toastNode, showToast] = useToast();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const { centerId, center, centerName, loading, patch } = useCenterData();

  const [tab, setTab] = useState(() => {
    try {
      const saved = localStorage.getItem(TAB_KEY);
      return TABS.some((t) => t.id === saved) ? saved : 'center';
    } catch { return 'center'; }
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
      showToast('Saved');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const tabs = (
    <div className="ca-tabs" role="tablist" aria-label="Settings sections">
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
      title="Settings"
      subtitle="Center and account"
      back={isDesktop ? undefined : { label: 'Dashboard', onClick: () => navigate('/corp/admin') }}
      action={tabs}
    >
      {tab === 'center' && (
        <div className="ca-stack">
          <section className="ca-card ca-profile">
            <span className="ca-icon-box">{(centerName || 'C').charAt(0).toUpperCase()}</span>
            <div>
              <h2 className="ca-profile-name">{centerName}</h2>
              <p className="ca-profile-meta">
                <span className="ca-tag">Center Admin</span>
                {email}
              </p>
            </div>
          </section>

          <section className="ca-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><Building2 size={15} /> Center Details</h3>
                <span className="ca-card-sub">Visible to teachers and students</span>
              </div>
            </div>
            {loading ? <LoadingRows count={3} /> : (
              <form onSubmit={save}>
                <div className="ca-form-grid">
                  <Field label="Center Name">
                    <input className="sa-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Center name" />
                  </Field>
                  <Field label="Phone">
                    <input className="sa-input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 123 45 67" />
                  </Field>
                  <div className="is-full">
                    <Field label="Address">
                      <input className="sa-input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Tashkent, Chilonzor" />
                    </Field>
                  </div>
                </div>
                <div className="ca-form-actions">
                  {dirty && <Button variant="tinted" tone="gray" onClick={reset} disabled={saving}>Cancel</Button>}
                  <Button type="submit" disabled={saving || !dirty || !form.name.trim()}>
                    <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}

      {tab === 'account' && (
        <div className="ca-stack">
          <SuperRoleSwitcher />
          <AppearanceCard />
          <section className="ca-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><KeyRound size={15} /> Sign In</h3>
                <span className="ca-card-sub">Login and Google account</span>
              </div>
            </div>
            <div className="sa-group">
              <div className="sa-row">
                <span className="sa-row-body">
                  <span className="sa-row-text"><span className="sa-row-title">Login</span></span>
                  <span className="sa-row-detail">{email || '—'}</span>
                </span>
              </div>
              <button type="button" className="sa-row is-tappable" onClick={() => setPasswordOpen(true)}>
                <span className="sa-row-icon tone-orange"><KeyRound size={16} /></span>
                <span className="sa-row-body">
                  <span className="sa-row-text">
                    <span className="sa-row-title">Change password</span>
                    <span className="sa-row-subtitle">Use a password to sign in with your email</span>
                  </span>
                </span>
              </button>
              <GoogleLinkRows showToast={showToast} en />
            </div>
            <p className="sa-section-footer" style={{ marginTop: 10 }}>
              Linking a Google account also lets you sign in with "Sign in with Google". Forgot your password? Sign out and use "Forgot password" on the login page.
            </p>
          </section>

          <StaffHelpCard />

          <section className="ca-card">
            <div className="ca-card-head" style={{ marginBottom: 0, alignItems: 'center' }}>
              <div>
                <h3 className="ca-card-title"><LogOut size={15} /> Session</h3>
                <span className="ca-card-sub">Sign out of this device</span>
              </div>
              <Button tone="red" onClick={() => setConfirmLogout(true)}><LogOut size={15} /> Sign Out</Button>
            </div>
          </section>
        </div>
      )}

      <ChangePasswordSheet open={passwordOpen} onClose={() => setPasswordOpen(false)} onDone={() => showToast('Password changed')} />

      <ConfirmSheet
        open={confirmLogout}
        title="Sign out?"
        message="You'll need your login and password to sign back in."
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        danger
        onConfirm={async () => { await logout(); navigate('/login'); }}
        onCancel={() => setConfirmLogout(false)}
      />

      {toastNode}
    </Page>
  );
}
