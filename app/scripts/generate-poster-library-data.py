#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENGINE_DIR = ROOT / "data" / "posters" / "engine"
TARGET = ROOT / "app" / "[locale]" / "posters" / "poster-data.ts"

CATEGORY_MAP = {
    "working-at-height-rules-poster": ("work-at-height", "🏗️"),
    "scaffold-safety-rules-poster": ("work-at-height", "🪜"),
    "hot-work-safety-rules-poster": ("hot-work", "🔥"),
    "confined-space-entry-rules-poster": ("confined-space", "⚠️"),
    "electrical-safety-rules-poster": ("electrical", "⚡"),
    "loto-golden-rules-poster": ("loto", "🔒"),
    "mandatory-ppe-poster": ("ppe", "🦺"),
}

def load_posters():
    posters = []

    for file in sorted(ENGINE_DIR.glob("*.json")):
        data = json.loads(file.read_text(encoding="utf-8"))

        if not isinstance(data, dict):
            raise RuntimeError(f"{file.name} JSON object olmalı.")

        if "base" not in data:
            raise RuntimeError(f"{file.name}: base eksik.")

        posters.append(data)

    return posters


def pick_text(data, lang, fallback=""):
    candidates = [
        data.get("title"),
        data.get(f"title_{lang}"),
        data.get("heading"),
        data.get(f"heading_{lang}"),
    ]

    for value in candidates:
        if isinstance(value, dict):
            text = value.get(lang)
            if isinstance(text, str) and text.strip():
                return text.strip()

        if isinstance(value, str) and value.strip():
            return value.strip()

    return fallback


def pick_description(data, lang, fallback=""):
    candidates = [
        data.get("description"),
        data.get(f"description_{lang}"),
        data.get("subtitle"),
        data.get(f"subtitle_{lang}"),
    ]

    for value in candidates:
        if isinstance(value, dict):
            text = value.get(lang)
            if isinstance(text, str) and text.strip():
                return text.strip()

        if isinstance(value, str) and value.strip():
            return value.strip()

    return fallback


def slug_from_base(base: str):
    for suffix in (
        "-poster",
        "-rules-poster",
        "-safety-rules-poster",
        "-entry-rules-poster",
    ):
        if base.endswith(suffix):
            return base[: -len(suffix)]

    return base


def make_ts(posters):
    items = []

    for data in posters:
        base = data["base"]
        slug = slug_from_base(base)

        category, icon = CATEGORY_MAP.get(
            base,
            ("general", "📌"),
        )

        title_tr = pick_text(
            data,
            "tr",
            slug.replace("-", " ").title(),
        )

        title_en = pick_text(
            data,
            "en",
            slug.replace("-", " ").title(),
        )

        desc_tr = pick_description(
            data,
            "tr",
            "Profesyonel HSE güvenlik posteri.",
        )

        desc_en = pick_description(
            data,
            "en",
            "Professional HSE safety poster.",
        )

        pdf_tr = f"/downloads/{base}-tr.pdf"
        pdf_en = f"/downloads/{base}-en.pdf"

        items.append(
f'''  {{
    slug: {json.dumps(slug, ensure_ascii=False)},
    icon: {json.dumps(icon, ensure_ascii=False)},
    category: {json.dumps(category)},
    title: {{
      tr: {json.dumps(title_tr, ensure_ascii=False)},
      en: {json.dumps(title_en, ensure_ascii=False)},
    }},
    description: {{
      tr: {json.dumps(desc_tr, ensure_ascii=False)},
      en: {json.dumps(desc_en, ensure_ascii=False)},
    }},
    pdf: {{
      tr: {json.dumps(pdf_tr)},
      en: {json.dumps(pdf_en)},
    }},
  }}'''
        )

    body = ",\n".join(items)

    return f'''export type PosterCategory =
  | "work-at-height"
  | "hot-work"
  | "confined-space"
  | "electrical"
  | "loto"
  | "ppe"
  | "general";

export type PosterItem = {{
  slug: string;
  icon: string;
  category: PosterCategory;
  title: {{
    tr: string;
    en: string;
  }};
  description: {{
    tr: string;
    en: string;
  }};
  pdf: {{
    tr: string;
    en: string;
  }};
}};

export const posterCategories = [
  {{
    id: "work-at-height",
    icon: "🏗️",
    tr: "Yüksekte Çalışma",
    en: "Working at Height",
  }},
  {{
    id: "hot-work",
    icon: "🔥",
    tr: "Sıcak Çalışma",
    en: "Hot Work",
  }},
  {{
    id: "confined-space",
    icon: "⚠️",
    tr: "Kapalı Alan",
    en: "Confined Space",
  }},
  {{
    id: "electrical",
    icon: "⚡",
    tr: "Elektrik",
    en: "Electrical",
  }},
  {{
    id: "loto",
    icon: "🔒",
    tr: "LOTO",
    en: "LOTO",
  }},
  {{
    id: "ppe",
    icon: "🦺",
    tr: "KKD",
    en: "PPE",
  }},
  {{
    id: "general",
    icon: "📌",
    tr: "Genel",
    en: "General",
  }},
] as const;

export const posters: PosterItem[] = [
{body}
];
'''


def main():
    posters = load_posters()

    if not posters:
        raise SystemExit("❌ Engine içinde poster bulunamadı.")

    output = make_ts(posters)

    TARGET.write_text(
        output,
        encoding="utf-8",
    )

    print(f"✅ poster-data.ts üretildi.")
    print(f"✅ Poster sayısı: {len(posters)}")
    print(f"✅ Kaynak: {ENGINE_DIR}")
    print(f"✅ Hedef: {TARGET}")


if __name__ == "__main__":
    main()
