import GuideTemplate from "../components/GuideTemplate";
import { electricalSafetyGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ElectricalSafetyGuidePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate guide={electricalSafetyGuide} locale={locale} />;
}
