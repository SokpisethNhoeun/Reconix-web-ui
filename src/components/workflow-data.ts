import {
  ClipboardList,
  FileOutput,
  LayoutTemplate,
  MessageSquareText,
  Play,
  ScanSearch,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/** Colour role of a preview line or status; maps to the palette tokens in globals.css. */
export type Tone = "muted" | "foreground" | "primary" | "success" | "accent";

export type PreviewLine = {
  text: string;
  tone?: Tone;
  /** right-aligned status, e.g. a check result */
  status?: { label: string; tone: Tone };
  /** a row of chips instead of plain text (e.g. the four templates) */
  chips?: { label: string; active?: boolean }[];
};

export type WorkflowStep = {
  id: string;
  /** one word on the rail */
  label: string;
  icon: LucideIcon;
  title: string;
  body: string;
  detail: string[];
  /** a terminal-style mock of what the user sees at this step (fake data only) */
  preview: { title: string; lines: PreviewLine[] };
  /** the human approval gate: amber everywhere, even when not selected */
  gate?: boolean;
  /** extra callout under the bullets (Execution: the second approval point) */
  note?: string;
};

/**
 * The seven steps of an assessment, shown by WorkflowStepper. Copy must stay in
 * step with showcase-data.ts and docs/architecture: no claims beyond those.
 * Preview data is illustrative only (example.com / RFC 5737 addresses).
 */
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "request",
    label: "Request",
    icon: MessageSquareText,
    title: "Describe the task",
    body: "Tell Reconix what you want assessed, in plain language, right in the terminal.",
    detail: [
      "No command syntax: describe the target and what you want checked",
      "The request and a template together become the draft scope",
      "Nothing runs at this point",
    ],
    preview: {
      title: "reconix · terminal",
      lines: [
        { text: "> scan the staging API for auth issues", tone: "foreground" },
        { text: "request noted", tone: "muted", status: { label: "no action", tone: "muted" } },
        { text: "next: choose a template", tone: "primary" },
      ],
    },
  },
  {
    id: "template",
    label: "Template",
    icon: LayoutTemplate,
    title: "Choose a template",
    body: "Pick one of four templates: Network, API, Source Code or Web URL.",
    detail: [
      "Each template asks for the inputs it needs: hosts, endpoints, a repository or a URL",
      "Selecting a template never authorizes testing on its own",
    ],
    preview: {
      title: "reconix · template",
      lines: [
        { text: "", chips: [{ label: "Network" }, { label: "API", active: true }, { label: "Source Code" }, { label: "Web URL" }] },
        { text: "inputs: endpoints and schema", tone: "muted" },
        { text: "authorization: none yet", tone: "muted", status: { label: "not approved", tone: "accent" } },
      ],
    },
  },
  {
    id: "scope",
    label: "Scope",
    icon: ClipboardList,
    title: "Prepare the Scope Manifest",
    body: "Reconix drafts the scope from the template and your answers. You adjust targets, permitted actions, exclusions and limits.",
    detail: [
      "Targets and exclusions are explicit, nothing is inferred later",
      "Permitted actions and assessment limits are part of the manifest",
      "You edit it before anything runs",
    ],
    preview: {
      title: "scope-manifest.yaml",
      lines: [
        { text: "targets:", tone: "primary" },
        { text: "  - https://staging.example.com/api", tone: "foreground" },
        { text: "permitted: [discovery, auth-checks]", tone: "foreground" },
        { text: "exclusions: [/api/admin/*]", tone: "foreground" },
        { text: "limits: 5 req/s · 2h window", tone: "foreground" },
        { text: "status: draft", tone: "muted", status: { label: "awaiting approval", tone: "accent" } },
      ],
    },
  },
  {
    id: "approval",
    label: "Approval",
    icon: ShieldCheck,
    title: "Approve the scope",
    body: "The terminal shows the final manifest. Testing begins only after you explicitly approve it.",
    detail: [
      "The approved Scope Manifest is what every later check is measured against",
      "Without approval, no tool is started",
    ],
    gate: true,
    preview: {
      title: "approval required",
      lines: [
        { text: "Scope Manifest v1 · 1 target · 2 actions", tone: "foreground" },
        { text: "testing", tone: "muted", status: { label: "blocked until approved", tone: "accent" } },
        { text: "", chips: [{ label: "approve", active: true }, { label: "edit" }] },
      ],
    },
  },
  {
    id: "execution",
    label: "Execution",
    icon: Play,
    title: "Validate and run actions",
    body: "Each proposed action passes input, scope, command, risk and limit checks before an approved tool runs it.",
    detail: [
      "Checks run on every action, not once per assessment",
      "Approved tools run in the tool service, with sensitive output masked",
    ],
    note: "Higher-risk actions pause for your approval again.",
    preview: {
      title: "reconix · checks",
      lines: [
        { text: "input check", tone: "foreground", status: { label: "pass", tone: "success" } },
        { text: "scope check", tone: "foreground", status: { label: "pass", tone: "success" } },
        { text: "command check", tone: "foreground", status: { label: "pass", tone: "success" } },
        { text: "risk check", tone: "foreground", status: { label: "paused for approval", tone: "accent" } },
        { text: "limit check", tone: "muted", status: { label: "waiting", tone: "muted" } },
      ],
    },
  },
  {
    id: "findings",
    label: "Findings",
    icon: ScanSearch,
    title: "Analyze findings",
    body: "Results from different tools are classified, correlated, rated and explained, with evidence attached and secrets masked.",
    detail: [
      "Results from different tools are correlated and rated",
      "Impact and remediation are explained with OWASP, CWE and CVE/NVD knowledge",
      "Evidence is attached, secrets are masked",
    ],
    preview: {
      title: "finding F-003",
      lines: [
        { text: "Broken authentication on /api/session", tone: "foreground", status: { label: "high", tone: "accent" } },
        { text: "CWE-287 · Improper Authentication", tone: "primary" },
        { text: "evidence: request + response", tone: "muted", status: { label: "masked", tone: "success" } },
        { text: "token: eyJh••••••••", tone: "muted" },
      ],
    },
  },
  {
    id: "report",
    label: "Report",
    icon: FileOutput,
    title: "Generate the report",
    body: "Export a report with scope, findings, evidence, limitations and recommended fixes. Review it in the local viewer.",
    detail: [
      "The report includes the approved scope it was measured against",
      "The local viewer is read-only: findings, evidence, audit log and reports",
    ],
    preview: {
      title: "report.pdf",
      lines: [
        { text: "1  Scope", tone: "foreground" },
        { text: "2  Findings", tone: "foreground", status: { label: "3", tone: "primary" } },
        { text: "3  Evidence", tone: "foreground" },
        { text: "4  Limitations", tone: "foreground" },
        { text: "5  Recommended fixes", tone: "foreground" },
        { text: "→ open in local viewer", tone: "primary" },
      ],
    },
  },
];
