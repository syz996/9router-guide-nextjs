import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { site } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

export const metadata: Metadata = { title: "Use 9Router with Claude Code", description: "Prepare a 9Router endpoint, API key, and model ID for a CLI integration.", alternates: { canonical: "/integrations/claude-code/" } };

const envExample = 'export ANTHROPIC_BASE_URL="YOUR_DOCUMENTED_9ROUTER_ENDPOINT"\\nexport ANTHROPIC_AUTH_TOKEN="YOUR_9ROUTER_API_KEY"';

const jsonLd = articleJsonLd({
  title: "Use 9Router with Claude Code",
  description: "Prepare a 9Router endpoint, API key, and model ID for a CLI integration.",
  path: "/integrations/claude-code/",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations/" },
    { name: "Claude Code", path: "/integrations/claude-code/" }
  ],
  datePublished: "2026-10-23",
  dateModified: "2026-10-23"
});

export default function ClaudeCodePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/integrations/">Integrations</Link> / Claude Code</div><div className="eyebrow">CLI INTEGRATION</div><h1>Use 9Router with Claude Code.</h1><p>Prepare the endpoint and credentials, test a minimal request, then launch your client. Variable names and supported configuration can change; check the current official guidance.</p></div></section><section className="container page-content"><div className="two-column"><article className="article">
    <h2 id="endpoint">1. Confirm your endpoint</h2><p>Use the endpoint shown by your current 9Router setup instructions. If running locally, confirm the service is listening and that your client supports the local endpoint.</p>
    <h2 id="variables">2. Set environment variables</h2><p>Replace the endpoint and variable names below with the values from your own 9Router instance.</p><div className="code-block-wrap"><pre className="code-block">{envExample}</pre><CopyButton text={envExample.replace(/\\n/g,"\n")}/></div>
    <div className="article-warning">Do not commit API keys to Git or paste them into public logs. For PowerShell, Windows Command Prompt, or persistent shell profiles, use the syntax appropriate to that shell.</div>
    <h2 id="model">3. Confirm a valid model ID</h2><ol><li>Request the available models from the configured endpoint.</li><li>Choose a model ID that is actually returned by your own endpoint.</li><li>Check provider authentication and quota if the request reaches the router but fails upstream.</li></ol>
    <h2 id="test">4. Test and launch</h2><p>Start with a short prompt and observe the exact error. Avoid changing endpoint, API key, model ID, and provider settings simultaneously; change one variable at a time.</p>
    <h2>Official references</h2><p><a className="text-link" href={site.docsUrl} target="_blank" rel="noreferrer">Documentation ↗</a> · <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">GitHub / FAQ ↗</a></p>
  </article><aside className="sidebar"><h3>Quick checklist</h3><a href="#endpoint">Endpoint reachable</a><a href="#variables">Credentials set</a><a href="#model">Model ID confirmed</a><a href="#test">Minimal request works</a><h3 style={{marginTop:24}}>Need help?</h3><Link href="/troubleshooting/">Open troubleshooting</Link></aside></div></section></>;
}
