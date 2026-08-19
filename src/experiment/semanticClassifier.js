/**
 * 🧬 Automatic Semantic & Grammatical Word Classifier
 *
 * Two layers, used together (see getWordCluster below):
 *  - classifyWord(): instant, offline, rule-based fallback. Checks topic
 *    keywords (whole-word, not substring) BEFORE part-of-speech suffixes,
 *    so a word like "hospital" lands in Health, not Adjectives just because
 *    it ends in "-al". Used the moment a word is reviewed, before any
 *    network classification has had a chance to run.
 *  - classifyWordSemantic(): real semantic classification via Datamuse's
 *    free, keyless "means like" endpoint (WordNet-derived distributional
 *    similarity - not a guess from spelling patterns). Async, so it's never
 *    called inline during a review; PacksContext runs it in the background
 *    for words that don't have a cluster cached yet and writes the result
 *    onto the word record, and getWordCluster() prefers that cached result
 *    once it exists.
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
  },
  {
    key: 'travel',
    name: 'Sayohat & Transport',
    icon: '✈️',
    keywords: [
      'travel', 'trip', 'journey', 'airport', 'flight', 'airplane', 'passport', 'ticket',
      'hotel', 'tourist', 'luggage', 'visa', 'train', 'station', 'map', 'vacation',
      'holiday', 'destination', 'border', 'road', 'car', 'bus', 'taxi'
    ],
    uzbekKeywords: ['sayohat', 'parvoz', 'chipta', 'mehmonxona', 'sayyoh', 'viza', 'poyezd', 'bekat', 'ta\'til', 'chegara']
  },
  {
    key: 'emotions',
    name: "His-tuyg'ular",
    icon: '😊',
    keywords: [
      'happy', 'sad', 'angry', 'afraid', 'love', 'hate', 'fear', 'joy', 'excited',
      'nervous', 'worried', 'proud', 'jealous', 'calm', 'upset', 'surprised',
      'disappointed', 'hope', 'feeling', 'emotion', 'anxious', 'relieved'
    ],
    uzbekKeywords: ['baxtli', 'xafa', 'jahl', "qo'rquv", 'sevgi', 'nafrat', 'xursand', 'hayajon', 'tashvish', 'umid']
  },
  {
    key: 'health',
    name: "Sog'liq & Tibbiyot",
    icon: '🩺',
    keywords: [
      'doctor', 'hospital', 'medicine', 'pain', 'sick', 'disease', 'health', 'patient',
      'nurse', 'treatment', 'symptom', 'injury', 'surgery', 'pill', 'clinic', 'vaccine',
      'fever', 'cough', 'headache', 'body', 'heart', 'blood'
    ],
    uzbekKeywords: ['shifokor', 'kasalxona', 'dori', 'kasallik', "sog'liq", 'bemor', 'hamshira', 'davolash', 'jarrohlik', 'isitma']
  },
  {
    key: 'education',
    name: "Ta'lim & O'qish",
    icon: '📚',
    keywords: [
      'school', 'teacher', 'student', 'class', 'lesson', 'exam', 'homework', 'university',
      'study', 'learn', 'education', 'grade', 'subject', 'degree', 'course', 'lecture',
      'classroom', 'knowledge', 'textbook', 'library'
    ],
    uzbekKeywords: ["maktab", "o'qituvchi", 'talaba', 'dars', 'imtihon', 'universitet', "o'qish", "ta'lim", 'kitob', 'bilim']
  },
  {
    key: 'family',
    name: 'Oila & Munosabatlar',
    icon: '👨‍👩‍👧',
    keywords: [
      'family', 'mother', 'father', 'sister', 'brother', 'parent', 'child', 'husband',
      'wife', 'friend', 'relative', 'marriage', 'wedding', 'son', 'daughter',
      'grandmother', 'grandfather', 'relationship', 'neighbor', 'baby'
    ],
    uzbekKeywords: ['oila', 'ona', 'ota', 'opa', 'aka', 'farzand', 'er', 'xotin', "do'st", 'qarindosh']
  },
  {
    key: 'clothing',
    name: 'Kiyim & Moda',
    icon: '👕',
    keywords: [
      'shirt', 'dress', 'shoes', 'hat', 'coat', 'jacket', 'pants', 'clothes', 'wear',
      'fashion', 'jeans', 'skirt', 'sock', 'glove', 'scarf', 'belt', 'button', 'fabric',
      'cotton', 'style'
    ],
    uzbekKeywords: ["ko'ylak", 'kiyim', 'poyabzal', 'shlyapa', 'kurtka', 'shim', 'moda', 'kamar']
  },
  {
    key: 'sports',
    name: 'Sport & Musobaqa',
    icon: '⚽',
    keywords: [
      'sport', 'football', 'game', 'team', 'player', 'ball', 'win', 'lose', 'race',
      'match', 'coach', 'exercise', 'gym', 'swim', 'run', 'jump', 'athlete',
      'competition', 'tournament', 'score'
    ],
    uzbekKeywords: ['sport', 'futbol', "o'yin", 'jamoa', "o'yinchi", "to'p", 'musobaqa', 'mashq', 'sportchi', 'poyga']
  },
  {
    key: 'weather',
    name: "Ob-havo & Iqlim",
    icon: '⛅',
    keywords: [
      'weather', 'rain', 'sun', 'snow', 'wind', 'cloud', 'storm', 'hot', 'cold', 'warm',
      'cool', 'temperature', 'climate', 'humid', 'fog', 'thunder', 'lightning',
      'forecast', 'sunny', 'rainy'
    ],
    uzbekKeywords: ['ob-havo', "yomg'ir", 'quyosh', 'qor', 'shamol', 'bulut', "bo'ron", 'issiq', 'sovuq', 'iqlim']
  },
  {
    key: 'home',
    name: 'Uy & Ro\'zg\'or',
    icon: '🏠',
    keywords: [
      'house', 'home', 'room', 'kitchen', 'table', 'chair', 'bed', 'door', 'window',
      'wall', 'floor', 'roof', 'furniture', 'garden', 'garage', 'key', 'lamp',
      'curtain', 'sofa', 'apartment'
    ],
    uzbekKeywords: ['uy', 'xona', 'oshxona', 'stol', 'stul', 'karavot', 'eshik', 'deraza', 'mebel', 'kvartira']
  },
  {
    key: 'money',
    name: 'Pul & Xarid',
    icon: '💰',
    keywords: [
      'money', 'buy', 'sell', 'shop', 'store', 'price', 'discount', 'pay', 'cash',
      'credit', 'expensive', 'cheap', 'purchase', 'receipt', 'wallet', 'coin', 'bill',
      'budget', 'save', 'spend'
    ],
    uzbekKeywords: ['pul', 'xarid', "do'kon", 'narx', 'chegirma', 'naqd', 'qimmat', 'arzon', "cheki", 'byudjet']
  }
];

// Whole-word membership sets, built once. Fixes the old bug where the
// 'animals' topic's "cat" keyword matched inside "vacation"/"category", or
// 'food's "eat" matched inside "great"/"wheat" — TOPIC_CLUSTERS.keywords are
// meant to match a whole word, never a substring.
const TOPIC_KEYWORD_SETS = TOPIC_CLUSTERS.map(topic => ({
  ...topic,
  keywordSet: new Set(topic.keywords),
  uzbekKeywordSet: new Set(topic.uzbekKeywords),
}));

const POS_BUCKETS = {
  verbs: { key: 'pos_verbs', name: "Fe'llar (Action Verbs)", icon: '⚡' },
  adjectives: { key: 'pos_adjectives', name: 'Sifatlar (Adjectives)', icon: '🎨' },
  adverbs: { key: 'pos_adverbs', name: 'Ravishlar (Adverbs)', icon: '🚀' },
  nouns: { key: 'pos_nouns', name: 'Otlar & Tushunchalar', icon: '💎' },
};

function tokenize(text) {
  return (text.match(/[a-z']+/gi) || []).map(t => t.toLowerCase());
}

/**
 * Classify a word into a semantic cluster based on English word + Uzbek
 * translation. Instant and offline (no network) — the same-frame fallback
 * used until classifyWordSemantic() has had a chance to classify a word for
 * real; see the module doc comment above and getWordCluster() below.
 *
 * @param {string} word - English word
 * @param {string} translation - Uzbek translation
 * @returns {{ key: string, name: string, icon: string }}
 */
