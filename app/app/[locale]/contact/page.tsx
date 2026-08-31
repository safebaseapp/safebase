import type { Metadata } from "next";

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
    title: isTurkish ? "İletişim" : "Contact",
    description: isTurkish
      ? "SERNEM destek, geri bildirim, teknik sorunlar ve iş birliği talepleri için bizimle iletişime geçin."
      : "Contact SERNEM for support, feedback, technical issues and collaboration enquiries.",
    alternates: {
      canonical: `https://www.sernem.com/${locale}/contact`,
      languages: {
        tr: "https://www.sernem.com/tr/contact",
        en: "https://www.sernem.com/en/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const isTurkish = locale === "tr";

  const content = isTurkish
    ? {
        eyebrow: "İLETİŞİM",
        title: "SERNEM ile iletişime geçin.",
        intro:
          "Destek talepleri, teknik sorunlar, geri bildirimler ve iş birliği konuları için bize doğrudan ulaşabilirsiniz.",
        emailTitle: "E-posta",
        emailText:
          "Mesajınızı mümkün olduğunca açık şekilde iletin. Teknik bir sorun bildiriyorsanız ilgili sayfanın bağlantısını ve mümkünse ekran görüntüsünü eklemeniz yardımcı olur.",
        topicsTitle: "Hangi konularda yazabilirsiniz?",
        topics: [
          ["Teknik Destek", "Platform kullanımı, hesap veya araçlarla ilgili teknik sorunlar."],
          ["Geri Bildirim", "Yeni özellik önerileri, iyileştirme fikirleri ve kullanıcı deneyimi geri bildirimleri."],
          ["İçerik", "HSE içerikleri, rehberler, Toolbox Talk ve dokümanlarla ilgili bildirimler."],
          ["İş Birliği", "SERNEM ile ilgili profesyonel iş birliği ve kurumsal iletişim talepleri."],
        ],
        responseTitle: "Destek yaklaşımımız",
        response:
          "SERNEM aktif olarak geliştirilen bir platformdur. Gelen geri bildirimler platformun geliştirilmesinde doğrudan değerlendirilir.",
        note:
          "Acil durumlar veya sahada anlık güvenlik müdahalesi gerektiren konular için SERNEM destek kanallarını kullanmayın. İlgili işyeri acil durum prosedürlerini ve yetkili kişileri takip edin.",
        button: "E-posta Gönder",
      }
    : {
        eyebrow: "CONTACT",
        title: "Get in touch with SERNEM.",
        intro:
          "Contact us directly for support requests, technical issues, product feedback and collaboration enquiries.",
        emailTitle: "Email",
        emailText:
          "Please describe your request as clearly as possible. For technical issues, including the relevant page URL and a screenshot where possible will help us investigate.",
        topicsTitle: "What can you contact us about?",
        topics: [
          ["Technical Support", "Technical issues related to the platform, your account or SERNEM tools."],
          ["Feedback", "Feature requests, improvement ideas and user experience feedback."],
          ["Content", "Questions or reports related to HSE guides, Toolbox Talks and professional resources."],
          ["Collaboration", "Professional collaboration and business enquiries related to SERNEM."],
        ],
        responseTitle: "Our support approach",
        response:
          "SERNEM is an actively developed platform. User feedback is reviewed directly as part of our platform development process.",
        note:
          "Do not use SERNEM support channels for emergencies or situations requiring immediate site safety intervention. Follow your workplace emergency procedures and contact the appropriate responsible personnel.",
        button: "Send Email",
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

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-blue-400/20 bg-blue-500/[0.05] p-8">
            <div className="text-sm font-black tracking-[0.16em] text-blue-400">
              {content.emailTitle}
            </div>

            <a
              href="mailto:sernem.support@gmail.com"
              className="mt-4 block break-all text-2xl font-black text-white transition hover:text-blue-400"
            >
              sernem.support@gmail.com
            </a>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              {content.emailText}
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sernem.support@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-xl bg-blue-500 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-400"
            >
              {content.button} →
            </a>
          </div>

          <div>
            <h2 className="text-3xl font-black">{content.topicsTitle}</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.topics.map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="font-black text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 className="text-xl font-black">{content.responseTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              {content.response}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.04] p-8">
            <h2 className="text-xl font-black">
              {isTurkish ? "Önemli not" : "Important note"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {content.note}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
