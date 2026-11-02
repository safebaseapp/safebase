import { getMethodExample, type MethodLocale } from "@/lib/content/methodExamples";
import { advancedMethodPresets } from "./advancedMethodPresets";
export type GrowthMethodPreset = {
  slug: string; number: number; icon: string; iconBg: string; button: string;
  activity: Record<MethodLocale,string>;
  description: Record<MethodLocale,string>;
  responsibilities: Record<MethodLocale,string>;
  competency: Record<MethodLocale,string>;
  ppe: Record<MethodLocale,string>;
  tools: Record<MethodLocale,string>;
  permits: Record<MethodLocale,string>;
  environment: Record<MethodLocale,string>;
  stepOwner: Record<MethodLocale,string>;
};
// Additive presets for the existing 20-template generator: no replacement of legacy loaders.
// Safety-critical steps reuse the same carefully bounded source content as public method guides.
const baseGrowthMethodPresets: GrowthMethodPreset[] = [
  {
    "slug": "process-line-breaking",
    "number": 21,
    "icon": "🔧",
    "iconBg": "bg-sky-400/10",
    "button": "bg-sky-400 hover:bg-sky-300",
    "activity": {
      "tr": "Proses Hattı Açma / Flanş Sökümü",
      "en": "Process Line Breaking / Flange Opening"
    },
    "description": {
      "tr": "Hat kimliği, izolasyon, artık basınç, kimyasal kalıntı ve güvenli devreye alma için 5 iş adımı.",
      "en": "Five task stages for line identification, isolation, residual energy, hazardous contents and controlled reinstatement."
    },
    "responsibilities": {
      "tr": "İşletme Yetkilisi: Hat kimliğini, izolasyon planını ve işletme teslimini onaylar.\nMekanik Süpervizör: Onaylı söküm yöntemini ve ekibin görevlerini yönetir.\nİzolasyon Yetkilisi: Enerjisizlik ve proses sınırlarını doğrular.\nHSE: Maruziyet, SIMOPS ve bariyer düzenini denetler.",
      "en": "Operations Authority: Approves line identification, isolation plan and handback.\nMechanical Supervisor: Directs the approved work sequence and personnel.\nIsolation Authority: Verifies absence of energy and process boundaries.\nHSE: Reviews exposure, SIMOPS and exclusion arrangements."
    },
    "competency": {
      "tr": "Proses hatları, LOTO ve tehlikeli ürünler konusunda görev bazlı yetkin mekanik ve işletme personeli; gerekli gaz ölçümü ve acil durum iletişim yetkinliği.",
      "en": "Task-competent mechanical and operations personnel trained for process lines, energy isolation and hazardous substances, with required testing and emergency communication competence."
    },
    "ppe": {
      "tr": "Risk analizine ve SDS'ye göre göz/yüz, el, vücut ve solunum koruması; uygun ayakkabı ve baret. Ürün karakteri bilinmeden PPE seçimi tamamlanmış sayılmaz.",
      "en": "Eye/face, hand, body and respiratory protection selected using the risk assessment and SDS; suitable footwear and head protection. PPE selection must match confirmed process contents."
    },
    "tools": {
      "tr": "Onaylı P&ID ve izolasyon listesi, uygun kilit/etiket, güvenli drenaj/kapalı toplama, uygun el aleti, ölçüm cihazı ve bariyer ekipmanı.",
      "en": "Approved P&ID and isolation register, approved locks/tags, suitable contained draining, task-rated tools, measuring devices and barriers."
    },
    "permits": {
      "tr": "Onaylı PTW ve tesisin hat açma izni; gerektiğinde kimyasal maruziyet, gaz ölçümü, LOTO ve SIMOPS doğrulaması. Bu şablon izin üretmez.",
      "en": "Approved PTW and process line-opening authorization; applicable substance, gas-test, LOTO and SIMOPS checks. This template does not issue a permit."
    },
    "environment": {
      "tr": "Atıkları uygun kapalı kaplarda topla; ürünün toprağa veya drenaja kaçmasını önle. SDS ve saha döküntü prosedürünü uygula.",
      "en": "Contain drained substances in approved receptacles; prevent entry to drains and soil, applying SDS and site spill-response rules."
    },
    "stepOwner": {
      "tr": "İşletme / Mekanik Süpervizör",
      "en": "Operations / Mechanical Supervisor"
    }
  },
  {
    "slug": "pneumatic-pressure-testing",
    "number": 22,
    "icon": "🧭",
    "iconBg": "bg-cyan-400/10",
    "button": "bg-cyan-400 hover:bg-cyan-300",
    "activity": {
      "tr": "Pnömatik Basınç Testi",
      "en": "Pneumatic Pressure Test"
    },
    "description": {
      "tr": "Mühendislik onayı, test sınırı, bariyer, uzaktan izleme ve basınçsızlaştırma için 5 iş adımı.",
      "en": "Five stages for engineered test boundaries, exclusion zones, remote monitoring and controlled depressurization."
    },
    "responsibilities": {
      "tr": "Yetkili Test Mühendisi: Test prosedürünü, sınırları ve kabul kriterlerini onaylar.\nTest Süpervizörü: Rolleri, kontrol noktalarını ve bariyerleri doğrular.\nOperatör: Yalnızca onaylı prosedür ve ekipmanla test yapar.\nHSE: Dışlama alanı ve acil durum koordinasyonunu denetler.",
      "en": "Competent Test Engineer: Approves procedure, boundaries and acceptance criteria.\nTest Supervisor: Confirms roles, hold points and exclusion zones.\nOperator: Uses only approved instructions and equipment.\nHSE: Reviews exclusion and emergency coordination."
    },
    "competency": {
      "tr": "Basınçlı sistem tasarım sınırlarını bilen yetkin mühendis, test ekibi, uygun ölçüm cihazı eğitimi, acil durum ve uzak mesafe izleme koordinasyonu.",
      "en": "Competent engineer familiar with pressure system design limits, trained test crew, instrument use and remote monitoring/emergency coordination."
    },
    "ppe": {
      "tr": "Dışlama alanı ve uzaktan çalışma birincil korumalardır; görev özelinde baret, göz, el ve ayak koruması uygulanır. PPE, enerji açığa çıkma riskini tek başına kontrol etmez.",
      "en": "Exclusion and remote operation are primary safeguards; task-appropriate head, eye, hand and foot protection is supplementary, not a substitute for engineering controls."
    },
    "tools": {
      "tr": "Mühendislikçe onaylı test paketi, derecelendirilmiş geçici bağlantılar, kalibrasyonu uygun göstergeler, emniyet ekipmanı, uzaktan okuma sistemi, bariyer ve haberleşme araçları.",
      "en": "Engineered test package, appropriately rated fittings, calibrated instruments, protective devices, remote indication, barriers and communication equipment."
    },
    "permits": {
      "tr": "Tesis test izni, enerji izolasyon kayıtları ve mühendis tarafından onaylanmış test prosedürü; test basıncı ve ortamı bu şablondan belirlenmez.",
      "en": "Site test authorization, isolation certificates and engineer-approved testing procedure. Pressure and test medium are not defined by this worksheet."
    },
    "environment": {
      "tr": "Test gazı boşaltımını onaylı yönteme göre planla; gürültü ve çevreye etkiler için saha kontrollerini uygula.",
      "en": "Plan release of test gas under the authorized procedure; assess noise and site environmental impacts."
    },
    "stepOwner": {
      "tr": "Test Mühendisi / Test Süpervizörü",
      "en": "Test Engineer / Test Supervisor"
    }
  },
  {
    "slug": "grating-installation",
    "number": 23,
    "icon": "🧱",
    "iconBg": "bg-amber-400/10",
    "button": "bg-amber-400 hover:bg-amber-300",
    "activity": {
      "tr": "Grating / Izgara Montajı ve Açıklık Kontrolü",
      "en": "Grating Installation / Floor Opening Control"
    },
    "description": {
      "tr": "Döşeme açıklığı, bariyer, düşen malzeme, bağlantı kontrolü ve yürüyüş yolu teslimi için 5 adım.",
      "en": "Five steps for openings, edge protection, dropped objects, fixings and walkway handback."
    },
    "responsibilities": {
      "tr": "Saha Süpervizörü: İş sırası ve alternatif erişimi planlar.\nYetkili Montajcı: Tasarım/üreticiye göre grating sabitlemesini yapar.\nYetkili Kontrolör: Bağlantı ve yük taşıma uygunluğunu doğrular.\nHSE: Açıklık ve alt alan korumasını denetler.",
      "en": "Site Supervisor: Plans sequence and alternative access.\nCompetent Installer: Fits grating to design/manufacturer instructions.\nCompetent Inspector: Checks fixings and load suitability.\nHSE: Reviews openings and lower-level protection."
    },
    "competency": {
      "tr": "Yüksekte çalışma, grating montajı, uygun kaldırma ve geçici açıklık koruması konularında yetkin ekip; bağlantıların kabulü için yetkili kontrolör.",
      "en": "Competent personnel for work at height, grating installation, safe handling and temporary opening protection; designated inspector for acceptance."
    },
    "ppe": {
      "tr": "Uygun baret, gözlük, eldiven, emniyet ayakkabısı; riske göre düşüş önleme/durdurma sistemi. Toplu koruma önlemi önceliklidir.",
      "en": "Suitable helmet, eye protection, gloves and safety boots; task-appropriate fall protection where required. Prefer collective fall prevention."
    },
    "tools": {
      "tr": "Onaylı montaj çizimi, boyuta uygun grating ve bağlantı elemanları, uygun kaldırma/taşıma araçları, sert kapak/bariyerler, alet sabitleme ve uygun erişim platformu.",
      "en": "Approved layout drawings, correctly specified grating and fixings, rated lifting/handling aids, rigid covers/barriers, tool securing and safe access platform."
    },
    "permits": {
      "tr": "Yüksekte çalışma/PTW, saha erişim kapatma, kaldırma ve SIMOPS izinleri ilgili işyeri kurallarına göre kontrol edilir.",
      "en": "Applicable work-at-height/PTW, walkway closure, lifting and SIMOPS approvals to be checked against site requirements."
    },
    "environment": {
      "tr": "Sökülen grating ve keskin parçaları kontrol altında istifle; atık metalin doğru ayrılmasını sağla ve erişim yollarını açık tut.",
      "en": "Store removed panels and sharp offcuts safely, segregate scrap metal and maintain alternative access routes."
    },
    "stepOwner": {
      "tr": "Saha Süpervizörü / Montaj Ekibi",
      "en": "Site Supervisor / Installation Crew"
    }
  },
  {
    "slug": "chain-block-lifting",
    "number": 24,
    "icon": "🏗️",
    "iconBg": "bg-orange-400/10",
    "button": "bg-orange-400 hover:bg-orange-300",
    "activity": {
      "tr": "Trifor / Zincirli Ceraskal ile Kaldırma",
      "en": "Tirfor / Chain Hoist Lifting"
    },
    "description": {
      "tr": "Yük ağırlığı, mühendislik onaylı ankraj, kapasite, dışlama alanı ve güvenli yük teslimi için 5 adım.",
      "en": "Five steps for load data, verified anchorage, equipment ratings, exclusion and secure load transfer."
    },
    "responsibilities": {
      "tr": "Kaldırma Sorumlusu: Planı ve ekip yetkinliğini doğrular.\nYetkili Sapancı/Operatör: Ekipmanı kontrol eder ve onaylı yöntemi uygular.\nİşaretçi: İletişimi ve dışlama alanını koordine eder.\nYetkili Mühendis: Gerekli ankraj/taşıyıcı uygunluğunu doğrular.",
      "en": "Lifting Supervisor: Approves plan and crew competence.\nCompetent Rigger/Operator: Inspects equipment and uses approved method.\nSignaler: Coordinates communication and exclusion.\nCompetent Engineer: Verifies anchors and structural capacity as needed."
    },
    "competency": {
      "tr": "Kaldırma planı, yük merkezi, ankraj sınırlamaları, kaldırma ekipmanı muayenesi ve güvenli işaretleşmede görev bazlı yetkinlik.",
      "en": "Task competence in lifting planning, load centre, anchor limitations, lifting equipment inspection and safe signaling."
    },
    "ppe": {
      "tr": "Baret, eldiven, uygun ayakkabı, işaretçiye uygun görünürlük ve görevin riskine göre diğer PPE. Askıdaki yükün altına giriş yasaktır.",
      "en": "Helmet, gloves, safety footwear, signaler visibility and task-specific PPE. Nobody may stand under the suspended load."
    },
    "tools": {
      "tr": "Onaylı kaldırma planı, kapasitesi doğrulanmış Trifor/ceraskal, muayeneli sapan ve bağlantılar, mühendislikçe onaylı ankraj ve bariyerler.",
      "en": "Approved lift plan, capacity-verified tirfor/chain hoist, inspected slings/connectors, engineer-approved anchor points and barriers."
    },
    "permits": {
      "tr": "Kaldırma izni/planı, gerekli geçici yapı mühendislik onayı ve tesis iş izinleri. Normal iskele borusu otomatik ankraj kabul edilmez.",
      "en": "Lifting authorization and plan, any required temporary works engineering approval and site PTW. Ordinary scaffold tubes are not inherently rated anchors."
    },
    "environment": {
      "tr": "İş bitiminde kaldırma ekipmanını yürüyüş yolundan kaldır; hasarlı ekipmanı etiketleyip karantinaya al.",
      "en": "Remove rigging from walkways after use and quarantine damaged equipment with appropriate tags."
    },
    "stepOwner": {
      "tr": "Kaldırma Sorumlusu / Yetkili Operatör",
      "en": "Lifting Supervisor / Competent Operator"
    }
  },
  {
    "slug": "welding-near-operating-plant",
    "number": 25,
    "icon": "🔥",
    "iconBg": "bg-rose-400/10",
    "button": "bg-rose-400 hover:bg-rose-300",
    "activity": {
      "tr": "Çalışan Tesiste Kaynak / Sıcak Çalışma",
      "en": "Welding / Hot Work Near Operating Plant"
    },
    "description": {
      "tr": "SIMOPS, sıcak çalışma izni, gaz ve yangın önleme, duman kontrolü ve iş bitimi gözetimi için 5 adım.",
      "en": "Five stages for SIMOPS, ignition prevention, welding fume control, fire watch and close-out."
    },
    "responsibilities": {
      "tr": "İşletme/PTW Yetkilisi: Sıcak çalışma ve yakın proses koşullarını onaylar.\nKaynak Süpervizörü: Kaynakçı ve ekipmanın uygunluğunu doğrular.\nYangın Gözcüsü: İzin kapsamında gözetimi sürdürür.\nHSE: Gaz, yangın, duman ve eşzamanlı işler kontrollerini inceler.",
      "en": "Operations/PTW Authority: Confirms hot-work and process conditions.\nWelding Supervisor: Checks welder and equipment suitability.\nFire Watch: Performs monitoring required by permit.\nHSE: Reviews gas, fire, fume and SIMOPS controls."
    },
    "competency": {
      "tr": "Uygun kaynakçı yetkinliği, sıcak çalışma izni bilgisi, yangın gözcülüğü, kullanılan gaz ölçüm cihazı ve duman maruziyeti kontrolü.",
      "en": "Qualified welders, permit competence, designated fire-watch capability, relevant atmosphere monitoring and welding-fume exposure control."
    },
    "ppe": {
      "tr": "Kaynak maskesi/uygun filtre, yüz-göz koruması, alev geciktirici giysi, kaynak eldiveni, ayakkabı ve risk analizine göre solunum koruması.",
      "en": "Welding helmet with suitable lens, eye/face protection, flame-resistant clothing, gloves, footwear and assessed respiratory protection."
    },
    "tools": {
      "tr": "Kontrollü kaynak ekipmanı ve kabloları, uygun duman emişi, kıvılcım koruması, yangın söndürücü, gaz dedektörü gerektiğinde, bariyerler ve haberleşme.",
      "en": "Inspected welding sets and leads, effective fume extraction, spark shields, extinguishers, gas monitoring where required, barriers and communications."
    },
    "permits": {
      "tr": "Onaylı sıcak çalışma/PTW, işletme SIMOPS kontrolü, gereken gaz ölçümleri ve yangın gözcüsü atanması. Üretilen belge resmi izin değildir.",
      "en": "Approved hot-work/PTW, operations SIMOPS assessment, required gas testing and designated fire watch. This document is not an issued permit."
    },
    "environment": {
      "tr": "Kaynak dumanını uygun emişle kontrol et; sıcak cüruf ve atıkları güvenli topla; proses drenajlarını ve yakın ekipmanı kıvılcımdan koru.",
      "en": "Control fumes with suitable extraction, safely collect hot slag/waste and protect drains and nearby equipment from sparks."
    },
    "stepOwner": {
      "tr": "Kaynak Süpervizörü / Yangın Gözcüsü",
      "en": "Welding Supervisor / Fire Watch"
    }
  },
  {
    "slug": "flange-assembly-and-bolt-up",
    "number": 26,
    "icon": "⚙️",
    "iconBg": "bg-violet-400/10",
    "button": "bg-violet-400 hover:bg-violet-300",
    "activity": {
      "tr": "Flanş Montajı ve Kontrollü Civata Sıkma",
      "en": "Flange Assembly and Controlled Bolt-Up"
    },
    "description": {
      "tr": "Conta, flanş yüzeyi, tork prosedürü, muayene ve işletmeye kontrollü teslim için 5 iş adımı.",
      "en": "Five stages for gasket selection, flange inspection, engineered torque sequence, inspection and handback."
    },
    "responsibilities": {
      "tr": "Mekanik Süpervizör: Onaylı bağlantı prosedürünü ve iş sırasını yönetir.\nYetkili Montajcı: Doğru conta ve cıvata uygulamasını yapar.\nKalite Kontrol: Malzeme, sıkma kaydı ve kabulü doğrular.\nİşletme: İzolasyon ve yeniden devreye alma onayını verir.",
      "en": "Mechanical Supervisor: Directs approved assembly sequence.\nCompetent Fitter: Installs specified gasket and fasteners.\nQuality Control: Verifies materials, tightening records and acceptance.\nOperations: Authorizes isolation and controlled return to service."
    },
    "competency": {
      "tr": "Flanş sınıflandırması, conta/bağlantı malzemesi, tork ekipmanı kullanımı ve kalite kabul şartlarında eğitimli yetkili personel.",
      "en": "Competent personnel trained in flange ratings, gasket/fastener materials, approved torque equipment and quality acceptance."
    },
    "ppe": {
      "tr": "İşin risk analizine uygun göz koruması, eldiven, baret ve emniyet ayakkabısı; kimyasal ürün kalıntısı varsa ilave koruma.",
      "en": "Risk-appropriate eye protection, gloves, helmet and safety footwear, plus substance-specific PPE for residual process contents."
    },
    "tools": {
      "tr": "Onaylı izometrik ve sıkma prosedürü, doğrulanmış conta/cıvata seti, üreticiye uygun tork aletleri, kalibrasyon kanıtı ve kalite kontrol kayıtları.",
      "en": "Approved isometric and bolt-up procedure, specified gaskets/fasteners, suitable torque tools, calibration evidence and inspection records."
    },
    "permits": {
      "tr": "Onaylı PTW, izolasyon sertifikası, varsa hat açma izni ve kalite/test hold point'leri. Tork değeri bu formdan alınmaz.",
      "en": "Approved PTW, isolation certificate, any line-opening approval and quality/test hold points. Torque values must not be inferred from this template."
    },
    "environment": {
      "tr": "Eski conta ve cıvataları malzeme türüne göre ayır; proses ürünü kalıntılarını SDS ve saha atık prosedürüne göre topla.",
      "en": "Segregate used gaskets and fasteners; contain process residues under SDS and site waste-management requirements."
    },
    "stepOwner": {
      "tr": "Mekanik Süpervizör / Kalite Kontrol",
      "en": "Mechanical Supervisor / QA-QC"
    }
  }
];
// Keep the original six specialist presets unchanged and append eight new ones.
export const growthMethodPresets: GrowthMethodPreset[] = [
  ...baseGrowthMethodPresets,
  ...advancedMethodPresets,
];
export function getGrowthMethodExample(slug: string) {
  return getMethodExample(slug) ?? advancedMethodPresets.find((preset) => preset.slug === slug)?.method;
}
