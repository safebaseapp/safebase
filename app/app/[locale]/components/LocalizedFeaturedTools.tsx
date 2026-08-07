import Link from "next/link";
import type { ReactNode } from "react";
import {
  ShieldCheck,
  Calculator,
  BookOpen,
  ClipboardCheck,
  FileText,
  BriefcaseBusiness,
  Image,
  TriangleAlert,
} from "lucide-react";

type Props = {
  locale: "tr" | "en";
};

type Accent =
  | "blue"
  | "emerald"
  | "violet"
  | "cyan"
  | "amber"
  | "rose"
  | "slate";

export default function LocalizedFeaturedTools({ locale }: Props) {
  const isTurkish = locale === "tr";

  const tools: Array<{
    title: string;
    description: string;
    type: string;
    href: string;
    available: boolean;
    icon: ReactNode;
    label: string;
    accent: Accent;
    features: string[];
    meta: string;
    progress?: number;
  }> = [
    {
      title: isTurkish
        ? "Risk Matrisi Hesaplayıcı"
        : "Risk Matrix Calculator",
      description: isTurkish
        ? "Profesyonel 5×5 risk matrisi ile tehlikeleri değerlendirin ve risk seviyesini saniyeler içinde belirleyin."
        : "Assess workplace hazards using a professional 5×5 matrix and determine risk levels in seconds.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/risk-matrix",
      available: true,
      icon: <Calculator size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      label: isTurkish ? "En Popüler" : "Most Popular",
      accent: "blue",
      features: isTurkish
        ? ["Anında sonuç", "5×5 risk matrisi", "Ücretsiz kullanım"]
        : ["Instant result", "5×5 risk matrix", "Free to use"],
      meta: isTurkish ? "2 dakika" : "2 min",
    },
    {
      title: "TRIR Calculator",
      description: isTurkish
        ? "Toplam Kaydedilebilir Olay Oranını doğru formül ve çalışma saati verileriyle hesaplayın."
        : "Calculate Total Recordable Incident Rate using working-hour and incident data.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/trir",
      available: true,
      icon: <Calculator size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      label: isTurkish ? "Ücretsiz" : "Free",
      accent: "emerald",
      features: isTurkish
        ? ["OSHA formülü", "Anında hesaplama", "Kolay kullanım"]
        : ["OSHA formula", "Instant calculation", "Simple workflow"],
      meta: isTurkish ? "1 dakika" : "1 min",
    },
    {
      title: "LTIFR Calculator",
      description: isTurkish
        ? "Kayıp zamanlı yaralanmaların sıklık oranını profesyonel HSE metodolojisiyle hesaplayın."
        : "Calculate Lost Time Injury Frequency Rate using professional HSE methodology.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/ltifr",
      available: true,
      icon: "📈",
      label: isTurkish ? "Önerilen" : "Recommended",
      accent: "violet",
      features: isTurkish
        ? ["Hızlı hesaplama", "Net sonuç", "Ücretsiz erişim"]
        : ["Fast calculation", "Clear result", "Free access"],
      meta: isTurkish ? "1 dakika" : "1 min",
    },
    {
      title: isTurkish
        ? "Şiddet Oranı Hesaplayıcı"
        : "Severity Rate Calculator",
      description: isTurkish
        ? "Kayıp iş günü verilerini kullanarak olayların operasyonel etkisini ve yaralanma şiddetini ölçün."
        : "Measure injury severity and operational impact using lost-workday data.",
      type: isTurkish ? "Hesaplayıcı" : "Calculator",
      href: "/tools/severity-rate",
      available: true,
      icon: "📉",
      label: isTurkish ? "Ücretsiz" : "Free",
      accent: "cyan",
      features: isTurkish
        ? ["Kayıp gün analizi", "Hızlı sonuç", "HSE performansı"]
        : ["Lost-day analysis", "Fast result", "HSE performance"],
      meta: isTurkish ? "1 dakika" : "1 min",
    },
    {
      title: isTurkish ? "İskele Denetimi" : "Scaffold Inspection",
      description: isTurkish
        ? "İskele erişimi, platform, korkuluk, etiketleme ve yapısal güvenlik kontrollerini tamamlayın."
        : "Complete scaffold access, platform, guardrail, tagging and structural checks.",
      type: isTurkish ? "Kontrol Listesi" : "Checklist",
      href: "/checklists/scaffold",
      available: true,
      icon: "🏗️",
      label: isTurkish ? "Hazır" : "Ready",
      accent: "amber",
      features: isTurkish
        ? ["Saha denetimi", "Kritik kontroller", "Mobil uyumlu"]
        : ["Site inspection", "Critical controls", "Mobile friendly"],
      meta: isTurkish ? "2 dakika" : "2 min",
    },
    {
      title: isTurkish
        ? "Sıcak İş Kontrol Listesi"
        : "Hot Work Checklist",
      description: isTurkish
        ? "Sıcak çalışma izni, yangın gözcüsü, gaz ölçümü ve kıvılcım kontrollerini doğrulayın."
        : "Verify hot-work permits, fire watch, gas testing and spark-control requirements.",
      type: isTurkish ? "Kontrol Listesi" : "Checklist",
      href: "/checklists/hot-work",
      available: true,
      icon: "🔥",
      label: isTurkish ? "Hazır" : "Ready",
      accent: "rose",
      features: isTurkish
        ? ["Permit kontrolü", "Yangın önlemleri", "Stop-work koşulları"]
        : ["Permit checks", "Fire prevention", "Stop-work conditions"],
      meta: isTurkish ? "2 dakika" : "2 min",
    },
    {
      title: isTurkish
        ? "Toolbox Talk Şablonu"
        : "Toolbox Talk Template",
      description: isTurkish
        ? "Ekibinizle paylaşabileceğiniz düzenli, profesyonel ve sahaya hazır toolbox içerikleri oluşturun."
        : "Create structured, professional and site-ready toolbox-talk documents.",
      type: isTurkish ? "Şablon" : "Template",
      href: "/templates",
      available: false,
      icon: <FileText size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      label: isTurkish ? "Planlandı" : "Planned",
      accent: "slate",
      features: isTurkish
        ? ["Hazır format", "Ekip bilgilendirme", "Profesyonel çıktı"]
        : ["Ready format", "Team briefing", "Professional output"],
      meta: isTurkish ? "Planlandı" : "Planned",
      progress: 65,
    },
  ];

  const accentStyles: Record<
    Accent,
    {
      icon: string;
      line: string;
      shadow: string;
      pill: string;
      dot: string;
    }
  > = {
    blue: {
      icon: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
      line: "from-blue-600 to-cyan-400",
      shadow: "hover:shadow-blue-500/15",
      pill: "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20",
      line: "from-emerald-500 to-teal-400",
      shadow: "hover:shadow-emerald-500/15",
      pill: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
    },
    violet: {
      icon: "bg-violet-500/10 text-violet-600 ring-violet-500/20",
      line: "from-violet-500 to-fuchsia-400",
      shadow: "hover:shadow-violet-500/15",
      pill: "bg-violet-100 text-violet-700",
      dot: "bg-violet-500",
    },
    cyan: {
      icon: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20",
      line: "from-cyan-500 to-blue-400",
      shadow: "hover:shadow-cyan-500/15",
      pill: "bg-cyan-100 text-cyan-700",
      dot: "bg-cyan-500",
    },
    amber: {
      icon: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
      line: "from-amber-500 to-orange-400",
      shadow: "",
      pill: "bg-amber-100 text-amber-700",
      dot: "bg-amber-500",
    },
    rose: {
      icon: "bg-rose-500/10 text-rose-600 ring-rose-500/20",
      line: "from-rose-500 to-orange-400",
      shadow: "",
      pill: "bg-rose-100 text-rose-700",
      dot: "bg-rose-500",
    },
    slate: {
      icon: "bg-slate-500/10 text-slate-600 ring-slate-500/20",
      line: "from-slate-500 to-slate-300",
      shadow: "",
      pill: "bg-slate-200 text-slate-700",
      dot: "bg-slate-400",
    },
  };

  const categories = [
    {
      icon: <ShieldCheck size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "AI Copilot" : "AI Copilot",
      description: isTurkish
        ? "Profesyonel HSE rehberliği"
        : "Professional HSE guidance",
      href: `/${locale}/ai-assistant`,
    },
    {
      icon: <Calculator size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "Hesaplayıcılar" : "Calculators",
      description: isTurkish ? "Hızlı HSE hesaplamaları" : "Fast HSE calculations",
      href: `/${locale}/tools`,
    },
    {
      icon: <BookOpen size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "Bilgi Merkezi" : "Knowledge Base",
      description: isTurkish ? "Profesyonel rehberler" : "Professional guides",
      href: `/${locale}/knowledge-base`,
    },
    {
      icon: <ClipboardCheck size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "Kontrol Listeleri" : "Checklists",
      description: isTurkish ? "Saha kontrolleri" : "Site-ready inspections",
      href: `/${locale}/checklists`,
    },
    {
      icon: <FileText size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "Şablonlar" : "Templates",
      description: isTurkish ? "Hazır HSE dokümanları" : "Ready HSE documents",
      href: `/${locale}/templates`,
    },
    {
      icon: <BriefcaseBusiness size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "Toolbox Kütüphanesi" : "Toolbox Library",
      description: isTurkish
        ? "20 profesyonel Toolbox Talk"
        : "20 professional Toolbox Talks",
      href: `/${locale}/toolbox`,
    },
    {
      icon: <Image size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "Güvenlik Posterleri" : "Safety Posters",
      description: isTurkish
        ? "Yazdırılabilir profesyonel HSE posterleri"
        : "Printable professional HSE posters",
      href: `/${locale}/poster-lab`,
    },
    {
      icon: <TriangleAlert size={36}
        strokeWidth={2.1}
        className="text-blue-600 transition-transform duration-300 group-hover:scale-110" />,
      title: isTurkish ? "Güvenlik Levhaları" : "Safety Signs",
      description: isTurkish
        ? "36 profesyonel ISO güvenlik levhası"
        : "36 professional ISO safety signs",
      href: `/${locale}/safety-signs`,
    },

  ];

  return (
    <section id="tools" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-100/80 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-[520px] h-[420px] w-[420px] rounded-full bg-emerald-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600">
              {isTurkish
                ? "Profesyonel HSE Araç Seti"
                : "Professional HSE Toolkit"}
            </p>

            <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-6xl">
              {isTurkish
                ? "Daha güvenli işler için ihtiyacınız olan her şey."
                : "Everything you need for safer work."}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {isTurkish
                ? "AI destekli rehberlik, profesyonel hesaplayıcılar, kontrol listeleri, şablonlar ve saha kaynakları tek platformda."
                : "AI-powered guidance, professional calculators, checklists, templates and practical resources in one platform."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                isTurkish ? "AI Copilot" : "AI Copilot",
                isTurkish ? "Profesyonel Rehberler" : "Professional Guides",
                isTurkish ? "Saha Kontrol Listeleri" : "Site Checklists",
                isTurkish ? "Ücretsiz Hesaplayıcılar" : "Free Calculators",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
                >
                  <span className="text-emerald-500">✓</span>
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/ai-assistant`}
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                {isTurkish ? "AI Copilot'u Keşfet" : "Explore AI Copilot"}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href={`/${locale}/tools`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
              >
                {isTurkish ? "Tüm Araçlar" : "View All Tools"}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                value: "35+",
                label: isTurkish ? "Profesyonel Araç" : "Professional Tools",
              },
              {
                value: "100+",
                label: isTurkish ? "Bilgi Kaynağı" : "Knowledge Resources",
              },
              {
                value: "AI",
                label: isTurkish ? "Destekli" : "Powered",
              },
              {
                value: "Free",
                label: isTurkish ? "Ücretsiz Erişim" : "Free Access",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[26px] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <p className="text-3xl font-black text-slate-950 transition-colors duration-300 group-hover:text-blue-600">{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-[32px] border border-blue-200 bg-slate-950 p-7 text-white shadow-2xl shadow-blue-500/10 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-300">
                  SafeBase AI Copilot
                </span>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                  ● {isTurkish ? "Aktif" : "Live"}
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                {isTurkish
                  ? "HSE sorularınızı profesyonel analize dönüştürün."
                  : "Turn HSE questions into professional analysis."}
              </h3>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                {isTurkish
                  ? "Risk seviyesini, kritik kontrolleri, KKD gereksinimlerini, izinleri ve ilgili SafeBase kaynaklarını tek cevapta görün."
                  : "Review risk levels, critical controls, PPE, permits and related SafeBase resources in one response."}
              </p>

              <Link
                href={`/${locale}/ai-assistant`}
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-black text-white transition hover:bg-blue-500"
              >
                {isTurkish ? "AI'a Soru Sor" : "Ask SafeBase AI"}
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                isTurkish ? "Risk Özeti" : "Risk Summary",
                isTurkish ? "Kritik Kontroller" : "Critical Controls",
                isTurkish ? "KKD ve İzinler" : "PPE and Permits",
                isTurkish ? "İlgili Kaynaklar" : "Related Resources",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                >
                  <p className="flex items-center gap-2 text-sm font-bold text-slate-200">
                    <span className="text-emerald-400">✓</span>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
                {isTurkish ? "Hızlı Erişim" : "Quick Access"}
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-950 transition-colors duration-300 group-hover:text-blue-600">
                {isTurkish
                  ? "SafeBase ile neler yapabilirsiniz?"
                  : "What can you do with SafeBase?"}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl transition-all duration-300 hover:shadow-blue-950/5 min-h-[180px]"
              >
                <span className="text-3xl">{category.icon}</span>
                <p className="mt-4 font-black text-slate-950 transition-colors duration-300 group-hover:text-blue-600 group-hover:text-blue-600">
                  {category.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              {isTurkish ? "Öne Çıkan Araçlar" : "Featured Tools"}
            </p>
            <h3 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              {isTurkish
                ? "Günlük HSE çalışmalarınız için hazır."
                : "Ready for everyday HSE work."}
            </h3>
          </div>

          <Link
            href={`/${locale}/tools`}
            className="group inline-flex w-fit items-center gap-2 font-black text-blue-600"
          >
            {isTurkish ? "Tüm araçları görüntüle" : "View all tools"}
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const styles = accentStyles[tool.accent];

            const cardContent = (
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border bg-slate-50 p-7 transition duration-300 ${
                  tool.available
                    ? `border-slate-200 hover:-translate-y-2 hover:border-blue-200 hover:bg-white hover:shadow-2xl ${styles.shadow}`
                    : "border-slate-200"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.line} ${
                    tool.available
                      ? "opacity-0 transition group-hover:opacity-100"
                      : "opacity-40"
                  }`}
                />

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ring-1 transition duration-300 ${styles.icon} ${
                      tool.available ? "group-hover:scale-110" : ""
                    }`}
                  >
                    {tool.icon}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      tool.available
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {tool.label}
                  </span>
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${styles.pill}`}
                  >
                    {tool.type}
                  </span>

                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        tool.available
                          ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                          : styles.dot
                      }`}
                    />
                    {tool.available
                      ? isTurkish
                        ? "Aktif"
                        : "Live"
                      : tool.meta}
                  </span>
                </div>

                <h4 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
                  {tool.title}
                </h4>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {tool.description}
                </p>

                <div className="mt-6 space-y-3">
                  {tool.features.map((feature) => (
                    <p
                      key={feature}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-500"
                    >
                      <span className="text-emerald-500">✓</span>
                      {feature}
                    </p>
                  ))}
                </div>

                {!tool.available && tool.progress !== undefined && (
                  <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between text-xs font-black text-slate-500">
                      <span>
                        {isTurkish ? "Geliştirme Durumu" : "Development Progress"}
                      </span>
                      <span>{tool.progress}%</span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${styles.line}`}
                        style={{ width: `${tool.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-auto border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-slate-400">
                      {tool.meta}
                    </span>

                    <span
                      className={`inline-flex items-center gap-2 font-black transition ${
                        tool.available
                          ? "text-blue-600 group-hover:gap-3"
                          : "text-slate-400"
                      }`}
                    >
                      {tool.available
                        ? tool.type ===
                          (isTurkish ? "Kontrol Listesi" : "Checklist")
                          ? isTurkish
                            ? "Kontrol Listesini Aç"
                            : "Open Checklist"
                          : isTurkish
                            ? "Aracı Aç"
                            : "Open Tool"
                        : isTurkish
                          ? "Yakında"
                          : "Coming Soon"}
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </article>
            );

            if (!tool.available) {
              return <div key={tool.title}>{cardContent}</div>;
            }

            return (
              <Link
                key={tool.title}
                href={`/${locale}${tool.href}`}
                className="block h-full"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-[30px] border border-slate-200 bg-slate-50 px-7 py-8 sm:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
                {isTurkish ? "Her Ay Büyüyor" : "Growing Every Month"}
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-950 transition-colors duration-300 group-hover:text-blue-600">
                {isTurkish
                  ? "Yeni HSE araçları ve kaynakları düzenli olarak ekleniyor."
                  : "New HSE tools and resources are added regularly."}
              </h3>
              <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                {isTurkish
                  ? "SafeBase, günlük saha ihtiyaçlarını karşılayan profesyonel bir HSE çalışma platformuna dönüşüyor."
                  : "SafeBase is becoming a professional HSE workspace built for everyday site needs."}
              </p>
            </div>

            <Link
              href={`/${locale}/knowledge-base`}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-blue-600"
            >
              {isTurkish ? "Bilgi Merkezini Aç" : "Open Knowledge Base"}
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
