"use client";

// Kept under its existing filename for compatibility with checklist imports.
// AI assessment is a checklist feature, not a PDF branding entitlement.
type AssessmentButtonProps = {
  locale: string;
  disabled?: boolean;
  isPremiumUser?: boolean;
  onPremiumClick?: () => void;
};

export default function PremiumAssessmentButton({
  locale,
  disabled = false,
  onPremiumClick,
}: AssessmentButtonProps) {
  const isTr = locale === "tr";
  return (
    <button
      type="button"
      disabled={disabled || !onPremiumClick}
      onClick={() => onPremiumClick?.()}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-fuchsia-400/20 bg-gradient-to-r from-violet-700 via-fuchsia-700 to-purple-700 px-6 py-4 font-semibold text-white shadow-lg shadow-fuchsia-950/20 transition hover:-translate-y-0.5 hover:border-fuchsia-300/40 disabled:cursor-not-allowed disabled:opacity-40 print:hidden"
    >
      <span aria-hidden="true">✦</span>
      <span>{isTr ? "AI Değerlendirmesi" : "AI Assessment"}</span>
    </button>
  );
}
