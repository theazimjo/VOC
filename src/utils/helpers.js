/**
 * Utility / helper functions
 */

import { getDecayedMastery } from './memoryEngine';
import { IRREGULAR_VERBS_PACK_ID } from '../data/irregularVerbsCorpPack';

/**
 * Shuffle an array (Fisher-Yates algorithm)
 */
export function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Weighted word selection — harder/less-known words appear more often.
 *
 * Weight formula (higher = more likely to be selected):
 *   - mastery 0–5:      (6 - mastery)  → range 6..1
 *   - stability 0–3+:   (3 - stability) → lower stability (weaker memory) = higher weight
 *   - overdue nextReview: words whose review date has passed get a +2 bonus
 *
 * If count >= words.length (or count === 'all'), every word is included once
 * but the ORDER is still weighted (hardest first).
 *
 * @param {Array}        words  - full word list
 * @param {number|'all'} count  - how many words to pick
 * @returns {Array}             - selected words (shuffled within equal-weight tiers)
 */
export function weightedSelectWords(words, count) {
  if (!words || words.length === 0) return [];

  const now = Date.now();

  const weighted = words.map(w => {
    const mastery     = getDecayedMastery(w, now);
    const stability    = typeof w.stability === 'number' ? w.stability : 1.0;
    const nextReview  = w.nextReview ? new Date(w.nextReview).getTime() : 0;
    const isOverdue   = nextReview > 0 && nextReview <= now;
    const wrongCount  = typeof w.wrongCount === 'number' ? w.wrongCount : 0;

    // Convert mastery percentage (0-100) to a weight contribution
    // mastery = 0 (new) gives high weight (6)
    // mastery = 100 (mastered) gives low weight (0)
    const masteryWeight = ((100 - mastery) / 100) * 6;

    // Higher weight = harder / less-known word / more mistakes
    const weight =
      masteryWeight                          // 6 (new) … 0 (mastered)
      + Math.max(0, 3 - Math.min(stability, 3)) // 0 … 3 (weaker memory = higher weight)
      + (isOverdue ? 2 : 0)                  // overdue bonus
      + (wrongCount * 3);                    // mistake weight boost: +3 per mistake!

    return { word: w, weight };
  });

  const total = count === 'all' ? words.length : Math.min(Number(count), words.length);

  // Weighted sampling WITHOUT replacement
  const pool = [...weighted];
  const selected = [];

  while (selected.length < total && pool.length > 0) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    
    // Safety check: if all weights are zero or negative, pick uniformly
    if (totalWeight <= 0) {
      const chosenIdx = Math.floor(Math.random() * pool.length);
      selected.push(pool[chosenIdx].word);
      pool.splice(chosenIdx, 1);
      continue;
    }

    let rand = Math.random() * totalWeight;
    let chosenIdx = pool.length - 1; // fallback

    for (let i = 0; i < pool.length; i++) {
      rand -= pool[i].weight;
      if (rand <= 0) {
        chosenIdx = i;
        break;
      }
    }

    selected.push(pool[chosenIdx].word);
    pool.splice(chosenIdx, 1);
  }

  return selected;
}

// Spelling (type the translation's English word from the scrambled letters)
// and Sentence Builder (recall the English word from memory to use it in a
// sentence) both require the learner to already have *some* trace of the
// word — the English form is never shown up front, only revealed after
// answering. A word with zero prior reviews has no trace to draw on, so
// picking it here is just an unwinnable guess, not practice.
const RECALL_ONLY_MODES = new Set(['spelling', 'sentence']);

/**
 * Narrow a word pool to what's actually appropriate for the chosen practice
 * mode, before weightedSelectWords ranks it. Flashcard/Quiz/Match/Pronounce
 * all show (or speak) the word itself, so they're fine introducing a
 * brand-new word — that's how first exposure happens. Spelling/Sentence
 * don't, so they're restricted to words that have been reviewed at least
 * once already (falls back to the full pool if literally nothing has been
 * reviewed yet, rather than leaving the user with an empty session).
 *
 * @param {Array<Object>} words
 * @param {string} mode - a PracticeHub mode id
 * @returns {Array<Object>}
 */
export function filterWordsForMode(words, mode) {
  if (!words || !RECALL_ONLY_MODES.has(mode)) return words;
  const seen = words.filter(w => (w.reviewCount || 0) > 0);
  return seen.length > 0 ? seen : words;
}

/**
 * Minimum word count each PracticeHub mode actually needs to function
 * correctly — Quiz needs 3 wrong distractors, Match needs at least 2 pairs.
 * Below this, the mode either can't render properly (Quiz falls back to fake
 * "Variant N" placeholder options) or is trivial (Match with 1 pair).
 */
export const PRACTICE_MODE_MIN_WORDS = {
  flashcard: 1,
  spelling: 3,
  match: 4,
  quiz: 4,
  pronounce: 1,
  sentence: 1,
  speed: 4,
  gridmatch: 6,
  'irregular-verbs': 1,
  'ielts-trainer': 3,
  'english-trainer': 3,
};

/**
 * Corp practice normally scopes per-word progress to one specific
 * (pack, month, unit) triple — `${packId}_${monthId}_${unitId}` — since a
 * regular pack's words are only guaranteed unique *within* their own unit.
 * The canonical Irregular Verbs pack is the one exception: every verb's id
 * is its own (globally unique) text, so it's safe — and required — to store
 * its mastery under one flat key instead. That's what makes "1-guruh" vs
 * "2-guruh" vs a completely different group/center all update the exact
 * same record for a given verb, instead of each keeping independent progress.
 */
