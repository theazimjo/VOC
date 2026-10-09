const fs = require('fs');

const marketText = fs.readFileSync('D:/Projects/VOC/src/data/marketData.js', 'utf8');
const counts = {};
for (let m of marketText.matchAll(/topic:\s*['"](H\.Ch\.[^'"]+)['"]/g)) {
  counts[m[1]] = (counts[m[1]] || 0) + 1;
}
console.log(JSON.stringify(counts, null, 2));
