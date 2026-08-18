from pathlib import Path
import importlib.util

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path("/workspaces/safebase/app")
OUT = ROOT / "public" / "downloads"
OUT.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------
# LOAD EXISTING, WORKING V2 DATA/PARSERS
# ---------------------------------------------------------

v2_path = ROOT / "scripts/generate-checklists-v2.py"

spec = importlib.util.spec_from_file_location("sernem_checklist_v2", v2_path)
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

# ---------------------------------------------------------
# FONT
# ---------------------------------------------------------

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
NAVY2 = HexColor("#0A1B34")
CYAN = HexColor("#06B6D4")
TEAL = HexColor("#0D9488")
TEXT = HexColor("#10213D")
MUTED = HexColor("#64748B")
LIGHT = HexColor("#F8FAFC")
BORDER = HexColor("#CBD5E1")
GREEN = HexColor("#16A34A")
RED = HexColor("#DC2626")
AMBER = HexColor("#F59E0B")

PAGE_W, PAGE_H = A4
LEFT = 14 * mm
RIGHT = PAGE_W - 14 * mm
CONTENT_W = RIGHT - LEFT
TOP_AFTER_HEADER = PAGE_H - 34 * mm
BOTTOM = 20 * mm


# ---------------------------------------------------------
# PPE DATA
# ---------------------------------------------------------

