"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = { locale: "tr" | "en" };

type Command = { title: string; keywords: string; href: string; code: string };

function setNativeValue(element: HTMLInputElement | HTMLSelectElement, value: string) {
  const prototype = element instanceof HTMLInputElement
    ? HTMLInputElement.prototype
    : HTMLSelectElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
  descriptor?.set?.call(element, value);
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
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

    if (pathname.endsWith("/dashboard")) {
      const searchText = Array.from(document.querySelectorAll<HTMLSpanElement>("main span")).find((node) => {
        const text = node.textContent?.replace(/\s+/g, " ").trim() ?? "";
        return text.startsWith("Ara… doküman") || text.startsWith("Search… document");
      });

      const searchHost = searchText?.parentElement instanceof HTMLDivElement
        ? searchText.parentElement
        : null;

      const safeSearchHost = searchHost && !searchHost.querySelector("section, aside, article, main")
        ? searchHost
        : null;

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

        const key = document.createElement("span");
        key.textContent = locale.toUpperCase();
        key.className = "ml-3 rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1 text-[10px] font-black text-slate-500";

        const dropdown = document.createElement("div");
        dropdown.className = "absolute left-0 right-0 top-[calc(100%+8px)] z-[80] hidden max-h-[360px] overflow-y-auto rounded-2xl border border-slate-700 bg-[#071423]/[.98] p-2 shadow-2xl shadow-black/50 backdrop-blur-xl";

        const commands: Command[] = [
          { title: isTurkish ? "Risk Analizi" : "Risk Assessment", keywords: "risk assessment hirarc analiz", href: `/${locale}/tools/quick-risk-assessment`, code: "RA" },
          { title: "Method Statement", keywords: "method statement yöntem beyan", href: `/${locale}/tools/method-statement`, code: "MS" },
          { title: "Toolbox Talk", keywords: "toolbox talk tbm", href: `/${locale}/toolbox`, code: "TB" },
          { title: isTurkish ? "Saha Kontrolleri" : "Field Inspections", keywords: "inspection checklist denetim kontrol", href: `/${locale}/checklists`, code: "FC" },
          { title: isTurkish ? "Gözlemler & Aksiyonlar" : "Observations & Actions", keywords: "observation action gözlem aksiyon", href: `/${locale}/hse-performance/observations`, code: "OA" },
          { title: isTurkish ? "Olay Yönetimi" : "Incident Management", keywords: "incident near miss olay ramak kala", href: `/${locale}/hse-performance/incidents`, code: "IM" },
          { title: isTurkish ? "Raporlar" : "Reports", keywords: "report reports rapor pdf excel", href: `/${locale}/hse-performance/report`, code: "RP" },
          { title: isTurkish ? "Trend Analizi" : "Trend Analysis", keywords: "trend analysis trir ltifr severity", href: `/${locale}/hse-performance#trend`, code: "TA" },
          { title: isTurkish ? "İndirme Merkezi" : "Download Center", keywords: "download pdf poster resource indir", href: `/${locale}/downloads`, code: "DL" },
          { title: isTurkish ? "AI Asistan" : "AI Assistant", keywords: "ai assistant yapay zeka", href: `/${locale}/ai-assistant`, code: "AI" },
        ];

        const recentRows = Array.from(document.querySelectorAll<HTMLElement>("main a, main section div")).filter((node) => {
          const status = node.textContent ?? "";
          return /(İNDİRİLDİ|DOWNLOADED|AÇILDI|OPENED|KAYDEDİLDİ|SAVED)/i.test(status) && node.querySelector("p");
        });

        recentRows.slice(0, 8).forEach((row) => {
          const title = row.querySelector("p")?.textContent?.trim();
          const href = row instanceof HTMLAnchorElement ? row.getAttribute("href") : row.closest("a")?.getAttribute("href");
          if (title && href) commands.push({ title, keywords: `recent son çalışma ${title}`, href, code: "RW" });
        });

        const render = (query: string) => {
          const normalized = query.trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
          dropdown.innerHTML = "";
          const results = normalized
            ? commands.filter((item) => `${item.title} ${item.keywords}`.toLocaleLowerCase().includes(normalized)).slice(0, 8)
            : commands.slice(0, 7);

          if (!results.length) {
            const empty = document.createElement("div");
            empty.className = "px-4 py-5 text-center text-xs text-slate-500";
            empty.textContent = isTurkish ? "Sonuç bulunamadı." : "No results found.";
            dropdown.appendChild(empty);
          } else {
            results.forEach((item) => {
              const a = document.createElement("a");
              a.href = item.href;
              a.className = "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-blue-500/[0.08] hover:text-white";
              a.innerHTML = `<span class=\"flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/[0.07] text-[9px] font-black text-blue-300\">${item.code}</span><span class=\"font-bold\">${item.title}</span><span class=\"ml-auto text-slate-600\">→</span>`;
              dropdown.appendChild(a);
            });
          }
          dropdown.classList.remove("hidden");
        };

        const onInput = () => render(input.value);
        const onFocus = () => render(input.value);
        const onKey = (event: KeyboardEvent) => {
          if (event.key === "Escape") dropdown.classList.add("hidden");
          if (event.key === "Enter") {
            const first = dropdown.querySelector<HTMLAnchorElement>("a");
            if (first) window.location.href = first.href;
          }
        };
        const onDocumentClick = (event: MouseEvent) => {
          if (!safeSearchHost.contains(event.target as Node)) dropdown.classList.add("hidden");
        };

        input.addEventListener("input", onInput);
        input.addEventListener("focus", onFocus);
        input.addEventListener("keydown", onKey);
        document.addEventListener("click", onDocumentClick);
        safeSearchHost.append(icon, input, key, dropdown);

        cleanups.push(() => {
          input.removeEventListener("input", onInput);
          input.removeEventListener("focus", onFocus);
          input.removeEventListener("keydown", onKey);
          document.removeEventListener("click", onDocumentClick);
        });
      }

      Array.from(document.querySelectorAll<HTMLParagraphElement>("main p")).forEach((title) => {
        const text = title.textContent?.trim() ?? "";
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
        meta.innerHTML = meta.innerHTML.replace(new RegExp(`·\\s*${format}`, "i"), ` · <span class=\"inline-flex rounded-md border border-slate-700 bg-slate-950/50 px-1.5 py-0.5 text-[8px] font-black text-slate-400\">${format}</span>`);
      });
    }

    if (/\/(tr|en)\/hse-performance\/?$/.test(pathname)) {
      const monthInput = document.querySelector<HTMLInputElement>('input[type="month"]');
      const projectSelect = monthInput?.parentElement?.querySelector<HTMLSelectElement>("select") ?? null;

      if (monthInput && projectSelect && monthInput.dataset.filterPolished !== "true") {
        monthInput.dataset.filterPolished = "true";
        const parent = monthInput.parentElement;
        if (parent) {
          const filterBar = document.createElement("div");
          filterBar.className = "flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-[#061524] p-2 shadow-lg shadow-black/10";

          const periodWrap = document.createElement("label");
          periodWrap.className = "flex min-w-[190px] items-center gap-2 rounded-xl border border-slate-700 bg-[#07111f] px-3 py-2";
          const periodLabel = document.createElement("span");
          periodLabel.className = "text-[9px] font-black uppercase tracking-wider text-slate-500";
          periodLabel.textContent = isTurkish ? "Dönem" : "Period";
          const periodValue = document.createElement("span");
          periodValue.className = "flex-1 text-xs font-black text-slate-200";
          periodValue.textContent = monthLabel(monthInput.value, locale);
          const picker = monthInput.cloneNode(true) as HTMLInputElement;
          picker.className = "absolute h-0 w-0 opacity-0";
          picker.tabIndex = -1;
          const openPicker = document.createElement("button");
          openPicker.type = "button";
          openPicker.className = "rounded-lg border border-blue-500/20 bg-blue-500/[0.07] px-2 py-1 text-[10px] font-black text-blue-300";
          openPicker.textContent = "▣";
          periodWrap.append(periodLabel, periodValue, openPicker, picker);

          const customPicker = document.createElement("input");
          customPicker.type = "month";
          customPicker.value = monthInput.value;
          customPicker.className = "absolute -left-[9999px]";
          document.body.appendChild(customPicker);

          const applyMonth = (value: string) => {
            if (!value) return;
            setNativeValue(monthInput, value);
            periodValue.textContent = monthLabel(value, locale);
            customPicker.value = value;
          };

          openPicker.addEventListener("click", () => {
            if (typeof customPicker.showPicker === "function") customPicker.showPicker();
            else customPicker.click();
          });
          customPicker.addEventListener("change", () => applyMonth(customPicker.value));

          const projectCopy = projectSelect.cloneNode(true) as HTMLSelectElement;
          projectCopy.className = "min-w-[170px] rounded-xl border border-slate-700 bg-[#07111f] px-3 py-2.5 text-xs font-black text-slate-200 outline-none focus:border-blue-500/50";
          projectCopy.setAttribute("aria-label", isTurkish ? "Proje filtresi" : "Project filter");
          projectCopy.addEventListener("change", () => setNativeValue(projectSelect, projectCopy.value));

          filterBar.append(periodWrap, projectCopy);
          parent.insertBefore(filterBar, monthInput);
          monthInput.style.display = "none";
          projectSelect.style.display = "none";

          cleanups.push(() => customPicker.remove());
        }
      }
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname, locale, isTurkish]);

  return null;
}
