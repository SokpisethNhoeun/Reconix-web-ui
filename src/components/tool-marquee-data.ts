import type { SimpleIcon } from "simple-icons";
import { siDocker, siFastapi, siOwasp, siQdrant, siTrivy, siVllm, siZap } from "simple-icons";
import { Braces, Crosshair, KeyRound, Radar, type LucideIcon } from "lucide-react";

export type ToolLogoItem = {
  name: string;
  /** one-line role, shown as the small mono caption */
  note: string;
  /** official mark from simple-icons (CC0) when one exists … */
  icon?: SimpleIcon;
  /** … otherwise a lucide glyph that hints at what the tool does */
  glyph?: LucideIcon;
};

/**
 * Tools Reconix orchestrates, then the stack it is built on. Keep this in step
 * with the copy in showcase-data.ts and the Architecture docs page: do not list
 * an integration here that the product story does not claim.
 * To use a vendor's own SVG instead of a glyph, drop it in public/logos/ and
 * render it in tool-logo.tsx; keep the tile size the same.
 */
export const TOOLS: ToolLogoItem[] = [
  { name: "Nmap", note: "network discovery", glyph: Radar },
  { name: "Nuclei", note: "template scans", glyph: Crosshair },
  { name: "OWASP ZAP", note: "web · api", icon: siZap },
  { name: "Semgrep", note: "code analysis", glyph: Braces },
  { name: "Gitleaks", note: "secret detection", glyph: KeyRound },
  { name: "Trivy", note: "dependencies · images", icon: siTrivy },
  { name: "OWASP · CWE", note: "knowledge base", icon: siOwasp },
  { name: "Qdrant", note: "hybrid search", icon: siQdrant },
  { name: "vLLM", note: "local LLM", icon: siVllm },
  { name: "FastAPI", note: "backend", icon: siFastapi },
  { name: "Docker Compose", note: "self-hosted", icon: siDocker },
];