PPE_ITEMS = [
    {
        "id": "ppe-hazard-selection",
        "section_en": "General Requirements",
        "section_tr": "Genel Gereklilikler",
        "text_en": "PPE has been selected according to the identified hazards and task requirements.",
        "text_tr": "KKD, belirlenen tehlikeler ve iş gerekliliklerine uygun olarak seçilmiştir.",
        "critical": True,
    },
    {
        "id": "ppe-fit",
        "section_en": "General Requirements",
        "section_tr": "Genel Gereklilikler",
        "text_en": "PPE is the correct size, fits the user and does not create an additional hazard.",
        "text_tr": "KKD doğru bedendedir, kullanıcıya uygundur ve ilave bir tehlike oluşturmamaktadır.",
        "critical": False,
    },
    {
        "id": "ppe-marking",
        "section_en": "General Requirements",
        "section_tr": "Genel Gereklilikler",
        "text_en": "Required markings, ratings, inspection status and expiry dates are legible and valid.",
        "text_tr": "Gerekli işaretlemeler, sınıflandırmalar, kontrol durumu ve son kullanma tarihleri okunabilir ve geçerlidir.",
        "critical": True,
    },
    {
        "id": "ppe-condition",
        "section_en": "General Requirements",
        "section_tr": "Genel Gereklilikler",
        "text_en": "PPE is clean, serviceable, free from significant damage and stored correctly.",
        "text_tr": "KKD temiz, kullanılabilir durumda, önemli hasarlardan arındırılmış ve uygun şekilde muhafaza edilmektedir.",
        "critical": True,
    },

    {
        "id": "helmet-shell",
        "section_en": "Head, Eye and Face Protection",
        "section_tr": "Baş, Göz ve Yüz Koruması",
        "text_en": "Safety helmet shell and suspension show no cracks, deformation, contamination or unauthorized modification.",
        "text_tr": "Baret dış kabuğu ve içliği çatlak, deformasyon, kirlenme veya izinsiz değişiklik içermemektedir.",
        "critical": True,
    },
    {
        "id": "helmet-chinstrap",
        "section_en": "Head, Eye and Face Protection",
        "section_tr": "Baş, Göz ve Yüz Koruması",
        "text_en": "Helmet chin strap is fitted and serviceable where required by the task or site rules.",
        "text_tr": "İş veya saha kuralları gerektiriyorsa baret çene bağı takılı ve kullanılabilir durumdadır.",
        "critical": False,
    },
    {
        "id": "eye-protection",
        "section_en": "Head, Eye and Face Protection",
        "section_tr": "Baş, Göz ve Yüz Koruması",
        "text_en": "Safety glasses or goggles are appropriate for the hazard, clean and undamaged.",
        "text_tr": "Koruyucu gözlük tehlikeye uygundur, temizdir ve hasarsızdır.",
        "critical": True,
    },
    {
        "id": "face-shield",
        "section_en": "Head, Eye and Face Protection",
        "section_tr": "Baş, Göz ve Yüz Koruması",
        "text_en": "Face shield is suitable for the hazard and free from cracks, deep scratches or impaired visibility.",
        "text_tr": "Yüz siperi tehlikeye uygundur; çatlak, derin çizik veya görüşü engelleyen hasar bulunmamaktadır.",
        "critical": False,
    },

    {
        "id": "glove-selection",
        "section_en": "Hands and Body Protection",
        "section_tr": "El ve Vücut Koruması",
        "text_en": "Gloves are suitable for the specific hazard such as mechanical, chemical, thermal or electrical exposure.",
        "text_tr": "Eldivenler mekanik, kimyasal, termal veya elektriksel maruziyet gibi ilgili tehlikeye uygundur.",
        "critical": True,
    },
    {
        "id": "glove-condition",
        "section_en": "Hands and Body Protection",
        "section_tr": "El ve Vücut Koruması",
        "text_en": "Gloves show no tears, punctures, excessive wear or contamination that could reduce protection.",
        "text_tr": "Eldivenlerde koruma seviyesini azaltabilecek yırtık, delinme, aşırı aşınma veya kirlenme bulunmamaktadır.",
        "critical": True,
    },
    {
        "id": "protective-clothing",
        "section_en": "Hands and Body Protection",
        "section_tr": "El ve Vücut Koruması",
        "text_en": "Protective clothing is appropriate for the work and provides the required body coverage.",
        "text_tr": "Koruyucu kıyafet yapılan işe uygundur ve gerekli vücut korumasını sağlamaktadır.",
        "critical": False,
    },
    {
        "id": "chemical-clothing",
        "section_en": "Hands and Body Protection",
        "section_tr": "El ve Vücut Koruması",
        "text_en": "Chemical protective clothing is compatible with the substance and exposure conditions where required.",
        "text_tr": "Gerektiğinde kimyasal koruyucu kıyafet kullanılan madde ve maruziyet koşullarıyla uyumludur.",
        "critical": True,
    },

    {
        "id": "footwear-selection",
        "section_en": "Foot Protection",
        "section_tr": "Ayak Koruması",
        "text_en": "Safety footwear provides protection appropriate to the work hazards and site requirements.",
        "text_tr": "İş ayakkabısı çalışma tehlikeleri ve saha gerekliliklerine uygun koruma sağlamaktadır.",
        "critical": True,
    },
    {
        "id": "footwear-condition",
        "section_en": "Foot Protection",
        "section_tr": "Ayak Koruması",
        "text_en": "Safety footwear soles, uppers and closures are in serviceable condition.",
        "text_tr": "İş ayakkabısının tabanı, üst kısmı ve bağlantıları kullanılabilir durumdadır.",
        "critical": False,
    },

    {
        "id": "hearing-selection",
        "section_en": "Hearing Protection",
        "section_tr": "İşitme Koruması",
        "text_en": "Hearing protection is available and suitable where noise exposure requires its use.",
        "text_tr": "Gürültü maruziyetinin gerektirdiği alanlarda uygun işitme koruyucu mevcuttur.",
        "critical": True,
    },
    {
        "id": "hearing-condition",
        "section_en": "Hearing Protection",
        "section_tr": "İşitme Koruması",
        "text_en": "Ear plugs or ear defenders are clean, undamaged and used correctly.",
        "text_tr": "Kulak tıkacı veya kulaklık temiz, hasarsız ve doğru şekilde kullanılmaktadır.",
        "critical": False,
    },

    {
        "id": "respiratory-selection",
        "section_en": "Respiratory Protection",
        "section_tr": "Solunum Koruması",
        "text_en": "Respiratory protective equipment is suitable for the identified contaminant and exposure conditions.",
        "text_tr": "Solunum koruyucu ekipman belirlenen kirletici ve maruziyet koşullarına uygundur.",
        "critical": True,
    },
    {
        "id": "respiratory-condition",
        "section_en": "Respiratory Protection",
        "section_tr": "Solunum Koruması",
        "text_en": "Respirator facepiece, straps, valves, filters or cartridges are correctly fitted and serviceable.",
        "text_tr": "Maskenin yüz parçası, kayışları, valfleri, filtreleri veya kartuşları doğru takılmış ve kullanılabilir durumdadır.",
        "critical": True,
    },
    {
        "id": "respirator-seal",
        "section_en": "Respiratory Protection",
        "section_tr": "Solunum Koruması",
        "text_en": "Required respirator fit or seal checks have been completed before use.",
        "text_tr": "Gerekli maske uyum veya sızdırmazlık kontrolleri kullanım öncesinde tamamlanmıştır.",
        "critical": True,
    },

    {
        "id": "harness-condition",
        "section_en": "Fall Protection PPE",
        "section_tr": "Düşüşten Koruyucu KKD",
        "text_en": "Full body harness webbing, stitching, buckles and attachment points show no significant damage.",
        "text_tr": "Tam vücut emniyet kemerinin kolonları, dikişleri, tokaları ve bağlantı noktalarında önemli hasar bulunmamaktadır.",
        "critical": True,
    },
    {
        "id": "lanyard-condition",
        "section_en": "Fall Protection PPE",
        "section_tr": "Düşüşten Koruyucu KKD",
        "text_en": "Lanyards, energy absorbers, connectors and self-retracting devices are suitable and serviceable.",
        "text_tr": "Lanyard, şok emici, bağlantı elemanları ve geri sarımlı sistemler uygun ve kullanılabilir durumdadır.",
        "critical": True,
    },
    {
        "id": "fall-inspection-status",
        "section_en": "Fall Protection PPE",
        "section_tr": "Düşüşten Koruyucu KKD",
        "text_en": "Fall protection equipment inspection status and identification are valid and traceable.",
        "text_tr": "Düşüşten koruyucu ekipmanın kontrol durumu ve kimlik bilgileri geçerli ve izlenebilirdir.",
        "critical": True,
    },

    {
        "id": "ppe-training",
        "section_en": "Use, Training and Storage",
        "section_tr": "Kullanım, Eğitim ve Muhafaza",
        "text_en": "Users understand the correct use, limitations, inspection and care requirements of their PPE.",
        "text_tr": "Kullanıcılar KKD'nin doğru kullanımını, sınırlarını, kontrolünü ve bakım gerekliliklerini bilmektedir.",
        "critical": True,
    },
    {
        "id": "ppe-storage",
        "section_en": "Use, Training and Storage",
        "section_tr": "Kullanım, Eğitim ve Muhafaza",
        "text_en": "PPE is stored in a manner that prevents damage, contamination and deterioration.",
        "text_tr": "KKD hasar, kirlenme ve bozulmayı önleyecek şekilde muhafaza edilmektedir.",
        "critical": False,
    },
]


