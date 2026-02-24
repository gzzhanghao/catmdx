const METADATA_START_REGEX = /^---\r?\n/;
const METADATA_END_REGEX = /\r?\n---(\r?\n|$)/;

export function normalizeMarkdown(markdown: string) {
  let content = markdown;

  if (content[0] === '\uFEFF') {
    content = content.slice(1);
  }

  if (!METADATA_START_REGEX.test(content)) {
    return { metadata: undefined, content };
  }

  const endIndex = content.search(METADATA_END_REGEX);
  if (endIndex < 0) {
    return { metadata: undefined, content };
  }

  return {
    metadata: content.slice(4, endIndex),
    content: content.slice(endIndex + 5),
  };
}
