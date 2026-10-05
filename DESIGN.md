# Design: landing page (departures-board world)

Scope: `src/pages/marketing/` only. The app and corp panels keep their own iOS-style systems.

## Idea
Memory is a timetable: every word has its own departure. The one raised object on the page is a near-black split-flap board that demonstrates the mechanism (words fade at their own speed; reviewing strengthens one).

## Palette (tokens on `.lp-page`)
- ground `#e8e5dd` warm concrete, ink `#101113`, board `#0e0f12`, tile `#1b1d22`, paper `#f4f1e8`
- status colors only on flaps: good `#3ddc84`, soon/amber `#ffb020`, due `#ff6b5e`
- brand blue `#0a84ff` only on actions
## Type
Barlow Condensed (signage: display, board, brand wordmark); Hanken Grotesk (body). Tabular numerals on flaps.
## Components
- Flap: per-character tile with split line; a changed character remounts and replays the flip.
- Board: only elevated surface (single shadow). Rows are hairlines, never cards.
- Evidence bars: real measured values, animate with `scaleX`.
## Rules
- No eyebrows, no section numbers, no stat tiles, no gradients/glass.
- Demonstration data (both boards) must stay labelled "Namuna ma'lumot / Sample data".
- Claims come from `landingContent.js` comments; update evidence numbers only from `npm run fit:memory`.
- Default language is UZ until the visitor picks one; copy lives in `landingContent.js` (uz, en).
