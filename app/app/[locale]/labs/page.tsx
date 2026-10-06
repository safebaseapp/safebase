import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ArrowRight, LockKeyhole, ScanSearch, Sparkles } from "lucide-react";
import { routing } from "../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";
import s from "./labs.module.css";

type Props = { params: Promise<{ locale: string }> };

type LabCard = {
  id: string;
  title: string;
  subtitle: string;
  descTr: string;
  descEn: string;
  href?: string;
  active: boolean;
  premium?: boolean;
  index: string;
};

const products: LabCard[] = [
  { id: "spot", title: "Spot the Hazard", subtitle: "Visual Test Challenge", descTr: "Gerçekçi endüstriyel sahneleri incele. Görselde gerçekten bulunan tehlikeleri tespit et ve saha farkındalığını test et.", descEn: "Inspect realistic industrial scenes. Identify the hazards that are actually visible and test your field awareness.", href: "spot-the-hazard", active: true, index: "01" },
  { id: "incident", title: "Incident Simulator", subtitle: "Scenario Judgment", descTr: "Dallanan olay akışında karar ver. Her karar Safety, Judgment ve Response skorunu değiştirir; sonuç zincire göre şekillenir.", descEn: "Make decisions through a branching incident. Every choice changes Safety, Judgment and Response scores, and the outcome follows your decision chain.", href: "incident-simulator", active: true, index: "02" },
  { id: "ai-workplace", title: "AI Workplace Safety", subtitle: "AI Risk Screening", descTr: "İşyerinde AI kullanımını insan gözetimi, otomasyon, hassas veri, değişiklik kontrolü ve manuel fallback açısından tarayın.", descEn: "Screen workplace AI use for human oversight, automation, sensitive data, change control and manual fallback.", href: "ai-workplace-safety", active: true, index: "03" },\n  { id: "brain", title: "Daily Safety Brain", subtitle: "Quick Challenge", descTr: "Kısa günlük HSE challenge'ları ile bilgini ve saha refleksini sıcak tut.", descEn: "Keep HSE knowledge and field reflexes active with short daily challenges.", active: false, index: "06" },
  { id: "ppe", title: "PPE Matchmaker", subtitle: "Protection Logic", descTr: "Görev ve tehlikeye göre doğru kişisel koruyucu ekipman kombinasyonunu seç.", descEn: "Match tasks and hazards with the right personal protective equipment.", active: false, index: "04" },
  { id: "myth", title: "Safety Myth Buster", subtitle: "Safety Truth Check", descTr: "Sahada sık duyulan güvenlik inanışlarını kanıt ve iyi uygulamalarla test et.", descEn: "Test common field safety beliefs against evidence and good practice.", active: false, index: "05" },
  { id: "blind", title: "Blind Spot Test", subtitle: "Hidden Risk Focus", descTr: "Gözden kaçan riskleri ve farkındalık boşluklarını ortaya çıkaran ileri seviye testler.", descEn: "Advanced challenges designed to reveal overlooked risks and awareness gaps.", active: false, premium: true, index: "07" },
];

