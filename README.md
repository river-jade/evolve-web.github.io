# Evolve Website

A Next.js site, deployed on Vercel.

## Editing pages

Each page lives in its own folder under `app/`, and the folder path is the URL. For example, `/values` is `app/values/page.tsx`. To change a page's text, edit that file.

Text pages use the `ContentPage` layout from `components/ContentPage.tsx`. At the top of each page file, `page` sets the title and the summary shown in search results and link previews. Links go in `<A href="...">`: pages on this site open in place, and other websites open in a new tab.

The sitemap picks up new pages automatically.

## Workshops and schedule

Workshop and schedule data come from Google Sheets. To rebuild the JSON files, run:

```bash
pnpm run import-workshops <year>
pnpm run import-schedule <year>
```

## Running locally

```bash
pnpm install
pnpm dev
```
