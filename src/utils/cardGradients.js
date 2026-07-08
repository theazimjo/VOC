// Vivid, deep-toned gradients shared by Cards Mode's SwipeCard and
// CardsDrill, so the same word always shows the same color as it moves
// between the two phases of a session.
export const CARD_GRADIENTS = [
  'linear-gradient(145deg, #FF5F6D 0%, #A7226E 100%)',
  'linear-gradient(145deg, #4E54C8 0%, #6C3EC9 100%)',
  'linear-gradient(145deg, #00B4DB 0%, #0083B0 100%)',
  'linear-gradient(145deg, #11998E 0%, #0B6E63 100%)',
  'linear-gradient(145deg, #F2994A 0%, #C0392B 100%)',
  'linear-gradient(145deg, #8E2DE2 0%, #4A00E0 100%)',
];

export function gradientForWord(id, fallbackIdx = 0) {
  if (!id) return CARD_GRADIENTS[fallbackIdx % CARD_GRADIENTS.length];
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return CARD_GRADIENTS[hash % CARD_GRADIENTS.length];
}
