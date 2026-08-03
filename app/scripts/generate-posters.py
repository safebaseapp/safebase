from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

OUT = Path("public/downloads")
OUT.mkdir(parents=True, exist_ok=True)

regular_path = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
bold_path = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")

if regular_path.exists() and bold_path.exists():
    pdfmetrics.registerFont(TTFont("SB-Regular", str(regular_path)))
    pdfmetrics.registerFont(TTFont("SB-Bold", str(bold_path)))
    REGULAR = "SB-Regular"
    BOLD = "SB-Bold"
else:
    REGULAR = "Helvetica"
    BOLD = "Helvetica-Bold"

NAVY = HexColor("#061329")
DARK = HexColor("#0F172A")
SLATE = HexColor("#475569")
LIGHT = HexColor("#F8FAFC")
BORDER = HexColor("#CBD5E1")

COLORS = [
    HexColor("#DC2626"),
    HexColor("#EA580C"),
    HexColor("#16A34A"),
    HexColor("#2563EB"),
    HexColor("#7C3AED"),
    HexColor("#0891B2"),
]


def draw_text(c, value, x, y, size, font=REGULAR, color=DARK):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def draw_centered(c, value, x, y, size, font=BOLD, color=white):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawCentredString(x, y, value)


def wrap_lines(c, value, max_width, font=REGULAR, size=9.2):
    words = value.split()
    lines = []
    line = ""

    for word in words:
        candidate = f"{line} {word}".strip()

        if c.stringWidth(candidate, font, size) <= max_width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word

    if line:
        lines.append(line)

    return lines


def create_poster(
    filename,
    title,
    subtitle,
    alert,
    blocks,
    footer_title,
    footer_items,
):
    path = OUT / filename
    c = canvas.Canvas(str(path), pagesize=A4)
    width, height = A4

    c.setFillColor(LIGHT)
    c.rect(0, 0, width, height, fill=1, stroke=0)

    # Header
    c.setFillColor(NAVY)
    c.rect(0, height - 59 * mm, width, 59 * mm, fill=1, stroke=0)

    draw_centered(c, title, width / 2, height - 23 * mm, 21)
    draw_centered(
        c,
        subtitle,
        width / 2,
        height - 35 * mm,
        10.5,
        REGULAR,
        HexColor("#BFDBFE"),
    )

    c.setFillColor(HexColor("#DC2626"))
    c.roundRect(
        18 * mm,
        height - 52 * mm,
        width - 36 * mm,
        10 * mm,
        4 * mm,
        fill=1,
        stroke=0,
    )
    draw_centered(c, alert, width / 2, height - 48.5 * mm, 10.5)

    # Content blocks
    y = height - 71 * mm
    gap = 5 * mm
    available_height = y - 45 * mm
    block_h = (available_height - gap * (len(blocks) - 1)) / len(blocks)

    for index, block in enumerate(blocks):
        heading = block["heading"]
        items = block["items"]
        color = COLORS[index % len(COLORS)]

        c.setFillColor(white)
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.8)
        c.roundRect(
            16 * mm,
            y - block_h,
            width - 32 * mm,
            block_h,
            5 * mm,
            fill=1,
            stroke=1,
        )

        c.setFillColor(color)
        c.roundRect(
            16 * mm,
            y - block_h,
            31 * mm,
            block_h,
            5 * mm,
            fill=1,
            stroke=0,
        )

        draw_centered(
            c,
            f"{index + 1:02d}",
            31.5 * mm,
            y - block_h / 2 - 2 * mm,
            22,
        )

        draw_text(
            c,
            heading,
            54 * mm,
            y - 10 * mm,
            12.3,
            BOLD,
            color,
        )

        bullet_y = y - 21 * mm

        for item in items:
            lines = wrap_lines(
                c,
                item,
                width - 76 * mm,
                REGULAR,
                8.8,
            )

            c.setFillColor(color)
            c.circle(
                56 * mm,
                bullet_y + 1.1 * mm,
                1.2 * mm,
                fill=1,
                stroke=0,
            )

            for line in lines:
                draw_text(
                    c,
                    line,
                    62 * mm,
                    bullet_y,
                    8.8,
                    REGULAR,
                    SLATE,
                )
                bullet_y -= 6.4 * mm

            bullet_y -= 2.2 * mm

        y -= block_h + gap

    # Footer
    c.setFillColor(NAVY)
    c.roundRect(
        16 * mm,
        14 * mm,
        width - 32 * mm,
        34 * mm,
        5 * mm,
        fill=1,
        stroke=0,
    )

    draw_centered(c, footer_title, width / 2, 39 * mm, 10.5)

    column_width = (width - 48 * mm) / 2

    for index, item in enumerate(footer_items):
        col = index % 2
        row = index // 2
        x = 24 * mm + col * column_width
        footer_y = 30 * mm - row * 8 * mm
        draw_text(c, f"✓ {item}", x, footer_y, 8.5, REGULAR, white)

    c.save()
    print(f"✅ Created: {path}")


