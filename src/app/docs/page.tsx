import Link from "next/link";
import { DocsLayout, DocSection } from "@/components/docs-layout";

export const metadata = { title: "Documentation · Reconix" };

export default function DocsHome() {
  return (
    <DocsLayout title="Documentation" lede="What Reconix is, what it expects from you, and where to go next.">
      <DocSection title="What Reconix does">
        <p>
          Reconix is an AI-powered terminal assistant for authorized security assessments. It plans
          tasks, uses approved tools within a scope you sign off on, analyzes the results, retrieves
          trusted security knowledge, and suggests next steps.
        </p>
        <p>It is built for two kinds of users: developers checking their own code and services, and security teams running assessments for others.</p>
      </DocSection>
      <DocSection title="Authorized use">
        <p>
          Only assess targets you are authorized to test. Reconix enforces the scope you approve, but
          the authorization itself comes from you or your organization. Keep written permission for
          every target.
        </p>
      </DocSection>
      <DocSection title="Guides">
        <ul>
          <li><Link href="/docs/getting-started" className="text-primary underline-offset-4 hover:underline">Getting started</Link>: requirements, installation, configuration and your first assessment.</li>
          <li><Link href="/docs/architecture" className="text-primary underline-offset-4 hover:underline">Architecture</Link>: how the terminal, backend, AI service and tool service fit together.</li>
        </ul>
      </DocSection>
      <DocSection title="Limitations">
        <ul>
          <li>Findings generated with AI can be wrong. Low-confidence classifications are marked NEEDS_REVIEW for a person to check.</li>
          <li>Severity is never guessed. Without a scanner rating or a CVSS score, a finding is marked UNKNOWN.</li>
          <li>Reconix supports predefined tasks. Requests outside those tasks, or outside the approved scope, are refused.</li>
        </ul>
      </DocSection>
    </DocsLayout>
  );
}
