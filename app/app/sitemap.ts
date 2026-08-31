import type { MetadataRoute } from "next";
import { toolboxData } from "@/lib/toolbox/toolbox-data";

const baseUrl = "https://www.sernem.com";

const publicRoutes = [
  "",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/cookies",

  "/tools",
  "/tools/ltifr",
  "/tools/trir",
  "/tools/severity-rate",
  "/tools/risk-matrix",
  "/tools/quick-risk-assessment",
  "/tools/method-statement",

  "/knowledge-base",
  "/knowledge-base/chemical-safety",
  "/knowledge-base/confined-space",
  "/knowledge-base/crane-safety",
  "/knowledge-base/electrical-safety",
  "/knowledge-base/excavation",
  "/knowledge-base/fire-safety",
  "/knowledge-base/grinding",
  "/knowledge-base/hot-work",
  "/knowledge-base/loto",
  "/knowledge-base/manual-handling",
  "/knowledge-base/permit-to-work",
  "/knowledge-base/ppe",
  "/knowledge-base/scaffolding",
  "/knowledge-base/working-at-height",

  "/posters",
  "/safety-signs",
  "/toolbox",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["tr", "en"] as const;

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    publicRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority:
        route === ""
          ? 1
          : route.startsWith("/tools/")
            ? 0.9
            : 0.8,
    }))
  );

  const toolboxPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    toolboxData.map((toolbox) => ({
      url: `${baseUrl}/${locale}/toolbox/${toolbox.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );

  return [...staticPages, ...toolboxPages];
}
