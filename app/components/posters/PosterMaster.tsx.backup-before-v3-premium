import type {
  PosterDefinition,
  PosterRule,
  PosterTone,
} from "@/lib/posters-v2/types";

type Locale = "tr" | "en";

type Props = {
  locale: Locale;
  poster: PosterDefinition;
};

const toneClasses: Record<
  PosterTone,
  {
    header: string;
    pale: string;
    badge: string;
    label: { tr: string; en: string };
  }
> = {
  mandatory: {
    header: "bg-emerald-600",
    pale: "bg-emerald-50",
    badge: "bg-emerald-600",
    label: { tr: "ZORUNLU", en: "MANDATORY" },
  },
  warning: {
    header: "bg-orange-500",
    pale: "bg-orange-50",
    badge: "bg-orange-500",
    label: { tr: "DİKKAT", en: "WARNING" },
  },
  information: {
    header: "bg-blue-600",
    pale: "bg-blue-50",
    badge: "bg-blue-600",
    label: { tr: "BİLGİ", en: "INFORMATION" },
  },
};

function Icon({
  type,
}: {
  type: PosterRule["icon"];
}) {
  const common =
    "h-24 w-24 fill-none stroke-slate-900 [stroke-linecap:round] [stroke-linejoin:round]";

  if (type === "ladder") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <path d="M28 88 39 12M72 88 61 12M34 31h32M32 50h36M30 69h40" />
      </svg>
    );
  }

  if (type === "harness") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <path d="m28 14 17 38-13 35M72 14 55 52l13 35M32 87l18-20 18 20M37 59h26" />
        <circle cx="50" cy="52" r="8" className="fill-emerald-600 stroke-none" />
      </svg>
    );
  }

  if (type === "anchor") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <circle cx="50" cy="19" r="11" />
        <path d="M50 30v55M33 47h34M18 57c3 24 21 32 32 13 11 19 29 11 32-13" />
      </svg>
    );
  }

  if (type === "guardrail") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <path d="M16 82h68M23 18v64M77 18v64M23 31h54M23 53h54" />
      </svg>
    );
  }

  if (type === "fall") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <path d="M8 78h34V62" />
        <circle cx="57" cy="22" r="7" className="fill-slate-900 stroke-none" />
        <path d="m58 32 13 17M68 44l21-11M71 50 53 70M73 52l18 21" />
        <path
          d="M43 21v47m-7-8 7 10 7-10"
          className="stroke-orange-500"
          strokeDasharray="5 5"
        />
      </svg>
    );
  }

  if (type === "weather") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <path
          d="M20 46c-14 0-13-22 2-22 5-18 32-18 39-1 19-5 29 17 17 23Z"
          className="fill-slate-900 stroke-none"
        />
        <path d="M18 62c19-8 39-7 62 0M13 78c24-9 43-8 62 0" />
      </svg>
    );
  }

  if (type === "equipment") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <path
          d="M17 39h66v45H17z"
          className="fill-slate-900 stroke-none"
        />
        <path d="M35 39V27h30v12" />
        <path d="M20 60h60" className="stroke-white" />
        <rect
          x="43"
          y="52"
          width="14"
          height="13"
          rx="2"
          className="fill-white stroke-none"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
      <rect x="49" y="14" width="42" height="35" rx="3" />
      <circle cx="27" cy="37" r="8" className="fill-slate-900 stroke-none" />
      <path d="M27 46v29M27 54l22-17M12 86h53" />
      <circle cx="19" cy="84" r="7" className="fill-slate-900 stroke-none" />
      <circle cx="41" cy="84" r="7" className="fill-slate-900 stroke-none" />
      <circle cx="63" cy="84" r="7" className="fill-slate-900 stroke-none" />
    </svg>
  );
}

