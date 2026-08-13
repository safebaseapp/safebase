import SimopsPlanner from "../../../components/SimopsPlanner";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function SimopsPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  return <SimopsPlanner locale={locale} />;
}
