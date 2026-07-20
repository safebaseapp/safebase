"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

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
};

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function AIAssistantPage() {
  const pathname = usePathname();
  const isTurkish = pathname.startsWith("/tr");
  const locale = isTurkish ? "tr" : "en";

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const quickQuestions = isTurkish
    ? [
        {
          label: "Kapalı Alan",
          question:
            "Kapalı alana giriş öncesinde hangi kontroller yapılmalıdır?",
        },
        {
          label: "Sıcak İş",
          question:
            "Sıcak işe başlamadan önce hangi kritik kontroller gereklidir?",
        },
        {
          label: "LOTO",
          question: "LOTO uygulamasının temel adımları nelerdir?",
        },
        {
          label: "KKD",
          question:
            "Taşlama çalışması için hangi kişisel koruyucu donanımlar gereklidir?",
        },
      ]
    : [
        {
          label: "Confined Space",
          question:
            "What checks are required before confined-space entry?",
        },
        {
          label: "Hot Work",
          question:
            "What critical controls are required before hot work begins?",
        },
        {
          label: "LOTO",
          question: "What are the essential steps of a LOTO procedure?",
        },
        {
          label: "PPE",
          question:
            "What personal protective equipment is required for grinding work?",
        },
      ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  const askAI = async (questionOverride?: string) => {
    const cleanQuestion = (questionOverride ?? question).trim();

    if (!cleanQuestion || loading) {
      if (!cleanQuestion) {
        setError(
          isTurkish
            ? "Lütfen bir HSE sorusu girin."
            : "Please enter an HSE question.",
        );
      }

      return;
    }

    const userMessage: Message = {
      id: createMessageId(),
      role: "user",
      content: cleanQuestion,
    };

    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: cleanQuestion,
          locale,
          messages: [...messages, userMessage].map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("SafeBase AI request failed.");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: createMessageId(),
        role: "assistant",
        content:
          data.answer ||
          (isTurkish
            ? "Bu bilgi mevcut SafeBase Bilgi Tabanında bulunmuyor."
            : "This information is not available in the current SafeBase Knowledge Base."),
        sources: Array.isArray(data.sources) ? data.sources : [],
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (requestError) {
      console.error(requestError);

      setError(
        isTurkish
          ? "SafeBase AI isteğinizi işleyemedi. Lütfen tekrar deneyin."
          : "SafeBase AI could not process your request. Please try again.",
      );
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void askAI();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void askAI();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setQuestion("");
    setError("");
    setCopiedMessageId(null);
    textareaRef.current?.focus();
  };

  const copyMessage = async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedMessageId(message.id);

      window.setTimeout(() => {
        setCopiedMessageId(null);
      }, 1800);
    } catch {
      setError(
        isTurkish
          ? "Yanıt panoya kopyalanamadı."
          : "The response could not be copied.",
      );
    }
  };

  return (
    <main className="min-h-[calc(100vh-88px)] bg-slate-950 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/90 p-5 lg:flex lg:flex-col">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 rounded-2xl px-2 py-2"
          >
            <Image
              src="/brand/safebase-mark.svg"
              alt="SafeBase"
              width={46}
              height={46}
              className="h-11 w-11"
            />

            <div>
              <p className="font-black text-white">SafeBase AI</p>
              <p className="text-xs text-slate-500">
                {isTurkish ? "HSE Bilgi Asistanı" : "HSE Knowledge Assistant"}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={startNewChat}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            <span className="text-xl">+</span>
            {isTurkish ? "Yeni Sohbet" : "New Chat"}
          </button>

          <div className="mt-8">
            <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              {isTurkish ? "Hızlı Konular" : "Quick Topics"}
            </p>

            <div className="mt-3 space-y-2">
              {quickQuestions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => void askAI(item.question)}
                  disabled={loading}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                    #
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4">
            <div className="flex items-center gap-2 text-sm font-black text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              {isTurkish ? "Sistem Aktif" : "System Online"}
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {isTurkish
                ? "Yanıtlar SafeBase Bilgi Tabanındaki mevcut kaynaklara dayanır."
                : "Responses are based on the available SafeBase Knowledge Base."}
            </p>
          </div>
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <header className="relative z-10 flex min-h-20 items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-xl sm:px-7">
            <div>
              <h1 className="text-lg font-black sm:text-xl">
                {isTurkish ? "SafeBase AI Asistanı" : "SafeBase AI Assistant"}
              </h1>

              <p className="mt-1 hidden text-sm text-slate-500 sm:block">
                {isTurkish
                  ? "HSE sorularınız için pratik ve kaynaklı rehberlik"
                  : "Practical, source-based guidance for HSE questions"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={startNewChat}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 lg:hidden"
              >
                <span>+</span>
                {isTurkish ? "Yeni" : "New"}
              </button>

              <Link
                href={`/${locale}`}
                className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {isTurkish ? "Ana Sayfa" : "Home"}
              </Link>
            </div>
          </header>

          <div className="relative z-10 flex-1 overflow-y-auto">
            <div className="mx-auto flex min-h-full max-w-4xl flex-col px-4 py-8 sm:px-6">
              {messages.length === 0 ? (
                <div className="my-auto py-12 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-blue-400/20 bg-blue-500/10 shadow-2xl shadow-blue-600/20">
                    <Image
                      src="/brand/safebase-mark.svg"
                      alt=""
                      width={58}
                      height={58}
                      className="h-14 w-14"
                    />
                  </div>

                  <p className="mt-7 text-sm font-black uppercase tracking-[0.24em] text-emerald-400">
                    {isTurkish
                      ? "Sınırların Ötesinde Güvenlik"
                      : "Safety Without Borders"}
                  </p>

                  <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                    {isTurkish
                      ? "Bugün hangi HSE konusunda yardımcı olabilirim?"
                      : "How can I help with your HSE work today?"}
                  </h2>

                  <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
                    {isTurkish
                      ? "KKD, sıcak çalışma, kapalı alan, LOTO ve diğer iş güvenliği konularında soru sorun."
                      : "Ask about PPE, hot work, confined space, LOTO and other workplace-safety topics."}
                  </p>

                  <div className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-2">
                    {quickQuestions.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        disabled={loading}
                        onClick={() => void askAI(item.question)}
                        className="group rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-blue-500/[0.08]"
                      >
                        <span className="text-sm font-black text-blue-300">
                          {item.label}
                        </span>

                        <p className="mt-2 text-sm leading-6 text-slate-400 group-hover:text-slate-300">
                          {item.question}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8 pb-6">
                  {messages.map((message) => (
                    <article
                      key={message.id}
                      className={`flex gap-3 sm:gap-4 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 sm:flex">
                          <Image
                            src="/brand/safebase-mark.svg"
                            alt=""
                            width={32}
                            height={32}
                            className="h-8 w-8"
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-[92%] rounded-3xl border p-5 sm:max-w-[82%] sm:p-6 ${
                          message.role === "user"
                            ? "border-blue-500/30 bg-blue-600 text-white shadow-xl shadow-blue-600/10"
                            : "border-white/10 bg-white/[0.055] text-slate-200 shadow-xl shadow-black/10"
                        }`}
                      >
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <p
                            className={`text-xs font-black uppercase tracking-[0.16em] ${
                              message.role === "user"
                                ? "text-blue-100"
                                : "text-emerald-300"
                            }`}
                          >
                            {message.role === "user"
                              ? isTurkish
                                ? "Siz"
                                : "You"
                              : "SafeBase AI"}
                          </p>

                          {message.role === "assistant" && (
                            <button
                              type="button"
                              onClick={() => void copyMessage(message)}
                              className="rounded-lg px-2 py-1 text-xs font-bold text-slate-400 transition hover:bg-white/10 hover:text-white"
                            >
                              {copiedMessageId === message.id
                                ? isTurkish
                                  ? "Kopyalandı"
                                  : "Copied"
                                : isTurkish
                                  ? "Kopyala"
                                  : "Copy"}
                            </button>
                          )}
                        </div>

                        {message.role === "user" ? (
                          <p className="whitespace-pre-wrap leading-7">
                            {message.content}
                          </p>
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="mb-4 mt-7 border-b border-white/10 pb-3 text-2xl font-black text-white first:mt-0">
                                  {children}
                                </h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="mb-3 mt-7 flex items-center gap-2 text-xl font-black text-blue-300 first:mt-0">
                                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                                  {children}
                                </h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="mb-3 mt-6 text-lg font-bold text-white">
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => (
                                <p className="mb-4 leading-7 text-slate-300 last:mb-0">
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
                                  <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs text-emerald-400">
                                    ✓
                                  </span>
                                  <span>{children}</span>
                                </li>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-black text-white">
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
                                  className="font-bold text-blue-400 underline decoration-blue-400/40 underline-offset-4 hover:text-blue-300"
                                >
                                  {children}
                                </a>
                              ),
                              code: ({ children }) => (
                                <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-blue-300">
                                  {children}
                                </code>
                              ),
                              hr: () => (
                                <hr className="my-7 border-white/10" />
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        )}

                        {message.role === "assistant" &&
                          message.sources &&
                          message.sources.length > 0 && (
                            <div className="mt-6 border-t border-white/10 pt-5">
                              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                                {isTurkish
                                  ? "Kullanılan Kaynaklar"
                                  : "Knowledge Sources"}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.sources.map((source) => {
                                  const label =
                                    sourceNames[source]?.[
                                      isTurkish ? "tr" : "en"
                                    ] ||
                                    source
                                      .replace(".md", "")
                                      .replaceAll("-", " ");

                                  return (
                                    <span
                                      key={source}
                                      className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-300"
                                    >
                                      📄 {label}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                      </div>
                    </article>
                  ))}

                  {loading && (
                    <article className="flex gap-4">
                      <div className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 sm:flex">
                        <Image
                          src="/brand/safebase-mark.svg"
                          alt=""
                          width={32}
                          height={32}
                          className="h-8 w-8"
                        />
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/[0.055] px-6 py-5">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                          SafeBase AI
                        </p>

                        <div className="mt-4 flex items-center gap-2">
                          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400" />
                        </div>

                        <p className="mt-3 text-sm text-slate-500">
                          {isTurkish
                            ? "Bilgi tabanı inceleniyor..."
                            : "Reviewing the knowledge base..."}
                        </p>
                      </div>
                    </article>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          <div className="relative z-20 border-t border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur-xl sm:px-6">
            <div className="mx-auto max-w-4xl">
              {error && (
                <div className="mb-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
                  ⚠️ {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/[0.055] p-2 shadow-2xl shadow-black/20 transition focus-within:border-blue-500/40 focus-within:ring-4 focus-within:ring-blue-500/10"
              >
                <div className="flex items-end gap-2">
                  <textarea
                    ref={textareaRef}
                    value={question}
                    onChange={(event) => {
                      setQuestion(event.target.value);
                      setError("");
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    rows={1}
                    className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-white outline-none placeholder:text-slate-600 disabled:cursor-not-allowed"
                    placeholder={
                      isTurkish
                        ? "SafeBase AI'a bir HSE sorusu sorun..."
                        : "Ask SafeBase AI an HSE question..."
                    }
                  />

                  <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600"
                    aria-label={isTurkish ? "Soruyu gönder" : "Send question"}
                  >
                    ↑
                  </button>
                </div>
              </form>

              <p className="mt-2 text-center text-xs text-slate-600">
                {isTurkish
                  ? "Enter gönderir • Shift + Enter yeni satır"
                  : "Enter to send • Shift + Enter for a new line"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