function PpeIcon({
  type,
}: {
  type: "helmet" | "glasses" | "gloves" | "footwear" | "harness";
}) {
  const common =
    "h-11 w-11 fill-none stroke-white [stroke-linecap:round] [stroke-linejoin:round]";

  if (type === "helmet") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
        <path d="M21 59a29 29 0 0 1 58 0" />
        <path d="M15 61h70M50 31v28" />
      </svg>
    );
  }

  if (type === "glasses") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
        <circle cx="31" cy="52" r="17" />
        <circle cx="69" cy="52" r="17" />
        <path d="M48 52h4M14 46 7 41M86 46l7-5" />
      </svg>
    );
  }

  if (type === "gloves") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="6">
        <path d="m31 79-7-30V29c0-7 10-7 10 0v17-25c0-7 10-7 10 0v23-27c0-7 10-7 10 0v27-23c0-7 10-7 10 0v28l9-9c6-6 14 2 9 9L66 72c-9 13-23 16-35 7Z" />
      </svg>
    );
  }

  if (type === "footwear") {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
        <path d="M27 19h30v37l22 9c8 3 9 15-2 17H22V70h5Z" />
        <path d="M22 82h58" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
      <path d="M25 18 45 49 29 82M75 18 55 49l16 33M29 82l21-18 21 18" />
      <circle cx="50" cy="49" r="9" />
    </svg>
  );
}

function NeverIcon({
  index,
}: {
  index: number;
}) {
  const common =
    "h-12 w-12 fill-none stroke-slate-950 [stroke-linecap:round] [stroke-linejoin:round]";

  if (index === 0) {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
        <path d="M8 75h34V58" />
        <circle
          cx="58"
          cy="22"
          r="8"
          className="fill-slate-950 stroke-none"
        />
        <path d="m59 33 14 17M70 45l19-12M73 51 54 70M75 53l17 20" />
        <path
          d="M43 20v48m-7-9 7 10 7-10"
          className="stroke-red-600"
          strokeDasharray="6 6"
        />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
        <rect x="17" y="36" width="66" height="48" rx="8" />
        <path d="M35 36V24h30v12M20 59h60" />
        <path
          d="m53 42-10 14 13 8-12 15"
          className="stroke-red-600"
        />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
        <path d="M12 82h76M21 27v55M79 27v55M21 39h58M21 59h58" />
        <circle
          cx="52"
          cy="20"
          r="7"
          className="fill-slate-950 stroke-none"
        />
        <path d="M52 29v24M52 39 36 50M52 40l16 15" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className={common} strokeWidth="7">
      <path
        d="M20 48c-14 0-13-22 2-22 5-18 32-18 39-1 19-5 29 17 17 23Z"
        className="fill-slate-950 stroke-none"
      />
      <path d="M18 64c19-8 39-7 62 0M13 80c24-9 43-8 62 0" />
      <path
        d="M38 53 31 68M58 53l-7 15"
        className="stroke-red-600"
      />
    </svg>
  );
}

