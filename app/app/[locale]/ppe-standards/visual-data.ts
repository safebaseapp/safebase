export type PPEImageRef=number|string;
export type PPEVisual={photo:PPEImageRef;scenes:PPEImageRef[];glow:string;alt:{tr:string;en:string}};

const en355ShockAbsorber='https://commons.wikimedia.org/wiki/Special:Redirect/file/PetzlScorpioShockAbsorber.jpg?width=1600';
const en355Lanyard='https://commons.wikimedia.org/wiki/Special:Redirect/file/ViaFerrataLanyardPetzlScorpio.jpg?width=1600';
const en1731MeshForestry='https://imagevault.sca.com/publishedmedia/3t0i4tz0cbwer6tyl02x/R-jning_i_skogen_2544.jpg';
const en1731MeshBrush='https://www.heatleys.com.au/media/catalog/product/5/8/58804f79cdb7cc560b15a61f8007fe88aa7393aa_6c32.jpg?bg-color=255%2C255%2C255&canvas=506%3A506&fit=bounds&height=506&quality=80&width=506';
const en1731MeshLandscaping='https://www.beselettronica.com/userfiles/visietra-ptotettiva-sicurezza-giardinaggio-casco.jpg';
const en812BumpWarehouse='https://cdn11.bigcommerce.com/s-eokud1lf5m/images/stencil/1280x1280/products/880/10839/bump-cap-warehouse-low-clearance-lifestyle__40863.1781923431.webp?c=1';
const en812BumpWorker='https://mstore.co.uk/cdn/shop/files/41dc4cac_2F65154825f54a0416b100007f_2FENB00011XZ_A_I_SR_ENH_SyntisNavyBlue.jpg?v=1749805885&width=1445';
const en812BumpHandling='https://www.ishn.com/ext/resources/Issues/2018/09-September/ISHN0918_F10_pic.webp?t=1535569446';

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
 'EN 50365':{photo:17842834,scenes:[17842834,7359568,7359566],glow:'#eab308',alt:{tr:'Elektrik panosu yanında elektriksel koruyucu baret kullanan teknisyen',en:'Electrical technician wearing a protective helmet beside switchgear'}},
 'EN 60903':{photo:10871737,scenes:[10871737,8853523,21812143],glow:'#2563eb',alt:{tr:'Elektrik panosunda koruyucu eldiven kullanan teknisyen yakın planı',en:'Close-up of a technician using protective gloves at an electrical panel'}},
 'EN 136':{photo:6474117,scenes:[6474117,6804257,17109813],glow:'#0f766e',alt:{tr:'Tam yüz solunum maskesi ve koruyucu giysi kullanan endüstriyel çalışan',en:'Industrial worker wearing a full-face respirator and protective clothing'}},

 'EN 175':{photo:8195876,scenes:[8195876,17294316,9130186],glow:'#f97316',alt:{tr:'Kaynak sırasında göz ve yüz siperi kullanan çalışan',en:'Welder using dedicated eye and face protection during welding'}},
 'EN 169':{photo:14528645,scenes:[14528645,2950117,4561615],glow:'#fb923c',alt:{tr:'Kaynak filtresi ve kaynak siperi lens bölgesi yakın planı',en:'Close-up of welding protector and filter-lens area'}},
 'EN 170':{photo:8821002,scenes:[8821002,9242282,17842695],glow:'#0ea5e9',alt:{tr:'Endüstriyel ortamda UV filtreli koruyucu gözlük kullanan çalışan',en:'Worker using protective eyewear for occupational UV-filter applications'}},
 'EN 172':{photo:30462810,scenes:[30462810,17993024,31983878],glow:'#eab308',alt:{tr:'Güneş parlamalı açık saha ortamında koyu lensli endüstriyel göz koruması',en:'Tinted occupational eye protection in a bright outdoor work environment'}},
 'EN 1731':{photo:en1731MeshForestry,scenes:[en1731MeshForestry,en1731MeshBrush,en1731MeshLandscaping],glow:'#65a30d',alt:{tr:'Ormancılık çalışmasında mesh yüz siperi kullanan çalışan',en:'Forestry worker using a mesh face shield during vegetation cutting'}},
 'EN 812':{photo:en812BumpWarehouse,scenes:[en812BumpWarehouse,en812BumpWorker,en812BumpHandling],glow:'#64748b',alt:{tr:'Düşük açıklıklı depo ortamında endüstriyel darbe başlığı kullanan çalışan',en:'Warehouse worker wearing an industrial bump cap in a low-clearance work area'}},
 'EN 12492':{photo:37818741,scenes:[37818741,13227676,35559603],glow:'#2563eb',alt:{tr:'İple erişim ve yüksekte çalışma bağlamında çene bağlı tırmanış tipi baret',en:'Chinstrap climbing-style helmet in a rope-access and height-work context'}},
 'EN 405':{photo:5493657,scenes:[5493657,5493660,10088317],glow:'#7c3aed',alt:{tr:'Gaz ve kombine filtreli yarım maske kullanan endüstriyel çalışan',en:'Industrial worker using a filtering half mask for gas or combined-filter protection'}},
 'EN 143':{photo:4981771,scenes:[4981771,8487792,8487777],glow:'#0f766e',alt:{tr:'Partikül filtreli solunum koruması kullanan çalışan',en:'Worker using particulate-filter respiratory protection'}},
 'EN 14387':{photo:9537274,scenes:[9537274,14274388,11993162],glow:'#334155',alt:{tr:'Gaz ve kombine filtre kartuşu bulunan solunum koruyucu yakın planı',en:'Close-up of respiratory protection with gas or combined filter cartridge'}},
};

export const pexels=(id:PPEImageRef,w=1400)=>typeof id==='string'?id:`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const getPPEVisual=(code:string)=>ppeVisuals[code]??ppeVisuals['EN 397'];
