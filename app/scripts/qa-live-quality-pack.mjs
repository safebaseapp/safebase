// SERNEM Issue #127: narrow source-level regression guard.
// This is NOT a substitute for Chromium, auth, billing or print-driver E2E.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const posterLibrary = read("app/[locale]/posters/PosterLibraryClient.tsx");
const printToolbar = read("components/posters-v4/PosterFormatToolbar.tsx");
const downloads = read("app/[locale]/downloads/DownloadsClient.tsx");

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
assert.ok(downloads.includes("displayedResources.map"), "Downloads listing should render a bounded initial set");
assert.ok(downloads.includes("setVisibleCount"), "Users must be able to reveal all filtered resources");
assert.ok(downloads.includes("filteredResources.length - visibleCount"), "Remaining result count should be shown");

for (const route of ["posters", "downloads", "toolbox", "checklists", "safety-signs", "labs"]) {
  const page = read(`app/[locale]/${route}/page.tsx`);
  assert.ok(page.includes("generateMetadata"), `Missing ${route} metadata`);
  assert.ok(page.includes("description"), `Missing ${route} description`);
}
for (const route of ["login", "register"]) {
  const page = read(`app/[locale]/${route}/page.tsx`);
  assert.match(page, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/, `${route} must be noindex`);
}

const qrTargets = read("lib/posters-v2/qr-targets.json");
assert.ok(qrTargets.includes("https://www.sernem.com/tr/posters"));
assert.ok(qrTargets.includes("https://www.sernem.com/en/posters"));

console.log("Issue #127 source-level regression guard: PASS (NOT full E2E).");
