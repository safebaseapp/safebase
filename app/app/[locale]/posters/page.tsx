import ActivityTracker from "@/components/analytics/ActivityTracker";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PosterLibraryClient from "./PosterLibraryClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const canonical = `https://www.sernem.com/${locale}/posters`;

  return {
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/posters",
        en: "https://www.sernem.com/en/posters",
        "x-default": "https://www.sernem.com/en/posters",
      },
    },
  };
}

export type PosterContentControl = {
  slug: string;
  published: boolean;
  visible: boolean;
  accessLevel: "free" | "premium";
  featured: boolean;
};

const posterCmsKeyToSlug: Record<string, string> = {
  "working-at-height": "working-at-height-rules",
  "scaffold": "scaffold-safety-rules",
  "hot-work": "hot-work-safety-rules",
  "confined-space": "confined-space-entry-rules",
  "electrical": "electrical-safety-rules",
  "loto": "loto-golden-rules",
  "fire": "fire-safety-rules",
  "ppe": "mandatory-ppe",
  "ladder-safety": "ladder-safety-rules",
  "housekeeping-safety": "housekeeping-safety-rules",
  "excavation-safety": "excavation-safety-rules",
  "chemical-safety": "chemical-safety-rules",
  "forklift-safety": "forklift-safety-rules",
  "manual-handling-safety": "manual-handling-safety-rules",
  "dropped-objects-safety": "dropped-objects-safety-rules",
};

function resolvePosterSlug(contentKey: string) {
  const cmsKey = contentKey.replace(/^poster:/, "");
  return posterCmsKeyToSlug[cmsKey] ?? cmsKey;
}

export default async function PosterLibraryPage({
  params,
}: Props) {
  const { locale } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("content_controls")
    .select(
      "content_key,published,visible,access_level,featured"
    )
    .like("content_key", "poster:%");

  const controls: PosterContentControl[] = (data ?? [])
    .filter(
      (row) =>
        typeof row.content_key === "string" &&
        row.content_key.startsWith("poster:")
    )
    .map((row) => ({
      slug: resolvePosterSlug(row.content_key),
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
      <ActivityTracker eventName="posters_open" />
    <PosterLibraryClient
      locale={locale}
      controls={controls}
    />
    </>
  );
}
