import type { Metadata } from "next";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    locale: "tr" | "en";
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  return {
    title: isTurkish ? "Hakkımızda" : "About",
    description: isTurkish
      ? "SERNEM'in amacı, yaklaşımı ve HSE profesyonelleri için geliştirdiği dijital iş güvenliği platformu hakkında bilgi edinin."
      : "Learn about SERNEM, our approach, and the digital HSE platform built for safety professionals.",
    alternates: {
      canonical: `https://www.sernem.com/${locale}/about`,
      languages: {
        tr: "https://www.sernem.com/tr/about",
        en: "https://www.sernem.com/en/about",
      },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const content = isTurkish
    ? {
        eyebrow: "SERNEM HAKKINDA",
        title: "HSE çalışmalarını daha düzenli, hızlı ve erişilebilir hale getiriyoruz.",
        intro:
          "SERNEM; iş sağlığı, güvenliği ve çevre profesyonellerinin günlük çalışmalarında ihtiyaç duyduğu araçları, dokümanları ve pratik kaynakları tek bir dijital platformda bir araya getirmek için geliştirildi.",
        missionTitle: "Amacımız",
        mission:
          "Risk değerlendirmesinden Method Statement hazırlamaya, saha kontrol listelerinden Toolbox Talk içeriklerine ve HSE hesaplayıcılarına kadar günlük süreçleri sadeleştiren, profesyonel ve kullanımı kolay bir çalışma alanı sunmak.",
        approachTitle: "Nasıl yaklaşıyoruz?",
        approach:
          "SERNEM'i yalnızca bir doküman kütüphanesi olarak değil, HSE profesyonelinin iş akışına eşlik eden bir platform olarak geliştiriyoruz. Hazır içerikleri, yapılandırılmış araçları ve dijital üretim özelliklerini aynı sistem içinde birleştiriyoruz.",
        audienceTitle: "Kimler için?",
        audience:
          "HSE uzmanları, iş güvenliği profesyonelleri, saha yöneticileri, mühendisler, denetim ekipleri, yükleniciler ve operasyonel güvenlik süreçlerinde aktif rol alan profesyoneller için.",
        platformTitle: "Platformda neler var?",
        items: [
          "Risk Assessment ve HIRARC araçları",
          "Method Statement oluşturma araçları",
          "HSE KPI ve performans hesaplayıcıları",
          "Saha denetim kontrol listeleri",
          "Toolbox Talk içerikleri",
          "Profesyonel PDF ve doküman çıktıları",
          "HSE bilgi kaynakları ve rehberler",
          "Yapay zekâ destekli HSE araçları",
        ],
        responsibilityTitle: "Profesyonel kullanım",
        responsibility:
          "SERNEM, profesyonellerin çalışmalarını desteklemek üzere geliştirilmiştir. Platform tarafından sağlanan şablonlar, hesaplamalar ve içerikler; yürürlükteki mevzuatın, şirket prosedürlerinin, saha koşullarının veya yetkin bir profesyonelin değerlendirmesinin yerine geçmez. Kullanıcıların çıktıları kendi operasyonlarına ve geçerli gerekliliklere göre doğrulaması gerekir.",
        directionTitle: "Nereye gidiyoruz?",
        direction:
          "Hedefimiz, risk değerlendirmesi, iş metodu, denetim, Toolbox Talk, raporlama ve doküman yönetimini birbirine bağlayan kapsamlı bir HSE çalışma platformu oluşturmak.",
        ctaTitle: "SERNEM'i keşfedin",
        ctaText:
          "Araçları kullanmaya başlayın ve HSE çalışmalarınızı tek platform üzerinden yönetin.",
        button: "Araçları Gör",
      }
    : {
        eyebrow: "ABOUT SERNEM",
        title: "Making HSE work more structured, efficient and accessible.",
        intro:
          "SERNEM was built to bring together the tools, documents and practical resources that health, safety and environment professionals use in their daily work — within one digital platform.",
        missionTitle: "Our purpose",
        mission:
          "To provide a professional and easy-to-use workspace that simplifies everyday HSE processes, from risk assessments and method statements to field inspections, toolbox talks and safety performance calculations.",
        approachTitle: "Our approach",
        approach:
          "SERNEM is being developed as more than a document library. Our goal is to support the actual workflow of HSE professionals by combining structured tools, ready-to-use resources and digital document capabilities in one system.",
        audienceTitle: "Who is SERNEM for?",
        audience:
          "HSE professionals, safety practitioners, site managers, engineers, inspection teams, contractors and professionals involved in operational safety management.",
        platformTitle: "What does the platform include?",
        items: [
          "Risk Assessment and HIRARC tools",
          "Method Statement creation tools",
          "HSE KPI and performance calculators",
          "Field inspection checklists",
          "Toolbox Talk resources",
          "Professional PDF and document outputs",
          "HSE knowledge resources and guides",
          "AI-assisted HSE tools",
        ],
        responsibilityTitle: "Professional use",
        responsibility:
          "SERNEM is designed to support professional work. Templates, calculations and content provided by the platform do not replace applicable legislation, company procedures, site-specific requirements or competent professional judgement. Users should verify outputs against their own operational conditions and applicable requirements.",
        directionTitle: "Where we are going",
        direction:
          "Our goal is to build a comprehensive HSE workspace connecting risk assessment, work methods, inspections, toolbox talks, reporting and document management.",
        ctaTitle: "Explore SERNEM",
        ctaText:
          "Start using the tools and manage your HSE work from one platform.",
        button: "Explore Tools",
      };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="text-sm font-black tracking-[0.2em] text-blue-400">
              {content.eyebrow}
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [content.missionTitle, content.mission],
            [content.approachTitle, content.approach],
            [content.audienceTitle, content.audience],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
            >
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm font-black tracking-[0.16em] text-blue-400">
              SERNEM
            </div>
            <h2 className="mt-3 text-3xl font-black">
              {content.platformTitle}
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {content.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 text-sm font-semibold text-slate-200"
              >
                <span className="mr-2 text-blue-400">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.04] p-8">
            <h2 className="text-2xl font-black">
              {content.responsibilityTitle}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {content.responsibility}
            </p>
          </div>

          <div className="rounded-3xl border border-blue-400/15 bg-blue-500/[0.05] p-8">
            <h2 className="text-2xl font-black">{content.directionTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {content.direction}
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.035] p-8 md:flex md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="text-2xl font-black">{content.ctaTitle}</h2>
            <p className="mt-2 text-slate-400">{content.ctaText}</p>
          </div>

          <Link
            href={`/${locale}/tools`}
            className="mt-6 inline-flex rounded-xl bg-blue-500 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-400 md:mt-0"
          >
            {content.button} →
          </Link>
        </div>
      </section>
    </main>
  );
}
