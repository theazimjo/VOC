const fs = require('fs');

const html = fs.readFileSync('D:/Projects/VOC/src/assets/data/Ch_all_health_beta_c3_by_apex_cb.html', 'utf8');
const script = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i)[1];
const idx = script.indexOf('const CHAPTERS');
const endIdx = script.indexOf('const savedTheme', idx);
const chStr = script.slice(idx, endIdx);

const titles = [...chStr.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Chapters in HTML (' + titles.length + '):');
titles.forEach((t, i) => console.log(`${i + 1}: ${t}`));
