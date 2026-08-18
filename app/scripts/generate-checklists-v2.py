from pathlib import Path
import re

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path("/workspaces/safebase/app")
OUT = ROOT / "public" / "downloads"
OUT.mkdir(parents=True, exist_ok=True)

REGULAR_PATH = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
BOLD_PATH = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")

if REGULAR_PATH.exists() and BOLD_PATH.exists():
    pdfmetrics.registerFont(TTFont("SERNEM-Regular", str(REGULAR_PATH)))
    pdfmetrics.registerFont(TTFont("SERNEM-Bold", str(BOLD_PATH)))
    REGULAR = "SERNEM-Regular"
    BOLD = "SERNEM-Bold"
else:
    REGULAR = "Helvetica"
    BOLD = "Helvetica-Bold"


NAVY = HexColor("#061329")
NAVY_2 = HexColor("#0A1B34")
BLUE = HexColor("#2563EB")
CYAN = HexColor("#06B6D4")
TEAL = HexColor("#0D9488")

TEXT = HexColor("#10213D")
MUTED = HexColor("#64748B")
LIGHT = HexColor("#F8FAFC")
SOFT = HexColor("#F1F5F9")
BORDER = HexColor("#CBD5E1")

GREEN = HexColor("#16A34A")
RED = HexColor("#DC2626")
AMBER = HexColor("#F59E0B")

PAGE_W, PAGE_H = A4

LEFT = 14 * mm
RIGHT = PAGE_W - 14 * mm
CONTENT_W = RIGHT - LEFT

TOP_AFTER_HEADER = PAGE_H - 34 * mm
BOTTOM_LIMIT = 20 * mm


CHECKLISTS = [
    {
        "slug": "confined-space",
        "source": ROOT / "app/[locale]/checklists/confined-space/checklistData.ts",
        "output": "confined-space-entry-checklist.pdf",
        "code": "SRN-CHK-CS-001",
        "title_en": "CONFINED SPACE ENTRY CHECKLIST",
        "title_tr": "KAPALI ALAN GİRİŞ KONTROL LİSTESİ",
        "permit_label": "Confined Space Permit No. / Kapalı Alan İzin No.",
    },
    {
        "slug": "hot-work",
        "source": ROOT / "app/[locale]/checklists/hot-work/checklistData.ts",
        "output": "hot-work-inspection-checklist.pdf",
        "code": "SRN-CHK-HW-001",
        "title_en": "HOT WORK INSPECTION CHECKLIST",
        "title_tr": "SICAK ÇALIŞMA KONTROL LİSTESİ",
        "permit_label": "Hot Work Permit No. / Sıcak Çalışma İzin No.",
    },
    {
        "slug": "loto",
        "source": ROOT / "app/[locale]/checklists/loto/checklistData.ts",
        "output": "loto-verification-checklist.pdf",
        "code": "SRN-CHK-LOTO-001",
        "title_en": "LOTO VERIFICATION CHECKLIST",
        "title_tr": "LOTO DOĞRULAMA KONTROL LİSTESİ",
        "permit_label": "Isolation Certificate No. / İzolasyon No.",
    },
    {
        "slug": "scaffold",
        "source": ROOT / "app/[locale]/checklists/scaffold/checklistData.ts",
        "output": "scaffold-inspection-checklist.pdf",
        "code": "SRN-CHK-SCF-001",
        "title_en": "SCAFFOLD INSPECTION CHECKLIST",
        "title_tr": "İSKELE KONTROL LİSTESİ",
        "permit_label": "Scaffold Tag / İskele Etiketi",
    },
    {
        "slug": "work-at-height",
        "source": ROOT / "app/[locale]/checklists/work-at-height/checklistData.ts",
        "output": "working-at-height-checklist.pdf",
        "code": "SRN-CHK-WAH-001",
        "title_en": "WORKING AT HEIGHT CHECKLIST",
        "title_tr": "YÜKSEKTE ÇALIŞMA KONTROL LİSTESİ",
        "permit_label": "Work Permit No. / Çalışma İzin No.",
    },
    {
        "slug": "lifting",
        "source": ROOT / "app/[locale]/checklists/lifting/checklistData.ts",
        "output": "lifting-operations-checklist.pdf",
        "code": "SRN-CHK-LFT-001",
        "title_en": "LIFTING OPERATIONS CHECKLIST",
        "title_tr": "KALDIRMA OPERASYONLARI KONTROL LİSTESİ",
        "permit_label": "Lifting Plan No. / Kaldırma Planı No.",
    },
]


