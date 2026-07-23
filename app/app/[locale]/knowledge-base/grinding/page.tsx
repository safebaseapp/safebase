import GuideTemplate from "../components/GuideTemplate";
import { grindingGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function GrindingPage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate locale={locale} guide={grindingGuide} />;
}
