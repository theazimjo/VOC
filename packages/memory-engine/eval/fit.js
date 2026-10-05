// Fits the calibrated recall predictor (src/predictor.js) on real review logs.
//
//   node eval/fit.js ../../memory-export.local.json            # evaluate on held-out users, print metrics
//   node eval/fit.js ../../memory-export.local.json --write    # also write src/predictor-params.js
//
// 1. Users are split into train/test (every third user is test) so a learner
//    is never in both — otherwise the score only measures memorising people.
// 2. A model is fitted on train and scored on test against two baselines:
//    "always predict the average recall rate" and the old e^(-t/S) engine.
// 3. With --write, the shipped parameters are re-fitted on ALL users.
//
// Features are built causally (only information available before the review)
// through buildFeatures(), the same function the runtime uses.
import fs from 'node:fs';
import { replay } from './replay.js';
import { summarize } from './metrics.js';
import { buildFeatures, predictFromFeatures, FEATURE_NAMES, PRIOR_USER_RATE } from '../src/predictor.js';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const write = args.includes('--write');
if (!file) {
  console.error('usage: node eval/fit.js <export.json> [--write]');
  process.exit(1);
}

const DAY = 86400000;
const words = JSON.parse(fs.readFileSync(file, 'utf8'));
const engineP = replay(words).map((s) => s.p); // same order as rows below (word by word, events 1..n)

// ── rows: one per non-first review ────────────────────────────────────────────
const rows = [];
let k = 0;
words.forEach((w, wi) => {
  const ev = [...w.events].sort((a, b) => new Date(a.ts) - new Date(b.ts));
  let ok = 0;
  ev.forEach((e, i) => {
    if (i > 0) {
      rows.push({
        user: w.userId,
        word: wi,
        n: i,
        ok,
        ts: new Date(e.ts).getTime(),
        gapDays: (new Date(e.ts) - new Date(ev[i - 1].ts)) / DAY,
        active: e.retrievalType === 'active_recall' ? 1 : 0,
        prevConf: ev[i - 1].confidence ?? 3,
        y: e.result ? 1 : 0,
        pEngine: engineP[k++],
      });
    }
    ok += e.result ? 1 : 0;
  });
});

// learner rate before each review, in time order across all of a learner's words
const byUser = {};
for (const r of rows) (byUser[r.user] ??= []).push(r);
for (const list of Object.values(byUser)) {
  list.sort((a, b) => a.ts - b.ts);
  let n = 0;
  let ok = 0;
  for (const r of list) {
    r.userRate = (ok + PRIOR_USER_RATE * 5) / (n + 5);
    n++;
    ok += r.y;
  }
}
for (const r of rows) r.x = buildFeatures(r);

// ── logistic regression (standardised features, L2, full-batch GD) ────────────
function fit(data, getX = (r) => r.x) {
  const d = getX(data[0]).length;
  const mu = Array.from({ length: d }, (_, j) => data.reduce((s, r) => s + getX(r)[j], 0) / data.length);
  const sd = Array.from({ length: d }, (_, j) => Math.sqrt(data.reduce((s, r) => s + (getX(r)[j] - mu[j]) ** 2, 0) / data.length) || 1);
  const Z = data.map((r) => getX(r).map((v, j) => (v - mu[j]) / sd[j]));
  const base = data.reduce((s, r) => s + r.y, 0) / data.length;
  let bias = Math.log(base / (1 - base));
  let w = new Array(d).fill(0);
  for (let it = 0; it < 600; it++) {
    const gw = new Array(d).fill(0);
    let gb = 0;
    for (let i = 0; i < Z.length; i++) {
      let z = bias;
      for (let j = 0; j < d; j++) z += w[j] * Z[i][j];
      const e = 1 / (1 + Math.exp(-z)) - data[i].y;
      gb += e;
      for (let j = 0; j < d; j++) gw[j] += e * Z[i][j];
    }
    bias -= 0.5 * (gb / Z.length);
    w = w.map((v, j) => v - 0.5 * (gw[j] / Z.length + 0.001 * v));
  }
  return { bias, weights: w, mu, sd };
}

