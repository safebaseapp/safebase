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
    pdfmetrics.registerFont(TTFont("SRN-Regular", str(regular_path)))
    pdfmetrics.registerFont(TTFont("SRN-Bold", str(bold_path)))
    REGULAR = "SRN-Regular"
    BOLD = "SRN-Bold"
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


def load_poster_definitions():
    """Load SERNEM poster definitions from data/posters/engine/*.json."""
    import json
    from pathlib import Path

    project_root = Path(__file__).resolve().parents[1]
    poster_dir = project_root / "data" / "posters" / "engine"

    if not poster_dir.exists():
        raise RuntimeError(
            f"Poster definition directory not found: {poster_dir}"
        )

    poster_files = sorted(poster_dir.glob("*.json"))

    if not poster_files:
        raise RuntimeError(
            f"No poster JSON files found in: {poster_dir}"
        )

    posters = []
    seen_bases = set()

    for poster_file in poster_files:
        with poster_file.open("r", encoding="utf-8") as handle:
            poster = json.load(handle)

        if not isinstance(poster, dict):
            raise RuntimeError(
                f"{poster_file.name} must contain one JSON object."
            )

        base = poster.get("base")

        if not base:
            raise RuntimeError(
                f"{poster_file.name} is missing the 'base' field."
            )

        if base in seen_bases:
            raise RuntimeError(
                f"Duplicate poster base detected: {base}"
            )

        seen_bases.add(base)
        posters.append(poster)

    print(
        f"Loaded {len(posters)} poster definitions "
        f"from {poster_dir}"
    )

    return posters


POSTERS = load_poster_definitions()


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