def find_locale_array(text: str, locale: str) -> str:
    """
    Finds the real locale array inside checklistItems:
        en: [ ... ]
        tr: [ ... ]

    Ignores type declarations such as:
        Record<"en" | "tr", ChecklistItem[]>
    """

    checklist_pos = text.find("checklistItems")

    if checklist_pos == -1:
        raise ValueError("checklistItems export not found")

    search_text = text[checklist_pos:]

    pattern = re.compile(
        rf'\b{re.escape(locale)}\s*:\s*\[',
        re.MULTILINE,
    )

    match = pattern.search(search_text)

    if not match:
        raise ValueError(
            f"Locale array not found: {locale}"
        )

    absolute_start = checklist_pos + match.end() - 1

    depth = 0
    in_string = False
    quote_char = None
    escape = False

    for i in range(absolute_start, len(text)):
        ch = text[i]

        if in_string:
            if escape:
                escape = False
                continue

            if ch == "\\":
                escape = True
                continue

            if ch == quote_char:
                in_string = False
                quote_char = None

            continue

        if ch in {'"', "'", "`"}:
            in_string = True
            quote_char = ch
            continue

        if ch == "[":
            depth += 1

        elif ch == "]":
            depth -= 1

            if depth == 0:
                return text[absolute_start + 1:i]

    raise ValueError(
        f"Unclosed locale array: {locale}"
    )


def decode_ts_string(value: str) -> str:
    """
    Preserve UTF-8 Turkish characters while decoding
    common TypeScript string escapes.
    """
    return (
        value
        .replace(r'\"', '"')
        .replace(r"\'", "'")
        .replace(r"\\", "\\")
        .replace(r"\n", "\n")
        .replace(r"\t", "\t")
    )


def parse_items(array_text: str):
    """
    Parse ChecklistItem objects without depending on
    property order.
    """

    objects = []

    depth = 0
    start = None
    in_string = False
    quote_char = None
    escape = False

    for i, ch in enumerate(array_text):

        if in_string:
            if escape:
                escape = False
                continue

            if ch == "\\":
                escape = True
                continue

            if ch == quote_char:
                in_string = False
                quote_char = None

            continue

        if ch in {'"', "'", "`"}:
            in_string = True
            quote_char = ch
            continue

        if ch == "{":
            if depth == 0:
                start = i
            depth += 1

        elif ch == "}":
            depth -= 1

            if depth == 0 and start is not None:
                objects.append(array_text[start:i + 1])
                start = None

    result = []

    def field(obj: str, name: str):
        m = re.search(
            rf'\b{re.escape(name)}\s*:\s*'
            r'(?P<q>["\'`])'
            r'(?P<value>(?:\\.|(?!\1).)*)'
            r'(?P=q)',
            obj,
            re.DOTALL,
        )

        if not m:
            return None

        return decode_ts_string(m.group("value"))

    for obj in objects:

        item_id = field(obj, "id")
        section = field(obj, "section")
        item_text = field(obj, "text")

        if not item_id or section is None or item_text is None:
            continue

        critical_match = re.search(
            r'\bcritical\s*:\s*(true|false)',
            obj,
            re.IGNORECASE,
        )

        result.append(
            {
                "id": item_id,
                "section": section,
                "text": item_text,
                "critical": bool(
                    critical_match
                    and critical_match.group(1).lower() == "true"
                ),
            }
        )

    return result



