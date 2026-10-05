import Link from "next/link";
import { NavCta } from "@/components/nav-cta";

const links = [
  { href: "/#showcase", label: "Features" },
  { href: "/#product", label: "Product" },
  { href: "/#workflow", label: "How it works" },
  { href: "/#guardrails", label: "Guardrails" },
  { href: "/docs", label: "Docs" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-mono text-base tracking-tight">
          <span className="text-muted-foreground">&lt;</span>
          <span className="font-semibold text-foreground">reconix</span>
          <span className="text-muted-foreground"> /&gt;</span>
        </Link>
        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
        <NavCta />
      </div>
    </header>
  );
}
