import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { Megaphone, Moon, ShieldCheck, Wrench } from 'lucide-react';
import { db, auth } from '../../../firebase';
import { setMaintenanceMode as saveMaintenanceMode } from '../../../services/corpService';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Page, Row, Section, Toggle } from './ui';
import { useToast } from './useToast';

export default function SuperAdminSettings() {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null); // 'maintenance' | 'logout'
  const [toastNode, showToast] = useToast();

  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const email = auth.currentUser?.email || '';

  useEffect(() => {
    get(ref(db, 'settings/global/maintenanceMode'))
      .then((snap) => setMaintenance(!!snap.val()))
      .catch((err) => console.error('Error loading maintenance mode:', err))
      .finally(() => setLoading(false));
  }, []);

  const applyMaintenance = async (next) => {
    setSaving(true);
    setMaintenance(next);
    try {
      await saveMaintenanceMode(next);
      showToast(next ? 'Texnik xizmat rejimi yoqildi' : "Texnik xizmat rejimi o'chirildi");
    } catch (err) {
      setMaintenance(!next);
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSaving(false);
      setConfirm(null);
    }
  };

  // Turning maintenance ON locks every center out, so confirm it; turning
  // it off is always safe.
  const onMaintenanceChange = (next) => {
    if (next) setConfirm('maintenance');
    else applyMaintenance(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Page title="Sozlamalar">
      <div style={{ maxWidth: 720, margin: '0 auto', width: '100%' }}>
        <Section
          title="Platforma"
          footer="Yoqilganda super admindan boshqa hech kim markaz paneliga kira olmaydi. Shaxsiy VOC ilovasiga ta'sir qilmaydi."
        >
          <Row
            icon={<Wrench size={16} />}
            iconTone={maintenance ? 'orange' : 'gray'}
            title="Texnik xizmat rejimi"
            accessory={<Toggle checked={maintenance} onChange={onMaintenanceChange} disabled={loading || saving} label="Texnik xizmat rejimi" />}
          />
        </Section>

        <Section>
          <Row
            icon={<Megaphone size={16} />}
            iconTone="red"
            title="E'lonlar"
            subtitle="Markaz adminlari va o'qituvchilarga xabar"
            onClick={() => navigate('/corp/super-admin/announcements')}
          />
        </Section>

        <Section title="Ko'rinish">
          <Row
            icon={<Moon size={16} />}
            iconTone="purple"
            title="Tungi rejim"
            accessory={<Toggle checked={theme === 'android'} onChange={(on) => setTheme(on ? 'android' : 'ios')} label="Tungi rejim" />}
          />
        </Section>

        <Section title="Hisob">
          <Row icon={<ShieldCheck size={16} />} iconTone="blue" title="Super admin" subtitle={email} />
        </Section>

        <Section>
          <Row title="Chiqish" destructive chevron={false} onClick={() => setConfirm('logout')} icon={null} />
        </Section>
      </div>

      <ConfirmSheet
        open={confirm === 'maintenance'}
        title="Texnik xizmat rejimini yoqasizmi?"
        message="Barcha markaz adminlari, o'qituvchilar va o'quvchilar markaz paneliga kira olmay qoladi."
        confirmLabel="Yoqish"
        danger
        busy={saving}
        onConfirm={() => applyMaintenance(true)}
        onCancel={() => !saving && setConfirm(null)}
      />
      <ConfirmSheet
        open={confirm === 'logout'}
        title="Chiqasizmi?"
        message={email ? `${email} hisobidan chiqasiz.` : undefined}
        confirmLabel="Chiqish"
        danger
        onConfirm={handleLogout}
        onCancel={() => setConfirm(null)}
      />

      {toastNode}
    </Page>
  );
}
