export type ShowcaseItem = {
  eyebrow: string;
  word: string; // short word drawn as the ASCII banner
  title: string;
  tagline: string;
  points: string[];
  focus: string; // hub id in the node graph
};

export const SHOWCASE: ShowcaseItem[] = [
  {
    eyebrow: "Scope Manifest",
    word: "Scope",
    title: "Scope first. Always.",
    tagline: "Targets, permitted actions, exclusions and limits, written down and approved.",
    points: [
      "Drafted from a template and your plain-language request",
      "You edit targets, exclusions and assessment limits before anything runs",
      "Selecting a template never authorizes testing on its own",
    ],
    focus: "terminal",
  },
  {
    eyebrow: "Policy Engine",
    word: "Policy",
    title: "Guardrails on every action.",
    tagline: "Scope, command, risk and limit checks before each tool call.",
    points: [
      "Out-of-scope targets and actions are blocked",
      "LOW runs automatically; MEDIUM and HIGH wait for your approval",
      "Every request, decision and approver lands in the audit log",
    ],
    focus: "backend",
  },
  {
    eyebrow: "Tool Service",
    word: "Tools",
    title: "Approved tools. One scope.",
    tagline: "Nmap, Nuclei, OWASP ZAP, Semgrep, Gitleaks, Trivy and more, run from validated inputs.",
    points: [
      "Commands are built from configured templates, never free text",
      "Results are normalized into one findings format",
      "Secrets are masked before output is shown or stored",
    ],
    focus: "tools",
  },
  {
    eyebrow: "AI Service",
    word: "Analysis",
    title: "Findings, not raw output.",
    tagline: "Classify, correlate across tools, rate severity and attach evidence.",
    points: [
      "Confidence below 0.80 is marked NEEDS_REVIEW for a person",
      "Severity comes from the scanner or CVSS, never a guess",
      "Each finding keeps its original evidence linked",
    ],
    focus: "ai",
  },
  {
    eyebrow: "Knowledge",
    word: "Knowledge",
    title: "Grounded in trusted sources.",
    tagline: "Hybrid search over OWASP, CWE, CVE/NVD and your internal guidance.",
    points: [
      "BGE-M3 embeddings in Qdrant plus live NVD lookups",
      "Internal knowledge first, filtered by the user's role",
      "Missing facts are marked unknown instead of invented",
    ],
    focus: "knowledge",
  },
  {
    eyebrow: "Local Viewer + Reports",
    word: "Reports",
    title: "Review it. Report it.",
    tagline: "A read-only viewer for every assessment, and a report ready to hand over.",
    points: [
      "Findings filtered by severity, target, category and tool",
      "Masked evidence, validation status and the full audit trail",
      "Export the report as PDF with scope, findings and remediation",
    ],
    focus: "viewer",
  },
];
