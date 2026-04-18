# CLAUDE.md

Guidance for AI assistants (Claude Code) working in this repository.

## Project Overview

This repo is the personal GitHub Pages site for **Amir Mazaheri**
(`amirmazaheri1990.github.io`) — a static résumé / CV plus a project
landing page for the ECCV 2018 *Visual Text Correction* (VTC) paper.

The site is a lightly customized fork of the **Start Bootstrap "Resume"**
template (v4.0.0-beta.2, Bootstrap 4). It is deployed automatically by
GitHub Pages from the `master` branch — the site is published as
served, there is no CI build step that produces a `dist/` output.

Because GitHub Pages serves files as-is, **any edit to `scss/*.scss` or
`js/resume.js` requires running the Gulp build and committing the
generated `css/resume.css`, `css/resume.min.css`, and `js/resume.min.js`
files alongside the source changes.** `index.html` references the
minified assets directly.

## Repository Layout

```
.
├── index.html              # Main résumé page (the site's home)
├── VTC/
│   └── index.html          # Project page for the Visual Text Correction paper
├── scss/                   # Source SCSS — edit these, then run gulp
│   ├── resume.scss         # Entry point; imports partials below
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _global.scss
│   ├── _nav.scss
│   ├── _resume-item.scss
│   └── _bootstrap-overrides.scss
├── css/                    # Generated — do NOT hand-edit
│   ├── resume.css          # Compiled from scss/resume.scss
│   └── resume.min.css      # Minified; referenced by index.html
├── js/
│   ├── resume.js           # Source — smooth-scroll, scrollspy, menu collapse
│   └── resume.min.js       # Generated; referenced by index.html
├── img/profile.jpg         # Profile photo shown in the sidebar
├── vendor/                 # Third-party libs copied from node_modules
│   ├── bootstrap/          # Bootstrap 4 beta (core CSS + JS bundle)
│   ├── jquery/             # jQuery 3
│   ├── jquery-easing/      # Easing plugin (used by smooth scroll)
│   ├── font-awesome/       # Icon font for social/nav icons
│   ├── devicons/           # Tech-stack icons
│   └── simple-line-icons/  # Additional icon set
├── gulpfile.js             # Build pipeline (Gulp 3)
├── package.json            # npm deps + template metadata
├── .travis.yml             # Legacy Travis config (not connected to deploy)
├── googlef6aaf7bba013404b.html  # Google Search Console verification — do not remove
├── LICENSE                 # MIT (Start Bootstrap original)
└── README.md               # Original template README (upstream)
```

## Development Workflow

### Install

```bash
npm install
```

This project predates modern Node. The Gulp 3 / `gulp-sass` 3 stack is
incompatible with Node 18+. Use **Node 10–12** (e.g. via `nvm use 10`) if
you hit `ReferenceError: primordials is not defined` or SASS binding
errors.

### Build and preview

| Command          | What it does                                                  |
|------------------|---------------------------------------------------------------|
| `gulp`           | Runs `sass`, `minify-css`, `minify-js`, `copy` (full build)   |
| `gulp dev`       | Starts BrowserSync, watches SCSS/JS/HTML, live-reloads        |
| `gulp sass`      | Compiles `scss/resume.scss` → `css/resume.css`                |
| `gulp minify-css`| Minifies `css/resume.css` → `css/resume.min.css`              |
| `gulp minify-js` | Uglifies `js/resume.js` → `js/resume.min.js`                  |
| `gulp copy`      | Refreshes `vendor/*` from `node_modules/*`                    |

If Gulp cannot be run in your environment, it is acceptable to edit
`css/resume.css` / `css/resume.min.css` / `js/resume.min.js` by hand and
keep them in sync with the source — but call this out explicitly in the
commit message.

### No tests

There is no test suite. `npm test` is not configured; `.travis.yml` is
a leftover from the upstream template.

## Editing Conventions

- **Content changes** (experience, education, publications, links) happen
  directly in `index.html`. The existing section pattern is:

  ```html
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="..">
    <div class="my-auto">
      <h2 class="mb-5">Section Title</h2>
      <div class="resume-item d-flex flex-column flex-md-row mb-5">
        <div class="resume-content mr-auto"> ... </div>
        <div class="resume-date text-md-right">
          <span class="text-primary">Date range</span>
        </div>
      </div>
    </div>
  </section>
  ```

  Keep that structure when adding new entries — the styles in
  `scss/_resume-item.scss` are tuned to it.

- **Navigation** is the `<nav id="sideNav">` block at the top of
  `index.html`. Each `<a>` uses `class="nav-link js-scroll-trigger"` and
  `href="#section-id"`; scrollspy + smooth scroll in `js/resume.js` wire
  the behaviour. If you add a section, add a matching nav link (and
  match the `id` exactly).

- **Styling changes** belong in `scss/` partials, not in the compiled
  CSS. Import new partials from `scss/resume.scss`.

- **Do not edit files in `vendor/`** by hand. They are refreshed by
  `gulp copy` from `node_modules`. If a dependency needs to change, bump
  it in `package.json` and re-run `npm install && gulp copy`.

- **VTC page** (`VTC/index.html`) is a separate, older standalone page
  with its own inline styles and links to externally hosted assets. It
  is not styled by the Bootstrap resume template. Treat it as isolated —
  changes to the résumé template should not touch it.

- **Comments in HTML**: avoid adding decorative or narrative comments.
  The upstream template has very few; keep it that way.

## Git Workflow

- `master` is the GitHub Pages publishing branch. Do **not** push
  directly to `master` from Claude sessions unless the user explicitly
  asks.
- This session's development branch is
  `claude/add-claude-documentation-AkE8n` (per task instructions).
  General rule: develop on a `claude/<topic>-<suffix>` branch, commit,
  and push with `git push -u origin <branch>`. Open a PR only when the
  user asks.
- When you change `scss/` or `js/resume.js`, commit the regenerated
  `css/*.css` and `js/*.min.js` in the same commit so Pages stays
  consistent.
- Keep `googlef6aaf7bba013404b.html` at the repo root — it is the Google
  Search Console verification file.

## GitHub Integration Notes

- GitHub MCP tools are scoped to `amirmazaheri1990/amirmazaheri1990.github.io`
  only. Do not attempt to reach other repos.
- Do not open PRs or post comments unless explicitly requested.

## Quick Reference for Common Tasks

- **Add a publication** → edit the `<ul>` inside `<section id="skills">`
  in `index.html`. No build needed (HTML only).
- **Change profile photo** → replace `img/profile.jpg` (square, served
  via `.rounded-circle`).
- **Change accent color / fonts** → edit `scss/_variables.scss`, then
  `gulp sass && gulp minify-css`, commit the CSS output.
- **Add a nav section** → new `<section id="x">` in `index.html` + new
  `<a href="#x" class="nav-link js-scroll-trigger">` in `#sideNav`.
- **Change scroll behaviour** → edit `js/resume.js`, then
  `gulp minify-js` and commit `js/resume.min.js`.
