// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { unzipSync, strFromU8 } from 'fflate';
import { TEMPLATE_ROWS, templateTxt, templateXlsx } from './templateFiles';
import { importable, readWordFile } from './wordImport';

describe('import templates', () => {
  it('the Excel template keeps each field in its own column and reads back', async () => {
    const data = await templateXlsx();
    const sheet = strFromU8(unzipSync(data)['xl/worksheets/sheet1.xml']);
    expect(sheet).toContain('<c r="A1"');
    expect(sheet).toContain('<c r="E1"'); // Misol column

    const { rows } = await readWordFile(new File([data], 'namuna.xlsx'));
    expect(importable(rows)).toHaveLength(TEMPLATE_ROWS.length);
    expect(rows[0]).toMatchObject({
      word: 'mother', translation: 'ona', partOfSpeech: 'noun', definition: '', example: 'My mother is a doctor.',
    });
    expect(rows[3]).toMatchObject({ word: 'eat', partOfSpeech: 'verb' });
  });

  it('the text template reads back without errors', async () => {
    const { rows } = await readWordFile(new File([templateTxt()], 'namuna.txt'));
    expect(rows.every((r) => !r.error && !r.duplicate)).toBe(true);
    expect(rows.map((r) => r.word)).toEqual(['apple', 'book', 'ice-cream', 'mother']);
    expect(rows[3]).toMatchObject({ partOfSpeech: 'noun', definition: '', example: 'My mother is a doctor.' });
  });
});
