// Turns a topic's freeform `guide` string (headings, bullets, bold rules,
// indented examples, notes, numbered steps, markdown tables) into a flat
// list of typed blocks that GrammarGuide.jsx can render without re-parsing.

function splitBoldSegments(text) {
  const segments = [];
  const re = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }
  return segments.length ? segments : [{ text, bold: false }];
}

function detectPillKind(label) {
  if (/tasdiq|positive|affirmative/i.test(label)) return 'positive';
  if (/inkor|negative/i.test(label)) return 'negative';
  if (/savol|question/i.test(label)) return 'question';
  return 'neutral';
}

const isSeparatorRow = (line) => /^\|?[\s:\-|]+\|?$/.test(line);

const parseTableRow = (line) =>
  line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

export function parseGuide(guideText) {
  if (!guideText) return [];
  const rawLines = guideText.split('\n');
  const blocks = [];
  let i = 0;

  while (i < rawLines.length) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Markdown table
    if (trimmed.startsWith('|')) {
      const tableLines = [];
      while (i < rawLines.length && rawLines[i].trim().startsWith('|')) {
        tableLines.push(rawLines[i].trim());
        i++;
      }
      const header = parseTableRow(tableLines[0]);
      const bodyRows = tableLines.slice(1).filter((l) => !isSeparatorRow(l)).map(parseTableRow);
      blocks.push({ type: 'table', header, rows: bodyRows });
      continue;
    }

    // Sub-heading: ### text
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', segments: splitBoldSegments(trimmed.replace(/^###\s*/, '')) });
      i++;
      continue;
    }

    // Heading: ## text  (optionally "## N. Text")
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^##\s*/, '');
      const numMatch = text.match(/^(\d+)\.\s*(.*)$/);
      blocks.push({
        type: 'h2',
        number: numMatch ? numMatch[1] : null,
        segments: splitBoldSegments(numMatch ? numMatch[2] : text),
      });
      i++;
      continue;
    }

    // Note: *(whole line wrapped like this)*
    const noteMatch = trimmed.match(/^\*\(([\s\S]+)\)\*$/);
    if (noteMatch) {
      blocks.push({ type: 'note', segments: splitBoldSegments(noteMatch[1]) });
      i++;
      continue;
    }

    // Indented example line: "  - text" (real leading whitespace + dash, not a top-level bullet)
    const leadingSpaces = rawLine.match(/^(\s*)/)[1].length;
    if (leadingSpaces >= 2 && /^-\s+/.test(trimmed)) {
      blocks.push({ type: 'example', segments: splitBoldSegments(trimmed.replace(/^-\s+/, '')) });
      i++;
      continue;
    }

    // Bullet ("• ...") or numbered ("N. ...") line
    const bulletMatch = trimmed.match(/^•\s*(.*)$/);
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (bulletMatch || numberedMatch) {
      const content = bulletMatch ? bulletMatch[1] : numberedMatch[2];
      const badge = numberedMatch ? numberedMatch[1] : null;

      // Rule: **Label** immediately followed by : or — then a formula/description
      const ruleMatch = content.match(/^\*\*(.+?)\*\*\s*[:—]\s*(.+)$/);
      if (ruleMatch) {
        const label = ruleMatch[1];
        const rest = ruleMatch[2].replace(/:\s*$/, '');
        blocks.push({
          type: 'rule',
          badge,
          kind: badge ? 'numbered' : detectPillKind(label),
          label,
          segments: splitBoldSegments(rest),
        });
        i++;
        continue;
      }

      // Step: **Label** (optional parenthetical) ending in ':' with nothing else — example follows on next line(s)
      const stepMatch = content.match(/^\*\*(.+?)\*\*(.*):\s*$/);
      if (stepMatch) {
        const label = stepMatch[1];
        const note = stepMatch[2].trim();
        blocks.push({
          type: 'step',
          badge,
          label,
          noteSegments: note ? splitBoldSegments(note.replace(/^\(|\)$/g, '')) : null,
        });
        i++;
        continue;
      }

      // Generic bullet / plain numbered line
      blocks.push({
        type: badge ? 'numbered' : 'bullet',
        badge,
        segments: splitBoldSegments(content),
      });
      i++;
      continue;
    }

    // Fallback: plain paragraph
    blocks.push({ type: 'paragraph', segments: splitBoldSegments(trimmed) });
    i++;
  }

  // The very first heading usually just repeats the topic title (already shown
  // in the page header) — demote it to a subtitle instead of a big divider.
  const firstHeadingIdx = blocks.findIndex((b) => b.type === 'h2' || b.type === 'h3');
  if (firstHeadingIdx === 0 && blocks[0].type === 'h2' && blocks[0].number === null) {
    blocks[0] = { type: 'titleSub', segments: blocks[0].segments };
  }

  return blocks;
}
