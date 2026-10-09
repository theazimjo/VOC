// Animated blog figures. They play once, when they scroll into view (see the
// .bl-anim rules in Blog.css; with "reduce motion" they simply show the end state).
// The numbers are not made up: they come from running the real engine
// (packages/memory-engine) on the two learners described in the post
// "two-learners-one-word"; change one and re-run it before touching the other.

import { useEffect, useRef, useState } from 'react';

const PAPER = '#f4f1e8';
const DIM = 'rgba(244, 241, 232, 0.55)';
const FAINT = 'rgba(244, 241, 232, 0.12)';
const AMBER = '#ffb020';
const BLUE = '#7fb2ff';
const GOOD = '#3ddc84';
const DUE = '#ff6b5e';
const SILVER = '#b9bcc4';

const W = 800;
const H = 450;

function useInView() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return undefined; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Stage({ alt, children }) {
  const [ref, shown] = useInView();
  return (
    <svg ref={ref} className={`bl-ill bl-anim${shown ? ' is-shown' : ''}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt} preserveAspectRatio="xMidYMid meet">
      <rect width={W} height={H} rx="22" fill="#101113" />
      {children}
    </svg>
  );
}

const path = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
const delay = (s) => ({ '--delay': `${s.toFixed(2)}s` });

// ── Two learners, one word ───────────────────────────────────────────────────
// Each lane: the recall curve of one word. It falls until the chance of
// remembering reaches 75 %, the word comes back, and every answer moves the
// next gap. Stability S (days) before each review, and the day of each review:
const AXIS_DAYS = 34;
const LANES = [
  {
    name: 'Dilnoza', note: 'a new word lasts her about 5 days', color: AMBER, top: 100, base: 206,
    stability: [5, 10.87, 12.6, 28.91, 53.53, 95.01],
    reviews: [{ day: 1.4 }, { day: 4.6 }, { day: 8.2 }, { day: 16.5 }, { day: 31.9 }],
  },
  {
    name: 'Jasur', note: 'about 3 days for him', color: BLUE, top: 280, base: 380,
    stability: [3, 4.72, 2.36, 4.39, 8.27, 14.56, 26.25],
    reviews: [{ day: 0.9 }, { day: 2.2, miss: true }, { day: 2.9 }, { day: 4.2 }, { day: 6.5 }, { day: 10.7 }],
  },
];

function TwoLearners() {
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
    <Stage alt="Two learners and the same word: Dilnoza's reviews spread out quickly (days 1.4, 4.6, 8.2, 16.5, 31.9); Jasur's come back sooner and more often (days 0.9, 2.2 with a miss, 2.9, 4.2, 6.5, 10.7)">
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
    </Stage>
  );
}

// ── What makes one correct answer count for more ─────────────────────────────
const GROWTH_ROWS = [
  { label: 'Starting point', v: 0.35, color: SILVER },
  { label: 'Said it with full confidence', v: 0.4, color: GOOD },
  { label: 'Answered in under 2.5 seconds', v: 0.2, color: GOOD },
  { label: 'Slept between the two reviews', v: 0.15, color: GOOD },
  { label: 'The word was already fading', v: 0.075, color: GOOD },
  { label: 'Typed it instead of tapping', v: 0.15, color: AMBER, ghost: true },
];

function Growth() {
  const barX = 372;
  const unit = 740; // px per 1.0
  const rowY = (i) => 74 + i * 46;
  const total = GROWTH_ROWS.filter((r) => !r.ghost).reduce((s, r) => s + r.v, 0);
  const step = 0.42;

  return (
    <Stage alt="One correct answer: the starting point 0.35, plus 0.40 for confidence, 0.20 for a fast answer, 0.15 for sleep, 0.075 because the word was fading; total 1.18, so 5 days become 10.9 days">
      <text x="40" y="40" fill={PAPER} fontSize="19" fontWeight="700">Dilnoza&apos;s first review of the word</text>
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
    </Stage>
  );
}

// ── What a session looks like ────────────────────────────────────────────────
const FLOW = [
  { n: 1, title: ['Fading words', 'from older topics'], sub: ['come back first'], color: DUE },
  { n: 2, title: ['New words'], sub: ['flashcards,', '5 first, then 3'], color: AMBER },
  { n: 3, title: ['Type what you', 'have seen'], sub: ['spelling'], color: GOOD },
  { n: 4, title: ['Quiz, match,', 'spelling'], sub: ['until it sticks'], color: BLUE },
];

function Flow() {
  const bw = 168;
  const gap = 32;
  const x0 = (W - (FLOW.length * bw + (FLOW.length - 1) * gap)) / 2;
  const y = 120;
  const bh = 176;
  return (
    <Stage alt="A practice session in order: fading words from older topics, new words as flashcards, typing what you have seen, then quiz, match and spelling until the words stick">
      <text className="fade" style={delay(0.1)} x={W / 2} y="58" textAnchor="middle" fill={PAPER} fontSize="21" fontWeight="700">One press on Practice</text>
      {FLOW.map((s, i) => {
        const x = x0 + i * (bw + gap);
        const when = 0.4 + i * 0.7;
        return (
          <g key={s.n}>
            <g className="pop" style={delay(when)}>
              <rect x={x} y={y} width={bw} height={bh} rx="16" fill="#1a1c20" stroke={s.color} strokeWidth="2.5" />
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
    </Stage>
  );
}

export const ANIMATED_ILLUSTRATIONS = { twolearners: TwoLearners, growth: Growth, flow: Flow };
