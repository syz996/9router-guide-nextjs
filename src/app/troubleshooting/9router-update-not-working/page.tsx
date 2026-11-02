import type { Metadata } from 'next';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';
import SymptomTriage from './SymptomTriage';
import VersionCheck from './VersionCheck';

const PAGE_URL = 'https://9routerguide.info/troubleshooting/9router-update-not-working/';
const TITLE = '9Router Update Not Working? 6 Checks (Windows + npm)';
const DESC =
  'npm says it updated but 9router --version still shows the old build? Six checks, starting with the port 20128 process that keeps 0.5.112 from applying.';
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
      { '@type': 'ListItem', position: 3, name: 'Update not working', item: PAGE_URL },
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
            <Link href="/">Home</Link> / <Link href="/troubleshooting/">Troubleshooting</Link> /
            Update not working
          </div>
          <div className="eyebrow">UPDATE · TROUBLESHOOTING</div>
          <h1>9Router update not working? Check the version number first.</h1>
          <p>
            Most of these reports are the same thing: npm says it updated,{' '}
            <code>9router --version</code> still prints the old number, and an old process is still
            holding port <code>20128</code>. The download almost always worked.
          </p>
          <div className="article-meta">
            <span>7 MIN READ</span>
            <span>TESTED ON 0.5.108 → 0.5.112</span>
            <span>LAST REVIEW: {REVIEWED}</span>
          </div>
        </div>
      </section>

      <section className="container page-content">
        <div className="two-column">
          <article className="article">
            <div className="article-warning">
              <strong>Read this before you reinstall:</strong> reinstalling does not delete your
              config. It lives in <code>%APPDATA%\9router\</code> and survives an uninstall. If you
              expected a clean slate, see check 6 — that is the only place it gets removed.
            </div>

            <SymptomTriage />
            <VersionCheck />

            <h2 id="version">1. Find out which build you actually have</h2>
            <p>
              Not <code>9router --version</code>. That binary can be a stale one on your PATH. Ask
              npm what it installed:
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_VERSION}</pre>
              <CopyButton text={CMD_VERSION} />
            </div>
            <p>You get two lines. The second one is the answer:</p>
            <div className="code-block-wrap">
              <pre className="code-block">
                {'C:\\Users\\<you>\\AppData\\Roaming\\npm\n└── 9router@0.5.112'}
              </pre>
            </div>
            <ul>
              <li>
                <strong>Older than 0.5.112</strong> — the update did not land. Go to check 2, it is
                almost always a process that never restarted.
              </li>
              <li>
                <strong>(empty) or npm ERR</strong> — nothing is installed globally. Go to check 4.
              </li>
              <li>
                <strong>0.5.112 but the behaviour is unchanged</strong> — the update worked and this
                is not an update problem. Check 5.
              </li>
            </ul>

            <h2 id="process">2. Kill the old process still holding 20128</h2>
            <p>
              npm writes new files to disk. It does not touch the process already running in
              memory. A gateway that started before the update keeps serving the old code until you
              stop it, and <code>9router --version</code> reads from the old binary it launched.
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_PORTS}</pre>
              <CopyButton text={CMD_PORTS} />
            </div>
            <p>The last column is the PID — 21844 below:</p>
            <div className="code-block-wrap">
              <pre className="code-block">
                {'  TCP    127.0.0.1:20128        0.0.0.0:0              LISTENING       21844'}
              </pre>
            </div>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_KILL}</pre>
              <CopyButton text={CMD_KILL} />
            </div>
            <p>
              Nothing on 20128 at all? Then the process already died and your version number is
              stale for a different reason — continue to check 3.
            </p>
            <p className="fine-print">
              This is the one step I could not fully verify for everyone: on Windows 11 with Node 22
              the kill is immediate, but one reader on Windows 10 reported the port still held by{' '}
              <code>svchost</code> afterwards. If that happens, reboot before reinstalling.
            </p>

            <h2 id="reinstall">3. Reinstall, and stop using npm update</h2>
            <p>
              <code>npm update -g 9router</code> only moves you when a new version satisfies the
              range already recorded. When the maintainers publish outside it, update reports
              success and changes nothing. Force the tag instead:
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_REINSTALL}</pre>
              <CopyButton text={CMD_REINSTALL} />
            </div>
            <p>
              About <code>npm cache clean --force</code>: it helps in exactly one situation — the
              install log shows an <code>integrity checksum</code> failure. Otherwise skip it. It
              wipes every package from the cache and the next install of anything gets slower.
            </p>

            <h2 id="permission">4. EACCES, EPERM, or the command disappeared</h2>
            <p>Both symptoms are the same root cause. Ask npm where it puts global packages:</p>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_PREFIX}</pre>
              <CopyButton text={CMD_PREFIX} />
            </div>
            <p>
              If it prints <code>C:\Program Files\nodejs</code>, every global install needs an
              elevated shell and a non-elevated one fails with:
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">
                {'npm ERR! code EPERM\nnpm ERR! syscall mkdir\nnpm ERR! path C:\\Program Files\\nodejs\\node_modules\\9router'}
              </pre>
            </div>
            <p>
              Running PowerShell as administrator fixes it once. Moving the prefix fixes it for
              good:
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_FIXPREFIX}</pre>
              <CopyButton text={CMD_FIXPREFIX} />
            </div>
            <p>
              Then confirm <code>%APPDATA%\npm</code> is on your PATH and open a new shell. Until you
              open a new one, <code>9router</code> stays &quot;not recognized&quot; even though it
              installed fine — that is the entire mystery of the disappearing command.
            </p>

            <h2 id="client">5. Cursor or Claude Code cannot connect afterwards</h2>
            <p>
              The client config is not touched by an npm update, so if it worked before and not
              after, suspect a changed default rather than your settings. Split it in two — first
              prove the gateway answers:
            </p>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_MODELS}</pre>
              <CopyButton text={CMD_MODELS} />
            </div>
            <p>
              <strong>200 with a model list</strong> — the gateway is fine, the client is pointing
              somewhere else. Re-check its base URL and API key field.
            </p>
            <p>
              <strong>401</strong> — the key changed or the header is missing.{' '}
              <strong>404</strong> — the route moved, check <code>/v1/models</code> against your
              version. <strong>Connection refused</strong> — back to check 1.
            </p>

            <h2 id="uninstall">6. What an uninstall leaves behind</h2>
            <p>
              <code>npm uninstall -g 9router</code> removes the package. It does not remove your
              data, and that is deliberate — a reinstall picks the old config back up, which is why
              so many people report that &quot;reinstalling did nothing&quot;.
            </p>
            <ul>
              <li>
                Config and SQLite database: <code>%APPDATA%\9router\</code>, database at{' '}
                <code>db\data.sqlite</code>
              </li>
              <li>
                A process on <code>20128</code> can outlive the uninstall — check 2 again
              </li>
            </ul>
            <p>For a genuinely clean slate, after uninstalling:</p>
            <div className="code-block-wrap">
              <pre className="code-block">{CMD_PURGE}</pre>
              <CopyButton text={CMD_PURGE} />
            </div>
            <div className="article-note">
              That command deletes every provider config and every stored key. Back up{' '}
              <code>data.sqlite</code> first if you have routings you want to keep.
            </div>

            <h2>Still stuck</h2>
            <p>
              Paste the output of the two commands from checks 1 and 2. Those two lines are enough
              to tell which of the six cases you are in.
            </p>
            <p>
              <a className="text-link" href="mailto:hello@9routerguide.info?subject=9Router%20update%20not%20working">
                Send me the output →
              </a>
            </p>

            <h2>Official references</h2>
            <p>
              <a
                className="text-link"
                href="https://github.com/decolua/9router/issues"
                target="_blank"
                rel="noreferrer"
              >
                GitHub issues ↗
              </a>{' '}
              ·{' '}
              <a
                className="text-link"
                href="https://docs.9router.com/"
                target="_blank"
                rel="noreferrer"
              >
                9Router docs ↗
              </a>
            </p>
            <p className="fine-print">
              This independent guide is not affiliated with 9Router. Commands are examples and
              should be verified in your own environment before use.
            </p>
          </article>

          <aside className="sidebar">
            <h3>On this page</h3>
            <a href="#version">1. Which build you have</a>
            <a href="#process">2. Old process on 20128</a>
            <a href="#reinstall">3. Reinstall properly</a>
            <a href="#permission">4. EACCES / EPERM</a>
            <a href="#client">5. Cursor and Claude Code</a>
            <a href="#uninstall">6. What uninstall leaves</a>
            <h3 style={{ marginTop: 24 }}>Related</h3>
            <a href="/troubleshooting/9router-connection-failed-windows/">
              Connection failed on Windows
            </a>
            <a href="/guides/install-9router-windows/">Windows install</a>
            <a href="/guides/9router-docker/">Docker setup</a>
          </aside>
        </div>
      </section>
    </>
  );
}