export type PPEImageRef=number|string;
export type PPEVisual={photo:PPEImageRef;scenes:PPEImageRef[];glow:string;alt:{tr:string;en:string}};

const en355ShockAbsorber='https://commons.wikimedia.org/wiki/Special:Redirect/file/PetzlScorpioShockAbsorber.jpg?width=1600';
const en355Lanyard='https://commons.wikimedia.org/wiki/Special:Redirect/file/ViaFerrataLanyardPetzlScorpio.jpg?width=1600';

// PPE hero visual audit — 2026-09-28
// Rules: the PPE type/hazard must be obvious at first glance, avoid misleading
// adjacent PPE categories, avoid brand-led product photography, and prefer real
// industrial context where the standard depends on the work/hazard environment.
export const ppeVisuals:Record<string,PPEVisual>={
 'EN 397':{photo:9754808,scenes:[9754808,16217809,10739750],glow:'#f59e0b',alt:{tr:'İşaret ve etiketleri görünen endüstriyel koruyucu baret yakın planı',en:'Close-up of an industrial safety helmet with visible labels and markings'}},
 'EN 361':{photo:8729209,scenes:[8729209,8728539,38346738],glow:'#2563eb',alt:{tr:'Emniyet kemeri bağlantı ve metal donanım detayları',en:'Close-up of safety-harness attachment points and metal hardware'}},
 'EN 355':{photo:en355ShockAbsorber,scenes:[en355ShockAbsorber,en355Lanyard,38346738],glow:'#0891b2',alt:{tr:'Düşüş durdurma sisteminde kullanılan enerji emici şok emici yakın planı',en:'Close-up of an energy absorber used in a fall-arrest lanyard'}},
 'EN 362':{photo:6677388,scenes:[6677388,6676718,5916215],glow:'#475569',alt:{tr:'Karabina ve bağlantı elemanı kilit mekanizması yakın planı',en:'Close-up of a carabiner and connector locking mechanism'}},
 'EN 166':{photo:9242923,scenes:[9242923,8487779,8820998],glow:'#0284c7',alt:{tr:'Endüstriyel koruyucu gözlük ürün yakın planı',en:'Close-up of industrial protective safety glasses'}},
 'EN 388':{photo:9754819,scenes:[9754819,11427398,8488007],glow:'#ea580c',alt:{tr:'Mekanik işlerde kullanılan koruyucu eldiven yüzey ve kullanım detayı',en:'Detailed close-up of protective work gloves for mechanical hazards'}},
 'EN ISO 374':{photo:36759388,scenes:[36759388,9259939,7722657],glow:'#059669',alt:{tr:'Kimyasal transfer sırasında koruyucu eldiven kullanımının yakın planı',en:'Close-up of protective gloves used during chemical handling'}},
 'EN 149':{photo:3993241,scenes:[3993241,8487792,6999572],glow:'#4f46e5',alt:{tr:'Partiküllere karşı filtreli yarım yüz maskelerinin yakın planı',en:'Close-up of particulate-filtering half-mask respirators'}},
 'EN 352':{photo:8488005,scenes:[8488005,8488012,9242291],glow:'#7c3aed',alt:{tr:'İşitme koruması için kulak tıkacı ve kulaklık kullanılan endüstriyel KKD görünümü',en:'Industrial PPE view representing earplugs and earmuff hearing protection'}},
 'EN ISO 20345':{photo:29257600,scenes:[29257600,12846899,37578633],glow:'#27272a',alt:{tr:'Aktif şantiye ortamında markasız koruyucu iş ayakkabısı ve bot kullanımı',en:'Brand-neutral protective safety footwear in an active worksite environment'}},
 'EN ISO 21420':{photo:8488007,scenes:[8488007,8487374,9754819],glow:'#ea580c',alt:{tr:'Koruyucu iş eldiveninin ürün ve yüzey detayları',en:'Product-focused close-up of protective work gloves'}},
 'EN 407':{photo:8488037,scenes:[8488037,25255012,29442964],glow:'#dc2626',alt:{tr:'Isı ve sıcak iş risklerinde kullanılan koruyucu eldiven yakın planı',en:'Close-up of protective gloves used around heat and hot-work hazards'}},
 'EN ISO 11611':{photo:5362681,scenes:[5362681,31349535,9729626],glow:'#f97316',alt:{tr:'Kaynak sırasında koruyucu giysi ve KKD kullanan endüstriyel çalışan',en:'Industrial worker wearing protective clothing and PPE during welding'}},
 'EN ISO 11612':{photo:29442964,scenes:[29442964,3361235,37293409],glow:'#ef4444',alt:{tr:'Yoğun ısı ve alev bulunan endüstriyel sıcak iş ortamında koruyucu giysi',en:'Protective clothing in an industrial hot-work environment with intense heat and flame'}},
 'EN ISO 20471':{photo:19927813,scenes:[19927813,8082525,8487397],glow:'#eab308',alt:{tr:'Gece çalışma ortamında yüksek görünürlüklü reflektif giysi kullanan çalışanlar',en:'Workers wearing high-visibility reflective clothing in a night work environment'}},
 'EN IEC 61482-2':{photo:21812146,scenes:[21812146,10871737,35082106],glow:'#f59e0b',alt:{tr:'Elektrik panosu üzerinde koruyucu iş giysisi ve KKD ile çalışan elektrik teknisyeni',en:'Electrical technician in protective workwear and PPE at an electrical control panel'}},
 'EN 1149-5':{photo:35082106,scenes:[35082106,16368417,32407071],glow:'#0d9488',alt:{tr:'Endüstriyel tesiste tam koruyucu iş giysisi kullanan çalışan',en:'Industrial worker wearing full protective work clothing in a factory setting'}},
 'EN 50365':{photo:21812146,scenes:[21812146,21812143,36673276],glow:'#eab308',alt:{tr:'Elektrik tesisinde koruyucu baret kullanan elektrik çalışanı',en:'Electrical worker wearing a protective helmet at an electrical installation'}},
 'EN 60903':{photo:10871737,scenes:[10871737,8853523,21812143],glow:'#2563eb',alt:{tr:'Elektrik panosunda koruyucu eldiven kullanan teknisyen yakın planı',en:'Close-up of a technician using protective gloves at an electrical panel'}},
 'EN 136':{photo:6474117,scenes:[6474117,6804257,17109813],glow:'#0f766e',alt:{tr:'Tam yüz solunum maskesi ve koruyucu giysi kullanan endüstriyel çalışan',en:'Industrial worker wearing a full-face respirator and protective clothing'}},
};

export const pexels=(id:PPEImageRef,w=1400)=>typeof id==='string'?id:`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const getPPEVisual=(code:string)=>ppeVisuals[code]??ppeVisuals['EN 397'];
