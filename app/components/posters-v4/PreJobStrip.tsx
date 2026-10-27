import type {PosterDefinition} from '@/lib/posters-v2/types';
import {getPosterTechnicalProfile} from '@/lib/posters-v2/technical-profiles';
import styles from './PosterLayout.module.css';
export default function PreJobStrip({locale,poster}:{locale:'tr'|'en';poster:PosterDefinition}){
 const tr=locale==='tr',profile=getPosterTechnicalProfile(poster.code),checks=profile?.preJob.map(x=>x[locale])??[tr?'Teknik tanım eksik: yetkiliye danışın.':'Technical profile missing: consult the responsible person.'];
 return <section className={styles.prejob}><h2 className={styles.prejobTitle}><span>SERNEM · {tr?'İşe Başlamadan Önce Kontrol Et':'Check Before Starting'}</span><span>{tr?'İş Öncesi Kontrol':'Pre-Job Check'}</span></h2><div className={styles.checks}>{checks.map(item=><div key={item} data-prejob-check className={styles.check}><span aria-hidden="true" className={styles.checkmark}>✓</span><span data-critical-text>{item}</span></div>)}</div></section>;
}
