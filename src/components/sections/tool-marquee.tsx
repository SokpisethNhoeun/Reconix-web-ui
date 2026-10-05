import { SectionShell } from "@/components/section-shell";
import { ToolLogo } from "@/components/tool-logo";
import { TOOLS } from "@/components/tool-marquee-data";

/**
 * Thin band under the hero: the tools Reconix runs and the stack it is built
 * on, cycling in one seamless loop. The track holds two copies of the list and
 * slides by exactly half its width (`.marquee` in globals.css); the second copy
 * is aria-hidden. Hover pauses it; reduced motion shows one static, wrapped row.
 */
export function ToolMarquee() {
  const copies = [TOOLS, TOOLS];
  return (
    <SectionShell id="integrations" className="py-10 lg:py-12" containerClassName="max-w-none px-0 sm:px-0">
      <div className="mx-auto mb-6 flex max-w-6xl items-baseline justify-between gap-4 px-4 sm:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">Integrations</p>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
          Approved tools · one scope · masked output
        </p>
      </div>
      <div className="marquee" role="region" aria-label="Tools Reconix runs and the stack it is built on">
        <ul className="marquee-track">
          {copies.map((list, c) =>
            list.map((tool) => (
              <li key={`${c}-${tool.name}`} className="marquee-item" aria-hidden={c > 0}>
                <ToolLogo {...tool} />
              </li>
            ))
          )}
        </ul>
      </div>
    </SectionShell>
  );
}
