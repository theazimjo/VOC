import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePlansConfig } from '../../hooks/usePlan';
import { EVERYONE_PREMIUM, formatUZS } from '../../utils/plans';
import { SUPPORT } from '../../utils/support';
import { COPY } from './pricingCopy';

const LEARNER_ORDER = ['free', 'plus'];
const CENTER_ORDER = ['free', 'start', 'standard', 'pro'];

function Card({ c, plan, feats, highlight, perStudent, cta, to }) {
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 20,
        padding: 22,
        border: highlight ? '2px solid var(--accent-1)' : '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
      }}
    >
      {highlight && (
        <span style={{ position: 'absolute', top: -11, left: 18, background: 'var(--accent-1)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}>
          {c.popular}
        </span>
      )}
      <div style={{ fontSize: 18, fontWeight: 700 }}>{c.names[plan.id]}</div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>{plan.price === 0 ? c.free : formatUZS(plan.price)}</div>
        {plan.price > 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            {c.month} · {formatUZS(plan.yearly)} {c.year}
          </div>
        )}
        {perStudent ? (
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>
            {c.perStudent}{formatUZS(perStudent)}
          </div>
        ) : null}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
        {feats.map((f) => (
          <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 14 }}>
            <Check size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: 2 }} />
            {f}
          </li>
        ))}
      </ul>
      {cta && (
        <Link
          to={to}
          style={{
            marginTop: 'auto',
            padding: '12px 0',
            borderRadius: 12,
            textAlign: 'center',
            fontWeight: 600,
            textDecoration: 'none',
            background: highlight ? 'var(--accent-1)' : 'var(--bg-tertiary)',
            color: highlight ? '#fff' : 'var(--text-primary)',
          }}
        >
          {cta}
        </Link>
      )}
    </div>
  );
}

export default function PricingPage() {
  const { language, setLanguage } = useLanguage();
  const c = COPY[language] || COPY.uz;
  const student = usePlansConfig('student');
  const center = usePlansConfig('center');
  const grid = { display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '32px 16px 64px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 8, flexWrap: 'wrap' }}>
          <Link to="/welcome" style={{ fontWeight: 800, fontSize: 18, textDecoration: 'none', color: 'inherit' }}>VOCABRY</Link>
          <div style={{ display: 'flex', gap: 6 }}>
            {['uz', 'ru', 'en'].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                style={{ padding: '6px 12px', borderRadius: 99, border: 'none', cursor: 'pointer', fontWeight: 600, background: language === l ? 'var(--accent-1)' : 'var(--bg-tertiary)', color: language === l ? '#fff' : 'var(--text-primary)' }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <h1 style={{ fontSize: 34, margin: '0 0 8px' }}>{c.title}</h1>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 36px', maxWidth: 620 }}>{c.sub}</p>

        <h2 style={{ fontSize: 20, margin: '0 0 16px' }}>{c.forLearners}</h2>
        {EVERYONE_PREMIUM && <p style={{ margin: '-8px 0 16px', fontWeight: 600, color: 'var(--accent-1)' }}>{c.launch}</p>}
        <div style={{ ...grid, marginBottom: 44 }}>
          {LEARNER_ORDER.map((id) => (
            <Card
              key={id}
              c={c}
              plan={student[id]}
              highlight={id === 'plus'}
              feats={[c.everything, c.packs(student[id].limits.packs)]}
              cta={id === 'free' ? c.ctaLearner : null}
              to="/register"
            />
          ))}
        </div>

        <h2 style={{ fontSize: 20, margin: '0 0 16px' }}>{c.forCenters}</h2>
        <div style={grid}>
          {CENTER_ORDER.map((id) => {
            const p = center[id];
            const n = p.limits.students;
            return (
              <Card
                key={id}
                c={c}
                plan={p}
                highlight={id === 'standard'}
                perStudent={p.price > 0 && n !== Infinity ? p.price / n : null}
                feats={[c.centerAll, c.students(n), c.groups(p.limits.groups)]}
                cta={id === 'free' || id === 'standard' ? c.cta : null}
                to="/start-center"
              />
            );
          })}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 28, maxWidth: 640 }}>{c.note}{' '}<a href={SUPPORT.telegramUrl} style={{ color: 'var(--accent-1)' }}>t.me/{SUPPORT.telegramUser}</a></p>
      </div>
    </div>
  );
}
