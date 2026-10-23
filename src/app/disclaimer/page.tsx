import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important accuracy, software, and third-party disclaimers for 9Router Guide.",
  alternates: { canonical: "/disclaimer/" },
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link> / Disclaimer</div>
        <div className="eyebrow">SITE POLICIES</div><h1>Disclaimer</h1>
        <p>Important limitations to keep in mind when following tutorials or troubleshooting suggestions on this website.</p>
        <div className="article-meta"><span>Effective date: October 23, 2026</span></div>
      </div></section>
      <section className="container page-content"><article className="article">
        <h2>Not an official 9Router website</h2>
        <p>9Router Guide is an independent third-party resource. It is not affiliated with, endorsed by, or operated by the 9Router project. For authoritative information, consult the project's official website, documentation, and repository.</p>
        <h2>Accuracy and updates</h2>
        <p>We aim to make tutorials useful and clear, but software changes over time and examples may become outdated or may not work in every environment. Always verify commands, ports, model names, configuration options, and security recommendations against current official sources.</p>
        <h2>Use at your own risk</h2>
        <p>Changing network settings, environment variables, routing configurations, containers, or API clients can affect your development environment and services. Review each command before running it, keep backups where appropriate, and test changes in a safe environment.</p>
        <h2>No professional advice</h2>
        <p>Content is general technical information, not legal, security, or professional consulting advice tailored to your circumstances.</p>
        <h2>Third-party products and links</h2>
        <p>References to third-party software, platforms, and services are for identification and convenience. Their names and trademarks belong to their respective owners. We do not control external content or guarantee third-party availability, pricing, or behavior.</p>
        <h2>Security and credentials</h2>
        <p>Never paste API keys, passwords, access tokens, private configuration files, or unredacted logs into public issues or messages. Redact credentials, email addresses, IP addresses, and other sensitive information before sharing diagnostic details.</p>
      </article></section>
    </>
  );
}
