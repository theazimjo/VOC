import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { APP_VERSION_LABEL } from '../../utils/appVersion';
import BetaBadge from '../common/BetaBadge';
import './AuthShell.css';

const ASIDE_ROWS = [
  { word: 'achieve', pct: '94%', status: 'good' },
  { word: 'thorough', pct: '78%', status: 'soon' },
  { word: 'consistent', pct: '61%', status: 'due' },
  { word: 'reluctant', pct: '43%', status: 'due' },
];

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Tiles({ text, tone }) {
  return (
    <span className={`as-flap as-flap--${tone}`} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={`${i}-${ch}`} className="as-flap-tile" style={{ '--i': i }}>{ch}</span>
      ))}
    </span>
  );
}

/** Label-above input. `type="password"` gets a show/hide toggle. */
export function Field({ label, type = 'text', value, onChange, autoComplete, disabled, autoFocus, showLabel, hideLabel, ...rest }) {
  const id = useId();
  const [shown, setShown] = useState(false);
  const isPassword = type === 'password';
  return (
    <div className="as-field">
      <label htmlFor={id}>{label}</label>
      <div className="as-input-wrap">
        <input
          id={id}
          type={isPassword && shown ? 'text' : type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          autoFocus={autoFocus}
          className={isPassword ? 'as-input as-input--with-toggle' : 'as-input'}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className="as-eye"
            onClick={() => setShown((v) => !v)}
            aria-label={shown ? hideLabel : showLabel}
            aria-pressed={shown}
            tabIndex={0}
          >
            {shown ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Two-pane shell for sign-in and sign-up: form on warm ground, a departures
 * board on ink beside it (hidden on narrow screens).
 */
export function AuthShell({ copy, lang, setLanguage, children }) {
  return (
    <div className="as-page">
      <main className="as-main">
        <header className="as-top">
          <Link to="/welcome" className="as-brand" aria-label="VOCABRY">
            <img src="/logo.png" alt="" width="34" height="34" />
            <span>VOCABRY</span>
            <BetaBadge />
          </Link>
          <div className="as-lang" role="group" aria-label={copy.langLabel}>
            {['uz', 'ru', 'en'].map((code) => (
              <button key={code} type="button" className={lang === code ? 'is-on' : ''} aria-pressed={lang === code} onClick={() => setLanguage(code)}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <div className="as-card">{children}</div>

        <footer className="as-bottom">
          <Link to="/welcome" className="as-back"><ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />{copy.back}</Link>
          <span className="as-version">Beta {APP_VERSION_LABEL}</span>
        </footer>
      </main>

      <aside className="as-aside" aria-hidden="true">
        <div className="as-board">
          <div className="as-board-head">
            <span className="as-board-title">{copy.aside.title}</span>
            <span className="as-board-sample">{copy.aside.sample}</span>
          </div>
          <ul>
            {ASIDE_ROWS.map((r) => (
              <li key={r.word}>
                <span className="as-board-word">{r.word}</span>
                <Tiles text={r.pct} tone="light" />
                <Tiles text={copy.aside.status[r.status]} tone={r.status} />
              </li>
            ))}
          </ul>
        </div>
        <p className="as-aside-line">{copy.aside.line}</p>
      </aside>
    </div>
  );
}
