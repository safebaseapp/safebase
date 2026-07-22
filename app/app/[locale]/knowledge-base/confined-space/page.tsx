import GuideTemplate from "../components/GuideTemplate";
import { confinedSpaceGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ConfinedSpacePage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate locale={locale} guide={confinedSpaceGuide} />;
}
