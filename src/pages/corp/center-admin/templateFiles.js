// Downloadable import templates: a real .xlsx (one field per column, bold
// header, sized columns) and a plain .txt. Both round-trip through
// readWordFile — see templateFiles.test.js.

export const TEMPLATE_HEADER = ["So'z", 'Tarjima', 'Ruscha', 'Turkum', "Ta'rif", 'Misol'];
// English header, for the center admin panel (see downloadTemplate's `en`).
export const TEMPLATE_HEADER_EN = ['Word', 'Translation', 'Russian', 'Part of Speech', 'Definition', 'Example'];

export const TEMPLATE_ROWS = [
  ['mother', 'ona', 'мама', 'noun', '', 'My mother is a doctor.'],
  ['father', 'ota', 'папа', 'noun', '', 'My father works in a bank.'],
  ['brother', 'aka / uka', 'брат', 'noun', '', 'I have one brother.'],
  ['eat', 'yemoq', 'есть', 'verb', '', 'We eat lunch at school.'],
  ['ice-cream', 'muzqaymoq', 'мороженое', 'noun', '', 'I like ice-cream.'],
  ['delicious', 'mazali', 'вкусный', 'adjective', '', 'This soup is delicious.'],
];

// Column widths in Excel "characters".
const WIDTHS = [16, 18, 18, 12, 26, 34];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const col = (i) => String.fromCharCode(65 + i);

function sheetXml(rows, widths = WIDTHS) {
  const cols = widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('');
  const body = rows.map((r, ri) => {
    const style = ri === 0 ? ' s="1"' : '';
    const cells = r.map((v, ci) => (v === ''
      ? ''
      : `<c r="${col(ci)}${ri + 1}" t="inlineStr"${style}><is><t xml:space="preserve">${esc(v)}</t></is></c>`)).join('');
    return `<row r="${ri + 1}">${cells}</row>`;
  }).join('');
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    + '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
    + '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>'
    + `<cols>${cols}</cols><sheetData>${body}</sheetData></worksheet>`;
}

const STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  + '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
  + '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>'
  + '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>'
  + '<fill><patternFill patternType="solid"><fgColor rgb="FFE8F0FE"/><bgColor indexed="64"/></patternFill></fill></fills>'
  + '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
  + '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
  + '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
  + '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs>'
  + '</styleSheet>';

// → Uint8Array with a valid one-sheet workbook. `en` (center admin only —
// teacher panel stays Uzbek) switches the header row and the sheet's own
// tab name (visible if the admin opens the file in Excel).
export async function templateXlsx(en = false, course = false) {
  const { zipSync, strToU8 } = await import('fflate');
  const rel = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  const pkg = 'http://schemas.openxmlformats.org/package/2006/relationships';
  const ct = 'application/vnd.openxmlformats-officedocument.spreadsheetml';
  const sheetName = course ? (en ? 'Course' : 'Kurs') : (en ? 'Words' : "So'zlar");
  const head = en ? TEMPLATE_HEADER_EN : TEMPLATE_HEADER;
  const table = course
    ? [[en ? 'Topic' : 'Mavzu', ...head], ...TEMPLATE_ROWS.map((r, i) => [(en ? ['Family', 'Food'] : ['Oila', 'Ovqat'])[i < 3 ? 0 : 1], ...r])]
    : [head, ...TEMPLATE_ROWS];
  return zipSync({
    '[Content_Types].xml': strToU8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
      + '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
      + '<Default Extension="xml" ContentType="application/xml"/>'
      + `<Override PartName="/xl/workbook.xml" ContentType="${ct}.sheet.main+xml"/>`
      + `<Override PartName="/xl/worksheets/sheet1.xml" ContentType="${ct}.worksheet+xml"/>`
      + `<Override PartName="/xl/styles.xml" ContentType="${ct}.styles+xml"/>`
      + '</Types>'),
    '_rels/.rels': strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${pkg}">`
      + `<Relationship Id="rId1" Type="${rel}/officeDocument" Target="xl/workbook.xml"/></Relationships>`),
    'xl/workbook.xml': strToU8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
      + `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="${rel}">`
      + `<sheets><sheet name="${sheetName}" sheetId="1" r:id="rId1"/></sheets></workbook>`),
    'xl/_rels/workbook.xml.rels': strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${pkg}">`
      + `<Relationship Id="rId1" Type="${rel}/worksheet" Target="worksheets/sheet1.xml"/>`
      + `<Relationship Id="rId2" Type="${rel}/styles" Target="styles.xml"/></Relationships>`),
    'xl/styles.xml': strToU8(STYLES),
    'xl/worksheets/sheet1.xml': strToU8(sheetXml(table, course ? [16, ...WIDTHS] : WIDTHS)),
  });
}

// One word per line: so'z - tarjima [- turkum - misol gap]. Plain lines,
// then a single full one to show the optional fields.
export function templateTxt() {
  return [
    'apple - olma - noun - I eat an apple every day.',
    'book - kitob - noun - This book is interesting.',
    'ice-cream - muzqaymoq - noun - I like ice-cream.',
    'mother - ona - noun - My mother is a doctor.',
    '',
  ].join('\r\n');
}

function save(data, name, type) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function downloadTemplate(kind, en = false, course = false) {
  if (kind === 'xlsx') {
    save(await templateXlsx(en, course), course ? (en ? 'voc-course-sample.xlsx' : 'voc-kurs-namuna.xlsx') : (en ? 'voc-words-sample.xlsx' : 'voc-sozlar-namuna.xlsx'), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  } else {
    save(templateTxt(), en ? 'voc-words-sample.txt' : 'voc-sozlar-namuna.txt', 'text/plain;charset=utf-8');
  }
}
