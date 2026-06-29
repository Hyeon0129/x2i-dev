# x2i-dev (pyron.dev)

Personal engineering blog. Next.js 16 (App Router, Turbopack), React 19, TypeScript, CSS Modules + one large global stylesheet for the homepage/shared chrome.

## Stack & structure

- `src/app/page.tsx` — homepage: `Hero`, `TvSection` (PROFILE), `SkillsSection`, `HistorySection`, `ProjectsSection`, `BlogSection`.
- `src/app/globals.css` — one large global stylesheet (~2900+ lines) holding all homepage/shared-chrome CSS, including the entire light theme as a block of `html[data-theme="light"] ...` overrides appended near the end of the file.
- `src/app/blog/**` — blog index + post pages, mostly CSS Modules (`*.module.css`).
- `src/components/Header.tsx`, `Footer.tsx` — shared chrome, both theme-aware.
- `src/components/HeroParticles.tsx` — canvas ambient particle animation behind the Hero, theme-aware fill/alpha.
- `src/lib/markdown.ts` — `markdown-it` + `markdown-it-container` (custom `:::note` / `:::warning` admonitions) + Prism.js for blog post rendering.
- `src/lib/posts.ts` — reads posts from `content/blog/*.mdx`. `content/blog/codeblock.mdx` is a **gitignored sandbox file** used to prototype code-block/admonition styling — never add filters to exclude it from listings/search/stats unless explicitly asked (this was tried once and reverted; see Conventions below).

## Theme system (dark default, light opt-in)

- `data-theme="dark" | "light"` attribute on `<html>`, default `"dark"`.
- `src/app/layout.tsx` has an inline `<script>` (runs before hydration) that reads `localStorage.getItem('theme')` and sets the attribute immediately, defaulting to `'dark'` on any failure/missing value, to prevent a flash of the wrong theme. `suppressHydrationWarning` is set on `<html>`.
- Toggled from both `Header.tsx` and `Footer.tsx`; writes to the attribute + `localStorage`.
- Components that need to react to the live theme (not just CSS) — `TvSection`, `HeroParticles` — use a `MutationObserver` on `document.documentElement`'s `data-theme` attribute rather than re-reading `localStorage`, since the toggle can be flipped from a different component instance.
- **All light-theme CSS lives in `html[data-theme="light"] ...`-scoped rules only.** Never edit a base/dark rule to add light behavior — add a separate light override instead. This was an explicit, repeated instruction.

### Section background separation (important, easy to get wrong)

Dark theme separates `.hero` from everything below it (`.below-bg`, wrapping TvSection/Skills/History/Projects/Blog) using **one mechanism only**: both are the exact same flat black, and the sole visual seam is the 1px `.divider` line. There is no gradient fade between them.

Light theme must mirror this exactly — not invent a softer transition:
- `.hero` → one flat toned color (currently `#dbe1ee`), no gradient fade toward white.
- `.below-bg` → pure `#ffffff`, no gradient.
- `.divider` → the only seam (`border-bottom-color: rgba(15,17,21,0.1)`).

A prior iteration added a `linear-gradient(180deg, #eef1f7 0%, #ffffff 360px)` fade on `.below-bg` to make the transition "feel continuous" — this was wrong and was called out by the user as not matching how dark mode does it. If the separation ever looks off again, check first whether something reintroduced a gradient/fade here instead of a flat color.

## Settled component designs (don't redesign without being asked)

