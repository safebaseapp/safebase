import type { MetadataRoute } from "next";
import { toolboxData } from "@/lib/toolbox/toolbox-data";
import { allRiskActivities } from "@/lib/risk-library/all-activities";
import { safetySigns } from "@/lib/safety-signs/data";
import { safetyPacks } from "@/lib/safety-pack/data";
import { allGuides } from "@/app/[locale]/knowledge-base/data/guides/all-guides";
import { ppeStandards } from "@/app/[locale]/ppe-standards/data";
import { inspectionCatalog } from "@/data/checklists/registry";

const baseUrl = "https://www.sernem.com";
const locales = ["tr", "en"] as const;
type Locale = (typeof locales)[number];
type SitemapEntry = MetadataRoute.Sitemap[number];

const publicRoutes = [
  "",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/cookies",
  "/ai-assistant",
  "/tools",
  "/tools/ltifr",
  "/tools/trir",
  "/tools/severity-rate",
  "/tools/risk-matrix",
  "/tools/quick-risk-assessment",
  "/tools/method-statement",
  "/risk-assessment",
  "/knowledge-base",
  "/ppe-standards",
  "/posters",
  "/safety-signs",
  "/toolbox",
  "/downloads",
  "/checklists",
  "/safety-pack",
];

function localizedEntry(
  locale: Locale,
  path: string,
  options: Omit<SitemapEntry, "url" | "alternates">,
): SitemapEntry {
  return {
    url: `${baseUrl}/${locale}${path}`,
    ...options,
    alternates: {
      languages: {
        en: `${baseUrl}/en${path}`,
        tr: `${baseUrl}/tr${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    publicRoutes.map((route) =>
      localizedEntry(locale, route, {
        changeFrequency:
          route === "" || route === "/ai-assistant" ? "weekly" : "monthly",
        priority:
          route === ""
            ? 1
            : route === "/ai-assistant" ||
                route === "/ppe-standards" ||
                route === "/safety-pack" ||
                route.startsWith("/tools/")
              ? 0.9
              : 0.8,
      }),
    ),
  );

  const safetyPackPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    safetyPacks.map((pack) =>
      localizedEntry(locale, `/safety-pack/${pack.slug}`, {
        changeFrequency: "monthly",
        priority: 0.9,
      }),
    ),
  );

  const guidePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    allGuides.map((guide) =>
      localizedEntry(locale, `/knowledge-base/${guide.slug}`, {
        changeFrequency: "monthly",
        priority: 0.85,
      }),
    ),
  );

  const ppeStandardPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    ppeStandards.map((standard) =>
      localizedEntry(locale, `/ppe-standards/${standard.slug}`, {
        changeFrequency: "monthly",
        priority: 0.9,
      }),
    ),
  );

  const checklistPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    inspectionCatalog.map((entry) =>
      localizedEntry(locale, `/checklists/${entry.slug}`, {
        changeFrequency: "monthly",
        priority: 0.85,
      }),
    ),
  );

  const toolboxPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    toolboxData.map((toolbox) =>
      localizedEntry(locale, `/toolbox/${toolbox.slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
  );

  const riskAssessmentPages: MetadataRoute.Sitemap = locales.flatMap(
    (locale) =>
      allRiskActivities.map((activity) =>
        localizedEntry(locale, `/risk-assessment/${activity.id}`, {
          changeFrequency: "monthly",
          priority: 0.85,
        }),
      ),
  );

  const safetySignPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    safetySigns.map((sign) =>
      localizedEntry(locale, `/safety-signs/${sign.slug}`, {
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
  );

  return [
    ...staticPages,
    ...safetyPackPages,
    ...guidePages,
    ...ppeStandardPages,
    ...checklistPages,
    ...toolboxPages,
    ...riskAssessmentPages,
    ...safetySignPages,
  ];
}
