import type { MetadataRoute } from "next";

import { seo } from "@/config/seo";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.producer}`,
    short_name: site.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b1c17",
    theme_color: "#0b1c17",
    lang: site.locale,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
