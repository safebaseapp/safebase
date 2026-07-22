import GuideTemplate from "../components/GuideTemplate";
import { hotWorkGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HotWorkPage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate locale={locale} guide={hotWorkGuide} />;
}
