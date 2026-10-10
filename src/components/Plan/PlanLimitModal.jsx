import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { COPY } from '../../pages/pricing/pricingCopy';

// Shown when a plan limit stops an action (the app fires 'voc:plan-limit').
export default function PlanLimitModal() {
  const { language } = useLanguage();
  const [hit, setHit] = useState(null);

  useEffect(() => {
    const on = (e) => setHit(e.detail || {});
    window.addEventListener('voc:plan-limit', on);
    return () => window.removeEventListener('voc:plan-limit', on);
  }, []);

  if (!hit) return null;
  const c = COPY[language] || COPY.en;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setHit(null)}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderRadius: 20, padding: 24, maxWidth: 380, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>{c.limitTitle}</h3>
        <p style={{ margin: '0 0 20px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{c.limitBody(hit.limit)}</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" onClick={() => setHit(null)} style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: 'none', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>{c.close}</button>
          <Link to="/pricing" onClick={() => setHit(null)} style={{ flex: 1, padding: '12px 0', borderRadius: 12, background: 'var(--accent-1)', color: '#fff', fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>{c.seePlans}</Link>
        </div>
      </div>
    </div>
  );
}
