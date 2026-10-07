"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
  assessmentId: string;
  locale: string;
  isPremium: boolean;
};

function nextRevision(value: unknown) {
  const raw = String(value ?? "1.0").trim();
  const match = raw.match(/^(\d+)(?:\.(\d+))?$/);
  if (!match) return "2.0";
  const major = Number(match[1]);
  const minor = Number(match[2] ?? 0);
  return `${major}.${minor + 1}`;
}

export default function RiskAssessmentActions({ assessmentId, locale, isPremium }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const isTurkish = locale === "tr";
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  async function handleDuplicate() {
    if (!isPremium) {
      router.push(`/${locale}/upgrade`);
      return;
    }
    setIsDuplicating(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("No authenticated session");

      const { data: source, error: readError } = await supabase
        .from("risk_assessments")
        .select("*")
        .eq("id", assessmentId)
        .eq("user_id", user.id)
        .single();
      if (readError || !source) throw readError || new Error("Assessment not found");

      const revision = nextRevision(source.revision);
      const { id: _id, created_at: _createdAt, updated_at: _updatedAt, ...copy } = source;
      const titleBase = source.project_name || source.title || source.document_no || "Risk Assessment";
      const payload = {
        ...copy,
        user_id: user.id,
        revision,
        title: `${titleBase} · Rev ${revision}`,
        updated_at: new Date().toISOString(),
      };

      const { data: created, error: insertError } = await supabase
        .from("risk_assessments")
        .insert(payload)
        .select("id")
        .single();
      if (insertError || !created) throw insertError || new Error("Duplicate failed");

      router.push(`/${locale}/tools/quick-risk-assessment?assessment=${created.id}`);
    } catch (error) {
      console.error("Risk assessment duplicate error:", error);
      alert(isTurkish ? "Yeni revizyon oluşturulamadı." : "A new revision could not be created.");
    } finally {
      setIsDuplicating(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(isTurkish ? "Bu risk analizini silmek istediğinize emin misiniz?" : "Are you sure you want to delete this risk assessment?");
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("No authenticated session");
      const { error } = await supabase.from("risk_assessments").delete().eq("id", assessmentId).eq("user_id", user.id);
      if (error) throw error;
      router.refresh();
    } catch (error) {
      console.error("Risk assessment delete error:", error);
      alert(isTurkish ? "Risk analizi silinemedi." : "Risk assessment could not be deleted.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button type="button" onClick={handleDuplicate} disabled={isDuplicating}
        className="rounded-lg border border-amber-300/30 bg-amber-300/[0.07] px-2.5 py-1.5 text-[9px] font-black text-amber-200 transition hover:bg-amber-300/[0.12] disabled:opacity-50">
        {isDuplicating ? (isTurkish ? "Oluşturuluyor..." : "Creating...") : isPremium ? (isTurkish ? "Yeni Revizyon" : "New Revision") : (isTurkish ? "Yeni Revizyon · PRO" : "New Revision · PRO")}
      </button>
      <button type="button" onClick={handleDelete} disabled={isDeleting}
        className="rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 py-1.5 text-[9px] font-black text-red-300 transition hover:bg-red-500/20 disabled:opacity-50">
        {isDeleting ? (isTurkish ? "Siliniyor..." : "Deleting...") : (isTurkish ? "Sil" : "Delete")}
      </button>
    </>
  );
}
