export type PPEVisual={photo:number;scenes:number[];glow:string;alt:{tr:string;en:string}};

export const ppeVisuals:Record<string,PPEVisual>={
 'EN 397':{photo:19895885,scenes:[19895881,17572741,12357627,19386931,15200451,9754806],glow:'#f59e0b',alt:{tr:'Endüstriyel ortamda koruyucu baret kullanan çalışan',en:'Industrial worker wearing a protective safety helmet'}},
 'EN 361':{photo:8487780,scenes:[19386931,14989317,12357627,17572741,15200451,19895881],glow:'#2563eb',alt:{tr:'Tam vücut emniyet kemeri ve yüksekte çalışma ekipmanı kullanan çalışan',en:'Worker using fall-protection equipment and full body harness'}},
 'EN 355':{photo:14989317,scenes:[8487780,19386931,12357627,17572741,15200451,19895881],glow:'#0891b2',alt:{tr:'Yüksekte çalışma ekipmanıyla çalışan saha personeli',en:'Field worker using work-at-height safety equipment'}},
 'EN 362':{photo:19386931,scenes:[8487780,14989317,12357627,17572741,15200451,19895881],glow:'#475569',alt:{tr:'Düşüş koruma bağlantı sistemlerinin kullanıldığı saha çalışması',en:'Field work using fall-protection connection systems'}},
 'EN 166':{photo:17993024,scenes:[17842695,7562955,8487374,19895885,17572741,16368417],glow:'#0284c7',alt:{tr:'Koruyucu gözlük ve baret kullanan endüstriyel çalışan',en:'Industrial worker wearing protective eyewear and helmet'}},
 'EN 388':{photo:11427400,scenes:[8487374,16368417,8487723,6474342,17842695,7562955],glow:'#ea580c',alt:{tr:'Koruyucu iş eldiveni kullanan çalışan',en:'Worker wearing protective safety gloves'}},
 'EN ISO 374':{photo:209230,scenes:[16368417,8487374,11427400,7562955,17842695,6474342],glow:'#059669',alt:{tr:'Kimyasal koruyucu ekipman ve eldiven kullanan çalışan',en:'Worker using chemical protective equipment and gloves'}},
 'EN 149':{photo:7562955,scenes:[6082416,17842695,17993024,16368417,19386931,8487374],glow:'#4f46e5',alt:{tr:'Partikül maskesi ve koruyucu ekipman kullanan saha çalışanı',en:'Field worker wearing a particle mask and protective equipment'}},
 'EN 352':{photo:8960993,scenes:[9242291,6791514,8487995,19895885,17842695,17572741],glow:'#7c3aed',alt:{tr:'İşitme koruyucu kulaklık kullanan çalışan',en:'Worker wearing hearing-protection earmuffs'}},
 'EN ISO 20345':{photo:29257600,scenes:[8487780,26107201,37578633,19386931,12357627,15200451],glow:'#27272a',alt:{tr:'Şantiyede koruyucu iş ayakkabısı kullanan çalışan',en:'Worker wearing protective safety footwear on site'}}
};

export const pexels=(id:number,w=1400)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const getPPEVisual=(code:string)=>ppeVisuals[code]??ppeVisuals['EN 397'];