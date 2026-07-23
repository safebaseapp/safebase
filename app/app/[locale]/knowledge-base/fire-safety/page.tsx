import GuideTemplate from "../components/GuideTemplate";
import { fireSafetyGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function FireSafetyGuidePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate guide={fireSafetyGuide} locale={locale} />;
}
