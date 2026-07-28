import fs from "fs";

const input = fs.readFileSync(
  "app/[locale]/checklists/confined-space/checklistData.ts",
  "utf8",
);

console.log("✓ Source loaded");
console.log(`Size: ${input.split("\n").length} lines`);

if (!input.includes("export const checklistItems")) {
  throw new Error("checklistItems not found");
}

console.log("✓ Checklist data detected");
console.log("");
console.log("Next step: transformer will generate data/checklists/confined-space.ts");
