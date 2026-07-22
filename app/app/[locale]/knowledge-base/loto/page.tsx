import GuideTemplate from "../components/GuideTemplate";
import { lotoGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LotoPage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate locale={locale} guide={lotoGuide} />;
}
