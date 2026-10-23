import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid footer-grid-legal">
        <div>
          <Link href="/" className="brand footer-brand"><span className="brand-mark">9</span><span>{site.name}</span></Link>
          <p className="muted">Practical setup notes and troubleshooting paths for developers.</p>
        </div>
        <div>
          <strong>Resources</strong>
          <Link href="/guides/">Guides</Link>
          <Link href="/troubleshooting/">Troubleshooting</Link>
          <Link href="/compare/9router-vs-openrouter/">Comparison</Link>
        </div>
        <div>
          <strong>Legal</strong>
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/terms/">Terms of Use</Link>
          <Link href="/disclaimer/">Disclaimer</Link>
        </div>
        <div>
          <strong>Official sources</strong>
          <a href={site.officialUrl} target="_blank" rel="noreferrer">9Router website ↗</a>
          <a href={site.docsUrl} target="_blank" rel="noreferrer">Documentation ↗</a>
          <a href={site.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} 9Router Guide</span>
        <span>Independent third-party resource. Not affiliated with the 9Router project.</span>
      </div>
    </footer>
  );
}