export function corpWordStorageId(packId, monthId, unitId) {
  return packId === IRREGULAR_VERBS_PACK_ID ? packId : `${packId}_${monthId}_${unitId}`;
}

/**
 * Format date for display
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Bugun';
  if (days === 1) return 'Kecha';
  if (days < 7) return `${days} kun oldin`;
  if (days < 30) return `${Math.floor(days / 7)} hafta oldin`;
  if (days < 365) return `${Math.floor(days / 30)} oy oldin`;
  return date.toLocaleDateString('uz-UZ');
}

/**
 * Format relative time for next review
 */
export function formatNextReview(dateStr) {
  if (!dateStr) return "Hozir takrorlang";
  const date = new Date(dateStr);
  const now = new Date();
  const diff = date - now;
  
  if (diff <= 0) return "Hozir takrorlang";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (hours < 1) return "1 soatdan kam";
  if (hours < 24) return `${hours} soatdan keyin`;
  if (days === 1) return "Ertaga";
  if (days < 7) return `${days} kundan keyin`;
  if (days < 30) return `${Math.floor(days / 7)} haftadan keyin`;
  if (days < 365) return `${Math.floor(days / 30)} oydan keyin`;
  return "1 yildan keyin";
}

/**
 * Generate a random pastel color
 */
export function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 60%)`;
}

/**
 * Predefined book cover colors
 */
export const bookColors = [
  'linear-gradient(135deg, hsl(265, 80%, 55%), hsl(290, 80%, 45%))',
  'linear-gradient(135deg, hsl(200, 80%, 50%), hsl(220, 80%, 40%))',
  'linear-gradient(135deg, hsl(170, 70%, 45%), hsl(190, 80%, 35%))',
  'linear-gradient(135deg, hsl(340, 80%, 55%), hsl(10, 80%, 50%))',
  'linear-gradient(135deg, hsl(30, 80%, 55%), hsl(50, 80%, 50%))',
  'linear-gradient(135deg, hsl(140, 70%, 45%), hsl(160, 70%, 40%))',
  'linear-gradient(135deg, hsl(280, 70%, 55%), hsl(200, 70%, 50%))',
  'linear-gradient(135deg, hsl(350, 70%, 55%), hsl(280, 70%, 50%))',
];

/**
 * Predefined pack icons
 */
export const packIcons = ['📦', '🎯', '💼', '🌍', '🎓', '💡', '🔬', '🎨', '🏋️', '✈️', '🍔', '🎮', '📰', '🎬', '🎵', '⚽'];

/**
 * Part of speech options
 */
export const partOfSpeechOptions = [
  { value: 'noun', label: 'Noun (ot)' },
  { value: 'verb', label: 'Verb (fe\'l)' },
  { value: 'adjective', label: 'Adjective (sifat)' },
  { value: 'adverb', label: 'Adverb (ravish)' },
  { value: 'preposition', label: 'Preposition' },
  { value: 'conjunction', label: 'Conjunction' },
  { value: 'pronoun', label: 'Pronoun (olmosh)' },
  { value: 'interjection', label: 'Interjection' },
  { value: 'phrase', label: 'Phrase (ibora)' },
  { value: 'idiom', label: 'Idiom' },
];

/**
 * Languages available for a pack's pronunciation (Web Speech API locales).
 * A pack's `language` drives which voice/accent is used when speaking its
 * words during practice — set once per pack, defaults to English.
 */
export const speechLanguages = [
  { code: 'en-US', label: 'English', flag: '🇬🇧' },
  { code: 'es-ES', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', label: 'French', flag: '🇫🇷' },
  { code: 'de-DE', label: 'German', flag: '🇩🇪' },
  { code: 'it-IT', label: 'Italian', flag: '🇮🇹' },
  { code: 'pt-PT', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru-RU', label: 'Russian', flag: '🇷🇺' },
  { code: 'tr-TR', label: 'Turkish', flag: '🇹🇷' },
  { code: 'ar-SA', label: 'Arabic', flag: '🇸🇦' },
  { code: 'zh-CN', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ja-JP', label: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', label: 'Korean', flag: '🇰🇷' },
  { code: 'uz-UZ', label: 'Uzbek', flag: '🇺🇿' },
];

/**
 * Level options for packs
 */
export const levelOptions = [
  { value: 'beginner', label: '🌱 Boshlang\'ich', color: 'var(--success)' },
  { value: 'elementary', label: '📗 Elementar', color: 'var(--accent-3)' },
  { value: 'intermediate', label: '📘 O\'rta', color: 'var(--accent-2)' },
  { value: 'upper', label: '📕 Yuqori o\'rta', color: 'var(--accent-1)' },
  { value: 'advanced', label: '🏆 Ilg\'or', color: 'var(--warning)' },
];

/**
 * Generate a unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Speaks text using Web Speech API (SpeechSynthesis)
 */
export function speakWord(text, lang = 'en-US') {
  if (!text) return;
  if ('speechSynthesis' in window) {
    // Cancel any current utterances playing
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    
    // Find matching voice if possible
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang));
    if (voice) {
      utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech Synthesis not supported in this browser.");
  }
}