def balanced_segment(text: str, start: int, opener: str, closer: str) -> str:
    depth = 0
    in_string = False
    quote_char = None
    escape = False

    for i in range(start, len(text)):
        ch = text[i]

        if in_string:
            if escape:
                escape = False
                continue

            if ch == "\\":
                escape = True
                continue

            if ch == quote_char:
                in_string = False
                quote_char = None

            continue

        if ch in {'"', "'", "`"}:
            in_string = True
            quote_char = ch
            continue

        if ch == opener:
            depth += 1

        elif ch == closer:
            depth -= 1

            if depth == 0:
                return text[start + 1:i]

    raise ValueError(
        f"Unclosed segment starting at {start}: {opener}{closer}"
    )


def find_property_array(text: str, property_name: str) -> str:
    pattern = re.compile(
        rf'\b{re.escape(property_name)}\s*:\s*\[',
        re.MULTILINE,
    )

    match = pattern.search(text)

    if not match:
        raise ValueError(
            f"Array property not found: {property_name}"
        )

    start = match.end() - 1

    return balanced_segment(
        text,
        start,
        "[",
        "]",
    )


def find_property_object(text: str, property_name: str) -> str:
    pattern = re.compile(
        rf'\b{re.escape(property_name)}\s*:\s*\{{',
        re.MULTILINE,
    )

    match = pattern.search(text)

    if not match:
        raise ValueError(
            f"Object property not found: {property_name}"
        )

    start = match.end() - 1

    return balanced_segment(
        text,
        start,
        "{",
        "}",
    )


def split_top_level_objects(text: str):
    objects = []

    depth = 0
    start = None
    in_string = False
    quote_char = None
    escape = False

    for i, ch in enumerate(text):

        if in_string:
            if escape:
                escape = False
                continue

            if ch == "\\":
                escape = True
                continue

            if ch == quote_char:
                in_string = False
                quote_char = None

            continue

        if ch in {'"', "'", "`"}:
            in_string = True
            quote_char = ch
            continue

        if ch == "{":
            if depth == 0:
                start = i

            depth += 1

        elif ch == "}":
            depth -= 1

            if depth == 0 and start is not None:
                objects.append(
                    text[start:i + 1]
                )
                start = None

    return objects


def ts_string_field(text: str, field_name: str):
    pattern = re.compile(
        rf'\b{re.escape(field_name)}\s*:\s*'
        r'(?P<q>["\'`])'
        r'(?P<value>(?:\\.|(?!\1).)*)'
        r'(?P=q)',
        re.DOTALL,
    )

    match = pattern.search(text)

    if not match:
        return None

    return decode_ts_string(
        match.group("value")
    )


def localized_value(obj_text: str, property_name: str, locale: str):
    localized_object = find_property_object(
        obj_text,
        property_name,
    )

    value = ts_string_field(
        localized_object,
        locale,
    )

    if value is None:
        raise ValueError(
            f"{property_name}.{locale} not found"
        )

    return value


def find_hot_work_source():
    candidates = [
        ROOT / "data/checklists/hot-work.ts",
        ROOT / "data/checklists/hot-work.tsx",
        ROOT / "data/checklists/hot-work/index.ts",
        ROOT / "data/checklists/hot-work/index.tsx",
    ]

    for candidate in candidates:
        if candidate.exists():
            return candidate

    base = ROOT / "data/checklists"

    if base.exists():
        matches = sorted(
            [
                item
                for item in base.rglob("*")
                if item.is_file()
                and "hot-work" in str(item)
                and item.suffix in {".ts", ".tsx"}
            ]
        )

        if matches:
            return matches[0]

    raise FileNotFoundError(
        "Hot Work source not found under data/checklists"
    )


