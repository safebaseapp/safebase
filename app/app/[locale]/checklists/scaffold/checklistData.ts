import type { ChecklistItem, Locale } from "./types";

export const checklistItems: Record<Locale, ChecklistItem[]> = {
  en: [
    // GENERAL REQUIREMENTS
    {
      id: "general-competent-erection",
      section: "General Requirements",
      text: "The scaffold has been erected, altered or dismantled only by trained and competent personnel.",
      critical: true,
    },
    {
      id: "general-inspection-tag",
      section: "General Requirements",
      text: "A valid scaffold inspection tag is securely attached at the access point.",
      critical: true,
    },
    {
      id: "general-inspection-valid",
      section: "General Requirements",
      text: "The scaffold inspection remains valid for the current date, shift and site requirements.",
      critical: true,
    },
    {
      id: "general-intended-use",
      section: "General Requirements",
      text: "The scaffold is suitable for the intended work activity and required working height.",
      critical: true,
    },
    {
      id: "general-load-class",
      section: "General Requirements",
      text: "The scaffold load class or permitted loading is identified and understood.",
    },
    {
      id: "general-swl",
      section: "General Requirements",
      text: "The safe working load is displayed where required and has not been exceeded.",
      critical: true,
    },
    {
      id: "general-modification",
      section: "General Requirements",
      text: "No unauthorized modification, removal or relocation of scaffold components is observed.",
      critical: true,
    },

    // FOUNDATION AND BASE
    {
      id: "foundation-ground",
      section: "Foundation and Base",
      text: "The supporting ground or structure is firm, stable and capable of carrying the scaffold load.",
      critical: true,
    },
    {
      id: "foundation-base-plates",
      section: "Foundation and Base",
      text: "Base plates are installed beneath all scaffold standards.",
      critical: true,
    },
    {
      id: "foundation-sole-boards",
      section: "Foundation and Base",
      text: "Suitable sole boards are installed where required to distribute the load.",
      critical: true,
    },
    {
      id: "foundation-jacks",
      section: "Foundation and Base",
      text: "Adjustable base jacks are correctly installed and remain within their permitted extension.",
      critical: true,
    },
    {
      id: "foundation-settlement",
      section: "Foundation and Base",
      text: "No settlement, sinking, tilting or movement is visible at the scaffold base.",
      critical: true,
    },
    {
      id: "foundation-water",
      section: "Foundation and Base",
      text: "There is no standing water, erosion or loss of support around the scaffold foundation.",
    },
    {
      id: "foundation-undermining",
      section: "Foundation and Base",
      text: "Excavation, vehicle movement or nearby work has not undermined the scaffold foundation.",
      critical: true,
    },

    // STRUCTURAL COMPONENTS
    {
      id: "structure-standards",
      section: "Structural Components",
      text: "Standards are vertical, correctly spaced and free from significant damage.",
      critical: true,
    },
    {
      id: "structure-ledgers",
      section: "Structural Components",
      text: "Ledgers are complete, level and securely connected.",
      critical: true,
    },
    {
      id: "structure-transoms",
      section: "Structural Components",
      text: "Transoms and platform supports are correctly positioned and secured.",
      critical: true,
    },
    {
      id: "structure-couplers",
      section: "Structural Components",
      text: "Couplers, clamps and connection devices are correctly installed and tightened.",
      critical: true,
    },
    {
      id: "structure-damaged-tubes",
      section: "Structural Components",
      text: "Scaffold tubes and frames are free from cracks, severe corrosion, bending or deformation.",
      critical: true,
    },
    {
      id: "structure-missing-components",
      section: "Structural Components",
      text: "No standards, ledgers, transoms or other essential structural components are missing.",
      critical: true,
    },
    {
      id: "structure-compatible-parts",
      section: "Structural Components",
      text: "Scaffold components are compatible and have not been improvised with unsuitable materials.",
      critical: true,
    },

    // BRACING, TIES AND STABILITY
    {
      id: "stability-facade-bracing",
      section: "Bracing, Ties and Stability",
      text: "Facade or longitudinal bracing is installed in the required locations.",
      critical: true,
    },
    {
      id: "stability-cross-bracing",
      section: "Bracing, Ties and Stability",
      text: "Cross bracing is complete, correctly connected and undamaged.",
      critical: true,
    },
    {
      id: "stability-plan-bracing",
      section: "Bracing, Ties and Stability",
      text: "Plan or horizontal bracing is installed where required by the scaffold design.",
      critical: true,
    },
    {
      id: "stability-ties",
      section: "Bracing, Ties and Stability",
      text: "Scaffold ties are installed at the required spacing and locations.",
      critical: true,
    },
    {
      id: "stability-anchors",
      section: "Bracing, Ties and Stability",
      text: "Anchors and tie points are secure, suitable and free from visible damage.",
      critical: true,
    },
    {
      id: "stability-tie-removal",
      section: "Bracing, Ties and Stability",
      text: "No scaffold tie, anchor or brace has been removed without authorization and replacement control.",
      critical: true,
    },
    {
      id: "stability-free-standing",
      section: "Bracing, Ties and Stability",
      text: "Free-standing or mobile scaffold height and base dimensions remain within the approved limits.",
      critical: true,
    },

    // WORKING PLATFORMS
    {
      id: "platform-fully-decked",
      section: "Working Platforms",
      text: "Working platforms are fully decked for the intended activity.",
      critical: true,
    },
    {
      id: "platform-gaps",
      section: "Working Platforms",
      text: "No dangerous gaps exist between platform units, the scaffold structure or the work face.",
      critical: true,
    },
    {
      id: "platform-condition",
      section: "Working Platforms",
      text: "Platform boards and metal decks are free from cracks, severe damage, deformation or contamination.",
      critical: true,
    },
    {
      id: "platform-secured",
      section: "Working Platforms",
      text: "Platform units are secured against movement, uplift or displacement.",
      critical: true,
    },
    {
      id: "platform-width",
      section: "Working Platforms",
      text: "The platform provides sufficient working width for workers, tools and materials.",
    },
    {
      id: "platform-overhang",
      section: "Working Platforms",
      text: "Platform board overhang is controlled and does not create instability or a trip hazard.",
    },
    {
      id: "platform-loading",
      section: "Working Platforms",
      text: "Materials are distributed safely and the platform is not overloaded.",
      critical: true,
    },
    {
      id: "platform-openings",
      section: "Working Platforms",
      text: "Platform openings, hatches and penetrations are closed or adequately protected.",
      critical: true,
    },

    // EDGE PROTECTION
    {
      id: "edge-top-rails",
      section: "Edge Protection",
      text: "Top guardrails are installed on all exposed platform sides and ends.",
      critical: true,
    },
    {
      id: "edge-mid-rails",
      section: "Edge Protection",
      text: "Midrails or equivalent intermediate protection are installed.",
      critical: true,
    },
    {
      id: "edge-toe-boards",
      section: "Edge Protection",
      text: "Toe boards are installed and complete on exposed platform edges.",
      critical: true,
    },
    {
      id: "edge-end-protection",
      section: "Edge Protection",
      text: "Platform ends, returns and access openings are adequately protected.",
      critical: true,
    },
    {
      id: "edge-guardrail-condition",
      section: "Edge Protection",
      text: "Guardrails and toe boards are secure and free from significant damage.",
      critical: true,
    },
    {
      id: "edge-working-face",
      section: "Edge Protection",
      text: "The gap between the working platform and structure is minimized or otherwise protected.",
      critical: true,
    },

    // ACCESS AND EGRESS
    {
      id: "access-provided",
      section: "Access and Egress",
      text: "A safe and designated means of access and egress is provided.",
      critical: true,
    },
    {
      id: "access-internal-ladder",
      section: "Access and Egress",
      text: "Access ladders or stair towers are installed inside the scaffold where practicable.",
    },
    {
      id: "access-ladder-condition",
      section: "Access and Egress",
      text: "Access ladders are free from damage, contamination and missing rungs.",
      critical: true,
    },
    {
      id: "access-ladder-secured",
      section: "Access and Egress",
      text: "Access ladders are securely fixed against slipping or displacement.",
      critical: true,
    },
    {
      id: "access-landing",
      section: "Access and Egress",
      text: "Ladder landings and rest platforms are provided where required.",
    },
    {
      id: "access-gates",
      section: "Access and Egress",
      text: "Self-closing gates or equivalent protection are installed at access openings.",
      critical: true,
    },
    {
      id: "access-clear",
      section: "Access and Egress",
      text: "Access routes, ladders, stairways and landings are unobstructed.",
      critical: true,
    },
    {
      id: "access-no-climbing",
      section: "Access and Egress",
      text: "Workers are not required to climb scaffold frames, braces or guardrails.",
      critical: true,
    },

    // FALLING OBJECT PROTECTION
    {
      id: "falling-tools-secured",
      section: "Falling Object Protection",
      text: "Tools and loose equipment are secured where they could fall from the scaffold.",
      critical: true,
    },
    {
      id: "falling-material-storage",
      section: "Falling Object Protection",
      text: "Materials are stored away from platform edges and cannot roll or slide.",
      critical: true,
    },
    {
      id: "falling-debris-net",
      section: "Falling Object Protection",
      text: "Debris netting, brick guards or equivalent protection are installed where required.",
    },
    {
      id: "falling-exclusion-zone",
      section: "Falling Object Protection",
      text: "An exclusion zone is established below and around the scaffold where falling-object risk exists.",
      critical: true,
    },
    {
      id: "falling-barricades",
      section: "Falling Object Protection",
      text: "Barricades and warning signs are visible and suitable for the level of risk.",
    },
    {
      id: "falling-overhead-work",
      section: "Falling Object Protection",
      text: "Simultaneous work above and below has been eliminated or properly controlled.",
      critical: true,
    },

    // ELECTRICAL AND SURROUNDING HAZARDS
    {
      id: "hazard-power-lines",
      section: "Electrical and Surrounding Hazards",
      text: "Safe clearance is maintained from overhead lines and other energized equipment.",
      critical: true,
    },
    {
      id: "hazard-cables",
      section: "Electrical and Surrounding Hazards",
      text: "Temporary electrical cables are protected against damage and do not create trip hazards.",
      critical: true,
    },
    {
      id: "hazard-lighting",
      section: "Electrical and Surrounding Hazards",
      text: "Lighting is sufficient for safe access, work and emergency evacuation.",
    },
    {
      id: "hazard-moving-equipment",
      section: "Electrical and Surrounding Hazards",
      text: "The scaffold is protected from vehicle, crane and mobile-equipment impact.",
      critical: true,
    },
    {
      id: "hazard-process",
      section: "Electrical and Surrounding Hazards",
      text: "Nearby process, pressure, heat, chemical and operational hazards have been controlled.",
      critical: true,
    },

    // HOUSEKEEPING
    {
      id: "housekeeping-platforms",
      section: "Housekeeping",
      text: "Working platforms are free from unnecessary waste, loose materials and obstructions.",
    },
    {
      id: "housekeeping-access",
      section: "Housekeeping",
      text: "Access ways, ladders, stairs and landing areas are clean and clear.",
      critical: true,
    },
    {
      id: "housekeeping-slip",
      section: "Housekeeping",
      text: "Oil, mud, ice, water and other slip hazards have been removed or controlled.",
      critical: true,
    },
    {
      id: "housekeeping-protrusions",
      section: "Housekeeping",
      text: "No sharp edges, protruding tubes or exposed components create injury hazards.",
    },
    {
      id: "housekeeping-storage",
      section: "Housekeeping",
      text: "Scaffold materials and work equipment are stored in an orderly and stable manner.",
    },

    // WEATHER AND ENVIRONMENT
    {
      id: "weather-wind",
      section: "Weather and Environmental Conditions",
      text: "Wind conditions are within the permitted limits for scaffold use.",
      critical: true,
    },
    {
      id: "weather-rain-snow",
      section: "Weather and Environmental Conditions",
      text: "Rain, snow and ice conditions have been evaluated and controlled.",
      critical: true,
    },
    {
      id: "weather-lightning",
      section: "Weather and Environmental Conditions",
      text: "Scaffold use has been stopped where lightning or severe weather creates unacceptable risk.",
      critical: true,
    },
    {
      id: "weather-visibility",
      section: "Weather and Environmental Conditions",
      text: "Visibility is sufficient for safe work and access.",
    },
    {
      id: "weather-sheeting",
      section: "Weather and Environmental Conditions",
      text: "Sheeting, netting and temporary coverings have not created excessive wind loading.",
      critical: true,
    },

    // MOBILE SCAFFOLDS
    {
      id: "mobile-castors",
      section: "Mobile Scaffolds",
      text: "Castors and wheels are suitable, undamaged and securely attached.",
      critical: true,
    },
    {
      id: "mobile-brakes",
      section: "Mobile Scaffolds",
      text: "All wheel brakes are engaged before workers access or use the scaffold.",
      critical: true,
    },
    {
      id: "mobile-outriggers",
      section: "Mobile Scaffolds",
      text: "Outriggers or stabilizers are correctly installed where required.",
      critical: true,
    },
    {
      id: "mobile-surface",
      section: "Mobile Scaffolds",
      text: "The mobile scaffold is positioned on a level, firm and obstruction-free surface.",
      critical: true,
    },
    {
      id: "mobile-no-occupants",
      section: "Mobile Scaffolds",
      text: "No person remains on the scaffold while it is being moved.",
      critical: true,
    },

    // FINAL RELEASE
    {
      id: "final-no-critical-defects",
      section: "Final Inspection and Release",
      text: "No unresolved critical defect remains before the scaffold is released for use.",
      critical: true,
    },
    {
      id: "final-corrective-actions",
      section: "Final Inspection and Release",
      text: "Identified defects have been recorded, assigned and controlled.",
      critical: true,
    },
    {
      id: "final-tag-updated",
      section: "Final Inspection and Release",
      text: "The scaffold inspection tag has been updated to reflect the current status.",
      critical: true,
    },
    {
      id: "final-restricted-access",
      section: "Final Inspection and Release",
      text: "Unsafe or incomplete scaffolds are tagged, barricaded and prevented from use.",
      critical: true,
    },
    {
      id: "final-release",
      section: "Final Inspection and Release",
      text: "The scaffold is formally accepted and released for its intended use.",
      critical: true,
    },
  ],

  tr: [
    // GENEL GEREKLİLİKLER
    {
      id: "general-competent-erection",
      section: "Genel Gereklilikler",
      text: "İskele yalnızca eğitimli ve yetkin personel tarafından kurulmuş, değiştirilmiş veya sökülmüş.",
      critical: true,
    },
    {
      id: "general-inspection-tag",
      section: "Genel Gereklilikler",
      text: "Geçerli iskele kontrol etiketi giriş noktasına güvenli şekilde takılmış.",
      critical: true,
    },
    {
      id: "general-inspection-valid",
      section: "Genel Gereklilikler",
      text: "İskele kontrolü güncel tarih, vardiya ve saha gereklilikleri açısından geçerli.",
      critical: true,
    },
    {
      id: "general-intended-use",
      section: "Genel Gereklilikler",
      text: "İskele yapılacak işe ve gerekli çalışma yüksekliğine uygun.",
      critical: true,
    },
    {
      id: "general-load-class",
      section: "Genel Gereklilikler",
      text: "İskele yük sınıfı veya izin verilen yük kapasitesi belirlenmiş ve biliniyor.",
    },
    {
      id: "general-swl",
      section: "Genel Gereklilikler",
      text: "Güvenli çalışma yükü gerekli yerlerde belirtilmiş ve aşılmamış.",
      critical: true,
    },
    {
      id: "general-modification",
      section: "Genel Gereklilikler",
      text: "İskele bileşenlerinde yetkisiz değişiklik, sökme veya yer değiştirme bulunmuyor.",
      critical: true,
    },

    // TEMEL VE TABAN
    {
      id: "foundation-ground",
      section: "Temel ve Taban",
      text: "İskeleyi taşıyan zemin veya yapı sağlam, dengeli ve iskele yükünü taşıyabilecek durumda.",
      critical: true,
    },
    {
      id: "foundation-base-plates",
      section: "Temel ve Taban",
      text: "Tüm iskele dikmelerinin altında taban plakaları bulunuyor.",
      critical: true,
    },
    {
      id: "foundation-sole-boards",
      section: "Temel ve Taban",
      text: "Yükü dağıtmak için gerekli yerlerde uygun taban kalasları kullanılmış.",
      critical: true,
    },
    {
      id: "foundation-jacks",
      section: "Temel ve Taban",
      text: "Ayarlanabilir taban milleri doğru kurulmuş ve izin verilen uzatma sınırları içinde.",
      critical: true,
    },
    {
      id: "foundation-settlement",
      section: "Temel ve Taban",
      text: "İskele tabanında çökme, batma, eğilme veya hareket görülmüyor.",
      critical: true,
    },
    {
      id: "foundation-water",
      section: "Temel ve Taban",
      text: "İskele temelinin çevresinde su birikmesi, erozyon veya destek kaybı bulunmuyor.",
    },
    {
      id: "foundation-undermining",
      section: "Temel ve Taban",
      text: "Kazı, araç hareketi veya yakındaki çalışmalar iskele temelini zayıflatmamış.",
      critical: true,
    },

    // YAPISAL BİLEŞENLER
    {
      id: "structure-standards",
      section: "Yapısal Bileşenler",
      text: "Dikmeler düşey, doğru aralıkta ve ciddi hasardan arındırılmış.",
      critical: true,
    },
    {
      id: "structure-ledgers",
      section: "Yapısal Bileşenler",
      text: "Yatay elemanlar eksiksiz, terazisinde ve güvenli şekilde bağlanmış.",
      critical: true,
    },
    {
      id: "structure-transoms",
      section: "Yapısal Bileşenler",
      text: "Enine elemanlar ve platform destekleri doğru konumlandırılmış ve sabitlenmiş.",
      critical: true,
    },
    {
      id: "structure-couplers",
      section: "Yapısal Bileşenler",
      text: "Kelepçeler, bağlantılar ve birleştirme elemanları doğru takılmış ve sıkılmış.",
      critical: true,
    },
    {
      id: "structure-damaged-tubes",
      section: "Yapısal Bileşenler",
      text: "İskele boruları ve çerçeveleri çatlak, ciddi korozyon, eğilme veya deformasyon içermiyor.",
      critical: true,
    },
    {
      id: "structure-missing-components",
      section: "Yapısal Bileşenler",
      text: "Dikme, yatay eleman, enine eleman veya diğer temel yapısal bileşenlerde eksik bulunmuyor.",
      critical: true,
    },
    {
      id: "structure-compatible-parts",
      section: "Yapısal Bileşenler",
      text: "İskele bileşenleri birbirleriyle uyumlu ve uygunsuz malzemelerle doğaçlama bağlantı yapılmamış.",
      critical: true,
    },

    // ÇAPRAZLAR, ANKRAJLAR VE DENGE
    {
      id: "stability-facade-bracing",
      section: "Çaprazlar, Ankrajlar ve Denge",
      text: "Cephe veya boyuna çaprazlar gerekli konumlarda kurulmuş.",
      critical: true,
    },
    {
      id: "stability-cross-bracing",
      section: "Çaprazlar, Ankrajlar ve Denge",
      text: "Çapraz destekler eksiksiz, doğru bağlanmış ve hasarsız.",
      critical: true,
    },
    {
      id: "stability-plan-bracing",
      section: "Çaprazlar, Ankrajlar ve Denge",
      text: "İskele tasarımının gerektirdiği yerlerde yatay düzlem çaprazları kurulmuş.",
      critical: true,
    },
    {
      id: "stability-ties",
      section: "Çaprazlar, Ankrajlar ve Denge",
      text: "İskele bağlantıları gerekli aralık ve konumlarda kurulmuş.",
      critical: true,
    },
    {
      id: "stability-anchors",
      section: "Çaprazlar, Ankrajlar ve Denge",
      text: "Ankrajlar ve bağlantı noktaları sağlam, uygun ve görünür hasardan arındırılmış.",
      critical: true,
    },
    {
      id: "stability-tie-removal",
      section: "Çaprazlar, Ankrajlar ve Denge",
      text: "Hiçbir ankraj, bağlantı veya çapraz yetkisiz şekilde sökülmemiş.",
      critical: true,
    },
    {
      id: "stability-free-standing",
      section: "Çaprazlar, Ankrajlar ve Denge",
      text: "Serbest duran veya mobil iskelelerin yükseklik ve taban ölçüleri onaylı sınırlar içinde.",
      critical: true,
    },

    // ÇALIŞMA PLATFORMLARI
    {
      id: "platform-fully-decked",
      section: "Çalışma Platformları",
      text: "Çalışma platformları yapılacak faaliyet için tamamen kapatılmış.",
      critical: true,
    },
    {
      id: "platform-gaps",
      section: "Çalışma Platformları",
      text: "Platform elemanları, iskele yapısı veya çalışma yüzeyi arasında tehlikeli boşluk bulunmuyor.",
      critical: true,
    },
    {
      id: "platform-condition",
      section: "Çalışma Platformları",
      text: "Platform kalasları ve metal platformlar çatlak, ciddi hasar, deformasyon veya kirlilik içermiyor.",
      critical: true,
    },
    {
      id: "platform-secured",
      section: "Çalışma Platformları",
      text: "Platform elemanları hareket, kalkma veya yer değiştirmeye karşı sabitlenmiş.",
      critical: true,
    },
    {
      id: "platform-width",
      section: "Çalışma Platformları",
      text: "Platform çalışanlar, aletler ve malzemeler için yeterli çalışma genişliği sağlıyor.",
    },
    {
      id: "platform-overhang",
      section: "Çalışma Platformları",
      text: "Platform kalaslarının çıkıntıları kontrol altında ve dengesizlik veya takılma riski oluşturmuyor.",
    },
    {
      id: "platform-loading",
      section: "Çalışma Platformları",
      text: "Malzemeler güvenli şekilde dağıtılmış ve platform aşırı yüklenmemiş.",
      critical: true,
    },
    {
      id: "platform-openings",
      section: "Çalışma Platformları",
      text: "Platform açıklıkları, kapakları ve geçiş boşlukları kapalı veya uygun şekilde korunmuş.",
      critical: true,
    },

    // KENAR KORUMASI
    {
      id: "edge-top-rails",
      section: "Kenar Koruması",
      text: "Tüm açık platform kenarları ve uçlarında üst korkuluk bulunuyor.",
      critical: true,
    },
    {
      id: "edge-mid-rails",
      section: "Kenar Koruması",
      text: "Ara korkuluklar veya eşdeğer ara koruma sistemi kurulmuş.",
      critical: true,
    },
    {
      id: "edge-toe-boards",
      section: "Kenar Koruması",
      text: "Açık platform kenarlarında topuk levhaları eksiksiz.",
      critical: true,
    },
    {
      id: "edge-end-protection",
      section: "Kenar Koruması",
      text: "Platform uçları, dönüşler ve erişim açıklıkları uygun şekilde korunmuş.",
      critical: true,
    },
    {
      id: "edge-guardrail-condition",
      section: "Kenar Koruması",
      text: "Korkuluklar ve topuk levhaları sağlam ve ciddi hasardan arındırılmış.",
      critical: true,
    },
    {
      id: "edge-working-face",
      section: "Kenar Koruması",
      text: "Çalışma platformu ile yapı arasındaki boşluk en aza indirilmiş veya başka şekilde korunmuş.",
      critical: true,
    },

    // ERİŞİM VE ÇIKIŞ
    {
      id: "access-provided",
      section: "Erişim ve Çıkış",
      text: "Güvenli ve belirlenmiş giriş-çıkış yöntemi sağlanmış.",
      critical: true,
    },
    {
      id: "access-internal-ladder",
      section: "Erişim ve Çıkış",
      text: "Mümkün olduğu yerlerde erişim merdivenleri veya merdiven kuleleri iskele içerisinde kurulmuş.",
    },
    {
      id: "access-ladder-condition",
      section: "Erişim ve Çıkış",
      text: "Erişim merdivenlerinde hasar, kirlilik veya eksik basamak bulunmuyor.",
      critical: true,
    },
    {
      id: "access-ladder-secured",
      section: "Erişim ve Çıkış",
      text: "Erişim merdivenleri kayma veya yer değiştirmeye karşı güvenli şekilde sabitlenmiş.",
      critical: true,
    },
    {
      id: "access-landing",
      section: "Erişim ve Çıkış",
      text: "Gerekli yerlerde merdiven sahanlıkları ve dinlenme platformları sağlanmış.",
    },
    {
      id: "access-gates",
      section: "Erişim ve Çıkış",
      text: "Erişim açıklıklarında kendiliğinden kapanan kapı veya eşdeğer koruma bulunuyor.",
      critical: true,
    },
    {
      id: "access-clear",
      section: "Erişim ve Çıkış",
      text: "Erişim yolları, merdivenler, basamaklar ve sahanlıklar engelsiz.",
      critical: true,
    },
    {
      id: "access-no-climbing",
      section: "Erişim ve Çıkış",
      text: "Çalışanların iskele çerçevelerine, çaprazlarına veya korkuluklarına tırmanması gerekmiyor.",
      critical: true,
    },

    // DÜŞEN CİSİM KORUMASI
    {
      id: "falling-tools-secured",
      section: "Düşen Cisim Koruması",
      text: "Düşme riski bulunan alet ve ekipmanlar sabitlenmiş.",
      critical: true,
    },
    {
      id: "falling-material-storage",
      section: "Düşen Cisim Koruması",
      text: "Malzemeler platform kenarlarından uzakta ve yuvarlanmayacak veya kaymayacak şekilde depolanmış.",
      critical: true,
    },
    {
      id: "falling-debris-net",
      section: "Düşen Cisim Koruması",
      text: "Gerekli yerlerde güvenlik filesi, tuğla koruması veya eşdeğer sistem kurulmuş.",
    },
    {
      id: "falling-exclusion-zone",
      section: "Düşen Cisim Koruması",
      text: "Düşen cisim riski bulunan iskele altında ve çevresinde yasaklı bölge oluşturulmuş.",
      critical: true,
    },
    {
      id: "falling-barricades",
      section: "Düşen Cisim Koruması",
      text: "Bariyerler ve uyarı levhaları görünür ve risk seviyesine uygun.",
    },
    {
      id: "falling-overhead-work",
      section: "Düşen Cisim Koruması",
      text: "Altlı üstlü eş zamanlı çalışmalar kaldırılmış veya uygun şekilde kontrol altına alınmış.",
      critical: true,
    },

    // ELEKTRİK VE ÇEVRESEL TEHLİKELER
    {
      id: "hazard-power-lines",
      section: "Elektrik ve Çevresel Tehlikeler",
      text: "Enerjili hatlar ve elektrikli ekipmanlardan güvenli mesafe korunuyor.",
      critical: true,
    },
    {
      id: "hazard-cables",
      section: "Elektrik ve Çevresel Tehlikeler",
      text: "Geçici elektrik kabloları hasara karşı korunmuş ve takılma riski oluşturmuyor.",
      critical: true,
    },
    {
      id: "hazard-lighting",
      section: "Elektrik ve Çevresel Tehlikeler",
      text: "Güvenli çalışma, erişim ve acil tahliye için yeterli aydınlatma mevcut.",
    },
    {
      id: "hazard-moving-equipment",
      section: "Elektrik ve Çevresel Tehlikeler",
      text: "İskele araç, vinç ve mobil ekipman çarpmasına karşı korunmuş.",
      critical: true,
    },
    {
      id: "hazard-process",
      section: "Elektrik ve Çevresel Tehlikeler",
      text: "Yakındaki proses, basınç, sıcaklık, kimyasal ve operasyonel tehlikeler kontrol altında.",
      critical: true,
    },

    // SAHA DÜZENİ
    {
      id: "housekeeping-platforms",
      section: "Saha Düzeni",
      text: "Çalışma platformları gereksiz atık, gevşek malzeme ve engellerden arındırılmış.",
    },
    {
      id: "housekeeping-access",
      section: "Saha Düzeni",
      text: "Erişim yolları, merdivenler, basamaklar ve sahanlıklar temiz ve açık.",
      critical: true,
    },
    {
      id: "housekeeping-slip",
      section: "Saha Düzeni",
      text: "Yağ, çamur, buz, su ve diğer kayma riskleri kaldırılmış veya kontrol altına alınmış.",
      critical: true,
    },
    {
      id: "housekeeping-protrusions",
      section: "Saha Düzeni",
      text: "Keskin kenarlar, dışarı taşan borular veya açık bileşenler yaralanma riski oluşturmuyor.",
    },
    {
      id: "housekeeping-storage",
      section: "Saha Düzeni",
      text: "İskele malzemeleri ve çalışma ekipmanları düzenli ve dengeli şekilde depolanmış.",
    },

    // HAVA VE ÇEVRE KOŞULLARI
    {
      id: "weather-wind",
      section: "Hava ve Çevre Koşulları",
      text: "Rüzgâr koşulları iskele kullanımı için izin verilen sınırlar içinde.",
      critical: true,
    },
    {
      id: "weather-rain-snow",
      section: "Hava ve Çevre Koşulları",
      text: "Yağmur, kar ve buzlanma koşulları değerlendirilmiş ve kontrol altına alınmış.",
      critical: true,
    },
    {
      id: "weather-lightning",
      section: "Hava ve Çevre Koşulları",
      text: "Yıldırım veya şiddetli hava kabul edilemez risk oluşturduğunda iskele kullanımı durdurulmuş.",
      critical: true,
    },
    {
      id: "weather-visibility",
      section: "Hava ve Çevre Koşulları",
      text: "Güvenli çalışma ve erişim için görüş mesafesi yeterli.",
    },
    {
      id: "weather-sheeting",
      section: "Hava ve Çevre Koşulları",
      text: "Branda, file ve geçici kaplamalar aşırı rüzgâr yükü oluşturmuyor.",
      critical: true,
    },

    // MOBİL İSKELELER
    {
      id: "mobile-castors",
      section: "Mobil İskeleler",
      text: "Tekerlekler uygun, hasarsız ve güvenli şekilde sabitlenmiş.",
      critical: true,
    },
    {
      id: "mobile-brakes",
      section: "Mobil İskeleler",
      text: "Çalışanlar iskeleye çıkmadan önce tüm tekerlek frenleri kilitlenmiş.",
      critical: true,
    },
    {
      id: "mobile-outriggers",
      section: "Mobil İskeleler",
      text: "Gerekli yerlerde denge ayakları doğru şekilde kurulmuş.",
      critical: true,
    },
    {
      id: "mobile-surface",
      section: "Mobil İskeleler",
      text: "Mobil iskele düz, sağlam ve engelsiz bir zeminde konumlandırılmış.",
      critical: true,
    },
    {
      id: "mobile-no-occupants",
      section: "Mobil İskeleler",
      text: "İskele hareket ettirilirken üzerinde çalışan bulunmuyor.",
      critical: true,
    },

    // SON KONTROL VE KULLANIMA AÇMA
    {
      id: "final-no-critical-defects",
      section: "Son Kontrol ve Kullanıma Açma",
      text: "İskele kullanıma açılmadan önce çözümlenmemiş kritik uygunsuzluk bulunmuyor.",
      critical: true,
    },
    {
      id: "final-corrective-actions",
      section: "Son Kontrol ve Kullanıma Açma",
      text: "Tespit edilen uygunsuzluklar kayıt altına alınmış, sorumlu atanmış ve kontrol altına alınmış.",
      critical: true,
    },
    {
      id: "final-tag-updated",
      section: "Son Kontrol ve Kullanıma Açma",
      text: "İskele kontrol etiketi mevcut durumu gösterecek şekilde güncellenmiş.",
      critical: true,
    },
    {
      id: "final-restricted-access",
      section: "Son Kontrol ve Kullanıma Açma",
      text: "Güvensiz veya tamamlanmamış iskeleler etiketlenmiş, bariyerle çevrilmiş ve kullanımı engellenmiş.",
      critical: true,
    },
    {
      id: "final-release",
      section: "Son Kontrol ve Kullanıma Açma",
      text: "İskele resmi olarak kabul edilmiş ve amaçlanan kullanım için açılmış.",
      critical: true,
    },
  ],
};
