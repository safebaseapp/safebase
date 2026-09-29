import { createClient } from "@/utils/supabase/server";

type Locale = "tr" | "en";

type ShortAnswer = {
  title: string;
  summary: string;
  sources: string[];
};

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9çğıöşü\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function isSimpleKnowledgeQuestion(question: string) {
  const q = normalize(question);
  const wordCount = q.split(" ").filter(Boolean).length;

  // Package 5 is for concise factual HSE questions only. Longer operational
  // scenarios must continue to the structured field-assessment engine so that
  // Field Brief / Supervisor / Detailed Review receive full risk data.
  if (question.length > 120 || wordCount > 18) return false;

  const operationalSignals = [
    "we need to",
    "we are",
    "we will",
    "we plan to",
    "has not been",
    "have not been",
    "not fully applied",
    "no fire watch",
    "can the work start",
    "can we start",
    "crew",
    "inside a confined space",
    "yapacağız",
    "yapacagiz",
    "planlıyoruz",
    "planliyoruz",
    "planlanıyor",
    "planlaniyor",
    "tamamlanmadı",
    "tamamlanmadi",
    "uygulanmadı",
    "uygulanmadi",
    "başlayabilir miyiz",
    "baslayabilir miyiz",
    "ekip",
  ];

  return !hasAny(q, operationalSignals);
}

function buildResponse(answer: ShortAnswer) {
  return {
    version: "1.0" as const,
    mode: "general-guidance" as const,
    title: answer.title,
    summary: answer.summary,
    riskLevel: "UNDETERMINED" as const,
    riskReason: null,
    hazards: [],
    criticalControls: [],
    requiredPpe: [],
    permitsAndDocuments: [],
    beforeStarting: [],
    duringWork: [],
    afterCompletion: [],
    stopWorkConditions: [],
    commonFailures: [],
    applicableStandards: [],
    quickChecklist: [],
    recommendation: answer.summary,
    clarificationQuestions: [],
    relatedTopics: [],
  };
}

