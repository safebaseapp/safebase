import GuideTemplate from "../components/GuideTemplate";
import { permitToWorkGuide } from "../data/guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PermitToWorkGuidePage({
  params,
}: Props) {
  const { locale } = await params;

  return (
    <GuideTemplate
      guide={permitToWorkGuide}
      locale={locale}
    />
  );
}
