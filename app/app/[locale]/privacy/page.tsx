import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";

  return {
    title: tr ? "Gizlilik Politikası | SERNEM" : "Privacy Policy | SERNEM",
    description: tr
      ? "SERNEM Gizlilik Politikası ve kişisel verilerin işlenmesine ilişkin bilgiler."
      : "SERNEM Privacy Policy and information about how personal data is handled.",
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: "tr" | "en" = rawLocale === "tr" ? "tr" : "en";
  const tr = locale === "tr";

  const sections = tr
    ? [
        {
          title: "1. Genel",
          body: (
            <>
              <p>
                Bu Gizlilik Politikası, SERNEM platformunu kullandığınızda
                kişisel verilerin ve platform üzerinden sağladığınız bilgilerin
                nasıl işlendiğini açıklamaktadır.
              </p>
              <p>
                SERNEM, iş sağlığı, güvenliği ve çevre profesyonellerine yönelik
                dijital araçlar, içerikler ve yazılım özellikleri sunan web
                tabanlı bir platformdur.
              </p>
            </>
          ),
        },
        {
          title: "2. Toplanabilecek bilgiler",
          body: (
            <>
              <p>
                Platformun kullandığınız özelliklerine bağlı olarak aşağıdaki
                bilgiler işlenebilir:
              </p>
              <ul>
                <li>Hesap oluştururken sağlanan e-posta ve hesap bilgileri,</li>
                <li>Kimlik doğrulama ve oturumla ilgili teknik bilgiler,</li>
                <li>
                  Platform özelliklerine girilen veya kullanıcı tarafından
                  oluşturulan içerikler,
                </li>
                <li>SERNEM AI'a gönderilen mesajlar ve sorular,</li>
                <li>
                  Destek talebi sırasında kullanıcı tarafından gönderilen
                  bilgiler,
                </li>
                <li>
                  Platformun güvenliği ve çalışması için gerekli teknik
                  bilgiler.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "3. Bilgileri neden kullanıyoruz?",
          body: (
            <ul>
              <li>Kullanıcı hesabı oluşturmak ve yönetmek,</li>
              <li>Platform özelliklerini sunmak,</li>
              <li>Oturum ve erişim güvenliğini sağlamak,</li>
              <li>Kullanıcı taleplerine ve destek mesajlarına yanıt vermek,</li>
              <li>SERNEM'in güvenliğini, performansını ve işlevlerini geliştirmek,</li>
              <li>Yasal yükümlülüklere gerektiğinde uyum sağlamak.</li>
            </ul>
          ),
        },
        {
          title: "4. SERNEM AI",
          body: (
            <>
              <p>
                SERNEM AI kullanıldığında, kullanıcı tarafından gönderilen
                mesajlar ve ilgili konuşma içeriği yanıt oluşturulabilmesi
                amacıyla işlenebilir.
              </p>
              <p>
                AI özelliklerine kişisel, gizli, hassas veya paylaşılmaması
                gereken işyeri bilgilerinin girilmemesini öneririz.
              </p>
              <p>
                Yapay zeka tarafından oluşturulan çıktılar profesyonel
                değerlendirmenin veya yetkili bir iş güvenliği kararının yerine
                geçmez.
              </p>
            </>
          ),
        },
        {
          title: "5. Kimlik doğrulama ve altyapı",
          body: (
            <p>
              SERNEM, hesap ve kimlik doğrulama gibi belirli platform
              işlevlerinin sağlanmasında üçüncü taraf teknoloji ve altyapı
              hizmetlerinden yararlanabilir. Bu hizmet sağlayıcılar, hizmetin
              sunulması için gerekli verileri kendi güvenlik ve gizlilik
              uygulamaları kapsamında işleyebilir.
            </p>
          ),
        },
        {
          title: "6. Ödeme bilgileri",
          body: (
            <p>
              Ücretli özelliklerin kullanıma sunulması halinde ödemeler,
              SERNEM tarafından belirlenen üçüncü taraf ödeme hizmet
              sağlayıcıları üzerinden gerçekleştirilebilir. SERNEM'in ödeme
              altyapısı aktif olduğunda ilgili ödeme sağlayıcısının gizlilik ve
              veri işleme koşulları da geçerli olabilir.
            </p>
          ),
        },
        {
          title: "7. Çerezler ve yerel teknolojiler",
          body: (
            <p>
              SERNEM; oturum yönetimi, güvenlik, tercihlerin korunması ve
              platformun temel işlevlerinin çalışması için çerezler veya
              benzeri tarayıcı teknolojileri kullanabilir. Ayrıntılı bilgi
              Çerez Politikası sayfasında sunulacaktır.
            </p>
          ),
        },
        {
          title: "8. Verilerin paylaşılması",
          body: (
            <p>
              Kişisel bilgiler kullanıcıların kişisel verilerini satmak
              amacıyla üçüncü taraflarla paylaşılmaz. Veriler yalnızca
              platformun çalışması için gerekli hizmet sağlayıcılarla, yasal
              yükümlülüklerin gerektirdiği durumlarda veya güvenlik amacıyla
              gerekli olduğu ölçüde işlenebilir veya paylaşılabilir.
            </p>
          ),
        },
        {
          title: "9. Veri güvenliği",
          body: (
            <p>
              SERNEM, kullanıcı bilgilerinin yetkisiz erişim, değiştirme,
              açıklama veya kayba karşı korunmasına yardımcı olmak amacıyla
              makul teknik ve organizasyonel önlemler uygulamayı hedefler.
              Bununla birlikte hiçbir internet tabanlı sistem için mutlak
              güvenlik garanti edilemez.
            </p>
          ),
        },
        {
          title: "10. Kullanıcı hakları",
          body: (
            <p>
              Geçerli veri koruma mevzuatına bağlı olarak kullanıcılar kişisel
              verilerine erişme, düzeltme, silme veya belirli işlemlere itiraz
              etme hakkına sahip olabilir. Bu konulardaki talepler aşağıdaki
              iletişim adresine gönderilebilir.
            </p>
          ),
        },
        {
          title: "11. Politika değişiklikleri",
          body: (
            <p>
              Platform geliştikçe bu Gizlilik Politikası güncellenebilir.
              Önemli değişiklikler olduğunda güncel metin bu sayfada
              yayımlanacaktır.
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
                This Privacy Policy explains how personal data and information
                provided through the SERNEM platform may be processed when you
                use our services.
              </p>
              <p>
                SERNEM is a web-based software platform providing digital tools,
                content and features for health, safety and environment
                professionals.
              </p>
            </>
          ),
        },
        {
          title: "2. Information we may process",
          body: (
            <>
              <p>
                Depending on the features you use, the following information
                may be processed:
              </p>
              <ul>
                <li>Email and account information provided during registration,</li>
                <li>Authentication and session-related technical information,</li>
                <li>Content entered or created through platform features,</li>
                <li>Messages and questions submitted to SERNEM AI,</li>
                <li>Information voluntarily provided in support requests,</li>
                <li>
                  Technical information necessary for platform operation and
                  security.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "3. How we use information",
          body: (
            <ul>
              <li>To create and manage user accounts,</li>
              <li>To provide platform functionality,</li>
              <li>To maintain authentication and access security,</li>
              <li>To respond to support requests,</li>
              <li>To improve SERNEM's security, performance and functionality,</li>
              <li>To comply with applicable legal obligations where required.</li>
            </ul>
          ),
        },
        {
          title: "4. SERNEM AI",
          body: (
            <>
              <p>
                When SERNEM AI is used, messages submitted by the user and
                relevant conversation content may be processed in order to
                generate a response.
              </p>
              <p>
                Users should avoid submitting personal, confidential, sensitive
                or restricted workplace information to AI features.
              </p>
              <p>
                AI-generated outputs do not replace professional judgment or
                decisions made by qualified safety personnel.
              </p>
            </>
          ),
        },
        {
          title: "5. Authentication and infrastructure",
          body: (
            <p>
              SERNEM may rely on third-party technology and infrastructure
              providers for certain platform functions, including account and
              authentication services. These providers may process data
              necessary to provide their services under their own security and
              privacy practices.
            </p>
          ),
        },
        {
          title: "6. Payment information",
          body: (
            <p>
              If paid features are introduced, payments may be processed by
              third-party payment service providers selected by SERNEM. When
              payment functionality becomes active, the relevant provider's
              privacy and data-processing terms may also apply.
            </p>
          ),
        },
        {
          title: "7. Cookies and local technologies",
          body: (
            <p>
              SERNEM may use cookies or similar browser technologies required
              for session management, security, preference storage and core
              platform functionality. Additional information will be provided
              in the Cookie Policy.
            </p>
          ),
        },
        {
          title: "8. Sharing of information",
          body: (
            <p>
              Personal information is not shared with third parties for the
              purpose of selling users' personal data. Information may be
              processed or shared with service providers where necessary to
              operate the platform, comply with legal obligations or protect
              platform security.
            </p>
          ),
        },
        {
          title: "9. Data security",
          body: (
            <p>
              SERNEM aims to apply reasonable technical and organizational
              measures to help protect user information against unauthorized
              access, alteration, disclosure or loss. However, no internet-based
              system can guarantee absolute security.
            </p>
          ),
        },
        {
          title: "10. Your rights",
          body: (
            <p>
              Depending on applicable data protection law, users may have
              rights to request access to, correction of, deletion of or
              restrictions concerning their personal data. Requests may be
              submitted using the contact information below.
            </p>
          ),
        },
        {
          title: "11. Changes to this policy",
          body: (
            <p>
              This Privacy Policy may be updated as the platform develops.
              Material updates will be reflected in the current version
              published on this page.
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
              {tr ? "Gizlilik Politikası" : "Privacy Policy"}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              {tr
                ? "SERNEM'i kullanırken hangi bilgilerin işlenebileceğini ve bu bilgilerin nasıl ele alındığını açıklıyoruz."
                : "This policy explains what information may be processed when you use SERNEM and how that information is handled."}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              {tr ? "Son güncelleme: 31 Ağustos 2026" : "Last updated: 31 August 2026"}
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
                  ? "Gizlilik veya kişisel verilerle ilgili sorularınız için:"
                  : "For questions regarding privacy or personal data:"}
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
