// Lightweight metadata for the navbar's self-serve course picker (Navbar.jsx
// is part of the eagerly-loaded app shell, not a lazy route) — deliberately
// decoupled from coursesCatalog.js, whose AVAILABLE_COURSES entries pull in
// each course's full lesson content (words/grammar/reading/listening for
// every week). Importing that here would drag all of it into the main
// bundle instead of the lazy /course/:packId chunk. Keep this file's entries
// in sync with the `selectable` course(s) in coursesCatalog.js by hand — id
// must match exactly, since it's what gets written as the pack's `courseId`.
export const SELECTABLE_COURSES = [
  {
    id: 'sicilian-a1',
    icon: '🌋',
    title: 'Sitsiliya tili A1',
    description: "0 dan A1 darajasigacha sitsiliya tili kursi — har hafta so'z boyligi, grammatika, o'qish va tinglash birga o'tiladi.",
    level: 'beginner',
    language: 'it-IT',
    color: 'linear-gradient(135deg, #7C3AED 0%, #B7472A 100%)',
  },
  {
    id: 'greek-a1',
    icon: '🏛️',
    title: 'Yunon tili',
    description: "Yunon alifbosidan boshlab — mustaqil dastur: alifbo, so'z boyligi va grammatika boshqa kurslardan alohida o'tiladi.",
    level: 'beginner',
    language: 'el-GR',
    color: 'linear-gradient(135deg, #0D5EAF 0%, #1565C0 100%)',
    // Routed to its own /greek/:packId section (GreekLayout), not the
    // shared /course/:packId one — see Navbar's courseBasePath().
    basePath: '/greek',
  },
];
