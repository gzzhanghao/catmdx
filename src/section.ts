import { MarkdownInfo } from './parser';
import { walkMarkdown } from './walker';

export interface GetSectionOptions {
  section: string[];
  recursive?: boolean;
}

export function getSections(md: MarkdownInfo, options: GetSectionOptions) {
  const iter = walkMarkdown(md.root);
  let content = '';

  for (let res = iter.next(); !res.done; ) {
    const sect = res.value;

    const num = `#${sect.numbers.join('.') || 'ROOT'}`;
    const text = sect.headingToken?.text || '';

    const isMatched = options.section.some(
      (target) => target === text || target === num,
    );
    if (!isMatched) {
      res = iter.next();
      continue;
    }

    for (const target of options.recursive ? walkMarkdown(sect) : [sect]) {
      if (target.headingToken) {
        content += target.headingToken.raw;
      }
      for (const token of target.tokens) {
        content += token.raw;
      }
    }

    res = iter.next(options.recursive);
  }

  return content;
}
