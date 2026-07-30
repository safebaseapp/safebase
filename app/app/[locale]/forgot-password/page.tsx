"use client";

type Props = {
  locale: "tr" | "en";
};

export default function ForgotPasswordForm({ locale }: Props) {
  const isTurkish = locale === "tr";

  return (
    <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-slate-300">
      {isTurkish
        ? "Şifre sıfırlama formu bir sonraki adımda eklenecek."
        : "Password reset form will be added in the next step."}
    </div>
  );
}