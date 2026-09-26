import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { LogOut, Moon } from 'lucide-react';
import { updateCenter } from '../../../services/corpService';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, FormRow, LoadingRows, Page, Row, Section, Toggle } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useToast } from '../super-admin/useToast';
import { useCenterData } from './CenterDataContext';

export default function AdminSettings() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { email } = useOutletContext() || {};
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const [toastNode, showToast] = useToast();
  const { centerId, center, loading, patch } = useCenterData();

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

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Page
      title="Sozlamalar"
      narrow
      back={isDesktop ? undefined : { label: 'Asosiy', onClick: () => navigate('/corp/admin') }}
    >
      {loading ? <LoadingRows count={3} /> : (
        <form onSubmit={save}>
          <Section title="Markaz">
            <FormRow label="Nomi">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Markaz nomi" />
            </FormRow>
            <FormRow label="Telefon">
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 90 123 45 67" />
            </FormRow>
            <FormRow label="Manzil">
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Toshkent, Chilonzor" />
            </FormRow>
          </Section>
          {dirty && (
            <div className="sa-form-actions">
              <Button variant="tinted" tone="gray" onClick={reset} disabled={saving}>Bekor qilish</Button>
              <Button type="submit" disabled={saving || !form.name.trim()}>{saving ? 'Saqlanmoqda...' : 'Saqlash'}</Button>
            </div>
          )}
        </form>
      )}

      <Section title="Hisob" footer="Parolni unutsangiz, VOC qo'llab-quvvatlash xizmatiga yozing — yangi parol o'rnatib beriladi.">
        <Row title="Login" detail={email || '—'} />
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
        <Row icon={<LogOut size={16} />} iconTone="red" title="Chiqish" destructive chevron={false} onClick={() => setConfirmLogout(true)} />
      </Section>

      <ConfirmSheet
        open={confirmLogout}
        title="Chiqasizmi?"
        message="Qayta kirish uchun login va parol kerak bo'ladi."
        confirmLabel="Chiqish"
        danger
        onConfirm={handleLogout}
        onCancel={() => setConfirmLogout(false)}
      />

      {toastNode}
    </Page>
  );
}
