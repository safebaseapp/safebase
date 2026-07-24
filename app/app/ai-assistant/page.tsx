"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIAssistantPage() {
  const pathname = usePathname();
  const isTurkish = pathname.startsWith("/tr");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async () => {
    const cleanQuestion = question.trim();

    if (!cleanQuestion) {
      setError(
        isTurkish
          ? "Lütfen bir HSE sorusu girin."
          : "Please enter an HSE question."
      );
      return;
    }

    try {
      setLoading(true);
      setAnswer("");
      setSources([]);
      setError("");

      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: cleanQuestion,
          locale: isTurkish ? "tr" : "en",
        }),
      });

      if (!res.ok) {
        throw new Error("SafeBase AI request failed.");
      }

      const data = await res.json();

      setAnswer(
        data.answer ||
          (isTurkish
            ? "Bu bilgi mevcut SafeBase Bilgi Tabanında bulunmuyor."
            : "This information is not available in the current SafeBase Knowledge Base.")
      );

      setSources(Array.isArray(data.sources) ? data.sources : []);
    } catch (err) {
      console.error(err);

      setError(
        isTurkish
          ? "SafeBase AI isteğinizi işleyemedi. Lütfen tekrar deneyin."
          : "SafeBase AI could not process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          {isTurkish ? "Yapay Zekâ Güvenlik Asistanı" : "AI Safety Assistant"}
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          {isTurkish ? "SafeBase AI'a Sor" : "Ask SafeBase AI"}
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          {isTurkish
            ? "Pratik HSE soruları sorun ve SafeBase Bilgi Tabanına dayalı yapılandırılmış güvenlik rehberliği alın."
            : "Ask practical HSE questions and receive structured safety guidance based on the SafeBase Knowledge Base."}
        </p>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6">
          <label
            htmlFor="safety-question"
            className="mb-3 block text-sm font-semibold text-slate-300"
          >
            {isTurkish ? "İş güvenliği sorunuz" : "Your safety question"}
          </label>

          <textarea
            id="safety-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-40 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder={
              isTurkish
                ? "Örnek: Taşlama çalışmasında hangi kontroller gereklidir?"
                : "Example: What controls are required for grinding work?"
            }
          />

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}

          <button
            type="button"
            onClick={askAI}
            disabled={loading || !question.trim()}
            className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {loading
              ? isTurkish
                ? "Analiz ediliyor..."
                : "Analyzing..."
              : isTurkish
                ? "AI'a Sor"
                : "Ask AI"}
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20 sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 text-xl">
              🤖
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {isTurkish ? "AI Yanıtı" : "AI Response"}
              </h2>

              <p className="text-sm text-slate-500">
                {isTurkish
                  ? "SafeBase Bilgi Rehberliği"
                  : "SafeBase Knowledge Guidance"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
                <div className="flex items-center gap-3 text-blue-300">
                  <span className="animate-pulse text-xl">🤖</span>

                  <div>
                    <p className="font-semibold">
                      {isTurkish
                        ? "SafeBase AI sorunuzu analiz ediyor..."
                        : "SafeBase AI is analyzing your question..."}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {isTurkish
                        ? "İlgili iş güvenliği rehberleri ve standartları inceleniyor."
                        : "Reviewing relevant safety guidance and standards."}
                    </p>
                  </div>
                </div>
              </div>
            ) : answer ? (
              <>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-4 mt-8 border-b border-slate-700 pb-3 text-2xl font-bold text-white first:mt-0">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="mb-3 mt-8 flex items-center gap-2 text-xl font-bold text-blue-300 first:mt-0">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-100">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="mb-4 leading-7 text-slate-300">
                        {children}
                      </p>
                    ),

                    ul: ({ children }) => (
                      <ul className="mb-6 space-y-3">{children}</ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="mb-6 list-decimal space-y-3 pl-6 text-slate-300">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="flex items-start gap-3 leading-7 text-slate-300">
                        <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs text-emerald-400">
                          ✓
                        </span>

                        <span>{children}</span>
                      </li>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">
                        {children}
                      </strong>
                    ),

                    blockquote: ({ children }) => (
                      <blockquote className="my-5 rounded-xl border-l-4 border-amber-400 bg-amber-400/10 px-5 py-4 text-amber-100">
                        {children}
                      </blockquote>
                    ),

                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-400 underline decoration-blue-400/40 underline-offset-4 hover:text-blue-300"
                      >
                        {children}
                      </a>
                    ),

                    code: ({ children }) => (
                      <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-300">
                        {children}
                      </code>
                    ),

                    hr: () => <hr className="my-7 border-slate-700" />,
                  }}
                >
                  {answer}
                </ReactMarkdown>

                {sources.length > 0 && (
                  <div className="mt-8 rounded-xl border border-slate-700 bg-slate-950/50 p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                      📚 {isTurkish ? "Bilgi Kaynakları" : "Knowledge Sources"}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {sources.map((source) => {
  const sourceNames: Record<string, { tr: string; en: string }> = {
    "ppe.md": {
      tr: "Kişisel Koruyucu Donanım",
      en: "Personal Protective Equipment",
    },
    "grinding.md": {
      tr: "Taşlama Çalışmaları",
      en: "Grinding Operations",
    },
    "hot-work.md": {
      tr: "Sıcak İş Çalışmaları",
      en: "Hot Work",
    },
    "confined-space.md": {
      tr: "Kapalı Alan Çalışmaları",
      en: "Confined Space",
    },
    "loto.md": {
      tr: "Kilitleme ve Etiketleme",
      en: "Lockout Tagout",
    },
    "working-at-height.md": {
  tr: "Yüksekte Çalışma",
  en: "Working at Height",
},
"excavation.md": {
  tr: "Kazı Çalışmaları",
  en: "Excavation",
},
"scaffolding.md": {
  tr: "İskele Güvenliği",
  en: "Scaffold Safety",
},
"electrical-safety.md": {
  tr: "Elektrik Güvenliği",
  en: "Electrical Safety",
},
"fire-safety.md": {
  tr: "Yangın Güvenliği",
  en: "Fire Safety",
},
"crane-safety.md": {
  tr: "Vinç ve Kaldırma",
  en: "Crane & Lifting",
},
"chemical-safety.md": {
  tr: "Kimyasal Güvenlik",
  en: "Chemical Safety",
},
  };

  const normalizedSource = source.endsWith(".md")
    ? source
    : `${source}.md`;

  const label =
    sourceNames[normalizedSource]?.[isTurkish ? "tr" : "en"] ||
    source.replace(".md", "").replaceAll("-", " ");

  return (
    <span
      key={source}
      className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-300"
    >
      📄 {label}
    </span>
  );
})}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/40 p-6 text-center">
                <div className="text-3xl">🦺</div>

                <p className="mt-3 font-medium text-slate-300">
                  {isTurkish
                    ? "Yanıtınız burada görünecek."
                    : "Your answer will appear here."}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {isTurkish
                    ? "Sıcak iş, kapalı alan, LOTO, KKD veya diğer HSE konuları hakkında soru sorun."
                    : "Ask about hot work, confined spaces, LOTO, PPE, or other HSE topics."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}