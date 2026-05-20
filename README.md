# ICIIT Astro Website

This is an Astro rebuild of the mirrored ICIIT website. It is designed for:

- SEO-friendly static HTML
- simple page-based development
- reusable layout, navigation, and footer
- responsive improvements over the original mirror

## Run Locally

```bash
npm install
npm run extract
npm run dev
```

Open the URL printed by Astro, usually:

```text
http://127.0.0.1:4321/
```

## Build

```bash
SITE_URL=https://www.iciit.org npm run build
npm run clean:source-html
```

The deployable production site is in:

```text
dist/
```

## Structure

```text
src/layouts/BaseLayout.astro     shared HTML head, SEO tags, page shell
src/components/Header.astro      site header
src/components/Navigation.astro  main navigation
src/components/Footer.astro      footer
src/pages/                       real SEO pages
public/site/                     copied images, CSS, PDFs, docs, and JS assets
scripts/extract-pages.mjs        converts mirrored HTML into Astro pages
```

## Format Code

```bash
npm run format
```

Check formatting without changing files:

```bash
npm run format:check
```

VS Code is configured to format on save. Install these extensions for the best
experience:

- Astro
- Prettier - Code formatter

## Development Direction

The current page bodies are generated from the mirrored HTML as a first migration step. For cleaner long-term development, convert important pages one by one from `set:html` into hand-authored Astro components and data files.
