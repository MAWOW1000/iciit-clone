import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { htmlFileToRoute } from '../src/lib/routes.js';

const sourceDir = new URL('../public/site/', import.meta.url).pathname;
const pagesDir = new URL('../src/pages/', import.meta.url).pathname;
const fragmentsDir = new URL('../src/content-fragments/', import.meta.url).pathname;

function escapeTemplate(value) {
  return value.replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function descriptionFrom(html) {
  const text = stripHtml(html);
  return (text || 'International Conference on Intelligent Information Technology.')
    .slice(0, 158)
    .replace(/\s+\S*$/, '');
}

function outputPathFor(file) {
  if (file === 'index.html') return join(pagesDir, 'index.astro');
  return join(pagesDir, file.replace(/\.html$/, ''), 'index.astro');
}

function contentPathFor(file) {
  if (file === 'index.html') return join(fragmentsDir, 'index.html');
  return join(fragmentsDir, `${file.replace(/\.html$/, '')}.html`);
}

function importPrefixFor(file) {
  return file === 'index.html' ? '..' : '../..';
}

function extractContent(html) {
  return html
    .match(/<div id="content"[\s\S]*?<section id="footer-widgets"/i)?.[0]
    ?.replace(/<section id="footer-widgets"$/i, '')
    ?.trim();
}

const htmlFiles = readdirSync(sourceDir)
  .filter((file) => file.endsWith('.html') && htmlFileToRoute[file])
  .sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b)));

let generated = 0;

for (const file of htmlFiles) {
  const html = readFileSync(join(sourceDir, file), 'utf8');
  const title =
    html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || `ICIIT2026 | ${basename(file, '.html')}`;
  const content = extractContent(html);

  if (!content) {
    console.warn(`Skipped ${file}: could not find #content`);
    continue;
  }

  const route = htmlFileToRoute[file];
  const importPrefix = importPrefixFor(file);
  const page = `---
import BaseLayout from '${importPrefix}/layouts/BaseLayout.astro';
import { normalizeAssetLinks } from '${importPrefix}/lib/routes.js';
import contentHtml from '${importPrefix}/content-fragments/${file === 'index.html' ? 'index' : file.replace(/\.html$/, '')}.html?raw';

const title = \`${escapeTemplate(title)}\`;
const description = \`${escapeTemplate(descriptionFrom(content))}\`;
const content = normalizeAssetLinks(contentHtml);
---
<BaseLayout title={title} description={description} canonical={new URL('${route}', Astro.site).toString()}>
  <Fragment set:html={content} />
</BaseLayout>
`;

  const outputPath = outputPathFor(file);
  const contentPath = contentPathFor(file);
  mkdirSync(dirname(outputPath), { recursive: true });
  mkdirSync(dirname(contentPath), { recursive: true });
  writeFileSync(outputPath, page);
  writeFileSync(contentPath, `${content}\n`);
  generated += 1;
}

console.log(`Generated ${generated} Astro pages`);
