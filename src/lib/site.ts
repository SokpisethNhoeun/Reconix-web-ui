/**
 * Site-wide identity used by the metadata in layout.tsx, robots.ts, sitemap.ts
 * and the OpenGraph image. `SITE_URL` must be known at build time (pages are
 * prerendered), so pass it as a Docker build arg / CI env; it falls back to
 * localhost for local builds.
 */
export const SITE_URL = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "Reconix";
export const SITE_TAGLINE = "AI-planned security assessments inside an approved scope.";
export const SITE_DESCRIPTION =
  "An AI-powered terminal assistant that plans authorized security assessments, keeps every action inside an approved scope, and turns tool results into clear findings and reports.";
/** Every public route, for the sitemap. Add new pages here. */
export const SITE_ROUTES = ["/", "/docs", "/docs/getting-started", "/docs/architecture"] as const;
