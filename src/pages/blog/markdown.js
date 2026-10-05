// Small, safe Markdown for blog posts. No raw HTML ever reaches the page:
// the parser returns plain data and React renders it.
//
// Supported
//   ## Heading / ### Subheading
//   paragraphs (blank-line separated), **bold**, *italic*, [text](url)
//   - bullets, 1. numbered items
//   > quote
//   ![caption](https://image-url)       image on its own line
//   ---                                  divider
//   :::figure curve                      a built-in illustration (see illustrations.jsx)
//   :::bars Chart title                  horizontal bars, closed by a line with :::
//   note: small caption under the bars
//   Label | 0.53 | mid                   value 0..1, tone base | mid | model
//   :::
// Links may be https://, http://, mailto: or site-relative (/blog/...).

const SAFE_HREF = /^(https?:\/\/|mailto:|\/(?!\/))/i;
const SAFE_IMG = /^(https:\/\/|\/(?!\/))/i;

/** Inline text -> nodes: { t: 'text'|'strong'|'em'|'link', ... } */
export function parseInline(text) {
  const out = [];
  let rest = String(text ?? '');
  const push = (v) => v && out.push({ t: 'text', v });
  // links, then bold, then italic: first match in the string wins
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/;
  while (rest) {
    const m = re.exec(rest);
    if (!m) { push(rest); break; }
    push(rest.slice(0, m.index));
    if (m[1] !== undefined) {
      if (SAFE_HREF.test(m[2])) out.push({ t: 'link', href: m[2], c: parseInline(m[1]) });
      else push(m[1]);
    } else if (m[3] !== undefined) {
      out.push({ t: 'strong', c: parseInline(m[3]) });
    } else {
      out.push({ t: 'em', c: parseInline(m[4]) });
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

export function plainText(nodes) {
  return nodes.map((n) => (n.t === 'text' ? n.v : plainText(n.c))).join('');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[‘’ʻʼ'`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'bo-lim';
}

const TONES = ['base', 'mid', 'model'];

/** @returns {{ blocks: Array, headings: Array<{id:string,text:string,level:number}> }} */
export function parseMarkdown(src) {
  const lines = String(src ?? '').replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  const headings = [];
  const used = new Map();
  const uniqueId = (text) => {
    const base = slugify(text);
    const n = used.get(base) || 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    let m;
    if ((m = /^(#{2,3})\s+(.+)$/.exec(trimmed))) {
      const level = m[1].length;
      const inline = parseInline(m[2]);
      const text = plainText(inline);
      const id = uniqueId(text);
      blocks.push({ type: level === 2 ? 'h2' : 'h3', id, inline });
      headings.push({ id, text, level });
      i++; continue;
    }

    if (/^---+$/.test(trimmed)) { blocks.push({ type: 'hr' }); i++; continue; }

    if ((m = /^:::figure\s+([a-z0-9-]+)\s*$/i.exec(trimmed))) {
      blocks.push({ type: 'figure', name: m[1].toLowerCase() });
      i++; continue;
    }

    if ((m = /^:::bars\s*(.*)$/i.exec(trimmed))) {
      const bars = { type: 'bars', title: m[1].trim(), note: '', rows: [] };
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') {
        const row = lines[i].trim();
        if (/^note:/i.test(row)) bars.note = row.replace(/^note:\s*/i, '');
        else if (row) {
          const [label, value, tone] = row.split('|').map((s) => s.trim());
          const num = Number(String(value).replace(',', '.'));
          if (label && Number.isFinite(num)) {
            bars.rows.push({ label, value: Math.min(1, Math.max(0, num)), tone: TONES.includes(tone) ? tone : 'base' });
          }
        }
        i++;
      }
      i++; // closing :::
      if (bars.rows.length) blocks.push(bars);
      continue;
    }

    if ((m = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(trimmed))) {
      if (SAFE_IMG.test(m[2])) blocks.push({ type: 'image', alt: m[1], src: m[2] });
      i++; continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) { quote.push(lines[i].trim().replace(/^>\s?/, '')); i++; }
      blocks.push({ type: 'quote', inline: parseInline(quote.join(' ')) });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\.\s+/.test(trimmed);
      const re = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const items = [];
      while (i < lines.length && re.test(lines[i].trim())) { items.push(parseInline(lines[i].trim().replace(re, ''))); i++; }
      blocks.push({ type: ordered ? 'ol' : 'ul', items });
      continue;
    }

    // paragraph: run of plain lines
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3}\s|>|[-*]\s|\d+\.\s|:::|!\[|---+$)/.test(lines[i].trim())) {
      para.push(lines[i].trim());
      i++;
    }
    if (para.length) blocks.push({ type: 'p', inline: parseInline(para.join(' ')) });
    else i++; // safety: never loop forever on an odd line
  }

  return { blocks, headings };
}
