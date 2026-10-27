import type {CSSProperties} from 'react';
import type {PosterDefinition} from '@/lib/posters-v2/types';
import {getPosterTechnicalProfile,technicalReferences,type TechnicalReference} from '@/lib/posters-v2/technical-profiles';
import PpeSymbol from './PpeSymbol';
import styles from './PosterLayout.module.css';
export default function BottomPanels({locale,poster}:{locale:'tr'|'en';poster:PosterDefinition}){
 const tr=locale==='tr',profile=getPosterTechnicalProfile(poster.code),reference:TechnicalReference|undefined=profile?technicalReferences[profile.reference]:undefined;
 const values=profile?.controls??[{value:{tr:'EKSİK',en:'MISSING'},label:{tr:'Teknik tanımı doğrula',en:'Verify technical definition'}}];
 const color=(value:string,pale:string)=>({'--panel-color':value,'--panel-pale':pale} as CSSProperties);
 return <section className={styles.bottom} data-critical-text>
  <div data-reading-panel className={styles.panel} style={color('#b91c1c','#fff1f2')}><h2 data-color-band className={styles.panelTitle}>{tr?'İşi Hemen Durdur':'Stop Work Now'}</h2><div className={styles.stops}>{poster.never[locale].map(item=><p className={styles.stop} key={item}>{item}</p>)}</div></div>
  <div data-reading-panel className={styles.panel} style={color('#b45309','#fffbeb')}><h2 data-color-band className={styles.panelTitle}>{tr?'Kritik Kontroller':'Critical Controls'}</h2><div className={styles.controls}>{values.map(x=><div className={styles.control} key={x.value.en+x.label.en}><p className={styles.controlValue}>{x.value[locale]}</p><p className={styles.controlLabel}>{x.label[locale]}</p></div>)}</div>
   {poster.code==='SRN-EL-001'&&<div className={styles.electricalNotes}><p><strong>{tr?'Test Sırası: ':'Test Sequence: '}</strong>{tr?'Bilinen kaynakta test et → devreyi ölç → tekrar bilinen kaynakta doğrula':'Test on a known source → test the circuit → reverify on a known source'}</p></div>}
   <div className={styles.reference}><p className={styles.referenceCaption}>{tr?'Teknik Başvuru · Doğrulama Gerekli':'Technical Reference · Validation Required'}</p><p>{reference?<a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.label}</a>:(tr?'Teknik kaynak tanımlı değil':'Technical reference not defined')}</p>{reference?.additional?.map(ref=><p key={ref.url}><a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label}</a></p>)}{poster.code!=='SRN-HW-001'&&<p>{tr?'Kaynak kapsamını ve yerel kuralları doğrula':'Verify source scope and local requirements'}</p>}</div>
  </div>
  <div data-reading-panel className={styles.panel} style={color('#1e40af','#eff6ff')}><h2 data-color-band className={styles.panelTitle}>{tr?'Riske Göre KKD Seçimi':'Risk-Based PPE Selection'}</h2><div className={styles.ppeList}>{poster.ppe[locale].map((item,i)=><div className={styles.ppe} key={item}><span className={styles.ppeSymbol}><PpeSymbol symbol={profile?.ppeIcons[i]??''} kind={poster.code==='SRN-HW-001'&&i===0?'welding-helmet':undefined}/></span><p className={styles.ppeText}><strong>{item}</strong> — <span data-ppe-selection>{profile?.ppeSelection[i]?.[locale]??(tr?'Tanım eksik':'Definition missing')}</span></p></div>)}</div><p className={styles.note}>{profile?.ppeNote[locale]??(tr?'KKD için yetkili değerlendirme gerekli.':'Competent assessment required for PPE selection.')}</p>
   {poster.code==='SRN-EL-001'&&<div className={styles.electricalNotes}><p><strong>{tr?'Gerilim Sınıfı: ':'Voltage Rating: '}</strong>{tr?'Eldiven ve ekipman çalışma gerilimine uygun olmalı.':'Gloves and equipment must match the working voltage.'}</p><p><strong>{tr?'Ark Riski: ':'Arc Hazard: '}</strong>{tr?'Ark sınıfı risk değerlendirmesine göre seçilmeli.':'Arc rating must be selected from the risk assessment.'}</p></div>}
  </div>
 </section>;
}
