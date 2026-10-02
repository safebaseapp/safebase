import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { routing } from "../../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import { incidentCatalog } from "@/lib/labs/scenarios/incident-catalog";
import s from "./catalog.module.css";

type Props = { params: Promise<{ locale: string }> };

export default async function IncidentSimulatorPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const isTr = locale === "tr";
  const liveCount = incidentCatalog.filter((item) => item.status === "live").length;

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
          <span>{incidentCatalog.length} {isTr ? "senaryo konusu" : "scenario topics"}</span>
          <span>{liveCount} {isTr ? "canlı" : "live"}</span>
          <span>{isTr ? "Senaryo başına 8–10 karar" : "8–10 decisions per scenario"}</span>
          <span>TR + EN</span>
        </div>

        <section className={s.grid}>
          {incidentCatalog.map((item, index) => {
            const title = isTr ? item.titleTr : item.titleEn;
            const desc = isTr ? item.descTr : item.descEn;
            const live = item.status === "live";
            return (
              <article key={item.id} className={`${s.card} ${live ? s.liveCard : ""}`}>
                <div className={s.cardTop}>
                  <span className={s.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={`${s.badge} ${live ? "" : s.coming}`}>{live ? (isTr ? "CANLI" : "LIVE") : (isTr ? "YAKINDA" : "COMING SOON")}</span>
                </div>
                <div className={s.category}>{item.category} · {item.difficulty.toUpperCase()}</div>
                <h2>{title}</h2>
                <p>{desc}</p>
                <div className={s.footer}>
                  <span className={s.decisions}>{item.decisions} {isTr ? "karar" : "decisions"}</span>
                  {live ? <Link className={s.action} href={`/${locale}/labs/incident-simulator/${item.id}`}>{isTr ? "Senaryoyu başlat" : "Start scenario"}<ArrowRight size={16} /></Link> : <span className={s.disabled}><LockKeyhole size={14} /> {isTr ? "Hazırlanıyor" : "In development"}</span>}
                </div>
              </article>
            );
          })}
        </section>

        <div className={s.note}>{isTr ? "Kütüphane tek tip quiz üretmeyecek. Her konu kendi saha mantığına, kritik kontrol noktalarına, yanlış karar sonuçlarına ve recovery path'lerine sahip olacak." : "This library will not produce repeated quiz templates. Each topic will have its own field logic, critical control points, consequences for poor decisions and recovery paths."}</div>
      </div>
    </main>
  );
}
