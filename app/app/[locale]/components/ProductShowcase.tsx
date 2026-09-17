import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "../../../i18n/navigation";
import s from "./homepage.module.css";

type Props = { locale: "tr" | "en" };

export default function ProductShowcase({ locale }: Props) {
  const tr = locale === "tr";
  const products = [
    ["/checklists", tr ? "Kontrol Listeleri / Denetimler" : "Checklists / Inspections", tr ? "SAHADA DOĞRULA" : "VERIFY IN THE FIELD"],
    ["/toolbox", tr ? "Toolbox Konuşmaları" : "Toolbox Talks", tr ? "EKİBİ BİLGİLENDİR" : "BRIEF THE CREW"],
    ["/tools/method-statement", "Method Statements", tr ? "YÖNTEMİ TANIMLA" : "DEFINE THE METHOD"],
  ];
  return <section className={`${s.section} ${s.toolkit}`} aria-labelledby="products-title"><div className={s.container}>
    <div className={s.sectionHeading} data-reveal><div><p className={s.eyebrow}>02 / HSE TOOLKIT</p><h2 id="products-title">{tr ? "İş değişir." : "The work changes."}<br/><em>{tr ? "Araçlarınız hazır." : "Your toolkit is ready."}</em></h2></div><p>{tr ? "Mühendisler, HSE uzmanları ve saha süpervizörleri için. Planlamadan saha uygulamasına, işin her aşamasına uygun araçlar." : "For engineers, HSE professionals and site supervisors. A purposeful set of tools, from planning through field execution."}</p></div>
    <div className={s.toolkitSystem} data-reveal><Link href="/tools/quick-risk-assessment" className={s.toolkitFeature}><div className={s.toolkitFeatureTop}><span className={s.eyebrow}>01 / HIRARC</span><ArrowUpRight size={25}/></div><ShieldCheck className={s.toolkitIcon} size={100} strokeWidth={.65}/><div><h3>{tr ? "Risk Analizi" : "Risk Assessment"}</h3><p>{tr ? "Tehlikeleri tanımlayın. Kontrolleri geliştirin. Kalan riski değerlendirin." : "Identify the hazards. Define the controls. Evaluate residual risk."}</p><span className={s.toolkitFeatureLink}>{tr ? "Risk analizi oluştur" : "Build risk assessment"}<ArrowUpRight size={17}/></span></div><div className={s.toolkitSchematic} aria-hidden="true"><span>H</span><i/><span>R</span><i/><span>C</span></div></Link><div className={s.toolkitRail}>{products.map(([href,title,detail],i)=><Link href={href} key={href}><span className={s.railNumber}>0{i+2}</span><div><span className={s.eyebrow}>{detail}</span><h3>{title}</h3></div><ArrowUpRight size={22}/></Link>)}</div></div>
    <div className={s.resourceRail}>{[["/tools",tr ? "HSE Hesaplayıcıları" : "HSE Calculators"],["/posters",tr ? "Güvenlik Posterleri" : "Safety Posters"],["/safety-signs",tr ? "Güvenlik İşaretleri" : "Safety Signs"],["/knowledge-base",tr ? "Bilgi Merkezi" : "Knowledge Base"],["/downloads",tr ? "Kaynaklar" : "Resources"]].map(([href,label])=><Link href={href} key={href}>{label}<ArrowUpRight size={15}/></Link>)}</div>
  </div></section>;
}
