import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPPEStandard, ppeStandards } from '../data';

type P = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ['tr', 'en'].flatMap((locale) => ppeStandards.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale === 'tr' ? 'tr' : 'en';
  const s = getPPEStandard(slug);
  if (!s) return {};
  const canonical = `https://www.sernem.com/${l}/ppe-standards/${slug}`;
  return {
    title: `${s.code} – ${s.title[l]} | SERNEM`,
    description: s.purpose[l],
    alternates: {
      canonical,
      languages: {
        tr: `https://www.sernem.com/tr/ppe-standards/${slug}`,
        en: `https://www.sernem.com/en/ppe-standards/${slug}`,
        'x-default': `https://www.sernem.com/en/ppe-standards/${slug}`,
      },
    },
    openGraph: { title: `${s.code} – ${s.title[l]}`, description: s.purpose[l], url: canonical, type: 'article', siteName: 'SERNEM' },
  };
}

export default async function Page({ params }: P) {
  const { locale, slug } = await params;
  if (!['tr', 'en'].includes(locale)) notFound();
  const s = getPPEStandard(slug);
  if (!s) notFound();
  const l = locale as 'tr' | 'en';
  const tr = l === 'tr';
  const is149 = s.code === 'EN 149';
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: `${s.code} – ${s.title[l]}`,
    description: s.purpose[l], inLanguage: l,
    mainEntityOfPage: `https://www.sernem.com/${l}/ppe-standards/${slug}`,
    publisher: { '@type': 'Organization', name: 'SERNEM', url: 'https://www.sernem.com' },
  };
  const fieldChecks = tr
    ? ['Standart ve ürün işaretlemesini doğrulayın', 'Üretici, model ve izlenebilirlik bilgisini kontrol edin', 'Hasar, deformasyon, kirlenme ve kullanım ömrünü inceleyin', 'KKD seçimini işe özgü risk değerlendirmesiyle eşleştirin']
    : ['Verify the standard and product marking', 'Check manufacturer, model and traceability information', 'Inspect damage, deformation, contamination and service life', 'Match PPE selection to the task-specific risk assessment'];

  return <main className='bg-slate-50/70 pb-20'>
    <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className='mx-auto max-w-6xl px-5 pt-10'>
      <Link href={`/${l}/ppe-standards`} className='text-sm font-bold text-blue-700 hover:text-blue-900'>← {tr ? 'Tüm KKD standartları' : 'All PPE standards'}</Link>

      <section className='relative mt-7 overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-10 text-white shadow-2xl md:px-12 md:py-14'>
        <div className='absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl' />
        <div className='relative grid gap-8 md:grid-cols-[1fr_280px] md:items-center'>
          <div>
            <div className='mb-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[.18em]'>
              <span className='rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-emerald-300'>{s.category}</span>
              <span className='rounded-full border border-white/15 bg-white/5 px-3 py-2 text-slate-300'>{tr ? 'KKD STANDARDI' : 'PPE STANDARD'}</span>
            </div>
            <h1 className='text-5xl font-black tracking-tight md:text-7xl'>{s.code}</h1>
            <p className='mt-4 max-w-3xl text-2xl font-bold leading-tight text-white md:text-3xl'>{s.title[l]}</p>
            <p className='mt-5 max-w-3xl text-base leading-7 text-slate-300'>{s.purpose[l]}</p>
          </div>
          <div className='rounded-3xl border border-white/10 bg-white/[.06] p-6 backdrop-blur'>
            <div className='text-xs font-black uppercase tracking-[.18em] text-emerald-300'>{tr ? 'Saha odağı' : 'Field focus'}</div>
            <div className='mt-4 text-5xl'>🛡️</div>
            <p className='mt-4 text-sm leading-6 text-slate-300'>{tr ? 'Standart kodunu ezberlemek yerine doğru ekipmanı, işaretlemeyi ve kullanım koşulunu birlikte doğrulayın.' : 'Go beyond the code: verify the equipment, markings and conditions of use together.'}</p>
          </div>
        </div>
      </section>

      <nav className='sticky top-3 z-10 mt-6 flex gap-2 overflow-x-auto rounded-2xl border bg-white/95 p-2 shadow-sm backdrop-blur'>
        {[["overview",tr?'Kapsam':'Overview'],["use",tr?'Kullanım':'Use'],["marking",tr?'İşaretleme':'Marking'],["field",tr?'Saha kontrolü':'Field check']].map(([id,label])=><a key={id} href={`#${id}`} className='whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100'>{label}</a>)}
      </nav>

      <section id='overview' className='mt-8 grid gap-5 md:grid-cols-3'>
        <article className='rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:col-span-2'>
          <div className='text-sm font-black uppercase tracking-wider text-emerald-700'>{tr ? 'Standardın amacı' : 'Purpose of the standard'}</div>
          <h2 className='mt-2 text-2xl font-black text-slate-950'>{tr ? 'Bu standart neyi kapsar?' : 'What does this standard cover?'}</h2>
          <p className='mt-4 text-lg leading-8 text-slate-700'>{s.purpose[l]}</p>
        </article>
        <aside className='rounded-3xl bg-emerald-950 p-7 text-white shadow-sm'>
          <div className='text-sm font-black uppercase tracking-wider text-emerald-300'>{tr ? 'Hızlı kontrol' : 'Quick check'}</div>
          <p className='mt-4 leading-7 text-emerald-50'>{s.markings[l]}</p>
        </aside>
      </section>

      {is149 && <section className='mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9'>
        <div className='text-sm font-black uppercase tracking-wider text-blue-700'>EN 149</div>
        <h2 className='mt-2 text-2xl font-black'>{tr ? 'FFP sınıfları nasıl okunur?' : 'How are FFP classes read?'}</h2>
        <p className='mt-3 max-w-3xl leading-7 text-slate-600'>{tr ? 'EN 149 kapsamındaki filtreli yarım maskeler FFP sınıflarıyla işaretlenir. Sınıf tek başına seçim kararı değildir; maruziyet, uygunluk ve üretici talimatları birlikte değerlendirilmelidir.' : 'Filtering half masks under EN 149 use FFP classifications. Class alone is not a selection decision; exposure, suitability and manufacturer instructions must be assessed together.'}</p>
        <div className='mt-6 grid gap-4 md:grid-cols-3'>
          {['FFP1','FFP2','FFP3'].map((x,i)=><div key={x} className='rounded-2xl border border-slate-200 bg-slate-50 p-5'><div className='text-2xl font-black text-slate-950'>{x}</div><p className='mt-2 text-sm leading-6 text-slate-600'>{tr ? ['Daha düşük partikül koruma sınıfı. İşe özgü maruziyet değerlendirmesi gerekir.','Orta seviye partikül koruma sınıfı. Uygunluk ve yüz sızdırmazlığı kritik önemdedir.','EN 149 içindeki daha yüksek partikül koruma sınıfı. Doğru seçim ve fit yine zorunludur.'][i] : ['Lower particle-protection class. Task-specific exposure assessment is required.','Mid-level particle-protection class. Suitability and face seal are critical.','Higher particle-protection class within EN 149. Correct selection and fit remain essential.'][i]}</p></div>)}
        </div>
      </section>}

      <section id='use' className='mt-8 grid gap-5 md:grid-cols-2'>
        <article className='rounded-3xl border border-slate-200 bg-white p-7 shadow-sm'>
          <div className='text-3xl'>🏗️</div><h2 className='mt-4 text-2xl font-black'>{tr ? 'Nerede kullanılır?' : 'Where is it used?'}</h2>
          <p className='mt-4 leading-8 text-slate-700'>{s.use[l]}</p>
        </article>
        <article id='marking' className='rounded-3xl border border-slate-200 bg-white p-7 shadow-sm'>
          <div className='text-3xl'>🔎</div><h2 className='mt-4 text-2xl font-black'>{tr ? 'Ürün üzerinde ne aranır?' : 'What should you look for on the product?'}</h2>
          <p className='mt-4 leading-8 text-slate-700'>{s.markings[l]}</p>
        </article>
      </section>

      <section id='field' className='mt-8 rounded-3xl bg-slate-950 p-7 text-white shadow-xl md:p-9'>
        <div className='grid gap-8 md:grid-cols-[.8fr_1.2fr]'>
          <div><div className='text-sm font-black uppercase tracking-wider text-emerald-300'>{tr ? 'HSE saha kontrolü' : 'HSE field check'}</div><h2 className='mt-3 text-3xl font-black'>{tr ? 'Sahada 30 saniyede ne kontrol edilir?' : 'What can be checked in 30 seconds?'}</h2><p className='mt-4 leading-7 text-slate-300'>{tr ? 'Bu liste ürün sertifikasyonunun yerine geçmez; hızlı saha doğrulaması için kullanılır.' : 'This list does not replace product certification; use it as a quick field verification.'}</p></div>
          <div className='grid gap-3'>{fieldChecks.map((x,i)=><div key={x} className='flex gap-4 rounded-2xl border border-white/10 bg-white/[.05] p-4'><span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 font-black text-slate-950'>{i+1}</span><span className='pt-1 leading-6 text-slate-100'>{x}</span></div>)}</div>
        </div>
      </section>

      <aside className='mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7 text-amber-950'>
        <strong>{tr ? 'Önemli: ' : 'Important: '}</strong>{tr ? 'Standart numarası tek başına KKD seçimi için yeterli değildir. İşe özgü risk değerlendirmesi, ürünün güncel işaretlemesi, üretici talimatları ve geçerli mevzuat/standart sürümü doğrulanmalıdır.' : 'A standard number alone is not enough to select PPE. Verify the task-specific risk assessment, current product marking, manufacturer instructions and applicable legislation/standard edition.'}
      </aside>

      <section className='mt-8 grid gap-4 md:grid-cols-3'>
        <Link href={`/${l}/knowledge-base/ppe`} className='rounded-2xl border bg-white p-5 font-bold shadow-sm hover:shadow-md'>{tr ? 'KKD ana rehberi →' : 'PPE master guide →'}</Link>
        <Link href={`/${l}/toolbox`} className='rounded-2xl border bg-white p-5 font-bold shadow-sm hover:shadow-md'>{tr ? 'İlgili Toolbox eğitimleri →' : 'Related toolbox talks →'}</Link>
        <Link href={`/${l}/risk-assessment`} className='rounded-2xl border bg-white p-5 font-bold shadow-sm hover:shadow-md'>{tr ? 'Risk değerlendirmeleri →' : 'Risk assessments →'}</Link>
      </section>
    </div>
  </main>;
}
