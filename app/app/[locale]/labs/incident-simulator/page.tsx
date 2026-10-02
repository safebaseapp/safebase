import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { routing } from "../../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { getCurrentAccessProfile } from "@/lib/auth/server-access";
import { incidentCatalog } from "@/lib/labs/scenarios/incident-catalog";
import { incidentScenarios } from "@/lib/labs/scenarios/incident-scenarios";
import { localizeHseText, normalizeHseEnglish } from "@/lib/labs/scenarios/hse-language";
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
  const liveScenarioCount = incidentCatalog.filter((item) => Boolean(incidentScenarios[item.id])).length;

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
          <p>{isTr ? "Gerçek HSE olay mantığıyla oluşturulmuş dallanan senaryolar. Her seçim Safety, Judgment ve Response skorunu etkiler; ezber yerine değişen koşullarda karar kalitesini test eder." : "Branching scenarios built around real HSE incident logic. Every choice affects Safety, Judgment, and Response scores, testing decision quality under changing conditions rather than memorized answers."}</p>
        </section>

        <div className={s.summary}>
          <span>{incidentCatalog.length} {isTr ? "senaryo" : "scenarios"}</span>
          <span>{guestCount} {isTr ? "misafire açık" : "guest access"}</span>
          <span>+{freeCount} {isTr ? "ücretsiz üyeye açık" : "free member"}</span>
          <span>{premiumCount} Premium</span>
          <span>{liveScenarioCount} {isTr ? "canlı senaryo" : "live scenarios"}</span>
          <span>{isTr ? "8–10 karar / senaryo" : "8–10 decisions / scenario"}</span>
        </div>

        <div className={s.note}>
          {isSignedIn ? (
            <><UserRound size={16} /> {isPremium ? (isTr ? "Premium hesabın aktif. Hazır Expert senaryolar doğrudan açılır; hazırlanmakta olan kartlar ayrıca belirtilir. Sonuçların Dashboard / Labs Results bölümüne kaydedilir." : "Your Premium account is active. Completed Expert scenarios open directly; scenarios still in development are clearly marked. Results are saved under Dashboard / Labs Results.") : (isTr ? "Ücretsiz üyelikle 3 ek senaryo açıldı. Kalan Premium senaryoları katalogda görebilirsin; sonuçların Dashboard / Labs Results bölümüne kaydedilir." : "Your free account unlocks 3 additional scenarios. The remaining Premium library stays visible, and your results are saved under Dashboard / Labs Results.")}</>
          ) : (
            <>{isTr ? "İlk 3 senaryoyu hesap açmadan oynayabilirsin. Ücretsiz hesap 3 senaryo daha açar; kişisel hata analizi ve geçmiş sonuçlar da hesabına kaydedilir." : "Play the first 3 scenarios without an account. A free account unlocks 3 more and saves your personal decision analysis and result history."}</>
          )}
        </div>

        <section className={s.grid}>
          {incidentCatalog.map((item, index) => {
            const scenario = incidentScenarios[item.id];
            const title = scenario ? localizeHseText(locale, scenario.titleTr, scenario.titleEn) : localizeHseText(locale, item.titleTr, item.titleEn);
            const desc = localizeHseText(locale, item.descTr, item.descEn);
            const category = isTr ? item.category : normalizeHseEnglish(item.category);
            const live = Boolean(scenario);
            const accessAllowed = item.access === "guest" || (item.access === "free" && isSignedIn) || (item.access === "premium" && isPremium);
            const playable = live && accessAllowed;
            const displayedDifficulty = scenario?.difficulty === "expert" ? "EXPERT" : item.difficulty.toUpperCase();

            const badge = item.access === "guest"
              ? (isTr ? "MİSAFİR · ÜCRETSİZ" : "GUEST · FREE")
              : item.access === "free"
                ? (isTr ? "ÜCRETSİZ ÜYE" : "FREE MEMBER")
                : "PREMIUM";

            let action;
            if (playable) {
              action = <Link className={s.action} href={`/${locale}/labs/incident-simulator/${item.id}`}>{isTr ? "Senaryoyu başlat" : "Start scenario"}<ArrowRight size={16} /></Link>;
            } else if (!live) {
              action = <span className={s.disabled}>{isTr ? "Hazırlanıyor" : "In development"}</span>;
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
                <div className={s.category}>{category} · {displayedDifficulty}</div>
                <h2>{title}</h2>
                <p>{desc}</p>
                <div className={s.footer}>
                  <span className={s.decisions}>{item.decisions} {isTr ? "karar" : "decisions"}{!live ? ` · ${isTr ? "hazırlanıyor" : "in development"}` : ""}</span>
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
