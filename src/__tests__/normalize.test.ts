import { describe, expect, it } from 'vitest';
import { normalizeMarkdown } from '../normalize';

describe('normalizeMarkdown', () => {
  it('handle BOM', () => {
    const input = '\uFEFF# Hello';
    expect(normalizeMarkdown(input)).toMatchSnapshot();
  });

  it('extracts metadata', () => {
    const input = '---\ntitle: Hello\n---\n# Hello';
    expect(normalizeMarkdown(input)).toMatchSnapshot();
  });

  it('handles separator', () => {
    const input = '---\ntitle: Hello\n---\n# Hello\n---';
    expect(normalizeMarkdown(input)).toMatchSnapshot();
  });

  it('missing close delimiter', () => {
    const input = '---\ntitle: Hello';
    expect(normalizeMarkdown(input)).toMatchSnapshot();
  });

  it('without metadata', () => {
    const input = '# Hello';
    expect(normalizeMarkdown(input)).toMatchSnapshot();
  });
});
