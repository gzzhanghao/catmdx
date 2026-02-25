import { MarkdownSection } from './parser';

export function getSectionContent(sect: MarkdownSection) {
  return sect.tokens.map((token) => token.raw).join('');
}
