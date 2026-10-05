// Usage (from repo root: npm run eval:memory -- <flags>):
//   node eval/run.js                       synthetic benchmark
//   node eval/run.js --data export.json    replay real review logs (format in replay.js)
//   node eval/run.js --seeds 20 --days 120
import fs from 'node:fs';
import { simulate } from './simulator.js';
import { replay, constantBaseline } from './replay.js';
import { summarize, calibrationBins } from './metrics.js';

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const f = (x, d = 3) => (Number.isFinite(x) ? x.toFixed(d) : 'n/a');

function report(title, words) {
  const engine = summarize(replay(words));
  const base = summarize(replay(words, { predict: constantBaseline(words) }));
  console.log(`\n${title}  (n=${engine.n} predictions)`);
  console.log('model        brier   logLoss   auc     ece');
  console.log(`engine       ${f(engine.brier)}   ${f(engine.logLoss)}     ${f(engine.auc)}   ${f(engine.ece)}`);
  console.log(`constant     ${f(base.brier)}   ${f(base.logLoss)}     ${f(base.auc)}   ${f(base.ece)}`);
}

const dataFile = opt('data');
if (dataFile) {
  const words = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  report(`Real data: ${dataFile}`, words);
  console.log('\ncalibration (predicted -> observed):');
  for (const b of calibrationBins(replay(words))) {
    console.log(`  ${f(b.predicted, 2)} -> ${f(b.observed, 2)}   n=${b.n}`);
  }
} else {
  const seeds = Number(opt('seeds', 5));
  const days = Number(opt('days', 90));
  console.log(`Synthetic benchmark: ${seeds} learners x 60 words x ${days} days, cap 25 reviews/day`);
  const engineLogs = [];
  for (const policy of ['engine', 'fixedLadder']) {
    let reviews = 0;
    let retention = 0;
    for (let s = 1; s <= seeds; s++) {
      const r = simulate(policy, { seed: s, days });
      reviews += r.reviews;
      retention += r.retention;
      if (policy === 'engine') engineLogs.push(...r.learner.map((w) => ({ wordId: `${s}-${w.id}`, events: w.events })));
    }
    console.log(`${policy.padEnd(12)} reviews/learner: ${f(reviews / seeds, 0).padStart(5)}   final true retention: ${f(retention / seeds)}`);
  }
  report('Prediction quality on engine-scheduled synthetic logs', engineLogs);
}
