import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const routes: Array<{ path: string; priority?: number }> = [
    { path: "/", priority: 1 },
    { path: "/people", priority: 0.8 },
    { path: "/people/past-teams", priority: 0.7 },
    { path: "/people/e-board", priority: 0.7 },
    { path: "/people/leads", priority: 0.7 },
    { path: "/programs/product-team", priority: 0.8 },
    { path: "/programs/mentorship", priority: 0.8 },
    { path: "/programs/grad-bootcamp", priority: 0.8 },
    { path: "/mac3d", priority: 0.4 },
  ];

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority,
  }));
}

