import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// lastmod 按各页真实改动日分开维护：改了哪页就更新哪条。
const lastmodByRoute: Record<string, string> = {
  "/": "2026-10-26",
  "/guides/": "2026-10-24",
  "/integrations/": "2026-10-24",
  "/integrations/cursor/": "2026-10-26",
  "/integrations/claude-code/": "2026-10-26",
  "/troubleshooting/": "2026-10-26",
  "/troubleshooting/9router-connection-failed-windows/": "2026-10-26",
  "/guides/install-9router-windows/": "2026-10-26",
  "/guides/9router-docker/": "2026-10-23",
  "/compare/9router-vs-openrouter/": "2026-10-26",
  "/about/": "2026-10-23",
  "/privacy-policy/": "2026-10-23",
  "/terms/": "2026-10-23",
  "/disclaimer/": "2026-10-23"
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(lastmodByRoute).map(([route, lastmod]) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(lastmod),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.includes("troubleshooting") ? 0.9 : 0.7
  }));
}