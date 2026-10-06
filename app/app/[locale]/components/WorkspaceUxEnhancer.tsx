"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = { locale: "tr" | "en" };
type Command = { title: string; keywords: string; href: string; code: string };

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreCommand(item: Command, rawQuery: string) {
  const query = normalize(rawQuery);
  if (!query) return 1;

  const terms = query.split(/\s+/).filter(Boolean);
  const title = normalize(item.title);
  const keywords = normalize(item.keywords);
  const titleWords = title.split(/\s+/);
  const keywordWords = keywords.split(/\s+/);
  let score = 0;

  for (const term of terms) {
    const titleExact = titleWords.includes(term);
    const titlePrefix = titleWords.some((word) => word.startsWith(term));
    const keywordExact = keywordWords.includes(term);
    const keywordPrefix = keywordWords.some((word) => word.startsWith(term));
    const looseMatch = term.length >= 3 && `${title} ${keywords}`.includes(term);

    if (term.length === 1) {
      if (!titlePrefix && !keywordPrefix) return 0;
      score += titlePrefix ? 20 : 8;
      continue;
    }

    if (!titleExact && !titlePrefix && !keywordExact && !keywordPrefix && !looseMatch) return 0;
    if (titleExact) score += 40;
    else if (titlePrefix) score += 28;
    else if (keywordExact) score += 18;
    else if (keywordPrefix) score += 12;
    else score += 5;
  }

  if (title.startsWith(query)) score += 50;
  return score;
}

