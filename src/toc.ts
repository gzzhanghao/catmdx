import { WalkerToken } from './walker';

export function getTOC(tokens: WalkerToken[]) {
  const toc: string[] = [];
  for (const token of tokens) {
    if (token.type !== 'section-start') {
      continue;
    }
    const indent = '  '.repeat(token.levelParts.length - 1);
    const text = token.startToken.text.replace(/[[\]]/g, '\\$&');
    const sectNum = token.levelParts.join('.');

    toc.push(`${indent}* [${text}](#${sectNum})`);
  }
  return toc.join('\n');
}
