"use client";

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
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
    >
      {isTurkish ? "Çıkış yap" : "Sign out"}
    </button>
  );
}