function monthLabel(value: string, locale: "tr" | "en") {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

export default function WorkspaceUxEnhancer({ locale }: Props) {
  const pathname = usePathname();
  const isTurkish = locale === "tr";

  useEffect(() => {
    if (!pathname) return;
    const cleanups: Array<() => void> = [];

    const publicPage = pathname.endsWith("/contact")
      ? "contact"
      : pathname.endsWith("/faq")
        ? "faq"
        : pathname.endsWith("/about")
          ? "about"
          : "";

    if (publicPage) document.body.dataset.sernemPublicPage = publicPage;
    else delete document.body.dataset.sernemPublicPage;

    if (pathname.endsWith("/dashboard")) {
      const searchText = Array.from(document.querySelectorAll<HTMLSpanElement>("main span")).find((node) => {
        const text = node.textContent?.replace(/\s+/g, " ").trim() ?? "";
        return text.startsWith("Ara… doküman") || text.startsWith("Search… document");
      });
      const searchHost = searchText?.parentElement instanceof HTMLDivElement ? searchText.parentElement : null;
      const safeSearchHost = searchHost && !searchHost.querySelector("section, aside, article, main") ? searchHost : null;

      if (safeSearchHost && safeSearchHost.dataset.commandSearch !== "ready") {
        safeSearchHost.dataset.commandSearch = "ready";
        safeSearchHost.innerHTML = "";
        safeSearchHost.style.position = "relative";
        safeSearchHost.style.display = "flex";

        const icon = document.createElement("span");
        icon.textContent = "⌕";
        icon.className = "mr-3 text-slate-500";

        const input = document.createElement("input");
        input.type = "search";
        input.autocomplete = "off";
        input.placeholder = isTurkish
          ? "Ara… risk analizi, toolbox, gözlem, rapor veya son çalışma"
          : "Search… risk assessment, toolbox, observation, report or recent work";
        input.className = "min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500";

        const clear = document.createElement("button");
        clear.type = "button";
        clear.textContent = "×";
        clear.className = "hidden px-2 text-lg text-blue-400 transition hover:text-white";

        const key = document.createElement("span");
        key.textContent = locale.toUpperCase();
        key.className = "ml-2 rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1 text-[10px] font-black text-slate-500";

        const dropdown = document.createElement("div");
        dropdown.className = "absolute left-0 right-0 top-[calc(100%+8px)] z-[80] hidden max-h-[360px] overflow-y-auto rounded-2xl border border-slate-700 bg-[#071423]/[.98] p-2 shadow-2xl shadow-black/50 backdrop-blur-xl";

        const commands: Command[] = [
          { title: isTurkish ? "Risk Analizi" : "Risk Assessment", keywords: "risk assessment hirarc analiz değerlendirme degerlendirme", href: `/${locale}/tools/quick-risk-assessment`, code: "RA" },
          { title: "Method Statement", keywords: "method statement yöntem yontem beyan work method", href: `/${locale}/tools/method-statement`, code: "MS" },
          { title: "Toolbox Talk", keywords: "toolbox talk tbm eğitim egitim", href: `/${locale}/toolbox`, code: "TB" },
          { title: isTurkish ? "Saha Kontrolleri" : "Field Inspections", keywords: "inspection checklist denetim kontrol saha", href: `/${locale}/checklists`, code: "FC" },
          { title: isTurkish ? "Gözlemler & Aksiyonlar" : "Observations & Actions", keywords: "observation action gözlem gozlem aksiyon", href: `/${locale}/hse-performance/observations`, code: "OA" },
          { title: isTurkish ? "Olay Yönetimi" : "Incident Management", keywords: "incident near miss olay ramak kala", href: `/${locale}/hse-performance/incidents`, code: "IM" },
          { title: isTurkish ? "Raporlar" : "Reports", keywords: "report reports rapor pdf excel csv", href: `/${locale}/hse-performance/report`, code: "RP" },
          { title: isTurkish ? "Trend Analizi" : "Trend Analysis", keywords: "trend analysis analiz trir ltifr severity performans", href: `/${locale}/hse-performance#trend`, code: "TA" },
          { title: isTurkish ? "İndirme Merkezi" : "Download Center", keywords: "download pdf poster resource indir indirme dosya", href: `/${locale}/downloads`, code: "DL" },
          { title: isTurkish ? "AI Asistan" : "AI Assistant", keywords: "ai assistant yapay zeka zekâ", href: `/${locale}/ai-assistant`, code: "AI" },
        ];

        Array.from(document.querySelectorAll<HTMLElement>("main a")).forEach((row) => {
          const status = row.textContent ?? "";
          if (!/(İNDİRİLDİ|DOWNLOADED|AÇILDI|OPENED|KAYDEDİLDİ|SAVED)/i.test(status)) return;
          const title = row.querySelector("p")?.textContent?.trim();
          const href = row.getAttribute("href");
          if (title && href) commands.push({ title, keywords: `recent son çalışma calisma ${title}`, href, code: "RW" });
        });

        const render = (query: string) => {
          dropdown.innerHTML = "";
          const ranked = commands
            .map((item) => ({ item, score: scoreCommand(item, query) }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, query.trim() ? 8 : 7);

          if (!ranked.length) {
            const empty = document.createElement("div");
            empty.className = "px-4 py-5 text-center text-xs text-slate-500";
            empty.textContent = isTurkish ? "Bu aramayla eşleşen sonuç yok." : "No matching result.";
            dropdown.appendChild(empty);
          } else {
            ranked.forEach(({ item }) => {
              const a = document.createElement("a");
              a.href = item.href;
              a.className = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-blue-500/[0.08] hover:text-white";
              a.innerHTML = `<span class="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/[0.07] text-[9px] font-black text-blue-300">${item.code}</span><span class="font-bold">${item.title}</span><span class="ml-auto text-slate-600">→</span>`;
              dropdown.appendChild(a);
            });
          }
          clear.classList.toggle("hidden", !query);
          dropdown.classList.remove("hidden");
        };

        const onInput = () => render(input.value);
        const onFocus = () => render(input.value);
        const onKey = (event: KeyboardEvent) => {
          if (event.key === "Escape") dropdown.classList.add("hidden");
          if (event.key === "Enter") {
            event.preventDefault();
            dropdown.querySelector<HTMLAnchorElement>("a")?.click();
          }
        };
        const onClear = () => {
          input.value = "";
          input.focus();
          render("");
        };
        const onDocumentClick = (event: MouseEvent) => {
          if (!safeSearchHost.contains(event.target as Node)) dropdown.classList.add("hidden");
        };

        input.addEventListener("input", onInput);
        input.addEventListener("focus", onFocus);
        input.addEventListener("keydown", onKey);
        clear.addEventListener("click", onClear);
        document.addEventListener("click", onDocumentClick);
        safeSearchHost.append(icon, input, clear, key, dropdown);
        cleanups.push(() => {
          input.removeEventListener("input", onInput);
          input.removeEventListener("focus", onFocus);
          input.removeEventListener("keydown", onKey);
          clear.removeEventListener("click", onClear);
          document.removeEventListener("click", onDocumentClick);
        });
      }

      Array.from(document.querySelectorAll<HTMLParagraphElement>("main p")).forEach((title) => {
        const text = title.textContent?.trim() ?? "";
        if (/^HSE Resource$/i.test(text)) {
          title.textContent = isTurkish ? "İndirilen HSE Kaynağı" : "Downloaded HSE Resource";
        }
        const match = text.match(/\s+(TR|EN)$/i);
        if (!match || title.dataset.languagePolished === "true") return;
        title.dataset.languagePolished = "true";
        title.textContent = text.replace(/\s+(TR|EN)$/i, "");
        const badge = document.createElement("span");
        badge.textContent = match[1].toUpperCase();
        badge.className = "ml-2 inline-flex rounded-md border border-blue-400/20 bg-blue-500/[0.08] px-1.5 py-0.5 align-middle text-[8px] font-black text-blue-300";
        title.appendChild(badge);
      });

      Array.from(document.querySelectorAll<HTMLParagraphElement>("main p")).forEach((meta) => {
        const text = meta.textContent ?? "";
        if (!/·\s*(PDF|DOCX|PNG|XLSX)/i.test(text) || meta.dataset.formatPolished === "true") return;
        meta.dataset.formatPolished = "true";
        const format = text.match(/·\s*(PDF|DOCX|PNG|XLSX)/i)?.[1]?.toUpperCase();
        if (!format) return;
        meta.innerHTML = meta.innerHTML.replace(new RegExp(`·\\s*${format}`, "i"), ` · <span class="inline-flex rounded-md border border-slate-700 bg-slate-950/50 px-1.5 py-0.5 text-[8px] font-black text-slate-400">${format}</span>`);
      });
    }

    if (
      /\/(tr|en)\/hse-performance\/?$/.test(pathname) &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      const monthInput = document.querySelector<HTMLInputElement>('input[type="month"]');
      const projectSelect = monthInput?.parentElement?.querySelector<HTMLSelectElement>("select") ?? null;
      if (monthInput && projectSelect && monthInput.dataset.nativePolished !== "true") {
        monthInput.dataset.nativePolished = "true";
        const parent = monthInput.parentElement;
        if (parent) {
          parent.classList.add("sernem-native-filterbar");
          monthInput.className = `${monthInput.className} sernem-native-month`;
          projectSelect.className = `${projectSelect.className} sernem-native-project`;

          const label = document.createElement("span");
          label.className = "sernem-period-label";
          label.textContent = isTurkish ? "DÖNEM" : "PERIOD";
          parent.insertBefore(label, monthInput);

          const value = document.createElement("span");
          value.className = "sernem-period-value";
          value.textContent = monthLabel(monthInput.value, locale);
          parent.insertBefore(value, monthInput);

          const syncLabel = () => { value.textContent = monthLabel(monthInput.value, locale); };
          monthInput.addEventListener("change", syncLabel);
          monthInput.addEventListener("input", syncLabel);
          cleanups.push(() => {
            monthInput.removeEventListener("change", syncLabel);
            monthInput.removeEventListener("input", syncLabel);
          });
        }
      }
    }

    const enhanceExplorer = () => {
      const explorer = document.getElementById("sernem-navigation");
      if (!explorer || explorer.dataset.backEnhanced === "true") return;
      explorer.dataset.backEnhanced = "true";
      const closeButton = explorer.querySelector<HTMLButtonElement>('button[aria-label*="kapat"], button[aria-label*="Close"], button[aria-label*="close"]');
      if (!closeButton) return;

      const back = document.createElement("button");
      back.type = "button";
      back.className = "fixed left-6 top-6 z-[10020] inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-[#071423]/95 px-4 text-xs font-black text-slate-200 shadow-xl backdrop-blur-xl transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white";
      back.textContent = pathname.endsWith("/dashboard")
        ? (isTurkish ? "← Dashboard'a Dön" : "← Back to Dashboard")
        : (isTurkish ? "← Geri" : "← Back");
      back.addEventListener("click", () => closeButton.click());
      explorer.appendChild(back);

      const onEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && document.body.contains(explorer)) closeButton.click();
      };
      document.addEventListener("keydown", onEscape);
      cleanups.push(() => document.removeEventListener("keydown", onEscape));
    };

    enhanceExplorer();
    const observer = new MutationObserver(enhanceExplorer);
    observer.observe(document.body, { childList: true, subtree: true });
    cleanups.push(() => observer.disconnect());

    return () => {
      delete document.body.dataset.sernemPublicPage;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname, locale, isTurkish]);

  return null;
}
