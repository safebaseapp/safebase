import ResetPasswordForm from "./ResetPasswordForm";

type Props = {
  params: Promise<{ locale: "tr" | "en" }>;
};

export default async function ResetPasswordPage({ params }: Props) {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white">
          {isTurkish ? "Yeni Şifre Belirle" : "Set New Password"}
        </h1>

        <p className="mt-2 text-slate-400">
          {isTurkish
            ? "Hesabın için yeni bir şifre oluştur."
            : "Create a new password for your account."}
        </p>

        <ResetPasswordForm locale={locale} />
      </div>
    </main>
  );
}