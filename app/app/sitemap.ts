import type { MetadataRoute } from "next";

const baseUrl = "https://www.sernem.com";

const publicRoutes = [
  "",
  "/tools",
  "/tools/ltifr",
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
  const locales = ["tr", "en"];

  return locales.flatMap((locale) =>
    publicRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
    }))
  );
}
