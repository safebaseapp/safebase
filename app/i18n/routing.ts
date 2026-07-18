import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],

  // Desteklenmeyen bütün tarayıcı dilleri İngilizceye düşer.
  defaultLocale: "en",

  // Hem Türkçe hem İngilizce URL'de açıkça görünecek:
  // /tr/tools
  // /en/tools
  localePrefix: "always",

  // Tarayıcı dilini otomatik algılar.
  localeDetection: true,
});
