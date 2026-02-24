import { Lexer, Token, Tokens } from 'marked';
import { normalizeMarkdown } from './normalize';

export type WalkerToken =
  | MarkdownMetadata
  | MarkdownSectionStart
  | MarkdownSectionEnd
  | MarkdownToken;

export interface MarkdownMetadata {
  type: 'metadata';
  metadata: string;
}

export interface MarkdownSectionStart {
  type: 'section-start';
  path: Tokens.Heading[];
  levelParts: number[];
  startToken: Tokens.Heading;
}

export interface MarkdownSectionEnd {
  type: 'section-end';
  startToken: Tokens.Heading;
}

export interface MarkdownToken {
  type: 'token';
  token: Token;
}

export function* walkMarkdown(markdown: string): Generator<WalkerToken> {
  const { metadata, content } = normalizeMarkdown(markdown);

  if (metadata != null) {
    yield {
      type: 'metadata',
      metadata,
    };
  }

  const lexer = new Lexer({ silent: true });
  const tokens = lexer.lex(content);

  const path: Tokens.Heading[] = [];
  const levelParts: number[] = [];

  for (const token of tokens) {
    if (token.type !== 'heading') {
      yield {
        type: 'token',
        token,
      };
      continue;
    }

    const head = token as Tokens.Heading;
    const parentLevel = path.findLastIndex((token) => token.depth < head.depth);

    for (let i = path.length - 1; i > parentLevel; i--) {
      yield {
        type: 'section-end',
        startToken: path.pop()!,
      };
    }

    levelParts[parentLevel + 1] = (levelParts[parentLevel + 1] || 0) + 1;
    levelParts.length = parentLevel + 2;
    path.push(head);

    yield {
      type: 'section-start',
      path: path.slice(),
      levelParts: levelParts.slice(),
      startToken: head,
    };

    yield {
      type: 'token',
      token,
    };
  }

  for (let i = path.length - 1; i >= 0; i--) {
    yield {
      type: 'section-end',
      startToken: path.pop()!,
    };
  }
}
