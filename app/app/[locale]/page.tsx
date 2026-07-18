import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {hasLocale} from "next-intl";
import {notFound} from "next/navigation";
import {routing} from "../../i18n/routing";
import LocalizedCategories from "./components/LocalizedCategories";
import LocalizedFeaturedTools from "./components/LocalizedFeaturedTools";
import LocalizedFooter from "./components/LocalizedFooter";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function LocalizedHomePage({params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const safeLocale = locale as "tr" | "en";

  const t = await getTranslations({
    locale,
    namespace: "HomePage",
  });

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="flex min-h-[calc(100vh-96px)] items-center justify-center px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
            {t("title")}
          </h1>

          <p className="mt-7 text-xl text-slate-700 sm:text-2xl">
            {t("subtitle")}
          </p>

          <p className="mt-4 text-lg leading-8 text-slate-500">
            {t("description")}
          </p>

          <Link
            href={`/${locale}/tools`}
            className="mt-10 inline-flex rounded-xl bg-slate-950 px-8 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
          >
            {t("exploreTools")}
          </Link>
        </div>
      </section>

      <LocalizedCategories locale={safeLocale} />
      <LocalizedFeaturedTools locale={safeLocale} />
      <LocalizedFooter locale={safeLocale} />
    </main>
  );
}
