import { marketPacks } from './marketData';
import { IRREGULAR_VERB_GROUPS, getIrregularVerbGroup } from './irregularVerbGroups';
import { IRREGULAR_VERBS_PACK_ID } from './irregularVerbsId';

export { IRREGULAR_VERBS_PACK_ID };

const SOURCE = marketPacks.find((p) => p.id === IRREGULAR_VERBS_PACK_ID);
const SOURCE_WORDS = SOURCE?.words || [];

// Buckets every verb from the master list into its –ought/–aught, V2=V3,
// etc. set (irregularVerbGroups.js — the standard "14 sets" breakdown),
// giving each verb a stable id (its own text, globally unique across the
// whole list) instead of a positional index.
function buildUnits() {
  const byGroupId = new Map(
    IRREGULAR_VERB_GROUPS.map((g) => [g.id, { id: `g${g.id}`, title: g.title, pattern: g.pattern, words: [] }])
  );

  SOURCE_WORDS.forEach((verb) => {
    const group = getIrregularVerbGroup(verb.word);
    const bucket = byGroupId.get(group.id);
    if (bucket) bucket.words.push({ ...verb, id: verb.word });
  });

  return [...byGroupId.values()].filter((unit) => unit.words.length > 0);
}

export const IRREGULAR_VERBS_CORP_PACK = {
  id: IRREGULAR_VERBS_PACK_ID,
  title: SOURCE?.name || 'Irregular Verbs',
  description: SOURCE?.description || 'The complete set of English irregular verbs, organized into 14 sets.',
  level: 'Intermediate',
  language: 'en-US',
  isIrregularVerbs: true,
  wordCount: SOURCE_WORDS.length,
  months: [
    {
      id: 'm1',
      title: 'Irregular Verbs',
      units: buildUnits(),
    },
  ],
};
