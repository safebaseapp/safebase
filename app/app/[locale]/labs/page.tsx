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
  beta?: boolean;
  index: string;
};

const products: LabCard[] = [
  { id: "spot", title: "Spot the Hazard", subtitle: "Visual Test Challenge", descTr: "Gerçekçi endüstriyel sahneleri incele. Görselde gerçekten bulunan tehlikeleri tespit et ve saha farkındalığını test et.", descEn: "Inspect realistic industrial scenes. Identify the hazards that are actually visible and test your field awareness.", href: "spot-the-hazard", active: true, index: "01" },
  { id: "incident", title: "Incident Simulator", subtitle: "Scenario Judgment", descTr: "Dallanan olay akışında karar ver. Her karar Güvenlik, Karar Kalitesi ve Müdahale puanlarını değiştirir; sonuç zincire göre şekillenir.", descEn: "Make decisions through a branching incident. Every choice changes Safety, Judgment and Response scores, and the outcome follows your decision chain.", href: "incident-simulator", active: true, index: "02" },
  { id: "brain", title: "Daily Safety Brain", subtitle: "Quick Challenge", descTr: "Kısa günlük İSG bilgi testleriyle bilgini ve saha refleksini sıcak tut.", descEn: "Keep HSE knowledge and field reflexes active with short daily challenges.", href: "daily-safety-brain", active: true, index: "03" },
  { id: "sim5", title: "SERNEM SIM 5.0", subtitle: "3D Industrial Site / Interactive HSE", descTr: "Gerçekçi 3D tesiste yürüyerek altı HSE bulgusunu keşfet. Kaynak, vinçli kaldırma, sızıntı, erişim ve üst platform risklerini incele.", descEn: "Explore six HSE findings in a walkable 3D industrial site: welding, crane lifting, leaks, access and elevated platforms.", href: "sim5", active: true, beta: true, index: "04" },
  { id: "ppe", title: "PPE Matchmaker", subtitle: "Protection Logic", descTr: "Görev ve tehlikeye göre doğru kişisel koruyucu ekipman kombinasyonunu seç.", descEn: "Match tasks and hazards with the right personal protective equipment.", active: false, index: "05" },
  { id: "myth", title: "Safety Myth Buster", subtitle: "Safety Truth Check", descTr: "Sahada sık duyulan güvenlik inanışlarını kanıt ve iyi uygulamalarla test et.", descEn: "Test common field safety beliefs against evidence and good practice.", active: false, index: "06" },
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
              <p className={s.lead}>{isTr ? "Gerçek endüstriyel risklerden ilham alan etkileşimli İSG senaryoları. Tehlike farkındalığını, karar kalitesini ve saha refleksini aktif olarak test et." : "Interactive HSE challenges inspired by real industrial risk. Actively test hazard recognition, decision quality and field awareness."}</p>
              <div className={s.actions}>
                <Link className={s.primaryAction} href={`/${locale}/labs/incident-simulator`}>{isTr ? "Olay Simülatörünü Aç" : "Open Incident Simulator"}<ArrowRight size={18} /></Link>
                <a className={s.secondaryAction} href="#labs-modules">{isTr ? "Modülleri Gör" : "Explore Modules"}</a>
              </div>
            </div>

            <div className={s.heroPanel}>
              <div className={s.panelTop}><span>LAB / 002</span><span className={s.liveDot}>{isTr ? "CANLI" : "LIVE"}</span></div>
              <div className={s.panelIcon}><ScanSearch size={32} /></div>
              <p className={s.panelKicker}>SCENARIO JUDGMENT ENGINE</p>
              <h2>Incident Simulator</h2>
              <p>{isTr ? "Dallanan olay akışı · karar etkisi · güvenlik / karar kalitesi / müdahale değerlendirmesi" : "Branching event flow · decision impact · Safety / Judgment / Response debrief"}</p>
              <div className={s.panelStats}>
                <span><b>3</b>{isTr ? "Skor" : "Scores"}</span><span><b>3</b>{isTr ? "Sonuç" : "Outcomes"}</span><span><b>XP</b>{isTr ? "Karar" : "Judgment"}</span>
              </div>
              <Link href={`/${locale}/labs/incident-simulator`} className={s.panelLink}>{isTr ? "Simülasyonu başlat" : "Start simulation"} <ArrowRight size={16} /></Link>
            </div>
          </div>

          <div className={s.heroFoot}><span>01 — VISUAL AWARENESS</span><span>02 — DECISION QUALITY</span><span>03 — FIELD JUDGMENT</span></div>
        </div>
      </section>

      <section aria-labelledby="daily-brain-title" className="relative bg-[#030d1c] px-4 py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[28px] border border-cyan-400/25 bg-gradient-to-br from-[#102f50] via-[#081c35] to-[#071326] p-6 shadow-2xl shadow-cyan-950/25 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-cyan-200">
              <Sparkles size={14} /> SERNEM LABS / DAILY SAFETY BRAIN
            </div>
            <h2 id="daily-brain-title" className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              {isTr ? "5 karar. Tek bir güvenlik yaklaşımı." : "5 Decisions. One Safety Mindset."}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
              {isTr ? "Güvenlik yalnızca bildiklerin değil, verdiğin kararlardır. Her gün yenilenen beş gerçekçi HSE sorusuyla saha refleksini test et." : "Safety isn't just what you know. It's the decisions you make. Test your field judgment with five realistic HSE questions refreshed daily."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-cyan-100">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">{isTr ? "5 günlük soru" : "5 daily questions"}</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">{isTr ? "Her gün 00:00 UTC" : "Refreshes 00:00 UTC"}</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">TR / EN</span>
            </div>
            <Link href={`/${locale}/labs/daily-safety-brain`} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-300">
              {isTr ? "Bugünün Challenge'ını başlat" : "Start today's challenge"} <ArrowRight size={17} />
            </Link>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/45 p-5 sm:p-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] text-cyan-300"><span>DAILY CHALLENGE</span><span>01 / 05</span></div>
            <div className="mt-5 text-5xl font-black tracking-tight text-white">05<span className="ml-2 text-xl font-semibold text-slate-400">{isTr ? "karar" : "decisions"}</span></div>
            <p className="mt-5 text-base font-bold leading-7 text-white">
              {isTr ? "Bir kararın kazayı önleyebilir. Bugün ne yapardın?" : "Your next decision could prevent an incident. What would you do?"}
            </p>
            <div className="mt-5 grid grid-cols-5 gap-2" aria-hidden="true">{[1, 2, 3, 4, 5].map((number) => <span key={number} className="h-2 rounded-full bg-cyan-400/50" />)}</div>
            <p className="mt-5 text-xs leading-5 text-slate-400">{isTr ? "Günlük testin sonuçları şimdilik yalnızca bu tarayıcıda tutulur. Global Labs XP sıralamasına eklenmez." : "Daily test results are currently stored in this browser only and do not count toward the global Labs XP leaderboard."}</p>
          </div>
        </div>
      </section>

      <section className="relative z-[1] border-y border-cyan-400/10 bg-[#041629] px-4 py-12 sm:py-16" aria-labelledby="sim5-feature-title">
        <div className="mx-auto grid max-w-6xl gap-7 rounded-[28px] border border-cyan-300/20 bg-gradient-to-br from-[#12364e] via-[#09253c] to-[#071322] p-6 shadow-2xl shadow-cyan-950/20 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-300">SERNEM LABS / 3D SIMULATION / BETA</p>
            <h2 id="sim5-feature-title" className="mt-4 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              {isTr ? "Sahaya gir. Riskleri kendin keşfet." : "Enter the site. Find the hazards yourself."}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              {isTr
                ? "Kaynak operasyonunu, vinçle boru kaldırmayı ve tank tesisini 3D ortamda keşfet. Servis merdivenlerinden üst platformlara çık, altı HSE bulgusunu güvenli bir yaklaşımla incele."
                : "Explore welding, crane lifting and the tank facility in 3D. Climb service stairs to the elevated platforms and inspect six HSE findings using a safe approach."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-cyan-100">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">3D / TR + EN</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">{isTr ? "6 HSE bulgusu" : "6 HSE findings"}</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">{isTr ? "Mobil + masaüstü" : "Mobile + desktop"}</span>
            </div>
            <Link href={`/${locale}/labs/sim5/demo`} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-200">
              {isTr ? "Ücretsiz Demo Oyna" : "Play Free Demo"} <ArrowRight size={17} />
            </Link>
            <Link href={`/${locale}/labs/sim5`} className="ml-0 mt-3 inline-flex min-h-12 items-center rounded-xl border border-cyan-300/40 px-5 py-3 text-sm font-bold sm:ml-3">{isTr ? "Premium Simülasyonu Başlat" : "Start Premium Simulation"}</Link>
            <p className="mt-3 text-xs text-slate-400">{isTr ? "Ücretsiz DEMO: 2 bulgu, kayıt gerekmez. Premium: 6 bulgu, üst platformlar ve hesap geçmişi." : "Free DEMO: 2 findings, no sign-in. Premium: 6 findings, upper platforms and account history."}</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-6">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] text-cyan-300"><span>FIELD INSPECTION</span><span>SIM / 5.0</span></div>
            <div className="mt-7 text-5xl font-black tracking-tight text-white">06 <span className="text-lg font-semibold text-slate-400">{isTr ? "inceleme" : "inspections"}</span></div>
            <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
              {[0, 1, 2].map((index) => <span key={index} className="h-2 rounded-full bg-cyan-400/70" />)}
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">
              {isTr ? "Yürüyüş kontrolleri · Kaynak ve kaldırma · Merdivenler ve yüksekte çalışma" : "Walk controls · Welding and lifting · Stairs and work at height"}
            </p>
          </div>
        </div>
      </section>

      <section id="labs-modules" className={s.modules}>
        <div className={s.container}>
          <div className={s.sectionHeading}>
            <div>
              <p className={s.eyebrow}><span className={s.signal} /> 01 / {isTr ? "EĞİTİM MODÜLLERİ" : "TRAINING MODULES"}</p>
              <h2>{isTr ? "Okumaktan fazlası." : "More than reading."}<br /><em>{isTr ? "Aktif olarak test et." : "Actively tested."}</em></h2>
            </div>
            <p>{isTr ? "HSE Labs kademeli olarak açılıyor. Spot the Hazard, Incident Simulator ve Daily Safety Brain aktif. SERNEM SIM 5.0 3D saha denetimi beta olarak erişilebilir; diğer modüller kalite kontrolü tamamlandıkça açılacak." : "HSE Labs is opening in stages. Spot the Hazard, Incident Simulator and Daily Safety Brain are live. SERNEM SIM 5.0 is available as a 3D site inspection beta; more modules will unlock after quality checks."}</p>
          </div>

          <div className={s.grid}>
            {products.map((product) => {
              const card = (
                <article className={`${s.card} ${product.active ? s.activeCard : s.soonCard}`}>
                  <div className={s.cardTop}><span className={s.cardIndex}>{product.index}</span><div className={s.badges}>{product.premium && <span className={s.premiumBadge}><Sparkles size={12} /> PREMIUM</span>}<span className={product.active ? s.liveBadge : s.soonBadge}>{product.active ? (product.beta ? "BETA" : (isTr ? "CANLI" : "LIVE")) : (isTr ? "YAKINDA" : "COMING SOON")}</span></div></div>
                  <p className={s.cardSubtitle}>{product.subtitle}</p>
                  <h3>{product.title}</h3>
                  <p className={s.cardDescription}>{isTr ? product.descTr : product.descEn}</p>
                  <div className={s.cardFooter}>{product.active ? <span>{product.beta ? (isTr ? "3D sahayı aç" : "Enter 3D site") : (isTr ? "Challenge'a başla" : "Start challenge")} <ArrowRight size={16} /></span> : <span className={s.locked}><LockKeyhole size={15} /> {isTr ? "Geliştirme aşamasında" : "In development"}</span>}</div>
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
