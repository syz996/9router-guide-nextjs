import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Terminal } from "lucide-react";
import GuideCard from "@/components/GuideCard";
import { categories, guides } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = guides.slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "9Router Guide",
    url: site.url,
    description: site.description
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">THE PRACTICAL 9ROUTER FIELD GUIDE</div>
            <h1>Make your AI setup <em>work as expected.</em></h1>
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
      <section className="guides-section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">POPULAR STARTING POINTS</div><h2>Useful guides, without the fluff.</h2></div><Link className="text-link" href="/guides/">View all guides →</Link></div>
          <div className="guide-grid">{featured.map((guide) => <GuideCard guide={guide} key={guide.href}/>)}</div>
        </div>
      </section>
      <section className="container">
        <div className="cta-panel"><div><h2>Something isn’t connecting?</h2><p>Start with the symptom and get a focused list of checks.</p></div><Link className="button-primary" href="/troubleshooting/">Start diagnosis <ArrowUpRight size={15}/></Link></div>
      </section>
    </>
  );
}
