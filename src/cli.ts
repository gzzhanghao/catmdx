import { program } from 'commander';

import { getContent } from './reader';
import { parse } from './parser';
import { getSections } from './section';
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
  .option('--toc-metadata', 'Print section metadata in table of contents')
  .option(
    '-s, --section <sections...>',
    'Print specific sections (e.g. "Introduction" or "#2")',
  )
  .option('-r, --recursive', 'Print subsections recursively')
  .action(async (file, options) => {
    if (!file && !options.content && !options.stdin) {
      program
        .addHelpText(
          'after',
          '\nError: Please provide a file path / markdown content / or the stdin flag',
        )
        .help({ error: true });
    }

    const content = await getContent({ ...options, file });
    const md = parse(content);

    const contents: string[] = [];
    if (options.metadata && md.metadata) {
      contents.push(`---\n${md.metadata}\n---`);
    }
    if (options.toc) {
      contents.push(getTOC(md, options));
    }
    if (options.section) {
      contents.push(getSections(md, options));
    }
    if (contents.length) {
      console.log(contents.join('\n\n'));
    }
  });

program.parse(process.argv);
