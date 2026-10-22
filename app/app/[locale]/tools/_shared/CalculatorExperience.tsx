'use client';
import type {ReactNode, CSSProperties} from 'react';
import {usePathname} from 'next/navigation';
import {Activity, ArrowUpRight, AudioLines, Clock3, Grid3X3, HardHat, ThermometerSun, TrendingDown, TrendingUp} from 'lucide-react';
import {calculators, type ToolId} from './catalog';
import styles from './CalculatorExperience.module.css';
const identity:Record<ToolId,{icon:typeof Activity;formula:string;accent:string;label:[string,string]}>= {
 'risk-matrix':{icon:Grid3X3,formula:'L × S → 1–25',accent:'#60a5fa',label:['Risk değerlendirmesi','Risk assessment']},
 trir:{icon:TrendingUp,formula:'Cases × 200,000 / h',accent:'#60a5fa',label:['Kaydedilebilir vakalar','Recordable cases']},
 ltifr:{icon:TrendingDown,formula:'LTI × 1,000,000 / h',accent:'#38bdf8',label:['Kayıp zamanlı yaralanmalar','Lost-time injuries']},
 'severity-rate':{icon:Activity,formula:'Days × 200,000 / h',accent:'#2dd4bf',label:['Kayıp günlerin etkisi','Impact of lost days']},
 dart:{icon:ArrowUpRight,formula:'DART × 200,000 / h',accent:'#22d3ee',label:['İşten uzak kalma ve kısıtlı iş','Days away & restricted work']},
 'noise-exposure':{icon:AudioLines,formula:'85 dBA · 8 h · 3 dB',accent:'#38bdf8',label:['Ölçülen gürültü maruziyeti','Measured noise exposure']},
 'sling-tension':{icon:HardHat,formula:'T = W / (2 sin θ)',accent:'#2dd4bf',label:['Simetrik iki kollu kaldırma','Symmetric two-leg lift']},
 'man-hours':{icon:Clock3,formula:'Σ net person-hours',accent:'#60a5fa',label:['İşgücü ve vardiya planlama','Workforce & shift planning']},
 'heat-stress':{icon:ThermometerSun,formula:'WBGT + CAF',accent:'#22d3ee',label:['Ölçüme dayalı ısı taraması','Measurement-based heat screening']},
};
/** Presentation only: no entitlement, calculation, storage or record mutations. */
export default function CalculatorExperience({children,locale}:{children:ReactNode;locale:string}){
 const path=usePathname(),tool=calculators.find(c=>path.replace(/\/$/,'').endsWith(`/tools/${c.id}`));
 if(!tool)return children;
 const tr=locale==='tr',design=identity[tool.id],Icon=design.icon;
 const formula=tr?({'risk-matrix':'O × Ş → 1–25',trir:'Vaka × 200.000 / saat',ltifr:'LTI × 1.000.000 / saat','severity-rate':'Gün × 200.000 / saat',dart:'DART × 200.000 / saat','noise-exposure':'85 dBA · 8 saat · 3 dB','sling-tension':'T = W / (2 sin θ)','man-hours':'Σ net çalışan-saat','heat-stress':'WBGT + kıyafet düzeltmesi'})[tool.id]:design.formula;
 return <div className={styles.surface} data-calculator-experience={tool.id} style={{'--calculator-accent':design.accent} as CSSProperties}>
  <div className={styles.identity}>
   <div className={styles.mark}><Icon size={30} strokeWidth={1.5} aria-hidden="true"/></div>
   <div className={styles.caption}><p className={styles.eyebrow}>SERNEM / {tr?'HESAPLAMA STÜDYOSU':'CALCULATION STUDIO'}</p><p className={styles.subject}>{design.label[tr?0:1]}</p></div>
   <div className={styles.formula}><span>{tr?'MODEL / BAZ':'MODEL / BASIS'}</span><strong>{formula}</strong></div>
  </div>
  <div className={styles.content}>{children}</div>
 </div>;
}
