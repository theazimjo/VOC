// Science pack: real printed page numbers from the source textbook
// (science.pdf), verified chapter-by-chapter against each chapter's opener
// page and the printed number on its final "Reviewing the Chapter" page.
const scienceRealRanges = {
  "Ch.01 · Green Plants": { start: 2, end: 25 },
  "Ch.02 · Invertebrates": { start: 26, end: 55 },
  "Ch.03 · Vertebrates": { start: 56, end: 79 },
  "Ch.04 · Living Communities": { start: 80, end: 109 },
  "Ch.05 · Building Blocks of Matter": { start: 110, end: 131 },
  "Ch.06 · Physical Changes in Matter": { start: 132, end: 153 },
  "Ch.07 · Understanding Electricity": { start: 154, end: 179 },
  "Ch.08 · Sources of Energy": { start: 180, end: 210 },
  "Ch.09 · Changes in the Earth": { start: 212, end: 235 },
  "Ch.10 · Cleaning Up the Earth": { start: 236, end: 257 },
  "Ch.11 · Changes in the Weather": { start: 258, end: 281 },
  "Ch.12 · Beyond the Solar System": { start: 282, end: 310 },
  "Ch.13 · Support and Movement of the Body": { start: 312, end: 333 },
  "Ch.14 · Transport Systems of the Body": { start: 334, end: 357 },
};

// Health pack: real printed page numbers from the source textbook
// (HEALTH.pdf), verified chapter-by-chapter against the "As you read, think
// about" opener on each chapter's first page and the "Chapter N <Title> NNN"
// footer on each chapter's final review page.
const healthRealRanges = {
  "H.Ch.01 · Choosing Wellness": { start: 1, end: 19 },
  "H.Ch.02 · Your Personality": { start: 23, end: 45 },
  "H.Ch.03 · Managing Stress": { start: 47, end: 67 },
  "H.Ch.04 · Understanding Mental Disorders": { start: 69, end: 91 },
  "H.Ch.05 · Developing Relationships": { start: 95, end: 117 },
  "H.Ch.06 · Marriage and Family": { start: 119, end: 141 },
  "H.Ch.07 · Personal Care": { start: 145, end: 169 },
  "H.Ch.08 · Food and Nutrition": { start: 171, end: 193 },
  "H.Ch.09 · A Healthy Diet": { start: 195, end: 215 },
  "H.Ch.10 · Fitness and Your Body Systems": { start: 217, end: 241 },
  "H.Ch.11 · Fitness and Your Life Style": { start: 243, end: 267 },
  "H.Ch.12 · Reproduction and Heredity": { start: 271, end: 295 },
  "H.Ch.13 · Birth and Parenthood": { start: 297, end: 319 },
  "H.Ch.14 · The Adolescent Years": { start: 321, end: 343 },
  "H.Ch.15 · Adulthood, Aging, and Death": { start: 345, end: 365 },
  "H.Ch.16 · Infectious Diseases": { start: 369, end: 387 },
  "H.Ch.17 · AIDS and Other Sexually Transmitted Diseases": { start: 389, end: 409 },
  "H.Ch.18 · Noninfectious Diseases and Physical Disabilities": { start: 411, end: 433 },
  "H.Ch.19 · Drug Use and Abuse": { start: 437, end: 463 },
  "H.Ch.20 · Alcohol": { start: 465, end: 487 },
  "H.Ch.21 · Tobacco and Your Health": { start: 489, end: 511 },
  "H.Ch.22 · A Healthy Environment": { start: 515, end: 533 },
  "H.Ch.23 · Choosing Health Care": { start: 535, end: 553 },
  "H.Ch.24 · Public Health": { start: 555, end: 571 },
  "H.Ch.25 · Personal Safety": { start: 575, end: 595 },
  "H.Ch.26 · First Aid": { start: 597, end: 623 },
};

const topicPageRanges = {
  ...scienceRealRanges,
  ...healthRealRanges,
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