PPE_META = {
    "slug": "ppe",
    "output_base": "ppe-inspection-checklist",
    "code": "SRN-CHK-PPE-001",
    "title_en": "PPE INSPECTION CHECKLIST",
    "title_tr": "KİŞİSEL KORUYUCU DONANIM KONTROL LİSTESİ",
    "permit_en": "PPE Register / Reference",
    "permit_tr": "KKD Kayıt / Referans",
}


# ---------------------------------------------------------
# HELPERS
# ---------------------------------------------------------

def wrap(c, text, font, size, width):
    words = str(text).split()
    lines = []
    current = ""

    for word in words:
        test = word if not current else current + " " + word

        if c.stringWidth(test, font, size) <= width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def t(locale, tr, en):
    return tr if locale == "tr" else en


def localized_items(meta):
    if meta["slug"] == "ppe":
        return PPE_ITEMS

    source = meta["source"]
    return base.load_checklist(source)


# ---------------------------------------------------------
# PAGE COMPONENTS
# ---------------------------------------------------------

def header(c, meta, locale, page):
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - 21 * mm, PAGE_W, 21 * mm, fill=1, stroke=0)

    c.setFillColor(CYAN)
    c.rect(0, PAGE_H - 21.8 * mm, PAGE_W, 0.8 * mm, fill=1, stroke=0)

    c.setFillColor(white)
    c.setFont(BOLD, 15)
    c.drawString(LEFT, PAGE_H - 10.8 * mm, "SERNEM")

    c.setFillColor(HexColor("#A9C5E7"))
    c.setFont(REGULAR, 6.5)
    c.drawString(
        LEFT,
        PAGE_H - 15.2 * mm,
        t(locale, "Profesyonel HSE Kaynağı", "Professional HSE Resource"),
    )

    c.setFillColor(white)
    c.setFont(BOLD, 7)
    c.drawRightString(RIGHT, PAGE_H - 10.5 * mm, meta["code"])

    c.setFillColor(HexColor("#A9C5E7"))
    c.setFont(REGULAR, 6.5)
    c.drawRightString(
        RIGHT,
        PAGE_H - 15.2 * mm,
        t(locale, f"Rev. 3.0  |  Sayfa {page}", f"Rev. 3.0  |  Page {page}"),
    )


