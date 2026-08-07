#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

ENGINE_DIR = ROOT / "data" / "posters" / "engine"
DRAFT_DIR = ROOT / "data" / "posters" / "drafts"
GENERATOR = ROOT / "scripts" / "generate-posters.py"


ENGINE_DIR.mkdir(parents=True, exist_ok=True)
DRAFT_DIR.mkdir(parents=True, exist_ok=True)


def load_json(path: Path):
    try:
        return json.loads(
            path.read_text(encoding="utf-8")
        )
    except json.JSONDecodeError as exc:
        raise SystemExit(
            f"❌ JSON hatası: {path}\n{exc}"
        )


def existing_posters():
    posters = []

    for path in sorted(ENGINE_DIR.glob("*.json")):
        data = load_json(path)

        posters.append(
            {
                "file": path,
                "data": data,
            }
        )

    return posters


def validate_poster(data: dict, source_name: str = ""):
    errors = []

    if not isinstance(data, dict):
        return [
            f"{source_name}: poster kök yapısı object olmalı."
        ]

    # Mevcut engine'in kesin ihtiyaç duyduğu alan.
    base = data.get("base")

    if not isinstance(base, str) or not base.strip():
        errors.append(
            "'base' alanı eksik veya geçersiz."
        )

    # Güvenlik için mevcut poster şemasını referans al.
    refs = existing_posters()

    if refs:
        reference = refs[0]["data"]

        reference_keys = set(reference.keys())
        current_keys = set(data.keys())

        missing = sorted(
            reference_keys - current_keys
        )

        if missing:
            errors.append(
                "Referans poster şemasına göre eksik "
                "üst seviye alanlar: "
                + ", ".join(missing)
            )

    # Genel içerik kontrolleri.
    for key, value in data.items():
        if value is None:
            errors.append(
                f"'{key}' alanı null olamaz."
            )

    return errors


def list_posters():
    posters = existing_posters()

    print()
    print("SafeBase Poster Engine")
    print("=" * 76)

    for index, poster in enumerate(
        posters,
        start=1,
    ):
        data = poster["data"]

        print(
            f"{index:>2}. "
            f"{data.get('base', 'UNKNOWN'):<42} "
            f"{poster['file'].name}"
        )

    print("=" * 76)
    print(
        f"✅ Engine poster sayısı: {len(posters)}"
    )


def validate_all():
    posters = existing_posters()

    failed = False

    print()
    print("Poster validation")
    print("=" * 76)

    for poster in posters:
        errors = validate_poster(
            poster["data"],
            poster["file"].name,
        )

        if errors:
            failed = True

            print(
                f"❌ {poster['file'].name}"
            )

            for error in errors:
                print(f"   - {error}")

        else:
            print(
                f"✅ {poster['file'].name}"
            )

    print("=" * 76)

    if failed:
        raise SystemExit(
            "❌ Poster doğrulama başarısız."
        )

    print(
        f"✅ {len(posters)} poster doğrulandı."
    )


def install_poster(source: Path):
    if not source.exists():
        raise SystemExit(
            f"❌ Dosya bulunamadı: {source}"
        )

    data = load_json(source)

    errors = validate_poster(
        data,
        source.name,
    )

    if errors:
        print(
            f"❌ {source.name} engine'e eklenmedi."
        )

        for error in errors:
            print(f"   - {error}")

        raise SystemExit(1)

    base = data["base"].strip()

    destination = (
        ENGINE_DIR / f"{base}.json"
    )

    if destination.exists():
        backup = destination.with_suffix(
            ".json.backup"
        )

        shutil.copy2(
            destination,
            backup,
        )

        print(
            f"💾 Backup: {backup.name}"
        )

    destination.write_text(
        json.dumps(
            data,
            ensure_ascii=False,
            indent=2,
        ) + "\n",
        encoding="utf-8",
    )

    print(
        f"✅ Engine'e eklendi: "
        f"{destination.name}"
    )


def generate():
    print()
    print("Poster generator çalıştırılıyor...")
    print("=" * 76)

    result = subprocess.run(
        [
            sys.executable,
            str(GENERATOR),
        ],
        cwd=ROOT,
    )

    if result.returncode != 0:
        raise SystemExit(
            "❌ Poster generator başarısız."
        )

    print("=" * 76)
    print("✅ Poster generation tamamlandı.")


def main():
    parser = argparse.ArgumentParser(
        description=(
            "SafeBase JSON Poster Builder"
        )
    )

    parser.add_argument(
        "--list",
        action="store_true",
        help="Engine posterlerini listele.",
    )

    parser.add_argument(
        "--validate",
        action="store_true",
        help="Tüm engine posterlerini doğrula.",
    )

    parser.add_argument(
        "--install",
        type=str,
        help=(
            "Tam poster JSON dosyasını "
            "engine'e ekle."
        ),
    )

    parser.add_argument(
        "--generate",
        action="store_true",
        help="Poster PDF generator'ı çalıştır.",
    )

    args = parser.parse_args()

    action = False

    if args.list:
        list_posters()
        action = True

    if args.validate:
        validate_all()
        action = True

    if args.install:
        source = Path(args.install)

        if not source.is_absolute():
            source = ROOT / source

        install_poster(source)
        action = True

    if args.generate:
        generate()
        action = True

    if not action:
        parser.print_help()


if __name__ == "__main__":
    main()
