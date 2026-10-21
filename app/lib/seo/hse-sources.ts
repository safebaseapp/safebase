/** Official US reference routes, not a claim of live availability or local applicability. */
export function officialOshaReference(reference: string): string | null {
  const provision = /^OSHA (1910|1926)\.(\d{3,4})$/.exec(reference);
  const subpart = /^OSHA (1910|1926) Subpart ([A-Z]{1,2})$/.exec(reference);
  if (provision) return `https://www.osha.gov/laws-regs/regulations/standardnumber/${provision[1]}/${provision[1]}.${provision[2]}`;
  if (subpart) return `https://www.osha.gov/laws-regs/regulations/standardnumber/${subpart[1]}/${subpart[1]}Subpart${subpart[2]}`;
  return null;
}
