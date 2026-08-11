"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
  assessmentId: string;
  locale: string;
};

export default function RiskAssessmentActions({
  assessmentId,
  locale,
}: Props) {
  const router = useRouter();
  const supabase = createClient();
  const isTurkish = locale === "tr";

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      isTurkish
        ? "Bu risk analizini silmek istediğinize emin misiniz?"
        : "Are you sure you want to delete this risk assessment?"
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert(
          isTurkish
            ? "Oturum bulunamadı."
            : "No authenticated session found."
        );
        return;
      }

      const { error } = await supabase
        .from("risk_assessments")
        .delete()
        .eq("id", assessmentId)
        .eq("user_id", user.id);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error("Risk assessment delete error:", error);

      alert(
        isTurkish
          ? "Risk analizi silinemedi."
          : "Risk assessment could not be deleted."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting
        ? isTurkish
          ? "Siliniyor..."
          : "Deleting..."
        : isTurkish
          ? "Sil"
          : "Delete"}
    </button>
  );
}
