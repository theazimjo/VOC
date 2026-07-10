// Classification taken from the standard Uzbek-textbook "14 guruh" breakdown
// of English irregular verbs, grouped by their V1->V2->V3 sound pattern.
const GROUPS = [
  { id: 1, title: "1-guruh", pattern: "–ought / –aught bilan tugaydi", verbs: ['think', 'catch', 'bring', 'buy', 'fight', 'teach', 'seek'] },
  { id: 2, title: "2-guruh", pattern: "–t bilan tugaydi (V2 = V3)", verbs: ['dream', 'sleep', 'keep', 'deal', 'mean', 'leave', 'feel', 'sweep', 'bend', 'build', 'lend', 'lose', 'send', 'spend'] },
  { id: 3, title: "3-guruh", pattern: "\"u\" tovushi (V2 = V3)", verbs: ['stick', 'dig', 'sting', 'swing', 'hang', 'strike'] },
  { id: 4, title: "4-guruh", pattern: "hammasi bir xil (V1 = V2 = V3)", verbs: ['put', 'quit', 'bet', 'cost', 'sweat', 'spread', 'let', 'broadcast', 'hit', 'hurt', 'read', 'set', 'shut', 'split', 'burst', 'cut', 'fit'] },
  { id: 5, title: "5-guruh", pattern: "i – a – u tovush almashinuvi", verbs: ['ring', 'sing', 'sink', 'drink', 'swim', 'begin', 'run'] },
  { id: 6, title: "6-guruh", pattern: "i – a – u (qo'shimcha)", verbs: ['stink', 'spring', 'shrink'] },
  { id: 7, title: "7-guruh", pattern: "V2 \"o\" tovushi, V3 –en/–en", verbs: ['speak', 'choose', 'break', 'drive', 'freeze', 'steal', 'wake', 'write', 'rise', 'ride', 'beat'] },
  { id: 8, title: "8-guruh", pattern: "V3 –en / –own bilan tugaydi", verbs: ['bite', 'hide', 'forbid', 'forget', 'fall', 'get', 'eat', 'shake', 'take', 'blow', 'draw', 'fly', 'grow', 'know', 'show', 'sew', 'throw'] },
  { id: 9, title: "9-guruh", pattern: "V1 = V3 (become, come)", verbs: ['become', 'come'] },
  { id: 10, title: "10-guruh", pattern: "Alohida shakllar", verbs: ['feed', 'find', 'have', 'hear', 'hold', 'lay', 'lead', 'light', 'make', 'meet', 'pay', 'say', 'sell', 'shine', 'shoot', 'sit', 'stand', 'tell', 'understand', 'win'] },
  { id: 11, title: "11-guruh", pattern: "Asosiy fe'llar", verbs: ['be', 'do', 'go', 'see', 'lie'] },
  { id: 12, title: "12-guruh", pattern: "give, forgive", verbs: ['forgive', 'give'] },
  { id: 13, title: "13-guruh", pattern: "–orn bilan tugaydi", verbs: ['swear', 'tear', 'wear'] },
  { id: 14, title: "14-guruh", pattern: "Ikki xil shakl (–ed / –t)", verbs: ['lean', 'dream', 'burn', 'smell', 'spell', 'spill', 'spoil'] },
];

const OTHER_GROUP = { id: 15, title: "Boshqa", pattern: "Asosiy guruhlarga kirmagan", verbs: [] };

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
