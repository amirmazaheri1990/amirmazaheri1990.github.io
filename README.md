# amirmazaheri1990.github.io

Personal site for **Amir Mazaheri** — computer vision researcher and
engineer. Built with [Astro](https://astro.build/) and deployed to
GitHub Pages.

**Live:** <https://amirmazaheri1990.github.io>

## Quick start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static build into dist/
npm run preview   # serve dist/
```

## Content

- **Publications** — one Markdown file per paper in
  `src/content/publications/`.
- **Projects** — one Markdown file per project in `src/content/projects/`.
- **Bio / contact / social links** — `src/data/site.ts`.
- **CV** — human version: `src/pages/cv.astro`; machine-readable JSON
  Resume: `public/cv.json`; LLM summary: `public/llms.txt`.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which
builds the site and publishes it via the GitHub Pages deploy action.
Repo **Settings → Pages → Source** must be set to **GitHub Actions**.

## Notes for AI assistants

See [`CLAUDE.md`](./CLAUDE.md) for the full working guide — repo layout,
design language, content-collection schemas, SEO/agent conventions, and
known gotchas.

## License

Site code is MIT-licensed. See [`LICENSE`](./LICENSE).
