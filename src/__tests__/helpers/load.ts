import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from '../../parser';

export async function load(name: string) {
  const content = await readFile(
    path.join(__dirname, '../fixtures', name),
    'utf-8',
  );
  return parse(content);
}
