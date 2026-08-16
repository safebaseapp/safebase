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
    pdfmetrics.registerFont(TTFont("SRN-Regular", str(regular_path)))
    pdfmetrics.registerFont(TTFont("SRN-Bold", str(bold_path)))
    REGULAR = "SRN-Regular"
    BOLD = "SRN-Bold"
else:
    REGULAR = "Helvetica"
    BOLD = "Helvetica-Bold"

NAVY = HexColor("#061329")
BLUE = HexColor("#2563EB")
GREEN = HexColor("#10B981")
RED = HexColor("#DC2626")
DARK = HexColor("#0F172A")
SLATE = HexColor("#475569")
LIGHT = HexColor("#F8FAFC")
BORDER = HexColor("#CBD5E1")
PALE_BLUE = HexColor("#EFF6FF")
PALE_GREEN = HexColor("#ECFDF5")
PALE_RED = HexColor("#FEF2F2")


def draw_text(c, text, x, y, size=9, font=REGULAR, color=DARK):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, text)


def wrap_lines(c, text, max_width, size=9, font=REGULAR):
    words = text.split()
    lines = []
    current = ""

    for word in words:
        candidate = f"{current} {word}".strip()
        if c.stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def draw_wrapped(c, text, x, y, max_width, size=9, leading=5.2 * mm,
                 font=REGULAR, color=DARK):
    for line in wrap_lines(c, text, max_width, size, font):
        draw_text(c, line, x, y, size, font, color)
        y -= leading
    return y


def draw_section(c, title, items, x, y, width, color, pale_color):
    line_count = 0
    for item in items:
        line_count += max(1, len(wrap_lines(c, item, width - 22 * mm, 8.7)))

    height = 18 * mm + line_count * 5.2 * mm + len(items) * 2.2 * mm

    c.setFillColor(pale_color)
    c.setStrokeColor(BORDER)
    c.roundRect(x, y - height, width, height, 4 * mm, fill=1, stroke=1)

    c.setFillColor(color)
    c.roundRect(x, y - 12 * mm, width, 12 * mm, 4 * mm, fill=1, stroke=0)
    draw_text(c, title, x + 6 * mm, y - 8 * mm, 11, BOLD, white)

    bullet_y = y - 20 * mm

    for item in items:
        c.setFillColor(color)
        c.circle(x + 7 * mm, bullet_y + 1.2 * mm, 1.2 * mm, fill=1, stroke=0)

        bullet_y = draw_wrapped(
            c,
            item,
            x + 13 * mm,
            bullet_y,
            width - 20 * mm,
            size=8.7,
            leading=5.2 * mm,
            color=SLATE,
        )
        bullet_y -= 2.2 * mm

    return y - height - 6 * mm


