import ToolboxLibraryClient from "./ToolboxLibraryClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ToolboxLibraryPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: "tr" | "en" = rawLocale === "tr" ? "tr" : "en";

  return <ToolboxLibraryClient locale={locale} />;
}
