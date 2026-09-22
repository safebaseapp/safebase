"use client";

import { useEffect } from "react";

export default function ProtectedDownloadNavigationGuard() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a[download]") as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.origin);

      // Protected downloads may redirect to login. Let the browser navigate
      // normally so the redirect renders instead of being saved as login.htm.
      if (url.origin === window.location.origin) {
        event.preventDefault();
        window.location.assign(url.href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
