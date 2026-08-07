// Classification taken from the standard "14 sets" breakdown of English
// irregular verbs, grouped by their V1->V2->V3 sound/spelling pattern.
// Ordered easiest → hardest: verbs that don't change at all come first,
// then verbs where only one form changes, then progressively more
// unpredictable patterns, ending with the fully irregular "special"/"core"
// verbs that just have to be memorized individually.
const GROUPS = [
  { id: 1, title: "Set 1", pattern: "All the same (V1 = V2 = V3)", verbs: ['put', 'quit', 'bet', 'cost', 'sweat', 'spread', 'let', 'broadcast', 'hit', 'hurt', 'read', 'set', 'shut', 'split', 'burst', 'cut', 'fit'] },
  { id: 2, title: "Set 2", pattern: "Ends in –t (V2 = V3)", verbs: ['dream', 'sleep', 'keep', 'deal', 'mean', 'leave', 'feel', 'sweep', 'bend', 'build', 'lend', 'lose', 'send', 'spend'] },
  { id: 3, title: "Set 3", pattern: "\"u\" sound (V2 = V3)", verbs: ['stick', 'dig', 'sting', 'swing', 'hang', 'strike'] },
  { id: 4, title: "Set 4", pattern: "Two forms (–ed / –t)", verbs: ['lean', 'dream', 'burn', 'smell', 'spell', 'spill', 'spoil'] },
  { id: 5, title: "Set 5", pattern: "V1 = V3 (become, come)", verbs: ['become', 'come'] },
  { id: 6, title: "Set 6", pattern: "Ends in –ought / –aught", verbs: ['think', 'catch', 'bring', 'buy', 'fight', 'teach', 'seek'] },
  { id: 7, title: "Set 7", pattern: "Ends in –orn", verbs: ['swear', 'tear', 'wear'] },
  { id: 8, title: "Set 8", pattern: "give, forgive", verbs: ['forgive', 'give'] },
  { id: 9, title: "Set 9", pattern: "i – a – u vowel shift", verbs: ['ring', 'sing', 'sink', 'drink', 'swim', 'begin', 'run'] },
  { id: 10, title: "Set 10", pattern: "i – a – u (more verbs)", verbs: ['stink', 'spring', 'shrink'] },
  { id: 11, title: "Set 11", pattern: "V2 \"o\" sound, V3 ends in –en", verbs: ['speak', 'choose', 'break', 'drive', 'freeze', 'steal', 'wake', 'write', 'rise', 'ride', 'beat'] },
  { id: 12, title: "Set 12", pattern: "V3 ends in –en / –own", verbs: ['bite', 'hide', 'forbid', 'forget', 'fall', 'get', 'eat', 'shake', 'take', 'blow', 'draw', 'fly', 'grow', 'know', 'show', 'sew', 'throw'] },
  { id: 13, title: "Set 13", pattern: "Special forms", verbs: ['feed', 'find', 'have', 'hear', 'hold', 'lay', 'lead', 'light', 'make', 'meet', 'pay', 'say', 'sell', 'shine', 'shoot', 'sit', 'stand', 'tell', 'understand', 'win'] },
  { id: 14, title: "Set 14", pattern: "Core verbs", verbs: ['be', 'do', 'go', 'see', 'lie'] },
];

const OTHER_GROUP = { id: 15, title: "Other", pattern: "Doesn't fit the main sets", verbs: [] };

const WORD_TO_GROUP = new Map();
for (const group of GROUPS) {
  for (const verb of group.verbs) {
    if (!WORD_TO_GROUP.has(verb)) WORD_TO_GROUP.set(verb, group);
  }
}

export function getIrregularVerbGroup(word) {
  const key = (word || '').trim().toLowerCase();
  return WORD_TO_GROUP.get(key) || OTHER_GROUP;
}

export const IRREGULAR_VERB_GROUPS = [...GROUPS, OTHER_GROUP];
