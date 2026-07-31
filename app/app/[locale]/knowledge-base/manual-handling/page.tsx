import GuideTemplate from "../components/GuideTemplate";
import { manualHandlingGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ManualHandlingGuidePage({ params }: Props) {
  const { locale } = await params;

  return (
    <GuideTemplate
      guide={manualHandlingGuide}
      locale={locale === "tr" ? "tr" : "en"}
    />
  );
}
