import { ChevronRight, Phone, Send } from 'lucide-react';
import { SUPPORT, supportText } from '../../utils/support';

// "Help" rows for the profile pages: Telegram chat and a phone call. They reuse the
// profile tile look (corp-profile-tile), so both profile pages can drop them in.
export default function SupportTiles({ language }) {
  const text = supportText(language);
  const arrow = <ChevronRight size={16} strokeWidth={2.5} className="corp-profile-tile-arrow" style={{ marginLeft: 'auto' }} />;
  return (
    <>
      <a className="corp-profile-tile" href={SUPPORT.telegramUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="corp-profile-tile-icon" style={{ background: '#229ed9' }}>
          <Send size={17} strokeWidth={2.2} />
        </div>
        <span className="corp-profile-tile-text">{text.title}: {text.telegram}</span>
        {arrow}
      </a>
      <a className="corp-profile-tile" href={`tel:${SUPPORT.phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="corp-profile-tile-icon" style={{ background: '#34c759' }}>
          <Phone size={17} strokeWidth={2.2} />
        </div>
        <span className="corp-profile-tile-text">{text.call} · {SUPPORT.phoneLabel}</span>
        {arrow}
      </a>
    </>
  );
}
