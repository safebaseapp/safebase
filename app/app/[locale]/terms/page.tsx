import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";

  return {
    title: tr ? "Kullanım Koşulları | SERNEM" : "Terms of Use | SERNEM",
    description: tr
      ? "SERNEM platformunun kullanımına ilişkin şartlar ve koşullar."
      : "Terms and conditions governing the use of the SERNEM platform.",
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const tr = rawLocale === "tr";

  const sections = tr
    ? [
        {
          title: "1. Genel",
          body: (
            <>
              <p>
                Bu Kullanım Koşulları, SERNEM web platformuna erişiminizi ve
                platformun kullanımını düzenler.
              </p>
              <p>
                SERNEM'i kullanarak bu koşulları kabul etmiş sayılırsınız.
                Koşulları kabul etmiyorsanız platformu kullanmamalısınız.
              </p>
            </>
          ),
        },
        {
          title: "2. Platformun amacı",
          body: (
            <p>
              SERNEM; HSE ve iş güvenliği profesyonellerinin çalışmalarını
              desteklemek amacıyla risk değerlendirme araçları, Method
              Statement araçları, hesaplayıcılar, kontrol listeleri, Toolbox
              Talk içerikleri, rehberler, doküman özellikleri ve yapay zekâ
              destekli işlevler sunar.
            </p>
          ),
        },
        {
          title: "3. Profesyonel sorumluluk",
          body: (
            <>
              <p>
                SERNEM tarafından sağlanan içerikler, hesaplamalar, şablonlar,
                AI çıktıları veya oluşturulan dokümanlar profesyonel
                değerlendirme, saha incelemesi veya yetkili bir güvenlik
                kararının yerine geçmez.
              </p>
              <p>
                Kullanıcı; oluşturulan çıktıların gerçek saha koşullarına,
                yürürlükteki mevzuata, müşteri veya şirket prosedürlerine,
                üretici talimatlarına ve işe özel gerekliliklere uygunluğunu
                kontrol etmekten sorumludur.
              </p>
            </>
          ),
        },
        {
          title: "4. Hesaplar",
          body: (
            <>
              <p>
                Bazı SERNEM özelliklerinin kullanılması için kullanıcı hesabı
                oluşturulması gerekebilir.
              </p>
              <p>
                Kullanıcı, hesabına ilişkin bilgilerin doğru tutulmasından ve
                giriş bilgilerinin güvenliğinden sorumludur. Hesabın yetkisiz
                kullanıldığından şüphelenilmesi halinde SERNEM ile iletişime
                geçilmelidir.
              </p>
            </>
          ),
        },
        {
          title: "5. Ücretsiz ve Premium özellikler",
          body: (
            <>
              <p>
                SERNEM freemium bir model kullanabilir. Bazı özellikler ücretsiz
                olarak sunulurken belirli araçlar, kaynaklar veya doküman
                fonksiyonları Premium üyeliğe bağlı olabilir.
              </p>
              <p>
                Premium kapsamında sunulan özellikler, fiyatlandırma ve kullanım
                kapsamı zaman içinde güncellenebilir.
              </p>
            </>
          ),
        },
        {
          title: "6. SERNEM AI",
          body: (
            <>
              <p>
                SERNEM AI tarafından oluşturulan yanıtlar yapay zekâ destekli
                bilgi çıktılarıdır ve hatalı, eksik veya belirli bir saha
                durumuna uygun olmayan bilgiler içerebilir.
              </p>
              <p>
                Güvenliği etkileyen kararlar, mevzuat yorumları ve operasyonel
                uygulamalar yalnızca AI çıktısına dayanılarak yapılmamalıdır.
              </p>
            </>
          ),
        },
        {
          title: "7. Kabul edilebilir kullanım",
          body: (
            <>
              <p>Kullanıcılar platformu aşağıdaki amaçlarla kullanamaz:</p>
              <ul>
                <li>Yasa dışı faaliyetler yürütmek,</li>
                <li>Platformun güvenliğini aşmaya veya bozmaya çalışmak,</li>
                <li>Yetkisiz erişim elde etmeye çalışmak,</li>
                <li>
                  Platformun çalışmasını engelleyen otomatik veya kötüye
                  kullanım niteliğindeki işlemler gerçekleştirmek,
                </li>
                <li>
                  SERNEM içeriğini yanıltıcı, zararlı veya hukuka aykırı şekilde
                  kullanmak.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "8. Fikri mülkiyet",
          body: (
            <>
              <p>
                SERNEM markası, platform tasarımı, yazılım yapısı, özgün
                içerikler, grafikler ve platforma ait diğer materyaller ilgili
                fikri mülkiyet hakları kapsamında korunabilir.
              </p>
              <p>
                Kullanıcılara sunulan içerikler, izin verilen kişisel veya
                profesyonel kullanım dışında SERNEM'in izni olmadan yeniden
                satılamaz, toplu şekilde dağıtılamaz veya başka bir ürünün
                parçası olarak pazarlanamaz.
              </p>
            </>
          ),
        },
        {
          title: "9. Hizmetin kullanılabilirliği",
          body: (
            <p>
              SERNEM platformun kesintisiz veya hatasız şekilde her zaman
              kullanılabilir olacağını garanti etmez. Bakım, teknik sorunlar,
              güvenlik çalışmaları veya üçüncü taraf hizmetler nedeniyle
              platformun bazı bölümleri geçici olarak kullanılamayabilir.
            </p>
          ),
        },
        {
          title: "10. Sorumluluğun sınırlandırılması",
          body: (
            <>
              <p>
                SERNEM, platform üzerinden sağlanan bilgilerin veya oluşturulan
                çıktıların belirli bir saha, proje veya hukuki gereklilik için
                tek başına yeterli olduğunu garanti etmez.
              </p>
              <p>
                Kullanıcının platform çıktıları üzerinden aldığı profesyonel,
                operasyonel veya güvenlikle ilgili kararların doğrulanması
                kullanıcının sorumluluğundadır.
              </p>
            </>
          ),
        },
        {
          title: "11. Hesabın sınırlandırılması veya sonlandırılması",
          body: (
            <p>
              Kullanım koşullarının ihlal edilmesi, platformun kötüye
              kullanılması, güvenlik riski oluşturulması veya hukuki
              yükümlülüklerin gerektirmesi halinde SERNEM belirli hesapların
              erişimini sınırlandırabilir veya sonlandırabilir.
            </p>
          ),
        },
        {
          title: "12. Koşullardaki değişiklikler",
          body: (
            <p>
              Bu Kullanım Koşulları platform geliştikçe güncellenebilir. Güncel
              sürüm bu sayfada yayımlanır ve yayınlandığı tarihten itibaren
              geçerli olur.
            </p>
          ),
        },
      ]
    : [
        {
          title: "1. General",
          body: (
            <>
              <p>
                These Terms of Use govern your access to and use of the SERNEM
                web platform.
              </p>
              <p>
                By using SERNEM, you agree to these terms. If you do not agree,
                you should not use the platform.
              </p>
            </>
          ),
        },
        {
          title: "2. Purpose of the platform",
          body: (
            <p>
              SERNEM provides risk assessment tools, Method Statement tools,
              calculators, inspection checklists, Toolbox Talk resources,
              guides, document functionality and AI-assisted features designed
              to support HSE and safety professionals.
            </p>
          ),
        },
        {
          title: "3. Professional responsibility",
          body: (
            <>
              <p>
                Content, calculations, templates, AI outputs and documents
                generated through SERNEM do not replace professional judgement,
                site assessment or decisions made by competent safety
                personnel.
              </p>
              <p>
                Users are responsible for verifying outputs against actual site
                conditions, applicable legislation, client or company
                procedures, manufacturer instructions and job-specific
                requirements.
              </p>
            </>
          ),
        },
        {
          title: "4. Accounts",
          body: (
            <>
              <p>
                Certain SERNEM features may require the creation of a user
                account.
              </p>
              <p>
                Users are responsible for maintaining accurate account
                information and protecting their login credentials. Suspected
                unauthorized account use should be reported to SERNEM.
              </p>
            </>
          ),
        },
        {
          title: "5. Free and Premium features",
          body: (
            <>
              <p>
                SERNEM may operate using a freemium model. Certain functionality
                may be offered free of charge while specific tools, resources
                or document features may require Premium membership.
              </p>
              <p>
                Premium features, pricing and included functionality may be
                updated over time.
              </p>
            </>
          ),
        },
        {
          title: "6. SERNEM AI",
          body: (
            <>
              <p>
                Responses generated by SERNEM AI are AI-assisted informational
                outputs and may contain inaccurate, incomplete or
                contextually unsuitable information.
              </p>
              <p>
                Safety-critical decisions, regulatory interpretations and
                operational actions should not be based solely on AI-generated
                output.
              </p>
            </>
          ),
        },
        {
          title: "7. Acceptable use",
          body: (
            <>
              <p>Users may not use the platform to:</p>
              <ul>
                <li>Conduct unlawful activities,</li>
                <li>Attempt to bypass or compromise platform security,</li>
                <li>Attempt to gain unauthorized access,</li>
                <li>
                  Perform automated or abusive actions that disrupt platform
                  operation,
                </li>
                <li>
                  Use SERNEM content in a misleading, harmful or unlawful
                  manner.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "8. Intellectual property",
          body: (
            <>
              <p>
                The SERNEM brand, platform design, software structure, original
                content, graphics and other platform materials may be protected
                by applicable intellectual property rights.
              </p>
              <p>
                Content made available to users may not be resold, distributed
                in bulk or marketed as part of another product without
                permission from SERNEM, except where expressly permitted.
              </p>
            </>
          ),
        },
        {
          title: "9. Service availability",
          body: (
            <p>
              SERNEM does not guarantee that the platform will be available at
              all times without interruption or error. Certain features may
              become temporarily unavailable due to maintenance, technical
              issues, security work or third-party services.
            </p>
          ),
        },
        {
          title: "10. Limitation of responsibility",
          body: (
            <>
              <p>
                SERNEM does not guarantee that information or outputs provided
                through the platform will, by themselves, satisfy the
                requirements of a specific workplace, project or legal
                framework.
              </p>
              <p>
                Users remain responsible for reviewing and verifying
                professional, operational and safety-related decisions based on
                platform outputs.
              </p>
            </>
          ),
        },
        {
          title: "11. Account restriction or termination",
          body: (
            <p>
              SERNEM may restrict or terminate access to accounts where these
              terms are violated, the platform is abused, a security risk is
              created or applicable legal obligations require such action.
            </p>
          ),
        },
        {
          title: "12. Changes to these terms",
          body: (
            <p>
              These Terms of Use may be updated as the platform develops. The
              current version will be published on this page and will apply
              from the date of publication.
            </p>
          ),
        },
      ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-xs font-black uppercase tracking-[0.28em] text-blue-400">
            {tr ? "YASAL" : "LEGAL"}
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            {tr ? "Kullanım Koşulları" : "Terms of Use"}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            {tr
              ? "SERNEM platformunun kullanımına ilişkin temel şartları ve kullanıcı sorumluluklarını açıklıyoruz."
              : "These terms explain the core conditions and responsibilities associated with using the SERNEM platform."}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            {tr
              ? "Son güncelleme: 31 Ağustos 2026"
              : "Last updated: 31 August 2026"}
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-7"
            >
              <h2 className="text-xl font-black">{section.title}</h2>

              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                {section.body}
              </div>
            </article>
          ))}

          <article className="rounded-2xl border border-blue-500/25 bg-blue-500/[0.05] p-7">
            <h2 className="text-xl font-black">
              {tr ? "İletişim" : "Contact"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              {tr
                ? "Bu koşullarla ilgili sorularınız için:"
                : "For questions regarding these terms:"}
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sernem.support@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex font-bold text-blue-400 hover:text-blue-300"
            >
              sernem.support@gmail.com
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
