"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CopilotResponse } from "@/lib/ai/copilot-types";
import {
  getRecommendations,
  type Recommendation,
} from "@/lib/ai/recommendations";

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

type Workflow = {
  icon: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  prompt: { tr: string; en: string };
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
    keywords:
      "working at height fall protection harness lanyard yüksekte çalışma emniyet kemeri",
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

const WORKFLOWS: Workflow[] = [
  {
    icon: "RA",
    title: { tr: "Risk analizi taslağı", en: "Risk assessment draft" },
    description: {
      tr: "Tehlike, kontrol ve kalan risk için yapılandırılmış başlangıç.",
      en: "A structured starting point for hazards, controls and residual risk.",
    },
    prompt: {
      tr: "Bu iş için profesyonel bir risk analizi taslağı hazırla:",
      en: "Build a professional risk assessment draft for:",
    },
  },
  {
    icon: "TB",
    title: { tr: "Toolbox konuşması", en: "Toolbox talk" },
    description: {
      tr: "Ekip bilgilendirmesini saha diline dönüştür.",
      en: "Turn the topic into a field-ready crew briefing.",
    },
    prompt: {
      tr: "Bu konu için saha ekibine uygun toolbox talk hazırla:",
      en: "Prepare a field-ready toolbox talk for:",
    },
  },
  {
    icon: "OB",
    title: { tr: "Gözlem analizi", en: "Observation review" },
    description: {
      tr: "Bulgu, tehlike ve düzeltici aksiyonu netleştir.",
      en: "Clarify the finding, hazard and corrective action.",
    },
    prompt: {
      tr: "Bu saha gözlemini HSE açısından analiz et:",
      en: "Review this field observation from an HSE perspective:",
    },
  },
  {
    icon: "MS",
    title: { tr: "Method statement desteği", en: "Method statement support" },
    description: {
      tr: "İş adımları, kontroller ve gerekli izinleri yapılandır.",
      en: "Structure work steps, controls and required permits.",
    },
    prompt: {
      tr: "Bu iş için method statement hazırlamama yardım et:",
      en: "Help me prepare a method statement for:",
    },
  },
];

const SAMPLE_PACK = [
  { icon: "📚", tr: "Sıcak İş Rehberi", en: "Hot Work Guide" },
  { icon: "🧰", tr: "Sıcak İş Toolbox", en: "Hot Work Toolbox Talk" },
  { icon: "◆", tr: "Risk Analizi", en: "Risk Assessment" },
  { icon: "▤", tr: "Method Statement", en: "Method Statement" },
  { icon: "▧", tr: "Poster & Levha", en: "Poster & Safety Sign" },
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
      const count = Number(
        window.localStorage.getItem(getDailyUsageKey(access)) ?? "0",
      );
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

  function loadPrompt(prompt: string) {
    setQuestion(prompt);
    window.setTimeout(() => textareaRef.current?.focus(), 50);
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

    const userMessage: Message = {
      id: id(),
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: cleanQuestion,
          locale,
          responseMode: "structured",
          messages: [...messages, userMessage]
            .filter((message) => message.content)
            .slice(-8)
            .map((message) => ({
              role: message.role,
              content: message.content,
            })),
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      const payload = (await response.json()) as {
        data?: CopilotResponse;
        sources?: string[];
      };

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
      window.localStorage.setItem(
        getDailyUsageKey(access),
        String(nextUsage),
      );
    } catch (requestError) {
      console.error(requestError);
      setError(
        tr
          ? "AI isteği işlenemedi. Lütfen tekrar deneyin."
          : "The AI request could not be processed. Please try again.",
      );
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

  const renderList = (
    title: string,
    items?: string[],
    accent = "text-blue-200",
  ) => {
    if (!items?.length) return null;

    return (
      <section className="mt-7">
        <h3
          className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${accent}`}
        >
          {title}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {items.map((item, index) => (
            <li
              key={`${title}-${index}`}
              className="flex gap-3 text-[15px] leading-7 text-slate-300"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#020711] font-sans text-white">
      <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-[1720px]">
        <aside className="hidden w-[290px] shrink-0 border-r border-white/[0.07] bg-[#030914] px-5 py-6 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 rounded-2xl px-1 py-1">
            <Image
              src="/brand/sernem-mark.svg"
              alt="SERNEM"
              width={44}
              height={44}
              className="h-11 w-11"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-white">
                  {displayName}
                </p>
                {access !== "guest" && (
                  <button
                    type="button"
                    aria-label={tr ? "Asistan adını değiştir" : "Rename assistant"}
                    onClick={() => {
                      setNameDraft(assistantName);
                      setNameEditorOpen(true);
                    }}
                    className="rounded-md border border-white/[0.08] px-1.5 py-0.5 text-[10px] text-slate-500 transition hover:border-white/15 hover:text-white"
                  >
                    ✎
                  </button>
                )}
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                {tr ? "SERNEM HSE Asistanı" : "SERNEM HSE Assistant"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startNewChat}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/15 bg-gradient-to-b from-blue-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(37,99,235,.22)] transition hover:-translate-y-px hover:from-blue-400 hover:to-blue-600"
          >
            <span className="text-lg">+</span>
            {tr ? "Yeni Sohbet" : "New Chat"}
          </button>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {tr ? "Hızlı Yanıtlar" : "Quick Answers"}
              </p>
              <span className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-600">
              {tr
                ? "SERNEM bilgi tabanından anında cevap · AI çağrısı yok"
                : "Instant answers from SERNEM knowledge · no AI call"}
            </p>

            <div className="mt-4 space-y-2">
              {quickTopics.slice(0, 6).map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => useQuickTopic(topic)}
                  className="group grid w-full grid-cols-[36px_1fr_18px] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.018] px-3 py-2.5 text-left transition duration-200 hover:border-blue-400/20 hover:bg-blue-500/[0.055]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#07101e] text-[15px]">
                    {topic.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-slate-200 transition group-hover:text-white">
                      {topic.title[locale]}
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium text-emerald-400/75">
                      {tr ? "Hazır yanıt" : "Instant answer"}
                    </p>
                  </div>
                  <span className="text-sm text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-blue-300">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.03)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {tr ? "Çalışma Alanı" : "Workspace"}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {access === "premium"
                    ? "SERNEM Premium"
                    : access === "free"
                      ? "SERNEM Free"
                      : tr
                        ? "Misafir Modu"
                        : "Guest Mode"}
                </p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.75)]" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/[0.06] bg-black/10 p-3">
                <p className="text-[10px] font-medium text-slate-500">
                  {tr ? "Bilgi tabanı" : "Knowledge"}
                </p>
                <p className="mt-1 text-xs font-semibold text-emerald-300">
                  {tr ? "Aktif" : "Online"}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-black/10 p-3">
                <p className="text-[10px] font-medium text-slate-500">
                  {tr ? "Canlı AI" : "Live AI"}
                </p>
                <p className="mt-1 text-xs font-semibold text-blue-200">
                  {access === "guest" ? "—" : `${remaining}/${dailyLimit}`}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(37,99,235,.10),transparent_26%),linear-gradient(rgba(255,255,255,.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.012)_1px,transparent_1px)] bg-[size:auto,64px_64px,64px_64px]" />

          <header className="relative z-20 flex min-h-20 items-center justify-between border-b border-white/[0.07] bg-[#020711]/90 px-5 backdrop-blur-xl sm:px-7">
            <div>
              <h1 className="text-[18px] font-semibold tracking-[-0.02em] text-white sm:text-xl">
                {displayName}
              </h1>
              <p className="mt-1 hidden text-[13px] font-medium text-slate-500 sm:block">
                {tr
                  ? "Kaynaklı HSE rehberliği · Safety Pack iş akışları"
                  : "Source-based HSE guidance · Safety Pack workflows"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {access === "guest" ? (
                <Link
                  href={`/${locale}/login?next=/${locale}/ai-assistant`}
                  className="rounded-xl border border-blue-400/15 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  {tr ? "Giriş Yap" : "Sign In"}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setNameDraft(assistantName);
                    setNameEditorOpen(true);
                  }}
                  className="rounded-xl border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                >
                  ✦ {tr ? "Asistanı Özelleştir" : "Customize Assistant"}
                </button>
              )}

              <Link
                href={`/${locale}`}
                className="rounded-xl border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-sm font-medium text-slate-400 transition hover:border-white/15 hover:text-white"
              >
                {tr ? "Ana Sayfa" : "Home"}
              </Link>
            </div>
          </header>

          <div className="relative z-10 h-[calc(100vh-168px)] overflow-y-auto px-4 py-7 sm:px-7 lg:px-8">
            <div className="mx-auto max-w-[1180px]">
              {messages.length === 0 ? (
                <>
                  <section className="relative min-h-[590px] overflow-hidden rounded-[32px] border border-white/[0.09] bg-[#06101f] shadow-[0_40px_120px_rgba(0,0,0,.48)]">
                    <Image
                      src="/images/sernem-hse-hero-final.png"
                      alt="HSE professional in an industrial environment"
                      fill
                      priority
                      className="object-cover object-center opacity-[0.62]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,#020711_0%,rgba(2,7,17,.96)_34%,rgba(2,7,17,.76)_58%,rgba(3,18,44,.42)_100%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020711] via-transparent to-[#020711]/30" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/35 to-transparent" />

                    <div className="relative z-10 flex min-h-[590px] max-w-[800px] flex-col justify-center px-7 py-12 sm:px-12 lg:px-16">
                      <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-emerald-400/70" />
                        <p className="text-[10px] font-semibold uppercase tracking-[0.30em] text-emerald-300">
                          SERNEM / HSE INTELLIGENCE
                        </p>
                      </div>

                      <h2 className="mt-6 max-w-[730px] text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[52px] lg:text-[64px]">
                        {tr
                          ? "Sahadaki kararı, doğru bilgiyle güçlendir."
                          : "Field decisions, backed by the right safety intelligence."}
                      </h2>

                      <p className="mt-6 max-w-[690px] text-[15px] font-medium leading-7 text-slate-300/90 sm:text-base">
                        {tr
                          ? "SERNEM AI sık soruları bilgi tabanından anında yanıtlar; gerektiğinde canlı AI ile analiz eder ve cevabı rehber, toolbox, risk analizi, method statement, poster ve levhalardan oluşan ilgili bir Safety Pack'e dönüştürür."
                          : "SERNEM AI answers common questions from the knowledge base, uses live AI when deeper analysis is needed, and turns the result into a relevant Safety Pack of guides, toolbox talks, risk assessments, method statements, posters and signs."}
                      </p>

                      <form
                        onSubmit={handleSubmit}
                        className="mt-8 max-w-[760px] rounded-2xl border border-blue-300/25 bg-[#020711]/88 p-2 shadow-[0_20px_70px_rgba(0,0,0,.42)] backdrop-blur-xl transition focus-within:border-blue-300/55 focus-within:ring-4 focus-within:ring-blue-500/[0.08]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="ml-3 text-slate-500">⌕</span>
                          <textarea
                            ref={textareaRef}
                            value={question}
                            onChange={(event) => {
                              setQuestion(event.target.value);
                              setError("");
                            }}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={loading}
                            placeholder={
                              tr
                                ? "Saha durumunu veya HSE sorunuzu yazın..."
                                : "Describe the field situation or ask an HSE question..."
                            }
                            className="min-h-[54px] flex-1 resize-none bg-transparent px-2 py-4 text-[15px] font-medium text-white outline-none placeholder:text-slate-500"
                          />
                          <button
                            type="submit"
                            disabled={!question.trim() || loading}
                            className="flex h-[50px] w-[58px] items-center justify-center rounded-xl border border-blue-300/15 bg-gradient-to-br from-blue-500 to-cyan-600 text-lg font-semibold text-white shadow-[0_10px_28px_rgba(37,99,235,.22)] transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            →
                          </button>
                        </div>
                      </form>

                      <div className="mt-3 flex max-w-[760px] flex-wrap gap-2">
                        {quickTopics.slice(0, 4).map((topic) => (
                          <button
                            key={`chip-${topic.id}`}
                            type="button"
                            onClick={() => useQuickTopic(topic)}
                            className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium text-slate-300 transition hover:border-blue-300/25 hover:bg-blue-500/[0.07] hover:text-white"
                          >
                            {topic.icon} {topic.title[locale]}
                          </button>
                        ))}
                      </div>

                      <div className="mt-7 grid max-w-[760px] gap-2 sm:grid-cols-3">
                        {[
                          {
                            label: tr ? "Kaynaklı yanıt" : "Source-based",
                            detail: tr ? "SERNEM bilgi tabanı" : "SERNEM knowledge",
                            icon: "✓",
                          },
                          {
                            label: tr ? "0-token hızlı bilgi" : "0-token quick answers",
                            detail: tr ? "Sık sorularda AI yok" : "No AI call for FAQs",
                            icon: "⚡",
                          },
                          {
                            label: "Safety Pack",
                            detail: tr ? "Doğru içeriğe yönlendirir" : "Routes to the right assets",
                            icon: "◆",
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-xl border border-white/[0.08] bg-black/15 px-3.5 py-3 backdrop-blur-sm"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-emerald-300">{item.icon}</span>
                              <p className="text-[11px] font-semibold text-white">
                                {item.label}
                              </p>
                            </div>
                            <p className="mt-1 text-[10px] font-medium text-slate-500">
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-7 right-7 hidden w-[250px] rounded-2xl border border-white/[0.10] bg-[#06101f]/82 p-4 shadow-[0_20px_60px_rgba(0,0,0,.42)] backdrop-blur-xl xl:block">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-blue-300/20">
                          <Image
                            src="/images/sernem-hse-hero-final.png"
                            alt=""
                            fill
                            className="object-cover object-[70%_35%]"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{displayName}</p>
                          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                            {tr ? "HSE çalışma asistanı" : "HSE work assistant"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-3">
                        <span className="text-[10px] font-medium text-slate-500">
                          Powered by SERNEM
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-300">
                          <i className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {tr ? "Hazır" : "Ready"}
                        </span>
                      </div>
                    </div>
                  </section>

                  <section className="mt-7 grid gap-4 lg:grid-cols-[1.45fr_.85fr]">
                    <div className="rounded-[26px] border border-white/[0.08] bg-white/[0.022] p-6 sm:p-7">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300">
                            {tr ? "Çalışma Akışları" : "Workflows"}
                          </p>
                          <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.025em] text-white">
                            {tr
                              ? "Sadece soru sorma. İş üret."
                              : "Go beyond answers. Move the work forward."}
                          </h3>
                        </div>
                        <span className="hidden text-[11px] font-medium text-slate-600 sm:block">
                          SERNEM AI / 04
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {WORKFLOWS.map((workflow) => (
                          <button
                            key={workflow.title.en}
                            type="button"
                            onClick={() => loadPrompt(`${workflow.prompt[locale]} `)}
                            className="group rounded-2xl border border-white/[0.08] bg-[#050d19] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-blue-300/22 hover:bg-blue-500/[0.045]"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-300/12 bg-blue-500/[0.06] text-[11px] font-semibold text-blue-200">
                                {workflow.icon}
                              </span>
                              <span className="text-sm text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-blue-300">
                                →
                              </span>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-white">
                              {workflow.title[locale]}
                            </p>
                            <p className="mt-1.5 text-[12px] leading-5 text-slate-500">
                              {workflow.description[locale]}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[26px] border border-emerald-300/[0.10] bg-gradient-to-br from-emerald-400/[0.055] via-white/[0.02] to-blue-500/[0.035] p-6 sm:p-7">
                      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-400/[0.06] blur-3xl" />
                      <div className="relative">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                          {tr ? "Örnek Safety Pack" : "Sample Safety Pack"}
                        </p>
                        <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-white">
                          Hot Work
                        </h3>
                        <p className="mt-2 text-[12px] leading-5 text-slate-500">
                          {tr
                            ? "AI cevabından sonra ilgili SERNEM içerikleri tek pakette."
                            : "Relevant SERNEM resources grouped after the AI response."}
                        </p>

                        <div className="mt-5 space-y-2">
                          {SAMPLE_PACK.map((item) => (
                            <div
                              key={item.en}
                              className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/10 px-3 py-2.5"
                            >
                              <span className="text-sm">{item.icon}</span>
                              <span className="text-[12px] font-medium text-slate-300">
                                {tr ? item.tr : item.en}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="mt-7 pb-3">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300">
                          {tr ? "Hızlı Bilgi" : "Quick Knowledge"}
                        </p>
                        <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.025em] text-white">
                          {tr
                            ? "En sık sorulan HSE soruları"
                            : "Most common HSE questions"}
                        </h3>
                      </div>
                      <span className="hidden rounded-full border border-emerald-300/[0.10] bg-emerald-400/[0.045] px-3 py-1.5 text-[10px] font-semibold text-emerald-300 sm:block">
                        {tr
                          ? "SERNEM içeriği · AI çağrısı yok"
                          : "SERNEM content · no AI call"}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {quickTopics.map((topic) => (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => useQuickTopic(topic)}
                          className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-blue-300/20 hover:bg-blue-500/[0.045]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-[#07101e] text-lg">
                              {topic.icon}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-400/80">
                              0 TOKEN
                            </span>
                          </div>
                          <p className="mt-4 text-[15px] font-semibold text-white">
                            {topic.title[locale]}
                          </p>
                          <p className="mt-2 text-[12px] leading-5 text-slate-500">
                            {topic.question[locale]}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-blue-300 transition group-hover:text-blue-200">
                            {tr ? "Anında cevapla" : "Answer instantly"} →
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <div className="space-y-7 pb-28">
                  {messages.map((message) => (
                    <article
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="relative mt-1 hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border border-blue-300/20 bg-slate-900 shadow-[0_8px_25px_rgba(0,0,0,.25)] sm:block">
                          <Image
                            src="/images/sernem-hse-hero-final.png"
                            alt="HSE assistant"
                            fill
                            className="object-cover object-[70%_35%]"
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-[92%] rounded-[24px] border p-5 sm:max-w-[82%] sm:p-6 ${
                          message.role === "user"
                            ? "border-blue-400/25 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-[0_14px_35px_rgba(37,99,235,.14)]"
                            : "border-white/[0.08] bg-white/[0.035] text-slate-200 shadow-[0_14px_40px_rgba(0,0,0,.14)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p
                            className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              message.role === "assistant"
                                ? "text-emerald-300"
                                : "text-blue-100"
                            }`}
                          >
                            {message.role === "assistant"
                              ? displayName
                              : tr
                                ? "Siz"
                                : "You"}
                          </p>
                          {message.tokenFree && (
                            <span className="rounded-full border border-emerald-300/[0.14] bg-emerald-400/[0.07] px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                              0 TOKEN
                            </span>
                          )}
                        </div>

                        {message.role === "user" && (
                          <p className="mt-4 whitespace-pre-wrap text-[15px] leading-7">
                            {message.content}
                          </p>
                        )}

                        {message.role === "assistant" && message.content && (
                          <p className="mt-4 whitespace-pre-wrap text-[15px] leading-7 text-slate-300">
                            {message.content}
                          </p>
                        )}

                        {message.role === "assistant" && message.copilot && (
                          <div className="mt-4">
                            <div className="rounded-2xl border border-blue-300/[0.12] bg-blue-500/[0.045] p-5">
                              <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">
                                {message.copilot.title}
                              </h2>
                              <p className="mt-2 text-[15px] leading-7 text-slate-300">
                                {message.copilot.summary}
                              </p>
                              {message.copilot.riskLevel !== "UNDETERMINED" && (
                                <span className="mt-3 inline-flex rounded-full border border-amber-300/[0.15] bg-amber-400/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-200">
                                  {message.copilot.riskLevel}
                                </span>
                              )}
                            </div>

                            {renderList(
                              tr ? "Ana Tehlikeler" : "Main Hazards",
                              message.copilot.hazards,
                            )}
                            {renderList(
                              tr ? "Kritik Kontroller" : "Critical Controls",
                              message.copilot.criticalControls,
                              "text-emerald-300",
                            )}
                            {renderList(
                              tr ? "Gerekli KKD" : "Required PPE",
                              message.copilot.requiredPpe,
                            )}
                            {renderList(
                              tr
                                ? "İzinler ve Dokümanlar"
                                : "Permits & Documents",
                              message.copilot.permitsAndDocuments,
                            )}
                            {renderList(
                              tr
                                ? "Çalışmayı Durdurma Koşulları"
                                : "Stop Work Conditions",
                              message.copilot.stopWorkConditions,
                              "text-red-300",
                            )}
                            {renderList(
                              tr
                                ? "Uygulanabilir Standartlar"
                                : "Applicable Standards",
                              message.copilot.applicableStandards,
                            )}
                          </div>
                        )}

                        {message.sources?.length ? (
                          <div className="mt-6 border-t border-white/[0.07] pt-4">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {tr ? "Kaynaklar" : "Sources"}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {message.sources.map((source) => (
                                <span
                                  key={source}
                                  className="rounded-lg border border-blue-300/[0.12] bg-blue-500/[0.05] px-2.5 py-1.5 text-[11px] font-medium text-blue-200"
                                >
                                  {source
                                    .replace(/\.md$/, "")
                                    .replaceAll("-", " ")}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {message.recommendations?.length ? (
                          <div className="mt-6 border-t border-white/[0.07] pt-5">
                            <div className="flex items-end justify-between gap-3">
                              <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                                  {tr
                                    ? "Önerilen Safety Pack"
                                    : "Recommended Safety Pack"}
                                </p>
                                <p className="mt-2 text-[12px] text-slate-500">
                                  {tr
                                    ? "Bu konu için ilgili SERNEM kaynakları"
                                    : "Relevant SERNEM resources for this topic"}
                                </p>
                              </div>
                              <span className="rounded-full border border-emerald-300/[0.12] bg-emerald-400/[0.06] px-3 py-1 text-[10px] font-semibold text-emerald-300">
                                SERNEM PACK
                              </span>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              {message.recommendations.map((rec) => (
                                <Link
                                  key={rec.id}
                                  href={`/${locale}${rec.href}`}
                                  className="group rounded-2xl border border-white/[0.08] bg-[#020711]/55 p-4 transition hover:-translate-y-0.5 hover:border-blue-300/20 hover:bg-blue-500/[0.045]"
                                >
                                  <div className="flex gap-3">
                                    <span className="text-xl">{rec.icon}</span>
                                    <div>
                                      <p className="text-sm font-semibold text-white transition group-hover:text-blue-200">
                                        {rec.title[locale]}
                                      </p>
                                      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600">
                                        {rec.type.replaceAll("-", " ")}
                                      </p>
                                      <p className="mt-2 text-[12px] leading-5 text-slate-500">
                                        {rec.description[locale]}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}

                  {loading && (
                    <article className="flex gap-3">
                      <div className="relative mt-1 hidden h-11 w-11 shrink-0 overflow-hidden rounded-full border border-blue-300/20 sm:block">
                        <Image
                          src="/images/sernem-hse-hero-final.png"
                          alt="HSE assistant"
                          fill
                          className="object-cover object-[70%_35%]"
                        />
                      </div>
                      <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.035] px-6 py-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                          {displayName}
                        </p>
                        <div className="mt-4 flex gap-2">
                          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400" />
                          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-.15s]" />
                          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-.3s]" />
                        </div>
                        <p className="mt-3 text-[12px] text-slate-500">
                          {tr
                            ? "Bilgi tabanı ve ilgili Safety Pack taranıyor..."
                            : "Reviewing the knowledge base and matching Safety Pack..."}
                        </p>
                      </div>
                    </article>
                  )}

                  <div ref={endRef} />
                </div>
              )}
            </div>
          </div>

          {messages.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.07] bg-[#020711]/94 px-5 py-4 backdrop-blur-xl">
              <div className="mx-auto max-w-[1180px]">
                {error && (
                  <div className="mb-3 rounded-xl border border-red-300/[0.14] bg-red-500/[0.08] px-4 py-3 text-sm font-medium text-red-200">
                    ⚠ {error}
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-2 transition focus-within:border-blue-300/25"
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
                      rows={1}
                      disabled={loading}
                      placeholder={
                        tr
                          ? `${displayName}'a bir HSE sorusu sor...`
                          : `Ask ${displayName} an HSE question...`
                      }
                      className="max-h-32 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-[15px] font-medium text-white outline-none placeholder:text-slate-600"
                    />
                    <button
                      type="submit"
                      disabled={!question.trim() || loading}
                      className="flex h-12 w-14 items-center justify-center rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-40"
                    >
                      →
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </div>

      {gateOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
          onClick={() => setGateOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-[28px] border border-white/[0.09] bg-[#07101f] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-blue-300">
              SERNEM AI ACCESS
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">
              {access === "guest"
                ? tr
                  ? "Canlı AI için hesabınla devam et"
                  : "Sign in to use live AI"
                : tr
                  ? "Daha fazla AI erişimi"
                  : "More AI access"}
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-slate-400">
              {access === "guest"
                ? tr
                  ? "SERNEM AI ekranını ve token harcamayan hızlı yanıtları üyelik olmadan kullanabilirsin. Canlı AI soruları için giriş yapman gerekir."
                  : "You can explore SERNEM AI and use token-free quick answers without an account. Sign in to send live AI questions."
                : tr
                  ? "Ücretsiz günlük limitin dolduğunda Premium ile daha yüksek kullanım limitine geçebilirsin."
                  : "When your free daily limit is used, Premium provides a higher daily AI allowance."}
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {access === "guest" ? (
                <>
                  <Link
                    href={`/${locale}/register`}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    {tr ? "Ücretsiz Kayıt Ol" : "Create Free Account"}
                  </Link>
                  <Link
                    href={`/${locale}/login?next=/${locale}/ai-assistant`}
                    className="rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    {tr ? "Giriş Yap" : "Sign In"}
                  </Link>
                </>
              ) : (
                <Link
                  href={`/${locale}/upgrade?next=/${locale}/ai-assistant`}
                  className="col-span-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  {tr ? "Premium'u İncele" : "Explore Premium"}
                </Link>
              )}
            </div>

            <button
              type="button"
              onClick={() => setGateOpen(false)}
              className="mt-4 w-full rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-white"
            >
              {tr ? "Kapat" : "Close"}
            </button>
          </div>
        </div>
      )}

      {nameEditorOpen && access !== "guest" && (
        <div
          className="fixed inset-0 z-[210] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
          onClick={() => setNameEditorOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-[28px] border border-white/[0.09] bg-[#07101f] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-emerald-300">
              {tr ? "Kişisel Asistan" : "Personal Assistant"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">
              {tr ? "Asistanına isim ver" : "Name your assistant"}
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-slate-500">
              {tr
                ? "Örn. Joe AI, Atlas veya Safety Mate. SERNEM markası arka planda korunur."
                : "For example Joe AI, Atlas or Safety Mate. SERNEM remains the platform behind your assistant."}
            </p>

            <input
              autoFocus
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value.slice(0, 32))}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveAssistantName();
              }}
              placeholder="SERNEM AI"
              className="mt-5 w-full rounded-xl border border-white/[0.09] bg-[#020711] px-4 py-3 text-white outline-none transition focus:border-blue-300/30"
            />

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={saveAssistantName}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
              >
                {tr ? "Kaydet" : "Save"}
              </button>
              <button
                type="button"
                onClick={resetAssistantName}
                className="rounded-xl border border-white/[0.09] px-4 py-3 text-sm font-semibold text-slate-400"
              >
                Reset
              </button>
            </div>

            <p className="mt-4 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600">
              Powered by SERNEM
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
