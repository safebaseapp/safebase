const EN_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bSimops\b/g, "SIMOPS"],
  [/\bsimops\b/g, "SIMOPS"],
  [/\bpermit to work\b/gi, "Permit to Work (PTW)"],
  [/\bwork permit\b/gi, "PTW"],
  [/\bhot work permit\b/gi, "Hot Work Permit"],
  [/\bline opening\b/gi, "line breaking"],
  [/\bline break\b/gi, "line breaking"],
  [/\bgas measurement\b/gi, "gas testing"],
  [/\bgas reading device\b/gi, "gas detector"],
  [/\bfire observer\b/gi, "fire watch"],
  [/\bconfined area\b/gi, "confined space"],
  [/\bheight work\b/gi, "work at height"],
  [/\blifting work\b/gi, "lifting operation"],
  [/\bmobile machinery\b/gi, "mobile equipment"],
  [/\bzero energy control\b/gi, "zero-energy verification"],
  [/\bisolation limit\b/gi, "isolation boundary"],
  [/\benergy cutting\b/gi, "energy isolation"],
  [/\bsecure area\b/gi, "exclusion zone"],
  [/\bforbidden area\b/gi, "exclusion zone"],
  [/\bwatchman\b/gi, "attendant"],
  [/\brescue readiness\b/gi, "rescue preparedness"],
];

export function normalizeHseEnglish(text: string | null | undefined): string {
  if (!text) return "";
  return EN_REPLACEMENTS.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text)
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function localizeHseText(locale: string, tr: string | null | undefined, en: string | null | undefined): string {
  return locale === "tr" ? (tr ?? "") : normalizeHseEnglish(en ?? "");
}
