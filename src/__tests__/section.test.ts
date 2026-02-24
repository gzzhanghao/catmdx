import { describe, it, expect } from 'vitest';
import { getSection } from '../section';
import { load } from './helpers/load';

describe('getSection', () => {
  test('metadata.md', 'Metadata');
  test('empty.md', 'any title');
  test('metadata-without-body.md', 'any title');
  test('nested.md', 'h3');
  test('nested.md', '#1.1.2');
});

function test(filename: string, sect: string) {
  it(`${filename} - ${sect}`, async () => {
    const tokens = await load(filename);
    const result = getSection(tokens, sect);
    expect(result).toMatchSnapshot();
  });
}
