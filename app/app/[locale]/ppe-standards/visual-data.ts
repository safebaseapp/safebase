export type PPEImageRef=number|string;
export type PPEVisual={photo:PPEImageRef;scenes:PPEImageRef[];glow:string;alt:{tr:string;en:string}};

const en355PublicDomain='https://upload.wikimedia.org/wikipedia/commons/1/14/Spangdahlem_observes_National_Safety_Stand-Down_%287178347%29.jpg';

export const ppeVisuals:Record<string,PPEVisual>={
 'EN 397':{photo:34965713,scenes:[34965713,10739750,8487733],glow:'#f59e0b',alt:{tr:'Endüstriyel koruyucu baret yakın planı',en:'Close-up of an industrial protective safety helmet'}},
 'EN 361':{photo:8487999,scenes:[8487999,8488021,38346738],glow:'#2563eb',alt:{tr:'Tam vücut emniyet kemeri ve düşüş koruma ekipmanı',en:'Full-body safety harness and fall-protection equipment'}},
 'EN 355':{photo:en355PublicDomain,scenes:[en355PublicDomain,en355PublicDomain,en355PublicDomain],glow:'#0891b2',alt:{tr:'Şok emicili lanyardın gerçek saha kullanımı',en:'Real field use of a shock-absorbing lanyard'}},
 'EN 362':{photo:8729216,scenes:[8729216,5916351,8487999],glow:'#475569',alt:{tr:'Karabina ve düşüş koruma bağlantı elemanı yakın planı',en:'Close-up of a carabiner and fall-protection connector'}},
 'EN 166':{photo:8487779,scenes:[8487779,8487790,8820998],glow:'#0284c7',alt:{tr:'Koruyucu iş gözlüğü yakın planı',en:'Close-up of protective safety eyewear'}},
 'EN 388':{photo:8488007,scenes:[8488007,9754819,11427398],glow:'#ea580c',alt:{tr:'Mekanik risklere karşı koruyucu iş eldiveni yakın planı',en:'Close-up of protective work gloves for mechanical risks'}},
 'EN ISO 374':{photo:4097272,scenes:[4097272,4097276,7147757],glow:'#059669',alt:{tr:'Kimyasal temas için koruyucu eldiven kullanımı',en:'Protective glove use for chemical-contact hazards'}},
 'EN 149':{photo:8487792,scenes:[8487792,8487777,8487788],glow:'#4f46e5',alt:{tr:'Partiküllere karşı filtreli yarım maske yakın planı',en:'Close-up of a filtering half mask against particles'}},
 'EN 352':{photo:9242291,scenes:[9242291,9242291,9242291],glow:'#7c3aed',alt:{tr:'Endüstriyel işitme koruyucu kulaklık yakın planı',en:'Close-up of industrial hearing-protection earmuffs'}},
 'EN ISO 20345':{photo:2236716,scenes:[2236716,2236716,2236716],glow:'#27272a',alt:{tr:'Endüstriyel koruyucu iş botu yakın planı',en:'Close-up of industrial protective safety footwear'}},
 'EN ISO 21420':{photo:30123883,scenes:[30123883,8488007,9754819],glow:'#ea580c',alt:{tr:'Endüstriyel koruyucu eldiven ve doğru PPE kullanımı',en:'Industrial protective gloves and proper PPE use'}},
 'EN 407':{photo:29442964,scenes:[29442964,37293409,7451185],glow:'#dc2626',alt:{tr:'Isı ve alev tehlikesine karşı koruyucu ekipman kullanan endüstriyel çalışan',en:'Industrial worker using protective equipment against heat and flame hazards'}},
 'EN ISO 11611':{photo:30107246,scenes:[30107246,8985724,29442964],glow:'#f97316',alt:{tr:'Kaynak ve sıcak metal işinde profesyonel koruyucu giysi kullanımı',en:'Professional protective clothing during welding and hot-metal work'}},
 'EN ISO 11612':{photo:37293409,scenes:[37293409,7451185,29442930],glow:'#ef4444',alt:{tr:'Fırın ve yüksek ısı ortamında ısı ve aleve karşı koruyucu giysi',en:'Protective clothing against heat and flame in a furnace and high-heat environment'}},
 'EN ISO 20471':{photo:19816447,scenes:[19816447,8487342,32467382],glow:'#eab308',alt:{tr:'Gerçek saha ortamında yüksek görünürlüklü koruyucu giysi',en:'High-visibility protective clothing in a real worksite environment'}},
 'EN IEC 61482-2':{photo:8986038,scenes:[8986038,257736,159298],glow:'#f59e0b',alt:{tr:'Elektrik ekipmanı üzerinde çalışan profesyonel teknisyen ve koruyucu iş giysisi',en:'Professional technician working on electrical equipment in protective workwear'}},
 'EN 1149-5':{photo:8986038,scenes:[8986038,6196227,30123883],glow:'#0d9488',alt:{tr:'Endüstriyel ortamda profesyonel koruyucu iş giysisi',en:'Professional protective work clothing in an industrial environment'}},
 'EN 50365':{photo:8487342,scenes:[8487342,19816447,34965713],glow:'#eab308',alt:{tr:'Koruyucu baret kullanan endüstriyel çalışan',en:'Industrial worker wearing a protective safety helmet'}},
 'EN 60903':{photo:8986038,scenes:[8986038,30123883,8488007],glow:'#2563eb',alt:{tr:'Elektrik ekipmanı üzerinde çalışma sırasında koruyucu eldiven kullanımı',en:'Protective glove use while working on electrical equipment'}},
 'EN 136':{photo:8487792,scenes:[8487792,8487777,8487788],glow:'#0f766e',alt:{tr:'Endüstriyel solunum koruması ve yüz koruyucu maske kullanımı',en:'Industrial respiratory protection and face-mask use'}},
};

export const pexels=(id:PPEImageRef,w=1400)=>typeof id==='string'?id:`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const getPPEVisual=(code:string)=>ppeVisuals[code]??ppeVisuals['EN 397'];