- **Admonitions**: only `note` and `warning` exist (tip/important/danger were explicitly dropped as redundant). Each has distinct icon color + text tint, dark box is `#1a1a1a`.
- **Code blocks**: x.ai-derived design — language tabs (`.code-tabs-group`, `.code-tabs-bar`, `.code-tabs-tab`), icon-swap copy button (`.code-copy-btn`, `.is-copied` class swaps icon to a checkmark), `pre[data-title="terminal" i]::before` shows an icon instead of a text label.
- **Footer**: `.shell` (max-width 1280px) > `.topLine` (inset divider) + `.inner` (`.colLeft` + `.divider` + `.navArea`) + `.bottomRow`. Logo top-left, tagline/copyright bottom-left (`.leftBottom`), Site/Categories/Contact nav columns centered (`.navGrid`), blog stats row (`/api/blog-stats`) centered below nav columns, theme toggle in `.bottomRow`.
- **Header**: active-tab detection via `usePathname()`, theme toggle (sun/moon SVG), wider `.search-btn` with magnifier icon + "Search" + `<kbd>⌘K</kbd>`.
- **PROFILE / TvSection light-theme visual** (`.light-card` in `globals.css`, JSX in `page.tsx`'s `TvSection`): a macOS-style dark editor window — traffic-light dots (`.light-card-dots`), filename tab (`.light-card-filename`, currently `profile.ts`), line-number gutter (`.light-card-gutter`), dark surface (`#14161c` body / `#1b1e25` title bar) rather than a flat white box, orange blinking cursor (`.light-card-cursor`). The literal typed text (`"> Hello, I'm\n_ a Server Engineer."`) is fixed content — only the surrounding visual chrome is open to redesign. This replaced an earlier plain-bordered-box-with-orange-bar version that was rejected as too plain ("허접"), and before that, a full-width centered "light-hero" redesign (duplicate particles, floating skill chips) from an unrelated session that broke the 2-column grid and was reverted.
- **Hero image** (`.hero-image`, asset at `/images/intro.png`): same PNG/position/composition in both themes. Light theme recolors it via CSS `filter: invert(0.93) brightness(1.08) contrast(0.92) saturate(1.1)` (turns the near-black device shell into a light silver mockup) plus a blurred radial-gradient glow behind it (`.hero-right::before`, orange→slate) standing in for the neon halo dark mode gets for free against pure black. Don't swap this for a different asset — recolor in place.
- **Hero title glow**: dark mode gets a white `text-shadow` neon glow against black. Light mode's equivalent is a warm amber halo (`rgba(249,115,22,.18)`, matching the site's existing orange accent used elsewhere — cursor color, CTA hover) layered into the title's `text-shadow`, not a literal copy of the white glow.

## Conventions learned this session (follow these)

1. **Never modify code beyond the literal scope of what was asked.** A session once added `&& file !== 'codeblock.mdx'` filters to `posts.ts`/search/stats routes unprompted, reasoning it was "cleaning up" a sandbox file leaking into stats. The user explicitly rejected this ("내가 시키지않은일은 맘대로 수정하지마") and it was reverted. If something looks worth cleaning up but wasn't asked for, mention it — don't just do it.
2. **CSS Modules produce dash-separated hashed class names** (`footer-module__<hash>__footer`), not underscore-separated. When writing selectors against CSS-module output, verify the real class names via the rendered HTML (e.g. `curl localhost:3000 | grep ...`) rather than guessing the hash format.
3. **Avoid `[class*="X"]` substring selectors** for anything but a very specific, checked string — `[class*="line"]` once matched `.timeline-inner` (because "timeline" contains "line") and painted an unwanted background across the whole History section. Prefer explicit class names, or the CSS-module pattern `[class*="<file>-module__"][class$="__<name>"]` when the hash is unknown but the file/name are.
4. **Multiple sessions/agents have touched this repo in parallel** (evidenced by unrecognized commits appearing in `git log` mid-session). Always re-read the live file state before editing instead of trusting in-context memory of what a file currently contains — a previous turn's "this is already fixed" can be stale.
5. **Only commit/push when explicitly asked.** This has held for the whole session; don't infer permission from a prior round's commit.
6. Dev server is normally already running on port 3000 outside of any tool-managed process — a second `next dev` instance can't start in the same repo (`.next/dev/lock`). Don't kill the user's running server to start a tracked preview instance; fall back to `curl` + `tsc --noEmit` for verification, or ask before touching the running process.
