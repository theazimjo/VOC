// ─── WITCHER GAME ENGINE ─────────────────────────────────────────────────────
// Manages game state, 3 save slots + auto-save, story flags, consequences.

const SAVE_KEY = (slot) => `witcher_save_${slot}`;
const AUTO_KEY = 'witcher_autosave';
const SLOT_COUNT = 3;

export const DEFAULT_STATE = {
  version: '1.0',
  lastPlayed: null,
  currentEpisode: 'ep01',
  nodeIndex: 0,
  character: {
    level: 1,
    exp: 0,
    maxHp: 100,
    currentHp: 100,
    maxStamina: 100,
    currentStamina: 100,
    signCharges: 3,
    gold: 50,
    swordTier: 1,
  },
  inventory: {
    healthPotion: 2,
    staminaPotion: 1,
    curseIngredients: 0,
    questItems: [],
  },
  reputation: {
    villageElders: 0,
    sorcererGuild: 0,
    royalGuard: 0,
  },
  flags: {},
};

// ── Save / Load ───────────────────────────────────────────────────────────────

export function saveGame(slot, state) {
  const data = { ...state, lastPlayed: new Date().toISOString() };
  try {
    localStorage.setItem(SAVE_KEY(slot), JSON.stringify(data));
  } catch (e) {
    console.error('Save failed:', e);
  }
}

export function loadGame(slot) {
  try {
    const raw = localStorage.getItem(SAVE_KEY(slot));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function deleteSave(slot) {
  localStorage.removeItem(SAVE_KEY(slot));
}

export function autoSave(state) {
  try {
    localStorage.setItem(AUTO_KEY, JSON.stringify({ ...state, lastPlayed: new Date().toISOString() }));
  } catch (e) {
    console.error('Autosave failed:', e);
  }
}

export function loadAutoSave() {
  try {
    const raw = localStorage.getItem(AUTO_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function listSaves() {
  return Array.from({ length: SLOT_COUNT }, (_, i) => loadGame(i));
}

export function hasContinue() {
  return loadAutoSave() !== null || listSaves().some(Boolean);
}

export function getMostRecentSave() {
  const auto = loadAutoSave();
  const slots = listSaves().filter(Boolean);
  const all = [...(auto ? [auto] : []), ...slots];
  if (!all.length) return null;
  return all.sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed))[0];
}

// ── State Mutation ────────────────────────────────────────────────────────────

export function applyConsequences(state, consequences) {
  if (!consequences?.length) return state;
  let s = JSON.parse(JSON.stringify(state)); // deep clone

  for (const c of consequences) {
    switch (c.type) {
      case 'rep':
        s.reputation[c.faction] = (s.reputation[c.faction] ?? 0) + c.delta;
        break;
      case 'flag':
        s.flags[c.key] = c.value;
        break;
      case 'gold':
        s.character.gold = Math.max(0, (s.character.gold ?? 0) + c.delta);
        break;
      case 'item':
        s.inventory[c.key] = Math.max(0, (s.inventory[c.key] ?? 0) + c.delta);
        break;
      case 'hp':
        s.character.currentHp = Math.max(0, Math.min(s.character.maxHp, s.character.currentHp + c.delta));
        break;
      case 'combat_modifier':
        s.flags[`__cm_${c.key}`] = c.value;
        break;
      default:
        break;
    }
  }
  return s;
}

export function applyPostCombat(state, { goldEarned, hpLost }) {
  let s = JSON.parse(JSON.stringify(state));
  s.character.gold += goldEarned;
  s.character.currentHp = Math.max(1, s.character.currentHp - hpLost);
  s.character.currentStamina = s.character.maxStamina; // stamina refills after combat
  s.character.signCharges = 3; // charges refill after combat
  return s;
}

// ── Node Traversal ────────────────────────────────────────────────────────────

export function getNextValidIndex(nodes, fromIndex, flags) {
  let idx = fromIndex;
  while (idx < nodes.length) {
    const node = nodes[idx];
    if (!node.condition) return idx;
    const { flag, value } = node.condition;
    if (flags[flag] === value) return idx;
    idx++;
  }
  return -1; // end
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

export function episodeLabel(episodeId) {
  const n = parseInt(episodeId.replace('ep', ''), 10);
  return `Episode ${n}`;
}
