import type {CSSProperties} from 'react';
import type {PosterRule} from '@/lib/posters-v2/types';
import {isTaskIconCode} from '@/lib/posters-v2/task-icons';
import TaskIcon from './TaskIcon';
import PosterIcon from './PosterIcon';
import ConfinedSpaceIcon from './ConfinedSpaceIcon';
import ElectricalIcon from './ElectricalIcon';
import LotoIcon from './LotoIcon';
import FireIcon from './FireIcon';
import PpeRuleIcon from './PpeRuleIcon';
import styles from './PosterLayout.module.css';
const renderers:Partial<Record<string,typeof ConfinedSpaceIcon>>={ 'SRN-CS-001':ConfinedSpaceIcon,'SRN-EL-001':ElectricalIcon,'SRN-LOTO-001':LotoIcon,'SRN-FIRE-001':FireIcon,'SRN-PPE-001':PpeRuleIcon };
export default function RuleCard({locale,rule,posterCode}:{locale:'tr'|'en';rule:PosterRule;posterCode?:string}){
 const tr=locale==='tr',application=rule.application,kind=application?.kind;
 const label=kind==='required-control'?(tr?'ZORUNLU':'REQUIRED'):kind==='conditional-control'?(tr?'KOŞULLU ZORUNLU':'REQUIRED IF'):kind==='hazard-warning'?(tr?'DİKKAT':'WARNING'):kind==='guidance'?(tr?'BİLGİ':'INFORMATION'):(tr?'İNCELEME GEREKLİ':'REVIEW REQUIRED');
 const color=kind==='hazard-warning'?'#b45309':kind==='guidance'?'#1d4ed8':kind==='conditional-control'?'#0e7490':'#047857';
 const Special=posterCode?renderers[posterCode]:undefined;
 const icon=Special?<Special title={rule.title.en}/>:isTaskIconCode(rule.icon)?<TaskIcon code={rule.icon}/>:<PosterIcon type={rule.icon} tone={rule.tone}/>;
 return <article className={styles.card} style={{'--rule-color':color,'--rule-pale':kind==='hazard-warning'?'#fff7ed':kind==='conditional-control'?'#ecfeff':'#f0fdf4'} as CSSProperties} data-rule-id={rule.number} data-tone-kind={kind??'unreviewed'}>
  <div className={styles.cardMeta}><strong className={styles.cardNumber}>{rule.number}</strong><span className={styles.cardBadge}>{label}</span></div>
  <div className={styles.cardHeading}><span className={styles.ruleIcon} role="img" aria-label={rule.title[locale]} data-rule-icon={rule.icon} data-icon-renderer={Special?'topic-specific':isTaskIconCode(rule.icon)?'task':'existing'}><span aria-hidden="true">{icon}</span></span><h2 className={styles.cardTitle}>{rule.title[locale]}</h2></div>
  {application?.kind==='conditional-control'&&<p className={styles.condition} data-critical-text data-rule-condition>{tr?'Koşul: ':'Applies when: '}{application.when[locale]}</p>}
  <ul className={styles.items}>{rule.items[locale].map(item=><li key={item} className={styles.item}><span aria-hidden="true" className={styles.itemMark}>✓</span><span data-critical-text data-rule-body>{item}</span></li>)}</ul>
 </article>;
}
