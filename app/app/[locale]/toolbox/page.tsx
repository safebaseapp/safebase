import { createClient } from "@/utils/supabase/server";
import ToolboxLibraryClient from "./ToolboxLibraryClient";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export type ToolboxContentControl = {
  slug: string;
  published: boolean;
  visible: boolean;
  accessLevel: "free" | "premium";
  featured: boolean;
};

export default async function ToolboxLibraryPage({ params }: Props) {
  const { locale: rawLocale } = await params;

  const locale: "tr" | "en" =
    rawLocale === "tr" ? "tr" : "en";

  const supabase = await createClient();

  const { data } = await supabase
    .from("content_controls")
    .select(
      "content_key,published,visible,access_level,featured"
    )
    .like("content_key", "toolbox:%");

  const controls: ToolboxContentControl[] = (data ?? [])
    .filter((row) =>
      typeof row.content_key === "string" &&
      row.content_key.startsWith("toolbox:")
    )
    .map((row) => ({
      slug: row.content_key.replace(/^toolbox:/, ""),
      published: row.published ?? true,
      visible: row.visible ?? true,
      accessLevel:
        row.access_level === "premium"
          ? "premium"
          : "free",
      featured: row.featured ?? false,
    }));

  return (
    <ToolboxLibraryClient
      locale={locale}
      controls={controls}
    />
  );
}
