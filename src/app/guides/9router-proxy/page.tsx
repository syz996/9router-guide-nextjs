import type { Metadata } from "next";
import Link from "next/link";

const PAGE_PATH = "/guides/9router-proxy/";
const PAGE_URL = `https://9routerguide.info${PAGE_PATH}`;
const PAGE_TITLE = "9Router Proxy: the localhost:20128 Endpoint";
const PAGE_DESC =
  "What the 9Router proxy is: the localhost:20128/v1 endpoint, two curl checks that prove it answers, what leaves your machine, and why 0.0.0.0 matters.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    siteName: "9Router Guide",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
  },
};

/* ---------- 命令集中放常量，避免 JSX 转义 ---------- */

const CMD_SET_KEY = `export NINEROUTER_KEY="paste-the-key-from-the-dashboard-here"`;

const CMD_MODELS = `curl -s http://localhost:20128/v1/models \\
  -H "Authorization: Bearer $NINEROUTER_KEY"`;

const CMD_CHAT = `curl -s http://localhost:20128/v1/chat/completions \\
  -H "Authorization: Bearer $NINEROUTER_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"kr/claude-sonnet-4.5","messages":[{"role":"user","content":"say ok"}],"max_tokens":16}'`;

const CMD_LISTEN_MAC = `lsof -nP -iTCP:20128 -sTCP:LISTEN`;

const CMD_LISTEN_WIN = `Get-NetTCPConnection -LocalPort 20128 -State Listen | Select-Object LocalAddress,LocalPort,OwningProcess`;

const CMD_DOCKER = `docker run -d -p 20128:20128 \\
  -v "$HOME/.9router:/app/data" \\
  -e DATA_DIR=/app/data \\
  --name 9router \\
  decolua/9router:latest`;

const CMD_EXPOSE = `docker run -d \\
  -p 0.0.0.0:20128:20128 \\
  -e HOSTNAME=0.0.0.0 \\
  -v "$HOME/.9router:/app/data" -e DATA_DIR=/app/data \\
  --name 9router decolua/9router:latest`;

/* ---------- FAQ ---------- */