def load_hot_work_checklist():
    source = find_hot_work_source()

    text = source.read_text(
        encoding="utf-8"
    )

    sections_array = find_property_array(
        text,
        "sections",
    )

    section_objects = split_top_level_objects(
        sections_array
    )

    merged = []

    for section_obj in section_objects:
        try:
            section_en = localized_value(
                section_obj,
                "title",
                "en",
            )

            section_tr = localized_value(
                section_obj,
                "title",
                "tr",
            )

            items_array = find_property_array(
                section_obj,
                "items",
            )

        except ValueError:
            continue

        item_objects = split_top_level_objects(
            items_array
        )

        for item_obj in item_objects:
            item_id = ts_string_field(
                item_obj,
                "id",
            )

            if not item_id:
                continue

            try:
                text_en = localized_value(
                    item_obj,
                    "requirement",
                    "en",
                )

                text_tr = localized_value(
                    item_obj,
                    "requirement",
                    "tr",
                )

            except ValueError:
                continue

            critical_match = re.search(
                r'\bcritical\s*:\s*(true|false)',
                item_obj,
                re.IGNORECASE,
            )

            critical = bool(
                critical_match
                and critical_match.group(1).lower() == "true"
            )

            risk_level = ts_string_field(
                item_obj,
                "riskLevel",
            )

            applicability = ts_string_field(
                item_obj,
                "applicability",
            )

            try:
                guidance_en = localized_value(
                    item_obj,
                    "guidance",
                    "en",
                )
                guidance_tr = localized_value(
                    item_obj,
                    "guidance",
                    "tr",
                )
            except ValueError:
                guidance_en = ""
                guidance_tr = ""

            try:
                corrective_en = localized_value(
                    item_obj,
                    "correctiveAction",
                    "en",
                )
                corrective_tr = localized_value(
                    item_obj,
                    "correctiveAction",
                    "tr",
                )
            except ValueError:
                corrective_en = ""
                corrective_tr = ""

            merged.append(
                {
                    "id": item_id,
                    "section_en": section_en,
                    "section_tr": section_tr,
                    "text_en": text_en,
                    "text_tr": text_tr,
                    "critical": critical,
                    "risk_level": risk_level or "",
                    "applicability": applicability or "",
                    "guidance_en": guidance_en,
                    "guidance_tr": guidance_tr,
                    "corrective_en": corrective_en,
                    "corrective_tr": corrective_tr,
                }
            )

    if not merged:
        raise ValueError(
            f"No Hot Work checklist items parsed from {source}"
        )

    print(
        f"🔥 Hot Work source: {source}"
    )

    return merged


def load_checklist(path: Path):
    # Hot Work uses the centralized sections/items data model.
    if path.parent.name == "hot-work":
        return load_hot_work_checklist()

    # Other checklists use direct EN/TR ChecklistItem arrays.
    text = path.read_text(
        encoding="utf-8"
    )

    en_array = find_locale_array(
        text,
        "en",
    )

    tr_array = find_locale_array(
        text,
        "tr",
    )

    en_items = parse_items(
        en_array
    )

    tr_items = parse_items(
        tr_array
    )

    if not en_items:
        raise ValueError(
            f"No English items parsed: {path}"
        )

    if not tr_items:
        raise ValueError(
            f"No Turkish items parsed: {path}"
        )

    en_by_id = {
        item["id"]: item
        for item in en_items
    }

    tr_by_id = {
        item["id"]: item
        for item in tr_items
    }

    missing_tr = [
        item_id
        for item_id in en_by_id
        if item_id not in tr_by_id
    ]

    missing_en = [
        item_id
        for item_id in tr_by_id
        if item_id not in en_by_id
    ]

    if missing_tr:
        raise ValueError(
            "Missing Turkish IDs: "
            + ", ".join(missing_tr)
        )

    if missing_en:
        raise ValueError(
            "Missing English IDs: "
            + ", ".join(missing_en)
        )

    merged = []

    for en in en_items:
        tr = tr_by_id[
            en["id"]
        ]

        merged.append(
            {
                "id": en["id"],
                "section_en": en["section"],
                "section_tr": tr["section"],
                "text_en": en["text"],
                "text_tr": tr["text"],
                "critical": bool(
                    en["critical"]
                    or tr["critical"]
                ),
            }
        )

    return merged


