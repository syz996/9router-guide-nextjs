import type { Metadata } from 'next';
import Link from 'next/link';

const PAGE_URL = 'https://9routerguide.info/troubleshooting/9router-localhost-20128/';
const TITLE = 'What Port Does 9Router Use? localhost:20128 Explained | 9Router Guide';
const DESC =
    '9Router listens on port 20128. The dashboard lives at /dashboard, the OpenAI-compatible API at /v1 — same port, different paths. What to do when 20128 is already taken.';
const REVIEWED = '2026-11-02';

export const metadata: Metadata = {
    title: TITLE,
    description: DESC,
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: TITLE,
        description: DESC,
        url: PAGE_URL,
        siteName: '9Router Guide',
        images: [
            {
                url: 'https://9routerguide.info/og-image.jpg',
                width: 1200,
                height: 630,
                alt: '9Router Guide',
                type: 'image/jpeg',
            },
        ],
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESC,
        images: ['https://9routerguide.info/og-image.jpg'],
    },
};

const jsonLd = [
    {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://9routerguide.info/' },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Troubleshooting',
                item: 'https://9routerguide.info/troubleshooting/',
            },
            { '@type': 'ListItem', position: 3, name: 'localhost 20128', item: PAGE_URL },
        ],
    },
    {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: TITLE,
        description: DESC,
        url: PAGE_URL,
        datePublished: REVIEWED,
        dateModified: REVIEWED,
        inLanguage: 'en',
        mainEntityOfPage: PAGE_URL,
        author: { '@type': 'Organization', name: '9Router Guide' },
        publisher: { '@type': 'Organization', name: '9Router Guide' },
    },
];

const CMD_VERSION = 'npm ls -g 9router';
const CMD_PORTS = 'netstat -ano | findstr :20128';
const CMD_KILL = 'taskkill /PID 21844 /F\n9router';
const CMD_REINSTALL = 'npm uninstall -g 9router\nnpm install -g 9router@latest';
const CMD_PREFIX = 'npm config get prefix';
const CMD_FIXPREFIX = 'npm config set prefix "$env:APPDATA\\npm"';
const CMD_MODELS =
    'curl.exe -i http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_9ROUTER_API_KEY"';
