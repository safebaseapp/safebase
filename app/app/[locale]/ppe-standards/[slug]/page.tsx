import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPPEStandard, ppeStandards } from '../data';
import { getPPETech } from '../tech-data';

type P={params:Promise<{locale:string;slug:string}>};
type Locale='tr'|'en';

const theme:Record<string,{label:{tr:string;en:string};accent:string;soft:string;line:string}>={
 'EN 397':{label:{tr:'Baş Koruma',en:'Head Protection'},accent:'bg-amber-500',soft:'bg-amber-50',line:'border-amber-200'},
 'EN 361':{label:{tr:'Düşüş Koruma',en:'Fall Protection'},accent:'bg-blue-600',soft:'bg-blue-50',line:'border-blue-200'},
 'EN 355':{label:{tr:'Düşüş Koruma',en:'Fall Protection'},accent:'bg-cyan-600',soft:'bg-cyan-50',line:'border-cyan-200'},
 'EN 362':{label:{tr:'Bağlantı Sistemleri',en:'Connection Systems'},accent:'bg-slate-700',soft:'bg-slate-100',line:'border-slate-300'},
 'EN 166':{label:{tr:'Göz Koruma',en:'Eye Protection'},accent:'bg-sky-600',soft:'bg-sky-50',line:'border-sky-200'},
 'EN 388':{label:{tr:'El Koruma',en:'Hand Protection'},accent:'bg-orange-600',soft:'bg-orange-50',line:'border-orange-200'},
 'EN ISO 374':{label:{tr:'Kimyasal Koruma',en:'Chemical Protection'},accent:'bg-emerald-600',soft:'bg-emerald-50',line:'border-emerald-200'},
 'EN 149':{label:{tr:'Solunum Koruma',en:'Respiratory Protection'},accent:'bg-indigo-600',soft:'bg-indigo-50',line:'border-indigo-200'},
 'EN 352':{label:{tr:'İşitme Koruma',en:'Hearing Protection'},accent:'bg-violet-600',soft:'bg-violet-50',line:'border-violet-200'},
 'EN ISO 20345':{label:{tr:'Ayak Koruma',en:'Foot Protection'},accent:'bg-zinc-800',soft:'bg-zinc-100',line:'border-zinc-300'}
};

export function generateStaticParams(){return ['tr','en'].flatMap(locale=>ppeStandards.map(s=>({locale,slug:s.slug})))}

export async function generateMetadata({params}:P):Promise<Metadata>{
 const{locale,slug}=await params; const l:Locale=locale==='tr'?'tr':'en'; const s=getPPEStandard(slug); if(!s)return{};
 const canonical=`https://www.sernem.com/${l}/ppe-standards/${slug}`;
 return{title:`${s.code} – ${s.title[l]} | SERNEM`,description:s.purpose[l],alternates:{canonical,languages:{tr:`https://www.sernem.com/tr/ppe-standards/${slug}`,en:`https://www.sernem.com/en/ppe-standards/${slug}`,'x-default':`https://www.sernem.com/en/ppe-standards/${slug}`}},openGraph:{title:`${s.code} – ${s.title[l]} | SERNEM`,description:s.purpose[l],url:canonical,type:'article',siteName:'SERNEM'}};
}

