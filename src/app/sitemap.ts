import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/", "/guides/", "/integrations/", "/integrations/cursor/",
    "/integrations/claude-code/", "/troubleshooting/",
    "/troubleshooting/9router-connection-failed-windows/",
    "/guides/install-9router-windows/", "/guides/9router-docker/",
    "/compare/9router-vs-openrouter/", "/about/",
    "/privacy-policy/", "/terms/", "/disclaimer/"
  ];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(site.lastModified),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.includes("troubleshooting") ? 0.9 : 0.7
  }));
}