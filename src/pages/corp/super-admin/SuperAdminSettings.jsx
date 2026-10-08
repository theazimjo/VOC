import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { Megaphone, ShieldCheck, Wrench } from 'lucide-react';
import { db, auth } from '../../../firebase';
import { setMaintenanceMode as saveMaintenanceMode } from '../../../services/corpService';
import { useAuth } from '../../../contexts/AuthContext';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Page, Row, Section, Toggle } from './ui';
import SuperRoleSwitcher from '../../../components/corp/SuperRoleSwitcher';
import AppearanceCard from '../center-admin/AppearanceCard';
import { useToast } from './useToast';

export default function SuperAdminSettings() {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null); // 'maintenance' | 'logout'
  const [toastNode, showToast] = useToast();

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
      showToast(next ? 'Maintenance mode is on' : 'Maintenance mode is off');
    } catch (err) {
      setMaintenance(!next);
      showToast(`Error: ${err.message}`, 'error');
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
    <Page title="Settings">
      <div style={{ maxWidth: 720, margin: '0 auto', width: '100%' }}>
        <SuperRoleSwitcher />

        <Section
          title="Platform"
          footer="While on, nobody except the super admin can open a center panel. The personal VOC app is not affected."
        >
          <Row
            icon={<Wrench size={16} />}
            iconTone={maintenance ? 'orange' : 'gray'}
            title="Maintenance mode"
            accessory={<Toggle checked={maintenance} onChange={onMaintenanceChange} disabled={loading || saving} label="Maintenance mode" />}
          />
        </Section>

        <Section>
          <Row
            icon={<Megaphone size={16} />}
            iconTone="red"
            title="Announcements"
            subtitle="Messages for center admins and teachers"
            onClick={() => navigate('/corp/super-admin/announcements')}
          />
        </Section>

        <div style={{ marginBottom: 28 }}>
          <AppearanceCard />
        </div>

        <Section title="Account">
          <Row icon={<ShieldCheck size={16} />} iconTone="blue" title="Super admin" subtitle={email} />
        </Section>

        <Section>
          <Row title="Log out" destructive chevron={false} onClick={() => setConfirm('logout')} icon={null} />
        </Section>
      </div>

      <ConfirmSheet
        open={confirm === 'maintenance'}
        title="Turn on maintenance mode?"
        message="All center admins, teachers and students will be locked out of the center panels."
        confirmLabel="Turn on"
        danger
        busy={saving}
        onConfirm={() => applyMaintenance(true)}
        onCancel={() => !saving && setConfirm(null)}
      />
      <ConfirmSheet
        open={confirm === 'logout'}
        title="Log out?"
        message={email ? `You will be signed out of ${email}.` : undefined}
        confirmLabel="Log out"
        danger
        onConfirm={handleLogout}
        onCancel={() => setConfirm(null)}
      />

      {toastNode}
    </Page>
  );
}