const faq: { q: string; a: string }[] = [
  {
    q: "Where does the 9Router proxy run?",
    a: "On your own machine. The gateway listens on port 20128; the dashboard is at http://localhost:20128/dashboard and the OpenAI-compatible API your tools call is at http://localhost:20128/v1.",
  },
  {
    q: "Does my code go through 9Router's servers?",
    a: "No. 9Router is software you run locally — there is no hosted relay between your tools and the providers. Your requests leave your machine only when the proxy calls the provider you configured.",
  },
  {
    q: "Do I need a paid provider to use it?",
    a: "No. Kiro AI is connectable from the dashboard with no signup and roughly 50 free credits a month, and OpenCode Free needs no authentication at all. Paid and subscription providers are optional tiers above those.",
  },
  {
    q: "Why do I get 401 from the proxy when my provider key works?",
    a: "The proxy expects its own key, not the provider's. Copy the key from the 9Router dashboard into your tool's API key field — a provider key sent to localhost:20128 will be rejected.",
  },
  {
    q: "Can other devices on my network reach the proxy?",
    a: "Only if you deliberately bind it to a public address. Left on its default, it listens on the loopback interface; the official optional env var HOSTNAME=0.0.0.0 is what opens it up, so keep that off unless you have a firewall rule in front of it.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What the 9Router proxy actually is",
  description: PAGE_DESC,
  mainEntityOfPage: PAGE_URL,
  datePublished: "2026-10-28",
  dateModified: "2026-10-28",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function Code({ text }: { text: string }) {
  return (
    <pre className="code-block" style={{ overflowX: "auto" }}>
      <code>{text}</code>
    </pre>
  );
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link> / <Link href="/guides/">Guides</Link> / 9Router proxy
          </div>
          <div className="eyebrow">REFERENCE</div>
          <h1>What the 9Router proxy actually is</h1>
          <p>
            9Router is a local proxy. It runs on your own machine, your editor asks
            http://localhost:20128/v1 for completions, and it forwards each request to a provider
            it picks. That is the whole design. The confusion starts because &ldquo;9router
            proxy&rdquo; gets used for three different layers, and mixing them up is behind most of
            the setup problems people report.
          </p>
          <div className="article-meta">
            <span>INTERMEDIATE</span>
            <span>9 MIN READ</span>
            <span>LAST REVIEW: 2026-10-28</span>
          </div>
        </div>
      </section>

      <section className="container page-content">
        <div className="two-column">
          <article className="article">
            <h2 id="layers">Three things people mean by &ldquo;the proxy&rdquo;</h2>

            <p>
              Once you know which layer you are configuring, most failures stop being mysterious.
            </p>

            <table>
              <thead>
                <tr>
                  <th>What it is called</th>
                  <th>What it actually is</th>
                  <th>Where it listens</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The gateway</td>
                  <td>The main 9Router process your tools call</td>
                  <td>
                    <code>localhost:20128</code>, API under <code>/v1</code>
                  </td>
                </tr>
                <tr>
                  <td>Headroom</td>
                  <td>Optional compression service that runs alongside the router</td>
                  <td>
                    its own port, <code>8787</code>, off unless you enable it
                  </td>
                </tr>
                <tr>
                  <td>A self-hosted provider</td>
                  <td>
                    Your own model server, called <em>by</em> 9Router
                  </td>
                  <td>wherever you host it</td>
                </tr>
              </tbody>
            </table>

            <p>
              The first layer is what you get after <code>npm install -g 9router</code> and running{" "}
              <code>9router</code>. The second only exists if you opt into Headroom in the
              dashboard. The third points the other way: there 9Router is the client and your
              machine is the server.
            </p>

            <h2 id="request">Where the proxy sits in a request</h2>

            <p>The path is short, and knowing it tells you where to look when something breaks:</p>

            <ol>
              <li>
                Your tool sends an OpenAI-format request to <code>localhost:20128/v1</code>.
              </li>
              <li>
                9Router checks the model you asked for, translates the payload if the provider
                speaks a different format, and applies its token saver.
              </li>
              <li>It picks a provider by tier: subscription first, then cheap, then free.</li>
              <li>
                The provider answers; 9Router hands the answer back in the format your tool
                expects.
              </li>
            </ol>

            <p>
              Two URLs matter and they are not interchangeable:{" "}
              <code>http://localhost:20128/dashboard</code> is the interface where you configure
              providers, and <code>http://localhost:20128/v1</code> is the API your editor points
              at. Pasting the dashboard URL into Cursor or Claude Code is a common first mistake.
            </p>

            <h2 id="checks">Two curl checks that prove the endpoint answers</h2>

            <p>
              Before touching any editor setting, confirm the proxy itself is alive. Set the key
              from your dashboard once, in the same shell:
            </p>

            <Code text={CMD_SET_KEY} />

            <p>
              <strong>Check 1 &mdash; is the API up and does it list models?</strong>
            </p>

            <Code text={CMD_MODELS} />

            <p>
              A JSON body containing a model list means the process is running and reachable. A{" "}
              <code>Connection refused</code> means nothing is listening on that port &mdash; the
              proxy is not running, not on 20128, or it is running inside a container without the
              port published. An HTML error page usually means you hit a different service on that
              port.
            </p>

            <p>
              <strong>Check 2 &mdash; does a real completion come back?</strong>
            </p>

            <Code text={CMD_CHAT} />

            <p>
              This is the check that matters, because it exercises the full path: auth, model
              lookup, provider selection, and the return trip. Model names follow the
              provider-namespaced form shown in the official quick start,{" "}
              <code>kr/claude-sonnet-4.5</code>. If <code>/v1/models</code> works but this call
              fails, the problem is not your editor and not the network &mdash; it is the provider
              side of the routing, so look at that provider in the dashboard.
            </p>

            <h2 id="travels">What actually travels through the proxy</h2>

            <p>
              The proxy forwards the request it received and returns the provider&rsquo;s answer.
              Two things are worth knowing because they change what the numbers in your tool mean:
            </p>

            <ul>
              <li>
                <strong>Format translation.</strong> A tool that speaks OpenAI&rsquo;s
                chat-completions format can be routed to a provider using a different wire format;
                the proxy converts both directions.
              </li>
              <li>
                <strong>Token saver.</strong> The router can compress tool output before it is
                sent, which is where the advertised 20&ndash;40% savings come from. It changes what
                the provider sees, not what you typed.
              </li>
            </ul>

            <p>
              Neither of those is a billing proxy. 9Router has no billing system and does not hold
              your provider cards; the providers bill you directly, exactly as they would without
              it.
            </p>

            <h2 id="port">Is the proxy only listening on your machine?</h2>

            <p>
              This is the question most people never ask, and it is the one with real consequences.
              Check which address the process bound to:
            </p>

            <p>
              <strong>macOS and Linux</strong>
            </p>

            <Code text={CMD_LISTEN_MAC} />

            <p>
              <strong>Windows PowerShell</strong>
            </p>

            <Code text={CMD_LISTEN_WIN} />

            <p>
              The address you want is <code>127.0.0.1</code>
              {" or "}
              <code>::1</code>{" "}
              &mdash; loopback, reachable only from this machine. If it says{" "}
              <code>0.0.0.0</code>
              {" or "}
              <code>::</code>, the proxy is listening on every interface, and anyone on the same
              Wi-Fi can use your configured credentials and your provider quota. That is not
              hypothetical: the official production start command ships{" "}
              <code>HOSTNAME=0.0.0.0</code>, and the Docker docs list it as an optional environment
              variable, so the binding is something you choose rather than something you inherit by
              accident.
            </p>

            <p>
              Inside Docker the port mapping decides it. Publishing <code>-p 20128:20128</code>{" "}
              keeps it on the host loopback; <code>-p 0.0.0.0:20128:20128</code> plus{" "}
              <code>-e HOSTNAME=0.0.0.0</code> opens it to the network:
            </p>

            <Code text={CMD_DOCKER} />

            <p>
              Only add the second form if you have a firewall rule or a reverse proxy with auth in
              front.
            </p>

            <Code text={CMD_EXPOSE} />

            <h2 id="tools">Pointing your tools at the proxy</h2>

            <p>
              Every tool asks for the same three values. Get them from the dashboard, not from
              memory:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base URL / Endpoint</td>
                  <td>
                    <code>http://localhost:20128/v1</code>
                  </td>
                </tr>
                <tr>
                  <td>API key</td>
                  <td>the key shown in the 9Router dashboard</td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>
                    a namespaced name such as <code>kr/claude-sonnet-4.5</code>
                  </td>
                </tr>
              </tbody>
            </table>

            <p>
              The base URL must include <code>/v1</code>. Some tools append{" "}
              <code>/chat/completions</code> themselves; if yours does, give it the base without
              the trailing path and let it build the rest.
            </p>

            <h2 id="failures">Four failures that look like proxy bugs</h2>

            <p>
              All four are configuration, not defects &mdash; and all four produce an error message
              that points somewhere else.
            </p>

            <ul>
              <li>
                <strong>401 from localhost.</strong> You pasted the provider&rsquo;s API key. The
                proxy wants its own key from the dashboard; a provider key sent to 20128 is
                rejected even though the same key works when called directly.
              </li>
              <li>
                <strong>404 on a valid-looking URL.</strong> The base URL is missing{" "}
                <code>/v1</code>, so the request lands on a dashboard route instead of the API.
              </li>
              <li>
                <strong>
                  localhost fails but <code>127.0.0.1</code> works.
                </strong>{" "}
                The name resolved to IPv6 while the process listens on IPv4, or the reverse. Use
                the literal address in that case &mdash; it removes one variable.
              </li>
              <li>
                <strong>Works on the host, fails in a container.</strong> Inside a container,
                localhost is the container itself. Use{" "}
                <code>http://host.docker.internal:20128</code> on macOS or Windows.
              </li>
            </ul>

            <h2 id="next">What to do next</h2>

            <p>
              If the two curl checks both pass, the proxy is fine and the remaining work is
              per-tool configuration: <Link href="/integrations/cursor/">setting up Cursor</Link>,{" "}
              <Link href="/integrations/claude-code/">setting up Claude Code</Link>, or{" "}
              <Link href="/guides/9router-docker/">running it in Docker</Link> if you want it in a
              container instead of on bare Node. If the API call failed, work through the{" "}
              <Link href="/troubleshooting/">troubleshooting hub</Link> in order &mdash; service,
              port, credentials, model &mdash; rather than changing settings at random.
            </p>

            <h2 id="faq">Frequently asked questions</h2>

            {faq.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </article>

          <aside className="sidebar">
            <h3>On this page</h3>
            <a href="#layers">Three things people mean</a>
            <a href="#request">Where it sits in a request</a>
            <a href="#checks">The two curl checks</a>
            <a href="#travels">What travels through it</a>
            <a href="#port">Listening address</a>
            <a href="#tools">Pointing your tools at it</a>
            <a href="#failures">Four false proxy bugs</a>
            <a href="#next">What to do next</a>
            <a href="#faq">FAQ</a>
            <h3 style={{ marginTop: 24 }}>Related</h3>
            <Link href="/guides/">All guides</Link>
            <Link href="/guides/9router-docker/">Docker setup</Link>
            <Link href="/integrations/cursor/">Cursor setup</Link>
            <Link href="/integrations/claude-code/">Claude Code setup</Link>
          </aside>
        </div>
      </section>
    </>
  );
}