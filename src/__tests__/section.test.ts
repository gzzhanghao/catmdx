import { describe, it, expect } from 'vitest';
import { GetSectionOptions, getSections } from '../section';
import { load } from './helpers/load';

describe('getSections', () => {
  test('metadata.md', { section: ['Metadata'] });
  test('empty.md', { section: ['any title'] });
  test('metadata-without-body.md', { section: ['any title'] });
  test('nested.md', { section: ['h3'] });
  test('nested.md', { section: ['h3'], recursive: true });
  test('nested.md', { section: ['#1.1.2'] });
  test('without-heading.md', { section: ['#ROOT'] });
});

function test(filename: string, options: GetSectionOptions) {
  it(`${filename} - ${JSON.stringify(options)}`, async () => {
    const md = await load(filename);
    const result = getSections(md, options);
    expect(result).toMatchSnapshot();
  });
}
