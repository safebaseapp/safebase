#!/usr/bin/env python3

from __future__ import annotations

import argparse
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
TOOLBOX_DIR = ROOT / "toolboxes"
REGISTRY_PATH = TOOLBOX_DIR / "__init__.py"


def normalize_slug(value: str) -> str:
    slug = value.strip().lower().replace("-", "_").replace(" ", "_")
    slug = re.sub(r"[^a-z0-9_]", "", slug)
    slug = re.sub(r"_+", "_", slug).strip("_")

    if not slug:
        raise ValueError("Geçerli bir konu adı girilmelidir.")

    return slug


def variable_name(slug: str) -> str:
    return slug.upper()


def display_title(slug: str) -> str:
    return slug.replace("_", " ").title()


def module_template(slug: str, tr_title: str, en_title: str) -> str:
    variable = variable_name(slug)
    base = slug.replace("_", "-") + "-toolbox-talk"

    return f'''"""SERNEM Toolbox Talk content module."""

{variable} = {{
    "base": "{base}",

    "tr": {{
        "title": "{tr_title.upper()} TOOLBOX TALK",
        "subtitle": "Konuya özel temel tehlikeleri ve kontrol önlemlerini değerlendirin.",
        "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
        "duration": "8–10 DAKİKA",

        "objective_title": "AMAÇ",
        "objective": (
            "Bu Toolbox Talk'ın amacı, işe başlamadan önce konuya özel tehlikeleri "
            "ekiple değerlendirmek ve gerekli kontrol önlemlerinin uygulandığını doğrulamaktır."
        ),

        "explanation_title": "KONU ANLATIMI",
        "explanation": [
            (
                "Bu bölüme konunun temel açıklaması eklenecektir."
            ),
            (
                "Bu bölüme sahada karşılaşılan yaygın hatalar ve riskler eklenecektir."
            ),
            (
                "Bu bölüme işe başlamadan önce uygulanması gereken temel kurallar eklenecektir."
            ),
        ],

        "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
        "scenario": [
            (
                "Bu bölüme gerçekçi bir saha senaryosunun başlangıcı eklenecektir."
            ),
            (
                "Bu bölüme olayın nasıl geliştiği ve hangi kontrollerin eksik olduğu eklenecektir."
            ),
            (
                "Bu bölüme olayın nasıl önlenebileceği eklenecektir."
            ),
        ],

        "remember_title": "UNUTMAYIN",
        "remember": (
            "Doğru planlama, uygun ekipman ve etkili saha kontrolü ciddi kazaları önler."
        ),

        "hazards_title": "TEMEL TEHLİKELER",
        "hazards": [
            "Tehlike 1.",
            "Tehlike 2.",
            "Tehlike 3.",
            "Tehlike 4.",
            "Tehlike 5.",
            "Tehlike 6.",
            "Tehlike 7.",
            "Tehlike 8.",
        ],

        "controls_title": "KONTROL ÖNLEMLERİ",
        "controls": [
            "Kontrol önlemi 1.",
            "Kontrol önlemi 2.",
            "Kontrol önlemi 3.",
            "Kontrol önlemi 4.",
            "Kontrol önlemi 5.",
            "Kontrol önlemi 6.",
            "Kontrol önlemi 7.",
            "Kontrol önlemi 8.",
            "Kontrol önlemi 9.",
            "Kontrol önlemi 10.",
        ],

        "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
        "supervisor_script": (
            "Arkadaşlar, bugün yapacağımız çalışmaya başlamadan önce bütün tehlikeleri "
            "ve kontrol önlemlerini birlikte doğrulayacağız. Uygunsuz bir durum görürsek "
            "işi başlatmayacak veya çalışmayı durduracağız."
        ),

        "questions_title": "EKİBE SORULACAK SORULAR",
        "questions": [
            "Bugünkü çalışma nerede yapılacak?",
            "Temel tehlikeler nelerdir?",
            "Gerekli ekipman kontrol edildi mi?",
            "Çalışma alanı güvenli mi?",
            "Acil durumda ne yapılacak?",
            "Koşullar değişirse çalışmayı kim durduracak?",
        ],

        "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
        "verification": [
            "İzin onaylı",
            "Risk değerlendirmesi uygun",
            "Ekipman kontrol edildi",
            "Çalışma alanı güvenli",
            "KKD uygun",
            "Yetkili gözetim hazır",
            "Bariyerleme tamam",
            "İletişim sağlandı",
            "Acil durum planı hazır",
            "Ekip bilgilendirildi",
        ],

        "attendance_title": "KATILIM VE ONAY",
        "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
        "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
        "notes_title": "Süpervizör notları / ek saha talimatları",
        "footer": (
            "SERNEM HSE Resource — Çalışma izni, risk değerlendirmesi ve "
            "saha prosedürleri önceliklidir."
        ),
    }},

    "en": {{
        "title": "{en_title.upper()} TOOLBOX TALK",
        "subtitle": "Review the key hazards and control measures associated with the task.",
        "application_subtitle": "Hazards, control measures and daily pre-work verification.",
        "duration": "8–10 MINUTES",

        "objective_title": "OBJECTIVE",
        "objective": (
            "The purpose of this Toolbox Talk is to review task-specific hazards with "
            "the team and verify that all required control measures are in place before work begins."
        ),

        "explanation_title": "TOPIC EXPLANATION",
        "explanation": [
            (
                "Add the main explanation of the topic in this section."
            ),
            (
                "Add common site errors and associated risks in this section."
            ),
            (
                "Add the essential rules that must be followed before starting work."
            ),
        ],

        "scenario_title": "REALISTIC SITE SCENARIO",
        "scenario": [
            (
                "Add the beginning of a realistic site scenario in this section."
            ),
            (
                "Explain how the event developed and which controls were missing."
            ),
            (
                "Explain how the event could have been prevented."
            ),
        ],

        "remember_title": "REMEMBER",
        "remember": (
            "Correct planning, suitable equipment and effective site control prevent serious incidents."
        ),

        "hazards_title": "KEY HAZARDS",
        "hazards": [
            "Hazard 1.",
            "Hazard 2.",
            "Hazard 3.",
            "Hazard 4.",
            "Hazard 5.",
            "Hazard 6.",
            "Hazard 7.",
            "Hazard 8.",
        ],

        "controls_title": "CONTROL MEASURES",
        "controls": [
            "Control measure 1.",
            "Control measure 2.",
            "Control measure 3.",
            "Control measure 4.",
            "Control measure 5.",
            "Control measure 6.",
            "Control measure 7.",
            "Control measure 8.",
            "Control measure 9.",
            "Control measure 10.",
        ],

        "supervisor_title": "SUPERVISOR TALKING SCRIPT",
        "supervisor_script": (
            "Team, before starting today's task, we will confirm all hazards and control "
            "measures together. If an unsafe condition is identified, the work will not "
            "start or will be stopped immediately."
        ),

        "questions_title": "DISCUSSION QUESTIONS",
        "questions": [
            "Where will today's work take place?",
            "What are the main hazards?",
            "Has the required equipment been inspected?",
            "Is the work area safe?",
            "What action will be taken during an emergency?",
            "Who will stop the work if conditions change?",
        ],

        "verification_title": "VERIFY BEFORE STARTING TODAY",
        "verification": [
            "Permit approved",
            "Risk assessment suitable",
            "Equipment inspected",
            "Work area safe",
            "PPE suitable",
            "Competent supervision ready",
            "Barricading complete",
            "Communication established",
            "Emergency plan ready",
            "Team briefed",
        ],

        "attendance_title": "ATTENDANCE AND APPROVAL",
        "fields": ["Project / Site", "Date", "Presented by", "Work area"],
        "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
        "notes_title": "Supervisor notes / additional site instructions",
        "footer": (
            "SERNEM HSE Resource — Permit conditions, risk assessments and "
            "site procedures take priority."
        ),
    }},
}}
'''


