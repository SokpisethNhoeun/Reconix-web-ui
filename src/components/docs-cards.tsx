import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { DocGroup, DocPage } from "@/lib/docs-nav";

/** Card grid of docs groups (docs overview). */
export function DocGroupCards({ groups }: { groups: DocGroup[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {groups.map((g) => {
        const Icon = g.icon;
        return (
          <li key={g.id} className="integration-card flex flex-col gap-4 rounded-2xl border p-5">
            <Link href={g.href} className="group flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-display text-lg font-semibold text-foreground group-hover:text-primary">
                  {g.title}
                  <ArrowRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{g.description}</span>
              </span>
            </Link>
            {g.pages.length > 0 && (
              <ul className="mt-auto flex flex-wrap gap-2 border-t border-border/70 pt-4 !ml-0 [&>li]:!ml-0 [&>li]:!list-none">
                {g.pages.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="block rounded-md border border-border bg-background/50 px-2.5 py-1 text-xs text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** List of a group's pages with descriptions (group landing pages). */
export function DocPageCards({ pages }: { pages: DocPage[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 !ml-0 [&>li]:!ml-0 [&>li]:!list-none">
      {pages.map((p) => (
        <li key={p.href}>
          <Link
            href={p.href}
            className="group flex h-full flex-col rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-primary/50"
          >
            <span className="flex items-center justify-between gap-2 font-display font-semibold text-foreground group-hover:text-primary">
              {p.title}
              <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
            </span>
            <span className="mt-1 text-sm text-muted-foreground">{p.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
