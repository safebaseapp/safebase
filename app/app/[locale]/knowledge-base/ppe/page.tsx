import GuideTemplate from "../components/GuideTemplate";
import { ppeGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PpePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate locale={locale} guide={ppeGuide} />;
}
