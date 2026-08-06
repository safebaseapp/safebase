import type { PosterDefinition } from "./types";

export const lotoPoster: PosterDefinition = {
  code: "SB-LOTO-001",
  revision: "1.0",

  title: {
    tr: "LOTO Kritik Güvenlik Kuralları",
    en: "LOTO Critical Safety Rules",
  },

  slogan: {
    tr: "Enerjiyi Belirle • İzole Et • Kilitle • Sıfır Enerjiyi Doğrula",
    en: "Identify • Isolate • Lock Out • Verify Zero Energy",
  },

  rules: [
    {
      number: "01",
      title: {
        tr: "Enerjileri Belirle",
        en: "Identify Energy Sources",
      },
      items: {
        tr: [
          "Elektrik, mekanik, hidrolik, pnömatik ve termal enerjileri belirle.",
          "Yerçekimi, basınç, kimyasal ve depolanmış enerjiyi unutma.",
          "Makineye özel enerji kontrol prosedürünü incele.",
        ],
        en: [
          "Identify electrical, mechanical, hydraulic, pneumatic and thermal energy.",
          "Include gravity, pressure, chemical and stored energy sources.",
          "Review the machine-specific energy-control procedure.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
    },
    {
      number: "02",
      title: {
        tr: "Personeli Bilgilendir",
        en: "Notify Affected Employees",
      },
      items: {
        tr: [
          "Etkilenen çalışanları kapatma ve LOTO işlemi hakkında bilgilendir.",
          "İşin kapsamını ve tahmini süresini açıkla.",
          "Makinenin yeniden çalıştırılmayacağını belirt.",
        ],
        en: [
          "Notify affected employees before shutdown and lockout.",
          "Explain the work scope and expected duration.",
          "State clearly that the machine must not be restarted.",
        ],
      },
      icon: "training",
      tone: "mandatory",
    },
    {
      number: "03",
      title: {
        tr: "Ekipmanı Kapat",
        en: "Shut Down Equipment",
      },
      items: {
        tr: [
          "Makineyi normal durdurma yöntemiyle kontrollü şekilde kapat.",
          "Ani duruşun oluşturabileceği ek tehlikeleri önle.",
          "Tüm hareketli parçaların tamamen durmasını bekle.",
        ],
        en: [
          "Shut down the machine using its normal stopping procedure.",
          "Prevent additional hazards caused by an uncontrolled shutdown.",
          "Wait until all moving components have fully stopped.",
        ],
      },
      icon: "equipment",
      tone: "mandatory",
    },
    {
      number: "04",
      title: {
        tr: "Enerjiyi İzole Et",
        en: "Isolate Every Energy Source",
      },
      items: {
        tr: [
          "Tüm enerji ayırma cihazlarını güvenli konuma getir.",
          "Vana, şalter, kesici ve beslemeleri fiziksel olarak ayır.",
          "Kumanda butonlarını izolasyon cihazı olarak kabul etme.",
        ],
        en: [
          "Place every energy-isolating device in the safe position.",
          "Physically isolate valves, breakers, disconnects and supplies.",
          "Never use control buttons as energy-isolating devices.",
        ],
      },
      icon: "anchor",
      tone: "mandatory",
    },
    {
      number: "05",
      title: {
        tr: "Kilitle ve Etiketle",
        en: "Apply Locks and Tags",
      },
      items: {
        tr: [
          "Her yetkili çalışan kendi kişisel kilidini uygulasın.",
          "Etikette isim, tarih ve çalışma bilgisi yer alsın.",
          "Grup çalışmalarında onaylı kilit kutusu veya hasp kullan.",
        ],
        en: [
          "Each authorized employee must apply a personal lock.",
          "Include the employee name, date and work information on the tag.",
          "Use an approved group lockbox or hasp for group lockout.",
        ],
      },
      icon: "anchor",
      tone: "mandatory",
    },
    {
      number: "06",
      title: {
        tr: "Depolanmış Enerjiyi Boşalt",
        en: "Control Stored Energy",
      },
      items: {
        tr: [
          "Basıncı boşalt, yayları serbest bırak ve sıcaklığı güvenli seviyeye indir.",
          "Yükseltilmiş parçaları indir veya mekanik olarak destekle.",
          "Enerji yeniden birikebilecekse sürekli kontrol uygula.",
        ],
        en: [
          "Release pressure, restrain springs and reduce temperature safely.",
          "Lower or mechanically block elevated components.",
          "Maintain control when energy may reaccumulate.",
        ],
      },
      icon: "fall",
      tone: "warning",
    },
    {
      number: "07",
      title: {
        tr: "Sıfır Enerjiyi Doğrula",
        en: "Verify Zero Energy",
      },
      items: {
        tr: [
          "Başlatma kumandasını deneyerek beklenmedik hareket olmadığını doğrula.",
          "Gerekli ölçümleri uygun test cihazıyla gerçekleştir.",
          "Test sonrası kumandaları güvenli kapalı konuma getir.",
        ],
        en: [
          "Attempt a normal start to confirm that no movement occurs.",
          "Perform required measurements using suitable test instruments.",
          "Return all controls to the safe off position after testing.",
        ],
      },
      icon: "weather",
      tone: "warning",
    },
    {
      number: "08",
      title: {
        tr: "Güvenli Şekilde Devreye Al",
        en: "Restore Energy Safely",
      },
      items: {
        tr: [
          "Alanı kontrol et; personel, alet ve gereksiz malzemeleri uzaklaştır.",
          "Her çalışan yalnızca kendi kilidini prosedüre göre çıkarsın.",
          "Enerji vermeden önce etkilenen çalışanları bilgilendir.",
        ],
        en: [
          "Inspect the area and remove employees, tools and unnecessary materials.",
          "Each employee must remove only their own lock under the procedure.",
          "Notify affected employees before restoring energy.",
        ],
      },
      icon: "training",
      tone: "information",
    },
  ],

  never: {
    tr: [
      "Tüm enerji kaynakları belirlenmemişse işi hemen durdur",
      "Enerji ayırma cihazları kilitlenmemiş veya etiketlenmemişse işi durdur",
      "Depolanmış veya artık enerji kontrol edilmemişse işi durdur",
      "Sıfır enerji durumu doğrulanmamışsa işe başlama",
      "Başkasının kilidini onaylı özel prosedür dışında kesinlikle çıkarma",
    ],
    en: [
      "Stop work immediately if all hazardous energy sources are not identified",
      "Stop work if energy-isolating devices are not locked and tagged",
      "Stop work if stored or residual energy is not controlled",
      "Do not begin work until zero-energy status has been verified",
      "Never remove another employee's lock outside an approved special procedure",
    ],
  },

  ppe: {
    tr: [
      "Baret",
      "Koruyucu Gözlük",
      "Göreve Uygun Eldiven",
      "Güvenlik Ayakkabısı",
      "Göreve Uygun KKD",
    ],
    en: [
      "Safety Helmet",
      "Safety Glasses",
      "Task-Specific Gloves",
      "Safety Footwear",
      "Task-Specific PPE",
    ],
  },
};
