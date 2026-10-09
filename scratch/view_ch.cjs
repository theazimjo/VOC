const fs = require('fs');
const content = fs.readFileSync('src/data/healthChapterText.js', 'utf8');

function showChapter(key, nextKey) {
  const start = content.indexOf(`"${key}"`);
  const end = nextKey ? content.indexOf(`"${nextKey}"`, start) : start + 3000;
  console.log(`=== ${key} === (length: ${end - start} chars)`);
  console.log(content.slice(start, Math.min(start + 800, end)));
  console.log('...\n');
}

showChapter('H.Ch.06 · Marriage and Family', 'H.Ch.07 · Personal Care');
showChapter('H.Ch.07 · Personal Care', 'H.Ch.08 · Food and Nutrition');
showChapter('H.Ch.08 · Food and Nutrition', 'H.Ch.09 · A Healthy Diet');
