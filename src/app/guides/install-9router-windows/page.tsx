import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { site } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

export const metadata: Metadata = { title: "Install 9Router on Windows", description: "A Windows installation checklist for preparing, launching, and verifying 9Router.", alternates: { canonical: "/guides/install-9router-windows/" } };

const jsonLd = articleJsonLd({
  title: "Install 9Router on Windows",
  description: "A Windows installation checklist for preparing, launching, and verifying 9Router.",
  path: "/guides/install-9router-windows/",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: "Install on Windows", path: "/guides/install-9router-windows/" }
  ],
  datePublished: "2026-10-23",
  dateModified: "2026-10-23"
});

export default function InstallWindowsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/guides/">Guides</Link> / Windows install</div><div className="eyebrow">GETTING STARTED</div><h1>Install 9Router on Windows.</h1><p>Install the CLI, start the local service, and confirm the dashboard is reachable before connecting a client.</p></div></section>
      <section className="container page-content"><div className="two-column">
        <article className="article">
          <div className="article-warning">9Router installs as a global npm package, so you need Node.js and npm available in a PowerShell window first.</div>
          <h2 id="prerequisites">1. Check prerequisites</h2>
          <p>Install Node.js (LTS) from <a className="text-link" href="https://nodejs.org/" target="_blank" rel="noreferrer">nodejs.org</a> if it is not already present, then open a new PowerShell window and confirm both tools are available.</p>
          <div className="code-block-wrap"><pre className="code-block">node --version{"\n"}npm --version</pre><CopyButton text={"node --version\nnpm --version"}/></div>
          <h2 id="install">2. Install 9Router globally</h2>
          <p>Install the CLI globally with npm:</p>
          <div className="code-block-wrap"><pre className="code-block">npm install -g 9router</pre><CopyButton text="npm install -g 9router"/></div>
          <h2 id="launch">3. Start 9Router</h2>
          <p>Keep the terminal open and run:</p>
          <div className="code-block-wrap"><pre className="code-block">9router</pre><CopyButton text="9router"/></div>
          <p>The service starts and the dashboard opens automatically. Watch the startup output for the listening address and port.</p>
          <h2 id="dashboard">4. Open the dashboard and API endpoint</h2>
          <ul>
            <li>Dashboard: <code>http://localhost:20128/dashboard</code></li>
            <li>OpenAI-compatible API: <code>http://localhost:20128/v1</code></li>
          </ul>
          <h2 id="test">5. Run a first request</h2>
          <ol>
            <li>Open the dashboard and connect a provider (the free Kiro AI or OpenCode Free tier needs no paid key).</li>
            <li>Copy the API key from the dashboard.</li>
            <li>Point a client at <code>http://localhost:20128/v1</code> and send one short prompt to confirm a response.</li>
          </ol>
          <h2>Need help?</h2>
          <p><Link className="text-link" href="/troubleshooting/">Use the troubleshooting flow →</Link></p>
          <p><a className="text-link" href={site.docsUrl} target="_blank" rel="noreferrer">Official docs ↗</a> · <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">Official GitHub ↗</a></p>
        </article>
        <aside className="sidebar"><h3>Install checklist</h3><a href="#prerequisites">Prerequisites</a><a href="#install">Install globally</a><a href="#launch">Start 9Router</a><a href="#dashboard">Dashboard</a><a href="#test">First request</a><h3 style={{marginTop:24}}>Next step</h3><Link href="/troubleshooting/">Troubleshoot errors</Link></aside>
      </div></section>
    </>
  );
}