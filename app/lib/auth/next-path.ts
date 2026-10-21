/** Localized destinations and existing authenticated export endpoints only. */
export function safeNextPath(value: string | null, locale: "tr" | "en") {
  const fallback = `/${locale}/dashboard`;
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u001f]/.test(value)) return fallback;
  const url = new URL(value, "https://local.invalid");
  const exportPath = /^\/api\/(?:toolbox\/[^/]+\/pdf|premium\/(?:toolbox|posters)\/[^/]+(?:\/word)?)$/;
  if (url.origin !== "https://local.invalid" || !(url.pathname.startsWith(`/${locale}/`) || exportPath.test(url.pathname))) return fallback;
  return url.pathname + url.search + url.hash;
}
