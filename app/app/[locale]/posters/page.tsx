import { notFound } from "next/navigation";
import PosterLibraryClient from "./PosterLibraryClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PostersPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  return <PosterLibraryClient locale={locale} />;
}
