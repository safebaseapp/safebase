import type { PosterDefinition } from "@/lib/posters-v2/types";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  poster: PosterDefinition;
};

type CriticalValue = {
  value: string;
  label: string;
};



/* SAFEBASE_LADDER_HARNESS_START */
function SafeBaseHarnessIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-12 w-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* shoulders */}
      <path d="M34 20L50 43L66 20" />

      {/* outer shoulder straps */}
      <path d="M34 20L25 53L34 82" />
      <path d="M66 20L75 53L66 82" />

      {/* chest straps */}
      <path d="M29 45H71" />

      {/* centre body */}
      <path d="M50 43V64" />

      {/* leg straps */}
      <path d="M34 82L46 61" />
      <path d="M66 82L54 61" />

      {/* waist belt */}
      <path d="M30 60H70" />

      {/* central D-ring */}
      <circle cx="50" cy="48" r="6" />

      {/* leg loops */}
      <path d="M34 82c5 6 12 7 16 1" />
      <path d="M66 82c-5 6-12 7-16 1" />
    </svg>
  );
}
/* SAFEBASE_LADDER_HARNESS_END */

export default function BottomPanels({
  locale,
  poster,
}: Props) {
  const isTurkish = locale === "tr";

  let values: CriticalValue[];
  let mainReference: string;
  let subReference: string;

  if (poster.code === "SB-PPE-001") {
    values = [
      {
        value: isTurkish ? "RİSK" : "RISK",
        label: isTurkish
          ? "KKD seçimi risk değerlendirmesine dayanır"
          : "PPE selection is based on the risk assessment",
      },
      {
        value: isTurkish ? "UYUM" : "FIT",
        label: isTurkish
          ? "Doğru beden ve birlikte kullanım uyumu"
          : "Correct sizing and compatibility",
      },
      {
        value: isTurkish ? "HER KULLANIM" : "EACH USE",
        label: isTurkish
          ? "Kullanım öncesi görsel kontrol"
          : "Visual inspection before use",
      },
      {
        value: isTurkish ? "HEMEN" : "IMMEDIATE",
        label: isTurkish
          ? "Hasarlı KKD'yi hizmet dışı bırak"
          : "Remove defective PPE from service",
      },
    ];

    mainReference = "OSHA 29 CFR 1910.132";
    subReference = "Personal Protective Equipment";
  } else if (poster.code === "SB-FIRE-001") {
    values = [
      {
        value: "22,9 m",
        label: isTurkish
          ? "Class A söndürücü azami erişim mesafesi"
          : "Maximum Class A extinguisher travel distance",
      },
      {
        value: "15,2 m",
        label: isTurkish
          ? "Class B söndürücü azami erişim mesafesi"
          : "Maximum Class B extinguisher travel distance",
      },
      {
        value: isTurkish ? "AYLIK" : "MONTHLY",
        label: isTurkish
          ? "Taşınabilir söndürücü görsel kontrolü"
          : "Portable extinguisher visual inspection",
      },
      {
        value: isTurkish ? "YILLIK" : "ANNUAL",
        label: isTurkish
          ? "Eğitim ve bakım programı"
          : "Training and maintenance programme",
      },
    ];

    mainReference = "OSHA 29 CFR 1910.38 / 1910.39 / 1910.157";
    subReference = "Emergency Action • Fire Prevention • Extinguishers";
  } else if (poster.code === "SB-LOTO-001") {
    values = [
      {
        value: isTurkish ? "TÜMÜ" : "ALL",
        label: isTurkish
          ? "Tehlikeli enerji kaynakları"
          : "Hazardous energy sources",
      },
      {
        value: "0 ENERJİ",
        label: isTurkish
          ? "İşe başlamadan önce doğrula"
          : "Verify before starting work",
      },
      {
        value: isTurkish ? "KİŞİSEL" : "PERSONAL",
        label: isTurkish
          ? "Her yetkili çalışan kendi kilidini uygular"
          : "Each authorized employee applies a lock",
      },
      {
        value: isTurkish ? "YILLIK" : "ANNUAL",
        label: isTurkish
          ? "Enerji kontrol prosedürü denetimi"
          : "Energy-control procedure inspection",
      },
    ];

    mainReference = "OSHA 29 CFR 1910.147";
    subReference = "Control of Hazardous Energy";
  } else if (poster.code === "SB-EL-001") {
    values = [
      {
        value: "0 V",
        label: isTurkish
          ? "Gerilimsizlik doğrulaması"
          : "Absence-of-voltage verification",
      },
      {
        value: "LOTO",
        label: isTurkish
          ? "Kilitleme ve etiketleme"
          : "Lockout and tagout",
      },
      {
        value: "GFCI / RCD",
        label: isTurkish
          ? "Kaçak akım koruması"
          : "Ground-fault protection",
      },
      {
        value: isTurkish
          ? "YETKİLİ"
          : "QUALIFIED",
        label: isTurkish
          ? "Elektrik işi ve test"
          : "Electrical work and testing",
      },
    ];

    mainReference =
      "OSHA 29 CFR 1910.333 / 1910.334";

    subReference =
      "OSHA 1910 Subpart S • 1926 Subpart K";
  } else if (poster.code === "SB-CS-001") {
    values = [
      {
        value: "19,5–23,5%",
        label: isTurkish
          ? "Kabul edilebilir oksijen aralığı"
          : "Acceptable oxygen range",
      },
      {
        value: "<10% LEL",
        label: isTurkish
          ? "Yanıcı atmosfer giriş sınırı"
          : "Flammable-atmosphere entry limit",
      },
      {
        value: "PEL / STEL",
        label: isTurkish
          ? "Toksik maddeler için izin limitleri"
          : "Permit limits for toxic substances",
      },
      {
        value: isTurkish
          ? "SÜREKLİ"
          : "CONTINUOUS",
        label: isTurkish
          ? "Atmosfer izleme ve alarm"
          : "Atmospheric monitoring and alarms",
      },
    ];

    mainReference = "OSHA 29 CFR 1910.146";
    subReference = "Permit-Required Confined Spaces";
  } else if (poster.code === "SB-HW-001") {
    values = [
      {
        value: "10,7 m",
        label: isTurkish
          ? "Yanıcı madde kontrol mesafesi"
          : "Combustible-control distance",
      },
      {
        value: "30 DK",
        label: isTurkish
          ? "Minimum iş sonrası yangın gözetimi"
          : "Minimum post-work fire watch",
      },
      {
        value: isTurkish
          ? "İZİN"
          : "PERMIT",
        label: isTurkish
          ? "Yazılı sıcak çalışma yetkilendirmesi"
          : "Written hot-work authorization",
      },
      {
        value: isTurkish
          ? "GÖZCÜ"
          : "WATCH",
        label: isTurkish
          ? "Eğitimli yangın gözcüsü"
          : "Trained fire watch",
      },
    ];

    mainReference = "OSHA 29 CFR 1910.252";
    subReference = "Welding, Cutting and Brazing";
  } else if (poster.code === "SB-SCF-001") {
    values = [
      {
        value: "4×",
        label: isTurkish
          ? "Maksimum amaçlanan yük"
          : "Maximum intended load",
      },
      {
        value: "2,5 cm",
        label: isTurkish
          ? "Normal platform boşluğu"
          : "Normal platform gap",
      },
      {
        value: "0,6 m",
        label: isTurkish
          ? "Uygun erişim gerektiren fark"
          : "Access-system threshold",
      },
      {
        value: isTurkish
          ? "HER VARDİYA"
          : "EACH SHIFT",
        label: isTurkish
          ? "Yetkin kişi kontrolü"
          : "Competent-person inspection",
      },
    ];

    mainReference = "OSHA 29 CFR 1926.451";
    subReference = "OSHA 1926 Subpart L";

  } else if (poster.code === "SB-LAD-001") {
    values = [
      {
        value: "4 : 1",
        label: isTurkish
          ? "Güvenli yerleşim oranı"
          : "Safe setup ratio",
      },
      {
        value: isTurkish ? "0,9 m" : "0.9 m / 3 ft",
        label: isTurkish
          ? "Üst seviyeye güvenli taşma"
          : "Extension above landing",
      },
      {
        value: isTurkish ? "3 NOKTA" : "3-POINT",
        label: isTurkish
          ? "Sürekli merdiven teması"
          : "Continuous ladder contact",
      },
      {
        value: isTurkish ? "MAX YÜK" : "MAX LOAD",
        label: isTurkish
          ? "Üretici kapasitesini aşma"
          : "Do not exceed rated capacity",
      },
    ];

    mainReference = "OSHA 29 CFR 1926.1053 / 1910.23";
    subReference = "EN 131";

  } else {
    values = [
      {
        value: "1,8 m",
        label: isTurkish
          ? "OSHA inşaat eşiği"
          : "OSHA construction threshold",
      },
      {
        value: "22,2 kN",
        label: isTurkish
          ? "Ankraj değeri / kişi"
          : "Anchorage value / worker",
      },
      {
        value: "100%",
        label: isTurkish
          ? "Sürekli bağlı kal"
          : "Continuous tie-off",
      },
      {
        value: isTurkish
          ? "3 NOKTA"
          : "3-POINT",
        label: isTurkish
          ? "Merdiven teması"
          : "Ladder contact",
      },
    ];

    mainReference =
      poster.code === "SB-LAD-001"
                  ? "OSHA 29 CFR 1926.1053 / 1910.23"
                  : "OSHA 29 CFR 1926.501 / 1926.502";

    subReference =
      poster.code === "SB-LAD-001"
                  ? "EN 131"
                  : "EN 361 • EN 365 • EN 795";
  }

  const defaultStandards = [
    "EN 397",
    "EN 166",
    "EN 388",
    "ISO 20345",
    "EN 361",
  ];

  const confinedSpaceStandards = [
    "EN 397",
    "EN 166",
    "RİSKE GÖRE",
    "ISO 20345",
    "EN 361",
  ];

  const electricalStandards = [
    "EN 50365",
    "EN 166",
    "EN 60903",
    "EN 50321-1",
    "IEC 61482",
  ];

  const lotoStandards = [
    "RİSKE GÖRE",
    "EN 166",
    "RİSKE GÖRE",
    "ISO 20345",
    "RİSKE GÖRE",
  ];

  const fireStandards = [
    "RİSKE GÖRE",
    "EN 166",
    "EN 407",
    "ISO 20345",
    "EN ISO 11612",
  ];

  const ppeStandards = [
    "EN 397",
    "EN 166",
    "RİSKE GÖRE",
    "ISO 20345",
    "EN ISO 20471",
  ];

  const hotWorkStandards = [
    "EN 175",
    "EN 166",
    "EN 407",
    "EN ISO 20349",
    "EN ISO 11611",
  ];

  const standards =
    poster.code === "SB-PPE-001"
      ? ppeStandards
      : poster.code === "SB-FIRE-001"
        ? fireStandards
        : poster.code === "SB-LOTO-001"
        ? lotoStandards
        : poster.code === "SB-EL-001"
        ? electricalStandards
        : poster.code === "SB-CS-001"
          ? confinedSpaceStandards
          : poster.code === "SB-HW-001"
            ? hotWorkStandards
            : defaultStandards;

  const ppeIcons =
    poster.code === "SB-PPE-001"
      ? ["⛑️", "🥽", "🧤", "🥾", "🦺"]
      : poster.code === "SB-FIRE-001"
        ? ["⛑️", "🥽", "🧤", "🥾", "🧥"]
      : poster.code === "SB-EL-001"
        ? ["⛑️", "🥽", "🧤", "🥾", "🧥"]
      : poster.code === "SB-HW-001"
        ? ["🥽", "👓", "🧤", "🥾", "🧥"]
        : ["⛑️", "🥽", "🧤", "🥾", "🪢"];

  const ppeHeading =
    poster.code === "SB-PPE-001"
      ? isTurkish
        ? "Temel Saha KKD'si"
        : "Basic Site PPE"
      : poster.code === "SB-FIRE-001"
        ? isTurkish
          ? "Müdahale KKD'si"
          : "Response PPE"
        : poster.code === "SB-CS-001" ||
          poster.code === "SB-EL-001" ||
          poster.code === "SB-LOTO-001"
        ? isTurkish
        ? "Gerekli KKD"
        : "Required PPE"
      : isTurkish
        ? "Zorunlu KKD"
        : "Required PPE";

  const ppeNote =
    poster.code === "SB-PPE-001"
      ? isTurkish
        ? "Temel saha KKD'sine ek korumaları görev ve risk değerlendirmesine göre belirle."
        : "Determine additional protection according to the task and risk assessment."
      : poster.code === "SB-FIRE-001"
        ? isTurkish
        ? "Yalnızca eğitimli ve yetkilendirilmiş personel başlangıç yangınına müdahale etmelidir."
        : "Only trained and authorized personnel should fight incipient-stage fires."
      : poster.code === "SB-LOTO-001"
        ? isTurkish
        ? "KKD'yi enerji türü, görev ve risk değerlendirmesine göre seç."
        : "Select PPE based on energy type, task and risk assessment."
      : poster.code === "SB-EL-001"
        ? isTurkish
          ? "KKD'yi gerilim, elektrik çarpması ve ark parlaması riskine göre seç."
          : "Select PPE based on voltage, shock and arc-flash hazards."
        : poster.code === "SB-CS-001"
          ? isTurkish
            ? "KKD'yi risk değerlendirmesi ve atmosfer sonuçlarına göre seç."
            : "Select PPE based on the risk assessment and atmospheric results."
          : isTurkish
            ? "Önce mühendislik kontrolleri, sonra kişisel koruma."
            : "Engineering controls first, personal protection second.";

  return (
    <section className="mt-3 grid grid-cols-[1.15fr_0.82fr_1.03fr] gap-3">
      <div className="overflow-hidden rounded-[18px] border-2 border-red-600 bg-white">
        <div className="flex items-center justify-between bg-red-600 px-4 py-3 text-white">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-red-100">
              Critical Stop Criteria
            </p>

            <h2 className="text-[20px] font-black uppercase leading-none">
              🛑{" "}
              {isTurkish
                ? "İşi Hemen Durdur"
                : "Stop Work Now"}
            </h2>
          </div>

          <span className="rounded-full border-2 border-white/50 bg-white/20 px-4 py-1.5 text-[11px] font-black tracking-wider shadow-sm">
            STOP
          </span>
        </div>

        <div className="space-y-2 p-3">
          {poster.never[locale].map((item) => (
            <div
              key={item}
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-black text-white">
                ×
              </span>

              <p className="text-[10px] font-black uppercase leading-[1.3] text-slate-900">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border-2 border-amber-500 bg-white">
        <div className="bg-amber-500 px-4 py-3 text-center text-white">
          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-amber-100">
            Technical Control
          </p>

          <h2 className="text-[19px] font-black uppercase leading-none">
            {isTurkish
              ? "Kritik Değerler"
              : "Critical Values"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 px-3 pb-2 pt-3">
          {values.map((item) => (
            <div
              key={`${item.value}-${item.label}`}
              className="rounded-xl border border-amber-200 bg-amber-50 px-2 py-2.5 text-center"
            >
              <p className="text-[21px] font-black leading-none text-slate-950">
                {item.value}
              </p>

              <p className="mt-2 text-[8px] font-black uppercase leading-[1.2] text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {poster.code === "SB-EL-001" && (
          <div className="mx-3 mb-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.12em] text-amber-800">
              {isTurkish ? "Test Sırası" : "Test Sequence"}
            </p>

            <p className="mt-1 text-[8px] font-black leading-3 text-slate-800">
              {isTurkish
                ? "Bilinen kaynakta test et → devreyi ölç → tekrar bilinen kaynakta doğrula"
                : "Test on a known source → test the circuit → reverify on a known source"}
            </p>
          </div>
        )}

        <div className="mx-3 mb-3 rounded-xl bg-slate-950 px-3 py-2 text-center text-white">
          <p className="text-[8px] font-black uppercase tracking-[0.15em] text-emerald-400">
            Reference
          </p>

          <p className="mt-1 text-[9px] font-black">
            {mainReference}
          </p>

          <p className="text-[8px] font-bold text-slate-300">
            {subReference}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border-2 border-blue-700 bg-white">
        <div className="bg-blue-700 px-4 py-3 text-center text-white">
          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-blue-200">
            Personal Protective Equipment
          </p>

          <h2 className="text-[20px] font-black uppercase leading-none">
            {ppeHeading}
          </h2>
        </div>

        <div className="grid grid-cols-5 gap-2 px-3 py-4">
          {poster.ppe[locale].map(
            (item, index) => (
              <div
                key={item}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-2xl text-white ring-4 ring-blue-100">
                  {poster.code === "SB-LAD-001" && index === 4 ? (
                    <svg
                      viewBox="0 0 100 100"
                      className="h-9 w-9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label="Full Body Harness"
                    >
                      {/* shoulder straps */}
                      <path d="M31 18L50 42L69 18" />

                      {/* outer harness straps */}
                      <path d="M31 18L23 53L34 86" />
                      <path d="M69 18L77 53L66 86" />

                      {/* chest strap */}
                      <path d="M28 44H72" />

                      {/* waist belt */}
                      <path d="M29 61H71" />

                      {/* centre connection */}
                      <path d="M50 42V65" />
                      <circle cx="50" cy="48" r="6" />

                      {/* leg straps */}
                      <path d="M34 86L46 62" />
                      <path d="M66 86L54 62" />

                      {/* leg loops */}
                      <path d="M34 86c5 5 11 5 16-1" />
                      <path d="M66 86c-5 5-11 5-16-1" />

                      {/* D-ring */}
                      <circle
                        cx="50"
                        cy="48"
                        r="3"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  ) : (
                    ppeIcons[index] ?? "🦺"
                  )}
                </div>

                <p className="mt-2 text-[9px] font-black uppercase leading-[1.15] text-slate-950">
                  {item}
                </p>

                <p className="mt-1 text-[6px] font-black uppercase tracking-wide text-blue-700">
                  {standards[index]}
                </p>
              </div>
            ),
          )}
        </div>

        <div className="mx-3 mb-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-center">
          <p className="text-[8px] font-black uppercase leading-3 text-blue-900">
            {ppeNote}
          </p>
        </div>

        {poster.code === "SB-EL-001" && (
          <div className="mx-3 mb-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-blue-700">
                {isTurkish ? "Gerilim Sınıfı" : "Voltage Rating"}
              </p>

              <p className="mt-1 text-[8px] font-black leading-3 text-slate-800">
                {isTurkish
                  ? "Eldiven ve ekipman çalışma gerilimine uygun olmalı."
                  : "Gloves and equipment must match the working voltage."}
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-blue-700">
                {isTurkish ? "Ark Riski" : "Arc Hazard"}
              </p>

              <p className="mt-1 text-[8px] font-black leading-3 text-slate-800">
                {isTurkish
                  ? "Ark sınıfı risk değerlendirmesine göre seçilmeli."
                  : "Arc rating must be selected from the risk assessment."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
