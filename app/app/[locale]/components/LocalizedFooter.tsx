import Link from "next/link";

type Props = {
  locale: "tr" | "en";
};

export default function LocalizedFooter({ locale }: Props) {
  const isTurkish = locale === "tr";

  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-6 py-12 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <div className="text-xl font-bold text-white">SafeBase</div>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {isTurkish
              ? "HSE profesyonelleri için ücretsiz iş güvenliği araçları, kontrol listeleri, şablonlar ve pratik kaynaklar."
              : "Free safety tools, checklists, templates and practical resources for HSE professionals."}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {isTurkish ? "Platform" : "Platform"}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href={`/${locale}/tools`} className="hover:text-white">
              {isTurkish ? "Araçlar" : "Tools"}
            </Link>
            <a href="#categories" className="hover:text-white">
              {isTurkish ? "Kategoriler" : "Categories"}
            </a>
            <a href="#" className="hover:text-white">
              {isTurkish ? "Kaynaklar" : "Resources"}
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {isTurkish ? "Şirket" : "Company"}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="#" className="hover:text-white">
              {isTurkish ? "Hakkımızda" : "About"}
            </a>
            <a href="#" className="hover:text-white">
              {isTurkish ? "İletişim" : "Contact"}
            </a>
            <a href="#" className="hover:text-white">
              {isTurkish ? "Sık Sorulan Sorular" : "FAQ"}
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {isTurkish ? "Yasal" : "Legal"}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="#" className="hover:text-white">
              {isTurkish ? "Gizlilik Politikası" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-white">
              {isTurkish ? "Kullanım Koşulları" : "Terms of Use"}
            </a>
            <a href="#" className="hover:text-white">
              {isTurkish ? "Çerez Politikası" : "Cookie Policy"}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          © 2026 SafeBase.{" "}
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
