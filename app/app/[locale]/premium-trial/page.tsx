import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { premiumTrialEnabled } from "../../../lib/premium-trial-config";
import TrialOffer from "./TrialOffer";

export default async function TrialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw === "tr" ? "tr" : "en";
  if (!premiumTrialEnabled()) redirect(`/${locale}`);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const next = encodeURIComponent(`/${locale}/premium-trial`);
  if (!user) return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-24">
      <div className="mx-auto max-w-lg rounded-3xl border border-slate-700 p-8 text-center">
        <h1 className="text-3xl font-bold">{locale === "tr" ? "24 Saat Premium'u Ücretsiz Dene" : "Try Premium Free for 24 Hours"}</h1>
        <p className="mt-4 text-slate-300">{locale === "tr" ? "Önce ücretsiz SERNEM hesabı oluştur. Sonra güvenli ödeme ekranında denemeyi başlat." : "Create your free SERNEM account first, then start your trial through secure checkout."}</p>
        <Link className="mt-8 block rounded-xl bg-indigo-600 p-4 font-bold" href={`/${locale}/register?next=${next}`}>{locale === "tr" ? "Ücretsiz hesap oluştur" : "Create a free account"}</Link>
        <Link className="mt-4 inline-block text-indigo-300" href={`/${locale}/login?next=${next}`}>{locale === "tr" ? "Zaten hesabım var" : "I already have an account"}</Link>
      </div>
    </main>
  );
  return <TrialOffer locale={locale}/>;
}
