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

Real data: export `recallHistory` per word into
`[{ wordId, events: [{ ts, result, confidence, responseTime, retrievalType, mode }] }]`
and run `npm run eval:memory -- --data export.json`.

Synthetic results only validate mechanics: the simulator's "true" learner is our own
assumption. Trust real-data replay for tuning decisions.

## Versioning rule
Word records carry no `engineVersion` yet. Before changing stored fields, add one and a
migration in `applyReview` (legacy `interval` -> `stability` seeding is the existing example).
