// FSRS-6 baseline for the evaluation harness (NOT used by the app).
//
// Formulas and default parameters follow the open-spaced-repetition reference
// implementation (fsrs-rs, model_v6.rs / inference_v6.rs). Default weights,
// not fitted to our learners, so this is "FSRS as shipped" — a fair external
// yardstick, not the best FSRS could do on our data.
//
// Our logs carry a boolean result plus a 1-5 confidence, FSRS wants a
// 1-4 rating, so:  fail -> Again(1); pass with confidence <=2 -> Hard(2);
// confidence 3-4 -> Good(3); confidence 5 -> Easy(4).

export const FSRS6_DEFAULT_PARAMS = [
  0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001,
  1.8722, 0.1666, 0.796, 1.4835, 0.0614, 0.2629, 1.6483, 0.6014,
  1.8729, 0.5425, 0.0912, 0.0658, 0.1542,
];

const DAY = 86400000;
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

export function ratingFromEvent(ev) {
  if (!ev.result) return 1;
  const c = typeof ev.confidence === 'number' ? ev.confidence : 3;
  if (c <= 2) return 2;
  if (c >= 5) return 4;
  return 3;
}

/** Retrievability after t days at stability s: (1 + factor * t / s)^(-w20). */
export function fsrsRetrievability(t, s, w = FSRS6_DEFAULT_PARAMS) {
  const decay = -w[20];
  const factor = Math.pow(0.9, 1 / decay) - 1;
  return Math.pow(1 + (factor * t) / s, decay);
}

const initDifficulty = (w, g) => w[4] - Math.exp(w[5] * (g - 1)) + 1;

function nextDifficulty(w, d, g) {
  const damped = d + ((10 - d) / 9) * (-w[6] * (g - 3));
  const init4 = initDifficulty(w, 4);
  return clamp(w[7] * init4 + (1 - w[7]) * damped, 1, 10); // mean reversion toward Easy's init
}

function nextStability(w, { s, d, r, g, sameDay }) {
  if (sameDay) return Math.max(0.01, s * Math.exp(w[17] * (g - 3 + w[18])) * Math.pow(s, -w[19]));
  if (g === 1) {
    const fail = w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) * Math.exp((1 - r) * w[14]);
    return Math.max(0.01, Math.min(fail, s / Math.exp(w[17] * w[18])));
  }
  const hardPenalty = g === 2 ? w[15] : 1;
  const easyBonus = g === 4 ? w[16] : 1;
  return Math.max(
    0.01,
    s * (Math.exp(w[8]) * (11 - d) * Math.pow(s, -w[9]) * (Math.exp((1 - r) * w[10]) - 1) * hardPenalty * easyBonus + 1),
  );
}

/**
 * FSRS-6 predicted recall probability for every review after the first of one
 * word's time-ordered events (so it lines up with replay()'s samples).
 *
 * @param {Array<{ts:string|number, result:boolean, confidence?:number}>} events
 * @returns {number[]}
 */
export function fsrsPredictions(events, w = FSRS6_DEFAULT_PARAMS) {
  const out = [];
  let s = null;
  let d = null;
  let last = null;
  for (const ev of events) {
    const now = typeof ev.ts === 'number' ? ev.ts : new Date(ev.ts).getTime();
    const g = ratingFromEvent(ev);
    if (s === null) {
      s = w[g - 1];
      d = clamp(initDifficulty(w, g), 1, 10);
    } else {
      const t = Math.max(0, (now - last) / DAY);
      const r = fsrsRetrievability(t, s, w);
      out.push(r);
      const nextD = nextDifficulty(w, d, g);
      s = nextStability(w, { s, d, r, g, sameDay: t < 1 });
      d = nextD;
    }
    last = now;
  }
  return out;
}
