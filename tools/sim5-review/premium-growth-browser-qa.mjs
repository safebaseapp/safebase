/**
 * Read-only desktop/mobile smoke of Premium conversion on a specific Vercel Preview.
 * Does not sign in, submit forms, create subscriptions or touch user data.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = (process.env.SERNEM_GROWTH_QA_BASE_URL || "").replace(/\/+$/, "");
assert.match(root, /^https:\/\/[-a-z0-9.]+\.vercel\.app$/i, "Only an explicit Vercel preview is allowed");
const artifacts = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "artifacts/premium-growth");
fs.mkdirSync(artifacts, { recursive: true });

const checks = [
  { name: "home", route: "/en", h1: /Serious operations|Stronger safety/i, link: "/en/upgrade" },
  { name: "upgrade-en", route: "/en/upgrade", h1: /Less preparation/i, link: "/en/register?next=%2Fen%2Fupgrade" },
  { name: "upgrade-tr", route: "/tr/upgrade", h1: /Daha az hazırlık/i, link: "/tr/register?next=%2Ftr%2Fupgrade" },
  { name: "register-tr", route: "/tr/register?next=%2Ftr%2Fupgrade", h1: /Hesabını oluştur/i },
  { name: "tools", route: "/en/tools", h1: /HSE Tools/i, link: "/en/upgrade" },
  { name: "toolbox", route: "/en/toolbox/excavation-safety", h1: /Excavation/i, link: "/en/upgrade" },
  { name: "ppe-expanded", route: "/tr/ppe-standards/en-iso-16321-1-occupational-eye-face-protection", h1: /İşyerinde göz ve yüz koruması/i, link: "/tr/upgrade" },
  { name: "ppe-classic", route: "/tr/ppe-standards/en-175-welding-eye-face-protection", h1: /EN 175/i, link: "/tr/upgrade" },
];
const layouts = [
  { name: "desktop", viewport: { width: 1366, height: 900 }, mobile: false },
  { name: "mobile390", viewport: { width: 390, height: 844 }, mobile: true },
];
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const results = [];
try {
  for (const layout of layouts) {
    const context = await browser.newContext({
      viewport: layout.viewport, isMobile: layout.mobile, hasTouch: layout.mobile, reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    for (const test of checks) {
      const response = await page.goto(root + test.route, { waitUntil: "domcontentloaded", timeout: 45000 });
      const status = response?.status();
      assert.equal(status, 200, layout.name + " " + test.name + ": HTTP " + status);
      const h1 = page.locator("h1").first();
      await h1.waitFor({ state: "visible", timeout: 20000 });
      const title = (await h1.innerText()).replace(/\s+/g, " ");
      assert.match(title, test.h1, layout.name + " " + test.name + ": H1 mismatch");
      if (test.link) {
        assert.ok(await page.locator('a[href="' + test.link + '"]').count(), layout.name + " " + test.name + ": missing link");
      }
      const geometry = await page.evaluate(() => {
        const width = window.innerWidth;
        const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
        return { width, scrollWidth, overflowPx: Math.max(0, scrollWidth - width) };
      });
      results.push({ layout: layout.name, route: test.name, status, heading: title.slice(0, 60), ...geometry });
      console.log("SERNEM_GROWTH_QA", JSON.stringify(results.at(-1)));
      assert.ok(geometry.overflowPx <= 12, layout.name + " " + test.name + ": horizontal overflow " + geometry.overflowPx + "px");
      if (test.name === "register-tr") {
        assert.equal(await page.locator("input[type=email]").count(), 1);
        assert.equal(await page.locator("input[type=password]").count(), 1);
      }
      if (test.name === "upgrade-tr" || test.name === "upgrade-en") {
        assert.ok((await page.locator("main").innerText()).includes("€9.99"));
        await page.locator('a[href="' + test.link + '"]').first().click();
        await page.waitForURL(/\/(?:en|tr)\/register\?next=/, { timeout: 20000 });
        assert.equal(new URL(page.url()).searchParams.get("next"), test.name === "upgrade-tr" ? "/tr/upgrade" : "/en/upgrade");
      }
      if (["toolbox", "ppe-expanded", "ppe-classic"].includes(test.name)) {
        const nextStep = page.locator('aside a[href$="/upgrade"]').last();
        assert.ok(await nextStep.count(), test.name + ": premium CTA missing");
        await page.emulateMedia({ media: "print" });
        assert.equal(await nextStep.isVisible(), false, test.name + ": premium CTA leaks into print");
        await page.emulateMedia({ media: "screen" });
      }
      if (layout.mobile && ["upgrade-tr", "register-tr", "toolbox", "ppe-expanded"].includes(test.name)) {
        const file = path.join(artifacts, layout.name + "-" + test.name + ".png");
        await page.screenshot({ path: file, fullPage: false });
        console.log("SERNEM_GROWTH_SCREENSHOT", file);
      }
    }
    assert.deepEqual(errors, [], layout.name + ": uncaught page errors");
    await context.close();
  }
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(artifacts, "results.json"), JSON.stringify(results, null, 2));
console.log("SERNEM_GROWTH_PASS", results.length, "read-only responsive checks");
