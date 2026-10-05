/**
 * How the learner answered, which matters for modelling: a multiple-choice
 * answer can be right by guessing, a typed or spoken one cannot, and a
 * self-judged "I knew it" is optimistic. Logged with every review so future
 * fits can separate them (the current logs only have active/passive).
 *
 * @param {string|null} mode  practice mode id (flashcard, quiz, match, speed, spelling, pronounce, irregular-verbs, ...)
 * @param {'active_recall'|'passive_recall'} [retrievalType]
 * @returns {'self'|'choice'|'typed'|'spoken'}
 */
export function answerFormatForMode(mode, retrievalType = 'passive_recall') {
  switch (mode) {
    case 'flashcard': return 'self';
    case 'quiz':
    case 'match':
    case 'speed': return 'choice';
    case 'spelling':
    case 'irregular-verbs': return 'typed';
    case 'pronounce': return 'spoken';
    default: return retrievalType === 'active_recall' ? 'typed' : 'self';
  }
}
