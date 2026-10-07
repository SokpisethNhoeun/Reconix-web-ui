import { Callout, DocLink, DocSection, Mono } from "@/components/docs-layout";
import { Badge } from "@/components/ui/badge";
import { WORKFLOW_STEPS } from "@/components/workflow-data";
import type { DocContent, GroupContent } from "@/content/docs/types";

/** What the landing page's Assessment categories section states for each template. */
function templatePage(name: string, input: string, results: string): DocContent {
  return {
    lede: `The ${name} template: what it needs from you and what the results show.`,
    draft: true,
    body: (
      <>
        <DocSection title="Inputs">
          <p>{input}.</p>
          <p>
            Pick it with <Mono>/template</Mono> in the terminal, or describe the task in plain language. Selecting a template
            never authorizes testing on its own: the approved Scope Manifest does.
          </p>
        </DocSection>
        <DocSection title="Results">
          <p>{results}</p>
        </DocSection>
        <DocSection title="Still to document">
          <p>Template-specific questions, the tools used for this category and their options.</p>
        </DocSection>
      </>
    ),
  };
}

export const assessments: GroupContent = {
  workflow: {
    lede: "Seven steps from request to report, with one approval gate you can't skip.",
    body: (
      <>
        <DocSection title="Overview">
          <p>
            Selecting a template never authorizes testing on its own. The approved Scope Manifest is what every later check is
            measured against.
          </p>
        </DocSection>
        {WORKFLOW_STEPS.map((s, i) => (
          <DocSection key={s.id} title={`${i + 1}. ${s.title}`}>
            {s.gate && (
              <p>
                <Badge variant="accent">human approval</Badge>
              </p>
            )}
            <p className="text-foreground/90">{s.body}</p>
            <ul>
              {s.detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {s.note && <Callout variant="warning">{s.note}</Callout>}
          </DocSection>
        ))}
        <DocSection title="Related">
          <p>
            <DocLink href="/docs/guardrails/approval-model">Approval model</DocLink> ·{" "}
            <DocLink href="/docs/configuration/scope-manifest">Scope Manifest</DocLink> ·{" "}
            <DocLink href="/docs/reference/findings">Findings</DocLink>
          </p>
        </DocSection>
      </>
    ),
  },
  network: templatePage(
    "Network",
    "An IP address, hostname or subnet",
    "Assessed hosts, discovered services and related findings."
  ),
  "web-applications": templatePage(
    "Web URL",
    "An application URL",
    "Assessed URLs, findings and masked HTTP evidence."
  ),
  apis: templatePage(
    "API",
    "Endpoints and schema",
    "Assessed endpoints and methods, findings, masked request and response evidence."
  ),
  "source-code": templatePage(
    "Source Code",
    "A repository or directory",
    "Affected files and lines, dependency issues, masked code evidence."
  ),
};
