import { readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const siteDir = new URL('../dist/site/', import.meta.url).pathname;

function removeHtml(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      removeHtml(path);
      continue;
    }
    if (
      entry.name.endsWith('.html') ||
      entry.name.endsWith('.html.orig') ||
      entry.name.endsWith('.orig')
    ) {
      rmSync(path);
    }
  }
}

removeHtml(siteDir);
