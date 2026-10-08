// The market word bank is large (it is the biggest file in the app), so it is
// fetched on demand - never as part of the app's startup bundle.
let marketPromise = null;
export function loadMarketPacks() {
  if (!marketPromise) marketPromise = import('../data/marketData').then((m) => m.marketPacks);
  return marketPromise;
}

// Given a user's installed pack, find the Market pack it originated from —
// matched by marketPackId when available, falling back to name for packs
// installed before that field existed. `marketPacks` comes from loadMarketPacks().
export function findSourceMarketPack(pack, marketPacks) {
  if (!pack) return null;
  return marketPacks.find((mp) => mp.id === pack.marketPackId)
    || marketPacks.find((mp) => mp.name === pack.name);
}

// Words from a market pack that aren't yet present (by lowercased text) in
// the given list of existing words — i.e. what a stale installed copy is
// missing compared to the current Market content.
export function getMissingMarketWords(marketPack, existingWords) {
  if (!marketPack) return [];
  const existing = new Set(
    (existingWords || []).map((w) => (w.word || '').trim().toLowerCase())
  );
  return marketPack.words.filter((w) => !existing.has((w.word || '').trim().toLowerCase()));
}
