import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import CopyButton from "@/components/CopyButton";

const PAGE_URL = `${site.url}/guides/9router-docker/`;
const DATE_PUBLISHED = "2026-10-23";
const DATE_MODIFIED = "2026-10-28";

const DOCKERHUB_URL = "https://hub.docker.com/r/decolua/9router";

const description =
  "Deploy 9Router with Docker: the docker run command, DATA_DIR persistence so SQLite survives restarts, the official compose file, image tags, and how to verify the API on port 20128.";

export const metadata: Metadata = {
  // layout.tsx 的 title 模板已补「| 9Router Guide」，这里不要再写后缀
  title: "9Router Docker: docker run, Compose & Data Persistence",
  description,
  alternates: { canonical: PAGE_URL },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides/` },
      { "@type": "ListItem", position: 3, name: "Run with Docker", item: PAGE_URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Run 9Router with Docker",
    description,
    url: PAGE_URL,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    inLanguage: "en",
    mainEntityOfPage: PAGE_URL,
    author: { "@type": "Organization", name: "9Router Guide" },
    publisher: { "@type": "Organization", name: "9Router Guide" },
  },
];

// ── 命令块：逐字来自官方 DOCKER.md / docker-compose.yml ──
// 模板字符串里写 \\ ，输出时是一个反斜杠（shell 续行符）。

const quickStart = `docker run -d \\
  -p 20128:20128 \\
  -v "$HOME/.9router:/app/data" \\
  -e DATA_DIR=/app/data \\
  --name 9router \\
  decolua/9router:latest`;

const windowsNamedVolume = `docker run -d -p 20128:20128 \\
  -v 9router-data:/app/data \\
  -e DATA_DIR=/app/data \\
  --name 9router \\
  decolua/9router:latest`;

const dataLayout = `$DATA_DIR/
├── db/
│   ├── data.sqlite       # main SQLite database
│   └── backups/          # auto backups
└── ...                   # certs, logs, runtime configs`;

const manageCommands = `docker logs -f 9router        # view logs
docker stop 9router           # stop
docker start 9router          # start again
docker rm -f 9router          # remove`;

const composeFile = `services:
  9router:
    image: decolua/9router:latest
    container_name: 9router
    restart: always
    ports:
      - "20128:20128"
    volumes:
      - 9router-data:/app/data
    env_file:
      - .env
    environment:
      DATA_DIR: /app/data
      PORT: "20128"
      HOSTNAME: "0.0.0.0"
      NODE_ENV: production
      HEADROOM_URL: http://headroom:8787
    depends_on:
      - headroom

  headroom:
    image: ghcr.io/chopratejas/headroom:latest
    container_name: headroom
    restart: always
    ports:
      - "127.0.0.1:8787:8787"

volumes:
  9router-data:
    name: 9router-data`;

const composeRun = `cp .env.example .env
docker compose up -d`;

const updateCommands = `docker pull decolua/9router:latest
docker rm -f 9router
# then re-run the Quick start command`;

const pinCommands = `docker pull decolua/9router:0.5.112`;

const verifyCommands = `docker logs 9router
curl http://localhost:20128/api/health
curl http://localhost:20128/v1/models`;

export default function DockerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/guides/">Guides</Link> / Docker
          </div>
          <div className="eyebrow">DEPLOYMENT</div>
          <h1>Run 9Router with Docker.</h1>
          <p>
            One command to start the router, one rule to keep your SQLite data across restarts,
            and the official compose file if you want the Headroom sidecar. Verified against
            9Router 0.5.112.
          </p>
        </div>
      </section>

      <section className="container page-content">
        <div className="two-column">
          <article className="article">
            <div className="article-meta">
              <span>LAST REVIEW: 2026-10-28</span>
              <span>9ROUTER 0.5.112</span>
              <span>DEPLOYMENT</span>
            </div>

            <p>
              The project publishes <code>decolua/9router</code> on Docker Hub as a multi-platform
              image (<code>linux/amd64</code> + <code>linux/arm64</code>), so the same command works
              on an Intel laptop, an Apple Silicon Mac, and an ARM server. Every command below is
              copied from the project&apos;s own <code>DOCKER.md</code> and{" "}
              <code>docker-compose.yml</code> — nothing here is a guess.
            </p>

            <h2 id="quickstart">1. Quick start</h2>
            <div className="code-block-wrap">
              <pre className="code-block">{quickStart}</pre>
              <CopyButton text={quickStart} />
            </div>
            <p>
              The app listens on port <code>20128</code>. Open{" "}
              <strong>http://localhost:20128</strong>. Unlike the npm CLI, the container has no
              browser inside it, so the dashboard will <em>not</em> pop up by itself — you open the
              URL manually.
            </p>
            <div className="article-note">
              On Windows (PowerShell or cmd), <code>$HOME</code> is not expanded the same way and
              Windows paths inside a <code>-v</code> flag are error-prone. Use a Docker named
              volume instead of a bind mount — the official compose file does exactly this:
            </div>
            <div className="code-block-wrap">
              <pre className="code-block">{windowsNamedVolume}</pre>
              <CopyButton text={windowsNamedVolume} />
            </div>
            <p>
              Coming from a Windows install instead?{" "}
              <Link className="text-link" href="/guides/install-9router-windows/">
                Follow the Windows install guide →
              </Link>
            </p>

            <h2 id="data">2. Keep your data across restarts</h2>
            <p>
              This is the only part of a Docker deployment that bites people. The container is
              disposable; the SQLite database is not — unless you mount it.
            </p>
            <ul>
              <li>
                <code>-v &quot;$HOME/.9router:/app/data&quot;</code> — the host folder that holds
                providers, keys, and the database.
              </li>
              <li>
                <code>-e DATA_DIR=/app/data</code> — tells the app where to write inside the
                container. Without it the app falls back to <code>~/.9router/</code> (macOS/Linux)
                or <code>%APPDATA%\9router\</code> (Windows), and your bind mount silently does
                nothing.
              </li>
            </ul>
            <p>What actually lands in that folder:</p>
            <div className="code-block-wrap">
              <pre className="code-block">{dataLayout}</pre>
              <CopyButton text={dataLayout} />
            </div>
            <p>
              Host path: <code>$HOME/.9router/db/data.sqlite</code> · Container path:{" "}
              <code>/app/data/db/data.sqlite</code>. Before you run{" "}
              <code>docker rm -f 9router</code>, copy the <code>db/</code> folder somewhere safe —
              removing a container with no volume takes the database with it.
            </p>

            <h2 id="manage">3. Manage the container</h2>
            <div className="code-block-wrap">
              <pre className="code-block">{manageCommands}</pre>
              <CopyButton text={manageCommands} />
            </div>
            <p>
              <code>docker logs -f</code> is the first thing to check on any startup problem — it
              prints the resolved data directory and the port it bound to.
            </p>

            <h2 id="compose">4. The official docker compose file</h2>
            <p>
              If you want Compose (and the optional Headroom sidecar), use the project&apos;s own
              file verbatim. Do not trim it — <code>env_file</code>, <code>depends_on</code>, and
              the <code>volumes</code> block at the bottom are all load-bearing.
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{composeFile}</pre>
              <CopyButton text={composeFile} />
            </div>
            <p>
              Then, in the same folder as <code>docker-compose.yml</code>:
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{composeRun}</pre>
              <CopyButton text={composeRun} />
            </div>
            <div className="article-warning">
              <code>cp .env.example .env</code> is not optional. The compose file declares{" "}
              <code>env_file: - .env</code>, so <code>docker compose up -d</code> fails outright
              if the file is missing. <code>JWT_SECRET</code> and{" "}
              <code>INITIAL_PASSWORD</code> are marked <strong>Required</strong> — set both before
              the container is reachable from anywhere but your own machine.
            </div>
            <p>
              <strong>About Headroom:</strong> the 9Router image does not bundle Python or
              Headroom. That is why the compose file starts a second service
              (<code>ghcr.io/chopratejas/headroom:latest</code>) and points{" "}
              <code>HEADROOM_URL</code> at it. If you only want the router itself, the plain{" "}
              <code>docker run</code> from step 1 is simpler than Compose. To enable it once both
              containers are up: dashboard → <em>Endpoint</em> → <em>Token Saver</em> →{" "}
              <em>Headroom</em>, confirm the URL reads <code>http://headroom:8787</code>, recheck
              status, then enable.
            </p>
            <p>
              If Headroom runs on the Docker host instead of as a sidecar, use{" "}
              <code>http://host.docker.internal:8787</code> on macOS/Windows. On Linux add{" "}
              <code>--add-host=host.docker.internal:host-gateway</code> (or an{" "}
              <code>extra_hosts</code> entry in compose), otherwise the container cannot resolve
              the host.
            </p>

            <h2 id="update">5. Update, pin, or roll back</h2>
            <p>To move to the newest release:</p>
            <div className="code-block-wrap">
              <pre className="code-block">{updateCommands}</pre>
              <CopyButton text={updateCommands} />
            </div>
            <p>
              To stop following <code>latest</code> and pin a numbered version (current release is{" "}
              <strong>0.5.112</strong>):
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{pinCommands}</pre>
              <CopyButton text={pinCommands} />
            </div>
            <ul>
              <li>
                <strong>
                  The image tag has no <code>v</code> prefix.
                </strong>{" "}
                The <code>v</code> is only on the git tag, so{" "}
                <code>decolua/9router:v0.5.112</code> will fail to pull. Use{" "}
                <code>decolua/9router:0.5.112</code>.
              </li>
              <li>
                <strong>Numbered tags are mutable.</strong> A republish can replace the manifest
                behind a tag. For a deployment that must never change under you, pin the digest:{" "}
                <code>decolua/9router@sha256:&lt;digest&gt;</code>.
              </li>
              <li>
                Prerelease tags (for example <code>v0.5.113-rc.1</code>) do not move{" "}
                <code>latest</code> by default — they only publish their own numbered image.
              </li>
            </ul>

            <h2 id="verify">6. Verify after launch</h2>
            <div className="code-block-wrap">
              <pre className="code-block">{verifyCommands}</pre>
              <CopyButton text={verifyCommands} />
            </div>
            <p>
              On Windows PowerShell, use <code>curl.exe</code> so the built-in{" "}
              <code>curl</code> alias does not swallow your flags.
            </p>
            <ol>
              <li>
                <code>/api/health</code> returns a healthy response — this is the same endpoint the
                project&apos;s own CI runs against every published image.
              </li>
              <li>
                <code>/v1/models</code> returns a model list — that means the API layer is live and
                a key you create in the dashboard will work.
              </li>
              <li>
                Open <strong>http://localhost:20128/dashboard</strong>, connect one provider, and
                copy the API key.
              </li>
              <li>
                Point your editor at <code>http://localhost:20128/v1</code> —{" "}
                <Link className="text-link" href="/integrations/cursor/">
                  Cursor
                </Link>{" "}
                or{" "}
                <Link className="text-link" href="/integrations/claude-code/">
                  Claude Code
                </Link>
                .
              </li>
            </ol>

            <h2 id="security">7. Security checklist</h2>
            <p>
              A container that works is not automatically a container that is safe to expose.
              These five defaults come from the official <code>.env.example</code>:
            </p>
            <ul>
              <li>
                <code>JWT_SECRET</code> and <code>INITIAL_PASSWORD</code> ship as{" "}
                <code>change-me…</code> placeholders. Replace both before anything on your network
                can reach port 20128.
              </li>
              <li>
                <code>REQUIRE_API_KEY=false</code> is the default. Set it to <code>true</code>{" "}
                before the port is reachable from outside your machine, or the endpoint is
                effectively open.
              </li>
              <li>
                <code>AUTH_COOKIE_SECURE=false</code> is correct for plain HTTP on localhost; flip
                it to <code>true</code> once you put a TLS reverse proxy in front.
              </li>
              <li>
                Keep Headroom bound to <code>127.0.0.1:8787</code> as the official compose file
                does — do not promote it to <code>0.0.0.0</code>.
              </li>
              <li>
                Never bake provider keys into an image and never commit <code>.env</code>.
              </li>
            </ul>

            <h2 id="pitfalls">8. Five things that go wrong</h2>
            <ol>
              <li>
                <strong>
                  <code>docker compose up</code> exits immediately.
                </strong>{" "}
                No <code>.env</code> in the folder — <code>env_file</code> is mandatory. Run{" "}
                <code>cp .env.example .env</code> first.
              </li>
              <li>
                <strong>Data disappears on restart.</strong> Either <code>DATA_DIR</code> is
                missing, or you edited the compose <code>environment</code> block. Note that{" "}
                <code>.env.example</code> sets <code>DATA_DIR=/var/lib/9router</code> — that value
                is for running from source. Compose overrides it with <code>/app/data</code> via{" "}
                <code>environment</code>, and <code>environment</code> wins over{" "}
                <code>env_file</code>. Delete that line and the write lands in{" "}
                <code>/var/lib/9router</code> inside the container, not on your volume.
              </li>
              <li>
                <strong>Pull fails with &ldquo;manifest unknown&rdquo;.</strong> You added a{" "}
                <code>v</code> to the image tag, or the tag predates the Docker pipeline. Image
                tags omit the <code>v</code>.
              </li>
              <li>
                <strong>Port 20128 is mapped but nothing answers.</strong> Bind the app to all
                interfaces inside the container with <code>-e HOSTNAME=0.0.0.0</code>.
              </li>
              <li>
                <strong>Headroom shows &ldquo;offline&rdquo; in the dashboard.</strong> The image
                can&apos;t share a network namespace with a host process by accident — use{" "}
                <code>host.docker.internal</code>, and on Linux add{" "}
                <code>--add-host=host.docker.internal:host-gateway</code>.
              </li>
            </ol>

            <h2 id="fail">Still failing?</h2>
            <p>
              Startup and connection errors are covered step by step in the{" "}
              <Link className="text-link" href="/troubleshooting/">
                troubleshooting guides →
              </Link>
            </p>
            <p>
              <a
                className="text-link"
                href="https://github.com/decolua/9router"
                target="_blank"
                rel="noreferrer"
              >
                Official repository ↗
              </a>{" "}
              ·{" "}
              <a
                className="text-link"
                href="https://docs.9router.com/"
                target="_blank"
                rel="noreferrer"
              >
                Official docs ↗
              </a>{" "}
              ·{" "}
              <a className="text-link" href={DOCKERHUB_URL} target="_blank" rel="noreferrer">
                Docker Hub tags ↗
              </a>
            </p>
            <p className="fine-print">
              Commands verified against 9Router 0.5.112 on 2026-10-28. Independent third-party
              guide, not affiliated with the 9Router project.
            </p>
          </article>

          <aside className="sidebar">
            <h3>On this page</h3>
            <a href="#quickstart">Quick start</a>
            <a href="#data">Keep your data</a>
            <a href="#manage">Manage the container</a>
            <a href="#compose">Official compose file</a>
            <a href="#update">Update or pin</a>
            <a href="#verify">Verify after launch</a>
            <a href="#security">Security checklist</a>
            <a href="#pitfalls">Common pitfalls</a>
            <h3>Next</h3>
            <a href="/guides/install-9router-windows/">Windows install guide</a>
            <a href="/integrations/cursor/">Connect Cursor</a>
            <a href="/integrations/claude-code/">Connect Claude Code</a>
          </aside>
        </div>
      </section>
    </>
  );
}