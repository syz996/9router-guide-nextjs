import type { Metadata } from "next";
import Link from "next/link";
import GuideSearch from "@/components/GuideSearch";

export const metadata: Metadata = {
  title: "9Router Guides",
  description: "Browse setup, deployment, integration, and troubleshooting guides for 9Router.",
  alternates: { canonical: "/guides/" }
};

export default function GuidesPage() {
  return <><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / Guides</div><div className="eyebrow">THE KNOWLEDGE BASE</div><h1>Find the guide you need.</h1><p>Search the current collection by client, error, or task. Each guide should be verified against the installed version and current official docs before use.</p></div></section><section className="container page-content"><GuideSearch /></section></>;
}
