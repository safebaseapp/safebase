"use client";

import { useEffect, useState } from "react";
import type { PosterDefinition } from "@/lib/posters-v2/types";
import PosterMasterV4 from "./PosterMasterV4";

type Props = {
  locale: "tr" | "en";
  poster: PosterDefinition;
  qrPath: string;
  showBranding: boolean;
};


export default function PosterBrandingCanvas({
  locale,
  poster,
  qrPath,
  showBranding,
}: Props) {
  const [companyLogoUrl, setCompanyLogoUrl] = useState<string | null>(null);
  const [isBrandingReady, setIsBrandingReady] = useState(!showBranding);

  useEffect(() => {
    let active = true;

    async function loadBranding() {
      if (!showBranding) {
        setCompanyLogoUrl(null);
        setIsBrandingReady(true);
        return;
      }

      setCompanyLogoUrl(null);
      setIsBrandingReady(false);

      try {
        const response = await fetch("/api/account/branding", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (active) setCompanyLogoUrl(typeof data.logoUrl === "string" ? data.logoUrl : null);
      } catch (error) {
        console.error("Poster company branding could not be loaded:", error);
        if (active) setCompanyLogoUrl(null);
      } finally {
        if (active) setIsBrandingReady(true);
      }
    }

    void loadBranding();

    return () => {
      active = false;
    };
  }, [showBranding]);

  return (
    <div
      data-poster-branding-mode={showBranding ? "branded" : "standard"}
      data-poster-branding-ready={isBrandingReady ? "true" : "false"}
      data-poster-company-logo={companyLogoUrl ? "true" : "false"}
    >
      <PosterMasterV4
        locale={locale}
        poster={poster}
        qrPath={qrPath}
        companyLogoUrl={showBranding ? companyLogoUrl : null}
      />
    </div>
  );
}
