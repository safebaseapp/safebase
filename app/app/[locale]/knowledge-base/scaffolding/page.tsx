import GuideTemplate from "../components/GuideTemplate";
import { scaffoldingGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ScaffoldingGuidePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate guide={scaffoldingGuide} locale={locale} />;
}
