import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the independent 9Router Guide tutorial and troubleshooting website.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero"><div className="container">
        <div className="breadcrumbs"><a href="/">Home</a> / Terms of Use</div>
        <div className="eyebrow">SITE POLICIES</div><h1>Terms of Use</h1>
        <p>These terms describe the basic conditions for using 9Router Guide.</p>
        <div className="article-meta"><span>Effective date: October 23, 2026</span></div>
      </div></section>
      <section className="container page-content"><article className="article">
        <div className="article-note">This is a general starter template, not legal advice. Review it for your jurisdiction and actual business practices before launch.</div>
        <h2>1. Independent resource</h2>
        <p>9Router Guide is an independent third-party website that publishes tutorials, setup notes, comparisons, and troubleshooting information. It is not affiliated with, sponsored by, or endorsed by the 9Router project. Third-party product names and trademarks belong to their respective owners.</p>
        <h2>2. Informational use</h2>
        <p>Content is provided for general informational and educational purposes. Software versions, interfaces, commands, endpoints, and service policies can change. Verify instructions against current official documentation and test commands in an environment you control before relying on them.</p>
        <h2>3. Safe use</h2>
        <p>You are responsible for how you use the information on this website and for complying with applicable laws, software licenses, and service terms. Do not use examples to access systems or data without authorization. Protect credentials and remove secrets from logs before sharing them.</p>
        <h2>4. Intellectual property</h2>
        <p>Unless otherwise stated, original site text and design are provided by this website's publisher. Third-party names, logos, software, and documentation may be protected by their respective owners. Do not imply that this site is an official source.</p>
        <h2>5. External websites</h2>
        <p>Links to external websites are provided for convenience. We do not control those websites and are not responsible for their content, availability, security, or policies.</p>
        <h2>6. Availability and changes</h2>
        <p>We may update, remove, or reorganize content or site features at any time. We do not guarantee that the website will always be available, error-free, or compatible with every device or environment.</p>
        <h2>7. Disclaimer and limitation</h2>
        <p>To the extent permitted by applicable law, the website and its content are provided “as is” and “as available,” without warranties of any kind. Nothing in these terms excludes liability that cannot legally be excluded.</p>
        <h2>8. Changes to these terms</h2>
        <p>We may revise these terms as the website changes. The effective date above indicates when this version was published.</p>
        <h2>9. Contact</h2>
        <p>Add a monitored contact channel before launch so users can ask questions about these terms.</p>
      </article></section>
    </>
  );
}
