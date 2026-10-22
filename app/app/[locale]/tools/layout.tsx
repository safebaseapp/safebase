import Link from 'next/link';
import CalculatorExperience from './_shared/CalculatorExperience';
import type {ReactNode} from 'react';
export default async function ToolsLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}){
 const {locale}=await params,tr=locale==='tr';
 return <div className="min-h-screen bg-slate-950 text-white"><nav aria-label={tr?'Araç gezinme yolu':'Tools breadcrumbs'} className="mx-auto flex max-w-7xl flex-wrap gap-4 px-4 py-5 text-sm print:hidden"><Link className="min-h-11 text-cyan-300 underline" href={`/${locale}`}>{tr?'Ana sayfa':'Home'}</Link><Link className="min-h-11 text-cyan-300 underline" href={`/${locale}/tools#calculators`}>{tr?'Hesaplayıcılara dön':'Back to calculators'}</Link><Link className="min-h-11 text-cyan-300 underline" href={`/${locale}/hse-performance#operational-calculations`}>{tr?'HSE Performans / KPI':'HSE Performance / KPI'}</Link></nav><CalculatorExperience locale={locale}>{children}</CalculatorExperience></div>
}
