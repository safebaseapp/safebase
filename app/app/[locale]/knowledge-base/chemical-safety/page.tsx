import GuideTemplate from "../components/GuideTemplate";
import { chemicalSafetyGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ChemicalSafetyGuidePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate guide={chemicalSafetyGuide} locale={locale} />;
}
