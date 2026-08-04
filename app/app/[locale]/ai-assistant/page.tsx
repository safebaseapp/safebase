import AIAssistant from "./AIAssistant";
import { requirePremiumUser } from "@/lib/auth/server-access";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AIAssistantPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";

  await requirePremiumUser({
    locale,
    nextPath: `/${locale}/ai-assistant`,
  });

  return <AIAssistant />;
}
