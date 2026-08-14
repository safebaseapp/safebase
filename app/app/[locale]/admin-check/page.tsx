import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser, getAdminEmails } from "@/lib/auth/access";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AdminCheckPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "tr" ? "tr" : "en";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?next=/${locale}/admin-check`);
  }

  const email = user.email ?? "EMAIL YOK";
  const adminResult = isAdminUser(user);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
          SERNEM Admin Check
        </p>

        <h1 className="mt-4 text-3xl font-black">
          Admin erişim kontrolü
        </h1>

        <div className="mt-8 space-y-5">
          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Oturumdaki e-posta</p>
            <p className="mt-2 break-all text-lg font-black">{email}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Admin sonucu</p>
            <p
              className={`mt-2 text-lg font-black ${
                adminResult ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {adminResult ? "TRUE — ADMIN" : "FALSE — ADMIN DEĞİL"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Environment admin listesi
            </p>
            <p className="mt-2 break-all text-sm font-bold">
              {getAdminEmails().join(", ") || "ENV LİSTESİ BOŞ"}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Beklenen ana admin</p>
            <p className="mt-2 text-lg font-black">
              safebase.global@gmail.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
