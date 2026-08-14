import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ToolboxActions from "./ToolboxActions";
import {
  getToolboxBySlug,
  toolboxData,
  type ToolboxLocalizedContent,
} from "@/lib/toolbox/toolbox-data";
import { getContentAccess } from "@/lib/content/get-content-access";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type SectionProps = {
  title?: string;
  value?: unknown;
  accent?: "blue" | "amber" | "rose" | "emerald";
};

function normalizeItems(value: unknown): string[] {
  if (typeof value === "string") {
    return value.trim() ? [value.trim()] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === "string") {
        return item.trim() ? [item.trim()] : [];
      }

      if (item && typeof item === "object") {
        return Object.values(item)
          .filter((entry): entry is string => typeof entry === "string")
          .map((entry) => entry.trim())
          .filter(Boolean);
      }

      return [];
    });
  }

  if (value && typeof value === "object") {
    return Object.values(value)
      .filter((entry): entry is string => typeof entry === "string")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
}

function ContentSection({
  title,
  value,
  accent = "blue",
}: SectionProps) {
  const items = normalizeItems(value);

  if (!title || items.length === 0) {
    return null;
  }

  const accentStyles = {
    blue: {
      dot: "bg-blue-500",
      icon: "text-blue-600",
      border: "border-blue-100",
    },
    amber: {
      dot: "bg-amber-500",
      icon: "text-amber-600",
      border: "border-amber-100",
    },
    rose: {
      dot: "bg-rose-500",
      icon: "text-rose-600",
      border: "border-rose-100",
    },
    emerald: {
      dot: "bg-emerald-500",
      icon: "text-emerald-600",
      border: "border-emerald-100",
    },
  }[accent];

  return (
    <section
      className={`rounded-[26px] border ${accentStyles.border} bg-white p-6 shadow-sm sm:p-8`}
    >
      <div className="flex items-center gap-3">
        <span className={`h-3 w-3 rounded-full ${accentStyles.dot}`} />
        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item, index) => (
          <div
            key={`${title}-${index}`}
            className="flex items-start gap-4 text-base leading-8 text-slate-700"
          >
            <span
              className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-black ${accentStyles.icon}`}
            >
              ✓
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function getLocalizedContent(
  toolbox: NonNullable<ReturnType<typeof getToolboxBySlug>>,
  locale: "tr" | "en",
): ToolboxLocalizedContent {
  return locale === "tr" ? toolbox.tr : toolbox.en;
}

export function generateStaticParams() {
  return toolboxData.flatMap((toolbox) => [
    {
      locale: "tr",
      slug: toolbox.slug,
    },
    {
      locale: "en",
      slug: toolbox.slug,
    },
  ]);
}

export default async function ToolboxDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale: "tr" | "en" = rawLocale === "tr" ? "tr" : "en";

  const toolbox = getToolboxBySlug(slug);

  if (!toolbox) {
    notFound();
  }
  const access = await getContentAccess(`toolbox:${slug}`);

  if (!access.published || !access.visible) {
    notFound();
  }

  if (
    access.accessLevel === "premium" &&
    !access.canAccess
  ) {
    if (!access.isAuthenticated) {
      redirect(
        `/${locale}/login?next=/${locale}/toolbox/${slug}`
      );
    }

    if (access.isSuspended) {
      redirect(`/${locale}/dashboard`);
    }

    redirect(
      `/${locale}/upgrade?next=/${locale}/toolbox/${slug}`
    );
  }




  const content = getLocalizedContent(toolbox, locale);
  const isTurkish = locale === "tr";

  const currentIndex = toolboxData.findIndex(
    (item) => item.slug === toolbox.slug,
  );

  const previous =
    currentIndex > 0 ? toolboxData[currentIndex - 1] : null;

  const next =
    currentIndex < toolboxData.length - 1
      ? toolboxData[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href={`/${locale}/toolbox`}
            className="inline-flex items-center gap-2 text-sm font-black text-blue-300 transition hover:text-white"
          >
            ← {isTurkish ? "Toolbox Kütüphanesi" : "Toolbox Library"}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-300">
              SERNEM Toolbox
            </span>

            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
              ● {isTurkish ? "Hazır" : "Ready"}
            </span>

            {content.duration && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-slate-300">
                {content.duration}
              </span>
            )}
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl">
            {content.title ?? toolbox.slug}
          </h1>

          {content.subtitle && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {content.subtitle}
            </p>
          )}

          {content.application_subtitle && (
            <p className="mt-4 max-w-3xl text-sm font-bold leading-7 text-blue-300">
              {content.application_subtitle}
            </p>
          )}

          <div className="mt-8">
            <ToolboxActions
              printLabel={isTurkish ? "Yazdır / PDF" : "Print / PDF"}
              libraryLabel={
                isTurkish
                  ? "Toolbox Kütüphanesine Dön"
                  : "Back to Toolbox Library"
              }
              libraryHref={`/${locale}/toolbox`}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 print:px-0 print:py-0">
        <div className="mx-auto grid max-w-5xl gap-6 print:max-w-none print:gap-4">
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 print:rounded-none print:border-slate-300 print:shadow-none">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Toolbox Konusu" : "Toolbox Topic"}
                </p>
                <p className="mt-2 font-black text-slate-950">
                  {content.title ?? toolbox.slug}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Süre" : "Duration"}
                </p>
                <p className="mt-2 font-black text-slate-950">
                  {content.duration ?? "—"}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Tarih" : "Date"}
                </p>
                <div className="mt-3 h-7 border-b border-dashed border-slate-400" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Saha / Bölge" : "Site / Area"}
                </p>
                <div className="mt-3 h-7 border-b border-dashed border-slate-400" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Supervisor" : "Supervisor"}
                </p>
                <div className="mt-3 h-7 border-b border-dashed border-slate-400" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Firma" : "Company"}
                </p>
                <div className="mt-3 h-7 border-b border-dashed border-slate-400" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Katılımcı Sayısı" : "Participants"}
                </p>
                <div className="mt-3 h-7 border-b border-dashed border-slate-400" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Doküman No" : "Document No"}
                </p>
                <div className="mt-3 h-7 border-b border-dashed border-slate-400" />
              </div>
            </div>
          </section>
          <ContentSection
            title={content.objective_title}
            value={content.objective}
            accent="blue"
          />

          <ContentSection
            title={content.explanation_title}
            value={content.explanation}
            accent="blue"
          />

          <ContentSection
            title={content.scenario_title}
            value={content.scenario}
            accent="amber"
          />

          <ContentSection
            title={content.remember_title}
            value={content.remember}
            accent="rose"
          />

          <ContentSection
            title={content.hazards_title}
            value={content.hazards}
            accent="rose"
          />

          <ContentSection
            title={content.controls_title}
            value={content.controls}
            accent="emerald"
          />

          <ContentSection
            title={content.supervisor_title}
            value={content.supervisor_script}
            accent="blue"
          />

          <ContentSection
            title={content.questions_title}
            value={content.questions}
            accent="amber"
          />

          <ContentSection
            title={content.verification_title}
            value={content.verification}
            accent="emerald"
          />

          <ContentSection
            title={content.attendance_title}
            value={content.fields}
            accent="blue"
          />

          <section className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 print:break-before-page print:rounded-none print:shadow-none">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                {isTurkish ? "Katılım ve İmza Tablosu" : "Attendance and Signature"}
              </h2>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-300">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="border-b border-r border-slate-300 px-4 py-3 font-black">
                      #
                    </th>
                    <th className="border-b border-r border-slate-300 px-4 py-3 font-black">
                      {isTurkish ? "Ad Soyad" : "Name"}
                    </th>
                    <th className="border-b border-r border-slate-300 px-4 py-3 font-black">
                      {isTurkish ? "Görev" : "Position"}
                    </th>
                    <th className="border-b border-slate-300 px-4 py-3 font-black">
                      {isTurkish ? "İmza" : "Signature"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <tr key={index}>
                      <td className="h-12 border-b border-r border-slate-300 px-4 text-slate-500">
                        {index + 1}
                      </td>
                      <td className="border-b border-r border-slate-300 px-4" />
                      <td className="border-b border-r border-slate-300 px-4" />
                      <td className="border-b border-slate-300 px-4" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Supervisor İmza" : "Supervisor Signature"}
                </p>
                <div className="mt-8 border-b border-slate-400" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "HSE Onayı" : "HSE Approval"}
                </p>
                <div className="mt-8 border-b border-slate-400" />
              </div>
            </div>
          </section>

          {normalizeItems(content.footer).length > 0 && (
            <div className="rounded-[26px] border border-slate-200 bg-slate-950 p-7 text-sm leading-7 text-slate-300 print:rounded-none print:border-slate-400 print:bg-white print:text-slate-700">
              {normalizeItems(content.footer).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 print:hidden">
            {previous ? (
              <Link
                href={`/${locale}/toolbox/${previous.slug}`}
                className="group rounded-[24px] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  ← {isTurkish ? "Önceki Toolbox" : "Previous Toolbox"}
                </p>
                <p className="mt-3 text-lg font-black text-slate-950 group-hover:text-blue-600">
                  {locale === "tr"
                    ? previous.tr.title
                    : previous.en.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                href={`/${locale}/toolbox/${next.slug}`}
                className="group rounded-[24px] border border-slate-200 bg-white p-6 text-right transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {isTurkish ? "Sonraki Toolbox" : "Next Toolbox"} →
                </p>
                <p className="mt-3 text-lg font-black text-slate-950 group-hover:text-blue-600">
                  {locale === "tr" ? next.tr.title : next.en.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
