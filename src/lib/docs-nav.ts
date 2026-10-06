import {
  BookMarked,
  BookOpen,
  Network,
  Rocket,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";

export type DocPage = { title: string; href: string; description: string };

export type DocGroup = {
  /** url segment under /docs (also the content key in src/content/docs) */
  id: string;
  title: string;
  /** group landing page; for single-page groups (Overview, Architecture) it is the page itself */
  href: string;
  description: string;
  icon: LucideIcon;
  pages: DocPage[];
};

/**
 * The docs structure, single source of truth for the docs sidebar, the navbar "Docs" and
 * "Guardrails" dropdowns, breadcrumbs, prev/next links and the sitemap. Adding a page = add it
 * here and add its content to src/content/docs/<group>.tsx under the same slug.
 */
export const DOCS_NAV: DocGroup[] = [
  {
    id: "overview",
    title: "Overview",
    href: "/docs",
    description: "What Reconix is, who it is for and the assessments it supports.",
    icon: BookOpen,
    pages: [],
  },
  {
    id: "getting-started",
    title: "Getting started",
    href: "/docs/getting-started",
    description: "Install the services and the terminal, then run your first assessment.",
    icon: Rocket,
    pages: [
      { title: "Requirements", href: "/docs/getting-started/requirements", description: "What you need before installing." },
      { title: "Installation", href: "/docs/getting-started/installation", description: "Start the services and install the terminal client." },
      { title: "Configuration", href: "/docs/getting-started/configuration", description: "The main settings in .env." },
      { title: "First assessment", href: "/docs/getting-started/first-assessment", description: "From request to report, step by step." },
    ],
  },
  {
    id: "assessments",
    title: "Assessments",
    href: "/docs/assessments",
    description: "How an assessment runs and what each template covers.",
    icon: ScanSearch,
    pages: [
      { title: "Assessment workflow", href: "/docs/assessments/workflow", description: "The seven steps and the approval gate." },
      { title: "Network security", href: "/docs/assessments/network", description: "IP addresses, hostnames and subnets." },
      { title: "Web applications", href: "/docs/assessments/web-applications", description: "Application URLs and HTTP evidence." },
      { title: "APIs", href: "/docs/assessments/apis", description: "Endpoints, methods and schemas." },
      { title: "Source code", href: "/docs/assessments/source-code", description: "Repositories, directories and dependencies." },
    ],
  },
  {
    id: "interfaces",
    title: "Interfaces",
    href: "/docs/interfaces",
    description: "The terminal you work in and the read-only viewer.",
    icon: SquareTerminal,
    pages: [
      { title: "Terminal", href: "/docs/interfaces/terminal", description: "Start assessments, edit the scope and approve actions." },
      { title: "Local assessment viewer", href: "/docs/interfaces/local-viewer", description: "Browse findings, evidence, the audit log and reports." },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    href: "/docs/configuration",
    description: "Templates, the Scope Manifest, policies and credentials.",
    icon: SlidersHorizontal,
    pages: [
      { title: "Templates", href: "/docs/configuration/templates", description: "The four assessment templates." },
      { title: "Scope Manifest", href: "/docs/configuration/scope-manifest", description: "Targets, permitted actions, exclusions and limits." },
      { title: "Policies", href: "/docs/configuration/policies", description: "The Risk Policy Table and execution limits." },
      { title: "Credentials", href: "/docs/configuration/credentials", description: "API keys and endpoints Reconix uses." },
    ],
  },
  {
    id: "guardrails",
    title: "Guardrails",
    href: "/docs/guardrails",
    description: "The checks and rules that keep an assessment safe.",
    icon: ShieldCheck,
    pages: [
      { title: "Authorized use", href: "/docs/guardrails/authorized-use", description: "Only assess what you may test." },
      { title: "Scope & safety", href: "/docs/guardrails/scope-and-safety", description: "Scope checks, command validation and limits." },
      { title: "Approval model", href: "/docs/guardrails/approval-model", description: "Who approves what, and when." },
      { title: "Credential handling", href: "/docs/guardrails/credential-handling", description: "How secrets are masked." },
      { title: "LLM data handling", href: "/docs/guardrails/llm-data-handling", description: "What the model sees, and what it never does." },
      { title: "Limitations", href: "/docs/guardrails/limitations", description: "What Reconix does not do." },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    href: "/docs/architecture",
    description: "How the terminal, backend, AI service and tool service fit together.",
    icon: Network,
    pages: [],
  },
  {
    id: "reference",
    title: "Reference",
    href: "/docs/reference",
    description: "Commands, the findings format and reports.",
    icon: BookMarked,
    pages: [
      { title: "CLI commands", href: "/docs/reference/cli-commands", description: "Terminal commands and slash commands." },
      { title: "Findings", href: "/docs/reference/findings", description: "Severity, confidence and evidence." },
      { title: "Reports", href: "/docs/reference/reports", description: "What a report contains and how to export it." },
    ],
  },
];

export type DocEntry = DocPage & { group: DocGroup; isGroup: boolean };

/** Every docs route in reading order: each group's landing, then its pages. */
export const DOCS_ENTRIES: DocEntry[] = DOCS_NAV.flatMap((g) => [
  { title: g.title, href: g.href, description: g.description, group: g, isGroup: true },
  ...g.pages.map((p) => ({ ...p, group: g, isGroup: false })),
]);

export const DOCS_ROUTES = DOCS_ENTRIES.map((e) => e.href);

export function findDoc(href: string): DocEntry | undefined {
  return DOCS_ENTRIES.find((e) => e.href === href);
}

/** Previous / next readable page. Group landings of multi-page groups are skipped (they only list pages). */
export function docNeighbours(href: string): { prev?: DocEntry; next?: DocEntry } {
  const reading = DOCS_ENTRIES.filter((e) => !e.isGroup || e.group.pages.length === 0);
  const i = reading.findIndex((e) => e.href === href);
  if (i < 0) return {};
  return { prev: reading[i - 1], next: reading[i + 1] };
}
