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

const DEMO_ID = "hot-work-gas-drift";

export default async function IncidentSimulatorPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const isTr = locale === "tr";
  const { user, profile } = await getCurrentAccessProfile();
  const isSignedIn = Boolean(user && profile && profile.status !== "suspended");
  const isPremium = Boolean(isSignedIn && (profile?.plan === "premium" || profile?.role === "admin"));
  const visibleCatalog = isSignedIn ? incidentCatalog : incidentCatalog.filter((item) => item.id === DEMO_ID);

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
          <p>{isTr ? "Gerçek HSE olay mantığıyla oluşturulmuş dallanan senaryolar. Her seçim Safety, Judgment ve Response skorunu etkiler; doğru cevap ezberlemek yerine değişen koşullarda karar kalitesini test eder." : "Branching scenarios built around real HSE incident logic. Every choice changes Safety, Judgment and Response scores, testing judgment under changing conditions instead of memorized answers."}</p>
        </section>

        <div className={s.summary}>
          <span>{isSignedIn ? `${incidentCatalog.length} ${isTr ? "senaryo" : "scenarios"}` : (isTr ? "1 ücretsiz demo" : "1 free demo")}</span>
          <span>{isTr ? "Senaryo başına 8–10 karar" : "8–10 decisions per scenario"}</span>
          {isSignedIn && <span>{isPremium ? (isTr ? "Premium erişim aktif" : "Premium access active") : (isTr ? "Premium kütüphane görünür" : "Premium library visible")}</span>}
        </div>

        {!isSignedIn && (
          <div className={s.note}>
            <b>{isTr ? "Demo ile başla." : "Start with the demo."}</b> {isTr ? "Hot Work senaryosunu üyelik olmadan oynayabilirsin. Kişisel hata analizi, geçmiş sonuçlar ve Premium senaryo kütüphanesi hesapla açılır." : "Play the Hot Work scenario without an account. Personal error analysis, result history and the Premium scenario library unlock with an account."}
          </div>
        )}

        <section className={s.grid}>
          {visibleCatalog.map((item, index) => {
            const title = isTr ? item.titleTr : item.titleEn;
            const desc = isTr ? item.descTr : item.descEn;
            const isDemo = item.id === DEMO_ID;
            const live = item.status === "live";
            const playable = isDemo || (live && isPremium);
            return (
              <article key={item.id} className={`${s.card} ${live ? s.liveCard : ""}`}>
                <div className={s.cardTop}>
                  <span className={s.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`${s.badge} ${live ? "" : s.coming}`}>{isDemo ? (isTr ? "BASIC · DEMO" : "BASIC · DEMO") : live ? (isTr ? "CANLI" : "LIVE") : (isTr ? "YAKINDA" : "COMING SOON")}</span>
                </div>
                <div className={s.category}>{item.category} · {item.difficulty.toUpperCase()}</div>
                <h2>{title}</h2>
                <p>{desc}</p>
                <div className={s.footer}>
                  <span className={s.decisions}>{item.decisions} {isTr ? "karar" : "decisions"}</span>
                  {playable ? (
                    <Link className={s.action} href={`/${locale}/labs/incident-simulator/${item.id}`}>{isDemo ? (isTr ? "Demoyu başlat" : "Start demo") : (isTr ? "Senaryoyu başlat" : "Start scenario")}<ArrowRight size={16} /></Link>
                  ) : live && !isPremium ? (
                    <Link className={s.disabled} href={`/${locale}/upgrade`}><LockKeyhole size={14} /> PREMIUM</Link>
                  ) : (
                    <span className={s.disabled}><LockKeyhole size={14} /> {isTr ? "Hazırlanıyor" : "In development"}</span>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {isSignedIn ? (
          <div className={s.note}><UserRound size={16} /> {isTr ? "Tamamlanan Incident Simulator denemelerin ve kişisel karar analizlerin Dashboard / Labs Results bölümünde saklanacak." : "Completed Incident Simulator attempts and personal decision analysis are stored in Dashboard / Labs Results."}</div>
        ) : null}
      </div>
    </main>
  );
}
