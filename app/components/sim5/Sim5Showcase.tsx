"use client";
import Image from "next/image";
import showcaseImage from "./showcase-image";
import {useEffect,useRef} from "react";
import {ArrowUpRight,MoveUpRight,ScanLine} from "lucide-react";
import {trackEvent} from "@/lib/analytics";
import Sim5PromoLink from "./Sim5PromoLink";
import s from "./sim5-showcase.module.css";
export default function Sim5Showcase({locale}:{locale:"tr"|"en"}) {
 const tr=locale==="tr",root=useRef<HTMLElement>(null),fired=useRef(false);
 useEffect(()=>{
  const el=root.current;if(!el||typeof IntersectionObserver==="undefined")return;
  const observer=new IntersectionObserver(entries=>{if(!fired.current&&entries.some(e=>e.isIntersecting)){fired.current=true;trackEvent("sim5_showcase_view",{locale,surface:"homepage"});observer.disconnect();}},{threshold:.25});observer.observe(el);return()=>observer.disconnect();
 },[locale]);
 return <section ref={root} className={s.showcase} data-sim5-home-showcase aria-labelledby="sim5-showcase-title">
  <div className={s.inner}>
   <div className={s.copy}>
    <p className={s.eyebrow}><ScanLine size={16} aria-hidden="true"/> SERNEM / {tr?"ETKİLEŞİMLİ HSE EĞİTİMİ":"INTERACTIVE HSE TRAINING"}</p>
    <h2 id="sim5-showcase-title">SERNEM <span>SIM 5.0</span></h2>
    <p className={s.headline}>{tr?"Sahaya gir. Tehlikeleri keşfet. Doğru kararı ver.":"Enter the site. Discover the hazards. Make the right call."}</p>
    <p className={s.description}>{tr?"Gerçek endüstriyel tesis modelleriyle oluşturulmuş 3D eğitim sahasında yürü. Kaynak ve kaldırma operasyonlarını değerlendir, tank merdivenlerine çık, yüksekte çalışma risklerini keşfet ve güvenlik kararlarının sahadaki sonuçlarını gör.":"Walk a 3D training site built from real industrial facility models. Assess welding and lifting operations, climb the tank access stairs, identify work-at-height hazards and see how your safety decisions affect the site."}</p>
    <ul className={s.features}>{(tr?["3D Endüstriyel Saha","6 HSE Bulgusu · Premium","Kaynak ve Kaldırma","Yüksekte Çalışma","Etkileşimli Güvenlik Kararları","TR / EN","Masaüstü ve Mobil"]:["3D Industrial Site","6 HSE Findings · Premium","Welding & Lifting","Work at Height","Interactive Safety Decisions","TR / EN","Desktop & Mobile"]).map(f=><li key={f}>{f}</li>)}</ul>
    <div className={s.actions}><Sim5PromoLink locale={locale} kind="demo" surface="homepage" className={s.primary}>{tr?"Ücretsiz Demo Oyna":"Play Free Demo"}<ArrowUpRight size={18} aria-hidden="true"/></Sim5PromoLink><Sim5PromoLink locale={locale} kind="premium" surface="homepage" className={s.secondary}>{tr?"Premium Simülasyonu Başlat":"Start Premium Simulation"}<MoveUpRight size={16} aria-hidden="true"/></Sim5PromoLink></div>
    <p className={s.note}>{tr?"Ücretsiz DEMO: kaynak + kaldırma, kayıt gerekmez. Premium: altı bulgulu tam denetim ve performans geçmişi.":"Free DEMO: welding + lifting, no sign-in required. Premium: the full six-finding inspection and performance history."}</p>
   </div>
   <figure className={s.visual}><div className={s.imageFrame}><Image src={showcaseImage} fill sizes="(max-width: 1000px) 100vw, 60vw" alt={tr?"SIM 5.0 sahasının kuş bakışı görünümü: tesis yolu, fabrika, mobil vinç ve depolama tankları":"Bird’s-eye view of the SIM 5.0 site: access road, factory, mobile crane and storage tanks"}/></div><figcaption><span>{tr?"GERÇEK SİMÜLASYON SAHASI":"ACTUAL SIMULATION SITE"}</span><span>WELDING / LIFTING / TANK ACCESS</span></figcaption></figure>
  </div>
 </section>;
}
