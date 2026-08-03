from pathlib import Path
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
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
BLUE = HexColor("#2563EB")
GREEN = HexColor("#10B981")
RED = HexColor("#DC2626")
ORANGE = HexColor("#EA580C")
DARK = HexColor("#0F172A")
SLATE = HexColor("#475569")
LIGHT = HexColor("#F8FAFC")
BORDER = HexColor("#CBD5E1")
PALE_BLUE = HexColor("#EFF6FF")
PALE_GREEN = HexColor("#ECFDF5")
PALE_RED = HexColor("#FEF2F2")
PALE_ORANGE = HexColor("#FFF7ED")


def text(c, value, x, y, size=9, font=REGULAR, color=DARK):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def centered(c, value, x, y, size=9, font=BOLD, color=white):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawCentredString(x, y, value)


def wrapped_lines(c, value, width, size=9, font=REGULAR):
    words = value.split()
    lines = []
    current = ""

    for word in words:
        candidate = f"{current} {word}".strip()

        if c.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def draw_wrapped(
    c,
    value,
    x,
    y,
    width,
    size=9,
    leading=5 * mm,
    font=REGULAR,
    color=SLATE,
):
    for line in wrapped_lines(c, value, width, size, font):
        text(c, line, x, y, size, font, color)
        y -= leading

    return y


def page_background(c):
    width, height = A4
    c.setFillColor(LIGHT)
    c.rect(0, 0, width, height, fill=1, stroke=0)


def page_header(c, title, subtitle, duration, page_label):
    width, height = A4

    c.setFillColor(NAVY)
    c.rect(0, height - 48 * mm, width, 48 * mm, fill=1, stroke=0)

    text(
        c,
        "SAFEBASE TOOLBOX TALK",
        17 * mm,
        height - 13 * mm,
        9.5,
        BOLD,
        GREEN,
    )

    title_size = 18 if len(title) < 40 else 15.5
    text(c, title, 17 * mm, height - 26 * mm, title_size, BOLD, white)

    text(
        c,
        subtitle,
        17 * mm,
        height - 36 * mm,
        8.8,
        REGULAR,
        HexColor("#BFDBFE"),
    )

    c.setFillColor(BLUE)
    c.roundRect(
        width - 58 * mm,
        height - 39 * mm,
        40 * mm,
        13 * mm,
        4 * mm,
        fill=1,
        stroke=0,
    )
    centered(c, duration, width - 38 * mm, height - 34.5 * mm, 8.5)

    text(
        c,
        page_label,
        width - 37 * mm,
        11 * mm,
        7.5,
        REGULAR,
        SLATE,
    )


def section_box(
    c,
    title_value,
    body,
    x,
    y,
    width,
    color,
    pale,
    min_height=28 * mm,
):
    body_lines = []

    if isinstance(body, str):
        body_lines = [body]
    else:
        body_lines = body

    total_lines = 0
    for item in body_lines:
        total_lines += max(
            1,
            len(wrapped_lines(c, item, width - 24 * mm, 8.6)),
        )

    height = max(
        min_height,
        17 * mm + total_lines * 5 * mm + len(body_lines) * 2.2 * mm,
    )

    c.setFillColor(pale)
    c.setStrokeColor(BORDER)
    c.roundRect(x, y - height, width, height, 4 * mm, fill=1, stroke=1)

    c.setFillColor(color)
    c.roundRect(x, y - 11 * mm, width, 11 * mm, 4 * mm, fill=1, stroke=0)

    text(c, title_value, x + 6 * mm, y - 7.4 * mm, 10.5, BOLD, white)

    body_y = y - 19 * mm

    if isinstance(body, str):
        body_y = draw_wrapped(
            c,
            body,
            x + 7 * mm,
            body_y,
            width - 14 * mm,
            8.6,
            5 * mm,
            REGULAR,
            SLATE,
        )
    else:
        for item in body:
            c.setFillColor(color)
            c.circle(
                x + 8 * mm,
                body_y + 1 * mm,
                1.15 * mm,
                fill=1,
                stroke=0,
            )

            body_y = draw_wrapped(
                c,
                item,
                x + 14 * mm,
                body_y,
                width - 22 * mm,
                8.6,
                5 * mm,
                REGULAR,
                SLATE,
            )
            body_y -= 1.8 * mm

    return y - height - 5 * mm


