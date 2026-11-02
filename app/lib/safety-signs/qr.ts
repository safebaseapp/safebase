import type { SignLocale } from "./types";
export const signDetailUrl = (slug: string, locale: SignLocale) =>
  `https://www.sernem.com/${locale}/safety-signs/${slug}`;
export const signQrAsset = (slug: string, locale: SignLocale) =>
  `/safety-signs/qr/${locale}/${slug}.png`;
