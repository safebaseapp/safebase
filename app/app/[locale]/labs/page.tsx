import Link from "next/link";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../../i18n/routing";
import ActivityTracker from "@/components/analytics/ActivityTracker";

const products = [
  { id: "spot", title: "Spot the Hazard", href: "spot-the-hazard", status: "live", premium: false, descTr: "Endüstriyel sahnelerde tehlikeleri bul, skor kazan ve refleksini geliştir.", descEn: "Find hazards in industrial scenes, earn a score and sharpen your safety awareness." },
  { id: "brain", title: "Daily Safety Brain", status: "soon", premium: false, descTr: "Her gün kısa bir HSE challenge ile bilgini sıcak tut.", descEn: "Keep your HSE knowledge active with one short daily challenge." },
  { id: "myth", title: "Safety Myth Buster", status: "soon", premium: false, descTr: "Sahadaki yaygın yanlış inanışları test et.", descEn: "Test common safety myths from real work situations." },
  { id: "ppe", title: "PPE Matchmaker", status: "soon", premium: false, descTr: "İşe ve tehlikeye göre doğru PPE kombinasyonunu seç.", descEn: "Match the right PPE to the task and hazard." },
  { id: "blind", title: "Blind Spot Test", status: "soon", premium: true, descTr: "Fark etmediğin zayıf HSE alanlarını ortaya çıkar.", descEn: "Reveal the HSE weaknesses you do not notice yourself." },
  { id: "incident", title: "Incident Simulator", status: "soon", premium: true, descTr: "Karar ver, sonuçlarını gör ve olaylardan güvenli şekilde öğren.", descEn: "Make decisions, see the consequences and learn from incidents safely." },
];

type Props = { params: Promise<{ locale: string }> };

export default async function LabsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const isTr = locale === "tr";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <ActivityTracker eventName="labs_view" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-cyan-400/15 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,.16),_transparent_38%),linear-gradient(145deg,#0f172a,#020617)] p-7 sm:p-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[.2em] text-cyan-200">SERNEM Labs</div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {isTr ? "HSE bilgini okuyarak değil, karar vererek geliştir." : "Build HSE skill by making decisions, not just reading."}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            {isTr
              ? "Challenge, simülasyon ve performans odaklı yeni SERNEM deneyimi. Free seni geri getirir. Premium seni geliştirir."
              : "The new challenge, simulation and performance layer of SERNEM. Free makes you come back. Premium makes you better."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const active = product.status === "live" && product.href;
            const content = (
              <div className={`h-full rounded-3xl border p-6 transition ${active ? "border-cyan-400/25 bg-slate-900 hover:-translate-y-1 hover:border-cyan-300/50" : "border-white/10 bg-slate-900/70"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-black text-cyan-200">{product.title.slice(0, 2).toUpperCase()}</div>
                  <div className="flex gap-2">
                    {product.premium && <span className="rounded-full bg-amber-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-200">Premium</span>}
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${active ? "bg-emerald-300/10 text-emerald-200" : "bg-white/5 text-slate-400"}`}>
                      {active ? (isTr ? "Oyna" : "Play") : (isTr ? "Yakında" : "Soon")}
                    </span>
                  </div>
                </div>
                <h2 className="mt-8 text-2xl font-black tracking-tight">{product.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{isTr ? product.descTr : product.descEn}</p>
                {active && <div className="mt-7 text-sm font-black text-cyan-300">{isTr ? "Challenge'a başla" : "Start challenge"} →</div>}
              </div>
            );

            return active ? <Link key={product.id} href={`/${locale}/labs/${product.href}`}>{content}</Link> : <div key={product.id}>{content}</div>;
          })}
        </div>
      </div>
    </main>
  );
}
