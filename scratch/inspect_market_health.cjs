const fs = require('fs');

const marketText = fs.readFileSync('D:/Projects/VOC/src/data/marketData.js', 'utf8');
const topics = [...marketText.matchAll(/topic:\s*['"](H\.Ch\.[^'"]+)['"]/g)].map(m => m[1]);
const uniqueTopics = [...new Set(topics)];
console.log('Unique Health topics in marketData.js (' + uniqueTopics.length + '):');
uniqueTopics.forEach(t => console.log(t));