def quote_box(c, title_value, quote, x, y, width):
    lines = wrapped_lines(c, quote, width - 20 * mm, 9)
    height = 18 * mm + len(lines) * 5.4 * mm

    c.setFillColor(PALE_BLUE)
    c.setStrokeColor(BLUE)
    c.setLineWidth(1)
    c.roundRect(x, y - height, width, height, 4 * mm, fill=1, stroke=1)

    text(c, title_value, x + 7 * mm, y - 8 * mm, 10.5, BOLD, BLUE)

    quote_y = y - 18 * mm
    for line in lines:
        text(c, line, x + 9 * mm, quote_y, 9, REGULAR, DARK)
        quote_y -= 5.4 * mm

    return y - height - 5 * mm


def checklist_box(c, title_value, items, x, y, width):
    columns = 2
    col_width = width / columns
    rows = (len(items) + columns - 1) // columns
    height = 18 * mm + rows * 9 * mm

    c.setFillColor(PALE_GREEN)
    c.setStrokeColor(GREEN)
    c.roundRect(x, y - height, width, height, 4 * mm, fill=1, stroke=1)

    text(c, title_value, x + 7 * mm, y - 8 * mm, 10.5, BOLD, GREEN)

    for index, item in enumerate(items):
        col = index % columns
        row = index // columns

        item_x = x + 8 * mm + col * col_width
        item_y = y - 20 * mm - row * 9 * mm

        c.setFillColor(white)
        c.setStrokeColor(GREEN)
        c.rect(item_x, item_y - 1 * mm, 4 * mm, 4 * mm, fill=1, stroke=1)

        draw_wrapped(
            c,
            item,
            item_x + 7 * mm,
            item_y,
            col_width - 17 * mm,
            8,
            4.4 * mm,
            REGULAR,
            SLATE,
        )

    return y - height - 5 * mm


def footer(c, footer_text):
    width, _ = A4

    c.setFillColor(NAVY)
    c.rect(0, 0, width, 18 * mm, fill=1, stroke=0)

    text(
        c,
        "SAFEBASE",
        17 * mm,
        7 * mm,
        8,
        BOLD,
        white,
    )

    text(
        c,
        footer_text,
        48 * mm,
        7 * mm,
        6.6,
        REGULAR,
        HexColor("#CBD5E1"),
    )


def attendance_page(c, content):
    width, height = A4
    page_background(c)

    c.setFillColor(NAVY)
    c.rect(0, height - 42 * mm, width, 42 * mm, fill=1, stroke=0)

    text(
        c,
        content["attendance_title"],
        17 * mm,
        height - 21 * mm,
        18,
        BOLD,
        white,
    )
    text(
        c,
        content["title"],
        17 * mm,
        height - 32 * mm,
        9,
        REGULAR,
        HexColor("#BFDBFE"),
    )

    field_y = height - 57 * mm

    for index, label in enumerate(content["fields"]):
        col = index % 2
        row = index // 2
        x = 18 * mm + col * 88 * mm
        y = field_y - row * 18 * mm

        text(c, label, x, y, 8.3, BOLD, SLATE)
        c.setStrokeColor(BORDER)
        c.line(x, y - 6 * mm, x + 75 * mm, y - 6 * mm)

    left = 18 * mm
    table_top = height - 105 * mm
    widths = [12 * mm, 72 * mm, 52 * mm, 38 * mm]

    c.setFillColor(NAVY)
    c.rect(left, table_top, sum(widths), 11 * mm, fill=1, stroke=0)

    x = left
    for header, col_width in zip(content["table_headers"], widths):
        centered(
            c,
            header,
            x + col_width / 2,
            table_top + 4 * mm,
            7.7,
            BOLD,
            white,
        )
        x += col_width

    row_h = 10 * mm

    for row in range(14):
        y = table_top - (row + 1) * row_h

        c.setFillColor(white)
        c.setStrokeColor(BORDER)
        c.rect(left, y, sum(widths), row_h, fill=1, stroke=1)

        x = left
        for col_width in widths[:-1]:
            x += col_width
            c.line(x, y, x, y + row_h)

        text(c, str(row + 1), left + 4.5 * mm, y + 3.4 * mm, 7.8, REGULAR, SLATE)

    notes_y = table_top - 157 * mm

    text(c, content["notes_title"], 18 * mm, notes_y, 9.5, BOLD, DARK)

    c.setFillColor(white)
    c.setStrokeColor(BORDER)
    c.roundRect(
        18 * mm,
        notes_y - 38 * mm,
        width - 36 * mm,
        32 * mm,
        4 * mm,
        fill=1,
        stroke=1,
    )

    footer(c, content["footer"])


