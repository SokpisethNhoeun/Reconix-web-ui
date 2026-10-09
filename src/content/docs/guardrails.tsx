import { Callout, DocLink, DocSection, Mono } from "@/components/docs-layout";
import { Badge } from "@/components/ui/badge";
import type { GroupContent } from "@/content/docs/types";

export const guardrails: GroupContent = {
  "authorized-use": {
    lede: "Reconix is for authorized security assessments only.",
    body: (
      <>
        <DocSection title="Your responsibility">
          <p>
            Only assess targets you are authorized to test. Reconix enforces the scope you approve, but the authorization
            itself comes from you or your organization. Keep written permission for every target.
          </p>
          <Callout variant="warning" title="Before you start">
            Selecting a template never authorizes testing on its own. Nothing runs until you approve the Scope Manifest.
          </Callout>
        </DocSection>
        <DocSection title="Who it is for">
          <p>Developers checking their own code and services, and security teams running assessments for others.</p>
        </DocSection>
        <DocSection title="What Reconix refuses">
          <p>
            Requests outside its predefined tasks or the approved scope. See{" "}
            <DocLink href="/docs/guardrails/limitations">Limitations</DocLink>.
          </p>
        </DocSection>
      </>
    ),
  },
  "scope-and-safety": {
    lede: "Checks that run before, during and after every action.",
    body: (
      <>
        <DocSection title="Scope check">
          <p>Every target and action is compared with the approved Scope Manifest. Out-of-scope requests are blocked.</p>
        </DocSection>
        <DocSection title="Command validation">
          <p>
            Commands are built from validated inputs against configured templates and allowed parameters, never free text.
          </p>
        </DocSection>
        <DocSection title="Untrusted input stays separate">
          <p>Web pages, tool output, retrieved documents and uploaded files are treated as data, never as instructions.</p>
        </DocSection>
        <DocSection title="Execution limits">
          <p>
            Caps on tool calls, iterations, run time and repeated actions, checked before every call and monitored while a
            tool runs.
          </p>
        </DocSection>
        <DocSection title="Where the checks run">
          <p>
            In the backend, before any tool request is forwarded. See{" "}
            <DocLink href="/docs/architecture">Architecture</DocLink> for the full path.
          </p>
        </DocSection>
      </>
    ),
  },
  "approval-model": {
    lede: "Two kinds of approval: the scope, once, and higher-risk actions, every time.",
    body: (
      <>
        <DocSection title="Scope approval">
          <p>
            The terminal shows the final Scope Manifest. Testing begins only after you explicitly approve it. Without
            approval, no tool is started.
          </p>
        </DocSection>
        <DocSection title="Action approval">
          <p>
            Every action is classified by the Risk Policy Table. <Badge variant="success">LOW</Badge> runs automatically;{" "}
            <Badge variant="accent">MEDIUM</Badge> and <Badge variant="accent">HIGH</Badge> wait for your approval. See{" "}
            <DocLink href="/docs/configuration/policies">Policies</DocLink> for the table.
          </p>
          <p>The AI may suggest a risk level, but the backend decides. You can stop an assessment at any time.</p>
        </DocSection>
        <DocSection title="Audit">
          <p>Every request, decision and approver lands in the audit log, which you can review in the local viewer.</p>
        </DocSection>
        <DocSection title="Related">
          <p>
            <DocLink href="/docs/configuration/policies">Policies</DocLink> ·{" "}
            <DocLink href="/docs/assessments/workflow">Assessment workflow</DocLink>
          </p>
        </DocSection>
      </>
    ),
  },
  "credential-handling": {
    lede: "Secrets are masked before anything is shown or stored.",
    body: (
      <>
        <DocSection title="Secret masking">
          <p>
            Keys, passwords, tokens and cookies are masked in output, reports and logs before they are shown or stored.
          </p>
        </DocSection>
        <DocSection title="Where masking runs">
          <ul>
            <li>In the tool service, before results leave it.</li>
            <li>Before results are displayed, stored or written to a report.</li>
            <li>Evidence in findings and in the local viewer is the masked version.</li>
          </ul>
        </DocSection>
        <DocSection title="Your own keys">
          <p>
            Service keys such as <Mono>NVD_API_KEY</Mono> live in <Mono>.env</Mono>. See{" "}
            <DocLink href="/docs/getting-started/configuration">Configuration</DocLink>.
          </p>
        </DocSection>
      </>
    ),
  },
  "llm-data-handling": {
    lede: "What the model sees, and what it never does.",
    body: (
      <>
        <DocSection title="Language steps only">
          <p>
            The LLM is called only in steps that need language understanding, with a short context rather than raw tool output.
            Tools run in the tool service, and only after the backend&apos;s scope, command, risk and limit checks.
          </p>
        </DocSection>
        <DocSection title="Where the model runs">
          <p>
            By default a local model served by vLLM, on your own server. You can point <Mono>LLM_BASE_URL</Mono> at any
            OpenAI-compatible endpoint instead.
          </p>
          <Callout variant="warning">
            If you use an external endpoint, the short context for each language step is sent to that endpoint.
          </Callout>
        </DocSection>
        <DocSection title="Untrusted content">
          <p>
            Never treated as instructions. See{" "}
            <DocLink href="/docs/guardrails/scope-and-safety">Scope &amp; safety</DocLink>.
          </p>
        </DocSection>
        <DocSection title="Grounded answers">
          <ul>
            <li>Before the model explains an impact or recommends a fix, Reconix retrieves matching knowledge with hybrid search.</li>
            <li>Internal knowledge comes first, filtered by the user&apos;s role.</li>
            <li>Missing facts are filled from the knowledge base or the NVD API, or clearly marked unknown.</li>
          </ul>
        </DocSection>
      </>
    ),
  },
  limitations: {
    lede: "What to keep in mind when you read Reconix results.",
    body: (
      <>
        <DocSection title="Known limitations">
          <ul>
            <li>
              Findings generated with AI can be wrong. Classifications with confidence below 0.80 are marked{" "}
              <Mono>NEEDS_REVIEW</Mono> for a person to check.
            </li>
            <li>
              Severity is never guessed. Without a scanner rating or a CVSS score, a finding is marked <Mono>UNKNOWN</Mono>.
            </li>
            <li>Reconix supports predefined tasks. Requests outside those tasks, or outside the approved scope, are refused.</li>
          </ul>
          <p>
            More on severity and confidence in <DocLink href="/docs/reference/findings">Findings</DocLink>.
          </p>
        </DocSection>
      </>
    ),
  },
};
