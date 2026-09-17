import { notFound } from "next/navigation";
import SafetySignsClient from "./SafetySignsClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function SafetySignsPage({
  params,
}: Props) {
  const { locale } = await params;

  if (locale !== "tr" && locale !== "en") {
    notFound();
  }

  return <SafetySignsClient locale={locale} />;
}
