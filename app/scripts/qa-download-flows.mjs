import { readFile } from "node:fs/promises";

const checks = [
  {
    file: "app/api/toolbox/[slug]/pdf/route.ts",
    mustContain: [
      "getCurrentAccessProfile()",
      'resource_download|',
      'mode: "standard"',
    ],
    mustNotContain: ["premiumMasterSlugSet.has(slug)"],
  },
  {
    file: "app/api/premium/toolbox/[slug]/route.ts",
    mustContain: [
      'premium-toolbox-pdf-v2',
      'resource_download|',
    ],
    mustNotContain: ['premium-toolbox-pdf";'],
  },
  {
    file: "app/api/premium/toolbox/[slug]/word/route.ts",
    mustContain: [
      'resource_download|',
      'mode: "premium_word"',
    ],
  },
  {
    file: "components/safety-signs/SignDownloadButtons.tsx",
    mustContain: [
      "requirePrintAuth",
      'resource_download|',
    ],
  },
  {
    file: "components/posters-v4/PosterFormatToolbar.tsx",
    mustContain: [
      "requirePrintAuth",
      'resource_download|',
    ],
  },
];

let failed = false;
for (const check of checks) {
  const text = await readFile(new URL(`../${check.file}`, import.meta.url), "utf8");
  for (const token of check.mustContain ?? []) {
    if (!text.includes(token)) {
      console.error(`FAIL ${check.file}: missing ${token}`);
      failed = true;
    }
  }
  for (const token of check.mustNotContain ?? []) {
    if (text.includes(token)) {
      console.error(`FAIL ${check.file}: forbidden ${token}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log("SERNEM download/auth QA: PASS");
