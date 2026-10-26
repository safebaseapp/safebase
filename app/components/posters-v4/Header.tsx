import type {PosterDefinition} from '@/lib/posters-v2/types';
import {getPosterTechnicalProfile,technicalReferences} from '@/lib/posters-v2/technical-profiles';
import styles from './PosterLayout.module.css';
type Props={locale:'tr'|'en';poster:PosterDefinition;qrPath?:string;companyLogoUrl?:string|null};
export default function Header({locale,poster,qrPath,companyLogoUrl}:Props){
 const tr=locale==='tr',profile=getPosterTechnicalProfile(poster.code),ref=profile?technicalReferences[profile.reference]:undefined;
 return <header className={`sernem-poster-header ${styles.header}`}>
  <div className={styles.headerMain}>
   <div className={styles.badges}><span className={styles.badge}>{tr?'İSG Saha Rehberi':'HSE Field Guide'}</span><span className={styles.badge}>{companyLogoUrl?(tr?'Premium Şirket Sürümü':'Premium Company Edition'):'SERNEM Pro Series'}</span><span className={`${styles.badge} ${styles.pending}`}>{tr?'Saha doğrulaması gerekli':'Site validation required'}</span></div>
   <div className={styles.brand}>{companyLogoUrl?<img src={companyLogoUrl} alt={tr?'Şirket logosu':'Company logo'} className={styles.companyLogo}/>:<><p className={styles.brandName}>SERNEM</p><p className={styles.brandCaption}>{tr?'İş Sağlığı ve Güvenliği Kaynakları':'Health and Safety Resources'}</p></>}</div>
   <h1 className={styles.title}>{poster.title[locale]}</h1><p className={styles.slogan}>{poster.slogan[locale]}</p>
   <p className={styles.references} data-critical-text>{ref?<a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label}</a>:(tr?'Teknik tanım eksik':'Technical profile missing')}<span className={styles.scope}>{!ref?(tr?'Kaynak tanımlı değil':'Reference not defined'):ref.jurisdiction==='GB-guidance'?(tr?'HSE · Birleşik Krallık rehberi':'HSE · Great Britain guidance'):(tr?'OSHA · ABD kapsamı':'OSHA · US scope')} · {tr?'Yerel kuralları ayrıca doğrula':'Verify local requirements separately'}</span></p>
  </div>
  <div className={styles.document}><div><p>{tr?'Doküman':'Document'} · {locale.toUpperCase()}</p><p className={styles.documentCode}>{poster.code}</p><p>{tr?'Revizyon':'Revision'} {poster.revision}</p></div><div className={styles.qrRow}><img src={qrPath??`/posters/sernem-qr-${locale}.png`} alt={tr?'SERNEM poster QR kodu':'SERNEM poster QR code'} className={styles.qr}/><p className={styles.qrCopy}>{tr?'Tarayın: dijital poster kütüphanesini açın':'Scan: open the digital poster library'}</p></div></div>
 </header>;
}
