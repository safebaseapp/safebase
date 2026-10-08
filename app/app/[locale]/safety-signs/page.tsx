import { notFound } from "next/navigation";
import SafetySignsClient from "./SafetySignsClient";
import { getSafetySignAccess } from "@/lib/safety-signs/access";

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

  const { isPremium } = await getSafetySignAccess();

  return (
    <SafetySignsClient
      locale={locale}
      branded={!isPremium}
    />
  );
}