def wrap_text(c, text, font, size, max_width):
    words = str(text).split()
    lines = []
    current = ""

    for word in words:
        candidate = word if not current else f"{current} {word}"

        if c.stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word

    if current:
        lines.append(current)

    return lines


def draw_header(c, meta, page_no):
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - 21 * mm, PAGE_W, 21 * mm, fill=1, stroke=0)

    c.setFillColor(CYAN)
    c.rect(0, PAGE_H - 21.8 * mm, PAGE_W, 0.8 * mm, fill=1, stroke=0)

    c.setFont(BOLD, 15)
    c.setFillColor(white)
    c.drawString(LEFT, PAGE_H - 10.8 * mm, "SERNEM")

    c.setFont(REGULAR, 6.5)
    c.setFillColor(HexColor("#A9C5E7"))
    c.drawString(LEFT, PAGE_H - 15.2 * mm, "Professional HSE Resource")

    c.setFont(BOLD, 7)
    c.setFillColor(white)
    c.drawRightString(
        RIGHT,
        PAGE_H - 10.5 * mm,
        meta["code"],
    )

    c.setFont(REGULAR, 6.5)
    c.setFillColor(HexColor("#A9C5E7"))
    c.drawRightString(
        RIGHT,
        PAGE_H - 15.2 * mm,
        f"Rev. 2.0  |  Page {page_no}",
    )


def draw_footer(c, meta, page_no):
    y = 11 * mm

    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(LEFT, y + 4 * mm, RIGHT, y + 4 * mm)

    c.setFont(REGULAR, 6.2)
    c.setFillColor(MUTED)
    c.drawString(
        LEFT,
        y,
        "SERNEM HSE Resource • Apply site procedures, permits and risk assessments.",
    )

    c.drawRightString(
        RIGHT,
        y,
        f"{meta['code']} • Rev 2.0 • {page_no}",
    )


def page_title(c, meta):
    y = PAGE_H - 31 * mm

    c.setFillColor(TEXT)
    c.setFont(BOLD, 17)
    c.drawString(LEFT, y, meta["title_en"])

    c.setFont(BOLD, 9.5)
    c.setFillColor(CYAN)
    c.drawString(LEFT, y - 5.3 * mm, meta["title_tr"])

    return y - 11 * mm


def draw_meta_box(c, meta, y):
    h = 25 * mm

    c.setFillColor(LIGHT)
    c.setStrokeColor(BORDER)
    c.roundRect(LEFT, y - h, CONTENT_W, h, 3 * mm, fill=1, stroke=1)

    col_w = CONTENT_W / 3
    fields = [
        ("Project / Site", "Proje / Saha"),
        ("Date / Time", "Tarih / Saat"),
        ("Inspector", "Denetçi"),
        ("Location / Area", "Konum / Alan"),
        (meta["permit_label"].split(" / ")[0],
         meta["permit_label"].split(" / ")[1]
         if " / " in meta["permit_label"] else ""),
        ("Company / Contractor", "Firma / Yüklenici"),
    ]

    for row in range(2):
        for col in range(3):
            x = LEFT + col * col_w
            top = y - row * (h / 2)
            label_en, label_tr = fields[row * 3 + col]

            if col > 0:
                c.setStrokeColor(BORDER)
                c.line(x, top, x, top - h / 2)

            if row == 1:
                c.setStrokeColor(BORDER)
                c.line(x, top, x + col_w, top)

            c.setFont(BOLD, 6.5)
            c.setFillColor(TEXT)
            c.drawString(x + 4 * mm, top - 4.5 * mm, label_en)

            c.setFont(REGULAR, 5.8)
            c.setFillColor(MUTED)
            c.drawString(x + 4 * mm, top - 7.6 * mm, label_tr)

            c.setStrokeColor(HexColor("#94A3B8"))
            c.line(
                x + 4 * mm,
                top - 10.2 * mm,
                x + col_w - 4 * mm,
                top - 10.2 * mm,
            )

    return y - h - 5 * mm


