import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Archive, KeyRound, LogOut, Moon, Repeat } from 'lucide-react';
import { auth } from '../../../firebase';
import { updateTeacherProfile } from '../../../services/corpService';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { setActiveProfile } from '../../../utils/activeProfile';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, Field, FormRow, Page, Row, Section, Sheet, Toggle } from '../super-admin/ui';
import { MIN_PASSWORD } from '../super-admin/SetPasswordSheet';
import { useToast } from '../super-admin/useToast';
import { useTeacherData } from './TeacherDataContext';

export default function TeacherSettings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const [toastNode, showToast] = useToast();
  const { centerId, centerName, teacherId, teacherName, phone, email, center, archivedGroups, patch } = useTeacherData();

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

  const save = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    setSaving(true);
    try {
      await updateTeacherProfile(centerId, teacherId, auth.currentUser?.uid, { name, phone: form.phone.trim() });
      patch((c) => ({ ...c, teachers: { ...c.teachers, [teacherId]: { ...c.teachers?.[teacherId], name, phone: form.phone.trim() } } }));
      setTouched(false);
      showToast('Saqlandi');
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Google-only accounts have no password to change.
  const hasPassword = Boolean(auth.currentUser?.providerData?.some((p) => p.providerId === 'password'));
  // Admin-created teachers sign in with their phone number.
  const login = email?.endsWith('@markaz.uz') && phone ? phone : email;

  return (
    <Page title="Sozlamalar" subtitle={centerName} narrow>
      <form onSubmit={save}>
        <Section title="Profil">
          <FormRow label="Ism familiya">
            <input required value={form.name} onChange={(e) => { setTouched(true); setForm({ ...form, name: e.target.value }); }} placeholder="Ismingiz" />
          </FormRow>
          <FormRow label="Telefon">
            <input type="tel" value={form.phone} onChange={(e) => { setTouched(true); setForm({ ...form, phone: e.target.value }); }} placeholder="+998 90 123 45 67" />
          </FormRow>
        </Section>
        {dirty && (
          <div className="sa-form-actions">
            <Button variant="tinted" tone="gray" onClick={reset} disabled={saving}>Bekor qilish</Button>
            <Button type="submit" disabled={saving || !form.name.trim()}>{saving ? 'Saqlanmoqda...' : 'Saqlash'}</Button>
          </div>
        )}
      </form>

      <Section title="Hisob" footer="Ismingiz o'quvchilarga va markaz adminiga ko'rinadi.">
        <Row title="Login" detail={login || '—'} />
        {hasPassword && (
          <Row icon={<KeyRound size={16} />} iconTone="orange" title="Parolni o'zgartirish" onClick={() => setPasswordOpen(true)} />
        )}
      </Section>

      <Section title="Ko'rinish">
        <Row
          icon={<Moon size={16} />}
          iconTone="purple"
          title="Tungi rejim"
          accessory={<Toggle checked={theme === 'android'} onChange={(on) => setTheme(on ? 'android' : 'ios')} label="Tungi rejim" />}
        />
      </Section>

      <Section>
        <Row
          icon={<Archive size={16} />}
          iconTone="gray"
          title="Arxivdagi guruhlar"
          detail={archivedGroups.length || null}
          onClick={() => navigate('/corp/teacher/archive')}
        />
        <Row
          icon={<Repeat size={16} />}
          iconTone="green"
          title="Shaxsiy rejimga o'tish"
          subtitle="O'zingiz so'z o'rganadigan ilova"
          onClick={() => { setActiveProfile('personal'); navigate('/'); }}
        />
      </Section>

      <Section>
        <Row icon={<LogOut size={16} />} iconTone="red" title="Chiqish" destructive chevron={false} onClick={() => setConfirmLogout(true)} />
      </Section>

      <ChangePasswordSheet open={passwordOpen} onClose={() => setPasswordOpen(false)} onDone={() => showToast("Parol o'zgartirildi")} />

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

// Firebase needs a recent sign-in to change a password, so ask for the
// current one and re-authenticate first instead of failing with
// "requires-recent-login".
function ChangePasswordSheet({ open, onClose, onDone }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setCurrent('');
    setNext('');
    setError('');
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (next.length < MIN_PASSWORD) return;
    setSaving(true);
    setError('');
    try {
      const user = auth.currentUser;
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, current));
      await updatePassword(user, next);
      onClose();
      onDone();
    } catch (err) {
      setError(err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
        ? "Joriy parol noto'g'ri."
        : err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title="Parolni o'zgartirish">
      <form onSubmit={submit}>
        <Field label="Joriy parol">
          <input className="sa-input" type="password" autoComplete="current-password" required autoFocus value={current} onChange={(e) => setCurrent(e.target.value)} />
        </Field>
        <Field label="Yangi parol" hint={`Kamida ${MIN_PASSWORD} ta belgi.`}>
          <input className="sa-input" type="password" autoComplete="new-password" required value={next} onChange={(e) => setNext(e.target.value)} />
        </Field>
        {error && <p className="sa-flow-error">{error}</p>}
        <Button type="submit" block disabled={saving || !current || next.length < MIN_PASSWORD}>{saving ? 'Saqlanmoqda...' : "O'zgartirish"}</Button>
      </form>
    </Sheet>
  );
}
