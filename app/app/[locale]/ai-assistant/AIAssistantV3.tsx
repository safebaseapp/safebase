"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import type { CopilotResponse } from "@/lib/ai/copilot-types";
import { getRecommendations, type Recommendation } from "@/lib/ai/recommendations";

type AccessLevel = "guest" | "free" | "premium";

type Props = {
  locale: "tr" | "en";
  access: AccessLevel;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content?: string;
  copilot?: CopilotResponse;
  sources?: string[];
  recommendations?: Recommendation[];
  tokenFree?: boolean;
};

type QuickTopic = {
  id: string;
  icon: string;
  title: { tr: string; en: string };
  question: { tr: string; en: string };
  answer: { tr: string; en: string };
  sources: string[];
  keywords: string;
};

const QUICK_TOPICS: QuickTopic[] = [
  {
    id: "hot-work",
    icon: "🔥",
    title: { tr: "Sıcak İş", en: "Hot Work" },
    question: {
      tr: "Sıcak işe başlamadan önce hangi kritik kontroller yapılmalıdır?",
      en: "What critical checks are required before hot work begins?",
    },
    answer: {
      tr: "Sıcak işe başlamadan önce iş izni ve saha koşulları doğrulanmalı; yanıcı malzemeler uzaklaştırılmalı veya korunmalı; uygun yangın söndürücü ekipman hazır bulundurulmalı; gerekiyorsa yangın gözcüsü atanmalı; gaz ölçümü gereken alanlarda ölçüm yapılmalı; kaynak ve kesme ekipmanı, kablolar, hortumlar ve topraklama kontrol edilmelidir. Çalışma alanı, kıvılcım ve sıcak parçaların alt seviyelere düşme ihtimali dahil değerlendirilmelidir. İş sırasında koşullar değişirse çalışma durdurulup izin yeniden değerlendirilmelidir.",
      en: "Before hot work starts, verify the permit and site conditions; remove or protect combustible materials; provide suitable firefighting equipment; assign a fire watch where required; complete atmospheric testing where applicable; and inspect welding/cutting equipment, cables, hoses and grounding. Consider sparks and hot material falling to lower levels. If conditions change, stop the work and reassess the permit and controls.",
    },
    sources: ["hot-work.md", "permit-to-work.md"],
    keywords: "hot work welding cutting grinding sıcak iş kaynak taşlama",
  },
  {
    id: "confined-space",
    icon: "🛡️",
    title: { tr: "Kapalı Alan", en: "Confined Space" },
    question: {
      tr: "Kapalı alana giriş öncesinde hangi kontroller yapılmalıdır?",
      en: "What checks are required before confined-space entry?",
    },
    answer: {
      tr: "Kapalı alan girişi öncesinde giriş izni, izolasyon/LOTO, atmosfer ölçümü, havalandırma, gözcü, haberleşme ve kurtarma planı doğrulanmalıdır. Giriş yapan personelin yetkinliği ve gerekli KKD kontrol edilmeli; erişim yolu açık tutulmalı ve atmosfer koşulları çalışma boyunca izlenmelidir. Kabul edilebilir koşullar sağlanamıyorsa giriş yapılmamalıdır.",
      en: "Before confined-space entry, verify the entry permit, isolation/LOTO, atmospheric testing, ventilation, attendant, communications and rescue arrangements. Confirm entrant competence and required PPE, keep access clear and monitor atmospheric conditions throughout the work. Entry must not proceed when acceptable conditions cannot be maintained.",
    },
    sources: ["confined-space.md", "loto.md"],
    keywords: "confined space tank vessel manhole kapalı alan",
  },
  {
    id: "loto",
    icon: "🔒",
    title: { tr: "LOTO", en: "LOTO" },
    question: {
      tr: "LOTO uygulamasının temel adımları nelerdir?",
      en: "What are the essential steps of a LOTO procedure?",
    },
    answer: {
      tr: "Temel LOTO akışı; enerji kaynaklarının belirlenmesi, etkilenen kişilerin bilgilendirilmesi, ekipmanın normal şekilde durdurulması, tüm enerji kaynaklarının izole edilmesi, kişisel kilit ve etiketlerin uygulanması, depolanmış enerjinin boşaltılması veya güvenli hale getirilmesi ve sıfır enerji durumunun doğrulanmasıdır. İş tamamlandığında alan kontrol edilir, personel emniyete alınır ve kilitler yetkili prosedüre göre kaldırılır.",
      en: "A basic LOTO sequence is: identify energy sources, notify affected persons, shut equipment down normally, isolate every energy source, apply personal locks and tags, release or restrain stored energy, and verify a zero-energy state. After work, inspect the area, ensure personnel are clear and remove locks according to the authorized procedure.",
    },
    sources: ["loto.md"],
    keywords: "loto lockout tagout energy isolation enerji izolasyonu kilitleme",
  },
  {
    id: "ppe-grinding",
    icon: "⛑️",
    title: { tr: "Taşlama KKD", en: "Grinding PPE" },
    question: {
      tr: "Taşlama çalışmasında hangi KKD kullanılmalıdır?",
      en: "What PPE is normally required for grinding work?",
    },
    answer: {
      tr: "Taşlama için risk değerlendirmesine göre en az uygun göz koruması ve yüz siperi, kesilmeye/abrazyona uygun eldiven, iş ayakkabısı ve çalışma ortamına uygun iş kıyafeti değerlendirilmelidir. Gürültü seviyesine göre kulak koruyucu, oluşan toz veya dumana göre uygun solunum koruması gerekebilir. KKD seçimi kullanılan disk, malzeme, çalışma pozisyonu ve saha koşullarına göre doğrulanmalıdır; makine muhafazası ve doğru disk seçimi KKD'nin yerine geçmez.",
      en: "For grinding, the risk assessment should normally consider suitable eye protection plus a face shield, cut/abrasion-resistant gloves, safety footwear and suitable work clothing. Hearing protection may be required depending on noise, and appropriate respiratory protection may be needed for dust or fumes. PPE selection must be verified against the disc, material, work position and site conditions; correct guards and disc selection are still essential engineering controls.",
    },
    sources: ["ppe.md", "grinding.md"],
    keywords: "grinding ppe taşlama kkd face shield gözlük siperlik",
  },
  {
    id: "working-at-height",
    icon: "🪜",
    title: { tr: "Yüksekte Çalışma", en: "Work at Height" },
    question: {
      tr: "Yüksekte çalışmaya başlamadan önce hangi kontroller yapılmalıdır?",
      en: "What should be checked before working at height?",
    },
    answer: {
      tr: "Öncelik düşme riskini ortadan kaldırmak veya toplu koruma ile kontrol etmektir. Erişim ekipmanı ve çalışma platformu uygun olmalı; korkuluklar, açıklıklar ve düşen cisim riskleri kontrol edilmeli; gerekiyorsa uygun tam vücut kemeri, bağlantı sistemi ve güvenli ankraj kullanılmalıdır. Ekipman muayenesi, kurtarma düzenlemesi, hava koşulları ve alt seviyedeki alan kontrolü çalışma öncesinde doğrulanmalıdır.",
      en: "Priority is to eliminate the fall hazard or control it with collective protection. Access equipment and the work platform must be suitable; guardrails, openings and dropped-object risks must be checked; and where required, use an appropriate full-body harness, connection system and suitable anchorage. Verify equipment inspection, rescue arrangements, weather conditions and control of the area below before work begins.",
    },
    sources: ["working-at-height.md", "ppe.md"],
    keywords: "working at height fall protection harness lanyard yüksekte çalışma emniyet kemeri",
  },
  {
    id: "scaffolding",
    icon: "🏗️",
    title: { tr: "İskele Kontrolü", en: "Scaffold Check" },
    question: {
      tr: "İskele kullanılmadan önce hangi temel kontroller yapılmalıdır?",
      en: "What basic checks are required before scaffold use?",
    },
    answer: {
      tr: "İskele yetkili kişi tarafından kontrol edilmiş ve uygun şekilde etiketlenmiş olmalıdır. Temel/zemin, dikmeler, çaprazlar, platformlar, korkuluklar, topuk levhaları, erişim merdiveni veya kapaklı geçiş, bağlantılar ve yapıya sabitlemeler kontrol edilmelidir. Platformlarda açıklık, gevşek malzeme veya uygunsuz değişiklik bulunmamalı; yükleme kapasitesi aşılmamalıdır. Şüpheli durumda iskele kullanılmamalı ve yeniden kontrol istenmelidir.",
      en: "The scaffold should be inspected by a competent person and correctly tagged. Check foundations, standards, bracing, platforms, guardrails, toe boards, access ladders or trapdoors, connections and ties to the structure. Platforms should have no unsafe gaps, loose materials or unauthorized alterations, and loading limits must not be exceeded. If in doubt, do not use the scaffold and request reinspection.",
    },
    sources: ["scaffolding.md"],
    keywords: "scaffold scaffolding iskele platform trapdoor",
  },
];

