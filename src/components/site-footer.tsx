import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold">Reconix</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            An AI-powered terminal assistant for authorized security assessments. Built as an HRD
            final project by Group 2, Cybersecurity track.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Product</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="/#showcase" className="hover:text-foreground">Features</Link></li>
            <li><Link href="/#workflow" className="hover:text-foreground">How it works</Link></li>
            <li><Link href="/#categories" className="hover:text-foreground">Assessment categories</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Docs</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link href="/docs/getting-started" className="hover:text-foreground">Getting started</Link></li>
            <li><Link href="/docs/architecture" className="hover:text-foreground">Architecture</Link></li>
            <li><Link href="/docs" className="hover:text-foreground">Documentation</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center font-mono text-xs text-muted-foreground">
        For authorized testing only. Approve the scope before anything runs.
      </div>
    </footer>
  );
}
