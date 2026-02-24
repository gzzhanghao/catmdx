import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface ReaderOptions {
  file?: string;
  content?: string;
  stdin?: boolean;
}

export async function getContent(options: ReaderOptions) {
  if (options.file) {
    return await readFile(resolve(options.file), 'utf-8');
  }
  if (options.content) {
    return options.content;
  }
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
