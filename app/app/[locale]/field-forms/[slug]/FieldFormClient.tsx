"use client";

import Link from "next/link";
import type { FieldForm, FieldLocale } from "@/lib/content/fieldForms";

export default function FieldFormClient({ form, locale }: { form: FieldForm; locale: FieldLocale }) {
  const isTr = locale === "tr";
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-blue-950/50 to-slate-950 px-5 py-12 print:hidden">
        <div className="mx-auto max-w-5xl">
          <Link href={"/" + locale + "/field-forms"} className="text-sm font-semibold text-sky-300 hover:underline">
            ← {isTr ? "Saha formları" : "Field forms"}
          </Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-widest text-emerald-300">
            {isTr ? "Ücretsiz • TR / EN • Yazdırılabilir" : "Free • TR / EN • Printable"}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">{form.title[locale]}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{form.summary[locale]}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => window.print()} className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400">
              {isTr ? "Formu yazdır / PDF olarak kaydet" : "Print / Save as PDF"}
            </button>
            <span className="text-sm text-slate-400">
              {isTr ? "Tarayıcınızın yazdır menüsü açılır. Veriler sunucuya gönderilmez ve otomatik kaydedilmez." : "Opens your browser print dialog. Entries are not uploaded or automatically saved."}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-7 px-5 py-10 print:max-w-none print:space-y-4 print:p-0">
        <section className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 print:border-slate-300 print:bg-white print:text-black">
          <h2 className="text-xl font-bold">{isTr ? "Nasıl kullanılır?" : "How to use this worksheet"}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300 print:text-black">
            {form.steps[locale].map((step, index) => <li key={index}>{step}</li>)}
          </ol>
        </section>

        <section className="rounded-2xl border border-sky-600/30 bg-sky-950/40 p-6 print:border-slate-300 print:bg-white print:text-black">
          <h2 className="text-lg font-bold">{isTr ? "Saha örneği" : "Worked field example"}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-200 print:text-black">{form.example[locale]}</p>
        </section>

        <div className="rounded-2xl border border-white/15 bg-white p-6 text-slate-950 shadow-xl print:break-before-page print:border-0 print:p-0 print:shadow-none">
          <div className="border-b-2 border-slate-900 pb-4">
            <p className="text-xs font-black tracking-widest text-slate-600">SERNEM — {isTr ? "SAHA FORMU" : "FIELD WORKSHEET"}</p>
            <h2 className="mt-2 text-2xl font-black">{form.title[locale]}</h2>
            <p className="mt-2 text-xs text-slate-600">{isTr ? "Bu form saha koşullarına göre uyarlanmalıdır." : "Adapt this worksheet to actual site conditions."}</p>
          </div>

          {form.sections.slice(0, 1).map((section, i) => (
            <section key={i} className="mt-6">
              <h3 className="mb-4 text-lg font-bold">{section.title[locale]}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.fields.map((field) => (
                  <label key={field.id} className={"block text-sm font-semibold " + (field.multiline ? "sm:col-span-2" : "")}>
                    <span className="mb-2 block">{field.label[locale]}</span>
                    {field.multiline
                      ? <textarea rows={3} name={field.id} aria-label={field.label[locale]} className="w-full resize-y rounded-lg border border-slate-400 bg-white p-2 text-sm text-black print:break-inside-avoid" />
                      : <input type="text" name={field.id} aria-label={field.label[locale]} className="h-11 w-full rounded-lg border border-slate-400 bg-white p-2 text-sm text-black" />}
                  </label>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-8">
            <h3 className="mb-3 text-lg font-bold">{form.table.title[locale]}</h3>
            <div className="overflow-x-auto print:overflow-visible">
              <table className="w-full min-w-[580px] border-collapse text-left text-xs print:min-w-0">
                <thead><tr>{form.table.columns.map((heading, index) => (
                  <th key={index} scope="col" className="border border-slate-500 bg-slate-100 p-2 font-bold">{heading[locale]}</th>
                ))}</tr></thead>
                <tbody>{Array.from({ length: form.table.rows }, (_, row) => (
                  <tr key={row}>{form.table.columns.map((heading, col) => (
                    <td key={col} className="border border-slate-500 p-1 align-top">
                      <label className="sr-only" htmlFor={form.slug + "-cell-" + row + "-" + col}>{heading[locale] + " " + (row + 1)}</label>
                      <textarea id={form.slug + "-cell-" + row + "-" + col} rows={3} className="w-full min-w-0 resize-y border-0 bg-transparent p-1 text-xs text-black outline-offset-1" />
                    </td>
                  ))}</tr>
                ))}</tbody>
              </table>
            </div>
          </section>

          {form.sections.slice(1).map((section, i) => (
            <section key={i} className="mt-8 break-inside-avoid">
              <h3 className="mb-4 text-lg font-bold">{section.title[locale]}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.fields.map((field) => (
                  <label key={field.id} className={"block text-sm font-semibold " + (field.multiline ? "sm:col-span-2" : "")}>
                    <span className="mb-2 block">{field.label[locale]}</span>
                    {field.multiline
                      ? <textarea rows={3} name={field.id} aria-label={field.label[locale]} className="w-full resize-y rounded-lg border border-slate-400 bg-white p-2 text-sm text-black" />
                      : <input type="text" name={field.id} aria-label={field.label[locale]} className="h-11 w-full rounded-lg border border-slate-400 bg-white p-2 text-sm text-black" />}
                  </label>
                ))}
              </div>
            </section>
          ))}
          <p className="mt-7 border-t border-slate-300 pt-4 text-xs leading-5 text-slate-700">{form.note[locale]}</p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 print:hidden">
          <h2 className="text-xl font-bold">{isTr ? "Sık sorulan sorular" : "Frequently asked questions"}</h2>
          <div className="mt-5 space-y-5">
            {form.faq.map((item) => (
              <div key={item.question.en}>
                <h3 className="font-bold text-sky-200">{item.question[locale]}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-300">{item.answer[locale]}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 print:hidden">
          <h2 className="text-xl font-bold">{isTr ? "İlgili SERNEM kaynakları" : "Related SERNEM resources"}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {form.related.map((link) => (
              <Link key={link.path} href={"/" + locale + link.path} className="rounded-xl border border-white/15 bg-white/5 p-4 font-semibold text-sky-200 hover:bg-white/10">
                {link.label[locale]} →
              </Link>
            ))}
          </div>
          <h3 className="mt-7 font-semibold">{isTr ? "Teknik kaynaklar" : "Technical sources"}</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {form.references.map((reference) => <li key={reference.url}>
              <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline underline-offset-4 hover:text-white">{reference.label}</a>
            </li>)}
          </ul>
          <p className="mt-5 text-sm leading-6 text-amber-200">{form.note[locale]}</p>
        </section>
      </div>
    </main>
  );
}
