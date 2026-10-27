import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { site } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

export const metadata: Metadata = { title: "Connect 9Router to Cursor", description: "Configure Cursor to use the 9Router OpenAI-compatible endpoint with the correct base URL and API key.", alternates: { canonical: "/integrations/cursor/" } };

const jsonLd = articleJsonLd({
  title: "Connect 9Router to Cursor",
  description: "Configure Cursor to use the 9Router OpenAI-compatible endpoint with the correct base URL and API key.",
  path: "/integrations/cursor/",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations/" },
    { name: "Cursor", path: "/integrations/cursor/" }
  ],
  datePublished: "2026-10-28"
});

export default function CursorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/integrations/">Integrations</Link> / Cursor</div><div className="eyebrow">INTEGRATION GUIDE</div><h1>Connect 9Router to Cursor.</h1><p>Point Cursor at the 9Router OpenAI-compatible endpoint using the override base URL setting.</p><div className="article-meta"><span>BEGINNER</span><span>6 MIN READ</span><span>LAST REVIEW: {site.lastModified}</span></div></div></section>
      <section className="container page-content"><div className="two-column">
        <article className="article">
          <div className="article-warning"><strong>Localhost note:</strong> a <code>http://localhost:20128/v1</code> endpoint only works when Cursor runs on the same machine as 9Router. For a remote setup, use a reachable public URL instead.</div>
          <h2 id="before">Before you begin</h2>
          <ul>
            <li>9Router is running and the dashboard opens at <code>http://localhost:20128/dashboard</code>.</li>
            <li>You have copied the API key from the dashboard.</li>
            <li>You know one model ID your endpoint returns (for example <code>kr/claude-sonnet-4.5</code> for the free Kiro AI provider).</li>
          </ul>
          <h2 id="setup">Configure Cursor</h2>
          <ol>
            <li>Open <strong>Cursor Settings → Models</strong> (press <code>Ctrl/Cmd + Shift + J</code>).</li>
            <li>Paste your 9Router API key into the <strong>OpenAI API Key</strong> field.</li>
            <li>Turn on <strong>Override OpenAI Base URL</strong> and enter <code>http://localhost:20128/v1</code>.</li>
            <li>Add or enable a model ID from your endpoint list (e.g. <code>kr/claude-sonnet-4.5</code>).</li>
            <li>Verify the connection, then send a short test prompt.</li>
          </ol>
          <h2 id="errors">If Cursor still fails</h2>
          <ul>
            <li><strong>Connection error:</strong> confirm Cursor and 9Router run on the same machine, and that the port is listening.</li>
            <li><strong>401 Unauthorized:</strong> re-paste the API key from the dashboard and save again.</li>
            <li><strong>Model not found:</strong> compare the selected ID with your own <code>/v1/models</code> list.</li>
            <li><strong>429 / provider error:</strong> inspect provider limits and availability in the dashboard.</li>
          </ul>
          <p>To list the models your endpoint actually returns, run this in PowerShell:</p>
          <div className="code-block-wrap"><pre className="code-block">curl.exe http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_9ROUTER_API_KEY"</pre><CopyButton text={'curl.exe http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_9ROUTER_API_KEY"'}/></div>
          <div className="article-note">Security: avoid exposing an unauthenticated local gateway to the public internet. Use the official security guidance and a protected endpoint.</div>
          <h2 id="official">Official references</h2>
          <p><a className="text-link" href={site.docsUrl} target="_blank" rel="noreferrer">9Router documentation ↗</a> · <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">GitHub repository / FAQ ↗</a></p>
        </article>
        <aside className="sidebar"><h3>On this page</h3><a href="#before">Before you begin</a><a href="#setup">Configure Cursor</a><a href="#errors">Common errors</a><a href="#official">Official references</a><h3 style={{marginTop:24}}>Related</h3><Link href="/troubleshooting/">Troubleshooting hub</Link><Link href="/integrations/claude-code/">Claude Code setup</Link></aside>
      </div></section>
    </>
  );
}