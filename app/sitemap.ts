import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import {
  getQuestionSitemapEntries,
  getSpaceSitemapEntries,
} from "../sanity/fetch";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/community`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // CMS-driven routes. Wrapped so the static routes still emit if Sanity is down.
  // Note: /api/* and /studio are intentionally excluded from the sitemap.
  let questionRoutes: MetadataRoute.Sitemap = [];
  let spaceRoutes: MetadataRoute.Sitemap = [];
  try {
    const [questions, spaces] = await Promise.all([
      getQuestionSitemapEntries(),
      getSpaceSitemapEntries(),
    ]);

    questionRoutes = questions.map((item) => ({
      url: `${BASE}/questions/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.9,
    }));

    spaceRoutes = spaces.map((item) => ({
      url: `${BASE}/spaces/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (err) {
    console.warn("[sitemap] CMS fetch failed, emitting static routes only:", err);
  }

  // Dedupe by URL.
  const seen = new Set<string>();
  return [...staticRoutes, ...questionRoutes, ...spaceRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