def draw_table_header(c, y):
    row_h = 9 * mm

    c.setFillColor(NAVY_2)
    c.roundRect(
        LEFT,
        y - row_h,
        CONTENT_W,
        row_h,
        1.6 * mm,
        fill=1,
        stroke=0,
    )

    widths = [
        8 * mm,      # #
        88 * mm,     # Inspection Item
        10 * mm,     # YES
        10 * mm,     # NO
        10 * mm,     # N/A
        20 * mm,     # Priority
        CONTENT_W - (146 * mm),  # Comments / Action
    ]

    labels = [
        "#",
        "Inspection Item / Kontrol Maddesi",
        "YES",
        "NO",
        "N/A",
        "Priority",
        "Comments / Action",
    ]

    x = LEFT

    for width, label in zip(widths, labels):
        c.setFont(BOLD, 5.8)
        c.setFillColor(white)

        if label in {"YES", "NO", "N/A", "#"}:
            c.drawCentredString(x + width / 2, y - 5.8 * mm, label)
        else:
            c.drawString(x + 2 * mm, y - 5.8 * mm, label)

        x += width

    return y - row_h, widths


def draw_section_bar(c, y, number, en, tr):
    h = 9 * mm

    c.setFillColor(NAVY)
    c.roundRect(
        LEFT,
        y - h,
        CONTENT_W,
        h,
        2 * mm,
        fill=1,
        stroke=0,
    )

    c.setFillColor(TEAL)
    c.circle(LEFT + 5 * mm, y - h / 2, 4 * mm, fill=1, stroke=0)

    c.setFillColor(white)
    c.setFont(BOLD, 7)
    c.drawCentredString(LEFT + 5 * mm, y - 5.8 * mm, str(number))

    c.setFont(BOLD, 7.2)
    c.drawString(LEFT + 12 * mm, y - 5.7 * mm, en.upper())

    en_w = c.stringWidth(en.upper(), BOLD, 7.2)

    c.setFont(BOLD, 6.1)
    c.setFillColor(CYAN)
    c.drawString(
        LEFT + 14 * mm + en_w,
        y - 5.7 * mm,
        tr.upper(),
    )

    return y - h - 1.5 * mm


def draw_item_row(c, y, item_no, item, widths):
    x_positions = [LEFT]

    for width in widths:
        x_positions.append(x_positions[-1] + width)

    text_width = widths[1] - 5 * mm

    en_lines = wrap_text(
        c,
        item["text_en"],
        REGULAR,
        6.4,
        text_width,
    )

    tr_lines = wrap_text(
        c,
        item["text_tr"],
        REGULAR,
        5.5,
        text_width,
    )

    line_count = len(en_lines) + len(tr_lines)

    row_h = max(
        12 * mm,
        (line_count * 3.1 + 5) * mm,
    )

    c.setFillColor(white if item_no % 2 else LIGHT)
    c.setStrokeColor(BORDER)
    c.rect(
        LEFT,
        y - row_h,
        CONTENT_W,
        row_h,
        fill=1,
        stroke=1,
    )

    for x in x_positions[1:-1]:
        c.setStrokeColor(BORDER)
        c.line(x, y, x, y - row_h)

    c.setFillColor(TEXT)
    c.setFont(BOLD, 6.5)
    c.drawCentredString(
        LEFT + widths[0] / 2,
        y - 6 * mm,
        str(item_no),
    )

    tx = x_positions[1] + 2 * mm
    ty = y - 4.5 * mm

    c.setFont(REGULAR, 6.4)
    c.setFillColor(TEXT)

    for line in en_lines:
        c.drawString(tx, ty, line)
        ty -= 3.1 * mm

    c.setFont(REGULAR, 5.5)
    c.setFillColor(MUTED)

    for line in tr_lines:
        c.drawString(tx, ty, line)
        ty -= 2.8 * mm

    for col_index in [2, 3, 4]:
        cx = (
            x_positions[col_index]
            + widths[col_index] / 2
        )

        cy = y - row_h / 2

        c.setStrokeColor(
            GREEN if col_index == 2
            else RED if col_index == 3
            else MUTED
        )

        c.setLineWidth(0.8)
        c.rect(
            cx - 2 * mm,
            cy - 2 * mm,
            4 * mm,
            4 * mm,
            fill=0,
            stroke=1,
        )

    priority_x = x_positions[5]
    priority_w = widths[5]

    c.setFillColor(RED if item["critical"] else AMBER)
    c.roundRect(
        priority_x + 2.2 * mm,
        y - row_h / 2 - 2.3 * mm,
        priority_w - 4.4 * mm,
        4.6 * mm,
        1.2 * mm,
        fill=1,
        stroke=0,
    )

    c.setFillColor(white)
    c.setFont(BOLD, 4.8)
    c.drawCentredString(
        priority_x + priority_w / 2,
        y - row_h / 2 - 1.4 * mm,
        "CRITICAL" if item["critical"] else "STANDARD",
    )

    return y - row_h


