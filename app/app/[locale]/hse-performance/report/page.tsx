import HseDashboardPrintClient from "./HseDashboardPrintClient";

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
    <HseDashboardPrintClient
      locale={locale}
    />
  );
}
