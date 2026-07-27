/**
 * 🧬 Automatic Semantic & Grammatical Word Classifier
 *
 * Automatically categorizes English words into semantic/POS clusters
 * using linguistic patterns, Uzbek suffixes, and topic keyword maps.
 */

// Topic keyword dictionaries
const TOPIC_CLUSTERS = [
  {
    key: 'animals',
    name: 'Hayvonlar & Tabiat',
    icon: '🦁',
    keywords: [
      'dog', 'cat', 'bird', 'fish', 'animal', 'horse', 'wolf', 'lion', 'bear', 'tiger',
      'elephant', 'monkey', 'snake', 'rabbit', 'duck', 'cow', 'sheep', 'pig', 'fox',
      'deer', 'eagle', 'tree', 'plant', 'flower', 'forest', 'nature', 'river', 'sea', 'ocean'
    ],
    uzbekKeywords: ['it', 'mushuk', 'qush', 'baliq', 'hayvon', 'ot', 'bo\'ri', 'sher', 'ayiq', 'daraxt', 'tabiat']
  },
  {
    key: 'tech',
    name: 'Texnologiya & IT',
    icon: '💻',
    keywords: [
      'code', 'data', 'system', 'app', 'software', 'network', 'tech', 'web', 'computer',
      'phone', 'screen', 'file', 'server', 'digital', 'algorithm', 'cloud', 'user', 'device'
    ],
    uzbekKeywords: ['tizim', 'dastur', 'tarmoq', 'raqamli', 'kompyuter', 'kod', 'algoritm']
  },
  {
    key: 'business',
    name: 'Biznes & Moliya',
    icon: '💼',
    keywords: [
      'money', 'pay', 'bank', 'price', 'cost', 'market', 'trade', 'business', 'company',
      'profit', 'sale', 'tax', 'finance', 'boss', 'office', 'contract', 'job', 'work', 'customer'
    ],
    uzbekKeywords: ['pudrat', 'pul', 'bank', 'narx', 'bozor', 'biznes', 'kompaniya', 'foyda', 'soliq', 'ish']
  },
  {
    key: 'food',
    name: 'Taomlar & Ichimliklar',
    icon: '🍎',
    keywords: [
      'apple', 'food', 'eat', 'drink', 'water', 'bread', 'meat', 'fruit', 'vegetable',
      'milk', 'coffee', 'tea', 'sugar', 'salt', 'cook', 'restaurant', 'dinner', 'lunch'
    ],
    uzbekKeywords: ['olma', 'ovqat', 'ichimlik', 'suv', 'non', 'go\'sht', 'meva', 'choy', 'kofe', 'tuz']
  },
  {
    key: 'time',
    name: 'Vaqt & Harakat',
    icon: '⏰',
    keywords: [
      'time', 'day', 'night', 'week', 'month', 'year', 'hour', 'minute', 'today',
      'tomorrow', 'yesterday', 'future', 'past', 'clock', 'season', 'summer', 'winter'
    ],
    uzbekKeywords: ['vaqt', 'kun', 'tungi', 'hafta', 'oy', 'yil', 'soat', 'bugun', 'ertaga', 'kecha']
  }
];

/**
 * Classify a word into a semantic cluster based on English word + Uzbek translation.
 *
 * @param {string} word - English word
 * @param {string} translation - Uzbek translation
 * @param {string} [packName] - Optional user pack name
 * @returns {{ key: string, name: string, icon: string }}
 */
export function classifyWord(word = '', translation = '', packName = '') {
  const w = word.trim().toLowerCase();
  const tr = translation.trim().toLowerCase();
  const pName = (packName || '').trim();

  // 1. If packName is specific (not 'General' or 'Kutubxona'), use user's pack
  if (pName && pName !== 'Kutubxona' && pName !== 'General' && pName !== 'To\'plam') {
    return {
      key: `pack_${pName.toLowerCase().replace(/\s+/g, '_')}`,
      name: pName,
      icon: '📦',
    };
  }

  // 2. Check Action Verbs (Fe'llar)
  if (
    w.startsWith('to ') ||
    tr.endsWith('moq') ||
    tr.endsWith('ish') ||
    w.endsWith('ize') ||
    w.endsWith('ise') ||
    w.endsWith('ate') ||
    w.endsWith('fy')
  ) {
    return { key: 'pos_verbs', name: 'Fe\'llar (Action Verbs)', icon: '⚡' };
  }

  // 3. Check Adjectives (Sifatlar / Tasviriy)
  if (
    w.endsWith('ful') ||
    w.endsWith('able') ||
    w.endsWith('ible') ||
    w.endsWith('ous') ||
    w.endsWith('ive') ||
    w.endsWith('less') ||
    w.endsWith('ic') ||
    w.endsWith('al') ||
    w.endsWith('ent') ||
    w.endsWith('ant') ||
    tr.endsWith('li') ||
    tr.endsWith('siz')
  ) {
    return { key: 'pos_adjectives', name: 'Sifatlar (Adjectives)', icon: '🎨' };
  }

  // 4. Check Adverbs (Ravishlar)
  if (w.endsWith('ly')) {
    return { key: 'pos_adverbs', name: 'Ravishlar (Adverbs)', icon: '🚀' };
  }

  // 5. Check Topic Keywords
  for (const topic of TOPIC_CLUSTERS) {
    if (
      topic.keywords.some(kw => w.includes(kw)) ||
      topic.uzbekKeywords.some(ukw => tr.includes(ukw))
    ) {
      return { key: topic.key, name: topic.name, icon: topic.icon };
    }
  }

  // 6. Default: Otlar & Tushunchalar (General Nouns)
  return { key: 'pos_nouns', name: 'Otlar & Tushunchalar', icon: '💎' };
}
