import { grammarData } from '../src/data/grammarData.js';
import { getFormattedExplanation } from '../src/utils/grammarExplanationTranslator.js';

const uzExps = [];
Object.keys(grammarData).forEach(lvl => {
  grammarData[lvl].topics.forEach(t => {
    ['questions', 'fillBlanks', 'scrambled', 'errorCorrection', 'transform', 'dialogue'].forEach(key => {
      (t[key]||[]).forEach(q => {
        if (q.explanation && (
          q.explanation.includes('ishlatiladi') ||
          q.explanation.includes('kerak') ||
          q.explanation.includes('emas') ||
          q.explanation.includes('o\'rniga') ||
          q.explanation.includes('oʻrniga') ||
          q.explanation.includes('noaniqlik') ||
          q.explanation.includes('chunki') ||
          q.explanation.includes('bo\'ladi') ||
          q.explanation.includes('boʻladi') ||
          q.explanation.includes('shaxs') ||
          q.explanation.includes('vazifasida') ||
          q.explanation.includes('sabab') ||
          q.explanation.includes('joy') ||
          q.explanation.includes('vaqt')
        )) {
          uzExps.push(q.explanation);
        }
      });
    });
  });
});

const uniqueList = Array.from(new Set(uzExps));
console.log(`Found ${uniqueList.length} Uzbek explanations. Testing translations:`);

let untranslated = 0;
uniqueList.forEach(item => {
  const res = getFormattedExplanation(item, 'ru');
  const stillHasUzbek = /ishlatiladi|kerak|o'rniga|oʻrniga|emas|noaniqlik|chunki|bo'ladi|boʻladi|vazifasida|shaxs/i.test(res);
  if (stillHasUzbek) {
    untranslated++;
    console.log('UNTREATED:', item, '-->', res);
  }
});

console.log(`\nDone! Untranslated count: ${untranslated} / ${uniqueList.length}`);