POSTERS = [
    {
        "base": "mandatory-ppe-poster",
        "tr": {
            "title": "ZORUNLU KİŞİSEL KORUYUCU DONANIM",
            "subtitle": "MANDATORY PERSONAL PROTECTIVE EQUIPMENT",
            "alert": "İŞE BAŞLAMADAN ÖNCE DOĞRU KKD'Yİ KULLAN",
            "blocks": [
                {
                    "heading": "BAŞ KORUMASI",
                    "items": [
                        "Onaylı ve hasarsız baret kullan.",
                        "Gereken alanlarda çene bağını tak.",
                    ],
                },
                {
                    "heading": "GÖZ VE YÜZ KORUMASI",
                    "items": [
                        "Yan korumalı güvenlik gözlüğü kullan.",
                        "Taşlama ve kesmede yüz siperi kullan.",
                    ],
                },
                {
                    "heading": "EL KORUMASI",
                    "items": [
                        "Tehlikeye ve göreve uygun eldiven seç.",
                        "Hasarlı veya kirlenmiş eldiveni değiştir.",
                    ],
                },
                {
                    "heading": "AYAK KORUMASI",
                    "items": [
                        "Uygun güvenlik ayakkabısı kullan.",
                        "Kaymaz ve delinmeye dayanıklı tabanı kontrol et.",
                    ],
                },
                {
                    "heading": "İŞİTME KORUMASI",
                    "items": [
                        "Gürültülü alanlarda kulaklık veya tıkaç kullan.",
                        "Koruyucunun doğru takıldığını kontrol et.",
                    ],
                },
                {
                    "heading": "YÜKSEKTE ÇALIŞMA",
                    "items": [
                        "Tam vücut emniyet kemeri kullan.",
                        "Onaylı ankraj ve uygun lanyard kullan.",
                    ],
                },
            ],
            "footer_title": "İŞE BAŞLAMADAN ÖNCE",
            "footer_items": [
                "KKD'ni kontrol et",
                "İşe uygun ekipmanı seç",
                "Hasarlı KKD kullanma",
                "Eksik KKD ile çalışma",
            ],
        },
        "en": {
            "title": "MANDATORY PERSONAL PROTECTIVE EQUIPMENT",
            "subtitle": "SAFEBASE PPE REQUIREMENTS",
            "alert": "WEAR THE CORRECT PPE BEFORE STARTING WORK",
            "blocks": [
                {
                    "heading": "HEAD PROTECTION",
                    "items": [
                        "Wear an approved and undamaged safety helmet.",
                        "Use a chin strap where required.",
                    ],
                },
                {
                    "heading": "EYE AND FACE PROTECTION",
                    "items": [
                        "Wear safety glasses with side protection.",
                        "Use a face shield for grinding and cutting.",
                    ],
                },
                {
                    "heading": "HAND PROTECTION",
                    "items": [
                        "Select gloves suitable for the task and hazard.",
                        "Replace damaged or contaminated gloves.",
                    ],
                },
                {
                    "heading": "FOOT PROTECTION",
                    "items": [
                        "Wear suitable safety footwear.",
                        "Check slip and penetration resistance.",
                    ],
                },
                {
                    "heading": "HEARING PROTECTION",
                    "items": [
                        "Use earplugs or earmuffs in noisy areas.",
                        "Confirm the protection is fitted correctly.",
                    ],
                },
                {
                    "heading": "WORKING AT HEIGHT",
                    "items": [
                        "Use a full-body harness.",
                        "Use an approved anchorage and suitable lanyard.",
                    ],
                },
            ],
            "footer_title": "BEFORE STARTING WORK",
            "footer_items": [
                "Inspect your PPE",
                "Select task-specific PPE",
                "Do not use damaged PPE",
                "Do not work with missing PPE",
            ],
        },
    },
    {
        "base": "loto-golden-rules-poster",
        "tr": {
            "title": "LOTO ALTIN KURALLARI",
            "subtitle": "LOCKOUT / TAGOUT GOLDEN RULES",
            "alert": "KİLİTLE • ETİKETLE • DOĞRULA",
            "blocks": [
                {
                    "heading": "ENERJİ KAYNAKLARINI BELİRLE",
                    "items": [
                        "Tüm elektriksel, mekanik ve basınçlı enerji kaynaklarını belirle.",
                    ],
                },
                {
                    "heading": "EKİPMANI DURDUR",
                    "items": [
                        "Normal durdurma prosedürünü uygula ve etkilenenleri bilgilendir.",
                    ],
                },
                {
                    "heading": "İZOLE ET",
                    "items": [
                        "Tüm gerekli izolasyon noktalarını güvenli konuma getir.",
                    ],
                },
                {
                    "heading": "KİLİTLE VE ETİKETLE",
                    "items": [
                        "Her çalışan kendi kişisel kilidini ve etiketini uygulasın.",
                    ],
                },
                {
                    "heading": "DEPOLANMIŞ ENERJİYİ BOŞALT",
                    "items": [
                        "Basınç, yay, kapasitör ve hareket enerjisini güvenli hale getir.",
                    ],
                },
                {
                    "heading": "SIFIR ENERJİYİ DOĞRULA",
                    "items": [
                        "Uygun test yöntemiyle izolasyonun etkinliğini doğrula.",
                    ],
                },
            ],
            "footer_title": "ASLA YAPMA",
            "footer_items": [
                "Başkasının kilidini izinsiz çıkarma",
                "Stop butonuna güvenme",
                "Doğrulama yapmadan işe başlama",
                "Kimliksiz kilit kullanma",
            ],
        },
        "en": {
            "title": "LOTO GOLDEN RULES",
            "subtitle": "LOCKOUT / TAGOUT SAFETY",
            "alert": "LOCK • TAG • VERIFY",
            "blocks": [
                {
                    "heading": "IDENTIFY ENERGY SOURCES",
                    "items": [
                        "Identify all electrical, mechanical and pressure energy sources.",
                    ],
                },
                {
                    "heading": "SHUT DOWN EQUIPMENT",
                    "items": [
                        "Use the normal shutdown procedure and notify affected personnel.",
                    ],
                },
                {
                    "heading": "ISOLATE",
                    "items": [
                        "Place every required isolation point in a safe position.",
                    ],
                },
                {
                    "heading": "LOCK AND TAG",
                    "items": [
                        "Each worker must apply their own personal lock and tag.",
                    ],
                },
                {
                    "heading": "RELEASE STORED ENERGY",
                    "items": [
                        "Control pressure, springs, capacitors and residual movement.",
                    ],
                },
                {
                    "heading": "VERIFY ZERO ENERGY",
                    "items": [
                        "Verify effective isolation using an appropriate test method.",
                    ],
                },
            ],
            "footer_title": "NEVER",
            "footer_items": [
                "Remove another person's lock",
                "Rely on a stop button",
                "Start work without verification",
                "Use an unidentified lock",
            ],
        },
    },
    {
        "base": "working-at-height-rules-poster",
        "tr": {
            "title": "YÜKSEKTE ÇALIŞMA KURALLARI",
            "subtitle": "WORKING AT HEIGHT SAFETY RULES",
            "alert": "DÜŞMEYİ ÖNLE • BAĞLAN • KURTARMA PLANLA",
            "blocks": [
                {
                    "heading": "İŞİ PLANLA",
                    "items": [
                        "Görevi, erişimi, hava koşullarını ve düşme riskini değerlendir.",
                    ],
                },
                {
                    "heading": "TOPLU KORUMAYI KULLAN",
                    "items": [
                        "Korkuluk, platform ve güvenli erişimi kişisel korumadan önce uygula.",
                    ],
                },
                {
                    "heading": "EKİPMANI KONTROL ET",
                    "items": [
                        "Merdiven, iskele, platform ve düşüş durdurma ekipmanını incele.",
                    ],
                },
                {
                    "heading": "DOĞRU BAĞLAN",
                    "items": [
                        "Onaylı ankraj kullan ve mümkün olduğunca yüzde yüz bağlı kal.",
                    ],
                },
                {
                    "heading": "DÜŞEN CİSİMLERİ ÖNLE",
                    "items": [
                        "Aletleri sabitle ve alt bölgeyi bariyerle.",
                    ],
                },
                {
                    "heading": "KURTARMA PLANLA",
                    "items": [
                        "İşe başlamadan önce uygulanabilir kurtarma planını doğrula.",
                    ],
                },
            ],
            "footer_title": "İŞİ DERHAL DURDUR",
            "footer_items": [
                "Koruma eksikse",
                "Ankraj uygun değilse",
                "Hava koşulları tehlikeliyse",
                "Kurtarma planı yoksa",
            ],
        },
        "en": {
            "title": "WORKING AT HEIGHT SAFETY RULES",
            "subtitle": "PREVENT FALLS AND DROPPED OBJECTS",
            "alert": "PREVENT FALLS • STAY CONNECTED • PLAN RESCUE",
            "blocks": [
                {
                    "heading": "PLAN THE WORK",
                    "items": [
                        "Assess the task, access, weather and fall exposure.",
                    ],
                },
                {
                    "heading": "USE COLLECTIVE PROTECTION",
                    "items": [
                        "Use guardrails, platforms and safe access before personal protection.",
                    ],
                },
                {
                    "heading": "INSPECT EQUIPMENT",
                    "items": [
                        "Inspect ladders, scaffolds, platforms and fall-arrest equipment.",
                    ],
                },
                {
                    "heading": "CONNECT CORRECTLY",
                    "items": [
                        "Use approved anchorage and remain continuously connected where required.",
                    ],
                },
                {
                    "heading": "PREVENT DROPPED OBJECTS",
                    "items": [
                        "Secure tools and barricade the area below.",
                    ],
                },
                {
                    "heading": "PLAN RESCUE",
                    "items": [
                        "Confirm a workable rescue plan before starting.",
                    ],
                },
            ],
            "footer_title": "STOP WORK IMMEDIATELY",
            "footer_items": [
                "Protection is incomplete",
                "Anchorage is unsuitable",
                "Weather becomes unsafe",
                "No rescue plan is available",
            ],
        },
    },
    {
        "base": "scaffold-safety-rules-poster",
        "tr": {
            "title": "İSKELE GÜVENLİK KURALLARI",
            "subtitle": "SCAFFOLD SAFETY RULES",
            "alert": "KONTROL ET • ETİKETİ DOĞRULA • GÜVENLİ KULLAN",
            "blocks": [
                {
                    "heading": "ETİKETİ KONTROL ET",
                    "items": [
                        "İskele etiketini ve geçerlilik durumunu doğrula.",
                        "Kırmızı etiketli iskeleyi kullanma.",
                    ],
                },
                {
                    "heading": "ERİŞİMİ DOĞRULA",
                    "items": [
                        "Uygun merdiven veya güvenli erişim noktası kullan.",
                        "Korkuluklara tırmanma.",
                    ],
                },
                {
                    "heading": "PLATFORMU KONTROL ET",
                    "items": [
                        "Platformların tam, sabit ve boşluksuz olduğunu doğrula.",
                        "Kaygan veya hasarlı platformu kullanma.",
                    ],
                },
                {
                    "heading": "KORKULUKLARI KONTROL ET",
                    "items": [
                        "Üst korkuluk, ara korkuluk ve topuk levhasını kontrol et.",
                        "Eksik koruma varsa işi başlatma.",
                    ],
                },
                {
                    "heading": "YÜK SINIRINI AŞMA",
                    "items": [
                        "Malzeme ve personel yükünü güvenli sınırlar içinde tut.",
                        "Platform üzerinde gereksiz malzeme biriktirme.",
                    ],
                },
                {
                    "heading": "DEĞİŞİKLİK YAPMA",
                    "items": [
                        "Yetkisiz şekilde parça sökme veya iskeleyi değiştirme.",
                        "Hasar veya eksikliği hemen bildir.",
                    ],
                },
            ],
            "footer_title": "İSKELEYİ KULLANMA",
            "footer_items": [
                "Etiket geçersizse",
                "Korkuluk eksikse",
                "Platform hasarlıysa",
                "Güvenli erişim yoksa",
            ],
        },
        "en": {
            "title": "SCAFFOLD SAFETY RULES",
            "subtitle": "SAFE ACCESS AND WORKING PLATFORMS",
            "alert": "INSPECT • CHECK THE TAG • USE SAFELY",
            "blocks": [
                {
                    "heading": "CHECK THE TAG",
                    "items": [
                        "Verify the scaffold tag and inspection status.",
                        "Never use a red-tagged scaffold.",
                    ],
                },
                {
                    "heading": "VERIFY SAFE ACCESS",
                    "items": [
                        "Use the designated ladder or access point.",
                        "Never climb scaffold guardrails.",
                    ],
                },
                {
                    "heading": "CHECK THE PLATFORM",
                    "items": [
                        "Confirm platforms are complete, secured and free from gaps.",
                        "Do not use slippery or damaged platforms.",
                    ],
                },
                {
                    "heading": "CHECK EDGE PROTECTION",
                    "items": [
                        "Inspect top rails, midrails and toe boards.",
                        "Do not start if protection is incomplete.",
                    ],
                },
                {
                    "heading": "DO NOT OVERLOAD",
                    "items": [
                        "Keep personnel and materials within the safe load limit.",
                        "Do not store unnecessary materials on platforms.",
                    ],
                },
                {
                    "heading": "DO NOT MODIFY",
                    "items": [
                        "Never remove or modify components without authorization.",
                        "Report damage or missing parts immediately.",
                    ],
                },
            ],
            "footer_title": "DO NOT USE THE SCAFFOLD",
            "footer_items": [
                "The tag is invalid",
                "Guardrails are missing",
                "Platforms are damaged",
                "Safe access is unavailable",
            ],
        },
    },
    {
        "base": "hot-work-safety-rules-poster",
        "tr": {
            "title": "SICAK ÇALIŞMA GÜVENLİK KURALLARI",
            "subtitle": "HOT WORK SAFETY RULES",
            "alert": "İZİN AL • ALANI HAZIRLA • YANGINI ÖNLE",
            "blocks": [
                {
                    "heading": "ÇALIŞMA İZNİNİ DOĞRULA",
                    "items": [
                        "Geçerli sıcak çalışma izni olmadan işe başlama.",
                        "İzin koşullarını ve çalışma sınırlarını kontrol et.",
                    ],
                },
                {
                    "heading": "YANICI MADDELERİ KALDIR",
                    "items": [
                        "Yanıcı ve parlayıcı malzemeleri güvenli mesafeye taşı.",
                        "Taşınamayan malzemeleri uygun örtüyle koru.",
                    ],
                },
                {
                    "heading": "GAZ ÖLÇÜMÜ YAP",
                    "items": [
                        "Gerekli alanlarda atmosfer ve gaz ölçümünü doğrula.",
                        "Koşullar değişirse ölçümü tekrarla.",
                    ],
                },
                {
                    "heading": "YANGIN GÖZCÜSÜ GÖREVLENDİR",
                    "items": [
                        "Eğitimli yangın gözcüsünün görev başında olduğunu doğrula.",
                        "Gözcünün alanı kesintisiz izlemesini sağla.",
                    ],
                },
                {
                    "heading": "EKİPMANI KONTROL ET",
                    "items": [
                        "Kablo, hortum, regülatör ve bağlantıları incele.",
                        "Uygun yangın söndürücüyü erişilebilir tut.",
                    ],
                },
                {
                    "heading": "İŞ SONRASI KONTROL ET",
                    "items": [
                        "Kıvılcım, kor ve gizli yanma riskini kontrol et.",
                        "Belirlenen süre boyunca yangın gözetimini sürdür.",
                    ],
                },
            ],
            "footer_title": "İŞİ DERHAL DURDUR",
            "footer_items": [
                "İzin geçersizse",
                "Gaz ölçümü uygun değilse",
                "Yangın gözcüsü yoksa",
                "Yanıcı maddeler korunmamışsa",
            ],
        },
        "en": {
            "title": "HOT WORK SAFETY RULES",
            "subtitle": "WELDING, CUTTING AND GRINDING SAFETY",
            "alert": "AUTHORIZE • PREPARE • PREVENT FIRE",
            "blocks": [
                {
                    "heading": "VERIFY THE PERMIT",
                    "items": [
                        "Do not start without a valid hot work permit.",
                        "Confirm the permit conditions and work boundaries.",
                    ],
                },
                {
                    "heading": "REMOVE COMBUSTIBLES",
                    "items": [
                        "Move flammable materials to a safe distance.",
                        "Protect materials that cannot be removed.",
                    ],
                },
                {
                    "heading": "TEST THE ATMOSPHERE",
                    "items": [
                        "Verify required atmospheric and gas testing.",
                        "Repeat testing if conditions change.",
                    ],
                },
                {
                    "heading": "ASSIGN A FIRE WATCH",
                    "items": [
                        "Confirm a trained fire watch is present.",
                        "Ensure continuous observation of the work area.",
                    ],
                },
                {
                    "heading": "INSPECT EQUIPMENT",
                    "items": [
                        "Inspect cables, hoses, regulators and connections.",
                        "Keep a suitable extinguisher immediately available.",
                    ],
                },
                {
                    "heading": "CHECK AFTER COMPLETION",
                    "items": [
                        "Inspect for sparks, embers and hidden combustion.",
                        "Maintain fire watch for the required period.",
                    ],
                },
            ],
            "footer_title": "STOP WORK IMMEDIATELY",
            "footer_items": [
                "The permit is invalid",
                "Gas readings are unsafe",
                "No fire watch is present",
                "Combustibles are unprotected",
            ],
        },
    },
    {
        "base": "confined-space-entry-rules-poster",
        "tr": {
            "title": "KAPALI ALAN GİRİŞ KURALLARI",
            "subtitle": "CONFINED SPACE ENTRY RULES",
            "alert": "İZİN AL • ATMOSFERİ ÖLÇ • KURTARMAYI HAZIRLA",
            "blocks": [
                {
                    "heading": "GİRİŞ İZNİNİ DOĞRULA",
                    "items": [
                        "Geçerli kapalı alan giriş izni olmadan giriş yapma.",
                        "Görevleri ve giriş koşullarını kontrol et.",
                    ],
                },
                {
                    "heading": "ENERJİYİ İZOLE ET",
                    "items": [
                        "Mekanik, elektriksel ve proses enerjilerini izole et.",
                        "Gerekli LOTO uygulamalarını doğrula.",
                    ],
                },
                {
                    "heading": "ATMOSFERİ ÖLÇ",
                    "items": [
                        "Oksijen, yanıcı gaz ve toksik gaz ölçümlerini yap.",
                        "Giriş boyunca gerekli sürekli ölçümü sürdür.",
                    ],
                },
                {
                    "heading": "HAVALANDIRMAYI SAĞLA",
                    "items": [
                        "Uygun temiz hava ve mekanik havalandırma kullan.",
                        "Oksijenle havalandırma yapma.",
                    ],
                },
                {
                    "heading": "GÖZCÜ VE İLETİŞİM",
                    "items": [
                        "Gözcünün giriş noktasında kalmasını sağla.",
                        "Giren personelle kesintisiz iletişim kur.",
                    ],
                },
                {
                    "heading": "KURTARMA HAZIRLIĞI",
                    "items": [
                        "Giriş öncesinde uygulanabilir kurtarma planını doğrula.",
                        "Kurtarma ekipmanını hazır ve erişilebilir tut.",
                    ],
                },
            ],
            "footer_title": "GİRİŞ YAPMA",
            "footer_items": [
                "İzin geçersizse",
                "Atmosfer güvenli değilse",
                "Gözcü bulunmuyorsa",
                "Kurtarma planı hazır değilse",
            ],
        },
        "en": {
            "title": "CONFINED SPACE ENTRY RULES",
            "subtitle": "SAFE ENTRY AND RESCUE REQUIREMENTS",
            "alert": "AUTHORIZE • TEST • PREPARE RESCUE",
            "blocks": [
                {
                    "heading": "VERIFY THE ENTRY PERMIT",
                    "items": [
                        "Do not enter without a valid confined space permit.",
                        "Confirm responsibilities and entry conditions.",
                    ],
                },
                {
                    "heading": "ISOLATE ENERGY",
                    "items": [
                        "Isolate mechanical, electrical and process energy.",
                        "Verify all required LOTO controls.",
                    ],
                },
                {
                    "heading": "TEST THE ATMOSPHERE",
                    "items": [
                        "Test oxygen, flammable gases and toxic gases.",
                        "Continue monitoring throughout the entry where required.",
                    ],
                },
                {
                    "heading": "PROVIDE VENTILATION",
                    "items": [
                        "Use suitable fresh-air or mechanical ventilation.",
                        "Never ventilate with oxygen.",
                    ],
                },
                {
                    "heading": "ATTENDANT AND COMMUNICATION",
                    "items": [
                        "Keep the attendant at the entry point.",
                        "Maintain continuous communication with entrants.",
                    ],
                },
                {
                    "heading": "PREPARE FOR RESCUE",
                    "items": [
                        "Verify a workable rescue plan before entry.",
                        "Keep rescue equipment ready and accessible.",
                    ],
                },
            ],
            "footer_title": "DO NOT ENTER",
            "footer_items": [
                "The permit is invalid",
                "The atmosphere is unsafe",
                "No attendant is present",
                "Rescue is not ready",
            ],
        },
    },

]


for poster in POSTERS:
    for language in ("tr", "en"):
        content = poster[language]

        create_poster(
            filename=f"{poster['base']}-{language}.pdf",
            title=content["title"],
            subtitle=content["subtitle"],
            alert=content["alert"],
            blocks=content["blocks"],
            footer_title=content["footer_title"],
            footer_items=content["footer_items"],
        )
