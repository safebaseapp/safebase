import FieldReportClient from "./FieldReportClient";

type Props = {
  params: Promise<{
    locale: "tr" | "en";
  }>;
};

export default async function Page({
  params,
}: Props) {
  const { locale } = await params;

  return (
    <FieldReportClient locale={locale} />
  );
}
