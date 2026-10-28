import type { Metadata } from "next";
import Link from "next/link";
import GuideSearch from "@/components/GuideSearch";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "9Router Guides",
  description: "Browse setup, deployment, integration, and troubleshooting guides for 9Router.",
  alternates: { canonical: "/guides/" }
};

const faqData = [
  { question: "Where should I start with 9Router?", answer: "Start with the install guide for your platform, then confirm the service is running before connecting any client." },
  { question: "Can I run 9Router with Docker?", answer: "Yes — one command starts it: docker run -d -p 20128:20128 -v \"$HOME/.9router:/app/data\" -e DATA_DIR=/app/data --name 9router decolua/9router:latest — then open http://localhost:20128. The Docker guide has the compose file and the persistence details." },
  { question: "What if an install step fails?", answer: "Open the troubleshooting hub and work through service, port, credentials, and model checks in order." }
];
const faqJson = faqJsonLd(faqData);

export default function GuidesPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} /><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / Guides</div><div className="eyebrow">THE KNOWLEDGE BASE</div><h1>Find the guide you need.</h1><p>Search the current collection by client, error, or task. Each guide should be verified against the installed version and current official docs before use.</p></div></section><section className="container page-content"><GuideSearch /><div className="faq-list" style={{marginTop:32}}><h2>Frequently asked questions</h2>{faqData.map((item) => <div key={item.question} style={{marginTop:16}}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</div></section></>;
}
