// Landing copy, Uzbek (default), Russian and English. Claims here must stay true:
//  - "40+ learners" comes from README.md / PRODUCT.md (Evidence on Hand).
//  - Evidence numbers come from packages/memory-engine/eval/fit.js on the
//    2026-10-05 export (37,852 replayed predictions, 24 learners, 8 held out,
//    AUC 0.78 vs 0.50). Re-run `npm run fit:memory` and update them together
//    with the blog post "measured-not-guessed".
//  - Everything on the two boards is labelled sample data in the UI.

export const EVIDENCE = {
  predictions: '37 000',
  learners: 24,
  heldOut: 8,
  auc: 0.78,
  baselineAuc: 0.5,
};

export const EVIDENCE_POST = '/blog/measured-not-guessed';

export const WORDS = [
  { id: 'achieve', word: 'achieve', uz: 'erishmoq', stability: 16, elapsed: 1 },
  { id: 'fluent', word: 'fluent', uz: 'ravon', stability: 25, elapsed: 1 },
  { id: 'thorough', word: 'thorough', uz: 'puxta', stability: 10, elapsed: 2 },
  { id: 'consistent', word: 'consistent', uz: 'izchil', stability: 6, elapsed: 2 },
  { id: 'subtle', word: 'subtle', uz: 'nozik', stability: 3.7, elapsed: 2 },
  { id: 'reluctant', word: 'reluctant', uz: "istamaydigan", stability: 2.8, elapsed: 2 },
];

export const GROUP_ROWS = [
  { name: 'Madina', today: '24', status: 'done' },
  { name: 'Jasur', today: '12', status: 'done' },
  { name: 'Sevara', today: '0', status: 'none' },
  { name: 'Bekzod', today: '0', status: 'quiet' },
];

export const CONTENT = {
  en: {
    langLabel: 'Language',
    decimal: '.',
    nav: { how: 'How it works', evidence: 'Results', centers: 'For centers', faq: 'FAQ', blog: 'Blog', login: 'Log in', start: 'Get started' },
    hero: {
      title: 'Every word has its own time.',
      sub: 'VOC tracks every word separately, just for you, and brings it back when you are about to forget it.',
      primary: 'Start free',
      secondary: 'For learning centers',
      note: 'Beta version: more than 40 learners use it today.',
    },
    board: {
      title: "Today's review",
      sample: 'Sample data',
      day: 'Day',
      cols: { word: 'Word', recall: 'Recall', status: 'Status' },
      status: { good: 'GOOD', soon: 'SOON', due: 'REVIEW' },
      review: 'Review',
      advance: '+1 day',
      reset: 'Reset',
      foot: 'Each word fades at its own speed, and reviewing slows that down.',
      aria: 'Sample review board showing how words fade over time',
    },
    how: {
      title: 'The model learns from every answer.',
      lead: 'Instead of one schedule for every word, VOC looks at how each word is going for you.',
      steps: [
        { name: 'Answer', body: 'Every answer records how fast and how confidently you replied, and whether you typed it or picked an option.' },
        { name: 'Estimate', body: 'From that, the word’s earlier results with you and your overall accuracy, it works out the chance you can recall the word now.' },
        { name: 'Board', body: 'Words with a low chance go on the review list. Hard ones come back often, easy ones less.' },
      ],
    },
    evidence: {
      title: 'We measured how well it works.',
      lead: 'We tested the model on real review logs, on learners it had never seen.',
      baseline: 'The same average guess for everyone',
      model: 'VOC model',
      axis: 'How well it separates words you will forget from words you will remember (AUC): 0.5 is chance, 1 is perfect.',
      facts: [
        'More than 37,000 real reviews analysed.',
        '24 learners’ data; 8 of them were held out while the model was trained.',
      ],
      caveat: 'This is still an early result. As more learners join we will re-measure and update it here.',
      more: 'How we measured it is written up on the blog',
    },
    centers: {
      title: 'You set homework. You see who did it right away.',
      points: [
        'A teacher creates a group; students join with a QR code or a 6-digit code.',
        'The center owner sees weekly which groups are active and which went quiet.',
        'Students join with their personal account and keep their history after the course ends.',
      ],
      cta: 'Create your center',
      note: 'Free during the beta. Confirm your Gmail and you are in.',
      board: {
        title: 'Group status',
        cols: { student: 'Student', today: 'Today, words', status: 'Status' },
        status: { done: 'PRACTISED', none: 'NOT TODAY', quiet: '3 DAYS QUIET' },
        aria: 'Sample group status board',
      },
    },
    faq: {
      title: 'Questions',
      items: [
        { q: 'What does beta mean?', a: 'VOC is currently running as a beta. The core features work and learners are using it, but we are still improving it, so you may run into rough edges.' },
        { q: 'How is it different from other review apps?', a: 'Most apps apply one interval schedule to every word. VOC looks at each word on its own: from how it is going for you, it decides when to bring it back.' },
        { q: 'Does it work on a phone?', a: 'Yes. It runs in your phone browser, and if you add it to the home screen it opens like an app.' },
        { q: 'How is my data used?', a: 'Your answer history is stored in your account and used to compute your review schedule. To improve the model we may also analyse it in anonymised, aggregate form: names and emails are not part of that.' },
        { q: 'How does a learning center join?', a: 'For now our team onboards centers by hand. Then a teacher creates a group and students join with a QR code or a 6-digit code.' },
        { q: 'What happens when the course ends?', a: 'Your account and your word history stay with you, and you carry on in personal mode.' },
        { q: 'Which language does it teach?', a: 'English vocabulary and grammar. The interface is in Uzbek, with Russian and English also available.' },
      ],
    },
    close: { title: 'Add your first word today.', cta: 'Start free' },
    footer: { login: 'Log in', start: 'Get started', beta: 'Beta' },
  },
};