export default async function LabsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const isTr = locale === "tr";

  return (
    <main className={s.page}>
      <ActivityTracker eventName="labs_view" />

      <div className={s.background} aria-hidden="true">
        <video className={s.backgroundVideo} src="/videos/sernem-refinery-hero.mp4" poster="/images/sernem-hero-refinery.png" autoPlay muted loop playsInline controls={false} preload="metadata" disablePictureInPicture />
        <div className={s.videoScrim} />
        <div className={s.videoFade} />
      </div>

      <section className={s.hero} aria-labelledby="labs-title">
        <div className={s.container}>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <div style={{ width: 154, overflow: "hidden", borderRadius: 22, border: "1px solid rgba(196,181,253,.18)", boxShadow: "0 18px 48px rgba(0,0,0,.24)", marginBottom: 22 }}>
                <img src="/images/sernem-labs-logo.webp" alt="SERNEM Labs" style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
              <p className={s.eyebrow}><span className={s.signal} /> SERNEM / HSE LABS</p>
              <h1 id="labs-title">
                {isTr ? "Gözünü eğit." : "Train your eye."}<br />
                <em>{isTr ? "Saha kararını güçlendir." : "Strengthen field judgment."}</em>
              </h1>
              <p className={s.lead}>{isTr ? "Gerçek endüstriyel risklerden ilham alan etkileşimli HSE challenge'ları. Tehlike farkındalığını, karar kalitesini ve saha refleksini aktif olarak test et." : "Interactive HSE challenges inspired by real industrial risk. Actively test hazard recognition, decision quality and field awareness."}</p>
              <div className={s.actions}>
                <Link className={s.primaryAction} href={`/${locale}/labs/incident-simulator`}>{isTr ? "Incident Simulator'ı Aç" : "Open Incident Simulator"}<ArrowRight size={18} /></Link>
                <a className={s.secondaryAction} href="#labs-modules">{isTr ? "Modülleri Gör" : "Explore Modules"}</a>
              </div>
            </div>

            <div className={s.heroPanel}>
              <div className={s.panelTop}><span>LAB / 002</span><span className={s.liveDot}>{isTr ? "CANLI" : "LIVE"}</span></div>
              <div className={s.panelIcon}><ScanSearch size={32} /></div>
              <p className={s.panelKicker}>SCENARIO JUDGMENT ENGINE</p>
              <h2>Incident Simulator</h2>
              <p>{isTr ? "Dallanan olay akışı · karar etkisi · Safety / Judgment / Response debrief" : "Branching event flow · decision impact · Safety / Judgment / Response debrief"}</p>
              <div className={s.panelStats}>
                <span><b>3</b>{isTr ? "Skor" : "Scores"}</span><span><b>3</b>{isTr ? "Sonuç" : "Outcomes"}</span><span><b>XP</b>{isTr ? "Karar" : "Judgment"}</span>
              </div>
              <Link href={`/${locale}/labs/incident-simulator`} className={s.panelLink}>{isTr ? "Simülasyonu başlat" : "Start simulation"} <ArrowRight size={16} /></Link>
            </div>
          </div>

          <div className={s.heroFoot}><span>01 — VISUAL AWARENESS</span><span>02 — DECISION QUALITY</span><span>03 — FIELD JUDGMENT</span></div>
        </div>
      </section>

      <section id="labs-modules" className={s.modules}>
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <div>
              <p className={s.eyebrow}><span className={s.signal} /> 01 / {isTr ? "EĞİTİM MODÜLLERİ" : "TRAINING MODULES"}</p>
              <h2>{isTr ? "Okumaktan fazlası." : "More than reading."}<br /><em>{isTr ? "Aktif olarak test et." : "Actively tested."}</em></h2>
            </div>
            <p>{isTr ? "HSE Labs kademeli olarak açılıyor. Visual Test Challenge ve Incident Simulator şu anda canlı; diğer modüller kalite kontrolü tamamlandıkça aktif edilecek." : "HSE Labs is opening in stages. Visual Test Challenge and Incident Simulator are live now; additional modules will unlock after quality validation."}</p>
          </div>

          <div className={s.grid}>
            {products.map((product) => {
              const card = (
                <article className={`${s.card} ${product.active ? s.activeCard : s.soonCard}`}>
                  <div className={s.cardTop}><span className={s.cardIndex}>{product.index}</span><div className={s.badges}>{product.premium && <span className={s.premiumBadge}><Sparkles size={12} /> PREMIUM</span>}<span className={product.active ? s.liveBadge : s.soonBadge}>{product.active ? (isTr ? "CANLI" : "LIVE") : (isTr ? "YAKINDA" : "COMING SOON")}</span></div></div>
                  <p className={s.cardSubtitle}>{product.subtitle}</p>
                  <h3>{product.title}</h3>
                  <p className={s.cardDescription}>{isTr ? product.descTr : product.descEn}</p>
                  <div className={s.cardFooter}>{product.active ? <span>{isTr ? "Challenge'a başla" : "Start challenge"} <ArrowRight size={16} /></span> : <span className={s.locked}><LockKeyhole size={15} /> {isTr ? "Geliştirme aşamasında" : "In development"}</span>}</div>
                </article>
              );
              return product.active && product.href ? <Link key={product.id} href={`/${locale}/labs/${product.href}`} className={s.cardLink}>{card}</Link> : <div key={product.id} className={s.cardLink} aria-disabled="true">{card}</div>;
            })}
          </div>

          <div className={s.bottomStrip}>
            <div><span className={s.eyebrow}>{isTr ? "SERNEM LABS / GELİŞİM" : "SERNEM LABS / DEVELOPMENT"}</span><strong>{isTr ? "Yeni modüller kontrollü şekilde açılacak." : "New modules will open deliberately."}</strong></div>
            <p>{isTr ? "Boş veya yarım deneyim yayınlamıyoruz. Her modül saha mantığı, içerik ve kullanıcı akışı doğrulandıktan sonra canlıya alınacak." : "No empty or half-built experiences. Each module goes live only after its field logic, content and user flow are validated."}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
