import Link from "next/link";
import type { ExpandedPPEStandard } from "../expanded-data";
import { ppeStandards } from "../data";

export default function ExpandedPPEPage({ standard:s,locale:l }:{standard:ExpandedPPEStandard;locale:"tr"|"en"}){
 const tr=l==="tr";
 const related=ppeStandards.filter(x=>x.slug!==s.slug && x.category===s.category).slice(0,6);
 const checks=[
 tr?"Standart kodunu ve üretici ürün işaretlerini doğrula.":"Confirm standard designation and manufacturer product markings.",
 tr?"Ürün performans sınıflarını saha tehlikeleriyle karşılaştır.":"Match declared performance classes to workplace hazards.",
 tr?"Beden, uyum, diğer KKD'lerle etkileşim ve hasarı incele.":"Inspect fit, sizing, compatibility with other PPE and damage.",
 tr?"Ürün talimatları, kullanım ömrü ve geçerli standart sürümünü kontrol et.":"Check product instructions, service life and applicable standard edition."
 ];
 return <main className="min-h-screen bg-[#edf2f8] pb-20 text-slate-950"><div className="mx-auto max-w-6xl px-5 pt-9">
  <Link href={`/${l}/ppe-standards`} className="text-sm font-bold text-blue-700">← {tr?"Tüm KKD standartları":"All PPE standards"}</Link>
  <header className="relative mt-5 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-950 via-[#10304a] to-[#164e63] p-8 text-white sm:p-12">
   <div aria-hidden="true" className="absolute -right-12 -top-12 h-80 w-80 rounded-full border-[35px] border-white/5"/>
   <div className="relative"><p className="text-xs font-black uppercase tracking-[.22em] text-teal-300">{s.category} · SERNEM FIELD REFERENCE</p><div className="mt-8 inline-flex rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 font-mono text-2xl font-black text-cyan-100">{s.code}</div><h1 className="mt-5 max-w-4xl text-3xl font-black sm:text-5xl">{s.title[l]}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{s.purpose[l]}</p></div>
  </header>
  <section className="mt-6 grid gap-4 md:grid-cols-3">
  {[[tr?"KAPSAM":"SCOPE",s.purpose[l]],[tr?"KULLANIM":"USE CASE",s.use[l]],[tr?"SAHA İŞARETLERİ":"FIELD MARKINGS",s.markings[l]]].map(([h,v])=><article key={h} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xs font-black tracking-widest text-blue-700">{h}</h2><p className="mt-4 text-sm leading-7 text-slate-700">{v}</p></article>)}
  </section>
  <section className="mt-6 rounded-2xl bg-white p-7 shadow-sm"><h2 className="text-2xl font-black">{tr?"30 saniyelik saha kontrol listesi":"30-second field inspection"}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{checks.map((c,i)=><div key={c} className="flex gap-3 rounded-xl bg-slate-50 p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-700 font-black text-white">{i+1}</span><p className="text-sm leading-6">{c}</p></div>)}</div></section>
  <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 className="text-lg font-black text-amber-950">{tr?"Güncellik ve ürün uygunluğu":"Edition and product conformity"}</h2><p className="mt-2 text-sm leading-7 text-amber-950">{tr?"Bu sayfa standardın konu kapsamını açıklar; her ülke için geçerli en son baskıyı veya ürün sertifikasını garanti etmez. Satın alma ve saha kullanımı öncesinde ilgili ulusal standart kuruluşunun güncel kayıtlarını, üretici uygunluk beyanını, işaretlemeleri ve risk değerlendirmesini doğrulayın.":"This page describes the standard's scope; it does not certify the latest national adoption or a specific product. Before purchase or use, confirm the applicable edition with your national standards body and review manufacturer conformity documents, markings and workplace risk assessment."}</p>{s.sourceUrl&&<a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-bold text-blue-700 underline">{tr?"Teknik kaynak ve durum kontrolü ↗":"Technical source and status ↗"}</a>}</section>
  <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-7"><h2 className="text-2xl font-black">{tr?"İlgili SERNEM kaynakları":"Related SERNEM resources"}</h2><div className="mt-4 grid gap-3 sm:grid-cols-3"><Link href={`/${l}/knowledge-base/ppe`} className="rounded-xl border p-4 font-semibold text-blue-700">{tr?"KKD seçim rehberi →":"PPE selection guide →"}</Link><Link href={`/${l}/toolbox`} className="rounded-xl border p-4 font-semibold text-blue-700">Toolbox →</Link><Link href={`/${l}/risk-assessment`} className="rounded-xl border p-4 font-semibold text-blue-700">{tr?"Risk değerlendirmesi →":"Risk assessment →"}</Link></div>
  {related.length>0&&<><h3 className="mt-6 font-bold">{tr?"Aynı koruma grubunda":"In the same protection group"}</h3><div className="mt-3 flex flex-wrap gap-2">{related.map(x=><Link key={x.slug} href={`/${l}/ppe-standards/${x.slug}`} className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-800">{x.code} · {x.title[l]}</Link>)}</div></>}</section>
 </div></main>;
}
