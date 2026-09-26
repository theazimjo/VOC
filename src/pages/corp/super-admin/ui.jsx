import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

// Small iOS-style building blocks for the super admin module: large-title
// pages, inset grouped lists, sheets, a segmented control. Styling lives in
// sa.css; keep these dumb so every page reads the same way.

// Critically damped spring (no overshoot) — Apple's default for UI that
// wasn't flung by the user.
const SPRING = { type: 'spring', bounce: 0, duration: 0.38 };

// How a Page draws its header: 'large' (iOS large title, default) or
// 'toolbar' (a sticky bar with an icon box, compact title and the actions
// on the right — the center admin panel provides this, UITS CRM style).
export const PageStyleContext = createContext('large');

// `narrow` keeps form-like pages (settings) at a readable width on desktop
// instead of stretching every field across the whole screen. `icon` shows
// in the toolbar style only.
export function Page({ title, subtitle, action, back, narrow = false, icon, children }) {
  const style = useContext(PageStyleContext);

  if (style === 'toolbar') {
    return (
      <div className="sa-page is-toolbar">
        <header className="ca-toolbar">
          <div className="ca-toolbar-titles">
            {back && (
              <button type="button" className="ca-toolbar-back" onClick={back.onClick} aria-label={back.label}>
                <ChevronLeft size={18} strokeWidth={2.4} />
              </button>
            )}
            {icon && <span className="ca-toolbar-icon">{icon}</span>}
            <div className="ca-toolbar-text">
              <h1 className="ca-toolbar-title">{title}</h1>
              {subtitle && <p className="ca-toolbar-sub">{back ? <span className="ca-toolbar-crumb">{back.label} · </span> : null}{subtitle}</p>}
              {!subtitle && back && <p className="ca-toolbar-sub"><span className="ca-toolbar-crumb">{back.label}</span></p>}
            </div>
          </div>
          {action && <div className="ca-toolbar-actions">{action}</div>}
        </header>
        <div className={`ca-content ${narrow ? 'is-narrow' : ''}`}>{children}</div>
      </div>
    );
  }

  return (
    <div className={`sa-page ${narrow ? 'is-narrow' : ''}`}>
      {back && (
        <button type="button" className="sa-back" onClick={back.onClick}>
          <ChevronLeft size={20} strokeWidth={2.6} />
          <span>{back.label}</span>
        </button>
      )}
      <header className="sa-page-head">
        <div className="sa-page-titles">
          <h1 className="sa-large-title">{title}</h1>
          {subtitle && <p className="sa-page-subtitle">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </div>
  );
}

export function Section({ title, footer, children, action }) {
  return (
    <section className="sa-section">
      {(title || action) && (
        <div className="sa-section-head">
          {title && <h2 className="sa-section-title">{title}</h2>}
          {action}
        </div>
      )}
      <div className="sa-group">{children}</div>
      {footer && <p className="sa-section-footer">{footer}</p>}
    </section>
  );
}

// One row of an inset grouped list. Renders a <button> when tappable so it
// gets focus/keyboard behaviour for free.
export function Row({ icon, iconTone = 'blue', title, subtitle, detail, accessory, onClick, destructive, chevron = Boolean(onClick), disabled, selected }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`sa-row ${onClick ? 'is-tappable' : ''} ${destructive ? 'is-destructive' : ''} ${selected ? 'is-selected' : ''}`}
      onClick={onClick}
      aria-current={selected ? 'true' : undefined}
      disabled={onClick ? disabled : undefined}
    >
      {icon && <span className={`sa-row-icon tone-${iconTone}`}>{icon}</span>}
      <span className="sa-row-body">
        <span className="sa-row-text">
          <span className="sa-row-title">{title}</span>
          {subtitle && <span className="sa-row-subtitle">{subtitle}</span>}
        </span>
        {detail !== undefined && detail !== null && <span className="sa-row-detail">{detail}</span>}
        {accessory}
        {chevron && <ChevronRight size={17} className="sa-row-chevron" aria-hidden="true" />}
      </span>
    </Tag>
  );
}

export function Stat({ value, label, tone }) {
  return (
    <div className="sa-stat">
      <span className={`sa-stat-value ${tone ? `tone-text-${tone}` : ''}`}>{value}</span>
      <span className="sa-stat-label">{label}</span>
    </div>
  );
}

