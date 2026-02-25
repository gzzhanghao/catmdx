import { describe, it, expect } from 'vitest';
import { getTOC } from '../toc';
import { load } from './helpers/load';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

describe('getTOC', async () => {
  const fixtures = await readdir(path.join(__dirname, 'fixtures'));
  for (const filename of fixtures) {
    if (filename[0] !== '.' && filename.endsWith('.md')) {
      test(filename);
    }
  }
});

function test(filename: string) {
  it(filename, async () => {
    const md = await load(filename);
    const result = getTOC(md);
    expect(result).toMatchSnapshot();
  });

  it(`${filename} - with metadata`, async () => {
    const md = await load(filename);
    const result = getTOC(md, { tocMetadata: true });
    expect(result).toMatchSnapshot();
  });
}
