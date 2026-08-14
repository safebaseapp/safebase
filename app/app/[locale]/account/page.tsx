"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

type Props = {
  params: Promise<{ locale: string }>;
};

type Profile = {
  full_name: string | null;
  plan: string | null;
  role: string | null;
  status: string | null;
};

const OWNER_EMAIL = "safebase.global@gmail.com";

function svgData(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const avatarPresets = [
  {
    id: "helmet-man",
    tr: "Baretli Erkek",
    en: "Helmet Man",
    src: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="26" fill="#0f172a"/>
        <circle cx="60" cy="61" r="25" fill="#d6a47c"/>
        <path d="M34 51c2-25 50-28 53 0H34z" fill="#facc15"/>
        <rect x="29" y="49" width="62" height="8" rx="4" fill="#eab308"/>
        <path d="M41 85c10-8 29-9 39 0 8 6 12 17 12 27H29c0-11 4-21 12-27z" fill="#2563eb"/>
        <path d="M52 65c4 4 12 4 16 0" fill="none" stroke="#7c4a2f" stroke-width="2" stroke-linecap="round"/>
        <circle cx="51" cy="58" r="2" fill="#1e293b"/>
        <circle cx="69" cy="58" r="2" fill="#1e293b"/>
      </svg>
    `),
  },
  {
    id: "helmet-woman",
    tr: "Baretli Kadın",
    en: "Helmet Woman",
    src: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="26" fill="#0f172a"/>
        <path d="M33 61c0-28 54-28 54 0v20H33z" fill="#3f2a2a"/>
        <circle cx="60" cy="61" r="24" fill="#d9a37b"/>
        <path d="M34 50c3-24 49-27 52 0H34z" fill="#facc15"/>
        <rect x="29" y="48" width="62" height="8" rx="4" fill="#eab308"/>
        <path d="M40 86c12-9 29-9 40 0 8 6 12 16 12 26H28c0-10 5-20 12-26z" fill="#0891b2"/>
        <circle cx="51" cy="59" r="2" fill="#1e293b"/>
        <circle cx="69" cy="59" r="2" fill="#1e293b"/>
        <path d="M53 68c4 3 10 3 14 0" fill="none" stroke="#7c4a2f" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `),
  },
  {
    id: "crane",
    tr: "Vinç",
    en: "Crane",
    src: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="26" fill="#071426"/>
        <rect x="20" y="92" width="80" height="7" rx="3" fill="#334155"/>
        <rect x="35" y="32" width="8" height="61" fill="#f59e0b"/>
        <rect x="38" y="28" width="58" height="7" fill="#facc15"/>
        <path d="M43 37l41 44M43 48l31 33M43 60l21 21" stroke="#f59e0b" stroke-width="4"/>
        <path d="M88 35v35" stroke="#94a3b8" stroke-width="2"/>
        <path d="M88 70c0 8-11 8-11 0" fill="none" stroke="#94a3b8" stroke-width="3"/>
        <circle cx="39" cy="24" r="8" fill="#2563eb"/>
      </svg>
    `),
  },
  {
    id: "field-worker",
    tr: "Saha Çalışanı",
    en: "Field Worker",
    src: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="26" fill="#0b1728"/>
        <circle cx="60" cy="48" r="20" fill="#d5a178"/>
        <path d="M38 43c3-20 41-22 44 0H38z" fill="#facc15"/>
        <rect x="34" y="42" width="52" height="7" rx="3" fill="#eab308"/>
        <path d="M29 108c1-28 12-42 31-42s31 14 31 42H29z" fill="#f97316"/>
        <path d="M47 69l13 39M73 69l-13 39" stroke="#f8fafc" stroke-width="6"/>
        <rect x="52" y="81" width="16" height="10" rx="2" fill="#0f172a"/>
      </svg>
    `),
  },
  {
    id: "hse-shield",
    tr: "HSE Kalkanı",
    en: "HSE Shield",
    src: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop stop-color="#2563eb"/>
            <stop offset="1" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="26" fill="#081426"/>
        <path d="M60 19l34 13v25c0 24-13 38-34 47-21-9-34-23-34-47V32z" fill="url(#g)"/>
        <path d="M42 59l12 12 25-29" fill="none" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="60" y="91" text-anchor="middle" font-family="Arial" font-size="13" font-weight="700" fill="white">HSE</text>
      </svg>
    `),
  },
  {
    id: "plant",
    tr: "Endüstriyel Tesis",
    en: "Industrial Plant",
    src: svgData(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="26" fill="#071426"/>
        <rect x="18" y="68" width="84" height="34" rx="4" fill="#1e3a5f"/>
        <rect x="25" y="52" width="13" height="50" fill="#64748b"/>
        <rect x="67" y="39" width="12" height="63" fill="#475569"/>
        <rect x="87" y="56" width="10" height="46" fill="#64748b"/>
        <path d="M18 68l22-17 17 17 21-21 24 21" fill="#2563eb"/>
        <circle cx="49" cy="82" r="6" fill="#22d3ee"/>
        <circle cx="76" cy="82" r="6" fill="#22d3ee"/>
        <path d="M31 42c8-8-5-11 4-20M73 31c7-7-4-10 3-17" fill="none" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `),
  },
];

