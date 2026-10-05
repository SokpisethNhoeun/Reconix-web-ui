import type { ToolLogoItem } from "@/components/tool-marquee-data";

/**
 * One tile in the tool strip: a mark (official simple-icons path, or a lucide
 * glyph when the vendor has no open mark) next to the name and its role.
 * Both marks are drawn with `currentColor`, so they take the muted text colour
 * and brighten with the tile on hover.
 */
export function ToolLogo({ name, note, icon, glyph: Glyph }: ToolLogoItem) {
  return (
    <div className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-card/70 transition-colors group-hover:border-primary/50">
        {icon ? (
          <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
            <path d={icon.path} />
          </svg>
        ) : Glyph ? (
          <Glyph className="size-5" aria-hidden strokeWidth={1.75} />
        ) : null}
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-semibold text-foreground">{name}</span>
        <span className="block font-mono text-[11px] uppercase tracking-[0.18em]">{note}</span>
      </span>
    </div>
  );
}
