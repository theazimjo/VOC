import { Moon, Sun } from 'lucide-react';
import { setPanelTheme, usePanelTheme } from './usePanelTheme';

const OPTIONS = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

// Settings card: pick the panel's light or dark look. Applies instantly.
export default function AppearanceCard() {
  const theme = usePanelTheme();
  return (
    <section className="ca-card">
      <div className="ca-card-head">
        <div>
          <h3 className="ca-card-title">{theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />} Appearance</h3>
          <span className="ca-card-sub">Saved on this device</span>
        </div>
      </div>
      <div className="va-theme-opts" role="radiogroup" aria-label="Theme">
        {OPTIONS.map(({ id, label }) => (
          <button key={id} type="button" role="radio" aria-checked={theme === id} className={`va-theme-opt ${theme === id ? 'is-active' : ''}`} onClick={() => setPanelTheme(id)}>
            <span className={`va-theme-prev is-${id}`} aria-hidden="true"><i /><b /></span>
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
