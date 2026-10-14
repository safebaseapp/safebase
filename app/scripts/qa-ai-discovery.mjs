// Guardian checks for public search discovery. This validates source configuration,
// not ranking, actual crawling, citations, or rendered JSON-LD correctness.
import { readFile } from "node:fs/promises";
const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");
const [robots, toolbox, guides, sitemap, directory, guideTemplate, answers, signs, risks, hub] = await Promise.all([
  read("app/robots.ts"),
  read("app/[locale]/toolbox/[slug]/page.tsx"),
  read("app/[locale]/knowledge-base/[slug]/page.tsx"),
  read("app/sitemap.ts"),
  read("public/llms.txt"),
  read("app/[locale]/knowledge-base/components/GuideTemplate.tsx"),
  read("app/[locale]/knowledge-base/components/AuthorityAnswerPanel.tsx"),
  read("app/[locale]/safety-signs/[slug]/page.tsx"),
  read("app/[locale]/risk-assessment/[slug]/page.tsx"),
  read("app/[locale]/knowledge-base/page.tsx"),
]);
const checks = [
  ["OAI-SearchBot explicitly allowed", robots.includes("OAI-SearchBot") && robots.includes('allow: "/"')],
  ["robots protects private API endpoints", robots.includes('"/api/"')],
  ["robots protects private user dashboards", robots.includes('"/tr/dashboard/"') && robots.includes('"/en/dashboard/"')],
  ["published Toolbox content never redirects readers to login or Premium",
    !toolbox.includes('redirect(') && toolbox.includes('if (!access.published || !access.visible)') &&
    toolbox.includes("authentication and Premium") === false],
  ["public Toolbox reading remains indexable independently of PDF entitlements",
    toolbox.includes("index: true") && toolbox.includes("follow: true")],
  ["toolbox has semantic article data", toolbox.includes('"@type": "TechArticle"') && toolbox.includes('"@type": "BreadcrumbList"')],
  ["guide has semantic article data", guides.includes('"@type": "TechArticle"') && guides.includes('"@type": "BreadcrumbList"')],
  ["toolbox article uses real content", toolbox.includes("headline: content.title")],
  ["knowledge guide uses real content", guides.includes("headline: guide.title[language]")],
  ["sitemap includes toolbox and guides", sitemap.includes("toolboxData.map(") && sitemap.includes("allGuides.map(")],
  ["sitemap declares both languages", sitemap.includes('"x-default"') && sitemap.includes('const locales = ["tr", "en"]')],
  ["public reference directory links real SERNEM content", directory.includes("https://www.sernem.com/en/knowledge-base/confined-space-attendant-duties")],
  ["AI discovery directory points to specific public HSE answers",
    directory.includes("## Find the right SERNEM source for a safety question") &&
    directory.includes("/knowledge-base/hydraulic-system-safety") &&
    directory.includes("/knowledge-base/confined-space-attendant-duties") &&
    directory.includes("independent bilingual HSE educational platform")],
  ["source directory includes safety limitations", directory.includes("Verify the applicable current standards")],
  ["Labs hazard scenario visuals are not presented in guides", !guideTemplate.includes("AuthorityFieldVisual")],
  ["ten priority guides have technical answer blocks", ["confined-space", "hot-work", "working-at-height", "loto", "scaffolding", "excavation", "crane-safety", "electrical-safety", "permit-to-work", "chemical-safety"].every((slug) => answers.includes(`"${slug}"`))],
  ["non-OSHA source titles are not silently hidden", guideTemplate.includes("guide.references.filter((reference) => reference.trim().length > 0)")],
  ["flagship reference answers use the original bilingual guide content", guideTemplate.includes("<AuthorityAnswerPanel") && answers.includes("guide.overview[locale]") && answers.includes("guide.controls[locale]") && !answers.includes("/labs/spot-the-hazard/")],
  ["indexing priority pages have visible direct links from knowledge hub",
    hub.includes("priorityGuides.map(") &&
    hub.includes('href={`/${locale}/knowledge-base/${item.slug}`}') &&
    hub.includes('"dropped-object-prevention"') &&
    hub.includes('"confined-space-attendant-duties"')],
  ["search-console priority HSE guides have specific bilingual metadata",
    ["confined-space-attendant-duties", "stored-energy-hazards",
     "hydraulic-system-safety", "suspended-load-exclusion-zones"]
      .every(slug => guides.includes('"' + slug + '"')) &&
    guides.includes("ctrOverrides[guide.slug]?.[language]")],
  ["safety sign pages have distinct TR/EN metadata and canonicals",
    signs.includes("export async function generateMetadata") &&
    signs.includes('slug === "no-smoking"') &&
    signs.includes('"x-default": SITE_URL') &&
    signs.includes('type="application/ld+json"')],
  ["sign metadata discloses login and Premium access",
    signs.includes("Sign in for A4/A3 PDF") &&
    signs.includes("logosuz sürüm Premium")],
  ["high-value risk assessments link to related technical guides",
    risks.includes('relatedKnowledgeGuides[activity.id]') &&
    risks.includes('/knowledge-base/${relatedGuideSlug}') &&
    risks.includes('"roof-work": "working-at-height"')],
  ["three Google-visible risk pages have query-aligned descriptions",
    ["roof-work", "cable-pulling", "steel-erection"].every(slug => risks.includes('"' + slug + '"')) &&
    risks.includes("const intent = searchIntentMetadata") &&
    risks.includes("activity.items.slice(0, 3)")],
  ["OSHA 1910/1926 references link to official sources", guideTemplate.includes("www.osha.gov/laws-regs/regulations/standardnumber/") && guideTemplate.includes("officialSource")],
];
const failures = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} ${label}`);
}
if (failures.length) {
  process.exitCode = 1;
} else {
  console.log(`SERNEM AI discovery static checks passed (${checks.length}/${checks.length}).`);
}
