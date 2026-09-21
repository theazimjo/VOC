// Lightweight metadata for the navbar's self-serve course picker (Navbar.jsx
// is part of the eagerly-loaded app shell, not a lazy route) — deliberately
// decoupled from coursesCatalog.js, whose AVAILABLE_COURSES entries pull in
// each course's full lesson content (words/grammar/reading/listening for
// every week). Importing that here would drag all of it into the main
// bundle instead of the lazy /course/:packId chunk. Keep this file's entries
// in sync with the `selectable` course(s) in coursesCatalog.js by hand — id
// must match exactly, since it's what gets written as the pack's `courseId`.
export const SELECTABLE_COURSES = [];

