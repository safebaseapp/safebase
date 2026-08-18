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
    if isinstance(value, (list, tuple)):
        value = " • ".join(str(item) for item in value)
    elif value is None:
        value = ""
    else:
        value = str(value)

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
        "SERNEM TOOLBOX TALK",
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


def compact_list_box(
    c,
    title_value,
    items,
    x,
    y,
    width,
    color=BLUE,
    pale=PALE_BLUE,
):
    """Compact list box designed for the lower section of page 2."""
    font_size = 6.5
    leading = 3.2 * mm
    item_gap = 0.4 * mm
    content_width = width - 20 * mm

    wrapped_items = [
        wrapped_lines(c, item, content_width, font_size, REGULAR)
        for item in items
    ]

    total_line_count = sum(max(1, len(lines)) for lines in wrapped_items)

    height = max(
        34 * mm,
        14 * mm
        + total_line_count * leading
        + len(items) * item_gap
        + 3 * mm,
    )

    c.setFillColor(pale)
    c.setStrokeColor(BORDER)
    c.roundRect(x, y - height, width, height, 4 * mm, fill=1, stroke=1)

    c.setFillColor(color)
    c.roundRect(x, y - 11 * mm, width, 11 * mm, 4 * mm, fill=1, stroke=0)

    title_size = 9.2 if len(title_value) < 32 else 8.1
    text(c, title_value, x + 6 * mm, y - 7.3 * mm, title_size, BOLD, white)

    item_y = y - 15.5 * mm

    for lines in wrapped_items:
        c.setFillColor(color)
        c.circle(
            x + 7 * mm,
            item_y + 0.8 * mm,
            1.05 * mm,
            fill=1,
            stroke=0,
        )

        line_y = item_y

        for line in lines:
            text(
                c,
                line,
                x + 12 * mm,
                line_y,
                font_size,
                REGULAR,
                SLATE,
            )
            line_y -= leading

        item_y = line_y - item_gap

    return y - height - 5 * mm


def compact_checklist_box(c, title_value, items, x, y, width):
    """Compact two-column verification checklist for page 2."""
    columns = 2
    rows = (len(items) + columns - 1) // columns
    col_width = width / columns
    row_height = 7.5 * mm
    height = 16 * mm + rows * row_height

    c.setFillColor(PALE_GREEN)
    c.setStrokeColor(GREEN)
    c.roundRect(x, y - height, width, height, 4 * mm, fill=1, stroke=1)

    c.setFillColor(GREEN)
    c.roundRect(x, y - 11 * mm, width, 11 * mm, 4 * mm, fill=1, stroke=0)

    title_size = 7.6 if len(title_value) < 35 else 6.5
    text(c, title_value, x + 5 * mm, y - 7.3 * mm, title_size, BOLD, white)

    for index, item in enumerate(items):
        col = index % columns
        row = index // columns

        item_x = x + 5 * mm + col * col_width
        item_y = y - 17 * mm - row * row_height

        c.setFillColor(white)
        c.setStrokeColor(GREEN)
        c.rect(
            item_x,
            item_y - 1 * mm,
            3.4 * mm,
            3.4 * mm,
            fill=1,
            stroke=1,
        )

        lines = wrapped_lines(
            c,
            item,
            col_width - 12 * mm,
            6.4,
            REGULAR,
        )

        line_y = item_y

        for line in lines[:2]:
            text(
                c,
                line,
                item_x + 5 * mm,
                line_y,
                6.4,
                REGULAR,
                SLATE,
            )
            line_y -= 3.4 * mm

    return y - height - 5 * mm




def compact_supervisor_box(c, title_value, body, x, y, width):
    """Compact supervisor script box for page 2."""
    font_size = 7.2
    leading = 3.7 * mm
    lines = wrapped_lines(c, body, width - 18 * mm, font_size, REGULAR)

    height = max(
        25 * mm,
        14 * mm + len(lines) * leading,
    )

    c.setFillColor(PALE_BLUE)
    c.setStrokeColor(BLUE)
    c.setLineWidth(1)
    c.roundRect(x, y - height, width, height, 4 * mm, fill=1, stroke=1)

    text(c, title_value, x + 7 * mm, y - 8 * mm, 9.2, BOLD, BLUE)

    line_y = y - 14 * mm
    for line in lines:
        text(c, line, x + 8 * mm, line_y, font_size, REGULAR, DARK)
        line_y -= leading

    return y - height - 5 * mm


def footer(c, footer_text):
    width, _ = A4

    c.setFillColor(NAVY)
    c.rect(0, 0, width, 18 * mm, fill=1, stroke=0)

    text(
        c,
        "SERNEM",
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

    # Not alanı footer sınırının üzerinde kalacak şekilde sabitlenir.
    notes_y = table_top - 149 * mm
    notes_box_height = 18 * mm

    text(c, content["notes_title"], 18 * mm, notes_y, 9.5, BOLD, DARK)

    c.setFillColor(white)
    c.setStrokeColor(BORDER)
    c.roundRect(
        18 * mm,
        notes_y - notes_box_height - 6 * mm,
        width - 36 * mm,
        notes_box_height,
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

    # Tehlikeler ve kontroller kompakt kutularla çizilir.
    left_y = compact_list_box(
        c,
        content["hazards_title"],
        content["hazards"],
        16 * mm,
        y,
        half,
        RED,
        PALE_RED,
    )

    right_y = compact_list_box(
        c,
        content["controls_title"],
        content["controls"],
        21 * mm + half,
        y,
        half,
        GREEN,
        PALE_GREEN,
    )

    y = min(left_y, right_y)

    y = compact_supervisor_box(
        c,
        content["supervisor_title"],
        content["supervisor_script"],
        16 * mm,
        y,
        width - 32 * mm,
    )

    bottom_width = (width - 37 * mm) / 2

    questions_bottom = compact_list_box(
        c,
        content["questions_title"],
        content["questions"],
        16 * mm,
        y,
        bottom_width,
        BLUE,
        PALE_BLUE,
    )

    verification_bottom = compact_checklist_box(
        c,
        content["verification_title"],
        content["verification"],
        21 * mm + bottom_width,
        y,
        bottom_width,
    )

    page_two_bottom = min(
        questions_bottom,
        verification_bottom,
    )

    if page_two_bottom < 20 * mm:
        raise RuntimeError(
            f"Page 2 content entered footer area: "
            f"{page_two_bottom / mm:.1f} mm"
        )

    footer(c, content["footer"])

    # PAGE 3 — ATTENDANCE
    c.showPage()
    attendance_page(c, content)

    c.save()
    print(f"✅ Created: {path}")


# Toolbox içerikleri ayrı modüllerde tutulur.
from toolboxes import TOOLBOXES

# Toolbox PDF'lerini üret.
for toolbox in TOOLBOXES:
    for language in ("tr", "en"):
        create_toolbox(
            f"{toolbox['base']}-{language}.pdf",
            toolbox[language],
        )

print("✅ Premium Toolbox Engine v2 hazır.")
print(f"✅ {len(TOOLBOXES)} Toolbox konusu TR/EN üç sayfalık PDF olarak üretildi.")