def footer(c, meta, locale, page):
    y = 11 * mm

    c.setStrokeColor(BORDER)
    c.line(LEFT, y + 4 * mm, RIGHT, y + 4 * mm)

    c.setFont(REGULAR, 6)
    c.setFillColor(MUTED)

    c.drawString(
        LEFT,
        y,
        t(
            locale,
            "SERNEM HSE Kaynağı • Saha prosedürleri, izinler ve risk değerlendirmeleri uygulanmalıdır.",
            "SERNEM HSE Resource • Apply site procedures, permits and risk assessments.",
        ),
    )

    c.drawRightString(
        RIGHT,
        y,
        t(
            locale,
            f"{meta['code']} • Rev 3.0 • {page}",
            f"{meta['code']} • Rev 3.0 • {page}",
        ),
    )


def title_block(c, meta, locale):
    y = PAGE_H - 31 * mm

    title = meta["title_tr"] if locale == "tr" else meta["title_en"]

    c.setFillColor(TEXT)
    c.setFont(BOLD, 16)
    c.drawString(LEFT, y, title)

    c.setFillColor(CYAN)
    c.setFont(BOLD, 7.5)
    c.drawString(
        LEFT,
        y - 5 * mm,
        t(
            locale,
            "SAHA KONTROL DOKÜMANI",
            "FIELD INSPECTION DOCUMENT",
        ),
    )

    return y - 11 * mm


def meta_box(c, meta, locale, y):
    h = 25 * mm

    c.setFillColor(LIGHT)
    c.setStrokeColor(BORDER)
    c.roundRect(LEFT, y - h, CONTENT_W, h, 3 * mm, fill=1, stroke=1)

    permit = meta["permit_tr"] if locale == "tr" else meta["permit_en"]

    fields = (
        [
            "Proje / Saha",
            "Tarih / Saat",
            "Denetçi",
            "Konum / Alan",
            permit,
            "Firma / Yüklenici",
        ]
        if locale == "tr"
        else [
            "Project / Site",
            "Date / Time",
            "Inspector",
            "Location / Area",
            permit,
            "Company / Contractor",
        ]
    )

    col_w = CONTENT_W / 3

    for row in range(2):
        for col in range(3):
            x = LEFT + col * col_w
            top = y - row * h / 2

            if col > 0:
                c.setStrokeColor(BORDER)
                c.line(x, top, x, top - h / 2)

            if row == 1:
                c.setStrokeColor(BORDER)
                c.line(x, top, x + col_w, top)

            c.setFillColor(TEXT)
            c.setFont(BOLD, 6.5)
            c.drawString(x + 4 * mm, top - 5 * mm, fields[row * 3 + col])

            c.setStrokeColor(HexColor("#94A3B8"))
            c.line(
                x + 4 * mm,
                top - 10.2 * mm,
                x + col_w - 4 * mm,
                top - 10.2 * mm,
            )

    return y - h - 5 * mm


