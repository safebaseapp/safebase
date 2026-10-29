/** Explicit existing asset registry. Unknown symbols must never become a different sign. */
export const legacyIsoFiles: Readonly<Record<string, string>> = {
  helmet: "M014", glasses: "M004", gloves: "M009", footwear: "M008", hearing: "M003",
  "no-smoking": "P002", "no-entry": "P004", "no-flame": "P003",
  "high-voltage": "W012", forklift: "W014", "falling-objects": "W035", slippery: "W011",
  "first-aid": "E003", "emergency-exit": "E001", "assembly-point": "E007",
  "fire-extinguisher": "F001",
};
const publishedCodes = new Set([
  ...Object.values(legacyIsoFiles), "M001", "M002", "M010", "M011", "M012", "M013",
  "M015", "M017", "M018", "P005", "P006", "P010", "P013", "W001", "W015",
  "W016", "W017", "W021", "W023", "W024",
]);
export function resolveIsoCode(icon: string): string | null {
  const code = legacyIsoFiles[icon] ?? icon.trim().toUpperCase();
  return publishedCodes.has(code) ? code : null;
}
