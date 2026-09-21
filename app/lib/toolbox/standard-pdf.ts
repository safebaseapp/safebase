import { premiumMasterSlugSet } from "./premium-master-slugs";

type Locale = "tr" | "en";

export function getToolboxStandardPdfHref(
  slug: string,
  locale: Locale,
): string {
  if (premiumMasterSlugSet.has(slug)) {
    return `/downloads/${slug}-toolbox-talk-${locale}.pdf`;
  }

  return `/api/toolbox/${slug}/pdf?locale=${locale}`;
}