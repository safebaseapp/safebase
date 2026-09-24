import type { PosterDefinition } from "@/lib/posters-v2/types";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  poster: PosterDefinition;
  qrPath?: string;
  companyLogoUrl?: string | null;
};

export default function Header({
  locale,
  poster,
  qrPath,
  companyLogoUrl,
}: Props) {
  const isTurkish = locale === "tr";
  const resolvedQrPath = qrPath ?? `/posters/sernem-qr-${locale}.png`;
  const isCompanyBranded = Boolean(companyLogoUrl);

  return (
    <div className="sernem-poster-header grid grid-cols-[1fr_265px] gap-5 rounded-[24px] border border-slate-300 bg-white p-6 shadow-sm">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            {isTurkish ? "Yüksek Riskli Faaliyet" : "High-Risk Activity"}
          </span>

          <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-700">
            {isCompanyBranded
              ? isTurkish
                ? "Premium Şirket Sürümü"
                : "Premium Company Edition"
              : "SERNEM Pro Series"}
          </span>

          <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700">
            Verified 2026
          </span>
        </div>

        <div
          className={
            companyLogoUrl
              ? "mt-4 flex min-h-[112px] items-center"
              : "mt-5 flex min-h-[72px] items-center"
          }
        >
          {companyLogoUrl ? (
            <div className="inline-flex min-h-[104px] min-w-[300px] max-w-[520px] items-center justify-start rounded-[22px] border border-slate-200 bg-white px-6 py-4 shadow-sm">
              <img
                src={companyLogoUrl}
                alt={isTurkish ? "Şirket logosu" : "Company logo"}
                className="max-h-[92px] max-w-[470px] object-contain object-left"
              />
            </div>
          ) : (
            <div>
              <p className="text-[40px] font-black leading-none">
                <span className="text-emerald-600">SERNEM</span>
              </p>

              <p className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
                {isTurkish
                  ? "İş Sağlığı ve Güvenliği Kaynakları"
                  : "Health and Safety Resources"}
              </p>
            </div>
          )}
        </div>

        <h1 className={`${companyLogoUrl ? "mt-4" : "mt-6"} max-w-[760px] text-[50px] font-black uppercase leading-[0.94] tracking-[-0.035em] text-slate-950`}>
          {poster.title[locale].split("CRITICAL").map((part, i, arr) => (
            <span key={`title-part-${i}`}>
              {part}
              {i < arr.length - 1 && (
                <span className="text-red-600">CRITICAL</span>
              )}
            </span>
          ))}
        </h1>

        <div className="mt-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-300" />

          <p className="text-[15px] font-black uppercase tracking-[0.06em] text-slate-700">
            {poster.slogan[locale]}
          </p>

          <div className="h-px flex-1 bg-slate-300" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-slate-600">
            {poster.code === "SRN-PPE-001"
              ? "OSHA 1910 Subpart I"
              : poster.code === "SRN-FIRE-001"
                ? "OSHA 1910 Subpart L"
                : poster.code === "SRN-LOTO-001"
                  ? "OSHA 29 CFR 1910.147"
                  : poster.code === "SRN-EL-001"
                    ? "OSHA 1910 Subpart S"
                    : poster.code === "SRN-CS-001"
                      ? "OSHA 29 CFR 1910.146"
                      : poster.code === "SRN-HW-001"
                        ? "OSHA 1910.252 / 1926.352"
                        : poster.code === "SRN-SCF-001"
                          ? "OSHA 1926.451"
                          : "OSHA 29 CFR 1926"}
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-slate-600">
            {poster.code === "SRN-PPE-001"
              ? "Selection • Fit • Inspection"
              : poster.code === "SRN-FIRE-001"
                ? "Alarm • Evacuation • Extinguishers"
                : poster.code === "SRN-LOTO-001"
                  ? "Hazardous Energy Control"
                  : poster.code === "SRN-EL-001"
                    ? "LOTO • Shock • Arc Flash"
                    : poster.code === "SRN-CS-001"
                      ? "Permit Space • Atmospheric Testing"
                      : poster.code === "SRN-HW-001"
                        ? "Hot Work • Fire Prevention"
                        : poster.code === "SRN-SCF-001"
                          ? "OSHA Subpart L"
                          : "EN 361 • EN 365 • EN 795"}
          </span>

          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-slate-600">
            ISO 45001 Framework
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-[20px] bg-slate-950 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">
              Document
            </p>

            <p className="mt-2 text-lg font-black">{poster.code}</p>

            <p className="mt-1 text-[10px] font-bold text-slate-400">
              {isTurkish ? "Revizyon" : "Revision"} {poster.revision}
            </p>
          </div>

          <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black uppercase">
            {locale.toUpperCase()}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="rounded-xl bg-white p-2">
            <img
              src={resolvedQrPath}
              alt={isTurkish ? "SERNEM poster QR kodu" : "SERNEM poster QR code"}
              className="h-[78px] w-[78px]"
            />
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-emerald-400">
              {isTurkish ? "Tarayın" : "Scan"}
            </p>

            <p className="mt-2 text-[10px] font-bold leading-4 text-slate-300">
              {isTurkish
                ? "Dijital poster kütüphanesini açın"
                : "Open the digital poster library"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
