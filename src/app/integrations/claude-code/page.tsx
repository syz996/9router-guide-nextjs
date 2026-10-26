import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { site } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

export const metadata: Metadata = { title: "Use 9Router with Claude Code", description: "Point Claude Code at the 9Router endpoint with the correct base URL, API key, and model ID.", alternates: { canonical: "/integrations/claude-code/" } };

const powershellEnv = '$env:ANTHROPIC_BASE_URL="http://localhost:20128/v1"\n$env:ANTHROPIC_AUTH_TOKEN="<key from http://localhost:20128/dashboard>"';
const bashEnv = 'export ANTHROPIC_BASE_URL="http://localhost:20128/v1"\nexport ANTHROPIC_AUTH_TOKEN="<key from http://localhost:20128/dashboard>"';
const modelsCmd = 'curl.exe http://localhost:20128/v1/models -H "Authorization: Bearer <your key>"';
const showCmd = '9router show';
const connectCmd = 'npx 9router connect http://<host>:20128 --tools claude,codex';

const jsonLd = articleJsonLd({
  title: "Use 9Router with Claude Code",
  description: "Point Claude Code at the 9Router endpoint with the correct base URL, API key, and model ID.",
  path: "/integrations/claude-code/",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations/" },
    { name: "Claude Code", path: "/integrations/claude-code/" }
  ],
  datePublished: "2026-10-23"
});

export default function ClaudeCodePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/integrations/">Integrations</Link> / Claude Code</div><div className="eyebrow">CLI INTEGRATION</div><h1>Use 9Router with Claude Code.</h1><p>Point Claude Code at the 9Router OpenAI-compatible endpoint, then set your credentials with the exact values below.</p></div></section>
      <section className="container page-content"><div className="two-column">
        <article className="article">
          <h2 id="endpoint">1. Confirm your endpoint</h2>
          <p>If Claude Code runs on the same machine as 9Router, the endpoint is:</p>
          <div className="code-block-wrap"><pre className="code-block">http://localhost:20128/v1</pre><CopyButton text="http://localhost:20128/v1"/></div>
          <p>For a remote 9Router, replace <code>localhost</code> with an address Claude Code can reach.</p>
          <h2 id="variables">2. Set environment variables</h2>
          <p>PowerShell:</p>
          <div className="code-block-wrap"><pre className="code-block">{powershellEnv}</pre><CopyButton text={powershellEnv}/></div>
          <p>bash / zsh (macOS, Linux, WSL):</p>
          <div className="code-block-wrap"><pre className="code-block">{bashEnv}</pre><CopyButton text={bashEnv}/></div>
          <div className="article-warning">Do not commit API keys to Git or paste them into public logs.</div>
          <h2 id="model">3. Confirm a valid model ID</h2>
          <p>List the models your endpoint actually returns:</p>
          <div className="code-block-wrap"><pre className="code-block">{modelsCmd}</pre><CopyButton text={modelsCmd}/></div>
          <p>Copy an ID from that list — for example <code>kr/claude-sonnet-4.5</code> on the free Kiro AI tier.</p>
          <h2 id="test">4. Test and launch</h2>
          <p>Send one short prompt. If it fails, run:</p>
          <div className="code-block-wrap"><pre className="code-block">{showCmd}</pre><CopyButton text={showCmd}/></div>
          <p><code>9router show</code> prints each CLI tool's current base URL, masked key, and model — so you can see which of the three values is wrong before changing anything.</p>
          <p>To connect (or reconnect) Claude Code and Codex to a specific 9Router host:</p>
          <div className="code-block-wrap"><pre className="code-block">{connectCmd}</pre><CopyButton text={connectCmd}/></div>
          <h2>Official references</h2>
          <p><a className="text-link" href={site.docsUrl} target="_blank" rel="noreferrer">Documentation ↗</a> · <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">GitHub / FAQ ↗</a></p>
        </article>
        <aside className="sidebar"><h3>Quick checklist</h3><a href="#endpoint">Endpoint set</a><a href="#variables">Credentials set</a><a href="#model">Model ID confirmed</a><a href="#test">Test and launch</a><h3 style={{marginTop:24}}>Need help?</h3><Link href="/troubleshooting/">Open troubleshooting</Link></aside>
      </div></section>
    </>
  );
}