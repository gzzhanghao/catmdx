import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { walkMarkdown } from '../../walker';

export async function load(name: string) {
  const content = await readFile(
    path.join(__dirname, '../fixtures', name),
    'utf-8',
  );
  return Array.from(walkMarkdown(content));
}