def section_bar(c, y, no, title):
    h = 9 * mm

    c.setFillColor(NAVY)
    c.roundRect(LEFT, y - h, CONTENT_W, h, 2 * mm, fill=1, stroke=0)

    c.setFillColor(TEAL)
    c.circle(LEFT + 5 * mm, y - h / 2, 4 * mm, fill=1, stroke=0)

    c.setFillColor(white)
    c.setFont(BOLD, 7)
    c.drawCentredString(LEFT + 5 * mm, y - 5.8 * mm, str(no))

    c.setFont(BOLD, 7.2)
    c.drawString(LEFT + 12 * mm, y - 5.7 * mm, title.upper())

    return y - h - 1.5 * mm


def table_header(c, y, locale):
    h = 9 * mm

    widths = [
        8 * mm,
        88 * mm,
        10 * mm,
        10 * mm,
        10 * mm,
        20 * mm,
        CONTENT_W - 146 * mm,
    ]

    labels = (
        ["#", "Kontrol Maddesi", "EVET", "HAYIR", "U/D", "Öncelik", "Yorum / Aksiyon"]
        if locale == "tr"
        else ["#", "Inspection Item", "YES", "NO", "N/A", "Priority", "Comments / Action"]
    )

    c.setFillColor(NAVY2)
    c.roundRect(LEFT, y - h, CONTENT_W, h, 1.5 * mm, fill=1, stroke=0)

    x = LEFT

    for width, label in zip(widths, labels):
        c.setFillColor(white)
        c.setFont(BOLD, 5.6)

        if label in {"#", "EVET", "HAYIR", "U/D", "YES", "NO", "N/A"}:
            c.drawCentredString(x + width / 2, y - 5.8 * mm, label)
        else:
            c.drawString(x + 2 * mm, y - 5.8 * mm, label)

        x += width

    return y - h, widths


def item_row(c, y, no, item, widths, locale):
    positions = [LEFT]

    for width in widths:
        positions.append(positions[-1] + width)

    text = item["text_tr"] if locale == "tr" else item["text_en"]

    lines = wrap(
        c,
        text,
        REGULAR,
        6.4,
        widths[1] - 5 * mm,
    )

    row_h = max(12 * mm, (len(lines) * 3.3 + 6) * mm)

    c.setFillColor(white if no % 2 else LIGHT)
    c.setStrokeColor(BORDER)
    c.rect(LEFT, y - row_h, CONTENT_W, row_h, fill=1, stroke=1)

    for x in positions[1:-1]:
        c.line(x, y, x, y - row_h)

    c.setFillColor(TEXT)
    c.setFont(BOLD, 6.5)
    c.drawCentredString(LEFT + widths[0] / 2, y - 6 * mm, str(no))

    tx = positions[1] + 2 * mm
    ty = y - 5 * mm

    c.setFont(REGULAR, 6.4)
    c.setFillColor(TEXT)

    for line in lines:
        c.drawString(tx, ty, line)
        ty -= 3.2 * mm

    # yes / no / na
    for idx in [2, 3, 4]:
        cx = positions[idx] + widths[idx] / 2
        cy = y - row_h / 2

        if idx == 2:
            c.setStrokeColor(GREEN)
        elif idx == 3:
            c.setStrokeColor(RED)
        else:
            c.setStrokeColor(MUTED)

        c.rect(cx - 2 * mm, cy - 2 * mm, 4 * mm, 4 * mm, fill=0, stroke=1)

    # priority
    px = positions[5]
    pw = widths[5]
    critical = bool(item.get("critical"))

    c.setFillColor(RED if critical else AMBER)
    c.roundRect(
        px + 2.2 * mm,
        y - row_h / 2 - 2.3 * mm,
        pw - 4.4 * mm,
        4.6 * mm,
        1.2 * mm,
        fill=1,
        stroke=0,
    )

    c.setFillColor(white)
    c.setFont(BOLD, 4.7)

    label = (
        ("KRİTİK" if critical else "STANDART")
        if locale == "tr"
        else ("CRITICAL" if critical else "STANDARD")
    )

    c.drawCentredString(
        px + pw / 2,
        y - row_h / 2 - 1.4 * mm,
        label,
    )

    return y - row_h


