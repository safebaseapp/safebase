import Link from "next/link";
import { toolboxData } from "@/lib/toolbox/toolbox-data";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import ToolboxLibraryClient from "./ToolboxLibraryClient";

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
  const canonical = `https://www.sernem.com/${locale}/toolbox`;

  return {
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sernem.com/tr/toolbox",
        en: "https://www.sernem.com/en/toolbox",
        "x-default": "https://www.sernem.com/en/toolbox",
      },
    },
  };
}

export type ToolboxContentControl = {
  slug: string;
  published: boolean;
  visible: boolean;
  accessLevel: "free" | "premium";
  featured: boolean;
};

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
      <nav aria-label={locale === "tr" ? "Toolbox konu dizini" : "Toolbox topic directory"} className="mx-auto max-w-6xl px-5 pb-12">
        <details className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900">
          <summary className="cursor-pointer font-semibold">{locale === "tr" ? "Tüm Toolbox konuları" : "Browse all Toolbox topics"}</summary>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {toolboxData.filter(item => !controls.some(c => c.slug === item.slug && (!c.published || !c.visible))).map(item => (
              <Link key={item.slug} href={`/${locale}/toolbox/${item.slug}`} className="rounded-lg px-2 py-1 text-sm text-blue-700 hover:underline">{String(item[locale].title ?? item.slug)}</Link>
            ))}
          </div>
        </details>
      </nav>
    </>
  );
}
