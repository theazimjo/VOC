// Animated blog figures. They start when they scroll into view, and the ones in a
// post have a "Replay" button. With "reduce motion" they show their final state.
//
// The numbers are not made up: they come from running the real engine
// (packages/memory-engine) on the two learners of the post "two-learners-one-word",
// Max and Chloe. Change a number here and re-run the engine before touching the text.

import { useEffect, useRef, useState } from 'react';

const PAPER = '#f4f1e8';
const DIM = 'rgba(244, 241, 232, 0.55)';
const FAINT = 'rgba(244, 241, 232, 0.12)';
const AMBER = '#ffb020';
const BLUE = '#7fb2ff';
const GOOD = '#3ddc84';
const DUE = '#ff6b5e';
const SILVER = '#b9bcc4';
const CARD = '#1a1c20';

const W = 800;
const H = 450;

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// ── plumbing ─────────────────────────────────────────────────────────────────

/** Starts when the figure is first seen; `visible` follows it on and off screen; `replay()` runs it again. */
function useStage() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); setVisible(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setShown(true);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const replay = () => {
    setShown(false);
    requestAnimationFrame(() => requestAnimationFrame(() => { setShown(true); setRun((r) => r + 1); }));
  };
  return { ref, shown, visible, run, replay };
}

/** 0 → 1 over `ms` once the figure is shown (and again after Replay). */
function useTimeline(stage, ms) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!stage.shown) { setT(0); return undefined; }
    if (reducedMotion()) { setT(1); return undefined; }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      setT(k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage.shown, stage.run, ms]);
  return t;
}

/** 0 → 1, again and again, while the figure is on screen. */
function useLoop(stage, ms) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!stage.shown || !stage.visible || reducedMotion()) return undefined;
    let raf;
    const t0 = performance.now();
    const tick = (now) => { setT(((now - t0) / ms) % 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage.shown, stage.visible, ms]);
  return t;
}

