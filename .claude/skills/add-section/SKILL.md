---
name: add-section
description: Add content to the Reconix site the way the repo expects — a new landing-page section, a new showcase step (with its node-graph hub), or a new docs page. Use whenever asked to add, extend or restructure landing/docs content.
argument-hint: "landing <Name> | showcase <Word> | docs <slug>"
---

# Add a section to the Reconix site

Pick the recipe that matches `$ARGUMENTS` (or ask which one if neither the args nor the request make it clear). Read `CLAUDE.md` first if you have not already — the rules below assume its conventions (server components by default, figlet is server-only, tokens live in `globals.css`, every animation respects reduced motion).

Before writing files, state the plan in 3–5 lines (which files, what changes). Then do it.

## Recipe A — landing-page section (`landing <Name>`)

1. Create `src/components/sections/<kebab-name>.tsx`. It is a **server component**: no `"use client"`. Model it on `workflow.tsx`:
   - Keep copy in a `const` array at the top of the file, JSX below it.
   - Outer wrapper is `<SectionShell id="<kebab-name>" backdrop="<grid|dots|hazard|scanlines|glow|none>" tint="<primary|accent|muted>">` from `src/components/section-shell.tsx`. It renders the `<section>` (anchor id, border, `py-20 lg:py-28`, `overflow-clip`), the themed backdrop layer and the inner `mx-auto max-w-6xl px-4 sm:px-6` container. Pick a backdrop different from both neighbours; pass `className="bg-card/40"` to alternate the band colour; use `containerClassName` for grid or width overrides (`workflow.tsx` is the grid example, `cta.tsx` the narrow `max-w-3xl text-center` example). Do not add your own container div. New backdrops/tints go in `section-themes.ts` + `globals.css`.
   - Heading block: eyebrow `<p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">`, then `<AsciiBanner text="<ShortWord>" />`, then `<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">`, then a `text-base leading-relaxed text-muted-foreground sm:text-lg` paragraph.
   - Wrap animated groups in `<Reveal>` and mark each animated child with `data-reveal`. Do not import gsap directly in a section.
   - Use `Badge` / `Card` / `StatusChip` from `src/components/ui/` and token utilities (`bg-primary`, `text-success`, `border-accent/50`, …). No hex colours in components; if a new colour is needed, add a token to `globals.css` `:root` **and** `@theme inline`.
2. Export a PascalCase component and insert it into the stack in `src/app/page.tsx` at the right position.
3. If it deserves a nav entry, add `{ href: "/#<kebab-name>", label }` to `links` in `src/components/site-nav.tsx` (the nav only shows on `md:` and up; keep it to ~5 items).

## Recipe B — showcase step (`showcase <Word>`)

The showcase is one scrolling node map; every step is a hub the camera flies to. Three files move together:

1. `src/lib/node-graph.js` (plain JS, **no imports**):
   - Add a hub to `HUBS`: `{ id, label, x, y }` with `x`/`y` in 0..1. Pick a spot that does not collide with existing hubs (they sit roughly on a ring around `reconix` at 0.5/0.5) — leaves fan outward from the canvas centre, so keep hubs ≥ ~0.2 from the centre.
   - Add 3–6 leaves to `LEAVES` with `hub: "<id>"`; `kind: "gate"` draws it amber (approval points).
   - Add `["<id>", "reconix"]` to `HUB_EDGES`, plus any meaningful hub-to-hub edge.
2. `src/components/showcase-data.ts`: append a `ShowcaseItem`. `focus` **must equal the hub id**. `word` is drawn as a figlet banner — keep it ≤ 9 characters ("Knowledge" is the current max). Three `points`, one sentence each.
3. `src/components/sections/showcase.tsx`: nothing to add for the step itself. Height, dots and camera path derive from `SHOWCASE.length`, and the text items share one grid cell, so the column grows to the tallest item on its own.

If the order of steps changes, keep the alternation in mind: odd indices render text on the right and push the hub left.

## Recipe C — docs page (`docs <slug>`)

1. Create `src/app/docs/<slug>/page.tsx` (server component):
   ```tsx
   import { DocsLayout, DocSection, Code } from "@/components/docs-layout";

   export const metadata = { title: "<Title> · Reconix" };

   export default function <PascalTitle>() {
     return (
       <DocsLayout title="<Title>" lede="<one-sentence summary>">
         <DocSection title="…">…</DocSection>
       </DocsLayout>
     );
   }
   ```
   - Lists: plain `<ul>`/`<li>` inside `DocSection` are styled already; ordered lists use `<ol className="space-y-2 [&_li]:ml-5 [&_li]:list-decimal">`.
   - Inline code: `<span className="font-mono text-foreground">…</span>`; blocks: `<Code>{`…`}</Code>`.
   - Internal links: `<Link className="text-primary underline-offset-4 hover:underline">`.
2. Add `{ href: "/docs/<slug>", label }` to `nav` in `src/components/docs-layout.tsx` (this is the only place the sidebar is defined).
3. If it is a guide, add it to the "Guides" list in `src/app/docs/page.tsx`.

## Finish

Run and report the real output of:

```bash
npm run lint && npx tsc --noEmit && npm run build
```

Then hand the changed files to the `ui-reviewer` subagent (or ask the user to run it) for a conventions pass.
