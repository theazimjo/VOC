// Prediction-quality metrics: how well did predicted P(recall) match what happened?

const EPS = 1e-6;
const clip = (p) => Math.min(1 - EPS, Math.max(EPS, p));

/** Mean squared error between predicted P and 0/1 outcome. Lower is better. */
export function brier(samples) {
  if (!samples.length) return NaN;
  return samples.reduce((s, { p, y }) => s + (p - (y ? 1 : 0)) ** 2, 0) / samples.length;
}

/** Binary cross-entropy. Lower is better; punishes confident wrong predictions. */
export function logLoss(samples) {
  if (!samples.length) return NaN;
  return -samples.reduce((s, { p, y }) => s + (y ? Math.log(clip(p)) : Math.log(1 - clip(p))), 0) / samples.length;
}

/** Probability that a random recalled sample got a higher P than a random forgotten one. 0.5 = no skill. */
export function auc(samples) {
  const pos = samples.filter((s) => s.y);
  const neg = samples.filter((s) => !s.y);
  if (!pos.length || !neg.length) return NaN;
  const sorted = [...samples].sort((a, b) => a.p - b.p);
  let rankSum = 0;
  for (let i = 0; i < sorted.length; ) {
    let j = i;
    while (j < sorted.length && sorted[j].p === sorted[i].p) j++;
    const avgRank = (i + 1 + j) / 2;
    for (let k = i; k < j; k++) if (sorted[k].y) rankSum += avgRank;
    i = j;
  }
  return (rankSum - (pos.length * (pos.length + 1)) / 2) / (pos.length * neg.length);
}

/** Calibration curve: per predicted-P bin, the observed recall rate. Perfect model → observed ≈ predicted. */
export function calibrationBins(samples, bins = 10) {
  const out = Array.from({ length: bins }, (_, i) => ({ lo: i / bins, hi: (i + 1) / bins, n: 0, predicted: 0, observed: 0 }));
  for (const { p, y } of samples) {
    const b = out[Math.min(bins - 1, Math.floor(p * bins))];
    b.n++;
    b.predicted += p;
    b.observed += y ? 1 : 0;
  }
  return out.filter((b) => b.n).map((b) => ({ ...b, predicted: b.predicted / b.n, observed: b.observed / b.n }));
}

/** Expected calibration error: weighted gap between predicted and observed per bin. */
export function ece(samples, bins = 10) {
  const total = samples.length;
  if (!total) return NaN;
  return calibrationBins(samples, bins).reduce((s, b) => s + (b.n / total) * Math.abs(b.predicted - b.observed), 0);
}

export function summarize(samples) {
  return {
    n: samples.length,
    brier: brier(samples),
    logLoss: logLoss(samples),
    auc: auc(samples),
    ece: ece(samples),
  };
}
