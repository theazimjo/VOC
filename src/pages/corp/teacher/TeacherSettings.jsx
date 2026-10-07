import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Archive, ChevronRight, KeyRound, LogOut, Repeat, Save, Settings as SettingsIcon, UserRound,
} from 'lucide-react';
import { auth } from '../../../firebase';
import { updateTeacherProfile } from '../../../services/corpService';
import { useAuth } from '../../../contexts/AuthContext';
import { setActiveProfile } from '../../../utils/activeProfile';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, Field, Page } from '../super-admin/ui';
import ChangePasswordSheet from '../center-admin/ChangePasswordSheet';
import GoogleLinkRows from '../super-admin/GoogleLinkRows';
import { useToast } from '../super-admin/useToast';
import { useTeacherData } from './TeacherDataContext';
import AppearanceCard from '../center-admin/AppearanceCard';
import SuperRoleSwitcher from '../../../components/corp/SuperRoleSwitcher';

const TABS = [
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'account', label: 'Sign-in', icon: KeyRound },
];
const TAB_KEY = 'voc_teacher_settings_tab';

// Same layout as the center admin's settings: tabs in the toolbar, one card
// per topic. Appearance (light/dark) lives on the Sign-in tab, shared with center admin
// (TeacherLayout carries .is-center-admin).
export default function TeacherSettings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [toastNode, showToast] = useToast();
  const { centerId, centerName, teacherId, teacherName, phone, email, center, archivedGroups, activeGroups, patch } = useTeacherData();

  const [tab, setTab] = useState(() => {
    try {
      const saved = localStorage.getItem(TAB_KEY);
      return TABS.some((t) => t.id === saved) ? saved : 'profile';
    } catch { return 'profile'; }
  });
  const pickTab = (id) => {
    setTab(id);
    try { localStorage.setItem(TAB_KEY, id); } catch { /* private mode */ }
  };

  // The DB copy is fresher than the identity resolved at login.
  const me = center?.teachers?.[teacherId];
  const [form, setForm] = useState({ name: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const saved = { name: me?.name || teacherName || '', phone: me?.phone ?? phone ?? '' };
  const reset = () => { setForm(saved); setTouched(false); };
  // Refill from the DB when it (re)loads — unless the user is mid-edit.
  const [touched, setTouched] = useState(false);
  useEffect(() => { if (!touched) setForm({ name: me?.name || teacherName || '', phone: me?.phone ?? phone ?? '' }); }, [me, teacherName, phone, touched]);

  const dirty = form.name.trim() !== saved.name || form.phone.trim() !== saved.phone;
  const edit = (key) => (e) => { setTouched(true); setForm({ ...form, [key]: e.target.value }); };

  const save = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    setSaving(true);
    try {
      await updateTeacherProfile(centerId, teacherId, auth.currentUser?.uid, { name, phone: form.phone.trim() });
      patch((c) => ({ ...c, teachers: { ...c.teachers, [teacherId]: { ...c.teachers?.[teacherId], name, phone: form.phone.trim() } } }));
      setTouched(false);
      showToast('Saved');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Google-only accounts have no password to change.
  const hasPassword = Boolean(auth.currentUser?.providerData?.some((p) => p.providerId === 'password'));
  // Admin-created teachers sign in with their phone number.
  const login = email?.endsWith('@markaz.uz') && phone ? phone : email;
  const displayName = saved.name || 'Teacher';

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
    <Page icon={<SettingsIcon />} title="Settings" subtitle="Profile and sign-in" action={tabs}>
      {tab === 'profile' && (
        <div className="ca-stack">
          <section className="ca-card ca-profile">
            <span className="ca-icon-box">{displayName.charAt(0).toUpperCase()}</span>
            <div>
              <h2 className="ca-profile-name">{displayName}</h2>
              <p className="ca-profile-meta">
                <span className="ca-tag">Teacher</span>
                {centerName}
                <span>· {activeGroups.length} active {activeGroups.length === 1 ? 'group' : 'groups'}</span>
              </p>
            </div>
          </section>

          <section className="ca-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><UserRound size={15} /> Personal details</h3>
                <span className="ca-card-sub">Visible to your students and the center admin</span>
              </div>
            </div>
            <form onSubmit={save}>
              <div className="ca-form-grid">
                <Field label="Full name">
                  <input className="sa-input" required value={form.name} onChange={edit('name')} placeholder="Your name" />
                </Field>
                <Field label="Phone">
                  <input className="sa-input" type="tel" value={form.phone} onChange={edit('phone')} placeholder="+998 90 123 45 67" />
                </Field>
              </div>
              <div className="ca-form-actions">
                {dirty && <Button variant="tinted" tone="gray" onClick={reset} disabled={saving}>Cancel</Button>}
                <Button type="submit" disabled={saving || !dirty || !form.name.trim()}>
                  <Save size={15} /> {saving ? 'Saving...' : 'Save changes'}
                </Button>
              </div>
            </form>
          </section>

          <section className="ca-card">
            <div className="ca-card-head">
              <div>
                <h3 className="ca-card-title"><Repeat size={15} /> Elsewhere</h3>
                <span className="ca-card-sub">Archive and personal learning</span>
              </div>
            </div>
            <div className="ca-feed">
              <button type="button" className="ca-feed-item" onClick={() => navigate('/corp/teacher/archive')}>
                <span className="ca-icon-box is-sm"><Archive size={14} /></span>
                <span className="ca-feed-text">
                  <span className="ca-feed-title">Archived groups</span>
                  <span className="ca-feed-sub">{archivedGroups.length ? `${archivedGroups.length} ${archivedGroups.length === 1 ? 'group' : 'groups'}` : 'Archive is empty'}</span>
                </span>
                <ChevronRight size={16} />
              </button>
              <button type="button" className="ca-feed-item" onClick={() => { setActiveProfile('personal'); navigate('/'); }}>
                <span className="ca-icon-box is-sm"><Repeat size={14} /></span>
                <span className="ca-feed-text">
                  <span className="ca-feed-title">Switch to personal mode</span>
                  <span className="ca-feed-sub">The app where you learn words yourself</span>
                </span>
                <ChevronRight size={16} />
              </button>
            </div>
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
                <h3 className="ca-card-title"><KeyRound size={15} /> Sign-in</h3>
                <span className="ca-card-sub">Login, password and Google account</span>
              </div>
              {hasPassword && (
                <Button variant="tinted" onClick={() => setPasswordOpen(true)}><KeyRound size={15} /> Change password</Button>
              )}
            </div>
            <div className="sa-group">
              <div className="sa-row">
                <span className="sa-row-body">
                  <span className="sa-row-text"><span className="sa-row-title">Login</span></span>
                  <span className="sa-row-detail">{login || '—'}</span>
                </span>
              </div>
              <GoogleLinkRows showToast={showToast} allowMove en />
            </div>
            <p className="sa-section-footer" style={{ marginTop: 10 }}>
              Link a Google account to sign in with "Continue with Google" instead of remembering your phone and password. Your login and password keep working too.
            </p>
          </section>

          <section className="ca-card">
            <div className="ca-card-head" style={{ marginBottom: 0, alignItems: 'center' }}>
              <div>
                <h3 className="ca-card-title"><LogOut size={15} /> Session</h3>
                <span className="ca-card-sub">Sign out on this device</span>
              </div>
              <Button tone="red" onClick={() => setConfirmLogout(true)}><LogOut size={15} /> Log out</Button>
            </div>
          </section>
        </div>
      )}

      <ChangePasswordSheet open={passwordOpen} onClose={() => setPasswordOpen(false)} onDone={() => showToast('Password changed')} />

      <ConfirmSheet
        open={confirmLogout}
        title="Log out?"
        message="You'll need your login and password to sign back in."
        confirmLabel="Log out"
        danger
        onConfirm={async () => { await logout(); navigate('/login'); }}
        onCancel={() => setConfirmLogout(false)}
      />

      {toastNode}
    </Page>
  );
}
