import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import { createClient } from "@/utils/supabase/server";
import { inspectionCatalog } from "../../../data/checklists/registry";
import InspectionLibraryClient from "./InspectionLibraryClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedChecklistsPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: contentControlRows } = await supabase
    .from("content_controls")
    .select("content_key,published,visible,access_level,featured")
    .like("content_key", "checklist:%");

  const controls: Record<string, { accessLevel: "free" | "premium"; featured: boolean }> = Object.fromEntries(
    inspectionCatalog.map((inspection) => [inspection.slug, {
      accessLevel: "free" as const,
      featured: false,
    }]),
  );
  const hiddenSlugs = new Set<string>();

  for (const row of contentControlRows ?? []) {
    if (typeof row.content_key !== "string" || !row.content_key.startsWith("checklist:")) continue;
    const slug = row.content_key.replace(/^checklist:/, "");
    if (row.published === false || row.visible === false) hiddenSlugs.add(slug);
    if (controls[slug]) {
      controls[slug] = {
        accessLevel: row.access_level === "premium" ? "premium" : "free",
        featured: row.featured ?? false,
      };
    }
  }

  const visibleInspections = inspectionCatalog.filter((inspection) => !hiddenSlugs.has(inspection.slug));

  return (
    <>
      <InspectionLibraryClient locale={locale === "tr" ? "tr" : "en"} inspections={visibleInspections} controls={controls} />
      <nav aria-label={locale === "tr" ? "Denetim listeleri dizini" : "Inspection checklist directory"} className="mx-auto max-w-6xl px-5 pb-12">
        <details className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-900">
          <summary className="cursor-pointer font-semibold">{locale === "tr" ? "Tüm denetim listeleri" : "Browse all inspection checklists"}</summary>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{visibleInspections.map(item=><Link key={item.slug} href={`/${locale}/checklists/${item.slug}`} className="rounded-lg px-2 py-1 text-sm text-blue-700 hover:underline">{item.title[locale === "tr" ? "tr" : "en"]}</Link>)}</div>
        </details>
      </nav>
    </>
  );
}
