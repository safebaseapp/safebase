import Link from "next/link";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedFooter({ locale }: Props) {
  const isTurkish = locale === "tr";

  const linkClass =
    "text-slate-400 transition-colors hover:text-white";

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-12 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <Link
            href={`/${locale}`}
            className="text-xl font-bold tracking-tight text-white"
          >
            SERNEM
          </Link>

          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
            {isTurkish
              ? "HSE profesyonelleri için iş güvenliği araçları, kontrol listeleri, şablonlar ve pratik saha kaynakları."
              : "Safety tools, checklists, templates and practical field resources for HSE professionals."}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Platform</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href={`/${locale}/tools`} className={linkClass}>
              {isTurkish ? "Araçlar" : "Tools"}
            </Link>

            <Link href={`/${locale}/toolbox`} className={linkClass}>
              Toolbox
            </Link>

            <Link href={`/${locale}/downloads`} className={linkClass}>
              {isTurkish ? "Kaynaklar" : "Resources"}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {isTurkish ? "Şirket" : "Company"}
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href={`/${locale}/about`} className={linkClass}>
              {isTurkish ? "Hakkımızda" : "About"}
            </Link>

            <Link href={`/${locale}/contact`} className={linkClass}>
              {isTurkish ? "İletişim" : "Contact"}
            </Link>

            <Link href={`/${locale}/faq`} className={linkClass}>
              {isTurkish ? "Sık Sorulan Sorular" : "FAQ"}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {isTurkish ? "Yasal" : "Legal"}
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href={`/${locale}/privacy`} className={linkClass}>
              {isTurkish ? "Gizlilik Politikası" : "Privacy Policy"}
            </Link>

            <Link href={`/${locale}/terms`} className={linkClass}>
              {isTurkish ? "Kullanım Koşulları" : "Terms of Use"}
            </Link>

            <Link href={`/${locale}/cookies`} className={linkClass}>
              {isTurkish ? "Çerez Politikası" : "Cookie Policy"}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          © 2026 SERNEM.{" "}
          {isTurkish ? "Tüm hakları saklıdır." : "All rights reserved."}
        </div>

        <div>
          {isTurkish
            ? "İş güvenliği profesyonelleri için geliştirildi."
            : "Built for safety professionals."}
        </div>
      </div>
    </footer>
  );
}
