import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, RotateCcw, FastForward } from 'lucide-react';
import { APP_VERSION_LABEL } from '../../utils/appVersion';
import BetaBadge from '../../components/common/BetaBadge';
import { CONTENT, EVIDENCE, EVIDENCE_POST, GROUP_ROWS, WORDS } from './landingContent';

import './LandingPage.css';

/*
THESIS: Memory is a timetable. Every word has its own departure; the page
refuses the dark-glass bento hero and shows the mechanism as an object.
OWN-WORLD: warm concrete ground, a near-black split-flap departures board,
Barlow Condensed signage type, status colors (green/amber/red) only on flaps,
brand blue only on actions. Hairline rows, no cards, one elevation (the board).
STORY: visitor sees words fade at different speeds, presses +1 day and
Takrorlash, understands per-word memory; then evidence (measured on real
logs), then the center view; acts: start free / log in.
FIRST VIEWPORT: left, h1 + sub + two actions at the top of a 7-col grid;
right, the live board filling the height; primary action top-left of the fold.
FORM: departures board (assigned roll 3 of 7, key 82dc0ba2, degraded roll).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/

const DAY_TICK_MS = 4200;
const MAX_AUTO_DAYS = 3;

// Synthetic demo curve: a word's recall fades as e^(-days/stability), and a
// review makes that word's stability grow. Illustration only (labelled sample
// data in the UI); the real predictor lives in packages/memory-engine.
const recallPercent = (item, day) => Math.min(99, Math.max(1, Math.round(100 * Math.exp(-(day - item.lastDay) / item.stability))));
const statusOf = (pct) => (pct >= 85 ? 'good' : pct >= 70 ? 'soon' : 'due');

function initialItems() {
  return WORDS.map((w) => ({ ...w, lastDay: -w.elapsed }));
}

function Brand() {
  return (
    <Link to="/" className="lp-brand" aria-label="VOCABRY">
      <img src="/logo.png" alt="" width="34" height="34" />
      <span>VOCABRY</span>
      <BetaBadge />
    </Link>
  );
}

/** A row of split-flap tiles. A tile whose character changes remounts, which replays its flip. */
function Flap({ text, tone = 'light', min = 0 }) {
  const padded = text.padEnd(min, ' ');
  return (
    <span className={`lp-flap lp-flap--${tone}`} aria-hidden="true">
      {[...padded].map((ch, i) => (
        <span key={`${i}-${ch}`} className="lp-flap-tile" style={{ '--i': i }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}

function ReviewBoard({ t }) {
  const reduce = useReducedMotion();
  const [items, setItems] = useState(initialItems);
  const [day, setDay] = useState(0);
  const [auto, setAuto] = useState(true);
  const autoDays = useRef(0);

  useEffect(() => {
    if (!auto || reduce) return undefined;
    const id = setInterval(() => {
      autoDays.current += 1;
      setDay((d) => d + 1);
      if (autoDays.current >= MAX_AUTO_DAYS) setAuto(false);
    }, DAY_TICK_MS);
    return () => clearInterval(id);
  }, [auto, reduce]);

  const advance = useCallback(() => {
    setAuto(false);
    setDay((d) => d + 1);
  }, []);

  const reset = useCallback(() => {
    autoDays.current = 0;
    setItems(initialItems());
    setDay(0);
    setAuto(!reduce);
  }, [reduce]);

  const review = useCallback((id) => {
    setAuto(false);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, lastDay: day, stability: it.stability * 1.7 } : it)));
  }, [day]);

  return (
    <section className="lp-board" role="group" aria-label={t.board.aria}>
      <header className="lp-board-head">
        <h2 className="lp-board-title">{t.board.title}</h2>
        <span className="lp-board-sample">{t.board.sample}</span>
        <span className="lp-board-clock">
          <span className="lp-board-clock-label">{t.board.day}</span>
          <Flap text={String(day)} tone="amber" min={2} />
        </span>
      </header>

      <div className="lp-board-cols" aria-hidden="true">
        <span>{t.board.cols.word}</span>
        <span>{t.board.cols.recall}</span>
        <span>{t.board.cols.status}</span>
        <span />
      </div>

      <ul className="lp-board-rows">
        {items.map((it) => {
          const pct = recallPercent(it, day);
          const status = statusOf(pct);
          const label = t.board.status[status];
          return (
            <li key={it.id} className="lp-board-row">
              <span className="lp-board-word">
                <span className="lp-board-en">{it.word}</span>
                <span className="lp-board-uz">{it.uz}</span>
              </span>
              <span className="lp-board-pct">
                <Flap text={`${pct}%`} min={3} />
                <span className="lp-sr">{pct}%</span>
              </span>
              <span className={`lp-board-status lp-board-status--${status}`}>
                <Flap text={label} tone={status} />
                <span className="lp-sr">{label}</span>
              </span>
              <span className="lp-board-act">
                {status !== 'good' && (
                  <button type="button" className="lp-board-btn" onClick={() => review(it.id)}>
                    <RotateCcw size={14} strokeWidth={2.4} aria-hidden="true" />
                    {t.board.review}
                  </button>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <footer className="lp-board-foot">
        <p>{t.board.foot}</p>
        <div className="lp-board-controls">
          <button type="button" className="lp-board-ctrl" onClick={advance}>
            <FastForward size={15} strokeWidth={2.4} aria-hidden="true" />
            {t.board.advance}
          </button>
          <button type="button" className="lp-board-ctrl lp-board-ctrl--quiet" onClick={reset}>
            {t.board.reset}
          </button>
        </div>
      </footer>
    </section>
  );
}

function GroupBoard({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const g = t.centers.board;
  const tone = { done: 'good', none: 'soon', quiet: 'due' };

  return (
    <section ref={ref} className="lp-board lp-board--group" role="group" aria-label={g.aria}>
      <header className="lp-board-head">
        <h3 className="lp-board-title">{g.title}</h3>
        <span className="lp-board-sample">{t.board.sample}</span>
      </header>
      <div className="lp-board-cols lp-board-cols--group" aria-hidden="true">
        <span>{g.cols.student}</span>
        <span>{g.cols.today}</span>
        <span>{g.cols.status}</span>
      </div>
      <ul className="lp-board-rows">
        {GROUP_ROWS.map((r) => (
          <li key={r.name} className="lp-board-row lp-board-row--group">
            <span className="lp-board-word">
              <span className="lp-board-en">{r.name}</span>
            </span>
            <span className="lp-board-pct">
              {inView ? <Flap text={r.today} min={2} /> : <Flap text="" min={2} />}
              <span className="lp-sr">{r.today}</span>
            </span>
            <span className={`lp-board-status lp-board-status--${tone[r.status]}`}>
              {inView ? <Flap text={g.status[r.status]} tone={tone[r.status]} /> : <Flap text="" tone={tone[r.status]} />}
              <span className="lp-sr">{g.status[r.status]}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EvidenceBars({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const fmt = (n) => n.toFixed(2).replace('.', t.decimal);
  const bars = [
    { key: 'base', label: t.evidence.baseline, value: EVIDENCE.baselineAuc },
    { key: 'model', label: t.evidence.model, value: EVIDENCE.auc },
  ];
  return (
    <div ref={ref} className="lp-bars">
      {bars.map((b) => (
        <div key={b.key} className="lp-bar-row">
          <div className="lp-bar-label">
            <span>{b.label}</span>
            <strong className="lp-bar-value">{fmt(b.value)}</strong>
          </div>
          <div className="lp-bar-track">
            <span
              className={`lp-bar-fill lp-bar-fill--${b.key} ${inView ? 'is-in' : ''}`}
              style={{ '--w': `${b.value * 100}%` }}
            />
          </div>
        </div>
      ))}
      <p className="lp-bars-axis">{t.evidence.axis}</p>
    </div>
  );
}

export default function LandingPage() {
  const t = CONTENT.en;
  const reduce = useReducedMotion();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="lp-page">
      <header className="lp-nav">
        <Brand />
        <nav className="lp-nav-links" aria-label="Main">
          <a href="#how" onClick={scrollTo('how')}>{t.nav.how}</a>
          <a href="#evidence" onClick={scrollTo('evidence')}>{t.nav.evidence}</a>
          <a href="#centers" onClick={scrollTo('centers')}>{t.nav.centers}</a>
          <a href="#faq" onClick={scrollTo('faq')}>{t.nav.faq}</a>
          <a href="/blog" target="_blank" rel="noopener noreferrer" className="lp-nav-ext">
            {t.nav.blog}<ArrowUpRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </a>
        </nav>
        <div className="lp-nav-end">
          <Link to="/login" className="lp-nav-login">{t.nav.login}</Link>
          <Link to="/register" className="lp-btn lp-btn--sm">{t.nav.start}</Link>
        </div>
      </header>

      <main>
        {/* ---------- Hero: copy + the live board ---------- */}
        <section className="lp-hero">
          <div className="lp-hero-copy">
            <h1>{t.hero.title}</h1>
            <p className="lp-hero-sub">{t.hero.sub}</p>
            <div className="lp-hero-ctas">
              <Link to="/register" className="lp-btn">
                {t.hero.primary}
                <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
              </Link>
              <a href="#centers" onClick={scrollTo('centers')} className="lp-link">{t.hero.secondary}</a>
            </div>
            <p className="lp-hero-note">{t.hero.note}</p>
          </div>
          <ReviewBoard t={t} />
        </section>

        {/* ---------- Mechanism ---------- */}
        <section className="lp-section lp-how" id="how">
          <div className="lp-section-head">
            <h2>{t.how.title}</h2>
            <p>{t.how.lead}</p>
          </div>
          <ol className="lp-steps">
            {t.how.steps.map((s) => (
              <li key={s.name} className="lp-step">
                <span className="lp-step-name">{s.name}</span>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Evidence ---------- */}
        <section className="lp-evidence" id="evidence">
          <div className="lp-evidence-inner">
            <div className="lp-section-head lp-section-head--light">
              <h2>{t.evidence.title}</h2>
              <p>{t.evidence.lead}</p>
              <ul className="lp-facts">
                {t.evidence.facts.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <p className="lp-caveat">{t.evidence.caveat}</p>
              <a className="lp-more" href={EVIDENCE_POST} target="_blank" rel="noopener noreferrer">
                {t.evidence.more}<ArrowUpRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </a>
            </div>
            <EvidenceBars t={t} />
          </div>
        </section>

        {/* ---------- Centers ---------- */}
        <section className="lp-section lp-centers" id="centers">
          <div className="lp-centers-copy">
            <h2>{t.centers.title}</h2>
            <ul className="lp-points">
              {t.centers.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="lp-hero-ctas">
              <Link to="/start-center" className="lp-btn">
                {t.centers.cta}
                <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>
            <p className="lp-hero-note">{t.centers.note}</p>
          </div>
          <GroupBoard t={t} />
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="lp-section lp-faq" id="faq">
          <div className="lp-section-head">
            <h2>{t.faq.title}</h2>
          </div>
          <div className="lp-faq-list">
            {t.faq.items.map((item) => (
              <details key={item.q} className="lp-faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- Close ---------- */}
        <section className="lp-close">
          <h2>{t.close.title}</h2>
          <Link to="/register" className="lp-btn lp-btn--lg">
            {t.close.cta}
            <ArrowRight size={20} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </section>
      </main>

      <footer className="lp-footer">
        <Brand />
        <div className="lp-footer-links">
          <Link to="/login">{t.footer.login}</Link>
          <Link to="/register">{t.footer.start}</Link>
          <a href="/blog" target="_blank" rel="noopener noreferrer">{t.nav.blog}</a>
        </div>
        <span className="lp-footer-copy">&copy; {new Date().getFullYear()} VOCABRY &middot; {t.footer.beta} {APP_VERSION_LABEL}</span>
      </footer>
    </div>
  );
}
