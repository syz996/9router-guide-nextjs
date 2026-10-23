import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Client Integrations", description: "Integration notes for configuring 9Router with coding clients.", alternates: { canonical: "/integrations/" } };

export default function IntegrationsPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / Integrations</div><div className="eyebrow">CLIENT SETUP</div><h1>Connect the tools you already use.</h1><p>Integration instructions vary by client. Confirm whether the client accepts a local endpoint, a custom base URL, or a reachable hosted endpoint before copying any settings.</p></div></section><section className="container page-content"><div className="guide-grid">
    <Link className="guide-card" href="/integrations/cursor/"><div className="card-meta"><span>EDITOR</span><span>6 min read</span></div><h3>9Router + Cursor</h3><p>Endpoint reachability, API key setup, and checks to perform before troubleshooting model responses.</p><div className="card-bottom"><span className="level">Beginner</span><span className="arrow">↗</span></div></Link>
    <Link className="guide-card" href="/integrations/claude-code/"><div className="card-meta"><span>CLI</span><span>8 min read</span></div><h3>9Router + Claude Code</h3><p>Environment-variable checklist and a minimal request test before launching the client.</p><div className="card-bottom"><span className="level">Intermediate</span><span className="arrow">↗</span></div></Link>
  </div></section></>;
}