def draw_summary_page(c, meta, page_no):
    draw_header(c, meta, page_no)

    y = PAGE_H - 32 * mm

    c.setFillColor(TEXT)
    c.setFont(BOLD, 17)
    c.drawString(
        LEFT,
        y,
        "FINDINGS & CORRECTIVE ACTIONS",
    )

    c.setFont(BOLD, 9.5)
    c.setFillColor(CYAN)
    c.drawString(
        LEFT,
        y - 5 * mm,
        "BULGULAR VE DÜZELTİCİ FAALİYETLER",
    )

    y -= 14 * mm

    c.setFillColor(LIGHT)
    c.setStrokeColor(BORDER)
    c.roundRect(
        LEFT,
        y - 22 * mm,
        CONTENT_W,
        22 * mm,
        3 * mm,
        fill=1,
        stroke=1,
    )

    summary_fields = [
        "Total Items / Toplam Madde",
        "YES / Evet",
        "NO / Hayır",
        "N/A",
        "Open Findings / Açık Bulgu",
    ]

    cell_w = CONTENT_W / len(summary_fields)

    for i, label in enumerate(summary_fields):
        x = LEFT + i * cell_w

        if i:
            c.line(x, y, x, y - 22 * mm)

        c.setFillColor(MUTED)
        c.setFont(BOLD, 5.8)
        c.drawCentredString(
            x + cell_w / 2,
            y - 6 * mm,
            label,
        )

        c.setFillColor(TEXT)
        c.setFont(BOLD, 15)
        c.drawCentredString(
            x + cell_w / 2,
            y - 15 * mm,
            "_____",
        )

    y -= 29 * mm

    c.setFillColor(NAVY_2)
    c.roundRect(
        LEFT,
        y - 9 * mm,
        CONTENT_W,
        9 * mm,
        2 * mm,
        fill=1,
        stroke=0,
    )

    headings = [
        ("Finding / Bulgu", 62 * mm),
        ("Action / Aksiyon", 61 * mm),
        ("Responsible / Sorumlu", 27 * mm),
        ("Due / Termin", 22 * mm),
        ("Status", CONTENT_W - 172 * mm),
    ]

    x = LEFT

    for label, width in headings:
        c.setFillColor(white)
        c.setFont(BOLD, 5.5)
        c.drawString(x + 2 * mm, y - 5.8 * mm, label)
        x += width

    y -= 9 * mm

    for row in range(7):
        row_h = 16 * mm

        c.setFillColor(white if row % 2 == 0 else LIGHT)
        c.setStrokeColor(BORDER)
        c.rect(
            LEFT,
            y - row_h,
            CONTENT_W,
            row_h,
            fill=1,
            stroke=1,
        )

        x = LEFT

        for _, width in headings[:-1]:
            x += width
            c.line(x, y, x, y - row_h)

        y -= row_h

    y -= 8 * mm

    c.setFillColor(TEXT)
    c.setFont(BOLD, 10)
    c.drawString(LEFT, y, "FINAL AUTHORIZATION / SON ONAY")

    y -= 8 * mm

    sign_w = CONTENT_W / 3

    for i, (en, tr) in enumerate([
        ("Inspector", "Denetçi"),
        ("Supervisor", "Süpervizör"),
        ("Permit Issuer", "İzin Veren"),
    ]):
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
        c.drawString(x + 5 * mm, y - 6 * mm, en)

        c.setFillColor(MUTED)
        c.setFont(REGULAR, 5.8)
        c.drawString(x + 5 * mm, y - 9 * mm, tr)

        c.line(
            x + 5 * mm,
            y - 17 * mm,
            x + sign_w - 5 * mm,
            y - 17 * mm,
        )

        c.setFont(REGULAR, 5)
        c.drawString(
            x + 5 * mm,
            y - 21 * mm,
            "Name / Signature / Date",
        )

    draw_footer(c, meta, page_no)


