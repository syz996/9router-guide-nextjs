import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { site } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

export const metadata: Metadata = { title: "Install 9Router on Windows", description: "Install 9Router on Windows with PowerShell: npm global install, PATH errors, port 20128 conflicts, and where the SQLite data file lives.", alternates: { canonical: "/guides/install-9router-windows/" } };

const jsonLd = articleJsonLd({
  title: "Install 9Router on Windows",
  description: "Install 9Router on Windows with PowerShell: npm global install, PATH errors, port 20128 conflicts, and where the SQLite data file lives.",
  path: "/guides/install-9router-windows/",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: "Install on Windows", path: "/guides/install-9router-windows/" }
  ],
  datePublished: "2026-10-23"
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
          <p>The service starts and the dashboard opens automatically. A successful startup looks like this (version and paths vary):</p>
          <div className="code-block-wrap"><pre className="code-block">{"❯ 9router\n> Server: localhost:20128\n> Dashboard: http://localhost:20128/dashboard\n> Data dir: C:\\Users\\<you>\\AppData\\Roaming\\9router\n> Ready to route ✓"}</pre><CopyButton text="9router"/></div>
          <p>Watch for the listening address, port, and data directory. If you see an error instead, the Windows notes below cover the two most common causes.</p>
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
          <h2 id="windows">Windows notes</h2>
          <h3>Use PowerShell and curl.exe</h3>
          <p>Run the commands above in PowerShell. For curl checks, use <code>curl.exe</code> — in Windows PowerShell, <code>curl</code> is an alias for <code>Invoke-WebRequest</code> and will not print the raw HTTP response you expect.</p>
          <h3>If 9router is not recognized</h3>
          <p>Global npm packages put their CLI shim in npm's global bin directory (usually <code>%AppData%\npm</code>). If PowerShell cannot find <code>9router</code>, check the directory with:</p>
          <div className="code-block-wrap"><pre className="code-block">npm prefix -g</pre><CopyButton text="npm prefix -g"/></div>
          <p>Confirm that directory is on your <code>PATH</code>, then open a new terminal window.</p>
          <h3>If port 20128 is in use or blocked</h3>
          <p>If startup reports the port is already taken, find the process holding it with:</p>
          <div className="code-block-wrap"><pre className="code-block">netstat -ano | findstr :20128</pre><CopyButton text="netstat -ano | findstr :20128"/></div>
          <p>Stop that process, or run 9Router on a different port:</p>
          <div className="code-block-wrap"><pre className="code-block">9router --port 20129</pre><CopyButton text="9router --port 20129"/></div>
          <p>After changing the port, the dashboard moves to <code>http://localhost:20129/dashboard</code> and the API to <code>http://localhost:20129/v1</code>; update any client that was pointed at <code>20128</code>.</p>
          <p><code>http://localhost:20128</code> works without a firewall rule; if you need access from another machine, allow the port through Windows Defender Firewall.</p>
          <h2 id="connect">6. Connect a client</h2>
          <div className="guide-grid" style={{gridTemplateColumns:"repeat(2,minmax(0,1fr))"}}>
            <Link className="guide-card" href="/integrations/cursor/"><div className="card-meta"><span>EDITOR</span><span>6 MIN</span></div><h3>Cursor</h3><p>Override OpenAI Base URL + API key + model ID.</p><div className="card-bottom"><span className="level">Beginner</span><span className="arrow">↗</span></div></Link>
            <Link className="guide-card" href="/integrations/claude-code/"><div className="card-meta"><span>CLI</span><span>8 MIN</span></div><h3>Claude Code</h3><p>Set ANTHROPIC_BASE_URL and ANTHROPIC_AUTH_TOKEN.</p><div className="card-bottom"><span className="level">Intermediate</span><span className="arrow">↗</span></div></Link>
          </div>
          <h2>Need help?</h2>
          <p><Link className="text-link" href="/troubleshooting/">Use the troubleshooting flow →</Link></p>
          <p><a className="text-link" href={site.docsUrl} target="_blank" rel="noreferrer">Official docs ↗</a> · <a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">Official GitHub ↗</a></p>
        </article>
        <aside className="sidebar"><h3>Install checklist</h3><a href="#prerequisites">Prerequisites</a><a href="#install">Install globally</a><a href="#launch">Start 9Router</a><a href="#dashboard">Dashboard</a><a href="#test">First request</a><a href="#windows">Windows notes</a><a href="#connect">Connect a client</a><h3 style={{marginTop:24}}>Next step</h3><Link href="/integrations/cursor/">Connect Cursor</Link><Link href="/integrations/claude-code/">Connect Claude Code</Link></aside>
      </div></section>
    </>
  );
}