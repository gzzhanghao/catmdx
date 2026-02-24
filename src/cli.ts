import { program } from 'commander';

import { getContent } from './reader';
import { walkMarkdown } from './walker';
import { getSection } from './section';
import { getTOC } from './toc';

program
  .description('Parse and display specific contents of a markdown')
  .argument(
    '[path]',
    'Path to the markdown file, optional with --content or --stdin flag',
  )
  .option('-c, --content <content>', 'Markdown content provided as a string')
  .option('-i, --stdin', 'Read markdown content from stdin')
  .option('-m, --metadata', 'Print metadata from markdown content')
  .option('-t, --toc', 'Print table of contents from markdown content')
  .option(
    '-s, --section <section>',
    'Print specific section from markdown content (e.g. "Introduction" or "#2")',
  )
  .action(async (file, options) => {
    if (!options.file && !options.content && !options.stdin) {
      program
        .addHelpText(
          'after',
          '\nError: Please provide a file path / markdown content / or the stdin flag',
        )
        .help();
    }
    const content = await getContent({ ...options, file });

    const tokens = Array.from(walkMarkdown(content));
    if (!tokens.length) {
      return;
    }

    const contents: string[] = [];
    if (options.metadata && tokens[0].type === 'metadata') {
      contents.push(`---\n${tokens[0].metadata}\n---`);
    }
    if (options.toc) {
      contents.push(`[TOC]\n${getTOC(tokens)}`);
    }
    if (options.section) {
      const section = getSection(tokens, options.section);
      if (section != null) {
        contents.push(section);
      }
    }
    if (contents.length) {
      console.log(contents.join('\n\n'));
    }
  });

program.parse(process.argv);
