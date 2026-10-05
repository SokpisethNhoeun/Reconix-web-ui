import { DocsLayout, DocSection, Code } from "@/components/docs-layout";

export const metadata = { title: "Getting started · Reconix" };

export default function GettingStarted() {
  return (
    <DocsLayout title="Getting started" lede="Install the terminal, start the services, and run your first approved assessment.">
      <DocSection title="Requirements">
        <ul>
          <li>Docker and Docker Compose (the backend, AI service, tool service, Qdrant and the LLM run as containers).</li>
          <li>Python 3.11 or later for the terminal client.</li>
          <li>A GPU is recommended for the local LLM served by vLLM. You can point the AI service at any OpenAI-compatible endpoint instead.</li>
          <li>Written authorization for every target you plan to assess.</li>
        </ul>
      </DocSection>
      <DocSection title="Installation">
        <p>Clone the repository and start the services. Replace the repository URL with your team&apos;s.</p>
        <Code>{`git clone <your-reconix-repo> reconix
cd reconix
cp .env.example .env
docker compose up -d`}</Code>
        <p>Then install the terminal client:</p>
        <Code>{`pip install -e ./terminal
reconix --help`}</Code>
      </DocSection>
      <DocSection title="Configuration">
        <p>The main settings live in <span className="font-mono text-foreground">.env</span>:</p>
        <ul>
          <li><span className="font-mono text-foreground">LLM_BASE_URL</span>: the OpenAI-compatible endpoint (default: the bundled vLLM service).</li>
          <li><span className="font-mono text-foreground">NVD_API_KEY</span>: optional, raises the rate limit for CVE lookups.</li>
          <li><span className="font-mono text-foreground">RISK_POLICY</span>: path to the Risk Policy Table that decides which actions need approval.</li>
          <li>Execution limits: maximum tool calls, iterations and run time per assessment.</li>
        </ul>
      </DocSection>
      <DocSection title="Your first assessment">
        <ol className="space-y-2 [&_li]:ml-5 [&_li]:list-decimal">
          <li>Start the terminal with <span className="font-mono text-foreground">reconix</span>.</li>
          <li>Describe the task in plain language, or type <span className="font-mono text-foreground">/template</span> to pick Network, API, Source Code or Web URL.</li>
          <li>Answer the questions Reconix asks and review the draft Scope Manifest.</li>
          <li>Approve the scope. Nothing runs before this step.</li>
          <li>Approve any medium- or high-risk action when prompted, or stop the assessment at any time.</li>
          <li>Generate the report when the analysis is complete.</li>
        </ol>
      </DocSection>
      <DocSection title="The local viewer">
        <p>Start the read-only web viewer to browse current and past assessments, filter findings by severity, read masked evidence, check the audit log and export reports as PDF.</p>
        <Code>{`reconix viewer
# open http://localhost:3000`}</Code>
      </DocSection>
    </DocsLayout>
  );
}
