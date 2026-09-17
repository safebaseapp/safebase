"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
  locale: string;
  userId: string;
  isPremium: boolean;
};

const BUCKET_NAME = "company-assets";
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export default function CompanyBranding({
  locale,
  userId,
  isPremium,
}: Props) {
  const isTurkish = locale === "tr";
  const supabase = createClient();

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isPremium);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [projectName, setProjectName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [workArea, setWorkArea] = useState("");
  const [presentedBy, setPresentedBy] = useState("");
  const [revision, setRevision] = useState("00");
  const [isProfileLoading, setIsProfileLoading] = useState(isPremium);
  const [isProfileSaving, setIsProfileSaving] = useState(false);

  useEffect(() => {
    if (!isPremium) {
      setIsLoading(false);
      return;
    }

    async function loadLogo() {
      setIsLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list(userId, {
          limit: 20,
          search: "logo.",
        });

      if (error) {
        setErrorMessage(
          isTurkish
            ? "Logo bilgisi yüklenemedi."
            : "Logo information could not be loaded.",
        );
        setIsLoading(false);
        return;
      }

      const logoFile = data?.find((file) =>
        file.name.startsWith("logo."),
      );

      if (!logoFile) {
        setLogoUrl(null);
        setIsLoading(false);
        return;
      }

      const logoPath = `${userId}/${logoFile.name}`;

      const { data: signedData, error: signedError } =
        await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(logoPath, 60 * 60);

      if (signedError) {
        setErrorMessage(
          isTurkish
            ? "Logo önizlemesi oluşturulamadı."
            : "Logo preview could not be created.",
        );
      } else {
        setLogoUrl(signedData.signedUrl);
      }

      setIsLoading(false);
    }

    void loadLogo();
  }, [isPremium, isTurkish, supabase, userId]);

  useEffect(() => {
    if (!isPremium) {
      setIsProfileLoading(false);
      return;
    }

    async function loadDocumentProfile() {
      setIsProfileLoading(true);

      try {
        const profilePath = `${userId}/document-profile.json`;

        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .download(profilePath);

        if (error) {
          setIsProfileLoading(false);
          return;
        }

        const profile = JSON.parse(await data.text()) as {
          projectName?: string;
          siteName?: string;
          workArea?: string;
          presentedBy?: string;
          revision?: string;
        };

        setProjectName(profile.projectName ?? "");
        setSiteName(profile.siteName ?? "");
        setWorkArea(profile.workArea ?? "");
        setPresentedBy(profile.presentedBy ?? "");
        setRevision(profile.revision ?? "00");
      } catch (error) {
        console.error("Document profile load error:", error);
      } finally {
        setIsProfileLoading(false);
      }
    }

    void loadDocumentProfile();
  }, [isPremium, supabase, userId]);

  async function handleProfileSave() {
    setMessage("");
    setErrorMessage("");

    try {
      setIsProfileSaving(true);

      const profile = {
        projectName: projectName.trim(),
        siteName: siteName.trim(),
        workArea: workArea.trim(),
        presentedBy: presentedBy.trim(),
        revision: revision.trim() || "00",
        updatedAt: new Date().toISOString(),
      };

      const blob = new Blob(
        [JSON.stringify(profile, null, 2)],
        { type: "image/png" },
      );

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(`${userId}/document-profile.json`, blob, {
          contentType: "image/png",
          cacheControl: "0",
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      setMessage(
        isTurkish
          ? "Doküman profili başarıyla kaydedildi."
          : "Document profile saved successfully.",
      );
    } catch (error) {
      console.error("Document profile save error:", error);

      setErrorMessage(
        isTurkish
          ? "Doküman profili kaydedilemedi."
          : "The document profile could not be saved.",
      );
    } finally {
      setIsProfileSaving(false);
    }
  }

  async function removeExistingLogos() {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(userId, {
        limit: 20,
      });

    if (error) {
      throw new Error(error.message);
    }

    const existingPaths =
      data
        ?.filter((file) => file.name.startsWith("logo."))
        .map((file) => `${userId}/${file.name}`) ?? [];

    if (existingPaths.length === 0) {
      return;
    }

    const { error: removeError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(existingPaths);

    if (removeError) {
      throw new Error(removeError.message);
    }
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("");
    setErrorMessage("");

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage(
        isTurkish
          ? "Yalnızca PNG, JPG veya WebP dosyası yükleyebilirsiniz."
          : "Only PNG, JPG or WebP files are allowed.",
      );
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(
        isTurkish
          ? "Logo dosyası en fazla 2 MB olabilir."
          : "The logo file must not exceed 2 MB.",
      );
      event.target.value = "";
      return;
    }

    const extension =
      file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
          ? "webp"
          : "jpg";

    const logoPath = `${userId}/logo.${extension}`;

    try {
      setIsUploading(true);

      await removeExistingLogos();

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(logoPath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: signedData, error: signedError } =
        await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(logoPath, 60 * 60);

      if (signedError) {
        throw new Error(signedError.message);
      }

      setLogoUrl(signedData.signedUrl);
      setMessage(
        isTurkish
          ? "Şirket logonuz başarıyla kaydedildi."
          : "Your company logo was saved successfully.",
      );
    } catch (error) {
      console.error("Company logo upload error:", error);

      setErrorMessage(
        isTurkish
          ? "Logo yüklenemedi. Storage ayarlarını kontrol edin."
          : "The logo could not be uploaded. Check the Storage settings.",
      );
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function handleRemove() {
    setMessage("");
    setErrorMessage("");

    try {
      setIsRemoving(true);
      await removeExistingLogos();

      setLogoUrl(null);
      setMessage(
        isTurkish
          ? "Şirket logosu kaldırıldı."
          : "The company logo was removed.",
      );
    } catch (error) {
      console.error("Company logo remove error:", error);

      setErrorMessage(
        isTurkish
          ? "Logo kaldırılamadı."
          : "The logo could not be removed.",
      );
    } finally {
      setIsRemoving(false);
    }
  }

  if (!isPremium) {
    return (
      <section className="mt-6 overflow-hidden rounded-3xl border border-amber-400/20 bg-slate-900/70">
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_320px] lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-2xl">
                🏢
              </span>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  Premium
                </p>
                <h2 className="mt-1 text-2xl font-bold">
                  Company Branding
                </h2>
              </div>
            </div>

            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
              {isTurkish
                ? "Şirket logonuzu bir kez yükleyin. Premium dokümanlarınız otomatik olarak kendi kurumsal logonuzla oluşturulsun."
                : "Upload your company logo once. Premium documents will automatically be generated with your corporate logo."}
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <p>✓ {isTurkish ? "Kullanıcıya özel logo" : "User-specific logo"}</p>
              <p>✓ {isTurkish ? "Otomatik PDF markalama" : "Automatic PDF branding"}</p>
              <p>✓ {isTurkish ? "Güvenli özel depolama" : "Secure private storage"}</p>
              <p>✓ {isTurkish ? "Tüm dokümanlarda kullanım" : "Use across all documents"}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-amber-400/15 bg-slate-950/60 p-6">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-2xl">
                🔒
              </div>

              <h3 className="mt-5 text-lg font-bold">
                {isTurkish
                  ? "Premium üyeliğe özel"
                  : "Exclusive to Premium"}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "Logo yüklemek ve kişiselleştirilmiş doküman oluşturmak için Premium plana geçin."
                  : "Upgrade to Premium to upload a logo and create personalised documents."}
              </p>
            </div>

            <Link
              href={`/${locale}/upgrade`}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              {isTurkish ? "Premium'u İncele" : "Explore Premium"}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-900/70">
      <div className="border-b border-slate-800 bg-gradient-to-r from-emerald-500/10 to-blue-500/5 px-6 py-5 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl">
              🏢
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">
                  Company Branding
                </h2>

                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                  PREMIUM
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-400">
                {isTurkish
                  ? "Dokümanlarınızda kullanılacak şirket logosunu yönetin."
                  : "Manage the company logo used on your documents."}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
            ● {isTurkish ? "Aktif" : "Active"}
          </span>
        </div>
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-[360px_1fr] lg:p-8">
        <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 p-6">
          {isLoading ? (
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-blue-400" />
              <p className="mt-4 text-sm text-slate-500">
                {isTurkish ? "Logo yükleniyor..." : "Loading logo..."}
              </p>
            </div>
          ) : logoUrl ? (
            <div className="w-full text-center">
              <div className="mx-auto flex min-h-40 items-center justify-center rounded-xl bg-white p-6">
                <img
                  src={logoUrl}
                  alt={
                    isTurkish
                      ? "Şirket logosu önizlemesi"
                      : "Company logo preview"
                  }
                  className="max-h-32 max-w-full object-contain"
                />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                {isTurkish ? "Logo hazır" : "Logo ready"}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
                🖼️
              </div>

              <h3 className="mt-4 font-bold">
                {isTurkish
                  ? "Henüz logo yüklenmedi"
                  : "No logo uploaded yet"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                PNG, JPG veya WebP
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold">
            {isTurkish ? "Şirket logosu" : "Company logo"}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {isTurkish
              ? "Yatay veya kare, şeffaf arka planlı yüksek kaliteli bir logo önerilir. Dosya boyutu en fazla 2 MB olabilir."
              : "A high-quality horizontal or square logo with a transparent background is recommended. Maximum file size is 2 MB."}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <label
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 ${
                isUploading ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />

              {isUploading
                ? isTurkish
                  ? "Yükleniyor..."
                  : "Uploading..."
                : logoUrl
                  ? isTurkish
                    ? "Logoyu Değiştir"
                    : "Change Logo"
                  : isTurkish
                    ? "Logo Yükle"
                    : "Upload Logo"}
            </label>

            {logoUrl && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={isRemoving}
                className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-5 py-3 font-semibold text-rose-200 transition hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRemoving
                  ? isTurkish
                    ? "Kaldırılıyor..."
                    : "Removing..."
                  : isTurkish
                    ? "Logoyu Kaldır"
                    : "Remove Logo"}
              </button>
            )}
          </div>

          <div className="mt-8 border-t border-slate-800 pt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                  {isTurkish ? "Doküman profili" : "Document profile"}
                </p>

                <h3 className="mt-2 text-xl font-bold text-white">
                  {isTurkish
                    ? "Varsayılan proje bilgileri"
                    : "Default project information"}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  {isTurkish
                    ? "Bu bilgiler Premium HSE dokümanlarınızda otomatik kullanılacak. Gerektiğinde daha sonra değiştirebilirsiniz."
                    : "These details will be used automatically in your Premium HSE documents. You can update them whenever required."}
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {isTurkish ? "Kullanıcıya özel" : "User specific"}
              </span>
            </div>

            {isProfileLoading ? (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-blue-400" />
                <span className="text-sm text-slate-400">
                  {isTurkish
                    ? "Doküman profili yükleniyor..."
                    : "Loading document profile..."}
                </span>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-300">
                      {isTurkish ? "Proje" : "Project"}
                    </span>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(event) => setProjectName(event.target.value)}
                      placeholder={
                        isTurkish
                          ? "Örn. MOL Polyol Project"
                          : "e.g. MOL Polyol Project"
                      }
                      maxLength={80}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-300">
                      {isTurkish ? "Saha / Lokasyon" : "Site / Location"}
                    </span>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(event) => setSiteName(event.target.value)}
                      placeholder={
                        isTurkish
                          ? "Örn. Tiszaújváros"
                          : "e.g. Tiszaújváros"
                      }
                      maxLength={80}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-300">
                      {isTurkish ? "Çalışma Alanı" : "Work Area"}
                    </span>
                    <input
                      type="text"
                      value={workArea}
                      onChange={(event) => setWorkArea(event.target.value)}
                      placeholder={
                        isTurkish
                          ? "Örn. OCU / Pipe Rack"
                          : "e.g. OCU / Pipe Rack"
                      }
                      maxLength={80}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-300">
                      {isTurkish ? "Sunumu Yapan" : "Presented By"}
                    </span>
                    <input
                      type="text"
                      value={presentedBy}
                      onChange={(event) => setPresentedBy(event.target.value)}
                      placeholder={
                        isTurkish
                          ? "Örn. HSE Supervisor"
                          : "e.g. HSE Supervisor"
                      }
                      maxLength={80}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </label>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-[180px_1fr] sm:items-end">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-300">
                      {isTurkish ? "Revizyon" : "Revision"}
                    </span>
                    <input
                      type="text"
                      value={revision}
                      onChange={(event) => setRevision(event.target.value)}
                      placeholder="00"
                      maxLength={10}
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                    />
                  </label>

                  <div className="flex sm:justify-end">
                    <button
                      type="button"
                      onClick={handleProfileSave}
                      disabled={isProfileSaving}
                      className="inline-flex min-w-[190px] items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isProfileSaving
                        ? isTurkish
                          ? "Kaydediliyor..."
                          : "Saving..."
                        : isTurkish
                          ? "Doküman Profilini Kaydet"
                          : "Save Document Profile"}
                    </button>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-blue-500/15 bg-blue-500/5 px-4 py-3">
                  <p className="text-sm leading-6 text-slate-400">
                    {isTurkish
                      ? "Logo ve bu proje bilgileri, Premium Toolbox Talk PDF'lerinde şirket dokümanı görünümü oluşturmak için kullanılacak."
                      : "Your logo and these project details will be used to create a company-document appearance in Premium Toolbox Talk PDFs."}
                  </p>
                </div>
              </>
            )}
          </div>

          {message && (
            <p className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-200">
              ✓ {message}
            </p>
          )}

          {errorMessage && (
            <p className="mt-5 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200">
              ⚠ {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
