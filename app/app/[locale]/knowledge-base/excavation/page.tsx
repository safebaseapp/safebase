import GuideTemplate from "../components/GuideTemplate";
import { excavationGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ExcavationGuidePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate guide={excavationGuide} locale={locale} />;
}
