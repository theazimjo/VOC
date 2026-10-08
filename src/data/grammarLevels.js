// Grammar levels are big (each holds every guide and exercise), so they are
// fetched one at a time, only when a topic of that level is opened.
const LOADERS = {
  beginner: () => import('./grammar/beginner.js').then((m) => m.beginnerData),
  intermediate: () => import('./grammar/intermediate.js').then((m) => m.intermediateData),
  advanced: () => import('./grammar/advanced.js').then((m) => m.advancedData),
  upper: () => import('./grammar/upper.js').then((m) => m.upperData),
};

export const GRAMMAR_LEVEL_IDS = Object.keys(LOADERS);

const promises = {};
const loaded = {};

export function loadGrammarLevel(level) {
  const load = LOADERS[level];
  if (!load) return Promise.resolve(null);
  if (!promises[level]) {
    promises[level] = load().then((data) => {
      loaded[level] = data;
      return data;
    });
  }
  return promises[level];
}

export const loadAllGrammarLevels = () => Promise.all(GRAMMAR_LEVEL_IDS.map(loadGrammarLevel));

// Levels that have finished loading (synchronous read for render code).
export const getLoadedGrammar = () => loaded;
