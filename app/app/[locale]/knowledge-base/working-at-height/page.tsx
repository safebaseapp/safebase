import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WorkingAtHeightGuide({ params }: Props) {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const hazards = isTurkish
    ? [
        "Korumasız kenarlardan düşme",
        "Uygun olmayan veya hasarlı erişim ekipmanı",
        "Yanlış ankraj noktası kullanımı",
        "Düşen cisimler",
        "Olumsuz hava koşulları",
        "Yetersiz kurtarma planı",
      ]
    : [
        "Falls from unprotected edges",
        "Improper or damaged access equipment",
        "Incorrect anchorage selection",
        "Dropped objects",
        "Adverse weather conditions",
        "Inadequate rescue planning",
      ];

  const controls = isTurkish
    ? [
        "Çalışma başlamadan önce risk değerlendirmesi ve izin sürecini tamamlayın.",
        "Öncelikle toplu koruma önlemlerini kullanın: korkuluk, platform ve bariyerler.",
        "Tam vücut emniyet kemeri ve uygun bağlantı sistemlerini kontrol edin.",
        "Ankraj noktalarının uygunluğunu ve yeterli dayanımını doğrulayın.",
        "Merdiven, iskele ve yükseltici platformları kullanımdan önce inceleyin.",
        "Alt bölgeyi bariyerleyin ve düşen cisim riskini kontrol edin.",
        "Çalışanların eğitimli ve yetkin olduğundan emin olun.",
        "Çalışma öncesinde uygulanabilir bir kurtarma planı hazırlayın.",
      ]
    : [
        "Complete the risk assessment and permit process before work begins.",
        "Prioritize collective protection such as guardrails, platforms and barriers.",
        "Inspect full-body harnesses and compatible connecting systems.",
        "Verify anchorage suitability and adequate strength.",
        "Inspect ladders, scaffolds and elevating platforms before use.",
        "Barricade the area below and control dropped-object hazards.",
        "Ensure workers are trained and competent.",
        "Prepare a practical rescue plan before starting work.",
      ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-blue-950/40 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <Link
            href={`/${locale}/knowledge-base`}
            className="text-sm font-bold text-blue-400 hover:text-blue-300"
          >
            ← {isTurkish ? "Bilgi Merkezine Dön" : "Back to Knowledge Base"}
          </Link>

          <p className="mt-10 text-sm font-black uppercase tracking-[0.22em] text-emerald-400">
            {isTurkish ? "Çalışma Faaliyeti" : "Work Activity"}
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
            {isTurkish
              ? "Yüksekte Çalışma Güvenliği"
              : "Working at Height Safety"}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {isTurkish
              ? "Düşmeleri önlemek, uygun erişim sağlamak, ankraj sistemlerini doğrulamak ve güvenli bir kurtarma planı hazırlamak için temel rehber."
              : "Essential guidance for preventing falls, providing safe access, verifying anchorage systems and preparing an effective rescue plan."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
              OSHA
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
              {isTurkish ? "8 dk okuma" : "8 min read"}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-16 lg:px-8">
        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Genel Bakış" : "Overview"}
          </h2>

          <p className="mt-5 leading-8 text-slate-400">
            {isTurkish
              ? "Yüksekte çalışma; düşme sonucu yaralanma ihtimali bulunan her faaliyeti kapsar. Güvenli sistem, tehlikenin ortadan kaldırılmasıyla başlamalı; bu mümkün değilse toplu ve kişisel düşme önleme tedbirleri uygulanmalıdır."
              : "Working at height includes any activity where a person could fall and be injured. A safe system should begin by eliminating the hazard; when elimination is not possible, collective and personal fall-prevention controls must be applied."}
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Başlıca Tehlikeler" : "Main Hazards"}
          </h2>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {hazards.map((hazard) => (
              <li
                key={hazard}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-300"
              >
                • {hazard}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Temel Kontroller" : "Essential Controls"}
          </h2>

          <ol className="mt-6 space-y-4">
            {controls.map((control, index) => (
              <li
                key={control}
                className="flex gap-4 rounded-xl border border-white/10 bg-slate-900/60 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black">
                  {index + 1}
                </span>
                <span className="pt-1 text-slate-300">{control}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "OSHA Referansları" : "OSHA References"}
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">
              OSHA 1926 Subpart M
            </span>
            <span className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">
              OSHA 1910.28
            </span>
            <span className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">
              OSHA 1910.140
            </span>
          </div>
        </article>

        <article className="rounded-3xl border border-blue-400/20 bg-blue-600/10 p-8">
          <h2 className="text-3xl font-black">
            {isTurkish
              ? "Daha Fazla Rehberlik mi Gerekiyor?"
              : "Need More Guidance?"}
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            {isTurkish
              ? "Yüksekte çalışma konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik bir yanıt al."
              : "Ask SafeBase AI a working-at-height question and receive practical guidance based on the knowledge base."}
          </p>

          <Link
            href={`/${locale}/ai-assistant`}
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-500"
          >
            {isTurkish ? "SafeBase AI'a Sor" : "Ask SafeBase AI"} →
          </Link>
        </article>
      </section>
    </main>
  );
}
