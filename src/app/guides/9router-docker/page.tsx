import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { articleJsonLd } from "@/lib/seo";

export const metadata: Metadata = { title: "Run 9Router with Docker", description: "A safe checklist for checking official Docker deployment instructions for 9Router.", alternates: { canonical: "/guides/9router-docker/" } };

const jsonLd = articleJsonLd({
  title: "Run 9Router with Docker",
  description: "A safe checklist for checking official Docker deployment instructions for 9Router.",
  path: "/guides/9router-docker/",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: "Run with Docker", path: "/guides/9router-docker/" }
  ],
  datePublished: "2026-10-23"
});

export default function DockerPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/guides/">Guides</Link> / Docker</div><div className="eyebrow">DEPLOYMENT</div><h1>Run 9Router with Docker.</h1><p>Use this deployment checklist to validate the image, environment, persistence, and network settings in the current official instructions.</p></div></section><section className="container page-content"><article className="article"><div className="article-warning">Docker image names and compose files change by release. Confirm the current official project provides a supported Docker deployment path, then use the image tag and compose file it publishes.</div><h2>Before you deploy</h2><ul><li>Confirm the official repository's Docker support, image source, and release tags.</li><li>Decide where provider credentials and router configuration will be stored.</li><li>Plan persistent storage for configuration/state if required by the current release.</li><li>Choose whether the service is local-only or externally reachable.</li></ul><h2>Network and security checks</h2><ul><li>Expose only the required port.</li><li>Do not publish an unauthenticated API endpoint to the internet.</li><li>Use TLS and strong authentication for remote access.</li><li>Do not bake API keys into a Docker image or commit them to a repository.</li></ul><h2>Verify after launch</h2><ol><li>Inspect container logs for startup errors.</li><li>Confirm the service is listening on the expected interface and port.</li><li>Check the dashboard and API endpoints documented by your version.</li><li>Send one minimal request with a known available model.</li></ol><p><a className="text-link" href={site.githubUrl} target="_blank" rel="noreferrer">Check official repository ↗</a> · <a className="text-link" href={site.docsUrl} target="_blank" rel="noreferrer">Read official docs ↗</a></p><p><Link className="text-link" href="/troubleshooting/">If deployment fails, start troubleshooting →</Link></p></article></section></>;
}
