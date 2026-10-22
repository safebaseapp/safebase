import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {calculators,type ToolId} from './catalog';
import NewCalculator from './NewCalculator';
export async function calculatorMetadata(id:ToolId,params:Promise<{locale:string}>):Promise<Metadata>{const {locale}=await params;if(!['tr','en'].includes(locale))notFound();const c=calculators.find(t=>t.id===id)!;const i=locale==='tr'?0:1,path=`/tools/${id}`;return {title:`${c.title[i]} ${i===0?'Hesaplayıcı':'Calculator'} | SERNEM`,description:c.description[i],alternates:{canonical:`https://www.sernem.com/${locale}${path}`,languages:{tr:`https://www.sernem.com/tr${path}`,en:`https://www.sernem.com/en${path}`,'x-default':`https://www.sernem.com/en${path}`}}};}
export async function calculatorPage(id:ToolId,params:Promise<{locale:string}>){const {locale}=await params;if(!['tr','en'].includes(locale))notFound();return <main className="px-3 pb-10"><NewCalculator id={id} locale={locale}/></main>;}
