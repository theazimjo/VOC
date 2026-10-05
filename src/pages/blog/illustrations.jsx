// Blog illustrations: crisp vector diagrams drawn in the landing's board world
// (dark panel, paper lines, amber for the thing that matters). All geometry,
// no raster. Each takes `lang` ('uz' | 'ru' | 'en') for its few labels.
// Used as a post cover (cover: 'curve') and inline (:::figure curve).

const PAPER = '#f4f1e8';
const DIM = 'rgba(244, 241, 232, 0.55)';
const FAINT = 'rgba(244, 241, 232, 0.12)';
const AMBER = '#ffb020';
const GOOD = '#3ddc84';
const DUE = '#ff6b5e';
const GREY = '#7a7d86';
const SILVER = '#b9bcc4';

const W = 800;
const H = 450;

const T = {
  uz: {
    curveAlt: "Unutish egri chizig'i: takrorlamasangiz tez pasayadi, takrorlasangiz har gal sekinroq",
    noReview: 'takrorlamasangiz',
    review: 'takrorlasangiz',
    threshold: 'takrorlash vaqti',
    time: 'vaqt',
    sessionsAlt: "Takrorlarning ko'pi bir mashq sessiyasi ichida, oraliqli takrorlar kam",
    sameSitting: 'bir sessiya ichida',
    spaced: 'oraliqli takror',
    days: '30 kun',
    factorsAlt: "So'zning eslab qolish ehtimoli to'rt omildan baholanadi",
    f1: "so'zning tarixi",
    f2: 'ishonch',
    f3: 'takrorlar soni',
    f4: 'umumiy aniqlik',
    chance: 'eslab qolish ehtimoli',
    sample: 'namuna',
    compareAlt: "Uch modelning taqqoslanishi: o'rtacha taxmin 0,50, klassik egri chiziq 0,53, VOC 0,78",
    bAvg: "o'rtacha taxmin",
    bCurve: 'klassik egri chiziq',
    bVoc: 'VOC modeli',
    bChance: 'tasodif',
    boardAlt: "Namuna takrorlash tablosi",
    boardTitle: 'BUGUNGI TAKRORLASH',
    st: { good: 'YAXSHI', soon: 'TEZDA', due: 'TAKRORLANG' },
  },
  ru: {
    curveAlt: 'Кривая забывания: без повторения быстро падает, с повторением каждый раз медленнее',
    noReview: 'без повторения',
    review: 'с повторением',
    threshold: 'время повторить',
    time: 'время',
    sessionsAlt: 'Большинство повторений происходит в одной сессии, разнесённых повторений мало',
    sameSitting: 'в одной сессии',
    spaced: 'разнесённое повторение',
    days: '30 дней',
    factorsAlt: 'Шанс вспомнить слово оценивается по четырём факторам',
    f1: 'история слова',
    f2: 'уверенность',
    f3: 'число повторений',
    f4: 'общая точность',
    chance: 'шанс вспомнить',
    sample: 'пример',
    compareAlt: 'Сравнение трёх моделей: средний прогноз 0,50, классическая кривая 0,53, VOC 0,78',
    bAvg: 'средний прогноз',
    bCurve: 'классическая кривая',
    bVoc: 'модель VOC',
    bChance: 'случайность',
    boardAlt: 'Пример доски повторения',
    boardTitle: 'ПОВТОРЕНИЕ НА СЕГОДНЯ',
    st: { good: 'ХОРОШО', soon: 'СКОРО', due: 'ПОВТОРИ' },
  },
  en: {
    curveAlt: 'Forgetting curve: it drops fast without review and more slowly after each review',
    noReview: 'without review',
    review: 'with review',
    threshold: 'time to review',
    time: 'time',
    sessionsAlt: 'Most reviews happen inside one practice session, few are spaced out',
    sameSitting: 'inside one session',
    spaced: 'spaced review',
    days: '30 days',
    factorsAlt: 'The chance of recalling a word is estimated from four factors',
    f1: 'word history',
    f2: 'confidence',
    f3: 'times reviewed',
    f4: 'overall accuracy',
    chance: 'chance of recall',
    sample: 'sample',
    compareAlt: 'Three models compared: average guess 0.50, classic curve 0.53, VOC 0.78',
    bAvg: 'average guess',
    bCurve: 'classic curve',
    bVoc: 'VOC model',
    bChance: 'chance',
    boardAlt: 'Sample review board',
    boardTitle: "TODAY'S REVIEW",
    st: { good: 'GOOD', soon: 'SOON', due: 'REVIEW' },
  },
};

function Frame({ alt, children }) {
  return (
    <svg className="bl-ill" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt} preserveAspectRatio="xMidYMid meet">
      <rect width={W} height={H} rx="22" fill="#101113" />
      {children}
    </svg>
  );
}

const fmtPath = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

