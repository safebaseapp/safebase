import type { MetadataRoute } from "next";
import { toolboxData } from "@/lib/toolbox/toolbox-data";
import { allRiskActivities } from "@/lib/risk-library/all-activities";
import { safetySigns } from "@/lib/safety-signs/data";
import { safetyPacks } from "@/lib/safety-pack/data";
import { allGuides } from "@/app/[locale]/knowledge-base/data/guides/all-guides";
import { ppeStandards } from "@/app/[locale]/ppe-standards/data";
import { inspectionCatalog } from "@/data/checklists/registry";

const baseUrl = "https://www.sernem.com";
const publicRoutes = ["","/about","/contact","/faq","/privacy","/terms","/cookies","/tools","/tools/ltifr","/tools/trir","/tools/severity-rate","/tools/risk-matrix","/tools/quick-risk-assessment","/tools/method-statement","/risk-assessment","/knowledge-base","/ppe-standards","/posters","/safety-signs","/toolbox","/downloads","/checklists","/safety-pack"];
export default function sitemap(): MetadataRoute.Sitemap {
 const locales=["tr","en"] as const;
 const staticPages:MetadataRoute.Sitemap=locales.flatMap(locale=>publicRoutes.map(route=>({url:`${baseUrl}/${locale}${route}`,changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:route==="/ppe-standards"||route==="/safety-pack"||route.startsWith("/tools/")?0.9:0.8})));
 const safetyPackPages:MetadataRoute.Sitemap=locales.flatMap(locale=>safetyPacks.map(pack=>({url:`${baseUrl}/${locale}/safety-pack/${pack.slug}`,changeFrequency:"monthly",priority:0.9})));
 const guidePages:MetadataRoute.Sitemap=locales.flatMap(locale=>allGuides.map(guide=>({url:`${baseUrl}/${locale}/knowledge-base/${guide.slug}`,changeFrequency:"monthly",priority:0.85})));
 const ppeStandardPages:MetadataRoute.Sitemap=locales.flatMap(locale=>ppeStandards.map(standard=>({url:`${baseUrl}/${locale}/ppe-standards/${standard.slug}`,changeFrequency:"monthly",priority:0.9})));
 const checklistPages:MetadataRoute.Sitemap=locales.flatMap(locale=>inspectionCatalog.map(entry=>({url:`${baseUrl}/${locale}/checklists/${entry.slug}`,changeFrequency:"monthly",priority:0.85})));
 const toolboxPages:MetadataRoute.Sitemap=locales.flatMap(locale=>toolboxData.map(toolbox=>({url:`${baseUrl}/${locale}/toolbox/${toolbox.slug}`,changeFrequency:"monthly",priority:0.8})));
 const riskAssessmentPages:MetadataRoute.Sitemap=locales.flatMap(locale=>allRiskActivities.map(activity=>({url:`${baseUrl}/${locale}/risk-assessment/${activity.id}`,changeFrequency:"monthly",priority:0.85})));
 const safetySignPages:MetadataRoute.Sitemap=locales.flatMap(locale=>safetySigns.map(sign=>({url:`${baseUrl}/${locale}/safety-signs/${sign.slug}`,changeFrequency:"monthly",priority:0.8})));
 return [...staticPages,...safetyPackPages,...guidePages,...ppeStandardPages,...checklistPages,...toolboxPages,...riskAssessmentPages,...safetySignPages];
}
