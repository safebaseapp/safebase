// Guardian checks for public search discovery. This validates source configuration,
// not ranking, actual crawling, citations, or rendered JSON-LD correctness.
import { readFile } from "node:fs/promises";
const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");
const [robots, toolbox, guides, sitemap, directory, guideTemplate] = await Promise.all([
  read("app/robots.ts"),
  read("app/[locale]/toolbox/[slug]/page.tsx"),
  read("app/[locale]/knowledge-base/[slug]/page.tsx"),
  read("app/sitemap.ts"),
  read("public/llms.txt"),
  read("app/[locale]/knowledge-base/components/GuideTemplate.tsx"),
]);
const checks = [
  ["OAI-SearchBot explicitly allowed", robots.includes("OAI-SearchBot") && robots.includes('allow: "/"')],
  ["robots protects private API endpoints", robots.includes('"/api/"')],
  ["robots protects private user dashboards", robots.includes('"/tr/dashboard/"') && robots.includes('"/en/dashboard/"')],
  ["toolbox has semantic article data", toolbox.includes('"@type": "TechArticle"') && toolbox.includes('"@type": "BreadcrumbList"')],
  ["guide has semantic article data", guides.includes('"@type": "TechArticle"') && guides.includes('"@type": "BreadcrumbList"')],
  ["toolbox article uses real content", toolbox.includes("headline: content.title")],
  ["knowledge guide uses real content", guides.includes("headline: guide.title[language]")],
  ["sitemap includes toolbox and guides", sitemap.includes("toolboxData.map(") && sitemap.includes("allGuides.map(")],
  ["sitemap declares both languages", sitemap.includes('"x-default"') && sitemap.includes('const locales = ["tr", "en"]')],
  ["public reference directory links real SERNEM content", directory.includes("https://www.sernem.com/en/knowledge-base/confined-space-attendant-duties")],
  ["source directory includes safety limitations", directory.includes("Verify the applicable current standards")],
  ["Labs hazard scenario visuals are not presented in guides", !guideTemplate.includes("AuthorityFieldVisual")],
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
