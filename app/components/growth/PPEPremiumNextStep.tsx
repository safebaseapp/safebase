import { PremiumGrowthLink } from "@/components/analytics/PremiumFunnelTracker";

/** A small, optional next step after the freely available PPE safety guidance. */
export default function PPEPremiumNextStep({ locale }: { locale: "tr" | "en" }) {
  const tr = locale === "tr";

  return (
    <aside className="mt-6 rounded-2xl border border-slate-300 bg-slate-950 p-6 text-white sm:p-8 print:hidden">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
        SERNEM / {tr ? "SAHA DOKÜMANTASYONU" : "FIELD DOCUMENTATION"}
      </p>
      <h2 className="mt-3 text-xl font-bold sm:text-2xl">
        {tr ? "Standartları inceleyin. İşe özel dokümanları da keşfedin." : "Reviewed the standard? Explore task-specific documents."}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
        {tr
          ? "Bu teknik rehber ücretsiz kalır. Risk değerlendirmesi, Toolbox Talk ve gelişmiş HSE doküman özellikleri için SERNEM Free / Premium seçeneklerini karşılaştırabilirsiniz."
          : "This technical guide stays free. Compare SERNEM Free and Premium if you also work with risk assessments, Toolbox Talks and advanced HSE document workflows."}
      </p>
      <PremiumGrowthLink
        href={`/${locale}/upgrade`}
        eventName="premium_ppe_cta_click"
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200"
      >
        {tr ? "Ücretsiz ve Premium farklarını gör" : "Compare Free and Premium"} →
      </PremiumGrowthLink>
    </aside>
  );
}