def generate(meta):
    if not meta["source"].exists():
        print(f"⚠ Missing source: {meta['source']}")
        return

    items = load_checklist(meta["source"])

    if not items:
        print(f"⚠ No items found: {meta['slug']}")
        return

    path = OUT / meta["output"]

    c = canvas.Canvas(
        str(path),
        pagesize=A4,
    )

    page_no = 1

    draw_header(c, meta, page_no)
    y = page_title(c, meta)
    y = draw_meta_box(c, meta, y)

    current_section = None
    section_no = 0
    item_no = 0
    widths = None

    for item in items:
        section_key = (
            item["section_en"],
            item["section_tr"],
        )

        if section_key != current_section:
            estimated_needed = 30 * mm

            if y - estimated_needed < BOTTOM_LIMIT:
                draw_footer(c, meta, page_no)
                c.showPage()
                page_no += 1
                draw_header(c, meta, page_no)
                y = TOP_AFTER_HEADER

            section_no += 1
            current_section = section_key

            y = draw_section_bar(
                c,
                y,
                section_no,
                item["section_en"],
                item["section_tr"],
            )

            y, widths = draw_table_header(c, y)

        text_width = 99 * mm

        en_lines = wrap_text(
            c,
            item["text_en"],
            REGULAR,
            6.4,
            text_width,
        )

        tr_lines = wrap_text(
            c,
            item["text_tr"],
            REGULAR,
            5.5,
            text_width,
        )

        estimated_h = max(
            12 * mm,
            (
                (len(en_lines) + len(tr_lines))
                * 3.1
                + 5
            )
            * mm,
        )

        if y - estimated_h < BOTTOM_LIMIT:
            draw_footer(c, meta, page_no)
            c.showPage()
            page_no += 1
            draw_header(c, meta, page_no)
            y = TOP_AFTER_HEADER

            y = draw_section_bar(
                c,
                y,
                section_no,
                item["section_en"],
                item["section_tr"],
            )

            y, widths = draw_table_header(c, y)

        item_no += 1

        y = draw_item_row(
            c,
            y,
            item_no,
            item,
            widths,
        )

    draw_footer(c, meta, page_no)

    c.showPage()
    page_no += 1

    draw_summary_page(c, meta, page_no)

    c.save()

    print(
        f"✅ Created: {path} "
        f"({len(items)} items, {page_no} pages)"
    )


def main():
    print("SERNEM Checklist PDF Engine V2")
    print("=" * 50)

    for checklist in CHECKLISTS:
        try:
            generate(checklist)
        except Exception as exc:
            print(
                f"❌ {checklist['slug']} failed: "
                f"{type(exc).__name__}: {exc}"
            )

    print("=" * 50)
    print("✅ Checklist generation completed.")


if __name__ == "__main__":
    main()