export function classifyWord(word = '', translation = '') {
  const wTokens = tokenize(word);
  const trTokens = tokenize(translation);

  // 1. Topic keywords, whole-word — checked BEFORE part-of-speech suffixes,
  // so e.g. "hospital" lands in Health instead of Adjectives just because
  // it happens to end in "-al" (see file header for why this order matters).
  for (const topic of TOPIC_KEYWORD_SETS) {
    if (wTokens.some(t => topic.keywordSet.has(t)) || trTokens.some(t => topic.uzbekKeywordSet.has(t))) {
      return { key: topic.key, name: topic.name, icon: topic.icon };
    }
  }

  const w = word.trim().toLowerCase();
  const tr = translation.trim().toLowerCase();

  // 2. Action Verbs (Fe'llar)
  if (
    w.startsWith('to ') ||
    tr.endsWith('moq') ||
    tr.endsWith('ish') ||
    w.endsWith('ize') ||
    w.endsWith('ise') ||
    w.endsWith('ate') ||
    w.endsWith('fy')
  ) {
    return POS_BUCKETS.verbs;
  }

  // 3. Adjectives (Sifatlar / Tasviriy)
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
    return POS_BUCKETS.adjectives;
  }

  // 4. Adverbs (Ravishlar)
  if (w.endsWith('ly')) {
    return POS_BUCKETS.adverbs;
  }

  // 5. Default: Otlar & Tushunchalar (General Nouns)
  return POS_BUCKETS.nouns;
}

