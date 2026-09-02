import type { MetadataRoute } from "next";

import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/termos`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
