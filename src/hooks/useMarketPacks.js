import { useEffect, useState } from 'react';
import { loadMarketPacks } from '../utils/marketSync';

const NONE = [];

// The Market catalogue, loaded after the screen has painted. `enabled` lets a
// page wait (e.g. until its Market tab is the one being shown).
export function useMarketPacks(enabled = true) {
  const [packs, setPacks] = useState(NONE);
  useEffect(() => {
    if (!enabled || packs !== NONE) return undefined;
    let cancelled = false;
    // let the first paint happen before fetching ~1 MB of word data
    const timer = setTimeout(() => {
      loadMarketPacks().then((p) => { if (!cancelled) setPacks(p); });
    }, 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [enabled, packs]);
  return packs;
}
