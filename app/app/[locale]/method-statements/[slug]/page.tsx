import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMethodExample, methodExamples } from "@/lib/content/methodExamples";
type Params={ params:Promise<{locale:string;slug:string}> };
const base="https://www.sernem.com";
export function generateStaticParams(){
 return ["tr","en"].flatMap(locale=>methodExamples.map(example=>({locale,slug:example.slug})));
}
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {locale,slug}=await params; if(locale!=="tr"&&locale!=="en") return {robots:{index:false}};
 const example=getMethodExample(slug);if(!example) return {robots:{index:false}};
 const canonical=`${base}/${locale}/method-statements/${slug}`;
 return {
  title:`${example.title[locale]} | SERNEM`,
  description:example.description[locale],
  alternates:{canonical,languages:{tr:`${base}/tr/method-statements/${slug}`,en:`${base}/en/method-statements/${slug}`,"x-default":`${base}/en/method-statements/${slug}`}},
  openGraph:{title:example.title[locale],description:example.description[locale],url:canonical,type:"article",siteName:"SERNEM",locale:locale==="tr"?"tr_TR":"en_US",alternateLocale:[locale==="tr"?"en_US":"tr_TR"]},
 };
}
export default async function MethodExamplePage({params}:Params){
 const {locale,slug}=await params; if(locale!=="tr"&&locale!=="en") notFound();
 const e=getMethodExample(slug); if(!e) notFound();
 const tr=locale==="tr",canonical=`${base}/${locale}/method-statements/${e.slug}`;
 const articleSchema={"@context":"https://schema.org","@type":"TechArticle",headline:e.title[locale],description:e.description[locale],inLanguage:locale,url:canonical,mainEntityOfPage:canonical,isAccessibleForFree:true,about:e.category[locale],publisher:{"@type":"Organization",name:"SERNEM",url:base},citation:e.refs.map(ref=>({"@type":"CreativeWork",name:ref.title,url:ref.url}))};
 const breadcrumbSchema={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
  {"@type":"ListItem",position:1,name:"SERNEM",item:`${base}/${locale}`},
  {"@type":"ListItem",position:2,name:tr?"Çalışma Metodu Örnekleri":"Method Statement Examples",item:`${base}/${locale}/method-statements`},
  {"@type":"ListItem",position:3,name:e.title[locale],item:canonical}
 ]};
 return <main className="min-h-screen bg-slate-950 text-white">
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([articleSchema,breadcrumbSchema]).replace(/</g,"\\u003c")}}/>
   <article className="mx-auto max-w-5xl px-5 py-12">
     <nav aria-label={tr?"İçerik yolu":"Breadcrumb"} className="text-sm">
       <Link href={`/${locale}/method-statements`} className="text-sky-300 underline underline-offset-4">{tr?"← Çalışma metodu örnekleri":"← Method statement examples"}</Link>
     </nav>
     <p className="mt-9 text-xs font-bold uppercase tracking-widest text-emerald-300">{e.category[locale]} · SERNEM</p>
     <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{e.title[locale]}</h1>
     <p className="mt-5 text-lg leading-8 text-slate-300">{e.intro[locale]}</p>
     <div className="mt-7 rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm leading-7 text-amber-100">
       <strong className="block">{tr?"Örnek doküman — iş izni değildir":"Illustrative work method — not a permit"}</strong>
       {tr?"Sahaya özgü izin, risk değerlendirmesi, onaylı prosedür, yetkin mühendislik değerlendirmesi, ekipman talimatları ve yerel mevzuat ayrıca doğrulanmalıdır. Bu sayfa test basıncı, tork, ankraj yükü veya çalışma izni belirlemez.":"Verify site permits, risk assessments, approved procedures, competent engineering, equipment instructions and local laws separately. This page does not define test pressures, torque values, anchor ratings or work authorization."}
     </div>
     <section className="mt-10" aria-labelledby="steps-heading">
       <h2 id="steps-heading" className="text-2xl font-extrabold">{tr?"Çalışmanın sırası, tehlikeler ve önlemler":"Work sequence, hazards and safeguards"}</h2>
       <p className="mt-3 text-sm text-slate-400">{tr?"Uygulama adımları yalnızca örnektir; onaylı iş paketinize göre uyarlanmalıdır.":"Illustrative sequence only: adapt to the approved job pack and site conditions."}</p>
       <ol className="mt-6 space-y-5">
         {e.steps.map((step,i)=><li key={i} className="rounded-xl border border-slate-700 bg-slate-900 p-5 sm:p-6">
           <div className="flex gap-4">
             <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-600 font-bold">{i+1}</span>
             <div className="min-w-0 flex-1">
               <h3 className="text-lg font-extrabold">{step.title[locale]}</h3>
               <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                 <div className="rounded-lg border border-red-400/20 bg-red-400/10 p-4"><dt className="font-bold text-red-200">{tr?"Tehlike":"Hazard"}</dt><dd className="mt-2 text-sm leading-7 text-slate-200">{step.hazard[locale]}</dd></div>
                 <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4"><dt className="font-bold text-emerald-200">{tr?"Kontrol önlemi":"Safeguard"}</dt><dd className="mt-2 text-sm leading-7 text-slate-200">{step.control[locale]}</dd></div>
               </dl>
             </div>
           </div>
         </li>)}
       </ol>
     </section>
     <section aria-labelledby="verify-heading" className="mt-12 rounded-2xl border border-sky-400/20 bg-slate-900 p-6">
       <h2 id="verify-heading" className="text-2xl font-bold">{tr?"İşe başlamadan önce üç kritik doğrulama":"Three critical pre-start verification points"}</h2>
       <ul className="mt-6 space-y-3">{e.checks.map((check,i)=><li key={i} className="flex items-start gap-3 text-sm leading-7"><span aria-hidden="true" className="mt-1 text-emerald-300">✓</span><span>{check[locale]}</span></li>)}</ul>
     </section>
     <section aria-labelledby="stop-heading" className="mt-8 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
       <h2 id="stop-heading" className="text-xl font-bold text-orange-200">{tr?"İşi durdurma kriterleri":"Stop-work triggers"}</h2>
       <p className="mt-3 leading-7 text-slate-200">{e.stop[locale]}</p>
     </section>
     <section aria-labelledby="faq-heading" className="mt-12">
       <h2 id="faq-heading" className="text-2xl font-bold">{tr?"Sık sorulan sorular":"Frequently asked questions"}</h2>
       <div className="mt-5 space-y-5">{e.faq.map((item,i)=><div key={i} className="rounded-xl border border-white/10 p-5"><h3 className="font-bold text-sky-200">{item.q[locale]}</h3><p className="mt-3 leading-7 text-slate-300">{item.a[locale]}</p></div>)}</div>
     </section>
     <section aria-labelledby="sources-heading" className="mt-12">
       <h2 id="sources-heading" className="text-2xl font-bold">{tr?"Resmî teknik kaynaklar":"Official technical sources"}</h2>
       <p className="mt-2 text-sm leading-6 text-slate-400">{tr?"Bu kaynakların mevzuat kapsamı ülkeye ve işe göre değişir; yerel gereklilikleri ayrıca doğrulayın.":"These sources have jurisdiction-specific scope; verify local legal and engineering requirements."}</p>
       <ul className="mt-5 space-y-2">{e.refs.map(ref=><li key={ref.url}><a href={ref.url} rel="noopener noreferrer" target="_blank" className="inline-block min-h-11 py-2 text-sky-300 underline underline-offset-4 hover:text-white">{ref.title} ↗</a></li>)}</ul>
     </section>
     <section aria-labelledby="next-heading" className="mt-12 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6">
       <h2 id="next-heading" className="text-2xl font-bold">{tr?"Belgenizi düzenleyin":"Prepare your own document"}</h2>
       <p className="mt-3 leading-7 text-slate-300">{tr?"Bu örneği görev planınıza uyarlamak için SERNEM Method Statement oluşturucusunu açın. Araç ayrı ve düzenlenebilir bir iş dokümanı oluşturur; çıktıyı yazdırmak için giriş gerekebilir.":"Open the existing SERNEM generator to prepare and edit a site-specific method statement separately from this reference. Printing from the tool may require sign-in."}</p>
       <Link href={`/${locale}/tools/method-statement`} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-emerald-500 px-5 py-3 font-bold text-slate-950 hover:bg-emerald-400">{tr?"Method Statement oluştur":"Open method statement generator"} →</Link>
       <h3 className="mt-7 font-semibold">{tr?"İlgili saha kaynakları":"Related field resources"}</h3>
       <div className="mt-3 flex flex-wrap gap-4">{e.related.map(item=><Link className="text-sm text-sky-300 underline underline-offset-4" href={`/${locale}${item.url}`} key={item.url}>{item.title[locale]} →</Link>)}</div>
     </section>
   </article>
 </main>;
}
