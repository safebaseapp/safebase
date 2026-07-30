export type ChecklistItem = {
  id: string;
  section: string;
  text: string;
  critical?: boolean;
};

export const checklistItems: Record<"en" | "tr", ChecklistItem[]> = {
  en: [
    {
      id: "approved-lifting-plan",
      section: "Planning and Authorization",
      text: "An approved lifting plan is available and matches the actual operation.",
      critical: true,
    },
    {
      id: "competent-team",
      section: "Planning and Authorization",
      text: "The lifting supervisor, operator, rigger and signaler are trained and authorized.",
      critical: true,
    },
    {
      id: "pre-lift-briefing",
      section: "Planning and Authorization",
      text: "A pre-lift briefing has been completed with all involved personnel.",
    },
    {
      id: "load-weight-confirmed",
      section: "Load Assessment",
      text: "The load weight, dimensions and center of gravity are confirmed.",
      critical: true,
    },
    {
      id: "lifting-points-confirmed",
      section: "Load Assessment",
      text: "Approved lifting points are identified and suitable for the load.",
      critical: true,
    },
    {
      id: "load-stability",
      section: "Load Assessment",
      text: "The load is stable and loose parts have been secured.",
      critical: true,
    },
    {
      id: "crane-capacity",
      section: "Crane and Equipment",
      text: "The crane or lifting equipment has adequate rated capacity for the planned lift.",
      critical: true,
    },
    {
      id: "certificates-valid",
      section: "Crane and Equipment",
      text: "Crane, lifting appliance and accessory inspection certificates are valid.",
      critical: true,
    },
    {
      id: "equipment-condition",
      section: "Crane and Equipment",
      text: "The crane and safety devices have been inspected and are in serviceable condition.",
      critical: true,
    },
    {
      id: "ground-condition",
      section: "Crane and Equipment",
      text: "Ground conditions are stable and capable of supporting the crane and load.",
      critical: true,
    },
    {
      id: "outriggers",
      section: "Crane and Equipment",
      text: "Outriggers are fully deployed with suitable mats or support where required.",
      critical: true,
    },
    {
      id: "rigging-selection",
      section: "Rigging Equipment",
      text: "Slings, shackles, hooks and other accessories are correctly selected for the load.",
      critical: true,
    },
    {
      id: "rigging-inspection",
      section: "Rigging Equipment",
      text: "All rigging equipment has been visually inspected before use.",
      critical: true,
    },
    {
      id: "sling-angle",
      section: "Rigging Equipment",
      text: "Sling angles and resulting forces are within acceptable limits.",
    },
    {
      id: "hook-latches",
      section: "Rigging Equipment",
      text: "Hooks have functioning safety latches and are correctly connected.",
    },
    {
      id: "exclusion-zone",
      section: "Work Area Controls",
      text: "A clearly defined and barricaded lifting exclusion zone is established.",
      critical: true,
    },
    {
      id: "personnel-clear",
      section: "Work Area Controls",
      text: "No person is positioned beneath or within the fall zone of a suspended load.",
      critical: true,
    },
    {
      id: "overhead-hazards",
      section: "Work Area Controls",
      text: "Overhead structures, pipelines and electrical lines have been assessed.",
      critical: true,
    },
    {
      id: "travel-path",
      section: "Work Area Controls",
      text: "The lifting and load travel path is clear of obstructions.",
    },
    {
      id: "communication",
      section: "Communication and Execution",
      text: "A clear communication method and one designated signaler are established.",
      critical: true,
    },
    {
      id: "test-lift",
      section: "Communication and Execution",
      text: "A controlled test lift is performed to verify balance, rigging and brake function.",
      critical: true,
    },
    {
      id: "no-side-loading",
      section: "Communication and Execution",
      text: "The lift will not involve side loading, dragging or shock loading.",
      critical: true,
    },
    {
      id: "weather-limits",
      section: "Environmental Conditions",
      text: "Wind speed, visibility and weather conditions are within permitted limits.",
      critical: true,
    },
    {
      id: "landing-area",
      section: "Final Verification",
      text: "The landing area is prepared, stable and clear before the load is moved.",
      critical: true,
    },
  ],

  tr: [
    {
      id: "approved-lifting-plan",
      section: "Planlama ve Yetkilendirme",
      text: "Onaylı kaldırma planı mevcut ve gerçek operasyonla uyumludur.",
      critical: true,
    },
    {
      id: "competent-team",
      section: "Planlama ve Yetkilendirme",
      text: "Kaldırma sorumlusu, operatör, sapancı ve işaretçi eğitimli ve yetkilidir.",
      critical: true,
    },
    {
      id: "pre-lift-briefing",
      section: "Planlama ve Yetkilendirme",
      text: "Operasyona katılan tüm personelle kaldırma öncesi bilgilendirme yapılmıştır.",
    },
    {
      id: "load-weight-confirmed",
      section: "Yük Değerlendirmesi",
      text: "Yükün ağırlığı, ölçüleri ve ağırlık merkezi doğrulanmıştır.",
      critical: true,
    },
    {
      id: "lifting-points-confirmed",
      section: "Yük Değerlendirmesi",
      text: "Onaylı kaldırma noktaları belirlenmiş ve yük için uygundur.",
      critical: true,
    },
    {
      id: "load-stability",
      section: "Yük Değerlendirmesi",
      text: "Yük dengelidir ve üzerindeki gevşek parçalar sabitlenmiştir.",
      critical: true,
    },
    {
      id: "crane-capacity",
      section: "Vinç ve Ekipman",
      text: "Vinç veya kaldırma ekipmanı planlanan kaldırma için yeterli kapasiteye sahiptir.",
      critical: true,
    },
    {
      id: "certificates-valid",
      section: "Vinç ve Ekipman",
      text: "Vinç, kaldırma ekipmanı ve aksesuarlarının kontrol sertifikaları geçerlidir.",
      critical: true,
    },
    {
      id: "equipment-condition",
      section: "Vinç ve Ekipman",
      text: "Vinç ve güvenlik sistemleri kontrol edilmiş ve kullanılabilir durumdadır.",
      critical: true,
    },
    {
      id: "ground-condition",
      section: "Vinç ve Ekipman",
      text: "Zemin vinci ve yükü güvenli şekilde taşıyabilecek sağlamlıktadır.",
      critical: true,
    },
    {
      id: "outriggers",
      section: "Vinç ve Ekipman",
      text: "Denge ayakları tamamen açılmış ve gerektiğinde uygun takoz veya plakalar kullanılmıştır.",
      critical: true,
    },
    {
      id: "rigging-selection",
      section: "Sapanlama Ekipmanları",
      text: "Sapan, mapa, kanca ve diğer aksesuarlar yüke uygun seçilmiştir.",
      critical: true,
    },
    {
      id: "rigging-inspection",
      section: "Sapanlama Ekipmanları",
      text: "Tüm sapanlama ekipmanları kullanımdan önce görsel olarak kontrol edilmiştir.",
      critical: true,
    },
    {
      id: "sling-angle",
      section: "Sapanlama Ekipmanları",
      text: "Sapan açıları ve oluşan kuvvetler kabul edilebilir sınırlar içerisindedir.",
    },
    {
      id: "hook-latches",
      section: "Sapanlama Ekipmanları",
      text: "Kancaların emniyet mandalları çalışır durumda ve bağlantılar doğrudur.",
    },
    {
      id: "exclusion-zone",
      section: "Çalışma Alanı Kontrolleri",
      text: "Kaldırma alanı açıkça belirlenmiş ve bariyerlerle çevrilmiştir.",
      critical: true,
    },
    {
      id: "personnel-clear",
      section: "Çalışma Alanı Kontrolleri",
      text: "Askıdaki yükün altında veya düşme bölgesinde hiçbir personel bulunmamaktadır.",
      critical: true,
    },
    {
      id: "overhead-hazards",
      section: "Çalışma Alanı Kontrolleri",
      text: "Üst yapılar, boru hatları ve elektrik hatları değerlendirilmiştir.",
      critical: true,
    },
    {
      id: "travel-path",
      section: "Çalışma Alanı Kontrolleri",
      text: "Yükün kaldırma ve taşıma güzergâhı engellerden arındırılmıştır.",
    },
    {
      id: "communication",
      section: "İletişim ve Uygulama",
      text: "Açık bir iletişim yöntemi ve tek bir yetkili işaretçi belirlenmiştir.",
      critical: true,
    },
    {
      id: "test-lift",
      section: "İletişim ve Uygulama",
      text: "Dengeyi, sapanlamayı ve fren sistemini doğrulamak için kontrollü test kaldırması yapılmıştır.",
      critical: true,
    },
    {
      id: "no-side-loading",
      section: "İletişim ve Uygulama",
      text: "Operasyonda yandan çekme, sürükleme veya şok yükleme yapılmayacaktır.",
      critical: true,
    },
    {
      id: "weather-limits",
      section: "Çevresel Koşullar",
      text: "Rüzgâr hızı, görüş ve hava koşulları izin verilen sınırlar içerisindedir.",
      critical: true,
    },
    {
      id: "landing-area",
      section: "Son Doğrulama",
      text: "Yük hareket ettirilmeden önce indirme alanı hazırlanmış, sağlam ve boşaltılmıştır.",
      critical: true,
    },
  ],
};