def summary_page(c, meta, locale, page):
    header(c, meta, locale, page)

    y = PAGE_H - 32 * mm

    c.setFillColor(TEXT)
    c.setFont(BOLD, 17)
    c.drawString(
        LEFT,
        y,
        t(locale, "BULGULAR VE DÜZELTİCİ FAALİYETLER", "FINDINGS & CORRECTIVE ACTIONS"),
    )

    y -= 12 * mm

    c.setFillColor(LIGHT)
    c.setStrokeColor(BORDER)
    c.roundRect(LEFT, y - 22 * mm, CONTENT_W, 22 * mm, 3 * mm, fill=1, stroke=1)

    fields = (
        ["Toplam Madde", "Evet", "Hayır", "U/D", "Açık Bulgu"]
        if locale == "tr"
        else ["Total Items", "YES", "NO", "N/A", "Open Findings"]
    )

    cell = CONTENT_W / 5

    for i, label in enumerate(fields):
        x = LEFT + i * cell

        if i:
            c.line(x, y, x, y - 22 * mm)

        c.setFillColor(MUTED)
        c.setFont(BOLD, 6)
        c.drawCentredString(x + cell / 2, y - 6 * mm, label)

        c.setFillColor(TEXT)
        c.setFont(BOLD, 15)
        c.drawCentredString(x + cell / 2, y - 15 * mm, "_____")

    y -= 29 * mm

    headings = (
        [
            ("Bulgu", 62 * mm),
            ("Aksiyon", 61 * mm),
            ("Sorumlu", 27 * mm),
            ("Termin", 22 * mm),
            ("Durum", CONTENT_W - 172 * mm),
        ]
        if locale == "tr"
        else [
            ("Finding", 62 * mm),
            ("Action", 61 * mm),
            ("Responsible", 27 * mm),
            ("Due", 22 * mm),
            ("Status", CONTENT_W - 172 * mm),
        ]
    )

    c.setFillColor(NAVY2)
    c.roundRect(LEFT, y - 9 * mm, CONTENT_W, 9 * mm, 2 * mm, fill=1, stroke=0)

    x = LEFT

    for label, width in headings:
        c.setFillColor(white)
        c.setFont(BOLD, 5.6)
        c.drawString(x + 2 * mm, y - 5.8 * mm, label)
        x += width

    y -= 9 * mm

    for row in range(7):
        rh = 16 * mm

        c.setFillColor(white if row % 2 == 0 else LIGHT)
        c.setStrokeColor(BORDER)
        c.rect(LEFT, y - rh, CONTENT_W, rh, fill=1, stroke=1)

        x = LEFT
        for _, width in headings[:-1]:
            x += width
            c.line(x, y, x, y - rh)

        y -= rh

    y -= 8 * mm

    c.setFillColor(TEXT)
    c.setFont(BOLD, 10)
    c.drawString(
        LEFT,
        y,
        t(locale, "SON ONAY", "FINAL AUTHORIZATION"),
    )

    y -= 8 * mm
    sign_w = CONTENT_W / 3

    sign_labels = (
        ["Denetçi", "Süpervizör", "İzin Veren"]
        if locale == "tr"
        else ["Inspector", "Supervisor", "Permit Issuer"]
    )

    for i, label in enumerate(sign_labels):
        x = LEFT + i * sign_w

        c.setFillColor(LIGHT)
        c.setStrokeColor(BORDER)
        c.roundRect(
            x + 1 * mm,
            y - 25 * mm,
            sign_w - 2 * mm,
            25 * mm,
            2 * mm,
            fill=1,
            stroke=1,
        )

        c.setFillColor(TEXT)
        c.setFont(BOLD, 6.5)
        c.drawString(x + 5 * mm, y - 6 * mm, label)

        c.line(
            x + 5 * mm,
            y - 17 * mm,
            x + sign_w - 5 * mm,
            y - 17 * mm,
        )

        c.setFillColor(MUTED)
        c.setFont(REGULAR, 5)
        c.drawString(
            x + 5 * mm,
            y - 21 * mm,
            t(locale, "Ad / İmza / Tarih", "Name / Signature / Date"),
        )

    footer(c, meta, locale, page)


