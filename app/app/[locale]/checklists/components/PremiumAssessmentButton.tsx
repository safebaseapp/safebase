"use client";

import { useEffect, useState } from "react";
import { Link } from "../../../../i18n/navigation";

type PremiumAssessmentButtonProps = {
  locale: string;
  disabled?: boolean;
  isPremiumUser?: boolean;
  onPremiumClick?: () => void;
};

export default function PremiumAssessmentButton({
  locale,
  disabled = false,
  isPremiumUser = false,
  onPremiumClick,
}: PremiumAssessmentButtonProps) {
  const isTr = locale === "tr";
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    if (disabled) return;

    // Premium üyeler gerçek AI değerlendirmesine geçer.
    if (isPremiumUser && onPremiumClick) {
      onPremiumClick();
      return;
    }

    // Free kullanıcılar SERNEM Premium modalını görür.
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className="
          inline-flex items-center justify-center gap-2
          rounded-2xl
          border border-fuchsia-400/20
          bg-gradient-to-r from-violet-700 via-fuchsia-700 to-purple-700
          px-6 py-4
          font-semibold text-white
          shadow-lg shadow-fuchsia-950/20
          transition
          hover:-translate-y-0.5
          hover:border-fuchsia-300/40
          hover:shadow-xl hover:shadow-fuchsia-950/30
          disabled:cursor-not-allowed
          disabled:opacity-40
          print:hidden
        "
      >
        <span aria-hidden="true">✦</span>

        <span>
          {isTr
            ? "AI Değerlendirmesi"
            : "AI Assessment"}
        </span>

        <span className="
          rounded-full
          border border-white/15
          bg-white/10
          px-2 py-0.5
          text-[10px]
          font-bold uppercase
          tracking-[0.08em]
          text-fuchsia-100
        ">
          Premium
        </span>
      </button>

      {isOpen && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-slate-950/80
            px-4 py-8
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setIsOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="premium-modal-title"
            className="
              relative
              w-full max-w-xl
              overflow-hidden
              rounded-[28px]
              border border-violet-400/20
              bg-[#081225]
              shadow-2xl shadow-black/60
            "
          >
            <div
              className="
                absolute inset-x-0 top-0 h-40
                bg-gradient-to-b
                from-violet-600/20
                via-fuchsia-500/10
                to-transparent
                pointer-events-none
              "
            />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={isTr ? "Kapat" : "Close"}
              className="
                absolute right-5 top-5 z-10
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-white/10
                bg-white/5
                text-lg text-slate-300
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              ×
            </button>

            <div className="relative p-7 sm:p-9">
              <div
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  border border-fuchsia-400/20
                  bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20
                  text-2xl
                  shadow-inner shadow-white/5
                "
              >
                ✦
              </div>

              <div className="mt-6">
                <p
                  className="
                    text-xs font-bold uppercase
                    tracking-[0.16em]
                    text-cyan-400
                  "
                >
                  SERNEM PREMIUM
                </p>

                <h2
                  id="premium-modal-title"
                  className="
                    mt-2
                    text-2xl font-bold tracking-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  {isTr
                    ? "AI destekli profesyonel HSE değerlendirmesi"
                    : "Professional AI-powered HSE assessment"}
                </h2>

                <p
                  className="
                    mt-4
                    max-w-lg
                    text-sm leading-7
                    text-slate-300
                  "
                >
                  {isTr
                    ? "Denetiminizi yapay zekâ ile analiz edin; kritik bulguları, uygunsuzlukları ve önerilen düzeltici aksiyonları daha hızlı değerlendirin."
                    : "Analyze your inspection with AI to review critical findings, non-conformities and recommended corrective actions faster."}
                </p>
              </div>

              <div
                className="
                  mt-7 grid gap-3
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.035]
                  p-4
                  sm:grid-cols-3
                "
              >
                {[
                  isTr ? "Kritik bulgu analizi" : "Critical finding analysis",
                  isTr ? "Aksiyon önerileri" : "Action recommendations",
                  isTr ? "Profesyonel özet" : "Professional summary",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex items-start gap-2
                      rounded-xl
                      border border-white/5
                      bg-black/10
                      px-3 py-3
                    "
                  >
                    <span className="mt-0.5 text-emerald-400">✓</span>

                    <span className="text-xs leading-5 text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="
                  mt-8
                  flex flex-col gap-3
                  sm:flex-row
                "
              >
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="
                    inline-flex flex-1 items-center justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-violet-600
                    via-fuchsia-600
                    to-purple-600
                    px-5 py-3.5
                    text-sm font-bold
                    text-white
                    shadow-lg shadow-fuchsia-950/30
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:shadow-fuchsia-950/40
                  "
                >
                  {isTr ? "Premium'a Geç" : "Upgrade to Premium"}
                  <span className="ml-2">→</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="
                    inline-flex flex-1 items-center justify-center
                    rounded-2xl
                    border border-slate-700
                    bg-slate-900
                    px-5 py-3.5
                    text-sm font-semibold
                    text-slate-300
                    transition
                    hover:border-slate-600
                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  {isTr ? "Şimdi Değil" : "Not Now"}
                </button>
              </div>

              <p
                className="
                  mt-5 text-center
                  text-[11px] leading-5
                  text-slate-500
                "
              >
                {isTr
                  ? "Premium erişiminiz aktif olduğunda AI değerlendirmesi doğrudan denetim ekranınızda kullanılabilir."
                  : "Once Premium access is active, AI assessment becomes available directly in your inspection workspace."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
