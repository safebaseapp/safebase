// SERNEM Issue #127: narrow source-level regression guard.
// This is NOT a substitute for Chromium, auth, billing or print-driver E2E.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const posterLibrary = read("app/[locale]/posters/PosterLibraryClient.tsx");
const printToolbar = read("components/posters-v4/PosterFormatToolbar.tsx");
const downloads = read("app/[locale]/downloads/DownloadsClient.tsx");
const checklistPage = read("app/[locale]/checklists/page.tsx");
const checklistCards = read("app/[locale]/checklists/InspectionLibraryClient.tsx");

for (const [name, needle] of [
  ["TR A4 preview", "A4 Görüntüle"],
  ["EN A4 preview", "Preview A4"],
  ["TR A3 preview", "A3 Görüntüle"],
  ["EN A3 preview", "Preview A3"],
  ["TR print-to-PDF help", "PDF olarak kaydet"],
]) {
  assert.ok(posterLibrary.includes(needle), `Missing ${name}`);
}
assert.ok(!posterLibrary.includes('"⬇ Download A4"'), "Poster previews must not be labeled as direct downloads");
assert.ok(!printToolbar.includes("resource_download|Poster|PDF"), "Print dialog cannot report a PDF download");
assert.ok(printToolbar.includes("poster_print_requested"), "Print intent should have a distinct event");
assert.ok(printToolbar.includes("waitForPosterAssets"), "Print should prepare fonts and images");
assert.ok(printToolbar.includes("naturalWidth > 0"), "Print must reject broken image assets");
assert.ok(printToolbar.includes("POSTER_ASSET_TIMEOUT_MS"), "Print asset loading needs a timeout");
assert.ok(printToolbar.includes("Promise.race"), "Font loading must be bounded");
assert.ok(printToolbar.includes("window.setTimeout(finish, remaining())"), "Image loading must be bounded");
assert.ok(printToolbar.includes('isTurkish ? "Standart" : "Standard"'), "Standard mode must not imply direct PDF download");
assert.ok(downloads.includes("displayedResources.map"), "Downloads listing should render a bounded initial set");
assert.ok(downloads.includes("setVisibleCount"), "Users must be able to reveal all filtered resources");
assert.ok(downloads.includes("filteredResources.length - visibleCount"), "Remaining result count should be shown");
assert.ok(downloads.includes("liveResources.flatMap"), "Downloads must retain a server-rendered full link directory");
assert.ok(downloads.includes("Resource link directory"), "Downloads link directory needs a semantic navigation label");
assert.ok(checklistPage.includes("inspections={summaries}"), "Checklist cards must receive summaries, not full documents");
assert.ok(checklistPage.includes("visibleInspections.map(item=><Link"), "All checklist detail URLs must remain in server-rendered index");
assert.ok(checklistPage.includes("section.items.length"), "Checklist item counts must retain original calculation");
assert.ok(checklistCards.includes("itemCount: number"), "Checklist card contract must contain itemCount");
assert.ok(!checklistCards.includes("inspection.document."), "Checklist cards must not depend on full document data");

for (const route of ["posters", "downloads", "toolbox", "checklists", "safety-signs", "labs"]) {
  const page = read(`app/[locale]/${route}/page.tsx`);
  assert.ok(page.includes("generateMetadata"), `Missing ${route} metadata`);
  assert.ok(page.includes("description"), `Missing ${route} description`);
}
for (const route of ["login", "register"]) {
  const page = read(`app/[locale]/${route}/page.tsx`);
  assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/, `${route} must be noindex`);
}

for (const route of ["labs/sim5", "labs/incident-simulator", "labs/daily-safety-brain", "tools/simops"]) {
  const page = read(`app/[locale]/${route}/page.tsx`);
  assert.ok(page.includes("generateMetadata"), `Missing ${route} metadata`);
  assert.ok(page.includes("openGraph"), `Missing ${route} OpenGraph metadata`);
  assert.ok(page.includes("x-default"), `Missing ${route} language alternates`);
}

const qrTargets = read("lib/posters-v2/qr-targets.json");
assert.ok(qrTargets.includes("https://www.sernem.com/tr/posters"));
assert.ok(qrTargets.includes("https://www.sernem.com/en/posters"));

console.log("Issue #127 source-level regression guard: PASS (NOT full E2E).");
