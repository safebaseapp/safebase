import GuideTemplate from "../components/GuideTemplate";
import { workingAtHeightGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WorkingAtHeightPage({ params }: Props) {
  const { locale } = await params;

  return <GuideTemplate locale={locale} guide={workingAtHeightGuide} />;
}