function Frame({ stage, alt, replay, children }) {
  return (
    <div className="bl-anim-box">
      <svg ref={stage.ref} className={`bl-ill bl-anim${stage.shown ? ' is-shown' : ''}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt} preserveAspectRatio="xMidYMid meet">
        <rect width={W} height={H} rx="22" fill="#101113" />
        {children}
      </svg>
      {replay && stage.shown && <button type="button" className="bl-replay" onClick={stage.replay}>↻ Replay</button>}
    </div>
  );
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const ease = (x) => 1 - (1 - x) * (1 - x);
const path = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
const delay = (s) => ({ '--delay': `${s.toFixed(2)}s` });

// ── 1. The whole idea in one loop ────────────────────────────────────────────
const LOOP_NODES = [
  { title: 'You answer a word', sub: 'tap it, type it, say it', color: AMBER },
  { title: 'VOC updates one number', sub: 'how long this word lasts for you', color: GOOD },
  { title: 'It picks the next date', sub: 'when you would be at 75 %', color: BLUE },
  { title: 'The word waits…', sub: 'and comes back just in time', color: DUE },
];

function Loop({ replay }) {
  const stage = useStage();
  const t = useLoop(stage, 9000);
  const cx = 400;
  const cy = 226;
  const rx = 262;
  const ry = 150;
  const angle = -Math.PI / 2 + t * Math.PI * 2;
  const tx = cx + rx * Math.cos(angle);
  const ty = cy + ry * Math.sin(angle);
  // the card the token has most recently reached
  const active = reducedMotion() ? -1 : Math.floor(((t + 0.125) % 1) * 4);
  return (
    <Frame stage={stage} replay={replay} alt="The loop VOC runs for every word and every person: you answer, VOC updates one number for that word, it picks the next date when you would be at 75 percent, the word waits and comes back just in time">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={FAINT} strokeWidth="3" strokeDasharray="4 10" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill={PAPER} fontSize="21" fontWeight="700">One loop</text>
      <text x={cx} y={cy + 20} textAnchor="middle" fill={DIM} fontSize="15">for every word, for every person</text>
      {LOOP_NODES.map((n, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 2;
        const x = cx + rx * Math.cos(a);
        const y = cy + ry * Math.sin(a);
        const on = i === active;
        return (
          <g key={n.title} className="fade" style={delay(0.2 + i * 0.25)}>
            <rect x={x - 118} y={y - 33} width="236" height="66" rx="14" fill={CARD} stroke={n.color} strokeWidth={on ? 3.5 : 1.5} opacity={on || active < 0 ? 1 : 0.7} />
            <circle cx={x - 94} cy={y} r="13" fill={n.color} />
            <text x={x - 94} y={y + 5} textAnchor="middle" fill="#101113" fontSize="15" fontWeight="800">{i + 1}</text>
            <text x={x - 72} y={y - 4} fill={PAPER} fontSize="15.5" fontWeight="700">{n.title}</text>
            <text x={x - 72} y={y + 17} fill={DIM} fontSize="12.5">{n.sub}</text>
          </g>
        );
      })}
      {active >= 0 && (
        <g>
          <circle cx={tx} cy={ty} r="9" fill={AMBER} />
          <circle cx={tx} cy={ty} r="17" fill="none" stroke={AMBER} strokeWidth="2" opacity="0.4" />
        </g>
      )}
    </Frame>
  );
}

// ── 2. The same word fades at two different speeds ───────────────────────────
const WORD = 'reluctant';
const FADERS = [
  { name: 'Max', note: 'a new word lasts about 5 days', S: 5, color: AMBER, y: 150 },
  { name: 'Chloe', note: 'about 3 days', S: 3, color: BLUE, y: 300 },
];
const DAYS_SHOWN = 7;

function Fading({ replay }) {
  const stage = useStage();
  const t = useTimeline(stage, 7000);
  const day = ease(t) * DAYS_SHOWN;
  return (
    <Frame stage={stage} replay={replay} alt="The same word, reluctant, fading from memory over seven days: after five days about 37 percent is left for Max and 19 percent for Chloe">
      <text x="40" y="46" fill={PAPER} fontSize="20" fontWeight="700">The same word, two memories</text>
      {FADERS.map((f) => {
        const recall = Math.exp(-day / f.S);
        const due = recall <= 0.75;
        return (
          <g key={f.name}>
            <text x="40" y={f.y - 52} fill={f.color} fontSize="16" fontWeight="700">{f.name}<tspan fill={DIM} fontWeight="400" fontSize="13.5">  ·  {f.note}</tspan></text>
            <text x="40" y={f.y + 16} fontSize="58" fontWeight="700" fontFamily="Georgia, 'Times New Roman', serif">
              {WORD.split('').map((ch, i) => {
                // every letter has its own point at which it starts to go
                const th = 0.12 + (((i * 5) % WORD.length) / WORD.length) * 0.75;
                const o = clamp01((recall - th) / 0.12 + 0.08);
                return <tspan key={`${ch}${i}`} fill={PAPER} opacity={o}>{ch}</tspan>;
              })}
            </text>
            <text x="760" y={f.y + 10} textAnchor="end" fill={f.color} fontSize="46" fontWeight="800">{Math.round(recall * 100)}%</text>
            <rect x="40" y={f.y + 38} width="720" height="10" rx="5" fill={FAINT} />
            <rect x="40" y={f.y + 38} width={720 * recall} height="10" rx="5" fill={f.color} />
            <line x1={40 + 720 * 0.75} x2={40 + 720 * 0.75} y1={f.y + 32} y2={f.y + 54} stroke={DUE} strokeWidth="2" />
            {due && (
              <g>
                <rect x={40 + 720 * 0.75 - 46} y={f.y + 58} width="92" height="24" rx="12" fill={DUE} />
                <text x={40 + 720 * 0.75} y={f.y + 75} textAnchor="middle" fill="#101113" fontSize="13" fontWeight="800">due now</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="760" y="424" textAnchor="end" fill={PAPER} fontSize="22" fontWeight="700">day {day.toFixed(1)}</text>
      <text x="40" y="424" fill={DIM} fontSize="13.5">red line = 75 %: the moment VOC brings the word back</text>
    </Frame>
  );
}

// ── 3. Their schedules, side by side ─────────────────────────────────────────
const AXIS_DAYS = 34;
const LANES = [
  {
    name: 'Max', note: 'a new word lasts about 5 days', color: AMBER, top: 100, base: 206,
    stability: [5, 10.87, 12.6, 28.91, 53.53, 95.01],
    reviews: [{ day: 1.4 }, { day: 4.6 }, { day: 8.2 }, { day: 16.5 }, { day: 31.9 }],
  },
  {
    name: 'Chloe', note: 'about 3 days', color: BLUE, top: 280, base: 380,
    stability: [3, 4.72, 2.36, 4.39, 8.27, 14.56, 26.25],
    reviews: [{ day: 0.9 }, { day: 2.2, miss: true }, { day: 2.9 }, { day: 4.2 }, { day: 6.5 }, { day: 10.7 }],
  },
];

function TwoLearners({ replay }) {
  const stage = useStage();
  const x0 = 70;
  const x1 = 762;
  const X = (d) => x0 + (d / AXIS_DAYS) * (x1 - x0);
  const DRAW_SECONDS = 4.2;

  const lanes = LANES.map((lane) => {
    const Y = (p) => lane.base - p * (lane.base - lane.top);
    const labelled = { x: -99 };
    const starts = [0, ...lane.reviews.map((r) => r.day)];
    const pts = [];
    starts.forEach((d0, i) => {
      const S = lane.stability[i];
      const dEnd = i < lane.reviews.length ? lane.reviews[i].day : d0 + -S * Math.log(0.75);
      const stop = Math.min(dEnd, AXIS_DAYS);
      for (let d = d0; d <= stop + 1e-6; d += 0.1) pts.push([X(d), Y(Math.exp(-(d - d0) / S))]);
      if (i < lane.reviews.length && dEnd <= AXIS_DAYS) pts.push([X(dEnd), Y(1)]);
    });
    return { lane, Y, labelled, d: path(pts), end: Math.min(starts[starts.length - 1] + -lane.stability[starts.length - 1] * Math.log(0.75), AXIS_DAYS) };
  });

  return (
    <Frame stage={stage} replay={replay} alt="Max and Chloe with the same word: Max's reviews spread out quickly (days 1.4, 4.6, 8.2, 16.5, 31.9); Chloe's come back sooner and more often (days 0.9, 2.2 with a miss, 2.9, 4.2, 6.5, 10.7)">
      {lanes.map(({ lane, Y, labelled, d, end }) => (
        <g key={lane.name}>
          <text x={x0} y={lane.top - 48} fill={lane.color} fontSize="17" fontWeight="700">{lane.name}<tspan fill={DIM} fontWeight="400" fontSize="14">  ·  {lane.note}</tspan></text>
          {[0, 0.5, 1].map((p) => <line key={p} x1={x0} x2={x1} y1={Y(p)} y2={Y(p)} stroke={FAINT} strokeWidth="1" />)}
          <line x1={x0} x2={x1} y1={Y(0.75)} y2={Y(0.75)} stroke={DUE} strokeWidth="1.2" strokeDasharray="5 6" opacity="0.7" />
          <path className="draw" pathLength="1" d={d} fill="none" stroke={lane.color} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"
            style={{ '--delay': '0.2s', '--dur': `${((end / AXIS_DAYS) * DRAW_SECONDS + 0.4).toFixed(2)}s` }} />
          {lane.reviews.map((r) => {
            const cx = X(r.day);
            const when = 0.2 + (r.day / AXIS_DAYS) * DRAW_SECONDS;
            const showDay = !r.miss && cx - labelled.x >= 48;
            if (showDay) labelled.x = cx;
            return (
              <g key={r.day} className="pop" style={delay(when)}>
                {r.miss ? (
                  <g stroke={DUE} strokeWidth="3.2" strokeLinecap="round">
                    <line x1={cx - 6} y1={Y(1) - 6} x2={cx + 6} y2={Y(1) + 6} />
                    <line x1={cx + 6} y1={Y(1) - 6} x2={cx - 6} y2={Y(1) + 6} />
                  </g>
                ) : (
                  <circle cx={cx} cy={Y(1)} r="6" fill="#101113" stroke={lane.color} strokeWidth="3" />
                )}
                {r.miss && <text x={cx} y={Y(1) - 30} textAnchor="middle" fill={DUE} fontSize="12.5" fontWeight="700">missed</text>}
                {showDay && <text x={cx} y={Y(1) - 13} textAnchor="middle" fill={PAPER} fontSize="12.5">day {r.day}</text>}
              </g>
            );
          })}
        </g>
      ))}
      <line x1={x0} x2={x1} y1="396" y2="396" stroke={DIM} strokeWidth="1.5" />
      {[0, 5, 10, 15, 20, 25, 30].map((d) => (
        <g key={d}>
          <line x1={X(d)} x2={X(d)} y1="396" y2="402" stroke={DIM} strokeWidth="1.5" />
          <text x={X(d)} y="420" textAnchor="middle" fill={DIM} fontSize="13">{d}</text>
        </g>
      ))}
      <text x={x1} y="438" textAnchor="end" fill={DIM} fontSize="13">days →</text>
      <text x={x0 + 4} y="438" fill={DUE} fontSize="12.5">dashed line = 75 %, the moment VOC brings the word back</text>
    </Frame>
  );
}

// ── 4. The stopwatch: speed is read as confidence ────────────────────────────
const ZONES = [
  { from: 0, to: 2.5, color: GOOD, label: 'under 2.5 s', worth: '+0.60', note: 'full confidence + speed bonus' },
  { from: 2.5, to: 5, color: '#a7e05a', label: '2.5 – 5 s', worth: '+0.20', note: 'quite sure' },
  { from: 5, to: 8, color: AMBER, label: '5 – 8 s', worth: '0.00', note: 'hesitated' },
  { from: 8, to: 10, color: DUE, label: 'over 8 s', worth: '−0.30', note: 'a struggle' },
];

function Stopwatch({ replay }) {
  const stage = useStage();
  const t = useTimeline(stage, 6500);
  const seconds = ease(t) * 10;
  const gx = 250;
  const gy = 310;
  const gr = 170;
  const ang = (s) => Math.PI + (s / 10) * Math.PI; // 0 s on the left, 10 s on the right, over the top
  const pt = (s, r) => [gx + r * Math.cos(ang(s)), gy + r * Math.sin(ang(s))];
  const arc = (a, b, r) => {
    const [x1, y1] = pt(a, r);
    const [x2, y2] = pt(b, r);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };
  const zone = ZONES.find((z) => seconds >= z.from && seconds < z.to) || ZONES[3];
  const [nx, ny] = pt(seconds, gr - 28);
  return (
    <Frame stage={stage} replay={replay} alt="VOC reads confidence from how fast you answer: under 2.5 seconds is worth +0.60 to the word's growth, 2.5 to 5 seconds +0.20, 5 to 8 seconds nothing, over 8 seconds minus 0.30">
      <text x="40" y="46" fill={PAPER} fontSize="20" fontWeight="700">VOC never asks &ldquo;how sure were you?&rdquo;</text>
      <text x="40" y="72" fill={DIM} fontSize="14.5">It times your answer instead.</text>
      {ZONES.map((z) => <path key={z.label} d={arc(z.from + 0.04, z.to - 0.04, gr)} fill="none" stroke={z.color} strokeWidth="24" strokeLinecap="butt" opacity={zone === z ? 1 : 0.35} />)}
      {[0, 2.5, 5, 8, 10].map((s) => {
        const [lx, ly] = pt(s, gr + 24);
        return <text key={s} x={lx} y={ly + 4} textAnchor="middle" fill={DIM} fontSize="13">{s}s</text>;
      })}
      <line x1={gx} y1={gy} x2={nx} y2={ny} stroke={PAPER} strokeWidth="5" strokeLinecap="round" />
      <circle cx={gx} cy={gy} r="12" fill={PAPER} />
      <text x={gx} y={gy - 62} textAnchor="middle" fill={PAPER} fontSize="40" fontWeight="800">{seconds.toFixed(1)}s</text>
      <text x={gx} y={gy + 44} textAnchor="middle" fill={zone.color} fontSize="24" fontWeight="800">{zone.worth}</text>
      <text x={gx} y={gy + 66} textAnchor="middle" fill={DIM} fontSize="14">{zone.note}</text>
      <g transform="translate(530 120)">
        <text x="0" y="0" fill={DIM} fontSize="13" letterSpacing="1">YOUR ANSWER TIME</text>
        <text x="236" y="0" textAnchor="end" fill={DIM} fontSize="13" letterSpacing="1">GROWTH</text>
        {ZONES.map((z, i) => (
          <g key={z.label} opacity={zone === z ? 1 : 0.5}>
            <rect x="-12" y={18 + i * 54} width="260" height="44" rx="10" fill={CARD} stroke={z === zone ? z.color : 'none'} strokeWidth="2" />
            <circle cx="6" cy={40 + i * 54} r="7" fill={z.color} />
            <text x="24" y={45 + i * 54} fill={PAPER} fontSize="15.5">{z.label}</text>
            <text x="236" y={46 + i * 54} textAnchor="end" fill={z.color} fontSize="18" fontWeight="800">{z.worth}</text>
          </g>
        ))}
      </g>
      <text x="40" y="430" fill={DIM} fontSize="13">A wrong answer counts as confidence 1, whatever the time.</text>
    </Frame>
  );
}

// ── 5. What one answer is worth ──────────────────────────────────────────────
const GROWTH_ROWS = [
  { label: 'Starting point', v: 0.35, color: SILVER },
  { label: 'Said it with full confidence', v: 0.4, color: GOOD },
  { label: 'Answered in under 2.5 seconds', v: 0.2, color: GOOD },
  { label: 'Slept between the two reviews', v: 0.15, color: GOOD },
  { label: 'The word was already fading', v: 0.075, color: GOOD },
  { label: 'Typed it instead of tapping', v: 0.15, color: AMBER, ghost: true },
];

function Growth({ replay }) {
  const stage = useStage();
  const barX = 372;
  const unit = 740; // px per 1.0
  const rowY = (i) => 74 + i * 46;
  const total = GROWTH_ROWS.filter((r) => !r.ghost).reduce((s, r) => s + r.v, 0);
  const step = 0.42;

  return (
    <Frame stage={stage} replay={replay} alt="One correct answer: the starting point 0.35, plus 0.40 for confidence, 0.20 for a fast answer, 0.15 for sleep, 0.075 because the word was fading; total 1.18, so 5 days become 10.9 days">
      <text x="40" y="40" fill={PAPER} fontSize="19" fontWeight="700">Max&apos;s first review of the word</text>
      {GROWTH_ROWS.map((r, i) => {
        const w = r.v * unit;
        const when = 0.3 + i * step;
        return (
          <g key={r.label}>
            <text className="fade" style={delay(when)} x="40" y={rowY(i) + 24} fill={r.ghost ? DIM : PAPER} fontSize="15">{r.label}</text>
            <rect className="grow" style={delay(when)} x={barX} y={rowY(i)} width={w} height="32" rx="7" fill={r.ghost ? 'none' : r.color} stroke={r.ghost ? r.color : 'none'} strokeWidth="2" strokeDasharray={r.ghost ? '6 6' : undefined} opacity={r.ghost ? 0.8 : 1} />
            <text className="fade" style={delay(when + 0.35)} x={barX + w + 10} y={rowY(i) + 22} fill={r.ghost ? AMBER : PAPER} fontSize="15" fontWeight="700">{r.ghost ? `+${r.v.toFixed(2)} more` : (i === 0 ? r.v.toFixed(2) : `+${r.v.toFixed(r.v < 0.1 ? 3 : 2)}`)}</text>
          </g>
        );
      })}
      <line className="fade" style={delay(0.3 + GROWTH_ROWS.length * step)} x1="40" x2="760" y1={rowY(GROWTH_ROWS.length) + 2} y2={rowY(GROWTH_ROWS.length) + 2} stroke={FAINT} strokeWidth="1.5" />
      <g className="fade" style={delay(0.5 + GROWTH_ROWS.length * step)}>
        <text x="40" y={rowY(GROWTH_ROWS.length) + 42} fill={PAPER} fontSize="17">The word&apos;s memory grows by</text>
        <text x="330" y={rowY(GROWTH_ROWS.length) + 42} fill={GOOD} fontSize="26" fontWeight="800">×{(1 + total + 1e-9).toFixed(2)}</text>
        <text x="460" y={rowY(GROWTH_ROWS.length) + 42} fill={DIM} fontSize="17">5 days</text>
        <text x="528" y={rowY(GROWTH_ROWS.length) + 42} fill={DIM} fontSize="17">→</text>
        <text x="556" y={rowY(GROWTH_ROWS.length) + 42} fill={AMBER} fontSize="26" fontWeight="800">10.9 days</text>
      </g>
    </Frame>
  );
}

// ── 6. Easy word, hard word ──────────────────────────────────────────────────
const DIFF = [
  { name: 'table', note: 'easy for you', color: GOOD, S: [2.2, 5.0, 12.2, 28.1, 54.6] },
  { name: 'reluctant', note: 'hard for you', color: DUE, S: [1.8, 3.3, 5.9, 11.4, 21.5] },
];

function Difficulty({ replay }) {
  const stage = useStage();
  const base = 360;
  const maxH = 210;
  return (
    <Frame stage={stage} replay={replay} alt="The same five fast, correct answers: an easy word reaches 54.6 days, a hard word only 21.5 days">
      <text x="40" y="44" fill={PAPER} fontSize="20" fontWeight="700">The same five fast, correct answers</text>
      {DIFF.map((d, k) => {
        const ox = 40 + k * 380;
        return (
          <g key={d.name}>
            <text x={ox} y="88" fill={d.color} fontSize="19" fontWeight="800">{d.name}<tspan fill={DIM} fontWeight="400" fontSize="14">  ·  {d.note}</tspan></text>
            <line x1={ox} x2={ox + 340} y1={base} y2={base} stroke={DIM} strokeWidth="1.5" />
            {d.S.map((s, i) => {
              const h = (s / 60) * maxH;
              const x = ox + 12 + i * 66;
              const when = 0.3 + i * 0.5;
              return (
                <g key={s}>
                  <rect className="rise" style={delay(when)} x={x} y={base - h} width="44" height={h} rx="6" fill={d.color} opacity="0.9" />
                  <text className="fade" style={delay(when + 0.4)} x={x + 22} y={base - h - 8} textAnchor="middle" fill={PAPER} fontSize="14" fontWeight="700">{s}</text>
                  <text x={x + 22} y={base + 20} textAnchor="middle" fill={DIM} fontSize="12.5">#{i + 1}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      <text x="40" y="420" fill={DIM} fontSize="13.5">Days the word lasts after each review. The only difference: how hard it has been for this person.</text>
    </Frame>
  );
}

// ── 7. Topic groups (what "context" means) ───────────────────────────────────
const GROUPS = [
  { name: 'Food', mult: '×1.4', note: ['remembered better', 'than expected'], color: GOOD, up: true },
  { name: 'Family', mult: '×1.2', note: ['a bit better'], color: GOOD, up: true },
  { name: 'Health', mult: '×1.0', note: ['as expected'], color: SILVER },
  { name: 'Travel', mult: '×0.7', note: ['worse than expected'], color: DUE, down: true },
  { name: 'Money', mult: '×0.9', note: ['a bit worse'], color: DUE, down: true },
  { name: 'Verbs', mult: '?', note: ['fewer than 5 reviews,', 'too early to tell'], color: DIM, dashed: true },
];

function Groups({ replay }) {
  const stage = useStage();
  return (
    <Frame stage={stage} replay={replay} alt="VOC sorts words into topic groups and compares what it expected with what happened: Max remembers Food better than expected so those words grow 1.4 times faster, Travel worse so 0.7 times; a group with fewer than five reviews is left alone">
      <text x="40" y="44" fill={PAPER} fontSize="20" fontWeight="700">Max&apos;s topic groups</text>
      <text x="40" y="70" fill={DIM} fontSize="14.5">How fast a word grows is nudged by how that whole group has been going.</text>
      {GROUPS.map((g, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 40 + col * 245;
        const y = 98 + row * 148;
        const when = 0.3 + i * 0.35;
        const tx = g.up || g.down ? x + 50 : x + 18;
        return (
          <g key={g.name} className="pop" style={delay(when)}>
            <rect x={x} y={y} width="228" height="128" rx="16" fill={CARD} stroke={g.color} strokeWidth="2" strokeDasharray={g.dashed ? '6 6' : undefined} />
            <text x={x + 18} y={y + 36} fill={PAPER} fontSize="19" fontWeight="700">{g.name}</text>
            <text x={x + 210} y={y + 42} textAnchor="end" fill={g.color} fontSize="32" fontWeight="800">{g.mult}</text>
            {g.up && <path d={`M${x + 18} ${y + 100} l10 -16 l10 16 z`} fill={g.color} />}
            {g.down && <path d={`M${x + 18} ${y + 84} l10 16 l10 -16 z`} fill={g.color} />}
            {g.note.map((line, k) => <text key={line} x={tx} y={y + 82 + k * 20 + (g.note.length === 1 ? 10 : 0)} fill={DIM} fontSize="13.5">{line}</text>)}
          </g>
        );
      })}
      <text x="40" y="414" fill={DIM} fontSize="13.5">The group is the context, not the sentence. A group needs at least 5 reviews to count.</text>
      <text x="40" y="434" fill={DIM} fontSize="13.5">The nudge never goes below ×0.7 or above ×1.4.</text>
    </Frame>
  );
}

// ── 8. Tapping versus typing ─────────────────────────────────────────────────
const TAP = [10.9, 12.6, 12.6, 12.6, 12.6];
const TYPED = [10.9, 12.6, 28.9, 53.5, 95.0];

function Ceiling({ replay }) {
  const stage = useStage();
  const base = 346;
  const maxH = 210;
  const hOf = (s) => (s / 100) * maxH;
  const colX = (k, i) => 52 + k * 392 + i * 62;
  const cap = base - hOf(12.6);
  return (
    <Frame stage={stage} replay={replay} alt="Five reviews of the same word: if it is only ever tapped, its memory stops at about 12.6 days; once it has been answered correctly by typing and by speaking, in two different exercises, it grows on to 95 days">
      <text x="40" y="44" fill={PAPER} fontSize="20" fontWeight="700">Five reviews of one word: how many days it lasts</text>
      <line x1="40" x2="760" y1={cap} y2={cap} stroke={DUE} strokeWidth="1.6" strokeDasharray="6 6" />
      <text x="52" y={cap - 62} fill={DUE} fontSize="13.5" fontWeight="700">tapping alone stops at the dashed line: 12.6 days</text>
      {[TAP, TYPED].map((series, k) => (
        <g key={k}>
          <text x={colX(k, 0)} y="88" fill={k ? GOOD : SILVER} fontSize="16.5" fontWeight="800">{k ? 'Typed and said aloud' : 'Only tapped'}</text>
          <line x1={colX(k, 0) - 12} x2={colX(k, 4) + 50} y1={base} y2={base} stroke={DIM} strokeWidth="1.5" />
          {series.map((s, i) => {
            const when = 0.3 + i * 0.55;
            const held = k === 0 ? i >= 1 : i === 1;
            return (
              <g key={`${k}-${i}`}>
                <rect className="rise" style={delay(when)} x={colX(k, i)} y={base - hOf(s)} width="46" height={hOf(s)} rx="6" fill={k ? (held ? AMBER : GOOD) : SILVER} opacity="0.92" />
                <text className="fade" style={delay(when + 0.35)} x={colX(k, i) + 23} y={base - hOf(s) - 8} textAnchor="middle" fill={PAPER} fontSize="13.5" fontWeight="700">{s}</text>
                <text x={colX(k, i) + 23} y={base + 20} textAnchor="middle" fill={DIM} fontSize="12.5">#{i + 1}</text>
              </g>
            );
          })}
          {k === 1 && (
            <g className="fade" style={delay(2.2)}>
              <rect x={colX(1, 1) - 4} y="388" width="54" height="24" rx="12" fill={AMBER} />
              <text x={colX(1, 1) + 23} y="405" textAnchor="middle" fill="#101113" fontSize="12.5" fontWeight="800">typed ✓</text>
              <rect x={colX(1, 2) - 4} y="388" width="54" height="24" rx="12" fill={GOOD} />
              <text x={colX(1, 2) + 23} y="405" textAnchor="middle" fill="#101113" fontSize="12.5" fontWeight="800">said ✓</text>
            </g>
          )}
        </g>
      ))}
      <text x="40" y="436" fill={DIM} fontSize="13.5">Two different exercises, each answered correctly, unlock the ceiling.</text>
    </Frame>
  );
}

// ── 9. One press on Practice ─────────────────────────────────────────────────
const FLOW = [
  { n: 1, title: ['Fading words', 'from older topics'], sub: ['come back first'], color: DUE },
  { n: 2, title: ['New words'], sub: ['flashcards,', '5 first, then 3'], color: AMBER },
  { n: 3, title: ['Type what you', 'have seen'], sub: ['spelling'], color: GOOD },
  { n: 4, title: ['Quiz, match,', 'spelling'], sub: ['until it sticks'], color: BLUE },
];

function Flow({ replay }) {
  const stage = useStage();
  const bw = 168;
  const gap = 32;
  const x0 = (W - (FLOW.length * bw + (FLOW.length - 1) * gap)) / 2;
  const y = 120;
  const bh = 176;
  return (
    <Frame stage={stage} replay={replay} alt="A practice session in order: fading words from older topics, new words as flashcards, typing what you have seen, then quiz, match and spelling until the words stick">
      <text className="fade" style={delay(0.1)} x={W / 2} y="58" textAnchor="middle" fill={PAPER} fontSize="21" fontWeight="700">One press on Practice</text>
      {FLOW.map((s, i) => {
        const x = x0 + i * (bw + gap);
        const when = 0.4 + i * 0.7;
        return (
          <g key={s.n}>
            <g className="pop" style={delay(when)}>
              <rect x={x} y={y} width={bw} height={bh} rx="16" fill={CARD} stroke={s.color} strokeWidth="2.5" />
              <circle cx={x + 28} cy={y + 30} r="15" fill={s.color} />
              <text x={x + 28} y={y + 36} textAnchor="middle" fill="#101113" fontSize="17" fontWeight="800">{s.n}</text>
              {s.title.map((line, k) => <text key={line} x={x + 16} y={y + 78 + k * 22} fill={PAPER} fontSize="16.5" fontWeight="700">{line}</text>)}
              {s.sub.map((line, k) => <text key={line} x={x + 16} y={y + 78 + s.title.length * 22 + 8 + k * 19} fill={DIM} fontSize="14.5">{line}</text>)}
            </g>
            {i < FLOW.length - 1 && (
              <path className="draw" pathLength="1" style={{ '--delay': `${(when + 0.35).toFixed(2)}s`, '--dur': '0.5s' }}
                d={`M${x + bw + 6} ${y + bh / 2} L${x + bw + gap - 8} ${y + bh / 2}`} stroke={DIM} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}
          </g>
        );
      })}
      <g className="fade" style={delay(0.4 + FLOW.length * 0.7 + 0.2)}>
        <text x={W / 2} y="352" textAnchor="middle" fill={PAPER} fontSize="16.5">Words you already know well drop out of the session.</text>
        <text x={W / 2} y="380" textAnchor="middle" fill={DIM} fontSize="15">Everything else gets another turn next time you press the button.</text>
      </g>
    </Frame>
  );
}

export const ANIMATED_ILLUSTRATIONS = {
  twolearners: TwoLearners,
  loop: Loop,
  fading: Fading,
  stopwatch: Stopwatch,
  growth: Growth,
  difficulty: Difficulty,
  groups: Groups,
  ceiling: Ceiling,
  flow: Flow,
};
