import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fieldForms } from "@/lib/content/fieldForms";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") return {};
  const isTr = locale === "tr";
  const title = isTr ? "Ücretsiz İSG Saha Formları ve Şablonları | SERNEM" : "Free HSE Field Forms & Printable Templates | SERNEM";
  const description = isTr
    ? `${fieldForms.length} ücretsiz İSG saha formu: JSA, LOTO, sıcak çalışma, kapalı alan, kaldırma, PTW devir, toolbox, güvenlik gözlemi ve olay araştırması. TR/EN, yazdırılabilir.`
    : `${fieldForms.length} free editable HSE forms: JSA, LOTO, hot work, confined space, lifting, PTW handover, toolbox, safety observations and incident investigation. TR/EN.`;
  return {
    title,
    description,
    alternates: {
      canonical: "https://www.sernem.com/" + locale + "/field-forms",
      languages: {
        tr: "https://www.sernem.com/tr/field-forms",
        en: "https://www.sernem.com/en/field-forms",
        "x-default": "https://www.sernem.com/en/field-forms",
      },
    },
    openGraph: { title, description, url: "https://www.sernem.com/" + locale + "/field-forms", siteName: "SERNEM", type: "website" },
  };
}

export default async function FieldFormsLanding({ params }: Props) {
  const { locale } = await params;
  if (locale !== "tr" && locale !== "en") notFound();
  const isTr = locale === "tr";
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-blue-950/60 to-slate-950 px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <Link href={"/" + locale + "/knowledge-base"} className="text-sm font-bold text-sky-300 hover:underline">
            ← {isTr ? "Bilgi Merkezine Dön" : "Back to Knowledge Base"}
          </Link>
          <p className="mt-8 text-sm font-bold uppercase tracking-widest text-emerald-400">
            {isTr ? "SERNEM • Ücretsiz Saha Kaynakları" : "SERNEM • Free Field Resources"}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
            {isTr ? "Ücretsiz İSG Saha Formları" : "Free HSE Field Forms & Templates"}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {isTr
              ? "JSA, LOTO, sıcak çalışma, kapalı alan, kaldırma planı, PTW vardiya devri, toolbox ve gözlem takibi dahil saha formlarını tarayıcıda doldurun; yazdırın veya PDF kaydedin."
              : "Use editable worksheets for JSA, LOTO, hot work, confined space, lifting plans, PTW handover, toolbox talks and safety observations. Print or save them as PDFs."}
          </p>
          <p className="mt-4 text-sm text-slate-400">
            {isTr ? "Form girişleri sunucuya gönderilmez; sayfa kapatılırsa otomatik geri yüklenmez." : "Your entries stay in the current browser page. They are not uploaded or automatically restored."}
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-2 xl:grid-cols-3">
        {fieldForms.map((form, index) => (
          <article key={form.slug} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-7">
            <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              {isTr ? "Form " : "Form "}{String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-4 text-2xl font-black">{form.title[locale]}</h2>
            <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{form.description[locale]}</p>
            <Link href={"/" + locale + "/field-forms/" + form.slug} className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-500">
              {isTr ? "Ücretsiz formu aç" : "Open free worksheet"} →
            </Link>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16 text-sm leading-7 text-slate-400">
        <h2 className="text-lg font-bold text-white">{isTr ? "Sahaya uygun kullanın" : "Adapt to your worksite"}</h2>
        <p className="mt-3">
          {isTr
            ? "Bu formlar öğrenme ve dokümantasyon amacıyla hazırlanmıştır. Geçerli mevzuat, şirket prosedürleri, PTW, güvenlik denetimi veya resmî bildirim gereksinimlerinin yerine geçmez."
            : "These forms support planning and learning. They do not replace applicable legal duties, company procedures, permits, supervision or mandatory reporting."}
        </p>
      </section>
    </main>
  );
}
