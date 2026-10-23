import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About 9Router Guide", description: "Learn about this independent third-party 9Router guide site.", alternates: { canonical: "/about/" } };

export default function AboutPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / About</div><div className="eyebrow">ABOUT THIS SITE</div><h1>Independent guides, with clear boundaries.</h1><p>This site is designed to help developers understand setup paths and troubleshoot common failures through practical checklists.</p></div></section><section className="container page-content"><article className="article"><h2>What we publish</h2><p>Setup notes, integration checklists, diagnostic decision paths, and comparison frameworks. We aim to link to primary sources and distinguish verified steps from examples that still need testing.</p><h2>Independence and trademark</h2><p>{site.name} is an independent third-party resource. It is not affiliated with, endorsed by, or operated by the 9Router project. Product names are used only to identify the software being discussed.</p><h2>Corrections and feedback</h2><p>Use the website's monitored contact channel for corrections. Do not ask users to send API keys, access tokens, private configuration files, or unredacted logs.</p><div className="article-note">Editorial standard: show the tested software version, operating system, last-verified date, official references, and known limitations for each technical guide.</div></article></section></>;
}
