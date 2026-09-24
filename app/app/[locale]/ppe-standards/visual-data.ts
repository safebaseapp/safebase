export type PPEVisual={photo:number;scenes:number[];glow:string;alt:{tr:string;en:string}};

export const ppeVisuals:Record<string,PPEVisual>={
 'EN 397':{photo:19351986,scenes:[19351986,9754806,38070],glow:'#f59e0b',alt:{tr:'Endüstriyel koruyucu baret yakın planı',en:'Close-up of an industrial protective safety helmet'}},
 'EN 361':{photo:8728539,scenes:[8728539,8728541,8729216],glow:'#2563eb',alt:{tr:'Emniyet kemeri ve bağlantı ekipmanı yakın planı',en:'Close-up of safety harness and connection equipment'}},
 'EN 355':{photo:8729216,scenes:[8729216,8728541,8728539],glow:'#0891b2',alt:{tr:'Düşüş koruma kemeri, bağlantı ve lanyard ekipmanı yakın planı',en:'Close-up of fall-protection harness, connector and lanyard equipment'}},
 'EN 362':{photo:8729216,scenes:[8729216,8728552,8728539],glow:'#475569',alt:{tr:'Karabina ve düşüş koruma bağlantı ekipmanı yakın planı',en:'Close-up of a carabiner and fall-protection connection equipment'}},
 'EN 166':{photo:8487790,scenes:[8487790,8487779,978808],glow:'#0284c7',alt:{tr:'Koruyucu iş gözlüğü yakın planı',en:'Close-up of protective safety eyewear'}},
 'EN 388':{photo:8488007,scenes:[8488007,9754819,11427400],glow:'#ea580c',alt:{tr:'Mekanik risklere karşı koruyucu iş eldiveni yakın planı',en:'Close-up of protective work gloves for mechanical risks'}},
 'EN ISO 374':{photo:4097275,scenes:[4097275,9545082,9894206],glow:'#059669',alt:{tr:'Kimyasal ve biyolojik risklere karşı koruyucu eldiven yakın planı',en:'Close-up of protective gloves for chemical and biological hazards'}},
 'EN 149':{photo:6999572,scenes:[6999572,7120519,5499417],glow:'#4f46e5',alt:{tr:'Partiküllere karşı koruyucu respiratör maske yakın planı',en:'Close-up of a particle-protection respirator mask'}},
 'EN 352':{photo:9242291,scenes:[9242291,6791514,8487995],glow:'#7c3aed',alt:{tr:'Endüstriyel işitme koruyucu kulaklık yakın planı',en:'Close-up of industrial hearing-protection earmuffs'}},
 'EN ISO 20345':{photo:30493107,scenes:[30493107,30493107,30493107],glow:'#27272a',alt:{tr:'Endüstriyel koruyucu iş botu yakın planı',en:'Close-up of industrial protective safety footwear'}}
};

export const pexels=(id:number,w=1400)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const getPPEVisual=(code:string)=>ppeVisuals[code]??ppeVisuals['EN 397'];