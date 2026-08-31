import type { Metadata } from "next";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    locale: "tr" | "en";
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  return {
    title: isTurkish ? "Sık Sorulan Sorular" : "Frequently Asked Questions",
    description: isTurkish
      ? "SERNEM araçları, hesaplar, Premium özellikler, HSE içerikleri, yapay zekâ ve destek hakkında sık sorulan sorular."
      : "Frequently asked questions about SERNEM tools, accounts, Premium features, HSE resources, AI and support.",
    alternates: {
      canonical: `https://www.sernem.com/${locale}/faq`,
      languages: {
        tr: "https://www.sernem.com/tr/faq",
        en: "https://www.sernem.com/en/faq",
      },
    },
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const content = isTurkish
    ? {
        eyebrow: "SIK SORULAN SORULAR",
        title: "SERNEM hakkında merak ettikleriniz.",
        intro:
          "Platform, araçlar, hesaplar ve HSE içerikleri hakkında en sık sorulan soruların cevaplarını burada bulabilirsiniz.",
        sections: [
          {
            title: "Platform",
            questions: [
              {
                q: "SERNEM nedir?",
                a: "SERNEM; risk değerlendirmeleri, Method Statement araçları, HSE hesaplayıcıları, kontrol listeleri, Toolbox Talk içerikleri, rehberler ve dijital doküman özelliklerini tek platformda bir araya getiren web tabanlı bir HSE çalışma platformudur.",
              },
              {
                q: "SERNEM kimler için geliştirildi?",
                a: "HSE profesyonelleri, iş güvenliği uzmanları, saha yöneticileri, mühendisler, denetim ekipleri, yükleniciler ve operasyonel güvenlik süreçlerinde görev alan profesyoneller için geliştirilmektedir.",
              },
              {
                q: "SERNEM'i telefondan kullanabilir miyim?",
                a: "Evet. SERNEM modern web tarayıcılarında masaüstü, tablet ve mobil cihazlardan kullanılabilecek şekilde geliştirilmektedir.",
              },
            ],
          },
          {
            title: "Üyelik ve Premium",
            questions: [
              {
                q: "SERNEM ücretsiz mi?",
                a: "SERNEM freemium bir model kullanır. Platformun belirli araçları ve kaynakları ücretsiz olarak kullanılabilir. Premium üyelik ise ek profesyonel özelliklere, kaynaklara ve doküman fonksiyonlarına erişim sağlar.",
              },
              {
                q: "Premium üyelik neler sunacak?",
                a: "Premium; ek profesyonel araçlara, kaynaklara, gelişmiş doküman özelliklerine ve Premium olarak sunulan platform fonksiyonlarına erişim sağlayacaktır. Sunulan özellikler platform geliştikçe güncellenebilir.",
              },
              {
                q: "Her aracı kullanmak için hesap açmam gerekiyor mu?",
                a: "Hayır. SERNEM'in bazı herkese açık araçları ve kaynakları hesap olmadan kullanılabilir. Hesap gerektiren veya Premium özelliklerde oturum açmanız istenebilir.",
              },
            ],
          },
          {
            title: "HSE araçları ve içerikler",
            questions: [
              {
                q: "Risk Assessment ve Method Statement çıktıları doğrudan kullanılabilir mi?",
                a: "SERNEM bu süreçleri hızlandırmak için yapılandırılmış araçlar ve hazır içerikler sağlar. Ancak oluşturulan her çıktı; gerçek saha koşulları, yürürlükteki mevzuat, müşteri veya şirket prosedürleri ve yapılan işin özel gereklilikleri dikkate alınarak yetkin kullanıcı tarafından kontrol edilmelidir.",
              },
              {
                q: "SERNEM'deki HSE içerikleri mevzuat veya resmi talimat yerine geçer mi?",
                a: "Hayır. SERNEM profesyonel çalışmayı destekleyen bir araçtır. İçerikler yürürlükteki mevzuatın, resmi gerekliliklerin, şirket prosedürlerinin, üretici talimatlarının veya yetkin profesyonel değerlendirmesinin yerine geçmez.",
              },
              {
                q: "PDF ve doküman oluşturabilir miyim?",
                a: "SERNEM'in desteklenen araçlarında profesyonel doküman ve PDF çıktıları oluşturulabilir. Kullanılabilir çıktı seçenekleri kullanılan araca ve üyelik seviyesine göre değişebilir.",
              },
            ],
          },
          {
            title: "SERNEM AI",
            questions: [
              {
                q: "SERNEM AI ne yapar?",
                a: "SERNEM AI, HSE ile ilgili konularda bilgiye erişimi ve profesyonel çalışma süreçlerini desteklemek için geliştirilmiş yapay zekâ destekli bir araçtır.",
              },
              {
                q: "AI tarafından verilen cevaplara tamamen güvenebilir miyim?",
                a: "Hayır. Yapay zekâ çıktıları hatalı, eksik veya bağlama uygun olmayan bilgiler içerebilir. Özellikle güvenliği etkileyen kararlar, mevzuat yorumları ve saha uygulamalarında bilgiler yetkin bir profesyonel ve geçerli kaynaklar tarafından doğrulanmalıdır.",
              },
            ],
          },
          {
            title: "Destek ve geliştirme",
            questions: [
              {
                q: "Bir hata veya yanlış içerik bulursam ne yapmalıyım?",
                a: "İletişim sayfası üzerinden bize bildirebilirsiniz. Teknik sorunlarda ilgili sayfanın bağlantısını ve mümkünse ekran görüntüsünü paylaşmanız incelemeyi kolaylaştırır.",
              },
              {
                q: "Yeni bir özellik önerebilir miyim?",
                a: "Evet. SERNEM aktif olarak geliştirilmektedir ve kullanıcı geri bildirimleri ürün geliştirme sürecinde değerlendirilir.",
              },
            ],
          },
        ],
        contactTitle: "Aradığınız cevabı bulamadınız mı?",
        contactText:
          "Destek, geri bildirim veya diğer sorularınız için bizimle iletişime geçebilirsiniz.",
        contactButton: "İletişime Geç",
      }
    : {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        title: "Questions about SERNEM.",
        intro:
          "Find answers to common questions about the platform, tools, accounts and HSE resources.",
        sections: [
          {
            title: "Platform",
            questions: [
              {
                q: "What is SERNEM?",
                a: "SERNEM is a web-based HSE workspace bringing together risk assessment tools, Method Statement tools, HSE calculators, inspection checklists, Toolbox Talks, professional resources and digital document features.",
              },
              {
                q: "Who is SERNEM built for?",
                a: "SERNEM is being developed for HSE professionals, safety practitioners, site managers, engineers, inspection teams, contractors and professionals involved in operational safety management.",
              },
              {
                q: "Can I use SERNEM on a mobile device?",
                a: "Yes. SERNEM is being developed for use across modern web browsers on desktop, tablet and mobile devices.",
              },
            ],
          },
          {
            title: "Accounts and Premium",
            questions: [
              {
                q: "Is SERNEM free?",
                a: "SERNEM uses a freemium model. Selected tools and resources are available free of charge, while Premium membership provides access to additional professional features, resources and document functionality.",
              },
              {
                q: "What will Premium include?",
                a: "Premium will provide access to additional professional tools, resources, advanced document functionality and platform features offered as Premium. Available features may evolve as the platform develops.",
              },
              {
                q: "Do I need an account to use every tool?",
                a: "No. Some public SERNEM tools and resources can be accessed without an account. Sign-in may be required for account-based or Premium functionality.",
              },
            ],
          },
          {
            title: "HSE tools and content",
            questions: [
              {
                q: "Can Risk Assessments and Method Statements be used immediately?",
                a: "SERNEM provides structured tools and prepared content to accelerate these processes. Every output should still be reviewed by a competent user against actual site conditions, applicable legislation, client or company procedures and the specific requirements of the work.",
              },
              {
                q: "Does SERNEM content replace legislation or official requirements?",
                a: "No. SERNEM is designed to support professional work. Its content does not replace applicable legislation, official requirements, company procedures, manufacturer instructions or competent professional judgement.",
              },
              {
                q: "Can I generate PDFs and documents?",
                a: "Supported SERNEM tools can provide professional document and PDF outputs. Available output options may vary depending on the tool and membership level.",
              },
            ],
          },
          {
            title: "SERNEM AI",
            questions: [
              {
                q: "What does SERNEM AI do?",
                a: "SERNEM AI is an AI-assisted tool designed to support access to HSE information and professional HSE workflows.",
              },
              {
                q: "Can I rely entirely on AI responses?",
                a: "No. AI-generated information can be inaccurate, incomplete or unsuitable for a particular context. Safety-critical decisions, regulatory interpretations and site applications should be verified by competent professionals and authoritative sources.",
              },
            ],
          },
          {
            title: "Support and development",
            questions: [
              {
                q: "What should I do if I find an error or incorrect content?",
                a: "Please report it through our Contact page. For technical issues, including the relevant page URL and a screenshot where possible will help us investigate.",
              },
              {
                q: "Can I suggest a new feature?",
                a: "Yes. SERNEM is actively developed and user feedback is considered as part of the product development process.",
              },
            ],
          },
        ],
        contactTitle: "Still have a question?",
        contactText:
          "Contact us for support, feedback or other questions about SERNEM.",
        contactButton: "Contact Us",
      };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="text-sm font-black tracking-[0.2em] text-blue-400">
              {content.eyebrow}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              {content.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="space-y-12">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-5 text-2xl font-black">{section.title}</h2>

              <div className="space-y-3">
                {section.questions.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] open:border-blue-400/20 open:bg-blue-500/[0.035]"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-bold text-slate-100">
                      <span>{item.q}</span>
                      <span className="text-xl text-blue-400 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <div className="border-t border-white/[0.06] px-6 py-5 text-sm leading-7 text-slate-400">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-blue-400/20 bg-blue-500/[0.05] p-8 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black">{content.contactTitle}</h2>
            <p className="mt-2 text-slate-400">{content.contactText}</p>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-flex rounded-xl bg-blue-500 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-400 md:mt-0"
          >
            {content.contactButton} →
          </Link>
        </div>
      </section>
    </main>
  );
}
