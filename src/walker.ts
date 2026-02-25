import { MarkdownSection } from './parser';

export function* walkMarkdown(
  sect: MarkdownSection,
): Generator<MarkdownSection, void, boolean | undefined> {
  const queue = [sect];
  for (let sect = queue.shift(); sect; sect = queue.shift()) {
    if (yield sect) {
      continue;
    }
    queue.unshift(...sect.children);
  }
}
