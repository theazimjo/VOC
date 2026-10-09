import { LifeBuoy, Phone, Send } from 'lucide-react';
import { SUPPORT } from '../../utils/support';
import { Button } from '../../pages/corp/super-admin/ui';

// "Help" card for the admin and teacher settings pages.
export default function StaffHelpCard() {
  return (
    <section className="ca-card">
      <div className="ca-card-head" style={{ marginBottom: 12 }}>
        <div>
          <h3 className="ca-card-title"><LifeBuoy size={15} /> Help</h3>
          <span className="ca-card-sub">Something not working, or a question about VOCABRY? Write or call.</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Button onClick={() => window.open(SUPPORT.telegramUrl, '_blank', 'noopener')}><Send size={15} /> Telegram @{SUPPORT.telegramUser}</Button>
        <Button variant="tinted" onClick={() => { window.location.href = `tel:${SUPPORT.phone}`; }}><Phone size={15} /> {SUPPORT.phoneLabel}</Button>
      </div>
    </section>
  );
}
