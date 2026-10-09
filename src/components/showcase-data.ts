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
      "automatically created using a predefined template, based on your plain-language request",
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
      "Security testing only runs after explicit authorization.",
      "Every request, decision and approver lands in the audit log",
    ],
    focus: "backend",
  },
  {
   eyebrow: "Tool Service",
word: "Tools",
title: "Approved tools. Controlled execution.",
tagline: "Run Nmap, Nuclei, OWASP ZAP, Semgrep, Gitleaks, Trivy, and more through validated inputs and defined scope.",
points: [
  "Commands are generated from approved templates, not arbitrary free text",
  "Every tool runs only against targets inside the authorized scope",
  "Destructive actions require explicit approval before running",
  "Only enabled and approved integrations can be used",
],
focus: "tools",
  },
  {
    eyebrow: "AI Service",
word: "Analysis",
title: "Findings, not raw output.",
tagline: "Turn scanner output into structured findings by classifying, correlating, prioritizing, and attaching evidence.",

points: [
  "Low-confidence findings are flagged NEEDS_REVIEW for human validation",
  "Severity is derived from scanner data, CVSS, or defined policy rules",
  "Related results from multiple tools are correlated into one finding",
  "AI explains the finding without changing the underlying evidence",
],

focus: "ai",
  },
  {
eyebrow: "Knowledge Service",
word: "Knowledge",
title: "Grounded in trusted sources.",
tagline: "Combine trusted security standards, vulnerability intelligence, and internal guidance to support every finding.",

points: [
  "Searches OWASP, CWE, CVE/NVD, advisories, and internal knowledge together",
  "Internal guidance is prioritized",
  "Relevant sources are attached so findings can be verified",
  "External vulnerability data can be refreshed when current information is required",
],

focus: "knowledge",
  },
  {
    eyebrow: "Local Viewer + Reports",
word: "Reports",
title: "Review it. Report it.",
tagline: "Inspect every assessment in one read-only view, then generate a handoff-ready security report.",

points: [
  "Filter findings by severity, target, category, status, and source tool",
  "Review masked evidence, validation status, remediation, and audit history",
  "See which findings are confirmed, rejected, or still need review",
  "Export reports with scope, methodology, findings, evidence, and remediation",
  "Keep assessment data available locally for review without rerunning tools",
],

focus: "viewer",
  },
];