const DATAMUSE_ENDPOINT = 'https://api.datamuse.com/words';

/**
 * Real semantic classification via Datamuse's free, keyless "means like"
 * endpoint (WordNet-derived distributional similarity — not a spelling
 * guess). Scores are RANK-weighted, not raw-score-weighted: Datamuse's raw
 * scores aren't comparable across different queries, so the closest related
 * word gets the most weight (results.length) and it decays by 1 per rank,
 * rather than letting one lucky top hit's huge raw score dominate.
 *
 * Never call this inline during a review — it's a network call. It's meant
 * to run in the background (see PacksContext) and have its result cached
 * onto the word record, which getWordCluster() then reads.
 *
 * @param {string} word
 * @returns {Promise<{key: string, name: string, icon: string} | null>} null
 *   on any network failure, or if nothing came back close enough to place
 *   the word confidently in a topic or part-of-speech bucket.
 */
export async function classifyWordSemantic(word = '') {
  const w = word.trim();
  if (!w) return null;

  let related;
  try {
    const res = await fetch(`${DATAMUSE_ENDPOINT}?ml=${encodeURIComponent(w)}&max=25`);
    if (!res.ok) return null;
    related = await res.json();
  } catch {
    return null;
  }
  if (!Array.isArray(related) || related.length === 0) return null;

  const topicScores = new Map();
  const posVotes = { v: 0, adj: 0, adv: 0, n: 0 };

  related.forEach((item, i) => {
    const weight = related.length - i;
    const tokens = tokenize(item.word || '');
    for (const topic of TOPIC_KEYWORD_SETS) {
      if (tokens.some(t => topic.keywordSet.has(t))) {
        topicScores.set(topic.key, (topicScores.get(topic.key) || 0) + weight);
      }
    }
    const tags = item.tags || [];
    if (tags.includes('v')) posVotes.v += weight;
    if (tags.includes('adj')) posVotes.adj += weight;
    if (tags.includes('adv')) posVotes.adv += weight;
    if (tags.includes('n')) posVotes.n += weight;
  });

  let bestTopicKey = null;
  let bestTopicScore = 0;
  topicScores.forEach((score, key) => {
    if (score > bestTopicScore) { bestTopicScore = score; bestTopicKey = key; }
  });

  // Require a real cluster of related-word matches (roughly 2-3 solid hits,
  // or one very top-ranked one), not a single coincidental match, before
  // trusting a topic over the more conservative part-of-speech fallback.
  if (bestTopicKey && bestTopicScore >= 15) {
    const topic = TOPIC_CLUSTERS.find(t => t.key === bestTopicKey);
    if (topic) return { key: topic.key, name: topic.name, icon: topic.icon };
  }

  const topPos = Object.entries(posVotes).sort((a, b) => b[1] - a[1])[0];
  if (topPos && topPos[1] > 0) {
    const posKeyMap = { v: 'verbs', adj: 'adjectives', adv: 'adverbs', n: 'nouns' };
    return POS_BUCKETS[posKeyMap[topPos[0]]];
  }

  return null;
}

/**
 * Resolve the best available cluster for a word record, in priority order:
 *  1. A curated `topic` field (market packs like IELTS/Science set this by
 *     hand — real, zero-cost ground truth, always trusted first).
 *  2. A cached `clusterKey`/`clusterName`/`clusterIcon` — written once onto
 *     the word record by PacksContext's background classifyWordSemantic()
 *     pass, so it's re-read here for free on every later call.
 *  3. classifyWord()'s instant offline heuristic, for a word nothing has
 *     classified yet (the background pass hasn't reached it, or is still
 *     mid-flight) — never leaves a word with no cluster at all.
 *
 * @param {{word?: string, translation?: string, topic?: string, clusterKey?: string, clusterName?: string, clusterIcon?: string}} wordRecord
 * @returns {{ key: string, name: string, icon: string }}
 */
export function getWordCluster(wordRecord = {}) {
  if (wordRecord.topic) {
    return { key: `topic_${wordRecord.topic}`, name: wordRecord.topic, icon: '🏷️' };
  }
  if (wordRecord.clusterKey) {
    return {
      key: wordRecord.clusterKey,
      name: wordRecord.clusterName || wordRecord.clusterKey,
      icon: wordRecord.clusterIcon || '💎',
    };
  }
  return classifyWord(wordRecord.word, wordRecord.translation);
}
