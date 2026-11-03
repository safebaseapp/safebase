import type { SafetyGuide, LocalizedText } from "../../components/GuideTemplate";
import { specialistRelatedGuide } from "./specialist-related";
type Pair = LocalizedText;
const raw = [
  {
    "slug": "pre-startup-safety-review-pssr",
    "title": {
      "en": "Pre-Startup Safety Review (PSSR): Commissioning Readiness Checklist",
      "tr": "İşletmeye Alma Öncesi Güvenlik İncelemesi (PSSR): Hazırlık Kontrolleri"
    },
    "category": {
      "en": "Process Safety & Commissioning",
      "tr": "Proses Güvenliği ve Devreye Alma"
    },
    "description": {
      "en": "PSSR explained through mechanical completion, procedures, training, safeguards and startup authorization hold points.",
      "tr": "PSSR sürecini mekanik tamamlanma, prosedür, eğitim, korumalar ve devreye alma onay noktalarıyla öğrenin."
    },
    "overview": {
      "en": "Pre-startup safety review is a formal barrier between construction or modification work and the introduction of process hazards. A PSSR team should compare as-built equipment with the design, confirm safety-critical devices and procedures, close or risk-assess outstanding items, and verify that affected operators have been trained. For US OSHA PSM-covered processes, 29 CFR 1910.119(i) sets specific PSSR conditions; other jurisdictions and project contracts may differ. This guide does not authorize energization or chemical introduction: the operating authority must sign off a site-specific PSSR.",
      "tr": "İşletmeye alma öncesi güvenlik incelemesi (PSSR), inşaat/değişiklik ile proses tehlikelerinin tesise alınması arasındaki resmî güvenlik bariyeridir. PSSR ekibi sahadaki ekipmanı tasarımla karşılaştırmalı; emniyet açısından kritik cihazları ve prosedürleri, açık maddelerin durumunu ve operatör eğitimlerini doğrulamalıdır. ABD OSHA PSM kapsamındaki prosesler için 29 CFR 1910.119(i) belirli PSSR şartları koyar; diğer ülkelerde yerel mevzuat ve proje koşulları geçerlidir. Bu rehber enerji verilmesine veya kimyasalın hatta alınmasına izin oluşturmaz; sahaya özgü PSSR işletme yetkilisince onaylanmalıdır."
    },
    "hazards": [
      {
        "en": "Safety-critical relief, interlock or alarm installed incorrectly or not tested",
        "tr": "Emniyet ventili, interlock veya alarmın yanlış montajı ya da test edilmemesi"
      },
      {
        "en": "Open mechanical completion items carried into commissioning without risk evaluation",
        "tr": "Risk değerlendirmesi yapılmadan açık mekanik tamamlanma maddeleriyle devreye almaya geçilmesi"
      },
      {
        "en": "Operators untrained on revised equipment, operating limits and emergency response",
        "tr": "Operatörlerin değişen ekipman, işletme sınırları ve acil duruma ilişkin eğitimsiz olması"
      },
      {
        "en": "Unresolved temporary blinds, jumpers, supports or isolations",
        "tr": "Çözülmemiş geçici körleme, bypass, mesnet veya izolasyonların kalması"
      },
      {
        "en": "As-built P&IDs or equipment lists differing from site installation",
        "tr": "As-built P&ID veya ekipman listesinin sahadaki kurulumla uyuşmaması"
      },
      {
        "en": "Simultaneous construction and start-up affecting adjacent teams",
        "tr": "Devam eden inşaat ile devreye almanın komşu ekipleri etkilemesi"
      }
    ],
    "controls": [
      {
        "en": "Define the PSSR boundary, responsible operations authority and exact startup hold point.",
        "tr": "PSSR kapsamını, işletme yetkilisini ve enerji/ürün verme öncesi kesin durdurma noktasını belirleyin."
      },
      {
        "en": "Compare as-built P&IDs, equipment tags, design requirements and installed protective devices.",
        "tr": "As-built P&ID, ekipman tag, tasarım şartları ve kurulu koruma cihazlarını karşılaştırın."
      },
      {
        "en": "Verify relief devices, shutdown systems, instruments and alarms through documented acceptance tests.",
        "tr": "Emniyet ventilleri, durdurma sistemleri, enstrümanlar ve alarmları kayıtlı kabul testleriyle doğrulayın."
      },
      {
        "en": "Review every open item with accountable owner; critical safety items must be resolved before authorization.",
        "tr": "Her açık maddeyi sorumlusu ile değerlendirin; kritik güvenlik eksikleri onaydan önce çözülmelidir."
      },
      {
        "en": "Confirm current operating, maintenance, emergency and isolation procedures are accessible and understood.",
        "tr": "Güncel işletme, bakım, acil durum ve izolasyon prosedürlerinin erişilebilir ve anlaşılmış olduğunu doğrulayın."
      },
      {
        "en": "Check that affected operators, maintenance and contractors received training appropriate to changed risks.",
        "tr": "İlgili operatör, bakımcı ve yüklenicilerin değişen risklere uygun eğitim aldığını kontrol edin."
      },
      {
        "en": "Record PSSR findings and obtain formal operations sign-off before introducing hazardous energy or chemicals.",
        "tr": "Tehlikeli enerji veya kimyasal verilmeden önce PSSR bulgularını kaydedip resmî işletme onayı alın."
      }
    ],
    "mistakes": [
      {
        "en": "Treating the construction punch list as equivalent to a safety review.",
        "tr": "İnşaat punch listini PSSR yerine geçer sanmak."
      },
      {
        "en": "Closing findings administratively without physical field verification.",
        "tr": "Bulguları fiziksel saha kontrolü olmadan yalnız evrak üzerinde kapatmak."
      },
      {
        "en": "Starting process operations while protection-device testing is incomplete.",
        "tr": "Koruma cihazı testleri tamamlanmadan prosesi başlatmak."
      },
      {
        "en": "Using another facility's PSSR limits without checking local legal and project requirements.",
        "tr": "Başka tesisin PSSR koşullarını yerel mevzuat/projeyi kontrol etmeden kullanmak."
      }
    ],
    "checks": [
      {
        "en": "Equipment and line tags match approved as-built design",
        "tr": "Ekipman ve hat tagleri onaylı as-built tasarımla uyumlu"
      },
      {
        "en": "Safety-critical protective functions passed documented testing",
        "tr": "Kritik koruma fonksiyonları kayıtlı testten geçti"
      },
      {
        "en": "Operating and emergency procedures and training are complete",
        "tr": "İşletme/acil durum prosedürleri ile eğitimler tamamlandı"
      },
      {
        "en": "Open items were dispositioned and critical findings resolved",
        "tr": "Açık maddeler değerlendirildi ve kritik eksikler kapatıldı"
      },
      {
        "en": "Operations startup authorization is documented",
        "tr": "İşletme devreye alma onayı belgelendi"
      }
    ],
    "stop": {
      "en": "Do not introduce energy or chemicals if safety-critical findings, commissioning boundaries, unresolved isolations or competence gaps remain. Return the package to the responsible PSSR authority.",
      "tr": "Kritik güvenlik bulguları, belirsiz devreye alma sınırı, çözülmemiş izolasyon veya yetkinlik açığı varsa enerji ya da kimyasal vermeyin; paketi sorumlu PSSR yetkilisine iade edin."
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1910.147"
    ],
    "related": [
      "mechanical-completion-punch-list",
      "management-of-change-moc",
      "simops-safety"
    ],
    "keywords": {
      "en": "pre startup safety review checklist;PSSR commissioning checklist;PSSR safety verification",
      "tr": "PSSR kontrol listesi;işletmeye alma öncesi güvenlik incelemesi;devreye alma güvenlik kontrolü"
    }
  },
  {
    "slug": "management-of-change-moc",
    "title": {
      "en": "Management of Change (MOC): Process Safety Review and Approval",
      "tr": "Değişiklik Yönetimi (MOC): Proses Güvenliği ve Onay"
    },
    "category": {
      "en": "Process Safety & Change Control",
      "tr": "Proses Güvenliği ve Değişiklik Kontrolü"
    },
    "description": {
      "en": "How to screen technical and temporary changes for hazards, required reviews, approvals, training and return to service.",
      "tr": "Teknik ve geçici değişikliklerde tehlike analizi, gerekli incelemeler, onaylar, eğitim ve devreye dönüş kontrolü."
    },
    "overview": {
      "en": "A seemingly small change to equipment, chemical service, software, operating procedure or temporary bypass can alter the plant's hazard profile. A robust MOC identifies the proposed change and technical basis, evaluates impacts on process and worker safety, updates drawings and procedures, secures competent approvals and communicates changed controls before use. US OSHA PSM requirements at 1910.119(l) apply to covered processes; projects outside that scope must follow their governing legal and contractual system. This guide supports review rather than granting permission to make a change.",
      "tr": "Ekipman, kimyasal servis, yazılım, işletme prosedürü veya geçici bypass üzerinde küçük görünen bir değişiklik tesisin tehlike profilini değiştirebilir. Etkili MOC; değişikliğin teknik gerekçesini tanımlar, proses ve çalışan güvenliğine etkisini değerlendirir, çizim ve prosedürleri günceller, yetkili onaylarını alır ve yeni kontrolleri kullanım öncesi ilgili kişilere duyurur. ABD OSHA PSM 1910.119(l) hükümleri kapsamındaki proseslerde geçerlidir; kapsam dışındaki projeler kendi bağlayıcı hukuk ve sözleşme sistemlerini izlemelidir. Bu rehber değişiklik yapma izni vermez."
    },
    "hazards": [
      {
        "en": "Temporary bypass of an interlock or protective device without risk acceptance",
        "tr": "Koruma/interlock bypass'ının risk kabulü olmadan geçici uygulanması"
      },
      {
        "en": "Change in process fluid, pressure or operating sequence not reflected in hazard analysis",
        "tr": "Proses akışkanı, basınç veya işletme sırası değişiminin risk analizine yansımaması"
      },
      {
        "en": "Changed piping or electrical connection not reflected on P&IDs",
        "tr": "Değişen boru veya elektrik bağlantısının P&ID üzerinde gösterilmemesi"
      },
      {
        "en": "Maintenance crews unaware of revised isolation boundaries",
        "tr": "Bakım ekibinin değişen izolasyon sınırını bilmemesi"
      },
      {
        "en": "Temporary change retained indefinitely without review",
        "tr": "Geçici değişikliğin yeniden gözden geçirilmeden kalıcıya dönüşmesi"
      },
      {
        "en": "Unapproved return to service following a change",
        "tr": "Değişiklik sonrası onaysız devreye alma"
      }
    ],
    "controls": [
      {
        "en": "Document change scope, initiating reason, affected equipment and the intended operating period.",
        "tr": "Değişikliğin kapsamını, gerekçesini, etkilenen ekipmanı ve hedef çalışma süresini belgeleyin."
      },
      {
        "en": "Identify applicable technical, process, maintenance, HSE and operational reviewers.",
        "tr": "Teknik, proses, bakım, HSE ve işletme inceleyicilerini belirleyin."
      },
      {
        "en": "Evaluate consequences for safeguards, compatibility, isolation, alarms and emergency response.",
        "tr": "Koruma sistemleri, uyumluluk, izolasyon, alarmlar ve acil durum üzerindeki etkileri değerlendirin."
      },
      {
        "en": "Define approval and authorization criteria before field implementation.",
        "tr": "Sahada uygulamadan önce onay ve yetkilendirme ölçütlerini belirleyin."
      },
      {
        "en": "Update affected P&IDs, operating documents, permits and training materials.",
        "tr": "Etkilenen P&ID, işletme dokümanı, izin ve eğitim materyallerini güncelleyin."
      },
      {
        "en": "Communicate the change to affected employees and contractors before start-up.",
        "tr": "Başlamadan önce ilgili çalışan ve yüklenicilere değişiklik bilgisini ve kontrollerini aktarın."
      },
      {
        "en": "Track temporary-change expiry and verify reinstatement or formal permanent conversion.",
        "tr": "Geçici değişiklik süresini izleyip eski hâle dönüşü veya resmî kalıcı değişikliği doğrulayın."
      }
    ],
    "mistakes": [
      {
        "en": "Labelling a substantive modification as 'like-for-like' without confirming equivalence.",
        "tr": "Esaslı değişikliği eşdeğerliği doğrulamadan 'aynı parça değişimi' saymak."
      },
      {
        "en": "Approving a bypass by email without hazard review or expiry.",
        "tr": "Bypass'ı tehlike incelemesi veya süre sınırı olmadan e-postayla onaylamak."
      },
      {
        "en": "Updating drawings after the equipment has already restarted.",
        "tr": "Çizimleri ekipman devreye alındıktan sonra güncellemek."
      },
      {
        "en": "Failing to include contractors who work on affected systems.",
        "tr": "Etkilenen sistemlerde çalışan yüklenicileri bilgilendirmemek."
      }
    ],
    "checks": [
      {
        "en": "The change and its technical reason are described unambiguously",
        "tr": "Değişiklik ve teknik gerekçesi açık biçimde tanımlandı"
      },
      {
        "en": "Risk and safeguard impacts were reviewed by competent persons",
        "tr": "Risk ve koruma etkileri yetkin kişilerce incelendi"
      },
      {
        "en": "Required approvals, operating updates and permits are complete",
        "tr": "Gerekli onay, işletme güncellemesi ve izinler tamamlandı"
      },
      {
        "en": "Affected workers and contractors received change communication",
        "tr": "İlgili çalışan ve yükleniciler değişiklik hakkında bilgilendirildi"
      },
      {
        "en": "Temporary change end date and revalidation are assigned",
        "tr": "Geçici değişiklik bitiş ve yeniden değerlendirme tarihi atandı"
      }
    ],
    "stop": {
      "en": "Stop implementation or startup when an unapproved bypass, missing safety review, incomplete procedure update or unresolved protection gap is identified.",
      "tr": "Onaysız bypass, eksik güvenlik incelemesi, tamamlanmamış prosedür güncellemesi veya çözümlenmemiş koruma açığı varsa uygulamayı ya da devreye almayı durdurun."
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1910.147"
    ],
    "related": [
      "pre-startup-safety-review-pssr",
      "line-breaking-safety",
      "contractor-safety-management"
    ],
    "keywords": {
      "en": "management of change MOC checklist;process safety MOC procedure;temporary change control",
      "tr": "MOC değişiklik yönetimi kontrol listesi;geçici değişiklik prosedürü;proses güvenliği değişiklik onayı"
    }
  },
  {
    "slug": "mechanical-completion-punch-list",
    "title": {
      "en": "Mechanical Completion and Punch List: Safety-Critical Handover Controls",
      "tr": "Mekanik Tamamlanma ve Punch List: Kritik Teslim Kontrolleri"
    },
    "category": {
      "en": "Construction Completion & Handover",
      "tr": "İnşaat Tamamlanma ve Teslim"
    },
    "description": {
      "en": "Inspect construction completion records, open items, test certificates and system turnover before commissioning.",
      "tr": "Devreye alma öncesi mekanik tamamlanma kayıtları, açık maddeler, test sertifikaları ve sistem devrini kontrol edin."
    },
    "overview": {
      "en": "Mechanical completion is not simply a visual declaration that construction has ended. Turnover teams must match installation to approved drawings, confirm mechanical integrity evidence, manage open punch items and distinguish construction completion from permission for commissioning or process introduction. Punch-item classification varies by project; no universal A/B severity category should be assumed. Outstanding safety-critical defects require competent disposition and a documented hold before handover. This field guide is a preparation reference and not a signed completion certificate.",
      "tr": "Mekanik tamamlanma, inşaatın bittiğine ilişkin yalnız görsel bir beyan değildir. Teslim ekibi kurulumu onaylı çizimlerle karşılaştırmalı, mekanik bütünlük kanıtlarını kontrol etmeli, açık punch maddelerini yönetmeli ve inşaat tamamlanmasını devreye alma izninden ayırmalıdır. Punch maddelerinin A/B sınıflandırması projeden projeye değişir; evrensel bir şiddet sınıfı varsayılmamalıdır. Kritik güvenlik eksikleri yetkili değerlendirme ve kayıtlı durdurma noktası gerektirir. Bu rehber imzalı mekanik tamamlanma sertifikası değildir."
    },
    "hazards": [
      {
        "en": "Uninspected line, joint or pressure boundary declared complete",
        "tr": "Kontrol edilmemiş hat, bağlantı veya basınç sınırının tamamlandı sayılması"
      },
      {
        "en": "Outstanding temporary construction supports or blanks",
        "tr": "Açık kalan geçici inşaat mesnetleri veya körlemeler"
      },
      {
        "en": "Missing protective guards, labels or safety signs at handover",
        "tr": "Teslim sırasında eksik makine muhafazası, etiket veya güvenlik levhası"
      },
      {
        "en": "Incorrect valve or instrument installation not reconciled with drawings",
        "tr": "Vana veya enstrüman montajının çizimle uyuşmaması"
      },
      {
        "en": "Incomplete pressure-test, NDT or material traceability evidence",
        "tr": "Eksik basınç testi, NDT veya malzeme izlenebilirliği kanıtı"
      },
      {
        "en": "Ownership confusion between construction and commissioning teams",
        "tr": "İnşaat ve devreye alma ekipleri arasında sorumluluk belirsizliği"
      }
    ],
    "controls": [
      {
        "en": "Define system and subsystem turnover boundaries and responsible signatories.",
        "tr": "Sistem/alt sistem teslim sınırlarını ve imza yetkililerini tanımlayın."
      },
      {
        "en": "Compare as-built equipment tags, P&IDs and approved installation drawings on site.",
        "tr": "As-built ekipman etiketlerini, P&ID ve onaylı montaj çizimlerini sahada karşılaştırın."
      },
      {
        "en": "Review material traceability, inspection certificates and test records for applicability.",
        "tr": "Malzeme izlenebilirliği, muayene sertifikası ve test kayıtlarının ilgili sisteme uygunluğunu inceleyin."
      },
      {
        "en": "Record each punch item with location, risk, owner, agreed action and verification evidence.",
        "tr": "Her punch maddesine konum, risk, sorumlu, aksiyon ve doğrulama kanıtı ekleyin."
      },
      {
        "en": "Do not clear safety-critical items by administrative acceptance alone.",
        "tr": "Kritik güvenlik açıklarını yalnız idari kabul ile kapatmayın."
      },
      {
        "en": "Inspect guards, temporary supports, open ends, walkways and safe access before handover.",
        "tr": "Teslimden önce muhafazaları, geçici destekleri, açık uçları, yürüyüş yollarını ve erişimi kontrol edin."
      },
      {
        "en": "Maintain separate authority for mechanical completion, pre-commissioning and startup release.",
        "tr": "Mekanik tamamlanma, ön devreye alma ve proses start onaylarını ayrı yetkilendirin."
      }
    ],
    "mistakes": [
      {
        "en": "Using quantity of closed punch items as proof that the system is safe to energize.",
        "tr": "Kapanan punch sayısını sistemin enerji vermeye uygun olduğunun kanıtı saymak."
      },
      {
        "en": "Applying punch A/B definitions from another contract without verifying project rules.",
        "tr": "Başka projedeki punch A/B tanımını sözleşme kurallarını kontrol etmeden kullanmak."
      },
      {
        "en": "Missing or misfiled pressure-test and inspection records.",
        "tr": "Basınç testini veya muayene kayıtlarını eksik/yanlış dosyalamak."
      },
      {
        "en": "Allowing punch closures without reinspection in the actual field location.",
        "tr": "Punch kapanışında ilgili saha noktasını yeniden kontrol etmemek."
      }
    ],
    "checks": [
      {
        "en": "System boundary and punch owner are documented",
        "tr": "Sistem sınırı ve punch sorumlusu kaydedildi"
      },
      {
        "en": "As-built tags, drawings and material records are reconciled",
        "tr": "As-built tag, çizim ve malzeme kayıtları eşleştirildi"
      },
      {
        "en": "Required NDT, pressure and inspection evidence is available",
        "tr": "Gerekli NDT, basınç ve muayene kanıtları mevcut"
      },
      {
        "en": "Safety-critical open items are resolved or formally held",
        "tr": "Kritik açık maddeler kapandı veya resmî hold kondu"
      },
      {
        "en": "Receiving commissioning team has accepted the turnover package",
        "tr": "Devralan devreye alma ekibi teslim paketini kabul etti"
      }
    ],
    "stop": {
      "en": "Stop handover if a safety-critical defect, unidentified system boundary, missing acceptance test or unapproved change could affect commissioning. Escalate to the documented system owner.",
      "tr": "Kritik güvenlik kusuru, belirsiz sistem sınırı, eksik kabul testi veya onaysız değişiklik devreye almayı etkiliyorsa teslimi durdurun; kayıtlı sistem sorumlusuna bildirin."
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1926.20"
    ],
    "related": [
      "pre-startup-safety-review-pssr",
      "management-of-change-moc",
      "pressure-testing-safety"
    ],
    "keywords": {
      "en": "mechanical completion punch list safety;system turnover checklist;commissioning handover punch items",
      "tr": "mekanik tamamlanma punch list;mekanik tamamlanma kontrol listesi;devreye alma sistem teslimi"
    }
  },
  {
    "slug": "commissioning-permit-handover",
    "title": {
      "en": "Commissioning Permit Handover: SIMOPS, Isolation and Shift Change",
      "tr": "Devreye Alma İş İzni Devri: SIMOPS, İzolasyon ve Vardiya Değişimi"
    },
    "category": {
      "en": "Commissioning & Permit Coordination",
      "tr": "Devreye Alma ve İş İzni Koordinasyonu"
    },
    "description": {
      "en": "Plan safe permit handovers between construction, pre-commissioning and operations with changing energy states.",
      "tr": "İnşaat, ön devreye alma ve işletme arasında değişen enerji durumlarıyla güvenli iş izni devrini planlayın."
    },
    "overview": {
      "en": "During commissioning, equipment can move from construction isolation to temporary power, functional testing and operational control within a short period. Permit handover must therefore verify the actual equipment energy state, isolation owners, active SIMOPS, temporary protections and people working in the area. A signed handover without a field walkdown can leave a crew working under obsolete assumptions. This guide supports permit-system coordination and does not override local permit, lockout or operations-control rules.",
      "tr": "Devreye alma aşamasında ekipman kısa sürede inşaat izolasyonundan geçici enerjiye, fonksiyon testine ve işletme kontrolüne geçebilir. Bu nedenle izin devri sırasında gerçek enerji durumu, izolasyon sorumluları, aktif SIMOPS, geçici korumalar ve sahada çalışan kişiler doğrulanmalıdır. Saha gezisi yapılmadan imzalanan devir belgesi ekibi artık geçerli olmayan varsayımlarla çalıştırabilir. Bu rehber iş izni koordinasyonunu destekler; yerel PTW, LOTO veya işletme kontrol kurallarının yerine geçmez."
    },
    "hazards": [
      {
        "en": "Shift change leaves an open permit with an outdated equipment energy state",
        "tr": "Vardiya değişimiyle açık izindeki ekipman enerji durumunun güncelliğini yitirmesi"
      },
      {
        "en": "Test energization planned in an area where maintenance isolation remains active",
        "tr": "Bakım izolasyonu olan alanda test enerjilendirmesinin planlanması"
      },
      {
        "en": "Two permit authorities controlling the same equipment boundary",
        "tr": "Aynı ekipman sınırını iki farklı izin yetkilisinin yönetmesi"
      },
      {
        "en": "Uncontrolled simultaneous work during steam, air or pressure testing",
        "tr": "Buhar, hava veya basınç testinde kontrolsüz eşzamanlı çalışma"
      },
      {
        "en": "Temporary barricade removed between shifts without status check",
        "tr": "Vardiya arasında geçici bariyerin durum kontrolü olmadan kaldırılması"
      },
      {
        "en": "Uninformed adjacent contractor exposed to newly introduced energy",
        "tr": "Yeni verilen enerjiden komşu yüklenicinin habersiz etkilenmesi"
      }
    ],
    "controls": [
      {
        "en": "List all open PTWs with exact equipment tags, area, shift, scope and issuing authority.",
        "tr": "Tüm açık PTW'leri ekipman tag, alan, vardiya, kapsam ve izin veren yetkiliyle listeleyin."
      },
      {
        "en": "Verify isolation register, lock owners and any planned test energization before handover.",
        "tr": "Devirden önce izolasyon listesini, kilit sorumlularını ve planlı test enerjilendirmesini doğrulayın."
      },
      {
        "en": "Conduct a field walkdown with both outgoing and incoming responsible personnel.",
        "tr": "Devreden ve devralan sorumlularla birlikte saha kontrolü yapın."
      },
      {
        "en": "Review simultaneous activities across construction, operations and commissioning teams.",
        "tr": "İnşaat, işletme ve devreye alma ekiplerinin eşzamanlı işlerini birlikte değerlendirin."
      },
      {
        "en": "Revalidate permits when process state, work scope, boundaries or authorizing persons change.",
        "tr": "Proses durumu, iş kapsamı, sınırlar veya yetki verenler değiştiğinde izinleri yeniden doğrulayın."
      },
      {
        "en": "Confirm barriers, signage, fire watch and standby personnel are still present and competent.",
        "tr": "Bariyer, işaretler, yangın gözcüsü ve hazır bekleyen personelin yerinde/yetkin olduğunu doğrulayın."
      },
      {
        "en": "Record an explicit hold and release decision before affected work resumes.",
        "tr": "Etkilenen iş yeniden başlamadan önce açık bir durdurma ve serbest bırakma kararı kaydedin."
      }
    ],
    "mistakes": [
      {
        "en": "Copying the previous shift's permit without rechecking physical field conditions.",
        "tr": "Önceki vardiya iznini fiziksel saha koşullarını kontrol etmeden kopyalamak."
      },
      {
        "en": "Assuming commissioning testing does not affect other contractors.",
        "tr": "Devreye alma testlerinin diğer yüklenicileri etkilemediğini varsaymak."
      },
      {
        "en": "Handing over lock keys or access rights without clear isolation ownership.",
        "tr": "İzolasyon sorumluluğu netleşmeden kilit anahtarı veya erişim hakkı devretmek."
      },
      {
        "en": "Resuming work immediately after a shift change without permit revalidation.",
        "tr": "Vardiya değişimi sonrası izin yeniden doğrulanmadan çalışmaya başlamak."
      }
    ],
    "checks": [
      {
        "en": "Open PTWs and isolation registers match the actual workfront",
        "tr": "Açık PTW'ler ve izolasyon kayıtları gerçek çalışma alanıyla uyumlu"
      },
      {
        "en": "Outgoing and incoming authorities completed the joint walkdown",
        "tr": "Devreden ve devralan yetkililer ortak saha kontrolünü tamamladı"
      },
      {
        "en": "SIMOPS and planned changes in energy state were reviewed",
        "tr": "SIMOPS ve planlanan enerji değişiklikleri değerlendirildi"
      },
      {
        "en": "Critical barriers, watches and communications are operational",
        "tr": "Kritik bariyer, gözcü ve iletişim düzeni işlevsel"
      },
      {
        "en": "Permit revalidation and restart responsibility is documented",
        "tr": "İzin yeniden doğrulama ve yeniden başlatma sorumluluğu kaydedildi"
      }
    ],
    "stop": {
      "en": "Stop affected work if permit ownership, electrical/process isolation, planned tests or SIMOPS controls are uncertain. Seek a fresh authorization before restarting.",
      "tr": "İzin sorumlusu, elektrik/proses izolasyonu, planlı testler veya SIMOPS kontrolleri belirsizse ilgili işleri durdurun; yeniden başlatmadan önce güncel yetki alın."
    },
    "references": [
      "OSHA 1910.119",
      "OSHA 1910.147"
    ],
    "related": [
      "simops-safety",
      "zero-energy-verification",
      "permit-to-work"
    ],
    "keywords": {
      "en": "commissioning permit handover;PTW shift handover checklist;SIMOPS commissioning permit",
      "tr": "devreye alma izin devri;PTW vardiya değişimi formu;SIMOPS iş izni kontrolü"
    }
  }
];
const toStringList = (items: Pair[], language:"en"|"tr") => items.map(item=>item[language]);
export const specialistProcessGuides: SafetyGuide[] = raw.map(item => ({
  slug:item.slug,
  title:item.title,
  category:item.category,
  description:item.description,
  overview:item.overview,
  readTime:9,
  riskLevel:{en:"High Risk",tr:"Yüksek Risk"},
  standard:"OSHA",
  hazards:{en:toStringList(item.hazards,"en"),tr:toStringList(item.hazards,"tr")},
  controls:{en:toStringList(item.controls,"en"),tr:toStringList(item.controls,"tr")},
  commonMistakes:{en:toStringList(item.mistakes,"en"),tr:toStringList(item.mistakes,"tr")},
  checklist:{
    title:{en:"Field verification and hold points",tr:"Saha doğrulama ve durdurma noktaları"},
    en:toStringList(item.checks,"en"),tr:toStringList(item.checks,"tr")
  },
  emergencySection:{
    title:{en:"Stop-work decision and escalation",tr:"İşi durdurma ve bildirim"},
    content:item.stop,
  },
  references:item.references,
  relatedGuides:item.related.map(specialistRelatedGuide),
  searchKeywords:{
    en:item.keywords.en.split(";").map(s=>s.trim()),
    tr:item.keywords.tr.split(";").map(s=>s.trim()),
  },
  aiText:{
    en:`Use the SERNEM technical guide for ${item.title.en.toLowerCase()} alongside the site-approved permit, engineering package, inspection records and related field forms. Ask SERNEM AI to review missing controls.`,
    tr:`SERNEM'in ${item.title.tr.toLocaleLowerCase("tr-TR")} rehberini sahaya özgü iş izni, mühendislik paketi, muayene kayıtları ve saha formlarıyla birlikte kullanın. Eksik kontrolleri SERNEM AI ile değerlendirin.`,
  },
} satisfies SafetyGuide));