const CMD_PURGE = 'Remove-Item -Recurse -Force "$env:APPDATA\\9router"';

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <section className="page-hero">
                <div className="container">
                    <div className="breadcrumbs">
                        <Link href="/">Home</Link> / <Link href="/troubleshooting/">Troubleshooting</Link> / localhost 20128
                    </div>
                    <div className="eyebrow">PORT · REFERENCE</div>
                    <h1>What port does 9Router use? 20128 — and the paths that trip people up.</h1>
                    <p>
                        One port serves everything: the dashboard, the OpenAI-compatible API, and the model list.
                        Most connection problems are not the port — they are the path after it.
                    </p>
                    <div className="article-meta">
                        <span>6 MIN READ</span>
                        <span>VERIFIED ON 0.5.112</span>
                        <span>LAST REVIEW: 2026-11-12</span>
                    </div>
                </div>
            </section>

            <section className="container page-content">
                <div className="two-column">
                    <article className="article">
                        <div className="article-note">
                            <strong>The whole answer in one line:</strong> <code>http://localhost:20128/v1</code> is what clients want.
                            <code>http://localhost:20128/dashboard</code> is what you open in a browser. Both are the same server on port 20128.
                        </div>

                        <h2 id="port">1. The port is 20128, for the dashboard and the API alike</h2>
                        <p>
                            <code>9router</code> starts a single local server on port <code>20128</code>. There is no second port,
                            no separate frontend to launch, and no Nginx-style proxy to put in front of it. The startup output says so:
                        </p>
                        <div className="code-block-wrap">
                            <pre className="code-block">{"$ npm install -g 9router\n$ 9router\n> Server: localhost:20128\n> Dashboard: localhost:20128/dashboard\n> Ready to route ✓"}</pre>
                        </div>
                        <p>Prove it is listening, before touching any client config:</p>
                        <div className="code-block-wrap">
                            <pre className="code-block">{'curl.exe -i http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_9ROUTER_API_KEY"'}</pre>
                        </div>
                        <p>
                            <code>200</code> with a model list means the server is fine and the problem is somewhere else.
                            <strong> Use <code>curl.exe</code>, not <code>curl</code></strong> — in PowerShell <code>curl</code> is an alias
                            for <code>Invoke-WebRequest</code> and the flags above mean something different there.
                        </p>

                        <h2 id="paths">2. Same port, three different paths</h2>
                        <p>
                            This is where most people lose an hour. Port 20128 is the server; the path decides what you get back.
                            All three of these hit the same process:
                        </p>
                        <div className="code-block-wrap">
                            <pre className="code-block">{"http://localhost:20128/dashboard     → the web UI (open in a browser)\nhttp://localhost:20128/v1            → OpenAI-compatible base URL (put in the client)\nhttp://localhost:20128/v1/models     → the model list (curl or browser)"}</pre>
                        </div>
                        <p>
                            The mistake that produces a <code>404</code>: pasting <code>http://localhost:20128</code> into a client&apos;s
                            base URL field. Most tools append <code>/chat/completions</code> to whatever you give them, so the request
                            lands on <code>/chat/completions</code> instead of <code>/v1/chat/completions</code>, and the server answers
                            404 even though it is running perfectly.
                        </p>
                        <p className="fine-print">
                            Rule of thumb: if the field is called base URL and it belongs to an OpenAI-compatible tool, it ends in <code>/v1</code>.
                            No trailing slash after it.
                        </p>

                        <h2 id="browser">3. Why localhost:20128 shows nothing in a browser</h2>
                        <p>
                            Opening the bare port gives you an empty page or a 404 — that is not a broken install. The UI is served
                            under <code>/dashboard</code>. If the startup output printed both lines above, the server is up and you simply
                            asked for a path that is not a page.
                        </p>
                        <p>
                            If nothing is printed at all and the browser says the site cannot be reached, the process is not running —
                            read <Link className="text-link" href="/troubleshooting/9router-connection-failed-windows/">the connection failure guide</Link> instead.
                            This page assumes the server is up and you are unsure what to ask it for.
                        </p>

                        <h2 id="conflict">4. When something else already owns 20128</h2>
                        <p>Two different failures look identical from the browser. Find out which one you have:</p>
                        <div className="code-block-wrap">
                            <pre className="code-block">netstat -ano | findstr :20128</pre>
                        </div>
                        <p>A healthy listener looks like this — the last column is the process ID:</p>
                        <div className="code-block-wrap">
                            <pre className="code-block">{"  TCP    127.0.0.1:20128        0.0.0.0:0              LISTENING       21844"}</pre>
                        </div>
                        <p>Now ask what that PID actually is:</p>
                        <div className="code-block-wrap">
                            <pre className="code-block">{'tasklist /FI "PID eq 21844"'}</pre>
                        </div>
                        <ul>
                            <li><strong>node.exe</strong> — almost always an older 9Router that survived a restart. Kill it and start again.</li>
                            <li><strong>Anything else (Docker, a dev server, a game launcher)</strong> — that program has to move, not 9Router.</li>
                            <li><strong>Nothing at all</strong> — the port is free, so the problem is the process, not the port.</li>
                        </ul>
                        <p className="fine-print">
                            Note <code>127.0.0.1</code> rather than <code>0.0.0.0</code>: the server only accepts connections from this machine.
                            Another computer or a phone on your network cannot reach it, and that is by design, not a firewall bug.
                        </p>

                        <h2 id="change">5. Can you move it to another port?</h2>
                        <p>
                            Be careful with blog posts that hand you <code>--port 3000</code>. The current documentation does not publish
                            a way to change the port — 20128 is the default and, on most builds, the only option. Check your own build
                            before believing either answer:
                        </p>
                        <div className="code-block-wrap">
                            <pre className="code-block">9router --help</pre>
                        </div>
                        <p>
                            If your version lists a <code>--port</code> or <code>--host</code> flag, use the flag names exactly as it prints them.
                            If it does not, the port is fixed — so the conflict in section 4 has to be solved on the other program&apos;s side,
                            by stopping it or changing its port. Do not try to remap 20128 with a proxy; clients and the dashboard disagree
                            about ports in ways that are hard to debug later.
                        </p>

                        <h2 id="clients">6. Which URL goes in which client</h2>
                        <p>Three rules cover every OpenAI-compatible tool:</p>
                        <ul>
                            <li><strong>Base URL</strong> — <code>http://localhost:20128/v1</code>, for every client, no exceptions.</li>
                            <li><strong>API key</strong> — generated inside the dashboard, not a provider key you already had. The gateway has its own.</li>
                            <li><strong>Model ID</strong> — copy it verbatim from <code>/v1/models</code>. A model that exists in the UI but not in that list will 404 when requested.</li>
                        </ul>
                        <p>
                            Per-client field names differ, and those live on the integration pages rather than here:
                            see <Link className="text-link" href="/integrations/">the integrations index</Link> for the exact fields.
                        </p>

                        <h2 id="cheatsheet">7. One-page cheat sheet</h2>
                        <p>Match the symptom, skip the rest:</p>
                        <div className="code-block-wrap">
                            <pre className="code-block">{"Blank page in the browser        → you wanted /dashboard, not /\nClient returns 404               → base URL is missing /v1\nClient returns 401               → key missing or not the gateway key\n\"Port already in use\" on start    → section 4 (find the PID first)\nListener exists, client refused  → not a port problem, see connection guide\nAnother machine cannot reach it  → 127.0.0.1 only, by design"}</pre>
                        </div>

                        <h2>Still stuck</h2>
                        <p>
                            Paste the output of the <code>netstat</code> line from section 4 and the <code>curl.exe</code> line from section 1.
                            Between them they say whether the server is up, on which port, and whetherthe request is being answered at all. Include your 9Router version from `npm ls -g 9router` as well.
                        </p>
                        <p>
                            <Link className="text-link" href="mailto:hello@9routerguide.info?subject=9Router%20port%2020128">
                                Send me the output →
                            </Link>
                        </p>

                        <h2>Official references</h2>
                        <p>
                            <a className="text-link" href="https://docs.9router.com/" target="_blank" rel="noreferrer">9Router docs ↗</a> ·
                            <a className="text-link" href="https://github.com/decolua/9router" target="_blank" rel="noreferrer">GitHub ↗</a> ·
                            <a className="text-link" href="https://github.com/decolua/9router/issues" target="_blank" rel="noreferrer">GitHub issues ↗</a>
                        </p>
                        <p className="fine-print">
                            This independent guide is not affiliated with 9Router. The port and paths above are the documented defaults —
                            confirm them in your own startup output, which is the only authority on the build you have installed.
                        </p>
                    </article>

                    <aside className="sidebar">
                        <h3>On this page</h3>
                        <a href="#port">1. The port is 20128</a>
                        <a href="#paths">2. Three paths, one port</a>
                        <a href="#browser">3. Blank page in browser</a>
                        <a href="#conflict">4. Port already in use</a>
                        <a href="#change">5. Changing the port</a>
                        <a href="#clients">6. Which URL in which client</a>
                        <a href="#cheatsheet">7. Cheat sheet</a>
                        <h3 style={{ marginTop: 24 }}>Related</h3>
                        <Link href="/troubleshooting/9router-connection-failed-windows/">Connection failed on Windows</Link>
                        <Link href="/troubleshooting/9router-update-not-working/">Update not working</Link>
                        <Link href="/integrations/">Integrations</Link>
                    </aside>
                </div>
            </section>
        </>
    );
}