def create_toolbox(filename, language, content):
    path = OUT / filename
    c = canvas.Canvas(str(path), pagesize=A4)
    page_w, page_h = A4

    # PAGE 1
    c.setFillColor(LIGHT)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    c.setFillColor(NAVY)
    c.rect(0, page_h - 54 * mm, page_w, 54 * mm, fill=1, stroke=0)

    draw_text(
        c,
        "SERNEM TOOLBOX TALK",
        18 * mm,
        page_h - 16 * mm,
        10,
        BOLD,
        GREEN,
    )

    title_size = 20 if len(content["title"]) < 35 else 17
    draw_text(
        c,
        content["title"],
        18 * mm,
        page_h - 29 * mm,
        title_size,
        BOLD,
        white,
    )

    draw_text(
        c,
        content["subtitle"],
        18 * mm,
        page_h - 39 * mm,
        9.5,
        REGULAR,
        HexColor("#BFDBFE"),
    )

    c.setFillColor(BLUE)
    c.roundRect(
        page_w - 58 * mm,
        page_h - 45 * mm,
        40 * mm,
        14 * mm,
        4 * mm,
        fill=1,
        stroke=0,
    )
    c.setFillColor(white)
    c.setFont(BOLD, 9)
    c.drawCentredString(
        page_w - 38 * mm,
        page_h - 40 * mm,
        content["duration"],
    )

    y = page_h - 65 * mm

    c.setFillColor(white)
    c.setStrokeColor(BORDER)
    c.roundRect(16 * mm, y - 28 * mm, page_w - 32 * mm, 28 * mm, 4 * mm, fill=1, stroke=1)

    draw_text(c, content["objective_label"], 22 * mm, y - 9 * mm, 11, BOLD, BLUE)
    draw_wrapped(
        c,
        content["objective"],
        22 * mm,
        y - 18 * mm,
        page_w - 44 * mm,
        8.8,
        5.2 * mm,
        REGULAR,
        SLATE,
    )

    y -= 36 * mm

    y = draw_section(
        c,
        content["hazards_title"],
        content["hazards"],
        16 * mm,
        y,
        page_w - 32 * mm,
        RED,
        PALE_RED,
    )

    y = draw_section(
        c,
        content["controls_title"],
        content["controls"],
        16 * mm,
        y,
        page_w - 32 * mm,
        GREEN,
        PALE_GREEN,
    )

    if y < 55 * mm:
        c.showPage()
        c.setFillColor(LIGHT)
        c.rect(0, 0, page_w, page_h, fill=1, stroke=0)
        y = page_h - 24 * mm

    y = draw_section(
        c,
        content["questions_title"],
        content["questions"],
        16 * mm,
        y,
        page_w - 32 * mm,
        BLUE,
        PALE_BLUE,
    )

    c.setStrokeColor(BORDER)
    c.line(18 * mm, 18 * mm, page_w - 18 * mm, 18 * mm)
    draw_text(c, content["footer"], 18 * mm, 11 * mm, 7.2, REGULAR, SLATE)

    # PAGE 2 — ATTENDANCE
    c.showPage()
    c.setFillColor(LIGHT)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)

    c.setFillColor(NAVY)
    c.rect(0, page_h - 40 * mm, page_w, 40 * mm, fill=1, stroke=0)

    draw_text(c, content["attendance_title"], 18 * mm, page_h - 22 * mm, 19, BOLD, white)
    draw_text(c, content["title"], 18 * mm, page_h - 32 * mm, 9.5, REGULAR, HexColor("#BFDBFE"))

    labels = content["fields"]
    field_y = page_h - 55 * mm

    for index, label in enumerate(labels):
        col = index % 2
        row = index // 2
        x = 18 * mm + col * 88 * mm
        y_field = field_y - row * 18 * mm

        draw_text(c, label, x, y_field, 8.5, BOLD, SLATE)
        c.setStrokeColor(BORDER)
        c.line(x, y_field - 6 * mm, x + 75 * mm, y_field - 6 * mm)

    table_y = page_h - 105 * mm
    left = 18 * mm
    widths = [12 * mm, 72 * mm, 52 * mm, 38 * mm]
    headers = content["table_headers"]

    c.setFillColor(NAVY)
    c.rect(left, table_y, sum(widths), 11 * mm, fill=1, stroke=0)

    x = left
    for header, width in zip(headers, widths):
        c.setFillColor(white)
        c.setFont(BOLD, 8)
        c.drawCentredString(x + width / 2, table_y + 4 * mm, header)
        x += width

    row_h = 10 * mm

    for row in range(14):
        y_row = table_y - (row + 1) * row_h
        c.setFillColor(white)
        c.setStrokeColor(BORDER)
        c.rect(left, y_row, sum(widths), row_h, fill=1, stroke=1)

        x = left
        for width in widths[:-1]:
            x += width
            c.line(x, y_row, x, y_row + row_h)

        draw_text(c, str(row + 1), left + 4.5 * mm, y_row + 3.5 * mm, 8, REGULAR, SLATE)

    notes_y = table_y - 155 * mm
    draw_text(c, content["notes_title"], 18 * mm, notes_y, 10, BOLD, DARK)

    c.setFillColor(white)
    c.setStrokeColor(BORDER)
    c.roundRect(
        18 * mm,
        notes_y - 40 * mm,
        page_w - 36 * mm,
        34 * mm,
        4 * mm,
        fill=1,
        stroke=1,
    )

    c.setStrokeColor(BORDER)
    c.line(18 * mm, 17 * mm, page_w - 18 * mm, 17 * mm)
    draw_text(c, content["footer"], 18 * mm, 10 * mm, 7.2, REGULAR, SLATE)

    c.save()
    print(f"✅ Created: {path}")


