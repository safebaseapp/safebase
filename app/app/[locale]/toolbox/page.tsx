import type { Metadata } from "next";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { createClient } from "@/utils/supabase/server";
import ToolboxLibraryClient from "./ToolboxLibraryClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export type ToolboxContentControl = {
  slug: string;
  published: boolean;
  visible: boolean;
  accessLevel: "free" | "premium";
  featured: boolean;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: "tr" | "en" = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const title = isTurkish
    ? "70 Ücretsiz Toolbox Talk ve İSG PDF | SERNEM"
    : "70 Free Toolbox Talks & Safety PDFs | SERNEM";

  const description = isTurkish
    ? "Yüksekte çalışma, sıcak çalışma, iskele, LOTO, kaldırma operasyonları ve daha fazlası için 70 saha uyumlu Toolbox Talk içeriğini ücretsiz inceleyin ve PDF olarak indirin."
    : "Browse 70 field-ready Toolbox Talks covering working at height, hot work, scaffolding, LOTO, lifting operations and more. Preview and download practical safety PDFs.";

  const canonical = `https://www.sernem.com/${locale}/toolbox`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: "https://www.sernem.com/en/toolbox",
        tr: "https://www.sernem.com/tr/toolbox",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SERNEM",
      type: "website",
      locale: isTurkish ? "tr_TR" : "en_US",
    },
  };
}

export default async function ToolboxLibraryPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  const supabase = await createClient();

  const { data } = await supabase
    .from("content_controls")
    .select(
      "content_key,published,visible,access_level,featured"
    )
    .like("content_key", "toolbox:%");

  const controls: ToolboxContentControl[] = (data ?? [])
    .filter((row) =>
      typeof row.content_key === "string" &&
      row.content_key.startsWith("toolbox:")
    )
    .map((row) => ({
      slug: row.content_key.replace(/^toolbox:/, ""),
      published: row.published ?? true,
      visible: row.visible ?? true,
      accessLevel:
        row.access_level === "premium"
          ? "premium"
          : "free",
      featured: row.featured ?? false,
    }));

  return (
    <>
      <ActivityTracker eventName="toolbox_open" />

      <ToolboxLibraryClient
        locale={locale}
        controls={controls}
      />
    </>
  );
}
