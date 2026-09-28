export type PPEImageRef=number|string;
export type PPEVisual={photo:PPEImageRef;scenes:PPEImageRef[];glow:string;alt:{tr:string;en:string}};

const en355PublicDomain='https://upload.wikimedia.org/wikipedia/commons/1/14/Spangdahlem_observes_National_Safety_Stand-Down_%287178347%29.jpg';

export const ppeVisuals:Record<string,PPEVisual>={
 'EN 397':{photo:9754806,scenes:[9754806,34965713,10739750],glow:'#f59e0b',alt:{tr:'İşaret ve etiketleri görülebilen endüstriyel koruyucu baret yakın planı',en:'Close-up of an industrial protective helmet with visible product markings and stickers'}},
 'EN 361':{photo:8728539,scenes:[8728539,8728552,8729209],glow:'#2563eb',alt:{tr:'Tam vücut emniyet kemerinin bağlantı ve ayar detayları',en:'Close-up of full-body harness attachment and adjustment details'}},
 'EN 355':{photo:en355PublicDomain,scenes:[en355PublicDomain,en355PublicDomain,en355PublicDomain],glow:'#0891b2',alt:{tr:'Şok emicili lanyardın gerçek saha kullanımı',en:'Real field use of a shock-absorbing lanyard'}},
 'EN 362':{photo:8729216,scenes:[8729216,5384412,8729209],glow:'#475569',alt:{tr:'Karabina ve düşüş koruma bağlantı elemanı yakın planı',en:'Close-up of a carabiner and fall-protection connector'}},
 'EN 166':{photo:9242919,scenes:[9242919,9242923,9242828],glow:'#0284c7',alt:{tr:'Endüstriyel koruyucu gözlüğün ürün odaklı yakın planı',en:'Product-focused close-up of industrial protective eyewear'}},
 'EN 388':{photo:11427398,scenes:[11427398,9754819,3846440],glow:'#ea580c',alt:{tr:'Mekanik işlerde kullanılan koruyucu eldiven yakın planı',en:'Close-up of protective work gloves used for mechanical tasks'}},
 'EN ISO 374':{photo:36759388,scenes:[36759388,4097272,4097276],glow:'#059669',alt:{tr:'Kimyasal işlem sırasında koruyucu eldiven kullanımı',en:'Protective glove use during chemical handling'}},
 'EN 149':{photo:30413337,scenes:[30413337,8487792,8487777],glow:'#4f46e5',alt:{tr:'Partikül maskesi ve ilgili koruyucu ekipman yakın planı',en:'Close-up of a particulate respirator and related protective equipment'}},
 'EN 352':{photo:8487995,scenes:[8487995,9242291,8487995],glow:'#7c3aed',alt:{tr:'Kulak tıkacı ve işitme korumasının yakın plan saha kullanımı',en:'Close-up field use of an earplug and hearing protection'}},
 'EN ISO 20345':{photo:30493107,scenes:[30493107,2236716,29257600],glow:'#27272a',alt:{tr:'Endüstriyel koruyucu iş botunun taban ve gövde detayları',en:'Close-up of industrial protective work footwear and tread details'}},
 'EN ISO 21420':{photo:9754819,scenes:[9754819,11427398,8487374],glow:'#ea580c',alt:{tr:'Koruyucu iş eldiveninin ürün ve kullanım detayları',en:'Product and use details of protective work gloves'}},
 'EN 407':{photo:35919093,scenes:[35919093,14528645,25255012],glow:'#dc2626',alt:{tr:'Yüksek ısı işinde kullanılan koruyucu eldiven yakın planı',en:'Close-up of protective gloves used during high-heat work'}},
 'EN ISO 11611':{photo:27082729,scenes:[27082729,22863131,31349535],glow:'#f97316',alt:{tr:'Kaynak sırasında profesyonel koruyucu giysi kullanımı',en:'Professional protective clothing used during welding'}},
 'EN ISO 11612':{photo:37293409,scenes:[37293409,29442964,7451185],glow:'#ef4444',alt:{tr:'Yüksek ısı ve alev ortamında koruyucu iş giysisi',en:'Protective work clothing in a high-heat and flame environment'}},
 'EN ISO 20471':{photo:8082525,scenes:[8082525,13984022,19816447],glow:'#eab308',alt:{tr:'Düşük ışıklı endüstriyel ortamda yüksek görünürlüklü iş giysisi',en:'High-visibility workwear in a low-light industrial environment'}},
 'EN IEC 61482-2':{photo:8986038,scenes:[8986038,8853511,257736],glow:'#f59e0b',alt:{tr:'Elektrik ekipmanı üzerinde koruyucu iş giysisiyle çalışan teknisyen',en:'Technician working on electrical equipment in protective workwear'}},
 'EN 1149-5':{photo:16368417,scenes:[16368417,6196227,30123883],glow:'#0d9488',alt:{tr:'Endüstriyel ortamda koruyucu iş giysisi kullanan çalışan',en:'Worker wearing protective clothing in an industrial environment'}},
 'EN 50365':{photo:17842695,scenes:[17842695,9754806,34965713],glow:'#eab308',alt:{tr:'Endüstriyel ortamda koruyucu baret kullanan çalışan yakın planı',en:'Close-up of a worker wearing a protective helmet in an industrial environment'}},
 'EN 60903':{photo:8853511,scenes:[8853511,11427398,8487374],glow:'#2563eb',alt:{tr:'Elektrik işi sırasında koruyucu eldiven kullanılan yakın plan',en:'Close-up of protective glove use during electrical work'}},
 'EN 136':{photo:6474117,scenes:[6474117,17109813,8487792],glow:'#0f766e',alt:{tr:'Tam yüz solunum maskesi ve koruyucu ekipman kullanan çalışan',en:'Worker wearing a full-face respirator and protective equipment'}},
};

export const pexels=(id:PPEImageRef,w=1400)=>typeof id==='string'?id:`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const getPPEVisual=(code:string)=>ppeVisuals[code]??ppeVisuals['EN 397'];