import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "../dashboard/LogoutButton";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AccountSuspendedPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,status")
    .eq("id", user.id)
    .single();

  if (profile?.status !== "suspended") {
    redirect(`/${locale}/dashboard`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-red-400/20 bg-white/[0.04] p-7 text-center shadow-2xl shadow-black/30 sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-400/25 bg-red-400/10 text-4xl">
          🚫
        </div>

        <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-red-300">
          Sernem Account Security
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          {isTurkish
            ? "Hesabınız askıya alınmıştır"
            : "Your account has been suspended"}
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          {isTurkish
            ? "Bu hesap için Sernem çalışma alanına erişim geçici olarak durdurulmuştur. Hesabınızın yeniden etkinleştirilmesi için Sernem yönetimiyle iletişime geçin."
            : "Access to the Sernem workspace has been temporarily disabled for this account. Contact Sernem administration to have your account reviewed."}
        </p>

        <div className="mt-7 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            {isTurkish ? "Hesap" : "Account"}
          </p>

          <p className="mt-2 break-all font-bold text-slate-300">
            {user.email ?? "—"}
          </p>
        </div>

        <div className="mt-7 flex justify-center">
          <LogoutButton locale={locale} />
        </div>
      </section>
    </main>
  );
}