def create_toolbox(filename, content):
    path = OUT / filename
    c = canvas.Canvas(str(path), pagesize=A4)
    width, height = A4

    # PAGE 1 — EDUCATION
    page_background(c)
    page_header(
        c,
        content["title"],
        content["subtitle"],
        content["duration"],
        "1 / 3",
    )

    y = height - 60 * mm

    y = section_box(
        c,
        content["objective_title"],
        content["objective"],
        16 * mm,
        y,
        width - 32 * mm,
        BLUE,
        PALE_BLUE,
        28 * mm,
    )

    y = section_box(
        c,
        content["explanation_title"],
        content["explanation"],
        16 * mm,
        y,
        width - 32 * mm,
        GREEN,
        PALE_GREEN,
        55 * mm,
    )

    y = section_box(
        c,
        content["scenario_title"],
        content["scenario"],
        16 * mm,
        y,
        width - 32 * mm,
        ORANGE,
        PALE_ORANGE,
        48 * mm,
    )

    quote_box(
        c,
        content["remember_title"],
        content["remember"],
        16 * mm,
        y,
        width - 32 * mm,
    )

    footer(c, content["footer"])

    # PAGE 2 — APPLICATION
    c.showPage()
    page_background(c)
    page_header(
        c,
        content["title"],
        content["application_subtitle"],
        content["duration"],
        "2 / 3",
    )

    y = height - 60 * mm
    half = (width - 37 * mm) / 2

    left_y = section_box(
        c,
        content["hazards_title"],
        content["hazards"],
        16 * mm,
        y,
        half,
        RED,
        PALE_RED,
        102 * mm,
    )

    right_y = section_box(
        c,
        content["controls_title"],
        content["controls"],
        21 * mm + half,
        y,
        half,
        GREEN,
        PALE_GREEN,
        102 * mm,
    )

    y = min(left_y, right_y)

    y = quote_box(
        c,
        content["supervisor_title"],
        content["supervisor_script"],
        16 * mm,
        y,
        width - 32 * mm,
    )

    y = section_box(
        c,
        content["questions_title"],
        content["questions"],
        16 * mm,
        y,
        width - 32 * mm,
        BLUE,
        PALE_BLUE,
        48 * mm,
    )

    checklist_box(
        c,
        content["verification_title"],
        content["verification"],
        16 * mm,
        y,
        width - 32 * mm,
    )

    footer(c, content["footer"])

    # PAGE 3 — ATTENDANCE
    c.showPage()
    attendance_page(c, content)

    c.save()
    print(f"✅ Created: {path}")


