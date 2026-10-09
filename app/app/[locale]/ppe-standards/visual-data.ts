export type PPEImageRef=number|string;
export type PPEVisual={photo:PPEImageRef;scenes:PPEImageRef[];glow:string;alt:{tr:string;en:string}};

// PPE hero visual audit — 2026-09-28
// Rules: the PPE type/hazard must be obvious at first glance, avoid misleading
// adjacent PPE categories, avoid brand-led product photography, and prefer real
// industrial context where the standard depends on the work/hazard environment.
export const ppeVisuals:Record<string,PPEVisual>={
 'EN 397':{photo:9754808,scenes:[9754808,16217809,10739750],glow:'#f59e0b',alt:{tr:'İşaret ve etiketleri görünen endüstriyel koruyucu baret yakın planı',en:'Close-up of an industrial safety helmet with visible labels and markings'}},
 'EN 361':{photo:8729209,scenes:[8729209,8728539,38346738],glow:'#2563eb',alt:{tr:'Emniyet kemeri bağlantı ve metal donanım detayları',en:'Close-up of safety-harness attachment points and metal hardware'}},
 'EN 355':{photo:34019840,scenes:[34019840,38346738,28812508],glow:'#0891b2',alt:{tr:'Düşüş durdurma sistemi ve enerji emicili bağlantı ekipmanı kullanan yüksekte çalışma personeli',en:'Worker using fall-arrest equipment with an energy-absorbing lanyard system at height'}},
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
 'EN 170':{photo:8820998,scenes:[8820998,9242282,32845660],glow:'#0ea5e9',alt:{tr:'Endüstriyel ortamda koruyucu UV filtreli iş gözlüğü kullanan çalışan',en:'Industrial worker wearing occupational UV-filter protective safety eyewear'}},
 'EN 172':{photo:17993024,scenes:[17993024,32407071,9242291],glow:'#eab308',alt:{tr:'Güneşli açık saha ortamında koruyucu gözlük kullanan endüstriyel çalışan',en:'Industrial worker wearing occupational protective eyewear in bright outdoor sunlight'}},
 'EN 1731':{photo:8066055,scenes:[8066055,9057191,4206046],glow:'#65a30d',alt:{tr:'Uçan parçacık riskine karşı yüz siperi kullanan endüstriyel çalışan',en:'Industrial worker using dedicated face protection against flying-particle hazards'}},
 'EN 812':{photo:6169166,scenes:[6169166,4483864,6169163],glow:'#64748b',alt:{tr:'Depo ortamında darbe başlığı tipi koruyucu başlık kullanan çalışan',en:'Warehouse worker wearing cap-style industrial head protection in a low-risk impact environment'}},
 'EN 12492':{photo:11843610,scenes:[11843610,37818741,35559603],glow:'#2563eb',alt:{tr:'İple erişim çalışmasında çene bağlı koruyucu baret kullanan çalışan',en:'Rope-access worker wearing a visible protective helmet with chinstrap'}},
 'EN 405':{photo:6474339,scenes:[6474339,4981782,17647509],glow:'#7c3aed',alt:{tr:'Boyama işinde kartuşlu yarım yüz respiratörü kullanan çalışan',en:'Painter using a half-face respirator with replaceable cartridges'}},
 'EN 143':{photo:4981771,scenes:[4981771,8487792,8487777],glow:'#0f766e',alt:{tr:'Partikül filtreli solunum koruması kullanan çalışan',en:'Worker using particulate-filter respiratory protection'}},
 'EN 14387':{photo:6474339,scenes:[6474339,7258052,17647509],glow:'#334155',alt:{tr:'Değiştirilebilir gaz veya kombine filtreli solunum koruyucu maskenin yakın planı',en:'Close-up of respiratory protection using replaceable gas or combined filter elements'}},
 'EN ISO 16321-1':{photo:9242923,scenes:[9242923],glow:'#1d4ed8',alt:{tr:"Koruyucu iş gözlüğü",en:"Industrial eye protector"}},
 'EN ISO 16321-2':{photo:8195876,scenes:[8195876],glow:'#1d4ed8',alt:{tr:"Kaynak sırasında yüz koruyucu kullanan çalışan",en:"Welder with face protection"}},
 'EN ISO 16321-3':{photo:'/ppe-standards/diagrams/en-iso-16321-3.svg',scenes:['/ppe-standards/diagrams/en-iso-16321-3.svg'],glow:'#1d4ed8',alt:{tr:"Yüz siperi kullanan çalışan; fileli ürün performansı ayrıca doğrulanmalıdır",en:"Worker with a face shield; mesh performance must be verified separately"}},
 'EN ISO 20346':{photo:29257600,scenes:[29257600],glow:'#1d4ed8',alt:{tr:"Koruyucu iş ayakkabısı kullanımı; burun koruma sınıfı fotoğraftan doğrulanamaz",en:"Protective footwear; toe performance cannot be verified from a photo"}},
 'EN ISO 20347':{photo:12846899,scenes:[12846899],glow:'#1d4ed8',alt:{tr:"İş ayakkabısı; EN ISO 20347 işareti ürün üzerinden doğrulanmalıdır",en:"Occupational footwear; verify EN ISO 20347 on the product label"}},
 'EN ISO 13688':{photo:17166070,scenes:[17166070],glow:'#1d4ed8',alt:{tr:"Endüstriyel iş ortamında koruyucu iş kıyafeti giyen personel",en:"Worker wearing protective workwear in an industrial setting"}},
 'EN ISO 13982-1':{photo:4176922,scenes:[4176922],glow:'#1d4ed8',alt:{tr:"Partikül maruziyetine yönelik koruyucu tulum görünümü; Tip 5 etiketten doğrulanır",en:"Protective coverall illustrating particulate work; verify Type 5 marking on product"}},
 'EN 343':{photo:28663712,scenes:[28663712],glow:'#1d4ed8',alt:{tr:"Yağmurluklu inşaat personeli, yağışlı şantiye",en:"Construction worker wearing rain gear at a wet jobsite"}},
 'EN 13034':{photo:16442681,scenes:[16442681],glow:'#1d4ed8',alt:{tr:"Kimyasal işlerde su ve sıvı temasına karşı koruyucu iş giysisi; Tip 6 performansı etiketten doğrulanır",en:"Industrial protective liquid-resistant workwear; verify Type 6 rating on garment label"}},
 'EN 14605':{photo:38989166,scenes:[38989166],glow:'#1d4ed8',alt:{tr:"Kimyasal dökülme müdahalesinde tam vücut koruyucu tulum; Tip 3/4 etiketten doğrulanır",en:"Full-body chemical protective coveralls during spill response; verify Type 3/4 certification on garment"}},
 'EN 511':{photo:6831061,scenes:[6831061],glow:'#1d4ed8',alt:{tr:"Soğuk hava koşullarında kullanılan yalıtımlı kış eldivenleri",en:"Insulated winter gloves in cold outdoor conditions"}},
 'EN 360':{photo:'/ppe-standards/diagrams/en-360.svg',scenes:['/ppe-standards/diagrams/en-360.svg'],glow:'#1d4ed8',alt:{tr:"Yüksekte çalışma düşüş koruma sistemi; geri sarımlı cihaz türü doğrulanmalı",en:"Fall protection at height; verify retractable device type"}},
 'EN 353-2':{photo:8729209,scenes:[8729209],glow:'#1d4ed8',alt:{tr:"Düşüş koruma bağlantı sistemi; kılavuzlu cihaz uyumu ayrıca doğrulanmalı",en:"Fall protection equipment; verify guided-device compatibility"}},
 'EN 358':{photo:38346738,scenes:[38346738],glow:'#1d4ed8',alt:{tr:"Yüksekte çalışma konumlandırma ekipmanı; kullanım amacı etiketten doğrulanmalı",en:"Work-at-height positioning equipment; verify intended use"}},
 'EN 795':{photo:'https://commons.wikimedia.org/wiki/Special:FilePath/Sulz-ASZ_Vorderland-fall_protection_systems_%E2%80%93_safeguards_against_falling-TigaSafe-04ASD.jpg?width=1280',scenes:['https://commons.wikimedia.org/wiki/Special:FilePath/Sulz-ASZ_Vorderland-fall_protection_systems_%E2%80%93_safeguards_against_falling-TigaSafe-04ASD.jpg?width=1280'],glow:'#1d4ed8',alt:{tr:"Gerçek çatı düşüş koruma ankraj sisteminin saha fotoğrafı; ürün sınıfı işaretlerden doğrulanmalı",en:"Real rooftop fall protection anchor system; verify equipment marking and class"}},
 'EN 813':{photo:8728539,scenes:[8728539],glow:'#1d4ed8',alt:{tr:"Kemer ve bağlantı donanımı; oturma kemeri tipi ürün etiketinden doğrulanmalı",en:"Harness fittings; verify sit-harness type on product label"}},
};

export const pexels=(id:PPEImageRef,w=1400)=>typeof id==='string'?id:`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const getPPEVisual=(code:string)=>ppeVisuals[code]??ppeVisuals['EN 397'];
