import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, Gauge, ShieldCheck, Sparkles } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HowItWorksPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const tr = locale === "tr";

  const steps = [
    {
      icon: ShieldCheck,
      no: "01",
      title: tr ? "İşi planla" : "Plan the work",
      text: tr
        ? "Faaliyeti seçin, tehlikeleri belirleyin ve Risk Analizi ile kontrolleri netleştirin."
        : "Choose the activity, identify hazards and define controls with Risk Assessment.",
      href: `/${locale}/tools/quick-risk-assessment`,
      cta: tr ? "Risk Analizi Oluştur" : "Build Risk Assessment",
    },
    {
      icon: FileText,
      no: "02",
      title: tr ? "Yöntemi dokümante et" : "Document the method",
      text: tr
        ? "Method Statement ile iş adımlarını, ekipmanı, sorumlulukları ve güvenli çalışma yöntemini düzenleyin."
        : "Use Method Statement to structure work steps, equipment, responsibilities and the safe method of work.",
      href: `/${locale}/tools/method-statement`,
      cta: "Method Statement",
    },
    {
      icon: ClipboardCheck,
      no: "03",
      title: tr ? "Sahada doğrula" : "Verify in the field",
      text: tr
        ? "Kontrol listeleriyle saha koşullarını doğrulayın, açık bulguları ve aksiyonları görünür hale getirin."
        : "Use checklists to verify field conditions and make open findings and actions visible.",
      href: `/${locale}/checklists`,
      cta: tr ? "Denetimleri Aç" : "Open Inspections",
    },
    {
      icon: Sparkles,
      no: "04",
      title: tr ? "Ekibi bilgilendir" : "Brief the crew",
      text: tr
        ? "Toolbox içeriklerini önizleyin. Ücretsiz hesabınızla standart PDF'i indirin ve sahada kullanın."
        : "Preview Toolbox content. Download the standard PDF with a free account and use it in the field.",
      href: `/${locale}/toolbox`,
      cta: tr ? "Toolbox Kütüphanesi" : "Toolbox Library",
    },
    {
      icon: Gauge,
      no: "05",
      title: tr ? "Performansı takip et" : "Track performance",
      text: tr
        ? "Olay yönetimi, gözlemler ve KPI verilerini HSE Performance ekranında bir araya getirin."
        : "Bring incident management, observations and KPI data together in HSE Performance.",
      href: `/${locale}/hse-performance`,
      cta: "HSE Performance",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050914] px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/${locale}`} className="text-sm font-bold text-blue-400 hover:text-blue-300">
            ← {tr ? "Ana sayfa" : "Home"}
          </Link>
          <Link href={`/${locale}/upgrade`} className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-black tracking-[0.12em] text-amber-200">
            SERNEM PREMIUM
          </Link>
        </div>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 p-6 sm:p-10 lg:p-14">
          <p className="text-xs font-black tracking-[0.2em] text-blue-300">SERNEM / WORKFLOW</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            {tr ? "Planlamadan sahaya." : "From planning to field."}<br />
            <span className="text-slate-400">{tr ? "Tek çalışma akışı." : "One working flow."}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {tr
              ? "SERNEM modülleri birbirinden kopuk kartlar değil. Bir işin planlanması, sahada doğrulanması, ekibe aktarılması ve performansının takip edilmesi için birbirini tamamlayan araçlardır."
              : "SERNEM modules are not disconnected cards. They are complementary tools for planning work, verifying it in the field, briefing the crew and tracking performance."}
          </p>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Link
                href={step.href}
                key={step.no}
                className="group rounded-3xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-blue-400/40 hover:bg-white/[0.06] sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-black tracking-[0.18em] text-slate-500">{step.no} / 05</p>
                        <h2 className="mt-1 text-xl font-black sm:text-2xl">{step.title}</h2>
                      </div>
                      <ArrowRight className="mt-1 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-300" size={20} />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">{step.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-300">
                      <CheckCircle2 size={16} /> {step.cta}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">{tr ? "Ücretsiz başla. İhtiyacın olduğunda Premium'a geç." : "Start free. Upgrade when you need more."}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                {tr
                  ? "İçerikleri keşfedin, ücretsiz hesap oluşturun ve standart Toolbox PDF'lerini indirin. Gelişmiş AI ve Premium kaynaklar için Premium planı kullanın."
                  : "Explore the content, create a free account and download standard Toolbox PDFs. Use Premium for advanced AI and Premium resources."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href={`/${locale}/register`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-black hover:bg-blue-500">
                {tr ? "Ücretsiz Hesap Oluştur" : "Create Free Account"}
              </Link>
              <Link href={`/${locale}/upgrade`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-black hover:bg-white/[0.05]">
                {tr ? "Premium'u İncele" : "Explore Premium"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
