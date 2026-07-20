import {Link} from "../../../i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedNavbar({locale}: Props) {
  const isTurkish = locale === "tr";

  return (
    <nav className="border-b border-white/10 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 font-bold text-white">
            S
          </div>

          <div>
            <div className="text-lg font-bold tracking-tight">SafeBase</div>
            <div className="text-xs text-slate-400">
              {isTurkish
                ? "İş güvenliği araçları ve kaynakları"
                : "Safety tools and resources"}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-slate-300 lg:flex">
          <Link href="/tools" className="transition hover:text-blue-400">
            {isTurkish ? "Araçlar" : "Tools"}
          </Link>

          <Link
            href="/ai-assistant"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            🤖 {isTurkish ? "Yapay Zekâ Asistanı" : "AI Assistant"}
          </Link>

          <Link
            href="/knowledge-base"
            className="transition hover:text-blue-400"
          >
            📚 {isTurkish ? "Bilgi Merkezi" : "Knowledge Base"}
          </Link>

          <Link
            href="/downloads"
            className="transition hover:text-blue-400"
          >
            ⬇️ {isTurkish ? "İndirmeler" : "Downloads"}
          </Link>

          <Link href="/#about" className="transition hover:text-blue-400">
            {isTurkish ? "Hakkımızda" : "About"}
          </Link>

          <Link href="/#contact" className="transition hover:text-blue-400">
            {isTurkish ? "İletişim" : "Contact"}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />

          <Link
            href="/tools"
            className="hidden rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:inline-flex"
          >
            {isTurkish ? "Keşfet" : "Explore"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