/** Forgetting curve with and without review (sawtooth). */
function Curve({ t }) {
  const x0 = 80, x1 = 740, yTop = 90, yBase = 350;
  const days = 14;
  const X = (d) => x0 + (d / days) * (x1 - x0);
  const Y = (p) => yBase - p * (yBase - yTop);

  const noReview = [];
  for (let d = 0; d <= days; d += 0.25) noReview.push([X(d), Y(Math.exp(-d / 2))]);

  // review whenever recall falls to the threshold; each review slows the decay
  const TH = 0.6;
  const saw = [];
  const marks = [];
  let S = 2;
  let d0 = 0;
  while (d0 < days) {
    const dEnd = Math.min(days, d0 + S * Math.log(1 / TH));
    for (let d = d0; d <= dEnd + 1e-6; d += 0.1) saw.push([X(d), Y(Math.exp(-(d - d0) / S))]);
    if (dEnd < days) {
      saw.push([X(dEnd), Y(1)]);
      marks.push([X(dEnd), Y(1)]);
    }
    d0 = dEnd;
    S *= 1.9;
  }

  return (
    <Frame alt={t.curveAlt}>
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <line key={p} x1={x0} x2={x1} y1={Y(p)} y2={Y(p)} stroke={FAINT} strokeWidth="1" />
      ))}
      <line x1={x0} x2={x1} y1={Y(TH)} y2={Y(TH)} stroke={DUE} strokeWidth="1.5" strokeDasharray="6 6" />
      <text x={x1} y={Y(TH) + 24} textAnchor="end" fill={DUE} fontSize="15" fontWeight="600">{t.threshold}</text>
      <path d={fmtPath(noReview)} fill="none" stroke={GREY} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      <path d={fmtPath(saw)} fill="none" stroke={AMBER} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      {marks.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill="#101113" stroke={AMBER} strokeWidth="3" />)}
      <line x1={x0} x2={x0} y1={yTop - 10} y2={yBase} stroke={DIM} strokeWidth="1.5" />
      <line x1={x0} x2={x1} y1={yBase} y2={yBase} stroke={DIM} strokeWidth="1.5" />
      <text x={x0 - 12} y={Y(1) + 5} textAnchor="end" fill={DIM} fontSize="14">100%</text>
      <text x={x0 - 12} y={Y(0) + 5} textAnchor="end" fill={DIM} fontSize="14">0%</text>
      <text x={x1} y={yBase + 28} textAnchor="end" fill={DIM} fontSize="14">{t.time} →</text>
      <g transform="translate(80 398)" fontSize="15" fill={PAPER}>
        <line x1="0" x2="34" y1="0" y2="0" stroke={GREY} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
        <text x="46" y="5">{t.noReview}</text>
        <line x1="230" x2="264" y1="0" y2="0" stroke={AMBER} strokeWidth="4" strokeLinecap="round" />
        <text x="276" y="5">{t.review}</text>
      </g>
    </Frame>
  );
}

/** Reviews clustered in a few sittings vs a handful of spaced ones. */
function Sessions({ t }) {
  const x0 = 80, x1 = 740, base = 330;
  const X = (d) => x0 + (d / 30) * (x1 - x0);
  const sittings = [[2, 15], [9, 11], [21, 13]];
  const spaced = [5.5, 14, 26.5];
  const dots = [];
  sittings.forEach(([day, n], s) => {
    for (let i = 0; i < n; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      dots.push(<circle key={`s${s}-${i}`} cx={X(day) + (col - 1) * 15} cy={base - 22 - row * 17} r="6" fill={PAPER} opacity="0.85" />);
    }
  });
  return (
    <Frame alt={t.sessionsAlt}>
      <line x1={x0} x2={x1} y1={base} y2={base} stroke={DIM} strokeWidth="1.5" />
      {[0, 5, 10, 15, 20, 25, 30].map((d) => (
        <g key={d}>
          <line x1={X(d)} x2={X(d)} y1={base} y2={base + 8} stroke={DIM} strokeWidth="1.5" />
        </g>
      ))}
      <text x={x1} y={base + 30} textAnchor="end" fill={DIM} fontSize="14">{t.days}</text>
      {dots}
      {spaced.map((d) => <circle key={d} cx={X(d)} cy={base - 22} r="8" fill={AMBER} />)}
      <g transform="translate(80 392)" fontSize="15" fill={PAPER}>
        <circle cx="7" cy="0" r="6" fill={PAPER} opacity="0.85" />
        <text x="24" y="5">{t.sameSitting}</text>
        <circle cx="257" cy="0" r="8" fill={AMBER} />
        <text x="275" y="5">{t.spaced}</text>
      </g>
    </Frame>
  );
}

