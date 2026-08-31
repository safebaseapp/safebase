import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";

  return {
    title: tr ? "Çerez Politikası | SERNEM" : "Cookie Policy | SERNEM",
    description: tr
      ? "SERNEM platformunda kullanılan çerezler ve benzeri teknolojiler hakkında bilgi."
      : "Information about cookies and similar technologies used on the SERNEM platform.",
  };
}

export default async function CookiesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const tr = rawLocale === "tr";

  const sections = tr
    ? [
        {
          title: "1. Çerezler nedir?",
          body: (
            <p>
              Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız
              tarafından cihazınızda saklanabilen küçük veri parçalarıdır.
              Benzeri tarayıcı teknolojileri de oturum yönetimi, tercihlerin
              hatırlanması ve temel platform işlevlerinin sağlanması amacıyla
              kullanılabilir.
            </p>
          ),
        },
        {
          title: "2. SERNEM çerezleri neden kullanabilir?",
          body: (
            <>
              <p>SERNEM çerezleri veya benzeri teknolojileri şu amaçlarla kullanabilir:</p>
              <ul>
                <li>Kullanıcı oturumunu ve kimlik doğrulamayı yönetmek,</li>
                <li>Platform güvenliğini desteklemek,</li>
                <li>Kullanıcı tercihlerini hatırlamak,</li>
                <li>Platformun temel özelliklerinin doğru çalışmasını sağlamak,</li>
                <li>Teknik sorunların tespitine ve hizmetin geliştirilmesine yardımcı olmak.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Zorunlu çerezler",
          body: (
            <p>
              Bazı çerezler veya benzeri teknolojiler hesap oturumu, güvenlik
              ve platformun temel işlevleri için gerekli olabilir. Bu
              teknolojiler devre dışı bırakıldığında bazı SERNEM özellikleri
              düzgün çalışmayabilir.
            </p>
          ),
        },
        {
          title: "4. Tercih ve tarayıcı depolama teknolojileri",
          body: (
            <p>
              SERNEM, dil veya arayüz tercihleri gibi belirli kullanıcı
              tercihlerini hatırlamak amacıyla çerezler veya tarayıcıda yerel
              olarak çalışan benzeri depolama teknolojilerinden
              yararlanabilir.
            </p>
          ),
        },
        {
          title: "5. Analitik ve performans",
          body: (
            <p>
              SERNEM gelecekte platform kullanımını ve performansını anlamak
              amacıyla analitik teknolojiler kullanabilir. Böyle bir özellik
              devreye alındığında kullanılan hizmetler ve ilgili çerezler bu
              politika kapsamında güncellenecektir.
            </p>
          ),
        },
        {
          title: "6. Üçüncü taraf hizmetler",
          body: (
            <p>
              Kimlik doğrulama, ödeme veya diğer teknik hizmetleri sağlayan
              üçüncü taraf servisler kendi çerezlerini veya benzeri
              teknolojilerini kullanabilir. Bu servislerin kullanımı kendi
              gizlilik ve çerez politikalarına tabi olabilir.
            </p>
          ),
        },
        {
          title: "7. Çerezleri nasıl kontrol edebilirsiniz?",
          body: (
            <>
              <p>
                Çerezleri tarayıcınızın ayarlarından görüntüleyebilir,
                silebilir veya belirli türdeki çerezleri engelleyebilirsiniz.
              </p>
              <p>
                Ancak zorunlu çerezlerin veya gerekli tarayıcı teknolojilerinin
                engellenmesi hesap girişi veya bazı platform işlevlerinin
                çalışmasını etkileyebilir.
              </p>
            </>
          ),
        },
        {
          title: "8. Politika güncellemeleri",
          body: (
            <p>
              SERNEM'e yeni hizmetler, analitik araçlar veya ödeme özellikleri
              eklendikçe bu Çerez Politikası güncellenebilir. Güncel sürüm bu
              sayfada yayımlanacaktır.
            </p>
          ),
        },
      ]
    : [
        {
          title: "1. What are cookies?",
          body: (
            <p>
              Cookies are small pieces of data that may be stored on your
              device by your browser when you visit a website. Similar browser
              technologies may also be used for session management, remembering
              preferences and providing core platform functionality.
            </p>
          ),
        },
        {
          title: "2. Why may SERNEM use cookies?",
          body: (
            <>
              <p>SERNEM may use cookies or similar technologies to:</p>
              <ul>
                <li>Manage user sessions and authentication,</li>
                <li>Support platform security,</li>
                <li>Remember user preferences,</li>
                <li>Provide essential platform functionality,</li>
                <li>Help identify technical issues and improve the service.</li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Essential cookies",
          body: (
            <p>
              Certain cookies or similar technologies may be required for
              account sessions, security and core platform functions. Some
              SERNEM features may not function correctly if these technologies
              are disabled.
            </p>
          ),
        },
        {
          title: "4. Preferences and browser storage",
          body: (
            <p>
              SERNEM may use cookies or similar locally stored browser
              technologies to remember certain preferences, such as language or
              interface settings.
            </p>
          ),
        },
        {
          title: "5. Analytics and performance",
          body: (
            <p>
              SERNEM may introduce analytics technologies in the future to
              better understand platform usage and performance. If such
              technologies are introduced, this policy will be updated to
              describe the relevant services and cookies.
            </p>
          ),
        },
        {
          title: "6. Third-party services",
          body: (
            <p>
              Third-party providers supporting authentication, payments or
              other technical services may use their own cookies or similar
              technologies. Their use may also be governed by the relevant
              provider's privacy and cookie policies.
            </p>
          ),
        },
        {
          title: "7. How can you control cookies?",
          body: (
            <>
              <p>
                You can view, delete or block certain cookies through your
                browser settings.
              </p>
              <p>
                Blocking essential cookies or required browser technologies may
                affect account sign-in or other platform functionality.
              </p>
            </>
          ),
        },
        {
          title: "8. Updates to this policy",
          body: (
            <p>
              This Cookie Policy may be updated as new services, analytics
              tools or payment functionality are introduced to SERNEM. The
              current version will be published on this page.
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
            {tr ? "Çerez Politikası" : "Cookie Policy"}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
            {tr
              ? "SERNEM'de çerezlerin ve benzeri tarayıcı teknolojilerinin hangi amaçlarla kullanılabileceğini açıklıyoruz."
              : "This policy explains how cookies and similar browser technologies may be used on SERNEM."}
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
              {tr ? "Sorularınız mı var?" : "Questions?"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              {tr
                ? "Çerezler veya gizlilik konusunda bizimle iletişime geçebilirsiniz:"
                : "Contact us if you have questions about cookies or privacy:"}
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
