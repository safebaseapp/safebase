import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "../../../i18n/navigation";
import s from "./homepage.module.css";

type Props = { locale: "tr" | "en" };

type ProductItem = {
  href: string;
  title: string;
  detail: string;
  description: string;
};

export default function ProductShowcase({ locale }: Props) {
  const tr = locale === "tr";

  const products: ProductItem[] = [
    {
      href: "/checklists",
      title: tr ? "Kontrol Listeleri / Denetimler" : "Checklists / Inspections",
      detail: tr ? "SAHADA DOĞRULA" : "VERIFY IN THE FIELD",
      description: tr ? "Saha koşullarını kontrol edin ve bulguları sistematik kaydedin." : "Verify field conditions and record findings in a structured workflow.",
    },
    {
      href: "/toolbox",
      title: tr ? "Toolbox Konuşmaları" : "Toolbox Talks",
      detail: tr ? "EKİBİ BİLGİLENDİR" : "BRIEF THE CREW",
      description: tr ? "Sahaya hazır toolbox içeriklerini açın, önizleyin ve hesabınızla PDF indirin." : "Open field-ready toolbox content, preview it and download PDFs with your account.",
    },
    {
      href: "/tools/method-statement",
      title: "Method Statements",
      detail: tr ? "YÖNTEMİ TANIMLA" : "DEFINE THE METHOD",
      description: tr ? "İş adımlarını, kontrolleri ve sorumlulukları düzenli bir yönteme dönüştürün." : "Turn work steps, controls and responsibilities into a clear method statement.",
    },
    {
      href: "/hse-performance",
      title: "HSE Performance",
      detail: tr ? "PERFORMANSI İZLE" : "TRACK PERFORMANCE",
      description: tr ? "TRIR, LTIFR, olay kayıtları ve saha gözlemlerini tek görünümde takip edin." : "Track TRIR, LTIFR, incidents and field observations in one performance view.",
    },
    {
      href: "/ai-assistant",
      title: tr ? "HSE AI Asistan" : "HSE AI Assistant",
      detail: tr ? "SOR · İNCELE · GELİŞTİR" : "ASK · REVIEW · IMPROVE",
      description: tr ? "HSE sorularında ve saha değerlendirmelerinde yapılandırılmış destek alın." : "Get structured support for HSE questions and field assessments.",
    },
    {
      href: "/downloads",
      title: tr ? "İndirme Merkezi" : "Download Center",
      detail: tr ? "KAYNAĞI KULLAN" : "USE THE RESOURCE",
      description: tr ? "Poster, levha, şablon ve profesyonel saha kaynaklarına ulaşın." : "Access posters, signs, templates and professional field resources.",
    },
  ];

  return (
    <section className={`${s.section} ${s.toolkit}`} aria-labelledby="products-title">
      <div className={s.container}>
        <div className={s.sectionHeading} data-reveal>
          <div>
            <p className={s.eyebrow}>02 / HSE TOOLKIT</p>
            <h2 id="products-title">
              {tr ? "İş değişir." : "The work changes."}<br />
              <em>{tr ? "Araçlarınız hazır." : "Your toolkit is ready."}</em>
            </h2>
          </div>
          <p>
            {tr
              ? "Sadece tanıtım kartları değil. Her modül doğrudan çalışan SERNEM aracına gider; planlamadan saha uygulamasına kadar tek akışta ilerleyin."
              : "Not placeholder cards. Every module opens a working SERNEM feature, connecting planning, field execution and reporting in one flow."}
          </p>
        </div>

        <div className={s.toolkitSystem} data-reveal>
          <Link href="/tools/quick-risk-assessment" className={s.toolkitFeature}>
            <div className={s.toolkitFeatureTop}>
              <span className={s.eyebrow}>01 / HIRARC</span>
              <ArrowUpRight size={25} />
            </div>
            <ShieldCheck className={s.toolkitIcon} size={100} strokeWidth={0.65} />
            <div>
              <h3>{tr ? "Risk Analizi" : "Risk Assessment"}</h3>
              <p>
                {tr
                  ? "Tehlikeleri tanımlayın. Kontrolleri geliştirin. Kalan riski değerlendirin."
                  : "Identify the hazards. Define the controls. Evaluate residual risk."}
              </p>
              <span className={s.toolkitFeatureLink}>
                {tr ? "Risk analizi oluştur" : "Build risk assessment"}
                <ArrowUpRight size={17} />
              </span>
            </div>
            <div className={s.toolkitSchematic} aria-hidden="true">
              <span>H</span><i /><span>R</span><i /><span>C</span>
            </div>
          </Link>

          <div className={s.toolkitRail}>
            {products.slice(0, 3).map((item, i) => (
              <Link href={item.href} key={item.href} title={item.description}>
                <span className={s.railNumber}>0{i + 2}</span>
                <div>
                  <span className={s.eyebrow}>{item.detail}</span>
                  <h3>{item.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-400">{item.description}</p>
                </div>
                <ArrowUpRight size={22} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3" data-reveal>
          {products.slice(3).map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black tracking-[0.18em] text-slate-400">{item.detail}</span>
                  <h3 className="mt-2 text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                </div>
                <ArrowUpRight className="shrink-0 text-slate-400 transition group-hover:text-white" size={20} />
              </div>
            </Link>
          ))}
        </div>

        <div className={s.resourceRail}>
          {[
            ["/how-it-works", tr ? "Nasıl Çalışır?" : "How it works"],
            ["/tools", tr ? "HSE Hesaplayıcıları" : "HSE Calculators"],
            ["/posters", tr ? "Güvenlik Posterleri" : "Safety Posters"],
            ["/safety-signs", tr ? "Güvenlik İşaretleri" : "Safety Signs"],
            ["/knowledge-base", tr ? "Bilgi Merkezi" : "Knowledge Base"],
            ["/upgrade", "SERNEM Premium"],
          ].map(([href, label]) => (
            <Link href={href} key={href}>
              {label}<ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
