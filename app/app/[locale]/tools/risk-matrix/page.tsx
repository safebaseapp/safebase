import RiskMatrix from "../../../components/RiskMatrix";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function RiskMatrixPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  return <RiskMatrix locale={locale} />;
}
