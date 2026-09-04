import type { MetadataRoute } from "next";
import { toolboxData } from "@/lib/toolbox/toolbox-data";
import { allRiskActivities } from "@/lib/risk-library/all-activities";
import { safetySigns } from "@/lib/safety-signs/data";

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
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    publicRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: now,
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
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );

  const riskAssessmentPages: MetadataRoute.Sitemap = locales.flatMap(
    (locale) =>
      allRiskActivities.map((activity) => ({
        url: `${baseUrl}/${locale}/risk-assessment/${activity.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
      }))
  );


  const safetySignPages: MetadataRoute.Sitemap = locales.flatMap(
    (locale) =>
      safetySigns.map((sign) => ({
        url: `${baseUrl}/${locale}/safety-signs/${sign.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      }))
  );

  return [
    ...staticPages,
    ...toolboxPages,
    ...riskAssessmentPages,
    ...safetySignPages,
  ];
}
