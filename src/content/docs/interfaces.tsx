import { Code, DocLink, DocSection, Mono } from "@/components/docs-layout";
import type { GroupContent } from "@/content/docs/types";

export const interfaces: GroupContent = {
  terminal: {
    lede: "The primary interface. Start assessments, edit the scope, approve actions and see results.",
    body: (
      <>
        <DocSection title="What it does">
          <ul>
            <li>Starts assessments from a plain-language request or a template.</li>
            <li>Shows the draft Scope Manifest so you can edit it, and asks for your approval.</li>
            <li>Pauses for your approval on medium- and high-risk actions; you can stop an assessment at any time.</li>
            <li>Shows results and generates the report.</li>
          </ul>
        </DocSection>
        <DocSection title="Start it">
          <Code>{`reconix          # start the terminal
reconix --help   # list commands`}</Code>
          <p>
            Inside the terminal, <Mono>/template</Mono> picks Network, API, Source Code or Web URL. See{" "}
            <DocLink href="/docs/reference/cli-commands">CLI commands</DocLink>.
          </p>
        </DocSection>
        <DocSection title="Built with">
          <p>Python · Typer · Textual · Rich.</p>
        </DocSection>
      </>
    ),
  },
  "local-viewer": {
    lede: "A read-only web dashboard for every assessment, and a report ready to hand over.",
    body: (
      <>
        <DocSection title="What you can see">
          <ul>
            <li>Current and past assessments.</li>
            <li>Findings filtered by severity, target, category and tool.</li>
            <li>Masked evidence, validation status and the full audit trail.</li>
            <li>Reports, exported as PDF with scope, findings and remediation.</li>
          </ul>
          <p>The viewer is read-only: assessments are started and approved in the terminal.</p>
        </DocSection>
        <DocSection title="Start it">
          <Code>{`reconix viewer
# open http://localhost:3000`}</Code>
        </DocSection>
        <DocSection title="Built with">
          <p>Next.js · TypeScript. It runs under Docker Compose with the other services.</p>
        </DocSection>
      </>
    ),
  },
};
