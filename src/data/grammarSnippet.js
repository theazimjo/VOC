// The one-line description shown on a grammar topic card: the start of the
// guide with its markdown stripped. Kept to 91 characters so the card can still
// tell whether it needs an ellipsis after cutting at 90.
export function grammarSnippet(topic) {
  const raw = topic.guide || topic.description || '';
  return raw
    .replace(/#+\s*/g, '')
    .replace(/\*+/g, '')
    .replace(/💡\s*/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 91);
}
