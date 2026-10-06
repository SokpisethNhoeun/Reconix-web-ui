import { DocsMoreLink } from "@/components/docs-more-link";
import { Reveal } from "@/components/reveal";
import { AsciiBanner } from "@/components/ascii-banner";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";

const rails = [
  { title: "Untrusted input stays separate", body: "Web pages, tool output, retrieved documents and uploaded files are treated as data, never as instructions." },
  { title: "Scope check", body: "Every target and action is compared with the approved Scope Manifest. Out-of-scope requests are blocked." },
  { title: "Command validation", body: "Commands are built from validated inputs against configured templates and allowed parameters." },
  { title: "Risk policy", body: "Actions are classified LOW, MEDIUM or HIGH. Only LOW runs automatically; the rest wait for a person." },
  { title: "Execution limits", body: "Caps on tool calls, iterations, run time and repeated actions, checked before every call." },
  { title: "Secret masking", body: "Keys, passwords, tokens and cookies are masked in output, reports and logs before they are shown or stored." },
];

const risk = [
  { level: "LOW", rule: "Runs automatically after checks pass", variant: "success" as const },
  { level: "MEDIUM", rule: "Needs operator approval", variant: "accent" as const },
  { level: "HIGH", rule: "Needs explicit, clear approval", variant: "accent" as const },
];

export function Guardrails() {
  return (
    <SectionShell id="guardrails" backdrop="hazard" tint="accent" className="bg-card/40">
      <Reveal className="mb-12 max-w-2xl space-y-4">
        <p data-reveal className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">Guardrails</p>
        <div data-reveal><AsciiBanner text="Guardrails" /></div>
        <h2 data-reveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Checks that run before, during and after every action.
        </h2>
        <div data-reveal><DocsMoreLink href="/docs/guardrails" /></div>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {rails.map((r) => (
            <div key={r.title} data-reveal className="space-y-1.5 border-l-2 border-primary/50 pl-4">
              <h3 className="text-base font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </Reveal>
        <Reveal className="self-start rounded-xl border border-border bg-card p-6">
          <p data-reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Risk policy</p>
          <ul className="space-y-4">
            {risk.map((r) => (
              <li key={r.level} data-reveal className="flex items-start gap-3">
                <Badge variant={r.variant}>{r.level}</Badge>
                <span className="text-sm text-muted-foreground">{r.rule}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SectionShell>
  );
}
