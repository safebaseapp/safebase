import Link from 'next/link';

export default function PPEStandardsNav({locale}:{locale:'tr'|'en'}){
  const tr=locale==='tr';
  return <section className='mt-12 grid gap-4 md:grid-cols-3'>
    <Link href={`/${locale}/knowledge-base/ppe`} className='rounded-2xl border p-5 hover:shadow-md'><strong>{tr?'KKD ana rehberi':'PPE master guide'}</strong><p className='mt-2 text-sm text-slate-600'>{tr?'Seçim, kullanım, bakım ve saha kontrolleri.':'Selection, use, maintenance and field checks.'}</p></Link>
    <Link href={`/${locale}/toolbox`} className='rounded-2xl border p-5 hover:shadow-md'><strong>{tr?'Toolbox eğitimleri':'Toolbox talks'}</strong><p className='mt-2 text-sm text-slate-600'>{tr?'KKD konularını saha eğitimleriyle destekleyin.':'Support PPE topics with field-ready toolbox talks.'}</p></Link>
    <Link href={`/${locale}/tools/quick-risk-assessment`} className='rounded-2xl border p-5 hover:shadow-md'><strong>{tr?'Risk değerlendirmesi':'Risk assessment'}</strong><p className='mt-2 text-sm text-slate-600'>{tr?'KKD ihtiyacını işe özgü tehlikelerle birlikte değerlendirin.':'Connect PPE requirements with task-specific hazards.'}</p></Link>
  </section>;
}