function RuleCard({
  locale,
  rule,
}: {
  locale: Locale;
  rule: PosterRule;
}) {
  const tone = toneClasses[rule.tone];

  return (
    <article className="overflow-hidden rounded-[18px] border border-slate-300 bg-white shadow-[0_8px_20px_rgba(15,23,42,0.10)]">
      <div
        className={`flex h-12 items-center justify-between px-4 text-white ${tone.header}`}
      >
        <strong className="text-xl font-black">{rule.number}</strong>

        <span className="rounded-full border border-white/50 bg-white/15 px-3 py-1 text-[10px] font-black tracking-wide">
          {tone.label[locale]}
        </span>
      </div>

      <div className={`relative flex h-40 items-center justify-center ${tone.pale}`}>
        <Icon type={rule.icon} />

        <span
          className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-lg font-black text-white ${tone.badge}`}
        >
          {rule.tone === "mandatory"
            ? "✓"
            : rule.tone === "warning"
              ? "!"
              : "i"}
        </span>
      </div>

      <h2
        className={`flex min-h-14 items-center justify-center px-3 text-center text-lg font-black uppercase leading-tight text-white ${tone.header}`}
      >
        {rule.title[locale]}
      </h2>

      <ul className="min-h-36 space-y-3 px-5 py-5">
        {rule.items[locale].map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[13px] font-bold leading-5 text-slate-800"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${tone.badge}`}
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PosterMaster({
  locale,
  poster,
}: Props) {
  const isTurkish = locale === "tr";

  return (
    <div
      id="safebase-poster"
      className="mx-auto box-border min-h-[1588px] w-[1123px] bg-[#f7f9fc] p-7 font-sans text-slate-950 shadow-2xl print:m-0 print:min-h-[420mm] print:w-[297mm] print:shadow-none"
    >
      <section className="rounded-[26px] border border-slate-300 bg-white px-9 py-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-4xl font-black">
              <span className="text-emerald-600">Safe</span>Base
            </p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              {isTurkish
                ? "İş Sağlığı ve Güvenliği Kaynakları"
                : "Health and Safety Resources"}
            </p>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-center">
              <div className="rounded-xl border-2 border-emerald-600 bg-white p-2">
                <img
                  src="/posters/safebase-qr.png"
                  alt={
                    isTurkish
                      ? "SafeBase kaynakları QR kodu"
                      : "SafeBase resources QR code"
                  }
                  width={86}
                  height={86}
                  className="h-[86px] w-[86px]"
                />
              </div>

              <p className="mt-2 max-w-[110px] text-[9px] font-black uppercase leading-3 text-emerald-700">
                {isTurkish
                  ? "Daha fazla kaynak için tara"
                  : "Scan for more resources"}
              </p>
            </div>

            <div className="min-w-[145px] text-right">
              <p className="rounded-lg bg-emerald-600 px-5 py-2 text-center text-sm font-black text-white">
                {poster.code}
              </p>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <span className="rounded-md border border-emerald-600 px-2 py-1.5 text-center text-[10px] font-black uppercase text-slate-800">
                  {isTurkish ? "Revizyon" : "Revision"} {poster.revision}
                </span>

                <span className="rounded-md border border-emerald-600 px-2 py-1.5 text-center text-[10px] font-black uppercase text-slate-800">
                  {isTurkish ? "Türkçe" : "English"}
                </span>
              </div>

              <p className="mt-2 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                {isTurkish
                  ? "A3 • Profesyonel Güvenlik Posteri"
                  : "A3 • Professional Safety Poster"}
              </p>
            </div>
          </div>
        </div>

        <h1 className="mt-8 text-6xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-slate-950">
          {poster.title[locale]}
        </h1>

        <div className="mt-7 flex items-center gap-5">
          <div className="h-px flex-1 bg-slate-900" />
          <p className="text-xl font-black uppercase tracking-wide text-slate-900">
            {poster.slogan[locale]}
          </p>
          <div className="h-px flex-1 bg-slate-900" />
        </div>
      </section>

      <section className="mt-6 grid grid-cols-4 gap-4">
        {poster.rules.map((rule) => (
          <RuleCard key={rule.number} locale={locale} rule={rule} />
        ))}
      </section>

      <section className="mt-6 grid grid-cols-2 gap-5">
        <div className="overflow-hidden rounded-[18px] border-2 border-red-600 bg-red-50">
          <h2 className="bg-red-600 py-4 text-center text-2xl font-black uppercase text-white">
            ⚠ {isTurkish ? "Asla Yapma!" : "Never Do!"}
          </h2>

          <div className="grid grid-cols-4 gap-3 p-5">
            {poster.never[locale].map((item, index) => (
              <div key={item} className="text-center">
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-600 bg-white">
                  <NeverIcon index={index} />

                  <span
                    aria-hidden="true"
                    className="absolute h-1.5 w-[92px] rotate-45 rounded-full bg-red-600"
                  />
                </div>

                <p className="mt-3 text-xs font-black uppercase leading-4 text-slate-900">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border-2 border-blue-700 bg-white">
          <h2 className="bg-blue-700 py-4 text-center text-2xl font-black uppercase text-white">
            {isTurkish ? "Zorunlu KKD" : "Required PPE"}
          </h2>

          <div className="grid grid-cols-5 gap-3 p-5">
            {poster.ppe[locale].map((item, index) => {
              const iconTypes = [
                "helmet",
                "glasses",
                "gloves",
                "footwear",
                "harness",
              ] as const;

              return (
                <div key={item} className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-700 shadow-md">
                    <PpeIcon type={iconTypes[index] ?? "helmet"} />
                  </div>

                  <p className="mt-3 text-xs font-black uppercase leading-4 text-slate-900">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="mt-6 flex items-center justify-between rounded-b-[22px] bg-slate-950 px-8 py-5 text-white">
        <div>
          <p className="text-2xl font-black">
            <span className="text-emerald-500">Safe</span>Base
          </p>
          <p className="text-xs font-bold text-emerald-400">
            {isTurkish
              ? "Daha Güvenli Bir Yarın İçin."
              : "Better Safety, Better Tomorrow."}
          </p>
        </div>

        <p className="text-xl font-black uppercase">
          {isTurkish
            ? "GÜVENLİ DEĞİLSE İŞİ DURDUR!"
            : "Stop work if it is unsafe!"}
        </p>

        <p className="text-sm font-black">www.safebase.app</p>
      </footer>
    </div>
  );
}
