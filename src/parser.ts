import { Lexer, Token, Tokens } from 'marked';
import { normalizeMarkdown } from './normalize';

export interface MarkdownInfo {
  content: string;
  metadata?: string;
  root: MarkdownSection;
}

export interface MarkdownSection {
  headingToken?: Tokens.Heading;
  numbers: number[];
  tokens: Token[];
  range: { start: number; end: number };
  parent?: MarkdownSection;
  children: MarkdownSection[];
}

export function parse(markdown: string): MarkdownInfo {
  const { metadata, content } = normalizeMarkdown(markdown);

  const lexer = new Lexer({ silent: true });
  const tokens = lexer.lex(content);

  const root: MarkdownSection = {
    tokens: [],
    range: { start: 0, end: 0 },
    numbers: [],
    children: [],
  };

  const stack: MarkdownSection[] = [root];
  let index = 0;

  for (const token of tokens) {
    const startIndex = index;
    index += token.raw.length;

    const currentSection = stack[stack.length - 1];

    if (token.type !== 'heading') {
      currentSection.range.end = index;
      currentSection.tokens.push(token);
      continue;
    }

    currentSection.range.end = startIndex;
    const head = token as Tokens.Heading;

    const parentIndex = stack.findLastIndex((sect) => {
      const depth = sect.headingToken?.depth || 0;
      return depth < head.depth;
    });
    const parent = stack[parentIndex];

    const sect: MarkdownSection = {
      headingToken: head,
      numbers: [...parent.numbers, parent.children.length + 1],
      tokens: [],
      range: { start: startIndex, end: index },
      parent,
      children: [],
    };
    stack.length = parentIndex + 1;
    stack.push(sect);
    parent.children.push(sect);
  }

  return {
    content: markdown,
    metadata,
    root,
  };
}
