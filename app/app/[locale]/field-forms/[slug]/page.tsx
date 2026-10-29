import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fieldForms, getFieldForm } from "@/lib/content/fieldForms";
import FieldFormClient from "./FieldFormClient";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    fieldForms.map((form) => ({ locale, slug: form.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "tr" && locale !== "en") return {};
  const form = getFieldForm(slug);
  if (!form) return {};
  const url = "https://www.sernem.com/" + locale + "/field-forms/" + slug;
  return {
    title: form.title[locale] + " | Free Printable Template | SERNEM",
    description: form.description[locale],
    alternates: {
      canonical: url,
      languages: {
        en: "https://www.sernem.com/en/field-forms/" + slug,
        tr: "https://www.sernem.com/tr/field-forms/" + slug,
        "x-default": "https://www.sernem.com/en/field-forms/" + slug,
      },
    },
    openGraph: {
      title: form.title[locale],
      description: form.description[locale],
      siteName: "SERNEM",
      url,
      type: "article",
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function FieldFormPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "tr" && locale !== "en") notFound();
  const form = getFieldForm(slug);
  if (!form) notFound();
  return <FieldFormClient locale={locale} form={form} />;
}