# ---------------------------------------------------------
# GENERATION
# ---------------------------------------------------------

def normalized_meta(meta):
    return {
        "slug": meta["slug"],
        "source": meta.get("source"),
        "output_base": meta["output"].replace(".pdf", ""),
        "code": meta["code"],
        "title_en": meta["title_en"],
        "title_tr": meta["title_tr"],
        "permit_en": meta["permit_label"].split(" / ")[0],
        "permit_tr": (
            meta["permit_label"].split(" / ")[1]
            if " / " in meta["permit_label"]
            else meta["permit_label"]
        ),
    }


CHECKLISTS = [normalized_meta(x) for x in base.CHECKLISTS]
CHECKLISTS.append(PPE_META)


def generate(meta, locale):
    items = localized_items(meta)

    output = OUT / f"{meta['output_base']}-{locale}.pdf"

    c = canvas.Canvas(str(output), pagesize=A4)

    page = 1

    header(c, meta, locale, page)
    y = title_block(c, meta, locale)
    y = meta_box(c, meta, locale, y)

    current_section = None
    section_no = 0
    item_no = 0
    widths = None

    for item in items:
        section = item["section_tr"] if locale == "tr" else item["section_en"]

        if section != current_section:
            if y - 30 * mm < BOTTOM:
                footer(c, meta, locale, page)
                c.showPage()
                page += 1
                header(c, meta, locale, page)
                y = TOP_AFTER_HEADER

            current_section = section
            section_no += 1

            y = section_bar(c, y, section_no, section)
            y, widths = table_header(c, y, locale)

        text = item["text_tr"] if locale == "tr" else item["text_en"]

        line_count = len(
            wrap(
                c,
                text,
                REGULAR,
                6.4,
                widths[1] - 5 * mm,
            )
        )

        estimated = max(
            12 * mm,
            (line_count * 3.3 + 6) * mm,
        )

        if y - estimated < BOTTOM:
            footer(c, meta, locale, page)
            c.showPage()
            page += 1
            header(c, meta, locale, page)
            y = TOP_AFTER_HEADER

            y = section_bar(c, y, section_no, section)
            y, widths = table_header(c, y, locale)

        item_no += 1
        y = item_row(c, y, item_no, item, widths, locale)

    footer(c, meta, locale, page)

    c.showPage()
    page += 1
    summary_page(c, meta, locale, page)

    c.save()

    print(
        f"✅ {meta['slug']:<18} {locale.upper()} "
        f"{len(items):>3} items | {page} pages | {output.name}"
    )


def main():
    print("=" * 76)
    print("SERNEM CHECKLIST PDF ENGINE V3 — LANGUAGE SPLIT")
    print("=" * 76)

    for meta in CHECKLISTS:
        for locale in ("tr", "en"):
            generate(meta, locale)

    print("=" * 76)
    print("✅ 14 LANGUAGE-SPECIFIC PDF FILES GENERATED")
    print("=" * 76)


if __name__ == "__main__":
    main()
