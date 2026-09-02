// Shared by both the one-time audio-generation script (see git history /
// scratch scripts) and the runtime quiz components: decides whether a quiz
// option or scrambled-sentence answer is "pure enough" Greek to speak, and
// what exact substring to speak.
//
// Some option strings deliberately mix a Greek word with its Uzbek gloss
// for readability (e.g. "Σπίτι (uy)") — only the part before the
// parenthetical is speakable. Others are mostly-Uzbek explanatory text that
// merely *mentions* a Greek letter/word (e.g. "Birlikda -ς qo'shiladi",
// "γράφω bilan bir xil qolipda") — these must NOT get a speak button, since
// reading the Uzbek portion through a Greek voice produces gibberish.
const GREEK_RE = /[Ͱ-Ͽἀ-῿]/;
const LATIN_LETTER_RE = /[a-zA-Z]/;

export function extractGreekSpeakable(text) {
  if (!text) return null;
  const beforeParen = text.split('(')[0].trim().replace(/^["']+|["']+$/g, '');
  if (!beforeParen) return null;
  if (LATIN_LETTER_RE.test(beforeParen)) return null;
  if (!GREEK_RE.test(beforeParen)) return null;
  return beforeParen;
}