TOOLBOXES = [
    {
        "base": "working-at-height-toolbox-talk",
        "tr": {
            "title": "YÜKSEKTE ÇALIŞMA TOOLBOX TALK",
            "subtitle": "Düşme risklerini işe başlamadan önce kontrol edin.",
            "duration": "5–10 DAKİKA",
            "objective_label": "AMAÇ",
            "objective": "Yüksekte çalışma öncesinde erişim, düşmeye karşı koruma, ankraj, düşen cisimler ve kurtarma hazırlığını ekiple birlikte doğrulamak.",
            "hazards_title": "TEMEL TEHLİKELER",
            "hazards": [
                "Korumasız kenarlardan veya açıklıklardan düşme.",
                "Uygun olmayan merdiven, iskele veya çalışma platformu kullanımı.",
                "Yanlış ankraj, hasarlı emniyet kemeri veya uyumsuz lanyard kullanımı.",
                "Alet ve malzemelerin aşağıya düşmesi.",
            ],
            "controls_title": "KONTROL ÖNLEMLERİ",
            "controls": [
                "Önce korkuluk, güvenli platform ve toplu koruma sistemlerini kullanın.",
                "Emniyet kemeri, lanyard ve ankraj noktalarını kullanım öncesi kontrol edin.",
                "Gerekli alanlarda yüzde yüz bağlı kalın ve onaylı ankraj kullanın.",
                "Aletleri sabitleyin, alt alanı bariyerleyin ve kurtarma planını doğrulayın.",
            ],
            "questions_title": "EKİBE SORULACAK SORULAR",
            "questions": [
                "Bugünkü çalışma için güvenli erişim yolu neresi?",
                "Onaylı ankraj noktaları hangileri?",
                "Bir düşme durumunda kurtarma nasıl gerçekleştirilecek?",
            ],
            "attendance_title": "KATILIM VE ONAY FORMU",
            "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
            "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
            "notes_title": "Süpervizör notları / ek saha talimatları",
            "footer": "SERNEM HSE Resource — Saha prosedürleri ve risk değerlendirmesi önceliklidir.",
        },
        "en": {
            "title": "WORKING AT HEIGHT TOOLBOX TALK",
            "subtitle": "Control fall hazards before work begins.",
            "duration": "5–10 MINUTES",
            "objective_label": "OBJECTIVE",
            "objective": "Confirm safe access, fall protection, anchorage, dropped-object controls and rescue readiness with the work team before starting.",
            "hazards_title": "KEY HAZARDS",
            "hazards": [
                "Falls from unprotected edges or openings.",
                "Unsafe ladders, scaffolds or working platforms.",
                "Incorrect anchorage, damaged harnesses or unsuitable lanyards.",
                "Tools and materials falling onto personnel below.",
            ],
            "controls_title": "CONTROL MEASURES",
            "controls": [
                "Use guardrails, safe platforms and collective protection first.",
                "Inspect harnesses, lanyards and anchorage points before use.",
                "Maintain continuous attachment where required and use approved anchorage.",
                "Secure tools, barricade the area below and confirm the rescue plan.",
            ],
            "questions_title": "DISCUSSION QUESTIONS",
            "questions": [
                "Where is the approved access route for today's task?",
                "Which anchorage points are approved?",
                "How will a suspended worker be rescued?",
            ],
            "attendance_title": "ATTENDANCE AND APPROVAL",
            "fields": ["Project / Site", "Date", "Presented by", "Work area"],
            "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
            "notes_title": "Supervisor notes / additional site instructions",
            "footer": "SERNEM HSE Resource — Site procedures and risk assessments take priority.",
        },
    },
    {
        "base": "hot-work-toolbox-talk",
        "tr": {
            "title": "SICAK ÇALIŞMA TOOLBOX TALK",
            "subtitle": "Kaynak, kesme ve taşlama işlerinde yangını önleyin.",
            "duration": "5–10 DAKİKA",
            "objective_label": "AMAÇ",
            "objective": "Sıcak çalışma öncesinde izin, yanıcı maddeler, gaz ölçümü, yangın gözcüsü ve iş sonrası kontrolleri ekipçe doğrulamak.",
            "hazards_title": "TEMEL TEHLİKELER",
            "hazards": [
                "Kıvılcım ve sıcak parçacıkların yangına neden olması.",
                "Yanıcı gaz, buhar veya malzemenin tutuşması.",
                "Hasarlı kablo, hortum, regülatör veya ekipman.",
                "İş sonrası fark edilmeyen kor veya gizli yanma.",
            ],
            "controls_title": "KONTROL ÖNLEMLERİ",
            "controls": [
                "Geçerli sıcak çalışma izni ve gerekli gaz ölçümleri olmadan başlamayın.",
                "Yanıcı maddeleri uzaklaştırın veya uygun yangın örtüsüyle koruyun.",
                "Eğitimli yangın gözcüsü ve uygun söndürücüyü hazır bulundurun.",
                "İş sonrası alanı kontrol edin ve gerekli süre boyunca gözetimi sürdürün.",
            ],
            "questions_title": "EKİBE SORULACAK SORULAR",
            "questions": [
                "Yangın söndürücü ve alarm noktası nerede?",
                "Bugünkü yangın gözcüsü kim?",
                "İş sonrası gözetim ne kadar devam edecek?",
            ],
            "attendance_title": "KATILIM VE ONAY FORMU",
            "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
            "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
            "notes_title": "Süpervizör notları / ek saha talimatları",
            "footer": "SERNEM HSE Resource — Çalışma izni ve saha prosedürleri önceliklidir.",
        },
        "en": {
            "title": "HOT WORK TOOLBOX TALK",
            "subtitle": "Prevent fires during welding, cutting and grinding.",
            "duration": "5–10 MINUTES",
            "objective_label": "OBJECTIVE",
            "objective": "Confirm the permit, combustible controls, gas testing, fire watch and post-work inspection before hot work begins.",
            "hazards_title": "KEY HAZARDS",
            "hazards": [
                "Sparks and hot particles causing fire.",
                "Ignition of flammable gases, vapours or materials.",
                "Damaged cables, hoses, regulators or equipment.",
                "Hidden embers or combustion after work is completed.",
            ],
            "controls_title": "CONTROL MEASURES",
            "controls": [
                "Do not begin without a valid permit and required gas tests.",
                "Remove combustibles or protect them with suitable fire-resistant covers.",
                "Provide a trained fire watch and an appropriate extinguisher.",
                "Inspect the area after completion and continue monitoring as required.",
            ],
            "questions_title": "DISCUSSION QUESTIONS",
            "questions": [
                "Where are the extinguisher and alarm point?",
                "Who is today's fire watch?",
                "How long will post-work monitoring continue?",
            ],
            "attendance_title": "ATTENDANCE AND APPROVAL",
            "fields": ["Project / Site", "Date", "Presented by", "Work area"],
            "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
            "notes_title": "Supervisor notes / additional site instructions",
            "footer": "SERNEM HSE Resource — Permit conditions and site procedures take priority.",
        },
    },
    {
        "base": "scaffold-safety-toolbox-talk",
        "tr": {
            "title": "İSKELE GÜVENLİĞİ TOOLBOX TALK",
            "subtitle": "İskeleye çıkmadan önce etiketi, erişimi ve platformu kontrol edin.",
            "duration": "5–10 DAKİKA",
            "objective_label": "AMAÇ",
            "objective": "İskele kullanımından önce etiket, güvenli erişim, platform, korkuluk, yükleme ve yetkisiz değişiklik risklerini ekiple değerlendirmek.",
            "hazards_title": "TEMEL TEHLİKELER",
            "hazards": [
                "Geçersiz veya kırmızı etiketli iskelenin kullanılması.",
                "Eksik platform, korkuluk veya topuk levhası.",
                "Uygunsuz erişim veya korkuluklara tırmanma.",
                "Aşırı yükleme ve yetkisiz iskele değişikliği.",
            ],
            "controls_title": "KONTROL ÖNLEMLERİ",
            "controls": [
                "İskele etiketini ve güncel kontrol durumunu doğrulayın.",
                "Platform, korkuluk, topuk levhası ve erişim merdivenini kontrol edin.",
                "İskeleyi aşırı yüklemeyin ve platform üzerinde gereksiz malzeme bırakmayın.",
                "Parça sökmeyin; eksiklik veya hasarı yetkili iskele ekibine bildirin.",
            ],
            "questions_title": "EKİBE SORULACAK SORULAR",
            "questions": [
                "Bu iskelenin etiketi hangi durumda?",
                "Güvenli giriş ve çıkış noktası nerede?",
                "Bir eksiklik görürseniz kime bildireceksiniz?",
            ],
            "attendance_title": "KATILIM VE ONAY FORMU",
            "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
            "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
            "notes_title": "Süpervizör notları / ek saha talimatları",
            "footer": "SERNEM HSE Resource — İskele etiketi ve saha prosedürleri önceliklidir.",
        },
        "en": {
            "title": "SCAFFOLD SAFETY TOOLBOX TALK",
            "subtitle": "Check the tag, access and platform before climbing.",
            "duration": "5–10 MINUTES",
            "objective_label": "OBJECTIVE",
            "objective": "Review scaffold tags, safe access, platforms, edge protection, loading and unauthorized modification risks with the team.",
            "hazards_title": "KEY HAZARDS",
            "hazards": [
                "Using an invalid or red-tagged scaffold.",
                "Missing platforms, guardrails or toe boards.",
                "Unsafe access or climbing scaffold guardrails.",
                "Overloading or unauthorized modification.",
            ],
            "controls_title": "CONTROL MEASURES",
            "controls": [
                "Verify the scaffold tag and current inspection status.",
                "Inspect platforms, guardrails, toe boards and access ladders.",
                "Do not overload the scaffold or store unnecessary materials on it.",
                "Do not remove components; report defects to the authorized scaffold team.",
            ],
            "questions_title": "DISCUSSION QUESTIONS",
            "questions": [
                "What is the status of this scaffold tag?",
                "Where is the approved access point?",
                "Who will you notify if a defect is found?",
            ],
            "attendance_title": "ATTENDANCE AND APPROVAL",
            "fields": ["Project / Site", "Date", "Presented by", "Work area"],
            "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
            "notes_title": "Supervisor notes / additional site instructions",
            "footer": "SERNEM HSE Resource — Scaffold tags and site procedures take priority.",
        },
    },
]


for toolbox in TOOLBOXES:
    for language in ("tr", "en"):
        create_toolbox(
            filename=f"{toolbox['base']}-{language}.pdf",
            language=language,
            content=toolbox[language],
        )
