"use client";

import { useEffect } from "react";

type Access = "guest" | "free" | "premium";

type Props = {
  locale: "tr" | "en";
  access: Access;
  userScope: string | null;
};

type MemoryTurn = {
  role: "user" | "assistant";
  content: string;
  at: number;
};

type StoredMemory = {
  version: 1;
  updatedAt: number;
  turns: MemoryTurn[];
};

type StructuredAnswer = {
  title?: unknown;
  summary?: unknown;
  riskLevel?: unknown;
  criticalControls?: unknown;
  stopWorkConditions?: unknown;
  recommendation?: unknown;
};

const MEMORY_VERSION = 1;
const MAX_MEMORY_TURNS = 12;
const MAX_CONTEXT_MESSAGES = 10;
const MAX_TURN_CHARS = 1800;
const MEMORY_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function storageKey(userScope: string, locale: "tr" | "en") {
  return `sernem-ai-conversation-memory:v${MEMORY_VERSION}:${userScope}:${locale}`;
}

function cleanText(value: unknown, limit = MAX_TURN_CHARS) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, limit);
}

function normalizeTurns(value: unknown): MemoryTurn[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const role = row.role === "assistant" ? "assistant" : row.role === "user" ? "user" : null;
      const content = cleanText(row.content);
      const at = typeof row.at === "number" && Number.isFinite(row.at) ? row.at : Date.now();
      if (!role || !content) return null;
      return { role, content, at } satisfies MemoryTurn;
    })
    .filter((turn): turn is MemoryTurn => Boolean(turn))
    .slice(-MAX_MEMORY_TURNS);
}

function readMemory(key: string): StoredMemory | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredMemory>;
    const updatedAt = typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0;

    if (parsed.version !== MEMORY_VERSION || !updatedAt || Date.now() - updatedAt > MEMORY_MAX_AGE_MS) {
      window.localStorage.removeItem(key);
      return null;
    }

    const turns = normalizeTurns(parsed.turns);
    if (!turns.length) return null;

    return {
      version: MEMORY_VERSION,
      updatedAt,
      turns,
    };
  } catch {
    return null;
  }
}

function writeMemory(key: string, turns: MemoryTurn[]) {
  try {
    const safeTurns = turns
      .map((turn) => ({
        role: turn.role,
        content: cleanText(turn.content),
        at: Number.isFinite(turn.at) ? turn.at : Date.now(),
      }))
      .filter((turn) => turn.content)
      .slice(-MAX_MEMORY_TURNS);

    if (!safeTurns.length) {
      window.localStorage.removeItem(key);
      return;
    }

    const payload: StoredMemory = {
      version: MEMORY_VERSION,
      updatedAt: Date.now(),
      turns: safeTurns,
    };

    window.localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Conversation memory is an enhancement; restricted storage must not break AI usage.
  }
}

function clearMemory(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage failures.
  }
}

function normalizeOutgoingMessages(value: unknown): MemoryTurn[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const row = message as Record<string, unknown>;
      const role = row.role === "assistant" ? "assistant" : row.role === "user" ? "user" : null;
      const content = cleanText(row.content);
      if (!role || !content) return null;
      return { role, content, at: Date.now() } satisfies MemoryTurn;
    })
    .filter((turn): turn is MemoryTurn => Boolean(turn));
}

function mergeContext(memoryTurns: MemoryTurn[], outgoingTurns: MemoryTurn[]) {
  const merged: MemoryTurn[] = [];

  for (const turn of [...memoryTurns, ...outgoingTurns]) {
    const duplicate = merged.some(
      (existing) => existing.role === turn.role && existing.content === turn.content,
    );
    if (!duplicate) merged.push(turn);
  }

  return merged.slice(-MAX_CONTEXT_MESSAGES).map(({ role, content }) => ({ role, content }));
}

function toStringList(value: unknown, maxItems: number) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(item, 360)).filter(Boolean).slice(0, maxItems);
}

function compactStructuredAnswer(data: unknown, locale: "tr" | "en") {
  if (!data || typeof data !== "object") return "";
  const answer = data as StructuredAnswer;

  const title = cleanText(answer.title, 260);
  const summary = cleanText(answer.summary, 700);
  const riskLevel = cleanText(answer.riskLevel, 40);
  const controls = toStringList(answer.criticalControls, 4);
  const stopWork = toStringList(answer.stopWorkConditions, 3);
  const recommendation = cleanText(answer.recommendation, 520);

  const tr = locale === "tr";
  const parts = [
    title,
    summary,
    riskLevel ? `${tr ? "Risk seviyesi" : "Risk level"}: ${riskLevel}` : "",
    controls.length
      ? `${tr ? "Kritik kontroller" : "Critical controls"}: ${controls.join("; ")}`
      : "",
    stopWork.length
      ? `${tr ? "Çalışmayı durdurma koşulları" : "Stop-work conditions"}: ${stopWork.join("; ")}`
      : "",
    recommendation
      ? `${tr ? "Öneri" : "Recommendation"}: ${recommendation}`
      : "",
  ].filter(Boolean);

  return cleanText(parts.join(" | "));
}

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

export default function AIConversationMemory({ locale, access, userScope }: Props) {
  useEffect(() => {
    if (access === "guest" || !userScope) return;

    const key = storageKey(userScope, locale);
    const previousFetch = window.fetch.bind(window);

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button");
      if (!button) return;

      const text = button.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
      const isNewChat =
        text === "yeni sohbet" ||
        text === "new chat" ||
        text.endsWith(" yeni sohbet") ||
        text.endsWith(" new chat");

      if (isNewChat) clearMemory(key);
    };

    document.addEventListener("click", onDocumentClick, true);

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = getRequestUrl(input);
      const isAskRequest = url.includes("/api/ask");

      if (!isAskRequest || typeof init?.body !== "string") {
        return previousFetch(input, init);
      }

      let requestBody: Record<string, unknown> | null = null;
      try {
        const parsed = JSON.parse(init.body) as unknown;
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          requestBody = parsed as Record<string, unknown>;
        }
      } catch {
        return previousFetch(input, init);
      }

      if (!requestBody) return previousFetch(input, init);

      const memory = readMemory(key);
      const outgoingTurns = normalizeOutgoingMessages(requestBody.messages);
      const memoryTurns = memory?.turns ?? [];

      requestBody.messages = mergeContext(memoryTurns, outgoingTurns);

      const forwardedInit: RequestInit = {
        ...init,
        body: JSON.stringify(requestBody),
      };

      const response = await previousFetch(input, forwardedInit);
      if (!response.ok) return response;

      const question = cleanText(requestBody.question, MAX_TURN_CHARS);
      if (!question) return response;

      try {
        const contentType = response.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) return response;

        const payload = (await response.clone().json().catch(() => null)) as
          | { data?: unknown }
          | null;
        const assistantContext = compactStructuredAnswer(payload?.data, locale);
        if (!assistantContext) return response;

        const latest = readMemory(key)?.turns ?? memoryTurns;
        writeMemory(key, [
          ...latest,
          { role: "user", content: question, at: Date.now() },
          { role: "assistant", content: assistantContext, at: Date.now() },
        ]);
      } catch {
        // Memory persistence must never interfere with the live answer.
      }

      return response;
    };

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.fetch = previousFetch;
    };
  }, [access, locale, userScope]);

  return null;
}
