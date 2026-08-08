"use client";

import { useParams } from "next/navigation";

function FlameIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12.8 2.5c.7 3.4-1.7 4.8-2.9 6.7-1 1.5-.8 3.3.5 4.4-.1-2 .8-3.1 2.2-4.3.4 2.2 2.5 3.5 2.5 6.4A5.2 5.2 0 1 1 5 14.2c0-4.5 4.4-6.6 7.8-11.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FuelIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 3h8v18H6zM8 6h4M14 7h2l2 3v7a1 1 0 0 0 2 0v-6l-2-2"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AirIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 8h10a3 3 0 1 0-3-3M4 12h15a2.5 2.5 0 1 1-2.5 2.5M4 16h7"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function ExtinguisherIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 7h6v14H9zM10 4h4v3M12 4V2M14 3h3l2 2M8 10H6v5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}


function ToolboxPageFooter({
  page,
  total = 3,
  tr,
}: {
  page: number;
  total?: number;
  tr: boolean;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-between border-t border-slate-200 bg-slate-50 px-8 text-[9px] font-bold text-slate-500">
      <div className="flex items-center gap-3">
        <span className="font-black tracking-wider text-slate-800">
          SAFEBASE
        </span>
        <span>
          {tr
            ? "HSE Kaynağı • Yangın Güvenliği"
            : "HSE Resource • Fire Safety"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span>Rev. 1.0</span>
        <span className="font-black text-slate-800">
          {page} / {total}
        </span>
      </div>
    </div>
  );
}

export default function FireSafetyToolboxV2Page() {
  const params = useParams();
  const tr = params?.locale === "tr";

  return (
    <main className="min-h-screen bg-[#030a1d] py-8 text-slate-900">

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          .toolbox-toolbar {
            display: none !important;
          }

          .toolbox-page {
            width: 100% !important;
            max-width: none !important;
            min-height: 100vh !important;
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            break-after: page;
            page-break-after: always;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .toolbox-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
        }
      `}</style>

      <div className="toolbox-toolbar mx-auto mb-5 flex max-w-[900px] justify-end px-4">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-500"
        >
          {tr ? "PDF / Yazdır" : "PDF / Print"}
        </button>
      </div>

      <div className="mx-auto w-full max-w-[900px] space-y-8 px-3">

        {/* PAGE 1 */}
        <section className="toolbox-page relative min-h-[1120px] overflow-hidden rounded-2xl bg-white pb-12 shadow-2xl">

          <header className="bg-[#02091b] px-10 py-8 text-white">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-emerald-400">
              SAFEBASE PROFESSIONAL TOOLBOX TALK
            </p>

            <div className="mt-4 flex items-end justify-between gap-8">
              <div>
                <h1 className="text-3xl font-black">
                  {tr ? "YANGIN GÜVENLİĞİ TOOLBOX" : "FIRE SAFETY TOOLBOX TALK"}
                </h1>

                <p className="mt-3 text-sm text-slate-300">
                  {tr
                    ? "Yangın tehlikelerini önleyin ve acil durumda güvenli şekilde hareket edin."
                    : "Prevent fire hazards and respond safely in emergencies."}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-600 px-6 py-3 text-center">
                <p className="text-xl font-black">8–10</p>
                <p className="text-[9px] font-black uppercase tracking-wider">
                  {tr ? "DAKİKA" : "MINUTES"}
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-6 p-8 lg:grid-cols-[1.05fr_.95fr]">

            <div className="space-y-5">

              <div className="overflow-hidden rounded-2xl border border-blue-200 bg-blue-50">
                <div className="bg-blue-600 px-5 py-3 text-xs font-black text-white">
                  {tr ? "AMAÇ" : "OBJECTIVE"}
                </div>
                <p className="p-5 text-sm leading-6 text-slate-700">
                  {tr
                    ? "Yangınları önlemek, erken müdahaleyi desteklemek ve personelin güvenli tahliyesini sağlamak."
                    : "Prevent fires, support early response and ensure safe evacuation of personnel."}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
                <div className="bg-emerald-500 px-5 py-3 text-xs font-black text-white">
                  {tr ? "KONU AÇIKLAMASI" : "TOPIC EXPLANATION"}
                </div>

                <div className="space-y-3 p-5 text-sm leading-6 text-slate-700">
                  <p>• {tr ? "Yangın için yakıt, oksijen ve ısı gerekir." : "Fire requires fuel, oxygen and heat."}</p>
                  <p>• {tr ? "Yanıcı malzemeleri doğru depolayın ve sıcak çalışmayı izin sistemiyle yönetin." : "Store flammable materials correctly and manage hot work under permit."}</p>
                  <p>• {tr ? "Alarm noktalarını, kaçış yollarını ve toplanma alanını bilin." : "Know alarm points, escape routes and assembly areas."}</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-orange-200 bg-orange-50">
                <div className="bg-orange-500 px-5 py-3 text-xs font-black text-white">
                  {tr ? "GERÇEKÇİ SAHA SENARYOSU" : "REALISTIC SITE SCENARIO"}
                </div>

                <div className="space-y-3 p-5 text-sm leading-6 text-slate-700">
                  <p>• {tr ? "Taşlama kıvılcımları yakındaki yanıcı malzemeleri tutuşturdu." : "Grinding sparks ignited nearby combustible materials."}</p>
                  <p>• {tr ? "Yakındaki yangın söndürücü ile yangın hızlı şekilde kontrol altına alındı." : "A nearby extinguisher allowed the fire to be controlled quickly."}</p>
                  <p>• {tr ? "İyi housekeeping ve kıvılcım kontrolü olayı önleyebilirdi." : "Good housekeeping and spark control could have prevented the incident."}</p>
                </div>
              </div>

            </div>

            <div className="space-y-5">

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <div className="relative h-[390px]">
                  <img
                    src="/toolbox-images/fire-safety/hero.jpg"
                    alt="Fire safety"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent px-5 pb-5 pt-16 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                      {tr ? "SAHA GÜVENLİĞİ" : "SITE SAFETY"}
                    </p>

                    <p className="mt-2 text-sm font-black leading-5">
                      {tr
                        ? "Yangın söndürme ekipmanı görünür, erişilebilir ve kullanıma hazır olmalıdır."
                        : "Firefighting equipment must remain visible, accessible and ready for use."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  {tr ? "YANGIN ÜÇGENİ" : "FIRE TRIANGLE"}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center text-red-600">
                    <FlameIcon className="mx-auto h-9 w-9" />
                    <p className="mt-2 text-[11px] font-black text-slate-900">{tr ? "ISI" : "HEAT"}</p>
                  </div>

                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-center text-amber-600">
                    <FuelIcon className="mx-auto h-9 w-9" />
                    <p className="mt-2 text-[11px] font-black text-slate-900">{tr ? "YAKIT" : "FUEL"}</p>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center text-blue-600">
                    <AirIcon className="mx-auto h-9 w-9" />
                    <p className="mt-2 text-[11px] font-black text-slate-900">{tr ? "OKSİJEN" : "OXYGEN"}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mx-8 rounded-2xl border-2 border-blue-500 bg-blue-50 p-5">
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-600">
              {tr ? "HATIRLA" : "REMEMBER"}
            </p>
            <p className="mt-2 text-base font-black">
              {tr
                ? "Yangını önlemek, yangınla mücadele etmekten her zaman daha güvenlidir."
                : "Preventing a fire is always safer than fighting one."}
            </p>
          </div>

        
          <ToolboxPageFooter page={1} tr={tr} />
        </section>

        {/* PAGE 2 */}
        <section className="toolbox-page relative min-h-[1120px] overflow-hidden rounded-2xl bg-white pb-12 shadow-2xl">

          <header className="bg-[#02091b] px-10 py-7 text-white">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-emerald-400">
              SAFEBASE PROFESSIONAL TOOLBOX TALK
            </p>
            <h2 className="mt-3 text-3xl font-black">
              {tr ? "YANGIN GÜVENLİĞİ" : "FIRE SAFETY"}
            </h2>
          </header>

          <div className="space-y-6 p-8">

            <div className="grid grid-cols-2 gap-5">

              <div className="overflow-hidden rounded-2xl border border-red-200 bg-red-50">
                <div className="bg-red-600 px-5 py-3 text-xs font-black text-white">
                  ⚠ {tr ? "TEMEL TEHLİKELER" : "KEY HAZARDS"}
                </div>
                <div className="grid grid-cols-2 gap-2 p-5 text-xs font-semibold leading-5">
                  <p>• {tr ? "Sıcak çalışma" : "Hot work"}</p>
                  <p>• {tr ? "Yanıcı sıvılar" : "Flammable liquids"}</p>
                  <p>• {tr ? "Gaz kaçakları" : "Gas leaks"}</p>
                  <p>• {tr ? "Elektrik arızaları" : "Electrical faults"}</p>
                  <p>• {tr ? "Sigara" : "Smoking"}</p>
                  <p>• {tr ? "Kötü housekeeping" : "Poor housekeeping"}</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
                <div className="bg-emerald-500 px-5 py-3 text-xs font-black text-white">
                  ✓ {tr ? "KONTROL ÖNLEMLERİ" : "CONTROL MEASURES"}
                </div>
                <div className="grid grid-cols-2 gap-2 p-5 text-xs font-semibold leading-5">
                  <p>• Hot Work Permit</p>
                  <p>• {tr ? "Yanıcıları kaldır" : "Remove combustibles"}</p>
                  <p>• {tr ? "Söndürücüyü kontrol et" : "Inspect extinguisher"}</p>
                  <p>• Fire Watch</p>
                  <p>• {tr ? "Kaçış yolunu açık tut" : "Keep escape route clear"}</p>
                  <p>• {tr ? "Gaz tüplerini sabitle" : "Secure gas cylinders"}</p>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="overflow-hidden rounded-2xl border-2 border-emerald-400 bg-emerald-50">
                <div className="flex items-center gap-2 px-5 pt-5 font-black text-emerald-700">
                  <CheckIcon />
                  {tr ? "DOĞRU" : "DO"}
                </div>

                <div className="m-5 overflow-hidden rounded-xl border border-emerald-200 bg-white">
                  <img
                    src="/toolbox-images/fire-safety/do.jpg"
                    alt="Correct fire safety practice"
                    className="h-[235px] w-full object-cover"
                  />

                  <div className="flex gap-3 p-4">
                    <ExtinguisherIcon className="h-7 w-7 shrink-0 text-emerald-600" />
                    <p className="text-xs font-bold leading-5 text-slate-700">
                      {tr
                        ? "Yanıcı malzemeleri belirlenmiş güvenli depolama alanlarında tut."
                        : "Store flammable materials in designated safe storage areas."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border-2 border-red-400 bg-red-50">
                <div className="flex items-center gap-2 px-5 pt-5 font-black text-red-700">
                  <XIcon />
                  {tr ? "YANLIŞ" : "DON'T"}
                </div>

                <div className="m-5 overflow-hidden rounded-xl border border-red-200 bg-white">
                  <img
                    src="/toolbox-images/fire-safety/dont.jpg"
                    alt="Hot work sparks"
                    className="h-[235px] w-full object-cover"
                  />

                  <div className="flex gap-3 p-4">
                    <FlameIcon className="h-7 w-7 shrink-0 text-red-600" />
                    <p className="text-xs font-bold leading-5 text-slate-700">
                      {tr
                        ? "Kıvılcım yayılım alanında yanıcı veya kolay tutuşabilir malzeme bırakma."
                        : "Do not leave combustible materials inside the spark travel area."}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            
            {/* SAFEBASE_FIRE_SUPERVISOR_PASS_START */}
            <div className="grid grid-cols-[1.2fr_.8fr] gap-5">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                  {tr
                    ? "SUPERVISOR KONUŞMA NOTU"
                    : "SUPERVISOR TALKING POINTS"}
                </p>

                <p className="mt-3 text-xs font-semibold leading-5 text-slate-700">
                  {tr
                    ? "Bugün sıcak çalışma kontrollerini, yangın söndürücülerin erişilebilirliğini ve kaçış yollarını kontrol edeceğiz. Herkes en yakın alarm noktasını ve toplanma alanını bilmelidir."
                    : "Today we will verify hot-work controls, extinguisher accessibility and escape routes. Everyone must know the nearest alarm point and assembly area."}
                </p>
              </div>

              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">
                  {tr ? "PASS YÖNTEMİ" : "PASS METHOD"}
                </p>

                <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                  {[
                    ["P", tr ? "Pimi çek" : "Pull"],
                    ["A", tr ? "Yönelt" : "Aim"],
                    ["S", tr ? "Sık" : "Squeeze"],
                    ["S", tr ? "Süpür" : "Sweep"],
                  ].map(([letter, label]) => (
                    <div
                      key={`${letter}-${label}`}
                      className="rounded-lg border border-orange-200 bg-white px-2 py-3"
                    >
                      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
                        {letter}
                      </div>

                      <p className="mt-2 text-[9px] font-black leading-3 text-slate-700">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            {/* SAFEBASE_FIRE_SUPERVISOR_PASS_END */}

<div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-sm font-black text-blue-700">
                  {tr ? "TARTIŞMA SORULARI" : "DISCUSSION QUESTIONS"}
                </p>
                <div className="mt-3 space-y-2 text-xs leading-5">
                  <p>• {tr ? "En yakın söndürücü nerede?" : "Where is the nearest extinguisher?"}</p>
                  <p>• {tr ? "Toplanma alanımız nerede?" : "Where is the assembly point?"}</p>
                  <p>• {tr ? "Hot Work Permit gerekli mi?" : "Is a Hot Work Permit required?"}</p>
                  <p>• {tr ? "Alarm nasıl verilir?" : "How do you raise the alarm?"}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-black text-emerald-700">
                  {tr ? "BUGÜN BAŞLAMADAN ÖNCE" : "VERIFY BEFORE STARTING TODAY"}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs leading-5">
                  <p>☐ {tr ? "Söndürücü hazır" : "Extinguisher ready"}</p>
                  <p>☐ {tr ? "Kaçış yolu açık" : "Escape route clear"}</p>
                  <p>☐ Permit ready</p>
                  <p>☐ Fire watch</p>
                  <p>☐ Housekeeping</p>
                  <p>☐ {tr ? "Yanıcılar kaldırıldı" : "Combustibles removed"}</p>
                  <p>☐ {tr ? "Ekip bilgilendirildi" : "Team briefed"}</p>
                  <p>☐ {tr ? "Toplanma alanı biliniyor" : "Assembly point known"}</p>
                </div>
              </div>

            </div>

          </div>
        
          <ToolboxPageFooter page={2} tr={tr} />
        </section>

        {/* PAGE 3 */}
        <section className="toolbox-page relative min-h-[1120px] overflow-hidden rounded-2xl bg-white pb-12 shadow-2xl">

          <header className="bg-[#02091b] px-10 py-10 text-white">
            <h2 className="text-3xl font-black">
              {tr ? "KATILIM VE ONAY" : "ATTENDANCE AND APPROVAL"}
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              {tr ? "Yangın Güvenliği Toolbox" : "Fire Safety Toolbox Talk"}
            </p>
          </header>

          <div className="p-10">

            <div className="grid grid-cols-2 gap-x-10 gap-y-8">
              {[
                tr ? "Proje / Saha" : "Project / Site",
                tr ? "Tarih" : "Date",
                tr ? "Anlatan" : "Presented by",
                tr ? "Çalışma Alanı" : "Work Area",
              ].map((label) => (
                <div key={label}>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                    {label}
                  </p>
                  <div className="mt-5 border-b border-slate-300" />
                </div>
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-xl border border-slate-300">

              <div className="grid grid-cols-[50px_1.5fr_1fr_1fr] bg-[#02091b] px-4 py-4 text-[10px] font-black uppercase text-white">
                <div>No</div>
                <div>{tr ? "Ad Soyad" : "Full Name"}</div>
                <div>{tr ? "Firma / Görev" : "Company / Role"}</div>
                <div>{tr ? "İmza" : "Signature"}</div>
              </div>

              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  className="grid min-h-[49px] grid-cols-[50px_1.5fr_1fr_1fr] border-t border-slate-300 text-xs"
                >
                  <div className="border-r border-slate-300 p-3">{i + 1}</div>
                  <div className="border-r border-slate-300 p-3" />
                  <div className="border-r border-slate-300 p-3" />
                  <div className="p-3" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-xs font-black">
                {tr ? "SUPERVISOR NOTLARI" : "SUPERVISOR NOTES"}
              </p>
              <div className="mt-3 min-h-[120px] rounded-2xl border border-slate-300" />
            </div>

          </div>
        
          <ToolboxPageFooter page={3} tr={tr} />
        </section>

      </div>
    </main>
  );
}
