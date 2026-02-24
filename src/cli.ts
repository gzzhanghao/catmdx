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
  .option('-m, --metadata', 'Print metadata')
  .option('-t, --toc', 'Print table of contents')
  .option(
    '-s, --section <section>',
    'Print specific section (e.g. "Introduction" or "#2")',
  )
  .action(async (file, options) => {
    if (!file && !options.content && !options.stdin) {
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
      contents.push(getTOC(tokens));
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