function findShortAnswer(question: string, locale: Locale): ShortAnswer | null {
  if (!isSimpleKnowledgeQuestion(question)) return null;

  const q = normalize(question);
  const tr = locale === "tr";

  // Keep this engine deliberately conservative. It only answers when the
  // intent is clear enough to avoid inventing site-specific rules.
  if (
    hasAny(q, ["sarı kartlı iskele", "sari kartli iskele", "yellow tag scaffold", "yellow tagged scaffold"]) &&
    hasAny(q, ["kullan", "ne demek", "nedir", "use", "mean"])
  ) {
    return tr
      ? {
          title: "Sarı kartlı iskele",
          summary:
            "Sarı kartın anlamı site prosedürüne bağlıdır. Genelde kısıtlı veya şartlı kullanım belirtir; kart üzerindeki koşullar ve yetkili iskele kontrolü doğrulanmadan kullanılmamalıdır. Bazı sahalarda düşüş koruması şartı içerebilir, ancak sarı kart evrensel olarak ‘kemerle kullan’ anlamına gelmez.",
          sources: ["scaffolding.md"],
        }
      : {
          title: "Yellow-tagged scaffold",
          summary:
            "A yellow tag is site-procedure dependent. It usually indicates restricted or conditional use; the stated conditions and competent scaffold inspection must be verified before access. It can include fall-protection conditions on some sites, but it does not universally mean ‘harness-only use’.",
          sources: ["scaffolding.md"],
        };
  }

  if (
    hasAny(q, ["gaz ölçümü", "gaz olcumu", "gas test", "gas testing", "atmosfer ölçümü", "atmospheric test"]) &&
    hasAny(q, ["gerek", "şart", "sart", "sıcak", "sicak", "hot work", "kapalı", "kapali", "confined", "required", "need"])
  ) {
    return tr
      ? {
          title: "Gaz ölçümü",
          summary:
            "Gaz ölçümü yalnızca kapalı alanla sınırlı değildir. Kapalı alan girişlerinde ve yanıcı/toksik atmosfer ihtimali bulunan sıcak işlerde risk değerlendirmesi, izin ve saha prosedürüne göre gerekebilir. Ortam, proses ve iş koşulları belirleyicidir.",
          sources: ["confined-space.md", "hot-work.md"],
        }
      : {
          title: "Gas testing",
          summary:
            "Gas testing is not limited to confined spaces. It may also be required for hot work where a flammable or toxic atmosphere could be present, depending on the risk assessment, permit and site procedure. The process and work environment determine the requirement.",
          sources: ["confined-space.md", "hot-work.md"],
        };
  }

  if (
    hasAny(q, ["baret", "hard hat", "helmet", "baş koruma", "bas koruma"]) &&
    hasAny(q, ["gerek", "zorunlu", "tak", "required", "need", "wear"])
  ) {
    return tr
      ? {
          title: "Baret kullanımı",
          summary:
            "Baret yalnızca düşen cisim riski için kullanılmaz. Başın sabit cisimlere çarpması, elektriksel tehlikeler ve saha KKD kuralları da baret gerektirebilir. Gereklilik risk değerlendirmesi ve saha prosedürüne göre belirlenir.",
          sources: ["ppe.md"],
        }
      : {
          title: "Hard-hat use",
          summary:
            "Head protection is not only for falling-object hazards. Striking fixed objects, electrical exposure and site PPE rules can also require a hard hat. The final requirement follows the risk assessment and site procedure.",
          sources: ["ppe.md"],
        };
  }

  if (
    hasAny(q, ["loto nedir", "loto ne demek", "what is loto", "what does loto mean"]) ||
    q === "loto"
  ) {
    return tr
      ? {
          title: "LOTO",
          summary:
            "LOTO, tehlikeli enerji kaynaklarını izole edip kilit ve etiketle kontrol altına alma prosedürüdür; işe başlamadan önce sıfır enerji durumu doğrulanır.",
          sources: ["loto.md"],
        }
      : {
          title: "LOTO",
          summary:
            "LOTO is the process of isolating hazardous energy and controlling it with locks and tags, with zero-energy verification before work begins.",
          sources: ["loto.md"],
        };
  }

  if (
    hasAny(q, ["kırmızı kartlı iskele", "kirmizi kartli iskele", "red tag scaffold", "red tagged scaffold"])
  ) {
    return tr
      ? {
          title: "Kırmızı kartlı iskele",
          summary:
            "Kırmızı kartlı veya kullanıma kapatılmış iskele kullanılmamalıdır. Yetkili iskele ekibi kontrol edip uygun durumu yeniden onaylamadan erişim yapılmamalıdır.",
          sources: ["scaffolding.md"],
        }
      : {
          title: "Red-tagged scaffold",
          summary:
            "A red-tagged or closed scaffold must not be used. Access should resume only after the authorised scaffold team has inspected it and formally restored an acceptable status.",
          sources: ["scaffolding.md"],
        };
  }

  if (
    hasAny(q, ["yeşil kartlı iskele", "yesil kartli iskele", "green tag scaffold", "green tagged scaffold"]) &&
    hasAny(q, ["kullan", "güvenli", "guvenli", "use", "safe"])
  ) {
    return tr
      ? {
          title: "Yeşil kartlı iskele",
          summary:
            "Geçerli yeşil etiket tek başına yeterli değildir. Kullanıcı işe başlamadan önce erişim, platform, korkuluk, topuk levhası ve görünür hasarı kontrol etmeli; uygunsuzluk varsa iskeleyi kullanmamalıdır.",
          sources: ["scaffolding.md"],
        }
      : {
          title: "Green-tagged scaffold",
          summary:
            "A valid green tag is not enough by itself. Before use, check access, platforms, guardrails, toe boards and visible condition; do not use the scaffold if a defect is found.",
          sources: ["scaffolding.md"],
        };
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ matched: false }, { status: 401 });
    }

    const body = (await request.json()) as {
      question?: unknown;
      locale?: unknown;
    };

    const question = typeof body.question === "string" ? body.question.trim() : "";
    const locale: Locale = body.locale === "tr" ? "tr" : "en";

    if (!question || question.length > 220) {
      return Response.json({ matched: false });
    }

    const answer = findShortAnswer(question, locale);
    if (!answer) {
      return Response.json({ matched: false });
    }

    return Response.json({
      matched: true,
      data: buildResponse(answer),
      sources: answer.sources,
      answerKind: "knowledge-short",
      modelTokens: 0,
    });
  } catch (error) {
    console.error("SERNEM short-answer engine error:", error);
    return Response.json({ matched: false });
  }
}