export default async function Page({params}:P){
 const{locale,slug}=await params; if(!['tr','en'].includes(locale))notFound();
 const s=getPPEStandard(slug); if(!s)notFound(); const l=locale as Locale; const tr=l==='tr'; const d=getPPETech(s.code); if(!d)notFound();
 const v=theme[s.code]??theme['EN 397']; const canonical=`https://www.sernem.com/${l}/ppe-standards/${slug}`;
 const schema={'@context':'https://schema.org','@type':'TechArticle',headline:`${s.code} – ${s.title[l]}`,description:s.purpose[l],inLanguage:l,url:canonical,about:{'@type':'Thing',name:d.product[l]},publisher:{'@type':'Organization',name:'SERNEM',url:'https://www.sernem.com'}};
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:tr?'KKD Standartları':'PPE Standards',item:`https://www.sernem.com/${l}/ppe-standards`},{'@type':'ListItem',position:2,name:s.code,item:canonical}]};
 return <main className='min-h-screen bg-[#f5f7fa] pb-20 text-slate-950'>
  <script type='application/ld+json' dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <script type='application/ld+json' dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
  <div className='mx-auto max-w-[1320px] px-4 pt-7 md:px-7'>
   <div className='mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500'><Link href={`/${l}/ppe-standards`} className='font-bold hover:text-blue-700'>← {tr?'Tüm KKD Standartları':'All PPE Standards'}</Link><span>/</span><span>{v.label[l]}</span><span>/</span><strong className='text-slate-800'>{s.code}</strong></div>

   <section className='overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 text-white shadow-2xl'>
    <div className='grid lg:grid-cols-[1.08fr_.92fr]'>
     <div className='p-7 md:p-11 lg:p-14'>
      <div className='flex flex-wrap gap-2'><span className={`rounded-full ${v.accent} px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-white`}>{v.label[l]}</span><span className='rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-slate-300'>{tr?'TEKNİK KKD KÜTÜPHANESİ':'TECHNICAL PPE LIBRARY'}</span></div>
      <h1 className='mt-7 text-5xl font-black tracking-tight md:text-7xl'>{s.code}</h1>
      <p className='mt-3 max-w-3xl text-2xl font-black leading-tight md:text-3xl'>{s.title[l]}</p>
      <p className='mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg'>{s.purpose[l]}</p>
      <div className='mt-7 grid gap-3 sm:grid-cols-2'><div className='rounded-2xl border border-white/10 bg-white/[.05] p-4'><div className='text-[11px] font-black uppercase tracking-[.14em] text-slate-400'>{tr?'Ürün tipi':'Product type'}</div><div className='mt-2 font-bold'>{d.product[l]}</div></div><div className='rounded-2xl border border-white/10 bg-white/[.05] p-4'><div className='text-[11px] font-black uppercase tracking-[.14em] text-slate-400'>{tr?'Saha odağı':'Field focus'}</div><div className='mt-2 font-bold'>{tr?'Kod + ürün + kullanım koşulu':'Code + product + conditions of use'}</div></div></div>
     </div>
     <div className='border-t border-white/10 bg-white/[.035] p-7 lg:border-l lg:border-t-0 lg:p-10'>
      <div className='text-xs font-black uppercase tracking-[.16em] text-slate-400'>{tr?'TEKNİK ÜRÜN KİMLİĞİ':'TECHNICAL PRODUCT IDENTITY'}</div>
      <div className='mt-5 rounded-3xl border border-white/10 bg-white/[.05] p-6'>
       <div className='flex items-start justify-between gap-4'><div><div className='text-sm text-slate-400'>{tr?'Standart':'Standard'}</div><div className='mt-1 text-3xl font-black'>{s.code}</div></div><span className={`h-12 w-2 rounded-full ${v.accent}`}/></div>
       <div className='mt-6 divide-y divide-white/10'>{d.marks.slice(0,4).map(m=><div key={m.code} className='grid grid-cols-[110px_1fr] gap-3 py-4'><code className='font-black text-white'>{m.code}</code><span className='text-sm leading-6 text-slate-300'>{m.title[l]}</span></div>)}</div>
      </div>
      <p className='mt-5 text-sm leading-6 text-slate-400'>{tr?'Bu alan ürün üzerindeki gerçek etiket/işaretlemeyi okumaya yardımcı olur; ürün sertifikasının yerine geçmez.':'This area helps interpret actual product labels/markings; it does not replace product certification.'}</p>
     </div>
    </div>
   </section>

   {d.note&&<aside className='mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950'><strong>{tr?'Güncel standart notu: ':'Current-standard note: '}</strong>{d.note[l]}</aside>}

   <nav className='sticky top-2 z-20 mt-5 flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur'><a href='#overview' className='whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold hover:bg-slate-100'>{tr?'Genel Bakış':'Overview'}</a><a href='#classes' className='whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold hover:bg-slate-100'>{tr?'Sınıflar':'Classes'}</a><a href='#marking' className='whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold hover:bg-slate-100'>{tr?'Kod Çözümleme':'Code Decoder'}</a><a href='#use' className='whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold hover:bg-slate-100'>{tr?'Kullanım':'Applications'}</a><a href='#field' className='whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold hover:bg-slate-100'>{tr?'Saha Kontrolü':'Field Check'}</a></nav>

   <section id='overview' className='mt-5 grid gap-4 md:grid-cols-3'>
    {[[tr?'Standardın amacı':'Purpose',s.purpose[l]],[tr?'Tipik kullanım':'Typical use',s.use[l]],[tr?'Üründe ne aranır?':'What to look for?',s.markings[l]]].map(([h,p],i)=><article key={h} className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${i===0?v.accent:'bg-slate-900'} text-sm font-black text-white`}>0{i+1}</div><h2 className='mt-5 text-xl font-black'>{h}</h2><p className='mt-3 leading-7 text-slate-600'>{p}</p></article>)}
   </section>

   <section id='classes' className='mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
    <div className='max-w-3xl'><div className='text-xs font-black uppercase tracking-[.16em] text-blue-700'>{tr?'SINIFLAR VE SEÇİM MANTIĞI':'CLASSES & SELECTION LOGIC'}</div><h2 className='mt-2 text-2xl font-black md:text-3xl'>{tr?'Bu standarttaki teknik sınıflar':'Technical classes in this standard'}</h2><p className='mt-3 leading-7 text-slate-600'>{tr?'Sınıf kodu tek başına seçim kararı değildir. İşe özgü risk değerlendirmesi ve üretici verileriyle birlikte yorumlanmalıdır.':'A class code is not a selection decision by itself. Interpret it together with task-specific risk assessment and manufacturer data.'}</p></div>
    <div className='mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>{d.classes.map(x=><article key={x.code} className={`rounded-2xl border ${v.line} ${v.soft} p-5`}><div className='font-mono text-xl font-black'>{x.code}</div><h3 className='mt-3 font-black'>{x.title[l]}</h3><p className='mt-2 text-sm leading-6 text-slate-600'>{x.detail[l]}</p></article>)}</div>
   </section>

   <section id='marking' className='mt-5 grid gap-4 lg:grid-cols-[1.15fr_.85fr]'>
    <article className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'><div className='text-xs font-black uppercase tracking-[.16em] text-blue-700'>{tr?'ÜRÜN ETİKETİNİ OKU':'READ THE PRODUCT LABEL'}</div><h2 className='mt-2 text-2xl font-black md:text-3xl'>{tr?'Kod ve işaretleme çözümleme':'Code & marking decoder'}</h2><div className='mt-6 overflow-hidden rounded-2xl border border-slate-200'>{d.marks.map((m,i)=><div key={m.code} className={`grid gap-3 p-5 sm:grid-cols-[130px_170px_1fr] ${i%2?'bg-slate-50':'bg-white'}`}><code className='font-black text-slate-950'>{m.code}</code><strong className='text-sm'>{m.title[l]}</strong><span className='text-sm leading-6 text-slate-600'>{m.detail[l]}</span></div>)}</div></article>
    <aside className='rounded-2xl bg-slate-950 p-7 text-white shadow-sm'><div className='text-xs font-black uppercase tracking-[.16em] text-cyan-300'>{tr?'DOĞRU SEÇİM':'CORRECT SELECTION'}</div><h3 className='mt-3 text-2xl font-black'>{tr?'Standart numarasından fazlasını kontrol et.':'Check more than the standard number.'}</h3><p className='mt-4 leading-7 text-slate-300'>{tr?'Üretici, model, sınıf, lot/seri, kullanım ömrü, işe uygunluk, diğer KKD’lerle uyumluluk ve ürün talimatlarını birlikte doğrulayın.':'Verify manufacturer, model, class, lot/serial, service life, task suitability, compatibility with other PPE and product instructions together.'}</p><div className='mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 font-mono text-lg font-black'>{s.code} · {d.marks.map(x=>x.code).slice(0,3).join(' · ')}</div></aside>
   </section>

   <section id='use' className='mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'><div className='text-xs font-black uppercase tracking-[.16em] text-blue-700'>{tr?'SAHADA NEREDE?':'WHERE IN THE FIELD?'}</div><h2 className='mt-2 text-2xl font-black md:text-3xl'>{tr?'Tipik kullanım alanları':'Typical applications'}</h2><div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6'>{d.uses.map((x,i)=><div key={x[l]} className='rounded-2xl border border-slate-200 bg-slate-50 p-4'><div className={`mb-4 h-1.5 w-10 rounded-full ${v.accent}`}/><div className='text-xs font-black text-slate-400'>0{i+1}</div><div className='mt-2 text-sm font-black'>{x[l]}</div></div>)}</div></section>

   <section id='field' className='mt-5 grid gap-4 lg:grid-cols-[.78fr_1.22fr]'><div className='rounded-2xl bg-slate-950 p-7 text-white'><div className='text-xs font-black uppercase tracking-[.16em] text-emerald-300'>HSE FIELD CHECK</div><h2 className='mt-3 text-3xl font-black'>{tr?'30 saniyelik saha kontrolü':'30-second field check'}</h2><p className='mt-4 leading-7 text-slate-300'>{tr?'Hızlı ön kontrol için kullan. Sertifikasyon, yetkin muayene veya işe özgü risk değerlendirmesinin yerine geçmez.':'Use for quick pre-checks. It does not replace certification, competent inspection or task-specific risk assessment.'}</p></div><div className='grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 md:p-6'>{d.checks.map((x,i)=><div key={x[l]} className='flex gap-4 rounded-xl bg-slate-50 p-4'><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${v.accent} font-black text-white`}>{i+1}</span><p className='pt-1 text-sm font-semibold leading-6 text-slate-700'>{x[l]}</p></div>)}</div></section>

   <aside className='mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950'><strong>{tr?'Önemli: ':'Important: '}</strong>{tr?'SERNEM bu sayfayı saha referansı olarak sunar. Satın alma veya KKD seçimi öncesinde ürünün güncel standardını, uygunluk işaretlerini, üretici teknik dokümanını ve yerel mevzuatı doğrulayın.':'SERNEM provides this page as a field reference. Before procurement or PPE selection, verify the product’s current standard, conformity markings, manufacturer technical documentation and local legislation.'}</aside>

   <section className='mt-5 grid gap-4 md:grid-cols-3'><Link href={`/${l}/knowledge-base/ppe`} className='rounded-2xl border border-slate-200 bg-white p-6 font-black shadow-sm transition hover:-translate-y-1 hover:shadow-md'>{tr?'KKD ana rehberi →':'PPE master guide →'}</Link><Link href={`/${l}/toolbox`} className='rounded-2xl border border-slate-200 bg-white p-6 font-black shadow-sm transition hover:-translate-y-1 hover:shadow-md'>{tr?'İlgili Toolbox eğitimleri →':'Related toolbox talks →'}</Link><Link href={`/${l}/risk-assessment`} className='rounded-2xl border border-slate-200 bg-white p-6 font-black shadow-sm transition hover:-translate-y-1 hover:shadow-md'>{tr?'Risk değerlendirmeleri →':'Risk assessments →'}</Link></section>
  </div>
 </main>;
}