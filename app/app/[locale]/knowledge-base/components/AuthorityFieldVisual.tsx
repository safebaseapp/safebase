import Link from "next/link";

type Locale = "tr" | "en";
type Scene = { src: string; label: Record<Locale, string>; focus: Record<Locale, string>; toolbox: string };
const scenes: Record<string, Scene> = {
  "confined-space": {
    src: "/labs/spot-the-hazard/scene-confined-space-2k.jpg",
    label: { en: "Confined space entry — field scene", tr: "Kapalı alan girişi — saha sahnesi" },
    focus: { en: "Assess the entry point, atmospheric testing, attendant position, isolations and rescue readiness.", tr: "Giriş noktasını, atmosfer ölçümünü, gözcünün konumunu, izolasyonları ve kurtarma hazırlığını değerlendirin." },
    toolbox: "confined-space",
  },
  "hot-work": {
    src: "/labs/spot-the-hazard/scene-hot-work-2k.jpg",
    label: { en: "Hot work — field scene", tr: "Sıcak çalışma — saha sahnesi" },
    focus: { en: "Check the permit, fire watch, spark containment, nearby combustibles and suitable extinguishers.", tr: "Çalışma iznini, yangın gözcüsünü, kıvılcım kontrolünü, yakındaki yanıcıları ve uygun söndürücüleri kontrol edin." },
    toolbox: "hot-work",
  },
  "working-at-height": {
    src: "/labs/spot-the-hazard/scene-working-at-height-2k.jpg",
    label: { en: "Working at height — field scene", tr: "Yüksekte çalışma — saha sahnesi" },
    focus: { en: "Examine collective fall protection, access, anchorage and dropped-object exposure.", tr: "Toplu düşme önlemlerini, erişimi, ankrajı ve düşen cisim risklerini inceleyin." },
    toolbox: "working-at-height",
  },
  "loto": {
    src: "/labs/spot-the-hazard/scene-confined-space-2k.jpg",
    label: { en: "Isolation planning — industrial field scene", tr: "İzolasyon planlaması — endüstriyel saha sahnesi" },
    focus: { en: "Identify all electrical, mechanical and process energy sources; verify zero energy before intervention.", tr: "Elektriksel, mekanik ve proses enerjisi kaynaklarını belirleyin; müdahale öncesi sıfır enerjiyi doğrulayın." },
    toolbox: "loto",
  },
  "scaffolding": {
    src: "/labs/spot-the-hazard/scene-scaffolding-2k.jpg",
    label: { en: "Scaffolding — inspection scene", tr: "İskele — denetim sahnesi" },
    focus: { en: "Inspect access, edge protection, decking, base support and the inspection status.", tr: "Erişimi, kenar korumalarını, platformları, taban desteklerini ve kontrol durumunu inceleyin." },
    toolbox: "scaffold-safety",
  },
};

export default function AuthorityFieldVisual({ slug, locale }: { slug: string; locale: Locale }) {
  const scene = scenes[slug];
  if (!scene) return null;
  const tr = locale === "tr";
  return (
    <section aria-label={tr ? "Saha görseli ve denetim odağı" : "Field visual and inspection focus"} className="overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-900 shadow-2xl">
      <div className="grid md:grid-cols-5">
        <div className="relative md:col-span-3">
          {/* Existing SERNEM training-scene asset, not evidence of compliant field practice. */}
          <img src={scene.src} alt={scene.label[locale]} loading="lazy" decoding="async" width={1600} height={900} className="h-full min-h-64 w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center p-7 md:col-span-2">
          <p className="text-xs font-black uppercase tracking-widest text-blue-300">{tr ? "SERNEM • Görsel Saha Rehberi" : "SERNEM • Visual Field Guide"}</p>
          <h2 className="mt-3 text-2xl font-black text-white">{scene.label[locale]}</h2>
          <p className="mt-4 leading-7 text-slate-300">{scene.focus[locale]}</p>
          <p className="mt-4 text-xs leading-5 text-slate-400">{tr ? "Eğitim amaçlı saha sahnesidir. Görseldeki her uygulamanın güvenli olduğunu varsaymayın; sahaya özel kontrol ve mevzuat doğrulaması gereklidir." : "Illustrative training scene only. Do not assume every practice shown is safe; site-specific verification and applicable regulations are essential."}</p>
          <Link href={`/${locale}/toolbox/${scene.toolbox}`} className="mt-6 inline-flex w-fit rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500">
            {tr ? "İlgili Toolbox'a geç →" : "Open related Toolbox →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
