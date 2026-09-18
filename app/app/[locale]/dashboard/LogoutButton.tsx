"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  locale: "tr" | "en";
};

export default function LogoutButton({ locale }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const isTurkish = locale === "tr";

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push(`/${locale}/login`);
    router.refresh();
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto">
      <Link
        href={`/${locale}/downloads`}
        className="inline-flex w-full items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-200 transition hover:border-blue-400/50 hover:bg-blue-500/15 sm:min-w-[190px]"
      >
        {isTurkish ? "Download Center" : "Download Center"}
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="w-full rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300 sm:min-w-[190px]"
      >
        {isTurkish ? "Çıkış yap" : "Sign out"}
      </button>
    </div>
  );
}
