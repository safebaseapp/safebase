import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const targetPath = path.join(
  appRoot,
  "app",
  "[locale]",
  "tools",
  "method-statement",
  "page.tsx",
);

const source = await readFile(targetPath, "utf8");

const fixedMarker = "  const { locale } = use(params);";
const legacyState = '  const [locale, setLocale] = useState("en");';
const legacyEffect = `  useEffect(() => {
    params.then(({ locale: currentLocale }) => {
      setLocale(currentLocale);
    });
  }, [params]);

`;

if (source.includes(fixedMarker) && !source.includes(legacyState)) {
  console.log("Method Statement locale guard: already fixed.");
  process.exit(0);
}

if (!source.includes(legacyState) || !source.includes(legacyEffect)) {
  throw new Error(
    "Method Statement locale guard refused to modify an unexpected source shape.",
  );
}

let nextSource = source;

if (nextSource.includes('import { useEffect, useState } from "react";')) {
  nextSource = nextSource.replace(
    'import { useEffect, useState } from "react";',
    'import { useEffect, useState, use } from "react";',
  );
} else if (
  !nextSource.includes('import { useEffect, useState, use } from "react";') &&
  !nextSource.includes('import { useState, use } from "react";')
) {
  throw new Error(
    "Method Statement locale guard could not locate the expected React import.",
  );
}

nextSource = nextSource.replace(legacyState, fixedMarker);
nextSource = nextSource.replace(legacyEffect, "");

await writeFile(targetPath, nextSource, "utf8");
console.log("Method Statement locale guard: applied use(params) locale fix.");
