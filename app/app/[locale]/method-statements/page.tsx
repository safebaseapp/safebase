import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { methodExamples } from "@/lib/content/methodExamples";

type Props = { params: Promise<{locale: string}> };
const site="https://www.sernem.com";
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {locale}=await params; if(locale!=="tr"&&locale!=="en") return {robots:{index:false}};
 const tr=locale==="tr",canonical=`${site}/${locale}/method-statements`;
 return {
  title:tr?"Çalışma Metodu Örnekleri ve Method Statement Rehberleri | SERNEM":"Method Statement Examples & Safe Work Guides | SERNEM",
  description:tr?"Hat açma, pnömatik test, grating montajı, triforla kaldırma, kaynak ve flanş montajı için ücretsiz, iş adımlı çalışma metodu örnekleri.":"Free task-specific method statement examples for line breaking, pneumatic testing, grating, chain hoists, welding and flange assembly.",
  alternates:{canonical,languages:{tr:`${site}/tr/method-statements`,en:`${site}/en/method-statements`,"x-default":`${site}/en/method-statements`}},
  openGraph:{title:tr?"İş Bazlı Çalışma Metodu Örnekleri | SERNEM":"Task-Specific Method Statement Examples | SERNEM",url:canonical,type:"website",siteName:"SERNEM"}
 };
}
export default async function MethodExamplesHub({params}:Props){
 const {locale}=await params; if(locale!=="tr"&&locale!=="en") notFound();
 const tr=locale==="tr";
 return <main className="min-h-screen bg-slate-950 text-white">
   <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
     <Link href={`/${locale}/tools`} className="text-sm font-semibold text-sky-300 underline underline-offset-4">{tr?"← HSE araçları":"← HSE tools"}</Link>
     <p className="mt-9 text-sm font-bold uppercase tracking-widest text-emerald-300">SERNEM · {tr?"Saha metodolojisi":"Field methodology"}</p>
     <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">{tr?"Çalışma Metodu (Method Statement) Örnekleri":"Method Statement Examples for Industrial Work"}</h1>
     <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">{tr?"Gerçek sahadaki iş sırasına göre tehlikeleri, gerekli kontrolleri, işi durdurma kriterlerini ve iş öncesi kontrol noktalarını öğrenin. Her örneği şirketinizin onaylı prosedürüne uyarlayın.":"Explore job-specific work sequences, hazards, safeguards, hold points and stop-work triggers. Adapt each example to a competent, site-approved procedure."}</p>
     <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
       {tr?"Bu örnekler onaylı iş izni, mühendislik hesaplaması, üretici talimatı veya yetkili kişi değerlendirmesinin yerine geçmez.":"These examples are not approved permits, engineered work plans, manufacturer instructions or competent-person sign-off."}
     </div>
     <section aria-labelledby="browse-heading" className="mt-12">
       <h2 id="browse-heading" className="text-2xl font-extrabold">{tr?"İşe özel teknik metotlar":"Explore task-specific examples"}</h2>
       <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
         {methodExamples.map(e=><article key={e.slug} className="flex min-w-0 flex-col rounded-2xl border border-white/15 bg-slate-900 p-6">
           <p className="text-xs font-bold uppercase tracking-wider text-sky-300">{e.category[locale]}</p>
           <h3 className="mt-3 text-xl font-bold">{e.title[locale]}</h3>
           <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{e.description[locale]}</p>
           <Link href={`/${locale}/method-statements/${e.slug}`} className="mt-6 inline-flex min-h-11 items-center font-bold text-emerald-300 underline underline-offset-4">{tr?"Metodu incele":"Read method example"} →</Link>
         </article>)}
       </div>
     </section>
     <section className="mt-14 rounded-2xl border border-sky-400/20 bg-sky-950/40 p-7">
       <h2 className="text-2xl font-bold">{tr?"Kendi Method Statement belgenizi hazırlayın":"Build your own method statement"}</h2>
       <p className="mt-3 max-w-3xl leading-7 text-slate-300">{tr?"SERNEM’in mevcut 20 hazır şablonlu oluşturucusuna geçin, iş yerinize özel ayrıntıları ve görev sorumlularını düzenleyin. PDF için giriş yapmanız gerekebilir.":"Open the existing SERNEM method statement tool with 20 preset templates, and customize task controls and responsibilities. Sign-in may be required for printing."}</p>
       <Link href={`/${locale}/tools/method-statement`} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-sky-600 px-5 py-3 font-bold hover:bg-sky-500">{tr?"Method Statement oluşturucusu":"Open method statement generator"} →</Link>
     </section>
   </div>
 </main>;
}