function id() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getDailyUsageKey(access: AccessLevel) {
  return `sernem-ai-usage:${access}:${new Date().toISOString().slice(0, 10)}`;
}

export default function AIAssistantV3({ locale, access }: Props) {
  const tr = locale === "tr";
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gateOpen, setGateOpen] = useState(false);
  const [assistantName, setAssistantName] = useState("SERNEM AI");
  const [nameEditorOpen, setNameEditorOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [usage, setUsage] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const dailyLimit = access === "premium" ? 30 : access === "free" ? 5 : 0;

  useEffect(() => {
    if (access !== "guest") {
      const storedName = window.localStorage.getItem("sernem-ai-custom-name");
      if (storedName) setAssistantName(storedName);
      const count = Number(window.localStorage.getItem(getDailyUsageKey(access)) ?? "0");
      setUsage(Number.isFinite(count) ? count : 0);
    }
  }, [access]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, loading]);

  const remaining = Math.max(dailyLimit - usage, 0);
  const displayName = access === "guest" ? "SERNEM AI" : assistantName;

  const quickTopics = useMemo(() => QUICK_TOPICS, []);

  function openGate() {
    setGateOpen(true);
    setError("");
  }

  function saveAssistantName() {
    const clean = nameDraft.trim().replace(/\s+/g, " ").slice(0, 32);
    const next = clean || "SERNEM AI";
    setAssistantName(next);
    window.localStorage.setItem("sernem-ai-custom-name", next);
    setNameEditorOpen(false);
    setNameDraft("");
  }

  function resetAssistantName() {
    setAssistantName("SERNEM AI");
    window.localStorage.removeItem("sernem-ai-custom-name");
    setNameEditorOpen(false);
    setNameDraft("");
  }

  function useQuickTopic(topic: QuickTopic) {
    const q = topic.question[locale];
    const answer = topic.answer[locale];
    const userMessage: Message = { id: id(), role: "user", content: q };
    const assistantMessage: Message = {
      id: id(),
      role: "assistant",
      content: answer,
      sources: topic.sources,
      recommendations: getRecommendations(`${topic.keywords} ${q}`, 7),
      tokenFree: true,
    };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setError("");
  }

  async function askAI(override?: string) {
    const cleanQuestion = (override ?? question).trim();
    if (!cleanQuestion || loading) return;

    if (access === "guest") {
      openGate();
      return;
    }

    if (usage >= dailyLimit) {
      setGateOpen(true);
      setError(
        tr
          ? access === "free"
            ? "Bugünkü ücretsiz AI kullanım limitin doldu. Premium ile daha yüksek limite geçebilirsin."
            : "Bugünkü AI kullanım limitine ulaştın."
          : access === "free"
            ? "You have reached today's free AI limit. Upgrade to Premium for a higher limit."
            : "You have reached today's AI usage limit.",
      );
      return;
    }

    const userMessage: Message = { id: id(), role: "user", content: cleanQuestion };
    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: cleanQuestion,
          locale,
          responseMode: "structured",
          messages: [...messages, userMessage]
            .filter((message) => message.content)
            .slice(-8)
            .map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      if (!response.ok) throw new Error(await response.text());
      const payload = (await response.json()) as { data?: CopilotResponse; sources?: string[] };
      if (!payload.data) throw new Error("Structured response missing");

      setMessages((current) => [
        ...current,
        {
          id: id(),
          role: "assistant",
          copilot: payload.data,
          sources: Array.isArray(payload.sources) ? payload.sources : [],
          recommendations: getRecommendations(cleanQuestion, 7),
        },
      ]);

      const nextUsage = usage + 1;
      setUsage(nextUsage);
      window.localStorage.setItem(getDailyUsageKey(access), String(nextUsage));
    } catch (requestError) {
      console.error(requestError);
      setError(tr ? "AI isteği işlenemedi. Lütfen tekrar deneyin." : "The AI request could not be processed. Please try again.");
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askAI();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void askAI();
    }
  }

  function startNewChat() {
    setMessages([]);
    setQuestion("");
    setError("");
    setGateOpen(false);
  }

  const renderList = (title: string, items?: string[], accent = "text-blue-300") => {
    if (!items?.length) return null;
    return (
      <section className="mt-6">
        <h3 className={`text-sm font-black uppercase tracking-[0.14em] ${accent}`}>{title}</h3>
        <ul className="mt-3 space-y-2">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#020817] text-white">
      <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-[1700px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#020817]/95 p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 px-2 py-2">
            <Image src="/brand/sernem-mark.svg" alt="SERNEM" width={46} height={46} className="h-11 w-11" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-black text-white">{displayName}</p>
                {access !== "guest" && (
                  <button
                    type="button"
                    onClick={() => { setNameDraft(assistantName); setNameEditorOpen(true); }}
                    className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] font-black text-slate-500 transition hover:text-white"
                  >
                    ✎
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">{tr ? "SERNEM HSE Asistanı" : "SERNEM HSE Assistant"}</p>
            </div>
          </div>

          <button type="button" onClick={startNewChat} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-black shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
            <span className="text-xl">+</span>{tr ? "Yeni Sohbet" : "New Chat"}
          </button>

          <div className="mt-8">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">{tr ? "Sık Sorulanlar" : "Quick Answers"}</p>
            <p className="mt-2 text-[11px] leading-5 text-slate-600">{tr ? "SERNEM bilgi tabanından anında cevap · token harcamaz" : "Instant answers from SERNEM knowledge · no AI token used"}</p>
            <div className="mt-4 space-y-2">
              {quickTopics.slice(0, 6).map((topic) => (
                <button key={topic.id} type="button" onClick={() => useQuickTopic(topic)} className="group grid w-full grid-cols-[38px_1fr_18px] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-left transition hover:border-blue-400/25 hover:bg-blue-500/[0.06]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 text-base">{topic.icon}</span>
                  <div className="min-w-0"><p className="truncate text-sm font-black text-slate-200">{topic.title[locale]}</p><p className="mt-0.5 text-[10px] text-emerald-500/80">{tr ? "Hazır yanıt" : "Instant answer"}</p></div>
                  <span className="text-slate-600 group-hover:text-blue-300">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-3">
            {access !== "guest" && (
              <div className="rounded-2xl border border-blue-400/15 bg-blue-500/[0.05] p-4">
                <div className="flex items-center justify-between text-xs font-black"><span>{access === "premium" ? "Premium AI" : "Free AI"}</span><span className="text-blue-300">{remaining}/{dailyLimit}</span></div>
                <p className="mt-2 text-[11px] leading-5 text-slate-500">{tr ? "Bugün kalan canlı AI isteği" : "Live AI requests remaining today"}</p>
              </div>
            )}
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.05] p-4">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" />{tr ? "Bilgi tabanı aktif" : "Knowledge base online"}</div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{tr ? "Sık sorular önce SERNEM kaynaklarından çözülür." : "Common questions are answered from SERNEM sources first."}</p>
            </div>
          </div>
        </aside>

        <section className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(37,99,235,.12),transparent_30%),linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:auto,56px_56px,56px_56px]" />

          <header className="relative z-20 flex min-h-20 items-center justify-between border-b border-white/10 bg-[#020817]/85 px-5 backdrop-blur-xl sm:px-7">
            <div><h1 className="text-lg font-black sm:text-xl">{displayName}</h1><p className="mt-1 hidden text-sm text-slate-500 sm:block">{tr ? "Kaynaklı HSE rehberliği ve saha iş akışları" : "Source-based HSE guidance and field workflows"}</p></div>
            <div className="flex items-center gap-2">
              {access === "guest" ? (
                <Link href={`/${locale}/login?next=/${locale}/ai-assistant`} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black transition hover:bg-blue-500">{tr ? "Giriş Yap" : "Sign In"}</Link>
              ) : (
                <button type="button" onClick={() => { setNameDraft(assistantName); setNameEditorOpen(true); }} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10">{tr ? "Asistanı Özelleştir" : "Customize Assistant"}</button>
              )}
              <Link href={`/${locale}`} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10">{tr ? "Ana Sayfa" : "Home"}</Link>
            </div>
          </header>

          <div className="relative z-10 h-[calc(100vh-168px)] overflow-y-auto px-5 py-8 sm:px-8">
            <div className="mx-auto max-w-6xl">
              {messages.length === 0 ? (
                <>
                  <section className="relative min-h-[560px] overflow-hidden rounded-[30px] border border-white/10 bg-[#06101f] shadow-[0_35px_100px_rgba(0,0,0,.48)]">
                    <Image src="/images/sernem-hse-hero-final.png" alt="HSE professional in an industrial environment" fill priority className="object-cover object-center opacity-55" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/88 to-[#031634]/55" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-[#020817]/20" />
                    <div className="relative z-10 flex min-h-[560px] max-w-3xl flex-col justify-center px-7 py-12 sm:px-12 lg:px-16">
                      <p className="text-xs font-black uppercase tracking-[0.30em] text-emerald-400">SERNEM / HSE INTELLIGENCE</p>
                      <h2 className="mt-5 text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">{tr ? "Sahadaki kararlarını güçlendiren HSE asistanı." : "An HSE assistant built for real field decisions."}</h2>
                      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300/85">{tr ? "Sık soruları SERNEM bilgi tabanından anında yanıtlar; gerektiğinde canlı AI ile analiz eder ve cevabın altına ilgili rehber, toolbox, risk analizi, method statement, poster ve levhaları getirir." : "Answers common questions instantly from the SERNEM knowledge base, uses live AI when needed, and builds a relevant pack of guides, toolbox talks, risk assessments, method statements, posters and signs."}</p>

                      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-blue-400/30 bg-[#020817]/90 p-2 shadow-[0_18px_55px_rgba(0,0,0,.42)] backdrop-blur-xl focus-within:border-blue-400/70">
                        <div className="flex items-center gap-2"><span className="ml-3 text-slate-500">⌕</span><textarea ref={textareaRef} value={question} onChange={(event) => { setQuestion(event.target.value); setError(""); }} onKeyDown={handleKeyDown} rows={1} disabled={loading} placeholder={tr ? "HSE ile ilgili sorunuzu yazın..." : "Ask your HSE question..."} className="min-h-[52px] flex-1 resize-none bg-transparent px-2 py-4 text-sm text-white outline-none placeholder:text-slate-500" /><button type="submit" disabled={!question.trim() || loading} className="flex h-12 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-xl font-black disabled:opacity-40">→</button></div>
                      </form>

                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-300">{tr ? "✓ Kaynaklı yanıtlar" : "✓ Source-based"}</span>
                        <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-blue-300">{tr ? "⚡ Hazır sorularda 0 token" : "⚡ 0 tokens for quick answers"}</span>
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-slate-300">{tr ? "Safety Pack önerileri" : "Safety Pack recommendations"}</span>
                      </div>
                    </div>
                  </section>

                  <section className="mt-6">
                    <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">{tr ? "Hızlı Bilgi" : "Quick Knowledge"}</p><h3 className="mt-2 text-2xl font-black">{tr ? "En sık sorulan HSE soruları" : "Most common HSE questions"}</h3></div><span className="hidden rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[11px] font-black text-emerald-300 sm:block">{tr ? "SERNEM içeriği · AI çağrısı yok" : "SERNEM content · no AI call"}</span></div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {quickTopics.map((topic) => (
                        <button key={topic.id} type="button" onClick={() => useQuickTopic(topic)} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-left transition hover:-translate-y-0.5 hover:border-blue-400/25 hover:bg-blue-500/[0.07]">
                          <span className="text-2xl">{topic.icon}</span><p className="mt-3 font-black">{topic.title[locale]}</p><p className="mt-2 text-sm leading-6 text-slate-500">{topic.question[locale]}</p><span className="mt-4 inline-block text-xs font-black text-emerald-400">{tr ? "Anında cevapla →" : "Answer instantly →"}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <div className="space-y-7 pb-28">
                  {messages.map((message) => (
                    <article key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      {message.role === "assistant" && (
                        <div className="relative mt-1 hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border border-blue-400/25 bg-slate-900 sm:block"><Image src="/images/sernem-hse-hero-final.png" alt="HSE assistant" fill className="object-cover object-[70%_35%]" /></div>
                      )}
                      <div className={`max-w-[92%] rounded-3xl border p-5 sm:max-w-[82%] sm:p-6 ${message.role === "user" ? "border-blue-500/30 bg-blue-600 text-white" : "border-white/10 bg-white/[0.055] text-slate-200"}`}>
                        <div className="flex items-center justify-between gap-3"><p className={`text-xs font-black uppercase tracking-[0.16em] ${message.role === "assistant" ? "text-emerald-300" : "text-blue-100"}`}>{message.role === "assistant" ? displayName : tr ? "Siz" : "You"}</p>{message.tokenFree && <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-black text-emerald-300">0 TOKEN</span>}</div>

                        {message.role === "user" && <p className="mt-4 whitespace-pre-wrap leading-7">{message.content}</p>}
                        {message.role === "assistant" && message.content && <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-300">{message.content}</p>}
                        {message.role === "assistant" && message.copilot && (
                          <div className="mt-4">
                            <div className="rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] p-4"><h2 className="text-xl font-black text-white">{message.copilot.title}</h2><p className="mt-2 leading-7 text-slate-300">{message.copilot.summary}</p>{message.copilot.riskLevel !== "UNDETERMINED" && <span className="mt-3 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-300">{message.copilot.riskLevel}</span>}</div>
                            {renderList(tr ? "Ana Tehlikeler" : "Main Hazards", message.copilot.hazards)}
                            {renderList(tr ? "Kritik Kontroller" : "Critical Controls", message.copilot.criticalControls, "text-emerald-300")}
                            {renderList(tr ? "Gerekli KKD" : "Required PPE", message.copilot.requiredPpe)}
                            {renderList(tr ? "İzinler ve Dokümanlar" : "Permits & Documents", message.copilot.permitsAndDocuments)}
                            {renderList(tr ? "Çalışmayı Durdurma Koşulları" : "Stop Work Conditions", message.copilot.stopWorkConditions, "text-red-300")}
                            {renderList(tr ? "Uygulanabilir Standartlar" : "Applicable Standards", message.copilot.applicableStandards)}
                          </div>
                        )}

                        {message.sources?.length ? <div className="mt-6 border-t border-white/10 pt-4"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{tr ? "Kaynaklar" : "Sources"}</p><div className="mt-2 flex flex-wrap gap-2">{message.sources.map((source) => <span key={source} className="rounded-lg border border-blue-400/15 bg-blue-500/[0.07] px-2.5 py-1.5 text-xs font-bold text-blue-300">{source.replace(/\.md$/, "").replaceAll("-", " ")}</span>)}</div></div> : null}

                        {message.recommendations?.length ? (
                          <div className="mt-6 border-t border-white/10 pt-5"><div className="flex items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-400">{tr ? "Önerilen Safety Pack" : "Recommended Safety Pack"}</p><p className="mt-2 text-sm text-slate-500">{tr ? "Bu konu için ilgili SERNEM kaynakları" : "Relevant SERNEM resources for this topic"}</p></div><span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-3 py-1 text-[10px] font-black text-emerald-300">SERNEM PACK</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{message.recommendations.map((rec) => <Link key={rec.id} href={`/${locale}${rec.href}`} className="group rounded-2xl border border-white/10 bg-[#020817]/60 p-4 transition hover:border-blue-400/30 hover:bg-blue-500/[0.08]"><div className="flex gap-3"><span className="text-xl">{rec.icon}</span><div><p className="font-black text-white group-hover:text-blue-300">{rec.title[locale]}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.10em] text-slate-600">{rec.type.replaceAll("-", " ")}</p><p className="mt-2 text-sm leading-6 text-slate-500">{rec.description[locale]}</p></div></div></Link>)}</div></div>
                        ) : null}
                      </div>
                    </article>
                  ))}

                  {loading && <article className="flex gap-3"><div className="relative mt-1 hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border border-blue-400/25 sm:block"><Image src="/images/sernem-hse-hero-final.png" alt="HSE assistant" fill className="object-cover object-[70%_35%]" /></div><div className="rounded-3xl border border-white/10 bg-white/[0.055] px-6 py-5"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">{displayName}</p><div className="mt-4 flex gap-2"><span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400" /><span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-.15s]" /><span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-.3s]" /></div></div></article>}
                  <div ref={endRef} />
                </div>
              )}
            </div>
          </div>

          {messages.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#020817]/92 px-5 py-4 backdrop-blur-xl"><div className="mx-auto max-w-6xl">{error && <div className="mb-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">⚠ {error}</div>}<form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.05] p-2 focus-within:border-blue-400/40"><div className="flex items-end gap-2"><textarea ref={textareaRef} value={question} onChange={(event) => { setQuestion(event.target.value); setError(""); }} onKeyDown={handleKeyDown} rows={1} disabled={loading} placeholder={tr ? `${displayName}'a bir HSE sorusu sor...` : `Ask ${displayName} an HSE question...`} className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-white outline-none placeholder:text-slate-600" /><button type="submit" disabled={!question.trim() || loading} className="flex h-12 w-14 items-center justify-center rounded-xl bg-blue-600 font-black disabled:opacity-40">→</button></div></form></div></div>
          )}
        </section>
      </div>

      {gateOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm" onClick={() => setGateOpen(false)}><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#07101f] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-400">SERNEM AI ACCESS</p><h2 className="mt-3 text-2xl font-black">{access === "guest" ? tr ? "AI kullanmak için hesabını aç" : "Sign in to use live AI" : tr ? "Daha fazla AI erişimi" : "More AI access"}</h2><p className="mt-3 leading-7 text-slate-400">{access === "guest" ? tr ? "SERNEM AI ekranını ve token harcamayan hızlı yanıtları üyelik olmadan kullanabilirsin. Canlı AI soruları için giriş yapman gerekir." : "You can explore SERNEM AI and use token-free quick answers without an account. Sign in to send live AI questions." : tr ? "Ücretsiz günlük limitin dolduğunda Premium ile daha yüksek kullanım limitine geçebilirsin." : "When your free daily limit is used, Premium provides a higher daily AI allowance."}</p><div className="mt-6 grid gap-2 sm:grid-cols-2">{access === "guest" ? <><Link href={`/${locale}/register`} className="rounded-xl bg-blue-600 px-4 py-3 text-center font-black">{tr ? "Ücretsiz Kayıt Ol" : "Create Free Account"}</Link><Link href={`/${locale}/login?next=/${locale}/ai-assistant`} className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center font-black">{tr ? "Giriş Yap" : "Sign In"}</Link></> : <Link href={`/${locale}/upgrade?next=/${locale}/ai-assistant`} className="col-span-full rounded-xl bg-blue-600 px-4 py-3 text-center font-black">{tr ? "Premium'u İncele" : "Explore Premium"}</Link>}</div><button type="button" onClick={() => setGateOpen(false)} className="mt-4 w-full rounded-xl px-4 py-2 text-sm font-bold text-slate-500 hover:text-white">{tr ? "Kapat" : "Close"}</button></div></div>
      )}

      {nameEditorOpen && access !== "guest" && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm" onClick={() => setNameEditorOpen(false)}><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#07101f] p-6" onClick={(event) => event.stopPropagation()}><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-400">{tr ? "Kişisel Asistan" : "Personal Assistant"}</p><h2 className="mt-3 text-2xl font-black">{tr ? "Asistanına isim ver" : "Name your assistant"}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{tr ? "Örn. Joe AI, Atlas veya Safety Mate. SERNEM markası arka planda korunur." : "For example Joe AI, Atlas or Safety Mate. SERNEM remains the platform behind your assistant."}</p><input autoFocus value={nameDraft} onChange={(event) => setNameDraft(event.target.value.slice(0, 32))} onKeyDown={(event) => { if (event.key === "Enter") saveAssistantName(); }} placeholder="SERNEM AI" className="mt-5 w-full rounded-xl border border-white/10 bg-[#020817] px-4 py-3 text-white outline-none focus:border-blue-400/40" /><div className="mt-4 flex gap-2"><button type="button" onClick={saveAssistantName} className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-black">{tr ? "Kaydet" : "Save"}</button><button type="button" onClick={resetAssistantName} className="rounded-xl border border-white/10 px-4 py-3 font-black text-slate-400">Reset</button></div><p className="mt-4 text-center text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">Powered by SERNEM</p></div></div>
      )}
    </main>
  );
}
