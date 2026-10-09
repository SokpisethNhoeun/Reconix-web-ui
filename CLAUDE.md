# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Public landing page + docs site for **Reconix** (an AI terminal assistant for authorized security assessments). Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, GSAP ScrollTrigger, figlet. No backend, no database, no auth — it is a static marketing/docs site.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # next build (output: "standalone")
npm run start      # serve the production build
npm run lint       # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test runner configured. Type-checking happens during `next build`; run `npx tsc --noEmit` for a standalone check.

Docker (what the server runs): `docker compose up -d --build` — multi-stage Dockerfile copies `.next/standalone`, serves on container port 3000, mapped to host **8080**.

## Git caveat

The git repository root is `/home/ahboy` (the home directory), not this folder. `git status` from here lists the whole home dir; scope git commands to `.` (e.g. `git status .`, `git add .`).

## Architecture

### Page composition
- `src/app/page.tsx` — the landing page; it is just a stack of section components from `src/components/sections/` (hero → integrations → showcase → product-preview → workflow → categories → cta), preceded by `ScrollAmbient` (the fixed scroll-linked glow; landing page only).
- `sections/integrations.tsx` is the section under the hero: the tools Reconix runs and the stack it is built on, drawn as a layered architecture diagram, top to bottom: interfaces (terminal + read-only viewer) → backend control plane (with the checks it enforces) → services (AI, knowledge & data, security tools) → infrastructure foundation. Rows share a 12-column grid on `lg` so each `.stack-link` connector sits under the layer it leaves (`data-dir="up"` for the viewer's read path); below `lg` the layers stack and each gap shows one combined, centred connector. Groups live in `INTEGRATION_GROUPS` in `src/components/integrations-data.ts` (official marks from the `simple-icons` package where one exists, otherwise a lucide glyph; a header `icon` per group) and each item renders through `src/components/tool-logo.tsx` (`size="sm"` inside the diagram). Marks are soft white at rest and take the vendor colour on hover: `ToolLogo` derives `--brand` from the simple-icons `hex` (lightened for the dark background; greyscale brands and lucide glyphs fall back to `--primary`). CSS: `.integration-card`, `.stack-link`, `.stack-hlink`, `.stack-foundation`, `.tool-mark` in `globals.css`. Only list integrations the product copy already claims (the components table in `docs/architecture/page.tsx`).
- `src/app/layout.tsx` — loads three Google fonts via `next/font` and exposes them as CSS variables (`--font-display` Space Grotesk, `--font-body` IBM Plex Sans, `--font-mono` JetBrains Mono); mounts `SmoothScroll`, `ScrollProgress`, `SiteNav`, `SiteFooter` around every page.
- Topic sections (integrations, product-preview, workflow, categories, cta) are wrapped in `SectionShell` (`src/components/section-shell.tsx`): it owns the anchor `id`, border, vertical rhythm, the inner container, a themed `backdrop` and the `tint` the ambient layer fades to. Backdrop and tint names live in `src/components/section-themes.ts`; their CSS (`.backdrop-*`, `.ambient-layer[data-tint]`) in `globals.css`. Adding a backdrop = add to `BACKDROPS` + a `.backdrop-<name>` rule; a tint = `TINTS` + an `.ambient-layer[data-tint=…]` rule. The shell uses `overflow-clip`, never `overflow-hidden` (hidden would make the section a scroll container and break any `position: sticky` child).
- Docs. **`DOCS_NAV` in `src/lib/docs-nav.ts` is the single source of the docs structure** (groups → pages `{ title, href, description }`): the docs sidebar, the navbar Docs/Guardrails dropdowns, the footer, breadcrumbs, prev/next links and the sitemap are all built from it. Routes: `/docs` (overview, `src/app/docs/page.tsx`), `/docs/architecture` (static page), `/docs/[group]` (group landing: description + page cards) and `/docs/[group]/[page]` (both `dynamicParams = false`, so only listed pages exist). Page content lives in `src/content/docs/<group>.tsx` as `{ lede, draft?, body }` keyed by slug and registered in `src/content/docs/index.ts`. Adding a page = add it to `DOCS_NAV` + add its content under the same slug. `DocsLayout` (`src/components/docs-layout.tsx`) takes the page `href` and derives title, breadcrumb and prev/next; it renders `DocsSidebar` (client: collapsible groups, active page, "Docs menu" toggle below `lg`) and `DocsToc` (client, xl: "On this page" from `h2[data-toc]`). Building blocks: `DocSection` (h2 with a slug id), `Code`, `Mono`, `Callout` (`note` / `warning` / `draft`), `DocLink`. `draft: true` shows the "Draft: content pending" callout. Docs content must only state what the product copy already claims; mark gaps as Draft instead of inventing. Landing sections stay short and link to the matching docs page with `DocsMoreLink`.

### Navbar
`site-nav.tsx` (server) renders the wordmark, `NavMenus` (md+) and `MobileMenu` (< md) from `src/components/nav-menu.tsx` (client), a `GithubLink` (`src/components/github-link.tsx`, `SITE_REPO_URL`) and `NavCta`. The four dropdowns are data in `src/components/nav-data.ts` (`NAV_MENUS`): Features and How it works point at landing sections, Guardrails and Docs at the docs (from `DOCS_NAV`). Dropdowns open on hover (90 ms delay) and click; Escape closes and refocuses the trigger, ArrowDown opens and focuses the first item, outside click / Tab-away / item click / route change close. Panels are centred under the `<nav>` (its positioning parent) so they never overflow. The mobile panel is `absolute` under the header, not `fixed` (the header's `backdrop-blur` makes it the containing block for fixed children) and carries `data-lenis-prevent`. Hash links in both go through the Lenis click handler in `smooth-scroll.tsx`.

### Footer
`site-footer.tsx` (server) builds everything from data: Product and the bottom one-line nav from `NAV_MENUS` (each menu's `href`), Documentation from `DOCS_NAV` (minus Guardrails), Guardrails from the Guardrails menu, Community from `SITE_REPO_URL` (GitHub, Issues) plus `SITE_COMMUNITY`. Wording switches in `src/lib/site.ts`: `SITE_NAME_MEANING` (tagline under the wordmark; falls back to `SITE_TAGLINE`) and `SITE_OPEN_SOURCE` (copyright line). The copyright year is computed at build time.

### Server/client boundary (important)
Almost everything is a React Server Component. Only ten files are `"use client"`: `nav-cta.tsx`, `workflow-stepper.tsx`, `reveal.tsx`, `scroll-progress.tsx`, `typed-line.tsx`, `node-graph.tsx`, `sections/showcase.tsx`, `smooth-scroll.tsx`, `scroll-ambient.tsx`, `dot-field.tsx`.

- `ascii-banner.tsx` calls `figlet.textSync` and **must stay server-only** (figlet fonts are not bundled for the client). It takes `font` (default `"ANSI Shadow"`, which the hero also uses), `variant` (`"section" | "hero"`), `tone`, `dim` (a filler char rendered faded) and `decorative` (aria-hidden; the caller supplies the real heading). The presentational half is `ascii-art.tsx` (`AsciiArt`, rows as `<span class="block" style="--i">`), which has no figlet import and is safe to use from client code. Because `Showcase` is a client component, `page.tsx` pre-renders the banners on the server and passes them in as a `banners` prop rather than letting `Showcase` import `AsciiBanner`. Keep this pattern if you add banners elsewhere in client code.
- `typed-line.tsx` server-renders the full text and only animates after hydration, so the page reads correctly without JS.

### GSAP conventions
Each client file that animates calls `gsap.registerPlugin(ScrollTrigger, useGSAP)` itself and uses `useGSAP(..., { scope: ref })`. Every animation checks `prefers-reduced-motion` and bails (CSS animations are also disabled under that media query in `globals.css`). `Reveal` animates children marked `data-reveal` (falls back to the wrapper) with a one-shot ScrollTrigger and refreshes triggers after `document.fonts.ready`. Gotcha: inside a `useGSAP(..., { scope })` callback, selector strings **and `gsap.utils.toArray(selector)`** are scoped to that ref; to reach elements elsewhere on the page (as `ScrollAmbient` does for `[data-ambient]` sections) use `document.querySelectorAll` explicitly.

### Smooth scrolling (Lenis)
`smooth-scroll.tsx` creates a Lenis instance on **native scroll** (not GSAP ScrollSmoother: the showcase relies on `position: sticky`, which transform-based smoothing breaks). It is stepped from `gsap.ticker` and calls `ScrollTrigger.update()` on every Lenis scroll event, so every ScrollTrigger on the site is Lenis-driven without further wiring. It is the one client file that uses `useEffect` instead of `useGSAP` (Lenis is not a GSAP object). Rules: do not add `ScrollTrigger.normalizeScroll`, `scrollerProxy`, numeric `scrub` lags (Lenis already eases) or `scroll-behavior` hacks; native `scroll-behavior: smooth` applies only to `html:not(.lenis)` as a no-JS fallback. Same-page hash links (`/#section` while on `/`) have one owner: a capture-phase click listener in `smooth-scroll.tsx` calls `lenis.scrollTo(target)` (which honours `scroll-mt-20`) and `history.pushState`, and its `preventDefault` makes Next's `<Link>` bail instead of jumping with `scrollIntoView`; Lenis's own `anchors` option stays off. Cross-page hash links navigate normally. Add `data-lenis-prevent` to any nested *vertical* scroller. Lenis is not created under reduced motion. Never set a background on `html` and keep sections translucent (no opaque `bg-background` except the hero), or the fixed `ScrollAmbient` layer is hidden.

### The workflow stepper
`sections/workflow.tsx` (server) renders the header and `WorkflowStepper` (`src/components/workflow-stepper.tsx`, client); the seven steps, their bullets and the mock terminal previews live in `src/components/workflow-data.ts` (illustrative data only: example.com / RFC 5737 addresses). The rail is an ARIA tablist with a roving tabindex (Left/Right/Home/End); hover previews a step without selecting it; the default selection is the `gate` step (Approval), which is amber in every state. All seven panels are stacked in one grid cell so the box is as tall as the tallest panel and switching never shifts layout; they swap through `.wipe[data-state]`. The card chrome sits on the wrapper, not the panels, because hidden panels stay in the stack and would paint over the active one. Step/connector colours are `.wf-*` rules in `globals.css`, driven by `data-state` (`active` / `done` / `todo`). Below `lg` the rail scrolls sideways with scroll-snap and edge fades; selecting a step centres it inside the rail (never scrolls the page).

### The showcase + node graph (the complex part)
- `src/lib/node-graph.js` is **plain JavaScript with no imports, on purpose** (README: "keep it free of imports"). It owns the data model — `HUBS`, `LEAVES`, `HUB_EDGES`, `COLORS` — and exports `mountNodeGraph(canvas, opts)` (returns `{ setFocus, setView, hubs, destroy }`), `showcaseView(progress, hubIds, side)` (maps scroll progress 0..1 to a camera `{x, y, zoom, index, overview}`) and `SHOWCASE_TAIL` (extra viewport-heights after the last hub). In that tail the camera holds, then pulls back to the whole map; `overview` 0..1 is written to the section as the `--overview` CSS variable, which fades the text layer and thins the shades.
- `src/lib/dot-field.ts` + `src/components/dot-field.tsx`: the cursor-reactive dot grid used as the `dots` backdrop (dots near the pointer swell, tint primary and are pushed away, then spring back). Colours are read from the `--foreground` / `--primary` tokens the canvas inherits; the loop only runs while dots are moving and is static under reduced motion or on coarse pointers.
- `src/components/node-graph.tsx` is the thin React wrapper around `mountNodeGraph`; it hands the controls back through `onReady`.
- `src/components/sections/showcase.tsx` renders a section `n * 100vh` tall with a `sticky` full-screen inner panel. A scrubbed ScrollTrigger calls `showcaseView` on every update, pushes the camera to the canvas, and switches the active text item. Odd items flip the text to the right and push the focused hub left (`side` param). Nothing moves between steps: every text item keeps its own column (even = left, odd = right on `lg`) in the same grid row, so the row is as tall as the tallest item and steps crossfade in place; the old item fades out and the new one wipes in left→right via `.wipe[data-state]` in `globals.css`. Two `showcase-fade` shade layers (`--fade-dir` 90deg / 270deg) crossfade by opacity instead of one gradient flipping, and `node-graph.js` eases each node's brightness toward its lit/dimmed goal so a focus change glides. There are no progress dots.
- `src/components/showcase-data.ts` holds the `SHOWCASE` items. Each item's `focus` **must match a hub `id` in `node-graph.js`**. Adding a showcase step = add an item here (and a hub/leaves in `node-graph.js` if it needs a new one); the section height, dots and camera path derive from the array length.

### Styling / design tokens
- Tailwind v4, CSS-first: there is no `tailwind.config`. Colour tokens live as CSS variables in `src/app/globals.css` `:root` and are mapped to utilities through `@theme inline` (`bg-primary`, `text-success`, `border-border`, `text-muted-foreground`, `font-display`, `font-mono`, …). Add new tokens there, not as hardcoded hex in components. Backdrop/ambient CSS mixes tokens with `color-mix(in oklab, var(--primary) 9%, transparent)` rather than rgba literals.
- Palette intent: dark operator console; `--primary` teal for UI and the hero glow, `--accent` amber for approval gates (MEDIUM/HIGH), `--success` green for pass / LOW-risk states. Dark-only (`color-scheme: dark`), no light theme.
- Hero/banner effects (`.hero-scan`, `.ascii-banner`, `.ascii-banner--section`, `.ascii-banner--hero` + its row boot-in, `.cursor`) and the section backdrops (`.backdrop`, `.backdrop-*`, `.ambient-layer`) are plain CSS classes in `globals.css`. The hero reuses `.backdrop-glow` so it bookends with the CTA.
- `src/components/ui/` (Button, Card, Badge, StatusChip) are hand-written shadcn-style primitives using `cva` + `cn()` from `src/lib/utils.ts`; they were not installed via the shadcn CLI, so edit them directly. Badge variants: `default`, `accent`, `success`, `muted`, `outline`, `status`. Button-looking links (hero, CTA, nav) are `next/link` anchors styled with the exported `buttonVariants`; never nest `<Button>` inside `<Link>`.

### Metadata, SEO and hardening
- `src/lib/site.ts` is the single source for the site URL, name, tagline, description the Reconix repository URL (`SITE_REPO_URL`, currently a placeholder) and the public route list (`SITE_ROUTES` = `/` + every docs route from `DOCS_NAV`). `layout.tsx` builds `metadata` from it (`metadataBase`, OpenGraph, Twitter, robots), `src/app/robots.ts` and `src/app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml`, and `src/app/opengraph-image.tsx` renders the share card with `next/og`. New docs pages reach the sitemap through `DOCS_NAV`; other new pages go into `SITE_ROUTES`.
- `SITE_URL` is read at **build time** (pages are prerendered). Pass it as the `SITE_URL` Docker build arg / CI env; it falls back to `http://localhost:3000`.
- `opengraph-image.tsx` repeats the palette as literals because Satori cannot read CSS variables. Together with `node-graph.js` `COLORS` it is the only place hex colours are allowed; keep both in step with `globals.css`.
- `next.config.ts` disables the `X-Powered-By` header, enables strict mode and sends baseline security headers (`nosniff`, referrer policy, `X-Frame-Options: DENY`, permissions policy). There is no CSP: Next's inline scripts would need per-request nonces.

### Performance conventions
- `NodeGraph` pauses its canvas loop whenever the canvas is more than 200px outside the viewport (IntersectionObserver → `pause()` / `resume()` on the controls); `DotField` only runs while dots are moving. Any new canvas should idle the same way.
- `TypedLine` keeps the whole tagline in the layout and makes the untyped part transparent, so typing causes no layout shift. Do not reintroduce a "clear then type" approach.
- Fonts are self-hosted by `next/font` (latin subset only); there are no raster images. `public/` holds nothing but what the app references.

### Content notes
- Marketing copy and docs describe the Reconix product (scope manifest → policy engine → tool service → AI analysis → knowledge → viewer/reports). The install commands on the Getting started docs page are placeholders until the real repo/packages exist (per README).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
