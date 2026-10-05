# Changelog

## v1.0.0-beta.1 (2026-10-06)

First public beta of VOC (VOCABRY). The core product works and is in use by 40+
learners; we are still improving it, so rough edges are possible.

### Memory engine
- Extracted into its own workspace package, `@voc/memory-engine` (`packages/memory-engine`), with a test suite and an evaluation harness (replay, Brier / log-loss / AUC / ECE, synthetic learners, FSRS-6 baseline).
- New calibrated recall predictor fitted on real review logs. On held-out learners: log-loss 0.244 and AUC 0.78, versus 0.53 and 0.53 for the previous pure forgetting-curve prediction.
- Per-word difficulty now affects how fast a word is strengthened; stability growth saturates for strong words; mastery needs two distinct active-recall modes; legacy records are read consistently everywhere.
- Review logs now record session, answer type and engine version; `npm run fit:memory` re-fits the predictor; an anonymised export script feeds it.
- "Recall" and "words at risk" shown in the app come from the calibrated predictor.

### Public site
- New landing page (departures-board design), `/welcome` route, Uzbek / Russian / English, FAQ, Beta badge and version, link-preview tags, cookie-free analytics.
- Redesigned sign-in and sign-up; the post-login "Welcome back" animation is gone.
- Blog (English): two launch posts, illustrations, reading progress, table of contents.

### Super admin
- Write and publish blog posts from the panel (`/corp/super-admin/blog`) with Markdown, cover choice and live preview. Posts are stored server-side via `/api/blog`.

### App
- Logout row at the bottom of the student sidebars.
- CI on every push (tests, lint for the engine and scripts, build).

### Known limits
- The review schedule (when a word comes back) still uses the original forgetting-curve model; it is not yet validated on genuinely spaced reviews.
- Model results are from 24 learners (8 held out); they show a direction, not proof.
