import GuideTemplate from "../components/GuideTemplate";
import { craneSafetyGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CraneSafetyGuidePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate guide={craneSafetyGuide} locale={locale} />;
}
