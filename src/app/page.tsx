import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Terminal } from "lucide-react";
import GuideCard from "@/components/GuideCard";
import { categories, guides } from "@/lib/content";
import { site } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";

export default function HomePage() {
  const featured = guides.slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "9Router Guide",
    url: site.url,
    description: site.description
  };
  const faqData: { question: string; answer: string; href?: string; linkText?: string }[] = [
    { question: "What is 9Router?", answer: "9Router is a routing layer between your AI clients and model providers. This site covers installation, client setup, and troubleshooting for it." },
    { question: "Why won't 9Router connect on Windows?", answer: "Start with the service and port, then check your API key, the model ID, provider quotas, and the client endpoint in that order." },
    { question: "Why does my client return 401?", answer: "A 401 is an authentication problem: the key is missing, wrong, or formatted incorrectly. It is not a model or provider error." },
    { question: "What should I fill in for the base URL in Cursor?", answer: "Use http://localhost:20128/v1 if Cursor runs on the same machine as 9Router. Then paste the API key from http://localhost:20128/dashboard and pick a model ID from your own /v1/models list. For a remote 9Router, replace localhost with an address Cursor can reach.", href: "/integrations/cursor/", linkText: "Step-by-step Cursor setup →" },
    { question: "Is 9Router Guide affiliated with 9Router?", answer: "No. This is an independent third-party resource and is not affiliated with, endorsed by, or operated by the 9Router project." }
  ];
  const faqSchema = faqJsonLd(faqData);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">THE PRACTICAL 9ROUTER FIELD GUIDE</div>
            <h1>9Router Guide — <em>setup, clients &amp; troubleshooting.</em></h1>
            <p className="hero-copy">Clear setup guides, client integrations, and step-by-step troubleshooting for developers using 9Router.</p>
            <div className="button-row">
              <Link className="button-primary" href="/troubleshooting/"><Terminal size={16} /> Diagnose an issue <ArrowUpRight size={15} /></Link>
              <Link className="button-secondary" href="/guides/">Browse all guides <ChevronRight size={15} /></Link>
            </div>
            <p className="hero-note">Independent community resource · Not an official 9Router property</p>
          </div>
          <div className="hero-art" aria-label="Illustration of a terminal health check">
            <div className="terminal-head"><span className="terminal-dot"/><span className="terminal-dot"/><span className="terminal-dot"/><span className="terminal-label">TERMINAL / HEALTH CHECK</span></div>
            <div className="terminal-line"><span className="prompt">❯</span><span>curl localhost:20128/health</span></div>
            <div className="terminal-line"><span className="prompt">↳</span><span>Checking local service…</span></div>
            <div className="terminal-line"><span className="prompt">↳</span><span>Verifying endpoint response…</span></div>
            <div className="terminal-success"><strong>● DIAGNOSTIC COMPLETE</strong><br/>Next: test authentication and model availability<br/>Status: <strong>READY FOR NEXT CHECK</strong></div>
            <div className="hero-art-footer"><span>WORKFLOW / 01</span><span>DOCS THAT HELP YOU DEBUG</span></div>
          </div>
        </div>
      </section>
      <div className="trust-strip"><div className="container trust-inner"><strong>Built for the moments you get stuck</strong><span>Installation</span><span>Client setup</span><span>API errors</span><span>Model routing</span><span>Provider issues</span></div></div>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">FIND YOUR NEXT STEP</div><h2>Start with the problem.</h2></div><p>Skip the guesswork. Choose a topic and follow a practical checklist from the first check to a verified result.</p></div>
          <div className="category-grid">{categories.map((item) => <Link className="category-card" href={item.href} key={item.title}><span className="category-num">/ {item.icon}</span><h3>{item.title}</h3><p>{item.description}</p><span className="category-arrow">↗</span></Link>)}</div>
        </div>
      </section>
      <section className="feature-band">
        <div className="container feature-grid">
          <div><div className="eyebrow">A CLEARER DEBUGGING PATH</div><h2>One check at a time. Know what to do next.</h2><p>When an AI request fails, the cause can be local service status, credentials, a model ID, provider limits, or client configuration. Separate those layers instead of changing everything at once.</p><Link className="text-link" href="/troubleshooting/">Open troubleshooting hub →</Link></div>
          <div className="feature-list">
            <div className="feature-row"><span className="feature-check"><Check size={15}/></span><div><h3>Confirm the service first</h3><p>Check whether the server responds before changing your client settings.</p></div></div>
            <div className="feature-row"><span className="feature-check"><Check size={15}/></span><div><h3>Separate auth from model errors</h3><p>Use the status code and available model list to narrow the cause.</p></div></div>
            <div className="feature-row"><span className="feature-check"><Check size={15}/></span><div><h3>Keep sensitive details private</h3><p>Redact keys, tokens, email addresses, and other secrets before sharing logs.</p></div></div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">UNDERSTAND THE STACK</div><h2>What 9Router sits between.</h2></div><p>9Router forwards requests from your coding tools to the model providers you configure. When one request fails, the cause is usually a single layer—not “everything is broken.”</p></div>
          <div className="article" style={{maxWidth:780}}>
            <p>A request moves through five hops before you see a response: the client you type in, the endpoint it calls, the authentication you attach, the model ID you request, and finally the upstream provider. That sequence is also the order to check things in. If you start by editing your client or rotating keys at random, you change several variables at once and learn nothing.</p>
            <p>These guides are built around that idea. Each one changes exactly one variable per step, tells you what a given status code usually means, and points you to the primary source for anything that changes between releases.</p>
            <h3>The five layers, in order</h3>
            <ol>
              <li><strong>Service and port.</strong> Is 9Router running and listening where you think it is? A refused connection here invalidates every later check.</li>
              <li><strong>Endpoint and client.</strong> Does the client accept the base URL you gave it? Some clients need a local endpoint, others need a TLS-reachable one.</li>
              <li><strong>Authentication.</strong> A 401 is about the key or the header format—not the model, and not the provider.</li>
              <li><strong>Model ID.</strong> Copy the exact ID from your own model list; an ID from an old tutorial may no longer exist.</li>
              <li><strong>Provider and quota.</strong> If the request reaches the router but fails upstream, check provider credentials, billing, and rate limits.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">DO THIS FIRST</div><h2>A 60-second connection self-check.</h2></div><p>Before you touch any configuration, work down this list. It usually answers the question faster than a dozen retries.</p></div>
          <div className="article" style={{maxWidth:780}}>
            <ul>
              <li><strong>Is the service up?</strong> Run the health check for your install and confirm it responds.</li>
              <li><strong>Is the port right?</strong> Use the port from your startup output, not from memory.</li>
              <li><strong>Is the key correct?</strong> Re-paste it and watch for trailing spaces, missing prefixes, or an expired value.</li>
              <li><strong>Does the model list include your ID?</strong> If not, the model is where the problem is.</li>
              <li><strong>Can the client reach the endpoint?</strong> A localhost URL often fails from remote or containerized clients.</li>
              <li><strong>Is this a provider error?</strong> Check the upstream status code and your quota.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">QUICK ERROR MAP</div><h2>Common errors, one line each.</h2></div></div>
          <div className="article" style={{maxWidth:780}}>
            <p><strong>Connection refused / no response</strong> — the service is not running or the port is wrong. Start there.</p>
            <p><strong>401 Unauthorized</strong> — the key is missing, wrong, or the Authorization header is malformed. Not a model issue.</p>
            <p><strong>404 Not Found</strong> — the path, base URL, or model route does not match your installed version.</p>
            <p><strong>Model not found</strong> — the ID is not in your model list. Copy it exactly as shown.</p>
            <p><strong>429 / provider error</strong> — a rate limit or quota on the provider, or the provider is temporarily unavailable.</p>
            <p><strong>Dashboard won’t load</strong> — the service may be on a different port or behind TLS.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">WHO THIS IS FOR</div><h2>Built for developers who would rather debug than guess.</h2></div><p>If you are setting up your first local router or moving an existing workflow over, the same checklist applies.</p></div>
          <div className="article" style={{maxWidth:780}}>
            <p>These pages assume you can open a terminal and edit a configuration file, but they do not assume you already know the exact command or the current dashboard URL. Where a value changes by release, the guide tells you how to find it from your own output instead of guessing.</p>
            <p>They are also written to be shareable: redact secrets, record your version and platform, and you have a useful error report ready for a maintainer or a colleague.</p>
          </div>
        </div>
      </section>

      <section className="guides-section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">POPULAR STARTING POINTS</div><h2>Useful guides, without the fluff.</h2></div><Link className="text-link" href="/guides/">View all guides →</Link></div>
          <div className="guide-grid">{featured.map((guide) => <GuideCard guide={guide} key={guide.href}/>)}</div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">QUICK ANSWERS</div><h2>Short answers to the questions everyone starts with.</h2></div></div>
          <div style={{ display: "grid", gap: 24 }}>
            {faqData.map((item) => (
              <div key={item.question}><h3>{item.question}</h3><p>{item.answer}{item.href ? <> <Link className="text-link" href={item.href}>{item.linkText}</Link></> : null}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="container">
        <div className="cta-panel"><div><h2>Something isn’t connecting?</h2><p>Start with the symptom and get a focused list of checks.</p></div><Link className="button-primary" href="/troubleshooting/">Start diagnosis <ArrowUpRight size={15}/></Link></div>
      </section>
    </>
  );
}