const round = (a, d = 4) => a.map((v) => +v.toFixed(d));
const f = (m) => `brier ${m.brier.toFixed(3)}  logLoss ${m.logLoss.toFixed(3)}  auc ${m.auc.toFixed(3)}  ece ${m.ece.toFixed(3)}`;
const score = (data, predict) => summarize(data.map((r) => ({ p: predict(r), y: !!r.y })));

// ── held-out evaluation ───────────────────────────────────────────────────────
const users = Object.keys(byUser).sort();
const testUsers = new Set(users.filter((_, i) => i % 3 === 0));
const train = rows.filter((r) => !testUsers.has(r.user));
const test = rows.filter((r) => testUsers.has(r.user));
const trainRate = train.reduce((s, r) => s + r.y, 0) / train.length;
const trained = fit(train);

console.log(`train: ${train.length} predictions / ${users.length - testUsers.size} users    test: ${test.length} predictions / ${testUsers.size} users`);
console.log('model                  held-out users');
console.log('constant average     ', f(score(test, () => trainRate)));
console.log('old engine e^(-t/S)  ', f(score(test, (r) => r.pEngine)));
console.log('calibrated predictor ', f(score(test, (r) => predictFromFeatures(r.x, trained))));
console.log('weights (standardised):', Object.fromEntries(FEATURE_NAMES.map((n, j) => [n, +trained.weights[j].toFixed(3)])));

// ── spaced reviews only ───────────────────────────────────────────────────────
// Most logged reviews are repeats inside one practice session, where elapsed
// time carries no information. The scheduler's forgetting-curve model is
// really about *spaced* reviews, so score it separately on reviews that came
// at least MIN_GAP_DAYS after the previous one. "engine recalibrated" maps the
// old engine's P through a 1-feature logistic fitted on the spaced train rows
// (it ranks words well but is overconfident, so raw P is not trustworthy).
const MIN_GAP_DAYS = 0.25;
const spacedTrain = train.filter((r) => r.gapDays >= MIN_GAP_DAYS);
const spacedTest = test.filter((r) => r.gapDays >= MIN_GAP_DAYS);
if (spacedTrain.length > 200 && spacedTest.length > 200) {
  const lg = (p) => Math.log(Math.min(0.999, Math.max(0.001, p)) / (1 - Math.min(0.999, Math.max(0.001, p))));
  const engineCal = fit(spacedTrain, (r) => [lg(r.pEngine)]);
  const spacedRate = spacedTrain.reduce((s, r) => s + r.y, 0) / spacedTrain.length;
  console.log(`
Spaced reviews only (gap >= ${MIN_GAP_DAYS * 24}h): train ${spacedTrain.length}, test ${spacedTest.length}`);
  console.log('constant average     ', f(score(spacedTest, () => spacedRate)));
  console.log('old engine e^(-t/S)  ', f(score(spacedTest, (r) => r.pEngine)));
  console.log('engine recalibrated  ', f(score(spacedTest, (r) => predictFromFeatures([lg(r.pEngine)], engineCal))));
  console.log('calibrated predictor ', f(score(spacedTest, (r) => predictFromFeatures(r.x, trained))));
} else {
  console.log('\nSpaced reviews only: not enough spaced reviews yet to evaluate.');
}

// ── ship parameters fitted on everyone ────────────────────────────────────────
if (write) {
  const final = fit(rows);
  const meta = {
    fittedAt: new Date().toISOString().slice(0, 10),
    predictions: rows.length,
    users: users.length,
    heldOut: score(test, (r) => predictFromFeatures(r.x, trained)),
    featureNames: FEATURE_NAMES,
  };
  const out = `// Generated by eval/fit.js — do not edit by hand. Regenerate with: npm run fit:memory
export const DEFAULT_PREDICTOR_PARAMS = ${JSON.stringify({ bias: +final.bias.toFixed(5), weights: round(final.weights), mu: round(final.mu), sd: round(final.sd), meta }, null, 2)};
`;
  fs.writeFileSync(new URL('../src/predictor-params.js', import.meta.url), out);
  console.log('\nWrote src/predictor-params.js (fitted on all users).');
}
