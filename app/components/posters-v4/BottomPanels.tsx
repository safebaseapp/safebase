import type { PosterDefinition } from "@/lib/posters-v2/types";

import {getPosterTechnicalProfile, technicalReferences} from "@/lib/posters-v2/technical-profiles";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  poster: PosterDefinition;
};

export default function BottomPanels({
  locale,
  poster,
}: Props) {
  const isTurkish = locale === "tr";

  const profile = getPosterTechnicalProfile(poster.code);
  const reference = profile ? technicalReferences[profile.reference] : undefined;
  const values = profile?.controls.map(item => ({value:item.value[locale],label:item.label[locale]})) ?? [{value:isTurkish?'EKSİK':'MISSING',label:isTurkish?'Teknik tanımı doğrulamadan işe başlama':'Do not start without technical review'}];
  const mainReference = reference?.label ?? (isTurkish?'Teknik kaynak tanımlı değil':'Technical reference not defined');
  const subReference = isTurkish ? 'Kaynak kapsamını ve yerel kuralları doğrula' : 'Verify source scope and local requirements';
  const ppeHeading = isTurkish ? 'Riske Göre KKD Seçimi' : 'Risk-Based PPE Selection';
  const ppeNote = profile?.ppeNote[locale] ?? (isTurkish?'KKD seçimi için yetkili değerlendirme gerekli.':'Competent assessment required for PPE selection.');

  return (
    <section className="mt-3 grid grid-cols-[1.15fr_0.82fr_1.03fr] gap-3">
      <div className="overflow-hidden rounded-[18px] border-2 border-red-600 bg-white">
        <div className="flex items-center justify-between bg-red-600 px-4 py-3 text-white">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-red-100">
              {isTurkish ? "Kritik Durdurma Kriterleri" : "Critical Stop Criteria"}
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
            {isTurkish ? "Teknik Kontrol" : "Technical Control"}
          </p>

          <h2 className="text-[19px] font-black uppercase leading-none">
            {isTurkish
              ? "Kritik Kontroller"
              : "Critical Controls"}
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

        {poster.code === "SRN-EL-001" && (
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
            {isTurkish ? "Teknik Başvuru · Doğrulama Gerekli" : "Technical Reference · Validation Required"}
          </p>

          <p className="mt-1 text-[9px] font-black">
            {reference ? <a href={reference.url} target="_blank" rel="noopener noreferrer">{mainReference}</a> : mainReference}
          </p>

          <p className="text-[8px] font-bold text-slate-300">
            {subReference}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[18px] border-2 border-blue-700 bg-white">
        <div className="bg-blue-700 px-4 py-3 text-center text-white">
          <p className="text-[8px] font-black uppercase tracking-[0.18em] text-blue-200">
            {isTurkish ? "Kişisel Koruyucu Donanım" : "Personal Protective Equipment"}
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
                className="min-w-0 break-words text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-2xl text-white ring-4 ring-blue-100">
                  {poster.code === "SRN-LAD-001" && index === 4 ? (
                    <svg
                      viewBox="0 0 100 100"
                      className="h-9 w-9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-label={isTurkish ? "Tam vücut kemeri" : "Full body harness"}
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
                    profile?.ppeIcons[index] ?? "?"
                  )}
                </div>

                <p className="mt-2 break-words text-[9px] font-black uppercase leading-[1.15] text-slate-950 [overflow-wrap:anywhere]">
                  {item}
                </p>

                <p className="mt-1 text-[6px] font-black uppercase tracking-wide text-blue-700">
                  <span data-ppe-selection>{profile?.ppeSelection[index]?.[locale] ?? (isTurkish ? "Tanım eksik" : "Definition missing")}</span>
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

        {poster.code === "SRN-EL-001" && (
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