TOOLBOXES = [
    {
        "base": "hot-work-toolbox-talk",
        "tr": {
            "title": "SICAK ÇALIŞMA TOOLBOX TALK",
            "subtitle": "Kaynak, kesme ve taşlama işlerinde yangın ve patlamayı önleyin.",
            "application_subtitle": "Tehlikeler, kontroller ve günlük iş öncesi doğrulama.",
            "duration": "8–10 DAKİKA",
            "objective_title": "AMAÇ",
            "objective": (
                "Kaynak, kesme, taşlama, lehimleme ve kıvılcım oluşturan diğer "
                "faaliyetlerde yangın, patlama, yanık ve zararlı duman risklerini "
                "ekiple birlikte değerlendirmek ve işe başlamadan önce gerekli "
                "kontrolleri doğrulamak."
            ),
            "explanation_title": "KONU ANLATIMI",
            "explanation": [
                (
                    "Sıcak çalışma, açık alev oluşturan işlerle sınırlı değildir. "
                    "Taşlama, metal kesme ve sıcak yüzey oluşturan işlemler de "
                    "kıvılcım, cüruf veya yüksek sıcaklık nedeniyle yangın başlatabilir."
                ),
                (
                    "Kıvılcımlar çalışma noktasında kalmaz. Platform boşluklarından, "
                    "kablo geçişlerinden ve açıklıklardan alt veya bitişik alanlara "
                    "ulaşabilir. Yanıcı malzeme görünürde olmasa bile izolasyon, toz, "
                    "yağ kalıntısı veya atıklar gizli yanma oluşturabilir."
                ),
                (
                    "Bu nedenle sıcak çalışma yalnızca geçerli izin, uygun gaz ölçümü, "
                    "yanıcı maddelerin kontrolü, hazır söndürme ekipmanı ve görevini "
                    "bilen yangın gözcüsü bulunduğunda başlatılmalıdır. İş sona erse "
                    "bile yangın riski hemen bitmez."
                ),
            ],
            "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
            "scenario": [
                (
                    "Bir bakım ekibi kısa süreli taşlama yaptı. Çalışma alanındaki "
                    "görünen yanıcı maddeler kaldırılmıştı ancak platform altındaki "
                    "izolasyon malzemesi fark edilmedi."
                ),
                (
                    "Kıvılcımlar platform boşluğundan aşağı düştü. Yangın gözcüsü "
                    "başka bir işle meşgul olduğu ve iş sonrası kontrol yapılmadığı "
                    "için yaklaşık yirmi dakika sonra izolasyon tutuştu."
                ),
                (
                    "Olay; üretim kaybına, ekipman hasarına ve acil tahliyeye neden oldu. "
                    "Uygun bariyerleme, bağımsız yangın gözcüsü ve iş sonrası gözetim "
                    "ile tamamen önlenebilirdi."
                ),
            ],
            "remember_title": "UNUTMAYIN",
            "remember": (
                "Sıcak çalışma kaynaklı yangınların bir bölümü iş bittikten sonra, "
                "gizli kor veya ısınmış malzeme nedeniyle başlar."
            ),
            "hazards_title": "TEMEL TEHLİKELER",
            "hazards": [
                "Kıvılcım ve cürufun alt veya bitişik alanlara ulaşması.",
                "Yanıcı gaz, buhar, solvent veya tozun tutuşması.",
                "Hat veya ekipmanda kalan ürün ve basınç.",
                "Hasarlı kablo, hortum, regülatör veya bağlantılar.",
                "Kaynak dumanı ve yetersiz havalandırma.",
                "Kapalı alanda oksijen ve gaz seviyelerinin değişmesi.",
                "Tüplerin uygunsuz taşınması veya sabitlenmemesi.",
                "İş sonrasında fark edilmeyen kor ve gizli yanma.",
            ],
            "controls_title": "KONTROL ÖNLEMLERİ",
            "controls": [
                "Geçerli sıcak çalışma iznini doğrulayın.",
                "Gerekli atmosfer ölçümlerini yapın ve kaydedin.",
                "Yanıcı maddeleri kaldırın veya uygun örtüyle koruyun.",
                "Alt ve bitişik alanları kontrol edip bariyerleyin.",
                "Yetkin ve yalnızca bu görevle ilgilenen yangın gözcüsü atayın.",
                "Uygun söndürücü ve yangın örtüsünü hazır tutun.",
                "Kablo, hortum, regülatör ve ekipmanı kontrol edin.",
                "Yeterli havalandırma ve duman kontrolü sağlayın.",
                "Kıvılcım ve sıcak malzemenin yayılmasını engelleyin.",
                "İş sonrası gözetim süresini izin üzerinde doğrulayın.",
            ],
            "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
            "supervisor_script": (
                "Arkadaşlar, bugün yapacağımız kaynak, kesme veya taşlama işi küçük "
                "bir kıvılcımla büyük bir yangına dönüşebilir. İzin onaylı değilse, "
                "gaz ölçümü uygun değilse, yangın gözcüsü görevini bilmiyorsa veya "
                "yanıcı maddeler korunmamışsa işe başlamıyoruz. Alt katları ve gizli "
                "boşlukları da kontrol edeceğiz. İş bittikten sonra alanı terk etmek "
                "yerine izin üzerinde belirtilen süre boyunca yangın gözetimini "
                "sürdüreceğiz."
            ),
            "questions_title": "EKİBE SORULACAK SORULAR",
            "questions": [
                "Bugünkü yangın gözcüsü kim ve tek görevi bu mu?",
                "En yakın uygun yangın söndürücü ve alarm noktası nerede?",
                "Gaz ölçümü ne zaman yapıldı ve sonucu nedir?",
                "Kıvılcımlar alt veya bitişik alanlara ulaşabilir mi?",
                "İş sonrası alanı kim ve ne kadar süre kontrol edecek?",
                "Koşullar değişirse çalışmayı kim durduracak?",
            ],
            "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
            "verification": [
                "İzin onaylı",
                "Gaz ölçümü uygun",
                "Yangın gözcüsü hazır",
                "Söndürücü hazır",
                "Yanıcılar kaldırıldı",
                "Alt alan kontrol edildi",
                "Ekipman sağlam",
                "KKD uygun",
                "Havalandırma yeterli",
                "İş sonrası kontrol planlandı",
            ],
            "attendance_title": "KATILIM VE ONAY FORMU",
            "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
            "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
            "notes_title": "Süpervizör notları / ek saha talimatları",
            "footer": (
                "SafeBase HSE Resource — Çalışma izni, risk değerlendirmesi ve "
                "saha prosedürleri önceliklidir."
            ),
        },
        "en": {
            "title": "HOT WORK TOOLBOX TALK",
            "subtitle": "Prevent fire and explosion during welding, cutting and grinding.",
            "application_subtitle": "Hazards, controls and daily pre-work verification.",
            "duration": "8–10 MINUTES",
            "objective_title": "OBJECTIVE",
            "objective": (
                "Review fire, explosion, burn and fume hazards associated with "
                "welding, cutting, grinding, brazing and other spark-producing work, "
                "and verify all required controls before starting."
            ),
            "explanation_title": "TOPIC EXPLANATION",
            "explanation": [
                (
                    "Hot work is not limited to activities involving an open flame. "
                    "Grinding, metal cutting and other heat-producing work can start "
                    "fires through sparks, slag and hot surfaces."
                ),
                (
                    "Sparks do not remain at the immediate work point. They can travel "
                    "through platform gaps, penetrations and openings into lower or "
                    "adjacent areas. Hidden insulation, dust, oil residue or waste can "
                    "smoulder without being immediately visible."
                ),
                (
                    "Hot work must therefore begin only when the permit is valid, gas "
                    "testing is acceptable, combustibles are controlled, firefighting "
                    "equipment is ready and a trained fire watch is present. The fire "
                    "risk continues after the task has stopped."
                ),
            ],
            "scenario_title": "REALISTIC SITE SCENARIO",
            "scenario": [
                (
                    "A maintenance team carried out a short grinding task. Visible "
                    "combustibles had been removed, but insulation below the platform "
                    "had not been identified."
                ),
                (
                    "Sparks fell through a platform gap. The fire watch was distracted "
                    "by another duty and no post-work inspection was completed. The "
                    "insulation ignited approximately twenty minutes later."
                ),
                (
                    "The event caused production loss, equipment damage and an emergency "
                    "evacuation. Proper screening, a dedicated fire watch and post-work "
                    "monitoring would have prevented it."
                ),
            ],
            "remember_title": "REMEMBER",
            "remember": (
                "Some hot-work fires begin after the task is complete because of hidden "
                "embers or heated materials."
            ),
            "hazards_title": "KEY HAZARDS",
            "hazards": [
                "Sparks and slag reaching lower or adjacent areas.",
                "Ignition of flammable gases, vapours, solvents or dust.",
                "Residual product or pressure inside lines and equipment.",
                "Damaged cables, hoses, regulators or connections.",
                "Welding fumes and inadequate ventilation.",
                "Changing oxygen or gas levels in enclosed spaces.",
                "Unsafe handling or storage of gas cylinders.",
                "Hidden embers and combustion after completion.",
            ],
            "controls_title": "CONTROL MEASURES",
            "controls": [
                "Verify the approved hot-work permit.",
                "Complete and record required atmospheric testing.",
                "Remove combustibles or protect them with suitable covers.",
                "Inspect and barricade lower and adjacent areas.",
                "Assign a trained and dedicated fire watch.",
                "Provide appropriate extinguishers and fire blankets.",
                "Inspect cables, hoses, regulators and equipment.",
                "Provide adequate ventilation and fume control.",
                "Contain sparks, slag and hot materials.",
                "Confirm the post-work monitoring period on the permit.",
            ],
            "supervisor_title": "SUPERVISOR TALKING SCRIPT",
            "supervisor_script": (
                "Team, today's welding, cutting or grinding can turn a small spark into "
                "a major fire. We will not start if the permit is not approved, gas "
                "testing is unsafe, the fire watch does not understand the role or "
                "combustibles remain unprotected. We must inspect lower levels and "
                "hidden openings as well. After the work stops, the fire watch will "
                "continue for the full period stated on the permit."
            ),
            "questions_title": "DISCUSSION QUESTIONS",
            "questions": [
                "Who is today's dedicated fire watch?",
                "Where are the nearest suitable extinguisher and alarm point?",
                "When was gas testing completed and what were the results?",
                "Can sparks reach lower or adjacent areas?",
                "Who will inspect the area after completion and for how long?",
                "Who has authority to stop the work if conditions change?",
            ],
            "verification_title": "VERIFY BEFORE STARTING TODAY",
            "verification": [
                "Permit approved",
                "Gas test acceptable",
                "Fire watch ready",
                "Extinguisher ready",
                "Combustibles removed",
                "Lower area checked",
                "Equipment inspected",
                "PPE suitable",
                "Ventilation adequate",
                "Post-work watch planned",
            ],
            "attendance_title": "ATTENDANCE AND APPROVAL",
            "fields": ["Project / Site", "Date", "Presented by", "Work area"],
            "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
            "notes_title": "Supervisor notes / additional site instructions",
            "footer": (
                "SafeBase HSE Resource — Permit conditions, risk assessments and "
                "site procedures take priority."
            ),
        },
    },

    {
        "base": "working-at-height-toolbox-talk",
        "tr": {
            "title": "YÜKSEKTE ÇALIŞMA TOOLBOX TALK",
            "subtitle": "Düşmeleri, düşen cisimleri ve ölümcül yaralanmaları önleyin.",
            "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
            "duration": "8–10 DAKİKA",

            "objective_title": "AMAÇ",
            "objective": (
                "Yüksekte çalışma sırasında meydana gelebilecek düşme, düşen cisim, "
                "uygunsuz erişim ve yetersiz kurtarma risklerini değerlendirmek; işe "
                "başlamadan önce gerekli bütün koruyucu önlemleri doğrulamak."
            ),

            "explanation_title": "KONU ANLATIMI",
            "explanation": [
                (
                    "Yüksekte çalışma yalnızca çok yüksek yapılarda gerçekleştirilen işler değildir. "
                    "Bir kişinin düşerek yaralanabileceği seviye farkı bulunan platformlar, iskeleler, "
                    "merdivenler, çatılar, açıklıklar ve ekipman üstleri de yüksekte çalışma kapsamındadır."
                ),
                (
                    "Düşmeler çoğu zaman korumasız kenarlar, açık zemin boşlukları, uygunsuz erişim, "
                    "hasarlı ekipman veya emniyet kemerinin yanlış kullanılması nedeniyle meydana gelir. "
                    "Düşen alet ve malzemeler ise alt seviyedeki çalışanlar için ölümcül risk oluşturabilir."
                ),
                (
                    "İşe yalnızca uygun çalışma izni, risk değerlendirmesi, güvenli erişim, kontrol edilmiş "
                    "ekipman ve uygulanabilir bir kurtarma planı mevcut olduğunda başlanmalıdır. Toplu koruma "
                    "önlemleri her zaman kişisel düşüş durdurma sistemlerinden önce değerlendirilmelidir."
                ),
            ],

            "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
            "scenario": [
                (
                    "Bir çalışan, kısa süreli bir bağlantı işi için platform korkuluğunun dışına uzandı. "
                    "İşin yalnızca birkaç dakika süreceği düşünülerek uygun çalışma platformu kurulmadı."
                ),
                (
                    "Çalışanın emniyet kemeri vardı ancak bağlantı kancası uygun bir ankraj noktasına takılı "
                    "değildi. Dengesini kaybettiğinde düşüşü durduracak etkin bir sistem bulunmuyordu."
                ),
                (
                    "Olay; uygun platform kurulması, korkulukların korunması, onaylı ankraj kullanılması ve "
                    "işe başlamadan önce süpervizör kontrolü yapılmasıyla tamamen önlenebilirdi."
                ),
            ],

            "remember_title": "UNUTMAYIN",
            "remember": (
                "Emniyet kemeri giymek tek başına yeterli değildir. Doğru ankraj, uygun bağlantı sistemi, "
                "yeterli düşüş mesafesi ve hazır bir kurtarma planı birlikte bulunmalıdır."
            ),

            "hazards_title": "TEMEL TEHLİKELER",
            "hazards": [
                "Korumasız kenarlardan veya platformlardan düşme.",
                "Açık zemin boşlukları, geçişler ve trapdoor açıklıkları.",
                "Uygun olmayan merdiven, iskele veya çalışma platformu.",
                "Hasarlı ya da yanlış kullanılan emniyet kemeri ve lanyard.",
                "Uygun olmayan veya yetersiz dayanımlı ankraj noktası.",
                "Alet, ekipman ve malzemelerin alt seviyelere düşmesi.",
                "Olumsuz hava, kaygan yüzey veya yetersiz aydınlatma.",
                "Düşüş sonrası askıda kalma ve yetersiz kurtarma hazırlığı.",
            ],

            "controls_title": "KONTROL ÖNLEMLERİ",
            "controls": [
                "Geçerli çalışma izni ve risk değerlendirmesini doğrulayın.",
                "Öncelikle korkuluk, platform ve kapak gibi toplu korumaları kullanın.",
                "İskele, merdiven ve erişim ekipmanının kontrolünü doğrulayın.",
                "Tam vücut emniyet kemeri ve uygun bağlantı sistemini inceleyin.",
                "Yalnızca onaylı ve yeterli dayanımdaki ankraj noktalarını kullanın.",
                "Aletleri bağlayın ve alt çalışma alanını bariyerlerle koruyun.",
                "Hava, yüzey ve aydınlatma koşullarını işe başlamadan değerlendirin.",
                "Yeterli düşüş açıklığı ve salınım düşüşü riskini kontrol edin.",
                "Çalışma boyunca yetkili gözetim ve iletişim sağlayın.",
                "Uygulanabilir kurtarma planı ile ekipmanı hazır bulundurun.",
            ],

            "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
            "supervisor_script": (
                "Arkadaşlar, bugün yapacağımız yüksekte çalışma küçük bir dengesizlikte ölümcül bir düşüşe "
                "dönüşebilir. Korkuluklar, erişim yolu, çalışma platformu ve ankraj noktası kontrol edilmeden "
                "işe başlamıyoruz. Emniyet kemerinin yalnızca giyilmiş olması yeterli değildir; bağlantının "
                "doğru ve sürekli olması gerekir. Koşullar değişirse işi durduracak ve alanı yeniden "
                "değerlendireceğiz. Bir düşüş yaşanması durumunda kurtarmayı nasıl yapacağımız herkesçe bilinmelidir."
            ),

            "questions_title": "EKİBE SORULACAK SORULAR",
            "questions": [
                "Bugünkü çalışma hangi yükseklikte ve hangi alanda yapılacak?",
                "Korkuluklar, platform ve güvenli erişim tamam mı?",
                "Kullanılacak ankraj noktası kim tarafından onaylandı?",
                "Emniyet kemeri ve bağlantı ekipmanı kontrol edildi mi?",
                "Alet ve malzemelerin düşmesi nasıl önlenecek?",
                "Bir düşüş durumunda kurtarmayı kim ve nasıl yapacak?",
            ],

            "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
            "verification": [
                "İzin onaylı",
                "Risk değerlendirmesi uygun",
                "Güvenli erişim hazır",
                "Korkuluklar tamam",
                "Platform kontrol edildi",
                "Ankraj onaylı",
                "Emniyet kemeri sağlam",
                "Bağlantı sistemi uygun",
                "Alt alan bariyerli",
                "Kurtarma planı hazır",
            ],

            "attendance_title": "KATILIM VE ONAY",
            "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
            "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
            "notes_title": "Süpervizör notları / ek saha talimatları",
            "footer": (
                "SafeBase HSE Resource — Çalışma izni, risk değerlendirmesi ve "
                "saha prosedürleri önceliklidir."
            ),
        },

        "en": {
            "title": "WORKING AT HEIGHT TOOLBOX TALK",
            "subtitle": "Prevent falls, falling objects and fatal injuries.",
            "application_subtitle": "Hazards, control measures and daily pre-work verification.",
            "duration": "8–10 MINUTES",

            "objective_title": "OBJECTIVE",
            "objective": (
                "Review fall, falling-object, unsafe-access and rescue hazards associated with "
                "working at height, and verify that all required protective measures are in place "
                "before the task begins."
            ),

            "explanation_title": "TOPIC EXPLANATION",
            "explanation": [
                (
                    "Working at height is not limited to very tall structures. Platforms, scaffolds, "
                    "ladders, roofs, openings and equipment surfaces are included whenever a person "
                    "could fall from one level to another and suffer injury."
                ),
                (
                    "Falls commonly involve unprotected edges, open floor penetrations, unsafe access, "
                    "defective equipment or incorrect use of fall-protection systems. Dropped tools and "
                    "materials can also cause fatal injuries to people working below."
                ),
                (
                    "Work must begin only when the permit, risk assessment, safe access, inspected "
                    "equipment and a practical rescue plan are available. Collective protection such "
                    "as guardrails and working platforms must be considered before personal fall-arrest systems."
                ),
            ],

            "scenario_title": "REALISTIC SITE SCENARIO",
            "scenario": [
                (
                    "A worker leaned outside a platform guardrail to complete a short connection task. "
                    "Because the job was expected to take only a few minutes, a suitable working platform "
                    "was not installed."
                ),
                (
                    "The worker wore a harness, but the connecting hook was not attached to an approved "
                    "anchor point. When balance was lost, no effective system was available to arrest the fall."
                ),
                (
                    "The event could have been completely prevented by providing a suitable platform, "
                    "maintaining the guardrails, using an approved anchor and completing a supervisor "
                    "check before starting."
                ),
            ],

            "remember_title": "REMEMBER",
            "remember": (
                "Wearing a harness is not enough. Correct anchorage, a suitable connecting system, "
                "adequate fall clearance and a ready rescue plan must all be provided."
            ),

            "hazards_title": "KEY HAZARDS",
            "hazards": [
                "Falls from unprotected edges or working platforms.",
                "Open floor penetrations, access openings and trapdoors.",
                "Unsuitable ladders, scaffolds or working platforms.",
                "Damaged or incorrectly used harnesses and lanyards.",
                "Unapproved or inadequate anchor points.",
                "Tools, equipment or materials falling to lower levels.",
                "Adverse weather, slippery surfaces or poor lighting.",
                "Suspension after a fall and inadequate rescue preparation.",
            ],

            "controls_title": "CONTROL MEASURES",
            "controls": [
                "Verify the approved permit and risk assessment.",
                "Use guardrails, platforms and covers as the first priority.",
                "Confirm inspection of scaffolds, ladders and access equipment.",
                "Inspect the full-body harness and connecting system.",
                "Use only approved and adequately rated anchor points.",
                "Secure tools and barricade the area below.",
                "Assess weather, surface and lighting conditions.",
                "Check fall clearance and swing-fall exposure.",
                "Provide competent supervision and communication.",
                "Keep a practical rescue plan and equipment ready.",
            ],

            "supervisor_title": "SUPERVISOR TALKING SCRIPT",
            "supervisor_script": (
                "Team, today's work at height can become a fatal fall after one small loss of balance. "
                "We will not start until guardrails, access, the working platform and the anchor point "
                "have been checked. Simply wearing a harness is not enough; the worker must remain "
                "correctly connected. If conditions change, we will stop and reassess the work. "
                "Everyone must understand how rescue will be completed if a fall occurs."
            ),

            "questions_title": "DISCUSSION QUESTIONS",
            "questions": [
                "At what height and in which area will today's work take place?",
                "Are the guardrails, platform and safe access complete?",
                "Who approved the anchor point that will be used?",
                "Have the harness and connecting equipment been inspected?",
                "How will dropped tools and materials be prevented?",
                "Who will perform the rescue and how will it be completed?",
            ],

            "verification_title": "VERIFY BEFORE STARTING TODAY",
            "verification": [
                "Permit approved",
                "Risk assessment suitable",
                "Safe access ready",
                "Guardrails complete",
                "Platform inspected",
                "Anchor approved",
                "Harness serviceable",
                "Connection suitable",
                "Lower area barricaded",
                "Rescue plan ready",
            ],

            "attendance_title": "ATTENDANCE AND APPROVAL",
            "fields": ["Project / Site", "Date", "Presented by", "Work area"],
            "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
            "notes_title": "Supervisor notes / additional site instructions",
            "footer": (
                "SafeBase HSE Resource — Permit conditions, risk assessments and "
                "site procedures take priority."
            ),
        },
    },
]

# Toolbox PDF'lerini üret.
for toolbox in TOOLBOXES:
    for language in ("tr", "en"):
        create_toolbox(
            f"{toolbox['base']}-{language}.pdf",
            toolbox[language],
        )

print("✅ Premium Toolbox Engine v2 hazır.")
print("✅ Hot Work ve Working at Height TR/EN üç sayfalık PDF olarak üretildi.")
