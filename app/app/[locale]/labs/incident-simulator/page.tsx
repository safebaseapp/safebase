import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { routing } from "../../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";
import { incidentCatalog } from "@/lib/labs/scenarios/incident-catalog";
import s from "./catalog.module.css";

type Props = { params: Promise<{ locale: string }> };

export default async function IncidentSimulatorPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const isTr = locale === "tr";
  const { user, profile } = await getCurrentAccessProfile();
  const isSignedIn = Boolean(user && profile && profile.status !== "suspended");
  const isPremium = Boolean(isSignedIn && (profile?.plan === "premium" || profile?.role === "admin"));

  const guestCount = incidentCatalog.filter((item) => item.access === "guest").length;
  const freeCount = incidentCatalog.filter((item) => item.access === "free").length;
  const premiumCount = incidentCatalog.filter((item) => item.access === "premium").length;

  return (
    <main className={s.page}>
      <ActivityTracker eventName="labs_incident_simulator_library_view" />
      <div className={s.shell}>
        <header className={s.topbar}>
          <Link href={`/${locale}/labs`} className={s.back}><ArrowLeft size={17} /> {isTr ? "Labs'e dön" : "Back to Labs"}</Link>
          <span className={s.meta}>LAB / 002 · INCIDENT SIMULATOR</span>
        </header>

        <section className={s.hero}>
          <p className={s.eyebrow}>DECISION TRAINING / SCENARIO LIBRARY</p>
          <h1>{isTr ? "Sahada karar ver. Sonucunu yaşa." : "Make the field decision. Live the consequence."}</h1>
          <p>{isTr ? "Gerçek HSE olay mantığıyla oluşturulmuş dallanan senaryolar. Her seçim Safety, Judgment ve Response skorunu etkiler; ezber yerine değişen koşullarda karar kalitesini test eder." : "Branching scenarios built around real HSE incident logic. Every choice changes Safety, Judgment and Response scores, testing judgment under changing conditions instead of memorized answers."}</p>
        </section>

        <div className={s.summary}>
          <span>{incidentCatalog.length} {isTr ? "senaryo" : "scenarios"}</span>
          <span>{guestCount} {isTr ? "misafire açık" : "guest access"}</span>
          <span>+{freeCount} {isTr ? "ücretsiz üyeye açık" : "free member"}</span>
          <span>{premiumCount} Premium</span>
          <span>{isTr ? "8–10 karar / senaryo" : "8–10 decisions / scenario"}</span>
        </div>

        <div className={s.note}>
          {isSignedIn ? (
            <><UserRound size={16} /> {isPremium ? (isTr ? "Premium hesabın aktif. Canlı Premium senaryolar yayınlandıkça doğrudan açılacak; sonuçların Dashboard / Labs Results bölümüne kaydedilir." : "Your Premium access is active. Live Premium scenarios will open directly as they are released; results are saved in Dashboard / Labs Results.") : (isTr ? "Ücretsiz üyelikle 3 ek senaryo açıldı. Kalan Premium senaryoları katalogda görebilirsin; sonuçların Dashboard / Labs Results bölümüne kaydedilir." : "Your free account unlocks 3 additional scenarios. The remaining Premium library stays visible, and your results are saved in Dashboard / Labs Results.")}</>
          ) : (
            <>{isTr ? "İlk 3 senaryoyu hesap açmadan oynayabilirsin. Ücretsiz hesap 3 senaryo daha açar; kişisel hata analizi ve geçmiş sonuçlar da hesabına kaydedilir." : "Play the first 3 scenarios without an account. A free account unlocks 3 more and saves your personal decision analysis and result history."}</>
          )}
        </div>

        <section className={s.grid}>
          {incidentCatalog.map((item, index) => {
            const title = isTr ? item.titleTr : item.titleEn;
            const desc = isTr ? item.descTr : item.descEn;
            const live = item.status === "live";
            const accessAllowed = item.access === "guest" || (item.access === "free" && isSignedIn) || (item.access === "premium" && isPremium);
            const playable = live && accessAllowed;

            const badge = item.access === "guest"
              ? (isTr ? "MİSAFİR · ÜCRETSİZ" : "GUEST · FREE")
              : item.access === "free"
                ? (isTr ? "ÜCRETSİZ ÜYE" : "FREE MEMBER")
                : "PREMIUM";

            let action;
            if (playable) {
              action = <Link className={s.action} href={`/${locale}/labs/incident-simulator/${item.id}`}>{isTr ? "Senaryoyu başlat" : "Start scenario"}<ArrowRight size={16} /></Link>;
            } else if (!live) {
              action = <span className={s.disabled}><LockKeyhole size={14} /> {item.access === "premium" ? "PREMIUM" : (isTr ? "Hazırlanıyor" : "In development")}</span>;
            } else if (item.access === "free" && !isSignedIn) {
              const next = `/${locale}/labs/incident-simulator/${item.id}`;
              action = <Link className={s.disabled} href={`/${locale}/login?next=${encodeURIComponent(next)}`}><LockKeyhole size={14} /> {isTr ? "Ücretsiz giriş" : "Sign in free"}</Link>;
            } else {
              action = <Link className={s.disabled} href={`/${locale}/upgrade`}><LockKeyhole size={14} /> PREMIUM</Link>;
            }

            return (
              <article key={item.id} className={`${s.card} ${live ? s.liveCard : ""}`}>
                <div className={s.cardTop}>
                  <span className={s.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`${s.badge} ${!live ? s.coming : ""}`}>{badge}</span>
                </div>
                <div className={s.category}>{item.category} · {item.difficulty.toUpperCase()}</div>
                <h2>{title}</h2>
                <p>{desc}</p>
                <div className={s.footer}>
                  <span className={s.decisions}>{item.decisions} {isTr ? "karar" : "decisions"}{!live ? ` · ${isTr ? "yakında" : "coming soon"}` : ""}</span>
                  {action}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
