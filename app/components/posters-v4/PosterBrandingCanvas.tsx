"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { isAdminUser } from "@/lib/auth/access";
import type { PosterDefinition } from "@/lib/posters-v2/types";
import PosterMasterV4 from "./PosterMasterV4";

type Props = {
  locale: "tr" | "en";
  poster: PosterDefinition;
  qrPath: string;
  showBranding: boolean;
};

const BUCKET_NAME = "company-assets";

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
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan, role, status")
          .eq("id", user.id)
          .maybeSingle();

        const isPremium = Boolean(
          isAdminUser(user) ||
            (profile?.status !== "suspended" &&
              (profile?.plan === "premium" || profile?.role === "admin")),
        );

        if (!isPremium) return;

        const { data: files, error: listError } = await supabase.storage
          .from(BUCKET_NAME)
          .list(user.id, {
            limit: 20,
            search: "logo.",
          });

        if (listError) throw listError;

        const logoFile = files?.find((file) => file.name.startsWith("logo."));
        if (!logoFile) return;

        const { data: signedData, error: signedError } = await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(`${user.id}/${logoFile.name}`, 60 * 60);

        if (signedError) throw signedError;

        if (active) {
          setCompanyLogoUrl(signedData.signedUrl);
        }
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