def update_registry(slug: str) -> None:
    variable = variable_name(slug)
    import_line = f"from .{slug} import {variable}"

    existing = REGISTRY_PATH.read_text(encoding="utf-8")

    if import_line in existing:
        print(f"ℹ️ Registry kaydı zaten mevcut: {import_line}")
        return

    import_lines = []
    variables = []

    for line in existing.splitlines():
        match = re.match(r"from \.(\w+) import (\w+)", line.strip())
        if match:
            import_lines.append(line.strip())
            variables.append(match.group(2))

    import_lines.append(import_line)
    variables.append(variable)

    import_lines = sorted(set(import_lines))
    variables = sorted(set(variables))

    registry = [
        '"""SERNEM Toolbox Talk content registry."""',
        "",
        *import_lines,
        "",
        "TOOLBOXES = [",
        *[f"    {name}," for name in variables],
        "]",
        "",
        '__all__ = ["TOOLBOXES"]',
        "",
    ]

    REGISTRY_PATH.write_text("\n".join(registry), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Yeni SERNEM Toolbox Talk modülü oluşturur."
    )
    parser.add_argument("slug", help="Örnek: safety_harness")
    parser.add_argument("--tr-title", help="Türkçe başlık")
    parser.add_argument("--en-title", help="İngilizce başlık")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Mevcut dosyanın üzerine yaz",
    )

    args = parser.parse_args()

    slug = normalize_slug(args.slug)
    target = TOOLBOX_DIR / f"{slug}.py"

    tr_title = args.tr_title or display_title(slug)
    en_title = args.en_title or display_title(slug)

    TOOLBOX_DIR.mkdir(parents=True, exist_ok=True)

    if target.exists() and not args.force:
        raise SystemExit(
            f"❌ Dosya zaten mevcut: {target}\n"
            "Üzerine yazmak için --force kullan."
        )

    target.write_text(
        module_template(slug, tr_title, en_title),
        encoding="utf-8",
    )

    update_registry(slug)

    print(f"✅ Toolbox modülü oluşturuldu: {target}")
    print(f"✅ Registry güncellendi: {REGISTRY_PATH}")
    print(f"✅ Değişken adı: {variable_name(slug)}")


if __name__ == "__main__":
    main()
