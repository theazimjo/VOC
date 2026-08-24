import { scienceChapterText } from './scienceChapterText';
import { marketPacks } from './marketData';

// Chapter list for the Science course, in book order. `topic` is the exact
// key used both in scienceChapterText.js (page content) and on each word's
// `topic` field inside the science market pack in marketData.js, so it's
// the single join key between "what to read" and "which words belong here".
export const SCIENCE_CHAPTERS = Object.keys(scienceChapterText).map((topic, i) => ({
  id: `ch${String(i + 1).padStart(2, '0')}`,
  topic,
}));

export function getChapterByTopic(topic) {
  return SCIENCE_CHAPTERS.find((c) => c.topic === topic) || null;
}

export function getChapterById(chapterId) {
  return SCIENCE_CHAPTERS.find((c) => c.id === chapterId) || null;
}

export function getChapterTitle(topic) {
  return scienceChapterText[topic]?.title || topic;
}

// Splits a chapter's pages into batches of up to 6 content pages each (the
// first 2 of a batch are read silently, the rest read aloud into the mic).
// Trailing pages that are entirely 'summary' or 'review' blocks (the
// end-of-chapter recap) are pulled out as a one-time `wrapUp` shown after
// the chapter's last batch, instead of being counted into a batch or quizzed.
export function getChapterBatches(topic) {
  const allPages = scienceChapterText[topic]?.pages || [];
  const isWrapUpPage = (page) =>
    page.length > 0 && page.every((b) => b.type === 'summary' || b.type === 'review');

  const contentPageIndices = [];
  const wrapUpPageIndices = [];
  allPages.forEach((page, idx) => {
    if (isWrapUpPage(page)) wrapUpPageIndices.push(idx);
    else contentPageIndices.push(idx);
  });

  const batches = [];
  for (let i = 0; i < contentPageIndices.length; i += 6) {
    const pageIndices = contentPageIndices.slice(i, i + 6);
    batches.push({
      index: batches.length,
      pageIndices,
      silentPageIndices: pageIndices.slice(0, 2),
      aloudPageIndices: pageIndices.slice(2),
    });
  }

  return { batches, wrapUpPageIndices };
}

function stripPhraseMarkup(text) {
  return (text || '').replace(/\{\{([^}]+)\}\}/g, '$1');
}

// Plain narration text for the listening step — the same pages the user
// just read, concatenated and stripped of the {{phrase}} tap-word markup,
// fed straight to TTS (no separately-authored listening script).
export function getBatchPlainText(topic, pageIndices) {
  const chapter = scienceChapterText[topic];
  if (!chapter) return '';
  const parts = [];
  (pageIndices || []).forEach((idx) => {
    const page = chapter.pages[idx] || [];
    page.forEach((block) => {
      if (block.text && ['heading', 'p', 'activity', 'sidebar'].includes(block.type)) {
        parts.push(stripPhraseMarkup(block.text));
      }
    });
  });
  return parts.join(' ');
}

