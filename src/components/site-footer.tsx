import Link from "next/link";
import { FaGithub, FaFacebookF } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const socials = [
  { label: "Gmail", href: "mailto:choengsreyleak@gmail.com", icon: SiGmail },
  { label: "GitHub", href: "https://github.com/choeng-sreyleak", icon: FaGithub },
  { label: "Facebook", href: "https://www.facebook.com/Ezomaki.riko", icon: FaFacebookF },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_3fr]">
        <div>
          <p className="font-display text-lg font-semibold">Reconix</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Reconnaissance with Intelligence Transformation
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Product</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/#showcase" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/#workflow" className="hover:text-foreground">How it works</Link></li>
              {/* <li><Link href="/#categories" className="hover:text-foreground">Assessment categories</Link></li> */}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Docs</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/docs/getting-started" className="hover:text-foreground">Getting started</Link></li>
              <li><Link href="/docs/architecture" className="hover:text-foreground">Architecture</Link></li>
              {/* <li><Link href="/docs" className="hover:text-foreground">Documentation</Link></li> */}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Community</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="https://github.com/choeng-sreyleak" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:choengsreyleak@gmail.com" className="hover:text-foreground">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Legal</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/#guardrails" className="hover:text-foreground">Limitation and Guardrails</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6">
          <p className="text-center font-mono text-xs text-muted-foreground sm:text-left">
            © 2026 Reconix. Open-source Authorized Security Assessment Platform.
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}