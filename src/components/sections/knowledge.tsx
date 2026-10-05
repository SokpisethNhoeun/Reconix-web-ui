import { Reveal } from "@/components/reveal";
import { AsciiBanner } from "@/components/ascii-banner";
import { SectionShell } from "@/components/section-shell";

const pipeline = ["Finding", "Query builder", "BGE-M3 embedding", "Qdrant search", "NVD lookup", "Context", "LLM answer"];

const sources = [
  { name: "Internal", note: "Your own policies and guidance. Highest priority, filtered by role." },
  { name: "CVE / NVD", note: "Current vulnerability records and CVSS scores." },
  { name: "CWE", note: "Weakness categories and mitigations." },
  { name: "OWASP", note: "Testing guides and cheat sheets." },
];

export function Knowledge() {
  return (
    <SectionShell id="knowledge" backdrop="scanlines" tint="primary">
      <Reveal className="mb-12 max-w-2xl space-y-4">
        <p data-reveal className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">Security knowledge</p>
        <div data-reveal><AsciiBanner text="Knowledge" /></div>
        <h2 data-reveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Answers grounded in trusted sources, not guesses.
        </h2>
        <p data-reveal className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Before the model explains an impact or recommends a fix, Reconix retrieves matching
          knowledge with hybrid search. Missing facts are filled from the knowledge base or the NVD
          API, or clearly marked unknown.
        </p>
      </Reveal>
      <Reveal className="mb-10 flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
        {pipeline.map((p, i) => (
          <span key={p} data-reveal className="flex items-center gap-2">
            <span className="rounded-md border border-border bg-card px-3 py-1.5">{p}</span>
            {i < pipeline.length - 1 && <span className="text-muted-foreground">→</span>}
          </span>
        ))}
      </Reveal>
      <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sources.map((s) => (
          <div key={s.name} data-reveal className="rounded-xl border border-border bg-card p-5">
            <p className="font-display font-semibold tracking-tight">{s.name}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </Reveal>
    </SectionShell>
  );
}