export function Segmented({ options, value, onChange, label }) {
  return (
    <div className="sa-segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          className={`sa-segment ${value === o.value ? 'is-active' : ''}`}
          onClick={() => onChange(o.value)}
        >
          {value === o.value && <motion.span layoutId={`seg-${label}`} className="sa-segment-thumb" transition={SPRING} />}
          <span className="sa-segment-label">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

export function SearchField({ value, onChange, placeholder = 'Qidirish' }) {
  return (
    <label className="sa-search">
      <Search size={16} aria-hidden="true" />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {value && (
        <button type="button" className="sa-search-clear" onClick={() => onChange('')} aria-label="Tozalash">
          <X size={12} strokeWidth={3} />
        </button>
      )}
    </label>
  );
}

export function Toggle({ checked, onChange, disabled, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`sa-toggle ${checked ? 'is-on' : ''}`}
      onClick={() => onChange(!checked)}
      disabled={disabled}
    >
      <span className="sa-toggle-knob" />
    </button>
  );
}

export function StatusDot({ tone }) {
  return <span className={`sa-dot tone-bg-${tone}`} aria-hidden="true" />;
}

// Where sheets open on wider screens: 'center' (default, a card) or
// 'drawer' (a full-height panel from the right edge — the center admin
// panel provides this). Phones always get a bottom sheet.
export const SheetPlacementContext = createContext('center');

const TABLET_UP = '(min-width: 769px)';
function useTabletUp() {
  const get = () => typeof window !== 'undefined' && window.matchMedia(TABLET_UP).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(TABLET_UP);
    const onChange = (e) => setMatch(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return match;
}

// Bottom sheet on phones, centered card (or right-edge drawer) on wider
// screens. Enters and exits along the same path (up from the bottom /
// scale from center / in from the right) so dismissing feels like the
// reverse of opening.
export function Sheet({ open, onClose, title, children, footer, wide = false }) {
  const reduce = useReducedMotion();
  const placement = useContext(SheetPlacementContext);
  const tabletUp = useTabletUp();
  const drawer = placement === 'drawer' && tabletUp;
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeRef.current?.(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const panel = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : drawer
      ? { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }
      : { initial: { opacity: 0, y: 40, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 40, scale: 0.98 } };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`sa-sheet-scrim ${drawer ? 'is-drawer' : ''}`}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`sa-sheet ${wide ? 'is-wide' : ''} ${drawer ? 'is-drawer' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
            {...panel}
            transition={reduce ? { duration: 0.15 } : SPRING}
          >
            <div className="sa-sheet-grabber" aria-hidden="true" />
            <div className="sa-sheet-head">
              <h2 className="sa-sheet-title">{title}</h2>
              <button type="button" className="sa-sheet-close" onClick={onClose} aria-label="Yopish">
                <X size={16} strokeWidth={2.6} />
              </button>
            </div>
            <div className="sa-sheet-body">{children}</div>
            {footer && <div className="sa-sheet-footer">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Button({ children, variant = 'filled', tone = 'blue', block = false, type = 'button', ...rest }) {
  return (
    <button type={type} className={`sa-btn sa-btn-${variant} tone-${tone} ${block ? 'sa-btn-block' : ''}`} {...rest}>
      {children}
    </button>
  );
}

// A labelled input inside a grouped list (iOS Settings style): label on
// the left, value typed on the right, rows separated like Row.
export function FormRow({ label, children }) {
  return (
    <label className="sa-form-row">
      <span className="sa-form-row-label">{label}</span>
      {children}
    </label>
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="sa-field">
      <span className="sa-field-label">{label}</span>
      {children}
      {hint && <span className="sa-field-hint">{hint}</span>}
    </label>
  );
}

export function EmptyState({ icon, title, text, action }) {
  return (
    <div className="sa-empty">
      {icon && <div className="sa-empty-icon">{icon}</div>}
      <p className="sa-empty-title">{title}</p>
      {text && <p className="sa-empty-text">{text}</p>}
      {action}
    </div>
  );
}

export function LoadingRows({ count = 4 }) {
  return (
    <div className="sa-group" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="sa-row sa-row-skeleton">
          <span className="sa-skel sa-skel-icon" />
          <span className="sa-row-body">
            <span className="sa-row-text">
              <span className="sa-skel sa-skel-line" />
              <span className="sa-skel sa-skel-line short" />
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export function IOSSpinner() {
  return (
    <div className="sa-ios-spinner">
      <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
    </div>
  );
}

export function PageLoading({ title = 'Yuklanmoqda...' }) {
  return (
    <div className="sa-page-loading">
      <IOSSpinner />
      <span style={{ fontSize: 15 }}>{title}</span>
    </div>
  );
}
