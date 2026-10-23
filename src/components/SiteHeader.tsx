import Link from "next/link";
import { navItems, site } from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="9Router Guide home">
          <span className="brand-mark">9</span>
          <span>{site.name}<small>Independent community guide</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <a className="header-cta" href={site.docsUrl} target="_blank" rel="noreferrer">Official docs ↗</a>
      </div>
    </header>
  );
}
