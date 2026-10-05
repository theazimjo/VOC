# @voc/memory-engine

Individual Memory Dynamics Engine: a per-user, per-word forgetting curve
`P(t) = e^(-t/S)` with stability `S` (days) updated after every review.

Pure JS, no dependencies, no Firebase/React. Time (`now`) and randomness (`rng`)
are injectable, so every result is deterministic and testable.

## Layout
| Path | Purpose |
|---|---|
| `src/engine.js` | Math core: recall probability, stability update, scheduling, mastery/retention stats |
| `src/scheduler.js` | `applyReview(word, opts)` — the one entry point practice modes use; mastery gate (passive ceiling 65% until confirmed by 2 active-recall angles) |
| `src/predictor.js` | Calibrated recall predictor (logistic over word record, learner rate, gap, confidence). Fitted on real logs; weights in `src/predictor-params.js` (generated) |
| `src/autopsy.js` | Heuristic "why did I forget this" diagnosis |
| `eval/` | Evaluation harness: replay, metrics (Brier, log-loss, AUC, ECE, calibration), synthetic simulator |

App usage: `import { applyReview, computeRetentionStats } from '@voc/memory-engine'`.
Firebase persistence stays in the app (`src/experiment/experimentDB.js`).

## Improving the engine (workflow)
1. `npm run eval:memory` (from repo root) — record the baseline numbers.
2. Change a constant or formula in `src/engine.js` / `src/scheduler.js`.
3. Re-run eval. Keep the change only if Brier/log-loss/ECE improve (prediction) and
   retention at equal-or-fewer reviews improves (scheduling).
4. `npm test` must stay green; add a test for any new rule.

Real data: `node scripts/export-memory-data.mjs` (anonymised, read-only, writes gitignored `memory-export.local.json`), then
`npm run fit:memory -- ../../memory-export.local.json [--write]` re-fits the predictor on held-out users
(every 3rd user is test). Old notes: export `recallHistory` per word into
`[{ wordId, events: [{ ts, result, confidence, responseTime, retrievalType, mode }] }]`
and run `npm run eval:memory -- --data export.json`.

Synthetic results only validate mechanics: the simulator's "true" learner is our own
assumption. Trust real-data replay for tuning decisions.

## Versioning rule
Word records carry no `engineVersion` yet. Before changing stored fields, add one and a
migration in `applyReview` (legacy `interval` -> `stability` seeding is the existing example).

## What real data showed (2026-10, 24 learners, ~38k predictions)
- Pure `e^(-t/S)` as a *prediction* lost to "always guess the average" on held-out users (log-loss 0.53 vs 0.29).
- Real recall barely depends on elapsed time (68% of reviews are same-session repeats; many answers are passive/MCQ).
- A word's own track record, learner rate, previous confidence and review count predict well: the calibrated predictor reaches log-loss 0.244 / AUC 0.78 on held-out users.
- Scheduling (S, difficulty, next review) is still the forgetting-curve model; the data cannot validate it yet because there are too few genuine spaced reviews. Re-run the export as spaced data accumulates.
- On *spaced* reviews only (gap >= 6h; `fit.js` prints this block), the old forgetting-curve model does rank words usefully (AUC 0.69 vs 0.5) but is badly overconfident (ECE 0.14); recalibrated it reaches log-loss 0.264, and the calibrated predictor 0.261 (constant: 0.281). So scheduling is kept, but its raw P is never shown to users. Sample is small (3k predictions, 8 test users) and engine P partly encodes the word's own history.
