import Link from "next/link";

const nav = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/docs/architecture", label: "Architecture" },
];

export function DocsLayout({ title, lede, children }: { title: string; lede: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[200px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Documentation</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:flex-col">
          {nav.map((n) => (
            <li key={n.href}><Link href={n.href} className="text-muted-foreground hover:text-foreground">{n.label}</Link></li>
          ))}
        </ul>
      </aside>
      <article className="prose-reconix max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">{lede}</p>
        <div className="mt-10 space-y-10">{children}</div>
      </article>
    </main>
  );
}

export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-3 leading-relaxed text-muted-foreground [&_li]:ml-5 [&_li]:list-disc">{children}</div>
    </section>
  );
}

export function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}
