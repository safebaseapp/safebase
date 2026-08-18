import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "user" | "admin";
  plan: "free" | "premium";
  status: "active" | "suspended";
  created_at: string;
  updated_at: string;
};

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminUserEditPage({
  params,
  searchParams,
}: Props) {
  const { locale: rawLocale, id } = await params;
  const query = await searchParams;

  const locale = rawLocale === "tr" ? "tr" : "en";
  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/${locale}/login?next=/${locale}/admin/users/${id}`
    );
  }

  if (!isAdminUser(user)) {
    redirect(`/${locale}/dashboard`);
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id,email,full_name,role,plan,status,created_at,updated_at"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const profile = data as Profile;
  const isOwnAccount = user.id === profile.id;

  async function updateProfile(formData: FormData) {
    "use server";

    const serverSupabase = await createClient();

    const {
      data: { user: currentUser },
    } = await serverSupabase.auth.getUser();

    if (!currentUser) {
      redirect(`/${locale}/login`);
    }

    if (!isAdminUser(currentUser)) {
      redirect(`/${locale}/dashboard`);
    }

    const fullName = String(formData.get("full_name") ?? "").trim();
    const plan = String(formData.get("plan") ?? "");
    const role = String(formData.get("role") ?? "");
    const status = String(formData.get("status") ?? "");

    const validPlans = ["free", "premium"];
    const validRoles = ["user", "admin"];
    const validStatuses = ["active", "suspended"];

    if (
      !validPlans.includes(plan) ||
      !validRoles.includes(role) ||
      !validStatuses.includes(status)
    ) {
      redirect(
        `/${locale}/admin/users/${id}?error=invalid-values`
      );
    }

    if (
      currentUser.id === id &&
      (role !== "admin" || status !== "active")
    ) {
      redirect(
        `/${locale}/admin/users/${id}?error=self-protection`
      );
    }

    const { error: updateError } = await serverSupabase.rpc(
      "admin_update_profile",
      {
        target_user_id: id,
        new_full_name: fullName,
        new_plan: plan,
        new_role: role,
        new_status: status,
      },
    );

    if (updateError) {
      console.error("Profile update error:", updateError);

      redirect(
        `/${locale}/admin/users/${id}?error=update-failed`
      );
    }

    revalidatePath(`/${locale}/admin/users`);
    revalidatePath(`/${locale}/admin/users/${id}`);

    redirect(
      `/${locale}/admin/users/${id}?success=updated`
    );
  }

  const errorMessages: Record<string, string> = {
    "invalid-values": isTurkish
      ? "Gönderilen bilgiler geçerli değil."
      : "The submitted values are invalid.",
    "self-protection": isTurkish
      ? "Kendi admin yetkinizi kaldıramaz veya kendi hesabınızı askıya alamazsınız."
      : "You cannot remove your own admin access or suspend your own account.",
    "update-failed": isTurkish
      ? "Profil güncellenemedi. Supabase yetkilerini kontrol edin."
      : "The profile could not be updated. Check Supabase permissions.",
  };

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-white/10 pb-7">
          <Link
            href={`/${locale}/admin/users`}
            className="text-sm font-black text-blue-400 transition hover:text-blue-300"
          >
            ← {isTurkish ? "Kullanıcılara dön" : "Back to users"}
          </Link>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
            SERNEM User Management
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            {isTurkish ? "Kullanıcıyı Düzenle" : "Edit User"}
          </h1>

          <p className="mt-3 text-slate-400">
            {isTurkish
              ? "Kullanıcının üyelik planını, rolünü ve hesap durumunu yönetin."
              : "Manage the user's membership plan, role and account status."}
          </p>
        </header>

        {query.success === "updated" && (
          <div className="mt-7 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-4 text-emerald-200">
            <p className="font-black">
              ✅{" "}
              {isTurkish
                ? "Kullanıcı başarıyla güncellendi."
                : "User updated successfully."}
            </p>
          </div>
        )}

        {query.error && (
          <div className="mt-7 rounded-2xl border border-red-400/25 bg-red-400/10 px-5 py-4 text-red-200">
            <p className="font-black">
              ❌{" "}
              {errorMessages[query.error] ??
                (isTurkish
                  ? "Beklenmeyen bir hata oluştu."
                  : "An unexpected error occurred.")}
            </p>
          </div>
        )}

        <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
          <div className="border-b border-white/10 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-2xl font-black">
                  {profile.full_name ||
                    profile.email?.split("@")[0] ||
                    "SERNEM User"}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  ID: {profile.id}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-4 py-2 text-xs font-black ${
                  profile.status === "active"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-red-400/15 text-red-300"
                }`}
              >
                {profile.status === "active"
                  ? isTurkish
                    ? "● AKTİF"
                    : "● ACTIVE"
                  : isTurkish
                    ? "● ASKIDA"
                    : "● SUSPENDED"}
              </span>
            </div>
          </div>

          <form action={updateProfile} className="space-y-6 p-6 sm:p-8">
            <div>
              <label
                htmlFor="full_name"
                className="mb-2 block text-sm font-black text-slate-300"
              >
                👤 {isTurkish ? "İsim" : "Name"}
              </label>

              <input
                id="full_name"
                name="full_name"
                type="text"
                defaultValue={profile.full_name ?? ""}
                placeholder={
                  isTurkish ? "Kullanıcının adı" : "User's name"
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/60"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-black text-slate-300"
              >
                📧 {isTurkish ? "E-posta" : "Email"}
              </label>

              <input
                id="email"
                type="email"
                value={profile.email ?? ""}
                readOnly
                className="w-full cursor-not-allowed rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-slate-400 outline-none"
              />

              <p className="mt-2 text-xs text-slate-500">
                {isTurkish
                  ? "E-posta, Supabase Auth hesabıyla eşleşmesi gerektiği için bu ekranda salt okunurdur."
                  : "Email is read-only here because it must remain synchronized with Supabase Auth."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="plan"
                  className="mb-2 block text-sm font-black text-slate-300"
                >
                  💳 {isTurkish ? "Plan" : "Plan"}
                </label>

                <select
                  id="plan"
                  name="plan"
                  defaultValue={profile.plan}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-400/60"
                >
                  <option value="free">🌍 Free</option>
                  <option value="premium">👑 Premium</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-black text-slate-300"
                >
                  🛡️ {isTurkish ? "Rol" : "Role"}
                </label>

                <select
                  id="role"
                  name="role"
                  defaultValue={profile.role}
                  disabled={isOwnAccount}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:border-blue-400/60"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                {isOwnAccount && (
                  <input type="hidden" name="role" value="admin" />
                )}
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-black text-slate-300"
                >
                  🚫 {isTurkish ? "Durum" : "Status"}
                </label>

                <select
                  id="status"
                  name="status"
                  defaultValue={profile.status}
                  disabled={isOwnAccount}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:border-blue-400/60"
                >
                  <option value="active">
                    {isTurkish ? "Active — Aktif" : "Active"}
                  </option>
                  <option value="suspended">
                    {isTurkish ? "Suspended — Askıda" : "Suspended"}
                  </option>
                </select>

                {isOwnAccount && (
                  <input type="hidden" name="status" value="active" />
                )}
              </div>
            </div>

            {isOwnAccount && (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm text-amber-200">
                🔒{" "}
                {isTurkish
                  ? "Kendi hesabınızın admin rolü ve aktif durumu güvenlik amacıyla korunuyor."
                  : "Your own admin role and active status are protected for security."}
              </div>
            )}

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-5 text-sm sm:grid-cols-2">
              <div>
                <p className="font-black text-slate-300">
                  {isTurkish ? "Kayıt tarihi" : "Created"}
                </p>
                <p className="mt-1 text-slate-500">
                  {formatDate(profile.created_at, locale)}
                </p>
              </div>

              <div>
                <p className="font-black text-slate-300">
                  {isTurkish ? "Son güncelleme" : "Last updated"}
                </p>
                <p className="mt-1 text-slate-500">
                  {formatDate(profile.updated_at, locale)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
              <Link
                href={`/${locale}/admin/users`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-center font-black text-slate-300 transition hover:bg-white/[0.08]"
              >
                {isTurkish ? "İptal" : "Cancel"}
              </Link>

              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-7 py-3 font-black text-white transition hover:bg-blue-500"
              >
                💾 {isTurkish ? "Değişiklikleri Kaydet" : "Save Changes"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