export default function AccountPage({ params }: Props) {
  const router = useRouter();

  const [locale, setLocale] = useState<"tr" | "en">("tr");
  const [userId, setUserId] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    full_name: null,
    plan: null,
    role: null,
    status: null,
  });

  const [fullName, setFullName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const [avatarId, setAvatarId] = useState("helmet-man");
  const [originalAvatarId, setOriginalAvatarId] = useState("helmet-man");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [originalAvatarUrl, setOriginalAvatarUrl] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadAccount() {
      const resolved = await params;
      const safeLocale = resolved.locale === "en" ? "en" : "tr";
      setLocale(safeLocale);

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace(`/${safeLocale}/login`);
        return;
      }

      setUserId(user.id);
      setEmailVerified(Boolean(user.email_confirmed_at));

      const userEmail = user.email ?? "";
      setEmail(userEmail);
      setOriginalEmail(userEmail);

      const metadataName =
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : "";

      const metadataAvatar =
        typeof user.user_metadata?.avatar_preset === "string"
          ? user.user_metadata.avatar_preset
          : "helmet-man";

      const metadataAvatarUrl =
        typeof user.user_metadata?.avatar_url === "string"
          ? user.user_metadata.avatar_url
          : "";

      setAvatarId(metadataAvatar);
      setOriginalAvatarId(metadataAvatar);

      setAvatarUrl(metadataAvatarUrl);
      setOriginalAvatarUrl(metadataAvatarUrl);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name,plan,role,status")
        .eq("id", user.id)
        .maybeSingle();

      if (profileData) {
        const typedProfile = profileData as Profile;
        const resolvedName = typedProfile.full_name || metadataName;

        setProfile(typedProfile);
        setFullName(resolvedName);
        setOriginalName(resolvedName);
      } else {
        setFullName(metadataName);
        setOriginalName(metadataName);
      }

      setIsLoading(false);
    }

    loadAccount();
  }, [params, router]);

  const isTurkish = locale === "tr";

  const normalizedPlan = (profile.plan || "free").toLowerCase();
  const normalizedRole = (profile.role || "user").toLowerCase();

  const isAdmin = normalizedRole === "admin";
  const isOwner = originalEmail.toLowerCase() === OWNER_EMAIL;
  const isPremium = normalizedPlan === "premium" || isAdmin;

  const planTitle = isPremium ? "Premium" : "Free";

  const currentAvatar = useMemo(
    () =>
      avatarPresets.find((avatar) => avatar.id === avatarId) ??
      avatarPresets[0],
    [avatarId]
  );

  const avatarSrc = avatarUrl || currentAvatar.src;

  async function uploadAvatar(file: File) {
    setErrorMessage("");
    setSuccessMessage("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        isTurkish
          ? "Yalnızca JPG, PNG veya WebP fotoğraf yükleyebilirsiniz."
          : "Only JPG, PNG or WebP images are allowed."
      );
      return;
    }

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      setErrorMessage(
        isTurkish
          ? "Profil fotoğrafı en fazla 2 MB olabilir."
          : "Profile photo must be 2 MB or smaller."
      );
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const supabase = createClient();

      const filePath = `${userId}/profile-avatar`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: "3600",
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl =
        `${publicData.publicUrl}?v=${Date.now()}`;

      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          avatar_url: publicUrl,
          avatar_preset: avatarId,
        },
      });

      if (metadataError) {
        throw metadataError;
      }

      setAvatarUrl(publicUrl);
      setOriginalAvatarUrl(publicUrl);

      setSuccessMessage(
        isTurkish
          ? "Profil fotoğrafınız güncellendi."
          : "Your profile photo has been updated."
      );
    } catch (error) {
      console.error("Avatar upload error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : isTurkish
            ? "Profil fotoğrafı yüklenemedi."
            : "Profile photo could not be uploaded."
      );
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  async function saveProfile() {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      const cleanName = fullName.trim();

      if (!cleanName) {
        throw new Error(
          isTurkish ? "Ad soyad boş bırakılamaz." : "Full name is required."
        );
      }

      const supabase = createClient();

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: cleanName,
        })
        .eq("id", userId);

      if (profileError) throw profileError;

      const updatePayload: {
        data: {
          full_name: string;
          avatar_preset: string;
          avatar_url: string | null;
        };
        email?: string;
      } = {
        data: {
          full_name: cleanName,
          avatar_preset: avatarId,
          avatar_url: avatarUrl || null,
        },
      };

      if (email.trim() && email.trim() !== originalEmail) {
        updatePayload.email = email.trim();
      }

      const { error: authError } = await supabase.auth.updateUser(updatePayload);

      if (authError) throw authError;

      setProfile((current) => ({
        ...current,
        full_name: cleanName,
      }));

      setOriginalName(cleanName);
      setOriginalAvatarId(avatarId);

      if (email.trim() !== originalEmail) {
        setSuccessMessage(
          isTurkish
            ? "Profil kaydedildi. Yeni e-posta adresinizi doğrulamanız gerekebilir."
            : "Profile saved. You may need to verify your new email address."
        );
      } else {
        setSuccessMessage(
          isTurkish
            ? "Profil bilgileriniz başarıyla güncellendi."
            : "Your profile has been updated successfully."
        );
      }

      setIsEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : isTurkish
            ? "Değişiklikler kaydedilemedi."
            : "Changes could not be saved."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function cancelEditing() {
    setFullName(originalName);
    setEmail(originalEmail);
    setAvatarId(originalAvatarId);
    setAvatarUrl(originalAvatarUrl);
    setErrorMessage("");
    setSuccessMessage("");
    setIsEditing(false);
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-sm text-slate-400">
          {locale === "tr" ? "Hesap yükleniyor..." : "Loading account..."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* PROFILE HEADER */}
        <section className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40">
          <div className="flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl"
                title={isTurkish ? "Avatarı değiştir" : "Change avatar"}
              >
                <img
                  src={avatarSrc}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-slate-950/80 py-1 text-[9px] font-black opacity-0 transition group-hover:opacity-100">
                  {isTurkish ? "DEĞİŞTİR" : "CHANGE"}
                </span>
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-black tracking-tight">
                    {originalName || fullName}
                  </h1>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                    {isTurkish ? "AKTİF" : "ACTIVE"}
                  </span>
                </div>

                <p className="mt-1 text-slate-400">{originalEmail}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${
                      isPremium
                        ? "border-violet-400/20 bg-violet-500/10 text-violet-300"
                        : "border-white/10 bg-white/[0.04] text-slate-300"
                    }`}
                  >
                    {planTitle} Plan
                  </span>

                  {isOwner && (
                    <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">
                      {isTurkish ? "Yönetici" : "Administrator"}
                    </span>
                  )}

                  {emailVerified && (
                    <span className="rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-3 py-1 text-xs font-semibold text-blue-300">
                      {isTurkish ? "E-posta doğrulandı" : "Email verified"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 font-bold text-slate-200 transition hover:bg-white/[0.08]"
              >
                {isTurkish ? "Profili Düzenle" : "Edit Profile"}
              </button>

              <button
                type="button"
                onClick={() => router.push(`/${locale}/dashboard`)}
                className="rounded-xl bg-blue-600 px-5 py-3 font-black text-white transition hover:bg-blue-500"
              >
                {isTurkish ? "Dashboard'a Git" : "Go to Dashboard"} →
              </button>
            </div>
          </div>
        </section>

        {successMessage && (
          <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-3 text-sm text-emerald-300">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">

          {/* LEFT */}
          <section className="overflow-hidden rounded-[26px] border border-white/10 bg-slate-900/70">
            <div className="p-7">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
                    {isTurkish ? "PROFİL & TERCİHLER" : "PROFILE & PREFERENCES"}
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {isTurkish ? "Hesap Bilgileri" : "Account Information"}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {isTurkish
                      ? "Kişisel bilgilerinizi ve hesap tercihlerinizi yönetin."
                      : "Manage your personal information and account preferences."}
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="rounded-xl border border-blue-400/20 bg-blue-500/[0.06] px-4 py-2 text-xs font-black text-blue-300 transition hover:bg-blue-500/[0.1]"
                  >
                    ✎ {isTurkish ? "Düzenle" : "Edit"}
                  </button>
                )}
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-bold text-slate-200">
                      {isTurkish ? "Ad soyad" : "Full name"}
                    </label>

                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300"
                      >
                        {isTurkish ? "Değiştir" : "Change"}
                      </button>
                    )}
                  </div>

                  <input
                    value={fullName}
                    disabled={!isEditing}
                    onChange={(event) => setFullName(event.target.value)}
                    className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                      isEditing
                        ? "border-blue-500/40 bg-slate-950 text-white focus:ring-2 focus:ring-blue-500/20"
                        : "border-white/10 bg-slate-950 text-slate-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-200">
                    {isTurkish ? "E-posta adresi" : "Email address"}
                  </label>

                  <input
                    value={email}
                    disabled={!isEditing}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    className={`w-full rounded-xl border px-4 py-3.5 outline-none transition ${
                      isEditing
                        ? "border-blue-500/40 bg-slate-950 text-white focus:ring-2 focus:ring-blue-500/20"
                        : "border-white/10 bg-slate-950 text-slate-400"
                    }`}
                  />
                </div>
              </div>

              {/* AVATARS */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-black">
                      {isTurkish ? "Profil Avatarı" : "Profile Avatar"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {isTurkish
                        ? "Sernem profilinizi temsil edecek avatarı seçin."
                        : "Choose an avatar to represent your Sernem profile."}
                    </p>
                  </div>

                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-xs font-bold text-blue-400"
                    >
                      {isTurkish ? "Avatarı değiştir" : "Change avatar"}
                    </button>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-5 rounded-2xl border border-blue-400/15 bg-blue-500/[0.045] p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                          <img
                            src={avatarSrc}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-black text-white">
                            {isTurkish
                              ? "Kendi Fotoğrafını Kullan"
                              : "Use Your Own Photo"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {isTurkish
                              ? "JPG, PNG veya WebP • Maksimum 2 MB"
                              : "JPG, PNG or WebP • Maximum 2 MB"}
                          </p>
                        </div>
                      </div>

                      <label
                        className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-500 ${
                          isUploadingAvatar
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                      >
                        {isUploadingAvatar
                          ? isTurkish
                            ? "Yükleniyor..."
                            : "Uploading..."
                          : isTurkish
                            ? "Fotoğraf Yükle"
                            : "Upload Photo"}

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];

                            if (file) {
                              void uploadAvatar(file);
                            }

                            event.currentTarget.value = "";
                          }}
                        />
                      </label>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                    {isTurkish ? "Hazır Avatarlar" : "Preset Avatars"}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {avatarPresets.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      disabled={!isEditing}
                      onClick={() => {
                        setAvatarId(avatar.id);
                        setAvatarUrl("");
                      }}
                      className={`group overflow-hidden rounded-2xl border bg-slate-950 p-2 transition ${
                        avatarId === avatar.id
                          ? "border-blue-400 ring-2 ring-blue-500/20"
                          : "border-white/10 hover:border-white/20"
                      } ${!isEditing ? "cursor-default" : ""}`}
                    >
                      <img
                        src={avatar.src}
                        alt={isTurkish ? avatar.tr : avatar.en}
                        className="aspect-square w-full rounded-xl object-cover"
                      />
                      <p className="mt-2 truncate text-[10px] font-bold text-slate-400">
                        {isTurkish ? avatar.tr : avatar.en}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* LANGUAGE */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-black">
                      {isTurkish ? "Arayüz Dili" : "Interface Language"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {isTurkish
                        ? "Sernem arayüz dilinizi seçin."
                        : "Choose your Sernem interface language."}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => router.push("/tr/account")}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-bold ${
                        locale === "tr"
                          ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                          : "border-white/10 bg-white/[0.03] text-slate-400"
                      }`}
                    >
                      TR
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/en/account")}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-bold ${
                        locale === "en"
                          ? "border-blue-500/40 bg-blue-500/10 text-blue-300"
                          : "border-white/10 bg-white/[0.03] text-slate-400"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 font-bold text-slate-300 transition hover:bg-white/[0.08]"
                  >
                    {isTurkish ? "İptal" : "Cancel"}
                  </button>

                  <button
                    type="button"
                    onClick={saveProfile}
                    disabled={isSaving}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-black text-white transition hover:bg-blue-500 disabled:opacity-50"
                  >
                    {isSaving
                      ? isTurkish
                        ? "Kaydediliyor..."
                        : "Saving..."
                      : isTurkish
                        ? "Değişiklikleri Kaydet"
                        : "Save Changes"}
                  </button>
                </div>
              )}
            </div>

            {/* PROFILE IDENTITY / EMPTY SPACE FILL */}
            <div className="border-t border-white/10 bg-gradient-to-br from-blue-950/30 via-slate-900 to-emerald-950/20 p-7">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-400">
                {isTurkish ? "SERNEM PROFİL KİMLİĞİ" : "SERNEM PROFILE IDENTITY"}
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
                <div className="h-24 w-24 overflow-hidden rounded-[24px] border border-white/10 bg-slate-950 shadow-2xl">
                  <img
                    src={avatarSrc}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-black">{originalName}</h3>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black text-emerald-300">
                      {isTurkish ? "AKTİF PROFİL" : "ACTIVE PROFILE"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {isTurkish
                      ? "Sernem çalışma alanınızdaki kişisel profil kimliğiniz."
                      : "Your personal profile identity across the Sernem workspace."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-3 py-1.5 text-xs font-bold text-violet-300">
                      {planTitle}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300">
                      {locale.toUpperCase()}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300">
                      HSE Workspace
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    {isTurkish ? "Üyelik" : "Membership"}
                  </p>
                  <p className="mt-2 font-black">{planTitle}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    {isTurkish ? "Dil" : "Language"}
                  </p>
                  <p className="mt-2 font-black">
                    {locale === "tr" ? "Türkçe" : "English"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    {isTurkish ? "Durum" : "Status"}
                  </p>
                  <p className="mt-2 font-black text-emerald-300">
                    {isTurkish ? "Aktif" : "Active"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <div className="grid content-start gap-6">

            <section
              className={`rounded-[26px] border p-6 ${
                isPremium
                  ? "border-violet-400/20 bg-violet-500/[0.045]"
                  : "border-white/10 bg-slate-900/70"
              }`}
            >
              <p className={`text-xs font-black uppercase tracking-[0.2em] ${
                isPremium ? "text-violet-400" : "text-emerald-400"
              }`}>
                {isTurkish ? "PLAN & ERİŞİM" : "PLAN & ACCESS"}
              </p>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black">{planTitle}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {isTurkish ? "Aktif üyelik planınız" : "Your active membership plan"}
                  </p>
                </div>

                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-black text-violet-300">
                  {isTurkish ? "AKTİF" : "ACTIVE"}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {(isPremium
                  ? [
                      isTurkish ? "Premium HSE kaynakları" : "Premium HSE resources",
                      isTurkish ? "Premium doküman indirmeleri" : "Premium document downloads",
                      isTurkish ? "Gelişmiş Sernem özellikleri" : "Advanced Sernem features",
                    ]
                  : [
                      isTurkish ? "Ücretsiz HSE araçları" : "Free HSE tools",
                      isTurkish ? "Bilgi merkezi erişimi" : "Knowledge base access",
                      isTurkish ? "Kişisel dashboard" : "Personal dashboard",
                    ]
                ).map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-slate-300"
                  >
                    <span className="text-emerald-400">✓</span>
                    {item}
                  </div>
                ))}
              </div>

              {!isPremium && (
                <button
                  type="button"
                  onClick={() => router.push(`/${locale}/upgrade`)}
                  className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-3 font-black text-white transition hover:bg-violet-500"
                >
                  {isTurkish ? "Premium'a Geç" : "Upgrade to Premium"} →
                </button>
              )}

              {isOwner && (
                <div className="mt-5 rounded-xl border border-blue-400/15 bg-blue-500/[0.06] px-4 py-3 text-sm text-blue-300">
                  {isTurkish
                    ? "Sernem sahibi hesabı: yönetici ve Premium erişimleri aktiftir."
                    : "Sernem owner account: administrator and Premium access are active."}
                </div>
              )}
            </section>

            <section className="rounded-[26px] border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                {isTurkish ? "GÜVENLİK" : "SECURITY"}
              </p>

              <h2 className="mt-3 text-xl font-black">
                {isTurkish ? "Şifre & Hesap Güvenliği" : "Password & Account Security"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "Şifrenizi güvenli sıfırlama akışı üzerinden güncelleyin."
                  : "Update your password using the secure reset flow."}
              </p>

              <button
                type="button"
                onClick={() => router.push(`/${locale}/forgot-password`)}
                className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-black text-white transition hover:bg-white/[0.08]"
              >
                {isTurkish ? "Şifreyi Değiştir" : "Change Password"} →
              </button>
            </section>

            <section className="rounded-[26px] border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">
                {isTurkish ? "HIZLI ERİŞİM" : "QUICK ACCESS"}
              </p>

              <div className="mt-4 grid gap-3">
                {[
                  {
                    label: isTurkish ? "AI Asistan" : "AI Assistant",
                    path: "ai-assistant",
                  },
                  {
                    label: isTurkish ? "Araçlar" : "Tools",
                    path: "tools",
                  },
                  {
                    label: isTurkish ? "Bilgi Merkezi" : "Knowledge Base",
                    path: "knowledge-base",
                  },
                ].map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => router.push(`/${locale}/${item.path}`)}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left font-bold transition hover:bg-white/[0.07]"
                  >
                    <span>{item.label}</span>
                    <span className="text-blue-400">→</span>
                  </button>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
