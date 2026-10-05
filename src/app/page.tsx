import { Hero } from "@/components/sections/hero";
import { Integrations } from "@/components/sections/integrations";
import { Showcase } from "@/components/sections/showcase";
import { SHOWCASE } from "@/components/showcase-data";
import { AsciiBanner } from "@/components/ascii-banner";
import { Workflow } from "@/components/sections/workflow";
import { Categories } from "@/components/sections/categories";
import { Guardrails } from "@/components/sections/guardrails";
import { Knowledge } from "@/components/sections/knowledge";
import { Cta } from "@/components/sections/cta";
import { ScrollAmbient } from "@/components/scroll-ambient";

export default function Home() {
  return (
    <main>
      {/* fixed glow behind the page; sections pick their tint through SectionShell */}
      <ScrollAmbient />
      <Hero />
      <Integrations />
      <Showcase banners={SHOWCASE.map((s) => <AsciiBanner key={s.word} text={s.word} />)} />
      <Workflow />
      <Categories />
      <Guardrails />
      <Knowledge />
      <Cta />
    </main>
  );
}
