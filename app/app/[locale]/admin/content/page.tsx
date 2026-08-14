import Link from "next/link";
import { redirect } from "next/navigation";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { createClient } from "@/utils/supabase/server";
import { isAdminUser } from "@/lib/auth/access";
import { toolboxData } from "@/lib/toolbox/toolbox-data";

import ContentManagerClient, {
  type ContentControlItem,
} from "./ContentManagerClient";

const OWNER_EMAIL = "safebase.global@gmail.com";

type Props = {
  params: Promise<{ locale: string }>;
};

type SettingRow = {
  content_key: string;
  content_type: string;
  published: boolean;
  visible: boolean;
  access_level: "free" | "premium";
  featured: boolean;
};

function humanizeFileName(fileName: string) {
  return fileName
    .replace(/\.(ts|tsx|pdf|docx|xlsx)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function readTsFiles(relativePath: string, excluded: string[] = []) {
  const fullPath = join(process.cwd(), relativePath);

  if (!existsSync(fullPath)) return [];

  return readdirSync(fullPath)
    .filter((file) => file.endsWith(".ts"))
    .filter((file) => !excluded.includes(file))
    .sort();
}

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toolboxTitle(
  record: Record<string, unknown>,
  index: number,
  locale: "tr" | "en"
) {
  const selectedLocale = record[locale];

  if (
    selectedLocale &&
    typeof selectedLocale === "object" &&
    !Array.isArray(selectedLocale)
  ) {
    const localized =
      selectedLocale as Record<string, unknown>;

    const title = safeString(localized.title);

    if (title) return title;
  }

  const fallbackLocale =
    locale === "tr" ? record.en : record.tr;

  if (
    fallbackLocale &&
    typeof fallbackLocale === "object" &&
    !Array.isArray(fallbackLocale)
  ) {
    const localized =
      fallbackLocale as Record<string, unknown>;

    const title = safeString(localized.title);

    if (title) return title;
  }

  const slug = safeString(record.slug);

  if (slug) {
    return slug
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (character) =>
        character.toUpperCase()
      );
  }

  return `Toolbox ${index + 1}`;
}

function toolboxKey(
  record: Record<string, unknown>,
  index: number
) {
  const value =
    safeString(record.id) ||
    safeString(record.slug) ||
    safeString(record.code);

  return value
    ? `toolbox:${value}`
    : `toolbox:index-${index}`;
}

export default async function ContentManagementPage({
  params,
}: Props) {
  const { locale: rawLocale } = await params;
  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  const isTurkish = locale === "tr";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?next=/${locale}/admin/content`);
  }

  const isOwner =
    user.email?.trim().toLowerCase() === OWNER_EMAIL;

  if (!isOwner || !isAdminUser(user)) {
    redirect(`/${locale}/dashboard`);
  }

  const posterFiles = readTsFiles("lib/posters-v2", ["types.ts"]);
  const checklistFiles = readTsFiles("data/checklists");
  const downloadFiles = readTsFiles("lib/downloads");

  const toolboxRecords =
    toolboxData as unknown as Array<Record<string, unknown>>;

  const rawItems: Array<{
    content_key: string;
    title: string;
    content_type: string;
    source: string;
  }> = [
    ...toolboxRecords.map((record, index) => ({
      content_key: toolboxKey(record, index),
      title: toolboxTitle(record, index, locale),
      content_type: "Toolbox",
      source: "lib/toolbox/toolbox-data.ts",
    })),

    ...posterFiles.map((file) => ({
      content_key: `poster:${file.replace(/\.ts$/, "")}`,
      title: humanizeFileName(file),
      content_type: "Poster",
      source: `lib/posters-v2/${file}`,
    })),

    ...checklistFiles.map((file) => ({
      content_key: `checklist:${file.replace(/\.ts$/, "")}`,
      title: humanizeFileName(file),
      content_type: "Checklist",
      source: `data/checklists/${file}`,
    })),

    ...downloadFiles.map((file) => ({
      content_key: `download:${file.replace(/\.ts$/, "")}`,
      title: humanizeFileName(file),
      content_type: "Download",
      source: `lib/downloads/${file}`,
    })),
  ];

  const { data: settingsData, error: settingsError } =
    await supabase
      .from("content_controls")
      .select(
        "content_key,content_type,published,visible,access_level,featured"
      );

  const settings = (settingsData ?? []) as SettingRow[];

  const settingsMap = new Map(
    settings.map((setting) => [
      setting.content_key,
      setting,
    ])
  );

  const items: ContentControlItem[] = rawItems.map((item) => {
    const setting = settingsMap.get(item.content_key);

    return {
      ...item,
      visible: setting?.visible ?? true,
      access_level: setting?.access_level ?? "free",
      published: setting?.published ?? true,
      featured: setting?.featured ?? false,
    };
  });

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="border-b border-white/10 pb-8">
          <Link
            href={`/${locale}/admin`}
            className="text-sm font-bold text-blue-400 transition hover:text-blue-300"
          >
            ←{" "}
            {isTurkish
              ? "Yönetici paneline dön"
              : "Back to admin panel"}
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-400">
                SERNEM CONTENT CONTROL
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                {isTurkish
                  ? "İçerik Yönetimi"
                  : "Content Management"}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
                {isTurkish
                  ? "Sernem içeriklerini yayın, görünürlük, erişim ve öne çıkarma seviyesinde yönetin."
                  : "Manage Sernem content publishing, visibility, access and featured status."}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/[0.06] px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
                {isTurkish ? "TOPLAM İÇERİK" : "TOTAL CONTENT"}
              </p>

              <p className="mt-1 text-3xl font-black text-white">
                {items.length}
              </p>
            </div>
          </div>
        </section>

        {settingsError && (
          <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-300">
            {settingsError.message}
          </div>
        )}

        <ContentManagerClient
          locale={locale}
          initialItems={items}
        />
      </div>
    </main>
  );
}