// Reading-comprehension and listening-comprehension question banks, keyed
// by chapter topic then batch index. Only Chapter 1's first batch is
// authored for this build — every other chapter/batch resolves to `null`
// and the quiz stages fall back to a "coming soon" continue screen instead
// of blocking the flow. Extending to another chapter/batch only requires
// adding an entry here, in this same { reading, listening } shape.
export const scienceChapterTests = {
  'Ch.01 · Green Plants': {
    0: {
      reading: {
        questions: [
          {
            text: 'Producing new plants is one special activity that green plants ___.',
            options: ['break down rocks', 'carry out', 'change color with the seasons', 'move toward sunlight'],
            correct: 1,
            explanation: "The chapter opens by naming this as a special activity of green plants, discussed through flowers.",
          },
          {
            text: 'What is a cell often called?',
            options: ['"The engine of life"', '"The building block of life"', '"The root of life"', '"The seed of life"'],
            correct: 1,
            explanation: 'Cells are compared to bricks — many are needed to make up a plant or animal, just as many bricks make up a building.',
          },
          {
            text: 'Which comparison does the text use to explain what cells are?',
            options: ['Cells are like bricks in a building', 'Cells are like drops of water in the sea', 'Cells are like gears in a machine', 'Cells are like leaves on a tree'],
            correct: 0,
            explanation: 'The text compares the cells that make up plants and animals to the bricks in a building.',
          },
          {
            text: 'What three things does the text say every living thing needs to stay alive?',
            options: ['Food, water, and air', 'Sunlight, soil, and warmth', 'Water, minerals, and shelter', 'Food, shelter, and light'],
            correct: 0,
            explanation: 'All living things are alike in needing food, water, and air.',
          },
          {
            text: 'What are "life processes"?',
            options: ['The stages a seed goes through before it grows', 'The activities that keep living things alive', 'The steps of photosynthesis', 'The parts of a flower'],
            correct: 1,
            explanation: 'Life processes are defined as the activities that keep living things alive.',
          },
          {
            text: 'Which of these is NOT one of the five life processes listed in the chapter?',
            options: ['Getting food', 'Growing', 'Sleeping', 'Reproducing'],
            correct: 2,
            explanation: 'The five life processes named are getting food, releasing energy, removing wastes, growing, and reproducing — sleeping is not one of them.',
          },
          {
            text: 'What three things do green plants need to make their own food?',
            options: ['Water, carbon dioxide, and light energy', 'Water, soil, and warmth', 'Sunlight, minerals, and oxygen', 'Air, seeds, and water'],
            correct: 0,
            explanation: 'Green plants need water, carbon dioxide, and light energy to make food.',
          },
        ],
      },
      listening: {
        questions: [
          {
            text: 'What happens to plants in spring, as described at the start?',
            options: ['They lose their leaves', 'They begin to grow from the soil and produce colorful flowers', 'They go dormant', 'They stop making seeds'],
            correct: 1,
            explanation: 'In spring the weather becomes warm and green plants begin to grow from the soil, producing colorful flowers.',
          },
          {
            text: 'Cells in a plant or animal are compared to what part of a building?',
            options: ['Windows', 'Bricks', 'The roof', 'The foundation only'],
            correct: 1,
            explanation: 'Cells are compared to bricks — many bricks make up a building, just as many cells make up most plants and animals.',
          },
          {
            text: 'What can you use to see a cell, since all cells are very small?',
            options: ['A telescope', 'A magnifying glass only', 'A microscope', 'The naked eye'],
            correct: 2,
            explanation: 'Cells are very small and can only be seen through a microscope.',
          },
          {
            text: 'Besides food and water, what else do living things need?',
            options: ['Soil', 'Air', 'Shade', 'Music'],
            correct: 1,
            explanation: 'Three things living things need to stay alive are food, water, and air.',
          },
          {
            text: 'Where does food-making usually take place in a green plant?',
            options: ['In the root cells', 'In the leaf cells', 'In the stem cells', 'In the flower petals'],
            correct: 1,
            explanation: 'Food making usually takes place in the leaf cells of green plants.',
          },
          {
            text: 'What grows from the sides of a root and helps it take in water?',
            options: ['Petals', 'Root hairs', 'Stomata', 'Chloroplasts'],
            correct: 1,
            explanation: 'Root hairs are small hairlike parts that grow from the sides of a root and absorb water from the soil.',
          },
          {
            text: 'What happens if a root has more root hairs?',
            options: ['It absorbs more water', 'It grows fewer flowers', 'It needs less sunlight', 'It stops respiration'],
            correct: 0,
            explanation: 'The more root hairs a root has, the more water it can absorb.',
          },
        ],
      },
    },
  },
};

export function getBatchTest(topic, batchIndex) {
  return scienceChapterTests[topic]?.[batchIndex] || null;
}

// The science market pack's words are already tagged per chapter via
// `topic` — no separate vocabulary content needs authoring here.
export function getChapterWords(topic) {
  const sciencePack = marketPacks.find((p) => p.id === 'science');
  return (sciencePack?.words || []).filter((w) => w.topic === topic);
}
