import { getSectionContent } from './content';
import { MarkdownInfo } from './parser';
import { walkMarkdown } from './walker';

export interface GetTOCOptions {
  tocMetadata?: boolean;
}

export function getTOC(md: MarkdownInfo, options?: GetTOCOptions) {
  const toc: string[] = [];
  for (const sect of walkMarkdown(md.root)) {
    const content = getSectionContent(sect).trim();
    if (!sect.parent && !content) {
      continue;
    }

    const indent = sect.numbers.length
      ? '  '.repeat(sect.numbers.length - 1)
      : '';

    const text = sect.headingToken?.text.replace(/[[\]]/g, '\\$&') || '';
    const sectNum = sect.numbers.join('.') || 'ROOT';

    let line = `${indent}* [${text}](#${sectNum})`;

    if (options?.tocMetadata) {
      const startLine = md.content
        .slice(0, sect.range.start)
        .split('\n').length;
      let metadata = `Line ${startLine}`;
      if (content.length) {
        metadata += `, ${content.length} chs`;
      } else {
        metadata += `, empty`;
      }

      line += ` - (${metadata})`;
    }

    toc.push(line);
  }
  return toc.join('\n');
}
