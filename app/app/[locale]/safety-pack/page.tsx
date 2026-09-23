import Link from "next/link";
import { notFound } from "next/navigation";
import { growthTopics } from "@/lib/growth/relatedTopics";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string }>;
};

export default async function SafetyPackPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { topic: requestedTopic } = await searchParams;

  if (locale !== "tr" && locale !== "en") notFound();

  const isTurkish = locale === "tr";
  const topic = growthTopics.find((item) => item.key === requestedTopic) ?? growthTopics[0];

  const tools = [
    topic.posterSlug && {
      number: "01",
      label: isTurkish ? "Poster" : "Poster",
      description: isTurkish ? "Sahada hızlı görsel hatırlatma." : "Fast visual reminder for the field.",
      href: `/${locale}/posters/${topic.posterSlug}`,
    },
    topic.checklistSlug && {
      number: "02",
      label: isTurkish ? "Denetim" : "Inspection",
      description: isTurkish ? "Kontrolleri sahada doğrula ve bulguları kaydet." : "Verify controls in the field and record findings.",
      href: `/${locale}/checklists/${topic.checklistSlug}`,
    },
    topic.guideSlug && {
      number: "03",
      label: isTurkish ? "Uygulama Rehberi" : "Practice Guide",
      description: isTurkish ? "Kontrol mantığını ve iyi uygulamaları incele." : "Review control logic and good practices.",
      href: `/${locale}/knowledge-base/${topic.guideSlug}`,
    },
  ].filter(Boolean) as { number: string; label: string; description: string; href: string }[];

  return (
    <main className="min-h-screen bg-[#020712] px-4 py-10 text-white sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-blue-500/10 p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">SERNEM Safety Pack</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {isTurkish ? "Bir faaliyeti seç. İlgili HSE akışını tek yerden tamamla." : "Choose an activity. Complete the matching HSE workflow from one place."}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            {isTurkish
              ? "Safety Pack şu anda SERNEM’deki mevcut profesyonel kaynakları aynı faaliyet altında birleştirir. Yeni üretim motoru daha sonra bu akışın üzerine eklenecek."
              : "Safety Pack currently brings SERNEM’s existing professional resources together under one activity. The document-generation engine will be added on top of this workflow later."}
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
            {isTurkish ? "Faaliyet seç" : "Choose activity"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {growthTopics.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}/safety-pack?topic=${item.key}`}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  item.key === topic.key
                    ? "border-emerald-400 bg-emerald-400 text-slate-950"
                    : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
                }`}
              >
                {item.labels[locale]}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-emerald-400/40"
            >
              <span className="text-4xl font-black text-slate-800 group-hover:text-emerald-500/30">{tool.number}</span>
              <h2 className="mt-6 text-xl font-black">{tool.label}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{tool.description}</p>
              <p className="mt-6 text-sm font-black text-emerald-400">{isTurkish ? "Aç" : "Open"} →</p>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Next</p>
          <h2 className="mt-2 text-2xl font-black">
            {isTurkish ? "Bir sonraki sürüm: tek tıkla tam doküman paketi" : "Next release: full document pack in one click"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            {isTurkish
              ? "Risk Assessment, Method Statement, Toolbox, Inspection ve saha materyallerini aynı proje bilgileri ve şirket markasıyla birleştiren üretim akışı bu omurgaya bağlanacak."
              : "The generation workflow will connect Risk Assessment, Method Statement, Toolbox, Inspection and field materials using the same project data and company branding."}
          </p>
        </section>
      </div>
    </main>
  );
}
