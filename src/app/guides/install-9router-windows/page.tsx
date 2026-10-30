
import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { site } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Install 9Router on Windows",
  description:
    "Install 9Router on Windows with PowerShell: npm global install, PATH errors, port 20128 conflicts, SQLite database location, and data persistence.",
  alternates: {
    canonical: "/guides/install-9router-windows/",
  },
};

const jsonLd = articleJsonLd({
  title: "Install 9Router on Windows",
  description:
    "Install 9Router on Windows with PowerShell: npm global install, PATH errors, port 20128 conflicts, SQLite database location, and data persistence.",
  path: "/guides/install-9router-windows/",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    {
      name: "Install on Windows",
      path: "/guides/install-9router-windows/",
    },
  ],
  datePublished: "2026-10-28",
});

export default function InstallWindowsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> /{" "}
            <Link href="/guides/">Guides</Link> / Windows install
          </div>

          <div className="eyebrow">GETTING STARTED</div>

          <h1>Install 9Router on Windows.</h1>

          <p>
            Install the CLI, start the local service, and confirm the
            dashboard is reachable before connecting a client.
          </p>
        </div>
      </section>

      <section className="container page-content">
        <div className="two-column">
          <article className="article">
            <div className="article-warning">
              9Router installs as a global npm package, so you need Node.js
              and npm available in a PowerShell window first.
            </div>

            <h2 id="prerequisites">1. Check prerequisites</h2>

            <p>
              Install Node.js (LTS) from{" "}
              <a
                className="text-link"
                href="https://nodejs.org/"
                target="_blank"
                rel="noreferrer"
              >
                nodejs.org
              </a>{" "}
              if it is not already present, then open a new PowerShell
              window and confirm both tools are available.
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">
                {"node --version\nnpm --version"}
              </pre>
              <CopyButton text={"node --version\nnpm --version"} />
            </div>

            <h2 id="install">2. Install 9Router globally</h2>

            <p>Install the CLI globally with npm:</p>

            <div className="code-block-wrap">
              <pre className="code-block">npm install -g 9router</pre>
              <CopyButton text="npm install -g 9router" />
            </div>

            <h2 id="launch">3. Start 9Router</h2>

            <p>
              Run the CLI in PowerShell:
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">9router</pre>
              <CopyButton text="9router" />
            </div>

            <p>
              Keep the terminal open while the service is running. Startup
              messages can vary between versions, so this guide does not
              assume a particular terminal output.
            </p>

            <p>
              Once the service is running, open the dashboard manually:
              {" "}
              <code>http://localhost:20128/dashboard</code>.
            </p>

            <h2 id="dashboard">4. Open the dashboard and API endpoint</h2>

            <ul>
              <li>
                Dashboard:{" "}
                <code>http://localhost:20128/dashboard</code>
              </li>
              <li>
                OpenAI-compatible API:{" "}
                <code>http://localhost:20128/v1</code>
              </li>
            </ul>

            <h2 id="test">5. Run a first request</h2>

            <ol>
              <li>
                Open the dashboard and connect a provider. Check the
                provider&apos;s current authentication and access
                requirements.
              </li>
              <li>Copy the API key from the dashboard.</li>
              <li>
                Point a client at{" "}
                <code>http://localhost:20128/v1</code> and send one short
                prompt to confirm a response.
              </li>
            </ol>

            <h2 id="connect">6. Connect a client</h2>

            <p>
              Both integrations start from{" "}
              <code>http://localhost:20128/v1</code> and the API key you
              just copied.
            </p>

            <div
              className="guide-grid"
              style={{
                gridTemplateColumns: "repeat(2,minmax(0,1fr))",
              }}
            >
              <Link
                className="guide-card"
                href="/integrations/cursor/"
              >
                <div className="card-meta">
                  <span>EDITOR</span>
                  <span>6 MIN</span>
                </div>
                <h3>Cursor</h3>
                <p>
                  Override OpenAI Base URL, API key, and model ID.
                </p>
                <div className="card-bottom">
                  <span className="level">Beginner</span>
                  <span className="arrow">↗</span>
                </div>
              </Link>

              <Link
                className="guide-card"
                href="/integrations/claude-code/"
              >
                <div className="card-meta">
                  <span>CLI</span>
                  <span>8 MIN</span>
                </div>
                <h3>Claude Code</h3>
                <p>
                  Set ANTHROPIC_BASE_URL and ANTHROPIC_AUTH_TOKEN.
                </p>
                <div className="card-bottom">
                  <span className="level">Intermediate</span>
                  <span className="arrow">↗</span>
                </div>
              </Link>
            </div>

            <p>
              Endpoint up but the client still will not talk to it?
              Before you change the port, read{" "}
              <Link
                className="text-link"
                href="/guides/9router-proxy/"
              >
                what the proxy actually does
              </Link>{" "}
              — which of the three layers you are configuring, and what
              should answer at localhost:20128/v1.
            </p>

            <h2 id="windows">Windows notes</h2>

            <h3>Use PowerShell and curl.exe</h3>

            <p>
              Run the commands above in PowerShell. For curl checks, use{" "}
              <code>curl.exe</code> — in Windows PowerShell,{" "}
              <code>curl</code> is an alias for{" "}
              <code>Invoke-WebRequest</code> and will not print the raw
              HTTP response you expect.
            </p>

            <h3>If 9router is not recognized</h3>

            <p>
              Global npm packages put their CLI shim in npm&apos;s global
              bin directory (usually{" "}
              <code>%AppData%\npm</code>). If PowerShell cannot find{" "}
              <code>9router</code>, check the directory with:
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">npm prefix -g</pre>
              <CopyButton text="npm prefix -g" />
            </div>

            <p>
              Confirm that directory is on your <code>PATH</code>, then
              open a new terminal window.
            </p>

            <h3>If port 20128 is in use or blocked</h3>

            <p>
              If startup reports the port is already taken, find the
              process holding it with:
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">
                netstat -ano | findstr :20128
              </pre>
              <CopyButton text="netstat -ano | findstr :20128" />
            </div>

            <p>
              Stop that process, or use a different port if your
              installed 9Router version supports the port option:
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">9router --port 20129</pre>
              <CopyButton text="9router --port 20129" />
            </div>

            <p>
              If the port change is supported and successful, the
              dashboard and API endpoints will use the new port.
              Update any client that was pointed at{" "}
              <code>20128</code>.
            </p>

            <p>
              <code>http://localhost:20128</code> is accessible from
              the local machine. If you need access from another
              machine, check the service&apos;s network binding and
              Windows Defender Firewall settings.
            </p>

            <h2 id="data">Where Does 9Router Store Its SQLite Data?</h2>

            <p>
              9Router stores its local application data in a SQLite
              database. The database is kept in the user data directory,
              not in the npm global package installation directory.
            </p>

            <p>
              The database file is named <code>data.sqlite</code>.
              Its location depends on how you run 9Router:
            </p>

            <ul>
              <li>
                <strong>Windows:</strong>{" "}
                <code>%APPDATA%\9router\db\data.sqlite</code>
              </li>
              <li>
                <strong>macOS:</strong>{" "}
                <code>~/.9router/db/data.sqlite</code>
              </li>
              <li>
                <strong>Linux:</strong>{" "}
                <code>~/.9router/db/data.sqlite</code>
              </li>
              <li>
                <strong>Docker:</strong>{" "}
                <code>/app/data/db/data.sqlite</code>
              </li>
            </ul>

            <h3>Find the database on Windows</h3>

            <p>
              Press <code>Win + R</code>, enter the following directory,
              and press Enter:
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">
                %APPDATA%\9router\db\
              </pre>
              <CopyButton text="%APPDATA%\\9router\\db\\" />
            </div>

            <p>
              You should find <code>data.sqlite</code> in this
              directory if the database has been created.
            </p>

            <h3>Does uninstalling 9Router delete the database?</h3>

            <p>
              <strong>
                No. A normal npm global uninstall does not delete the
                SQLite database in your user data directory.
              </strong>
            </p>

            <p>
              For example, running:
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">
                npm uninstall -g 9router
              </pre>
              <CopyButton text="npm uninstall -g 9router" />
            </div>

            <p>
              removes the globally installed npm package, but does not
              normally remove{" "}
              <code>%APPDATA%\9router\db\data.sqlite</code>.
            </p>

            <p>
              If you reinstall 9Router and it uses the same data
              directory, it can reuse the existing database and
              previously stored settings. This is why your old
              configuration may still be there after reinstalling.
              It does not necessarily mean the uninstall failed.
            </p>

            <p>
              To completely remove the local database, you must
              manually delete the 9Router data directory. Back up
              the database first if you may need it later.
            </p>

            <h3>Docker data persistence</h3>

            <p>
              For Docker, the database is stored inside the container
              at <code>/app/data/db/data.sqlite</code> when{" "}
              <code>DATA_DIR=/app/data</code> is configured.
            </p>

            <p>
              Mount a host directory to <code>/app/data</code> so
              your data survives container removal and recreation:
            </p>

            <div className="code-block-wrap">
              <pre className="code-block">
                {`docker run -d \\
  -p 20128:20128 \\
  -v "$HOME/.9router:/app/data" \\
  -e DATA_DIR=/app/data \\
  --name 9router \\
  decolua/9router:latest`}
              </pre>
              <CopyButton
                text={`docker run -d \\
  -p 20128:20128 \\
  -v "$HOME/.9router:/app/data" \\
  -e DATA_DIR=/app/data \\
  --name 9router \\
  decolua/9router:latest`}
              />
            </div>

            <p>
              Without a persistent volume or bind mount, data stored
              only inside a container may be lost when the container
              is removed.
            </p>

            <h2>Need help?</h2>

            <p>
              <Link
                className="text-link"
                href="/troubleshooting/"
              >
                Use the troubleshooting flow →
              </Link>
            </p>

            <p>
              <a
                className="text-link"
                href={site.docsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Official docs ↗
              </a>{" "}
              ·{" "}
              <a
                className="text-link"
                href={site.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                Official GitHub ↗
              </a>
            </p>
          </article>

          <aside className="sidebar">
            <h3>Install checklist</h3>
            <a href="#prerequisites">Prerequisites</a>
            <a href="#install">Install globally</a>
            <a href="#launch">Start 9Router</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#test">First request</a>
            <a href="#connect">Connect a client</a>
            <a href="#windows">Windows notes</a>
            <a href="#data">SQLite data location</a>

            <h3 style={{ marginTop: 24 }}>Next step</h3>
            <Link href="/integrations/cursor/">
              Connect Cursor
            </Link>
            <Link href="/integrations/claude-code/">
              Connect Claude Code
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
