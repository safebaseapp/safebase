import type { Metadata } from "next";
import { publicPosterPages } from "@/lib/seo/public-posters";

type Props = { children: React.ReactNode; params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale, slug } = await params;
  const poster = publicPosterPages.find(p => p.slug === slug);
  if (!poster || (locale !== "tr" && locale !== "en")) return {};
  const url = `https://www.sernem.com/${locale}/posters/${slug}`;
  return {
    title: poster.title[locale], description: poster.description[locale],
    alternates: { canonical: url, languages: {
      en: `https://www.sernem.com/en/posters/${slug}`,
      tr: `https://www.sernem.com/tr/posters/${slug}`,
      "x-default": `https://www.sernem.com/en/posters/${slug}`,
    } },
    openGraph: { title: poster.title[locale], description: poster.description[locale], url, type: "website" },
  };
}
export default function PosterPublicMetadataLayout({ children }: Props) { return children; }
