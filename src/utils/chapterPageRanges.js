import { scienceChapterText } from '../data/scienceChapterText';
import { healthChapterText } from '../data/healthChapterText';

function computeRanges(chapterMap) {
  const map = {};
  let currentStart = 1;
  for (const [topic, data] of Object.entries(chapterMap || {})) {
    const pageCount = data?.pages?.length || 0;
    if (pageCount > 0) {
      const start = currentStart;
      const end = currentStart + pageCount - 1;
      map[topic] = { start, end, pageCount };
      currentStart = end + 1;
    }
  }
  return map;
}

const scienceRanges = computeRanges(scienceChapterText);
const healthRanges = computeRanges(healthChapterText);

const topicPageRanges = {
  ...scienceRanges,
  ...healthRanges,
};

export function getTopicPageRangeInfo(topic) {
  if (!topic) return null;
  return topicPageRanges[topic] || null;
}

export function formatPageRange(topic) {
  const info = getTopicPageRangeInfo(topic);
  if (!info) return '';
  const { start, end } = info;
  return `${start}–${end}`;
}
