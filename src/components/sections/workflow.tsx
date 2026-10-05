import { Reveal } from "@/components/reveal";
import { AsciiBanner } from "@/components/ascii-banner";
import { SectionShell } from "@/components/section-shell";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    title: "Choose a template",
    body: "Describe the task or pick one of four templates: Network, API, Source Code or Web URL.",
  },
  {
    title: "Prepare the Scope Manifest",
    body: "Reconix drafts the scope from the template and your answers. You adjust targets, permitted actions, exclusions and limits.",
  },
  {
    title: "Approve the scope",
    body: "The terminal shows the final manifest. Testing begins only after you explicitly approve it.",
    gate: true,
  },
  {
    title: "Validate and run actions",
    body: "Each proposed action passes input, scope, command, risk and limit checks. Higher-risk actions pause for your approval.",
  },
  {
    title: "Analyze findings",
    body: "Results from different tools are classified, correlated, rated and explained, with evidence attached and secrets masked.",
  },
  {
    title: "Generate the report",
    body: "Export a report with scope, findings, evidence, limitations and recommended fixes. Review it in the local viewer.",
  },
];

export function Workflow() {
  return (
    <SectionShell
      id="workflow"
      backdrop="grid"
      tint="primary"
      className="bg-card/40"
      containerClassName="grid gap-12 lg:grid-cols-[1fr_1.4fr]"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal className="space-y-4">
          <p data-reveal className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">How it works</p>
          <div data-reveal><AsciiBanner text="Workflow" /></div>
          <h2 data-reveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Six steps, one approval gate you can&apos;t skip.
          </h2>
          <p data-reveal className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Selecting a template never authorizes testing on its own. The approved Scope Manifest is
            what every later check is measured against.
          </p>
        </Reveal>
      </div>
      <Reveal className="relative space-y-4" stagger={0.1}>
        {steps.map((s, i) => (
          <div
            key={s.title}
            data-reveal
            className={`flex gap-5 rounded-xl border p-5 ${
              s.gate ? "border-accent/50 bg-accent/5" : "border-border bg-card"
            }`}
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold ${
                s.gate ? "bg-accent text-primary-foreground" : "bg-muted text-primary"
              }`}
            >
              {i + 1}
            </span>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                {s.gate && <Badge variant="accent">human approval</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </SectionShell>
  );
}
