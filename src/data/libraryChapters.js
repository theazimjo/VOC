// Chapter keys of the library books that have a text to read (Science, Health).
// Tiny on purpose: the texts themselves are big and load only when a chapter
// is opened (see components/corp/ChapterReader.jsx). Regenerate if chapters change.
export const LIBRARY_CHAPTERS = {
  science: ["Ch.01 · Green Plants","Ch.02 · Invertebrates","Ch.03 · Vertebrates","Ch.04 · Living Communities","Ch.05 · Building Blocks of Matter","Ch.06 · Physical Changes in Matter","Ch.07 · Understanding Electricity","Ch.08 · Sources of Energy","Ch.09 · Changes in the Earth","Ch.10 · Cleaning Up the Earth","Ch.11 · Changes in the Weather","Ch.12 · Beyond the Solar System","Ch.13 · Support and Movement of the Body","Ch.14 · Transport Systems of the Body"],
  health: ["H.Ch.01 · Choosing Wellness","H.Ch.02 · Your Personality","H.Ch.03 · Managing Stress","H.Ch.04 · Understanding Mental Disorders","H.Ch.05 · Developing Relationships","H.Ch.06 · Marriage and Family","H.Ch.07 · Personal Care","H.Ch.08 · Food and Nutrition","H.Ch.09 · A Healthy Diet","H.Ch.10 · Fitness and Your Body Systems","H.Ch.11 · Fitness and Your Life Style","H.Ch.12 · Reproduction and Heredity","H.Ch.13 · Birth and Parenthood","H.Ch.14 · The Adolescent Years","H.Ch.15 · Adulthood, Aging, and Death","H.Ch.16 · Infectious Diseases","H.Ch.17 · AIDS and Other Sexually Transmitted Diseases","H.Ch.18 · Noninfectious Diseases and Physical Disabilities","H.Ch.19 · Drug Use and Abuse","H.Ch.20 · Alcohol","H.Ch.21 · Tobacco and Your Health","H.Ch.22 · A Healthy Environment","H.Ch.23 · Choosing Health Care","H.Ch.24 · Public Health","H.Ch.25 · Personal Safety","H.Ch.26 · First Aid"],
};

// The text a unit can show: the link saved with it, or — for courses added
// before the link existed — a unit whose title is exactly a chapter key.
export function readingForUnit(unit) {
  if (!unit) return null;
  if (unit.reading) return unit.reading;
  const title = String(unit.title || '').trim();
  const book = Object.keys(LIBRARY_CHAPTERS).find((b) => LIBRARY_CHAPTERS[b].includes(title));
  return book ? { book, topic: title } : null;
}