/** Four inputs feeding one estimate. */
function Factors({ t }) {
  const labels = [t.f1, t.f2, t.f3, t.f4];
  const cx = 560, cy = 215, r = 78;
  const arc = (frac) => {
    const a0 = Math.PI * 0.75;
    const a1 = a0 + Math.PI * 1.5 * frac;
    const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [sx, sy] = p(a0);
    const [ex, ey] = p(a1);
    return `M${sx.toFixed(1)} ${sy.toFixed(1)} A${r} ${r} 0 ${frac > 0.667 ? 1 : 0} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  };
  return (
    <Frame alt={t.factorsAlt}>
      {labels.map((label, i) => {
        const y = 95 + i * 80;
        return (
          <g key={label}>
            <path d={`M290 ${y} C 380 ${y}, 400 ${cy}, ${cx - r - 14} ${cy}`} fill="none" stroke={DIM} strokeWidth="2" />
            <rect x="60" y={y - 24} width="230" height="48" rx="12" fill="#1b1d22" />
            <text x="82" y={y + 6} fill={PAPER} fontSize="19" fontWeight="600">{label}</text>
          </g>
        );
      })}
      <path d={arc(1)} fill="none" stroke={FAINT} strokeWidth="14" strokeLinecap="round" />
      <path d={arc(0.82)} fill="none" stroke={GOOD} strokeWidth="14" strokeLinecap="round" />
      <text x={cx} y={cy + 14} textAnchor="middle" fill={PAPER} fontSize="44" fontWeight="700">82%</text>
      <text x={cx} y={cy + r + 52} textAnchor="middle" fill={PAPER} fontSize="18" fontWeight="600">{t.chance}</text>
      <text x={cx} y={cy + r + 76} textAnchor="middle" fill={DIM} fontSize="14">({t.sample})</text>
    </Frame>
  );
}

/** Cover for the measured-results post: three models side by side. */
function Compare({ t }) {
  const base = 365, scale = 270;
  const bars = [
    { x: 100, v: 0.5, c: GREY, label: t.bAvg },
    { x: 280, v: 0.53, c: SILVER, label: t.bCurve },
    { x: 460, v: 0.78, c: AMBER, label: t.bVoc },
  ];
  return (
    <Frame alt={t.compareAlt}>
      <line x1="70" x2="740" y1={base - 0.5 * scale} y2={base - 0.5 * scale} stroke={DUE} strokeWidth="1.5" strokeDasharray="6 6" />
      <text x="740" y={base - 0.5 * scale - 10} textAnchor="end" fill={DUE} fontSize="15" fontWeight="600">{t.bChance} 0.50</text>
      {bars.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={base - b.v * scale} width="130" height={b.v * scale} rx="10" fill={b.c} />
          <text x={b.x + 65} y={base - b.v * scale - 14} textAnchor="middle" fill={PAPER} fontSize="30" fontWeight="700">{b.v.toFixed(2)}</text>
          <text x={b.x + 65} y={base + 30} textAnchor="middle" fill={PAPER} fontSize="16" fontWeight="600">{b.label}</text>
        </g>
      ))}
      <line x1="70" x2="740" y1={base} y2={base} stroke={DIM} strokeWidth="1.5" />
    </Frame>
  );
}

/** Generic cover: a small sample review board. */
function Board({ t }) {
  const rows = [
    ['achieve', '94%', 'good'],
    ['thorough', '78%', 'soon'],
    ['consistent', '61%', 'due'],
    ['reluctant', '43%', 'due'],
  ];
  const col = { good: GOOD, soon: AMBER, due: DUE };
  return (
    <Frame alt={t.boardAlt}>
      <rect x="110" y="70" width="580" height="310" rx="18" fill="#0a0b0d" />
      <text x="146" y="118" fill={AMBER} fontSize="24" fontWeight="700" letterSpacing="3">{t.boardTitle}</text>
      {rows.map(([word, pct, st], i) => {
        const y = 170 + i * 56;
        return (
          <g key={word}>
            <line x1="146" x2="654" y1={y - 30} y2={y - 30} stroke={FAINT} />
            <text x="146" y={y} fill={PAPER} fontSize="28" fontWeight="600">{word}</text>
            <rect x="420" y={y - 26} width="62" height="36" rx="5" fill="#1b1d22" />
            <text x="451" y={y} textAnchor="middle" fill={PAPER} fontSize="24" fontWeight="600">{pct}</text>
            <text x="654" y={y} textAnchor="end" fill={col[st]} fontSize="24" fontWeight="600" letterSpacing="3">{t.st[st]}</text>
          </g>
        );
      })}
    </Frame>
  );
}

export const ILLUSTRATIONS = { curve: Curve, sessions: Sessions, factors: Factors, compare: Compare, board: Board };

/** @param {{ name: string, lang?: 'uz'|'ru'|'en' }} props */
export default function Illustration({ name, lang = 'uz' }) {
  const C = ILLUSTRATIONS[name];
  if (!C) return null;
  return <C t={T[lang] || T.uz} />;
}
