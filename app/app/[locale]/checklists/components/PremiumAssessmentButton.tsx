"use client";

type PremiumAssessmentButtonProps = {
  locale: string;
  disabled?: boolean;
  onPremiumClick?: () => void;
};

export default function PremiumAssessmentButton({
  locale,
  disabled = false,
  onPremiumClick,
}: PremiumAssessmentButtonProps) {
  function handleClick() {
    if (onPremiumClick) {
      onPremiumClick();
      return;
    }

    alert(
      locale === "tr"
        ? "🔒 Bu özellik Premium üyeler içindir."
        : "🔒 This feature is available to Premium members.",
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="rounded-2xl bg-fuchsia-700 px-6 py-4 font-semibold text-white transition hover:bg-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {locale === "tr"
        ? "🔒 AI Değerlendirmesi (Premium)"
        : "🔒 Generate AI Assessment (Premium)"}
    </button>
  );
}
