import { MarkdownSectionStart, WalkerToken } from './walker';

export function getSection(tokens: WalkerToken[], titleOrNumber: string) {
  const iter = tokens.values();
  let start: MarkdownSectionStart | undefined;

  // Read until target section start
  for (const token of iter) {
    if (token.type !== 'section-start') {
      continue;
    }
    if (
      titleOrNumber === token.startToken.text ||
      titleOrNumber === `#${token.levelParts.join('.')}`
    ) {
      start = token;
      break;
    }
  }

  if (!start) {
    return;
  }

  let content = '';

  // Print all tokens until target section end
  for (const token of iter) {
    if (token.type === 'section-end' && token.startToken === start.startToken) {
      break;
    }
    if (token.type === 'token') {
      content += token.token.raw;
    }
  }

  return content;
}
