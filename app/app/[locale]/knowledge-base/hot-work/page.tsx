import Link from "next/link";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ConfinedSpaceGuide({ params }: Props) {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const hazards = isTurkish
    ? [
        "Oksijen yetersizliği veya oksijen zenginleşmesi",
        "Zehirli veya yanıcı atmosfer",
        "Beklenmeyen enerji veya ürün girişi",
        "Hareketli mekanik ekipmanlar",
        "Boğulma, gömülme veya sıkışma",
        "Yetersiz giriş ve çıkış imkânı",
        "Isı stresi ve sınırlı havalandırma",
        "Hazırlıksız veya gecikmiş kurtarma müdahalesi",
      ]
    : [
        "Oxygen deficiency or oxygen enrichment",
        "Toxic or flammable atmosphere",
        "Unexpected energy or product release",
        "Moving mechanical equipment",
        "Engulfment, entrapment or crushing",
        "Restricted entry and exit",
        "Heat stress and inadequate ventilation",
        "Unprepared or delayed rescue response",
      ];

  const controls = isTurkish
    ? [
        "Alanı değerlendirin ve izin gerektiren kapalı alan olup olmadığını belirleyin.",
        "Giriş öncesinde onaylı kapalı alan giriş iznini hazırlayın ve yetkilendirin.",
        "Tüm enerji, basınç, kimyasal ve ürün kaynaklarını izole edin.",
        "Atmosferi giriş öncesinde ve çalışma boyunca uygun cihazlarla ölçün.",
        "Gerekli olduğunda sürekli ve yeterli mekanik havalandırma sağlayın.",
        "Giriş süresince dışarıda eğitimli bir gözcü bulundurun.",
        "Giriş yapanlarla güvenilir ve kesintisiz iletişim sağlayın.",
        "Ekipmanı, yetkin personeli ve müdahale yöntemini içeren uygulanabilir bir kurtarma planı hazırlayın.",
      ]
    : [
        "Evaluate the space and determine whether it is a permit-required confined space.",
        "Prepare and authorize an approved confined-space entry permit before entry.",
        "Isolate all energy, pressure, chemical and product sources.",
        "Test the atmosphere before entry and throughout the work using suitable instruments.",
        "Provide continuous and adequate mechanical ventilation when required.",
        "Maintain a trained attendant outside the space for the duration of entry.",
        "Provide reliable and continuous communication with authorized entrants.",
        "Prepare a practical rescue plan with suitable equipment, competent personnel and response methods.",
      ];

  const commonMistakes = isTurkish
    ? [
        "Yalnızca giriş öncesinde gaz ölçümü yapmak",
        "Hatları sadece vana kapatarak izole etmek",
        "Gözcüye başka görevler vermek",
        "Kurtarma planı olmadan giriş yapmak",
        "Kalibrasyonu veya bump testi geçersiz gaz dedektörü kullanmak",
        "Çalışma şartları değiştiğinde izni yeniden değerlendirmemek",
      ]
    : [
        "Testing the atmosphere only before entry",
        "Relying only on closed valves for isolation",
        "Assigning unrelated duties to the attendant",
        "Entering without a workable rescue plan",
        "Using a gas detector without valid calibration or bump testing",
        "Failing to reassess the permit when conditions change",
      ];

  const checklist = isTurkish
    ? [
        "Alan sınıflandırıldı ve tehlikeler değerlendirildi",
        "Giriş izni onaylandı ve giriş noktasında mevcut",
        "LOTO ve mekanik izolasyonlar doğrulandı",
        "Gaz dedektörü kontrol edildi ve ölçümler kaydedildi",
        "Havalandırma sistemi çalışıyor",
        "Giriş yapanlar, gözcü ve giriş amiri belirlendi",
        "İletişim yöntemi test edildi",
        "Kurtarma ekipmanı ve kurtarma ekibi hazır",
      ]
    : [
        "The space has been classified and hazards evaluated",
        "The entry permit is approved and available at the entry point",
        "LOTO and mechanical isolations have been verified",
        "The gas detector has been checked and readings recorded",
        "The ventilation system is operating",
        "Entrants, attendant and entry supervisor have been identified",
        "The communication method has been tested",
        "Rescue equipment and rescue personnel are ready",
      ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-blue-950/40 to-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <Link
            href={`/${locale}/knowledge-base`}
            className="text-sm font-bold text-blue-400 transition hover:text-blue-300"
          >
            ← {isTurkish ? "Bilgi Merkezine Dön" : "Back to Knowledge Base"}
          </Link>

          <p className="mt-10 text-sm font-black uppercase tracking-[0.22em] text-emerald-400">
            {isTurkish ? "Çalışma Faaliyeti" : "Work Activity"}
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
            {isTurkish ? "Kapalı Alan Girişi" : "Confined Space Entry"}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            {isTurkish
              ? "Atmosferik tehlikeleri kontrol etmek, enerjiyi izole etmek, güvenli giriş sağlamak ve etkili bir kurtarma düzeni kurmak için temel rehber."
              : "Essential guidance for controlling atmospheric hazards, isolating energy, managing safe entry and preparing an effective rescue arrangement."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
              OSHA
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300">
              {isTurkish ? "10 dk okuma" : "10 min read"}
            </span>

            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300">
              {isTurkish ? "Yüksek Risk" : "High Risk"}
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
              ? "Kapalı alanlar sürekli çalışma için tasarlanmamış, giriş ve çıkışı sınırlı olabilen ve ciddi atmosferik veya fiziksel tehlikeler barındırabilen alanlardır. Giriş yalnızca tehlikeler değerlendirildikten, alan izole edildikten, atmosfer güvenli hâle getirildikten ve izin sistemi tamamlandıktan sonra yapılmalıdır."
              : "Confined spaces are not designed for continuous occupancy, may have restricted entry or exit, and can contain serious atmospheric or physical hazards. Entry should take place only after hazards are evaluated, the space is isolated, acceptable atmospheric conditions are established and the permit process is completed."}
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

        <article className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Yaygın Hatalar" : "Common Mistakes"}
          </h2>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {commonMistakes.map((mistake) => (
              <li
                key={mistake}
                className="flex items-start gap-3 rounded-xl border border-amber-400/15 bg-slate-950/40 px-4 py-4 text-slate-300"
              >
                <span className="font-black text-amber-400">×</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-blue-400/20 bg-blue-500/5 p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Giriş Öncesi Kontrol Listesi" : "Pre-entry Checklist"}
          </h2>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-blue-400/15 bg-slate-950/40 px-4 py-4 text-slate-300"
              >
                <span className="font-black text-emerald-400">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-rose-400/20 bg-rose-400/5 p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "Kurtarma Hazırlığı" : "Rescue Readiness"}
          </h2>

          <p className="mt-5 leading-8 text-slate-400">
            {isTurkish
              ? "Kurtarma planı yalnızca kâğıt üzerinde bulunmamalıdır. Kurtarma yöntemi, ekipmanın alana uygunluğu, ekibin müdahale süresi, haberleşme yöntemi ve gerekirse tripod, vinç veya geri çekme sisteminin kullanılabilirliği girişten önce doğrulanmalıdır. Gözcü izinsiz olarak alana girmemelidir."
              : "A rescue plan must be workable, not merely documented. Before entry, verify the rescue method, equipment suitability, response time, communication arrangements and the availability of retrieval systems such as a tripod or winch where required. The attendant must not enter the space to attempt an unauthorized rescue."}
          </p>
        </article>

        <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "OSHA Referansları" : "OSHA References"}
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">
              OSHA 1910.146
            </span>

            <span className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">
              OSHA 1926 Subpart AA
            </span>

            <span className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">
              OSHA 1926.1204
            </span>

            <span className="rounded-lg border border-emerald-400/20 bg-slate-950/50 px-4 py-3 font-bold text-emerald-300">
              OSHA 1926.1211
            </span>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">
            {isTurkish ? "İlgili Rehberler" : "Related Guides"}
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href={`/${locale}/knowledge-base/loto`}
              className="rounded-xl border border-white/10 bg-slate-900/60 px-5 py-4 font-bold text-slate-300 transition hover:border-blue-400/30 hover:text-white"
            >
              {isTurkish ? "Kilitleme ve Etiketleme" : "Lockout Tagout"} →
            </Link>

            <Link
              href={`/${locale}/knowledge-base/ppe`}
              className="rounded-xl border border-white/10 bg-slate-900/60 px-5 py-4 font-bold text-slate-300 transition hover:border-blue-400/30 hover:text-white"
            >
              {isTurkish ? "Kişisel Koruyucu Donanım" : "Personal Protective Equipment"} →
            </Link>

            <Link
              href={`/${locale}/knowledge-base/hot-work`}
              className="rounded-xl border border-white/10 bg-slate-900/60 px-5 py-4 font-bold text-slate-300 transition hover:border-blue-400/30 hover:text-white"
            >
              {isTurkish ? "Sıcak Çalışma" : "Hot Work Safety"} →
            </Link>
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
              ? "Kapalı alan girişi konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik bir yanıt al."
              : "Ask SafeBase AI a confined-space question and receive practical guidance based on the knowledge base."}
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
