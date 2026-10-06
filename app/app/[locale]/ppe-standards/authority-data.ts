export type AuthorityRecord={
 type:'standard'|'regulation'|'guidance';
 edition:string;
 status:{tr:string;en:string};
 jurisdiction:{tr:string;en:string};
 sourceLabel:string;
 sourceUrl:string;
 verified:string;
 note:{tr:string;en:string};
};

export const ppeAuthority:Record<string,AuthorityRecord>={
 'EN 60903':{
  type:'standard',
  edition:'IEC 60903:2014',
  status:{tr:'Yayımlanmış referans',en:'Published reference'},
  jurisdiction:{tr:'Uluslararası / Avrupa uygulaması',en:'International / European adoption'},
  sourceLabel:'IEC Webstore',
  sourceUrl:'https://webstore.iec.ch/en/publication/3871',
  verified:'2026-10-06',
  note:{tr:'Standart bilgisi ürün seçiminin tek başına kanıtı değildir; üretici beyanı, sınıf, test durumu ve saha risk değerlendirmesi birlikte doğrulanmalıdır.',en:'A standards reference alone is not proof of product suitability; verify manufacturer documentation, class, test status and the task risk assessment together.'}
 },
 'EN 50365':{
  type:'standard',
  edition:'EN 50365:2023',
  status:{tr:'Güncel Avrupa referansı; 2024 düzeltmesi mevcut',en:'Current European reference; 2024 corrigendum available'},
  jurisdiction:{tr:'Avrupa',en:'Europe'},
  sourceLabel:'European Commission / EUR-Lex',
  sourceUrl:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024D2599',
  verified:'2026-10-06',
  note:{tr:'EN 397 işareti tek başına elektriksel yalıtım kanıtı değildir. Gerilim ve uygulama sınırları gerçek ürün dokümanından doğrulanmalıdır.',en:'EN 397 marking alone is not evidence of electrical insulation. Verify voltage and application limits from the actual product documentation.'}
 },
 'EN 1149-5':{
  type:'standard',
  edition:'EN 1149-5:2018',
  status:{tr:'Güncel',en:'Current'},
  jurisdiction:{tr:'Avrupa',en:'Europe'},
  sourceLabel:'BSI Knowledge',
  sourceUrl:'https://knowledge.bsigroup.com/products/protective-clothing-electrostatic-properties-material-performance-and-design-requirements-1',
  verified:'2026-10-06',
  note:{tr:'Bu standart elektrostatik özellikli koruyucu giysiyi kapsar; şebeke gerilimine karşı elektrik çarpması koruması anlamına gelmez.',en:'This standard addresses electrostatic protective clothing; it does not mean protection against electric shock from mains voltage.'}
 }
};

export const getPPEAuthority=(code:string)=>ppeAuthority[code];
